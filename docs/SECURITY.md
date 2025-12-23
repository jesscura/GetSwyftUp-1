# Security Checklist (MVP)

- 2FA (TOTP) setup/verify/disable
- Audit logs for security and payment events
- Idempotency on money ops (header: Idempotency-Key)
- Input validation (zod) on server actions and APIs
- No raw card PAN/CVV stored; only last4 and provider refs
- Rate limits (Phase 2) on auth endpoints
- Secure cookies/sessions via NextAuth
- CSRF protection for relevant forms (Phase 2)
- Log redaction for sensitive fields
