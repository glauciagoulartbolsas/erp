import React from 'react';
import { Package } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Package className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Produtos</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Conteúdo da página de produtos será implementado aqui.</p>
      </div>
    </div>
  );
}