# CLAUDE.md — Features (Architecture & Naming)

Loaded automatically when working under `app/features/`. See root `CLAUDE.md` for stack/git/workflow.

## Feature-Based Architecture
Each domain owns its full stack:
```
app/features/<feature>/{api,components,hooks,services,types,schemas,utils,constants}/index.ts
```
Data flow (one direction only): `Component → Hook → Service → API → Backend`

- **Components**: render + call hooks only. No `fetch`, no business logic.
- **Hooks** (`use*`): state/loading/error handling, call services, expose UI-friendly API.
- **Services**: business rules, orchestration, response mapping, error normalization.
- **API layer**: network calls only — no business logic, no transforms.
- **Route handlers** (`app/api/*`): thin adapters that call the service layer.

## Rules
- Cross-feature imports of internal files are **forbidden**. Use service orchestration or the shared layer.
- `shared` (`components/ lib/ utils/ types/`) is generic-only (formatDate, debounce, httpClient, cn).
  No business logic. Never depends on a feature.
- Dependency direction: `app → features → shared`.
- Export each feature's public surface via its own `index.ts` only.
  - Preferred: `import { LoginForm, useLogin } from '@/features/auth'`
  - Avoid: `import { LoginForm } from '@/features/auth/components/LoginForm'`
- Auth logic lives only in `features/auth`; other features just consume auth state.
- Standard API response shape:
  ```ts
  type ApiResponse<T> = { success: boolean; data: T | null; error: { code: string; message: string } | null };
  ```

## Naming Conventions (full)
| Item | Style | Example |
|---|---|---|
| Variables | camelCase | `userName` |
| Constants (global) | UPPER_SNAKE_CASE | `MAX_RETRY` |
| Booleans | is/has/can/should prefix | `isLoading`, `hasPermission` |
| Functions | camelCase, verb-first | `fetchUsers()`, `calculateScore()` |
| Event handlers | `handle` prefix | `handleSubmit()` |
| Components | PascalCase, describe purpose (not HTML type) | `LeaderboardCard` not `Card` |
| Component files | match component name | `LeaderboardCard.tsx` |
| Hooks | `use` prefix | `useLeaderboard()` |
| Interfaces | PascalCase, no `I` prefix | `User`, `LoginRequest` |
| Type aliases | PascalCase | `type UserRole = 'admin' \| 'member'` |
| Enums | PascalCase name + members | `enum UserRole { Admin, Member }` |
| Props types | `<Component>Props` | `UserCardProps` |
| Context | `Context` suffix | `AuthContext`, `ThemeContext` |
| Services | `<domain>Service.ts` | `authService.ts`, `leaderboardService.ts` |
| API files | resource/action name | `login.ts`, `getLeaderboard.ts` |
| Utility files | camelCase, descriptive | `formatDate.ts`, `generateAvatar.ts` |
| Folders | lowercase | `features/`, `components/` |

Next.js reserved filenames: `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
(don't rename these; only use custom names like `MainLayout.tsx` for reusable components, not routing files).

Import order: external packages → internal modules → types → styles.

## Example
```ts
// features/auth/api/login.ts — network only
export async function loginApi(payload) {
  const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) });
  if (!res.ok) throw new Error('LOGIN_FAILED');
  return res.json();
}

// features/auth/services/authService.ts — business logic
export const authService = {
  async login(payload) {
    const res = await loginApi(payload);
    return { user: res.user };
  },
};

// features/auth/hooks/useLogin.ts — UI-facing
export function useLogin() {
  const login = async (payload) => authService.login(payload);
  return { login };
}
```
