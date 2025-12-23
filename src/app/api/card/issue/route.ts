import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { issueCardAction, getDb } from "@/lib/mock-db";
import { requireIdempotency } from "@/lib/idempotency";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const idem = request.headers.get("Idempotency-Key") ?? undefined;
  try {
    requireIdempotency(idem);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 409 });
  }
  const body = await request.json();
  const contractorId = String(body.contractorId ?? "");
  if (!contractorId) return NextResponse.json({ error: "Missing contractorId" }, { status: 400 });
  try {
    await issueCardAction(contractorId);
    const db = getDb();
    const card = db.cards.find((c) => c.contractorId === contractorId);
    return NextResponse.json({ card });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
