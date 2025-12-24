# Security Checklist (MVP)

- 2FA (TOTP) setup/verify/disable with backup codes; secrets encrypted at rest
- Audit logs for security and payment events; capture actor, IP, user-agent, metadata
- Idempotency on money ops (header: Idempotency-Key) and provider webhooks (ProviderEventLog)
- Input validation (zod) on server actions and APIs; reject unexpected fields
- No raw card PAN/CVV stored; only last4, brand, expiry, provider IDs and limits
- Rate limits (Phase 2) on auth/webhook endpoints; lockout/backoff for repeated failures
- Secure cookies/sessions via NextAuth; enforce 2FA for privileged roles
- CSRF protection for relevant forms (Phase 2)
- Log redaction for sensitive fields; avoid secrets in audit/notification payloads
- Background jobs and webhooks must be transaction-safe and idempotent
