/*
  # Fix product relations and tables

  1. Changes
    - Add missing product variations table
    - Add missing product photos table
    - Add proper foreign key constraints and cascading deletes
    - Add indexes for better performance
    - Add RLS policies for all tables
*/

-- Create product variations table if not exists
CREATE TABLE IF NOT EXISTS product_variations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL,
  price decimal(10,2) NOT NULL,
  stock integer DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, name)
);

-- Create product photos table if not exists
CREATE TABLE IF NOT EXISTS product_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  variation_id uuid REFERENCES product_variations(id) ON DELETE CASCADE,
  url text NOT NULL,
  "order" integer DEFAULT 0,
  is_main boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE product_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_photos ENABLE ROW LEVEL SECURITY;

-- Create policies for variations
CREATE POLICY "Enable read access for authenticated users"
  ON product_variations FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "Enable insert access for authenticated users"
  ON product_variations FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "Enable update access for authenticated users"
  ON product_variations FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "Enable delete access for authenticated users"
  ON product_variations FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

-- Create policies for photos
CREATE POLICY "Enable read access for authenticated users"
  ON product_photos FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "Enable insert access for authenticated users"
  ON product_photos FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "Enable update access for authenticated users"
  ON product_photos FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "Enable delete access for authenticated users"
  ON product_photos FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_variations_product_id ON product_variations(product_id);
CREATE INDEX IF NOT EXISTS idx_product_photos_product_id ON product_photos(product_id);
CREATE INDEX IF NOT EXISTS idx_product_photos_variation_id ON product_photos(variation_id);