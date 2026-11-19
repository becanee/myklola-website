import { ACCESS_COOKIE, REFRESH_COOKIE, USER_COOKIE } from "@/lib/auth-cookies";
import { failed, success } from "@/lib/responseWrapper";
import { z } from "zod";

const schema = z.object({
  email: z.email(),
  password: z.string().min(1),
  remember: z.boolean().optional().default(false),
});

type GatewayLogin = {
  user: { id: string; email: string; name: string | null };
  session: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    refreshTokenExpiresAt: number;
  };
};

const UNAVAILABLE = "Sign-in is temporarily unavailable. Try again.";

export async function POST(req: Request) {
  const gatewayUrl = process.env.GATEWAY_URL;
  const projectId = process.env.PROJECT_ID;
  const apiKey = process.env.GATEWAY_API_KEY;

  if (!gatewayUrl || !projectId || !apiKey) {
    console.error("[login] GATEWAY_URL / PROJECT_ID / GATEWAY_API_KEY missing");
    return failed(UNAVAILABLE, 500);
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return failed("Email and password are required.", 400);
  }
  const { email, password, remember } = parsed.data;

  let upstream: Response;
  try {
    upstream = await fetch(`${gatewayUrl}/${projectId}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ grant_type: "password", email, password }),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[login] gateway unreachable", err);
    return failed(UNAVAILABLE, 502);
  }

  if (!upstream.ok) {
    // Wrong credentials answer 400. A 401 here means the gateway rejected our
    // key — a server fault, never the user's password.
    if (upstream.status === 401) {
      console.error("[login] gateway rejected GATEWAY_API_KEY");
      return failed(UNAVAILABLE, 500);
    }
    if (upstream.status === 429) {
      return failed("Too many attempts. Try again shortly.", 429);
    }
    if (upstream.status >= 500) {
      return failed(UNAVAILABLE, 502);
    }
    return failed("Invalid email or password.", 401);
  }

  const body = (await upstream.json().catch(() => null)) as GatewayLogin | null;
  const session = body?.session;

  if (!body?.user?.id || !session?.accessToken || !session.refreshToken) {
    console.error("[login] unexpected gateway payload");
    return failed(UNAVAILABLE, 502);
  }

  const now = Math.floor(Date.now() / 1000);
  const accessMaxAge = Math.floor(session.expiresAt) - now;

  // A token that arrives already expired means clock skew or a gateway bug.
  // Never hand the browser a dead bearer cookie.
  if (!Number.isFinite(accessMaxAge) || accessMaxAge <= 0) {
    console.error("[login] gateway returned an expired token");
    return failed(UNAVAILABLE, 502);
  }

  const refreshMaxAge = Math.floor(session.refreshTokenExpiresAt) - now;

  // Unchecked "Keep me signed in" -> session cookies (no maxAge).
  const ttl = (seconds: number) =>
    remember && Number.isFinite(seconds) && seconds > 0 ? seconds : undefined;

  const base = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  // Tokens never appear in the JSON body — the browser cannot read them.
  const res = success({
    user: {
      id: body.user.id,
      email: body.user.email,
      name: body.user.name ?? null,
    },
  });

  res.cookies.set(ACCESS_COOKIE, session.accessToken, {
    ...base,
    maxAge: ttl(accessMaxAge),
  });
  res.cookies.set(REFRESH_COOKIE, session.refreshToken, {
    ...base,
    maxAge: ttl(refreshMaxAge),
  });
  res.cookies.set(USER_COOKIE, body.user.id, {
    ...base,
    maxAge: ttl(accessMaxAge),
  });

  return res;
}