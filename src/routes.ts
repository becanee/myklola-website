/**
 * Route classification for the proxy. Add a path here before creating it,
 * otherwise it falls through unguarded — this file is the only source of
 * truth for what requires a session.
 */

/** Reachable without a session. */
export const PUBLIC_ROUTES = ["/", "/contact", "/login"] as const;

/** Requires a session; unauthenticated visitors are sent to `/login`. */
export const PROTECTED_ROUTES = ["/dash"] as const;

/** Segment-aware match: `/dash` covers `/dash` and `/dash/x`, never `/dashx`. */
function matches(pathname: string, route: string): boolean {
  if (route === "/") return pathname === "/";
  return pathname === route || pathname.startsWith(`${route}/`);
}

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => matches(pathname, route));
}

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => matches(pathname, route));
}