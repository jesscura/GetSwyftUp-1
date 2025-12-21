import Link from "next/link";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Feature = { title: string; description: string };

type CTAAction = { label: string; href: string };

type CTA = {
  headline: string;
  subhead: string;
  primary: CTAAction;
  secondary: CTAAction;
};

type Section = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type InternalLink = {
  label: string;
  href: string;
};

export type MarketingPageTemplateProps = {
  title: string;
  description: string;
  features: Feature[];
  cta: CTA;
  sections?: Section[];
  internalLinks?: InternalLink[];
  body?: string;
};

export function MarketingPageTemplate({ title, description, features, cta, sections, internalLinks, body }: MarketingPageTemplateProps) {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-5xl px-6 py-14 space-y-12">
        <section className="space-y-4">
          <Badge tone="accent">SwyftUp</Badge>
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{title}</h1>
            <p className="text-lg text-muted sm:max-w-3xl">{description}</p>
          </div>
        </section>

        {sections && (
          <section className="space-y-10">
            {sections.map((section) => (
              <div key={section.heading} className="space-y-3 rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-6">
                <h2 className="font-display text-2xl font-semibold text-text">{section.heading}</h2>
                {section.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-sm leading-6 text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        <section className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full bg-white/5">
              <CardHeader className="border-none pb-2">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)]/15 text-[var(--accent)]">
                    ●
                  </span>
                  <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted">{feature.description}</CardContent>
            </Card>
          ))}
        </section>

        {body && (
          <section className="rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-6 text-sm leading-6 text-muted">
            {body}
          </section>
        )}

        {internalLinks && internalLinks.length > 0 && (
          <section className="space-y-3 rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-6">
            <h2 className="font-display text-xl font-semibold text-text">Suggested internal links</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
              {internalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--accent)] underline decoration-[var(--accent)]/50 underline-offset-4">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-[var(--radius-card)] border border-[var(--accent)]/30 bg-[linear-gradient(135deg,rgba(92,100,255,0.15),rgba(54,213,255,0.08))] p-8 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-text">{cta.headline}</h2>
              <p className="text-sm text-muted">{cta.subhead}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <Link href={cta.primary.href}>{cta.primary.label}</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href={cta.secondary.href}>{cta.secondary.label}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
