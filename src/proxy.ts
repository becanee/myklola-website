import { isProtectedRoute } from "@/routes";
import { createServerClient } from "postbasejs/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookieOptions = Parameters<NextResponse["cookies"]["set"]>[2];

export async function proxy(req: NextRequest) {
  // Public routes need no session, so they skip the auth round-trip entirely —
  // `getSession()` is a network call against Postbase, not a local check.
  if (!isProtectedRoute(req.nextUrl.pathname)) return NextResponse.next();

  const res = NextResponse.next();

  const postbase = createServerClient(
    process.env.NEXT_PUBLIC_POSTBASE_URL!,
    process.env.NEXT_PUBLIC_POSTBASE_ANON_KEY!,
    {
      projectId: process.env.NEXT_PUBLIC_POSTBASE_PROJECT_ID!,
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) =>
          cookies.forEach((c) =>
            res.cookies.set(c.name, c.value, c.options as CookieOptions),
          ),
      },
    },
  );

  // Reads the httpOnly `postbase-session` cookie and refreshes the token if
  // it has expired; a refresh writes rotated cookies onto `res` above.
  const {
    data: { session },
  } = await postbase.auth.getSession();

  if (!session) {
    const login = NextResponse.redirect(new URL("/login", req.url));
    // A refresh can succeed while the session is still unusable. Carry the
    // rotated cookies onto the redirect, or the next request presents a stale
    // refresh token and the user lands in a redirect loop.
    res.cookies.getAll().forEach((cookie) => login.cookies.set(cookie));
    return login;
  }

  return res;
}

export const config = {
  // Everything except static assets — otherwise the proxy intercepts CSS, JS,
  // images and video, and a redirect there breaks the pages it is guarding.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|mp4|webm)$).*)",
  ],
};