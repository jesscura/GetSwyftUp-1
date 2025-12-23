import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = { title: "About | SwyftUp" };

export default function AboutPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-6">
        <h1 className="font-display text-3xl font-semibold">About SwyftUp</h1>
        <p className="text-muted">A remote work platform focused on confident global payouts with an integrated Wallet and Virtual Debit Card.</p>
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Mission</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">Help teams move funds across borders with clarity, auditability, and speed.</p>
          </CardContent>
        </Card>
      </div>
    </MarketingLayout>
  );
}
