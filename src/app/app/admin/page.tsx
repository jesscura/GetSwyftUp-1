import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getDb } from "@/lib/mock-db";

export const metadata = { title: "Admin Console | SwyftUp" };

export default function AdminConsolePage() {
  const db = getDb();
  const kycQueue = db.contractors.filter((c) => c.documents.kyc === "pending");
  const disputes = [] as Array<{ id: string; reason: string }>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <p className="text-sm text-muted">KYC Review Queue</p>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted">
          {kycQueue.length === 0 ? (
            <p>All clear.</p>
          ) : (
            kycQueue.map((c) => <p key={c.id}>{c.name} — {c.email}</p>)
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-sm text-muted">Transaction Monitoring</p>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted">
          <p>Basic monitoring placeholder. Extend with rules and alerts.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-sm text-muted">Disputes</p>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted">
          {disputes.length === 0 ? <p>No disputes.</p> : disputes.map((d) => <p key={d.id}>{d.reason}</p>)}
        </CardContent>
      </Card>
    </div>
  );
}
