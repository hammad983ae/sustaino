import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUnifiedDataManager } from '@/hooks/useUnifiedDataManager';
import { useReportData } from '@/contexts/ReportDataContext';

interface PAFReviewScreenProps {
  jobId: string;
}

interface DataReadiness {
  section: string;
  label: string;
  status: 'supplied' | 'investigation_required' | 'optional';
  completeness: number;
  hasData: boolean;
  required: boolean;
}

export default function PAFReviewScreen({ jobId }: PAFReviewScreenProps) {
  const [assessmentData, setAssessmentData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { getAllData } = useUnifiedDataManager();
  const { reportData, updateReportData } = useReportData();

  // Load all PAF data on component mount
  useEffect(() => {
    const loadPAFData = async () => {
      try {
        setLoading(true);
        
        // Get all PAF workflow data
        const unifiedData = await getAllData();
        console.log('Loading PAF data for review:', unifiedData);
        
        // Get existing property assessment record
        const { data: existingAssessment } = await supabase
          .from('property_assessments')
          .select('*')
          .eq('job_id', jobId)
          .maybeSingle();

        // Access the actual report data from unified structure
        const reportData = unifiedData?.reportData || {};
        const componentData = unifiedData?.componentData || {};
        
        // Compile comprehensive assessment data by checking both reportData and componentData
        const compiledData = {
          ...existingAssessment,
          unifiedData,
          reportSections: {
            // Section 2: RPD and Location - check multiple possible sources
            rpdAndLocation: reportData.propertySearchData || 
                           reportData.locationData || 
                           componentData.propertySearchData ||
                           componentData.locationData,
            
            // Section 3: Legal and Planning
            legalAndPlanning: reportData.planningData || 
                             reportData.legalAndPlanning ||
                             componentData.planningData ||
                             componentData.legalAndPlanning,
            
            // Section 4: Tenancy Schedule
            tenancyScheduleLeaseDetails: reportData.tenancyDetails || 
                                        componentData.tenancyDetails,
            
            // Section 6: Market Commentary
            marketCommentary: reportData.marketCommentary || 
                             componentData.marketCommentary,
            
            // Section 7: Property Details
            propertyDetails: reportData.propertyDetails || 
                           reportData.propertySearchData ||
                           componentData.propertyDetails ||
                           componentData.propertySearchData,
            
            // Section 8: Environmental Assessment
            environmentalAssessment: reportData.environmentalAssessment || 
                                   componentData.environmentalAssessment,
            
            // Section 10: Risk Assessment
            riskAssessmentMarketIndicators: reportData.riskAssessment || 
                                          componentData.riskAssessment,
            
            // Section 11: Sales History
            previousSalesHistoryAndCurrentSale: reportData.salesHistory || 
                                               componentData.salesHistory,
            
            // Annexures
            documentAttachments: reportData.fileAttachments || 
                               componentData.fileAttachments,
            
            // Valuation Certificate
            valuationCertificate: reportData.valuationCertificate || 
                                componentData.valuationCertificate,
            
            // Valuation Analysis
            valuationAnalysis: reportData.valuationAnalysis || 
                             componentData.valuationAnalysis,
            
            // Report Configuration
            reportConfig: reportData.reportConfig || 
                         componentData.reportConfig,
            
            // Professional Declarations
            professionalDeclarations: reportData.professionalDeclarations || 
                                    componentData.professionalDeclarations,
            
            // Accounting and Financials
            accountingFinancials: reportData.accountingFinancials || 
                                componentData.accountingFinancials,
            
            // Sales and Leasing Recommendations
            salesLeasingRecommendations: reportData.salesLeasingRecommendations || 
                                       componentData.salesLeasingRecommendations
          }
        };

        setAssessmentData(compiledData);
        
        // Update report context with compiled data
        Object.entries(compiledData.reportSections).forEach(([key, value]) => {
          if (value) {
            updateReportData(key as any, value);
          }
        });

        console.log('Compiled assessment data:', compiledData);
        
      } catch (error) {
        console.error('Error loading PAF data:', error);
        toast({
          title: "Error",
          description: "Failed to load assessment data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadPAFData();
  }, [jobId, getAllData, updateReportData, toast]);

  // Calculate data readiness
  const calculateDataReadiness = (): DataReadiness[] => {
    const sections: DataReadiness[] = [
      {
        section: 'rpdAndLocation',
        label: 'Section 2: RPD and Location',
        status: assessmentData.reportSections?.rpdAndLocation ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.rpdAndLocation ? 100 : 0,
        hasData: !!assessmentData.reportSections?.rpdAndLocation,
        required: true
      },
      {
        section: 'legalAndPlanning',
        label: 'Section 3: Legal and Planning',
        status: assessmentData.reportSections?.legalAndPlanning ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.legalAndPlanning ? 100 : 0,
        hasData: !!assessmentData.reportSections?.legalAndPlanning,
        required: true
      },
      {
        section: 'tenancySchedule',
        label: 'Section 4: Tenancy Schedule',
        status: assessmentData.reportSections?.tenancyScheduleLeaseDetails ? 'supplied' : 'optional',
        completeness: assessmentData.reportSections?.tenancyScheduleLeaseDetails ? 100 : 0,
        hasData: !!assessmentData.reportSections?.tenancyScheduleLeaseDetails,
        required: false
      },
      {
        section: 'marketCommentary',
        label: 'Section 6: Market Commentary',
        status: assessmentData.reportSections?.marketCommentary ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.marketCommentary ? 100 : 0,
        hasData: !!assessmentData.reportSections?.marketCommentary,
        required: true
      },
      {
        section: 'propertyDetails',
        label: 'Section 7: Property Details',
        status: assessmentData.reportSections?.propertyDetails ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.propertyDetails ? 100 : 0,
        hasData: !!assessmentData.reportSections?.propertyDetails,
        required: true
      },
      {
        section: 'environmental',
        label: 'Section 8: Environmental',
        status: assessmentData.reportSections?.environmentalAssessment ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.environmentalAssessment ? 100 : 0,
        hasData: !!assessmentData.reportSections?.environmentalAssessment,
        required: true
      },
      {
        section: 'riskAssessment',
        label: 'Section 10: Risk Assessment',
        status: assessmentData.reportSections?.riskAssessmentMarketIndicators ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.riskAssessmentMarketIndicators ? 100 : 0,
        hasData: !!assessmentData.reportSections?.riskAssessmentMarketIndicators,
        required: true
      }
    ];

    return sections;
  };

  const dataReadiness = calculateDataReadiness();
  const overallReadiness = Math.round(
    (dataReadiness.filter(s => s.hasData).length / dataReadiness.length) * 100
  );

  const generateFullAssessmentReport = async () => {
    setGenerating(true);
    try {
      // Store compiled report data in localStorage for report generation
      const reportData = {
        jobId,
        reportSections: assessmentData.reportSections,
        reportConfig: assessmentData.reportSections?.reportConfig || {},
        unifiedData: assessmentData.unifiedData
      };

      localStorage.setItem('currentReportData', JSON.stringify(reportData));
      
      // Create or update property assessment record
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const assessmentRecord = {
        job_id: jobId,
        user_id: user.user.id,
        report_config: assessmentData.reportSections?.reportConfig || {},
        report_sections: assessmentData.reportSections,
        include_flags: {
          rpdAndLocation: !!assessmentData.reportSections?.rpdAndLocation,
          legalAndPlanning: !!assessmentData.reportSections?.legalAndPlanning,
          tenancySchedule: !!assessmentData.reportSections?.tenancyScheduleLeaseDetails,
          marketCommentary: !!assessmentData.reportSections?.marketCommentary,
          propertyDetails: !!assessmentData.reportSections?.propertyDetails,
          environmental: !!assessmentData.reportSections?.environmentalAssessment,
          riskAssessment: !!assessmentData.reportSections?.riskAssessmentMarketIndicators
        },
        status: 'ready_for_generation'
      };

      // Upsert the assessment record
      const { error: upsertError } = await supabase
        .from('property_assessments')
        .upsert(assessmentRecord, { 
          onConflict: 'job_id',
          ignoreDuplicates: false 
        });

      if (upsertError) {
        console.error('Error saving assessment:', upsertError);
        throw upsertError;
      }

      // Generate the report using the edge function
      const { data, error } = await supabase.functions.invoke('generate-report', {
        body: { job_id: jobId, reviewed: true }
      });

      if (error) {
        throw error;
      }

      setReportUrl(data.report_url);
      
      toast({
        title: "Success",
        description: "Full assessment report generated successfully! Work Hub job created.",
      });

      // Navigate to report view after short delay
      setTimeout(() => {
        window.location.href = '/report';
      }, 2000);

    } catch (error: any) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate assessment report",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <div className="text-muted-foreground">Loading assessment data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Data Readiness Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Data Readiness Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Overall Progress</span>
            <Badge variant={overallReadiness >= 80 ? "default" : overallReadiness >= 50 ? "secondary" : "destructive"}>
              {overallReadiness}% Ready
            </Badge>
          </div>
          
          <div className="grid gap-3">
            {dataReadiness.map((item) => (
              <div key={item.section} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {item.hasData ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                  )}
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {item.status.replace('_', ' ')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Data Completeness</div>
                  <div className="text-sm text-muted-foreground">{item.completeness}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Data Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Property Address</Label>
              <div className="text-sm text-muted-foreground">
                {assessmentData.reportSections?.rpdAndLocation?.address || 
                 assessmentData.reportSections?.propertyDetails?.propertyAddress ||
                 'Not provided'}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Report Type</Label>
              <div className="text-sm text-muted-foreground">
                {assessmentData.reportSections?.reportConfig?.reportType || 'Standard Valuation'}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Property Type</Label>
              <div className="text-sm text-muted-foreground">
                {assessmentData.reportSections?.reportConfig?.propertyType || 
                 assessmentData.reportSections?.propertyDetails?.propertyType || 
                 'Not specified'}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Sections Ready</Label>
              <div className="text-sm text-muted-foreground">
                {dataReadiness.filter(s => s.hasData).length} of {dataReadiness.length} sections
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate Report Section */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Full Assessment Report</CardTitle>
          <p className="text-sm text-muted-foreground">
            This will create a Work Hub job and pre-populate all report sections with your assessment data
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {overallReadiness < 50 && (
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Low Data Completeness</span>
              </div>
              <p className="text-sm text-orange-600 mt-1">
                Consider completing more sections for a comprehensive report
              </p>
            </div>
          )}

          <Button
            onClick={generateFullAssessmentReport}
            disabled={generating}
            className="w-full"
            size="lg"
          >
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Report...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Generate Full Assessment Report
              </>
            )}
          </Button>

          {reportUrl && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Report Generated Successfully</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Redirecting to full report view...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}