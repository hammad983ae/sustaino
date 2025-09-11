import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, createMockUser, mockAuthStore } from '@/test/test-utils';
import Dashboard from '@/pages/Dashboard';
import { useAuthStore } from '@/stores/authStore';

// Mock the auth store
vi.mock('@/stores/authStore');

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders dashboard with unauthenticated state', () => {
    (useAuthStore as any).mockReturnValue({
      ...mockAuthStore,
      isAuthenticated: false,
      user: null,
    });

    const { getByText } = renderWithProviders(<Dashboard />);
    
    expect(getByText('Property Valuation and ESG Assessment')).toBeInTheDocument();
    expect(getByText('Sign In / Sign Up')).toBeInTheDocument();
  });

  it('renders dashboard with authenticated state', () => {
    const mockUser = createMockUser();
    
    (useAuthStore as any).mockReturnValue({
      ...mockAuthStore,
      isAuthenticated: true,
      user: mockUser,
    });

    const { getByText } = renderWithProviders(<Dashboard />);
    
    expect(getByText('Property Valuation and ESG Assessment')).toBeInTheDocument();
    expect(getByText(mockUser.email)).toBeInTheDocument();
    expect(getByText('Sign Out')).toBeInTheDocument();
  });

  it('displays feature cards', () => {
    (useAuthStore as any).mockReturnValue(mockAuthStore);

    const { getByText } = renderWithProviders(<Dashboard />);
    
    expect(getByText('ESG Assessment')).toBeInTheDocument();
    expect(getByText('Property Valuations')).toBeInTheDocument();
    expect(getByText('Portfolio Analysis')).toBeInTheDocument();
    expect(getByText('Work Hub')).toBeInTheDocument();
  });

  it('shows platform overview for authenticated users', () => {
    (useAuthStore as any).mockReturnValue({
      ...mockAuthStore,
      isAuthenticated: true,
      user: createMockUser(),
    });

    const { getByText } = renderWithProviders(<Dashboard />);
    
    expect(getByText('Platform Overview')).toBeInTheDocument();
    expect(getByText('Active Projects')).toBeInTheDocument();
    expect(getByText('ESG Compliance')).toBeInTheDocument();
  });

  it('handles sign out correctly', async () => {
    const mockSignOut = vi.fn();
    
    (useAuthStore as any).mockReturnValue({
      ...mockAuthStore,
      isAuthenticated: true,
      user: createMockUser(),
      signOut: mockSignOut,
    });

    const { getByText } = renderWithProviders(<Dashboard />);
    const signOutButton = getByText('Sign Out');
    
    signOutButton.click();
    
    expect(mockSignOut).toHaveBeenCalledOnce();
  });
});