import React, { lazy, Suspense } from 'react';
import { X } from 'lucide-react';
import CategoryForm from './CategoryForm';
import { CreateCategoryData } from '../../types/category';

interface CategoryModalProps {
  onClose: () => void;
  onSubmit: (data: CreateCategoryData) => Promise<void>;
  loading?: boolean;
  initialData?: Partial<CreateCategoryData>;
  title: string;
}

const CategoryModalComponent = lazy(() => import('./CategoryModal'));

export default function CategoryModalWrapper({ 
  onClose, 
  onSubmit, 
  loading, 
  initialData,
  title 
}: CategoryModalProps) {
  return (
    <Suspense fallback={<div>Carregando modal de categoria...</div>}>
      <CategoryModalComponent 
        onClose={onClose} 
        onSubmit={onSubmit} 
        loading={loading} 
        initialData={initialData} 
        title={title} 
      />
    </Suspense>
  );
}

function CategoryModal({ 
  onClose, 
  onSubmit, 
  loading, 
  initialData,
  title 
}: CategoryModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <CategoryForm
            onSubmit={onSubmit}
            onCancel={onClose}
            loading={loading}
            initialData={initialData}
          />
        </div>
      </div>
    </div>
  );
}