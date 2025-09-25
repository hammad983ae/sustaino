// Type-safe error handling utility for edge functions

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'An unknown error occurred';
}

export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

export function createErrorResponse(error: unknown, defaultMessage = 'An error occurred'): Response {
  const message = getErrorMessage(error);
  const isTimeout = isAbortError(error);
  const status = message.includes('API key') ? 401 : isTimeout ? 408 : 500;
  
  return new Response(
    JSON.stringify({ 
      error: message || defaultMessage,
      code: isTimeout ? 'TIMEOUT' : 'INTERNAL_ERROR'
    }),
    { 
      status,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}