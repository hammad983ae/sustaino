import { useState, useCallback } from 'react';
import { errorHandler } from '@/lib/error-handler';

export const useErrorBoundary = () => {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((error: Error, context?: any) => {
    setError(error);
    errorHandler.logError(error, context?.userId);
  }, []);

  return {
    error,
    resetError,
    captureError,
    hasError: !!error
  };
};