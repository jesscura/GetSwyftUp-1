import { recordActivity } from "@/lib/activity-log";

export type NotificationPreferences = {
  securityAlerts: boolean;
  payoutUpdates: boolean;
  invoiceUpdates: boolean;
  cardUpdates: boolean;
  contractorUpdates: boolean;
};

export type NotificationEvent =
  | "security.twofactor_enabled"
  | "security.twofactor_disabled"
  | "security.password_changed"
  | "payout.scheduled"
  | "payout.completed"
  | "payout.failed"
  | "invoice.submitted"
  | "invoice.approved"
  | "invoice.rejected"
  | "card.issued"
  | "card.status_changed";

export type ThemedEmail = {
  subject: string;
  preheader: string;
  headline: string;
  body: string;
  accentColor: string;
  cta?: { label: string; href: string };
  footer: string;
  badges: string[];
};

const defaultPreferences: NotificationPreferences = {
  securityAlerts: true,
  payoutUpdates: true,
  invoiceUpdates: true,
  cardUpdates: true,
  contractorUpdates: true,
};

const preferenceStore = new Map<string, NotificationPreferences>();

function getPreferences(userId: string) {
  return preferenceStore.get(userId) ?? defaultPreferences;
}

export function buildThemedEmail(event: NotificationEvent, metadata: Record<string, unknown> = {}): ThemedEmail {
  const provider = (metadata.provider as string) ?? "Wise sandbox";
  const rail = (metadata.cardRail as string) ?? "Marqeta sandbox";
  const amount = metadata.amount as number | undefined;
  const currency = (metadata.currency as string) ?? "USD";
  const invoiceId = (metadata.invoiceId as string) ?? "invoice";
  const payoutId = (metadata.payoutId as string) ?? "payout";

  const base: ThemedEmail = {
    subject: "SwyftUp transaction update",
    preheader: "Your workspace has a new transaction event.",
    headline: "Transaction update",
    body: "Your transaction was processed in the sandbox.",
    accentColor: "#5CE1E6",
    cta: { label: "Open dashboard", href: "/app" },
    footer: `${provider} • ${rail}`,
    badges: [provider, rail],
  };

  if (event.startsWith("payout.")) {
    const status = event === "payout.completed" ? "completed" : event === "payout.failed" ? "failed" : "scheduled";
    base.subject = `Payout ${status} (${payoutId})`;
    base.headline = `Payout ${status}`;
    base.body =
      status === "completed"
        ? `Payout ${payoutId} was marked paid via ${provider}.`
        : `Payout ${payoutId} is ${status} with ${provider}.`;
    base.preheader = amount ? `Amount ${amount} ${currency} via ${provider}` : base.preheader;
  } else if (event.startsWith("invoice.")) {
    const verb = event === "invoice.approved" ? "approved" : event === "invoice.rejected" ? "rejected" : "submitted";
    base.subject = `Invoice ${verb} (${invoiceId})`;
    base.headline = `Invoice ${verb}`;
    base.body = `Invoice ${invoiceId} is ${verb}. Any payout will run on ${provider} with card rail ${rail}.`;
    base.preheader = amount ? `Invoice for ${amount} ${currency} was ${verb}` : base.preheader;
  } else if (event.startsWith("card.")) {
    base.subject = `Card update via ${rail}`;
    base.headline = "Card status changed";
    base.body = `Your Marqeta sandbox card rail (${rail}) recorded a card event.`;
    base.preheader = "Virtual card update.";
  }

  return base;
}

export async function sendNotification({
  userId,
  event,
  metadata,
}: {
  userId: string;
  event: NotificationEvent;
  metadata?: Record<string, unknown>;
}) {
  const prefs = getPreferences(userId);
  const shouldSend =
    event.startsWith("security.") ||
    (event.startsWith("payout.") && prefs.payoutUpdates) ||
    (event.startsWith("invoice.") && prefs.invoiceUpdates) ||
    (event.startsWith("card.") && prefs.cardUpdates) ||
    prefs.securityAlerts;

  if (!shouldSend) return;

  const themedEmail = buildThemedEmail(event, metadata ?? {});

  // Stubbed provider: log activity and return
  recordActivity({
    actorUserId: userId,
    eventType: `notification.${event}`,
    metadata: { ...(metadata ?? {}), email: themedEmail },
  });

  return { delivered: true, email: themedEmail };
}

export function updateNotificationPreferences(userId: string, prefs: Partial<NotificationPreferences>) {
  const current = getPreferences(userId);
  preferenceStore.set(userId, { ...current, ...prefs });
}
