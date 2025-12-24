import { NextResponse } from "next/server";
import { seedAction } from "@/lib/data-service";

export async function POST() {
  await seedAction();
  return NextResponse.json({ ok: true });
}
