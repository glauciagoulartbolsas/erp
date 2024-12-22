import React from 'react';
import { Search, Filter } from 'lucide-react';
import Input from '../../common/Input';
import Select from '../../common/Select';

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categoryId: string;
  onCategoryChange: (value: string) => void;
  brandId: string;
  onBrandChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  categories: Array<{ id: string; name: string }>;
  brands: Array<{ id: string; name: string }>;
}

export default function ProductFilters({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  brandId,
  onBrandChange,
  status,
  onStatusChange,
  categories,
  brands,
}: ProductFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar produtos..."
          className="pl-10"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
          options={[
            { value: '', label: 'Todas as categorias' },
            ...categories.map(cat => ({
              value: cat.id,
              label: cat.name
            }))
          ]}
        />
        
        <Select
          value={brandId}
          onChange={(e) => onBrandChange(e.target.value)}
          options={[
            { value: '', label: 'Todas as marcas' },
            ...brands.map(brand => ({
              value: brand.id,
              label: brand.name
            }))
          ]}
        />
        
        <Select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          options={[
            { value: '', label: 'Todos os status' },
            { value: 'active', label: 'Ativo' },
            { value: 'inactive', label: 'Inativo' }
          ]}
        />
      </div>
    </div>
  );
}