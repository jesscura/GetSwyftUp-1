export type OnboardingChecklistState = {
  companyProfileComplete: boolean;
  fundingSourceConnected: boolean;
  firstContractorInvited: boolean;
  approvalRulesSet: boolean;
  firstPayoutSent: boolean;
  require2FAForAdmins: boolean;
};

let onboardingState: OnboardingChecklistState = {
  companyProfileComplete: false,
  fundingSourceConnected: false,
  firstContractorInvited: false,
  approvalRulesSet: false,
  firstPayoutSent: false,
  require2FAForAdmins: true,
};

export function getOnboardingState(): OnboardingChecklistState {
  return onboardingState;
}

export function updateOnboardingState(patch: Partial<OnboardingChecklistState>) {
  onboardingState = { ...onboardingState, ...patch };
  return onboardingState;
}

export type GateResult = { allowed: boolean; blockers: string[] };

export function gateInviteContractor(): GateResult {
  const blockers: string[] = [];
  if (!onboardingState.companyProfileComplete) blockers.push("Complete company profile");
  return { allowed: blockers.length === 0, blockers };
}

export function gateInvoiceSubmission(contractorStatus?: string): GateResult {
  const blockers: string[] = [];
  if (contractorStatus && contractorStatus !== "active") {
    blockers.push("Contractor must be active");
  }
  return { allowed: blockers.length === 0, blockers };
}

export function gatePayout(fundingConnected: boolean, hasPayoutMethod: boolean): GateResult {
  const blockers: string[] = [];
  if (!onboardingState.fundingSourceConnected || !fundingConnected) {
    blockers.push("Connect funding source");
  }
  if (!hasPayoutMethod) {
    blockers.push("Add payout method for contractor");
  }
  return { allowed: blockers.length === 0, blockers };
}

export function gateCardIssue(contractorStatus?: string): GateResult {
  const blockers: string[] = [];
  if (contractorStatus && contractorStatus !== "active") {
    blockers.push("Contractor must be active");
  }
  return { allowed: blockers.length === 0, blockers };
}

export function markChecklistKey(key: string) {
  if (key === "company") updateOnboardingState({ companyProfileComplete: true });
  if (key === "funding") updateOnboardingState({ fundingSourceConnected: true });
  if (key === "contractor") updateOnboardingState({ firstContractorInvited: true });
  if (key === "rules") updateOnboardingState({ approvalRulesSet: true });
  if (key === "payout") updateOnboardingState({ firstPayoutSent: true });
}
