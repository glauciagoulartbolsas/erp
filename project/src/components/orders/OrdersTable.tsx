import React from 'react';
import OrderTableHeader from './table/OrderTableHeader';
import OrderTableRow from './table/OrderTableRow';
import { Order } from '../../types/order';

interface OrdersTableProps {
  orders: Order[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function OrdersTable({ orders, onView, onEdit, onDelete }: OrdersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <OrderTableHeader />
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <OrderTableRow
              key={order.id}
              order={order}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}