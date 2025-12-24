# SwyftUp Feature Checklist

## MVP — must-have (launch-ready)

### Identity & Security
- Email/password auth working
- Email verification (basic)
- RBAC roles: Worker / Client / Admin
- 2FA (TOTP) + recovery codes
- Audit logs for security actions (login, 2FA enable/disable, password change)

### Onboarding
- Worker onboarding (skills, rate, timezone, availability)
- Client onboarding (company profile, billing contact)
- Onboarding progress state (resume later)
- KYC status tracking (not_started → pending → approved/rejected)

### Work Management
- Projects list + project detail page
- Tasks (basic Kanban or list)
- Milestones (create, approve, release)
- Files upload (S3/R2) or minimal placeholder
- Activity log (basic)

### Payments
- Client creates invoice or milestone payable
- Fund invoice/milestone (mock ok for MVP)
- Release payment to worker wallet (ledger credit)
- Receipts + transaction references

### Wallet (ledger-based)
- Wallet accounts per currency
- Ledger entries (immutable, idempotent)
- Balances computed from ledger
- Holds/reserves (for disputes + card auth)
- Wallet UI: balances + transaction list + filters + CSV export

### Virtual Debit Card
- Card issuance gated by KYC approved
- Freeze/unfreeze
- Spend limits (basic)
- Card transaction feed
- Card auth → wallet hold, settlement → ledger debit, refund → ledger credit

### Notifications
- In-app notification center
- Email notifications for:
  - payment released / wallet credit
  - card freeze/unfreeze
  - 2FA enabled/disabled
- Notification preferences (optional for non-critical)

### Admin
- Users list + role management
- KYC review queue (approve/reject + reason)
- Transactions monitor (ledger + holds)
- Card monitor (issued, status)
- Support tickets view (basic)

## Phase 2 — Growth
- Real payment provider integration (Stripe/Wise)
- FX conversion (with recorded rates + fees)
- Withdrawals to bank (with jobs + settlement states)
- Disputes workflow (open → hold → resolve)
- Better reporting + downloadable statements PDF
- Team/agency accounts for clients
- Mobile-first improvements / mobile app

## Phase 3 — Scale
- Marketplace matching (search + ranking)
- Escrow
- AI matching + summaries
- API access for enterprises
- Advanced risk/fraud tools

## “Clean Up Demo / Dev Sample Info” (production polish)
1. **Content & UI copy cleanup**
   - Remove “demo”, “sample”, “test”, “lorem ipsum” text from landing pages, dashboard widgets, empty states, tooltips, and helper text.
   - Replace placeholder names (e.g., John Doe, Acme Inc).
   - Replace fake amounts/currencies with real computed data (or “—”).
   - Remove “coming soon” placeholders unless intentionally kept.
   - Ensure button labels are consistent (e.g., “Create invoice”, “Release payment”).
2. **Data + seed cleanup**
   - Remove seed scripts that insert fake users/cards/transactions.
   - Keep only dev seed behind an explicit flag `SEED_DEMO_DATA=true` (default false).
   - Ensure production never auto-seeds demo data.
   - Clear demo data migrations or mark them dev-only.
3. **Feature flags / mock modes**
   - Keep mock providers but make it explicit; show “Mock mode” only in dev.
   - Ensure production hides mock banners.
   - Ensure provider toggles depend on env vars (Wise/Marqeta keys).
4. **Remove debug endpoints & logs**
   - Remove/lock any debug APIs: `/api/debug/*`, `/api/dev/*`.
   - Make `/api/cron/process` require secret token header or internal-only access.
   - Strip console logs of tokens, user data, webhook payloads.
   - Add structured logging (optional).
5. **Branding cleanup**
   - Replace all repo/app names with “SwyftUp”.
   - Replace placeholder logos/icons.
   - Update metadata: page titles, OG tags, favicon, app manifest.
6. **Security/compliance cleanup**
   - Ensure no sensitive card data stored (PAN/CVV); mask all card identifiers in UI + logs (only last4).
   - Ensure idempotency keys exist for all money ops.
   - Add webhook signature verification (when provider configured).
   - Add rate limits on login, password reset, 2FA verification.
7. **Navigation + access cleanup**
   - Hide admin routes from non-admin; ensure all demo pages are removed or protected.
   - Remove unused nav items.
   - Maintain consistent “empty state → CTA” patterns everywhere.
8. **Production readiness**
   - `.env.example` updated (no secrets committed).
   - Remove hard-coded API keys.
   - Update README for setup, migrations, webhook testing, cron processing.
   - Ensure build passes in clean environment.
