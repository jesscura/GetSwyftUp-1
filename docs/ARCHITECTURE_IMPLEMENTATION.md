# Architecture Implementation Plan

## Current System Summary
- **Framework**: Next.js 16 App Router with Tailwind v4 styling tokens in `src/app/globals.css`.
- **Routing shells**: Marketing routes live at `/`, `/about`, etc. Two dashboard shells exist: `/dashboard/*` (role-aware via `src/middleware.ts`) and `/app/*` (static sidebar defined in `src/app/app/layout.tsx`). Shared layout primitives live in `src/components/dashboard`.
- **Auth**: NextAuth credentials provider (`src/lib/auth.ts`) using env `AUTH_EMAIL`/`AUTH_PASSWORD` plus optional `SUPER_ADMIN_*`. Session strategy is JWT; session exposes `user.id` and `user.role`. Privileged roles (OWNER, SUPER_ADMIN) require 2FA through the in-memory TOTP helper in `src/lib/twofactor.ts`. Auth routes are under `/api/auth/[...nextauth]` with UI at `/auth/sign-in` & `/auth/sign-up`.
- **RBAC & nav**: Roles and path guards defined in `src/config/roles.ts`; middleware normalizes `/dashboard/*` paths and redirects unauthorized users. `RoleProvider` in `src/components/dashboard/role-provider.tsx` supplies role context to dashboard pages.
- **Data layer**: Prisma schema exists at `prisma/schema.prisma` (PostgreSQL) with models for users, organizations, memberships, invoices, wallets, ledger entries, payouts, cards, support tickets, jobs, etc. Runtime data is currently served from an in-memory mock store (`src/lib/mock-db.ts`) that mirrors the schema and powers server actions for invites, invoices, payouts, card issuance, onboarding steps, and ledger mutations.
- **API routes**: App Router handlers under `src/app/api/*` wrap mock-db operations. Examples: `/api/cron/process` processes queued jobs, `/api/wallet/balances` exposes wallet balances, `/api/wallet/transactions` lists ledger entries, `/api/card/freeze` toggles card status, `/api/health` returns a heartbeat, and `/api/checklist` surfaces onboarding gates.
- **Background jobs**: Jobs are stored in the mock DB (`Job` records) and processed synchronously by `processJobsAction` when `/api/cron/process` is called. Payout refresh jobs update payout status, create ledger postings, push audit entries, and emit notifications.
- **Notifications & audit**: `src/lib/notification-service.ts` currently logs/collects notification events; `pushAudit` inside `mock-db` writes audit items. Both are in-memory and tied to server actions.
- **Integrations & toggles**: `src/lib/wise-provider.ts` simulates Wise FX quotes/transfers (mock-first, keyed off `WISE_API_KEY`). No Marqeta adapter yet; card flows are mock-only and rely on wallet balance checks in `issueCardAction`.
- **UI**: Dashboard pages under `src/app/dashboard` (role-aware) and `src/app/app` (single-tenant demo) render panels for contractors, invoices, payouts, cards, wallet, settings, audit logs, and support. Components and tokens live in `src/components` with Tailwind v4 styling in `src/app/globals.css`.

## Phase 0 Discovery Map
- **Auth config + session shape**: NextAuth config in `src/lib/auth.ts` (JWT strategy), with session helper in `src/lib/current-user.ts` and 2FA helpers in `src/lib/twofactor.ts`.
- **Middleware / route guards**: `src/middleware.ts` protects `/dashboard/*` via `canAccessPath`; `/app/*` currently renders behind a static layout without middleware gating.
- **UI layout + nav config**: Marketing nav lives in `src/config/navConfig.ts`; dashboard shells are `src/app/layout.tsx`, `src/app/dashboard/layout.tsx`, and `src/app/app/layout.tsx` (sidebar defined inline). Sidebar component is `src/components/dashboard/sidebar.tsx`.
- **Prisma schema + migrations**: Schema in `prisma/schema.prisma`; no migrations checked in yet. Mock runtime mirrors schema inside `src/lib/mock-db.ts`.
- **API route conventions**: App Router handlers under `src/app/api/*` use NextResponse, call `auth()` for gating, and delegate to mock-db/server-actions (e.g., `/api/wallet/*`, `/api/card/*`, `/api/cron/process`).
- **Job/cron system & webhooks**: In-memory `Job` records in `src/lib/mock-db.ts`; `/api/cron/process` runs `processJobsAction`. Webhook patterns not present yet; mock providers live in `lib/wise-provider.ts`.

