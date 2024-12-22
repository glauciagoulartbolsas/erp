import { useState, useEffect } from 'react';
import { Category } from '../types/category';
import * as categoryService from '../services/categoryService';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setLoading(true);
      const data = await categoryService.getCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  }

  async function createCategory(data: Parameters<typeof categoryService.createCategory>[0]) {
    const newCategory = await categoryService.createCategory(data);
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  }

  async function updateCategory(id: string, data: Parameters<typeof categoryService.updateCategory>[1]) {
    const updatedCategory = await categoryService.updateCategory(id, data);
    setCategories(prev => prev.map(c => c.id === id ? updatedCategory : c));
    return updatedCategory;
  }

  async function deleteCategory(id: string) {
    await categoryService.deleteCategory(id);
    setCategories(prev => prev.filter(c => c.id !== id));
  }

  return {
    categories,
    loading,
    error,
    refresh: loadCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
}