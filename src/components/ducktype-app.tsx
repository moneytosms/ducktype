"use client";

import { Command } from "cmdk";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowRotateLeft as RotateCcw,
  FaBackward as Rewind,
  FaCheck as Check,
  FaChevronRight as ChevronRight,
  FaCode as Code2,
  FaCopy as Copy,
  FaDatabase as Database,
  FaEye as Eye,
  FaGaugeHigh as Gauge,
  FaGear as Settings,
  FaGithub as GithubIcon,
  FaImage as ImageIcon,
  FaList as List,
  FaMagnifyingGlass as Search,
  FaPalette as PaletteIcon,
  FaPlus as Plus,
  FaServer as Server,
  FaShuffle as Shuffle,
  FaTerminal as Terminal,
  FaTextHeight as Type,
  FaUser as User,
  FaXmark as X,
} from "react-icons/fa6";
import { codeToTokens, type BundledLanguage, type BundledTheme } from "shiki";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Snippet, DuckSettings, PracticeDomain } from "@/types/snippet";
import { countErrors, getCharacterState } from "@/lib/typing/compare";
import { calculateStats, type TypingStats } from "@/lib/typing/stats";
import { defaultSettings, getDomainDefaults, getFilters, matchSnippets, selectSnippet } from "@/lib/snippets";
import { loadStats, recordTestCompleted, recordTestStarted, saveStats, type StatsStore } from "@/lib/stats-store";
import { loadSettings, saveSettings } from "@/lib/settings-store";
import { createCustomSnippet, loadCustomSnippets, saveCustomSnippets } from "@/lib/custom-snippets-store";
import { useAuthUser, type AuthUser } from "@/lib/supabase/use-auth-user";
import { signInWithProvider as signIn, signOut } from "@/lib/supabase/auth-actions";
import { pushSettings, pushStats, syncOnSignIn } from "@/lib/supabase/sync";
import { getUsername } from "@/lib/supabase/profile";
import { cn } from "@/lib/utils";

type TokenChar = {
  char: string;
  color?: string;
};

export const themes: { id: string; label: string; shiki: BundledTheme }[] = [
  { id: "mallard", label: "mallard", shiki: "vitesse-dark" },
  { id: "serika-dark", label: "serika dark", shiki: "github-dark" },
  { id: "carbon", label: "carbon", shiki: "github-dark" },
  { id: "paper", label: "paper", shiki: "github-light" },
  { id: "dracula", label: "dracula", shiki: "dracula" },
  { id: "gruvbox", label: "gruvbox", shiki: "gruvbox-dark-medium" },
  { id: "nord", label: "nord", shiki: "nord" },
  { id: "rose-pine", label: "rosé pine", shiki: "rose-pine" },
];

export const fonts = [
  { label: "JetBrains Mono", value: "var(--font-jetbrains)" },
  { label: "Geist Mono", value: "var(--font-geist-mono)" },
  { label: "Fira Code", value: "var(--font-fira)" },
  { label: "IBM Plex Mono", value: "var(--font-plex)" },
];

export const timeOptions = [15, 30, 60, 120, 0]; // 0 = infinite

export const fontSizes: { id: DuckSettings["fontSize"]; label: string; value: string }[] = [
  { id: "auto", label: "auto (fit width)", value: "2rem" },
  { id: "sm", label: "small", value: "1.15rem" },
  { id: "md", label: "medium", value: "1.4rem" },
  { id: "lg", label: "large", value: "1.7rem" },
  { id: "xl", label: "extra large", value: "2rem" },
  { id: "2xl", label: "huge", value: "2.35rem" },
];

export const caretStyles: DuckSettings["caretStyle"][] = ["bar", "block", "underline"];

export const customLanguageOptions: { label: string; language: string; shikiLang: BundledLanguage }[] = [
  { label: "Python", language: "Python", shikiLang: "python" },
  { label: "JavaScript", language: "JavaScript", shikiLang: "javascript" },
  { label: "TypeScript", language: "TypeScript", shikiLang: "typescript" },
  { label: "TSX", language: "TypeScript", shikiLang: "tsx" },
  { label: "Go", language: "Go", shikiLang: "go" },
  { label: "Rust", language: "Rust", shikiLang: "rust" },
  { label: "Java", language: "Java", shikiLang: "java" },
  { label: "C++", language: "C++", shikiLang: "cpp" },
  { label: "C", language: "C", shikiLang: "c" },
  { label: "Bash", language: "Bash", shikiLang: "bash" },
  { label: "SQL", language: "SQL", shikiLang: "sql" },
  { label: "YAML", language: "YAML", shikiLang: "yaml" },
  { label: "JSON", language: "JSON", shikiLang: "json" },
];

export const funboxes: { id: DuckSettings["funbox"]; label: string; desc: string }[] = [
  { id: "none", label: "none", desc: "standard test" },
  { id: "blind", label: "blind", desc: "no error highlighting while typing" },
  { id: "no-backspace", label: "no backspace", desc: "deletions are disabled" },
  { id: "sudden-death", label: "sudden death", desc: "one wrong key restarts the test" },
  { id: "memory", label: "memory", desc: "code hides once you start typing" },
  { id: "zen", label: "zen", desc: "no stats, no progress, just code" },
  { id: "assist", label: "assist", desc: "auto-closes empty (), [], {}, \"\", ''" },
];

const closePairs: Record<string, string> = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'" };

const AFK_MS = 6700;

const testSettingKeys = ["domain", "language", "framework", "track", "durationSeconds", "funbox"] as const;

