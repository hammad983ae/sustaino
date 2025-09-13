import { useEffect, useCallback, useRef } from 'react';
import { useProperty } from '@/contexts/PropertyContext';
import { useReportData } from '@/contexts/ReportDataContext';

interface PropertyDataIntegrationProps {
  propertyType?: string;
  onDataLoaded?: (data: any) => void;
}

export const PropertyDataIntegration = ({ propertyType, onDataLoaded }: PropertyDataIntegrationProps) => {
  const { addressData } = useProperty();
  const { reportData, updateReportData } = useReportData();
  const hasInitialized = useRef(false);

  const memoizedOnDataLoaded = useCallback((data: any) => {
    onDataLoaded?.(data);
  }, [onDataLoaded]);

  useEffect(() => {
    // Prevent infinite loops by only running once per component lifecycle
    if (hasInitialized.current || !addressData || !reportData) {
      return;
    }

    hasInitialized.current = true;

    // Extract lot and plan numbers from planning data or OCR
    const lotPlanData = extractLotPlanFromSources();
    
    // Pre-populate RPD and Location
    updateReportData('locationData', {
      address: addressData.propertyAddress || `${addressData.streetNumber} ${addressData.streetName} ${addressData.streetType}, ${addressData.suburb} ${addressData.state} ${addressData.postcode}`,
      lotNumber: lotPlanData.lotNumber || addressData.lotNumber,
      planNumber: lotPlanData.planNumber || addressData.planNumber,
      ...reportData.locationData
    });

    // Pre-populate Property Configuration based on selected property type
    if (propertyType === 'workers-accommodation' || propertyType === 'specialised') {
      updateReportData('reportConfig', {
        ...reportData.reportConfig,
        propertyType: 'specialised',
        specializedType: 'workers-accommodation'
      });
    }

    // Integrate photos from Property Assessment Form
    if (reportData.fileAttachments?.propertyPhotos) {
      updateReportData('fileAttachments', {
        ...reportData.fileAttachments,
        propertyPhotos: reportData.fileAttachments.propertyPhotos.map(photo => ({
          ...photo,
          extractedData: extractDataFromPhotos([photo])
        }))
      });
    }

    // Extract planning information from uploaded documents
    if (reportData.fileAttachments?.planningDocuments) {
      const planningData = extractPlanningFromDocuments(reportData.fileAttachments.planningDocuments);
      updateReportData('planningData', {
        ...reportData.planningData,
        ...planningData
      });
    }

    memoizedOnDataLoaded({
      address: addressData,
      propertyType,
      lotPlan: lotPlanData,
      photos: reportData.fileAttachments?.propertyPhotos || [],
      planning: reportData.planningData
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressData, reportData, propertyType]);

  const extractLotPlanFromSources = () => {
    // Try to extract from multiple sources in order of preference
    let lotNumber = addressData.lotNumber;
    let planNumber = addressData.planNumber;

    // 1. Check planning data from Property Assessment Form
    if (reportData.planningData?.lotNumber) {
      lotNumber = reportData.planningData.lotNumber;
    }
    if (reportData.planningData?.planNumber) {
      planNumber = reportData.planningData.planNumber;
    }

    // 2. Check OCR data from uploaded maps/documents
    if (reportData.fileAttachments?.ocrData) {
      const ocrLotPlan = extractLotPlanFromOCR(reportData.fileAttachments.ocrData);
      if (!lotNumber && ocrLotPlan.lotNumber) {
        lotNumber = ocrLotPlan.lotNumber;
      }
      if (!planNumber && ocrLotPlan.planNumber) {
        planNumber = ocrLotPlan.planNumber;
      }
    }

    return { lotNumber, planNumber };
  };

  const extractLotPlanFromOCR = (ocrData: any[]) => {
    let lotNumber = '';
    let planNumber = '';

    ocrData.forEach(data => {
      if (data.text) {
        // Look for lot number patterns
        const lotMatch = data.text.match(/lot\s*(\d+)/i);
        if (lotMatch && !lotNumber) {
          lotNumber = lotMatch[1];
        }

        // Look for plan number patterns
        const planMatch = data.text.match(/plan\s*([a-z]?\d+)/i);
        if (planMatch && !planNumber) {
          planNumber = planMatch[1];
        }
      }
    });

    return { lotNumber, planNumber };
  };

  const extractDataFromPhotos = (photos: any[]) => {
    // Extract useful information from property photos
    return photos.map(photo => ({
      ...photo,
      extractedInfo: {
        buildingCondition: analyzeConditionFromPhoto(photo),
        features: extractFeaturesFromPhoto(photo),
        improvements: identifyImprovements(photo)
      }
    }));
  };

  const analyzeConditionFromPhoto = (photo: any) => {
    // Basic photo analysis for condition assessment
    return 'good'; // Default - could be enhanced with AI analysis
  };

  const extractFeaturesFromPhoto = (photo: any) => {
    // Extract visible features from photos
    return [];
  };

  const identifyImprovements = (photo: any) => {
    // Identify property improvements from photos
    return [];
  };

  const extractPlanningFromDocuments = (documents: any[]) => {
    const planningData: any = {};

    documents.forEach(doc => {
      if (doc.type === 'planning' && doc.extractedData) {
        // Extract zoning information
        if (doc.extractedData.zoning) {
          planningData.zoning = doc.extractedData.zoning;
        }

        // Extract overlays
        if (doc.extractedData.overlays) {
          planningData.overlays = doc.extractedData.overlays;
        }

        // Extract lot/plan if missing
        if (doc.extractedData.lotNumber && !planningData.lotNumber) {
          planningData.lotNumber = doc.extractedData.lotNumber;
        }
        if (doc.extractedData.planNumber && !planningData.planNumber) {
          planningData.planNumber = doc.extractedData.planNumber;
        }
      }
    });

    return planningData;
  };

  return null; // This is a data integration component, no UI
};

export default PropertyDataIntegration;