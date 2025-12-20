'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type NavItem = {
  name: string;
  href: string;
  badge?: string;
  icon?: ReactNode;
};

export function Sidebar({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-full max-w-[250px] flex-col border-r border-white/5 bg-panel/80 px-4 py-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">SwyftUp</p>
          <p className="text-xs text-muted">Contractor finance</p>
        </div>
        <Badge tone="accent">Live</Badge>
      </div>

      <nav className="mt-8 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-[var(--radius-card)] px-3 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                active
                  ? "border border-[var(--accent)]/60 bg-[var(--accent)]/15 text-white"
                  : "text-muted hover:border hover:border-white/10 hover:text-text",
              )}
            >
              <span className="flex items-center gap-2">
                {item.icon && <span className="text-muted">{item.icon}</span>}
                {item.name}
              </span>
              {item.badge && (
                <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-muted">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 rounded-[var(--radius-card)] border border-white/5 bg-white/5 p-4">
        <p className="text-sm font-semibold">Operational health</p>
        <div className="space-y-2 text-xs text-muted">
          <div className="flex items-center justify-between">
            <span>Uptime</span>
            <span className="text-[var(--accent)]">99.9%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Open exceptions</span>
            <span className="text-[var(--brand-2)]">3</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Pending approvals</span>
            <span className="text-text">12</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
