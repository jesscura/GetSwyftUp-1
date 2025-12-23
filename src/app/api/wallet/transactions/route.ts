import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/mock-db";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const walletId = searchParams.get("walletId");
  const type = searchParams.get("type");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  let items = db.ledger;
  if (walletId) items = items.filter((l) => l.walletId === walletId);
  if (type) items = items.filter((l) => l.type === type);
  if (from) items = items.filter((l) => new Date(l.createdAt) >= new Date(from));
  if (to) items = items.filter((l) => new Date(l.createdAt) <= new Date(to));
  return NextResponse.json({ transactions: items });
}
