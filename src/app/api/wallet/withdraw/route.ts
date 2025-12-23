import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { withdrawPayoutAction } from "@/lib/mock-db";
import { requireIdempotency } from "@/lib/idempotency";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const idem = request.headers.get("Idempotency-Key") ?? undefined;
  try { requireIdempotency(idem); } catch (e) { return NextResponse.json({ error: String(e) }, { status: 409 }); }
  const body = await request.json();
  const contractorId = String(body.contractorId ?? "");
  const amount = Number(body.amount ?? 0);
  const destinationCurrency = String(body.destinationCurrency ?? "");
  if (!contractorId || !amount || !destinationCurrency) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const fd = new FormData();
  fd.set("contractorId", contractorId);
  fd.set("amount", String(amount));
  fd.set("destinationCurrency", destinationCurrency);
  try {
    await withdrawPayoutAction(fd);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
