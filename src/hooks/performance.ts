import React, { useCallback, useRef } from 'react';

// Custom hook for debouncing values
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

// Custom hook for throttling function calls
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastCall = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastCall.current >= delay) {
        callback(...args);
        lastCall.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastCall.current = Date.now();
        }, delay - (now - lastCall.current));
      }
    },
    [callback, delay]
  );
}

// Custom hook for memoizing expensive calculations
export function useMemoizedCalculation<T>(
  calculation: () => T,
  dependencies: React.DependencyList
): T {
  return React.useMemo(calculation, dependencies);
}

// Custom hook for tracking component re-renders (development only)
export function useRenderTracker(componentName: string) {
  const renderCount = useRef(0);
  
  if (process.env.NODE_ENV === 'development') {
    renderCount.current += 1;
    console.log(`${componentName} rendered ${renderCount.current} times`);
  }
}

// Custom hook for optimizing array dependencies
export function useStableArray<T>(array: T[]): T[] {
  const stableArray = useRef<T[]>(array);
  const previousArray = useRef<T[]>(array);
  
  if (!areArraysEqual(array, previousArray.current)) {
    stableArray.current = array;
    previousArray.current = array;
  }
  
  return stableArray.current;
}

// Helper function to compare arrays
function areArraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((item, index) => item === b[index]);
}

// Custom hook for intersection observer (lazy loading)
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  
  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );
    
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);
  
  return isIntersecting;
}