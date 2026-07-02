# CLAUDE.md — Testing

Loaded automatically when working under `tests/` (and relevant when writing `__tests__/` alongside
feature code). See root `CLAUDE.md` for stack/git/workflow.

## Testing Pyramid
Unit/Integration → Jest + React Testing Library. E2E → Playwright (also preferred for async Server Components).

## What to Test
| Layer | Test? | Target Coverage |
|---|---|---|
| Utilities (pure functions, formatters, calculators) | Always | 100% |
| Services (API requests, response mapping, error handling) | Always | 90%+ |
| Hooks with business logic (returned values, state, side effects) | Always | 90%+ |
| Components with behavior (forms, tables, modals, pagination, search) | Yes | 80%+ |
| Pages (rendering, routing, auth, interactions, API integration) | Via Playwright E2E | E2E-covered |

Coverage is a guideline, not the goal — prioritize meaningful tests over hitting a number.

## What NOT to Test
Tailwind classes, CSS implementation, React internals, third-party libraries, Next.js framework behavior.
Focus on user behavior, not implementation details.

## Mocking
- Mock only external dependencies: HTTP requests, browser APIs, local/session storage, auth providers.
- Never mock business logic, utility functions, or internal feature modules.

## Test Naming
Describe expected behavior, not implementation.
```ts
// ✅ Good
it('should display validation error when email is empty');
it('should redirect after successful login');
// ❌ Bad
it('works'); it('test'); it('login');
```

## Structure
```
app/features/<feature>/__tests__/   # co-located unit/integration tests
tests/e2e/                          # Playwright specs
tests/{fixtures,mocks,utils}/
```

## Scripts
```bash
npm test              # unit/integration
npm run test:watch
npm run test:coverage
npm run test:e2e      # Playwright
npm run test:e2e:ui
```

## Principles
Test behavior, not implementation. One behavior per test. Keep tests independent, deterministic, and fast.
