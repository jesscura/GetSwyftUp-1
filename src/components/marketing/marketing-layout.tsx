import { MarketingFooter } from "@/components/marketing/footer";
import { MarketingHeader } from "@/components/marketing/header";
import { Button } from "@/components/ui/button";
import { navConfig } from "@/config/navConfig";
import Link from "next/link";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <MarketingHeader />
      <main className="flex-1 pb-24 sm:pb-0">{children}</main>
      <MarketingFooter />
      <MobileStickyCTA />
    </div>
  );
}

function MobileStickyCTA() {
  return (
    <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-30 px-4 sm:hidden">
      <div className="pointer-events-auto rounded-[var(--radius-card)] border border-white/10 bg-[color-mix(in_srgb,var(--panel)_94%,transparent)] p-3 shadow-[var(--shadow-elevated)] backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted">Ready to move faster?</p>
            <p className="font-semibold text-sm text-text">Get started in minutes</p>
          </div>
          <Button asChild className="whitespace-nowrap px-4 py-2 text-sm">
            <Link href={navConfig.actions.getStarted}>Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
