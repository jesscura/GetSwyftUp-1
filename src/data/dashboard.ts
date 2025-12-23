import { Role } from "@/config/roles";
import { markChecklistKey } from "@/lib/onboarding-state";

export type ContractorStatus = "Pending" | "Active" | "Blocked";
export type InvoiceStatus = "Draft" | "Submitted" | "Pending Approval" | "Approved" | "Rejected" | "Paid";
export type PayoutStatus = "Draft" | "Pending" | "Approved" | "Failed" | "Paid";
export type CardStatus = "Issued" | "Not issued" | "Frozen";
export type TransactionStatus = "Pending" | "Completed" | "Declined";

export type Contractor = {
  id: string;
  name: string;
  country: string;
  currency: string;
  status: ContractorStatus;
  preferredMethod: "Card" | "Bank";
  cardIssued: boolean;
  lastPayout?: { date: string; amount: number; currency: string };
};

export type Invoice = {
  id: string;
  contractorId: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  submittedAt: string;
};

export type Payout = {
  id: string;
  contractorId: string;
  amount: number;
  currency: string;
  method: "Card" | "Bank";
  status: PayoutStatus;
  eta: string;
  createdAt: string;
};

export type Card = {
  id: string;
  contractorId: string;
  status: CardStatus;
  last4: string;
  limit: number;
  currency: string;
};

export type Transaction = {
  id: string;
  cardId: string;
  amount: number;
  currency: string;
  merchant: string;
  status: TransactionStatus;
  createdAt: string;
};

export type ActivityLog = {
  id: string;
  message: string;
  createdAt: string;
  type: "invoice" | "payout" | "card" | "rule";
  actor: string;
};

export type ApprovalRule = {
  id: string;
  type: "Invoice" | "Payout";
  threshold: number;
  currency: string;
  approverRole: Role;
  createdAt: string;
};

export type ApprovalItem = {
  id: string;
  entityType: "Invoice" | "Payout";
  entityId: string;
  contractorId: string;
  status: "Pending" | "Approved" | "Rejected";
  assignedToRole: Role;
  createdAt: string;
  amount: number;
  currency: string;
};

export type ActionItem = {
  id: string;
  type: "Invoice" | "Payout" | "Contractor";
  summary: string;
  reason: string;
  timestamp: string;
  cta: "Approve" | "Review" | "Fix issue";
  targetHref: string;
};

export type KPI = {
  label: string;
  value: string;
  delta: string;
  href: string;
};

const contractors: Contractor[] = [
  {
    id: "ctr_1",
    name: "Harper Lee",
    country: "United Kingdom",
    currency: "GBP",
    status: "Pending",
    preferredMethod: "Bank",
    cardIssued: false,
    lastPayout: { date: "2025-12-05", amount: 6450, currency: "GBP" },
  },
  {
    id: "ctr_2",
    name: "Ravi Menon",
    country: "Singapore",
    currency: "SGD",
    status: "Active",
    preferredMethod: "Card",
    cardIssued: true,
    lastPayout: { date: "2025-12-18", amount: 9200, currency: "SGD" },
  },
  {
    id: "ctr_3",
    name: "Amani Koné",
    country: "Côte d’Ivoire",
    currency: "XOF",
    status: "Blocked",
    preferredMethod: "Bank",
    cardIssued: false,
  },
  {
    id: "ctr_4",
    name: "Marisol Vega",
    country: "Mexico",
    currency: "MXN",
    status: "Active",
    preferredMethod: "Bank",
    cardIssued: true,
  },
];

const invoices: Invoice[] = [
  { id: "INV-2041", contractorId: "ctr_1", amount: 12800, currency: "GBP", status: "Pending Approval", submittedAt: "2025-12-18" },
  { id: "INV-2042", contractorId: "ctr_2", amount: 7300, currency: "SGD", status: "Submitted", submittedAt: "2025-12-17" },
  { id: "INV-2043", contractorId: "ctr_3", amount: 21400, currency: "XOF", status: "Rejected", submittedAt: "2025-12-16" },
  { id: "INV-2044", contractorId: "ctr_4", amount: 9100, currency: "MXN", status: "Approved", submittedAt: "2025-12-15" },
];

