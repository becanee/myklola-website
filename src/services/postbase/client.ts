import { createClient, type PostbaseClient } from "postbasejs";

/**
 * Anon client — browser-safe and RLS-enforced.
 *
 * The anon key is public by design: it ships inside the bundle, and what a
 * caller may read or write is decided by the database's RLS policies, not by
 * the key. Never import the service-role key here.
 *
 * Singleton: every `createClient` starts its own token-refresh timer, so
 * building one per call would schedule duplicate refreshes against Postbase.
 */
let client: PostbaseClient | undefined;

export function getPostbaseClient(): PostbaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_POSTBASE_URL;
  const key = process.env.NEXT_PUBLIC_POSTBASE_ANON_KEY;
  const projectId = process.env.NEXT_PUBLIC_POSTBASE_PROJECT_ID;

  if (!url || !key || !projectId) {
    throw new Error(
      "Postbase env missing: NEXT_PUBLIC_POSTBASE_URL, NEXT_PUBLIC_POSTBASE_ANON_KEY, NEXT_PUBLIC_POSTBASE_PROJECT_ID",
    );
  }

  client = createClient(url, key, {
    projectId,
    // POSTs the session to our route handler after sign-in so the httpOnly
    // `postbase-session` cookie gets written — the proxy reads that cookie.
    auth: { syncEndpoint: "/api/auth/callback" },
  });
  return client;
}