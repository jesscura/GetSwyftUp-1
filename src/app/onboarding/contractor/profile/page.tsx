import { getDb, completeContractorProfileAction } from "@/lib/data-service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function ContractorProfilePage() {
  const db = await getDb();
  const contractor = db.contractors.find((c) => c.status !== "active") ?? db.contractors[0];

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <Card className="w-full max-w-3xl border-white/5 bg-[color-mix(in_srgb,var(--panel)_92%,transparent)]">
        <CardHeader className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Contractor onboarding</p>
          <h1 className="font-display text-3xl font-semibold">Profile</h1>
          <p className="text-sm text-muted">We’ll use this for compliance and payouts.</p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3 md:grid-cols-2" action={completeContractorProfileAction}>
            <input type="hidden" name="contractorId" value={contractor?.id} />
            <Input name="legalName" placeholder="Legal full name" required className="md:col-span-2" defaultValue={contractor?.name} />
            <Input name="displayName" placeholder="Display name (optional)" />
            <Input name="phone" placeholder="Phone (optional)" />
            <Input name="country" placeholder="Country" required defaultValue="US" />
            <Input name="city" placeholder="City" required defaultValue="Austin" />
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                Continue to payout method
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
