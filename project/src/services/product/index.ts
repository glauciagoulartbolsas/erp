import { supabase } from '../../lib/supabase';
import { CreateProductData, UpdateProductData } from '../../types/product';
import { getProduct, getProducts } from './queries';
import { createVariations, updateVariations } from './variations';

export * from './queries';
export * from './variations';
export * from './photos';

export async function createProduct(data: CreateProductData & { variations?: CreateVariationData[] }) {
  const { variations, ...productData } = data;
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Authentication required');

  // Create product
  const { data: product, error } = await supabase
    .from('products')
    .insert([{ ...productData, user_id: user.id }])
    .select()
    .single();

  if (error) throw new Error('Failed to create product');

  // Handle variations
  if (variations?.length) {
    await createVariations(product.id, variations);
  }

  return getProduct(product.id);
}

export async function updateProduct(id: string, data: UpdateProductData & { variations?: CreateVariationData[] }) {
  const { variations, ...productData } = data;

  // Update product
  const { error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id);

  if (error) throw new Error('Failed to update product');

  // Handle variations
  if (variations) {
    await updateVariations(id, variations);
  }

  return getProduct(id);
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw new Error('Failed to delete product');
}