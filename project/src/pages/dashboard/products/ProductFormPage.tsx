import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';
import { useBrands } from '../../../hooks/useBrands';
import { useToast } from '../../../contexts/ToastContext';
import ProductForm from '../../../components/products/forms/ProductForm';
import LoadingScreen from '../../../components/common/LoadingScreen';

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { getProduct, createProduct, updateProduct } = useProducts();
  const { categories, loading: loadingCategories } = useCategories();
  const { brands, loading: loadingBrands } = useBrands();
  
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const isEditing = Boolean(id);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  async function loadProduct() {
    try {
      setLoading(true);
      const product = await getProduct(id);
      setInitialData(product);
    } catch (error) {
      showToast('Erro ao carregar produto', 'error');
      navigate('/dashboard/products/list');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(data) {
    try {
      setLoading(true);
      if (isEditing) {
        await updateProduct(id, data);
        showToast('Produto atualizado com sucesso!', 'success');
      } else {
        await createProduct(data);
        showToast('Produto criado com sucesso!', 'success');
      }
      navigate('/dashboard/products/list');
    } catch (error) {
      showToast(
        isEditing ? 'Erro ao atualizar produto' : 'Erro ao criar produto',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingCategories || loadingBrands || (isEditing && loading && !initialData)) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Package className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Editar Produto' : 'Novo Produto'}
        </h2>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <ProductForm
            onSubmit={handleSubmit}
            onCancel={() => navigate('/dashboard/products/list')}
            loading={loading}
            initialData={initialData}
            categories={categories}
            brands={brands}
          />
        </div>
      </div>
    </div>
  );
}