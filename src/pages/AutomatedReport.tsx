import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ReportSection from "@/components/ReportSection";
import AutomatedAnalysisSection from "@/components/AutomatedAnalysisSection";
import { getPropertyTypeReportSections, getAutomatedAnalysisDescription } from "@/components/PropertyTypeReportConfig";

interface AutomatedReportProps {
  propertyType: string;
  onBack?: () => void;
}

const AutomatedReport = ({ propertyType, onBack }: AutomatedReportProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [processingSections, setProcessingSections] = useState<Set<number>>(new Set());
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());

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
    setCurrentSection(sectionIndex);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const progress = ((currentSection + 1) / sections.length) * 100;
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

  const renderSectionContent = () => {
    const section = sections[currentSection];
    
    // Check if this is an automated section
    if (section.automated) {
      return (
        <AutomatedAnalysisSection
          title={section.title}
          description={section.description || getAutomatedAnalysisDescription(propertyType)}
          isCompleted={completedSections.has(currentSection)}
          isProcessing={processingSections.has(currentSection)}
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
        sectionIndex={currentSection}
        onNavigateToSection={navigateToSection}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with automation progress */}
      <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack ? (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            ) : (
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <div>
              <h1 className="text-lg font-semibold truncate">
                {getPropertyTypeTitle()}
              </h1>
              <p className="text-xs text-muted-foreground">
                Section {currentSection + 1}: {sections[currentSection].title}
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-right">
            <div>{currentSection + 1} of {sections.length}</div>
            <div className="text-xs">
              AI: {Math.round(completionProgress)}% complete
            </div>
          </div>
        </div>
        
        {/* Section Progress */}
        <Progress value={progress} className="w-full" />
        
        {/* Automation Progress */}
        {completionProgress < 100 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-800">AI Analysis in Progress</span>
              <span className="text-blue-600">{Math.round(completionProgress)}% complete</span>
            </div>
            <Progress value={completionProgress} className="w-full mt-2 bg-blue-100" />
          </div>
        )}
      </div>

      {/* Report content */}
      <div className="p-4 pb-24">
        <div className="max-w-4xl mx-auto">
          {renderSectionContent()}
        </div>
      </div>

      {/* Mobile-friendly navigation footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={prevSection}
            disabled={currentSection === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`w-2 h-2 rounded-full transition-colors flex-shrink-0 relative ${
                  index === currentSection
                    ? "bg-primary"
                    : index < currentSection
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
            disabled={currentSection === sections.length - 1}
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