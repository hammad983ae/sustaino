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
    const prevAddress = getFormattedAddress();
    setAddressData(prev => ({ ...prev, ...data }));
    
    // Check if this is a significant address change (new property)
    const newPartialAddress = { ...addressData, ...data };
    const newFormattedAddress = formatAddressFromData(newPartialAddress);
    
    // If the core address components changed, clear all associated property data
    if (prevAddress && newFormattedAddress && prevAddress !== newFormattedAddress) {
      // Clear all related property data from localStorage to prevent data bleed
      const clearKeys = [
        'reportData',
        'planningData',
        'mappingData', 
        'vicPlanData',
        'propertyData',
        'analysisData',
        'valuationData',
        'tenancyData',
        'riskData',
        'salesData',
        'generatedSections',
        'workingHubFiles'
      ];
      
      clearKeys.forEach(key => {
        localStorage.removeItem(key);
      });
      
      // Dispatch event to notify all components to clear their data
      const addressChangeEvent = new CustomEvent('addressChanged', { 
        detail: { 
          oldAddress: prevAddress, 
          newAddress: newFormattedAddress,
          timestamp: Date.now()
        } 
      });
      window.dispatchEvent(addressChangeEvent);
      
      console.log(`Address changed from "${prevAddress}" to "${newFormattedAddress}" - cleared all property data`);
    } else {
      console.log(`Address updated but no significant change detected: "${newFormattedAddress}"`);
    }
  };

  const formatAddressFromData = (data: PropertyAddressData) => {
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
    return formatAddressFromData(addressData);
  };

  const clearAddressData = () => {
    setAddressData(defaultAddressData);
    localStorage.removeItem('propertyAddressData');
    
    // Also clear all associated property data
    const clearKeys = [
      'reportData',
      'planningData', 
      'mappingData',
      'vicPlanData',
      'propertyData',
      'analysisData',
      'valuationData',
      'tenancyData',
      'riskData',
      'salesData',
      'generatedSections',
      'workingHubFiles'
    ];
    
    clearKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Dispatch clear event
    const clearEvent = new CustomEvent('dataCleared', { detail: { timestamp: Date.now() } });
    window.dispatchEvent(clearEvent);
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