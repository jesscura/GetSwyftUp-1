import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDb, updateKycStatusAction } from "@/lib/mock-db";

export const metadata = { title: "Contractor KYC | SwyftUp" };

export default function ContractorKycPage() {
  const db = getDb();
  const contractor = db.contractors.find((c) => c.status !== "active") ?? db.contractors[0];

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <Card className="w-full max-w-3xl border-white/5 bg-[color-mix(in_srgb,var(--panel)_92%,transparent)]">
        <CardHeader className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Contractor onboarding</p>
          <h1 className="font-display text-3xl font-semibold">KYC Verification</h1>
          <p className="text-sm text-muted">Submit basic details to pass KYC and unlock the virtual card.</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" action={async () => updateKycStatusAction(contractor.id, "approved") }>
            <div className="grid gap-3 md:grid-cols-2">
              <Input name="legalName" placeholder="Legal name" required />
              <Input name="idNumber" placeholder="ID number (mock)" required />
              <Input name="country" placeholder="Country" required />
              <Input name="city" placeholder="City" required />
            </div>
            <div className="flex gap-3">
              <Button type="submit">Submit & Approve (Mock)</Button>
              <Button type="button" variant="ghost" onClick={async () => updateKycStatusAction(contractor.id, "rejected")}>Mark Rejected</Button>
            </div>
          </form>
          <p className="mt-3 text-sm text-muted">Current status: {contractor.documents.kyc}</p>
        </CardContent>
      </Card>
    </div>
  );
}
