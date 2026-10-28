-- Migration for a table created from the original schema.sql (0–10 slider).
-- Changes open_mic_interest to 'yes' | 'maybe' | 'no'.
-- Run once in the Supabase SQL Editor. Not needed if you create the table
-- fresh from the current schema.sql.

alter table public.rsvps drop constraint if exists rsvps_open_mic_interest_check;
alter table public.rsvps alter column open_mic_interest drop default;

-- Convert any existing (test) rows from the old 0–10 scale.
alter table public.rsvps
  alter column open_mic_interest type text
  using case
    when open_mic_interest >= 7 then 'yes'
    when open_mic_interest <= 3 then 'no'
    else 'maybe'
  end;

alter table public.rsvps
  add constraint rsvps_open_mic_interest_check
  check (open_mic_interest in ('yes', 'maybe', 'no'));
