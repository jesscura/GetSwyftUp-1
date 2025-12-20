import { NextResponse } from "next/server";
import { seedAction } from "@/lib/mock-db";

export async function POST() {
  await seedAction();
  return NextResponse.json({ ok: true });
}
