/**
 * ============================================================================
 * PROPRIETARY API CLIENT
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any[];
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  role: string;
  subscription: {
    plan: string;
    status: string;
  };
  preferences: {
    theme: string;
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
  phone?: string;
}

interface PasswordResetRequest {
  email: string;
}

interface PasswordUpdateRequest {
  token: string;
  password: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;
  private refreshToken: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.loadTokens();
  }

  private loadTokens() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
      this.refreshToken = localStorage.getItem('refresh_token');
    }
  }

  private saveTokens(token: string, refreshToken: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('refresh_token', refreshToken);
    }
    this.token = token;
    this.refreshToken = refreshToken;
  }

  private clearTokens() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    }
    this.token = null;
    this.refreshToken = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add custom headers
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, options.headers);
      }
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle token expiration
        if (response.status === 401 && this.refreshToken) {
          try {
            await this.refreshAccessToken();
            // Retry the original request
            return this.request(endpoint, options);
          } catch (refreshError) {
            this.clearTokens();
            // Redirect to login
            if (typeof window !== 'undefined') {
              window.location.href = '/auth';
            }
            throw new Error('Session expired. Please log in again.');
          }
        }
        
        // Log detailed error for debugging
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          data: data
        });
        
        // Handle validation errors with details
        if (response.status === 400 && data.details) {
          const validationErrors = data.details.map((detail: any) => detail.msg).join(', ');
          throw new Error(`Validation failed: ${validationErrors}`);
        }
        
        throw new Error(data.message || data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${this.baseURL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: this.refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    this.saveTokens(data.data.token, data.data.refreshToken);
  }

  // Authentication methods
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      this.saveTokens(response.data.token, response.data.refreshToken);
      return response.data;
    }

    throw new Error(response.message || 'Login failed');
  }

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data) {
      this.saveTokens(response.data.token, response.data.refreshToken);
      return response.data;
    }

    throw new Error(response.message || 'Signup failed');
  }

  async logout(): Promise<void> {
    if (this.refreshToken) {
      try {
        await this.request('/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ refreshToken: this.refreshToken }),
        });
      } catch (error) {
        console.error('Logout request failed:', error);
      }
    }
    this.clearTokens();
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (!response.success) {
      throw new Error(response.message || 'Password reset request failed');
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const response = await this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });

    if (!response.success) {
      throw new Error(response.message || 'Password reset failed');
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const response = await this.request(`/auth/verify-email/${token}`, {
      method: 'GET',
    });

    if (!response.success) {
      throw new Error(response.message || 'Email verification failed');
    }
  }

  // User methods
  async getCurrentUser(): Promise<User> {
    const response = await this.request<{ user: User }>('/user/profile');
    
    if (response.success && response.data) {
      return response.data.user;
    }

    throw new Error(response.message || 'Failed to get user profile');
  }

  async updateProfile(profileData: Partial<User>): Promise<User> {
    const response = await this.request<{ user: User }>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });

    if (response.success && response.data) {
      return response.data.user;
    }

    throw new Error(response.message || 'Profile update failed');
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await this.request('/user/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.success) {
      throw new Error(response.message || 'Password change failed');
    }
  }

  async resendVerification(): Promise<void> {
    const response = await this.request('/user/resend-verification', {
      method: 'POST',
    });

    if (!response.success) {
      throw new Error(response.message || 'Failed to resend verification email');
    }
  }

  async getUserStats(): Promise<any> {
    const response = await this.request('/user/stats');
    
    if (response.success && response.data && typeof response.data === 'object' && 'stats' in response.data) {
      return (response.data as { stats: any }).stats;
    }

    throw new Error(response.message || 'Failed to get user statistics');
  }

  async deleteAccount(password: string): Promise<void> {
    const response = await this.request('/user/account', {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    });

    if (!response.success) {
      throw new Error(response.message || 'Account deletion failed');
    }

    this.clearTokens();
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  // Domain API methods using Node backend
  async suggestProperties(terms: string, options: { pageSize?: number; channel?: string } = {}): Promise<any> {
    try {
      const params = new URLSearchParams({
        terms,
        pageSize: String(options.pageSize || 20),
        channel: options.channel || 'All'
      });

      const response = await fetch(`${this.baseURL}/domain/suggest?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        return data;
      }

      throw new Error(data.message || 'Failed to fetch property suggestions');
    } catch (error) {
      console.error('Property suggestion error:', error);
      throw error;
    }
  }

  async getPropertyDetails(domainId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/domain/property/${domainId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        return data;
      }

      throw new Error(data.message || 'Failed to fetch property details');
    } catch (error) {
      console.error('Property details error:', error);
      throw error;
    }
  }

  async saveProperty(propertyData: {
    domainId: string;
    address: string;
    addressComponents: any;
    propertyDetails?: any;
    jobId?: string;
  }): Promise<any> {
    console.log('ApiClient: Sending property data to backend:', {
      domainId: propertyData.domainId,
      address: propertyData.address,
      hasPropertyDetails: !!propertyData.propertyDetails,
      hasPhotos: propertyData.propertyDetails?.photos ? `${propertyData.propertyDetails.photos.length} photos` : 'no photos',
      jobId: propertyData.jobId
    });
    
    const response = await this.request('/domain/property/save', {
      method: 'POST',
      body: JSON.stringify(propertyData)
    });
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to save property');
  }

  // Job API methods
  async createJob(jobData: any): Promise<any> {
    const response = await this.request('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData)
    });
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to create job');
  }

  async getJobs(params?: { status?: string; page?: number; limit?: number }): Promise<any> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));

    const response = await this.request(`/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to fetch jobs');
  }

  async getJob(jobId: string): Promise<any> {
    const response = await this.request(`/jobs/${jobId}`);
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to fetch job');
  }

  async updateJob(jobId: string, jobData: any): Promise<any> {
    const response = await this.request(`/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify(jobData)
    });
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to update job');
  }

  async deleteJob(jobId: string): Promise<any> {
    const response = await this.request(`/jobs/${jobId}`, {
      method: 'DELETE'
    });
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to delete job');
  }

  // Property API methods
  async getProperties(params?: { propertyType?: string; state?: string; page?: number; limit?: number }): Promise<any> {
    const queryParams = new URLSearchParams();
    if (params?.propertyType) queryParams.append('propertyType', params.propertyType);
    if (params?.state) queryParams.append('state', params.state);
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));

    const response = await this.request(`/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to fetch properties');
  }

  async getProperty(propertyId: string): Promise<any> {
    const response = await this.request(`/properties/${propertyId}`);
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to fetch property');
  }

  async createProperty(propertyData: any): Promise<any> {
    const response = await this.request('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData)
    });
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to create property');
  }

  async updateProperty(propertyId: string, propertyData: any): Promise<any> {
    const response = await this.request(`/properties/${propertyId}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData)
    });
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to update property');
  }

  async deleteProperty(propertyId: string): Promise<any> {
    const response = await this.request(`/properties/${propertyId}`, {
      method: 'DELETE'
    });
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to delete property');
  }

  // Assessment API methods
  async getAssessments(params?: { status?: string; page?: number; limit?: number }): Promise<any> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));

    const response = await this.request(`/assessments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`);
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to fetch assessments');
  }

  async getAssessment(assessmentId: string): Promise<any> {
    const response = await this.request(`/assessments/${assessmentId}`);
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to fetch assessment');
  }

  async createAssessment(assessmentData: any): Promise<any> {
    console.log('Creating assessment with data:', assessmentData);
    const response = await this.request('/assessments', {
      method: 'POST',
      body: JSON.stringify(assessmentData)
    });
    
    if (response.success) {
      return response;
    }

    console.error('Assessment creation failed:', response);
    throw new Error(response.message || 'Failed to create assessment');
  }

  async updateAssessment(assessmentId: string, assessmentData: any): Promise<any> {
    const response = await this.request(`/assessments/${assessmentId}`, {
      method: 'PUT',
      body: JSON.stringify(assessmentData)
    });
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to update assessment');
  }

  async updateAssessmentStep(assessmentId: string, stepIndex: number, stepData: any): Promise<any> {
    const response = await this.request(`/assessments/${assessmentId}/step/${stepIndex}`, {
      method: 'PUT',
      body: JSON.stringify(stepData)
    });
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to update assessment step');
  }

  async deleteAssessment(assessmentId: string): Promise<any> {
    const response = await this.request(`/assessments/${assessmentId}`, {
      method: 'DELETE'
    });
    
    if (response.success) {
      return response;
    }

    throw new Error(response.message || 'Failed to delete assessment');
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export types
export type { User, AuthResponse, LoginRequest, SignupRequest, PasswordResetRequest, PasswordUpdateRequest, ApiResponse };
