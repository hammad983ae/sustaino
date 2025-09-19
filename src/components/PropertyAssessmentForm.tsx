import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Save, CheckCircle, ExternalLink, FileText, Building2, MapPin, Camera, Settings, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useUniversalSave } from '@/hooks/useUniversalSave';
import { useReportData } from '@/contexts/ReportDataContext';
import { useProperty } from '@/contexts/PropertyContext';
import { supabase } from '@/integrations/supabase/client';

// Step Components
import PropertyAddressForm from '@/components/PropertyAddressForm';
import { AutofillAddressFields } from '@/components/AutofillAddressFields';
import AddressConfirmation from '@/components/planning/AddressConfirmation';
import RentalConfiguration from '@/components/RentalConfiguration';
import PropertyPlanningSearch from '@/components/PropertyPlanningSearch';
import PropertySearchAnalysis from '@/components/PropertySearchAnalysis';
import PropertyPhotos from '@/components/PropertyPhotos';
import RiskAssessmentMarketIndicators from '@/components/RiskAssessmentMarketIndicators';
import PreviousSalesHistoryAndCurrentSale from '@/components/PreviousSalesHistoryAndCurrentSale';
import ReportTypeConfiguration from '@/components/ReportTypeConfiguration';
import DocumentUploadManager from '@/components/DocumentUploadManager';
import GenerateReportData from '@/components/GenerateReportData';
import IntelligentAssessmentAutomation from '@/components/IntelligentAssessmentAutomation';
import SectionDataExtractor from '@/components/SectionDataExtractor';
import ReportSectionToggler from '@/components/ReportSectionToggler';
import DataValidationPipeline from '@/components/DataValidationPipeline';

interface PropertyAssessmentFormProps {
  onComplete?: (data: any) => void;
  onNavigateToReport?: () => void;
}

