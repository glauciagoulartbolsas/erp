import React, { lazy, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorBoundaryComponent = lazy(() => import('./ErrorBoundary'));

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <AlertCircle className="h-6 w-6" />
              <h2 className="text-lg font-semibold">Algo deu errado</h2>
            </div>
            
            <p className="text-gray-600 mb-4">
              Ocorreu um erro inesperado. Por favor, tente novamente.
            </p>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundaryWrapper({ children }: Props) {
  return (
    <Suspense fallback={<div>Carregando limite de erro...</div>}>
      <ErrorBoundaryComponent>{children}</ErrorBoundaryComponent>
    </Suspense>
  );
}