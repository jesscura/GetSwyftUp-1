import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function IntegrationsPage() {
  const wiseConfigured = Boolean(process.env.WISE_API_KEY?.trim());
  const marqetaConfigured = Boolean(
    process.env.MARQETA_API_KEY?.trim() || process.env.CARD_ISSUER_API_KEY?.trim(),
  );
  const integrations = [
    {
      title: "Payments & FX quotes",
      provider: "Wise sandbox",
      status: wiseConfigured
        ? { label: "Ready", tone: "success" as const }
        : { label: "Add WISE_API_KEY", tone: "warning" as const },
      description: "Contractor payouts and FX previews run through Wise mocks.",
      actionLabel: "View payouts",
      href: "/dashboard/payouts",
      meta: wiseConfigured ? "Sandbox token detected for payouts/FX." : "Add your sandbox API key to enable calls.",
    },
    {
      title: "Withdrawals",
      provider: "Wise transfers",
      status: wiseConfigured
        ? { label: "Ready", tone: "success" as const }
        : { label: "Add WISE_API_KEY", tone: "warning" as const },
      description: "Bank withdrawals reuse Wise recipients + transfers with status polling.",
      actionLabel: "Open withdrawal flow",
      href: "/app/wallet/withdraw",
      meta: "Runs payout_status_refresh jobs to mark transfers paid.",
    },
    {
      title: "Card issuance",
      provider: "Marqeta sandbox",
      status: marqetaConfigured
        ? { label: "Ready", tone: "success" as const }
        : { label: "Add MARQETA_API_KEY", tone: "warning" as const },
      description: "Virtual cards are issued from the Marqeta sandbox; swap keys to talk to your provider.",
      actionLabel: "Manage cards",
      href: "/dashboard/cards",
      meta: marqetaConfigured ? "Marqeta sandbox key detected." : "Cards run in mock mode until issuer keys are set.",
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Ecosystem</p>
          <h1 className="font-display text-2xl font-semibold">Integrations</h1>
          <p className="text-sm text-muted">
            Super Admin can manage provider keys via environment variables. Wise powers payouts + withdrawals; Marqeta
            keys control the virtual card rail.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={wiseConfigured ? "success" : "warning"}>
            {wiseConfigured ? "Wise sandbox detected" : "Wise key missing"}
          </Badge>
          <Badge tone={marqetaConfigured ? "success" : "warning"}>
            {marqetaConfigured ? "Marqeta ready" : "Marqeta key missing"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.title} className="bg-panel/80">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted">{integration.provider}</p>
                  <h3 className="font-semibold">{integration.title}</h3>
                </div>
                <Badge tone={integration.status.tone}>{integration.status.label}</Badge>
              </div>
              <p className="text-sm text-muted">{integration.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted">{integration.meta}</p>
              <Button asChild variant="secondary" className="w-full">
                <Link href={integration.href}>{integration.actionLabel}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
