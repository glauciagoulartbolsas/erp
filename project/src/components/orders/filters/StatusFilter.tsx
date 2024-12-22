import React from 'react';
import { OrderStatus } from '../../../types/order';

interface StatusFilterProps {
  value: OrderStatus | '';
  onChange: (status: OrderStatus | '') => void;
}

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value as OrderStatus | '')}
      className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Status</option>
      <option value="pending">Pendente</option>
      <option value="processing">Em Processamento</option>
      <option value="completed">Concluído</option>
      <option value="cancelled">Cancelado</option>
    </select>
  );
}