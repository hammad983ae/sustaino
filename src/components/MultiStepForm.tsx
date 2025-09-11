import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyAddressForm from "@/components/PropertyAddressForm";
import PlanningDataIntegration from "@/components/PlanningDataIntegration";
import PropertySearchAnalysisEnhanced from "@/components/PropertySearchAnalysisEnhanced";
import ReportTypeConfiguration from "@/components/ReportTypeConfiguration";
import DocumentPhotoUpload from "@/components/DocumentPhotoUpload";
import ReportSectionManager from "@/components/ReportSectionManager";
import { useFormStore } from '@/stores/formStore';
import { useAuthStore } from '@/stores/authStore';

interface MultiStepFormProps {
  onSubmit?: (data: any) => void;
  onContinueToReport?: () => void;
}

const MultiStepForm = ({ onSubmit, onContinueToReport }: MultiStepFormProps = {}) => {
  const { 
    currentStep, 
    setCurrentStep, 
    propertyData, 
    updatePropertyData, 
    reportData, 
    updateReportData,
    selectedSections, 
    setSelectedSections, 
    enhancedAnalysisData, 
    setEnhancedAnalysisData 
  } = useFormStore();
  
  const { isAuthenticated, initialize } = useAuthStore();

  // Initialize auth store
  useEffect(() => {
    initialize();
  }, [initialize]);

  const saveNow = () => {
    // Auto-save is handled by the Zustand persist middleware
    console.log('Form data auto-saved');
  };
  
  const markAsCompleted = () => Promise.resolve();

  const nextStep = () => {
    console.log('Next button clicked, current step:', currentStep, 'total steps:', steps.length);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      console.log('Moving to step:', currentStep + 1);
      // Auto-save on step change only if authenticated
      if (isAuthenticated) {
        try {
          saveNow();
        } catch (error) {
          console.error('Error saving:', error);
        }
      }
    } else {
      console.log('Already at last step');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Auto-save on step change only if authenticated
      if (isAuthenticated) {
        saveNow();
      }
    }
  };

  // Define steps after all state and functions are available
  const steps = [
    {
      title: "Property Address",
      component: <PropertyAddressForm />
    },
    {
      title: "Planning Data",
      component: <PlanningDataIntegration />
    },
    {
      title: "Search & Analysis", 
      component: <PropertySearchAnalysisEnhanced 
        address={propertyData.address || "520 Deakin Avenue Mildura VIC 3500"}
        onAddressChange={(address) => updatePropertyData({ address })}
        onAnalysisComplete={setEnhancedAnalysisData}
      />
    },
    {
      title: "Report Configuration",
      component: <ReportTypeConfiguration 
        onConfigurationChange={(config) => updateReportData({ reportConfiguration: config })}
      />
    },
    {
      title: "Document Upload",
      component: <DocumentPhotoUpload />
    },
    {
      title: "Report Sections",
      component: <ReportSectionManager 
        reportType={propertyData.reportType || "long-form"}
        propertyType={propertyData.propertyType || "residential"}
        reportData={reportData}
        propertyAddress={propertyData.address || "520 Deakin Avenue Mildura VIC 3500"}
        onSectionsChange={setSelectedSections}
        onContinueToReport={() => onContinueToReport?.()}
      />
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-friendly header with progress */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b p-4 space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold truncate animate-scale-in">
            Step {currentStep + 1}: {steps[currentStep].title}
          </h1>
          <div className="text-sm text-muted-foreground animate-fade-in">
            {currentStep + 1} of {steps.length}
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={progress} className="w-full transition-all duration-500 ease-out" />
          <div className="text-xs text-center text-muted-foreground">
            {progress.toFixed(0)}% Complete
          </div>
        </div>
      </div>

      {/* Form content with smooth transitions */}
      <div className="p-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <div key={currentStep} className="animate-fade-in">
            {steps[currentStep].component}
          </div>
        </div>
      </div>

      {/* Mobile-friendly navigation footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentStep(index);
                  if (isAuthenticated) {
                    saveNow();
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover-scale ${
                  index === currentStep
                    ? "bg-primary shadow-lg shadow-primary/50"
                    : index < currentStep
                    ? "bg-primary/60 hover:bg-primary/80"
                    : "bg-muted hover:bg-muted-foreground/20"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={async () => {
                const pdfData = await markAsCompleted();
                onContinueToReport?.();
              }}
              className="flex items-center gap-2"
            >
              <span className="hidden sm:inline">Complete Report</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="flex items-center gap-2"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;