/*
  # Fix Product List Issues

  1. Changes
    - Add thumbnail column to products table
    - Add thumbnail column to product_variations table
    - Update RLS policies
    
  2. Tables Modified
    - products
    - product_variations
*/

-- Add thumbnail columns
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

-- Create policy to allow authenticated users to upload photos
CREATE POLICY "Allow authenticated users to upload photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-photos' AND
  auth.uid() = owner
);

-- Create policy to allow public to view photos
CREATE POLICY "Allow public to view photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-photos');