import { useState, useEffect } from 'react';
import { useProperty } from '@/contexts/PropertyContext';

interface LocationAnalysisData {
  location: string;
  access: string;
  siteDescription: string;
  neighbourhood: string;
  amenities: string;
  services: string;
}

export const usePropertyLocationData = () => {
  const { addressData } = useProperty();
  const [analysisData, setAnalysisData] = useState<LocationAnalysisData>({
    location: '',
    access: '',
    siteDescription: '',
    neighbourhood: '',
    amenities: '',
    services: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const generateLocationAnalysis = async () => {
    setIsGenerating(true);
    
    try {
      // Generate analysis based on the property address (use fallback if no address)
      const propertyAddress = addressData?.propertyAddress || 'Property Address';
      const suburb = addressData?.suburb || 'Local Area';
      const state = addressData?.state || 'State';
      
      // Pre-populate with intelligent defaults based on address
      const generatedData: LocationAnalysisData = {
        location: `The property is located at ${propertyAddress}${suburb !== 'Local Area' ? ` in ${suburb}` : ''}${state !== 'State' ? `, ${state}` : ''}. The location provides convenient access to major transport corridors and is situated within a well-established residential/commercial area with good connectivity to surrounding districts.`,
        
        access: `Property access is via ${propertyAddress}. The site benefits from good road access with sealed road frontage. Public transport options are available in the vicinity, with bus routes servicing the area. Vehicle access and parking facilities are adequate for the property type and location.`,
        
        siteDescription: `The site presents as a ${suburb !== 'Local Area' ? `typical ${suburb}` : 'well-positioned'} property with ${addressData?.unitNumber ? 'unit-style accommodation' : 'standard residential/commercial characteristics'}. The property offers practical frontage and depth suitable for its intended use. Topography appears generally level with standard utility connections available.`,
        
        neighbourhood: `The surrounding neighbourhood is characterized by ${suburb !== 'Local Area' ? `the established ${suburb} locality` : 'a well-developed area'} with a mix of residential and commercial properties. The area demonstrates good amenity and infrastructure development, with established services and facilities contributing to the locality's appeal.`,
        
        amenities: `The property benefits from proximity to local amenities including shopping facilities, educational institutions, medical services, and recreational areas. ${suburb !== 'Local Area' ? `${suburb} offers` : 'The area provides'} good access to both day-to-day necessities and broader community facilities within reasonable distance.`,
        
        services: `Essential services are available to the property including electricity, water, sewerage, and telecommunications. Gas services and high-speed internet connectivity are typically available in the area. Council services including waste collection and maintenance of public infrastructure are provided by the relevant local government authority.`
      };

      setAnalysisData(generatedData);
    } catch (error) {
      console.error('Error generating location analysis:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const updateAnalysisField = (field: keyof LocationAnalysisData, value: string) => {
    setAnalysisData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearAnalysisData = () => {
    setAnalysisData({
      location: '',
      access: '',
      siteDescription: '',
      neighbourhood: '',
      amenities: '',
      services: ''
    });
  };

  return {
    analysisData,
    isGenerating,
    generateLocationAnalysis,
    updateAnalysisField,
    clearAnalysisData
  };
};