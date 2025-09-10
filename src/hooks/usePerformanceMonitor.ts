import { useCallback, useRef } from 'react';
import { performanceMonitor } from '@/lib/performance';

export const usePerformanceMonitor = () => {
  const metrics = useRef<Record<string, number>>({});

  const measureOperation = useCallback(<T>(name: string, operation: () => T): T => {
    return performanceMonitor.measureTime(name, operation);
  }, []);

  const measureAsyncOperation = useCallback(async <T>(name: string, operation: () => Promise<T>): Promise<T> => {
    return performanceMonitor.measureTimeAsync(name, operation);
  }, []);

  const trackMemory = useCallback((checkpoint: string) => {
    performanceMonitor.trackMemoryUsage(checkpoint);
  }, []);

  return {
    measureOperation,
    measureAsyncOperation,
    trackMemory,
    getMetrics: () => ({ ...metrics.current })
  };
};