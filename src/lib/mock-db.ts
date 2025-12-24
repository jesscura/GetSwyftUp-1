import { revalidatePath } from "next/cache";
import { z } from "zod";
import { wiseProvider } from "@/lib/wise-provider";
import {
  gateCardIssue,
  gateInvoiceSubmission,
  gateInviteContractor,
  gatePayout,
  getOnboardingState,
  updateOnboardingState,
} from "@/lib/onboarding-state";
import { sendNotification } from "@/lib/notification-service";

export type Role = "SUPER_ADMIN" | "OWNER" | "ADMIN" | "FINANCE" | "CONTRACTOR";
export type ContractorStatus = "invited" | "onboarding" | "active" | "inactive";
export type InvoiceStatus = "draft" | "submitted" | "approved" | "scheduled" | "paid" | "failed";
export type PayoutStatus = "pending" | "approved" | "paid" | "failed";
export type CardStatus = "active" | "frozen" | "closed";
export type LedgerType = "CREDIT" | "DEBIT";
export type LedgerState = "pending" | "posted" | "reversed";

type Org = {
  id: string;
  name: string;
  currency: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type Contractor = {
  id: string;
  orgId: string;
  name: string;
  email: string;
  status: ContractorStatus;
  payoutMethod: string;
  documents: { kyc: string; tax: string };
  walletId: string;
  contractActive: boolean;
  hourlyRate?: number;
  wage?: number;
  wageCurrency?: string;
};

export type Invoice = {
  id: string;
  orgId: string;
  contractorId: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  dueDate: string;
  memo?: string;
  createdAt: string;
  timeline: Array<{ label: string; at: string }>;
};

export type Wallet = {
  id: string;
  orgId: string;
  ownerType: "ORG" | "CONTRACTOR";
  ownerId: string;
  currency: string;
  balance: number;
  pending: number;
};

export type LedgerEntry = {
  id: string;
  walletId: string;
  type: LedgerType;
  amount: number;
  currency: string;
  referenceType: string;
  referenceId: string;
  status: LedgerState;
  metadata?: Record<string, unknown>;
  createdAt: string;
  memo?: string;
};

export type Payout = {
  id: string;
  orgId: string;
  contractorId: string;
  invoiceId?: string;
  amount: number;
  sourceCurrency: string;
  destinationCurrency: string;
  fxRate: number;
  fxFee: number;
  provider: "WISE";
  status: PayoutStatus;
  providerRef?: string;
  estimatedArrival?: string;
  createdAt: string;
};

export type Card = {
  id: string;
  orgId: string;
  contractorId: string;
  last4: string;
  status: CardStatus;
  provider: string;
  limits: { daily: number; monthly: number };
};

export type CardTransaction = {
  id: string;
  cardId: string;
  amount: number;
  currency: string;
  merchant: string;
  status: string;
  createdAt: string;
};

export type AuditLog = {
  id: string;
  orgId: string;
  actorUserId: string;
  action: string;
  metadata: Record<string, unknown>;
  createdAt: string;
};

export type SupportTicket = {
  id: string;
  orgId: string;
  subject: string;
  status: string;
  createdByUserId: string;
  messages: Array<{ from: string; body: string; at: string }>;
  createdAt: string;
  updatedAt: string;
};

export type Job = {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  status: "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED";
  runAt: string;
  attempts: number;
  createdAt: string;
};

export type Invite = {
  id: string;
  orgId: string;
  email: string;
  token: string;
  status: "pending" | "accepted" | "expired";
  expiresAt: string;
  role: Role;
};

export type PayoutMethod = {
  id: string;
  contractorId: string;
  provider: "WISE";
  bankCountry: string;
  currency: string;
  accountHolder: string;
  metadata: Record<string, unknown>;
  createdAt: string;
};

export type FXQuote = {
  id: string;
  provider: "WISE";
  sourceCurrency: string;
  destinationCurrency: string;
  rate: number;
  fee: number;
  expiresAt: string;
  createdAt: string;
};

export type OnboardingState = {
  id: string;
  userId: string;
  role: Role;
  step: string;
  data?: Record<string, unknown>;
  updatedAt: string;
};

type MockDatabase = {
  org: Org;
  users: User[];
  contractors: Contractor[];
  invoices: Invoice[];
  wallets: Wallet[];
  ledger: LedgerEntry[];
  payouts: Payout[];
  cards: Card[];
  cardTransactions: CardTransaction[];
  audit: AuditLog[];
  tickets: SupportTicket[];
  jobs: Job[];
  invites: Invite[];
  payoutMethods: PayoutMethod[];
  fxQuotes: FXQuote[];
  onboarding: OnboardingState[];
};

const randomId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

const randomShort = (length = 6) => randomId().replace(/-/g, "").slice(-length);

const orgName = process.env.ORG_NAME ?? "SwyftUp";
const orgCurrency = process.env.ORG_CURRENCY ?? "USD";
const ownerEmail = process.env.AUTH_EMAIL ?? "owner@example.com";
const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
const FX_CROSS_RATE = 0.98;
const FX_FEE_BPS = 0.005;
const FX_FEE_MIN = 1;

const seedData: MockDatabase = {
  org: { id: "org_swyftup", name: orgName, currency: orgCurrency },
  users: [
    ...(ownerEmail ? [{ id: "user_owner", name: "Workspace Owner", email: ownerEmail, role: "OWNER" as Role }] : []),
    ...(superAdminEmail
      ? [{ id: "user_super_admin", name: "Super Admin", email: superAdminEmail, role: "SUPER_ADMIN" as Role }]
      : []),
  ],
  contractors: [],
  invoices: [],
  wallets: [
    {
      id: "w_org",
      orgId: "org_swyftup",
      ownerType: "ORG",
      ownerId: "org_swyftup",
      currency: orgCurrency,
      balance: 0,
      pending: 0,
    },
  ],
  ledger: [],
  payouts: [],
  cards: [],
  cardTransactions: [],
  audit: [],
  tickets: [],
  jobs: [],
  invites: [],
  payoutMethods: [],
  fxQuotes: [],
  onboarding: [],
};

let db: MockDatabase = structuredClone(seedData);

export function pushAudit(actorUserId: string, action: string, metadata: Record<string, unknown>) {
  db.audit.unshift({
    id: `audit_${randomShort(8)}`,
    orgId: db.org.id,
    actorUserId,
    action,
    metadata,
    createdAt: new Date().toISOString(),
  });
}

function addLedger(
  walletId: string,
  type: LedgerType,
  amount: number,
  referenceType: string,
  referenceId: string,
  memo?: string,
  currency = "USD",
  status: LedgerState = "posted",
  metadata?: Record<string, unknown>,
) {
  const cents = Math.round(amount * 100);
  const normalizedAmount = cents / 100;
  db.ledger.unshift({
    id: `led_${randomShort(8)}`,
    walletId,
    type,
    amount: normalizedAmount,
    currency,
    referenceType,
    referenceId,
    status,
    metadata,
    createdAt: new Date().toISOString(),
    memo,
  });

  const wallet = db.wallets.find((w) => w.id === walletId);
  if (wallet) {
    const balanceCents = Math.round(wallet.balance * 100) + (type === "CREDIT" ? cents : -cents);
    wallet.balance = balanceCents / 100;
  }
}

function resolveContractStatus(
  currentStatus: ContractorStatus,
  contractActive: boolean,
  kycStatus: string,
): ContractorStatus {
  if (kycStatus !== "approved") return currentStatus;
  return contractActive ? "active" : "inactive";
}

export function getDb(): MockDatabase {
  return db;
}

export function resetDb() {
  db = structuredClone(seedData);
}

export const inviteContractorAction = async (formData: FormData) => {
  "use server";
  const gate = gateInviteContractor();
  if (!gate.allowed) {
    throw new Error(`Blocked: ${gate.blockers.join(", ")}`);
  }
  const parsed = z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
    })
    .safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
    });

  if (!parsed.success) {
    throw new Error("Invalid invite");
  }

  const contractor: Contractor = {
    id: `ctr_${randomShort(6)}`,
    orgId: db.org.id,
    name: parsed.data.name,
    email: parsed.data.email,
    status: "invited",
    payoutMethod: "Not provided",
    documents: { kyc: "pending", tax: "pending" },
    walletId: `w_${randomShort(6)}`,
    contractActive: true,
    wageCurrency: orgCurrency,
  };

  db.contractors.unshift(contractor);
  db.wallets.unshift({
    id: contractor.walletId,
    orgId: db.org.id,
    ownerType: "CONTRACTOR",
    ownerId: contractor.id,
    currency: "USD",
    balance: 0,
    pending: 0,
  });
  updateOnboardingState({ firstContractorInvited: true });
  pushAudit("user_owner", "invite_contractor", { contractorId: contractor.id });
  revalidatePath("/app/contractors");
};

