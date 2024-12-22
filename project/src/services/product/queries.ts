import { supabase } from '../../lib/supabase';
import { Product } from '../../types/product';

// Base query that includes variations and their photos
const PRODUCT_QUERY = `
  *,
  product_variations (
    id,
    name,
    price,
    stock,
    status,
    thumbnail,
    created_at,
    updated_at,
    photos:product_photos (
      id,
      url,
      order,
      is_main,
      created_at,
      updated_at
    )
  )
`;

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_QUERY)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch products', { error });
    throw new Error('Failed to fetch products');
  }
  
  return data as Product[];
}

export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_QUERY)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Failed to fetch product', { error });
    throw new Error('Failed to fetch product');
  }

  return data as Product;
}