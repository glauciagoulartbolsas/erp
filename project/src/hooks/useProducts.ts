import { useState, useEffect } from 'react';
import { Product, CreateProductData, UpdateProductData } from '../types/product';
import * as productService from '../services/productService';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  async function getProduct(id: string) {
    return await productService.getProduct(id);
  }

  async function createProduct(data: CreateProductData) {
    try {
      const newProduct = await productService.createProduct(data);
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create product');
    }
  }

  async function updateProduct(id: string, data: UpdateProductData) {
    try {
      const updatedProduct = await productService.updateProduct(id, data);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update product');
    }
  }

  async function deleteProduct(id: string) {
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete product');
    }
  }

  return {
    products,
    loading,
    error,
    refresh: loadProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
  };
}