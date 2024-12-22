import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import './styles/theme.css';

const AppRoutes = React.lazy(() => import('./routes'));

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Carregando...</div>}>
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}