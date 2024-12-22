import React, { useState, lazy, Suspense } from 'react';
import { X } from 'lucide-react';
import ProductForm from '../forms/ProductForm';
import { CreateProductData } from '../../../types/product';

const CreateProductModalComponent = lazy(() => import('./CreateProductModal'));

interface CreateProductModalProps {
  onClose: () => void;
  onSubmit: (data: CreateProductData) => Promise<void>;
}

export default function CreateProductModal({ onClose, onSubmit }: CreateProductModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateProductData) => {
    try {
      setLoading(true);
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Erro ao criar produto. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Carregando modal de produto...</div>}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Novo Produto</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <ProductForm
              onSubmit={handleSubmit}
              onCancel={onClose}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}