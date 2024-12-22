import React from 'react';
import { ListFilter, Plus } from 'lucide-react';

export default function CharacteristicsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListFilter className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Características</h2>
        </div>
        
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Plus className="h-4 w-4" />
          Nova Característica
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Lista de características será implementada aqui.</p>
      </div>
    </div>
  );
}