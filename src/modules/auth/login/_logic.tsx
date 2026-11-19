"use client";

import { useState } from "react";

export type LoginUser = { id: string; email: string; name: string | null };

export type LoginResult =
  | { ok: true; user: LoginUser }
  | { ok: false; error: string };

/** Mirrors `success()` / `failed()` from `@/lib/responseWrapper`. */
type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: { user?: LoginUser };
};

const NETWORK_ERROR = "Network error. Check your connection and try again.";
const FALLBACK_ERROR = "Couldn't sign you in. Please try again.";

/**
 * POSTs to `/api/v1/login`. Never throws for an expected failure — a wrong
 * password, a rate limit, a network drop and a malformed body all come back as
 * `{ ok: false }` so callers never need a try/catch around it.
 */
export async function loginUser(
  email: string,
  password: string,
  remember = false,
): Promise<LoginResult> {
  try {
    const res = await fetch("/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, remember }),
    });

    const body = (await res.json().catch(() => null)) as ApiResponse | null;

    if (!res.ok || body?.success !== true || !body.data?.user) {
      return { ok: false, error: body?.message || FALLBACK_ERROR };
    }

    return { ok: true, user: body.data.user };
  } catch {
    return { ok: false, error: NETWORK_ERROR };
  }
}

/**
 * State around `loginUser`. Deliberately does no navigation — the form owns
 * where a successful sign-in goes.
 */
export function useLogin() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(
    email: string,
    password: string,
    remember: boolean,
  ): Promise<LoginResult> {
    setPending(true);
    setError(null);

    const result = await loginUser(email, password, remember);

    setPending(false);
    if (!result.ok) setError(result.error);

    return result;
  }

  return { login, pending, error };
}