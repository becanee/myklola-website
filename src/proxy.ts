import { USER_COOKIE } from "@/lib/auth-cookies";
import { isProtectedRoute } from "@/routes";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  // Public routes need no session, so they skip the check entirely.
  if (!isProtectedRoute(req.nextUrl.pathname)) return NextResponse.next();

  // Verify with the gateway rather than trusting the cookie's presence — a
  // forged `__klola_user` would otherwise walk straight past this redirect.
  // The route forwards the refresh token and returns the rotated pair, so a
  // stale access token is renewed on the same request.
  let session: Response;
  try {
    session = await fetch(new URL("/api/v1/session", req.url), {
      headers: { cookie: req.headers.get("cookie") ?? "" },
      cache: "no-store",
    });
  } catch {
    // Gateway unreachable: fail closed to /login rather than let traffic
    // through on an unverified cookie.
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!session.ok) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const res = NextResponse.next();

  // Carry the rotated cookies onto the *original* response, otherwise the
  // browser keeps the old refresh token and the next request has to refresh
  // again — or, worse, presents one the gateway already rotated away.
  for (const cookie of session.headers.getSetCookie()) {
    res.headers.append("set-cookie", cookie);
  }

  return res;
}

export const config = {
  // Static assets excluded, or the proxy intercepts CSS/JS/images and a
  // redirect there breaks the very pages it guards.
  // `/api` excluded: the proxy calls `/api/v1/session` itself, so matching it
  // would recurse until the platform kills the request. Protected pages never
  // live under `/api`, so nothing is left unguarded.
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|mp4|webm)$).*)",
  ],
};