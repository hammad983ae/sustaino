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

export interface PropertyTypeData {
  selectedType: string;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  landSize?: string;
  buildingSize?: string;
  yearBuilt?: string;
  additionalFeatures?: string;
}

interface PropertyContextType {
  addressData: PropertyAddressData;
  propertyTypeData: PropertyTypeData;
  updateAddressData: (data: Partial<PropertyAddressData>) => void;
  updatePropertyTypeData: (data: Partial<PropertyTypeData>) => void;
  getFormattedAddress: () => string;
  clearAddressData: () => void;
  clearPropertyTypeData: () => void;
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

const defaultPropertyTypeData: PropertyTypeData = {
  selectedType: '',
  bedrooms: 3,
  bathrooms: 2,
  parkingSpaces: 2,
  landSize: '',
  buildingSize: '',
  yearBuilt: '',
  additionalFeatures: ''
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addressData, setAddressData] = useState<PropertyAddressData>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('propertyAddressData');
    return saved ? JSON.parse(saved) : defaultAddressData;
  });

  const [propertyTypeData, setPropertyTypeData] = useState<PropertyTypeData>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('propertyTypeData');
    return saved ? JSON.parse(saved) : defaultPropertyTypeData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('propertyAddressData', JSON.stringify(addressData));
  }, [addressData]);

  useEffect(() => {
    localStorage.setItem('propertyTypeData', JSON.stringify(propertyTypeData));
  }, [propertyTypeData]);

  const updateAddressData = (data: Partial<PropertyAddressData>) => {
    setAddressData(prev => ({ ...prev, ...data }));
  };

  const updatePropertyTypeData = (data: Partial<PropertyTypeData>) => {
    setPropertyTypeData(prev => ({ ...prev, ...data }));
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

  const clearPropertyTypeData = () => {
    setPropertyTypeData(defaultPropertyTypeData);
    localStorage.removeItem('propertyTypeData');
  };

  return (
    <PropertyContext.Provider value={{
      addressData,
      propertyTypeData,
      updateAddressData,
      updatePropertyTypeData,
      getFormattedAddress,
      clearAddressData,
      clearPropertyTypeData
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