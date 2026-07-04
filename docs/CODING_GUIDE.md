# 📐 Coding Guide

This section defines the coding standards used throughout the project. Following these conventions helps maintain a clean, consistent, and scalable codebase.

---

# 📝 Naming Convention

## Variables

Use **camelCase**.

✅ Good

```ts
const userName = 'John';
const totalScore = 100;
const currentUser = {};
```

❌ Bad

```ts
const UserName = 'John';
const username = 'John';
const USER_NAME = 'John';
const usr = {};
```

---

## Constants

Use **UPPER_SNAKE_CASE** for immutable global constants.

✅ Good

```ts
const MAX_RETRY = 3;
const API_TIMEOUT = 5000;
```

❌ Bad

```ts
const maxRetry = 3;
const ApiTimeout = 5000;
```

---

## Boolean Variables

Boolean variables should clearly express a true/false state.

Use prefixes:

- is
- has
- can
- should

✅ Good

```ts
const isLoading = true;
const hasPermission = false;
const canEdit = true;
const shouldRedirect = false;
```

❌ Bad

```ts
const loading = true;
const permission = false;
const edit = true;
const redirect = false;
```

---

## Functions

Use **camelCase** and start with a **verb**.

✅ Good

```ts
fetchUsers();
createLeaderboard();
updateProfile();
deleteMember();
calculateScore();
```

❌ Bad

```ts
users();
leaderboard();
profile();
data();
score();
```

---

## Event Handlers

Prefix with **handle**.

✅ Good

```ts
handleSubmit();
handleLogin();
handleDelete();
handleSearch();
```

❌ Bad

```ts
submit()
login()
delete()
search()
```

---

## React Components

Use **PascalCase**.

Component names should describe **what they represent**, not their HTML type.

✅ Good

```tsx
LeaderboardCard;
UserProfile;
LoginForm;
SearchInput;
```

❌ Bad

```tsx
leaderboardCard;
card;
component;
wrapper;
```

---

## Component Files

The filename should match the component name.

✅ Good

```text
LeaderboardCard.tsx
UserProfile.tsx
LoginForm.tsx
```

❌ Bad

```text
leaderboardcard.tsx
leaderboard_card.tsx
component.tsx
```

---

## Pages (App Router)

Next.js App Router uses file conventions.

```
app/
└── leaderboard/
    └── page.tsx
```

Route

```
/leaderboard
```

Dynamic Route

```
app/
└── leaderboard/
    └── [id]/
        └── page.tsx
```

Route

```
/leaderboard/123
```

---

## Layout

Always use the reserved filename.

```
layout.tsx
```

Avoid

```
MainLayout.tsx
AppLayout.tsx
```

unless used as reusable layout components.

---

## Loading & Error Pages

Use Next.js file conventions.

```
loading.tsx
error.tsx
not-found.tsx
```

---

## Custom Hooks

Always prefix hooks with **use**.

✅ Good

```ts
useAuth();
useLeaderboard();
usePagination();
```

❌ Bad

```ts
authHook();
leaderboardHook();
pagination();
```

---

## Interfaces

Use **PascalCase**.

Avoid prefixing with `I`.

✅ Good

```ts
interface User {}
interface LoginRequest {}
interface LeaderboardResponse {}
```

❌ Bad

```ts
interface IUser {}
interface ILoginRequest {}
```

---

## Type Aliases

Use **PascalCase**.

✅ Good

```ts
type UserRole = 'admin' | 'member';

type ApiResponse<T> = {
  data: T;
};
```

❌ Bad

```ts
type userRole = ...
type response = ...
```

---

## Enums

Use PascalCase for enum names and members.

✅ Good

```ts
enum UserRole {
  Admin,
  Member,
}
```

❌ Bad

```ts
enum user_role {
  ADMIN,
  MEMBER,
}
```

---

## Props

Use the component name followed by `Props`.

✅ Good

```ts
type LoginFormProps = {};

type UserCardProps = {};
```

❌ Bad

```ts
type Props = {};

type Data = {};
```

---

## Context

Suffix with **Context**.

✅ Good

```ts
AuthContext;
ThemeContext;
UserContext;
```

❌ Bad

```ts
Auth;
Context;
```

---

## Services

Service names should describe the business domain.

✅ Good

```text
authService.ts
leaderboardService.ts
userService.ts
```

❌ Bad

```text
service.ts
api.ts
request.ts
```

---

## API Files

Name files after the resource or action.

✅ Good

```text
login.ts
logout.ts
getLeaderboard.ts
updateProfile.ts
```

❌ Bad

```text
api.ts
request.ts
call.ts
```

---

## Utility Files

Use camelCase and describe their purpose.

✅ Good

```text
formatDate.ts
calculateScore.ts
generateAvatar.ts
```

❌ Bad

```text
helper.ts
utils.ts
common.ts
```

---

## Folder Naming

Use **lowercase**.

✅ Good

```text
features/
components/
services/
hooks/
constants/
```

❌ Bad

```text
Features/
SharedComponents/
UtilityFunctions/
```

---

## Import Order

Arrange imports consistently.

```ts
// External packages
import { useState } from 'react';

// Internal modules
import { Button } from '@/components';
import { useAuth } from '@/hooks';

// Types
import type { User } from '@/types';

// Styles
import './styles.css';
```

---

# ✅ General Guidelines

- Use descriptive names instead of abbreviations.
- Prefer clarity over brevity.
- Keep functions focused on a single responsibility.
- Avoid magic numbers; use named constants.
- Export only the public API from each feature via `index.ts`.
- Prefer composition over duplication.
- Follow existing conventions before introducing new ones.
- Maintain consistent naming across the entire project.