const payouts: Payout[] = [
  { id: "PAY-8821", contractorId: "ctr_4", amount: 4800, currency: "USD", method: "Bank", status: "Approved", eta: "2025-12-21", createdAt: "2025-12-18" },
  { id: "PAY-8822", contractorId: "ctr_3", amount: 3200, currency: "USD", method: "Bank", status: "Failed", eta: "2025-12-20", createdAt: "2025-12-17" },
  { id: "PAY-8823", contractorId: "ctr_2", amount: 6100, currency: "USD", method: "Card", status: "Paid", eta: "2025-12-16", createdAt: "2025-12-15" },
  { id: "PAY-8824", contractorId: "ctr_1", amount: 2800, currency: "USD", method: "Bank", status: "Pending", eta: "2025-12-22", createdAt: "2025-12-18" },
];

const cards: Card[] = [
  { id: "card_1", contractorId: "ctr_2", status: "Issued", last4: "8831", limit: 10000, currency: "USD" },
  { id: "card_2", contractorId: "ctr_4", status: "Issued", last4: "5524", limit: 8000, currency: "USD" },
];

const transactions: Transaction[] = [
  { id: "txn_1", cardId: "card_1", amount: 120, currency: "USD", merchant: "Figma", status: "Completed", createdAt: "2025-12-18" },
  { id: "txn_2", cardId: "card_1", amount: 58, currency: "USD", merchant: "AWS", status: "Pending", createdAt: "2025-12-19" },
  { id: "txn_3", cardId: "card_2", amount: 210, currency: "USD", merchant: "Notion", status: "Completed", createdAt: "2025-12-19" },
];

const activities: ActivityLog[] = [
  { id: "act_1", message: "Invoice INV-2041 submitted by Harper Lee", type: "invoice", actor: "Harper Lee", createdAt: "2025-12-18T10:00:00Z" },
  { id: "act_2", message: "Payout PAY-8821 approved by John", type: "payout", actor: "John", createdAt: "2025-12-18T12:00:00Z" },
  { id: "act_3", message: "Card issued to Ravi Menon", type: "card", actor: "Ops", createdAt: "2025-12-17T09:00:00Z" },
  { id: "act_4", message: "Approval rule updated: Invoices > $5k require OWNER", type: "rule", actor: "Ops", createdAt: "2025-12-16T09:00:00Z" },
];

const approvalRules: ApprovalRule[] = [
  { id: "rule_1", type: "Invoice", threshold: 5000, currency: "USD", approverRole: Role.OWNER, createdAt: "2025-12-10" },
  { id: "rule_2", type: "Payout", threshold: 3000, currency: "USD", approverRole: Role.FINANCE_ADMIN, createdAt: "2025-12-12" },
];

const approvalItems: ApprovalItem[] = [
  {
    id: "appr_1",
    entityType: "Invoice",
    entityId: "INV-2041",
    contractorId: "ctr_1",
    status: "Pending",
    assignedToRole: Role.FINANCE_ADMIN,
    createdAt: "2025-12-18",
    amount: 12800,
    currency: "GBP",
  },
  {
    id: "appr_2",
    entityType: "Payout",
    entityId: "PAY-8824",
    contractorId: "ctr_1",
    status: "Pending",
    assignedToRole: Role.OWNER,
    createdAt: "2025-12-18",
    amount: 2800,
    currency: "USD",
  },
];

const actionItems: ActionItem[] = [
  {
    id: "act_req_1",
    type: "Invoice",
    summary: "Invoice INV-2041 from Harper Lee — £12,800",
    reason: "Needs approval",
    timestamp: "2025-12-18T09:00:00Z",
    cta: "Approve",
    targetHref: "/dashboard/approvals?type=invoice&status=pending",
  },
  {
    id: "act_req_2",
    type: "Payout",
    summary: "Payout PAY-8822 to Amani Koné — $3,200",
    reason: "Failed payout: bank rejected",
    timestamp: "2025-12-17T14:00:00Z",
    cta: "Fix issue",
    targetHref: "/dashboard/payouts?status=failed",
  },
  {
    id: "act_req_3",
    type: "Contractor",
    summary: "Amani Koné — onboarding incomplete",
    reason: "Missing tax form",
    timestamp: "2025-12-17T10:00:00Z",
    cta: "Review",
    targetHref: "/dashboard/contractors?status=pending",
  },
  {
    id: "act_req_4",
    type: "Payout",
    summary: "Payout PAY-8824 to Harper Lee — $2,800",
    reason: "Awaiting KYC",
    timestamp: "2025-12-18T08:00:00Z",
    cta: "Review",
    targetHref: "/dashboard/payouts?status=pending",
  },
];

