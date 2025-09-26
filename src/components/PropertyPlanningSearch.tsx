import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useReportData } from '@/contexts/ReportDataContext';
import { useProperty } from '@/contexts/PropertyContext';
import { useUniversalSave } from '@/hooks/useUniversalSave';
import { Map, Save } from 'lucide-react';
import PlanningDataSummary from '@/components/planning/PlanningDataSummary';
import PlanningIntegrations from '@/components/planning/PlanningIntegrations';
import VictorianMappingResources from '@/components/VictorianMappingResources';

interface PropertyPlanningSearchProps {
  propertyAddress: string;
}

const PropertyPlanningSearch = ({ propertyAddress }: PropertyPlanningSearchProps) => {
  const { reportData, updateReportData } = useReportData();
  const { addressData } = useProperty();
  const { saveData, loadData, isSaving } = useUniversalSave('PropertyPlanningSearch', { 
    showToast: false, 
    debounceMs: 500 
  });
  const [localPlanningData, setLocalPlanningData] = useState<any>(null);
  
  // Memoized planning data generation to prevent unnecessary recalculations
  const generateDefaultPlanningData = useCallback(() => {
    const suburb = addressData.suburb || 'Unknown Area';
    const state = addressData.state || 'Unknown State';
    
    // Property-specific planning data examples (from PAF screenshots)
    const planningExamples = {
      // Sample data from PAF for Commercial property
      '320 deakin avenue': {
        lotNumber: '1',
        planNumber: 'PS123456',
        zoneName: 'Commercial 1 Zone (C1Z)',
        zoneDescription: 'Provides for a range of commercial activities to service the needs of the wider community',
        overlays: ['Heritage Overlay'],
        landUse: 'Commercial uses, Retail premises, Office premises',
        developmentPotential: 'Medium - Subject to overlays',
        permitRequired: true,
        heightRestriction: '15m maximum',
        planningScheme: 'Bayside Planning Scheme',
        mapReference: `vicplan.vic.gov.au/planning/PS327856`,
        riskAssessment: {
          heritage: 'Non-contributory building in Heritage Overlay',
          flooding: 'Not in flood prone area',
          bushfire: 'BAL-LOW',
          contamination: 'Commercial land use - Environmental audit may be required'
        },
        coreDetails: {
          zoning: 'Commercial 1 Zone (C1Z)',
          landUse: 'Commercial uses, Retail premises, Office premises',
          development: 'Medium - Subject to overlays',
          planningScheme: 'Bayside Planning Scheme',
          heightRestriction: '15m maximum',
          permitRequired: 'Yes'
        }
      }
    };
    
    // Check if we have specific data for this address
    const addressKey = propertyAddress.toLowerCase();
    const specificData = planningExamples[addressKey];
    
    if (specificData) {
      return specificData;
    }
    
    // Generate generic planning data based on property type and location
    return {
      lotNumber: Math.floor(Math.random() * 999 + 1).toString(),
      planNumber: `PS${Math.floor(Math.random() * 999999 + 100000)}`,
      zoneName: `Residential 1 Zone (R1Z)`,
      zoneDescription: 'Provides for residential development at a range of densities with complementary uses',
      overlays: ['Development Contributions Plan Overlay'],
      landUse: 'Dwelling, Home based business, Dependent person\'s unit',
      developmentPotential: 'Standard - Subject to planning scheme provisions',
      permitRequired: false,
      heightRestriction: '11m maximum building height',
      planningScheme: `${suburb} Planning Scheme`,
      mapReference: `planning.vic.gov.au/${suburb.toLowerCase()}`,
      riskAssessment: {
        heritage: 'No heritage constraints identified',
        flooding: 'Not in flood prone area',
        bushfire: 'Low bushfire risk',
        contamination: 'No contamination concerns identified'
      },
      coreDetails: {
        commercial: `Residential 1 Zone (R1Z)`,
        landUse: 'Standard residential development',
        development: 'Standard Development Potential',
        planningScheme: `${suburb} Planning Scheme`
      }
    };
  }, [addressData.suburb, addressData.state, propertyAddress]);

  useEffect(() => {
    // Clear old planning data when address changes
    const handleAddressChange = () => {
      console.log('Address changed, clearing old planning data');
      setLocalPlanningData(null);
      
      // Clear localStorage planning data to force fresh data
      localStorage.removeItem('planningData');
      localStorage.removeItem('planningFormData');
      localStorage.removeItem('PropertyPlanningSearch');
      
      // Generate new planning data for current address
      const newData = generateDefaultPlanningData();
      setLocalPlanningData(newData);
      updateReportData('planningData', newData);
    };

    // Check if this is a new address by comparing to stored address
    const storedAddress = localStorage.getItem('currentPlanningAddress');
    if (storedAddress && storedAddress !== propertyAddress) {
      handleAddressChange();
    }
    
    // Store current address
    localStorage.setItem('currentPlanningAddress', propertyAddress);

    // Load saved planning data only if address matches
    loadData().then(savedData => {
      try {
        const savedAddress = savedData?.propertyAddress;
        if (savedData?.planningData && savedAddress === propertyAddress) {
          const cleanData = JSON.parse(JSON.stringify(savedData.planningData));
          setLocalPlanningData(cleanData);
          updateReportData('planningData', cleanData);
        } else {
          // Generate fresh planning data for new address
          const defaultData = generateDefaultPlanningData();
          setLocalPlanningData(defaultData);
          updateReportData('planningData', defaultData);
        }
      } catch (error) {
        console.error('Error loading planning data:', error);
        // Fallback to default data
        const defaultData = generateDefaultPlanningData();
        setLocalPlanningData(defaultData);
        updateReportData('planningData', defaultData);
      }
    }).catch(error => {
      console.error('Error in loadData:', error);
      const defaultData = generateDefaultPlanningData();
      setLocalPlanningData(defaultData);
      updateReportData('planningData', defaultData);
    });
  }, [propertyAddress, generateDefaultPlanningData, loadData, updateReportData]); // Include propertyAddress to trigger refresh

  // Memoized planning data to prevent unnecessary recalculations
  const planningData = useMemo(() => 
    localPlanningData || generateDefaultPlanningData(), 
    [localPlanningData, generateDefaultPlanningData]
  );

  const handleSavePlanningData = useCallback(async () => {
    try {
      // Ensure data is serializable by creating a clean copy
      const cleanPlanningData = JSON.parse(JSON.stringify(planningData));
      const planningInfo = {
        planningData: cleanPlanningData,
        propertyAddress: String(propertyAddress || ''),
        savedAt: new Date().toISOString(),
        state: String(addressData?.state || '')
      };
      
      const result = await saveData(planningInfo);
      if (result.success) {
        // Also update report data with planning data including lot/plan
        updateReportData('planningData', cleanPlanningData);
        updateReportData('legalAndPlanning', {
          ...reportData.legalAndPlanning,
          ...cleanPlanningData
        });
      }
    } catch (error) {
      console.error('Error saving planning data:', error);
    }
  }, [planningData, propertyAddress, addressData?.state, saveData, updateReportData, reportData.legalAndPlanning]);

  const handlePlanningDataUpdate = useCallback((newData: any) => {
    try {
      console.log('Planning data updated:', newData);
      // Ensure data is serializable
      const cleanNewData = JSON.parse(JSON.stringify(newData || {}));
      const cleanPlanningData = JSON.parse(JSON.stringify(planningData || {}));
      
      const updatedData = {
        ...cleanPlanningData,
        ...cleanNewData,
        lastUpdated: new Date().toISOString()
      };
      
      setLocalPlanningData(updatedData);
      
      // Auto-save updated data and pass lot/plan to planning data
      updateReportData('planningData', updatedData);
      updateReportData('legalAndPlanning', {
        ...reportData.legalAndPlanning,
        ...updatedData
      });
    } catch (error) {
      console.error('Error updating planning data:', error);
    }
  }, [planningData, updateReportData, reportData.legalAndPlanning]);

  const handleAddressConfirmed = useCallback((address: string) => {
    console.log('Address confirmed for planning search:', address);
    // Refresh planning data when address is confirmed
    const newData = generateDefaultPlanningData();
    setLocalPlanningData(newData);
  }, [generateDefaultPlanningData]);

  const handleAddressChange = useCallback((address: string) => {
    console.log('Address updated:', address);
    // Clear old planning data when address changes
    setLocalPlanningData(null);
  }, []);

  return (
    <div className="w-full space-y-4 lg:space-y-6">
      {/* Header Card */}
      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary flex-shrink-0" />
              <CardTitle className="text-lg lg:text-xl font-semibold">Planning Search & Analysis</CardTitle>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {addressData.state?.toUpperCase() || 'Unknown State'}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSavePlanningData}
                disabled={isSaving}
                className="flex items-center gap-1 text-xs"
              >
                <Save className="h-3 w-3" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground break-words">{propertyAddress}</p>
        </CardHeader>
        <CardContent>
          <PlanningDataSummary planningData={planningData} />
        </CardContent>
      </Card>

      <VictorianMappingResources
        onDataUpdate={handlePlanningDataUpdate}
        onPlanningSearch={(searchData) => {
          console.log('Planning search initiated from mapping resources:', searchData);
          handlePlanningDataUpdate(searchData);
        }}
      />

      <PlanningIntegrations
        propertyAddress={propertyAddress}
        addressData={addressData}
        planningData={planningData}
        onPlanningDataUpdate={handlePlanningDataUpdate}
        onAddressConfirmed={handleAddressConfirmed}
        onAddressChange={handleAddressChange}
      />
    </div>
  );
};

export default PropertyPlanningSearch;