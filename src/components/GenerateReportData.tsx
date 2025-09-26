import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, FileText, Loader2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AuthRequiredWrapper } from '@/components/AuthRequiredWrapper';

interface GenerateReportDataProps {
  assessmentData: any;
  onReportGenerated?: (reportData: any) => void;
  onNavigateToReport?: () => void;
}

interface ValidationItem {
  label: string;
  status: 'complete' | 'missing' | 'partial' | 'optional';
  description: string;
  value?: string;
}

const GenerateReportData: React.FC<GenerateReportDataProps> = ({
  assessmentData,
  onReportGenerated,
  onNavigateToReport
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState('');
  const [generatedReport, setGeneratedReport] = useState<any>(null);
  const [acknowledgedMissing, setAcknowledgedMissing] = useState<Set<string>>(new Set());
  const [quickDataEntry, setQuickDataEntry] = useState<Record<string, any>>({});
  const [showDataEntry, setShowDataEntry] = useState<string | false>(false);
  const { toast } = useToast();

  // Validate PAF workflow sections for pre-inspection report generation
  const validateAssessmentData = (): ValidationItem[] => {
    console.log('Validating PAF workflow assessment data:', assessmentData);
    
    const validations: ValidationItem[] = [
      // Section 2: RPD and Location (from PAF workflow)
      {
        label: '2. RPD and Location',
        status: (assessmentData.addressData?.propertyAddress || assessmentData.reportData?.propertySearchData?.confirmedAddress) && assessmentData.reportData?.locationData ? 'complete' : 'missing',
        description: 'Property identification and location data from PAF workflow',
        value: assessmentData.addressData?.propertyAddress || assessmentData.reportData?.propertySearchData?.confirmedAddress || 'Address not confirmed'
      },
      // Section 3: Legal and Planning (from PAF workflow)
      {
        label: '3. Legal and Planning',
        status: (assessmentData.reportData?.planningData?.lga && assessmentData.reportData?.planningData?.zoning) ? 'complete' : 'missing',
        description: 'Planning search and legal information from government portals',
        value: assessmentData.reportData?.planningData?.lga ? 
          `LGA: ${assessmentData.reportData.planningData.lga}, Zoning: ${assessmentData.reportData.planningData.zoning}` : 
          'Planning search required'
      },
      // Section 4: Tenancy Schedule/Lease Details (conditional - toggle if supplied)
      {
        label: '4. Tenancy Schedule/Lease Details',
        status: assessmentData.reportData?.tenancyData ? 'complete' : 
                assessmentData.reportData?.reportConfig?.propertyType?.includes('leasehold') ? 'missing' : 'optional',
        description: 'Tenancy information (toggle off if not applicable)',
        value: assessmentData.reportData?.tenancyData ? 'Tenancy data available' : 'Not applicable/Toggle off'
      },
      // Section 5: Statutory Assessment (conditional - toggle if supplied)
      {
        label: '5. Statutory Assessment',
        status: assessmentData.reportData?.statutoryData ? 'complete' : 'optional',
        description: 'Statutory assessment (toggle off if not required)',
        value: assessmentData.reportData?.statutoryData ? 'Statutory data available' : 'Toggle off if not required'
      },
      // Section 6: Market Commentary (from PAF workflow)
      {
        label: '6. Market Commentary',
        status: (assessmentData.reportData?.marketData?.indicators || assessmentData.reportData?.propertySearchData?.marketAnalysis) ? 'complete' : 'missing',
        description: 'Market analysis and commentary from PAF workflow',
        value: assessmentData.reportData?.marketData?.indicators ? 
          'Market data integrated' : 
          'Market analysis required'
      },
      // Section 7: Property Details (partial from PAF - working drawings, info provided, or full if virtual/desktop/kerbside)
      {
        label: '7. Property Details (Pre-Inspection)',
        status: (assessmentData.reportData?.propertyDetails || assessmentData.reportData?.workingDrawings) ? 'partial' : 'missing',
        description: 'Partial property information from PAF workflow (working drawings, provided info, or virtual inspection)',
        value: assessmentData.reportData?.propertyDetails ? 'Property info available' : 'Working drawings or provided information needed'
      },
      // Section 8: Environmental Statement and Sustainability Assessment (from EPA and government sites)
      {
        label: '8. Environmental & Sustainability Assessment',
        status: assessmentData.reportData?.environmentalData ? 'complete' : 'missing',
        description: 'Environmental data from EPA and government environmental sites',
        value: assessmentData.reportData?.environmentalData ? 'Environmental data available' : 'EPA data extraction required'
      },
      // Section 10: Risk Assessment (market, land, location, cashflow, management from PAF - excluding physical property)
      {
        label: '10. Risk Assessment (Pre-Physical Inspection)',
        status: assessmentData.reportData?.riskAssessment ? 'complete' : 'missing',
        description: 'Market, land, location, cashflow and management risk assessment from PAF workflow',
        value: assessmentData.reportData?.riskAssessment ? 'Risk data available' : 'Risk assessment required'
      },
      // Section 11: Previous Sales History and Current Sale (from RP data and contract if supplied)
      {
        label: '11. Previous Sales History and Current Sale',
        status: assessmentData.reportData?.salesHistory ? 'complete' : 'missing',
        description: 'Previous sales history from RP data and current sale (if contract supplied)',
        value: assessmentData.reportData?.salesHistory ? 'Sales history available' : 'RP data extraction required'
      },
      // Sections 18-20: Annexures (documents, planning maps, etc. from PAF)
      {
        label: '18-20. Annexures & Documentation',
        status: (assessmentData.reportData?.fileAttachments || assessmentData.reportData?.planningMaps) ? 'complete' : 'missing',
        description: 'Annexures including documents, planning maps and certificates from PAF workflow',
        value: assessmentData.reportData?.fileAttachments ? 
          `${Object.keys(assessmentData.reportData.fileAttachments).length} files attached` : 
          'Documents and annexures required'
      },
      // ESG Assessment (separate section if information provided)
      {
        label: 'Sustainability Assessment (Separate Section)',
        status: assessmentData.reportData?.esgData?.completed ? 'complete' : 'optional',
        description: 'ESG/Sustainability assessment in separate section (if information provided)',
        value: assessmentData.reportData?.esgData?.completed ? 
          `ESG Score: ${assessmentData.reportData.esgData.overallScore}/100` : 
          'Optional - can be completed if information provided'
      }
    ];

    return validations;
  };

  const validationItems = validateAssessmentData();
  const missingItems = validationItems.filter(item => item.status === 'missing');
  const acknowledgedItems = missingItems.filter(item => acknowledgedMissing.has(item.label));
  const unacknowledgedMissing = missingItems.filter(item => !acknowledgedMissing.has(item.label));
  const criticalItems = validationItems.filter(item => item.status !== 'optional');
  const completedCritical = criticalItems.filter(item => item.status === 'complete').length;
  const readinessScore = Math.round((completedCritical / criticalItems.length) * 100);
  const canGenerate = unacknowledgedMissing.length === 0; // Can generate if all missing items are acknowledged
  
  console.log('Generate Report Data - Current state:', { 
    missingItems: missingItems.length, 
    acknowledgedItems: acknowledgedItems.length,
    unacknowledgedMissing: unacknowledgedMissing.length,
    canGenerate 
  });

  const handleAcknowledgeMissing = (itemLabel: string) => {
    console.log('Acknowledging missing item:', itemLabel);
    setAcknowledgedMissing(prev => {
      const updated = new Set([...prev, itemLabel]);
      console.log('Updated acknowledged items:', Array.from(updated));
      return updated;
    });
  };

  const handleProvideData = (itemLabel: string, data: any) => {
    setQuickDataEntry(prev => ({ ...prev, [itemLabel]: data }));
    setAcknowledgedMissing(prev => new Set([...prev, itemLabel]));
  };

  const generateReportData = async () => {
    console.log('Generating report with data:', assessmentData);
    
    // Only require address - everything else can be acknowledged as missing
    const hasAddress = assessmentData.addressData?.propertyAddress || assessmentData.reportData?.propertySearchData?.confirmedAddress;

    if (!hasAddress) {
      toast({
        title: "Property Address Required",
        description: "A property address is required to generate the report.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Stage 1: Validating data
      setGenerationStage('Validating assessment data...');
      setGenerationProgress(20);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Stage 2: Creating property record
      setGenerationStage('Creating property record...');
      setGenerationProgress(40);
      await new Promise(resolve => setTimeout(resolve, 600));

      // Stage 3: Generating Work Hub job
      setGenerationStage('Creating Work Hub tracking job...');
      setGenerationProgress(60);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Stage 4: Pre-populating report sections
      setGenerationStage('Pre-populating report sections...');
      setGenerationProgress(80);

      // Prepare data with fallbacks and quick entry data
      const enhancedAssessmentData = {
        ...assessmentData,
        quickDataEntry,
        acknowledgedMissing: Array.from(acknowledgedMissing)
      };

      const reportPayload = {
        assessmentData: enhancedAssessmentData,
        reportType: assessmentData.reportData?.reportConfig?.reportType || 'desktop-report',
        propertyType: assessmentData.reportData?.reportConfig?.propertyType || 'residential',
        propertyAddress: hasAddress,
        timestamp: Date.now()
      };

      console.log('Sending payload to edge function:', reportPayload);

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('generate-report-data', {
        body: reportPayload
      });

      console.log('Edge function response:', { data, error });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Edge function failed');
      }

      if (!data || !data.success) {
        console.error('Edge function returned unsuccessful:', data);
        throw new Error(data?.error || 'Failed to generate report');
      }

      // Stage 5: Finalizing
      setGenerationStage('Finalizing report generation...');
      setGenerationProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));

      setGeneratedReport(data.data);
      
      toast({
        title: "Report Generated Successfully",
        description: "Your assessment has been converted to a full report with pre-populated sections.",
      });

      if (onReportGenerated) {
        onReportGenerated(data.data);
      }

    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Generation Failed",
        description: `${error.message || "Failed to generate report. Please try again."} Check console for details.`,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setGenerationStage('');
      setGenerationProgress(0);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'partial':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'optional':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge variant="default" className="bg-green-500/10 text-green-700 dark:text-green-400">Complete</Badge>;
      case 'partial':
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-400">Partial</Badge>;
      case 'optional':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">Optional</Badge>;
      default:
        return <Badge variant="destructive" className="bg-red-500/10 text-red-700 dark:text-red-400">Required</Badge>;
    }
  };

  if (generatedReport) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <CardTitle className="text-green-700 dark:text-green-400">Work Hub Job Created Successfully</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">Work Hub Job Created Successfully</h4>
            <p className="text-sm text-green-700 dark:text-green-300 mb-3">
              Your property assessment has been successfully saved as a Work Hub job. You can continue with the remaining steps in this form or view the full report later.
            </p>
            <div className="space-y-2 text-xs text-green-600 dark:text-green-400">
              <div>• Property ID: {generatedReport.propertyId}</div>
              <div>• Work Hub Job ID: {generatedReport.workHubJobId}</div>
              <div>• Report ID: {generatedReport.reportId}</div>
            </div>
          </div>

          <div className="flex gap-2">
            {onNavigateToReport && (
              <Button 
                onClick={() => {
                  // Store the generated report data before navigating
                  localStorage.setItem('currentReportData', JSON.stringify(generatedReport));
                  onNavigateToReport();
                }} 
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                View Contents Page
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => window.open(`/work-hub`, '_blank')}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View in Work Hub
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Data Readiness Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Data Readiness Assessment
          </CardTitle>
          <div className="flex items-center gap-4">
            <Progress value={readinessScore} className="flex-1" />
            <Badge variant={readinessScore === 100 ? "default" : readinessScore >= 80 ? "secondary" : "destructive"}>
              {readinessScore}% Ready
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {validationItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border/50">
                {getStatusIcon(item.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{item.label}</span>
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{item.description}</p>
                  <p className="text-xs font-mono bg-muted/50 px-2 py-1 rounded truncate">
                    {item.value}
                  </p>
                  
                  {item.status === 'missing' && !acknowledgedMissing.has(item.label) && (
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAcknowledgeMissing(item.label)}
                      >
                        Acknowledge Missing
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setShowDataEntry(item.label)}
                      >
                        Provide Data
                      </Button>
                    </div>
                  )}
                  
                  {acknowledgedMissing.has(item.label) && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-400">
                        Acknowledged
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {isGenerating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating Report Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={generationProgress} className="w-full" />
            <p className="text-sm text-muted-foreground">{generationStage}</p>
          </CardContent>
        </Card>
      )}

      {/* Generate Button */}
      <Card>
        <CardContent className="pt-6">
          <Button 
            onClick={generateReportData}
            disabled={!canGenerate || isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Generate Full Assessment Report
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            This will create a Work Hub job and pre-populate all report sections with your assessment data
            {unacknowledgedMissing.length > 0 && (
              <span className="block text-orange-600 dark:text-orange-400 mt-1">
                Please acknowledge or provide missing data before generating the report
              </span>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const WrappedGenerateReportData = (props: GenerateReportDataProps) => (
  <AuthRequiredWrapper 
    title="Report Generation - Authentication Required"
    description="Please sign in to generate complete property reports and save them to your Work Hub."
  >
    <GenerateReportData {...props} />
  </AuthRequiredWrapper>
);

export default WrappedGenerateReportData;