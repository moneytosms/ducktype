# Contributing

## Setup

```bash
pnpm install
pnpm dev
```

Supabase (auth + cloud sync) is optional for local dev — the app runs fully on localStorage without it. See the [Accounts](./README.md#accounts) section in the README if you want to test that path.

## Before opening a PR

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

All three should pass clean.

## Conventions

- Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`), imperative subject, no period.
- Match existing code style — this repo has no separate style guide beyond what's already in the codebase.
- Keep PRs scoped to one change; unrelated cleanup belongs in its own PR.

## New snippets

Curated snippet data lives in `src/data/generated/` and `src/data/snippets.ts`. Snippets should be idiomatic, hand-written or verified, not scraped — see [SPEC.md](./SPEC.md) for the project's intent.
