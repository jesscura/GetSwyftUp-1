import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { toggleCardStatusAction, getDb } from "@/lib/mock-db";
import { requireIdempotency } from "@/lib/idempotency";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const idem = request.headers.get("Idempotency-Key") ?? undefined;
  try { requireIdempotency(idem); } catch (e) { return NextResponse.json({ error: String(e) }, { status: 409 }); }
  const body = await request.json();
  const cardId = String(body.cardId ?? "");
  if (!cardId) return NextResponse.json({ error: "Missing cardId" }, { status: 400 });
  try {
    await toggleCardStatusAction(cardId, "frozen");
    const db = getDb();
    const card = db.cards.find((c) => c.id === cardId);
    return NextResponse.json({ card });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
