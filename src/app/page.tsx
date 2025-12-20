import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const navLinks = [
  { label: "Platform", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "/pricing" },
];

const features = [
  {
    title: "Unified onboarding",
    description:
      "Collect KYC, tax, and payment preferences in one guided flow tailored for contractors.",
  },
  {
    title: "Currency-smart payouts",
    description:
      "Route payments through optimized corridors with transparent fees and guaranteed arrival windows.",
  },
  {
    title: "Billing automation",
    description:
      "Generate invoices from approved work logs, apply tax rules, and schedule releases with guardrails.",
  },
  {
    title: "Compliance audit trail",
    description:
      "Immutable logs, versioned agreements, and attestations keep auditors satisfied without slowing teams.",
  },
  {
    title: "Revenue-safe controls",
    description:
      "Approval policies, two-person review, and velocity limits keep large disbursements under control.",
  },
  {
    title: "Insights that reassure",
    description:
      "Liquidity overviews, exception alerts, and variance analysis make finance teams confident and calm.",
  },
];

const steps = [
  {
    title: "Model your vendors",
    copy: "Upload contractors, entities, and banking rules. SwyftUp normalizes every profile automatically.",
  },
  {
    title: "Approve with intent",
    copy: "Finance sets thresholds, approvers, and currencies per region so every release follows policy.",
  },
  {
    title: "Pay with clarity",
    copy: "Trigger payouts with a clear ledger, status signals, and downloadable receipts for auditors.",
  },
];

const trust = [
  "SOC2-aligned controls and encrypted data paths",
  "Granular roles with audit-grade approvals",
  "Automated sanctions and watchlist screening",
  "Disaster recovery playbooks with 99.9% uptime targets",
];

const proof = ["ARCHWAY", "LUMENFI", "PARALLAX", "NORTHSTAR", "CIRCUIT", "ALTAIR"];

