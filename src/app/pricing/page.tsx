import Link from "next/link";
import { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getMarketingPage } from "@/data/marketing-pages";

const pageContent = getMarketingPage("pricing");

export const metadata: Metadata = {
  title: pageContent?.seoTitle ?? "Pricing | SwyftUp",
  description:
    pageContent?.seoDescription ?? "Transparent pricing with plan tiers for contractor payouts and controls.",
};

const plans = [
  {
    name: "Starter",
    price: "Starting at $0/mo",
    blurb: "For small teams paying a few contractors.",
    features: [
      "Up to 10 contractors",
      "Invoice collection & approvals",
      "Basic payout tracking",
      "Email support",
    ],
    cta: { label: "Get Started", href: "/auth/sign-up" },
  },
  {
    name: "Growth",
    price: "Starting at $79/mo",
    blurb: "For scaling teams with approvals.",
    features: [
      "Unlimited contractors",
      "Multi-level approvals",
      "FX visibility and payout insights",
      "Exportable audit logs",
      "Chat + email support",
    ],
    cta: { label: "Get Started", href: "/auth/sign-up" },
  },
  {
    name: "Enterprise",
    price: "Contact us",
    blurb: "For advanced controls and procurement.",
    features: [
      "Custom roles & SSO",
      "Dedicated success manager",
      "Procurement & risk reviews",
      "Custom reporting & SLAs",
      "Implementation support",
      "Security questionnaire support",
    ],
    cta: { label: "Book a Demo", href: "/contact" },
  },
];

const fees = [
  {
    title: "Payout fees",
    description: "Flat or volume-based options. See the fee line before you submit a transfer.",
  },
  {
    title: "FX markup",
    description: "Transparent markup over mid-market with live estimates during approval.",
  },
  {
    title: "Processing times",
    description: "Typical arrival windows by corridor with status tracking along the way.",
  },
];

export default function PricingPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-5xl space-y-10 px-6 py-14">
        <section className="space-y-4">
          <Badge tone="accent">Pricing</Badge>
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Pricing that stays simple as you grow.
            </h1>
            <p className="text-lg text-muted sm:max-w-3xl">
              Start small, scale up. Transparent tiers with the approvals, tracking, and audit trail you need. Pricing is
              illustrative—contact us for finalized rates.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className="h-full bg-white/5">
              <CardHeader className="border-none pb-2 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                  {plan.name === "Growth" && <Badge tone="accent">Popular</Badge>}
                </div>
                <p className="text-sm text-muted">{plan.blurb}</p>
                <p className="text-2xl font-semibold">{plan.price}</p>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-0.5 text-[var(--accent)]">●</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full" variant={plan.name === "Enterprise" ? "secondary" : undefined}>
                  <Link href={plan.cta.href}>{plan.cta.label}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-4" id="fees-fx">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold">Fees &amp; FX</h2>
              <p className="text-sm text-muted">Understand payout fees, FX markup, and processing times in plain language.</p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/pricing/fees-fx">View details</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {fees.map((fee) => (
              <Card key={fee.title} className="bg-white/5">
                <CardContent className="space-y-2 pt-6">
                  <h3 className="font-display text-lg font-semibold">{fee.title}</h3>
                  <p className="text-sm text-muted">{fee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted">
            Rates and timelines are examples. TODO: Add live fee tables once finalized.
          </p>
        </section>

        <section className="rounded-[var(--radius-card)] border border-[var(--accent)]/30 bg-[linear-gradient(135deg,rgba(92,100,255,0.15),rgba(54,213,255,0.08))] p-8 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-text">Ready to choose a plan?</h2>
              <p className="text-sm text-muted">See plans, compare tiers, and get started today.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/auth/sign-up">See Plans</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href="/contact">Book a Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
