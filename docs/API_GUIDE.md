# 🌐 API Guide (Feature-Based Architecture)

This project uses a **feature-module based architecture** where each business domain owns its entire data flow.

Each feature contains:

- API layer
- Service layer
- Hooks layer
- Types layer

This ensures high cohesion and low coupling across the codebase.

---

# 🧭 Core Principle

> Each feature is responsible for its own data flow.

There is no global “API layer”.

Instead, APIs are **scoped inside each feature**.

---

# 🏗 Architecture Overview (Feature-Based)

```text
UI (Component)
   ↓
Hook (Feature Layer)
   ↓
Service (Feature Layer)
   ↓
API (Feature Layer)
   ↓
Backend / External API
```

---

# 📦 Feature Structure

Each feature owns its full stack logic:

```text
features/
  auth/
    api/
      login.ts
      logout.ts

    services/
      authService.ts

    hooks/
      useLogin.ts

    types/
      auth.types.ts

    index.ts
```

---

# 📌 Layer Responsibilities (Per Feature)

## 1. Components (UI Layer)

- Render UI
- Call feature hooks only
- No direct API calls

❌ Forbidden:

- fetch()
- business logic

---

## 2. Hooks (Feature Application Layer)

Responsibilities:

- state management
- loading/error handling
- calling services
- exposing UI-friendly API

Example:

```ts
export function useLogin() {
  const login = async (payload) => {
    return authService.login(payload);
  };

  return { login };
}
```

---

## 3. Services (Business Logic Layer)

Responsibilities:

- business rules
- orchestration
- response mapping
- error normalization

Example:

```ts
import { loginApi } from '../api/login';

export const authService = {
  async login(payload) {
    const res = await loginApi(payload);

    return {
      user: res.user,
    };
  },
};
```

---

## 4. API Layer (HTTP Layer)

Responsibilities:

- network calls only
- no business logic
- no transformations

Example:

```ts
export async function loginApi(payload) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('LOGIN_FAILED');
  }

  return res.json();
}
```

---

# 🔄 Data Flow Rule

All data flows inside a feature:

```text
Component → Hook → Service → API → Backend
```

Cross-feature API calls are NOT allowed directly.

---

# 🚫 Forbidden Patterns

## ❌ Cross-feature API calls

```ts
import { loginApi } from '@/features/auth/api/login';
import { getUserApi } from '@/features/user/api/getUser';
```

Instead:

- Use service orchestration
- Or shared domain layer (if truly generic)

---

## ❌ Global API folder

No:

```text
/services
/api
/hooks (global business hooks)
```

Everything must belong to a feature.

---

## ❌ Fetch inside UI

```tsx
useEffect(() => {
  fetch('/api/user');
}, []);
```

---

# 🧪 Error Handling Strategy

Each feature normalizes its own errors.

Example:

```ts
try {
  await loginApi(payload);
} catch (err) {
  throw new Error('AUTH_LOGIN_FAILED');
}
```

---

# 📡 API Response Standard

Each feature should map API responses into its own domain model:

```ts
type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    message: string;
  } | null;
};
```

---

# 🔐 Authentication Pattern

Authentication is handled inside the **auth feature only**.

Other features:

- consume auth state
- do NOT implement auth logic

---

# 🧱 Next.js Route Handlers (Backend Layer)

All API routes live in:

```text
app/api/*
```

But they remain **thin adapters only**.

Example:

```ts
// app/api/auth/login/route.ts

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json(await authService.login(body));
}
```

---

# 🧩 Shared vs Feature Rule

## Feature layer (preferred)

- auth
- user
- leaderboard

## Shared layer (only generic utilities)

```text
components/
lib/
utils/
types/
```

Shared MUST NOT contain business logic.

---

# ⚡ When to Extract to Shared

Only extract when:

- logic is used across multiple features
- it has no business meaning
- it is purely generic

Examples:

✔ formatDate  
✔ debounce  
✔ httpClient  
✔ cn() utility

---

# 🧠 Design Philosophy

This structure enforces:

- Feature ownership
- Predictable data flow
- Easier onboarding
- Better scalability
- Reduced coupling

---

# 📊 Scaling Rule

> If logic belongs to a feature, it must stay inside that feature.

Never prematurely generalize.

---

# ✔️ Summary

If you're unsure:

> Put API, service, hook inside the same feature module.

Only extract to shared when it's truly reusable across domains.
