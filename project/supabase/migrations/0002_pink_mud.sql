/*
  # Fix Product RLS Policies

  1. Changes
    - Drop existing RLS policies
    - Create new, more permissive policies for authenticated users
    - Add better policy names and descriptions
  
  2. Security
    - Enable RLS
    - Add policies for CRUD operations
    - Ensure user_id is properly set on insert
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own products" ON products;
DROP POLICY IF EXISTS "Users can create products" ON products;
DROP POLICY IF EXISTS "Users can update their own products" ON products;
DROP POLICY IF EXISTS "Users can delete their own products" ON products;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users"
  ON products FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for authenticated users"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id OR
    (auth.uid() IS NOT NULL AND user_id IS NULL)
  );

CREATE POLICY "Enable update access for authenticated users"
  ON products FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Enable delete access for authenticated users"
  ON products FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);