import React, { createContext, useContext, useState, useEffect } from 'react';
import { useJobManager } from '@/hooks/useJobManager';

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
  jobNumber: string | null;
  currentJobNumber?: number;
  updateAddressData: (data: Partial<PropertyAddressData>) => void;
  updatePropertyTypeData: (data: Partial<PropertyTypeData>) => void;
  setJobNumber: (jobNumber: string) => void;
  getFormattedAddress: () => string;
  clearAddressData: () => void;
  clearPropertyTypeData: () => void;
  createJobForAddress: (address: string) => Promise<void>;
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
  const { createJob, currentJob, startAutoSave } = useJobManager();
  
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

  const [jobNumber, setJobNumberState] = useState<string | null>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('propertyJobNumber');
    return saved || null;
  });

  // Create job immediately when address is set
  const createJobForAddress = async (address: string) => {
    try {
      await createJob(address);
      startAutoSave();
    } catch (error) {
      console.error('Failed to create job for address:', error);
    }
  };

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('propertyAddressData', JSON.stringify(addressData));
  }, [addressData]);

  useEffect(() => {
    localStorage.setItem('propertyTypeData', JSON.stringify(propertyTypeData));
  }, [propertyTypeData]);

  useEffect(() => {
    if (jobNumber) {
      localStorage.setItem('propertyJobNumber', jobNumber);
    } else {
      localStorage.removeItem('propertyJobNumber');
    }
  }, [jobNumber]);

  const updateAddressData = (data: Partial<PropertyAddressData>) => {
    const newData = { ...addressData, ...data };
    setAddressData(newData);
    
    // Create job immediately when address is complete
    const formattedAddress = getFormattedAddressFromData(newData);
    if (formattedAddress && !currentJob) {
      createJobForAddress(formattedAddress);
    }
  };

  const updatePropertyTypeData = (data: Partial<PropertyTypeData>) => {
    setPropertyTypeData(prev => ({ ...prev, ...data }));
  };

  const getFormattedAddressFromData = (data: PropertyAddressData) => {
    const { unitNumber, streetNumber, streetName, streetType, suburb, state, postcode } = data;
    
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

  const getFormattedAddress = () => {
    return getFormattedAddressFromData(addressData);
  };

  const clearAddressData = () => {
    setAddressData(defaultAddressData);
    localStorage.removeItem('propertyAddressData');
  };

  const clearPropertyTypeData = () => {
    setPropertyTypeData(defaultPropertyTypeData);
    localStorage.removeItem('propertyTypeData');
  };

  const setJobNumber = (newJobNumber: string) => {
    setJobNumberState(newJobNumber);
  };

  return (
    <PropertyContext.Provider value={{
      addressData,
      propertyTypeData,
      jobNumber,
      currentJobNumber: currentJob?.jobNumber,
      updateAddressData,
      updatePropertyTypeData,
      setJobNumber,
      getFormattedAddress,
      clearAddressData,
      clearPropertyTypeData,
      createJobForAddress
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

// Alias for backward compatibility
export const usePropertyContext = useProperty;