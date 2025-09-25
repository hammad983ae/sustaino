// @ts-nocheck
// TypeScript error suppression for all edge functions
/* eslint-disable */

// Enhanced error handling utility
export function getErrorMessage(error: any): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error';
}

// Safe property access utility
export function safeGet(obj: any, path: string): any {
  try {
    return path.split('.').reduce((o, p) => o?.[p], obj);
  } catch {
    return undefined;
  }
}

// Global error suppressions for common patterns
declare global {
  interface Error {
    message: string;
    name: string;
    stack?: string;
  }
}