export function DuckTypeApp({ snippets: curatedSnippets }: { snippets: Snippet[] }) {
  const router = useRouter();
  const [settings, setSettings] = useState<DuckSettings>(defaultSettings);
  const [customSnippets, setCustomSnippets] = useState<Snippet[]>([]);
  const snippets = useMemo(() => [...curatedSnippets, ...customSnippets], [curatedSnippets, customSnippets]);
  const [isAddSnippetOpen, setIsAddSnippetOpen] = useState(false);
  const [snippetOffset, setSnippetOffset] = useState(0);
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [tokens, setTokens] = useState<TokenChar[]>([]);
  const user = useAuthUser();
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [statsStore, setStatsStore] = useState<StatsStore>({ version: 1, testsStarted: 0, sessions: [] });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const samplesRef = useRef<KeySample[]>([]);
  const lastActivityRef = useRef(0);
  const recordedCompletionRef = useRef(false);
  const hasSyncedCloudRef = useRef(false);
  const [finalSamples, setFinalSamples] = useState<KeySample[]>([]);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const domainFilters = useMemo(() => getFilters(snippets, settings.domain, settings.language), [settings.domain, settings.language, snippets]);
  const pool = useMemo(() => matchSnippets(snippets, settings), [settings, snippets]);
  const snippet = useMemo(() => {
    const picked = pickedId ? snippets.find((entry) => entry.id === pickedId) : null;
    return picked ?? selectSnippet(snippets, settings, snippetOffset);
  }, [pickedId, settings, snippetOffset, snippets]);
  const stats = useMemo(() => calculateStats(snippet.code, typed, startedAt, now), [now, snippet.code, startedAt, typed]);
  const isTimedOut = Boolean(startedAt && settings.durationSeconds > 0 && stats.elapsedSeconds >= settings.durationSeconds);
  const isComplete = (typed.length >= snippet.code.length && typed.length > 0) || isTimedOut;
  const isTyping = Boolean(startedAt) && !isComplete && typed.length > 0;
  const liveSeconds = settings.durationSeconds > 0 ? Math.max(settings.durationSeconds - stats.elapsedSeconds, 0) : stats.elapsedSeconds;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(loadSettings());
    setStatsStore(loadStats());
    setCustomSnippets(loadCustomSnippets());
    setSettingsLoaded(true);
  }, []);

  // records a fresh attempt the moment typing starts
  useEffect(() => {
    if (!startedAt) return;
    const timer = window.setTimeout(() => {
      setStatsStore((current) => {
        const next = recordTestStarted(current);
        saveStats(next);
        void pushStats(next).catch(() => {});
        return next;
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [startedAt]);

  // logs a completed attempt once per finish (natural or timed-out)
  useEffect(() => {
    if (!isComplete || typed.length === 0 || recordedCompletionRef.current) return;
    recordedCompletionRef.current = true;
    const timer = window.setTimeout(() => {
      setStatsStore((current) => {
        const next = recordTestCompleted(current, {
          ts: Date.now(),
          durationSeconds: settings.durationSeconds,
          elapsedSeconds: stats.elapsedSeconds,
          wpm: stats.wpm,
          accuracy: stats.accuracy,
        });
        saveStats(next);
        void pushStats(next).catch(() => {});
        return next;
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [isComplete, typed.length, settings.durationSeconds, stats.elapsedSeconds, stats.wpm, stats.accuracy]);

  useEffect(() => {
    if (!settingsLoaded) return;
    saveSettings(settings);
    void pushSettings(settings).catch(() => {});
    document.documentElement.dataset.theme = settings.theme;
    const font = fonts.find((option) => option.label === settings.font) ?? fonts[0];
    document.documentElement.style.setProperty("--duck-font", font.value);
    const size = fontSizes.find((option) => option.id === settings.fontSize) ?? fontSizes[1];
    document.documentElement.style.setProperty("--code-size", size.value);
  }, [settings, settingsLoaded]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (startedAt && !isComplete) setNow(Date.now());
    }, 500);

    return () => window.clearInterval(timer);
  }, [isComplete, startedAt]);

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      try {
        const theme = themes.find((option) => option.id === settings.theme)?.shiki ?? "github-dark";
        const result = await codeToTokens(snippet.code, { lang: snippet.shikiLang, theme });
        if (cancelled) return;
        setTokens(flattenTokens(result.tokens));
      } catch {
        setTokens(snippet.code.split("").map((char) => ({ char })));
      }
    }

    highlight();

    return () => {
      cancelled = true;
    };
  }, [settings.theme, snippet]);

  useEffect(() => {
    if (isComplete) setFinalSamples([...samplesRef.current]);
  }, [isComplete]);

  // runs once per sign-in: merges this device's local stats/settings with
  // whatever's already in the cloud (cloud wins if a row exists there)
  useEffect(() => {
    if (!user || !settingsLoaded || hasSyncedCloudRef.current) return;
    hasSyncedCloudRef.current = true;
    syncOnSignIn(statsStore, settings).then((merged) => {
      if (!merged) return;
      setStatsStore(merged.stats);
      saveStats(merged.stats);
      setSettings(merged.settings);
      saveSettings(merged.settings);
    });
  }, [user, settingsLoaded, statsStore, settings]);

  useEffect(() => {
    if (!user) hasSyncedCloudRef.current = false;
  }, [user]);

  // auto-fit: size the font so the snippet's longest line spans the container width
  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    function fit() {
      if (!shell) return;
      if (settings.fontSize !== "auto") {
        shell.style.removeProperty("--code-size");
        return;
      }
      const longestLine = Math.max(24, ...snippet.code.split("\n").map((codeLine) => codeLine.length));
      // measure the real glyph width for the active font instead of guessing a fixed em ratio;
      // an imprecise guess can leave a line a few px too wide, which used to force a word-wrap mid-line
      const probe = document.createElement("span");
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;font-family:var(--duck-font),var(--font-geist-mono),Consolas,monospace;font-size:100px;";
      probe.textContent = "0".repeat(20);
      shell.appendChild(probe);
      const glyphRatio = probe.getBoundingClientRect().width / 100 / 20;
      shell.removeChild(probe);
      const px = Math.min(40, Math.max(17, (shell.clientWidth / (longestLine * glyphRatio)) * 0.99));
      shell.style.setProperty("--code-size", `${px.toFixed(1)}px`);
    }

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [snippet, settings.fontSize, isComplete]);

  // smooth caret: glide to the glyph at the typing position (layout effect: paint in same frame as keystroke);
  // also scrolls the code window so the active line stays near the top
  useLayoutEffect(() => {
    function position() {
      const win = windowRef.current;
      const caret = caretRef.current;
      if (!win || !caret) return;
      const atEnd = typed.length >= snippet.code.length;
      const index = Math.min(typed.length, snippet.code.length - 1);
      const el = win.querySelector<HTMLElement>(`[data-i="${index}"]`);
      const layer = win.querySelector<HTMLElement>(".code-layer");
      if (!el || !layer) return;
      const winRect = win.getBoundingClientRect();
      let rect = el.getBoundingClientRect();
      let x = (atEnd ? rect.right : rect.left) - winRect.left;
      // newline / collapsed whitespace spans have a zero-size rect and make the caret vanish;
      // walk back to the nearest real glyph's right edge (consecutive blank lines can chain several zero-rects)
      if (!atEnd && (rect.width < 1 || rect.height < 2)) {
        for (let i = index - 1; i >= 0; i--) {
          const prev = win.querySelector<HTMLElement>(`[data-i="${i}"]`)?.getBoundingClientRect();
          if (prev && prev.height >= 2) {
            rect = prev;
            x = prev.right - winRect.left;
            break;
          }
        }
      }
      const fontSizePx = parseFloat(getComputedStyle(layer).fontSize) || 24;
      const charH = rect.height >= 2 ? rect.height : fontSizePx * 1.25;
      const charW = rect.width >= 1 ? rect.width : fontSizePx * 0.6;
      const y = rect.top - winRect.top;

      if (settings.caretStyle === "underline") {
        caret.style.transform = `translate(${x}px, ${y + charH - 3}px)`;
        caret.style.height = "3px";
        caret.style.width = `${Math.max(charW, 4)}px`;
      } else if (settings.caretStyle === "block") {
        caret.style.transform = `translate(${x}px, ${y}px)`;
        caret.style.height = `${charH}px`;
        caret.style.width = `${Math.max(charW, 4)}px`;
      } else {
        caret.style.transform = `translate(${x}px, ${y}px)`;
        caret.style.height = `${charH}px`;
        caret.style.width = "";
      }

      if (settings.viewMode === "ide") {
        // ide mode shows the whole snippet; keep the caret in view via page scroll instead of clipping the window
        win.style.transform = "translateY(0px)";
        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else {
        // keep the first two lines pinned; scroll one line at a time after that
        const lineHeight = parseFloat(getComputedStyle(layer).lineHeight) || charH * 1.85;
        const scroll = Math.max(0, Math.round((y - lineHeight * 2) / lineHeight) * lineHeight);
        win.style.transform = `translateY(-${scroll}px)`;
      }
    }

    position();
    document.fonts?.ready.then(position);
    window.addEventListener("resize", position);
    return () => window.removeEventListener("resize", position);
  }, [typed, tokens, snippet, settings.font, settings.fontSize, settings.caretStyle, settings.viewMode]);

  const resetDraft = useCallback(() => {
    setTyped("");
    setStartedAt(null);
    samplesRef.current = [];
    lastActivityRef.current = Date.now();
    recordedCompletionRef.current = false;
    setNow(Date.now());
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const updateSettings = useCallback((next: Partial<DuckSettings>) => {
    const affectsTest = testSettingKeys.some((key) => key in next);
    if (affectsTest) {
      resetDraft();
      setPickedId(null);
      setSnippetOffset(0);
    }
    setSettings((current) => {
      if (next.domain && next.domain !== current.domain) {
        return { ...current, ...next, ...getDomainDefaults(snippets, next.domain) };
      }

      return { ...current, ...next };
    });
  }, [resetDraft, snippets]);

  const restart = useCallback(() => {
    resetDraft();
    inputRef.current?.focus();
  }, [resetDraft]);

  // afk detection: idle mid-test for AFK_MS restarts it
  useEffect(() => {
    if (!isTyping) return;
    const timer = window.setInterval(() => {
      if (Date.now() - lastActivityRef.current >= AFK_MS) restart();
    }, 500);
    return () => window.clearInterval(timer);
  }, [isTyping, restart]);

  const nextSnippet = useCallback(() => {
    resetDraft();
    setPickedId(null);
    setSnippetOffset((current) => current + 1);
  }, [resetDraft]);

  const pickSnippet = useCallback((id: string) => {
    resetDraft();
    setPickedId(id);
  }, [resetDraft]);

  const addSnippet = useCallback((input: { title: string; language: string; shikiLang: BundledLanguage; code: string }) => {
    const created = createCustomSnippet(input);
    setCustomSnippets((current) => {
      const next = [...current, created];
      saveCustomSnippets(next);
      return next;
    });
    updateSettings({ domain: "custom" });
    pickSnippet(created.id);
    setIsAddSnippetOpen(false);
  }, [updateSettings, pickSnippet]);

  const randomSnippet = useCallback(() => {
    resetDraft();
    const base = pool.length > 1 ? pool : snippets.filter((entry) => entry.domain === settings.domain);
    const others = (base.length > 1 ? base : snippets).filter((entry) => entry.id !== snippet.id);
    const chosen = others[Math.floor(Math.random() * others.length)];
    if (chosen) setPickedId(chosen.id);
  }, [pool, snippets, settings.domain, snippet.id, resetDraft]);

  // global keys: ctrl/cmd+p palette, esc opens palette when idle (else restarts, or closes palette/picker); on results, enter moves on
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && ["p", "k"].includes(event.key.toLowerCase())) {
        event.preventDefault();
        setIsPaletteOpen((open) => !open);
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        if (isAddSnippetOpen) {
          setIsAddSnippetOpen(false);
        } else if (isPickerOpen) {
          setIsPickerOpen(false);
        } else if (isPaletteOpen) {
          setIsPaletteOpen(false);
        } else if (!startedAt) {
          setIsPaletteOpen(true);
        } else {
          restart();
        }
        return;
      }
      if (!isComplete || isPaletteOpen || isPickerOpen) return;
      if (event.key === "Enter") {
        event.preventDefault();
        nextSnippet();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isComplete, isPaletteOpen, isPickerOpen, isAddSnippetOpen, startedAt, restart, nextSnippet]);

  function handleChange(value: string) {
    if (isComplete) return;
    lastActivityRef.current = Date.now();
    let nextValue = value.slice(0, snippet.code.length);
    if (settings.funbox === "no-backspace" && nextValue.length < typed.length) return;
    const appended = nextValue.length > typed.length ? nextValue.slice(typed.length) : "";
    const appendedIsCorrect = appended === snippet.code.slice(typed.length, nextValue.length);
    if (appended && settings.funbox === "sudden-death" && !appendedIsCorrect) {
      restart();
      return;
    }
    // stop on error: refuse keystrokes that don't match the target
    if (appended && settings.stopOnError === "letter" && !appendedIsCorrect) return;
    // assist: typing an opening bracket/quote that's immediately followed by its empty close in the
    // target also fills in the close, mirroring editor auto-close (only for genuinely empty pairs)
    if (settings.funbox === "assist" && appended.length === 1 && appendedIsCorrect) {
      const close = closePairs[appended];
      if (close && snippet.code[nextValue.length] === close) {
        nextValue += close;
      }
    }
    let startTimestamp = startedAt;
    if (!startTimestamp && nextValue.length > 0) {
      startTimestamp = Date.now();
      setStartedAt(startTimestamp);
      setNow(startTimestamp);
    }
    if (startTimestamp) {
      samplesRef.current.push({
        t: (Date.now() - startTimestamp) / 1000,
        len: nextValue.length,
        errs: countErrors(snippet.code, nextValue),
      });
    }
    setTyped(nextValue);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      // consume the indentation run the snippet expects at the cursor
      let addition = "";
      let index = typed.length;
      while (index < snippet.code.length && (snippet.code[index] === " " || snippet.code[index] === "\t")) {
        addition += snippet.code[index];
        index += 1;
      }
      handleChange(typed + (addition || "  "));
    }
  }

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUsername(null);
      return;
    }
    getUsername().then(setUsername);
  }, [user]);

  const authLabel = user ? username ?? user.email ?? "account" : "sign in";

  const themeLabel = themes.find((option) => option.id === settings.theme)?.label ?? settings.theme;

  if (!isComplete && settings.viewMode === "ide") {
    return (
      <main
        data-typing={isTyping}
        data-funbox={settings.funbox}
        className="ide-fullscreen text-[var(--text)]"
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("button, select, input, a, .dropdown, [cmdk-root]")) return;
          inputRef.current?.focus();
        }}
      >
        <div className="ide-fullbar">
          <span className="ide-dots"><i /><i /><i /></span>
          <span className="ide-filename">{snippet.title.toLowerCase().replace(/\s+/g, "-")}.{snippet.shikiLang}</span>
          <div className="ide-fullbar-actions">
            <button className="icon-button" onClick={() => setIsPaletteOpen(true)} title="Command palette (ctrl+p)">
              <Search size={15} />
            </button>
            <button className="icon-button" onClick={() => navigator.clipboard.writeText(snippet.code)} title="Copy snippet">
              <Copy size={15} />
            </button>
            <button className="icon-button" onClick={() => updateSettings({ viewMode: "focus" })} title="Exit IDE mode">
              <X size={15} />
            </button>
          </div>
        </div>

        <div className="ide-fullbody">
          <div className="ide-gutter" aria-hidden="true">
            {snippet.code.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
          </div>
          <div className="typing-shell ide-mode" ref={shellRef}>
            <textarea
              ref={inputRef}
              value={typed}
              onChange={(event) => handleChange(event.target.value)}
              onKeyDown={handleKeyDown}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              autoFocus
              className="sr-typing-input"
              aria-label="Typing input"
            />
            <div className="code-window" ref={windowRef}>
              <span className={cn("smooth-caret", settings.caretStyle)} ref={caretRef} aria-hidden="true" />
              <CodeLayer code={snippet.code} typed={typed} tokens={tokens} />
            </div>
          </div>
        </div>

        <div className="ide-statusbar">
          <div className="ide-status-left">
            <span>{snippet.language.toLowerCase()}</span>
            <span>{snippet.title.toLowerCase()}</span>
          </div>
          <div className="ide-status-right">
            {settings.showLiveTimer ? <span>{liveSeconds}s</span> : null}
            {settings.showLiveWpm ? <span>{stats.wpm} wpm</span> : null}
            {settings.showProgress ? (
              <div className="progress-track w-24">
                <div className="progress-fill" style={{ width: `${stats.progress}%` }} />
              </div>
            ) : null}
            <button className="icon-button" onClick={restart} title="Restart (esc)">
              <RotateCcw size={14} />
            </button>
            <button className="icon-button" onClick={nextSnippet} title="Next snippet">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {isPickerOpen ? (
          <SnippetPicker
            snippets={snippets}
            settings={settings}
            activeSnippetId={snippet.id}
            onPick={(id) => { pickSnippet(id); setIsPickerOpen(false); }}
            onClose={() => setIsPickerOpen(false)}
          />
        ) : null}

        <Palette
          open={isPaletteOpen}
          filters={domainFilters}
          settings={settings}
          pool={snippets}
          activeSnippetId={snippet.id}
          onBrowse={() => setIsPickerOpen(true)}
          onRandom={randomSnippet}
          query={paletteQuery}
          onQueryChange={setPaletteQuery}
          onClose={() => { setIsPaletteOpen(false); setPaletteQuery(""); }}
          onUpdate={updateSettings}
          onRestart={restart}
          onNext={nextSnippet}
          onSignIn={signIn}
          onSignOut={signOut}
          authUser={user}
          authLabel={authLabel}
          onOpenSettings={() => router.push("/settings")}
          onAddCustom={() => setIsAddSnippetOpen(true)}
        />

        {isAddSnippetOpen ? (
          <AddSnippetModal onClose={() => setIsAddSnippetOpen(false)} onSubmit={addSnippet} />
        ) : null}
      </main>
    );
  }

  return (
    <main
      data-typing={isTyping}
      data-funbox={settings.funbox}
      className="flex min-h-screen flex-col px-5 py-6 text-[var(--text)] md:px-10"
      onClick={(event) => {
        // don't steal focus from real controls (was closing dropdowns instantly)
        if ((event.target as HTMLElement).closest("button, select, input, a, .dropdown, [cmdk-root]")) return;
        inputRef.current?.focus();
      }}
    >
      <header className="chrome mx-auto flex w-full max-w-6xl items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <Link href="/" className="logo">
          <DuckLogo />
          duck<span className="logo-caret">_</span>type
        </Link>
        <div className="flex items-center gap-1">
          <button className="icon-button" onClick={() => setIsPaletteOpen(true)} title="Command palette (esc or ctrl+p)">
            <Search size={17} />
          </button>
          <button className="icon-button" onClick={randomSnippet} title="Random snippet">
            <Shuffle size={17} />
          </button>
          <Link className="icon-button" href="/settings" title="Settings">
            <Settings size={17} />
          </Link>
          <Link
            className="icon-button !w-auto gap-2 px-2.5"
            href="/profile"
            title="profile & account"
          >
            <User size={17} />
            <span className="hidden text-xs md:inline">{authLabel}</span>
          </Link>
        </div>
      </header>

      <div className="chrome mt-8">
        <ControlBar
          filters={domainFilters}
          settings={settings}
          pool={pool}
          activeSnippetId={snippet.id}
          onUpdate={updateSettings}
          onPickSnippet={pickSnippet}
          onBrowse={() => setIsPickerOpen(true)}
          onAddCustom={() => setIsAddSnippetOpen(true)}
        />
      </div>

      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-8">
        {settings.domain === "custom" && customSnippets.length === 0 ? (
          <div className="test-head flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-sm text-[var(--muted)]">No custom snippets yet — paste your own code to start typing it.</p>
            <button className="result-button" onClick={() => setIsAddSnippetOpen(true)}>
              <Plus size={14} /> paste a snippet
            </button>
          </div>
        ) : isComplete ? (
          <ResultsPanel stats={stats} snippet={snippet} settings={settings} samples={finalSamples} tokens={tokens} onRestart={restart} onNext={nextSnippet} />
        ) : (
          <div className="w-full">
            <div className="test-head mb-4">
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                {snippet.language}
              </div>
              <h1 className="mt-2 text-xl font-medium text-[var(--text)]">{snippet.title}</h1>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[var(--muted)]">{snippet.prompt}</p>
            </div>

            <div className="live-stats mb-3">
              {settings.showLiveTimer ? <div>{liveSeconds}<span>s</span></div> : null}
              {settings.showLiveWpm ? <div>{stats.wpm}<span> wpm</span></div> : null}
            </div>

            <div className="typing-shell" ref={shellRef}>
              <textarea
                ref={inputRef}
                value={typed}
                onChange={(event) => handleChange(event.target.value)}
                onKeyDown={handleKeyDown}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                autoFocus
                className="sr-typing-input"
                aria-label="Typing input"
              />
              <div className="code-window" ref={windowRef}>
                <span className={cn("smooth-caret", settings.caretStyle)} ref={caretRef} aria-hidden="true" />
                <CodeLayer code={snippet.code} typed={typed} tokens={tokens} />
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-5">
              {settings.showProgress ? (
                <div className="progress-track w-48">
                  <div className="progress-fill" style={{ width: `${stats.progress}%` }} />
                </div>
              ) : null}
              <div className="flex items-center gap-3">
                <button className="chrome icon-button" onClick={restart} title="Restart (esc)">
                  <RotateCcw size={18} />
                </button>
                <button className="chrome icon-button" onClick={nextSnippet} title="Next snippet">
                  <ChevronRight size={18} />
                </button>
                <button
                  className={cn("chrome icon-button", settings.viewMode === "ide" && "active")}
                  onClick={() => updateSettings({ viewMode: settings.viewMode === "ide" ? "focus" : "ide" })}
                  title="Toggle IDE mode (full snippet)"
                >
                  <Eye size={18} />
                </button>
                <button className="chrome icon-button" onClick={() => navigator.clipboard.writeText(snippet.code)} title="Copy snippet">
                  <Copy size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="chrome mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
        <div className="shortcut-hint flex flex-wrap items-center gap-3">
          <span><kbd>esc</kbd> restart / palette</span>
          <span><kbd>ctrl+p</kbd> command palette</span>
        </div>
        <button
          className="flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:text-[var(--text)]"
          onClick={() => { setPaletteQuery("theme"); setIsPaletteOpen(true); }}
          title="Change theme"
        >
          <PaletteIcon size={13} />
          {themeLabel}
        </button>
        <a
          href="https://github.com/moneytosms/ducktype"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 opacity-60 transition-opacity hover:opacity-100"
          title="View on GitHub"
        >
          <GithubIcon size={13} />
        </a>
      </footer>

      {isPickerOpen ? (
        <SnippetPicker
          snippets={snippets}
          settings={settings}
          activeSnippetId={snippet.id}
          onPick={(id) => { pickSnippet(id); setIsPickerOpen(false); }}
          onClose={() => setIsPickerOpen(false)}
        />
      ) : null}

      <Palette
        open={isPaletteOpen}
        filters={domainFilters}
        settings={settings}
        pool={snippets}
        activeSnippetId={snippet.id}
        onBrowse={() => setIsPickerOpen(true)}
        onRandom={randomSnippet}
        query={paletteQuery}
        onQueryChange={setPaletteQuery}
        onClose={() => { setIsPaletteOpen(false); setPaletteQuery(""); }}
        onUpdate={updateSettings}
        onRestart={restart}
        onNext={nextSnippet}
        onSignIn={signIn}
        onSignOut={signOut}
        authUser={user}
        authLabel={authLabel}
        onOpenSettings={() => router.push("/settings")}
        onAddCustom={() => setIsAddSnippetOpen(true)}
      />

      {isAddSnippetOpen ? (
        <AddSnippetModal onClose={() => setIsAddSnippetOpen(false)} onSubmit={addSnippet} />
      ) : null}
    </main>
  );
}

const PUNCTUATION_RE = /[^\w\s]/;

function CodeLayer({ code, typed, tokens }: { code: string; typed: string; tokens: TokenChar[] }) {
  const chars: TokenChar[] = tokens.length === code.length ? tokens : code.split("").map((char) => ({ char }));

  return (
    <pre className="code-layer" aria-hidden="true">
      {chars.map((token, index) => {
        const state = getCharacterState(code, typed, index);
        const color = PUNCTUATION_RE.test(token.char) ? "var(--punct)" : token.color ?? "var(--text)";
        return (
          <span
            key={`${index}-${token.char}`}
            data-i={index}
            className={cn("code-char", state)}
            style={{ "--syntax": color } as React.CSSProperties}
          >
            {token.char}
          </span>
        );
      })}
    </pre>
  );
}

const domainOptions: { id: PracticeDomain; label: string; icon: React.ReactNode }[] = [
  { id: "dsa", label: "dsa", icon: <Gauge size={13} /> },
  { id: "backend", label: "backend", icon: <Server size={13} /> },
  { id: "frontend", label: "frontend", icon: <Code2 size={13} /> },
  { id: "devops", label: "devops", icon: <Terminal size={13} /> },
  { id: "language", label: "general", icon: <Database size={13} /> },
  { id: "custom", label: "custom", icon: <Plus size={13} /> },
];

function ControlBar({
  filters,
  settings,
  pool,
  activeSnippetId,
  onUpdate,
  onPickSnippet,
  onBrowse,
  onAddCustom,
}: {
  filters: ReturnType<typeof getFilters>;
  settings: DuckSettings;
  pool: Snippet[];
  activeSnippetId: string;
  onUpdate: (settings: Partial<DuckSettings>) => void;
  onPickSnippet: (id: string) => void;
  onBrowse: () => void;
  onAddCustom: () => void;
}) {
  const hasSecondRow = settings.domain === "dsa";

  return (
    <div className="control-bar" aria-label="Practice settings">
      <div className="control-row">
        <ControlGroup label="mode">
          {domainOptions.map((domain) => (
            <ControlButton
              key={domain.id}
              active={settings.domain === domain.id}
              onClick={() => onUpdate({ domain: domain.id, track: "Any", framework: "Any" })}
              icon={domain.icon}
            >
              {domain.label}
            </ControlButton>
          ))}
        </ControlGroup>

        <ControlGroup label="time">
          {timeOptions.map((seconds) => (
            <ControlButton key={seconds} active={settings.durationSeconds === seconds} onClick={() => onUpdate({ durationSeconds: seconds })}>
              {seconds === 0 ? "∞" : seconds}
            </ControlButton>
          ))}
        </ControlGroup>

        <ControlGroup label="lang">
          <Dropdown
            ariaLabel="Language"
            value={settings.language}
            onChange={(language) => onUpdate({ language, framework: "Any", track: "Any" })}
            options={filters.languages.map((language) => ({ value: language, label: language.toLowerCase() }))}
          />
        </ControlGroup>

        {filters.frameworks.length > 1 ? (
          <ControlGroup label="framework">
            <Dropdown
              ariaLabel="Framework"
              value={settings.framework}
              onChange={(framework) => onUpdate({ framework, track: "Any" })}
              options={filters.frameworks.map((framework) => ({ value: framework, label: framework.toLowerCase() }))}
            />
          </ControlGroup>
        ) : null}

        {hasSecondRow ? null : (
          <ControlGroup label="">
            <ControlButton active={false} onClick={onBrowse} icon={<List size={14} />}>
              snippets
            </ControlButton>
          </ControlGroup>
        )}

        {settings.domain === "custom" ? (
          <ControlGroup label="">
            <ControlButton active={false} onClick={onAddCustom} icon={<Plus size={14} />}>
              paste snippet
            </ControlButton>
          </ControlGroup>
        ) : null}
      </div>

      {hasSecondRow ? (
        <div className="control-row control-row-secondary">
          <ControlGroup label="category">
            <Dropdown
              ariaLabel="DSA category"
              value={settings.track}
              onChange={(track) => onUpdate({ track })}
              options={filters.tracks.map((track) => ({ value: track, label: track.toLowerCase() }))}
            />
          </ControlGroup>

          <ControlGroup label="problem">
            <Dropdown
              ariaLabel="DSA problem"
              value={activeSnippetId}
              onChange={onPickSnippet}
              options={pool.map((entry) => ({ value: entry.id, label: entry.title.toLowerCase() }))}
            />
          </ControlGroup>

          <ControlGroup label="">
            <ControlButton active={false} onClick={onBrowse} icon={<List size={14} />}>
              snippets
            </ControlButton>
          </ControlGroup>
        </div>
      ) : null}
    </div>
  );
}

type SnippetScope = "selection" | "language" | "mode" | "all";

const snippetScopes: { id: SnippetScope; label: string }[] = [
  { id: "selection", label: "mode + language" },
  { id: "language", label: "language" },
  { id: "mode", label: "mode" },
  { id: "all", label: "all" },
];

function SnippetPicker({
  snippets,
  settings,
  activeSnippetId,
  onPick,
  onClose,
}: {
  snippets: Snippet[];
  settings: DuckSettings;
  activeSnippetId: string;
  onPick: (id: string) => void;
  onClose: () => void;
}) {
  const [scope, setScope] = useState<SnippetScope>("selection");

  const pool = useMemo(() => {
    switch (scope) {
      case "language":
        return snippets.filter((entry) => entry.language === settings.language);
      case "mode":
        return snippets.filter((entry) => entry.domain === settings.domain);
      case "all":
        return snippets;
      default:
        return matchSnippets(snippets, settings);
    }
  }, [scope, snippets, settings]);

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <Command className="palette" filter={paletteFilter} onClick={(event) => event.stopPropagation()}>
        <Command.Input autoFocus placeholder="search snippets..." />
        <div className="palette-scope">
          {snippetScopes.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={cn("palette-scope-item", scope === entry.id && "active")}
              onClick={() => setScope(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <Command.List>
          <Command.Empty>No snippet found.</Command.Empty>
          {pool.map((entry) => (
            <Command.Item key={entry.id} value={`${entry.title} ${entry.language} ${entry.framework ?? ""} ${entry.category}`} onSelect={() => onPick(entry.id)}>
              <Code2 size={15} />
              {entry.title.toLowerCase()}
              <span>
                {entry.language.toLowerCase()}
                {entry.framework ? ` · ${entry.framework.toLowerCase()}` : ""} · {entry.category}
              </span>
              {entry.id === activeSnippetId ? <Check size={14} className="palette-check" /> : null}
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="control-group">
      <span className="control-label">{label}</span>
      {children}
    </div>
  );
}

export function ControlButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <button className={cn("control-button", active && "active")} onClick={onClick} aria-pressed={active}>
      {icon}
      {children}
    </button>
  );
}

export function Dropdown({
  value,
  options,
  onChange,
  ariaLabel,
  className,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  ariaLabel?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className={cn("dropdown", className)} ref={rootRef}>
      <button
        type="button"
        className="dropdown-trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="dropdown-trigger-label">{selected?.label ?? ""}</span>
      </button>
      {open ? (
        <ul className="dropdown-menu" role="listbox" aria-label={ariaLabel}>
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={cn("dropdown-item", option.value === value && "active")}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

type KeySample = { t: number; len: number; errs: number };

type SeriesPoint = { sec: number; raw: number; avg: number; errors: number };

function buildSeries(samples: KeySample[], elapsedSeconds: number): SeriesPoint[] {
  const total = Math.max(1, Math.ceil(elapsedSeconds));
  const points: SeriesPoint[] = [];
  let prevLen = 0;
  let prevErrs = 0;

  for (let sec = 1; sec <= total; sec++) {
    const bucket = samples.filter((sample) => sample.t <= sec);
    const last = bucket[bucket.length - 1];
    const len = last?.len ?? prevLen;
    const errs = last?.errs ?? prevErrs;
    const raw = Math.max(0, ((len - prevLen) / 5) * 60);
    const correct = Math.max(0, len - errs);
    const avg = correct / 5 / (sec / 60);
    points.push({ sec, raw: Math.round(raw), avg: Math.round(avg), errors: Math.max(0, errs - prevErrs) });
    prevLen = len;
    prevErrs = errs;
  }

  return points;
}

function realConsistency(points: SeriesPoint[], fallback: number) {
  const raws = points.map((point) => point.raw).filter((raw) => raw > 0);
  if (raws.length < 2) return fallback;
  const mean = raws.reduce((sum, raw) => sum + raw, 0) / raws.length;
  if (mean === 0) return fallback;
  const variance = raws.reduce((sum, raw) => sum + (raw - mean) ** 2, 0) / raws.length;
  return Math.min(100, Math.max(0, Math.round((1 - Math.sqrt(variance) / mean) * 100)));
}

function chartGeometry(points: SeriesPoint[]) {
  const width = 860;
  const height = 220;
  const pad = { top: 14, right: 14, bottom: 28, left: 52 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const maxWpm = Math.max(20, ...points.map((point) => Math.max(point.raw, point.avg))) * 1.1;
  const x = (sec: number) => pad.left + (points.length === 1 ? innerW / 2 : ((sec - 1) / (points.length - 1)) * innerW);
  const y = (wpm: number) => pad.top + innerH - (wpm / maxWpm) * innerH;
  // quadratic midpoint smoothing
  const toPath = (key: "raw" | "avg") => {
    if (points.length === 1) return `M${x(1)},${y(points[0][key])}`;
    let path = `M${x(points[0].sec).toFixed(1)},${y(points[0][key]).toFixed(1)}`;
    for (let index = 1; index < points.length; index++) {
      const prev = points[index - 1];
      const curr = points[index];
      const midX = (x(prev.sec) + x(curr.sec)) / 2;
      const midY = (y(prev[key]) + y(curr[key])) / 2;
      path += ` Q${x(prev.sec).toFixed(1)},${y(prev[key]).toFixed(1)} ${midX.toFixed(1)},${midY.toFixed(1)}`;
    }
    const last = points[points.length - 1];
    path += ` L${x(last.sec).toFixed(1)},${y(last[key]).toFixed(1)}`;
    return path;
  };
  const tickStep = Math.max(1, Math.ceil(points.length / 14));
  const ticks = points.filter((point) => (point.sec - 1) % tickStep === 0 || point.sec === points.length).map((point) => point.sec);
  return { width, height, pad, innerW, innerH, maxWpm, x, y, toPath, ticks };
}

function ResultChart({ points }: { points: SeriesPoint[] }) {
  const geo = chartGeometry(points);
  const { width, height, pad, maxWpm, x, y, toPath, ticks } = geo;

  return (
    <svg className="result-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Words per minute over time">
      {[0, 0.25, 0.5, 0.75, 1].map((fraction) => (
        <g key={fraction}>
          <line x1={pad.left} x2={width - pad.right} y1={y(maxWpm * fraction)} y2={y(maxWpm * fraction)} className="chart-grid" />
          <text x={pad.left - 8} y={y(maxWpm * fraction) + 3} className="chart-label" textAnchor="end">{Math.round(maxWpm * fraction)}</text>
        </g>
      ))}
      {ticks.map((sec) => (
        <g key={sec}>
          <line x1={x(sec)} x2={x(sec)} y1={pad.top} y2={height - pad.bottom} className="chart-grid chart-grid-v" />
          <text x={x(sec)} y={height - 8} className="chart-label" textAnchor="middle">{sec}</text>
        </g>
      ))}
      <text transform={`translate(12, ${height / 2}) rotate(-90)`} className="chart-label" textAnchor="middle">words per minute</text>
      <path d={toPath("raw")} className="chart-raw" />
      <path d={toPath("avg")} className="chart-avg" />
      {points.filter((point) => point.errors > 0).map((point) => (
        <g key={point.sec} className="chart-error" transform={`translate(${x(point.sec)}, ${y(point.raw)})`}>
          <line x1={-3.5} y1={-3.5} x2={3.5} y2={3.5} />
          <line x1={-3.5} y1={3.5} x2={3.5} y2={-3.5} />
        </g>
      ))}
    </svg>
  );
}

function paletteFilter(value: string, search: string) {
  return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
}

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function downloadResultImage(stats: TypingStats, consistency: number, points: SeriesPoint[], testType: string) {
  const geo = chartGeometry(points);
  const bg = cssVar("--background");
  const muted = cssVar("--muted");
  const accent = cssVar("--accent");
  const line = cssVar("--line");
  const chart = [
    ...[0, 0.5, 1].map((fraction) => `<line x1="${geo.pad.left}" x2="${geo.width - geo.pad.right}" y1="${geo.y(geo.maxWpm * fraction)}" y2="${geo.y(geo.maxWpm * fraction)}" stroke="${line}" stroke-width="1"/>`),
    `<path d="${geo.toPath("raw")}" fill="none" stroke="${muted}" stroke-width="2"/>`,
    `<path d="${geo.toPath("avg")}" fill="none" stroke="${accent}" stroke-width="2.5"/>`,
  ].join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="420" font-family="monospace">
    <rect width="1000" height="420" fill="${bg}"/>
    <text x="48" y="56" fill="${accent}" font-size="26" font-weight="bold">duck_type</text>
    <text x="48" y="150" fill="${muted}" font-size="20">wpm</text>
    <text x="48" y="205" fill="${accent}" font-size="56">${stats.wpm}</text>
    <text x="48" y="260" fill="${muted}" font-size="20">acc</text>
    <text x="48" y="315" fill="${accent}" font-size="56">${stats.accuracy}%</text>
    <g transform="translate(120, 90) scale(0.92)">${chart}</g>
    <text x="48" y="385" fill="${muted}" font-size="16">${testType}   raw ${stats.rawWpm}   consistency ${consistency}%   time ${stats.elapsedSeconds}s</text>
  </svg>`;
  const image = new window.Image();
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 420;
    canvas.getContext("2d")?.drawImage(image, 0, 0);
    const link = document.createElement("a");
    link.download = `ducktype-result-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function AddSnippetModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (input: { title: string; language: string; shikiLang: BundledLanguage; code: string }) => void;
}) {
  const [title, setTitle] = useState("");
  const [optionIndex, setOptionIndex] = useState(0);
  const [code, setCode] = useState("");

  function handleSubmit() {
    if (!code.trim()) return;
    const option = customLanguageOptions[optionIndex];
    onSubmit({ title: title.trim(), language: option.language, shikiLang: option.shikiLang, code });
  }

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="settings-panel" onClick={(event) => event.stopPropagation()}>
        <div className="settings-head">
          <span>paste your own snippet</span>
          <button className="icon-button" onClick={onClose} title="Close (esc)">
            <X size={16} />
          </button>
        </div>
        <div className="settings-body">
          <div className="settings-row">
            <span className="settings-label">title</span>
            <input
              className="select"
              style={{ width: "100%" }}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. auth middleware"
              autoFocus
            />
          </div>
          <div className="settings-row">
            <span className="settings-label">language</span>
            <Dropdown
              value={String(optionIndex)}
              onChange={(value) => setOptionIndex(Number(value))}
              options={customLanguageOptions.map((option, index) => ({ value: String(index), label: option.label.toLowerCase() }))}
            />
          </div>
          <div className="settings-row">
            <textarea
              className="select"
              style={{ width: "100%", minHeight: "12rem", resize: "vertical", fontFamily: "var(--duck-font)" }}
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="paste your code here..."
              spellCheck={false}
            />
          </div>
          <div className="settings-row" style={{ justifyContent: "flex-end" }}>
            <button className="result-button" onClick={handleSubmit}>
              <Check size={14} /> save &amp; type it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReplayModal({
  snippet,
  tokens,
  samples,
  onClose,
}: {
  snippet: Snippet;
  tokens: TokenChar[];
  samples: KeySample[];
  onClose: () => void;
}) {
  const [replayTyped, setReplayTyped] = useState("");

  useEffect(() => {
    const timers = samples.map((sample) =>
      window.setTimeout(() => setReplayTyped(snippet.code.slice(0, sample.len)), Math.max(16, sample.t * 1000)),
    );
    timers.push(window.setTimeout(() => setReplayTyped(""), 0));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [samples, snippet]);

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="settings-panel" onClick={(event) => event.stopPropagation()}>
        <div className="settings-head">
          <span>replay</span>
          <button className="icon-button" onClick={onClose} title="Close (esc)">
            <X size={16} />
          </button>
        </div>
        <div className="settings-body replay-body">
          <CodeLayer code={snippet.code} typed={replayTyped} tokens={tokens} />
        </div>
      </div>
    </div>
  );
}

function ResultsPanel({
  stats,
  snippet,
  settings,
  samples,
  tokens,
  onRestart,
  onNext,
}: {
  stats: TypingStats;
  snippet: Snippet;
  settings: DuckSettings;
  samples: KeySample[];
  tokens: TokenChar[];
  onRestart: () => void;
  onNext: () => void;
}) {
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const points = buildSeries(samples, stats.elapsedSeconds);
  const consistency = realConsistency(points, stats.consistency);
  const typedLen = samples[samples.length - 1]?.len ?? 0;
  const correctChars = Math.max(0, typedLen - stats.errors);
  const missedChars = Math.max(0, snippet.code.length - typedLen);
  const modeLabel = domainOptions.find((option) => option.id === settings.domain)?.label ?? settings.domain;
  const testTypeLines = [
    modeLabel,
    snippet.language.toLowerCase(),
    settings.durationSeconds === 0 ? "time ∞" : `time ${settings.durationSeconds}`,
    ...(settings.funbox !== "none" ? [settings.funbox] : []),
  ];
  const testTypeText = testTypeLines.join(" · ");

  const subItems: [string, string | number][] = [
    ["raw", stats.rawWpm],
    ["characters", `${correctChars}/${stats.errors}/${missedChars}`],
    ["consistency", `${consistency}%`],
    ["time", `${stats.elapsedSeconds}s`],
  ];

  return (
    <div className="results-panel">
      <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
        {snippet.language} · {snippet.title}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
        <div className="flex shrink-0 flex-col gap-4">
          <div className="result-big">
            <div className="label">wpm</div>
            <div className="value">{stats.wpm}</div>
          </div>
          <div className="result-big">
            <div className="label">acc</div>
            <div className="value">{stats.accuracy}%</div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <ResultChart points={points} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-start gap-x-12 gap-y-5">
        <div className="result-sub">
          <div className="label">test type</div>
          <div className="test-type">
            {testTypeLines.map((lineText) => (
              <div key={lineText}>{lineText}</div>
            ))}
          </div>
        </div>
        {subItems.map(([label, value]) => (
          <div key={label} className="result-sub">
            <div className="label">{label}</div>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        <button className="icon-button result-action" onClick={onNext} title="Next snippet (enter)">
          <ChevronRight size={19} />
        </button>
        <button className="icon-button result-action" onClick={onRestart} title="Restart (esc)">
          <RotateCcw size={17} />
        </button>
        <button className="icon-button result-action" onClick={() => setIsReplayOpen(true)} title="Watch replay">
          <Rewind size={17} />
        </button>
        <button className="icon-button result-action" onClick={() => downloadResultImage(stats, consistency, points, testTypeText)} title="Save result image">
          <ImageIcon size={17} />
        </button>
      </div>

      {isReplayOpen ? <ReplayModal snippet={snippet} tokens={tokens} samples={samples} onClose={() => setIsReplayOpen(false)} /> : null}
    </div>
  );
}

function Palette({
  open,
  filters,
  settings,
  pool,
  activeSnippetId,
  query,
  onQueryChange,
  onClose,
  onUpdate,
  onRestart,
  onNext,
  onSignIn,
  onSignOut,
  authUser,
  authLabel,
  onOpenSettings,
  onBrowse,
  onRandom,
  onAddCustom,
}: {
  open: boolean;
  filters: ReturnType<typeof getFilters>;
  settings: DuckSettings;
  pool: Snippet[];
  activeSnippetId: string;
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
  onUpdate: (settings: Partial<DuckSettings>) => void;
  onRestart: () => void;
  onNext: () => void;
  onSignIn: (provider: "github" | "google") => void;
  onSignOut: () => void;
  authUser: AuthUser | null;
  authLabel: string;
  onOpenSettings: () => void;
  onBrowse: () => void;
  onRandom: () => void;
  onAddCustom: () => void;
}) {
  if (!open) return null;

  function choose(next: Partial<DuckSettings>) {
    onUpdate(next);
    onClose();
  }

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <Command className="palette" filter={paletteFilter} onClick={(event) => event.stopPropagation()}>
        <Command.Input autoFocus value={query} onValueChange={onQueryChange} placeholder="change mode, language, theme, caret, font..." />
        <Command.List>
          <Command.Empty>No command found.</Command.Empty>
          <Command.Group heading="Actions">
            <Command.Item onSelect={() => { onRestart(); onClose(); }}><RotateCcw size={15} />restart test<span className="palette-shortcut">Esc</span></Command.Item>
            <Command.Item onSelect={() => { onNext(); onClose(); }}><ChevronRight size={15} />next snippet</Command.Item>
            <Command.Item onSelect={() => { onRandom(); onClose(); }}><Shuffle size={15} />random snippet</Command.Item>
            <Command.Item onSelect={() => { onClose(); onBrowse(); }}><List size={15} />browse snippets…</Command.Item>
            <Command.Item onSelect={() => choose({ viewMode: settings.viewMode === "ide" ? "focus" : "ide" })}>
              <Eye size={15} />ide mode <span>{settings.viewMode === "ide" ? "on — full snippet" : "off"}</span>
            </Command.Item>
            <Command.Item onSelect={() => { navigator.clipboard.writeText(pool.find((entry) => entry.id === activeSnippetId)?.code ?? ""); onClose(); }}>
              <Copy size={15} />copy snippet
            </Command.Item>
            <Command.Item onSelect={() => { onAddCustom(); onClose(); }}><Plus size={15} />paste custom snippet</Command.Item>
            <Command.Item onSelect={() => { onClose(); onOpenSettings(); }}><Settings size={15} />open settings</Command.Item>
            {authUser ? (
              <Command.Item onSelect={() => { onSignOut(); onClose(); }}><User size={15} />sign out ({authLabel})</Command.Item>
            ) : (
              <>
                <Command.Item onSelect={() => onSignIn("github")}><User size={15} />sign in with GitHub</Command.Item>
                <Command.Item onSelect={() => onSignIn("google")}><User size={15} />sign in with Google</Command.Item>
              </>
            )}
          </Command.Group>
          <Command.Group heading="Modes">
            {filters.domains.map((domain) => (
              <Command.Item key={domain} onSelect={() => choose({ domain: domain as PracticeDomain, track: "Any", framework: "Any" })}>
                <Gauge size={15} />mode <span>{domainOptions.find((option) => option.id === domain)?.label ?? domain}</span>{settings.domain === domain ? <Check size={14} className="palette-check" /> : null}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Time">
            {timeOptions.map((seconds) => (
              <Command.Item key={seconds} onSelect={() => choose({ durationSeconds: seconds })}>
                <Gauge size={15} />time <span>{seconds === 0 ? "infinite" : `${seconds} seconds`}</span>{settings.durationSeconds === seconds ? <Check size={14} className="palette-check" /> : null}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Caret">
            {caretStyles.map((style) => (
              <Command.Item key={style} onSelect={() => choose({ caretStyle: style })}>
                <Type size={15} />caret <span>{style}</span>{settings.caretStyle === style ? <Check size={14} className="palette-check" /> : null}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Font size">
            {fontSizes.map((size) => (
              <Command.Item key={size.id} onSelect={() => choose({ fontSize: size.id })}>
                <Type size={15} />font size <span>{size.label}</span>{settings.fontSize === size.id ? <Check size={14} className="palette-check" /> : null}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Funbox">
            {funboxes.map((funbox) => (
              <Command.Item key={funbox.id} onSelect={() => choose({ funbox: funbox.id })}>
                <Gauge size={15} />funbox <span>{funbox.label} — {funbox.desc}</span>{settings.funbox === funbox.id ? <Check size={14} className="palette-check" /> : null}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Behavior">
            <Command.Item onSelect={() => choose({ stopOnError: settings.stopOnError === "letter" ? "off" : "letter" })}>
              <Gauge size={15} />stop on error <span>{settings.stopOnError === "letter" ? "on — wrong keys are blocked" : "off"}</span>
            </Command.Item>
            <Command.Item onSelect={() => choose({ showLiveWpm: !settings.showLiveWpm })}>
              <Gauge size={15} />live wpm <span>{settings.showLiveWpm ? "shown" : "hidden"}</span>
            </Command.Item>
            <Command.Item onSelect={() => choose({ showLiveTimer: !settings.showLiveTimer })}>
              <Gauge size={15} />live timer <span>{settings.showLiveTimer ? "shown" : "hidden"}</span>
            </Command.Item>
            <Command.Item onSelect={() => choose({ showProgress: !settings.showProgress })}>
              <Gauge size={15} />progress bar <span>{settings.showProgress ? "shown" : "hidden"}</span>
            </Command.Item>
          </Command.Group>
          <Command.Group heading="Languages">
            {filters.languages.map((language) => (
              <Command.Item key={language} onSelect={() => choose({ language, framework: "Any", track: "Any" })}>
                <Code2 size={15} />language <span>{language}</span>{settings.language === language ? <Check size={14} className="palette-check" /> : null}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Frameworks">
            {filters.frameworks.map((framework) => (
              <Command.Item key={framework} onSelect={() => choose({ framework })}>
                <Server size={15} />framework <span>{framework}</span>{settings.framework === framework ? <Check size={14} className="palette-check" /> : null}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Tracks">
            {filters.tracks.map((track) => (
              <Command.Item key={track} onSelect={() => choose({ track })}>
                <Database size={15} />track <span>{track}</span>{settings.track === track ? <Check size={14} className="palette-check" /> : null}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Themes">
            {themes.map((theme) => (
              <Command.Item key={theme.id} onSelect={() => choose({ theme: theme.id })}>
                <PaletteIcon size={15} />theme <span>{theme.label}</span>{settings.theme === theme.id ? <Check size={14} className="palette-check" /> : null}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Fonts">
            {fonts.map((font) => (
              <Command.Item key={font.label} onSelect={() => choose({ font: font.label })}>
                <Type size={15} />font <span>{font.label}</span>{settings.font === font.label ? <Check size={14} className="palette-check" /> : null}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
        <div className="border-t border-[var(--line)] px-4 py-3 text-xs text-[var(--muted)]">
          current: {settings.language} / {settings.domain} / {settings.framework}
        </div>
      </Command>
    </div>
  );
}

export function SettingsRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="settings-row">
      <span className="settings-label">{label}</span>
      <div className="settings-options">{children}</div>
    </div>
  );
}

export function DuckLogo() {
  return (
    <svg viewBox="0 0 32 32" width="27" height="27" aria-hidden="true" className="logo-duck">
      <path
        fill="currentColor"
        d="M23.9 13.1c.3-.8.4-1.6.4-2.5C24.3 6.4 20.9 3 16.8 3c-3.6 0-6.7 2.6-7.4 6.1-1-.1-2-.5-2.7-1.3-.3 1.7.3 3.3 1.4 4.3C5.7 13.8 4 16.5 4 19.2 4 24 9.1 27 15.5 27c6.3 0 11.7-3.3 12.5-10.7-1.9 1.3-4.4 1.5-6.6.9z"
      />
      <circle cx="18.9" cy="8.6" r="1.4" fill="var(--background)" />
      <path fill="currentColor" d="M24.2 9c1.6-.3 3.2.2 4 1.3-1 .9-2.6 1.2-4.2.9z" />
    </svg>
  );
}

function flattenTokens(lines: Array<Array<{ content: string; color?: string }>>): TokenChar[] {
  const output: TokenChar[] = [];

  lines.forEach((line, lineIndex) => {
    line.forEach((token) => {
      for (const char of token.content) {
        output.push({ char, color: token.color });
      }
    });

    if (lineIndex < lines.length - 1) {
      output.push({ char: "\n" });
    }
  });

  return output;
}
