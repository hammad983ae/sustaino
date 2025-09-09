import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PropertyAddressData {
  propertyAddress: string;
  lotNumber: string;
  planNumber: string;
  unitNumber: string;
  streetNumber: string;
  streetName: string;
  streetType: string;
  state: string;
  postcode: string;
  country: string;
  suburb?: string;
}

interface PropertyContextType {
  addressData: PropertyAddressData;
  updateAddressData: (data: Partial<PropertyAddressData>) => void;
  getFormattedAddress: () => string;
  clearAddressData: () => void;
}

const defaultAddressData: PropertyAddressData = {
  propertyAddress: '',
  lotNumber: '',
  planNumber: '',
  unitNumber: '',
  streetNumber: '',
  streetName: '',
  streetType: '',
  state: '',
  postcode: '',
  country: 'Australia',
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addressData, setAddressData] = useState<PropertyAddressData>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('propertyAddressData');
    return saved ? JSON.parse(saved) : defaultAddressData;
  });

  // Save to localStorage whenever addressData changes
  useEffect(() => {
    localStorage.setItem('propertyAddressData', JSON.stringify(addressData));
  }, [addressData]);

  const updateAddressData = (data: Partial<PropertyAddressData>) => {
    setAddressData(prev => ({ ...prev, ...data }));
  };

  const getFormattedAddress = () => {
    const { unitNumber, streetNumber, streetName, streetType, suburb, state, postcode } = addressData;
    
    let address = '';
    if (unitNumber) address += `${unitNumber}/`;
    if (streetNumber) address += `${streetNumber} `;
    if (streetName) address += `${streetName} `;
    if (streetType) address += `${streetType} `;
    if (suburb) address += `${suburb} `;
    if (state) address += `${state} `;
    if (postcode) address += postcode;
    
    return address.trim();
  };

  const clearAddressData = () => {
    setAddressData(defaultAddressData);
    localStorage.removeItem('propertyAddressData');
  };

  return (
    <PropertyContext.Provider value={{
      addressData,
      updateAddressData,
      getFormattedAddress,
      clearAddressData
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};