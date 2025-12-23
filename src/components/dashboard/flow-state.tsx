'use client';

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FlowState({
  title,
  description,
  blockers,
  ctaHref,
  ctaLabel = "Fix issue",
}: {
  title: string;
  description: string;
  blockers: string[];
  ctaHref: string;
  ctaLabel?: string;
}) {
  if (blockers.length === 0) return null;
  return (
    <Card className="border-[var(--brand-2)]/30 bg-[color-mix(in_srgb,var(--panel)_92%,transparent)]">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[var(--brand-2)]">Action blocked</p>
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted">{description}</p>
        </div>
        <Badge tone="accent">{blockers.length} blockers</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <ul className="space-y-1 text-sm text-muted">
          {blockers.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand-2)]" />
              {b}
            </li>
          ))}
        </ul>
        <Button asChild>
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
