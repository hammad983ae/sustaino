/**
 * ============================================================================
 * MONGODB DATA LOADER
 * Loads assessment data from MongoDB and populates report sections
 * ============================================================================
 */

import React, { useEffect, useRef } from 'react';
import { useReportData } from '@/contexts/ReportDataContext';
import { useProperty } from '@/contexts/PropertyContext';
import { apiClient } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface MongoDBDataLoaderProps {
  assessmentId?: string;
  jobId?: string;
  onDataLoaded?: (data: any) => void;
}

const MongoDBDataLoader: React.FC<MongoDBDataLoaderProps> = ({
  assessmentId,
  jobId,
  onDataLoaded
}) => {
  const { updateReportData } = useReportData();
  const { updateAddressData } = useProperty();
  const { toast } = useToast();
  const hasLoaded = useRef(false);

  useEffect(() => {
    const loadAssessmentData = async () => {
      if (hasLoaded.current || (!assessmentId && !jobId)) {
        return;
      }

      try {
        let assessmentData = null;

        // Check if this is a demo assessment (starts with 'demo_')
        if (assessmentId && assessmentId.startsWith('demo_')) {
          console.log('Demo assessment detected, loading from localStorage');
          
          // Load demo assessment data from localStorage
          const currentData = localStorage.getItem('unified_property_data');
          if (currentData) {
            try {
              const parsed = JSON.parse(currentData);
              if (parsed.assessmentId === assessmentId) {
                assessmentData = {
                  _id: assessmentId,
                  addressData: parsed.addressData,
                  reportConfig: parsed.reportData?.reportConfig,
                  currentStep: parsed.assessmentProgress?.currentStep || 0,
                  completedSteps: parsed.assessmentProgress?.completedSteps || [],
                  steps: Object.keys(parsed.componentData || {}).map((key, index) => ({
                    stepId: index.toString(),
                    stepName: key,
                    completed: parsed.assessmentProgress?.completedSteps?.[index] || false,
                    data: parsed.componentData[key]
                  })),
                  photos: parsed.reportData?.photos || [],
                  documents: parsed.reportData?.documents || [],
                  aiAnalysis: parsed.reportData?.aiAnalysis,
                  isDemo: true
                };
              }
            } catch (error) {
              console.error('Error parsing localStorage data:', error);
            }
          }
        } else {
          // Load assessment data from MongoDB
          if (assessmentId) {
            const response = await apiClient.getAssessment(assessmentId);
            if (response.success) {
              assessmentData = response.data.assessment;
            }
          } else if (jobId) {
            // Try to find assessment by job ID
            const assessments = await apiClient.getAssessments({ status: 'in_progress' });
            if (assessments.success) {
              const assessment = assessments.data.assessments.find(
                (a: any) => a.job._id === jobId || a.job.jobNumber === jobId
              );
              if (assessment) {
                assessmentData = assessment;
              }
            }
          }
        }

        if (!assessmentData) {
          console.log('No assessment data found in MongoDB or localStorage');
          return;
        }

        console.log('Loading assessment data from MongoDB:', assessmentData);
        hasLoaded.current = true;

        // Update address data
        if (assessmentData.addressData) {
          console.log('Updating address data:', assessmentData.addressData);
          updateAddressData(assessmentData.addressData);
          
          // Also update property search data for report sections
          updateReportData('propertySearchData', {
            address: assessmentData.addressData.propertyAddress,
            confirmedAddress: assessmentData.addressData.propertyAddress,
            lotNumber: assessmentData.addressData.lotNumber,
            planNumber: assessmentData.addressData.planNumber,
            unitNumber: assessmentData.addressData.unitNumber,
            streetNumber: assessmentData.addressData.streetNumber,
            streetName: assessmentData.addressData.streetName,
            streetType: assessmentData.addressData.streetType,
            suburb: assessmentData.addressData.suburb,
            state: assessmentData.addressData.state,
            postcode: assessmentData.addressData.postcode,
            country: assessmentData.addressData.country || 'Australia'
          });
        }

        // Update report configuration
        if (assessmentData.reportConfig) {
          console.log('Updating report config:', assessmentData.reportConfig);
          updateReportData('reportConfig', assessmentData.reportConfig);
        }

        // Map step data to report sections
        if (assessmentData.steps && Array.isArray(assessmentData.steps)) {
          console.log('Processing step data:', assessmentData.steps.length, 'steps');
          assessmentData.steps.forEach((step: any, index: number) => {
            console.log(`Processing step ${index}:`, step.stepName, 'completed:', step.completed);
            if (step.completed && step.data) {
              console.log(`Step ${index} data:`, step.data);
              // Map step data to appropriate report sections
              switch (index) {
                case 0: // Property Address
                  if (step.data.propertySearchData) {
                    console.log('Updating propertySearchData from step 0');
                    updateReportData('propertySearchData', step.data.propertySearchData);
                  }
                  break;
                case 1: // Report Configuration
                  if (step.data.reportConfig) {
                    console.log('Updating reportConfig from step 1');
                    updateReportData('reportConfig', step.data.reportConfig);
                  }
                  break;
                case 2: // Planning Search
                  if (step.data.planningData) {
                    console.log('Updating planningData from step 2');
                    updateReportData('planningData', step.data.planningData);
                    updateReportData('legalAndPlanning', step.data.planningData);
                  }
                  break;
                case 3: // Search & Analysis
                  if (step.data.propertySearchData) {
                    console.log('Updating propertySearchData from step 3');
                    updateReportData('propertySearchData', step.data.propertySearchData);
                  }
                  if (step.data.locationData) {
                    console.log('Updating locationData from step 3');
                    updateReportData('locationData', step.data.locationData);
                  }
                  if (step.data.marketData) {
                    console.log('Updating marketData from step 3');
                    updateReportData('marketData', step.data.marketData);
                  }
                  break;
                case 4: // Property Photos
                  if (step.data.photos) {
                    console.log('Updating photos from step 4');
                    updateReportData('photos', step.data.photos);
                  }
                  if (step.data.documents) {
                    console.log('Updating documents from step 4');
                    updateReportData('documents', step.data.documents);
                  }
                  break;
                case 5: // Accountancy & Financials
                  if (step.data.financialData) {
                    console.log('Updating financialData from step 5');
                    updateReportData('financialData', step.data.financialData);
                  }
                  break;
                case 6: // Sales & Leasing Recommendations
                  if (step.data.salesData) {
                    console.log('Updating salesData from step 6');
                    updateReportData('salesData', step.data.salesData);
                  }
                  if (step.data.leasingData) {
                    console.log('Updating leasingData from step 6');
                    updateReportData('leasingData', step.data.leasingData);
                  }
                  break;
                case 7: // Intelligent Enhancement
                  if (step.data.aiAnalysis) {
                    console.log('Updating aiAnalysis from step 7');
                    updateReportData('aiAnalysis', step.data.aiAnalysis);
                  }
                  if (step.data.riskAssessment) {
                    console.log('Updating riskAssessment from step 7');
                    updateReportData('riskAssessment', step.data.riskAssessment);
                  }
                  break;
                case 8: // Review & Generate
                  if (step.data.generatedSections) {
                    console.log('Updating generatedSections from step 8');
                    updateReportData('generatedSections', step.data.generatedSections);
                  }
                  break;
              }
            }
          });
        }

        // Update AI analysis if available
        if (assessmentData.aiAnalysis) {
          console.log('Updating aiAnalysis from assessment data');
          updateReportData('aiAnalysis', assessmentData.aiAnalysis);
        }

        // Update photos and documents
        if (assessmentData.photos && Array.isArray(assessmentData.photos)) {
          console.log('Updating photos from assessment data:', assessmentData.photos.length, 'photos');
          updateReportData('photos', assessmentData.photos);
        }
        if (assessmentData.documents && Array.isArray(assessmentData.documents)) {
          console.log('Updating documents from assessment data:', assessmentData.documents.length, 'documents');
          updateReportData('documents', assessmentData.documents);
        }

        // Force update of report sections that depend on address data
        if (assessmentData.addressData) {
          console.log('Forcing update of report sections with address data');
          
          // Update RPD and Location section
          updateReportData('rpdAndLocation', {
            propertyAddress: assessmentData.addressData.propertyAddress,
            lotNumber: assessmentData.addressData.lotNumber,
            planNumber: assessmentData.addressData.planNumber,
            unitNumber: assessmentData.addressData.unitNumber,
            streetNumber: assessmentData.addressData.streetNumber,
            streetName: assessmentData.addressData.streetName,
            streetType: assessmentData.addressData.streetType,
            suburb: assessmentData.addressData.suburb,
            state: assessmentData.addressData.state,
            postcode: assessmentData.addressData.postcode,
            country: assessmentData.addressData.country || 'Australia'
          });
        }

        // Notify parent component
        if (onDataLoaded) {
          onDataLoaded(assessmentData);
        }

        toast({
          title: "Data Loaded",
          description: assessmentData.isDemo 
            ? "Demo assessment data loaded from localStorage successfully"
            : "Assessment data loaded from MongoDB successfully",
          variant: "default"
        });

      } catch (error) {
        console.error('Error loading assessment data from MongoDB:', error);
        toast({
          title: "Load Error",
          description: "Failed to load assessment data from MongoDB",
          variant: "destructive"
        });
      }
    };

    loadAssessmentData();
  }, [assessmentId, jobId, updateReportData, updateAddressData, onDataLoaded, toast]);

  return null; // This component doesn't render anything
};

export default MongoDBDataLoader;
