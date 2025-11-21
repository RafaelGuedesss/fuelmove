/*
  # Create trips table
  
  ## Query Description:
  Creates the 'trips' table to store fuel management data and sets up Row Level Security (RLS).
  
  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Medium"
  - Requires-Backup: false
  - Reversible: true
  
  ## Structure Details:
  - Table: trips
  - Columns: id, origin, destination, km_initial, km_final, km_run, fuel_price, km_per_l, user_id, created_at
  
  ## Security Implications:
  - RLS Enabled
  - Policies ensure users can only access their own data
*/

create table if not exists public.trips (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  origin text not null,
  destination text not null,
  km_initial numeric,
  km_final numeric,
  km_run numeric,
  fuel_price numeric,
  km_per_l numeric,
  user_id uuid references auth.users not null
);

-- Enable Row Level Security
alter table public.trips enable row level security;

-- Create policies
create policy "Users can view their own trips"
  on public.trips
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own trips"
  on public.trips
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own trips"
  on public.trips
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own trips"
  on public.trips
  for delete
  using (auth.uid() = user_id);
