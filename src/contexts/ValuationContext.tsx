import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ValuationContextType {
  valuationType: string;
  setValuationType: (type: string) => void;
  isLeaseholdValuation: boolean;
}

const ValuationContext = createContext<ValuationContextType | undefined>(undefined);

export const useValuation = () => {
  const context = useContext(ValuationContext);
  if (!context) {
    throw new Error('useValuation must be used within a ValuationProvider');
  }
  return context;
};

export const ValuationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [valuationType, setValuationType] = useState('');
  
  const isLeaseholdValuation = valuationType.toLowerCase().includes('leasehold') || 
                               valuationType.toLowerCase().includes('lease');

  return (
    <ValuationContext.Provider value={{
      valuationType,
      setValuationType,
      isLeaseholdValuation
    }}>
      {children}
    </ValuationContext.Provider>
  );
};