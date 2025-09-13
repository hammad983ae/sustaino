import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, FileText, Search, Upload, MapPin, Settings2 } from "lucide-react";
import PropertyAddressForm from "@/components/PropertyAddressForm";
import PlanningDataIntegration from "@/components/PlanningDataIntegration";
import PropertySearchAnalysis from "@/components/PropertySearchAnalysis";
import ReportTypeConfiguration from "@/components/ReportTypeConfiguration";
import DocumentUploadManager from "@/components/DocumentUploadManager";
import GroundLeaseDetails from "@/components/GroundLeaseDetails";
import ProfessionalDeclarations from "@/components/ProfessionalDeclarations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useValuation } from "@/contexts/ValuationContext";

interface MultiStepFormProps {
  onSubmit?: (data: any) => void;
}

const MultiStepForm = ({ onSubmit }: MultiStepFormProps = {}) => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const { isLeaseholdValuation } = useValuation();

  // Group steps: 1-3 together, 4-5 together, then professional declarations
  const stepGroups = [
    {
      title: "Property Information & Analysis",
      steps: [
        {
          title: "Property Address",
          icon: <MapPin className="h-5 w-5" />,
          component: <PropertyAddressForm />
        },
        {
          title: "Planning Data",
          icon: <FileText className="h-5 w-5" />,
          component: <PlanningDataIntegration />
        },
        {
          title: "Search & Analysis",
          icon: <Search className="h-5 w-5" />,
          component: <PropertySearchAnalysis />
        }
      ]
    },
    {
      title: "Configuration & Upload",
      steps: [
        {
          title: "Report Configuration",
          icon: <Settings2 className="h-5 w-5" />,
          component: (
            <div className="space-y-6">
              <ReportTypeConfiguration />
              <GroundLeaseDetails 
                isVisible={isLeaseholdValuation}
                data={{}}
                onChange={() => {}}
              />
            </div>
          )
        },
        {
          title: "Document Upload",
          icon: <Upload className="h-5 w-5" />,
          component: <DocumentUploadManager />
        }
      ]
    },
    {
      title: "Professional Declarations",
      steps: [
        {
          title: "Professional Compliance",
          icon: <Settings2 className="h-5 w-5" />,
          component: <ProfessionalDeclarations onComplete={(data) => console.log('Declarations completed:', data)} />
        }
      ]
    }
  ];

  const totalSteps = stepGroups.reduce((acc, group) => acc + group.steps.length, 0);
  const currentStepNumber = stepGroups.slice(0, currentGroup).reduce((acc, group) => acc + group.steps.length, 0) + 1;
  const progress = (currentStepNumber / totalSteps) * 100;

  const nextGroup = () => {
    if (currentGroup < stepGroups.length - 1) {
      setCurrentGroup(currentGroup + 1);
    } else if (onSubmit) {
      // Final completion - redirect to WorkHub
      onSubmit({ completed: true });
    }
  };

  const prevGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
    }
  };

  const currentGroupData = stepGroups[currentGroup];

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-lg border border-purple-200/50">
        <Button
          variant="outline"
          onClick={prevGroup}
          disabled={currentGroup === 0}
          className="flex items-center gap-2 text-purple-700 border-purple-300 hover:bg-purple-100"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-sm font-medium text-purple-800">
              Group {currentGroup + 1} of {stepGroups.length}
            </div>
            <div className="text-xs text-purple-600">
              {currentGroupData.title}
            </div>
          </div>
          <div className="w-32">
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Button
          onClick={nextGroup}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
        >
          <span className="hidden sm:inline">
            {currentGroup === stepGroups.length - 1 ? "Complete Assessment" : "Next"}
          </span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Current Group Content */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-purple-800 mb-2">
            {currentGroupData.title}
          </h2>
          <p className="text-purple-600">
            Complete all steps in this section to continue
          </p>
        </div>

        {/* Steps in Current Group */}
        <div className="grid gap-6">
          {currentGroupData.steps.map((step, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border border-purple-200/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg text-purple-800">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                    {step.icon}
                  </div>
                  Step {currentStepNumber + index}: {step.title}
                </CardTitle>
              </CardHeader>
              <Separator className="bg-purple-200/50" />
              <CardContent className="pt-6">
                {step.component}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Group Progress Indicators */}
      <div className="flex justify-center gap-3 pt-4">
        {stepGroups.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-12 rounded-full transition-colors ${
              index === currentGroup
                ? "bg-purple-500"
                : index < currentGroup
                ? "bg-purple-300"
                : "bg-purple-100"
            }`}
          />
        ))}
      </div>

      {/* Mobile-optimized spacing */}
      <div className="pb-8 sm:pb-4" />
    </div>
  );
};

export default MultiStepForm;