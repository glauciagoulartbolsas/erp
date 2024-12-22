/*
  # Add product variations and photos

  1. New Tables
    - `product_variations`
      - `id` (uuid, primary key)
      - `product_id` (references products)
      - `code` (5-digit variation code)
      - `name` (variation name)
      - `price` (variation price)
      - `stock` (variation stock)
      - `status` (active/inactive)
      
    - `product_photos`
      - `id` (uuid, primary key)
      - `product_id` (references products)
      - `variation_id` (optional, references variations)
      - `url` (photo URL)
      - `order` (display order)
      - `is_main` (boolean, main photo flag)

  2. Changes to Products Table
    - Add `code` column (4-digit product code)
    - Add trigger for auto-generating codes
    - Add trigger for variation codes

  3. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Add code to products table
ALTER TABLE products ADD COLUMN code text UNIQUE;

-- Create sequence for product codes
CREATE SEQUENCE IF NOT EXISTS product_code_seq START 1;

-- Create product variations table
CREATE TABLE product_variations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  price decimal(10,2) NOT NULL,
  stock integer DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, name)
);

-- Create product photos table
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
CREATE POLICY "Users can view their product variations"
  ON product_variations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their product variations"
  ON product_variations FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their product variations"
  ON product_variations FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their product variations"
  ON product_variations FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_variations.product_id
    AND products.user_id = auth.uid()
  ));

-- Create policies for photos
CREATE POLICY "Users can view their product photos"
  ON product_photos FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their product photos"
  ON product_photos FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their product photos"
  ON product_photos FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their product photos"
  ON product_photos FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM products
    WHERE products.id = product_photos.product_id
    AND products.user_id = auth.uid()
  ));

-- Function to generate product code
CREATE OR REPLACE FUNCTION generate_product_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.code IS NULL THEN
    NEW.code := LPAD(nextval('product_code_seq')::text, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate variation code
CREATE OR REPLACE FUNCTION generate_variation_code()
RETURNS TRIGGER AS $$
DECLARE
  product_code text;
  variation_count integer;
BEGIN
  -- Get product code
  SELECT code INTO product_code
  FROM products
  WHERE id = NEW.product_id;

  -- Get next variation number
  SELECT COALESCE(MAX(CAST(SUBSTRING(code FROM 6) AS integer)), 0) + 1
  INTO variation_count
  FROM product_variations
  WHERE product_id = NEW.product_id;

  -- Generate variation code
  NEW.code := product_code || '-' || LPAD(variation_count::text, 5, '0');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for product code
CREATE TRIGGER set_product_code
  BEFORE INSERT ON products
  FOR EACH ROW
  EXECUTE FUNCTION generate_product_code();

-- Trigger for variation code
CREATE TRIGGER set_variation_code
  BEFORE INSERT ON product_variations
  FOR EACH ROW
  EXECUTE FUNCTION generate_variation_code();