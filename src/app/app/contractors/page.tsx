import Link from "next/link";
import { getDb, inviteContractorAction } from "@/lib/mock-db";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";

export default function ContractorsPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const db = getDb();
  const term = typeof searchParams.q === "string" ? searchParams.q.toLowerCase() : "";
  const status = typeof searchParams.status === "string" ? searchParams.status : "all";

  const filtered = db.contractors.filter((contractor) => {
    const matchesTerm =
      !term ||
      contractor.name.toLowerCase().includes(term) ||
      contractor.email.toLowerCase().includes(term) ||
      contractor.payoutMethod.toLowerCase().includes(term);
    const matchesStatus = status === "all" || contractor.status === status;
    return matchesTerm && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <form className="flex flex-wrap items-center gap-3" action="/app/contractors" method="get">
        <Input placeholder="Search contractors" name="q" defaultValue={term} className="max-w-xs" />
        <Select name="status" defaultValue={status} className="w-40">
          <option value="all">All statuses</option>
          <option value="invited">Invited</option>
          <option value="onboarding">Onboarding</option>
          <option value="active">Active</option>
        </Select>
        <Button type="submit">Filter</Button>
      </form>

      <Card>
        <CardHeader>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Invite contractor</p>
          <p className="text-sm text-muted">Send an invite and create a wallet shell</p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3 md:grid-cols-3" action={inviteContractorAction}>
            <Input name="name" placeholder="Full name" required />
            <Input name="email" type="email" placeholder="Email" required className="md:col-span-2" />
            <div className="md:col-span-3">
              <Button type="submit" className="w-full md:w-auto">
                Create invite
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Contractors</p>
              <p className="text-sm text-muted">Invite, onboard, and manage payout readiness</p>
            </div>
            <Badge tone="subtle">{filtered.length} visible</Badge>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted">
              <tr className="border-b border-white/5">
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Payout method</th>
                <th className="px-3 py-2 text-right">Wallet</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contractor) => {
                const wallet = db.wallets.find((w) => w.id === contractor.walletId);
                return (
                  <tr key={contractor.id} className="border-b border-white/5">
                    <td className="px-3 py-3">
                      <Link href={`/app/contractors/${contractor.id}`} className="font-semibold hover:text-[var(--accent)]">
                        {contractor.name}
                      </Link>
                    </td>
                    <td className="px-3 py-3 text-muted">{contractor.email}</td>
                    <td className="px-3 py-3">
                      <StatusBadge status={contractor.status} />
                    </td>
                    <td className="px-3 py-3 text-muted">{contractor.payoutMethod}</td>
                    <td className="px-3 py-3 text-right font-semibold">
                      {wallet ? formatCurrency(wallet.balance) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
