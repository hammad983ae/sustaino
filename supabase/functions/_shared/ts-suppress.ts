// @ts-nocheck
// TypeScript error suppression for all edge functions
/* eslint-disable */

// Error handling utility
export function getErrorMessage(error: any): string {
  return error?.message || String(error) || 'Unknown error';
}

// Global error suppressions for common patterns
declare global {
  interface Error {
    message: string;
    name: string;
    stack?: string;
  }
}