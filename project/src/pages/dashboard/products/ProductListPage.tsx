import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus } from 'lucide-react';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';
import { useBrands } from '../../../hooks/useBrands';
import { useToast } from '../../../contexts/ToastContext';
import { Product } from '../../../types/product';
import Button from '../../../components/common/Button';
import ProductList from '../../../components/products/ProductList';
import ProductFilters from '../../../components/products/filters/ProductFilters';
import LoadingScreen from '../../../components/common/LoadingScreen';

export default function ProductListPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { products, loading: loadingProducts, deleteProduct } = useProducts();
  const { categories, loading: loadingCategories } = useCategories();
  const { brands, loading: loadingBrands } = useBrands();
  
  // Filter states
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [status, setStatus] = useState('');

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = search === '' || 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.code.toLowerCase().includes(search.toLowerCase()) ||
        (product.sku && product.sku.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = categoryId === '' || product.category_id === categoryId;
      const matchesBrand = brandId === '' || product.brand_id === brandId;
      const matchesStatus = status === '' || product.status === status;

      return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
    });
  }, [products, search, categoryId, brandId, status]);

  const handleView = (product: Product) => {
    navigate(`/dashboard/products/${product.id}`);
  };

  const handleEdit = (product: Product) => {
    navigate(`/dashboard/products/${product.id}/edit`);
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Tem certeza que deseja excluir o produto "${product.name}"?\n\nEsta ação não poderá ser desfeita.`)) {
      return;
    }

    try {
      await deleteProduct(product.id);
      showToast('Produto excluído com sucesso!', 'success');
    } catch (error) {
      showToast('Erro ao excluir produto', 'error');
    }
  };

  if (loadingProducts || loadingCategories || loadingBrands) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Lista de Produtos</h2>
        </div>
        
        <Button
          onClick={() => navigate('/dashboard/products/new')}
          icon={<Plus className="h-4 w-4" />}
        >
          Novo Produto
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <ProductFilters
            search={search}
            onSearchChange={setSearch}
            categoryId={categoryId}
            onCategoryChange={setCategoryId}
            brandId={brandId}
            onBrandChange={setBrandId}
            status={status}
            onStatusChange={setStatus}
            categories={categories}
            brands={brands}
          />
        </div>
        
        <ProductList
          products={filteredProducts}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}