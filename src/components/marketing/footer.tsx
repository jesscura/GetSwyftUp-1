import Link from "next/link";
import { navConfig } from "@/config/navConfig";

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/5 bg-[color-mix(in_srgb,var(--panel)_92%,transparent)]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-white/5 px-3 py-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-card)] bg-[linear-gradient(135deg,var(--brand-1),var(--brand-2))] text-sm font-bold text-white shadow-[var(--shadow-elevated)]">
                SU
              </span>
              <div>
                <p className="font-display text-lg font-semibold">SwyftUp</p>
                <p className="text-xs text-muted">Global contractor finance</p>
              </div>
            </div>
            <p className="text-sm text-muted">{navConfig.footer.tagline}</p>
          </div>
          {navConfig.footer.columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-text">{column.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 rounded-[var(--radius-button)] px-1 py-1 transition hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                    >
                      {link.label}
                      <span aria-hidden className="text-[10px] text-muted">
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">© {new Date().getFullYear()} SwyftUp. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {navConfig.footer.socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-muted transition hover:border-[var(--accent)]/40 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
              >
                <span aria-hidden>♢</span>
                <span className="sr-only">{social.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
