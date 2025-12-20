import { revalidatePath } from "next/cache";
import { z } from "zod";

export type Role = "OWNER" | "ADMIN" | "FINANCE" | "CONTRACTOR";
export type ContractorStatus = "invited" | "onboarding" | "active";
export type InvoiceStatus = "draft" | "submitted" | "approved" | "scheduled" | "paid" | "failed";
export type PayoutStatus = "pending" | "approved" | "paid" | "failed";
export type CardStatus = "active" | "frozen" | "closed";
export type LedgerType = "CREDIT" | "DEBIT";

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
  createdAt: string;
  memo?: string;
};

export type Payout = {
  id: string;
  orgId: string;
  contractorId: string;
  invoiceId?: string;
  amount: number;
  currency: string;
  status: PayoutStatus;
  providerRef?: string;
  createdAt: string;
};

export type Card = {
  id: string;
  orgId: string;
  contractorId: string;
  last4: string;
  status: CardStatus;
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
};

const randomId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const randomShort = (length = 6) => randomId().replace(/-/g, "").slice(-length);

const seedData: MockDatabase = {
  org: { id: "org_swyftup", name: "SwyftUp Capital", currency: "USD" },
  users: [
    { id: "user_owner", name: "Amelia Chen", email: "amelia@swyftup.com", role: "OWNER" },
    { id: "user_finance", name: "Leo Martins", email: "leo@swyftup.com", role: "FINANCE" },
    { id: "user_contractor", name: "Diego Alvarez", email: "diego@craftlatam.co", role: "CONTRACTOR" },
  ],
  contractors: [
    {
      id: "ctr_diego",
      orgId: "org_swyftup",
      name: "Diego Alvarez",
      email: "diego@craftlatam.co",
      status: "active",
      payoutMethod: "Wise •••• 9210",
      documents: { kyc: "verified", tax: "submitted" },
      walletId: "w_ctr_diego",
    },
    {
      id: "ctr_mina",
      orgId: "org_swyftup",
      name: "Mina Patel",
      email: "mina@buildbetter.dev",
      status: "onboarding",
      payoutMethod: "ACH •••• 1021",
      documents: { kyc: "pending", tax: "missing" },
      walletId: "w_ctr_mina",
    },
    {
      id: "ctr_sven",
      orgId: "org_swyftup",
      name: "Sven Nyberg",
      email: "sven@northdesign.se",
      status: "invited",
      payoutMethod: "IBAN •••• 7723",
      documents: { kyc: "pending", tax: "pending" },
      walletId: "w_ctr_sven",
    },
  ],
  invoices: [
    {
      id: "inv_101",
      orgId: "org_swyftup",
      contractorId: "ctr_diego",
      amount: 18250,
      currency: "USD",
      status: "approved",
      dueDate: "2025-12-28",
      memo: "Platform migration sprint",
      createdAt: "2025-12-10T15:00:00Z",
      timeline: [
        { label: "Submitted", at: "2025-12-10T15:00:00Z" },
        { label: "Approved", at: "2025-12-12T18:00:00Z" },
      ],
    },
    {
      id: "inv_102",
      orgId: "org_swyftup",
      contractorId: "ctr_mina",
      amount: 9400,
      currency: "USD",
      status: "submitted",
      dueDate: "2025-12-24",
      memo: "Design systems revamp",
      createdAt: "2025-12-11T12:00:00Z",
      timeline: [{ label: "Submitted", at: "2025-12-11T12:00:00Z" }],
    },
    {
      id: "inv_103",
      orgId: "org_swyftup",
      contractorId: "ctr_sven",
      amount: 4200,
      currency: "USD",
      status: "draft",
      dueDate: "2025-12-30",
      memo: "Product illustrations",
      createdAt: "2025-12-14T09:00:00Z",
      timeline: [{ label: "Drafted", at: "2025-12-14T09:00:00Z" }],
    },
  ],
  wallets: [
    {
      id: "w_org",
      orgId: "org_swyftup",
      ownerType: "ORG",
      ownerId: "org_swyftup",
      currency: "USD",
      balance: 482000,
      pending: 8800,
    },
    {
      id: "w_ctr_diego",
      orgId: "org_swyftup",
      ownerType: "CONTRACTOR",
      ownerId: "ctr_diego",
      currency: "USD",
      balance: 3200,
      pending: 0,
    },
    {
      id: "w_ctr_mina",
      orgId: "org_swyftup",
      ownerType: "CONTRACTOR",
      ownerId: "ctr_mina",
      currency: "USD",
      balance: 0,
      pending: 0,
    },
  ],
  ledger: [
    {
      id: "led_1",
      walletId: "w_org",
      type: "CREDIT",
      amount: 500000,
      currency: "USD",
      referenceType: "funding",
      referenceId: "fund_1",
      createdAt: "2025-12-05T10:00:00Z",
      memo: "Initial treasury load",
    },
    {
      id: "led_2",
      walletId: "w_org",
      type: "DEBIT",
      amount: 18000,
      currency: "USD",
      referenceType: "payout",
      referenceId: "pay_1",
      createdAt: "2025-12-11T08:00:00Z",
      memo: "Payout to Diego",
    },
    {
      id: "led_3",
      walletId: "w_ctr_diego",
      type: "CREDIT",
      amount: 3200,
      currency: "USD",
      referenceType: "payout",
      referenceId: "pay_1",
      createdAt: "2025-12-11T08:05:00Z",
      memo: "Wallet top up",
    },
  ],
  payouts: [
    {
      id: "pay_1",
      orgId: "org_swyftup",
      contractorId: "ctr_diego",
      invoiceId: "inv_101",
      amount: 18000,
      currency: "USD",
      status: "paid",
      providerRef: "sim-2881",
      createdAt: "2025-12-11T08:00:00Z",
    },
    {
      id: "pay_2",
      orgId: "org_swyftup",
      contractorId: "ctr_mina",
      amount: 5000,
      currency: "USD",
      status: "pending",
      providerRef: "sim-2882",
      createdAt: "2025-12-14T06:00:00Z",
    },
  ],
  cards: [
    {
      id: "card_1",
      orgId: "org_swyftup",
      contractorId: "ctr_diego",
      last4: "9921",
      status: "active",
      limits: { daily: 1500, monthly: 10000 },
    },
    {
      id: "card_2",
      orgId: "org_swyftup",
      contractorId: "ctr_mina",
      last4: "4114",
      status: "frozen",
      limits: { daily: 800, monthly: 5000 },
    },
  ],
  cardTransactions: [
    {
      id: "ct_1",
      cardId: "card_1",
      amount: 220.5,
      currency: "USD",
      merchant: "Atlassian",
      status: "cleared",
      createdAt: "2025-12-13T10:00:00Z",
    },
    {
      id: "ct_2",
      cardId: "card_1",
      amount: 68.2,
      currency: "USD",
      merchant: "Figma",
      status: "pending",
      createdAt: "2025-12-14T11:00:00Z",
    },
  ],
  audit: [
    {
      id: "audit_1",
      orgId: "org_swyftup",
      actorUserId: "user_owner",
      action: "invite_contractor",
      metadata: { email: "sven@northdesign.se" },
      createdAt: "2025-12-10T09:00:00Z",
    },
    {
      id: "audit_2",
      orgId: "org_swyftup",
      actorUserId: "user_finance",
      action: "approve_invoice",
      metadata: { invoiceId: "inv_101", amount: 18250 },
      createdAt: "2025-12-12T18:05:00Z",
    },
  ],
  tickets: [
    {
      id: "t_1",
      orgId: "org_swyftup",
      subject: "Update payout rail for Mexico",
      status: "open",
      createdByUserId: "user_finance",
      createdAt: "2025-12-13T13:00:00Z",
      updatedAt: "2025-12-13T14:00:00Z",
      messages: [
        { from: "Leo Martins", body: "Need to add new CLABE destination", at: "2025-12-13T13:00:00Z" },
        { from: "Support", body: "Adding for review, will confirm within the hour.", at: "2025-12-13T13:45:00Z" },
      ],
    },
    {
      id: "t_2",
      orgId: "org_swyftup",
      subject: "Webhook retries spiking",
      status: "investigating",
      createdByUserId: "user_owner",
      createdAt: "2025-12-12T11:00:00Z",
      updatedAt: "2025-12-12T12:00:00Z",
      messages: [{ from: "Ops", body: "Investigating elevated 500s on webhook endpoint.", at: "2025-12-12T11:30:00Z" }],
    },
  ],
  jobs: [
    {
      id: "job_1",
      type: "payout_status_refresh",
      payload: { providerRef: "sim-2882" },
      status: "QUEUED",
      runAt: "2025-12-20T06:30:00Z",
      attempts: 0,
      createdAt: "2025-12-14T06:00:00Z",
    },
  ],
};

