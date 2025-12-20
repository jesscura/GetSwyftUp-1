import Link from "next/link";
import { getDb } from "@/lib/mock-db";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";

export default function DashboardPage() {
  const db = getDb();
  const orgWallet = db.wallets.find((w) => w.ownerType === "ORG");
  const totalBalance = orgWallet?.balance ?? 0;
  const available = totalBalance - (orgWallet?.pending ?? 0);
  const pendingPayouts = db.payouts.filter((p) => p.status === "pending").reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
            <p className="text-sm text-muted">Total balance</p>
            <Badge tone="subtle">All wallets</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-semibold">{formatCurrency(totalBalance)}</p>
            <p className="text-sm text-muted">Includes org and contractor balances</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
            <p className="text-sm text-muted">Available</p>
            <Badge tone="success">Ready</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-semibold">{formatCurrency(available)}</p>
            <p className="text-sm text-muted">After holds and scheduled payouts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
            <p className="text-sm text-muted">Pending payouts</p>
            <Badge tone="warning">Action</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-semibold">{formatCurrency(pendingPayouts)}</p>
            <p className="text-sm text-muted">Queued for release via mock provider</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/app/contractors">Invite contractor</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/app/invoices">Create invoice</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/app/wallet">Fund wallet</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/app/wallet">Create payout</Link>
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Recent invoices</p>
              <Link href="/app/invoices" className="text-sm text-[var(--accent)]">
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {db.invoices.slice(0, 4).map((invoice) => {
              const contractor = db.contractors.find((c) => c.id === invoice.contractorId);
              return (
                <div key={invoice.id} className="flex items-center justify-between rounded-[var(--radius-card)] border border-white/5 px-4 py-3">
                  <div>
                    <p className="font-semibold">{contractor?.name}</p>
                    <p className="text-sm text-muted">{invoice.memo}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(invoice.amount)}</p>
                    <StatusBadge status={invoice.status} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Recent transactions</p>
              <Link href="/app/wallet" className="text-sm text-[var(--accent)]">
                Ledger
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {db.ledger.slice(0, 5).map((entry) => (
              <div key={entry.id} className="flex items-center justify-between rounded-[var(--radius-card)] border border-white/5 px-4 py-3">
                <div>
                  <p className="font-semibold capitalize">{entry.referenceType}</p>
                  <p className="text-sm text-muted">{new Date(entry.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className={entry.type === "CREDIT" ? "text-emerald-300 font-semibold" : "text-[var(--brand-2)] font-semibold"}>
                    {entry.type === "CREDIT" ? "+" : "-"}
                    {formatCurrency(entry.amount)}
                  </p>
                  <p className="text-sm text-muted">{entry.memo ?? entry.referenceId}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Card activity</p>
            <Link href="/app/cards" className="text-sm text-[var(--accent)]">
              Manage cards
            </Link>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted">
              <tr className="border-b border-white/5">
                <th className="px-3 py-2">Merchant</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Card</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {db.cardTransactions.slice(0, 5).map((tx) => {
                const card = db.cards.find((c) => c.id === tx.cardId);
                const contractor = db.contractors.find((c) => c.id === card?.contractorId);
                return (
                  <tr key={tx.id} className="border-b border-white/5">
                    <td className="px-3 py-3">{tx.merchant}</td>
                    <td className="px-3 py-3 font-semibold">{formatCurrency(tx.amount)}</td>
                    <td className="px-3 py-3 text-muted">
                      **** {card?.last4} · {contractor?.name}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={tx.status} />
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
