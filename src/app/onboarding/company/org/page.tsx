import { updateOrgProfileAction } from "@/lib/data-service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";

export default function CompanyOrgPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <Card className="w-full max-w-3xl border-white/5 bg-[color-mix(in_srgb,var(--panel)_92%,transparent)]">
        <CardHeader className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Create organization</p>
          <h1 className="font-display text-3xl font-semibold">Company onboarding</h1>
          <p className="text-sm text-muted">Set up your workspace to pay contractors.</p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" action={updateOrgProfileAction}>
            <Input name="name" placeholder="Organization name" required className="md:col-span-2" />
            <Select name="country" required defaultValue="US">
              <option value="US">United States</option>
              <option value="MX">Mexico</option>
              <option value="GB">United Kingdom</option>
            </Select>
            <Input name="website" placeholder="Company website" />
            <Select name="teamSize" defaultValue="1-10">
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </Select>
            <Select name="payoutVolume" defaultValue="<50k">
              <option value="<50k">&lt; $50k/month</option>
              <option value="50k-250k">$50k - $250k</option>
              <option value="250k-1m">$250k - $1m</option>
              <option value="1m+">$1m+</option>
            </Select>
            <Select name="currency" defaultValue="USD">
              <option value="USD">USD</option>
              <option value="MXN">MXN</option>
              <option value="EUR">EUR</option>
            </Select>
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                Create organization
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
