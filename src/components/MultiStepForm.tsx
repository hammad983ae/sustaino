import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, FileText, Search, Upload, MapPin, Settings2 } from "lucide-react";
import PropertyAddressForm from "@/components/PropertyAddressForm";
import PlanningDataIntegration from "@/components/PlanningDataIntegration";
import PropertySearchAnalysis from "@/components/PropertySearchAnalysis";
import ReportTypeConfiguration from "@/components/ReportTypeConfiguration";
import DocumentUploadManager from "@/components/DocumentUploadManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface MultiStepFormProps {
  onSubmit?: (data: any) => void;
}

const MultiStepForm = ({ onSubmit }: MultiStepFormProps = {}) => {
  const [currentGroup, setCurrentGroup] = useState(0);

  // Group steps: 1-3 together, 4-5 together
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
          component: <ReportTypeConfiguration />
        },
        {
          title: "Document Upload",
          icon: <Upload className="h-5 w-5" />,
          component: <DocumentUploadManager />
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
      <div className="flex items-center justify-between p-4 bg-amber-50/50 rounded-lg border border-amber-200/50">
        <Button
          variant="outline"
          onClick={prevGroup}
          disabled={currentGroup === 0}
          className="flex items-center gap-2 text-amber-700 border-amber-300 hover:bg-amber-100"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-sm font-medium text-amber-800">
              Group {currentGroup + 1} of {stepGroups.length}
            </div>
            <div className="text-xs text-amber-600">
              {currentGroupData.title}
            </div>
          </div>
          <div className="w-32">
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Button
          onClick={nextGroup}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white"
        >
          <span className="hidden sm:inline">
            {currentGroup === stepGroups.length - 1 ? "Complete" : "Next"}
          </span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Current Group Content */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-amber-800 mb-2">
            {currentGroupData.title}
          </h2>
          <p className="text-amber-600">
            Complete all steps in this section to continue
          </p>
        </div>

        {/* Steps in Current Group */}
        <div className="grid gap-6">
          {currentGroupData.steps.map((step, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border border-amber-200/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg text-amber-800">
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                    {step.icon}
                  </div>
                  Step {currentStepNumber + index}: {step.title}
                </CardTitle>
              </CardHeader>
              <Separator className="bg-amber-200/50" />
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
                ? "bg-amber-500"
                : index < currentGroup
                ? "bg-amber-300"
                : "bg-amber-100"
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