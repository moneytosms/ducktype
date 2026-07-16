<p align="center">
  <img src="./assets/readme/hero.svg" width="100%" alt="DuckType, Monkeytype-style typing practice, purpose-built for real code, shown mid-test with syntax highlighting and live WPM.">
</p>

Monkeytype is the standard for typing practice, but its code support is shallow: one line of plain text, no indentation, no highlighting. DuckType is the IDE-style code practice mode that request has been asking for, with real multi-line snippets, real syntax highlighting, and real language support.

## What it is

- **Live syntax-highlighted typing test**, character-by-character comparison against a real snippet, tokenized with [Shiki](https://shiki.style), correct/wrong/pending state layered on top of the real token colors
- **WPM, raw WPM, accuracy, consistency, error count**, timer starts on first keystroke, not page load
- **Instant start**, land on the page, start typing immediately, no login wall, no menu, `tab` for a new snippet
- **Command palette** (`ctrl+p` / `esc`), fuzzy-searchable, switches language, mode, theme, font, test length
- **Funboxes**: blind, no-backspace, sudden-death, memory, zen, assist

## Two ways to type

DuckType is both a Monkeytype and an IDE, pick per snippet from the command palette or the eye icon under the test:

- **Monkeytype-style (focus mode, default)**, a fixed-height window with the chrome fading out as you type, same instant, distraction-free feel as Monkeytype, just with real syntax highlighting under the hood.
- **IDE mode**, a full-page takeover with titlebar, line-number gutter, and status bar, showing the complete, untruncated snippet like a real editor. Toggle it any time with the eye icon or `ide mode` in the command palette.

## Modes

| Mode | What you type |
| --- | --- |
| General | idiomatic snippets in a base language |
| Framework | React, Django, and other framework-scoped idioms |
| DSA | well-known algorithms, problem statement alongside the solution |
| Custom | paste your own code and type it, saved locally in your browser |

Python, JavaScript/TypeScript, C++, Java, Go, Rust, curated and hand-picked, not scraped.

Custom snippets live under the "custom" mode tab: hit "paste snippet" (or `paste custom snippet` in the command palette), pick a language, drop in your code, and it's ready to type immediately, no account needed.

## Themes

`mallard` (default, pond-dark, bill yellow) · `serika dark` · `carbon` · `paper` · `dracula` · `gruvbox` · `nord` · `rosé pine`, switchable instantly from the command palette, no reload.

## Run

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Stack

Next.js App Router + TypeScript · Tailwind CSS · Shiki · cmdk · pnpm · Supabase (auth/history)

## Accounts

Never required to take a test, only to save history and stats long-term.

```bash
cp .env.example .env.local
```

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Run `supabase/schema.sql` in the Supabase SQL editor. Enable GitHub and Google OAuth providers in Supabase Auth.
