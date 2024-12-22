/*
  # Add Product Photos Support

  1. Changes
    - Add thumbnail columns to products and variations
    - Configure storage bucket for product photos
    - Set up public access and security policies
    
  2. Security
    - Enable public access to photos
    - Allow authenticated users to upload photos
*/

-- Add thumbnail columns if they don't exist
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS thumbnail text;

ALTER TABLE product_variations 
ADD COLUMN IF NOT EXISTS thumbnail text;

-- Create storage bucket for product photos if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('product-photos', 'product-photos')
ON CONFLICT (id) DO NOTHING;

-- Update bucket public access
UPDATE storage.buckets 
SET public = true 
WHERE id = 'product-photos';

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated users to upload photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to view photos" ON storage.objects;

-- Create new policies with unique names
CREATE POLICY "authenticated_users_upload_photos_v2"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-photos' AND
  auth.uid() = owner
);

CREATE POLICY "public_view_photos_v2"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-photos');