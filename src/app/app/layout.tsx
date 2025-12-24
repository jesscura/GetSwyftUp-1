import Link from "next/link";
import { Sidebar, type NavItem } from "@/components/dashboard/sidebar";
import {
  AuditIcon,
  CardIcon,
  DashboardIcon,
  InvoicesIcon,
  SettingsIcon,
  SupportIcon,
  UsersIcon,
  WalletIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { Role } from "@/config/roles";
import { getCurrentUser } from "@/lib/current-user";
import { signOut } from "@/lib/auth";

const navByPersona: Record<"client" | "worker" | "admin", NavItem[]> = {
  client: [
    { name: "Dashboard", href: "/app", icon: <DashboardIcon /> },
    { name: "Contractors", href: "/app/contractors", icon: <UsersIcon />, badge: "8" },
    { name: "Invoices", href: "/app/invoices", icon: <InvoicesIcon />, badge: "14" },
    { name: "Wallet", href: "/app/wallet", icon: <WalletIcon /> },
    { name: "Cards", href: "/app/cards", icon: <CardIcon /> },
    { name: "Settings", href: "/app/settings", icon: <SettingsIcon /> },
    { name: "Audit logs", href: "/app/audit-logs", icon: <AuditIcon /> },
    { name: "Support", href: "/app/support", icon: <SupportIcon /> },
  ],
  worker: [
    { name: "Overview", href: "/app", icon: <DashboardIcon /> },
    { name: "Wallet", href: "/app/wallet", icon: <WalletIcon /> },
    { name: "Cards", href: "/app/cards", icon: <CardIcon /> },
    { name: "Support", href: "/app/support", icon: <SupportIcon /> },
  ],
  admin: [
    { name: "Overview", href: "/app", icon: <DashboardIcon /> },
    { name: "Admin Console", href: "/app/admin", icon: <AuditIcon /> },
    { name: "Audit logs", href: "/app/audit-logs", icon: <AuditIcon /> },
    { name: "Support", href: "/app/support", icon: <SupportIcon /> },
  ],
};

function getPersonaFromRole(role: Role) {
  if (role === Role.CONTRACTOR) return { persona: "Worker", nav: navByPersona.worker };
  if (role === Role.SUPER_ADMIN) return { persona: "Admin", nav: navByPersona.admin };
  return { persona: "Client", nav: navByPersona.client };
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  const persona = getPersonaFromRole(user.role);

  const signOutAction = async () => {
    "use server";
    await signOut({ redirectTo: "/auth/sign-in" });
  };

  return (
    <div className="flex min-h-screen bg-bg text-text">
      <Sidebar items={persona.nav} />
      <div className="flex flex-1 flex-col bg-[color-mix(in_srgb,var(--panel)_90%,transparent)]">
        <header className="flex flex-wrap items-center gap-4 border-b border-white/5 px-6 py-4">
          <div className="space-y-1">
            <p className="text-sm text-muted">Organization</p>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-semibold">SwyftUp Capital</h1>
              <Badge tone="accent">Live</Badge>
              <Badge tone="subtle">{persona.persona}</Badge>
            </div>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-3">
            <Select defaultValue="global" className="w-44">
              <option value="global">Global · USD</option>
              <option value="latam">LATAM · MXN</option>
              <option value="apac">APAC · SGD</option>
            </Select>
            <Button variant="secondary" asChild>
              <Link href="/app/contractors">Invite contractor</Link>
            </Button>
            <Button asChild>
              <Link href="/app/wallet">Fund wallet</Link>
            </Button>
            <form action={signOutAction}>
              <Button variant="ghost" type="submit">
                {user.name ?? "Signed in"} · Sign out
              </Button>
            </form>
          </div>
        </header>
        <main className="flex-1 space-y-6 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
