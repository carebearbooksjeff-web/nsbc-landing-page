-- Run once in your Supabase project's SQL Editor.
-- If a leads table already exists, inspect it before migrating.
begin;

create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz not null default now(),
  full_name text not null
    check (char_length(full_name) between 1 and 160),
  firm_name text not null
    check (char_length(firm_name) between 1 and 160),
  email text not null
    check (char_length(email) between 3 and 254),
  phone text not null
    check (char_length(phone) between 7 and 40),
  state text not null,
  client_count text not null
    check (client_count in (
      '1–5', '6–15', '16–40', 'More than 40'
    )),
  platform text not null
    check (platform in (
      'QuickBooks Online',
      'Xero',
      'ZipBooks',
      'No software (bank statements)',
      'Other'
    )),
  notes text not null default ''
    check (char_length(notes) <= 5000)
);

create index leads_created_at_idx
  on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Direct browser access is disabled.
revoke all on table public.leads
  from public, anon, authenticated;

grant select, insert on table public.leads
  to service_role;

commit;
