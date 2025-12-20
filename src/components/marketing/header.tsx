'use client';

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { navConfig, NavGroup } from "@/config/navConfig";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Logo() {
  return (
    <Link
      href={navConfig.brand.href}
      className="group inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-card)] bg-[linear-gradient(135deg,var(--brand-1),var(--brand-2))] text-base font-bold text-white shadow-[var(--shadow-elevated)] transition group-hover:scale-105">
        SU
      </span>
      <div className="leading-tight">
        <p className="font-display text-lg font-semibold tracking-tight">SwyftUp</p>
        <p className="text-xs text-muted">Global contractor finance</p>
      </div>
    </Link>
  );
}

function DesktopDropdown({ group, isOpen, setOpen }: { group: NavGroup; isOpen: boolean; setOpen: (key: string | null) => void }) {
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const related = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(related)) {
      setOpen(null);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(group.label)}
      onMouseLeave={() => setOpen(null)}
      onFocus={() => setOpen(group.label)}
      onBlur={handleBlur}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={cn(
          "flex items-center gap-1 rounded-[var(--radius-pill)] px-3 py-2 text-sm font-semibold text-muted transition hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
          isOpen && "text-text",
        )}
        onClick={() => setOpen(isOpen ? null : group.label)}
      >
        {group.label}
        <span aria-hidden className={cn("text-xs transition", isOpen ? "rotate-180" : "rotate-0")}>
          ▾
        </span>
      </button>
      {isOpen && (
        <div className="absolute left-1/2 z-30 mt-3 w-64 -translate-x-1/2 rounded-[var(--radius-card)] border border-white/10 bg-[color-mix(in_srgb,var(--panel)_95%,transparent)] p-3 shadow-[var(--shadow-elevated)]">
          <ul className="space-y-1" role="menu" aria-label={group.label}>
            {group.items?.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  role="menuitem"
                  className="flex w-full items-start justify-between gap-3 rounded-[var(--radius-card)] px-3 py-2 text-sm font-semibold text-text hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                >
                  <span>{item.label}</span>
                  <span aria-hidden className="text-[10px] text-muted">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MobileAccordion({
  group,
  expanded,
  onToggle,
}: {
  group: NavGroup;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-white/5 bg-white/5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold"
      >
        <span>{group.label}</span>
        <span aria-hidden className={cn("text-xs transition", expanded ? "rotate-180" : "rotate-0")}>▾</span>
      </button>
      {expanded && (
        <div className="space-y-1 border-t border-white/5 px-4 py-2">
          {group.items?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-[var(--radius-button)] px-2 py-2 text-sm text-muted hover:bg-white/5 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function MarketingHeader() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const dropdowns = useMemo(() => navConfig.primary.filter((item) => !item.highlight), []);
  const highlightLink = useMemo(() => navConfig.primary.find((item) => item.highlight), []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[color-mix(in_srgb,var(--panel)_88%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
            {dropdowns.map((group) => (
              <DesktopDropdown
                key={group.label}
                group={group}
                isOpen={openGroup === group.label}
                setOpen={setOpenGroup}
              />
            ))}
            {highlightLink && (
              <Link
                href={highlightLink.href ?? "#"}
                className="rounded-[var(--radius-pill)] border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-2 text-sm font-semibold text-[var(--accent)] shadow-[var(--shadow-soft)] hover:border-[var(--accent)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
              >
                {highlightLink.label}
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={navConfig.actions.signIn}
            className="hidden text-sm font-semibold text-muted transition hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 sm:inline-flex"
          >
            Sign In
          </Link>
          <Button asChild className="hidden sm:inline-flex">
            <Link href={navConfig.actions.getStarted}>Get Started</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-button)] border border-white/10 bg-white/5 text-text transition hover:border-[var(--accent)] sm:hidden"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span aria-hidden className="text-lg">
              {mobileOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-6">
            {dropdowns.map((group) => (
              <MobileAccordion
                key={group.label}
                group={group}
                expanded={Boolean(expanded[group.label])}
                onToggle={() => setExpanded((prev) => ({ ...prev, [group.label]: !prev[group.label] }))}
              />
            ))}
            {highlightLink && (
              <Link
                href={highlightLink.href ?? "#"}
                className="flex items-center justify-between rounded-[var(--radius-card)] border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-3 text-sm font-semibold text-[var(--accent)]"
              >
                {highlightLink.label}
                <span aria-hidden>↗</span>
              </Link>
            )}
            <div className="mt-2 flex flex-col gap-2">
              <Link
                href={navConfig.actions.signIn}
                className="w-full rounded-[var(--radius-button)] border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-text"
              >
                Sign In
              </Link>
              <Button asChild className="w-full">
                <Link href={navConfig.actions.getStarted}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
