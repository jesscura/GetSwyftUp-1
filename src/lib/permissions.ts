import { Role } from "@/config/roles";

export type PermissionAction =
  | "VIEW_DASHBOARD"
  | "INVITE_CONTRACTOR"
  | "VIEW_CONTRACTORS"
  | "VIEW_APPROVALS"
  | "CREATE_INVOICE"
  | "APPROVE_INVOICE"
  | "CREATE_PAYOUT"
  | "ISSUE_CARD"
  | "VIEW_AUDIT_LOG"
  | "MANAGE_ORG_SECURITY";

const permissionMap: Record<Role, Set<PermissionAction>> = {
  [Role.SUPER_ADMIN]: new Set<PermissionAction>([
    "VIEW_DASHBOARD",
    "INVITE_CONTRACTOR",
    "VIEW_CONTRACTORS",
    "VIEW_APPROVALS",
    "CREATE_INVOICE",
    "APPROVE_INVOICE",
    "CREATE_PAYOUT",
    "ISSUE_CARD",
    "VIEW_AUDIT_LOG",
    "MANAGE_ORG_SECURITY",
  ]),
  [Role.OWNER]: new Set<PermissionAction>([
    "VIEW_DASHBOARD",
    "INVITE_CONTRACTOR",
    "VIEW_CONTRACTORS",
    "VIEW_APPROVALS",
    "CREATE_INVOICE",
    "APPROVE_INVOICE",
    "CREATE_PAYOUT",
    "ISSUE_CARD",
    "VIEW_AUDIT_LOG",
    "MANAGE_ORG_SECURITY",
  ]),
  [Role.FINANCE_ADMIN]: new Set<PermissionAction>([
    "VIEW_DASHBOARD",
    "INVITE_CONTRACTOR",
    "VIEW_CONTRACTORS",
    "VIEW_APPROVALS",
    "CREATE_INVOICE",
    "APPROVE_INVOICE",
    "CREATE_PAYOUT",
    "VIEW_AUDIT_LOG",
  ]),
  [Role.CONTRACTOR]: new Set<PermissionAction>(["VIEW_DASHBOARD"]),
};

export function can(role: Role, action: PermissionAction) {
  const actions = permissionMap[role];
  if (!actions) return false;
  return actions.has(action);
}

export function allowedActions(role: Role): PermissionAction[] {
  return Array.from(permissionMap[role] ?? []);
}
