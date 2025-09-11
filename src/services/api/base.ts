import { supabase } from '@/integrations/supabase/client';
import { PostgrestResponse } from '@supabase/supabase-js';

export class ApiError extends Error {
  constructor(message: string, public statusCode?: number, public originalError?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiResponse = <T>(response: PostgrestResponse<T>) => {
  if (response.error) {
    throw new ApiError(
      response.error.message || 'API request failed',
      response.status,
      response.error
    );
  }
  return response.data;
};

export const handleSingleApiResponse = <T>(response: PostgrestResponse<T>) => {
  if (response.error) {
    throw new ApiError(
      response.error.message || 'API request failed',
      response.status,
      response.error
    );
  }
  return Array.isArray(response.data) ? response.data[0] : response.data;
};

export const handleFunctionResponse = async <T>(
  functionName: string,
  payload?: any
): Promise<T> => {
  try {
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: payload,
    });

    if (error) {
      throw new ApiError(
        error.message || `Function ${functionName} failed`,
        undefined,
        error
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Failed to invoke function ${functionName}`,
      undefined,
      error
    );
  }
};