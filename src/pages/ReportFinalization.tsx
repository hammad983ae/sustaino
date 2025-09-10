import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Eye, 
  Settings, 
  ChevronLeft,
  Download,
  Loader2,
  Info
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useReportData } from "@/hooks/useReportData";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import WhiteLabelHeader from "@/components/WhiteLabelHeader";

interface SectionAnalysis {
  sectionIndex: number;
  sectionKey: string;
  sectionTitle: string;
  completionRate: number;
  totalFields: number;
  completedFieldsCount: number;
  missingFieldsCount: number;
  missingFields: Array<{
    key: string;
    label: string;
    type: string;
    required: boolean;
    suggestion: string;
  }>;
  extractedFields: Array<{
    key: string;
    label: string;
    value: any;
  }>;
  isIncluded: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface MissingFieldsData {
  overallCompletion: number;
  totalSections: number;
  sectionsWithMissingFields: number;
  sectionAnalysis: SectionAnalysis[];
  recommendations: Array<{
    type: string;
    title: string;
    description: string;
    sections: string[];
  }>;
}

const ReportFinalization = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { reportData } = useReportData();
  
  const [missingFieldsData, setMissingFieldsData] = useState<MissingFieldsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sectionInclusions, setSectionInclusions] = useState<{ [key: string]: boolean }>({});

  // Report sections mapping
  const reportSections = [
    { key: 'executiveSummary', title: 'Executive Summary and Contents' },
    { key: 'rpdLocation', title: 'RPD and Location' },
    { key: 'legalAndPlanning', title: 'Legal and Planning' },
    { key: 'tenancySchedule', title: 'Tenancy Schedule/Lease Details' },
    { key: 'statutoryAssessment', title: 'Statutory Assessment' },
    { key: 'marketCommentary', title: 'Market Commentary' },
    { key: 'propertyDetails', title: 'Property Details' },
    { key: 'plantEquipment', title: 'Plant and Equipment' },
    { key: 'rentDetermination', title: 'Rent Determination' },
    { key: 'esgAssessment', title: 'ESG Assessment and Audit' },
    { key: 'essentialRepairs', title: 'Essential Repairs' },
    { key: 'riskAssessment', title: 'Risk Assessment & Market Indicators' },
    { key: 'salesHistory', title: 'Previous Sales History and Current Sale' },
    { key: 'salesEvidence', title: 'Sales Evidence' },
    { key: 'leasingEvidence', title: 'Leasing Evidence' },
    { key: 'valuationAnalysis', title: 'Valuation Analysis and Rationale' },
    { key: 'marketability', title: 'Marketability and Mortgage Security' },
    { key: 'sustainoPro', title: 'Sustaino Pro Additional Analysis' },
    { key: 'valuationCertificate', title: 'Valuation Certificate' },
    { key: 'additionalComments', title: 'Additional Comments & Strategic Recommendations' },
    { key: 'qualifications', title: 'Qualifications, Disclaimers, Terms and Conditions' },
    { key: 'annexures', title: 'Annexures' },
    { key: 'security', title: 'Security and Certificates' }
  ];

  useEffect(() => {
    analyzeMissingFields();
  }, [reportData]);

  const analyzeMissingFields = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('missing-fields', {
        body: {
          reportData,
          reportSections
        }
      });

      if (error) {
        console.error('Error analyzing missing fields:', error);
        toast({
          title: "Analysis Error",
          description: "Unable to analyze report completeness",
          variant: "destructive"
        });
        return;
      }

      if (data.success) {
        setMissingFieldsData(data.data);
        
        // Initialize section inclusions (all enabled by default)
        const initialInclusions: { [key: string]: boolean } = {};
        data.data.sectionAnalysis.forEach((section: SectionAnalysis) => {
          initialInclusions[section.sectionKey] = section.isIncluded;
        });
        setSectionInclusions(initialInclusions);
        
        toast({
          title: "Analysis Complete",
          description: `Report is ${data.data.overallCompletion}% complete`,
          duration: 3000
        });
      }
    } catch (error) {
      console.error('Failed to analyze missing fields:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to complete report analysis",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSectionInclusion = (sectionKey: string) => {
    setSectionInclusions(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Filter included sections
    const includedSections = Object.entries(sectionInclusions)
      .filter(([_, included]) => included)
      .map(([key, _]) => key);
    
    try {
      // Here you would generate the final report with only included sections
      toast({
        title: "Report Generated!",
        description: `Generated report with ${includedSections.length} sections`,
        duration: 3000
      });
      
      // Navigate to preview or download
      navigate('/report', { state: { viewMode: 'preview', includedSections } });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Unable to generate the final report",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionBadgeVariant = (rate: number) => {
    if (rate >= 80) return 'default';
    if (rate >= 50) return 'secondary';
    return 'destructive';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <WhiteLabelHeader />
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Analyzing report completeness...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <WhiteLabelHeader />
      
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Report Finalization</h1>
            <p className="text-muted-foreground mt-2">
              Review and customize your report before final generation
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/report">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Edit
              </Link>
            </Button>
          </div>
        </div>

        {/* Overall Stats */}
        {missingFieldsData && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Report Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {missingFieldsData.overallCompletion}%
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {missingFieldsData.totalSections}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Sections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {missingFieldsData.totalSections - missingFieldsData.sectionsWithMissingFields}
                  </div>
                  <div className="text-sm text-muted-foreground">Complete Sections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {missingFieldsData.sectionsWithMissingFields}
                  </div>
                  <div className="text-sm text-muted-foreground">Need Attention</div>
                </div>
              </div>
              <Progress value={missingFieldsData.overallCompletion} className="h-2" />
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        {missingFieldsData?.recommendations && missingFieldsData.recommendations.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {missingFieldsData.recommendations.map((rec, index) => (
                <Alert key={index} className={rec.type === 'urgent' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{rec.title}</AlertTitle>
                  <AlertDescription>{rec.description}</AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="sections" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sections">Section Management</TabsTrigger>
            <TabsTrigger value="extracted">Extracted Data</TabsTrigger>
          </TabsList>

          <TabsContent value="sections">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Include/Exclude Report Sections
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Toggle sections on or off to customize your final report
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {missingFieldsData?.sectionAnalysis.map((section) => (
                    <div key={section.sectionKey} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={sectionInclusions[section.sectionKey] || false}
                          onCheckedChange={() => toggleSectionInclusion(section.sectionKey)}
                        />
                        <div>
                          <h4 className="font-medium">{section.sectionTitle}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={section.completionRate} className="w-24 h-2" />
                            <Badge variant={getCompletionBadgeVariant(section.completionRate)}>
                              {section.completionRate}%
                            </Badge>
                            {section.missingFieldsCount > 0 && (
                              <Badge variant="outline" className="text-yellow-600">
                                {section.missingFieldsCount} missing
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${getCompletionColor(section.completionRate)}`}>
                          {section.completedFieldsCount}/{section.totalFields} fields
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {section.priority === 'high' ? 'High Priority' : 'Standard'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="extracted">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Extracted Data Summary
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Review all data that has been captured for your report
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {missingFieldsData?.sectionAnalysis.map((section) => (
                    section.extractedFields && section.extractedFields.length > 0 && (
                      <div key={section.sectionKey} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {section.sectionTitle}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {section.extractedFields.map((field) => (
                            <div key={field.key} className="bg-muted/50 p-3 rounded">
                              <div className="font-medium text-sm">{field.label}</div>
                              <div className="text-sm text-muted-foreground truncate">
                                {typeof field.value === 'object' 
                                  ? JSON.stringify(field.value).substring(0, 100) + '...'
                                  : String(field.value).substring(0, 100) + (String(field.value).length > 100 ? '...' : '')
                                }
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => navigate('/report')}>
            Continue Editing
          </Button>
          <Button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="min-w-32"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Generate Final Report
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportFinalization;