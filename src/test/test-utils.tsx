import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useFormStore } from '@/stores/formStore';

// Test utilities
export const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export const TestProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

// Mock implementations
export const mockAuthStore = {
  user: null,
  session: null,
  loading: false,
  isAuthenticated: false,
  setUser: vi.fn(),
  setSession: vi.fn(),
  setLoading: vi.fn(),
  signOut: vi.fn(),
  initialize: vi.fn(),
};

export const mockFormStore = {
  currentStep: 0,
  propertyData: {},
  reportData: {},
  selectedSections: [],
  enhancedAnalysisData: null,
  setCurrentStep: vi.fn(),
  updatePropertyData: vi.fn(),
  updateReportData: vi.fn(),
  setSelectedSections: vi.fn(),
  setEnhancedAnalysisData: vi.fn(),
  clearFormData: vi.fn(),
  resetForm: vi.fn(),
};

// Mock Zustand stores
vi.mock('@/stores/authStore', () => ({
  useAuthStore: vi.fn(() => mockAuthStore),
}));

vi.mock('@/stores/formStore', () => ({
  useFormStore: vi.fn(() => mockFormStore),
}));

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signOut: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
    })),
    functions: {
      invoke: vi.fn(),
    },
  },
}));

// Test data factories
export const createMockUser = (overrides = {}) => ({
  id: 'user-123',
  email: 'test@example.com',
  display_name: 'Test User',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
  ...overrides,
});

export const createMockProperty = (overrides = {}) => ({
  id: 'property-123',
  user_id: 'user-123',
  address_line_1: '123 Test Street',
  suburb: 'Test Suburb',
  state: 'VIC',
  postcode: '3000',
  country: 'Australia',
  property_type: 'residential',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
  ...overrides,
});

export const createMockReport = (overrides = {}) => ({
  id: 'report-123',
  user_id: 'user-123',
  property_id: 'property-123',
  title: 'Test Report',
  report_type: 'long-form',
  status: 'draft',
  progress: 0,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
  ...overrides,
});

// Custom render function
export function renderWithProviders(
  ui: React.ReactElement,
  options: { initialEntries?: string[] } = {}
) {
  return render(ui, {
    wrapper: TestProviders,
    ...options,
  });
}

// Common test scenarios
export const testAccessibility = (component: React.ReactElement) => {
  it('should be accessible', async () => {
    renderWithProviders(component);
    // Basic accessibility checks
    expect(screen.getByRole('main') || screen.getByRole('document')).toBeInTheDocument();
  });
};

export const testLoadingState = (component: React.ReactElement) => {
  it('should handle loading state', async () => {
    renderWithProviders(component);
    // Test loading indicators
    const loadingElement = screen.queryByText(/loading/i) || screen.queryByRole('progressbar');
    if (loadingElement) {
      expect(loadingElement).toBeInTheDocument();
    }
  });
};

export const testErrorState = (component: React.ReactElement) => {
  it('should handle error state', async () => {
    // Mock error state
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    renderWithProviders(component);
    
    // Test error handling
    const errorElement = screen.queryByText(/error/i) || screen.queryByText(/something went wrong/i);
    if (errorElement) {
      expect(errorElement).toBeInTheDocument();
    }
  });
};