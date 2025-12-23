import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { disableTwoFactor, enableTwoFactor, getEnrollment } from "@/lib/twofactor";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const record = getEnrollment(session.user.id);
  const label = encodeURIComponent(session.user.email ?? session.user.name ?? session.user.id);
  const otpauthUrl = `otpauth://totp/SwyftUp:${label}?secret=${record.secret}&issuer=SwyftUp`;
  return NextResponse.json({
    enabled: record.enabled,
    secret: record.enabled ? undefined : record.secret,
    otpauthUrl: record.enabled ? undefined : otpauthUrl,
    recoveryCodes: record.enabled ? undefined : record.recoveryCodes,
  });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const code = typeof body.code === "string" ? body.code.trim() : "";
  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }
  const result = enableTwoFactor(session.user.id, code);
  if (!result.success) {
    return NextResponse.json({ error: result.reason ?? "Unable to verify code" }, { status: 400 });
  }
  return NextResponse.json({ enabled: true, recoveryCodes: result.recoveryCodes });
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  disableTwoFactor(session.user.id);
  return NextResponse.json({ enabled: false });
}
