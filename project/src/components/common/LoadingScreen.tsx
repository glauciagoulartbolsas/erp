import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreenComponent = lazy(() => import('./LoadingScreen'));

export default function LoadingScreenWrapper() {
  return (
    <Suspense fallback={<div>Carregando tela de carregamento...</div>}>
      <LoadingScreenComponent />
    </Suspense>
  );
}