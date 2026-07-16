-- Cloud sync for signed-in users. Guests never touch these tables (client
-- falls back to localStorage when unauthenticated or when Supabase env vars
-- are absent), so RLS only needs to cover the "own row" case.

create table if not exists public.stats (
  user_id uuid primary key references auth.users (id) on delete cascade,
  tests_started integer not null default 0,
  sessions jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.stats enable row level security;
alter table public.settings enable row level security;

create policy "stats: owner read" on public.stats
  for select using (auth.uid() = user_id);

create policy "stats: owner write" on public.stats
  for insert with check (auth.uid() = user_id);

create policy "stats: owner update" on public.stats
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "settings: owner read" on public.settings
  for select using (auth.uid() = user_id);

create policy "settings: owner write" on public.settings
  for insert with check (auth.uid() = user_id);

create policy "settings: owner update" on public.settings
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
