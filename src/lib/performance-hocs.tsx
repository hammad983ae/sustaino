import React, { memo, lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';

// Loading Component
const LoadingFallback: React.FC<{ height?: string; count?: number }> = ({ 
  height = 'h-32', 
  count = 1 
}) => (
  <div className="space-y-4">
    {Array.from({ length: count }, (_, i) => (
      <Skeleton key={i} className={`w-full ${height}`} />
    ))}
  </div>
);

// Error Boundary Component
interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => (
  <Alert variant="destructive">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Something went wrong</AlertTitle>
    <AlertDescription className="mt-2">
      <p className="mb-2">{error.message}</p>
      <button 
        onClick={resetError}
        className="text-sm underline hover:no-underline"
      >
        Try again
      </button>
    </AlertDescription>
  </Alert>
);

// Lazy Loading HOC
export function withLazyLoading<T = {}>(
  importFunc: () => Promise<{ default: React.ComponentType<T> }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunc);
  
  return memo((props: T) => (
    <Suspense fallback={fallback || <LoadingFallback />}>
      <LazyComponent {...(props as any)} />
    </Suspense>
  ));
}

// Error Boundary HOC
export function withErrorBoundary<T extends Record<string, any> = {}>(
  Component: React.ComponentType<T>,
  fallback?: React.ComponentType<ErrorFallbackProps>
) {
  return memo((props: T) => (
    <ErrorBoundary
      fallback={fallback ? (error, errorInfo, retry) => React.createElement(fallback, { error, resetError: retry }) : undefined}
      onError={(error, errorInfo) => {
        console.error('Component Error:', error, errorInfo);
        // Here you could also send to error reporting service
      }}
    >
      <Component {...props} />
    </ErrorBoundary>
  ));
}

// Performance HOC with memoization
export function withMemoization<T extends Record<string, any> = {}>(
  Component: React.ComponentType<T>,
  propsAreEqual?: (prevProps: T, nextProps: T) => boolean
) {
  return memo(Component, propsAreEqual);
}

// Combined Performance HOC
export function withPerformanceOptimizations<T = {}>(
  importFunc: () => Promise<{ default: React.ComponentType<T> }>,
  options?: {
    fallback?: React.ReactNode;
    errorFallback?: React.ComponentType<ErrorFallbackProps>;
    propsAreEqual?: (prevProps: T, nextProps: T) => boolean;
  }
) {
  const LazyComponent = lazy(importFunc);
  
  const OptimizedComponent = memo((props: T) => (
    <ErrorBoundary
      fallback={options?.errorFallback ? (error, errorInfo, retry) => 
        React.createElement(options.errorFallback, { error, resetError: retry }) : undefined}
      onError={(error, errorInfo) => {
        console.error('Component Error:', error, errorInfo);
      }}
    >
      <Suspense fallback={options?.fallback || <LoadingFallback />}>
        <LazyComponent {...(props as any)} />
      </Suspense>
    </ErrorBoundary>
  ), options?.propsAreEqual);

  OptimizedComponent.displayName = `OptimizedComponent(Component)`;
  
  return OptimizedComponent;
}