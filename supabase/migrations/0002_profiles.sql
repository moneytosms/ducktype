-- Optional username, shown in place of the account email on the profile page.
-- Case-insensitive uniqueness (index, not a plain unique constraint) so
-- "Alex" and "alex" can't both be claimed.

create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  username text not null,
  updated_at timestamptz not null default now(),
  constraint username_format check (username ~ '^[a-zA-Z0-9_]{3,20}$')
);

create unique index if not exists profiles_username_lower_idx on public.profiles (lower(username));

alter table public.profiles enable row level security;

create policy "profiles: owner read" on public.profiles
  for select using (auth.uid() = user_id);

create policy "profiles: owner write" on public.profiles
  for insert with check (auth.uid() = user_id);

create policy "profiles: owner update" on public.profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
