import React, { lazy, Suspense } from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning';
}

const ConfirmDialogComponent = lazy(() => import('./ConfirmDialog'));

export default function ConfirmDialogWrapper({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  variant = 'danger'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: 'text-red-600',
      title: 'text-red-900',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    },
    warning: {
      icon: 'text-yellow-600',
      title: 'text-yellow-900',
      button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
    }
  }[variant];

  return (
    <Suspense fallback={<div>Carregando diálogo de confirmação...</div>}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="relative bg-white rounded-lg max-w-md w-full mx-auto shadow-lg" onClick={(e) => e.stopPropagation()}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`rounded-full p-2 bg-${variant}-100`}>
                <AlertTriangle className={`h-6 w-6 ${variantStyles.icon}`} />
              </div>
              <h3 className={`text-lg font-semibold ${variantStyles.title}`}>
                {title}
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              {message}
            </p>

            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
              <Button
                variant={variant}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}