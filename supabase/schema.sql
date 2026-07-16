create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.snippets (
  id text primary key,
  title text not null,
  domain text not null,
  track text not null,
  language text not null,
  framework text,
  difficulty text not null,
  category text not null,
  prompt text not null,
  code text not null,
  shiki_lang text not null,
  optimality text,
  typing_focus text[] not null default '{}',
  is_public boolean not null default true,
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  snippet_id text not null references public.snippets(id) on delete cascade,
  wpm integer not null,
  raw_wpm integer not null,
  accuracy integer not null,
  consistency integer not null,
  errors integer not null,
  elapsed_seconds integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  domain text not null default 'backend',
  language text not null default 'Python',
  framework text not null default 'FastAPI',
  track text not null default 'REST API',
  theme text not null default 'serika-dark',
  font text not null default 'Geist Mono',
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.snippets enable row level security;
alter table public.attempts enable row level security;
alter table public.user_settings enable row level security;

create policy "profiles are readable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "snippets public or owned"
  on public.snippets for select
  using (is_public or auth.uid() = owner_id);

create policy "users manage private snippets"
  on public.snippets for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id and is_public = false);

create policy "users manage attempts"
  on public.attempts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users manage settings"
  on public.user_settings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
