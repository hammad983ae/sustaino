import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce, useThrottle } from '@/hooks/performance';

describe('Performance Hooks', () => {
  describe('useDebounce', () => {
    it('should debounce function calls', async () => {
      let callCount = 0;
      const mockFn = () => { callCount++; };
      
      const { result } = renderHook(() => useDebounce(mockFn, 100));
      
      // Call the debounced function multiple times quickly
      act(() => {
        result.current();
        result.current();
        result.current();
      });
      
      // Should not have been called yet
      expect(callCount).toBe(0);
      
      // Wait for debounce delay
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Should have been called only once
      expect(callCount).toBe(1);
    });

    it('should pass arguments correctly', async () => {
      let receivedArgs: any[] = [];
      const mockFn = (...args: any[]) => { receivedArgs = args; };
      
      const { result } = renderHook(() => useDebounce(mockFn, 50));
      
      act(() => {
        result.current('test', 123, { key: 'value' });
      });
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(receivedArgs).toEqual(['test', 123, { key: 'value' }]);
    });
  });

  describe('useThrottle', () => {
    it('should throttle function calls', async () => {
      let callCount = 0;
      const mockFn = () => { callCount++; };
      
      const { result } = renderHook(() => useThrottle(mockFn, 100));
      
      // First call should execute immediately
      act(() => {
        result.current();
      });
      expect(callCount).toBe(1);
      
      // Subsequent calls within throttle period should be ignored
      act(() => {
        result.current();
        result.current();
      });
      expect(callCount).toBe(1);
      
      // Wait for throttle period to pass
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Should allow next call
      act(() => {
        result.current();
      });
      expect(callCount).toBe(2);
    });
  });
});