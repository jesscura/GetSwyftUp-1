import Link from "next/link";
import { completeCompanySetupAction, getDb } from "@/lib/data-service";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function CompanySetupPage() {
  const db = await getDb();
  const checklist = [
    { label: "Invite contractor", href: "/app/contractors" },
    { label: "Invite team member", href: "/app/settings" },
    { label: "Add funding method", href: "/app/wallet" },
    { label: "Verify business details", href: "/app/settings" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <Card className="w-full max-w-3xl border-white/5 bg-[color-mix(in_srgb,var(--panel)_92%,transparent)]">
        <CardHeader className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Quick setup</p>
          <h1 className="font-display text-3xl font-semibold">Finish onboarding</h1>
          <p className="text-sm text-muted">Guided steps to reach your dashboard faster.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {checklist.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-[var(--radius-card)] border border-white/5 px-4 py-3">
              <div className="flex items-center gap-3">
                <Badge tone="subtle">Step</Badge>
                <p className="font-semibold">{item.label}</p>
              </div>
              <Link href={item.href} className="text-sm text-[var(--accent)]">
                Open
              </Link>
            </div>
          ))}
          <form action={completeCompanySetupAction}>
            <Button type="submit" className="w-full">
              Skip to dashboard
            </Button>
          </form>
          <div className="flex items-center gap-2">
            <Badge tone="accent">{db.org.name}</Badge>
            <p className="text-sm text-muted">Primary currency: {db.org.currency}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
