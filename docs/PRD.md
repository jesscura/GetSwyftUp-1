# SwyftUp — Remote Work Platform MVP (Wallet + Virtual Card)

## Personas
- Worker: earns via projects, needs instant access to funds
- Client: funds milestones/invoices, manages vendors
- Admin: oversees KYC, ledger integrity, disputes, monitoring

## MVP Scope
- Auth + 2FA (TOTP), audit logs, login + security notifications
- Worker onboarding: profile → KYC → wallet eligibility → virtual card
- Wallet: ledger-based balances, transactions list, CSV export
- Virtual Card: issue/freeze/unfreeze, limits, transaction feed (mock)
- Payments: invoices, fund wallet, release payouts

## Phase 2
- Email verification flow, PDF receipts, FX conversion, card limits UI
- Provider adapters (KYC, Payment, Card), notifications preferences

## Phase 3
- Advanced dispute handling, holds/reserves, chargeback/reversal flows

## Acceptance Criteria (MVP)
- 2FA: Setup via QR/secret; verify + recovery codes; disable requires re-auth
- Ledger: every balance change written as LedgerEntry; no direct mutations
- Payout: idempotent POST creates pending ledger; job marks paid → posted
- Card: issue requires KYC approved + funded wallet; freeze/unfreeze logged
- Notifications: in-app event records for security and payments

## Analytics Events
- auth.login, auth.2fa_enabled, auth.2fa_disabled
- onboarding.profile_completed, onboarding.kyc_submitted, onboarding.kyc_approved
- wallet.funded, wallet.payout_requested, wallet.payout_completed
- card.issued, card.frozen, card.unfrozen, card.txn_settled
