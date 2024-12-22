import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, X } from 'lucide-react';
import { CreateProductData, CreateVariationData } from '../../../types/product';
import Input from '../../common/Input';
import Select from '../../common/Select';
import Button from '../../common/Button';
import ProductVariationForm from './ProductVariationForm';

interface ProductFormProps {
  onSubmit: (data: CreateProductData & { variations?: CreateVariationData[] }) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  initialData?: any;
  categories: Array<{ id: string; name: string }>;
  brands: Array<{ id: string; name: string }>;
}

export default function ProductForm({
  onSubmit,
  onCancel,
  loading,
  initialData,
  categories,
  brands
}: ProductFormProps) {
  const [variations, setVariations] = useState<CreateVariationData[]>(
    initialData?.variations || []
  );

  const { register, handleSubmit, formState: { errors } } = useForm<CreateProductData>({
    defaultValues: initialData || {
      status: 'active'
    }
  });

  const handleFormSubmit = async (data: CreateProductData) => {
    await onSubmit({
      ...data,
      variations: variations.map(v => ({
        ...v,
        price: Number(v.price),
        stock: Number(v.stock)
      }))
    });
  };

  const addVariation = () => {
    setVariations(prev => [
      ...prev,
      { name: '', price: 0, stock: 0, status: 'active', photos: [] }
    ]);
  };

  const removeVariation = (index: number) => {
    setVariations(prev => prev.filter((_, i) => i !== index));
  };

  const updateVariation = (index: number, data: CreateVariationData) => {
    setVariations(prev => prev.map((v, i) => i === index ? data : v));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nome"
          {...register('name', { required: 'Nome é obrigatório' })}
          error={errors.name?.message}
        />

        <Input
          label="SKU"
          {...register('sku')}
          error={errors.sku?.message}
        />

        <Select
          label="Categoria"
          {...register('category_id')}
          options={[
            { value: '', label: 'Selecione uma categoria' },
            ...categories.map(cat => ({
              value: cat.id,
              label: cat.name
            }))
          ]}
        />

        <Select
          label="Marca"
          {...register('brand_id')}
          options={[
            { value: '', label: 'Selecione uma marca' },
            ...brands.map(brand => ({
              value: brand.id,
              label: brand.name
            }))
          ]}
        />

        <Select
          label="Status"
          {...register('status')}
          options={[
            { value: 'active', label: 'Ativo' },
            { value: 'inactive', label: 'Inativo' }
          ]}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Variações</h3>
        </div>

        <div className="space-y-4">
          {variations.map((variation, index) => (
            <div key={index} className="relative p-4 border rounded-lg">
              <button
                type="button"
                onClick={() => removeVariation(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
              
              <ProductVariationForm
                variation={variation}
                onChange={(data) => updateVariation(index, data)}
                existingPhotos={initialData?.variations?.[index]?.photos}
              />
            </div>
          ))}

          <Button
            type="button"
            onClick={addVariation}
            variant="secondary"
            icon={<Plus className="h-4 w-4" />}
            className="w-full"
          >
            Adicionar Variação
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          {initialData ? 'Atualizar' : 'Criar'} Produto
        </Button>
      </div>
    </form>
  );
}