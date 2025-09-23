import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUnifiedDataManager } from '@/hooks/useUnifiedDataManager';

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
  const [addressData, setAddressData] = useState<PropertyAddressData>(defaultAddressData);
  const { getAllData, updateAddressData: saveAddressData, clearAllData } = useUnifiedDataManager();

  // Load from unified manager on init
  useEffect(() => {
    const loadData = async () => {
      try {
        const unifiedData = await getAllData();
        if (unifiedData?.addressData) {
          setAddressData(prev => ({ ...prev, ...unifiedData.addressData }));
        }
      } catch (error) {
        console.error('Error loading unified address data:', error);
      }
    };
    
    loadData();
  }, [getAllData]);

  // Listen for job loaded events to refresh data
  useEffect(() => {
    const handleJobLoaded = async () => {
      try {
        const unifiedData = await getAllData();
        if (unifiedData?.addressData) {
          setAddressData(prev => ({ ...prev, ...unifiedData.addressData }));
        }
      } catch (error) {
        console.error('Failed to refresh address data after job load:', error);
      }
    };

    window.addEventListener('jobLoadedIntoSession', handleJobLoaded);
    return () => window.removeEventListener('jobLoadedIntoSession', handleJobLoaded);
  }, [getAllData]);

  const updateAddressData = async (data: Partial<PropertyAddressData>) => {
    const prevAddress = getFormattedAddress();
    
    // Update local state immediately
    setAddressData(prev => ({ ...prev, ...data }));
    
    // Check if this is a significant address change (new property)
    const newPartialAddress = { ...addressData, ...data };
    const newFormattedAddress = formatAddressFromData(newPartialAddress);
    
    // Save to unified manager (handles clearing report data if address changed significantly)
    await saveAddressData(data, { showToast: false });
    
    // If the core address components changed, notify components
    if (prevAddress && newFormattedAddress && prevAddress !== newFormattedAddress) {
      // Dispatch event to notify components of address change
      const addressChangeEvent = new CustomEvent('addressChanged', { 
        detail: { 
          oldAddress: prevAddress, 
          newAddress: newFormattedAddress,
          timestamp: Date.now()
        } 
      });
      window.dispatchEvent(addressChangeEvent);
      
      console.log(`Address changed from "${prevAddress}" to "${newFormattedAddress}" - unified manager handled data clearing`);
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

  const clearAddressData = async () => {
    setAddressData(defaultAddressData);
    await clearAllData();
    
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