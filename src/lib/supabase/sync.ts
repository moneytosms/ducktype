"use client";

import { createClient } from "@/lib/supabase/client";
import type { StatsStore } from "@/lib/stats-store";
import type { DuckSettings } from "@/types/snippet";

// Fire-and-forget cloud writes. No-op when signed out or Supabase env vars
// are missing — callers don't need to check auth state first.

export async function pushStats(stats: StatsStore) {
  const supabase = createClient();
  if (!supabase) return;
  const { data } = await supabase.auth.getSession();
  const userId = data.session?.user.id;
  if (!userId) return;
  await supabase.from("stats").upsert({
    user_id: userId,
    tests_started: stats.testsStarted,
    sessions: stats.sessions,
    updated_at: new Date().toISOString(),
  });
}

export async function pushSettings(settings: DuckSettings) {
  const supabase = createClient();
  if (!supabase) return;
  const { data } = await supabase.auth.getSession();
  const userId = data.session?.user.id;
  if (!userId) return;
  await supabase.from("settings").upsert({
    user_id: userId,
    data: settings,
    updated_at: new Date().toISOString(),
  });
}

// Runs once right after sign-in resolves. First-ever login pushes this
// device's local data up as the initial cloud row; a returning user's cloud
// row overwrites local (cloud wins).
export async function syncOnSignIn(localStats: StatsStore, localSettings: DuckSettings) {
  const supabase = createClient();
  if (!supabase) return null;
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return null;

  const [statsRes, settingsRes] = await Promise.all([
    supabase.from("stats").select("tests_started, sessions").eq("user_id", userId).maybeSingle(),
    supabase.from("settings").select("data").eq("user_id", userId).maybeSingle(),
  ]);

  let stats = localStats;
  if (statsRes.data) {
    stats = { version: localStats.version, testsStarted: statsRes.data.tests_started, sessions: statsRes.data.sessions };
  } else {
    await pushStats(localStats);
  }

  let settings = localSettings;
  if (settingsRes.data) {
    settings = { ...localSettings, ...(settingsRes.data.data as Partial<DuckSettings>) };
  } else {
    await pushSettings(localSettings);
  }

  return { stats, settings };
}
