import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Save, CheckCircle, ExternalLink, FileText, Building2, MapPin, Camera, Settings, Play, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useUnifiedDataManager } from '@/hooks/useUnifiedDataManager';
import { useReportData } from '@/contexts/ReportDataContext';
import { useProperty } from '@/contexts/PropertyContext';
import { supabase } from '@/integrations/supabase/client';
import JobSelector from './JobSelector';

// Step Components
import PropertyAddressForm from '@/components/PropertyAddressForm';
import PropertyAddressFormWithDomain from '@/components/PropertyAddressFormWithDomain';
import { AutofillAddressFields } from '@/components/AutofillAddressFields';
import AddressConfirmation from '@/components/planning/AddressConfirmation';
import RentalConfiguration from '@/components/RentalConfiguration';
import PropertyPlanningSearch from '@/components/PropertyPlanningSearch';
import PropertySearchAnalysis from '@/components/PropertySearchAnalysis';
import PropertyPhotosOCRExtractor from '@/components/PropertyPhotosOCRExtractor';
import AccountingFinancialIntegration from '@/components/AccountingFinancialIntegration';
import SalesLeasingRecommendations from '@/components/SalesLeasingRecommendations';
import RiskAssessmentMarketIndicators from '@/components/RiskAssessmentMarketIndicators';
import PreviousSalesHistoryAndCurrentSale from '@/components/PreviousSalesHistoryAndCurrentSale';
import ReportTypeConfiguration from '@/components/ReportTypeConfiguration';
import EnhancedReportConfiguration from '@/components/EnhancedReportConfiguration';
import DocumentUploadManager from '@/components/DocumentUploadManager';
import GenerateReportData from '@/components/GenerateReportData';
import IntelligentAssessmentAutomation from '@/components/IntelligentAssessmentAutomation';
import SectionDataExtractor from '@/components/SectionDataExtractor';

import DataValidationPipeline from '@/components/DataValidationPipeline';
import ReportConfigurationIntegrator from '@/components/ReportConfigurationIntegrator';
import OptionalSectionManager from '@/components/OptionalSectionManager';
import ESGAssessmentIntegrator from '@/components/ESGAssessmentIntegrator';
import PAFStepToggleManager from '@/components/PAFStepToggleManager';

interface PropertyAssessmentFormProps {
  onComplete?: (data: any) => void;
  onNavigateToReport?: () => void;
}

