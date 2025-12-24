import { NextResponse } from "next/server";
import { processJobsAction } from "@/lib/data-service";

export async function GET() {
  await processJobsAction();
  return NextResponse.json({ ok: true });
}
