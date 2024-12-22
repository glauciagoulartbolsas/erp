import React from 'react';
import { BarChart, FileText, Download } from 'lucide-react';

export default function ProductReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Relatórios de Produtos</h2>
        </div>
        
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Download className="h-4 w-4" />
          Exportar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Produtos mais vendidos</h3>
          <div className="h-64 flex items-center justify-center border border-gray-200 rounded">
            <BarChart className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estoque por categoria</h3>
          <div className="h-64 flex items-center justify-center border border-gray-200 rounded">
            <BarChart className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}