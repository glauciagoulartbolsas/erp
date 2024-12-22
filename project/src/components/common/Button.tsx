import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5',
  lg: 'px-5 py-3 text-lg',
};

const ButtonComponent = lazy(() => import('./Button'));

export default function ButtonWrapper({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Suspense fallback={<div>Carregando botão...</div>}>
      <ButtonComponent
        variant={variant}
        size={size}
        loading={loading}
        icon={icon}
        children={children}
        className={className}
        disabled={disabled}
        {...props}
      />
    </Suspense>
  );
}