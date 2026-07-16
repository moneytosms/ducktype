"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type AuthUser = { id: string; email: string | null; createdAt: string };

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ? { id: data.user.id, email: data.user.email ?? null, createdAt: data.user.created_at } : null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email ?? null, createdAt: session.user.created_at } : null);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  return user;
}
