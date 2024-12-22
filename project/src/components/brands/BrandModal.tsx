import React, { lazy, Suspense } from 'react';
import { X } from 'lucide-react';
import { CreateBrandData } from '../../types/brand';

interface BrandModalProps {
  onClose: () => void;
  onSubmit: (data: CreateBrandData) => Promise<void>;
  loading?: boolean;
  initialData?: Partial<CreateBrandData>;
  title: string;
}

const BrandForm = lazy(() => import('./BrandForm'));

export default function BrandModal({ 
  onClose, 
  onSubmit, 
  loading, 
  initialData,
  title 
}: BrandModalProps) {
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

        <Suspense fallback={<div>Carregando formulário de marca...</div>}>
          <div className="p-6">
            <BrandForm
              onSubmit={onSubmit}
              onCancel={onClose}
              loading={loading}
              initialData={initialData}
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
}