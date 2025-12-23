import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getDb } from "@/lib/mock-db";
import { formatCurrency } from "@/lib/format";

export const metadata = { title: "Wallet Transactions | SwyftUp" };

export default function WalletTransactionsPage() {
  const db = getDb();
  const entries = db.ledger;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <p className="text-sm text-muted">Ledger entries</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {entries.map((e) => (
              <div key={e.id} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 rounded-[var(--radius-card)] border border-white/5 px-3 py-2 text-sm">
                <div>
                  <p className="font-semibold">{e.referenceType}</p>
                  <p className="text-xs text-muted">Ref: {e.referenceId}</p>
                </div>
                <div className="text-xs text-muted">{new Date(e.createdAt).toLocaleString()}</div>
                <div className="text-xs text-muted">{e.type}</div>
                <div className="font-mono">{formatCurrency(e.amount)} {e.currency}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
