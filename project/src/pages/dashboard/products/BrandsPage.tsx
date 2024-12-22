import React, { useState, useMemo } from 'react';
import { Tag, Plus } from 'lucide-react';
import { useBrands } from '../../../hooks/useBrands';
import { useToast } from '../../../contexts/ToastContext';
import { Brand } from '../../../types/brand';
import Button from '../../../components/common/Button';
import SearchBar from '../../../components/common/SearchBar';
import DataTable from '../../../components/common/DataTable';
import BrandModal from '../../../components/brands/BrandModal';
import LoadingScreen from '../../../components/common/LoadingScreen';

export default function BrandsPage() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const { brands, loading, createBrand, updateBrand, deleteBrand } = useBrands();
  const { showToast } = useToast();

  const filteredBrands = useMemo(() => {
    return brands.filter(brand => 
      brand.name.toLowerCase().includes(search.toLowerCase()) ||
      brand.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [brands, search]);

  const handleCreate = async (data: { name: string; description?: string }) => {
    try {
      await createBrand(data);
      showToast('Marca criada com sucesso!', 'success');
      setIsModalOpen(false);
    } catch (error) {
      showToast('Erro ao criar marca', 'error');
    }
  };

  const handleUpdate = async (data: { name: string; description?: string }) => {
    if (!editingBrand) return;
    
    try {
      await updateBrand(editingBrand.id, data);
      showToast('Marca atualizada com sucesso!', 'success');
      setEditingBrand(null);
    } catch (error) {
      showToast('Erro ao atualizar marca', 'error');
    }
  };

  const handleDelete = async (brand: Brand) => {
    if (!window.confirm('Tem certeza que deseja excluir esta marca?')) return;
    
    try {
      await deleteBrand(brand.id);
      showToast('Marca excluída com sucesso!', 'success');
    } catch (error) {
      showToast('Erro ao excluir marca', 'error');
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Marcas</h2>
        </div>
        
        <Button
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="h-4 w-4" />}
        >
          Nova Marca
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar marcas..."
          />
        </div>

        <DataTable
          data={filteredBrands}
          columns={[
            { header: 'Nome', accessor: 'name' },
            { header: 'Descrição', accessor: 'description' },
            { 
              header: 'Data de Criação', 
              accessor: (item) => new Date(item.created_at).toLocaleDateString('pt-BR')
            }
          ]}
          onEdit={setEditingBrand}
          onDelete={handleDelete}
        />
      </div>

      {(isModalOpen || editingBrand) && (
        <BrandModal
          title={editingBrand ? 'Editar Marca' : 'Nova Marca'}
          onClose={() => {
            setIsModalOpen(false);
            setEditingBrand(null);
          }}
          onSubmit={editingBrand ? handleUpdate : handleCreate}
          initialData={editingBrand || undefined}
        />
      )}
    </div>
  );
}