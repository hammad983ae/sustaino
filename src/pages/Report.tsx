import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Home, Save } from "lucide-react";
import { Link } from "react-router-dom";
import ReportSection from "@/components/ReportSection";
import { useProgressiveReportSaving } from "@/hooks/useProgressiveReportSaving";
import { Badge } from "@/components/ui/badge";

const ReportViewer = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const { saveReport, loadReport, clearReport } = useProgressiveReportSaving(currentSection, 21);
  const [lastSavedSection, setLastSavedSection] = useState<number | null>(null);

  // Load saved progress on component mount
  useEffect(() => {
    const savedData = loadReport();
    if (savedData) {
      setCurrentSection(savedData.currentSection);
      setLastSavedSection(savedData.currentSection);
    }
  }, [loadReport]);

  const sections = [
    { title: "Executive Summary and Contents" },
    { title: "RPD and Location" },
    { title: "Legal and Planning" },
    { title: "Tenancy Schedule/Lease Details" },
    { title: "Statutory Assessment" },
    { title: "Market Commentary" },
    { title: "Property Details" },
    { title: "Essential Repairs" },
    { title: "Risk Assessment & Market Indicators" },
    { title: "Previous Sales History and Current Sale" },
    { title: "Sales Evidence", subtitle: "Commercial, Residential and Agricultural" },
    { title: "Leasing Evidence", subtitle: "Commercial, Residential and Agricultural" },
    { title: "ESG Assessment Summary" },
    { title: "Valuation Analysis and Rationale" },
    { title: "Environmental Audit" },
    { title: "Marketability and Mortgage Security" },
    { title: "Sustaino Pro Additional Analysis and Features" },
    { title: "Valuation Certificate" },
    { title: "Qualifications, Disclaimers, Terms and Conditions" },
    { title: "Annexures" },
    { title: "Certification and Security" }
  ];

  const navigateToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      const newSection = currentSection + 1;
      setCurrentSection(newSection);
      
      // Auto-save progress every 5 sections
      if ((newSection + 1) % 5 === 0) {
        setLastSavedSection(newSection);
      }
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const manualSave = async () => {
    try {
      await saveReport({
        currentSection,
        completedSections: Array.from({ length: currentSection + 1 }, (_, i) => i),
        reportData: {
          manualSaveAt: new Date().toISOString(),
          sectionCount: currentSection + 1
        }
      });
      setLastSavedSection(currentSection);
    } catch (error) {
      console.error('Manual save failed:', error);
    }
  };

  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-friendly header with progress */}
      <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold truncate">
              Section {currentSection + 1}: {sections[currentSection].title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={manualSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            {lastSavedSection !== null && (
              <Badge variant="secondary" className="text-xs">
                Saved: Section {lastSavedSection + 1}
              </Badge>
            )}
            <div className="text-sm text-muted-foreground">
              {currentSection + 1} of {sections.length}
            </div>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Report content */}
      <div className="p-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <ReportSection 
            title={sections[currentSection].title}
            subtitle={sections[currentSection].subtitle}
            sectionIndex={currentSection}
            onNavigateToSection={navigateToSection}
          />
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
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`w-2 h-2 rounded-full transition-colors flex-shrink-0 ${
                  index === currentSection
                    ? "bg-primary"
                    : index < currentSection
                    ? "bg-primary/60"
                    : "bg-muted"
                }`}
                aria-label={`Go to section ${index + 1}`}
              />
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

export default ReportViewer;