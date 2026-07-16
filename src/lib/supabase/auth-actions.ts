"use client";

import { createClient } from "@/lib/supabase/client";

export async function signInWithProvider(provider: "github" | "google") {
  const supabase = createClient();
  if (!supabase) return;

  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

export async function signOut() {
  const supabase = createClient();
  await supabase?.auth.signOut();
}
