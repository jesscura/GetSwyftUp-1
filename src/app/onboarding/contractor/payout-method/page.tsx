import { getDb, savePayoutMethodAction } from "@/lib/data-service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function ContractorPayoutMethodPage() {
  const db = await getDb();
  const contractor = db.contractors.find((c) => c.status !== "active") ?? db.contractors[0];

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <Card className="w-full max-w-3xl border-white/5 bg-[color-mix(in_srgb,var(--panel)_92%,transparent)]">
        <CardHeader className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Contractor onboarding</p>
          <h1 className="font-display text-3xl font-semibold">Payout method (Wise)</h1>
          <p className="text-sm text-muted">We’ll store a provider token only—no raw bank data.</p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-3 md:grid-cols-2" action={savePayoutMethodAction}>
            <input type="hidden" name="contractorId" value={contractor?.id} />
            <Input name="accountHolder" placeholder="Account holder name" required defaultValue={contractor?.name} />
            <Select name="bankCountry" defaultValue="US" required>
              <option value="US">United States</option>
              <option value="MX">Mexico</option>
              <option value="GB">United Kingdom</option>
            </Select>
            <Select name="currency" defaultValue="USD" required>
              <option value="USD">USD</option>
              <option value="MXN">MXN</option>
              <option value="EUR">EUR</option>
            </Select>
            <Input name="providerToken" placeholder="Provider token placeholder" />
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                Continue to card
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