export const createInvoiceAction = async (formData: FormData) => {
  "use server";
  const parsed = z
    .object({
      contractorId: z.string().min(1),
      amount: z.coerce.number().positive(),
      memo: z.string().min(1),
      dueDate: z.string(),
    })
    .safeParse({
      contractorId: formData.get("contractorId"),
      amount: formData.get("amount"),
      memo: formData.get("memo"),
      dueDate: formData.get("dueDate"),
    });

  if (!parsed.success) {
    throw new Error("Invalid invoice input");
  }
  const contractor = db.contractors.find((c) => c.id === parsed.data.contractorId);
  const gate = gateInvoiceSubmission(contractor?.status);
  if (!gate.allowed) {
    throw new Error(`Blocked: ${gate.blockers.join(", ")}`);
  }

  const invoice: Invoice = {
    id: `inv_${randomShort(6)}`,
    orgId: db.org.id,
    contractorId: parsed.data.contractorId,
    amount: parsed.data.amount,
    currency: "USD",
    status: "submitted",
    dueDate: parsed.data.dueDate,
    memo: parsed.data.memo,
    createdAt: new Date().toISOString(),
    timeline: [
      { label: "Submitted", at: new Date().toISOString() },
    ],
  };

  db.invoices.unshift(invoice);
  pushAudit("user_owner", "submit_invoice", { invoiceId: invoice.id, contractorId: invoice.contractorId });
  revalidatePath("/app/invoices");
  revalidatePath(`/app/invoices/${invoice.id}`);
};

