import Link from "next/link";
import type { Metadata } from "next";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "SwyftUp Blog",
  description: "Updates and guides for global contractor payments and remote work.",
};

const featureHighlights = [
  { title: "Global payout basics", description: "Understand rails, timelines, and common pitfalls." },
  { title: "Finance ops playbooks", description: "Approval workflows and audit readiness." },
  { title: "Remote work money tips", description: "How contractors manage cash flow abroad." },
];

export default function BlogPage() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-5xl space-y-10 px-6 py-14">
        <section className="space-y-4">
          <Badge tone="accent">SwyftUp Blog</Badge>
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              SwyftUp Blog
            </h1>
            <p className="text-lg text-muted sm:max-w-3xl">
              Updates and guides for global contractor payments and remote work.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {featureHighlights.map((feature) => (
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

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold">Latest posts</h2>
            <Badge tone="subtle">New</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="h-full bg-white/5">
                <CardContent className="space-y-3 pt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">{post.category}</p>
                  <h3 className="font-display text-xl font-semibold">{post.title}</h3>
                  <p className="text-sm text-muted">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>{new Date(post.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                    <Link className="text-[var(--accent)] underline underline-offset-4" href={`/blog/${post.slug}`}>
                      Read
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-[var(--radius-card)] border border-[var(--accent)]/30 bg-[linear-gradient(135deg,rgba(92,100,255,0.15),rgba(54,213,255,0.08))] p-8 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-text">Want updates in your inbox?</h2>
              <p className="text-sm text-muted">Subscribe for monthly insights and product news.</p>
              <p className="text-xs text-muted">Coming soon: email subscription will be enabled once marketing tooling is connected.</p>
            </div>
            <form className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Input type="email" placeholder="you@company.com" required className="w-full sm:w-64" disabled />
              <Button type="submit" className="w-full sm:w-auto" disabled>
                Subscribe (coming soon)
              </Button>
            </form>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