const PropertyAssessmentForm: React.FC<PropertyAssessmentFormProps> = ({
  onComplete,
  onNavigateToReport
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const [includeDetailedRentalConfig, setIncludeDetailedRentalConfig] = useState(false);
  const { toast } = useToast();
  const { saveData, loadData, isSaving, lastSaved } = useUniversalSave('PropertyAssessmentForm');
  const { reportData, updateReportData } = useReportData();
  const { addressData, getFormattedAddress } = useProperty();

  // Listen for rental configuration toggle
  useEffect(() => {
    const handleRentalToggle = (event: CustomEvent) => {
      const newValue = event.detail.includeDetailed;
      setIncludeDetailedRentalConfig(newValue);
      
      // If we're currently on or past the rental config step and it's being disabled,
      // adjust the current step to avoid being on a non-existent step
      if (!newValue && currentStep >= 5) { // Rental config is typically step 5
        const rentalConfigStepIndex = allSteps.findIndex(step => step.title === "Rental Configuration");
        if (currentStep === rentalConfigStepIndex) {
          // Move to the next step (Review & Generate)
          setCurrentStep(currentStep - 1);
        }
      }
    };

    window.addEventListener('rentalConfigToggle', handleRentalToggle as EventListener);
    
    // Check localStorage on mount
    const stored = localStorage.getItem('includeDetailedRentalConfig');
    if (stored) {
      setIncludeDetailedRentalConfig(stored === 'true');
    }

    return () => {
      window.removeEventListener('rentalConfigToggle', handleRentalToggle as EventListener);
    };
  }, [currentStep]);

  // Define all possible steps with memoized validation
  const allSteps = useMemo(() => [
    {
      title: "Property Address",
      subtitle: "Find and configure address to begin your valuation report",
      component: <PropertyAddressForm />,
      validation: () => {
        const hasAddress = !!(addressData.propertyAddress || addressData.streetNumber);
        return hasAddress;
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
        <PropertyPhotos 
          propertyAddress={addressData.propertyAddress || getFormattedAddress() || ''}
        />
      ),
      validation: () => {
        const hasAddress = !!(addressData.propertyAddress || addressData.streetNumber);
        console.log('Property Photos validation:', { hasAddress, addressData });
        return hasAddress; // Require address to proceed
      }
    },
    {
      title: "Report Configuration",
      subtitle: "Configure your report settings and client information",
      component: (
        <div className="space-y-6">
          <ReportTypeConfiguration />
          <ReportSectionToggler />
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
      title: "Rental Configuration",
      subtitle: "Configure detailed rental valuation settings (optional)",
      component: <RentalConfiguration />,
      validation: () => {
        const hasAddress = !!(addressData.propertyAddress || addressData.streetNumber);
        console.log('Rental Configuration validation:', { hasAddress, addressData });
        return hasAddress; // Require address
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
  ], [addressData, getFormattedAddress, includeDetailedRentalConfig, onComplete, onNavigateToReport]);

  // Filter steps based on configuration
  const steps = allSteps.filter((step, index) => {
    // Remove rental configuration step if not needed
    if (step.title === "Rental Configuration" && !includeDetailedRentalConfig) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    // Load saved data on mount
    loadData().then(savedData => {
      if (savedData) {
        setCurrentStep(savedData.currentStep || 0);
        setCompletedSteps(savedData.completedSteps || []);
      }
    });
  }, [loadData]);

  // Clear old data when starting fresh assessment
  const startFreshAssessment = async () => {
    console.log('Starting fresh assessment - clearing all data');
    
    // Reset form state
    setCurrentStep(0);
    setCompletedSteps([]);
    setIncludeDetailedRentalConfig(false);
    
    // Force clear ALL localStorage data
    if (typeof Storage !== 'undefined') {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        // Clear all localStorage keys that might contain old data
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.includes('report') || 
              key.includes('planning') || 
              key.includes('mapping') || 
              key.includes('vicplan') || 
              key.includes('property') ||
              key.includes('assessment') ||
              key.includes('analysis') ||
              key.includes('valuation') ||
              key.includes('global_report') ||
              key.includes('workingHub')) {
            console.log('Clearing localStorage key:', key);
            localStorage.removeItem(key);
          }
        });
        
        // Also clear user-specific keys if user exists
        if (user) {
          const userSpecificKeys = [
            `report_PropertyAssessmentForm_${user.id}`,
            `global_report_tracking_${user.id}`,
            'workingHubFiles'
          ];
          userSpecificKeys.forEach(key => {
            localStorage.removeItem(key);
          });
        }
      } catch (error) {
        console.log('Could not clear user-specific data:', error);
        // Still clear what we can
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.includes('report') || key.includes('planning') || key.includes('mapping') || key.includes('property')) {
            localStorage.removeItem(key);
          }
        });
      }
    }
    
    // Dispatch event to force all components to refresh
    const freshStartEvent = new CustomEvent('freshStart', { detail: { timestamp: Date.now() } });
    window.dispatchEvent(freshStartEvent);
    
    // Force page reload to ensure clean state
    setTimeout(() => {
      window.location.reload();
    }, 100);
    
    toast({
      title: "Fresh Start",
      description: "All previous data cleared. Starting fresh assessment.",
    });
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

  useEffect(() => {
    // Auto-save progress
    const saveProgress = async () => {
      const progressData = {
        currentStep,
        completedSteps,
        reportData,
        addressData,
        lastUpdated: new Date().toISOString()
      };
      await saveData(progressData);
    };

    const debounceTimer = setTimeout(saveProgress, 10000); // Changed to 10 seconds to reduce flashing
    return () => clearTimeout(debounceTimer);
  }, [currentStep, completedSteps, reportData, addressData, saveData]);

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

  // Auto-save on step changes and data updates with proper debouncing
  useEffect(() => {
    const saveCurrentProgress = async () => {
      try {
        const progressData = {
          currentStep,
          completedSteps,
          reportData,
          addressData,
          includeDetailedRentalConfig,
          timestamp: Date.now(),
          lastUpdated: new Date().toISOString()
        };
        
        console.log('Auto-saving progress:', progressData);
        await saveData(progressData);
      } catch (error) {
        console.error('Failed to save progress:', error);
        toast({
          title: "Save Warning",
          description: "Failed to auto-save progress. Please use Save Progress button.",
          variant: "destructive"
        });
      }
    };

    // Only auto-save on step changes, not on every data change
    // Manual save should be used for data changes
    saveCurrentProgress();
  }, [currentStep, completedSteps]); // Removed frequent changing dependencies

  // Separate effect for manual data changes with longer debounce
  useEffect(() => {
    const saveDataChanges = async () => {
      try {
        const progressData = {
          currentStep,
          completedSteps,
          reportData,
          addressData,
          includeDetailedRentalConfig,
          timestamp: Date.now(),
          lastUpdated: new Date().toISOString()
        };
        
        await saveData(progressData);
      } catch (error) {
        console.warn('Failed to auto-save data changes:', error);
      }
    };

    // Longer debounce for data changes (10 seconds)
    const timeoutId = setTimeout(saveDataChanges, 10000);
    return () => clearTimeout(timeoutId);
  }, [reportData, addressData, includeDetailedRentalConfig]);

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
    // Only allow navigation to completed steps or next step
    if (stepIndex <= currentStep || completedSteps[stepIndex - 1]) {
      setCurrentStep(stepIndex);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = validateCurrentStep();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with progress */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-background via-background to-primary/10 border-b border-primary/20 p-4 space-y-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Property Assessment Form</h1>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1}: {steps[currentStep].title}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={startFreshAssessment}
              className="text-xs"
            >
              Start Fresh
            </Button>
            <Badge variant={isSaving ? "default" : lastSaved ? "secondary" : "outline"}>
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
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                index === currentStep
                  ? "bg-primary text-primary-foreground"
                  : completedSteps[index]
                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                  : index < currentStep
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
              disabled={index > currentStep && !completedSteps[index - 1]}
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
          <Card className="h-full flex flex-col">
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
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-background via-background to-primary/10 border-t border-primary/20 p-4 shadow-lg backdrop-blur-sm">
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
              onClick={() => saveData({
                currentStep,
                completedSteps,
                reportData,
                addressData,
                forceSave: true
              })}
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

export default PropertyAssessmentForm;