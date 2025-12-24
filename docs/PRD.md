# SwyftUp — Remote Work Platform MVP (Wallet + Virtual Card)

## Personas
- Worker: earns via projects, needs instant access to funds
- Client: funds milestones/invoices, manages vendors
- Admin: oversees KYC, ledger integrity, disputes, monitoring

## MVP Scope
- Auth + 2FA (TOTP), audit logs, login + security notifications (mock email + in-app)
- Worker onboarding: profile → KYC gating → wallet eligibility → virtual card
- Wallet: ledger-based balances, holds, transactions list, CSV export
- Virtual Card: issue/freeze/unfreeze, limits, transaction feed (mock-first; Marqeta when configured)
- Payments: invoices, fund wallet, release payouts (Wise mock/real toggle)
- Admin: KYC queue, audit log viewer, jobs monitor, disputes/holds rudiments

## Phase 2 — Implement all of the following
- Email verification flow, PDF receipts, FX conversion, card limits UI
- Provider adapters (KYC, Payment, Card) and notification preferences
- Webhook idempotency/event store
- Projects + milestones linked to invoices/payments

## Phase 3 — Implement all of the following
- Advanced dispute handling, holds/reserves, chargeback/reversal flows

## Acceptance Criteria (MVP) — All must be met
- 2FA: Setup via QR/secret; verify + recovery codes; disable requires re-auth
- Ledger: every balance change written as LedgerEntry; no direct mutations; idempotency keys enforced
- Payout: idempotent POST creates pending ledger; job marks paid → posted; Wise mock/real toggle respected
- Card: issue requires KYC approved + funded wallet; freeze/unfreeze logged; holds settle into ledger debits
- Notifications: in-app event records for security and payments; email stubs allowed in mock mode
- Admin: can view audit logs, KYC queue status, and job queue states

## Analytics Events — Capture all of the following
- auth.login, auth.2fa_enabled, auth.2fa_disabled
- onboarding.profile_completed, onboarding.kyc_submitted, onboarding.kyc_approved
- wallet.funded, wallet.payout_requested, wallet.payout_completed
- card.issued, card.frozen, card.unfrozen, card.txn_settled
