import "server-only";
import { createServerClient } from "postbasejs/ssr";
import { cookies } from "next/headers";

/**
 * Reads the signed-in user inside a Server Component. The proxy already
 * blocked unauthenticated visitors, but this is the real check: never trust
 * the proxy's optimistic redirect as authorization.
 */
export async function getPostbaseSession() {
  const store = await cookies();

  const postbase = createServerClient(
    process.env.NEXT_PUBLIC_POSTBASE_URL!,
    process.env.NEXT_PUBLIC_POSTBASE_ANON_KEY!,
    {
      projectId: process.env.NEXT_PUBLIC_POSTBASE_PROJECT_ID!,
      cookies: {
        getAll: () => store.getAll(),
        // Server Components cannot set cookies; a refresh here is discarded.
        setAll: () => {},
      },
    },
  );

  const {
    data: { session },
  } = await postbase.auth.getSession();

  return session;
}