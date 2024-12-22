import React from 'react';
import { Users } from 'lucide-react';

export default function CustomersPage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Clientes</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Lista de clientes será implementada aqui.</p>
      </div>
    </div>
  );
}