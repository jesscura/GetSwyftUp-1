import Link from "next/link";
import { Sidebar } from "@/components/dashboard/sidebar";
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
import { auth, signOut } from "@/lib/auth";

const navItems = [
  { name: "Dashboard", href: "/app", icon: <DashboardIcon /> },
  { name: "Contractors", href: "/app/contractors", icon: <UsersIcon />, badge: "8" },
  { name: "Invoices", href: "/app/invoices", icon: <InvoicesIcon />, badge: "14" },
  { name: "Wallet", href: "/app/wallet", icon: <WalletIcon /> },
  { name: "Cards", href: "/app/cards", icon: <CardIcon /> },
  { name: "Settings", href: "/app/settings", icon: <SettingsIcon /> },
  { name: "Audit logs", href: "/app/audit-logs", icon: <AuditIcon /> },
  { name: "Support", href: "/app/support", icon: <SupportIcon /> },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  const signOutAction = async () => {
    "use server";
    await signOut({ redirectTo: "/auth/sign-in" });
  };

  return (
    <div className="flex min-h-screen bg-bg text-text">
      <Sidebar items={navItems} />
      <div className="flex flex-1 flex-col bg-[color-mix(in_srgb,var(--panel)_90%,transparent)]">
        <header className="flex flex-wrap items-center gap-4 border-b border-white/5 px-6 py-4">
          <div className="space-y-1">
            <p className="text-sm text-muted">Organization</p>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-semibold">SwyftUp Capital</h1>
              <Badge tone="accent">Live</Badge>
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
                {session?.user?.name ?? "Signed in"} · Sign out
              </Button>
            </form>
          </div>
        </header>
        <main className="flex-1 space-y-6 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
