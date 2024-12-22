import React, { lazy, Suspense } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBarComponent = lazy(() => import('./SearchBar'));

export default function SearchBarWrapper({ value, onChange, placeholder = 'Buscar...' }: SearchBarProps) {
  return (
    <Suspense fallback={<div>Carregando barra de pesquisa...</div>}>
      <SearchBarComponent value={value} onChange={onChange} placeholder={placeholder} />
    </Suspense>
  );
}