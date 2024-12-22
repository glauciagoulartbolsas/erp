import React, { lazy, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../common/LoadingScreen';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuardComponent = lazy(() => import('./AuthGuard'));

export default function AuthGuardWrapper({ children }: AuthGuardProps) {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AuthGuardComponent>
        <AuthGuard children={children} />
      </AuthGuardComponent>
    </Suspense>
  );
}

function AuthGuard({ children }: AuthGuardProps) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}