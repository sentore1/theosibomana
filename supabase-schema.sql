-- Theogene Sibomana — theogenesibo.com
-- Run this in your Supabase SQL Editor

create table if not exists books (
  id bigint generated always as identity primary key,
  title text not null,
  author text not null default 'Theogene Sibomana',
  description text,
  cover_url text,
  buy_links jsonb default '[]',
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists subscribers (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  type text default 'newsletter', -- 'newsletter' or 'contact'
  created_at timestamptz default now()
);

-- Seed default books
insert into books (title, author, description, published) values
  ('Wealth School Africa', 'Theogene Sibomana', 'Build Wealth, Create Freedom', true),
  ('Personal Financial Success', 'Theogene Sibomana', 'Plan • Save • Invest • Grow', true),
  ('Leadership for Impact', 'Theogene Sibomana', '', true)
on conflict do nothing;

-- Enable Row Level Security
alter table books enable row level security;
alter table subscribers enable row level security;

-- Allow public read for published books
create policy "Public can read published books"
  on books for select
  using (published = true);

-- Allow public insert for subscribers
create policy "Public can subscribe"
  on subscribers for insert
  with check (true);

-- Allow all operations with service role (for admin)
create policy "Service role full access books"
  on books for all
  using (true);

create policy "Service role full access subscribers"
  on subscribers for all
  using (true);
