import { NextResponse } from "next/server";

const AUTHOR = "PT Klola Indonesia";

/**
 * One response shape for every `/api/v1/*` route, so clients never guess.
 * `httpCode` in the body and the real status always agree — both come from
 * the same argument.
 */
export function success<T>(data: T, message = "Successful", httpCode = 200) {
  return NextResponse.json(
    { success: true, httpCode, author: AUTHOR, message, data },
    { status: httpCode },
  );
}

export function failed(message = "Failed", httpCode = 400) {
  return NextResponse.json(
    { success: false, httpCode, author: AUTHOR, message },
    { status: httpCode },
  );
}