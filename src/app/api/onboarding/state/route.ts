import { NextResponse } from "next/server";
import { getOnboardingState } from "@/lib/onboarding-state";

export async function GET() {
  return NextResponse.json(getOnboardingState());
}
