"use server";

import { z } from "zod";

export type TwoFactorEnrollment = {
  secret: string;
  backupCodes: string[];
  enrolledAt: string;
};

// In-memory storage (replace with database in production)
const enrollments = new Map<string, TwoFactorEnrollment>();

/**
 * Generate a TOTP secret for two-factor authentication
 * Uses the Node.js crypto module which must be server-side only
 */
export async function generateTwoFactorSecret(): Promise<TwoFactorEnrollment> {
  // Use dynamic import to ensure this only runs server-side
  const { createHmac, randomBytes } = await import("crypto");
  
  // Generate a random secret
  const secret = randomBytes(20).toString("base64");
  
  // Generate backup codes
  const backupCodes = Array.from({ length: 10 }, () =>
    randomBytes(6).toString("hex")
  );

  return {
    secret,
    backupCodes,
    enrolledAt: new Date().toISOString(),
  };
}

/**
 * Store enrollment for a user
 */
export function storeEnrollment(userId: string, enrollment: TwoFactorEnrollment): void {
  enrollments.set(userId, enrollment);
}

/**
 * Get enrollment for a user
 */
export function getEnrollment(userId: string): TwoFactorEnrollment | undefined {
  return enrollments.get(userId);
}

export function removeEnrollment(userId: string): void {
  enrollments.delete(userId);
}

/**
 * Verify a TOTP code
 */
export async function verifyTOTPCode(
  secret: string,
  code: string
): Promise<boolean> {
  const { createHmac } = await import("crypto");
  
  // Convert base64 secret to buffer
  const secretBuffer = Buffer.from(secret, "base64");
  
  // TOTP window: current time and ±1 time period (30 seconds each)
  const timeStep = 30000; // 30 seconds
  const now = Date.now();
  
  for (let i = -1; i <= 1; i++) {
    const time = Math.floor((now + i * timeStep) / timeStep);
    const timeBuffer = Buffer.alloc(8);
    
    // Write time as big-endian 64-bit integer
    for (let j = 0; j < 8; j++) {
      timeBuffer[7 - j] = time & 0xff;
      time = time >> 8;
    }
    
    // Generate HMAC-SHA1
    const hmac = createHmac("sha1", secretBuffer);
    hmac.update(timeBuffer);
    const digest = hmac.digest();
    
    // Extract dynamic binary code
    const offset = digest[digest.length - 1] & 0x0f;
    const bin_code = ((digest[offset] & 0x7f) << 24)
      | ((digest[offset + 1] & 0xff) << 16)
      | ((digest[offset + 2] & 0xff) << 8)
      | (digest[offset + 3] & 0xff);
    
    // Generate 6-digit code
    const otp = (bin_code % 1000000).toString().padStart(6, "0");
    
    if (otp === code) {
      return true;
    }
  }
  
  return false;
}
