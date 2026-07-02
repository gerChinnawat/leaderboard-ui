---
# 🧪 Testing

This project follows the **Testing Pyramid**, prioritizing fast and reliable tests while ensuring critical user flows are covered.

```text
End-to-End (E2E)
Critical User Flows
▲
│
Integration Testing
▲
│
Unit Testing
```
---

## 📚 Testing Strategy

| Test Type        | Tool                         | Purpose                                                   |
| ---------------- | ---------------------------- | --------------------------------------------------------- |
| Unit Test        | Jest + React Testing Library | Test isolated functions, hooks, utilities, and components |
| Integration Test | Jest + React Testing Library | Test interactions between components, hooks, and services |
| End-to-End (E2E) | Playwright                   | Test complete user journeys in a real browser             |

> **Note**
>
> The Next.js team recommends using **Playwright** for end-to-end testing and prefers **E2E tests for async Server Components**, since they are not yet fully supported by Jest. :contentReference[oaicite:1]{index=1}

---

## 🛠️ Testing Setup

### Install Unit & Integration Testing

```bash
npm install -D \
jest \
jest-environment-jsdom \
@testing-library/react \
@testing-library/dom \
@testing-library/jest-dom \
@testing-library/user-event \
@types/jest \
ts-node
```

---

### Install End-to-End Testing

```bash
npm init playwright@latest
```

or

```bash
npm install -D @playwright/test
npx playwright install
```

---

### Required Configuration

```text
.
├── jest.config.ts
├── jest.setup.ts
├── playwright.config.ts
└── tests/
```

Example `jest.setup.ts`

```ts
import '@testing-library/jest-dom';
```

---

### Required Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

---

## 📁 Test Structure

```text
.
├── app/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── __tests__/
│   │   │   │   ├── login.service.test.ts
│   │   │   │   ├── useLogin.test.ts
│   │   │   │   └── LoginForm.test.tsx
│   │   │   └── ...
│   │   │
│   │   └── leaderboard/
│   │       └── __tests__/
│   │
│   └── ...
│
├── tests/
│   ├── e2e/
│   │   ├── login.spec.ts
│   │   ├── leaderboard.spec.ts
│   │   └── profile.spec.ts
│   │
│   ├── fixtures/
│   ├── mocks/
│   └── utils/
│
├── jest.config.ts
├── jest.setup.ts
└── playwright.config.ts
```

---

## 🚀 Running Tests

Run all unit tests

```bash
npm test
```

Watch mode

```bash
npm run test:watch
```

Coverage

```bash
npm run test:coverage
```

Run E2E

```bash
npm run test:e2e
```

Run Playwright UI

```bash
npm run test:e2e:ui
```

---

## ✅ What Should Be Tested

### Utilities

Always test.

- Pure functions
- Calculations
- Formatters

Examples

```ts
calculateScore();
formatDate();
generateAvatar();
```

---

### Services

Always test.

Verify

- API requests
- Response mapping
- Error handling

Examples

```text
authService
leaderboardService
userService
```

---

### Custom Hooks

Test hooks containing business logic.

Examples

```ts
useLogin();
useLeaderboard();
usePagination();
```

Verify

- Returned values
- State changes
- Side effects

---

### Components

Focus on components with behavior.

Examples

- Forms
- Tables
- Modals
- Pagination
- Search

Avoid testing

- Styling
- Layout-only components

---

### Pages

Pages should primarily be tested with Playwright.

Examples

```
/login
/dashboard
/profile
/leaderboard
```

Verify

- Rendering
- Routing
- Authentication
- User interactions
- API integration

---

## 🚫 What NOT to Test

Do not test

- Tailwind classes
- CSS implementation
- React internals
- Third-party libraries
- Next.js framework behavior

Focus on **user behavior**, not implementation details.

---

## 📦 Mocking

Mock external dependencies only.

Examples

- HTTP requests
- Browser APIs
- Local Storage
- Session Storage
- Authentication providers

Avoid mocking

- Business logic
- Utility functions
- Internal feature modules

---

## 📈 Coverage Goals

| Module     |         Target |
| ---------- | -------------: |
| Utilities  |           100% |
| Services   |           90%+ |
| Hooks      |           90%+ |
| Components |           80%+ |
| Pages      | Covered by E2E |

> Coverage is a guideline—not the goal. Prioritize meaningful tests over achieving 100% coverage.

---

## 📜 Test Naming

Describe the expected behavior.

✅ Good

```ts
describe('LoginForm', () => {
  it('should display validation error when email is empty');

  it('should call login API after valid submission');

  it('should redirect after successful login');
});
```

❌ Bad

```ts
it('works');

it('test');

it('login');
```

---

## ✅ Testing Principles

- Test behavior, not implementation.
- Keep tests independent.
- One behavior per test.
- Mock only external dependencies.
- Write deterministic tests.
- Keep tests fast.
- Prefer E2E for user journeys.
- Prefer readability over cleverness.ss
