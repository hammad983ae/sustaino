import { useReportData } from './useReportData';
import { useMemo } from 'react';

interface ScriptElements {
  propertyDescription: string;
  marketConditions: string;
  locationHighlights: string;
  uniqueFeatures: string;
  combined: string;
}

export const useReportScript = () => {
  const { reportData } = useReportData();

  const generateScript = useMemo((): ScriptElements => {
    const elements = [];
    
    // Extract property description from property details
    if (reportData.propertyDetails) {
      const { propertyTypes } = reportData.propertyDetails;
      const activeTypes = Object.entries(propertyTypes || {})
        .filter(([_, active]) => active)
        .map(([type, _]) => type);
      
      if (activeTypes.length > 0) {
        elements.push(`${activeTypes.join(', ')} property`);
      }
    }

    // Extract market analysis elements
    if (reportData.marketAnalysis) {
      elements.push('comprehensive market analysis with current trends');
    }

    // Extract ESG elements if present
    if (reportData.esgAssessment) {
      elements.push('sustainable property features with ESG compliance');
    }

    // Extract location elements
    if (reportData.propertyAddress?.address) {
      elements.push(`located at ${reportData.propertyAddress.address}`);
    }

    const propertyDescription = elements.length > 0 
      ? `Showcase a ${elements.join(', ')}`
      : 'Professional property presentation';

    const marketConditions = reportData.marketAnalysis 
      ? 'Dynamic market indicators showing current trends and growth potential'
      : 'Stable market environment with growth opportunities';

    const locationHighlights = reportData.propertyAddress?.address
      ? `Prime location at ${reportData.propertyAddress.address} with excellent accessibility`
      : 'Strategic location with strong connectivity';

    const uniqueFeatures = (() => {
      const features = [];
      if (reportData.propertyDetails?.certifications?.greenBuilding) {
        features.push('green building certification');
      }
      if (reportData.propertyDetails?.certifications?.sustainability) {
        features.push('sustainability features');
      }
      if (reportData.esgAssessment) {
        features.push('ESG compliance');
      }
      return features.length > 0 
        ? `Featuring ${features.join(', ')}`
        : 'Modern amenities and quality construction';
    })();

    const combined = `Create a professional property animation showcasing: ${propertyDescription}. ${marketConditions}. ${locationHighlights}. ${uniqueFeatures}. Use cinematic camera movements, professional lighting, and high-quality architectural visualization to highlight the property's value proposition and market position.`;

    return {
      propertyDescription,
      marketConditions,
      locationHighlights,
      uniqueFeatures,
      combined
    };
  }, [reportData]);

  const hasReportData = useMemo(() => {
    return Object.keys(reportData).length > 0;
  }, [reportData]);

  return {
    script: generateScript,
    hasReportData,
    reportData
  };
};