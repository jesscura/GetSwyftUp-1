import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/mock-db";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";

export default function ContractorDetailPage({ params }: { params: { id: string } }) {
  const db = getDb();
  const contractor = db.contractors.find((c) => c.id === params.id);
  if (!contractor) return notFound();
  const wallet = db.wallets.find((w) => w.id === contractor.walletId);
  const invoices = db.invoices.filter((inv) => inv.contractorId === contractor.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Contractor</p>
          <h1 className="font-display text-3xl font-semibold">{contractor.name}</h1>
          <p className="text-sm text-muted">{contractor.email}</p>
        </div>
        <Badge tone="accent">Profile</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Payout method</p>
            <p className="text-lg font-semibold">{contractor.payoutMethod}</p>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted">
            <p>Tax document: {contractor.documents.tax}</p>
            <p>KYC: {contractor.documents.kyc}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Wallet balance</p>
            <p className="text-2xl font-semibold">{wallet ? formatCurrency(wallet.balance) : "—"}</p>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted">
            <p>Pending: {wallet ? formatCurrency(wallet.pending) : "—"}</p>
            <p>Owner: {contractor.name}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Status</p>
            <StatusBadge status={contractor.status} />
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted">
            <p>Invite email sent to {contractor.email}</p>
            <p>Org: SwyftUp Capital</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Invoices</p>
          <Link href="/app/invoices" className="text-sm text-[var(--accent)]">
            Manage
          </Link>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted">
              <tr className="border-b border-white/5">
                <th className="px-3 py-2">Memo</th>
                <th className="px-3 py-2">Due</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-white/5">
                  <td className="px-3 py-3">{invoice.memo}</td>
                  <td className="px-3 py-3 text-muted">{invoice.dueDate}</td>
                  <td className="px-3 py-3 font-semibold">{formatCurrency(invoice.amount)}</td>
                  <td className="px-3 py-3">
                    <StatusBadge status={invoice.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
