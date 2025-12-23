import { createHmac, randomBytes } from "crypto";
import { getOnboardingState } from "@/lib/onboarding-state";
import { recordActivity } from "@/lib/activity-log";
import { sendNotification } from "@/lib/notification-service";
import { Role } from "@/config/roles";

type TwoFactorRecord = {
  secret: string;
  enabled: boolean;
  recoveryCodes: string[];
  trustedUntil?: Record<string, number>;
};

const store = new Map<string, TwoFactorRecord>();

const generateSecret = () => randomBytes(20).toString("hex");

const generateRecoveryCodes = () =>
  Array.from({ length: 10 }, () => randomBytes(5).toString("hex"));

function hotp(secret: string, counter: number) {
  const buffer = Buffer.alloc(8);
  buffer.writeBigUInt64BE(BigInt(counter));
  const hmac = createHmac("sha1", Buffer.from(secret, "hex")).update(buffer).digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return (code % 1_000_000).toString().padStart(6, "0");
}

function totp(secret: string, timestamp = Date.now()) {
  const step = 30;
  const counter = Math.floor(timestamp / 1000 / step);
  return hotp(secret, counter);
}

function verifyTotp(secret: string, token: string) {
  const step = 30;
  const counter = Math.floor(Date.now() / 1000 / step);
  const candidates = [counter - 1, counter, counter + 1].map((c) => hotp(secret, c));
  return candidates.includes(token);
}

export function getEnrollment(userId: string) {
  const existing = store.get(userId);
  if (existing) return existing;
  const record: TwoFactorRecord = {
    secret: generateSecret(),
    enabled: false,
    recoveryCodes: generateRecoveryCodes(),
    trustedUntil: {},
  };
  store.set(userId, record);
  return record;
}

export function enableTwoFactor(userId: string, code: string) {
  const record = getEnrollment(userId);
  if (!verifyTotp(record.secret, code)) {
    return { success: false, reason: "Invalid code" };
  }
  record.enabled = true;
  record.recoveryCodes = generateRecoveryCodes();
  record.trustedUntil = {};

  recordActivity({
    actorUserId: userId,
    eventType: "security.twofactor_enabled",
    metadata: {},
  });
  sendNotification({ userId, event: "security.twofactor_enabled" });
  return { success: true, recoveryCodes: record.recoveryCodes };
}

export function disableTwoFactor(userId: string) {
  const record = getEnrollment(userId);
  record.enabled = false;
  recordActivity({
    actorUserId: userId,
    eventType: "security.twofactor_disabled",
    metadata: {},
  });
  sendNotification({ userId, event: "security.twofactor_disabled" });
  return true;
}

export function verifySecondFactor(userId: string, code?: string, recoveryCode?: string) {
  const record = getEnrollment(userId);
  if (!record.enabled) return { ok: true, usedRecovery: false };

  if (code && verifyTotp(record.secret, code)) {
    recordActivity({
      actorUserId: userId,
      eventType: "security.twofactor_success",
      metadata: {},
    });
    return { ok: true, usedRecovery: false };
  }

  if (recoveryCode) {
    const idx = record.recoveryCodes.indexOf(recoveryCode);
    if (idx >= 0) {
      record.recoveryCodes.splice(idx, 1);
      recordActivity({
        actorUserId: userId,
        eventType: "security.twofactor_recovery_used",
        metadata: {},
      });
      return { ok: true, usedRecovery: true };
    }
  }

  recordActivity({
    actorUserId: userId,
    eventType: "security.twofactor_failed",
    metadata: {},
  });
  return { ok: false, usedRecovery: false };
}

export function requiresTwoFactor(role: Role) {
  const policy = getOnboardingState();
  if (!policy.require2FAForAdmins) return false;
  return role === Role.OWNER || role === Role.FINANCE_ADMIN;
}

export function getTotpCodeForTesting(userId: string) {
  const record = getEnrollment(userId);
  return totp(record.secret);
}
