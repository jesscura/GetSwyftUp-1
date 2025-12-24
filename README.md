# SwyftUp live dashboard

Production-style Next.js (App Router) dashboard for SwyftUp — contractor onboarding, invoices, payouts, wallets, cards, audit logs, and support tickets.

## Stack
- Next.js 16 + TypeScript + Tailwind CSS (v4)
 - Auth: NextAuth (credentials-based workspace accounts)
- Data layer: Prisma + PostgreSQL schema (mocked in-memory data for UI flows)
- Background jobs: simple job table processed via cron endpoint
- Hosting: Railway-ready (see `railway.toml`)

## Quickstart
1) Install dependencies (Node 20+):
```bash
npm install
```
2) Copy environment variables:
```bash
cp .env.example .env   # adjust secrets as needed
```
3) Generate Prisma client (runs automatically on install, available for DB-backed flows):
```bash
npx prisma generate
```
4) Start the app:
```bash
npm run dev
```
Visit `http://localhost:3000`.

### Authentication
- Set `AUTH_EMAIL` and `AUTH_PASSWORD` in your environment to control workspace access (NextAuth credentials).
- Add `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD` for a full-access Super Admin login that bypasses role-specific guards.
- Auth routes: `/auth/sign-in`, `/auth/sign-up`. Protected app routes live under `/app`.

### Integration toggles
- `WISE_API_KEY` marks payments + withdrawals (Wise sandbox) as ready in the dashboard and powers FX quote previews.
- `MARQETA_API_KEY` marks the virtual card rail as configured; cards stay in mock mode until an issuer key is present. (Falls back to `CARD_ISSUER_API_KEY` for legacy envs.)

### Provider API environments
- Wise: Sandbox `https://api.wise-sandbox.com`, Production `https://api.wise.com`
- Marqeta: Sandbox `https://sandbox-api.marqeta.com`, Production `https://api.marqeta.com`

### Mock data, jobs, and seeding
- UI data is served from an in-memory mock store that mirrors the Prisma schema and starts empty.
- Process queued background jobs (e.g., settle payouts): `GET /api/cron/process`.
- Health check: `GET /api/health`.

### Prisma schema
Key models include User, Organization, Membership, ContractorProfile, Invite, Invoice, WalletAccount, LedgerEntry, Payout, Card, CardTransaction, AuditLog, SupportTicket, and Job. The schema lives at `prisma/schema.prisma` with a PostgreSQL datasource (configure `DATABASE_URL`).

Run migrations against a real database when ready:
```bash
npx prisma migrate dev --name init
```

## Deploy on Railway
The included `railway.toml` is configured for Nixpacks with a health check at `/api/health`.
1. Install the [Railway CLI](https://docs.railway.app/reference/cli) and log in.
2. Ensure `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `AUTH_EMAIL`, and `AUTH_PASSWORD` are set in Railway variables.
3. Deploy with `railway up` (service uses `npm run start` to run the standalone server output from `next build`/`output: "standalone"` and respects `PORT`).
