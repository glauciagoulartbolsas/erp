import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function SalesPage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Vendas</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Conteúdo da página de vendas será implementado aqui.</p>
      </div>
    </div>
  );
}