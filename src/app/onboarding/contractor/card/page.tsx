import { contractorCardDecisionAction, getDb } from "@/lib/data-service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ContractorCardPage() {
  const db = await getDb();
  const contractor = db.contractors.find((c) => c.status !== "active") ?? db.contractors[0];
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <Card className="w-full max-w-3xl border-white/5 bg-[color-mix(in_srgb,var(--panel)_92%,transparent)]">
        <CardHeader className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Instant card spend (convenience)</p>
          <h1 className="font-display text-3xl font-semibold">Virtual card</h1>
          <p className="text-sm text-muted">Cards are funded from your wallet. Not for FX optimization.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <form action={contractorCardDecisionAction} className="space-y-3">
            <input type="hidden" name="contractorId" value={contractor?.id} />
            <Button type="submit" name="choice" value="issue" className="w-full">
              Yes, issue my virtual card
            </Button>
            <Button type="submit" variant="secondary" name="choice" value="skip" className="w-full">
              Not now
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
