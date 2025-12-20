'use client';

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type ChecklistItem = { key: string; label: string; href: string; completed: boolean };

export function SetupChecklistCard({
  items: initialItems,
  userId,
}: {
  items: ChecklistItem[];
  userId: string;
}) {
  const [items, setItems] = useState(initialItems);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allDone = items.every((item) => item.completed);
  if (allDone) return null;

  const handleComplete = async (key: string) => {
    setLoadingKey(key);
    setError(null);
    try {
      const res = await fetch("/api/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, key }),
      });
      if (!res.ok) {
        throw new Error("Unable to save progress");
      }
      const data = await res.json();
      if (!data?.items) {
        throw new Error("Invalid response from server");
      }
      setItems(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <Card className="bg-[color-mix(in_srgb,var(--panel)_94%,transparent)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-muted">Setup checklist</p>
          <h2 className="font-display text-xl font-semibold">Finish onboarding</h2>
        </div>
        <Badge tone="accent">
          {items.filter((i) => i.completed).length}/{items.length} done
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {error && <p className="text-sm text-[var(--brand-2)]">{error}</p>}
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-[var(--radius-card)] border border-white/5 bg-white/5 px-3 py-2"
          >
            <div>
              <p className="text-sm font-semibold">{item.label}</p>
              <Link href={item.href} className="text-xs text-[var(--accent)] underline underline-offset-4">
                Go to section
              </Link>
            </div>
            <Button
              size="sm"
              variant={item.completed ? "secondary" : "primary"}
              disabled={item.completed || loadingKey === item.key}
              onClick={() => handleComplete(item.key)}
            >
              {item.completed ? "Done" : loadingKey === item.key ? "Marking..." : "Mark done"}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
