// Global type declarations for edge functions
declare global {
  interface Error {
    message: string;
    name: string;
    stack?: string;
  }
}

// Make all catch errors have Error type
export {};