-- Run this once in the Supabase dashboard: SQL Editor → New query → paste → Run.

create table if not exists public.rsvps (
  id                bigint generated always as identity primary key,
  created_at        timestamptz not null default now(),
  name              text not null check (char_length(name) between 1 and 200),
  phone             text not null check (char_length(phone) between 3 and 40),
  open_mic_interest text not null check (open_mic_interest in ('yes', 'maybe', 'no')),
  notes             text check (char_length(notes) <= 2000)
);

-- Row-level security: the public site (anon key) can only INSERT.
-- Nobody can read, update, or delete RSVPs except you via the dashboard
-- (which uses the service role and bypasses RLS).
alter table public.rsvps enable row level security;

drop policy if exists "Anyone can submit an RSVP" on public.rsvps;
create policy "Anyone can submit an RSVP"
  on public.rsvps
  for insert
  to anon
  with check (true);

grant insert on public.rsvps to anon;
