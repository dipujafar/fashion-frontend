import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined,
  fallback = "Something went wrong"
): string {
  if (!error) return fallback;

  // FetchBaseQueryError (API responded with an error, or network/parsing failure)
  if ("status" in error) {
    const data = error.data as { message?: string; error?: string } | undefined;
    if (data?.message) return data.message;
    if (data?.error) return data.error;
    if ("error" in error && typeof error.error === "string") return error.error; // FETCH_ERROR, PARSING_ERROR, etc.
    return fallback;
  }

  // SerializedError
  return error.message ?? fallback;
}