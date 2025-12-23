import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateTwoFactorSecret, storeEnrollment, getEnrollment } from "@/lib/twofactor";
import { removeEnrollment } from "@/lib/twofactor";

/**
 * GET /api/auth/twofactor
 * Initiate 2FA enrollment and return TOTP secret
 */
export async function GET(request: NextRequest) {
  const session = await auth();

  // Check authentication
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id; // Now guaranteed to be string

  try {
    // Generate new enrollment
    const enrollment = await generateTwoFactorSecret();

    // Store temporarily (not yet confirmed by user)
    storeEnrollment(`${userId}:pending`, enrollment);

    // Create OTPAuth URL for QR code generation
    const email = session.user.email ?? "user@example.com";
    const label = encodeURIComponent(`SwyftUp:${email}`);
    const otpauthUrl = `otpauth://totp/${label}?secret=${enrollment.secret}&issuer=SwyftUp`;

    return NextResponse.json({
      secret: enrollment.secret,
      otpauthUrl,
      backupCodes: enrollment.backupCodes,
    });
  } catch (error) {
    console.error("Failed to generate 2FA secret:", error);
    return NextResponse.json(
      { error: "Failed to generate 2FA secret" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/auth/twofactor
 * Verify and confirm 2FA enrollment
 */
export async function POST(request: NextRequest) {
  const session = await auth();

  // Check authentication
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id; // Now guaranteed to be string

  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    // Get the pending enrollment
    const pendingEnrollment = getEnrollment(`${userId}:pending`);

    if (!pendingEnrollment) {
      return NextResponse.json(
        { error: "No pending enrollment found" },
        { status: 400 }
      );
    }

    // Verify the code dynamically import to ensure server-only execution
    const { verifyTOTPCode } = await import("@/lib/twofactor");
    const isValid = await verifyTOTPCode(pendingEnrollment.secret, code);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    // Move enrollment from pending to confirmed
    storeEnrollment(userId, pendingEnrollment);

    // TODO: Store in database and clear pending enrollment

    return NextResponse.json({
      success: true,
      message: "2FA enrollment confirmed",
      backupCodes: pendingEnrollment.backupCodes,
    });
  } catch (error) {
    console.error("Failed to confirm 2FA enrollment:", error);
    return NextResponse.json(
      { error: "Failed to confirm enrollment" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/auth/twofactor
 * Disable 2FA by removing enrollment
 */
export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    removeEnrollment(session.user.id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Unable to disable" }, { status: 400 });
  }
}
