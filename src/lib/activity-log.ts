import { pushAudit } from "@/lib/mock-db";

export type ActivityEvent = {
  id: string;
  eventType: string;
  actorUserId?: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
};

const activityEvents: ActivityEvent[] = [];

const randomId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export function recordActivity(event: Omit<ActivityEvent, "id" | "createdAt">) {
  const entry: ActivityEvent = {
    id: `act_${randomId()}`,
    createdAt: new Date().toISOString(),
    ...event,
  };
  activityEvents.unshift(entry);

  if (event.actorUserId) {
    try {
      pushAudit(event.actorUserId, event.eventType, {
        entityType: event.entityType,
        entityId: event.entityId,
        ...(event.metadata ?? {}),
      });
    } catch {
      // ignore audit push failures in mock context
    }
  }

  return entry;
}

export function getActivityEvents() {
  return activityEvents;
}
