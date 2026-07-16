"use client";

import { FaArrowLeft as ArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DuckLogo, SettingsRow, timeOptions } from "@/components/ducktype-app";
import {
  bestForDuration,
  loadStats,
  sessionsByDay,
  totalTimeTypingSeconds,
  type StatsStore,
} from "@/lib/stats-store";

const HEATMAP_WEEKS = 26;

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const mm = String(minutes % 60).padStart(2, "0");
  const ss = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
  return `${String(hours).padStart(2, "0")}:${mm}:${ss}`;
}

export function ProfilePage() {
  const [stats, setStats] = useState<StatsStore>({ version: 1, testsStarted: 0, sessions: [] });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats(loadStats());
  }, []);

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

  const testsCompleted = stats.sessions.length;
  const timeTyping = formatDuration(totalTimeTypingSeconds(stats));

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

        <div className="page-panel">
          <SettingsRow label="best wpm">
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
          </SettingsRow>
        </div>

        <div className="page-panel">
          <SettingsRow label="activity">
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
          </SettingsRow>
        </div>
      </div>
    </main>
  );
}
