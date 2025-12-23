"use server";

const seen = new Set<string>();

export function requireIdempotency(key?: string) {
  if (!key || typeof key !== "string" || key.trim().length < 8) {
    throw new Error("Missing or invalid Idempotency-Key");
  }
  if (seen.has(key)) {
    throw new Error("Idempotency conflict: already processed");
  }
  seen.add(key);
}