## Delta Plan (toward full SwyftUp architecture)
1) **Navigation & RBAC**: Expand role-aware nav to the required Worker/Client/Admin Information Architecture and reconcile `/dashboard` vs `/app` shells; ensure middleware guards new paths.  
2) **Module boundaries**: Introduce `/src/modules/*` per domain (auth, onboarding, orgs, contractors, projects, invoices, payments, wallet, cards, notifications, audit, support, admin, jobs, webhooks) with colocated types, services, DB access, API handlers, and UI.  
3) **Database extensions**: Add models for Project/Task/Milestone, KYCVerification, WalletHold, Notification + EmailLog, Dispute, ProviderEventLog, TwoFactorSecret + RecoveryCodes. Add indexes/uniques for ledger idempotency, provider event uniqueness, card transaction uniqueness, and hold status lookups. Ship Prisma migrations + seeds consistent with the existing schema.  
4) **Wallet service**: Implement a ledger-driven `WalletService` (compute balance/available, holds, settle/release, idempotent `postLedgerEntry`) and swap balance mutations to use it.  
5) **Payments & payouts**: Implement invoice funding/release flows that credit wallets, queue payout settlement jobs, and honor Wise mock/real toggle with FX previews.  
6) **Cards**: Add Marqeta adapter (mock-first) plus card↔wallet coupling: auth creates holds, settlement posts debits, reversals release/credit.  
7) **Security & audit**: Persist 2FA secrets/recovery codes, emit AuditLog + Notification entries for sensitive actions, and extend session/guarding accordingly.  
8) **Admin & support**: Build KYC queue, transactions/holds monitor, cards monitor, disputes, support ticket management, and job observer pages under admin nav.  
9) **Webhooks & idempotency**: Add `/api/webhooks/wise` and `/api/webhooks/marqeta` that verify signatures, persist ProviderEventLog, and process events transactionally/idempotently.  
10) **UI system**: Introduce lightweight design primitives (cards/tables/badges/skeletons) and apply consistent spacing/typography across dashboards, wallet, and card feeds.

## Implementation Map (where upcoming features land)
- **Auth + RBAC**: `src/lib/auth.ts`, `src/lib/current-user.ts`, `src/config/roles.ts`, `src/middleware.ts`, `src/components/dashboard/sidebar.tsx`.
- **Wallet & ledger**: `src/lib/mock-db.ts` (temporary), future `src/modules/wallet/*` for ledger/holds service; UI under `src/app/app/wallet` and `src/app/dashboard/payouts`.
- **Projects/Tasks/Milestones**: Add under `src/modules/projects/*` with UI at `src/app/app/projects/*` (placeholder to be added when models exist).
- **Invoices & payouts**: `src/lib/mock-db.ts` actions, `src/app/app/invoices/*`, `src/app/api/wallet/*` for balances/transactions.
- **Cards**: `src/lib/mock-db.ts`, `src/lib/wise-provider.ts` (FX), UI at `src/app/app/cards`, API at `src/app/api/card/*`.
- **Notifications & audit**: `src/lib/notification-service.ts`, audit helpers in `src/lib/mock-db.ts`, UI at `src/app/app/audit-logs`.
- **Jobs & webhooks**: `src/lib/mock-db.ts` + `/api/cron/process`; future real job runner under `src/modules/jobs/*` and webhooks under `src/app/api/webhooks/*`.
- **Docs**: Product/architecture/security docs live in `docs/*.md`.

## Rollout Plan (MVP → Phase 2)
- **MVP (ChangeSets 1–3)**: Ship documentation, role-aware navigation, and foundational wallet/ledger services with idempotent postings, holds, and reporting endpoints/UI.
- **Phase 2 (ChangeSets 4–6)**: Layer workspace Projects/Tasks/Milestones, invoice-to-wallet funding, and virtual card module with provider adapter toggles.
- **Phase 3 (ChangeSets 7–9)**: Enforce 2FA + security notifications, expand admin consoles (KYC/disputes/transactions), add webhook idempotency store, and stabilize background jobs.

## File Map (key touchpoints)
- **Routing/layout**: `src/app/layout.tsx` (root), `src/app/dashboard/layout.tsx` (role-aware shell), `src/app/app/layout.tsx` (demo shell), `src/middleware.ts` (auth + path guard).  
- **Auth & session**: `src/lib/auth.ts` (NextAuth config), `src/lib/current-user.ts` (role resolution), `src/lib/twofactor.ts` (TOTP in-memory), API handler at `src/app/api/auth/[...nextauth]/route.ts`.  
- **RBAC/nav**: `src/config/roles.ts` (roles, nav, permissions), `src/components/dashboard/sidebar.tsx`, `src/components/dashboard/role-provider.tsx`.  
- **Data/mocks**: `src/lib/mock-db.ts` (in-memory store + server actions), `src/lib/onboarding-state.ts` (onboarding gates), `src/lib/wise-provider.ts` (mock Wise), `src/lib/notification-service.ts` (in-app notification collector), `src/lib/idempotency.ts` (helpers).  
- **API endpoints**: `src/app/api/cron/process/route.ts` (job runner), `src/app/api/wallet/*` (balances, transactions, withdraw), `src/app/api/card/*` (issue/freeze), `src/app/api/onboarding/*`, `src/app/api/health/route.ts`.  
- **UI pages**: Dashboard views at `src/app/dashboard/*` (contractors, invoices, payouts, cards, reports, integrations, settings) and app demo views at `src/app/app/*` (wallet, cards, audit-logs, support). Shared UI tokens under `src/components/ui/*` and icons under `src/components/icons.tsx`.  
- **Database schema**: `prisma/schema.prisma` (current models). Future migrations should live under `prisma/migrations/*` and seeds under `prisma/seed.ts` following existing model naming.  
- **Docs**: Product + security docs under `docs/*.md` (PRD, USER_JOURNEYS, SECURITY); this file hosts the living architecture/delta plan for phased implementation.
