import { getDb } from "@/lib/mock-db";
import { pushAudit } from "@/lib/mock-db";

type CopilotQuestion =
  | "withdrawal_delay"
  | "fx_paid"
  | "card_vs_bank";

export function answerCopilot(question: CopilotQuestion, referenceId?: string) {
  const db = getDb();
  let answer = "";
  if (question === "withdrawal_delay") {
    const payout = referenceId ? db.payouts.find((p) => p.id === referenceId) : db.payouts[0];
    answer =
      `Bank withdrawals run via Wise. Status: ${payout?.status ?? "pending"}. ` +
      `FX and provider steps can add a few hours. Estimated arrival: ${payout?.estimatedArrival ?? "soon"}.`;
  }
  if (question === "fx_paid") {
    const payout = referenceId ? db.payouts.find((p) => p.id === referenceId) : db.payouts[0];
    answer =
      `You paid ${payout?.fxFee ?? 0} in Wise fees at rate ${payout?.fxRate ?? 1} ` +
      `from ${payout?.sourceCurrency} to ${payout?.destinationCurrency}.`;
  }
  if (question === "card_vs_bank") {
    answer =
      "Bank withdrawal (Wise) shows mid-market FX and a transparent Wise fee—best for low FX cost. " +
      "Cards draw from your wallet for instant spend and may use network FX; choose cards for convenience, not cheapest FX.";
  }
  pushAudit("user_owner", "copilot_response", { question, referenceId, answer });
  return answer;
}
