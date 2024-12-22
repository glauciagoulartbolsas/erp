import React from 'react';
import { Truck } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Truck className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Expedição</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Sistema de expedição será implementado aqui.</p>
      </div>
    </div>
  );
}