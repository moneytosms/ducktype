\# DuckType — Spec



\## Problem



Monkeytype is the standard for typing practice, but its code support is

shallow: pick a language and it drops in a single line of code as plain

text, no indentation handling, no syntax highlighting, no real editor feel.

Typing.io is closer to purpose-built for code but is dated, clunky, and not

free-tier friendly. There is an open, unresolved feature request against

Monkeytype's own GitHub asking for exactly this ("IDE-style code practice

mode") — nobody has built it well yet.



Programmers who want to build typing speed \*for the symbols and patterns

that actually show up in real code\* (brackets, indentation, camelCase,

snake\_case, operators, common idioms) don't have a good tool. There's also

no tool that doubles as DSA-solution typing practice, which is a related

but distinct use case (typing out known algorithms to build muscle memory

for interviews / competitive programming).



\## Goal



Build a Monkeytype-quality typing test, purpose-built for code, called

\*\*DuckType\*\*. Two things have to both be true:



1\. It has to feel as fast, minimal, and frictionless as Monkeytype —

&#x20;  land on the page, start typing immediately, no clicking through menus.

2\. It has to be a real, deep tool for programmers — real syntax

&#x20;  highlighting, real multi-line code, real language support, real DSA

&#x20;  practice, accounts and history.



The "instant start" feel and the "deep configurability" feel are both

core to the product, not in tension — configuration should be reachable

(command palette, settings) without ever being \*required\* before typing.



\## Core Features (v1)



\### 1. Typing engine

\- Live character-by-character comparison against a target snippet

\- Real-time syntax highlighting of the snippet (language-aware coloring),

&#x20; with correct/incorrect/untyped state layered on top

\- Standard stats: WPM, raw WPM, accuracy, consistency, error count

\- Timer starts on first keystroke, not on page load

\- Results screen after completion, with the option to immediately restart

&#x20; or move to the next snippet with no intermediate menu



\### 2. Instant-start experience (Monkeytype parity)

\- Landing on the site drops the user straight into a ready-to-type test —

&#x20; no login wall, no mode selection required first

\- A snippet is pre-selected by sensible defaults; typing the first

&#x20; character just starts the test immediately, same as Monkeytype

\- Restarting a test or grabbing a new snippet is a single keystroke

&#x20; (e.g. tab, or a visible restart icon), not a page navigation



\### 3. Command palette

\- A single keyboard shortcut (e.g. `Esc` or `Cmd/Ctrl+P`, Monkeytype-style)

&#x20; opens a searchable command palette

\- From the palette, the user can: change language, change mode

&#x20; (general/framework/DSA/custom), change theme, change font, change test

&#x20; length/behavior, jump to history/stats, sign in/out

\- Palette is fuzzy-searchable by typing, not just a static menu



\### 4. Modes

\- \*\*General\*\* — idiomatic snippets in a base language

\- \*\*Framework\*\* — idiomatic snippets scoped to a framework (React,

&#x20; Django, etc.)

\- \*\*DSA\*\* — well-known algorithm/data-structure problems, problem

&#x20; statement shown alongside the solution being typed

\- \*\*Custom / bring-your-own\*\* — user pastes arbitrary code and types it;

&#x20; saved privately to their account

\- Mode and language selection persist as the user's default for next

&#x20; visit (remembered preference, not reset every session)



\### 5. Snippet library

\- Multi-language from day one: Python, JavaScript/TypeScript, C++, Java,

&#x20; Go, Rust (initial set — extensible)

\- Curated, not scraped — hand-picked idiomatic snippets per

&#x20; language/framework, and well-known DSA problems with full solutions

\- Snippets tagged by language, framework (optional), difficulty, category



\### 6. Themes and fonts

\- Multiple selectable color themes (dark-first, Monkeytype-style variety),

&#x20; switchable from the command palette or a settings panel, applied

&#x20; instantly with no reload

\- Multiple selectable monospace fonts, same instant-switch behavior

\- Theme/font choice persisted per user (or locally if not signed in)



\### 7. Accounts \& persistence (CRUD)

\- User accounts (auth) — but never required to take a test, only to save

&#x20; history/stats or bring-your-own snippets long-term

\- Every completed test/attempt is stored: WPM, raw WPM, accuracy,

&#x20; consistency, error count, snippet reference, timestamp

\- User-facing history/stats over time

\- Public curated snippets vs. private user-submitted snippets, with

&#x20; appropriate access control (users only see/manage their own private

&#x20; snippets)

\- Settings (theme, font, default language/mode) persisted to the account

&#x20; when signed in, falling back to local/browser storage when not



\## Non-goals (v1)



\- Leaderboards / social features

\- Real-time multiplayer races

\- Mobile app (web only)

\- Auto-scraping snippets from live open-source repos (curated content only

&#x20; for v1)



\## Open Questions / Future Considerations



\- Which frameworks (beyond base languages) get dedicated snippet sets

&#x20; first — React? Django? Something else?

\- How large should the curated snippet pool be at launch per

&#x20; language/category before it feels "enough"?

\- Should private user-submitted snippets ever be promotable to public

&#x20; (e.g. with moderation), or stay permanently private?

\- Difficulty calibration for DSA problems — self-labeled, or based on a

&#x20; known source (LeetCode-style easy/medium/hard)?

\- Exact theme/font list for launch — how many is "enough variety" without

&#x20; overwhelming a v1?

