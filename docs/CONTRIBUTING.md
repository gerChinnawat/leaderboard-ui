# 🤝 Contributing Guide

Thank you for contributing to this project!

This guide explains our development workflow, coding expectations, and Pull Request process. Following these guidelines helps us maintain a consistent, reliable, and scalable codebase.

---

# 🔄 Development Workflow

Every change should follow this workflow:

```text
Create Branch
      │
      ▼
Implement Feature
      │
      ▼
Write / Update Tests
      │
      ▼
Run Lint & Tests
      │
      ▼
Open Pull Request
      │
      ▼
Code Review
      │
      ▼
Merge into main
```

---

# 🧭 Before You Start

Before implementing a feature:

- Pull the latest changes from `main`
- Read the issue or requirement carefully
- Understand the existing implementation
- Ask questions if requirements are unclear

---

# 🌱 Branch Strategy

Never develop directly on `main`.

Create a dedicated branch for every task.

## Branch Naming

```
feature/<feature-name>

bugfix/<bug-name>

hotfix/<issue-name>

refactor/<scope>

docs/<document>

test/<scope>

chore/<task>
```

Examples

```
feature/login

feature/leaderboard

feature/user-profile

bugfix/token-refresh

refactor/auth-service

docs/readme

test/login-form

chore/update-eslint
```

Use lowercase letters and hyphens.

Good

```
feature/user-profile
```

Avoid

```
Feature/Profile

myBranch

fix1
```

---

# 🔁 Sync With Main

Before opening a Pull Request, update your branch.

```bash
git checkout main
git pull origin main

git checkout feature/login
git merge main
```

or

```bash
git rebase main
```

---

# 🧾 Commit Convention

This project follows Conventional Commits.

## Types

```
feat
fix
docs
style
refactor
test
build
ci
perf
chore
```

Examples

```
feat(auth): add login page

fix(api): handle unauthorized response

refactor(user): simplify mapper

docs: update README

test(auth): add login tests

chore: upgrade dependencies
```

Keep commits focused on one logical change.

Good

```
feat(auth): implement remember me
```

Avoid

```
fix everything

update

changes
```

---

# 📐 Coding Standards

Before committing:

- Follow the Coding Guide
- Keep functions small
- Prefer readable code
- Avoid duplicated logic
- Remove unused imports
- Remove commented-out code
- Remove unnecessary console logs

---

# 🧪 Testing

Every feature should include appropriate tests.

Expected coverage:

- Utilities
- Services
- Hooks
- Business logic

Run before pushing:

```bash
npm run lint

npm test
```

If your project includes Playwright:

```bash
npm run test:e2e
```

---

# 🚀 Pull Request

## Title

Use a concise, descriptive title.

Good

```
Add leaderboard pagination

Fix login redirect

Improve profile loading
```

Avoid

```
Update

Fix

Changes
```

---

## Description

A Pull Request should explain:

- What changed
- Why it changed
- Anything reviewers should pay attention to

Example

```md
## Summary

- Add login page
- Add authentication hook
- Add unit tests

## Notes

Uses the existing AuthService.

## Testing

- npm test
- npm run lint
```

---

# ✅ Pull Request Checklist

Before requesting a review:

- [ ] Code builds successfully
- [ ] Lint passes
- [ ] Tests pass
- [ ] No TypeScript errors
- [ ] Documentation updated (if required)
- [ ] No unnecessary console logs
- [ ] No commented-out code
- [ ] Branch is up to date

---

# 👀 Code Review

Code reviews are collaborative.

Reviewers should focus on:

- Correctness
- Readability
- Maintainability
- Performance
- Security
- Test coverage

Feedback should be constructive and respectful.

---

# 🎯 Definition of Done

A task is complete when:

- Requirements are implemented
- Tests pass
- Lint passes
- Code reviewed
- Documentation updated
- Ready for deployment

---

# 🧠 General Principles

## Write Readable Code

Prefer

```ts
const isAuthenticated = user !== null;
```

Instead of

```ts
const ok = user != null;
```

---

## Keep Functions Small

Good

```ts
calculateTotal();
```

Avoid

```ts
processEverything();
```

---

## Avoid Duplication

Extract reusable logic instead of copying code.

---

## Keep Components Focused

A component should have one primary responsibility.

---

## Follow Existing Patterns

Before introducing a new pattern:

- Search the codebase
- Reuse existing conventions
- Stay consistent

---

# 🆘 Asking for Help

If you're blocked:

- Ask early
- Share context
- Explain what you've tried
- Include relevant logs or screenshots

Avoid spending excessive time stuck on one problem.

---

# 🐛 Reporting Bugs

Include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment
- Screenshots (if applicable)

---

# 🙏 Thank You

Thank you for helping improve this project!

Consistent contributions make the codebase easier to understand, maintain, and extend for everyone.