export const approveInvoiceAction = async (invoiceId: string) => {
  "use server";
  const invoice = db.invoices.find((i) => i.id === invoiceId);
  if (!invoice) throw new Error("Invoice not found");
  invoice.status = "approved";
  invoice.timeline.push({ label: "Approved", at: new Date().toISOString() });
  pushAudit("user_owner", "approve_invoice", { invoiceId });
  sendNotification({ userId: "user_owner", event: "invoice.approved", metadata: { invoiceId } });
  revalidatePath("/app/invoices");
  revalidatePath(`/app/invoices/${invoiceId}`);
};

export const payInvoiceAction = async (invoiceId: string) => {
  "use server";
  const invoice = db.invoices.find((i) => i.id === invoiceId);
  if (!invoice) throw new Error("Invoice not found");
  if (invoice.status === "paid") return { status: "already_paid", invoiceId };

  invoice.status = "paid";
  invoice.timeline.push({ label: "Paid", at: new Date().toISOString() });

  const orgWallet = db.wallets.find((w) => w.ownerType === "ORG");
  const contractorWallet = db.wallets.find((w) => w.ownerId === invoice.contractorId);
  const providerRef = orgWallet && contractorWallet ? `pay_${randomShort(6)}` : undefined;
  const memo = "Invoice paid";

  if (orgWallet) {
    addLedger(orgWallet.id, "DEBIT", invoice.amount, "invoice_payment", invoice.id, memo, orgWallet.currency);
  }
  if (contractorWallet) {
    addLedger(
      contractorWallet.id,
      "CREDIT",
      invoice.amount,
      "invoice_payment",
      invoice.id,
      memo,
      contractorWallet.currency,
    );
  }

  if (orgWallet && contractorWallet && providerRef) {
    const sameCurrency = orgWallet.currency === contractorWallet.currency;
    const fxRate = sameCurrency ? 1 : FX_CROSS_RATE;
    const fxFee = sameCurrency ? 0 : Math.max(FX_FEE_MIN, invoice.amount * FX_FEE_BPS);

    db.payouts.unshift({
      id: providerRef,
      orgId: db.org.id,
      contractorId: invoice.contractorId,
      invoiceId: invoice.id,
      amount: invoice.amount,
      sourceCurrency: orgWallet.currency,
      destinationCurrency: contractorWallet.currency,
      fxRate,
      fxFee,
      provider: "WISE",
      status: "paid",
      providerRef,
      estimatedArrival: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });

    sendNotification({
      userId: "user_owner",
      event: "payout.completed",
      metadata: { invoiceId: invoice.id, payoutId: providerRef },
    });
  }

  pushAudit("user_owner", "pay_invoice", {
    invoiceId: invoice.id,
    contractorId: invoice.contractorId,
    payoutRecorded: Boolean(providerRef),
  });
  revalidatePath("/app/invoices");
  revalidatePath(`/app/invoices/${invoiceId}`);
  revalidatePath("/app/wallet");
  revalidatePath("/app/cards");
};

