# DuckType

Monkeytype-style typing practice for useful code patterns: DSA, backend, frontend, DevOps, and language idioms.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase Auth/Postgres-ready
- Shiki syntax tokenization
- cmdk command palette

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Supabase

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Then run `supabase/schema.sql` in Supabase SQL editor. Enable GitHub and Google OAuth providers in Supabase Auth.