export default function Home() {
  return (
    <div className="bg-bg text-text">
      <div className="absolute inset-0 -z-10 opacity-40 blur-3xl">
        <div className="absolute left-10 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,var(--brand-1),transparent_60%)]" />
        <div className="absolute right-16 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,var(--brand-2),transparent_60%)]" />
      </div>
      <header className="sticky top-0 z-20 border-b border-white/5 bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-card)] bg-[linear-gradient(135deg,var(--brand-1),var(--brand-2))] text-base font-bold text-white shadow-[var(--shadow-elevated)]">
              SU
            </span>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight">SwyftUp</p>
              <p className="text-xs text-muted">Global contractor finance</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <Link href="/pricing">See pricing</Link>
            </Button>
            <Button>Book a walkthrough</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <section className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/5 bg-[color-mix(in_srgb,var(--panel)_92%,transparent)] px-8 py-16 shadow-[var(--shadow-soft)]">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_30%,rgba(92,100,255,0.25),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(210,60,161,0.2),transparent_45%)]" />
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-6">
              <Badge tone="accent">Trusted payout workspace</Badge>
              <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Confident global payouts
              </h1>
              <p className="text-lg text-muted sm:max-w-xl">
                SwyftUp keeps contractor onboarding, billing, approvals, and payouts organized in one calm,
                auditable system so finance teams can move funds with certainty.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="w-full sm:w-auto">Start a secure demo</Button>
                <Button variant="secondary" className="w-full sm:w-auto" asChild>
                  <Link href="/pricing">Compare plans</Link>
                </Button>
              </div>
            </div>
            <Card className="w-full max-w-md bg-white/5">
              <CardHeader>
                <p className="text-xs uppercase tracking-wide text-muted">Live payout overview</p>
                <p className="text-2xl font-semibold">This week&apos;s releases</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Scheduled</span>
                  <span className="text-lg font-semibold">$482,400</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">In review</span>
                  <span className="text-lg font-semibold text-[var(--accent)]">$128,900</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Exception holds</span>
                  <span className="text-lg font-semibold text-[var(--brand-2)]">$14,200</span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-white/5">
                  <span className="absolute left-0 top-0 h-full w-[68%] rounded-full bg-[linear-gradient(90deg,var(--brand-1),var(--brand-2))]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.15em] text-muted">Relied on by modern finance teams</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              {proof.map((item) => (
                <span
                  key={item}
                  className="rounded-[var(--radius-pill)] border border-white/5 bg-white/5 px-4 py-2 font-semibold tracking-wide"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="mt-14 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.15em] text-muted">Platform depth</p>
              <h2 className="font-display text-3xl font-semibold">Everything under one steady roof</h2>
            </div>
            <Badge tone="subtle">Enterprise ready</Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title} className="h-full bg-white/5">
                <CardContent className="space-y-3 pt-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)] bg-[var(--brand-1)]/15 text-[var(--brand-1)]">
                      ●
                    </span>
                    <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm leading-6 text-muted">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="how" className="mt-16">
          <div className="flex flex-col gap-8 rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-8 shadow-[var(--shadow-soft)] md:flex-row md:items-start md:justify-between">
            <div className="max-w-md space-y-2">
              <p className="text-sm uppercase tracking-[0.15em] text-muted">How it works</p>
              <h2 className="font-display text-3xl font-semibold">Built for confident releases</h2>
              <p className="text-muted">
                Every stage has a ledger, approval record, and export so nothing feels like a black box.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
              {steps.map((step, idx) => (
                <Card key={step.title} className="bg-panel/70">
                  <CardContent className="space-y-3 pt-6">
                    <Badge tone="accent">Step {idx + 1}</Badge>
                    <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted">{step.copy}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="security" className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-white/5">
            <CardHeader>
              <p className="text-sm uppercase tracking-[0.15em] text-muted">Security & trust</p>
              <h2 className="font-display text-3xl font-semibold">Controls that stand up to scrutiny</h2>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {trust.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)]/20 text-[var(--accent)]">
                    ✓
                  </span>
                  <p className="text-sm text-muted">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-panel/70">
            <CardContent className="flex h-full flex-col justify-between gap-6 pt-6">
              <div>
                <p className="text-sm uppercase tracking-[0.15em] text-muted">Continuity</p>
                <h3 className="font-display text-2xl font-semibold">
                  Calm reporting with clear ownership
                </h3>
                <p className="mt-3 text-sm text-muted">
                  Role-based access, per-region policies, and exportable reports keep auditors confident while
                  operators stay fast.
                </p>
              </div>
              <div className="space-y-3 rounded-[var(--radius-card)] border border-white/5 bg-black/20 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Controls passed</span>
                  <span className="text-lg font-semibold text-[var(--accent)]">28/30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Avg. approval time</span>
                  <span className="text-lg font-semibold">3h 12m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Exceptions resolved</span>
                  <span className="text-lg font-semibold text-[var(--brand-2)]">92%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 rounded-[var(--radius-card)] border border-[var(--accent)]/30 bg-[linear-gradient(135deg,rgba(92,100,255,0.18),rgba(210,60,161,0.18))] p-8 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.15em] text-muted">Next step</p>
              <h3 className="font-display text-2xl font-semibold">
                See how SwyftUp handles your payout map
              </h3>
              <p className="text-muted">
                Share your payout frequency, currencies, and approval policy. We return a mapped rollout plan.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="w-full sm:w-auto">Request rollout map</Button>
              <Button variant="secondary" className="w-full sm:w-auto" asChild>
                <Link href="/dashboard">Preview the workspace</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-panel/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">SwyftUp</p>
            <p className="text-sm text-muted">Payments and billing made trustworthy for modern teams.</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted">
            <Link href="/pricing" className="hover:text-text">
              Pricing
            </Link>
            <Link href="/dashboard" className="hover:text-text">
              Dashboard
            </Link>
            <a href="#security" className="hover:text-text">
              Security
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
