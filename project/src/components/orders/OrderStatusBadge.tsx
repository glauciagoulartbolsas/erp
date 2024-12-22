import React from 'react';
import { OrderStatus } from '../../types/order';

const statusConfig = {
  pending: { label: 'Pendente', classes: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Em Processamento', classes: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Concluído', classes: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelado', classes: 'bg-red-100 text-red-800' },
} as const;

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.classes}`}>
      {config.label}
    </span>
  );
}