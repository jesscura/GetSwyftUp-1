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

  // Stubbed provider: log activity and return
  recordActivity({
    actorUserId: userId,
    eventType: `notification.${event}`,
    metadata: metadata ?? {},
  });
}

export function updateNotificationPreferences(userId: string, prefs: Partial<NotificationPreferences>) {
  const current = getPreferences(userId);
  preferenceStore.set(userId, { ...current, ...prefs });
}
