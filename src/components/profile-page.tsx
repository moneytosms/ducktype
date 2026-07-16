"use client";

import {
  FaArrowLeft as ArrowLeft,
  FaCheck as Check,
  FaGithub as Github,
  FaGoogle as Google,
  FaPen as Pen,
  FaRightFromBracket as LogOut,
  FaXmark as X,
} from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DuckLogo, timeOptions } from "@/components/ducktype-app";
import {
  bestForDuration,
  currentStreak,
  loadStats,
  sessionsByDay,
  totalTimeTypingSeconds,
  type StatsStore,
} from "@/lib/stats-store";
import { useAuthUser } from "@/lib/supabase/use-auth-user";
import { signInWithProvider, signOut } from "@/lib/supabase/auth-actions";
import { getUsername, isValidUsername, setUsername as saveUsername } from "@/lib/supabase/profile";

const HEATMAP_WEEKS = 26;
const TREND_SESSIONS = 40;

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const mm = String(minutes % 60).padStart(2, "0");
  const ss = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
  return `${String(hours).padStart(2, "0")}:${mm}:${ss}`;
}

function formatJoined(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function TrendChart({ points }: { points: number[] }) {
  const width = 860;
  const height = 180;
  const pad = { top: 12, right: 12, bottom: 8, left: 40 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const maxWpm = Math.max(20, ...points) * 1.1;
  const x = (index: number) => pad.left + (points.length === 1 ? innerW / 2 : (index / (points.length - 1)) * innerW);
  const y = (wpm: number) => pad.top + innerH - (wpm / maxWpm) * innerH;

  let path = `M${x(0).toFixed(1)},${y(points[0]).toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L${x(i).toFixed(1)},${y(points[i]).toFixed(1)}`;
  }

  return (
    <svg className="result-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Words per minute trend">
      {[0, 0.5, 1].map((fraction) => (
        <g key={fraction}>
          <line x1={pad.left} x2={width - pad.right} y1={y(maxWpm * fraction)} y2={y(maxWpm * fraction)} className="chart-grid" />
          <text x={pad.left - 8} y={y(maxWpm * fraction) + 3} className="chart-label" textAnchor="end">{Math.round(maxWpm * fraction)}</text>
        </g>
      ))}
      <path d={path} className="chart-avg" />
    </svg>
  );
}

function UsernameEditor({ username, onSaved }: { username: string | null; onSaved: (username: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(username ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!isEditing) {
    return (
      <button className="icon-button" title="edit username" onClick={() => { setDraft(username ?? ""); setError(null); setIsEditing(true); }}>
        <Pen size={13} />
      </button>
    );
  }

  async function submit() {
    if (!isValidUsername(draft)) {
      setError("3-20 chars: letters, numbers, underscore");
      return;
    }
    setSaving(true);
    const result = await saveUsername(draft);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onSaved(draft);
    setIsEditing(false);
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <input
        autoFocus
        className="select w-32 !max-w-none"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => { if (event.key === "Enter") submit(); if (event.key === "Escape") setIsEditing(false); }}
        placeholder="username"
      />
      <button className="icon-button" title="save" onClick={submit} disabled={saving}>
        <Check size={13} />
      </button>
      <button className="icon-button" title="cancel" onClick={() => setIsEditing(false)}>
        <X size={13} />
      </button>
      {error ? <span className="text-xs text-[var(--wrong)]">{error}</span> : null}
    </span>
  );
}

export function ProfilePage() {
  const user = useAuthUser();
  const [stats, setStats] = useState<StatsStore>({ version: 1, testsStarted: 0, sessions: [] });
  const [username, setUsernameState] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats(loadStats());
  }, []);

  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUsernameState(null);
      return;
    }
    getUsername().then(setUsernameState);
  }, [user]);

  const heatmap = useMemo(() => {
    const counts = sessionsByDay(stats);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days: { date: string; count: number }[] = [];
    for (let i = HEATMAP_WEEKS * 7 - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const key = date.toISOString().slice(0, 10);
      days.push({ date: key, count: counts.get(key) ?? 0 });
    }
    return days;
  }, [stats]);

  const trendPoints = useMemo(() => stats.sessions.slice(-TREND_SESSIONS).map((session) => session.wpm), [stats.sessions]);

  const testsCompleted = stats.sessions.length;
  const timeTyping = formatDuration(totalTimeTypingSeconds(stats));
  const streak = currentStreak(stats);
  const displayName = username ?? user?.email ?? "guest";
  const heatmapTests = heatmap.reduce((sum, day) => sum + day.count, 0);

  return (
    <main className="flex min-h-screen flex-col px-5 py-6 text-[var(--text)] md:px-10">
      <header className="chrome mx-auto flex w-full max-w-6xl items-center justify-between gap-4 text-sm text-[var(--muted)]">
        <Link href="/" className="logo">
          <DuckLogo />
          duck<span className="logo-caret">_</span>type
        </Link>
        <Link className="icon-button" href="/" title="Back">
          <ArrowLeft size={17} />
        </Link>
      </header>

      <div className="page-body mx-auto mt-8 w-full max-w-6xl">
        <h1 className="page-title">profile</h1>

        <div className="page-panel profile-header-card">
          <div className="profile-avatar">{displayName.charAt(0).toUpperCase()}</div>
          <div className="profile-header-info">
            <div className="profile-header-name">
              {displayName}
              {user ? <UsernameEditor username={username} onSaved={setUsernameState} /> : null}
            </div>
            <div className="profile-header-meta">
              {user ? <span>joined {formatJoined(user.createdAt)}</span> : <span>signed out — stats stay on this device only</span>}
              {streak > 0 ? <span>current streak {streak} day{streak === 1 ? "" : "s"}</span> : null}
            </div>
          </div>
          <div className="profile-header-actions">
            {user ? (
              <button className="icon-button" title="sign out" onClick={() => signOut()}>
                <LogOut size={16} />
              </button>
            ) : (
              <>
                <button className="icon-button" title="continue with GitHub" onClick={() => signInWithProvider("github")}>
                  <Github size={16} />
                </button>
                <button className="icon-button" title="continue with Google" onClick={() => signInWithProvider("google")}>
                  <Google size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="page-panel profile-summary">
          <div className="profile-stat">
            <span className="profile-stat-value">{stats.testsStarted}</span>
            <span className="profile-stat-label">tests started</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{testsCompleted}</span>
            <span className="profile-stat-label">tests completed</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{timeTyping}</span>
            <span className="profile-stat-label">time typing</span>
          </div>
        </div>

        {trendPoints.length >= 2 ? (
          <div className="page-panel">
            <div className="profile-section-head">
              <span className="profile-stat-label">wpm trend · last {trendPoints.length} tests</span>
            </div>
            <TrendChart points={trendPoints} />
          </div>
        ) : null}

        <div className="page-panel">
          <div className="profile-section-head">
            <span className="profile-stat-label">best wpm</span>
          </div>
          <div className="profile-pb-grid">
            {timeOptions.map((seconds) => {
              const best = bestForDuration(stats, seconds);
              return (
                <div key={seconds} className="profile-pb-tile">
                  <span className="profile-pb-duration">{seconds === 0 ? "∞" : `${seconds}s`}</span>
                  <span className="profile-pb-wpm">{best ? best.wpm : "-"}</span>
                  <span className="profile-pb-accuracy">{best ? `${best.accuracy}%` : "-"}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="page-panel">
          <div className="profile-section-head">
            <span className="profile-stat-label">last {HEATMAP_WEEKS} weeks · {heatmapTests} test{heatmapTests === 1 ? "" : "s"}</span>
            <span className="profile-heatmap-legend">
              less
              <span className="profile-heatmap-cell" data-level="0" />
              <span className="profile-heatmap-cell" data-level="1" />
              <span className="profile-heatmap-cell" data-level="2" />
              <span className="profile-heatmap-cell" data-level="3" />
              <span className="profile-heatmap-cell" data-level="4" />
              more
            </span>
          </div>
          <div className="profile-heatmap">
            {heatmap.map((day) => (
              <span
                key={day.date}
                className="profile-heatmap-cell"
                data-level={Math.min(day.count, 4)}
                title={`${day.date} · ${day.count} test${day.count === 1 ? "" : "s"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
