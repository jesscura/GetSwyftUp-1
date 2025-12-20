import Link from "next/link";
import type { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Talk to SwyftUp | Contact",
  description: "Sales, support, or partnerships—send a message and we’ll route it to the right team.",
};

const contactCards = [
  { title: "Sales", description: "Request a demo or ask product questions." },
  { title: "Support", description: "Help with setup, payouts, or access." },
  { title: "Partnerships", description: "Integrations and referrals." },
];

export default function ContactPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-5xl space-y-10 px-6 py-14">
        <section className="space-y-4">
          <Badge tone="accent">Talk to us</Badge>
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Talk to SwyftUp</h1>
            <p className="text-lg text-muted sm:max-w-3xl">
              Sales, support, or partnerships—send a message and we’ll route it to the right team.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {contactCards.map((card) => (
            <Card key={card.title} className="h-full bg-white/5">
              <CardHeader className="border-none pb-2">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)]/15 text-[var(--accent)]">
                    ●
                  </span>
                  <h3 className="font-display text-lg font-semibold">{card.title}</h3>
                </div>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted">{card.description}</CardContent>
            </Card>
          ))}
        </section>

        <ContactForm />

        <section className="rounded-[var(--radius-card)] border border-[var(--accent)]/30 bg-[linear-gradient(135deg,rgba(92,100,255,0.15),rgba(54,213,255,0.08))] p-8 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-text">Want a walkthrough?</h2>
              <p className="text-sm text-muted">Book a time or send a message—we’ll respond ASAP.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <Link href="#contact-form">Book a Demo</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href="#contact-form">Send Message</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
