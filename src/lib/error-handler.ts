import { toast } from 'sonner';

export interface AppError {
  message: string;
  code?: string;
  status?: number;
  context?: Record<string, any>;
}

export class ApplicationError extends Error {
  code?: string;
  status?: number;
  context?: Record<string, any>;

  constructor(message: string, code?: string, status?: number, context?: Record<string, any>) {
    super(message);
    this.name = 'ApplicationError';
    this.code = code;
    this.status = status;
    this.context = context;
  }
}

export const errorHandler = {
  // Handle Supabase errors
  handleSupabaseError: (error: any, action: string = 'operation') => {
    console.error(`Supabase ${action} error:`, error);
    
    let userMessage = `Failed to complete ${action}`;
    
    if (error.code === 'PGRST116') {
      userMessage = 'No data found for this request';
    } else if (error.code === '23505') {
      userMessage = 'This record already exists';
    } else if (error.code === '42501') {
      userMessage = 'You do not have permission to perform this action';
    } else if (error.message) {
      userMessage = error.message;
    }

    toast.error(userMessage);
    return new ApplicationError(userMessage, error.code, error.status, { originalError: error });
  },

  // Handle API errors
  handleApiError: (error: any, endpoint: string) => {
    console.error(`API ${endpoint} error:`, error);
    
    let userMessage = `Failed to connect to ${endpoint}`;
    
    if (error.response?.status === 429) {
      userMessage = 'Rate limit exceeded. Please try again later.';
    } else if (error.response?.status === 401) {
      userMessage = 'Authentication required. Please log in.';
    } else if (error.response?.status === 403) {
      userMessage = 'You do not have permission to access this resource.';
    } else if (error.response?.status >= 500) {
      userMessage = 'Server error. Please try again later.';
    } else if (error.message) {
      userMessage = error.message;
    }

    toast.error(userMessage);
    return new ApplicationError(userMessage, error.code, error.response?.status, { endpoint, originalError: error });
  },

  // Handle validation errors
  handleValidationError: (field: string, value: any, rule: string) => {
    const message = `${field} validation failed: ${rule}`;
    console.error('Validation error:', { field, value, rule });
    toast.error(message);
    return new ApplicationError(message, 'VALIDATION_ERROR', 400, { field, value, rule });
  },

  // Handle network errors
  handleNetworkError: (error: any) => {
    console.error('Network error:', error);
    const message = 'Network connection failed. Please check your internet connection.';
    toast.error(message);
    return new ApplicationError(message, 'NETWORK_ERROR', 0, { originalError: error });
  },

  // Log errors for monitoring
  logError: (error: ApplicationError | Error, userId?: string) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userId,
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...(error instanceof ApplicationError && {
        code: error.code,
        status: error.status,
        context: error.context
      })
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorData);
    }

    // In production, this could send to external error monitoring service
    // Example: Sentry, LogRocket, etc.
    
    return errorData;
  }
};

// Global error boundary helper
export const withErrorHandler = <T extends (...args: any[]) => any>(
  fn: T,
  errorMessage: string = 'An unexpected error occurred'
): T => {
  return ((...args: any[]) => {
    try {
      const result = fn(...args);
      
      // Handle async functions
      if (result instanceof Promise) {
        return result.catch((error) => {
          errorHandler.logError(error);
          throw errorHandler.handleApiError(error, errorMessage);
        });
      }
      
      return result;
    } catch (error) {
      errorHandler.logError(error as Error);
      throw errorHandler.handleApiError(error, errorMessage);
    }
  }) as T;
};