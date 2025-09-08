import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Home, ArrowLeft, Sparkles, Zap, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import ReportSection from "@/components/ReportSection";
import AutomatedAnalysisSection from "@/components/AutomatedAnalysisSection";
import { getPropertyTypeReportSections, getAutomatedAnalysisDescription } from "@/components/PropertyTypeReportConfig";

interface AutomatedReportProps {
  propertyType: string;
  onBack?: () => void;
}

const AutomatedReport = ({ propertyType, onBack }: AutomatedReportProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [processingSections, setProcessingSections] = useState<Set<number>>(new Set());
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [isAIEnhancing, setIsAIEnhancing] = useState(false);

  // Get property-type specific sections
  const sections = getPropertyTypeReportSections(propertyType);

  useEffect(() => {
    // Simulate automated analysis process
    const startAutomatedAnalysis = async () => {
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].automated) {
          // Start processing this section
          setProcessingSections(prev => new Set([...prev, i]));
          
          // Simulate processing time (2-4 seconds per section)
          await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 2000));
          
          // Mark as completed
          setProcessingSections(prev => {
            const newSet = new Set(prev);
            newSet.delete(i);
            return newSet;
          });
          setCompletedSections(prev => new Set([...prev, i]));
        }
      }
    };

    startAutomatedAnalysis();
  }, [sections]);

  const navigateToSection = (sectionIndex: number) => {
    setCurrentStep(sectionIndex);
  };

  const nextSection = () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevSection = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / sections.length) * 100;
  const completionProgress = (completedSections.size / sections.filter(s => s.automated).length) * 100;

  const getPropertyTypeTitle = () => {
    switch (propertyType) {
      case "commercial": return "Commercial Property Valuation Report";
      case "residential": return "Residential Property Valuation Report";
      case "agricultural": return "Agricultural Property Valuation Report";
      case "specialised": return "Specialised Property Valuation Report";
      default: return "Property Valuation Report";
    }
  };

  const handleAIEnhance = () => {
    setIsAIEnhancing(true);
    // Simulate AI enhancement
    setTimeout(() => {
      setIsAIEnhancing(false);
    }, 3000);
  };

  const renderSectionContent = () => {
    const section = sections[currentStep];
    
    // Check if this is an automated section
    if (section.automated) {
      return (
        <AutomatedAnalysisSection
          title={section.title}
          description={section.description || getAutomatedAnalysisDescription(propertyType)}
          isCompleted={completedSections.has(currentStep)}
          isProcessing={processingSections.has(currentStep)}
          data={{
            keyFinding: "Market analysis complete",
            confidence: "High (95%)",
            sources: "12 sources",
            summary: `Automated analysis of ${section.title.toLowerCase()} has been completed using AI-powered market data analysis, comparable sales research, and predictive modeling.`
          }}
        />
      );
    }

    // Use existing ReportSection for manual/complex sections
    return (
      <ReportSection 
        title={section.title}
        subtitle={section.subtitle}
        sectionIndex={currentStep}
        onNavigateToSection={navigateToSection}
      />
    );
  };

  return (
    <div className="w-full bg-background">
      {/* Sticky Header with Backdrop Blur */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {onBack ? (
              <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Property Setup
              </button>
            ) : (
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Dashboard
              </Link>
            )}
            <h1 className="text-2xl font-bold">{getPropertyTypeTitle()}</h1>
            <div className="text-sm text-muted-foreground text-right">
              <div>Section {currentStep + 1} of {sections.length}</div>
              <div className="text-xs">AI: {Math.round(completionProgress)}% complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <main className="w-full">
        <div className="px-6 py-8">
          {/* Full Width Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Progress Details */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                {sections[currentStep]?.title}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentStep + 1} / {sections.length} sections
              </div>
            </div>
          </div>

          {/* AI Enhancement Section */}
          {completionProgress >= 100 && (
            <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-blue-900">Enhance with AI</h2>
                </div>
                <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
                  Automated analysis complete! Enhance your {propertyType} property report with advanced AI insights 
                  for market analysis, risk assessment, sustainability evaluation, and location analysis.
                </p>
                <Button 
                  onClick={handleAIEnhance}
                  disabled={isAIEnhancing}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  {isAIEnhancing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enhancing Report...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Enhance Report with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Main Report Content */}
          <div className="w-full">
            {renderSectionContent()}
          </div>

          {/* Section Navigation Tabs */}
          <div className="mt-8">
            <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))} className="w-full">
              <TabsList className="grid w-full grid-cols-4 md:grid-cols-6 lg:grid-cols-8 mb-6">
                {sections.slice(0, 8).map((section, index) => (
                  <TabsTrigger 
                    key={index} 
                    value={index.toString()}
                    className="text-xs relative"
                  >
                    {section.title.split(' ')[0]}
                    {/* Show automation status */}
                    {section.automated && completedSections.has(index) && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white" />
                    )}
                    {section.automated && processingSections.has(index) && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-white animate-pulse" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Mobile Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={prevSection}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-colors flex-shrink-0 relative ${
                  index === currentStep
                    ? "bg-primary"
                    : index < currentStep
                    ? "bg-primary/60"
                    : "bg-muted"
                }`}
                aria-label={`Go to section ${index + 1}: ${section.title}`}
              >
                {/* Show automation status */}
                {section.automated && completedSections.has(index) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white" />
                )}
                {section.automated && processingSections.has(index) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-white animate-pulse" />
                )}
              </button>
            ))}
          </div>

          <Button
            onClick={nextSection}
            disabled={currentStep === sections.length - 1}
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

export default AutomatedReport;