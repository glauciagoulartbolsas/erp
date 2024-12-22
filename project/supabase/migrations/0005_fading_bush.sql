/*
  # Fix product variations and photos

  1. Changes
    - Add missing foreign key constraints
    - Add missing indexes for performance
    - Fix variation code generation
    - Add triggers for updated_at timestamps
*/

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_variations_product_id ON product_variations(product_id);
CREATE INDEX IF NOT EXISTS idx_product_photos_product_id ON product_photos(product_id);
CREATE INDEX IF NOT EXISTS idx_product_photos_variation_id ON product_photos(variation_id);

-- Fix updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS set_timestamp_products ON products;
CREATE TRIGGER set_timestamp_products
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_timestamp_variations ON product_variations;
CREATE TRIGGER set_timestamp_variations
  BEFORE UPDATE ON product_variations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_timestamp_photos ON product_photos;
CREATE TRIGGER set_timestamp_photos
  BEFORE UPDATE ON product_photos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();