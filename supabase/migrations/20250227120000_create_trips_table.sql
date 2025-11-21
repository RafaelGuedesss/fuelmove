/*
  # Create Trips Table
  Creates the trips table for storing fuel management data.

  ## Query Description:
  1. Creates public.trips table if it doesn't exist.
  2. Enables Row Level Security (RLS).
  3. Creates policies for users to select and insert only their own data.
  
  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Medium"
  - Requires-Backup: false
  - Reversible: true
  
  ## Structure Details:
  - Table: trips
  - Columns: id, origin, destination, km_initial, km_final, km_run, fuel_price, km_per_l, created_at, user_id
  
  ## Security Implications:
  - RLS Enabled: Yes
  - Auth Requirements: Authenticated users only via policies
*/

create table if not exists public.trips (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  origin text not null,
  destination text not null,
  km_initial numeric,
  km_final numeric,
  km_run numeric,
  fuel_price numeric,
  km_per_l numeric,
  user_id uuid references auth.users default auth.uid(),
  constraint trips_pkey primary key (id)
);

alter table public.trips enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Users can view their own trips' and tablename = 'trips') then
    create policy "Users can view their own trips" on public.trips for select using (auth.uid() = user_id);
  end if;
  
  if not exists (select 1 from pg_policies where policyname = 'Users can insert their own trips' and tablename = 'trips') then
    create policy "Users can insert their own trips" on public.trips for insert with check (auth.uid() = user_id);
  end if;
end $$;
