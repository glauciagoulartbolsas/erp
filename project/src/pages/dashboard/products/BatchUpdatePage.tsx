import React from 'react';
import { FileInput, Upload } from 'lucide-react';

export default function BatchUpdatePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileInput className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Atualização em Lote</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-sm text-gray-600">
              Arraste e solte um arquivo CSV ou Excel aqui, ou
            </p>
            <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium">
              selecione um arquivo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}