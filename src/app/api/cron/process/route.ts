import { NextResponse } from "next/server";
import { processJobsAction } from "@/lib/mock-db";

export async function GET() {
  await processJobsAction();
  return NextResponse.json({ ok: true });
}
