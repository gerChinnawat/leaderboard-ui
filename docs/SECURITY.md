# 🔒 Security Guide

Security is a **core requirement**, not an optional concern.

This document defines how to build and maintain secure features in this Next.js project.

---

# 🧭 Security Principles

## 1. Never Trust the Client

All client input is untrusted:

- Forms
- Query params
- Headers
- Cookies
- Local storage

Always validate on the server.

---

## 2. Server Is the Source of Truth

Business logic must run on the server:

- Authentication
- Authorization
- Payment logic
- Database access
- Role checks

Never rely on UI logic for security decisions.

---

## 3. Minimize Data Exposure

Only send required data to the client.

❌ Bad

```ts
return {
  user,
  password,
  refreshToken,
  internalNotes,
};
```

✅ Good

```ts
return {
  id: user.id,
  name: user.name,
  role: user.role,
};
```

---

# 🔐 Authentication

## Rules

- Always verify authentication on the server
- Never trust client-side auth state
- Use secure session storage (httpOnly cookies recommended)

---

## Token Storage

### Allowed

- httpOnly cookies
- Secure cookies (HTTPS only)

### Forbidden

- localStorage
- sessionStorage
- exposing tokens in frontend state

---

# 🧑‍⚖️ Authorization

Authentication ≠ Authorization

| Concept        | Meaning          |
| -------------- | ---------------- |
| Authentication | Who are you?     |
| Authorization  | What can you do? |

---

## Rule

Every sensitive operation MUST include:

- user identity check
- permission check

Example:

```ts
if (!user) throw new Error('Unauthorized');

if (user.role !== 'admin') {
  throw new Error('Forbidden');
}
```

---

# 🧾 Input Validation

All external input must be validated.

Library:

- Zod

---

## Example

```ts
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

schema.parse(request.body);
```

---

## Validate Everything

- Request body
- Query params
- Route params
- Headers

---

# 🧨 XSS Protection

Next.js + React escapes HTML by default.

However:

❌ Avoid:

```tsx
dangerouslySetInnerHTML;
```

If required:

- sanitize with DOMPurify
- never inject raw HTML from users

---

# 🧱 CSRF Protection

If using cookies:

- ensure SameSite=Lax or Strict
- validate origin headers on sensitive endpoints

---

# 🌐 Security Headers

Always configure:

- CSP (Content Security Policy)
- HSTS
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

Example baseline:

```text
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

# 🔑 Environment Variables

## Rules

- NEVER commit `.env`
- NEVER expose secrets with `NEXT_PUBLIC_`

---

## Correct usage

```env
# Server only
DATABASE_URL=...
JWT_SECRET=...

# Client safe only
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## Dangerous

```env
NEXT_PUBLIC_JWT_SECRET=abc123
NEXT_PUBLIC_DB_PASSWORD=secret
```

---

# 🧠 Server Actions & API Routes

Every Server Action or API Route is:

> PUBLIC by default

Even if not linked in UI.

---

## Must always include:

- authentication check
- authorization check
- input validation

---

# 🚫 Common Vulnerabilities

## 1. Missing auth check

❌

```ts
export async function deleteUser() {
  await db.user.deleteMany();
}
```

## 2. Trusting client role

❌

```ts
if (role === 'admin') deleteAllData();
```

---

## 3. Exposed secrets in frontend

❌

```ts
NEXT_PUBLIC_STRIPE_SECRET_KEY;
```

---

## 4. Unsafe redirects

❌

```ts
redirect(req.query.next);
```

Always validate:

```ts
if (!next.startsWith('/')) throw new Error('Invalid redirect');
```

---

# 🧩 Dependency Security

Run regularly:

```bash
npm audit
npm outdated
```

Update vulnerable packages immediately.

---

# 📦 Logging Rules

Never log sensitive data:

❌

- passwords
- tokens
- API keys
- personal data

✔ Safe logs:

- request ID
- status code
- timestamps

---

# 🔥 Rate Limiting

Apply to:

- login
- signup
- password reset
- OTP endpoints

Prevents brute force attacks.

---

# 🧪 Security Checklist (Before Merge)

- [ ] Input validated (Zod or equivalent)
- [ ] Auth check implemented
- [ ] Authorization verified
- [ ] No secrets exposed in client
- [ ] No sensitive logs
- [ ] No `dangerouslySetInnerHTML`
- [ ] Environment variables checked
- [ ] API routes protected
- [ ] Redirects validated
- [ ] Dependencies safe

---

# 🧠 Security Mindset

Always assume:

> The client is malicious.

---

# 📌 Summary

Security is not a feature.

It is a **default requirement in every line of code**.
