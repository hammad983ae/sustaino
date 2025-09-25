import { useCallback } from 'react';
import { useUnifiedDataManager } from './useUnifiedDataManager';

interface PropertyDetails {
  id: string;
  address: {
    displayAddress: string;
    unitNumber?: string;
    streetNumber: string;
    streetName: string;
    streetType: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  propertyType: string;
  features: {
    bedrooms?: number;
    bathrooms?: number;
    parkingSpaces?: number;
    landSize?: number;
    buildingSize?: number;
    yearBuilt?: number;
  };
  estimates?: {
    currentValue?: number;
    confidenceLevel?: string;
    valuationRange?: {
      min: number;
      max: number;
    };
    lastUpdated?: string;
  };
  salesHistory?: Array<{
    date: string;
    price: number;
    propertyType: string;
    source: string;
  }>;
}

export const useDomainDataExtraction = () => {
  const { saveData, updateAddressData, updateReportSection } = useUnifiedDataManager();

  const extractToPAF = useCallback(async (propertyData: PropertyDetails) => {
    try {
      // Extract address data
      const addressData = {
        streetNumber: propertyData.address.streetNumber,
        streetName: propertyData.address.streetName,
        streetType: propertyData.address.streetType,
        unitNumber: propertyData.address.unitNumber || '',
        suburb: propertyData.address.suburb,
        state: propertyData.address.state,
        postcode: propertyData.address.postcode,
        fullAddress: propertyData.address.displayAddress,
        propertyType: propertyData.propertyType,
        domainPropertyId: propertyData.id
      };

      // Extract property characteristics
      const propertyCharacteristics = {
        landArea: propertyData.features.landSize || 0,
        floorArea: propertyData.features.buildingSize || 0,
        bedrooms: propertyData.features.bedrooms || 0,
        bathrooms: propertyData.features.bathrooms || 0,
        parkingSpaces: propertyData.features.parkingSpaces || 0,
        yearBuilt: propertyData.features.yearBuilt || 0,
        propertyType: propertyData.propertyType,
        constructionType: '', // Not available from Domain API
        roofType: '', // Not available from Domain API
        wallType: '', // Not available from Domain API
        condition: 'Good', // Default value
        lastRenovated: '', // Not available from Domain API
        additionalFeatures: []
      };

      // Extract valuation data if available
      const valuationData = propertyData.estimates ? {
        estimatedValue: propertyData.estimates.currentValue || 0,
        valuationRange: {
          min: propertyData.estimates.valuationRange?.min || 0,
          max: propertyData.estimates.valuationRange?.max || 0
        },
        confidenceLevel: propertyData.estimates.confidenceLevel || 'Unknown',
        lastUpdated: propertyData.estimates.lastUpdated || new Date().toISOString(),
        source: 'Domain API'
      } : null;

      // Extract sales history
      const salesHistory = propertyData.salesHistory?.map(sale => ({
        date: sale.date,
        price: sale.price,
        propertyType: sale.propertyType,
        source: sale.source,
        adjustedPrice: sale.price, // Could be calculated based on date
        pricePerSqm: propertyData.features.buildingSize ? 
          Math.round(sale.price / propertyData.features.buildingSize) : 0
      })) || [];

      // Update address data
      await updateAddressData(addressData, { 
        showToast: true, 
        skipValidation: false 
      });

      // Update property characteristics in report data
      await updateReportSection('propertyCharacteristics', propertyCharacteristics, {
        showToast: false,
        skipValidation: false
      });

      // Update valuation data if available
      if (valuationData) {
        await updateReportSection('valuation', valuationData, {
          showToast: false,
          skipValidation: false
        });
      }

      // Update sales history
      if (salesHistory.length > 0) {
        await updateReportSection('salesHistory', salesHistory, {
          showToast: false,
          skipValidation: false
        });
      }

      // Update market data section with basic info
      const marketData = {
        suburb: propertyData.address.suburb,
        state: propertyData.address.state,
        postcode: propertyData.address.postcode,
        propertyType: propertyData.propertyType,
        dataSource: 'Domain API',
        lastUpdated: new Date().toISOString(),
        median_price: propertyData.estimates?.currentValue || 0,
        price_growth: {
          quarterly: 0, // Would need additional API calls
          yearly: 0,
          fiveYear: 0
        }
      };

      await updateReportSection('marketData', marketData, {
        showToast: false,
        skipValidation: false
      });

      // Save component data for Domain integration
      const domainData = {
        propertyId: propertyData.id,
        lastSync: new Date().toISOString(),
        rawData: propertyData,
        extractedAt: new Date().toISOString()
      };

      await saveData({
        componentData: {
          domainIntegration: domainData
        }
      }, {
        showToast: true,
        skipValidation: false
      });

      console.log('Successfully extracted Domain data to PAF');
      return true;

    } catch (error) {
      console.error('Error extracting Domain data to PAF:', error);
      return false;
    }
  }, [saveData, updateAddressData, updateReportSection]);

  return {
    extractToPAF
  };
};

export default useDomainDataExtraction;