import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Home, Save, Eye, FileText, Play } from "lucide-react";
import { Link } from "react-router-dom";
import ReportSection from "@/components/ReportSection";
import ReportGenerator from "@/components/ReportGenerator";
import AIReportPresentation from "@/components/AIReportPresentation";
import WhiteLabelHeader from "@/components/WhiteLabelHeader";
import { useReportData } from "@/hooks/useReportData";
import { useReportJobSaver } from "@/hooks/useReportJobSaver";
import { useToast } from "@/hooks/use-toast";

const ReportViewer = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'presentation'>('edit');
  const [propertyAddress, setPropertyAddress] = useState('');
  const { toast } = useToast();
  
  // Use the unified report data hook
  const { reportData, setReportData, loadFromStorage, saveToStorage } = useReportData();

  // Auto-save to Work Hub
  const { saveNow, loadSavedReport, markAsCompleted } = useReportJobSaver({
    reportData,
    currentSection,
    propertyAddress,
    reportType: 'Property Report',
    enabled: true,
    autoSaveDelay: 5000
  });

  // Load saved progress on component mount
  useEffect(() => {
    // Check if continuing from Work Hub
    const continueData = localStorage.getItem('continue_report_data');
    if (continueData) {
      try {
        const parsedData = JSON.parse(continueData);
        setReportData(parsedData.reportData || {});
        setCurrentSection(parsedData.currentSection);
        setPropertyAddress(parsedData.propertyAddress);
        localStorage.removeItem('continue_report_data');
        toast({
          title: "Report resumed",
          description: "Continuing your report from Work Hub",
          duration: 3000,
        });
        return;
      } catch (error) {
        console.error('Failed to parse continue data:', error);
      }
    }

    const savedData = loadFromStorage();
    if (savedData) {
      // Extract property address from saved data if available
      const address = savedData.propertyDetails?.address || savedData.address || '';
      if (address) {
        setPropertyAddress(address);
      }
      toast({
        title: "Progress restored",
        description: "Your previous work has been restored",
        duration: 3000,
      });
    }
    
    // Load section progress from localStorage
    const savedSection = localStorage.getItem('report_current_section');
    if (savedSection) {
      setCurrentSection(parseInt(savedSection, 10) || 0);
    }

    // Try to load from Work Hub if no local data
    if (!savedData || Object.keys(savedData).length === 0) {
      loadSavedReport().then(workHubData => {
        if (workHubData) {
          setReportData(workHubData.reportData as any || {});
          setCurrentSection(workHubData.currentSection || 0);
          console.log('Loaded from Work Hub:', workHubData);
        }
      });
    }
  }, [loadFromStorage, loadSavedReport, setReportData, toast]);

  // Auto-save section progress
  useEffect(() => {
    localStorage.setItem('report_current_section', currentSection.toString());
  }, [currentSection]);

  // Auto-save report data when it changes
  useEffect(() => {
    if (Object.keys(reportData).length > 0) {
      const timeoutId = setTimeout(() => {
        saveToStorage();
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [reportData, saveToStorage]);

  // Update property address when report data changes
  useEffect(() => {
    const address = reportData.propertyDetails?.address || reportData.address || '';
    if (address && address !== propertyAddress) {
      setPropertyAddress(address);
    }
  }, [reportData, propertyAddress]);

  const sections = [
    { title: "Executive Summary and Contents" },
    { title: "RPD and Location" },
    { title: "Legal and Planning" },
    { title: "Tenancy Schedule/Lease Details" },
    { title: "Statutory Assessment" },
    { title: "Market Commentary" },
    { title: "Property Details" },
    { title: "Plant and Equipment" },
    { title: "Rent Determination" },
    { title: "ESG Assessment and Audit" },
    { title: "Essential Repairs" },
    { title: "Risk Assessment & Market Indicators" },
    { title: "Previous Sales History and Current Sale" },
    { title: "Sales Evidence", subtitle: "Commercial, Residential and Agricultural" },
    { title: "Leasing Evidence", subtitle: "Commercial, Residential and Agricultural" },
    { title: "Valuation Analysis and Rationale" },
    { title: "Marketability and Mortgage Security" },
    { title: "Sustaino Pro Additional Analysis and Features" },
    { title: "Valuation Certificate" },
    { title: "Qualifications, Disclaimers, Terms and Conditions" },
    { title: "Annexures" },
    { title: "Security and Certificates" }
  ];

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

  const handleShowPreview = () => {
    setViewMode('preview');
  };

  const handleShowPresentation = () => {
    setViewMode('presentation');
  };

  const handleBackToEdit = () => {
    setViewMode('edit');
  };

  const handleGenerateReport = async () => {
    // Mark report as completed in Work Hub
    await markAsCompleted();
    // Report generation logic here
    toast({
      title: "Report Generated Successfully",
      description: "Your comprehensive property report is ready for download",
      duration: 5000,
    });
  };

  const handlePresentationComplete = () => {
    setViewMode('edit');
    toast({
      title: "AI Analysis Complete",
      description: "Presentation finished. You can now continue with the detailed report.",
      duration: 3000,
    });
  };

  // Show AI Presentation
  if (viewMode === 'presentation') {
    return (
      <AIReportPresentation 
        propertyData={reportData}
        onComplete={handlePresentationComplete}
        onSkip={handleBackToEdit}
      />
    );
  }

  // Show Report Preview
  if (viewMode === 'preview') {
    return (
      <div className="min-h-screen bg-slate-100">
        <WhiteLabelHeader />
        <div className="max-w-6xl mx-auto bg-background border border-slate-300 shadow-lg min-h-screen">
          <div className="sticky top-0 z-10 bg-background border-b p-4">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold">Report Preview & Generate</h1>
              <Button variant="outline" onClick={handleBackToEdit}>
                <Eye className="h-4 w-4 mr-2" />
                Back to Editing
              </Button>
            </div>
          </div>
          <div className="p-4 max-w-6xl mx-auto">
            <ReportGenerator 
              reportData={reportData}
              onGenerate={handleGenerateReport}
              onClose={handleBackToEdit}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <WhiteLabelHeader />
      {/* Main content with dark border */}
      <div className="max-w-6xl mx-auto bg-background border border-slate-300 shadow-lg min-h-screen">
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
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={async () => {
                  saveToStorage();
                  await saveNow();
                }}
                className="flex items-center gap-1"
              >
                <Save className="h-3 w-3" />
                Save to Work Hub
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShowPresentation}
                className="flex items-center gap-1"
              >
                <Play className="h-3 w-3" />
                AI Preview
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleShowPreview}
                className="flex items-center gap-1"
              >
                <FileText className="h-3 w-3" />
                Preview & Generate
              </Button>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentSection + 1} of {sections.length}
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
            reportData={reportData}
            onDataChange={setReportData}
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
      </div>
    );
};

export default ReportViewer;