export const fundWalletAction = async (amount: number) => {
  "use server";
  addLedger("w_org", "CREDIT", amount, "funding", `fund_${randomShort(6)}`, "Mock funding");
  updateOnboardingState({ fundingSourceConnected: true });
  pushAudit("user_owner", "fund_wallet", { amount });
  revalidatePath("/app/wallet");
  revalidatePath("/app");
};

export const createPayoutAction = async (formData: FormData) => {
  "use server";
  const parsed = z
    .object({
      contractorId: z.string().min(1),
      amount: z.coerce.number().positive(),
    })
    .safeParse({
      contractorId: formData.get("contractorId"),
      amount: formData.get("amount"),
    });

  if (!parsed.success) throw new Error("Invalid payout");
  const fundingConnected = getOnboardingState().fundingSourceConnected;
  const payoutMethod = db.payoutMethods.find((pm) => pm.contractorId === parsed.data.contractorId);
  const gate = gatePayout(fundingConnected, Boolean(payoutMethod));
  if (!gate.allowed) {
    throw new Error(`Blocked: ${gate.blockers.join(", ")}`);
  }

  const payout: Payout = {
    id: `pay_${randomShort(6)}`,
    orgId: db.org.id,
    contractorId: parsed.data.contractorId,
    amount: parsed.data.amount,
    sourceCurrency: "USD",
    destinationCurrency: "USD",
    fxRate: 1,
    fxFee: 0,
    provider: "WISE",
    status: "pending",
    providerRef: `sim-${randomShort(4)}`,
    estimatedArrival: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  };

  db.payouts.unshift(payout);
  db.jobs.unshift({
    id: `job_${randomShort(6)}`,
    type: "payout_status_refresh",
    payload: { payoutId: payout.id },
    status: "QUEUED",
    runAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    attempts: 0,
    createdAt: new Date().toISOString(),
  });
  updateOnboardingState({ firstPayoutSent: true });
  pushAudit("user_owner", "create_payout", { payoutId: payout.id });
  sendNotification({ userId: "user_owner", event: "payout.scheduled", metadata: { payoutId: payout.id } });
  revalidatePath("/app/wallet");
  revalidatePath("/app");
};

export const processJobsAction = async () => {
  "use server";
  db.jobs
    .filter((job) => job.status === "QUEUED")
    .forEach((job) => {
      job.status = "RUNNING";
      job.attempts += 1;

      if (job.type === "payout_status_refresh") {
        const payoutId = job.payload.payoutId as string | undefined;
        const payout = payoutId ? db.payouts.find((p) => p.id === payoutId) : undefined;
        if (payout) {
          const providerRef = (job.payload as { providerRef?: string }).providerRef;
          payout.status = "paid";
          addLedger("w_org", "DEBIT", payout.amount, "payout", payout.id, "Payout processed", payout.sourceCurrency, "posted", {
            providerRef,
          });
          pushAudit("user_owner", "mark_payout_paid", { payoutId: payout.id, provider: payout.provider });
          sendNotification({ userId: "user_owner", event: "payout.completed", metadata: { payoutId: payout.id } });
        }
      }

      job.status = "COMPLETED";
    });

  revalidatePath("/app/wallet");
  revalidatePath("/app");
};

