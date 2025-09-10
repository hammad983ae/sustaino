import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyAddressForm from "@/components/PropertyAddressForm";
import PlanningDataIntegration from "@/components/PlanningDataIntegration";
import PropertySearchAnalysis from "@/components/PropertySearchAnalysis";
import ReportTypeConfiguration from "@/components/ReportTypeConfiguration";
import DocumentPhotoUpload from "@/components/DocumentPhotoUpload";
import { useProperty } from "@/contexts/PropertyContext";
import { useReportJobSaver } from "@/hooks/useReportJobSaver";

interface MultiStepFormProps {
  onSubmit?: (data: any) => void;
}

const MultiStepForm = ({ onSubmit }: MultiStepFormProps = {}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState({});
  const navigate = useNavigate();
  const { addressData, getFormattedAddress, currentJobNumber } = useProperty();

  // Auto-save functionality using the job saver hook
  const { saveNow } = useReportJobSaver({
    reportData: stepData,
    currentSection: currentStep,
    propertyAddress: getFormattedAddress(),
    reportType: 'Property Assessment',
    enabled: !!getFormattedAddress(),
    autoSaveDelay: 3000
  });

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
      component: <PropertySearchAnalysis />
    },
    {
      title: "Report Configuration",
      component: <ReportTypeConfiguration />
    },
    {
      title: "Document Upload",
      component: <DocumentPhotoUpload />
    }
  ];

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      // Save current step data before moving to next
      await saveNow();
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // Navigate back to home page when on first step
      navigate('/', { replace: true });
    }
  };

  // Auto-save when step data changes
  useEffect(() => {
    if (getFormattedAddress() && Object.keys(stepData).length > 0) {
      const timeoutId = setTimeout(() => {
        saveNow();
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [stepData, saveNow, getFormattedAddress]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-friendly header with progress */}
      <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold truncate">
              Step {currentStep + 1}: {steps[currentStep].title}
            </h1>
            {currentJobNumber && (
              <p className="text-xs text-muted-foreground">Job #{currentJobNumber}</p>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentStep + 1} of {steps.length}
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Form content */}
      <div className="p-4 pb-24">
        <div className="max-w-4xl mx-auto">
          {steps[currentStep].component}
        </div>
      </div>

      {/* Mobile-friendly navigation footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={prevStep}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep
                    ? "bg-primary"
                    : index < currentStep
                    ? "bg-primary/60"
                    : "bg-muted"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;