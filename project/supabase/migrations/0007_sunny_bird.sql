/*
  # Fix Product Relations Schema

  1. Changes
    - Drop existing policies to avoid conflicts
    - Recreate tables with correct relations
    - Add proper indexes and constraints
    - Update RLS policies
    
  2. Tables Modified
    - products
    - product_variations
    - product_photos
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON product_variations;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON product_variations;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON product_variations;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON product_variations;

DROP POLICY IF EXISTS "Enable read access for authenticated users" ON product_photos;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON product_photos;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON product_photos;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON product_photos;

-- Recreate tables with correct relations
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
CREATE POLICY "variations_select_policy"
  ON product_variations FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "variations_insert_policy"
  ON product_variations FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "variations_update_policy"
  ON product_variations FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "variations_delete_policy"
  ON product_variations FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

-- Create policies for photos
CREATE POLICY "photos_select_policy"
  ON product_photos FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "photos_insert_policy"
  ON product_photos FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "photos_update_policy"
  ON product_photos FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "photos_delete_policy"
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