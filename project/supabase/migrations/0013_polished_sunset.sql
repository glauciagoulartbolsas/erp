/*
  # Update product photos structure
  
  1. Changes
    - Remove product_id from product_photos table
    - Make variation_id required
    - Update RLS policies
*/

-- First drop existing policies
DROP POLICY IF EXISTS "photos_select_policy" ON product_photos;
DROP POLICY IF EXISTS "photos_insert_policy" ON product_photos;
DROP POLICY IF EXISTS "photos_update_policy" ON product_photos;
DROP POLICY IF EXISTS "photos_delete_policy" ON product_photos;

-- Now we can safely modify the table
ALTER TABLE product_photos 
  DROP CONSTRAINT IF EXISTS product_photos_product_id_fkey,
  DROP COLUMN IF EXISTS product_id,
  ALTER COLUMN variation_id SET NOT NULL;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_product_photos_variation_id_v4 ON product_photos(variation_id);

-- Create new policies based on variation_id
CREATE POLICY "photos_select_policy_v2"
  ON product_photos FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM product_variations v
    JOIN products p ON p.id = v.product_id
    WHERE v.id = product_photos.variation_id
    AND p.user_id = auth.uid()
  ));

CREATE POLICY "photos_insert_policy_v2"
  ON product_photos FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM product_variations v
    JOIN products p ON p.id = v.product_id
    WHERE v.id = variation_id
    AND p.user_id = auth.uid()
  ));

CREATE POLICY "photos_update_policy_v2"
  ON product_photos FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM product_variations v
    JOIN products p ON p.id = v.product_id
    WHERE v.id = variation_id
    AND p.user_id = auth.uid()
  ));

CREATE POLICY "photos_delete_policy_v2"
  ON product_photos FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM product_variations v
    JOIN products p ON p.id = v.product_id
    WHERE v.id = variation_id
    AND p.user_id = auth.uid()
  ));