const PropertyAssessmentForm: React.FC<PropertyAssessmentFormProps> = ({
  onComplete,
  onNavigateToReport
}) => {
  
  const [showJobSelector, setShowJobSelector] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const { toast } = useToast();
  const { 
    updateProgress, 
    getAllData, 
    isSaving, 
    lastSaved, 
    clearAllData, 
    completeAndStartFresh, 
    loadExistingJob,
    currentJobId 
  } = useUnifiedDataManager(!sessionStarted);
  const { reportData, updateReportData } = useReportData();
  const { addressData, getFormattedAddress } = useProperty();


  // Define all possible steps with memoized validation
  const allSteps = useMemo(() => [
    {
      title: "Property Address",
      subtitle: "Find and configure address to begin your valuation report",
      component: <PropertyAddressFormWithDomain />,
      validation: () => {
        const hasAddress = !!(addressData.propertyAddress || addressData.streetNumber);
        return hasAddress;
      }
    },
    {
      title: "Report Configuration",
      subtitle: "Configure your report settings and client information",
      component: (
        <div className="space-y-6">
          <PAFStepToggleManager />
          <ReportTypeConfiguration />
          <EnhancedReportConfiguration />
        </div>
      ),
      validation: () => {
        const hasAddress = !!(addressData.propertyAddress || addressData.streetNumber);
        const hasConfig = !!(reportData.reportConfig?.reportType && reportData.reportConfig?.propertyType);
        console.log('Report Configuration validation:', { hasAddress, hasConfig, reportData: reportData.reportConfig });
        return hasAddress; // Require address at minimum
      }
    },
    {
      title: "Planning Search", 
      subtitle: "Access planning data, zoning information, and state portal links for this property",
      component: (
        <PropertyPlanningSearch 
          propertyAddress={addressData.propertyAddress || getFormattedAddress() || ''}
        />
      ),
      validation: () => {
        const hasAddress = !!(addressData.propertyAddress || addressData.streetNumber);
        return hasAddress;
      }
    },
    {
      title: "Search & Analysis",
      subtitle: "Automated property location and site analysis with market valuation",
      component: <PropertySearchAnalysis />,
      validation: () => {
        const hasAddress = !!(addressData.propertyAddress || addressData.streetNumber);
        return hasAddress; // Require address to proceed with analysis
      }
    },
    {
      title: "Property Photos",
      subtitle: "Property photos and visual assessment for this specific property",
      component: (
        <PropertyPhotosOCRExtractor />
      ),
      validation: () => {
        const hasAddress = !!(addressData.propertyAddress || addressData.streetNumber);
        console.log('Property Photos validation:', { hasAddress, addressData });
        return hasAddress; // Require address to proceed
      }
    },
    {
      title: "Accountancy & Financials",
      subtitle: "Integration with accounting software and government portals",
      component: (
        <AccountingFinancialIntegration />
      ),
      validation: () => {
        const hasAddress = !!(addressData.propertyAddress || addressData.streetNumber);
        return hasAddress; // Require address to proceed
      }
    },
    {
      title: "Sales & Leasing Recommendations",
      subtitle: "AI-powered sales and leasing strategy recommendations",
      component: (
        <SalesLeasingRecommendations />
      ),
      validation: () => {
        const hasAddress = !!(addressData.propertyAddress || addressData.streetNumber);
        return hasAddress; // Require address to proceed
      }
    },
    {
      title: "Intelligent Enhancement",
      subtitle: "AI-powered assessment automation and optimization",
      component: <IntelligentAssessmentAutomation />,
      validation: () => {
        const hasAddress = !!(addressData.propertyAddress || addressData.streetNumber);
        console.log('Intelligent Enhancement validation:', { hasAddress, addressData });
        return hasAddress;
      }
    },
    {
      title: "Review & Generate", 
      subtitle: "Review your information and generate the assessment report",
      component: (
        <div className="space-y-6">
          <ReportConfigurationIntegrator />
          <OptionalSectionManager />
          <ESGAssessmentIntegrator />
          <DataValidationPipeline />
          <GenerateReportData
            assessmentData={{
              reportData,
              addressData,
              currentStep,
              completedSteps
            }}
            onReportGenerated={(reportData) => {
              // Report generated successfully, update data but don't navigate
              console.log('Report generated successfully:', reportData);
              onComplete?.(reportData);
            }}
            onNavigateToReport={onNavigateToReport}
          />
        </div>
      ),
      validation: () => {
        const hasAddress = !!(addressData.propertyAddress || addressData.streetNumber);
        console.log('Review & Generate validation:', { hasAddress, addressData });
        return hasAddress; // Require address to generate report
      }
    },
    {
      title: "Assessment Complete",
      subtitle: "Your property assessment has been completed successfully",
      component: (
        <div className="text-center space-y-6 py-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Property Assessment Complete!</h3>
            <p className="text-muted-foreground mb-4">
              Your Work Hub job has been created successfully. You can now view your report or continue with other assessments.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-blue-900 mb-2">Next Steps Available:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Continue to complete remaining report sections</li>
                <li>• View your generated Work Hub job</li>
                <li>• Access the full property valuation report</li>
                <li>• Start a new property assessment</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              variant="outline"
              onClick={() => window.open('/work-hub', '_blank')}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View Work Hub
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()} // Simple page refresh as alternative
              className="flex items-center gap-2"
            >
              Start New Assessment
            </Button>
            {onNavigateToReport && (
              <Button
                onClick={onNavigateToReport}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                View Full Report
              </Button>
            )}
          </div>
        </div>
      ),
      validation: () => true
    }
  ], [addressData, getFormattedAddress, onComplete, onNavigateToReport]);

  // Use all steps since rental configuration is now part of report configuration
  const steps = allSteps;

  useEffect(() => {
    // Load saved data on mount (only if session started)
    if (sessionStarted) {
      const loadSavedData = async () => {
        try {
          const unifiedData = await getAllData();
          if (unifiedData?.assessmentProgress) {
            setCurrentStep(unifiedData.assessmentProgress.currentStep || 0);
            setCompletedSteps(unifiedData.assessmentProgress.completedSteps || []);
          }
        } catch (error) {
          console.error('Error loading assessment progress:', error);
        }
      };
      
      loadSavedData();
    }
  }, [getAllData, sessionStarted]);

  // Handle job selection
  const handleStartFresh = async () => {
    try {
      await clearAllData();
      setCurrentStep(0);
      setCompletedSteps([]);
      setSessionStarted(true);
      setShowJobSelector(false);
      
      toast({
        title: "Fresh Assessment Started",
        description: "Starting new property assessment session",
        variant: "default"
      });
    } catch (error) {
      console.error('Failed to start fresh:', error);
      toast({
        title: "Error",
        description: "Failed to start fresh assessment",
        variant: "destructive"
      });
    }
  };

  const handleLoadJob = async (jobId: string) => {
    try {
      const result = await loadExistingJob(jobId);
      if (result.success) {
        setSessionStarted(true);
        setShowJobSelector(false);
        // Progress will be loaded automatically by the useEffect
      }
    } catch (error) {
      console.error('Failed to load job:', error);
      toast({
        title: "Error",
        description: "Failed to load selected job",
        variant: "destructive"
      });
    }
  };

  // Complete current assessment and start fresh
  const completeAssessmentAndStartFresh = async () => {
    try {
      const result = await completeAndStartFresh();
      if (result.success) {
        setCurrentStep(0);
        setCompletedSteps([]);
        
        setSessionStarted(false);
        setShowJobSelector(true);
      }
    } catch (error) {
      console.error('Failed to complete and start fresh:', error);
      toast({
        title: "Error",
        description: "Failed to complete assessment",
        variant: "destructive"
      });
    }
  };

  // Only auto-clear if there's corrupted state (steps marked complete but no data)
  useEffect(() => {
    // Check if state is corrupted (completed steps but no actual data)
    const hasCompletedSteps = completedSteps.some(step => step === true);
    const hasValidData = !!(addressData.propertyAddress || addressData.streetNumber);
    
    if (hasCompletedSteps && !hasValidData) {
      console.log('Detected corrupted state - completed steps but no data. Clearing state.');
      setCurrentStep(0);
      setCompletedSteps([]);
    }
  }, [completedSteps, addressData]);

  // Single auto-save effect with proper debouncing (only if session started)
  useEffect(() => {
    if (sessionStarted && (currentStep !== 0 || completedSteps.some(Boolean))) {
      const saveCurrentProgress = async () => {
        try {
          console.log('Auto-saving progress (debounced):', { currentStep, completedSteps });
          await updateProgress({
            currentStep,
            completedSteps
          }, { debounceMs: 3000 }); // 3 second debounce to prevent spam
        } catch (error) {
          console.error('Failed to save progress:', error);
          toast({
            title: "Save Warning", 
            description: "Failed to auto-save progress. Please use Save Progress button.",
            variant: "destructive"
          });
        }
      };

      // Debounce auto-save to prevent excessive calls
      const debounceTimer = setTimeout(saveCurrentProgress, 5000); // 5 second delay
      return () => clearTimeout(debounceTimer);
    }
  }, [currentStep, completedSteps, updateProgress, toast, sessionStarted]);

  function handleAddressConfirmed(address: string) {
    markStepComplete(1);
    toast({
      title: "Address Confirmed",
      description: "Moving to planning data extraction",
    });
  }

  function handleAddressChange(address: string) {
    updateReportData('propertySearchData', { 
      ...reportData.propertySearchData,
      addressInput: address 
    });
  }

  const markStepComplete = (stepIndex: number) => {
    // Only mark step complete if it passes validation
    if (stepIndex < allSteps.length && allSteps[stepIndex].validation()) {
      const newCompletedSteps = [...completedSteps];
      newCompletedSteps[stepIndex] = true;
      setCompletedSteps(newCompletedSteps);
      console.log(`Step ${stepIndex} marked as complete:`, allSteps[stepIndex].title);
    } else {
      console.log(`Step ${stepIndex} validation failed, not marking complete`);
    }
  };

  const validateCurrentStep = (): boolean => {
    if (currentStep >= steps.length) return true;
    
    const step = steps[currentStep];
    if (step.validation) {
      return step.validation();
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      markStepComplete(currentStep);
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast({
        title: "Step Incomplete",
        description: "Please complete all required fields before proceeding.",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    // Allow navigation to any step - users can start anywhere
    setCurrentStep(stepIndex);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = validateCurrentStep();

  // Show job selector if session not started
  if (!sessionStarted || showJobSelector) {
    return (
      <div className="min-h-screen bg-background">
        <JobSelector
          onStartFresh={handleStartFresh}
          onLoadJob={handleLoadJob}
          onCreateNewJob={() => {}} // Placeholder - this flow won't be used in this version
          onClose={() => setShowJobSelector(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with progress */}
      <div className="sticky top-0 z-20 bg-background border-b border-border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Property Assessment Form</h1>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1}: {steps[currentStep].title}
              {currentJobId && <span className="ml-2 text-blue-600">(Job: {currentJobId.slice(-8)})</span>}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowJobSelector(true)}
              className="text-xs flex items-center gap-1"
            >
              <FileText className="h-3 w-3" />
              Jobs
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={completeAssessmentAndStartFresh}
              className="text-xs flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Complete & Start Fresh
            </Button>
            <Badge variant={isSaving ? "default" : lastSaved ? "secondary" : "outline"} className="transition-all duration-500">
              {isSaving ? "Saving..." : lastSaved ? "Saved" : "Unsaved"}
            </Badge>
            <Badge variant="outline">
              {currentStep + 1} of {steps.length}
            </Badge>
          </div>
        </div>
        <Progress value={progress} className="w-full" />

        {/* Step indicators */}
        <div className="flex justify-center gap-2">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer hover:scale-105 ${
                index === currentStep
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : completedSteps[index]
                  ? "bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20"
                  : index < currentStep
                  ? "bg-primary/20 text-primary hover:bg-primary/30"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              disabled={false} // Allow navigation to any step
            >
              {completedSteps[index] ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <span>{index + 1}</span>
              )}
              <span className="hidden sm:inline">{step.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form content with completely stable layout */}
      <div className="p-4 pb-24 h-[calc(100vh-200px)] overflow-hidden">
        <div className="max-w-4xl mx-auto h-full">
          <Card className="h-full flex flex-col border-none shadow-none bg-transparent">
            <CardHeader className="pb-4 flex-shrink-0">
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {steps[currentStep].subtitle}
              </p>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="h-full">
                {steps[currentStep].component}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => updateProgress({
                currentStep,
                completedSteps
              }, { showToast: true })}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Progress"}
            </Button>

            <Button
              onClick={() => {
                if (currentStep === steps.length - 2) {
                  // This is the "Review & Generate" step - create job and move to completion
                  nextStep();
                } else if (isLastStep) {
                  // This is the final "Assessment Complete" step - do nothing, stay here
                  console.log('Already at completion step');
                } else {
                  nextStep();
                }
              }}
              disabled={!canProceed}
              className="flex items-center gap-2"
            >
              {currentStep === steps.length - 2 ? "Create Work Hub Job" : 
               isLastStep ? "Complete" : "Next"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

console.log('PropertyAssessmentForm component defined successfully');

// Export the component with explicit typing
const Component = PropertyAssessmentForm as React.FC<PropertyAssessmentFormProps>;
export default Component;