import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/mock-db";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const cardId = searchParams.get("cardId");
  const items = db.cardTransactions.filter((t) => !cardId || t.cardId === cardId);
  return NextResponse.json({ transactions: items });
}
