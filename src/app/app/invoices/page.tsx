import Link from "next/link";
import { createInvoiceAction, getDb } from "@/lib/mock-db";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import { StatusBadge } from "@/components/status-badge";

export default function InvoicesPage() {
  const db = getDb();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Invoices</p>
              <p className="text-sm text-muted">Approve or reject contractor submissions</p>
            </div>
            <Badge tone="subtle">{db.invoices.length} total</Badge>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted">
                <tr className="border-b border-white/5">
                  <th className="px-3 py-2">Memo</th>
                  <th className="px-3 py-2">Contractor</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 text-right">Due</th>
                </tr>
              </thead>
              <tbody>
                {db.invoices.map((invoice) => {
                  const contractor = db.contractors.find((c) => c.id === invoice.contractorId);
                  return (
                    <tr key={invoice.id} className="border-b border-white/5">
                      <td className="px-3 py-3">
                        <Link href={`/app/invoices/${invoice.id}`} className="font-semibold hover:text-[var(--accent)]">
                          {invoice.memo}
                        </Link>
                      </td>
                      <td className="px-3 py-3 text-muted">{contractor?.name}</td>
                      <td className="px-3 py-3 font-semibold">{formatCurrency(invoice.amount)}</td>
                      <td className="px-3 py-3">
                        <StatusBadge status={invoice.status} />
                      </td>
                      <td className="px-3 py-3 text-right text-muted">{invoice.dueDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Create invoice</p>
            <p className="text-sm text-muted">Contractors submit and admins approve</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" action={createInvoiceAction}>
              <Select name="contractorId" required>
                <option value="">Select contractor</option>
                {db.contractors.map((contractor) => (
                  <option key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </option>
                ))}
              </Select>
              <Input name="amount" type="number" placeholder="Amount (USD)" required />
              <Input name="dueDate" type="date" required />
              <Textarea name="memo" placeholder="Work description" required />
              <Button type="submit" className="w-full">
                Submit invoice
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
