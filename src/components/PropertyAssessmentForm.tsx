import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Save, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useUniversalSave } from '@/hooks/useUniversalSave';
import { useReportData } from '@/contexts/ReportDataContext';
import { useProperty } from '@/contexts/PropertyContext';

// Step Components
import { AutofillAddressFields } from '@/components/AutofillAddressFields';
import AddressConfirmation from '@/components/planning/AddressConfirmation';
import PlanningDataDisplay from '@/components/planning/PlanningDataDisplay';
import ReportTypeConfiguration from '@/components/ReportTypeConfiguration';
import DocumentUploadManager from '@/components/DocumentUploadManager';
import GenerateReportData from '@/components/GenerateReportData';

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
  const { toast } = useToast();
  const { saveData, loadData, isSaving, lastSaved } = useUniversalSave('PropertyAssessmentForm');
  const { reportData, updateReportData } = useReportData();
  const { addressData } = useProperty();

  const steps = [
    {
      title: "Property Address",
      subtitle: "Find and configure address to begin your valuation report",
      component: <AutofillAddressFields showLotPlan={true} showUnit={true} showSuburb={true} />,
      validation: () => addressData.propertyAddress || addressData.streetNumber
    },
    {
      title: "Planning Data", 
      subtitle: "Please confirm the property address before proceeding with planning data search",
      component: (
        <div className="space-y-6">
          <AddressConfirmation 
            onAddressConfirmed={handleAddressConfirmed}
            onAddressChange={handleAddressChange}
            showAutoGenerate={true}
          />
          <PlanningDataDisplay />
        </div>
      ),
      validation: () => reportData.propertySearchData?.confirmedAddress
    },
    {
      title: "Property Photos",
      subtitle: "Upload photos and documents for your property assessment",
      component: <DocumentUploadManager />,
      validation: () => reportData.fileAttachments?.propertyPhotos?.length > 0
    },
    {
      title: "Report Configuration",
      subtitle: "Configure your report settings and client information",
      component: <ReportTypeConfiguration />,
      validation: () => reportData.reportConfig?.reportType && reportData.reportConfig?.propertyType
    },
    {
      title: "Review & Generate",
      subtitle: "Review your information and generate the assessment report",
      component: (
        <GenerateReportData
          assessmentData={{
            reportData,
            addressData,
            currentStep,
            completedSteps
          }}
          onNavigateToReport={onNavigateToReport}
        />
      ),
      validation: () => true
    }
  ];

  useEffect(() => {
    // Load saved data on mount
    loadData().then(savedData => {
      if (savedData) {
        setCurrentStep(savedData.currentStep || 0);
        setCompletedSteps(savedData.completedSteps || []);
      }
    });
  }, [loadData]);

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

    const debounceTimer = setTimeout(saveProgress, 1000);
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
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[stepIndex] = true;
    setCompletedSteps(newCompletedSteps);
  };

  const validateCurrentStep = () => {
    const step = steps[currentStep];
    return step.validation ? step.validation() : true;
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

      {/* Form content */}
      <div className="p-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {steps[currentStep].subtitle}
              </p>
            </CardHeader>
            <CardContent>
              {steps[currentStep].component}
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
                if (isLastStep) {
                  // Navigate to executive summary/table of contents instead of WorkHub
                  if (onNavigateToReport) {
                    onNavigateToReport();
                  }
                } else {
                  nextStep();
                }
              }}
              disabled={!canProceed}
              className="flex items-center gap-2"
            >
              {isLastStep ? "Create Work Hub Job & View Report" : "Next"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAssessmentForm;