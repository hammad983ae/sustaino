import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, MapPin, Search, Camera, FileText, Settings, Zap, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useReportData } from '@/contexts/ReportDataContext';

// Core step components
import PropertyAddressForm from '@/components/PropertyAddressForm';
import PropertyPlanningSearch from '@/components/PropertyPlanningSearch';
import PropertySearchAnalysis from '@/components/PropertySearchAnalysis';
import DocumentPhotoUpload from '@/components/DocumentPhotoUpload';
import ReportTypeConfiguration from '@/components/ReportTypeConfiguration';
import RentalConfiguration from '@/components/RentalConfiguration';
import IntelligentAssessmentAutomation from '@/components/IntelligentAssessmentAutomation';
import AutoGenerateSummary from '@/components/AutoGenerateSummary';
import TenancyScheduleLeaseDetails from '@/components/TenancyScheduleLeaseDetails';

interface StreamlinedPropertyAssessmentProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export default function StreamlinedPropertyAssessment({ onComplete, initialData }: StreamlinedPropertyAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(9).fill(false));
  const [includeRentalConfig, setIncludeRentalConfig] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { reportData, updateReportData } = useReportData();

  // Core 9-step workflow that provides all data needed for full report generation
  const coreSteps = [
    {
      id: 'property-address',
      title: "Property Address",
      subtitle: "Property location and address verification",
      icon: <MapPin className="h-5 w-5" />,
      component: <PropertyAddressForm />,
      required: true
    },
    {
      id: 'planning-search',
      title: "Planning Search", 
      subtitle: "Zoning, planning data, and regulatory information",
      icon: <Search className="h-5 w-5" />,
      component: <PropertyPlanningSearch propertyAddress={reportData?.propertyDetails?.propertyAddress || ''} />,
      required: true
    },
    {
      id: 'search-analysis',
      title: "Search & Analysis",
      subtitle: "Market analysis and property data collection",
      icon: <Search className="h-5 w-5" />,
      component: <PropertySearchAnalysis />,
      required: true
    },
    {
      id: 'photos-documents',
      title: "Property Photos & Documents",
      subtitle: "OCR and document upload with content selections",
      icon: <Camera className="h-5 w-5" />,
      component: <DocumentPhotoUpload />,
      required: false,
      description: "Upload photos and documents. Use text box selections to specify what content to include in analysis."
    },
    {
      id: 'report-config',
      title: "Report Configuration",
      subtitle: "Report type, purpose, and client information",
      icon: <Settings className="h-5 w-5" />,
      component: <ReportTypeConfiguration />,
      required: true
    },
    {
      id: 'rental-config',
      title: "Rental Configuration",
      subtitle: "Rental valuation settings (if applicable)",
      icon: <FileText className="h-5 w-5" />,
      component: <RentalConfiguration />,
      required: false,
      conditional: true
    },
    {
      id: 'tenancy-lease-details',
      title: "Tenancy & Lease Details",
      subtitle: "Ground lease details and tenancy information",
      icon: <FileText className="h-5 w-5" />,
      component: <TenancyScheduleLeaseDetails />,
      required: false,
      description: "Ground lease details will only appear for leasehold properties. Configure tenancy information and upload lease documents."
    },
    {
      id: 'intelligent-enhancement',
      title: "Intelligent Enhancement",
      subtitle: "AI-powered analysis and optimization",
      icon: <Zap className="h-5 w-5" />,
      component: <IntelligentAssessmentAutomation />,
      required: true
    },
    {
      id: 'review-generate',
      title: "Review & Generate",
      subtitle: "Auto-generate all remaining report sections",
      icon: <CheckCircle className="h-5 w-5" />,
      component: (
        <div className="space-y-6">
          <AutoGenerateSummary onSummaryGenerated={(summary) => console.log('Summary generated:', summary)} />
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Zap className="h-5 w-5 mr-2" />
                Auto-Generate Complete Report
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Generate all remaining sections from collected data
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Sections to be auto-generated:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>• Risk Assessment & Market Indicators</div>
                  <div>• Sales Evidence Analysis</div>
                  <div>• Leasing Evidence Analysis</div>
                  <div>• ESG Assessment Summary</div>
                  <div>• Climate Risk Assessment</div>
                  <div>• Valuation Analysis & Rationale</div>
                  <div>• Environmental Audit</div>
                  <div>• Marketability Assessment</div>
                  <div>• Market Transaction Analysis</div>
                  <div>• Professional Certificates</div>
                </div>
              </div>
              
              <Button
                onClick={() => handleGenerateCompleteReport()}
                disabled={isGenerating}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Generating Complete Report...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Generate Complete Report
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      ),
      required: true
    }
  ];

  // Filter steps based on configuration
  const activeSteps = coreSteps.filter(step => {
    if (step.id === 'rental-config' && !includeRentalConfig) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    // Initialize with any provided data
    if (initialData) {
      // Pre-populate based on quick setup data
      if (initialData.quickSetup) {
        updateReportData('propertyDetails', { propertyAddress: initialData.propertyAddress });
        updateReportData('reportConfig', initialData.reportConfig);
        
        // Mark some steps as pre-completed if data exists
        const newCompleted = [...completedSteps];
        if (initialData.propertyAddress) newCompleted[0] = true;
        if (initialData.reportConfig) newCompleted[4] = true;
        setCompletedSteps(newCompleted);
      }
    }
  }, [initialData]);

  const handleGenerateCompleteReport = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate comprehensive report generation from collected core data
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Package all collected data for complete report generation
      const completeAssessmentData = {
        coreDataCollected: true,
        propertyAddress: reportData?.propertyDetails?.propertyAddress,
        planningData: reportData?.planningData,
        analysisData: reportData?.propertySearchData,
        documentsPhotos: null, // Will be populated during assessment
        reportConfig: reportData?.reportConfig,
        rentalConfig: includeRentalConfig ? null : null, // Will be populated during assessment
        intelligentEnhancements: null, // Will be populated during assessment
        
        // Flag for auto-generation of remaining sections
        autoGenerateRemainingSections: true,
        sectionsToGenerate: [
          'riskAssessment',
          'salesEvidence', 
          'leasingEvidence',
          'esgAssessment',
          'climateRisk',
          'valuationAnalysis',
          'environmentalAudit',
          'marketability',
          'transactionAnalysis',
          'professionalCertificates'
        ],
        
        timestamp: new Date().toISOString(),
        assessmentType: 'streamlined',
        readyForReportGeneration: true
      };
      
      toast({
        title: "Assessment Complete",
        description: "All core data collected. Report sections will be auto-generated.",
      });
      
      onComplete(completeAssessmentData);
      
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate complete report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const nextStep = () => {
    if (currentStep < activeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const markStepComplete = (stepIndex: number) => {
    const newCompleted = [...completedSteps];
    newCompleted[stepIndex] = true;
    setCompletedSteps(newCompleted);
  };

  const currentStepData = activeSteps[currentStep];
  const progress = ((currentStep + 1) / activeSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Streamlined Property Assessment</h1>
          <p className="text-muted-foreground">
            9 core steps to collect all data needed for complete report generation
          </p>
          <Badge variant="secondary" className="mt-2">
            Step {currentStep + 1} of {activeSteps.length}
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Core Data Collection</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Current Step */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              {currentStepData.icon}
              <span className="ml-2">{currentStepData.title}</span>
              {completedSteps[currentStep] && (
                <CheckCircle className="h-5 w-5 ml-2 text-green-600" />
              )}
            </CardTitle>
            <p className="text-muted-foreground">{currentStepData.subtitle}</p>
            {currentStepData.description && (
              <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                {currentStepData.description}
              </p>
            )}
          </CardHeader>
          <CardContent>
            {currentStepData.component}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex gap-2">
            {activeSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep
                    ? "bg-primary"
                    : index < currentStep || completedSteps[index]
                    ? "bg-primary/60"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>

          {currentStep < activeSteps.length - 1 ? (
            <Button onClick={nextStep}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={() => markStepComplete(currentStep)}
              disabled={currentStep !== activeSteps.length - 1}
            >
              Complete Assessment
            </Button>
          )}
        </div>

        {/* Step Overview */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p className="font-medium mb-2">
            These 9 core steps provide all data needed to auto-generate:
          </p>
          <p>
            Risk Assessment • Sales Evidence • ESG Analysis • Market Commentary • 
            Valuation Analysis • All Professional Sections
          </p>
        </div>
      </div>
    </div>
  );
}