let db: MockDatabase = structuredClone(seedData);

function pushAudit(actorUserId: string, action: string, metadata: Record<string, unknown>) {
  db.audit.unshift({
    id: `audit_${randomShort(8)}`,
    orgId: db.org.id,
    actorUserId,
    action,
    metadata,
    createdAt: new Date().toISOString(),
  });
}

function addLedger(walletId: string, type: LedgerType, amount: number, referenceType: string, referenceId: string, memo?: string) {
  const cents = Math.round(amount * 100);
  const normalizedAmount = cents / 100;
  db.ledger.unshift({
    id: `led_${randomShort(8)}`,
    walletId,
    type,
    amount: normalizedAmount,
    currency: "USD",
    referenceType,
    referenceId,
    createdAt: new Date().toISOString(),
    memo,
  });

  const wallet = db.wallets.find((w) => w.id === walletId);
  if (wallet) {
    const balanceCents = Math.round(wallet.balance * 100) + (type === "CREDIT" ? cents : -cents);
    wallet.balance = balanceCents / 100;
  }
}

export function getDb(): MockDatabase {
  return db;
}

export function resetDb() {
  db = structuredClone(seedData);
}

export const inviteContractorAction = async (formData: FormData) => {
  "use server";
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
  pushAudit("user_finance", "submit_invoice", { invoiceId: invoice.id, contractorId: invoice.contractorId });
  revalidatePath("/app/invoices");
  revalidatePath(`/app/invoices/${invoice.id}`);
};

