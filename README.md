# SwyftUp live dashboard

Production-style Next.js (App Router) dashboard for SwyftUp — contractor onboarding, invoices, payouts, wallets, cards, audit logs, and support tickets.

## Stack
- Next.js 16 + TypeScript + Tailwind CSS (v4)
- Auth: NextAuth (credentials-based demo accounts)
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

### Demo authentication
- Default admin: `admin@swyftup.com` / `demo1234!`
- Default contractor: `contractor@swyftup.com` / `demo1234!`
- Any other email with `demo1234!` signs in as Finance (for exploration).
Auth routes: `/auth/sign-in`, `/auth/sign-up`. Protected app routes live under `/app`.

### Mock data, jobs, and seeding
- UI data is served from an in-memory mock store that mirrors the Prisma schema.
- Reset demo data: `POST /api/seed`.
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
2. Ensure `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `DEMO_EMAIL`, and `DEMO_PASSWORD` are set in Railway variables.
3. Deploy with `railway up` (service uses `npm run start` and respects `PORT`).
