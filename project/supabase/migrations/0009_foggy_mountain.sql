/*
  # Fix Product Schema and Relations

  1. Changes
    - Drop existing tables to avoid conflicts
    - Recreate tables with correct relations
    - Add proper indexes
    - Update RLS policies
    
  2. Tables Modified
    - products
    - product_variations
    - product_photos
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS product_photos;
DROP TABLE IF EXISTS product_variations;

-- Recreate product variations table
CREATE TABLE product_variations (
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

-- Recreate product photos table
CREATE TABLE product_photos (
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
CREATE POLICY "variations_select_policy_v3"
  ON product_variations FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "variations_insert_policy_v3"
  ON product_variations FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "variations_update_policy_v3"
  ON product_variations FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "variations_delete_policy_v3"
  ON product_variations FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

-- Create policies for photos
CREATE POLICY "photos_select_policy_v3"
  ON product_photos FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "photos_insert_policy_v3"
  ON product_photos FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "photos_update_policy_v3"
  ON product_photos FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "photos_delete_policy_v3"
  ON product_photos FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_variations_product_id_v3 ON product_variations(product_id);
CREATE INDEX IF NOT EXISTS idx_product_photos_product_id_v3 ON product_photos(product_id);
CREATE INDEX IF NOT EXISTS idx_product_photos_variation_id_v3 ON product_photos(variation_id);

-- Add updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_v3()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_variations_v3
  BEFORE UPDATE ON product_variations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_v3();

CREATE TRIGGER set_timestamp_photos_v3
  BEFORE UPDATE ON product_photos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_v3();