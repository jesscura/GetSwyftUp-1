import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = { title: "FAQ | SwyftUp" };

export default function FAQPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-6">
        <h1 className="font-display text-3xl font-semibold">Frequently Asked Questions</h1>
        <Card>
          <CardHeader>
            <p className="text-sm text-muted">Wallet & Payouts</p>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted">
            <p>How are balances tracked? — Via immutable ledger entries.</p>
            <p>When do funds arrive? — Provider estimates; jobs mark completion.</p>
          </CardContent>
        </Card>
      </div>
    </MarketingLayout>
  );
}
