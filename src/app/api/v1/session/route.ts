import { ACCESS_COOKIE, REFRESH_COOKIE, USER_COOKIE } from "@/lib/auth-cookies";
import { failed, success } from "@/lib/responseWrapper";
import { cookies } from "next/headers";

type GatewaySession = {
  session: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    /** Present on the login payload; the session endpoint may omit it. */
    refreshTokenExpiresAt?: number;
    user: { id: string; email: string; name: string | null };
  } | null;
};

const UNAVAILABLE = "Session check is temporarily unavailable.";

/**
 * Reads the `exp` claim (seconds) out of a JWT without verifying it. Only used
 * to size a cookie, never to authorize — the gateway already validated the
 * token before returning it to us.
 */
function jwtExpiry(token: string): number {
  try {
    const payload = token.split(".")[1];
    const json = Buffer.from(payload, "base64url").toString("utf8");
    const exp = JSON.parse(json).exp;
    return Number.isFinite(exp) ? Number(exp) : 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  const gatewayUrl = process.env.GATEWAY_URL;
  const projectId = process.env.PROJECT_ID;
  const apiKey = process.env.GATEWAY_API_KEY;

  if (!gatewayUrl || !projectId || !apiKey) {
    console.error("[session] GATEWAY_URL / PROJECT_ID / GATEWAY_API_KEY missing");
    return failed(UNAVAILABLE, 500);
  }

  const store = await cookies();
  const refreshToken = store.get(REFRESH_COOKIE)?.value;

  if (!refreshToken) {
    return failed("No session.", 401);
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${gatewayUrl}/${projectId}/session`, {
      headers: {
        "X-Postbase-Session": refreshToken,
        "X-Postbase-Token": apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
    });
  } catch (err) {
    console.error("[session] gateway unreachable", err);
    return failed(UNAVAILABLE, 502);
  }

  if (!upstream.ok) {
    if (upstream.status === 401) {
      console.error("[session] gateway rejected GATEWAY_API_KEY");
      return failed(UNAVAILABLE, 500);
    }
    return failed(UNAVAILABLE, 502);
  }

  // The gateway answers 200 with `{ session: null }` for an invalid or
  // expired refresh token — that is a normal "logged out", not an error.
  const body = (await upstream.json().catch(() => null)) as GatewaySession | null;
  const session = body?.session;

  if (!session?.accessToken || !session.refreshToken || !session.user?.id) {
    return failed("Session expired. Please sign in again.", 401);
  }

  const now = Math.floor(Date.now() / 1000);
  const accessMaxAge = Math.floor(session.expiresAt) - now;
  if (!Number.isFinite(accessMaxAge) || accessMaxAge <= 0) {
    return failed("Session expired. Please sign in again.", 401);
  }
  // This endpoint omits `refreshTokenExpiresAt` (login includes it), so read
  // the claim off the JWT itself. Without this the refresh cookie would be
  // reissued as a session cookie on every check, silently dropping the
  // "Keep me signed in" lifetime.
  const refreshExp =
    Number(session.refreshTokenExpiresAt) || jwtExpiry(session.refreshToken);
  const refreshMaxAge = refreshExp ? refreshExp - now : 0;

  const base = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  // Same shape as the login route: never leak tokens to the client.
  const res = success({
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name ?? null,
    },
  });

  res.cookies.set(ACCESS_COOKIE, session.accessToken, {
    ...base,
    maxAge: accessMaxAge,
  });
  res.cookies.set(REFRESH_COOKIE, session.refreshToken, {
    ...base,
    maxAge: refreshMaxAge > 0 ? refreshMaxAge : undefined,
  });
  res.cookies.set(USER_COOKIE, session.user.id, {
    ...base,
    maxAge: accessMaxAge,
  });

  return res;
}