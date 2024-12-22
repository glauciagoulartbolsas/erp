import React, { forwardRef, lazy, Suspense } from 'react';
import { cn } from '../../utils/styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const InputComponent = lazy(() => import('./Input'));

export const InputWrapper = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <Suspense fallback={<div>Carregando campo de entrada...</div>}>
        <InputComponent
          label={label}
          error={error}
          icon={icon}
          className={className}
          ref={ref}
          {...props}
        />
      </Suspense>
    );
  }
);

InputWrapper.displayName = 'InputWrapper';

export default InputWrapper;