import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Home, Save, Mail, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import ReportSection from "@/components/ReportSection";
import { useProgressiveReportSaving } from "@/hooks/useProgressiveReportSaving";
import { Badge } from "@/components/ui/badge";
import ReportDataPrePopulation from "@/components/ReportDataPrePopulation";
import ReportDataLoader from "@/components/ReportDataLoader";
import { ValuationProvider } from "@/contexts/ValuationContext";
import { ReportDataProvider } from "@/contexts/ReportDataContext";
import PDFReportGenerator from "@/components/PDFReportGenerator";
import AIAnimationPreview from "@/components/AIAnimationPreview";
import { PropertyTypeLockProvider } from "@/components/PropertyTypeLockProvider";

const ReportViewer = () => {
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
    { title: "Climate Risk Assessment" },
    { title: "Valuation Analysis and Rationale" },
    { title: "Environmental Audit" },
    { title: "Marketability and Mortgage Security" },
    { title: "Sustaino Pro Additional Analysis and Features" },
    { title: "Valuation Certificate" },
    { title: "Qualifications, Disclaimers, Terms and Conditions" },
    
    { title: "Market Transaction Analysis", subtitle: "Detailed analysis during uncertain market conditions" },
    { title: "Annexures" },
    { title: "Certification and Security" }
  ];

  const [currentSection, setCurrentSection] = useState(0);
  const { saveReport, loadReport, clearReport } = useProgressiveReportSaving(currentSection, sections.length);
  const [lastSavedSection, setLastSavedSection] = useState<number | null>(null);

  // Load saved progress on component mount, but ensure it starts from section 0
  useEffect(() => {
    // Check for report data from Property Assessment Form
    const currentReportData = localStorage.getItem('currentReportData');
    if (currentReportData) {
      try {
        const reportData = JSON.parse(currentReportData);
        console.log('Loaded report data from Property Assessment:', reportData);
        // Clear the stored data to prevent reuse
        localStorage.removeItem('currentReportData');
        // Start from the first section with the new report data
        setCurrentSection(0);
        setLastSavedSection(null);
        return;
      } catch (error) {
        console.error('Error parsing report data:', error);
      }
    }
    
    const savedData = loadReport();
    if (savedData && savedData.currentSection >= 0) {
      // Allow loading saved progress only if it's valid
      setCurrentSection(Math.max(0, savedData.currentSection));
      setLastSavedSection(savedData.currentSection);
    } else {
      // Always start from section 0 if no valid saved data
      setCurrentSection(0);
    }
  }, [loadReport]);

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
    <PropertyTypeLockProvider>
      <ReportDataProvider>
        <ValuationProvider>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 transform perspective-1000"
             style={{ 
               background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--background)) 70%, hsl(var(--primary) / 0.05) 100%)',
               transform: 'perspective(1000px) rotateX(1deg)',
               transformStyle: 'preserve-3d'
             }}>
          {/* Load generated data into report context */}
          <ReportDataLoader />
          {/* Data Pre-population Component */}
          <ReportDataPrePopulation />
      {/* Mobile-friendly header with progress */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-background via-background to-primary/10 border-b border-primary/20 p-4 space-y-4 shadow-lg backdrop-blur-sm"
           style={{ 
             background: 'linear-gradient(90deg, hsl(var(--background)) 0%, hsl(var(--background)) 80%, hsl(var(--primary) / 0.1) 100%)',
             backdropFilter: 'blur(8px)'
           }}>
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
            {/* AI Animation Engine */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-emerald-600/10 hover:bg-emerald-600/20 border-emerald-600/20">
                  <Zap className="h-4 w-4 mr-1" />
                  AI Engine
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <AIAnimationPreview 
                  title="AI Report Generation Engine"
                  isActive={true}
                />
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" onClick={manualSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>

            {/* PDF & Email Report Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <Mail className="h-4 w-4 mr-1" />
                  Send
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <PDFReportGenerator />
              </DialogContent>
            </Dialog>

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

      {/* Fixed Navigation Bar below header */}
      <div className="sticky top-[120px] z-10 bg-gradient-to-r from-background via-background to-primary/10 border-b border-primary/20 p-3 shadow-sm backdrop-blur-sm"
           style={{ 
             background: 'linear-gradient(90deg, hsl(var(--background)) 0%, hsl(var(--background)) 80%, hsl(var(--primary) / 0.1) 100%)',
             backdropFilter: 'blur(8px)'
           }}>
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

      {/* Report content */}
      <div className="p-4 pb-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <ReportSection 
            title={sections[currentSection].title}
            subtitle={sections[currentSection].subtitle}
            sectionIndex={currentSection}
            onNavigateToSection={navigateToSection}
          />
        </div>
      </div>

      {/* Footer with back to setup navigation */}
      <div className="border-t border-primary/20 p-4 bg-gradient-to-r from-background via-background to-primary/5">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/automated-report">
            <Button variant="ghost" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Setup
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            Report Generation Complete
          </div>
        </div>
      </div>
        </div>
        </ValuationProvider>
      </ReportDataProvider>
    </PropertyTypeLockProvider>
  );
};

export default ReportViewer;