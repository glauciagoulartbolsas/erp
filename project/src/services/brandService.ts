import { supabase } from '../lib/supabase';
import { Brand, CreateBrandData, UpdateBrandData } from '../types/brand';

export async function getBrands() {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name');

  if (error) throw new Error('Failed to fetch brands');
  return data as Brand[];
}

export async function createBrand(brand: CreateBrandData) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('brands')
    .insert([{ ...brand, user_id: user.id }])
    .select()
    .single();

  if (error) throw new Error('Failed to create brand');
  return data as Brand;
}

export async function updateBrand(id: string, updates: UpdateBrandData) {
  const { data, error } = await supabase
    .from('brands')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error('Failed to update brand');
  return data as Brand;
}

export async function deleteBrand(id: string) {
  const { error } = await supabase
    .from('brands')
    .delete()
    .eq('id', id);

  if (error) throw new Error('Failed to delete brand');
}