# Project Name

## 📖 Overview

This project is built with **Next.js**, **React**, and **TypeScript** using the **App Router**.

The codebase follows a **Feature-based Architecture**, where each business domain owns its components, hooks, API calls, and types. Shared utilities are placed in dedicated shared directories to promote reusability and maintainability.

---

## 🚀 Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint
- Prettier

---

## 📋 Prerequisites

Before running the project, make sure you have installed:

- Node.js 20+
- npm, yarn, or pnpm

Verify your installation:

```bash
node -v
npm -v
```

---

## 📦 Installation

Install dependencies:

```bash
npm install
```

or

```bash
yarn
```

or

```bash
pnpm install
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Leaderboard-ui
API_SECRET=your-secret
```

---

## ▶️ Running the Project

### Development

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

### Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## 🧹 Lint

```bash
npm run lint
```

---

## 🏗️ Architecture

This project follows a **Feature-based Architecture**, organizing code by business domain instead of technical layers.

### Principles

- Organize code by business feature.
- Keep features independent.
- Store reusable code in the shared layer.
- Expose each feature through a public API (`index.ts`).
- Avoid importing another feature's internal files.

---

## 📁 Project Structure

## 📁 Project Structure

```text
.
├── app/
│   ├── api/                          # Route Handlers
│   ├── layout.tsx                    # Root Layout
│   ├── page.tsx                      # Home Page
│   ├── globals.css                   # Global Styles
│   │
│   ├── features/                     # Feature-based modules
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── schemas/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   ├── constants/
│   │   │   └── index.ts              # Public API
│   │   │
│   │   ├── user/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   ├── leaderboard/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   └── dashboard/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── index.ts
│   │
│   ├── components/                   # Shared UI Components
│   ├── hooks/                        # Shared Hooks
│   ├── lib/                          # Shared Libraries
│   ├── services/                     # Shared API Clients
│   ├── utils/                        # Shared Utility Functions
│   ├── types/                        # Shared TypeScript Types
│   ├── constants/                    # Shared Constants
│   ├── assets/                       # Images, Icons, Fonts
│   └── styles/                       # Shared Styles
│
├── public/                           # Static Assets
│
├── .env.local
├── middleware.ts
├── next.config.ts
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── prettier.config.js
└── README.md
```

---

## 📚 Shared vs Feature

### Shared

The shared layer contains reusable code across multiple features.

Examples:

- UI Components
- API Client
- Utility Functions
- Shared Hooks
- Constants
- Shared Types

---

### Feature

Each feature owns everything related to one business domain.

Example:

```text
features/
├── auth/
├── user/
├── payment/
├── notification/
└── dashboard/
```

Authentication-related files should remain inside:

```text
features/auth/
├── api/
├── components/
├── hooks/
├── schemas/
├── types/
└── index.ts
```

---

## 📦 Public API

Each feature should expose its public interface via `index.ts`.

Example:

```ts
// features/auth/index.ts

export { LoginForm } from './components/LoginForm';
export { useLogin } from './hooks/useLogin';
```

Preferred:

```ts
import { LoginForm, useLogin } from '@/features/auth';
```

Avoid:

```ts
import { LoginForm } from '@/features/auth/components/LoginForm';
```

---

## 🔄 Dependency Rules

Dependencies should flow in one direction:

```text
app
 │
 ▼
features
 │
 ▼
shared
```

Rules:

- App can import from any feature.
- Features may import from shared modules.
- Features should not import another feature's internal files.
- Shared modules must never depend on any feature.

---

## 📜 Available Scripts

| Command       | Description                  |
| ------------- | ---------------------------- |
| npm run dev   | Start development server     |
| npm run build | Build production application |
| npm run start | Start production server      |
| npm run lint  | Run ESLint                   |

---
