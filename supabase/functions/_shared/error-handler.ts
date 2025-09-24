export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error occurred';
}

export function createErrorResponse(error: unknown, defaultMessage: string, status: number = 500, headers: Record<string, string> = {}) {
  return new Response(
    JSON.stringify({ 
      error: getErrorMessage(error) || defaultMessage 
    }),
    { 
      status,
      headers: { 'Content-Type': 'application/json', ...headers }
    }
  );
}