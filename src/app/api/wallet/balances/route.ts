import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/mock-db";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getDb();
  const balances = db.wallets.map((w) => ({ id: w.id, ownerType: w.ownerType, ownerId: w.ownerId, currency: w.currency, balance: w.balance }));
  return NextResponse.json({ balances });
}