export const issueCardAction = async (contractorId: string) => {
  "use server";
  const contractor = db.contractors.find((c) => c.id === contractorId);
  if (!contractor) throw new Error("Contractor not found");
  const gate = gateCardIssue(contractor.status);
  if (!gate.allowed) {
    throw new Error(`Blocked: ${gate.blockers.join(", ")}`);
  }
  const wallet = db.wallets.find((w) => w.ownerId === contractorId);
  if (!wallet || wallet.balance <= 0) throw new Error("Insufficient balance to issue card");
  const card: Card = {
    id: `card_${randomShort(6)}`,
    orgId: db.org.id,
    contractorId,
    last4: randomShort(4),
    status: "active",
    provider: "Mock",
    limits: { daily: 1000, monthly: 7500 },
  };
  db.cards.unshift(card);
  pushAudit("user_owner", "issue_card", { cardId: card.id, contractorId });
  revalidatePath("/app/cards");
};

export const toggleCardStatusAction = async (cardId: string, next: CardStatus) => {
  "use server";
  const card = db.cards.find((c) => c.id === cardId);
  if (!card) throw new Error("Card not found");
  card.status = next;
  pushAudit("user_owner", "update_card_status", { cardId, status: next });
  sendNotification({ userId: "user_owner", event: "card.status_changed", metadata: { cardId, status: next } });
  revalidatePath("/app/cards");
};

export const addSupportMessageAction = async (ticketId: string, body: string) => {
  "use server";
  const ticket = db.tickets.find((t) => t.id === ticketId);
  if (!ticket) throw new Error("Ticket not found");
  ticket.messages.push({ from: "You", body, at: new Date().toISOString() });
  ticket.updatedAt = new Date().toISOString();
  revalidatePath("/app/support");
};

export const seedAction = async () => {
  "use server";
  resetDb();
  revalidatePath("/app");
  revalidatePath("/app/wallet");
  revalidatePath("/app/cards");
  revalidatePath("/app/support");
};

export const updateOrgProfileAction = async (formData: FormData) => {
  "use server";
  const parsed = z
    .object({
      name: z.string().min(2),
      country: z.string().min(2),
      website: z.string().optional(),
      teamSize: z.string(),
      payoutVolume: z.string(),
      currency: z.string().min(2),
    })
    .safeParse({
      name: formData.get("name"),
      country: formData.get("country"),
      website: formData.get("website") ?? undefined,
      teamSize: formData.get("teamSize"),
      payoutVolume: formData.get("payoutVolume"),
      currency: formData.get("currency"),
  });
  if (!parsed.success) throw new Error("Invalid org profile");
  db.org.name = parsed.data.name;
  db.org.currency = parsed.data.currency;
  updateOnboardingState({ companyProfileComplete: true });
  upsertOnboardingStep("user_owner", "OWNER", "company_setup", parsed.data);
  pushAudit("user_owner", "update_org_profile", parsed.data);
  revalidatePath("/onboarding/company/setup");
};

export const completeCompanySetupAction = async () => {
  "use server";
  upsertOnboardingStep("user_owner", "OWNER", "complete");
  revalidatePath("/app");
};

export const acceptInviteAction = async (token: string) => {
  "use server";
  const invite = db.invites.find((i) => i.token === token);
  if (!invite) throw new Error("Invalid invite");
  if (invite.status !== "pending") throw new Error("Invite already used");
  invite.status = "accepted";
  const contractor = db.contractors.find((c) => c.email === invite.email);
  if (contractor) contractor.status = "onboarding";
  db.onboarding.push({
    id: `ob_${randomShort(6)}`,
    userId: contractor?.id ?? invite.email,
    role: invite.role,
    step: "contractor_profile",
    updatedAt: new Date().toISOString(),
  });
  pushAudit("user_owner", "accept_invite", { token });
  revalidatePath(`/invite/${token}`);
};

export const upsertOnboardingStep = (userId: string, role: Role, step: string, data?: Record<string, unknown>) => {
  const existing = db.onboarding.find((o) => o.userId === userId);
  if (existing) {
    existing.step = step;
    existing.data = { ...(existing.data ?? {}), ...(data ?? {}) };
    existing.updatedAt = new Date().toISOString();
  } else {
    db.onboarding.push({
      id: `ob_${randomShort(6)}`,
      userId,
      role,
      step,
      data,
      updatedAt: new Date().toISOString(),
    });
  }
};

