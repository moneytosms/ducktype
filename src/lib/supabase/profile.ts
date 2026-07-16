"use client";

import { createClient } from "@/lib/supabase/client";

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;

export function isValidUsername(username: string) {
  return USERNAME_PATTERN.test(username);
}

export async function getUsername(): Promise<string | null> {
  const supabase = createClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  const { data: profile } = await supabase.from("profiles").select("username").eq("user_id", data.user.id).maybeSingle();
  return profile?.username ?? null;
}

export async function setUsername(username: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isValidUsername(username)) {
    return { ok: false, error: "3-20 characters: letters, numbers, underscore" };
  }

  const supabase = createClient();
  if (!supabase) return { ok: false, error: "not signed in" };
  const { data } = await supabase.auth.getUser();
  if (!data.user) return { ok: false, error: "not signed in" };

  const { error } = await supabase.from("profiles").upsert({ user_id: data.user.id, username, updated_at: new Date().toISOString() });
  if (error) {
    return { ok: false, error: error.code === "23505" ? "username taken" : error.message };
  }
  return { ok: true };
}
