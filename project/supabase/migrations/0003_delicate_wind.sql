/*
  # Add Categories and Brands Tables

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `user_id` (uuid, references auth.users)
      - Timestamps (created_at, updated_at)
    
    - `brands`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `user_id` (uuid, references auth.users)
      - Timestamps (created_at, updated_at)

  2. Security
    - Enable RLS on both tables
    - Add policies for CRUD operations
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(name, user_id)
);

-- Create brands table
CREATE TABLE brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(name, user_id)
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Enable read access for authenticated users"
  ON categories FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for authenticated users"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for authenticated users"
  ON categories FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable delete access for authenticated users"
  ON categories FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Brands policies
CREATE POLICY "Enable read access for authenticated users"
  ON brands FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for authenticated users"
  ON brands FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update access for authenticated users"
  ON brands FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable delete access for authenticated users"
  ON brands FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add brand_id to products table
ALTER TABLE products ADD COLUMN brand_id uuid REFERENCES brands(id);
ALTER TABLE products ADD COLUMN category_id uuid REFERENCES categories(id);