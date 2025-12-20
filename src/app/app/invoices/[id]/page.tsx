import { notFound } from "next/navigation";
import { approveInvoiceAction, getDb } from "@/lib/mock-db";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const db = getDb();
  const invoice = db.invoices.find((i) => i.id === params.id);
  if (!invoice) return notFound();
  const contractor = db.contractors.find((c) => c.id === invoice.contractorId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Invoice</p>
          <h1 className="font-display text-3xl font-semibold">{invoice.memo}</h1>
          <p className="text-sm text-muted">Due {invoice.dueDate}</p>
        </div>
        <StatusBadge status={invoice.status} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Amount</p>
              <p className="text-3xl font-semibold">{formatCurrency(invoice.amount)}</p>
            </div>
            <Badge tone="subtle">{contractor?.name}</Badge>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted">
            <p>Contractor: {contractor?.email}</p>
            <p>Created: {new Date(invoice.createdAt).toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Actions</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <form action={async () => approveInvoiceAction(invoice.id)}>
              <Button className="w-full" type="submit" disabled={invoice.status === "approved" || invoice.status === "paid"}>
                Approve invoice
              </Button>
            </form>
            <Button variant="secondary" className="w-full" type="button">
              Export receipt
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Activity timeline</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {invoice.timeline.map((item) => (
            <div key={item.at} className="flex items-center justify-between rounded-[var(--radius-card)] border border-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <p className="font-semibold">{item.label}</p>
              </div>
              <p className="text-sm text-muted">{new Date(item.at).toLocaleString()}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
