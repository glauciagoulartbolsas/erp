import React, { useState } from 'react';
import { ListOrdered, Plus } from 'lucide-react';
import OrdersTable from '../../../components/orders/OrdersTable';
import OrderFilters from '../../../components/orders/OrderFilters';
import CreateOrderModal from '../../../components/orders/CreateOrderModal';
import { OrderStatus } from '../../../types/order';

export default function OrdersPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<OrderStatus | ''>('');

  // Sample data - replace with actual data fetching
  const orders = Array.from({ length: 10 }, (_, index) => ({
    id: String(index + 1).padStart(5, '0'),
    customer: `Cliente ${index + 1}`,
    date: new Date(2024, 1, index + 1).toISOString(),
    total: 150.99 + (index * 100),
    status: ['pending', 'processing', 'completed', 'cancelled'][index % 4] as OrderStatus,
    items: index + 1
  }));

  const handleView = (id: string) => {
    console.log('View order:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit order:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete order:', id);
  };

  const handleAdvancedFilters = () => {
    console.log('Open advanced filters');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListOrdered className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Lista de Pedidos</h2>
        </div>
        
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Novo Pedido
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <OrderFilters
            search={search}
            status={status}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onAdvancedFilters={handleAdvancedFilters}
          />
        </div>
        
        <OrdersTable
          orders={orders}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isCreateModalOpen && (
        <CreateOrderModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
}