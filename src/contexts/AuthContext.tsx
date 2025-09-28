/**
 * ============================================================================
 * PROPRIETARY AUTHENTICATION CONTEXT
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Sustano Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiClient, User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (apiClient.isAuthenticated()) {
        try {
          const userData = await apiClient.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Auth check failed:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      const response = await apiClient.login({ email, password, rememberMe });
      const userData = await apiClient.getCurrentUser();
      setUser(userData);
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const signup = async (userData: any) => {
    try {
      const response = await apiClient.signup(userData);
      const userDataResponse = await apiClient.getCurrentUser();
      setUser(userDataResponse);
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const refreshUser = async () => {
    if (apiClient.isAuthenticated()) {
      try {
        const userData = await apiClient.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Refresh user failed:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
