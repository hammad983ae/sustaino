import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyAddressForm from "@/components/PropertyAddressForm";
import PlanningDataIntegration from "@/components/PlanningDataIntegration";
import PropertySearchAnalysisEnhanced from "@/components/PropertySearchAnalysisEnhanced";
import ReportTypeConfiguration from "@/components/ReportTypeConfiguration";
import DocumentPhotoUpload from "@/components/DocumentPhotoUpload";
import ReportSectionManager from "@/components/ReportSectionManager";
import { useReportJobSaver } from "@/hooks/useReportJobSaver";

interface MultiStepFormProps {
  onSubmit?: (data: any) => void;
  onContinueToReport?: () => void;
}

const MultiStepForm = ({ onSubmit, onContinueToReport }: MultiStepFormProps = {}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [reportData, setReportData] = useState<any>({
    propertyAddress: "520 Deakin Avenue Mildura VIC 3500",
    reportType: "long-form",
    propertyType: "commercial"
  });
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [enhancedAnalysisData, setEnhancedAnalysisData] = useState<any>(null);

  // Auto-save functionality
  const { saveNow, markAsCompleted } = useReportJobSaver({
    reportData: { ...reportData, enhancedAnalysisData },
    currentSection: currentStep,
    propertyAddress: reportData.propertyAddress,
    reportType: reportData.reportType,
    enabled: true,
    includedSections: selectedSections,
    geolocationData: enhancedAnalysisData?.geolocation,
    vicplanData: enhancedAnalysisData?.vicPlanData,
    marketAnalysis: enhancedAnalysisData?.marketData
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
      component: <PropertySearchAnalysisEnhanced 
        address={reportData.propertyAddress}
        onAddressChange={(address) => setReportData(prev => ({ ...prev, propertyAddress: address }))}
        onAnalysisComplete={setEnhancedAnalysisData}
      />
    },
    {
      title: "Report Configuration",
      component: <ReportTypeConfiguration />
    },
    {
      title: "Document Upload",
      component: <DocumentPhotoUpload />
    },
    {
      title: "Report Sections",
      component: <ReportSectionManager 
        reportType={reportData.reportType || "long-form"}
        propertyType={reportData.propertyType || "residential"}
        reportData={reportData}
        propertyAddress={reportData.propertyAddress || "520 Deakin Avenue Mildura VIC 3500"}
        onSectionsChange={setSelectedSections}
        onContinueToReport={() => onContinueToReport?.()}
      />
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Auto-save on step change
      saveNow();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Auto-save on step change
      saveNow();
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-friendly header with progress */}
      <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold truncate">
            Step {currentStep + 1}: {steps[currentStep].title}
          </h1>
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