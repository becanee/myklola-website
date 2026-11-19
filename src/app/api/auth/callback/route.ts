import { createAuthCallbackHandler } from "postbasejs/ssr";
import { cookies } from "next/headers";

/**
 * Receives the session the browser client posts after sign-in (opt-in via
 * `auth.syncEndpoint`) and writes it into the httpOnly `postbase-session`
 * cookie. Without this route the proxy can never see a logged-in user: the
 * browser SDK keeps the refresh token in localStorage and has no way to set
 * an httpOnly cookie itself.
 *
 * `credentials: "include"` on the SDK's POST means the request is same-origin.
 */
export const POST = createAuthCallbackHandler({
  url: process.env.NEXT_PUBLIC_POSTBASE_URL!,
  key: process.env.NEXT_PUBLIC_POSTBASE_ANON_KEY!,
  projectId: process.env.NEXT_PUBLIC_POSTBASE_PROJECT_ID,
  cookies: async () => {
    const store = await cookies();
    return {
      getAll: () => store.getAll(),
      setAll: (cs) =>
        cs.forEach((c) =>
          store.set(c.name, c.value, c.options as Parameters<typeof store.set>[2]),
        ),
    };
  },
});