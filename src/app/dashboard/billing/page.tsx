import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  const wiseConfigured = Boolean(process.env.WISE_API_KEY?.trim());
  const marqetaConfigured = Boolean(
    process.env.MARQETA_API_KEY?.trim() || process.env.CARD_ISSUER_API_KEY?.trim(),
  );
  const paymentMethods = [
    {
      type: "Wise sandbox payout balance",
      last4: wiseConfigured ? "WISE" : "Missing",
      status: wiseConfigured ? "Ready" : "Add sandbox key",
    },
    {
      type: "Marqeta virtual card",
      last4: marqetaConfigured ? "MRQT" : "Sandbox",
      status: marqetaConfigured ? "Active" : "Configure issuer",
    },
    { type: "Corporate card", last4: "1024", status: "Active" },
    { type: "Treasury account", last4: "8841", status: "On file" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Account</p>
          <h1 className="font-display text-2xl font-semibold">Billing</h1>
          <p className="text-sm text-muted">
            Keep payment methods and plan details current to avoid payout interruptions.
          </p>
        </div>
        <Button>Update plan</Button>
      </div>

      <Card className="bg-panel/80">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <p className="text-sm text-muted">Current plan</p>
            <h2 className="font-display text-xl font-semibold">Growth</h2>
            <p className="text-sm text-muted">Billed monthly · Next invoice Feb 5</p>
          </div>
          <Badge tone="accent">Most popular</Badge>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4">
            <p className="text-sm text-muted">Usage this month</p>
            <p className="text-2xl font-semibold">$4,820</p>
            <p className="text-xs text-muted">Includes 12 active contractors</p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4">
            <p className="text-sm text-muted">Credits applied</p>
            <p className="text-2xl font-semibold text-[var(--accent)]">$640</p>
            <p className="text-xs text-muted">Pilot program incentive</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-panel/80">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <p className="text-sm text-muted">Payment methods</p>
            <p className="text-xs text-muted">Prioritize at least two methods for continuity</p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/dashboard/integrations">Add method</Link>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex flex-wrap items-center gap-2 rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4">
            <Badge tone={wiseConfigured ? "success" : "warning"}>
              {wiseConfigured ? "Wise sandbox ready" : "Wise key missing"}
            </Badge>
            <Badge tone={marqetaConfigured ? "success" : "warning"}>
              {marqetaConfigured ? "Marqeta sandbox ready" : "Marqeta key missing"}
            </Badge>
            <p className="text-xs text-muted">
              Invoice payouts route through Wise; card payments ride the Marqeta sandbox rail.
            </p>
          </div>
          {paymentMethods.map((method) => (
            <div
              key={method.last4}
              className="flex items-center justify-between rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4"
            >
              <div>
                <p className="font-semibold">{method.type}</p>
                <p className="text-sm text-muted">•••• {method.last4}</p>
              </div>
              <Badge tone="subtle">{method.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