export const completeContractorProfileAction = async (formData: FormData) => {
  "use server";
  const parsed = z
    .object({
      contractorId: z.string(),
      legalName: z.string().min(2),
      displayName: z.string().optional(),
      phone: z.string().optional(),
      country: z.string().min(2),
      city: z.string().min(1),
    })
    .safeParse({
      contractorId: formData.get("contractorId"),
      legalName: formData.get("legalName"),
      displayName: formData.get("displayName"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      city: formData.get("city"),
    });
  if (!parsed.success) throw new Error("Invalid profile");
  const contractor = db.contractors.find((c) => c.id === parsed.data.contractorId);
  if (!contractor) throw new Error("Contractor not found");
  contractor.name = parsed.data.legalName;
  contractor.status = "onboarding";
  upsertOnboardingStep(contractor.id, "CONTRACTOR", "payout_method", parsed.data);
  revalidatePath("/onboarding/contractor/payout-method");
};

export const savePayoutMethodAction = async (formData: FormData) => {
  "use server";
  const parsed = z
    .object({
      contractorId: z.string(),
      bankCountry: z.string(),
      currency: z.string(),
      accountHolder: z.string(),
    })
    .safeParse({
      contractorId: formData.get("contractorId"),
      bankCountry: formData.get("bankCountry"),
      currency: formData.get("currency"),
      accountHolder: formData.get("accountHolder"),
    });
  if (!parsed.success) throw new Error("Invalid payout method");
  db.payoutMethods = db.payoutMethods.filter((pm) => pm.contractorId !== parsed.data.contractorId);
  db.payoutMethods.push({
    id: `pm_${randomShort(6)}`,
    contractorId: parsed.data.contractorId,
    provider: "WISE",
    bankCountry: parsed.data.bankCountry,
    currency: parsed.data.currency,
    accountHolder: parsed.data.accountHolder,
    metadata: { masked: "•••••" },
    createdAt: new Date().toISOString(),
  });
  upsertOnboardingStep(parsed.data.contractorId, "CONTRACTOR", "card");
  revalidatePath("/onboarding/contractor/card");
};

export const contractorCardDecisionAction = async (formData: FormData) => {
  "use server";
  const contractorId = String(formData.get("contractorId") ?? "");
  const choice = String(formData.get("choice") ?? "skip");
  if (!contractorId) throw new Error("Missing contractor");
  if (choice === "issue") {
    await issueCardAction(contractorId);
  }
  upsertOnboardingStep(contractorId, "CONTRACTOR", "complete");
  revalidatePath("/app/cards");
};

export const updateKycStatusAction = async (contractorId: string, status: "approved" | "rejected" | "pending") => {
  "use server";
  const contractor = db.contractors.find((c) => c.id === contractorId);
  if (!contractor) throw new Error("Contractor not found");
  contractor.documents.kyc = status;
  contractor.status = resolveContractStatus(contractor.status, contractor.contractActive, status);
  pushAudit("user_owner", "kyc_status_updated", { contractorId, status });
  revalidatePath(`/app/contractors/${contractorId}`);
  revalidatePath("/onboarding/contractor/card");
};

const optionalMoney = z
  .preprocess((value) => (value === "" || value === null ? undefined : value), z.coerce.number().nonnegative())
  .optional();

export const updateContractorContractAction = async (formData: FormData) => {
  "use server";
  const parsed = z
    .object({
      contractorId: z.string().min(1),
      contractActive: z.coerce.boolean(),
      hourlyRate: optionalMoney,
      wage: optionalMoney,
      wageCurrency: z.enum(["USD", "EUR", "GBP"]).optional(),
    })
    .safeParse({
      contractorId: formData.get("contractorId"),
      contractActive: formData.get("contractActive"),
      hourlyRate: formData.get("hourlyRate"),
      wage: formData.get("wage"),
      wageCurrency: formData.get("wageCurrency"),
    });

  if (!parsed.success) throw new Error("Invalid contract update");

  const contractor = db.contractors.find((c) => c.id === parsed.data.contractorId);
  if (!contractor) throw new Error("Contractor not found");

  contractor.contractActive = parsed.data.contractActive;
  contractor.status = resolveContractStatus(contractor.status, parsed.data.contractActive, contractor.documents.kyc);
  if (parsed.data.hourlyRate !== undefined) contractor.hourlyRate = parsed.data.hourlyRate;
  if (parsed.data.wage !== undefined) contractor.wage = parsed.data.wage;
  if (parsed.data.wageCurrency) contractor.wageCurrency = parsed.data.wageCurrency;

  pushAudit("user_owner", "update_contractor_contract", {
    contractorId: contractor.id,
    active: contractor.contractActive,
    hourlyRate: contractor.hourlyRate,
    wage: contractor.wage,
    currency: contractor.wageCurrency,
  });

  revalidatePath(`/app/contractors/${contractor.id}`);
  revalidatePath("/app/contractors");
};

export const previewWiseQuoteAction = async (formData: FormData) => {
  "use server";
  const parsed = z
    .object({
      amount: z.coerce.number().positive(),
      sourceCurrency: z.string(),
      destinationCurrency: z.string(),
    })
    .safeParse({
      amount: formData.get("amount"),
      sourceCurrency: formData.get("sourceCurrency") ?? "USD",
      destinationCurrency: formData.get("destinationCurrency"),
    });
  if (!parsed.success) throw new Error("Invalid quote request");
  const quote = await wiseProvider.getFXQuote(
    parsed.data.sourceCurrency,
    parsed.data.destinationCurrency,
    parsed.data.amount,
  );
  db.fxQuotes.unshift(quote);
  revalidatePath("/app/wallet/withdraw");
  return quote;
};

export const withdrawPayoutAction = async (formData: FormData) => {
  "use server";
  const parsed = z
    .object({
      contractorId: z.string(),
      amount: z.coerce.number().positive(),
      destinationCurrency: z.string(),
    })
    .safeParse({
      contractorId: formData.get("contractorId"),
      amount: formData.get("amount"),
      destinationCurrency: formData.get("destinationCurrency"),
    });
  if (!parsed.success) throw new Error("Invalid withdrawal");
  const contractorWallet = db.wallets.find((w) => w.ownerId === parsed.data.contractorId);
  if (!contractorWallet) throw new Error("Wallet not found");
  if (contractorWallet.balance < parsed.data.amount) throw new Error("Insufficient funds");
  const quote = await wiseProvider.getFXQuote(
    contractorWallet.currency,
    parsed.data.destinationCurrency,
    parsed.data.amount,
  );
  db.fxQuotes.unshift(quote);
  const recipient = await wiseProvider.createRecipient({ contractorId: parsed.data.contractorId, bankCountry: "US", currency: parsed.data.destinationCurrency });
  const transfer = await wiseProvider.createTransfer(`pay_${randomShort(6)}`, recipient.id, parsed.data.amount, parsed.data.destinationCurrency);

  const payout: Payout = {
    id: transfer.providerRef,
    orgId: db.org.id,
    contractorId: parsed.data.contractorId,
    amount: parsed.data.amount,
    sourceCurrency: contractorWallet.currency,
    destinationCurrency: parsed.data.destinationCurrency,
    fxRate: quote.rate,
    fxFee: quote.fee,
    provider: "WISE",
    status: "pending",
    providerRef: transfer.providerRef,
    estimatedArrival: transfer.estimatedArrival,
    createdAt: new Date().toISOString(),
  };
  db.payouts.unshift(payout);
  addLedger(contractorWallet.id, "DEBIT", parsed.data.amount, "payout", payout.id, "Withdrawal requested", contractorWallet.currency, "pending", {
    destinationCurrency: parsed.data.destinationCurrency,
    quoteId: quote.id,
    providerRef: transfer.providerRef,
  });
  db.jobs.unshift({
    id: `job_${randomShort(6)}`,
    type: "payout_status_refresh",
    payload: { payoutId: payout.id, providerRef: transfer.providerRef },
    status: "QUEUED",
    runAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    attempts: 0,
    createdAt: new Date().toISOString(),
  });
  pushAudit("user_owner", "withdraw_requested", { payoutId: payout.id, provider: "WISE" });
  revalidatePath("/app/wallet/withdraw");
  revalidatePath("/app/wallet");
};
