import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/format';
import { Order } from '../../../types/order';
import OrderStatusBadge from '../OrderStatusBadge';

interface OrderTableRowProps {
  order: Order;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function OrderTableRow({ order, onView, onEdit, onDelete }: OrderTableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">#{order.id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{order.customer}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {new Date(order.date).toLocaleDateString('pt-BR')}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{order.items}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatCurrency(order.total)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <OrderStatusBadge status={order.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={() => onView(order.id)}
            className="text-blue-600 hover:text-blue-900"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onEdit(order.id)}
            className="text-green-600 hover:text-green-900"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onDelete(order.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}