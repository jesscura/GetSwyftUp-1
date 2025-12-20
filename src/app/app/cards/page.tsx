import { issueCardAction, toggleCardStatusAction, getDb } from "@/lib/mock-db";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select } from "@/components/ui/input";
import { StatusBadge } from "@/components/status-badge";

export default function CardsPage() {
  const db = getDb();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Virtual cards</p>
          <p className="text-sm text-muted">Issue, freeze, and set limits for contractors</p>
        </div>
        <Badge tone="subtle">{db.cards.length} issued</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Cards</p>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted">
                <tr className="border-b border-white/5">
                  <th className="px-3 py-2">Card</th>
                  <th className="px-3 py-2">Owner</th>
                  <th className="px-3 py-2">Limits</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {db.cards.map((card) => {
                  const contractor = db.contractors.find((c) => c.id === card.contractorId);
                  return (
                    <tr key={card.id} className="border-b border-white/5">
                      <td className="px-3 py-3 font-semibold">**** {card.last4}</td>
                      <td className="px-3 py-3 text-muted">{contractor?.name}</td>
                      <td className="px-3 py-3 text-muted">
                        Daily {formatCurrency(card.limits.daily)} · Monthly {formatCurrency(card.limits.monthly)}
                      </td>
                      <td className="px-3 py-3">
                        <StatusBadge status={card.status} />
                      </td>
                      <td className="px-3 py-3 text-right">
                        <form
                          className="inline"
                          action={async () => toggleCardStatusAction(card.id, card.status === "active" ? "frozen" : "active")}
                        >
                          <Button variant="secondary" type="submit">
                            {card.status === "active" ? "Freeze" : "Unfreeze"}
                          </Button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Issue virtual card</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" action={async (formData) => {
              "use server";
              const contractorId = String(formData.get("contractorId") ?? "");
              if (!contractorId) return;
              await issueCardAction(contractorId);
            }}>
              <Select name="contractorId" required>
                <option value="">Select contractor</option>
                {db.contractors.map((contractor) => (
                  <option key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </option>
                ))}
              </Select>
              <Button type="submit" className="w-full">
                Issue card
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Transactions</p>
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
              {db.cardTransactions.map((tx) => {
                const card = db.cards.find((c) => c.id === tx.cardId);
                return (
                  <tr key={tx.id} className="border-b border-white/5">
                    <td className="px-3 py-3">{tx.merchant}</td>
                    <td className="px-3 py-3 font-semibold">{formatCurrency(tx.amount)}</td>
                    <td className="px-3 py-3 text-muted">**** {card?.last4}</td>
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
