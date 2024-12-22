import React, { useState, useMemo } from 'react';
import { FolderTree, Plus } from 'lucide-react';
import { useCategories } from '../../../hooks/useCategories';
import { useToast } from '../../../contexts/ToastContext';
import { Category } from '../../../types/category';
import Button from '../../../components/common/Button';
import SearchBar from '../../../components/common/SearchBar';
import DataTable from '../../../components/common/DataTable';
import CategoryModal from '../../../components/categories/CategoryModal';
import LoadingScreen from '../../../components/common/LoadingScreen';

export default function CategoriesPage() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories();
  const { showToast } = useToast();

  const filteredCategories = useMemo(() => {
    return categories.filter(category => 
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const handleCreate = async (data: { name: string; description?: string }) => {
    try {
      await createCategory(data);
      showToast('Categoria criada com sucesso!', 'success');
      setIsModalOpen(false);
    } catch (error) {
      showToast('Erro ao criar categoria', 'error');
    }
  };

  const handleUpdate = async (data: { name: string; description?: string }) => {
    if (!editingCategory) return;
    
    try {
      await updateCategory(editingCategory.id, data);
      showToast('Categoria atualizada com sucesso!', 'success');
      setEditingCategory(null);
    } catch (error) {
      showToast('Erro ao atualizar categoria', 'error');
    }
  };

  const handleDelete = async (category: Category) => {
    if (!window.confirm('Tem certeza que deseja excluir esta categoria?')) return;
    
    try {
      await deleteCategory(category.id);
      showToast('Categoria excluída com sucesso!', 'success');
    } catch (error) {
      showToast('Erro ao excluir categoria', 'error');
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderTree className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Categorias</h2>
        </div>
        
        <Button
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="h-4 w-4" />}
        >
          Nova Categoria
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar categorias..."
          />
        </div>

        <DataTable
          data={filteredCategories}
          columns={[
            { header: 'Nome', accessor: 'name' },
            { header: 'Descrição', accessor: 'description' },
            { 
              header: 'Data de Criação', 
              accessor: (item) => new Date(item.created_at).toLocaleDateString('pt-BR')
            }
          ]}
          onEdit={setEditingCategory}
          onDelete={handleDelete}
        />
      </div>

      {(isModalOpen || editingCategory) && (
        <CategoryModal
          title={editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
          onSubmit={editingCategory ? handleUpdate : handleCreate}
          initialData={editingCategory || undefined}
        />
      )}
    </div>
  );
}