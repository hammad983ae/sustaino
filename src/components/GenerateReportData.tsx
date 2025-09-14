import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useReportData } from '@/contexts/ReportDataContext';
import { useProperty } from '@/contexts/PropertyContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  Building,
  MapPin,
  Users,
  Database
} from 'lucide-react';

interface GenerateReportDataProps {
  onReportGenerated?: (data: any) => void;
  onNavigateToReport?: (reportId: string) => void;
  onNavigateToWorkHub?: (jobId: string) => void;
  clientInfo?: {
    instructingParty?: string;
    reliantParty?: string;
    clientEmail?: string;
    clientPhone?: string;
  };
}

interface GenerationResult {
  propertyId: string;
  jobId: string;
  reportId: string;
  jobNumber?: string;
  reportTitle: string;
  status: string;
  progress: number;
  sectionsPopulated: string[];
  nextSteps: string[];
}

const GenerateReportData: React.FC<GenerateReportDataProps> = ({
  onReportGenerated,
  onNavigateToReport,
  onNavigateToWorkHub,
  clientInfo
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const { toast } = useToast();
  const { reportData } = useReportData();
  const { addressData } = useProperty();

  // Validation function
  const validateRequiredData = (): string[] => {
    const errors: string[] = [];

    // Check address data
    if (!addressData.propertyAddress && !addressData.streetNumber) {
      errors.push('Property address is required');
    }

    // Check report configuration
    if (!reportData.reportConfig?.reportType) {
      errors.push('Report type must be selected');
    }

    if (!reportData.reportConfig?.propertyType) {
      errors.push('Property type must be selected');
    }

    if (!reportData.reportConfig?.valuationPurpose) {
      errors.push('Valuation purpose must be selected');
    }

    // Check minimum file attachments
    if (!reportData.fileAttachments?.propertyPhotos?.length) {
      errors.push('At least one property photo is required');
    }

    // Check client information
    if (!clientInfo?.instructingParty && !reportData.reportConfig?.instructingParty) {
      errors.push('Instructing party information is required');
    }

    return errors;
  };

  const handleGenerateReport = async () => {
    // Validate required data
    const errors = validateRequiredData();
    if (errors.length > 0) {
      setValidationErrors(errors);
      toast({
        title: "Validation Failed",
        description: `Please complete all required fields: ${errors.length} issues found`,
        variant: "destructive"
      });
      return;
    }

    setValidationErrors([]);
    setIsGenerating(true);

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error('Authentication required');
      }

      const response = await supabase.functions.invoke('generate-report-data', {
        body: {
          reportData,
          addressData,
          clientInfo: clientInfo || {
            instructingParty: reportData.reportConfig?.instructingParty,
            reliantParty: reportData.reportConfig?.reliantParty
          }
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to generate report data');
      }

      const result = response.data;
      
      if (!result.success) {
        throw new Error(result.error || 'Report generation failed');
      }

      setGenerationResult(result.data);
      
      toast({
        title: "Report Generated Successfully",
        description: `${result.data.sectionsPopulated.length} sections pre-populated. Work Hub job created.`,
      });

      // Call the callback if provided
      if (onReportGenerated) {
        onReportGenerated(result.data);
      }

    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate report data",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getDataReadinessScore = (): { score: number; total: number } => {
    let score = 0;
    const total = 7;

    if (addressData.propertyAddress || addressData.streetNumber) score++;
    if (reportData.reportConfig?.reportType) score++;
    if (reportData.reportConfig?.propertyType) score++;
    if (reportData.reportConfig?.valuationPurpose) score++;
    if (reportData.fileAttachments?.propertyPhotos?.length > 0) score++;
    if (reportData.planningData?.lga || reportData.planningData?.zoning) score++;
    if (clientInfo?.instructingParty || reportData.reportConfig?.instructingParty) score++;

    return { score, total };
  };

  const { score, total } = getDataReadinessScore();
  const readinessPercentage = Math.round((score / total) * 100);

  return (
    <div className="space-y-6">
      {/* Data Readiness Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-500" />
              Data Readiness Assessment
            </CardTitle>
            <Badge variant={readinessPercentage >= 85 ? "default" : "secondary"}>
              {readinessPercentage}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Property Address</span>
                {(addressData.propertyAddress || addressData.streetNumber) ? 
                  <CheckCircle className="h-4 w-4 text-green-500" /> : 
                  <AlertCircle className="h-4 w-4 text-red-500" />
                }
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                {addressData.propertyAddress || 'Not provided'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="text-sm font-medium">Report Configuration</span>
                {reportData.reportConfig?.reportType ? 
                  <CheckCircle className="h-4 w-4 text-green-500" /> : 
                  <AlertCircle className="h-4 w-4 text-red-500" />
                }
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                {reportData.reportConfig?.reportType || 'Not configured'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Property Photos</span>
                {reportData.fileAttachments?.propertyPhotos?.length > 0 ? 
                  <CheckCircle className="h-4 w-4 text-green-500" /> : 
                  <AlertCircle className="h-4 w-4 text-red-500" />
                }
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                {reportData.fileAttachments?.propertyPhotos?.length || 0} photos uploaded
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Client Information</span>
                {(clientInfo?.instructingParty || reportData.reportConfig?.instructingParty) ? 
                  <CheckCircle className="h-4 w-4 text-green-500" /> : 
                  <AlertCircle className="h-4 w-4 text-red-500" />
                }
              </div>
              <p className="text-xs text-muted-foreground pl-6">
                {clientInfo?.instructingParty || reportData.reportConfig?.instructingParty || 'Not provided'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-medium">Please resolve the following issues:</p>
              <ul className="list-disc list-inside text-sm">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Generation Result */}
      {generationResult && (
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              Report Generated Successfully
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Report Title</p>
                <p className="text-sm text-muted-foreground">{generationResult.reportTitle}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Progress</p>
                <p className="text-sm text-muted-foreground">{generationResult.progress}% Complete</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Pre-populated Sections</p>
              <div className="flex flex-wrap gap-1">
                {generationResult.sectionsPopulated.map((section, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {section}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Next Steps</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {generationResult.nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2 pt-2">
              {onNavigateToReport && (
                <Button 
                  onClick={() => onNavigateToReport(generationResult.reportId)}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Open Report
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              
              {onNavigateToWorkHub && (
                <Button 
                  variant="outline"
                  onClick={() => onNavigateToWorkHub(generationResult.jobId)}
                  className="flex items-center gap-2"
                >
                  <Building className="h-4 w-4" />
                  View in Work Hub
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generate Button */}
      <Card>
        <CardContent className="pt-6">
          <Button
            onClick={handleGenerateReport}
            disabled={isGenerating || readinessPercentage < 70}
            size="lg"
            className="w-full flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Report Data...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Generate Report Data & Create Work Hub Job
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
          
          {readinessPercentage < 70 && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Please complete more fields to enable report generation (minimum 70% required)
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateReportData;