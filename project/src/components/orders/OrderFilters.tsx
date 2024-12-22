import React from 'react';
import { Filter } from 'lucide-react';
import SearchInput from './filters/SearchInput';
import StatusFilter from './filters/StatusFilter';
import { OrderStatus } from '../../types/order';

interface OrderFiltersProps {
  search: string;
  status: OrderStatus | '';
  onSearchChange: (value: string) => void;
  onStatusChange: (status: OrderStatus | '') => void;
  onAdvancedFilters: () => void;
}

export default function OrderFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onAdvancedFilters
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <SearchInput value={search} onChange={onSearchChange} />
      <div className="flex gap-2">
        <StatusFilter value={status} onChange={onStatusChange} />
        <button 
          onClick={onAdvancedFilters}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="h-5 w-5" />
          Filtros
        </button>
      </div>
    </div>
  );
}