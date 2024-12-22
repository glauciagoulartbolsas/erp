import React, { useRef } from 'react';
import { Upload, X, Check } from 'lucide-react';
import Button from '../../common/Button';

interface ProductPhotoUploadProps {
  photos: File[];
  onPhotosChange?: (photos: File[]) => void;
  existingPhotos?: Array<{ id: string; url: string; is_main: boolean }>;
  onDeletePhoto?: (photoId: string) => void;
  onSetMainPhoto?: (photoId: string) => void;
  maxPhotos?: number;
}

export default function ProductPhotoUpload({
  photos,
  onPhotosChange,
  existingPhotos = [],
  onDeletePhoto,
  onSetMainPhoto,
  maxPhotos = 10
}: ProductPhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalPhotos = photos.length + existingPhotos.length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !onPhotosChange) return;
    
    const newFiles = Array.from(e.target.files);
    const remainingSlots = maxPhotos - totalPhotos;
    const filesToAdd = newFiles.slice(0, remainingSlots);
    
    onPhotosChange([...photos, ...filesToAdd]);
  };

  const removePhoto = (index: number) => {
    if (!onPhotosChange) return;
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">
          Fotos ({totalPhotos}/{maxPhotos})
        </h4>
        {totalPhotos < maxPhotos && (
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            icon={<Upload className="h-4 w-4" />}
            variant="secondary"
            size="sm"
          >
            Upload
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {existingPhotos.map((photo) => (
          <div key={photo.id} className="relative aspect-square group">
            <img
              src={photo.url}
              alt="Product"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg">
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {onSetMainPhoto && !photo.is_main && (
                  <button
                    type="button"
                    onClick={() => onSetMainPhoto(photo.id)}
                    className="p-1 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200"
                    title="Definir como foto principal"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
                {onDeletePhoto && (
                  <button
                    type="button"
                    onClick={() => onDeletePhoto(photo.id)}
                    className="p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                    title="Remover foto"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            {photo.is_main && (
              <span className="absolute bottom-2 left-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Principal
              </span>
            )}
          </div>
        ))}
        
        {photos.map((file, index) => (
          <div key={index} className="relative aspect-square group">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg">
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remover foto"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}