const checklistTemplate = [
  { key: "company", label: "Add company details", href: "/dashboard/settings" },
  { key: "funding", label: "Add funding source", href: "/dashboard/settings?tab=funding" },
  { key: "contractor", label: "Invite first contractor", href: "/dashboard/contractors" },
  { key: "rules", label: "Set approval rules", href: "/dashboard/approvals" },
  { key: "payout", label: "Send first payout", href: "/dashboard/payouts" },
] as const;

type ChecklistKey = (typeof checklistTemplate)[number]["key"];

const checklistStore = new Map<string, Set<string>>();
const userContractorMap: Record<string, string> = {
  "contractor-user": "ctr_1",
};

export function getChecklist(userId: string) {
  const completed = checklistStore.get(userId) ?? new Set<string>();
  return checklistTemplate.map((item) => ({
    ...item,
    completed: completed.has(item.key),
  }));
}

export function completeChecklistItem(userId: string, key: ChecklistKey) {
  const set = checklistStore.get(userId) ?? new Set<string>();
  set.add(key);
  checklistStore.set(userId, set);
  markChecklistKey(key);
  return getChecklist(userId);
}

export function getKPIs(role: Role): KPI[] {
  const activeContractors = contractors.filter((c) => c.status === "Active").length;
  const pendingPayouts = payouts.filter((p) => p.status === "Pending").length;
  const pendingInvoices = invoices.filter((i) => i.status === "Pending Approval").length;

  if (role === Role.CONTRACTOR) {
    return [
      {
        label: "Available balance",
        value: "$8,400",
        delta: "+4.2% vs 30d",
        href: "/dashboard/payouts?status=ready",
      },
      {
        label: "Upcoming payout",
        value: "$2,800",
        delta: "ETA in 4 days",
        href: "/dashboard/payouts?status=scheduled",
      },
      {
        label: "Card spend this month",
        value: "$1,240",
        delta: "-3.1% vs 30d",
        href: "/dashboard/cards",
      },
      {
        label: "Transactions",
        value: "12",
        delta: "+2 vs last week",
        href: "/dashboard/cards#transactions",
      },
    ];
  }

  return [
    { label: "Available Balance", value: "$182,400", delta: "+6.8% vs last 30d", href: "/dashboard/payouts?status=ready" },
    { label: "Pending Payouts", value: pendingPayouts.toString(), delta: "+1 vs last week", href: "/dashboard/payouts?status=pending" },
    { label: "Invoices Awaiting Approval", value: pendingInvoices.toString(), delta: "-2 vs last week", href: "/dashboard/approvals?type=invoice&status=pending" },
    { label: "Active Contractors", value: activeContractors.toString(), delta: "+3 onboarded", href: "/dashboard/contractors?status=active" },
  ];
}

export function getActionRequired(role: Role): ActionItem[] {
  if (role === Role.CONTRACTOR) {
    return actionItems.filter((item) => item.type !== "Contractor");
  }
  return actionItems.slice(0, 4);
}

export function getLifecycleFunnel() {
  return [
    { label: "Contractors onboarded", count: contractors.length, value: "$420k", href: "/dashboard/contractors?status=active" },
    { label: "Invoices submitted", count: invoices.length, value: "$239k", href: "/dashboard/invoices" },
    { label: "Approved", count: invoices.filter((i) => i.status === "Approved").length, value: "$95k", href: "/dashboard/approvals?status=approved" },
    { label: "Paid", count: payouts.filter((p) => p.status === "Paid").length, value: "$71k", href: "/dashboard/payouts?status=paid" },
  ];
}

export function getActivities(): ActivityLog[] {
  return activities.slice(0, 20);
}

export function getContractors() {
  return contractors;
}

export function getInvoices() {
  return invoices;
}

export function getPayouts() {
  return payouts;
}

export function getCards() {
  return cards;
}

export function getTransactions() {
  return transactions;
}

export function getApprovalItems() {
  return approvalItems;
}

export function getApprovalRules() {
  return approvalRules;
}

export function findContractor(contractorId: string) {
  return contractors.find((c) => c.id === contractorId);
}

export function getContractorForUser(userId: string) {
  const mappedId = userContractorMap[userId];
  if (!mappedId) return undefined;
  return contractors.find((c) => c.id === mappedId);
}
