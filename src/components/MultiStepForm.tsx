import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import PropertyAddressForm from "@/components/PropertyAddressForm";
import PlanningDataIntegration from "@/components/PlanningDataIntegration";
import PropertySearchAnalysis from "@/components/PropertySearchAnalysis";
import ReportTypeConfiguration from "@/components/ReportTypeConfiguration";
import DocumentPhotoUpload from "@/components/DocumentPhotoUpload";

interface MultiStepFormProps {
  onSubmit?: (data: any) => void;
}

const MultiStepForm = ({ onSubmit }: MultiStepFormProps = {}) => {
  const [currentStep, setCurrentStep] = useState(0);

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

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-friendly header with progress */}
      <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div className="h-4 w-px bg-border" />
            <h1 className="text-lg font-semibold truncate">
              Step {currentStep + 1}: {steps[currentStep].title}
            </h1>
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