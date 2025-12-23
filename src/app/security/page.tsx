import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = { title: "Security | SwyftUp" };

export default function SecurityPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-6">
        <h1 className="font-display text-3xl font-semibold">Security</h1>
        <p className="text-muted">SwyftUp adopts audit-grade controls: 2FA, ledger-based money movement, and provider tokenization.</p>
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Highlights</p>
          </CardHeader>
          <CardContent className="text-sm text-muted space-y-2">
            <p>• Ledger-first wallet accounting</p>
            <p>• Two-factor authentication (TOTP)</p>
            <p>• No storage of raw card PAN/CVV</p>
          </CardContent>
        </Card>
      </div>
    </MarketingLayout>
  );
}
