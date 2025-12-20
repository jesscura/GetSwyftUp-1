import Link from "next/link";
import { createPayoutAction, fundWalletAction, getDb, processJobsAction } from "@/lib/mock-db";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { StatusBadge } from "@/components/status-badge";

export default function WalletPage() {
  const db = getDb();
  const orgWallet = db.wallets.find((w) => w.ownerType === "ORG");

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Org balance</p>
            <p className="text-3xl font-semibold">{formatCurrency(orgWallet?.balance ?? 0)}</p>
          </CardHeader>
          <CardContent className="text-sm text-muted">
            Pending holds: {formatCurrency(orgWallet?.pending ?? 0)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Queued jobs</p>
            <p className="text-3xl font-semibold">{db.jobs.filter((j) => j.status === "QUEUED").length}</p>
          </CardHeader>
          <CardContent className="text-sm text-muted">
            Background cron endpoint will flip payouts from pending to paid.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Pending payouts</p>
            <p className="text-3xl font-semibold">
              {formatCurrency(db.payouts.filter((p) => p.status === "pending").reduce((acc, p) => acc + p.amount, 0))}
            </p>
          </CardHeader>
          <CardContent className="text-sm text-muted">Run the mock cron to settle.</CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Fund wallet</p>
            <p className="text-sm text-muted">Mock funding provider credits org wallet</p>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-3"
              action={async (formData) => {
                "use server";
                const amount = Number(formData.get("amount"));
                if (!Number.isFinite(amount) || amount <= 0) return;
                await fundWalletAction(amount);
              }}
            >
              <Input type="number" min="1" step="1" name="amount" placeholder="Amount (USD)" required />
              <Button type="submit" className="w-full">
                Add funds
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Create payout</p>
            <p className="text-sm text-muted">Admin-initiated transfer to contractor</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" action={createPayoutAction}>
              <Select name="contractorId" required>
                <option value="">Choose contractor</option>
                {db.contractors.map((contractor) => (
                  <option key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </option>
                ))}
              </Select>
              <Input name="amount" type="number" min="1" step="1" placeholder="Amount (USD)" required />
              <Button type="submit" className="w-full">
                Queue payout
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Fast bank withdrawal</p>
            <p className="text-sm text-muted">Powered by Wise — real rates, transparent fees</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/app/wallet/withdraw">Open withdrawal flow</Link>
            </Button>
            <p className="text-sm text-muted">Best for contractors seeking low FX and quick arrivals.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Ledger</p>
          <Badge tone="subtle">{db.ledger.length} entries</Badge>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted">
              <tr className="border-b border-white/5">
                <th className="px-3 py-2">Reference</th>
                <th className="px-3 py-2">Memo</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {db.ledger.map((entry) => (
                <tr key={entry.id} className="border-b border-white/5">
                  <td className="px-3 py-3">{entry.referenceId}</td>
                  <td className="px-3 py-3 text-muted">{entry.memo ?? entry.referenceType}</td>
                  <td className="px-3 py-3 font-semibold">{formatCurrency(entry.amount)}</td>
                  <td className="px-3 py-3">
                    <StatusBadge status={entry.type === "CREDIT" ? "paid" : "pending"} />
                  </td>
                  <td className="px-3 py-3 text-muted">{new Date(entry.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Background jobs</p>
          <form action={processJobsAction}>
            <Button variant="secondary" type="submit">
              Run cron now
            </Button>
          </form>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted">
              <tr className="border-b border-white/5">
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Payload</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Run at</th>
              </tr>
            </thead>
            <tbody>
              {db.jobs.map((job) => (
                <tr key={job.id} className="border-b border-white/5">
                  <td className="px-3 py-3">{job.type}</td>
                  <td className="px-3 py-3 text-muted">{JSON.stringify(job.payload)}</td>
                  <td className="px-3 py-3">
                    <StatusBadge status={job.status.toLowerCase()} />
                  </td>
                  <td className="px-3 py-3 text-muted">{new Date(job.runAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
