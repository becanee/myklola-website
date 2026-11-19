// Cookie wire contract shared by the login route (writer) and the proxy
// (reader). Keep both sides importing from here so the names cannot drift.
export const ACCESS_COOKIE = "__klola_access_token";
export const REFRESH_COOKIE = "__klola_refresh_token";
export const USER_COOKIE = "__klola_user";