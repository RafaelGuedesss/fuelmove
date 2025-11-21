/*
  # Create trips table

  ## Query Description:
  Creates the 'trips' table to store fuel management data and enables Row Level Security (RLS) to ensure data privacy.

  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Medium"
  - Requires-Backup: false
  - Reversible: true

  ## Structure Details:
  - Table: public.trips
  - Columns: id, created_at, origin, destination, km_initial, km_final, km_run, fuel_price, km_per_l, user_id
  - RLS: Enabled with policies for Select, Insert, Update, Delete based on auth.uid()
*/

-- Create the table
create table if not exists public.trips (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  origin text not null,
  destination text not null,
  km_initial numeric not null,
  km_final numeric not null,
  km_run numeric not null,
  fuel_price numeric not null,
  km_per_l numeric not null,
  user_id uuid references auth.users(id) not null,
  primary key (id)
);

-- Enable RLS
alter table public.trips enable row level security;

-- Create policies
create policy "Users can view their own trips" on public.trips
  for select using (auth.uid() = user_id);

create policy "Users can insert their own trips" on public.trips
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own trips" on public.trips
  for update using (auth.uid() = user_id);

create policy "Users can delete their own trips" on public.trips
  for delete using (auth.uid() = user_id);
