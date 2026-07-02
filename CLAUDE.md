# CLAUDE.md — Project Rules

This file is always loaded. Nested `CLAUDE.md` files load automatically only when you're
working in that folder — see the table at the bottom.

## Stack
Next.js (App Router) + React + TypeScript + Tailwind + ESLint + Prettier. Node 20+.
Env vars in `.env.local`. Never commit `.env`. Never put secrets in `NEXT_PUBLIC_*` vars.

## Architecture (one-line summary)
Feature-based: each domain owns its own `api/service/hooks/types` under `app/features/<name>/`.
No global `/api`, `/services`, `/hooks` folders. Full rules: `app/features/CLAUDE.md`.

## Git
Branch from `main`: `type/short-description` (`feature bugfix hotfix refactor docs test chore`).
Commits = Conventional Commits: `type(scope): description`.
Rebase before PR. Never push directly to `main` or force-push shared branches.

## Workflow / Definition of Done
`branch → implement → tests → lint/test → PR → review → merge`.
Before requesting review: builds, lint passes, tests pass, no TS errors, no dead code/console logs,
branch up to date with `main`, docs updated if needed.

## Naming Cheat Sheet
| Item | Style | Example |
|---|---|---|
| Variables | camelCase | `userName` |
| Constants (global) | UPPER_SNAKE_CASE | `MAX_RETRY` |
| Booleans | is/has/can/should | `isLoading` |
| Functions | camelCase, verb-first | `fetchUsers()` |
| Event handlers | `handle` prefix | `handleSubmit()` |
| Components | PascalCase | `LoginForm` |
| Hooks | `use` prefix | `useAuth()` |
| Interfaces/Types | PascalCase, no `I` prefix | `User`, `UserRole` |
| Props types | `<Component>Props` | `LoginFormProps` |
| Services | `<domain>Service.ts` | `authService.ts` |
| Folders | lowercase | `features/` |

Full naming rules (enums, context, API files, utils, imports order): `app/features/CLAUDE.md`.

## Quick Decision Rules
- Unsure where code goes? → keep it inside the feature; extract to `shared` only if generic & reused.
- Unsure about security? → assume the client is hostile; validate + authorize server-side. See `app/api/CLAUDE.md`.
- Unsure about testing? → see `tests/CLAUDE.md`.

## Nested Rule Files (auto-loaded by folder)
| Folder | File | Covers |
|---|---|---|
| `app/features/` | `app/features/CLAUDE.md` | Architecture, data flow, naming details |
| `app/api/` | `app/api/CLAUDE.md` | Security requirements for routes/actions |
| `tests/` | `tests/CLAUDE.md` | Testing pyramid, coverage targets, mocking rules |
