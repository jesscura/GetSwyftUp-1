import { Role } from "@/config/roles";

export type TwoFactorEnrollment = {
  secret: string; // Base32-encoded
  backupCodes: string[];
  enrolledAt: string;
};

// In-memory storage (replace with database in production)
const enrollments = new Map<string, TwoFactorEnrollment>();

// Base32 (RFC4648) helpers
const B32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function toBase32(bytes: Uint8Array): string {
  let bits = 0;
  let value = 0;
  let output = "";
  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8) | bytes[i];
    bits += 8;
    while (bits >= 5) {
      output += B32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    output += B32_ALPHABET[(value << (5 - bits)) & 31];
  }
  return output;
}
function fromBase32(str: string): Uint8Array {
  const clean = str.toUpperCase().replace(/=+$/g, "");
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (let i = 0; i < clean.length; i++) {
    const idx = B32_ALPHABET.indexOf(clean[i]);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

function randomBytes(length: number): Uint8Array {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return arr;
}

function randomHex(length: number): string {
  const bytes = randomBytes(length);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function generateTwoFactorSecret(): Promise<TwoFactorEnrollment> {
  const secretBytes = randomBytes(20);
  const secret = toBase32(secretBytes);
  const backupCodes = Array.from({ length: 10 }, () => randomHex(6));
  return {
    secret,
    backupCodes,
    enrolledAt: new Date().toISOString(),
  };
}

export function storeEnrollment(userId: string, enrollment: TwoFactorEnrollment): void {
  enrollments.set(userId, enrollment);
}

export function getEnrollment(userId: string): TwoFactorEnrollment | undefined {
  return enrollments.get(userId);
}

export function removeEnrollment(userId: string): void {
  enrollments.delete(userId);
}

/**
 * Normalize a Uint8Array view into a standalone ArrayBuffer for Web Crypto APIs.
 */
function toArrayBuffer(view: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(view.byteLength);
  new Uint8Array(buffer).set(view);
  return buffer;
}

async function hmacSha1(keyBytes: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", toArrayBuffer(keyBytes), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, toArrayBuffer(data));
  return new Uint8Array(sig);
}

function counterToBuffer(counter: number): Uint8Array {
  const buf = new Uint8Array(8);
  for (let i = 7; i >= 0; i--) {
    buf[i] = counter & 0xff;
    counter = Math.floor(counter / 256);
  }
  return buf;
}

async function hotp(secretKey: Uint8Array, counter: number): Promise<string> {
  const msg = counterToBuffer(counter);
  const hmac = await hmacSha1(secretKey, msg);
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code = ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return (code % 1_000_000).toString().padStart(6, "0");
}

export async function verifyTOTPCode(secretBase32: string, code: string): Promise<boolean> {
  const keyBytes = fromBase32(secretBase32);
  const step = 30;
  const now = Math.floor(Date.now() / 1000);
  const counter = Math.floor(now / step);
  const candidates = await Promise.all([
    hotp(keyBytes, counter - 1),
    hotp(keyBytes, counter),
    hotp(keyBytes, counter + 1),
  ]);
  return candidates.includes(code);
}

export function requiresTwoFactor(role: Role): boolean {
  // Require 2FA for privileged roles
  return role === Role.OWNER || role === Role.SUPER_ADMIN;
}

export async function verifySecondFactor(
  userId: string,
  code?: string,
  recoveryCode?: string,
): Promise<{ ok: boolean; usedRecovery: boolean }> {
  const enrollment = getEnrollment(userId);
  if (!enrollment) return { ok: true, usedRecovery: false };
  if (code) {
    const valid = await verifyTOTPCode(enrollment.secret, code);
    if (valid) return { ok: true, usedRecovery: false };
  }
  if (recoveryCode) {
    const idx = enrollment.backupCodes.indexOf(recoveryCode);
    if (idx >= 0) {
      enrollment.backupCodes.splice(idx, 1);
      return { ok: true, usedRecovery: true };
    }
  }
  return { ok: false, usedRecovery: false };
}
