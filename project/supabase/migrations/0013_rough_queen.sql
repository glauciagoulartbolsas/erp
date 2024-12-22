/*
  # Update product variations photos structure

  1. Changes
    - Add photos array to product_variations table
    - Remove product_id from product_photos table
    - Make variation_id required in product_photos table
*/

-- Update product_photos table
ALTER TABLE product_photos 
  DROP CONSTRAINT IF EXISTS product_photos_product_id_fkey,
  DROP COLUMN IF EXISTS product_id,
  ALTER COLUMN variation_id SET NOT NULL;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_product_photos_variation_id_v4 ON product_photos(variation_id);