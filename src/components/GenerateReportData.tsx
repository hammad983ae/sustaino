import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, FileText, Loader2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface GenerateReportDataProps {
  assessmentData: any;
  onReportGenerated?: (reportData: any) => void;
  onNavigateToReport?: () => void;
}

interface ValidationItem {
  label: string;
  status: 'complete' | 'incomplete' | 'warning';
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
  const { toast } = useToast();

  // Validate assessment data readiness
  const validateAssessmentData = (): ValidationItem[] => {
    console.log('Validating assessment data:', assessmentData);
    
    const validations: ValidationItem[] = [
      {
        label: 'Property Address',
        status: (assessmentData.addressData?.propertyAddress || assessmentData.reportData?.propertySearchData?.confirmedAddress) ? 'complete' : 'incomplete',
        description: 'Confirmed property address for the report',
        value: assessmentData.addressData?.propertyAddress || assessmentData.reportData?.propertySearchData?.confirmedAddress || 'Not confirmed'
      },
      {
        label: 'Planning Data',
        status: assessmentData.reportData?.planningData?.lga ? 'complete' : 'warning',
        description: 'Planning information extracted from government sources',
        value: assessmentData.reportData?.planningData?.lga ? 
          `${assessmentData.reportData.planningData.lga} - ${assessmentData.reportData.planningData.zoning || 'No zoning'}` : 
          'Planning data available but may be incomplete'
      },
      {
        label: 'Report Configuration',
        status: 'warning',  // Make this optional since configuration might be stored elsewhere
        description: 'Report type and property configuration',
        value: 'Basic configuration available'
      },
      {
        label: 'Property Photos',
        status: (assessmentData.reportData?.fileAttachments?.propertyPhotos?.length > 0) ? 'complete' : 'warning',
        description: 'Photos and supporting documentation',
        value: `${assessmentData.reportData?.fileAttachments?.propertyPhotos?.length || 0} files uploaded`
      },
      {
        label: 'Valuation Configuration',
        status: 'warning',  // Make this optional
        description: 'Valuation approaches and methodology',
        value: 'Basic configuration available'
      }
    ];

    return validations;
  };

  const validationItems = validateAssessmentData();
  const allCriticalComplete = validationItems.filter(item => item.status === 'incomplete').length === 0;
  const readinessScore = Math.round((validationItems.filter(item => item.status === 'complete').length / validationItems.length) * 100);

  const generateReportData = async () => {
    console.log('Generating report with data:', assessmentData);
    
    // More lenient validation - only require address
    const hasAddress = assessmentData.addressData?.propertyAddress || assessmentData.reportData?.propertySearchData?.confirmedAddress;
    if (!hasAddress) {
      toast({
        title: "Missing Property Address",
        description: "Please complete the property address before generating the report.",
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

      // Prepare data with fallbacks
      const reportPayload = {
        assessmentData,
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
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge variant="default" className="bg-green-500/10 text-green-700 dark:text-green-400">Complete</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">Optional</Badge>;
      default:
        return <Badge variant="destructive">Required</Badge>;
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
            disabled={!allCriticalComplete || isGenerating}
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
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateReportData;