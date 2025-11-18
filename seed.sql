-- Placement Dashboard - Database Seed File
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Create users table (for demo purposes - in production use Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL, -- NOTE: In production, use hashed passwords with Supabase Auth
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert demo user
INSERT INTO public.users (email, password, name)
VALUES ('viewer@vite.co.in', 'pass123', 'Demo User')
ON CONFLICT (email) DO NOTHING;

-- Create sales table
CREATE TABLE IF NOT EXISTS public.sales (
  id SERIAL PRIMARY KEY,
  month TEXT NOT NULL,
  sales INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sales data (Jan-Jun)
INSERT INTO public.sales (month, sales) VALUES
  ('Jan', 4200),
  ('Feb', 3800),
  ('Mar', 5100),
  ('Apr', 4600),
  ('May', 5800),
  ('Jun', 6200)
ON CONFLICT DO NOTHING;

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  product TEXT NOT NULL,
  category TEXT NOT NULL,
  amount INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample transactions
INSERT INTO public.transactions (date, product, category, amount) VALUES
  ('2024-06-15', 'Laptop Pro', 'Electronics', 1299),
  ('2024-06-14', 'Office Chair', 'Furniture', 349),
  ('2024-06-13', 'Wireless Mouse', 'Electronics', 49),
  ('2024-06-12', 'Desk Lamp', 'Furniture', 79),
  ('2024-06-11', 'Keyboard', 'Electronics', 129),
  ('2024-06-10', 'Monitor Stand', 'Furniture', 59),
  ('2024-06-09', 'USB Hub', 'Electronics', 39),
  ('2024-06-08', 'Phone Case', 'Accessories', 25)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS) - IMPORTANT for production
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow read access (adjust for your security needs)
-- NOTE: These are permissive policies for demo purposes only
-- In production, restrict based on authenticated users

-- Allow anyone to read sales data
CREATE POLICY "Allow public read access to sales"
  ON public.sales FOR SELECT
  USING (true);

-- Allow anyone to read transactions
CREATE POLICY "Allow public read access to transactions"
  ON public.transactions FOR SELECT
  USING (true);

-- Allow users to read their own data
CREATE POLICY "Users can view their own data"
  ON public.users FOR SELECT
  USING (true);

-- Optional: Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_transactions_date ON public.transactions(date DESC);
CREATE INDEX IF NOT EXISTS idx_sales_month ON public.sales(month);

-- Verify tables and data
SELECT 'Users' as table_name, COUNT(*) as row_count FROM public.users
UNION ALL
SELECT 'Sales' as table_name, COUNT(*) as row_count FROM public.sales
UNION ALL
SELECT 'Transactions' as table_name, COUNT(*) as row_count FROM public.transactions;
