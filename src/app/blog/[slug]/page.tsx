import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingLayout } from "@/components/marketing/marketing-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts, getBlogPost } from "@/data/blog-posts";

type PageParams = { slug: string };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: PageParams }): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | SwyftUp Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: PageParams }) {
  const post = getBlogPost(params.slug);
  if (!post) return notFound();

  return (
    <MarketingLayout>
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-14">
        <header className="space-y-3">
          <Badge tone="accent">{post.category}</Badge>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="text-sm text-muted">
            {new Date(post.date).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
          </p>
          <p className="text-lg text-muted">{post.excerpt}</p>
          <p className="text-xs text-muted">Sample post. Full content will be added when published.</p>
        </header>

        <Card className="bg-white/5">
          <CardContent className="space-y-4 pt-6">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="text-sm leading-7 text-muted">
                {paragraph}
              </p>
            ))}
            <p className="text-xs text-muted">
              TODO: Replace with full article content when ready.
            </p>
          </CardContent>
        </Card>

        <section className="rounded-[var(--radius-card)] border border-[var(--accent)]/30 bg-[linear-gradient(135deg,rgba(92,100,255,0.15),rgba(54,213,255,0.08))] p-8 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-text">See how SwyftUp fits your workflow</h2>
              <p className="text-sm text-muted">Book a demo or start a free workspace.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/contact">Book a Demo</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
