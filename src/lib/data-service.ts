import { Prisma, type Role as PrismaRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
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

export type Role = "SUPER_ADMIN" | "OWNER" | "FINANCE_ADMIN" | "CONTRACTOR";
export type ContractorStatus = "invited" | "onboarding" | "active" | "inactive";
export type InvoiceStatus = "draft" | "submitted" | "approved" | "scheduled" | "paid" | "failed";
export type PayoutStatus = "pending" | "processing" | "paid" | "failed";
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

export type DbSnapshot = {
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

const asNumber = (value: Prisma.Decimal | number | null | undefined) => {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  return value.toNumber();
};

const toIso = (value: Date | null | undefined) => (value ? value.toISOString() : undefined);

const toDateOnly = (value: Date) => value.toISOString().slice(0, 10);

const normalizeAmount = (amount: number) => Math.round(amount * 100) / 100;

const mapRole = (role: PrismaRole): Role => role as Role;

const mapInvoiceStatus = (status: string) => status.toLowerCase() as InvoiceStatus;
const mapPayoutStatus = (status: string) => status.toLowerCase() as PayoutStatus;
const mapCardStatus = (status: string) => status.toLowerCase() as CardStatus;
const mapLedgerStatus = (status: string) => status.toLowerCase() as LedgerState;

async function ensureOrg() {
  const existing = await prisma.organization.findFirst();
  if (existing) {
    if (!existing.currency) {
      return prisma.organization.update({
        where: { id: existing.id },
        data: { currency: orgCurrency },
      });
    }
    return existing;
  }
  return prisma.organization.create({
    data: { name: orgName, currency: orgCurrency },
  });
}

async function ensureUser(email: string, name: string, id?: string) {
  return prisma.user.upsert({
    where: { email },
    update: { name },
    create: id ? { id, email, name } : { email, name },
  });
}

async function ensureMembership(orgId: string, userId: string, role: Role) {
  return prisma.membership.upsert({
    where: { userId_orgId: { userId, orgId } },
    update: { role: role as PrismaRole },
    create: { orgId, userId, role: role as PrismaRole },
  });
}

async function ensureOrgWallet(orgId: string, currency: string) {
  const existing = await prisma.walletAccount.findFirst({
    where: { orgId, ownerType: "ORG", ownerId: orgId },
  });
  if (existing) return existing;
  return prisma.walletAccount.create({
    data: {
      id: `w_org_${randomShort(6)}`,
      orgId,
      ownerType: "ORG",
      ownerId: orgId,
      currency,
      balanceCached: new Prisma.Decimal(0),
    },
  });
}

async function ensureBaseData() {
  const org = await ensureOrg();
  const owner = await ensureUser(ownerEmail, "Workspace Owner", "user_owner");
  await ensureMembership(org.id, owner.id, "OWNER");
  if (superAdminEmail) {
    const superAdmin = await ensureUser(superAdminEmail, "Super Admin", "user_super_admin");
    await ensureMembership(org.id, superAdmin.id, "SUPER_ADMIN");
  }
  await ensureOrgWallet(org.id, org.currency);
  return { org, owner };
}

function resolveContractStatus(
  currentStatus: ContractorStatus,
  contractActive: boolean,
  kycStatus: string,
): ContractorStatus {
  if (kycStatus !== "approved") return currentStatus;
  return contractActive ? "active" : "inactive";
}

async function addLedger(
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
  const normalizedAmount = normalizeAmount(amount);
  const decimalAmount = new Prisma.Decimal(normalizedAmount);

  await prisma.$transaction(async (tx) => {
    await tx.ledgerEntry.create({
      data: {
        id: `led_${randomShort(8)}`,
        walletId,
        type,
        amount: decimalAmount,
        currency,
        referenceType,
        referenceId,
        status: status.toUpperCase() as "PENDING" | "POSTED" | "REVERSED",
        metadataJson: metadata ?? {},
        memo,
      },
    });

    await tx.walletAccount.update({
      where: { id: walletId },
      data: type === "CREDIT"
        ? { balanceCached: { increment: decimalAmount } }
        : { balanceCached: { decrement: decimalAmount } },
    });
  });
}

export async function pushAudit(actorUserId: string, action: string, metadata: Record<string, unknown>) {
  const { org } = await ensureBaseData();
  await prisma.auditLog.create({
    data: {
      orgId: org.id,
      actorUserId,
      action,
      metadataJson: metadata,
    },
  });
}

export async function getDb(): Promise<DbSnapshot> {
  const { org } = await ensureBaseData();

  const [
    memberships,
    contractors,
    invoices,
    wallets,
    ledgerEntries,
    payouts,
    cards,
    cardTransactions,
    auditLogs,
    tickets,
    jobs,
    invites,
    payoutMethods,
    fxQuotes,
    onboardingStates,
  ] = await Promise.all([
    prisma.membership.findMany({ where: { orgId: org.id }, include: { user: true } }),
    prisma.contractorProfile.findMany({ where: { orgId: org.id } }),
    prisma.invoice.findMany({ where: { orgId: org.id }, orderBy: { createdAt: "desc" } }),
    prisma.walletAccount.findMany({ where: { orgId: org.id } }),
    prisma.ledgerEntry.findMany({
      where: { wallet: { orgId: org.id } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.payout.findMany({ where: { orgId: org.id }, orderBy: { createdAt: "desc" } }),
    prisma.card.findMany({ where: { orgId: org.id }, orderBy: { createdAt: "desc" } }),
    prisma.cardTransaction.findMany({
      where: { card: { orgId: org.id } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.auditLog.findMany({ where: { orgId: org.id }, orderBy: { createdAt: "desc" } }),
    prisma.supportTicket.findMany({ where: { orgId: org.id }, orderBy: { updatedAt: "desc" } }),
    prisma.job.findMany({ orderBy: { runAt: "desc" } }),
    prisma.invite.findMany({ where: { orgId: org.id }, orderBy: { createdAt: "desc" } }),
    prisma.payoutMethod.findMany({
      where: { contractor: { orgId: org.id } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.fXQuote.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.onboardingState.findMany({ orderBy: { updatedAt: "desc" } }),
  ]);

  const payoutMethodByContractor = new Map<string, { provider: string; currency: string }>();
  payoutMethods.forEach((method) => {
    if (!payoutMethodByContractor.has(method.contractorId)) {
      payoutMethodByContractor.set(method.contractorId, { provider: method.provider, currency: method.currency });
    }
  });

  const pendingByWallet = new Map<string, number>();
  ledgerEntries.forEach((entry) => {
    if (entry.status !== "PENDING") return;
    const amount = asNumber(entry.amount);
    const delta = entry.type === "DEBIT" ? amount : -amount;
    pendingByWallet.set(entry.walletId, (pendingByWallet.get(entry.walletId) ?? 0) + delta);
  });

  const users: User[] = memberships.map((membership) => ({
    id: membership.user.id,
    name: membership.user.name ?? membership.user.email,
    email: membership.user.email,
    role: mapRole(membership.role),
  }));

  const contractorsMapped: Contractor[] = contractors.map((contractor) => {
    const payout = payoutMethodByContractor.get(contractor.id);
    const payoutLabel = payout ? `${payout.provider} • ${payout.currency}` : "Not provided";
    const status = (contractor.status || "invited").toLowerCase() as ContractorStatus;
    return {
      id: contractor.id,
      orgId: contractor.orgId,
      name: contractor.name ?? contractor.email,
      email: contractor.email,
      status,
      payoutMethod: payoutLabel,
      documents: {
        kyc: contractor.kycStatus ?? "pending",
        tax: contractor.taxStatus ?? "pending",
      },
      walletId: contractor.walletId ?? "",
      contractActive: contractor.contractActive ?? true,
      hourlyRate: contractor.hourlyRate ? asNumber(contractor.hourlyRate) : undefined,
      wage: contractor.wage ? asNumber(contractor.wage) : undefined,
      wageCurrency: contractor.wageCurrency ?? undefined,
    };
  });

  const invoicesMapped: Invoice[] = invoices.map((invoice) => ({
    id: invoice.id,
    orgId: invoice.orgId,
    contractorId: invoice.contractorId,
    amount: asNumber(invoice.amount),
    currency: invoice.currency,
    status: mapInvoiceStatus(invoice.status),
    dueDate: toDateOnly(invoice.dueDate),
    memo: invoice.memo ?? undefined,
    createdAt: invoice.createdAt.toISOString(),
    timeline: Array.isArray(invoice.timelineJson)
      ? (invoice.timelineJson as Array<{ label: string; at: string }>)
      : [],
  }));

  const walletsMapped: Wallet[] = wallets.map((wallet) => ({
    id: wallet.id,
    orgId: wallet.orgId,
    ownerType: wallet.ownerType,
    ownerId: wallet.ownerId,
    currency: wallet.currency,
    balance: asNumber(wallet.balanceCached),
    pending: pendingByWallet.get(wallet.id) ?? 0,
  }));

  const ledgerMapped: LedgerEntry[] = ledgerEntries.map((entry) => ({
    id: entry.id,
    walletId: entry.walletId,
    type: entry.type,
    amount: asNumber(entry.amount),
    currency: entry.currency,
    referenceType: entry.referenceType,
    referenceId: entry.referenceId,
    status: mapLedgerStatus(entry.status),
    metadata: (entry.metadataJson as Record<string, unknown>) ?? undefined,
    createdAt: entry.createdAt.toISOString(),
    memo: entry.memo ?? undefined,
  }));

  const payoutsMapped: Payout[] = payouts.map((payout) => ({
    id: payout.id,
    orgId: payout.orgId,
    contractorId: payout.contractorId,
    invoiceId: payout.invoiceId ?? undefined,
    amount: asNumber(payout.amount),
    sourceCurrency: payout.sourceCurrency,
    destinationCurrency: payout.destinationCurrency,
    fxRate: asNumber(payout.fxRate),
    fxFee: asNumber(payout.fxFee),
    provider: "WISE",
    status: mapPayoutStatus(payout.status),
    providerRef: payout.providerRef ?? undefined,
    estimatedArrival: toIso(payout.estimatedArrival),
    createdAt: payout.createdAt.toISOString(),
  }));

  const cardsMapped: Card[] = cards.map((card) => ({
    id: card.id,
    orgId: card.orgId,
    contractorId: card.contractorId,
    last4: card.last4,
    status: mapCardStatus(card.status),
    provider: card.provider,
    limits: (card.limitsJson as { daily: number; monthly: number }) ?? { daily: 1000, monthly: 7500 },
  }));

  const cardTransactionsMapped: CardTransaction[] = cardTransactions.map((tx) => ({
    id: tx.id,
    cardId: tx.cardId,
    amount: asNumber(tx.amount),
    currency: tx.currency,
    merchant: tx.merchant,
    status: tx.status,
    createdAt: tx.createdAt.toISOString(),
  }));

  const auditMapped: AuditLog[] = auditLogs.map((log) => ({
    id: log.id,
    orgId: log.orgId,
    actorUserId: log.actorUserId,
    action: log.action,
    metadata: (log.metadataJson as Record<string, unknown>) ?? {},
    createdAt: log.createdAt.toISOString(),
  }));

  const ticketsMapped: SupportTicket[] = tickets.map((ticket) => ({
    id: ticket.id,
    orgId: ticket.orgId,
    subject: ticket.subject,
    status: ticket.status,
    createdByUserId: ticket.createdByUserId,
    messages: (ticket.messagesJson as Array<{ from: string; body: string; at: string }>) ?? [],
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
  }));

  const jobsMapped: Job[] = jobs.map((job) => ({
    id: job.id,
    type: job.type,
    payload: (job.payload as Record<string, unknown>) ?? {},
    status: job.status,
    runAt: job.runAt.toISOString(),
    attempts: job.attempts,
    createdAt: job.createdAt.toISOString(),
  }));

  const invitesMapped: Invite[] = invites.map((invite) => ({
    id: invite.id,
    orgId: invite.orgId,
    email: invite.email,
    token: invite.token,
    status: invite.status as Invite["status"],
    expiresAt: invite.expiresAt.toISOString(),
    role: mapRole(invite.role),
  }));

  const payoutMethodsMapped: PayoutMethod[] = payoutMethods.map((method) => ({
    id: method.id,
    contractorId: method.contractorId,
    provider: "WISE",
    bankCountry: method.bankCountry,
    currency: method.currency,
    accountHolder: method.accountHolder,
    metadata: (method.metadataJson as Record<string, unknown>) ?? {},
    createdAt: method.createdAt.toISOString(),
  }));

  const fxQuotesMapped: FXQuote[] = fxQuotes.map((quote) => ({
    id: quote.id,
    provider: "WISE",
    sourceCurrency: quote.sourceCurrency,
    destinationCurrency: quote.destinationCurrency,
    rate: asNumber(quote.rate),
    fee: asNumber(quote.fee),
    expiresAt: quote.expiresAt.toISOString(),
    createdAt: quote.createdAt.toISOString(),
  }));

  const onboardingMapped: OnboardingState[] = onboardingStates.map((state) => ({
    id: state.id,
    userId: state.userId,
    role: mapRole(state.role),
    step: state.step,
    data: (state.data as Record<string, unknown>) ?? undefined,
    updatedAt: state.updatedAt.toISOString(),
  }));

  return {
    org: { id: org.id, name: org.name, currency: org.currency },
    users,
    contractors: contractorsMapped,
    invoices: invoicesMapped,
    wallets: walletsMapped,
    ledger: ledgerMapped,
    payouts: payoutsMapped,
    cards: cardsMapped,
    cardTransactions: cardTransactionsMapped,
    audit: auditMapped,
    tickets: ticketsMapped,
    jobs: jobsMapped,
    invites: invitesMapped,
    payoutMethods: payoutMethodsMapped,
    fxQuotes: fxQuotesMapped,
    onboarding: onboardingMapped,
  };
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

  const { org, owner } = await ensureBaseData();

  const existingContractor = await prisma.contractorProfile.findFirst({
    where: { orgId: org.id, email: parsed.data.email },
  });
  if (existingContractor) {
    throw new Error("Contractor already exists");
  }

  const contractorUser = await ensureUser(parsed.data.email, parsed.data.name);
  const contractorId = `ctr_${randomShort(6)}`;
  const walletId = `w_${randomShort(6)}`;

  await prisma.$transaction(async (tx) => {
    await tx.contractorProfile.create({
      data: {
        id: contractorId,
        orgId: org.id,
        userId: contractorUser.id,
        email: parsed.data.email,
        name: parsed.data.name,
        status: "invited",
        contractActive: true,
        kycStatus: "pending",
        taxStatus: "pending",
        wageCurrency: org.currency,
        walletId,
      },
    });

    await tx.walletAccount.create({
      data: {
        id: walletId,
        orgId: org.id,
        ownerType: "CONTRACTOR",
        ownerId: contractorId,
        currency: org.currency,
        balanceCached: new Prisma.Decimal(0),
      },
    });

    await tx.invite.create({
      data: {
        id: `inv_${randomShort(8)}`,
        orgId: org.id,
        email: parsed.data.email,
        token: `token_${randomShort(12)}`,
        status: "pending",
        role: "CONTRACTOR",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  });

  updateOnboardingState({ firstContractorInvited: true });
  await pushAudit(owner.id, "invite_contractor", { contractorId });
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

  const { org, owner } = await ensureBaseData();
  const contractor = await prisma.contractorProfile.findUnique({
    where: { id: parsed.data.contractorId },
  });
  const gate = gateInvoiceSubmission(contractor?.status);
  if (!gate.allowed) {
    throw new Error(`Blocked: ${gate.blockers.join(", ")}`);
  }

  const invoiceId = `inv_${randomShort(6)}`;
  const timeline = [{ label: "Submitted", at: new Date().toISOString() }];

  await prisma.invoice.create({
    data: {
      id: invoiceId,
      orgId: org.id,
      contractorId: parsed.data.contractorId,
      amount: new Prisma.Decimal(parsed.data.amount),
      currency: "USD",
      status: "SUBMITTED",
      dueDate: new Date(parsed.data.dueDate),
      memo: parsed.data.memo,
      timelineJson: timeline,
    },
  });

  await pushAudit(owner.id, "submit_invoice", { invoiceId, contractorId: parsed.data.contractorId });
  revalidatePath("/app/invoices");
  revalidatePath(`/app/invoices/${invoiceId}`);
};

export const approveInvoiceAction = async (invoiceId: string) => {
  "use server";
  const { owner } = await ensureBaseData();
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) throw new Error("Invoice not found");

  const timeline = Array.isArray(invoice.timelineJson)
    ? [
        ...(invoice.timelineJson as Array<{ label: string; at: string }>),
        { label: "Approved", at: new Date().toISOString() },
      ]
    : [{ label: "Approved", at: new Date().toISOString() }];

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { status: "APPROVED", timelineJson: timeline },
  });

  await pushAudit(owner.id, "approve_invoice", { invoiceId });
  await sendNotification({ userId: owner.id, event: "invoice.approved", metadata: { invoiceId } });
  revalidatePath("/app/invoices");
  revalidatePath(`/app/invoices/${invoiceId}`);
};

export const payInvoiceAction = async (invoiceId: string) => {
  "use server";
  const { org, owner } = await ensureBaseData();
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) throw new Error("Invoice not found");
  if (invoice.status === "PAID") return { status: "already_paid", invoiceId };

  const timeline = Array.isArray(invoice.timelineJson)
    ? [
        ...(invoice.timelineJson as Array<{ label: string; at: string }>),
        { label: "Paid", at: new Date().toISOString() },
      ]
    : [{ label: "Paid", at: new Date().toISOString() }];

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { status: "PAID", timelineJson: timeline },
  });

  const orgWallet = await prisma.walletAccount.findFirst({
    where: { orgId: org.id, ownerType: "ORG", ownerId: org.id },
  });
  const contractorWallet = await prisma.walletAccount.findFirst({
    where: { ownerType: "CONTRACTOR", ownerId: invoice.contractorId },
  });
  const providerRef = orgWallet && contractorWallet ? `pay_${randomShort(6)}` : undefined;
  const memo = "Invoice paid";
  const amount = asNumber(invoice.amount);

  if (orgWallet) {
    await addLedger(orgWallet.id, "DEBIT", amount, "invoice_payment", invoice.id, memo, orgWallet.currency);
  }
  if (contractorWallet) {
    await addLedger(
      contractorWallet.id,
      "CREDIT",
      amount,
      "invoice_payment",
      invoice.id,
      memo,
      contractorWallet.currency,
    );
  }

  if (orgWallet && contractorWallet && providerRef) {
    const sameCurrency = orgWallet.currency === contractorWallet.currency;
    const fxRate = sameCurrency ? 1 : FX_CROSS_RATE;
    const fxFee = sameCurrency ? 0 : Math.max(FX_FEE_MIN, amount * FX_FEE_BPS);

    await prisma.payout.create({
      data: {
        id: providerRef,
        orgId: org.id,
        contractorId: invoice.contractorId,
        invoiceId: invoice.id,
        amount: new Prisma.Decimal(amount),
        sourceCurrency: orgWallet.currency,
        destinationCurrency: contractorWallet.currency,
        fxRate: new Prisma.Decimal(fxRate),
        fxFee: new Prisma.Decimal(fxFee),
        provider: "WISE",
        status: "PAID",
        providerRef,
        estimatedArrival: new Date(),
      },
    });

    await sendNotification({
      userId: owner.id,
      event: "payout.completed",
      metadata: { invoiceId: invoice.id, payoutId: providerRef },
    });
  }

  await pushAudit(owner.id, "pay_invoice", {
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
  const { org, owner } = await ensureBaseData();
  const orgWallet = await ensureOrgWallet(org.id, org.currency);
  await addLedger(orgWallet.id, "CREDIT", amount, "funding", `fund_${randomShort(6)}`, "Wallet funding", orgWallet.currency);
  updateOnboardingState({ fundingSourceConnected: true });
  await pushAudit(owner.id, "fund_wallet", { amount });
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

  const { org, owner } = await ensureBaseData();
  const payoutMethod = await prisma.payoutMethod.findFirst({
    where: { contractorId: parsed.data.contractorId },
  });
  const gate = gatePayout(fundingConnected, Boolean(payoutMethod));
  if (!gate.allowed) {
    throw new Error(`Blocked: ${gate.blockers.join(", ")}`);
  }

  const payoutId = `pay_${randomShort(6)}`;
  const providerRef = `sim-${randomShort(4)}`;

  await prisma.$transaction(async (tx) => {
    await tx.payout.create({
      data: {
        id: payoutId,
        orgId: org.id,
        contractorId: parsed.data.contractorId,
        amount: new Prisma.Decimal(parsed.data.amount),
        sourceCurrency: "USD",
        destinationCurrency: "USD",
        fxRate: new Prisma.Decimal(1),
        fxFee: new Prisma.Decimal(0),
        provider: "WISE",
        status: "PENDING",
        providerRef,
        estimatedArrival: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    await tx.job.create({
      data: {
        id: `job_${randomShort(6)}`,
        type: "payout_status_refresh",
        payload: { payoutId },
        status: "QUEUED",
        runAt: new Date(Date.now() + 5 * 60 * 1000),
        attempts: 0,
      },
    });
  });

  updateOnboardingState({ firstPayoutSent: true });
  await pushAudit(owner.id, "create_payout", { payoutId });
  await sendNotification({ userId: owner.id, event: "payout.scheduled", metadata: { payoutId } });
  revalidatePath("/app/wallet");
  revalidatePath("/app");
};

export const processJobsAction = async () => {
  "use server";
  const { org, owner } = await ensureBaseData();
  const jobs = await prisma.job.findMany({ where: { status: "QUEUED" }, orderBy: { runAt: "asc" } });

  for (const job of jobs) {
    await prisma.job.update({
      where: { id: job.id },
      data: { status: "RUNNING", attempts: { increment: 1 } },
    });

    if (job.type === "payout_status_refresh") {
      const payload = job.payload as { payoutId?: string; providerRef?: string } | null;
      const payoutId = payload?.payoutId;
      if (payoutId) {
        const payout = await prisma.payout.findUnique({ where: { id: payoutId } });
        if (payout) {
          await prisma.payout.update({
            where: { id: payout.id },
            data: { status: "PAID" },
          });
          const orgWallet = await ensureOrgWallet(org.id, org.currency);
          await addLedger(
            orgWallet.id,
            "DEBIT",
            asNumber(payout.amount),
            "payout",
            payout.id,
            "Payout processed",
            payout.sourceCurrency,
            "posted",
            { providerRef: payload?.providerRef },
          );
          await pushAudit(owner.id, "mark_payout_paid", { payoutId: payout.id, provider: payout.provider });
          await sendNotification({ userId: owner.id, event: "payout.completed", metadata: { payoutId: payout.id } });
        }
      }
    }

    await prisma.job.update({
      where: { id: job.id },
      data: { status: "COMPLETED" },
    });
  }

  revalidatePath("/app/wallet");
  revalidatePath("/app");
};

export const issueCardAction = async (contractorId: string) => {
  "use server";
  const { org, owner } = await ensureBaseData();
  const contractor = await prisma.contractorProfile.findUnique({ where: { id: contractorId } });
  if (!contractor) throw new Error("Contractor not found");
  const gate = gateCardIssue(contractor.status);
  if (!gate.allowed) {
    throw new Error(`Blocked: ${gate.blockers.join(", ")}`);
  }
  const wallet = await prisma.walletAccount.findFirst({
    where: { ownerType: "CONTRACTOR", ownerId: contractorId },
  });
  if (!wallet || asNumber(wallet.balanceCached) <= 0) {
    throw new Error("Insufficient balance to issue card");
  }

  const cardId = `card_${randomShort(6)}`;
  await prisma.card.create({
    data: {
      id: cardId,
      orgId: org.id,
      contractorId,
      last4: randomShort(4),
      status: "ACTIVE",
      provider: "Marqeta",
      limitsJson: { daily: 1000, monthly: 7500 },
    },
  });
  await pushAudit(owner.id, "issue_card", { cardId, contractorId });
  revalidatePath("/app/cards");
};

export const toggleCardStatusAction = async (cardId: string, next: CardStatus) => {
  "use server";
  const { owner } = await ensureBaseData();
  const card = await prisma.card.findUnique({ where: { id: cardId } });
  if (!card) throw new Error("Card not found");
  await prisma.card.update({
    where: { id: cardId },
    data: { status: next.toUpperCase() as "ACTIVE" | "FROZEN" | "CLOSED" },
  });
  await pushAudit(owner.id, "update_card_status", { cardId, status: next });
  await sendNotification({ userId: owner.id, event: "card.status_changed", metadata: { cardId, status: next } });
  revalidatePath("/app/cards");
};

export const addSupportMessageAction = async (ticketId: string, body: string) => {
  "use server";
  const ticket = await prisma.supportTicket.findUnique({ where: { id: ticketId } });
  if (!ticket) throw new Error("Ticket not found");
  const messages = Array.isArray(ticket.messagesJson)
    ? [
        ...(ticket.messagesJson as Array<{ from: string; body: string; at: string }>),
        { from: "You", body, at: new Date().toISOString() },
      ]
    : [{ from: "You", body, at: new Date().toISOString() }];
  await prisma.supportTicket.update({
    where: { id: ticketId },
    data: { messagesJson: messages },
  });
  revalidatePath("/app/support");
};

export const seedAction = async () => {
  "use server";
  await ensureBaseData();
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
  const { org, owner } = await ensureBaseData();
  await prisma.organization.update({
    where: { id: org.id },
    data: { name: parsed.data.name, currency: parsed.data.currency },
  });
  updateOnboardingState({ companyProfileComplete: true });
  await upsertOnboardingStep(owner.id, "OWNER", "company_setup", parsed.data);
  await pushAudit(owner.id, "update_org_profile", parsed.data);
  revalidatePath("/onboarding/company/setup");
};

export const completeCompanySetupAction = async () => {
  "use server";
  const { owner } = await ensureBaseData();
  await upsertOnboardingStep(owner.id, "OWNER", "complete");
  revalidatePath("/app");
};

export const acceptInviteAction = async (token: string) => {
  "use server";
  const invite = await prisma.invite.findFirst({ where: { token } });
  if (!invite) throw new Error("Invalid invite");
  if (invite.status !== "pending") throw new Error("Invite already used");

  const contractor = await prisma.contractorProfile.findFirst({
    where: { orgId: invite.orgId, email: invite.email },
  });

  let contractorId = contractor?.id;
  let contractorUserId = contractor?.userId ?? null;

  if (!contractor) {
    const org = await prisma.organization.findUnique({ where: { id: invite.orgId } });
    const contractorUser = await ensureUser(invite.email, invite.email.split("@")[0] ?? "Contractor");
    contractorUserId = contractorUser.id;
    contractorId = `ctr_${randomShort(6)}`;
    const walletId = `w_${randomShort(6)}`;
    const currency = org?.currency ?? orgCurrency;
    await prisma.$transaction(async (tx) => {
      await tx.contractorProfile.create({
        data: {
          id: contractorId,
          orgId: invite.orgId,
          userId: contractorUser.id,
          email: invite.email,
          name: contractorUser.name ?? invite.email,
          status: "onboarding",
          contractActive: true,
          kycStatus: "pending",
          taxStatus: "pending",
          walletId,
        },
      });
      await tx.walletAccount.create({
        data: {
          id: walletId,
          orgId: invite.orgId,
          ownerType: "CONTRACTOR",
          ownerId: contractorId,
          currency,
          balanceCached: new Prisma.Decimal(0),
        },
      });
    });
  } else {
    await prisma.contractorProfile.update({
      where: { id: contractor.id },
      data: { status: "onboarding" },
    });
  }

  await prisma.invite.update({
    where: { id: invite.id },
    data: { status: "accepted" },
  });

  if (contractorUserId) {
    await upsertOnboardingStep(contractorUserId, "CONTRACTOR", "contractor_profile");
  }

  const { owner } = await ensureBaseData();
  await pushAudit(owner.id, "accept_invite", { token });
  revalidatePath(`/invite/${token}`);
};

export const upsertOnboardingStep = async (userId: string, role: Role, step: string, data?: Record<string, unknown>) => {
  const existing = await prisma.onboardingState.findFirst({ where: { userId } });
  if (existing) {
    await prisma.onboardingState.update({
      where: { id: existing.id },
      data: {
        step,
        role: role as PrismaRole,
        data: { ...(existing.data as Record<string, unknown> ?? {}), ...(data ?? {}) },
      },
    });
  } else {
    await prisma.onboardingState.create({
      data: {
        userId,
        role: role as PrismaRole,
        step,
        data: data ?? {},
      },
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
  const contractor = await prisma.contractorProfile.findUnique({ where: { id: parsed.data.contractorId } });
  if (!contractor) throw new Error("Contractor not found");
  await prisma.contractorProfile.update({
    where: { id: contractor.id },
    data: { name: parsed.data.legalName, status: "onboarding" },
  });
  if (contractor.userId) {
    await upsertOnboardingStep(contractor.userId, "CONTRACTOR", "payout_method", parsed.data);
  }
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

  await prisma.payoutMethod.deleteMany({ where: { contractorId: parsed.data.contractorId } });
  await prisma.payoutMethod.create({
    data: {
      id: `pm_${randomShort(6)}`,
      contractorId: parsed.data.contractorId,
      provider: "WISE",
      bankCountry: parsed.data.bankCountry,
      currency: parsed.data.currency,
      accountHolder: parsed.data.accountHolder,
      metadataJson: { masked: "•••••" },
    },
  });

  const contractor = await prisma.contractorProfile.findUnique({ where: { id: parsed.data.contractorId } });
  if (contractor?.userId) {
    await upsertOnboardingStep(contractor.userId, "CONTRACTOR", "card");
  }
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
  const contractor = await prisma.contractorProfile.findUnique({ where: { id: contractorId } });
  if (contractor?.userId) {
    await upsertOnboardingStep(contractor.userId, "CONTRACTOR", "complete");
  }
  revalidatePath("/app/cards");
};

export const updateKycStatusAction = async (contractorId: string, status: "approved" | "rejected" | "pending") => {
  "use server";
  const { owner } = await ensureBaseData();
  const contractor = await prisma.contractorProfile.findUnique({ where: { id: contractorId } });
  if (!contractor) throw new Error("Contractor not found");
  const nextStatus = resolveContractStatus(
    (contractor.status ?? "invited") as ContractorStatus,
    contractor.contractActive ?? true,
    status,
  );
  await prisma.contractorProfile.update({
    where: { id: contractorId },
    data: { kycStatus: status, status: nextStatus },
  });
  await pushAudit(owner.id, "kyc_status_updated", { contractorId, status });
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

  const contractor = await prisma.contractorProfile.findUnique({ where: { id: parsed.data.contractorId } });
  if (!contractor) throw new Error("Contractor not found");

  const nextStatus = resolveContractStatus(
    (contractor.status ?? "invited") as ContractorStatus,
    parsed.data.contractActive,
    contractor.kycStatus ?? "pending",
  );

  await prisma.contractorProfile.update({
    where: { id: contractor.id },
    data: {
      contractActive: parsed.data.contractActive,
      status: nextStatus,
      hourlyRate: parsed.data.hourlyRate !== undefined ? new Prisma.Decimal(parsed.data.hourlyRate) : undefined,
      wage: parsed.data.wage !== undefined ? new Prisma.Decimal(parsed.data.wage) : undefined,
      wageCurrency: parsed.data.wageCurrency ?? contractor.wageCurrency,
    },
  });

  const { owner } = await ensureBaseData();
  await pushAudit(owner.id, "update_contractor_contract", {
    contractorId: contractor.id,
    active: parsed.data.contractActive,
    hourlyRate: parsed.data.hourlyRate,
    wage: parsed.data.wage,
    currency: parsed.data.wageCurrency,
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
  await prisma.fXQuote.create({
    data: {
      id: quote.id,
      provider: quote.provider,
      sourceCurrency: quote.sourceCurrency,
      destinationCurrency: quote.destinationCurrency,
      rate: new Prisma.Decimal(quote.rate),
      fee: new Prisma.Decimal(quote.fee),
      expiresAt: new Date(quote.expiresAt),
    },
  });
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

  const contractorWallet = await prisma.walletAccount.findFirst({
    where: { ownerType: "CONTRACTOR", ownerId: parsed.data.contractorId },
  });
  if (!contractorWallet) throw new Error("Wallet not found");
  if (asNumber(contractorWallet.balanceCached) < parsed.data.amount) throw new Error("Insufficient funds");

  const quote = await wiseProvider.getFXQuote(
    contractorWallet.currency,
    parsed.data.destinationCurrency,
    parsed.data.amount,
  );
  await prisma.fXQuote.create({
    data: {
      id: quote.id,
      provider: quote.provider,
      sourceCurrency: quote.sourceCurrency,
      destinationCurrency: quote.destinationCurrency,
      rate: new Prisma.Decimal(quote.rate),
      fee: new Prisma.Decimal(quote.fee),
      expiresAt: new Date(quote.expiresAt),
    },
  });
  const recipient = await wiseProvider.createRecipient({ contractorId: parsed.data.contractorId, bankCountry: "US", currency: parsed.data.destinationCurrency });
  const transfer = await wiseProvider.createTransfer(`pay_${randomShort(6)}`, recipient.id, parsed.data.amount, parsed.data.destinationCurrency);

  await prisma.$transaction(async (tx) => {
    await tx.payout.create({
      data: {
        id: transfer.providerRef,
        orgId: contractorWallet.orgId,
        contractorId: parsed.data.contractorId,
        amount: new Prisma.Decimal(parsed.data.amount),
        sourceCurrency: contractorWallet.currency,
        destinationCurrency: parsed.data.destinationCurrency,
        fxRate: new Prisma.Decimal(quote.rate),
        fxFee: new Prisma.Decimal(quote.fee),
        provider: "WISE",
        status: "PENDING",
        providerRef: transfer.providerRef,
        estimatedArrival: transfer.estimatedArrival ? new Date(transfer.estimatedArrival) : undefined,
      },
    });

    await tx.ledgerEntry.create({
      data: {
        id: `led_${randomShort(8)}`,
        walletId: contractorWallet.id,
        type: "DEBIT",
        amount: new Prisma.Decimal(parsed.data.amount),
        currency: contractorWallet.currency,
        referenceType: "payout",
        referenceId: transfer.providerRef,
        status: "PENDING",
        metadataJson: {
          destinationCurrency: parsed.data.destinationCurrency,
          quoteId: quote.id,
          providerRef: transfer.providerRef,
        },
        memo: "Withdrawal requested",
      },
    });

    await tx.walletAccount.update({
      where: { id: contractorWallet.id },
      data: { balanceCached: { decrement: new Prisma.Decimal(parsed.data.amount) } },
    });

    await tx.job.create({
      data: {
        id: `job_${randomShort(6)}`,
        type: "payout_status_refresh",
        payload: { payoutId: transfer.providerRef, providerRef: transfer.providerRef },
        status: "QUEUED",
        runAt: new Date(Date.now() + 10 * 60 * 1000),
        attempts: 0,
      },
    });
  });

  const { owner } = await ensureBaseData();
  await pushAudit(owner.id, "withdraw_requested", { payoutId: transfer.providerRef, provider: "WISE" });
  revalidatePath("/app/wallet/withdraw");
  revalidatePath("/app/wallet");
};
