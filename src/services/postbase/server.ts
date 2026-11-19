import "server-only";
import { createClient, type PostbaseClient } from "postbasejs";

/**
 * Service-role client — bypasses RLS entirely.
 *
 * Server-side only. The `server-only` import turns any use from a Client
 * Component into a build error, which is what keeps this key out of the
 * browser bundle. Reach for `getPostbaseClient()` unless the operation is
 * genuinely privileged (admin maintenance, cross-tenant reads, webhooks).
 */
let admin: PostbaseClient | undefined;

export function getPostbaseAdmin(): PostbaseClient {
  if (admin) return admin;

  const url = process.env.NEXT_PUBLIC_POSTBASE_URL;
  const key = process.env.POSTBASE_SERVICE_KEY;
  const projectId = process.env.NEXT_PUBLIC_POSTBASE_PROJECT_ID;

  if (!url || !key || !projectId) {
    throw new Error(
      "Postbase service env missing: NEXT_PUBLIC_POSTBASE_URL, POSTBASE_SERVICE_KEY, NEXT_PUBLIC_POSTBASE_PROJECT_ID",
    );
  }

  admin = createClient(url, key, {
    projectId,
    // Nothing to persist server-side. Explicit so a future refactor that
    // imports this outside a request never starts a refresh timer.
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return admin;
}