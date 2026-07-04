# Project Rules (Consolidated Reference)

> Single source of truth combining README, API_GUIDE, CODING_GUIDE, CONTRIBUTING, GIT_GUIDE, SECURITY, TESTING_GUIDE.
> Load this one file instead of all 7 originals to cut context/retrieval cost.

## Stack

Next.js (App Router) + React + TypeScript + Tailwind + ESLint + Prettier.
Node 20+. Env vars in `.env.local` (never commit `.env`, never `NEXT_PUBLIC_` for secrets).

## Architecture — Feature-Based

No global `/api`, `/services`, `/hooks`. Every domain owns its full stack:

```
app/features/<feature>/{api,components,hooks,services,types,schemas,utils,constants}/index.ts
```

Data flow (one direction only): `Component → Hook → Service → API → Backend`

- Components: render + call hooks only. No fetch, no business logic.
- Hooks (`use*`): state/loading/error, call services.
- Services: business rules, response mapping, error normalization.
- API layer: network calls only, no logic/transforms.
- Route handlers (`app/api/*`): thin adapters calling services.
- Cross-feature imports of internal files = forbidden. Use service orchestration or shared layer.
- Shared (`components/ lib/ utils/ types/`) = generic only (formatDate, debounce, httpClient, cn). No business logic. Never depends on a feature.
- Dependency direction: `app → features → shared`.
- Export feature's public API via its `index.ts` only.
- Standard response shape: `{ success, data, error: { code, message } | null }`.
- Auth logic lives only in `features/auth`; others just consume auth state.

## Naming Conventions

| Item               | Style                        | Example                         |
| ------------------ | ---------------------------- | ------------------------------- |
| Variables          | camelCase                    | `userName`                      |
| Constants (global) | UPPER_SNAKE_CASE             | `MAX_RETRY`                     |
| Booleans           | is/has/can/should prefix     | `isLoading`                     |
| Functions          | camelCase verb-first         | `fetchUsers()`                  |
| Event handlers     | `handle` prefix              | `handleSubmit()`                |
| Components         | PascalCase, describe purpose | `LoginForm`                     |
| Component files    | match component name         | `LoginForm.tsx`                 |
| Hooks              | `use` prefix                 | `useAuth()`                     |
| Interfaces         | PascalCase, no `I` prefix    | `User`                          |
| Type aliases       | PascalCase                   | `UserRole`                      |
| Enums              | PascalCase name+members      | `enum UserRole { Admin }`       |
| Props types        | `<Component>Props`           | `LoginFormProps`                |
| Context            | `Context` suffix             | `AuthContext`                   |
| Services           | `<domain>Service.ts`         | `authService.ts`                |
| API files          | resource/action name         | `login.ts`, `getLeaderboard.ts` |
| Utils              | camelCase, descriptive       | `formatDate.ts`                 |
| Folders            | lowercase                    | `features/`                     |

Layout files use Next.js reserved names (`layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`).
Import order: external → internal → types → styles.
General: descriptive names, single-responsibility functions, no magic numbers, no dead/commented code.

## Git Workflow

Branch from `main`, never commit directly to it.
`type/short-description` (lowercase, hyphens). Types: `feature bugfix hotfix refactor docs test chore`.
Commits = Conventional Commits: `type(scope): description` (`feat fix docs style refactor test build ci perf chore`).
Sync before PR: rebase (preferred) or merge `main`.
PR: concise title, description (what/why/notes/testing), small & reviewable.
Never: commit secrets/`.env`/`node_modules`, force-push shared branches, push broken code to `main`.
Delete branch after merge.

## Workflow / Definition of Done

`branch → implement → tests → lint/test → PR → review → merge`.
Pre-PR checklist: builds, lint passes, tests pass, no TS errors, no console logs/dead code, branch up to date, docs updated if needed.

## Testing (Testing Pyramid)

Unit/Integration: Jest + React Testing Library. E2E: Playwright (also for async Server Components).
Test: utilities (100%), services (90%+), hooks (90%+), components w/ behavior (80%+), pages via E2E.
Don't test: styling, CSS, React internals, third-party libs, framework behavior.
Mock only external deps (HTTP, browser APIs, storage, auth providers) — never internal business logic.
Test names describe behavior: `it('should redirect after successful login')`.
Scripts: `npm test`, `test:watch`, `test:coverage`, `test:e2e`.

## Security

Assume the client is always malicious; server is source of truth for auth/authz/payments/DB/roles.
Every sensitive route/action needs: auth check + authorization check + input validation (Zod).
Minimize data exposure — never return passwords/tokens/internal notes to client.
Tokens: httpOnly secure cookies only. Never localStorage/sessionStorage.
No `dangerouslySetInnerHTML` without DOMPurify sanitization.
Security headers required: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
Never log passwords/tokens/keys/PII. Rate-limit login/signup/reset/OTP endpoints.
Validate all redirects (must be relative/internal). Run `npm audit` regularly.
Every API route/Server Action is public by default even if unlinked in UI — protect explicitly.

## Quick Decision Rules

- Unsure where code goes? → put API/service/hook inside the feature; only extract to shared if truly generic & reused.
- Unsure about git? → small branch, clean commits, simple PR.
- Unsure about security? → assume hostile client, validate + authorize server-side.
