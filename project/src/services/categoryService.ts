import { supabase } from '../lib/supabase';
import { Category, CreateCategoryData, UpdateCategoryData } from '../types/category';

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw new Error('Failed to fetch categories');
  return data as Category[];
}

export async function createCategory(category: CreateCategoryData) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User must be authenticated');

  const { data, error } = await supabase
    .from('categories')
    .insert([{ ...category, user_id: user.id }])
    .select()
    .single();

  if (error) throw new Error('Failed to create category');
  return data as Category;
}

export async function updateCategory(id: string, updates: UpdateCategoryData) {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error('Failed to update category');
  return data as Category;
}

export async function deleteCategory(id: string) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) throw new Error('Failed to delete category');
}