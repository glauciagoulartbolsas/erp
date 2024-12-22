import React, { lazy, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { CreateCategoryData } from '../../types/category';
import Input from '../common/Input';
import Button from '../common/Button';

interface CategoryFormProps {
  onSubmit: (data: CreateCategoryData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  initialData?: Partial<CreateCategoryData>;
}

const CategoryFormComponent = lazy(() => import('./CategoryForm'));

export default function CategoryFormWrapper({ onSubmit, onCancel, loading, initialData }: CategoryFormProps) {
  return (
    <Suspense fallback={<div>Carregando formulário de categoria...</div>}>
      <CategoryFormComponent onSubmit={onSubmit} onCancel={onCancel} loading={loading} initialData={initialData} />
    </Suspense>
  );
}

function CategoryForm({ onSubmit, onCancel, loading, initialData }: CategoryFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateCategoryData>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Nome"
        {...register('name', { required: 'Nome é obrigatório' })}
        error={errors.name?.message}
      />

      <Input
        label="Descrição"
        {...register('description')}
        error={errors.description?.message}
      />

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
          Salvar
        </Button>
      </div>
    </form>
  );
}