export const approveInvoiceAction = async (invoiceId: string) => {
  "use server";
  const invoice = db.invoices.find((i) => i.id === invoiceId);
  if (!invoice) throw new Error("Invoice not found");
  invoice.status = "approved";
  invoice.timeline.push({ label: "Approved", at: new Date().toISOString() });
  pushAudit("user_finance", "approve_invoice", { invoiceId });
  revalidatePath("/app/invoices");
  revalidatePath(`/app/invoices/${invoiceId}`);
};

export const fundWalletAction = async (amount: number) => {
  "use server";
  addLedger("w_org", "CREDIT", amount, "funding", `fund_${randomShort(6)}`, "Mock funding");
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

  const payout: Payout = {
    id: `pay_${randomShort(6)}`,
    orgId: db.org.id,
    contractorId: parsed.data.contractorId,
    amount: parsed.data.amount,
    currency: "USD",
    status: "pending",
    providerRef: `sim-${randomShort(4)}`,
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
  pushAudit("user_finance", "create_payout", { payoutId: payout.id });
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
          payout.status = "paid";
          addLedger("w_org", "DEBIT", payout.amount, "payout", payout.id, "Payout processed");
          const contractorWallet = db.contractors.find((c) => c.id === payout.contractorId)?.walletId;
          if (contractorWallet) {
            addLedger(contractorWallet, "CREDIT", payout.amount, "payout", payout.id, "Contractor credited");
          }
          pushAudit("user_finance", "mark_payout_paid", { payoutId: payout.id });
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
  const card: Card = {
    id: `card_${randomShort(6)}`,
    orgId: db.org.id,
    contractorId,
    last4: randomShort(4),
    status: "active",
    limits: { daily: 1000, monthly: 7500 },
  };
  db.cards.unshift(card);
  pushAudit("user_finance", "issue_card", { cardId: card.id, contractorId });
  revalidatePath("/app/cards");
};

export const toggleCardStatusAction = async (cardId: string, next: CardStatus) => {
  "use server";
  const card = db.cards.find((c) => c.id === cardId);
  if (!card) throw new Error("Card not found");
  card.status = next;
  pushAudit("user_finance", "update_card_status", { cardId, status: next });
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
