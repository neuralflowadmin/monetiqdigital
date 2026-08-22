-- Run this in the Supabase SQL editor before going live.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_id text unique not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  items jsonb not null,
  amount numeric not null,
  status text not null default 'PENDING', -- PENDING | PAID | FAILED
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Users can only ever read their own orders.
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- Only the server (using the service role key) creates/updates orders.
-- No insert/update policy is defined for the anon/authenticated roles,
-- so all writes must go through the Next.js API routes.
