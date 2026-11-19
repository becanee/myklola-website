import { ACCESS_COOKIE, REFRESH_COOKIE, USER_COOKIE } from "@/lib/auth-cookies";
import { success } from "@/lib/responseWrapper";
import { cookies } from "next/headers";

export async function POST() {
  const gatewayUrl = process.env.GATEWAY_URL;
  const projectId = process.env.PROJECT_ID;
  const apiKey = process.env.GATEWAY_API_KEY;

  const store = await cookies();
  const accessToken = store.get(ACCESS_COOKIE)?.value;

  // Best-effort revocation. A failure here must not block the sign-out: the
  // user asked to leave, and the local cookies can always be cleared. An
  // un-revoked gateway session expires on its own.
  if (accessToken && gatewayUrl && projectId && apiKey) {
    try {
      const upstream = await fetch(`${gatewayUrl}/${projectId}/logout`, {
        method: "POST",
        headers: {
          "X-Postbase-Token": accessToken,
          Authorization: `Bearer ${apiKey}`,
        },
        cache: "no-store",
      });
      if (!upstream.ok) {
        console.error("[logout] gateway returned", upstream.status);
      }
    } catch (err) {
      console.error("[logout] gateway unreachable", err);
    }
  } else if (!gatewayUrl || !projectId || !apiKey) {
    console.error("[logout] GATEWAY_URL / PROJECT_ID / GATEWAY_API_KEY missing");
  }

  const res = success({ loggedOut: true }, "Logged out");

  // `path`/`secure` must match how they were written, or the browser keeps the
  // old cookie as a separate entry instead of replacing it.
  const base = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };

  res.cookies.set(ACCESS_COOKIE, "", base);
  res.cookies.set(REFRESH_COOKIE, "", base);
  res.cookies.set(USER_COOKIE, "", base);

  return res;
}