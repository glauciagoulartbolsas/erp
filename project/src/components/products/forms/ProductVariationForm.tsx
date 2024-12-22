import React from 'react';
import { CreateVariationData } from '../../../types/product';
import Input from '../../common/Input';
import Select from '../../common/Select';
import ProductPhotoUpload from './ProductPhotoUpload';

interface ProductVariationFormProps {
  variation: CreateVariationData;
  onChange: (data: CreateVariationData) => void;
  existingPhotos?: Array<{ id: string; url: string; is_main: boolean }>;
  onDeletePhoto?: (photoId: string) => void;
  onSetMainPhoto?: (photoId: string) => void;
}

export default function ProductVariationForm({
  variation,
  onChange,
  existingPhotos = [],
  onDeletePhoto,
  onSetMainPhoto
}: ProductVariationFormProps) {
  const handleChange = (field: keyof CreateVariationData, value: any) => {
    onChange({
      ...variation,
      [field]: value
    });
  };

  const handlePhotosChange = (photos: File[]) => {
    handleChange('photos', photos);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome da Variação"
          value={variation.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />

        <Input
          label="Preço"
          type="number"
          step="0.01"
          value={variation.price}
          onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
          required
        />

        <Input
          label="Estoque"
          type="number"
          value={variation.stock}
          onChange={(e) => handleChange('stock', parseInt(e.target.value, 10) || 0)}
        />

        <Select
          label="Status"
          value={variation.status}
          onChange={(e) => handleChange('status', e.target.value)}
          options={[
            { value: 'active', label: 'Ativo' },
            { value: 'inactive', label: 'Inativo' }
          ]}
        />
      </div>

      <div className="mt-4">
        <ProductPhotoUpload
          photos={variation.photos || []}
          onPhotosChange={handlePhotosChange}
          existingPhotos={existingPhotos}
          onDeletePhoto={onDeletePhoto}
          onSetMainPhoto={onSetMainPhoto}
          maxPhotos={10}
        />
      </div>
    </div>
  );
}