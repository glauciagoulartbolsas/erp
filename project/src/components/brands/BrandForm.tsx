import React, { lazy, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { CreateBrandData } from '../../types/brand';
import Input from '../common/Input';
import Button from '../common/Button';

interface BrandFormProps {
  onSubmit: (data: CreateBrandData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  initialData?: Partial<CreateBrandData>;
}

const BrandFormComponent = lazy(() => import('./BrandForm'));

export default function BrandFormWrapper({ onSubmit, onCancel, loading, initialData }: BrandFormProps) {
  return (
    <Suspense fallback={<div>Carregando formulário de marca...</div>}>
      <BrandFormComponent onSubmit={onSubmit} onCancel={onCancel} loading={loading} initialData={initialData} />
    </Suspense>
  );
}

function BrandFormComponent({ onSubmit, onCancel, loading, initialData }: BrandFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateBrandData>({
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