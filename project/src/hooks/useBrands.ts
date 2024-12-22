import { useState, useEffect } from 'react';
import { Brand } from '../types/brand';
import * as brandService from '../services/brandService';

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBrands();
  }, []);

  async function loadBrands() {
    try {
      setLoading(true);
      const data = await brandService.getBrands();
      setBrands(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load brands');
    } finally {
      setLoading(false);
    }
  }

  async function createBrand(data: Parameters<typeof brandService.createBrand>[0]) {
    const newBrand = await brandService.createBrand(data);
    setBrands(prev => [...prev, newBrand]);
    return newBrand;
  }

  async function updateBrand(id: string, data: Parameters<typeof brandService.updateBrand>[1]) {
    const updatedBrand = await brandService.updateBrand(id, data);
    setBrands(prev => prev.map(b => b.id === id ? updatedBrand : b));
    return updatedBrand;
  }

  async function deleteBrand(id: string) {
    await brandService.deleteBrand(id);
    setBrands(prev => prev.filter(b => b.id !== id));
  }

  return {
    brands,
    loading,
    error,
    refresh: loadBrands,
    createBrand,
    updateBrand,
    deleteBrand
  };
}