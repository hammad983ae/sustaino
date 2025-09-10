// Performance monitoring and optimization utilities

export const performanceMonitor = {
  // Track function execution time
  measureTime: <T>(name: string, fn: () => T): T => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    console.log(`Performance: ${name} took ${end - start} milliseconds`);
    
    // In production, could send to analytics
    if (end - start > 1000) {
      console.warn(`Slow operation detected: ${name} took ${end - start}ms`);
    }
    
    return result;
  },

  // Track async function execution time
  measureTimeAsync: async <T>(name: string, fn: () => Promise<T>): Promise<T> => {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    
    console.log(`Performance: ${name} took ${end - start} milliseconds`);
    
    if (end - start > 2000) {
      console.warn(`Slow async operation detected: ${name} took ${end - start}ms`);
    }
    
    return result;
  },

  // Memory usage tracking
  trackMemoryUsage: (checkpoint: string) => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log(`Memory at ${checkpoint}:`, {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + ' MB',
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + ' MB',
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + ' MB'
      });
    }
  }
};

// Cache utilities
export class SimpleCache<T> {
  private cache = new Map<string, { data: T; timestamp: number; ttl: number }>();

  set(key: string, data: T, ttlMs: number = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs
    });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Debounce utility for expensive operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

// Throttle utility for frequent operations
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Lazy loading utility
export const lazyLoad = {
  image: (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  },

  script: (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = () => resolve();
      script.onerror = reject;
      script.src = src;
      document.head.appendChild(script);
    });
  }
};

// Batch operations utility
export class BatchProcessor<T> {
  private batch: T[] = [];
  private processor: (batch: T[]) => Promise<void>;
  private batchSize: number;
  private timeout: NodeJS.Timeout | null = null;
  private flushDelay: number;

  constructor(
    processor: (batch: T[]) => Promise<void>,
    batchSize: number = 10,
    flushDelayMs: number = 1000
  ) {
    this.processor = processor;
    this.batchSize = batchSize;
    this.flushDelay = flushDelayMs;
  }

  add(item: T): void {
    this.batch.push(item);
    
    if (this.batch.length >= this.batchSize) {
      this.flush();
    } else {
      this.scheduleFlush();
    }
  }

  private scheduleFlush(): void {
    if (this.timeout) clearTimeout(this.timeout);
    
    this.timeout = setTimeout(() => {
      this.flush();
    }, this.flushDelay);
  }

  async flush(): Promise<void> {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    
    if (this.batch.length === 0) return;
    
    const currentBatch = [...this.batch];
    this.batch = [];
    
    try {
      await this.processor(currentBatch);
    } catch (error) {
      console.error('Batch processing failed:', error);
      // Could implement retry logic here
    }
  }
}

// Resource cleanup utility
export const cleanup = {
  timeouts: new Set<NodeJS.Timeout>(),
  intervals: new Set<NodeJS.Timeout>(),
  
  setTimeout: (callback: () => void, ms: number): NodeJS.Timeout => {
    const timeout = setTimeout(() => {
      cleanup.timeouts.delete(timeout);
      callback();
    }, ms);
    cleanup.timeouts.add(timeout);
    return timeout;
  },
  
  setInterval: (callback: () => void, ms: number): NodeJS.Timeout => {
    const interval = setInterval(callback, ms);
    cleanup.intervals.add(interval);
    return interval;
  },
  
  clearAll: (): void => {
    cleanup.timeouts.forEach(clearTimeout);
    cleanup.intervals.forEach(clearInterval);
    cleanup.timeouts.clear();
    cleanup.intervals.clear();
  }
};