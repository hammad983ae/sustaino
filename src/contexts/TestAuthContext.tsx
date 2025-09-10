import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TestAuthContextType {
  isTestMode: boolean;
  setTestMode: (mode: boolean) => void;
  testUser: any;
}

const TestAuthContext = createContext<TestAuthContextType | undefined>(undefined);

export const useTestAuth = () => {
  const context = useContext(TestAuthContext);
  if (!context) {
    throw new Error('useTestAuth must be used within TestAuthProvider');
  }
  return context;
};

export const TestAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTestMode, setTestMode] = useState(false);
  
  const testUser = {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'test@test.com',
    user_metadata: {
      display_name: 'Test User'
    }
  };

  return (
    <TestAuthContext.Provider value={{ isTestMode, setTestMode, testUser }}>
      {children}
    </TestAuthContext.Provider>
  );
};