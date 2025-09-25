import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertTriangle, FileText, Upload, X, Check } from 'lucide-react';
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
  acknowledged?: boolean;
  description?: string;
  toggledOff?: boolean;
}

interface SectionAcknowledgment {
  [key: string]: {
    acknowledged: boolean;
    reason: string;
    uploadedFiles?: string[];
  };
}

export default function PAFReviewScreen({ jobId }: PAFReviewScreenProps) {
  const [assessmentData, setAssessmentData] = useState<any>({});
  const [includeFlags, setIncludeFlags] = useState<Record<string, boolean>>({});
  const [acknowledgments, setAcknowledgments] = useState<SectionAcknowledgment>({});
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
        
        // Load include flags from report config or set defaults
        const reportConfig = compiledData.reportSections?.reportConfig || {};
        const defaultIncludeFlags = {
          rpdAndLocation: true,
          legalAndPlanning: true,
          tenancySchedule: false, // Optional by default
          statutoryAssessment: false, // Optional by default
          marketCommentary: true,
          propertyDetails: true,
          environmental: true,
          riskAssessment: true,
          salesHistory: true,
          annexures: true,
          sustainability: false // Optional by default
        };
        
        setIncludeFlags({
          ...defaultIncludeFlags,
          ...(typeof reportConfig.sections === 'object' ? reportConfig.sections : {}),
          ...(typeof compiledData.include_flags === 'object' ? compiledData.include_flags : {})
        });
        
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

  // Calculate data readiness with enhanced logic
  const calculateDataReadiness = (): DataReadiness[] => {
    const sections: DataReadiness[] = [
      {
        section: 'rpdAndLocation',
        label: 'Section 2: RPD and Location',
        status: assessmentData.reportSections?.rpdAndLocation ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.rpdAndLocation ? 100 : 0,
        hasData: !!assessmentData.reportSections?.rpdAndLocation,
        required: true,
        toggledOff: !includeFlags.rpdAndLocation,
        description: 'Property identification and location data from PAF workflow',
        acknowledged: acknowledgments.rpdAndLocation?.acknowledged
      },
      {
        section: 'legalAndPlanning',
        label: 'Section 3: Legal and Planning',
        status: assessmentData.reportSections?.legalAndPlanning ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.legalAndPlanning ? 100 : 0,
        hasData: !!assessmentData.reportSections?.legalAndPlanning,
        required: true,
        toggledOff: !includeFlags.legalAndPlanning,
        description: 'Planning search and legal information from government portals',
        acknowledged: acknowledgments.legalAndPlanning?.acknowledged
      },
      {
        section: 'tenancySchedule',
        label: 'Section 4: Tenancy Schedule/Lease Details',
        status: assessmentData.reportSections?.tenancyScheduleLeaseDetails ? 'supplied' : 'optional',
        completeness: assessmentData.reportSections?.tenancyScheduleLeaseDetails ? 100 : 0,
        hasData: !!assessmentData.reportSections?.tenancyScheduleLeaseDetails,
        required: false,
        toggledOff: !includeFlags.tenancySchedule,
        description: 'Tenancy information (toggle off if not applicable)',
        acknowledged: acknowledgments.tenancySchedule?.acknowledged
      },
      {
        section: 'statutoryAssessment',
        label: 'Section 5: Statutory Assessment',
        status: 'optional',
        completeness: 0,
        hasData: false,
        required: false,
        toggledOff: !includeFlags.statutoryAssessment,
        description: 'Statutory assessment (toggle off if not required)',
        acknowledged: acknowledgments.statutoryAssessment?.acknowledged
      },
      {
        section: 'marketCommentary',
        label: 'Section 6: Market Commentary',
        status: assessmentData.reportSections?.marketCommentary ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.marketCommentary ? 100 : 0,
        hasData: !!assessmentData.reportSections?.marketCommentary,
        required: true,
        toggledOff: !includeFlags.marketCommentary,
        description: 'Market analysis and commentary from PAF workflow',
        acknowledged: acknowledgments.marketCommentary?.acknowledged
      },
      {
        section: 'propertyDetails',
        label: 'Section 7: Property Details (Pre-Inspection)',
        status: assessmentData.reportSections?.propertyDetails ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.propertyDetails ? 100 : 0,
        hasData: !!assessmentData.reportSections?.propertyDetails,
        required: true,
        toggledOff: !includeFlags.propertyDetails,
        description: 'Partial property information from PAF workflow (working drawings, provided info, or virtual inspection)',
        acknowledged: acknowledgments.propertyDetails?.acknowledged
      },
      {
        section: 'environmental',
        label: 'Section 8: Environmental & Sustainability Assessment',
        status: assessmentData.reportSections?.environmentalAssessment ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.environmentalAssessment ? 100 : 0,
        hasData: !!assessmentData.reportSections?.environmentalAssessment,
        required: true,
        toggledOff: !includeFlags.environmental,
        description: 'Environmental data from EPA and government environmental sites',
        acknowledged: acknowledgments.environmental?.acknowledged
      },
      {
        section: 'riskAssessment',
        label: 'Section 10: Risk Assessment (Pre-Physical Inspection)',
        status: assessmentData.reportSections?.riskAssessmentMarketIndicators ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.riskAssessmentMarketIndicators ? 100 : 0,
        hasData: !!assessmentData.reportSections?.riskAssessmentMarketIndicators,
        required: true,
        toggledOff: !includeFlags.riskAssessment,
        description: 'Market, land, location, cashflow and management risk assessment from PAF workflow',
        acknowledged: acknowledgments.riskAssessment?.acknowledged
      },
      {
        section: 'salesHistory',
        label: 'Section 11: Previous Sales History and Current Sale',
        status: assessmentData.reportSections?.previousSalesHistoryAndCurrentSale ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.previousSalesHistoryAndCurrentSale ? 100 : 0,
        hasData: !!assessmentData.reportSections?.previousSalesHistoryAndCurrentSale,
        required: true,
        toggledOff: !includeFlags.salesHistory,
        description: 'Previous sales history from RP data and current sale (if contract supplied)',
        acknowledged: acknowledgments.salesHistory?.acknowledged
      },
      {
        section: 'annexures',
        label: 'Section 18-20: Annexures & Documentation',
        status: assessmentData.reportSections?.documentAttachments ? 'supplied' : 'investigation_required',
        completeness: assessmentData.reportSections?.documentAttachments ? 100 : 0,
        hasData: !!assessmentData.reportSections?.documentAttachments,
        required: true,
        toggledOff: !includeFlags.annexures,
        description: 'Annexures including documents, planning maps and certificates from PAF workflow',
        acknowledged: acknowledgments.annexures?.acknowledged
      },
      {
        section: 'sustainability',
        label: 'Sustainability Assessment (Separate Section)',
        status: 'optional',
        completeness: 0,
        hasData: false,
        required: false,
        toggledOff: !includeFlags.sustainability,
        description: 'ESG/Sustainability assessment in separate section (if information provided)',
        acknowledged: acknowledgments.sustainability?.acknowledged
      }
    ];

    return sections;
  };

  const dataReadiness = calculateDataReadiness();
  const includedSections = dataReadiness.filter(s => !s.toggledOff);
  const overallReadiness = includedSections.length > 0 ? Math.round(
    (includedSections.filter(s => s.hasData || s.acknowledged).length / includedSections.length) * 100
  ) : 0;

  // Handle section toggle
  const handleSectionToggle = (section: string, included: boolean) => {
    setIncludeFlags(prev => ({
      ...prev,
      [section]: included
    }));
  };

  // Handle acknowledgment
  const handleAcknowledgment = (section: string, acknowledged: boolean, reason?: string) => {
    setAcknowledgments(prev => ({
      ...prev,
      [section]: {
        acknowledged,
        reason: reason || (acknowledged ? 'Data acknowledged as missing' : ''),
        uploadedFiles: prev[section]?.uploadedFiles || []
      }
    }));
  };

  // Check if ready to generate
  const canGenerate = () => {
    const requiredSections = includedSections.filter(s => s.required);
    const unmetRequirements = requiredSections.filter(s => !s.hasData && !s.acknowledged);
    return unmetRequirements.length === 0;
  };

  const generateFullAssessmentReport = async () => {
    if (!canGenerate()) {
      toast({
        title: "Cannot Generate Report",
        description: "Please acknowledge missing data or provide required information before generating",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    try {
      // Store compiled report data with include flags and acknowledgments
      const reportData = {
        jobId,
        reportSections: assessmentData.reportSections,
        reportConfig: assessmentData.reportSections?.reportConfig || {},
        unifiedData: assessmentData.unifiedData,
        includeFlags,
        acknowledgments,
        readinessScore: overallReadiness
      };

      localStorage.setItem('currentReportData', JSON.stringify(reportData));
      
      // Create or update property assessment record
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const assessmentRecord = {
        job_id: jobId,
        user_id: user.user.id,
        report_config: {
          ...assessmentData.reportSections?.reportConfig,
          sections: includeFlags,
          acknowledgments
        },
        report_sections: assessmentData.reportSections,
        include_flags: includeFlags,
        acknowledgments,
        status: 'ready_for_generation',
        readiness_score: overallReadiness
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
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Overall Progress</span>
            <Badge variant={overallReadiness >= 80 ? "default" : overallReadiness >= 50 ? "secondary" : "destructive"}>
              {overallReadiness}% Ready
            </Badge>
          </div>
          
          <div className="grid gap-4">
            {dataReadiness.map((item) => (
              <Card key={item.section} className={`border ${item.toggledOff ? 'bg-muted/50' : ''}`}>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Section Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {item.hasData ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                        ) : item.acknowledged ? (
                          <Check className="h-5 w-5 text-blue-600 mt-1" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-orange-500 mt-1" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{item.label}</h4>
                            {item.required && (
                              <Badge variant="secondary" className="text-xs">Required</Badge>
                            )}
                            {!item.required && (
                              <Badge variant="outline" className="text-xs">Optional</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                          {item.hasData && (
                            <p className="text-sm text-green-600 mt-1">✓ Data available from PAF workflow</p>
                          )}
                          {item.acknowledged && (
                            <p className="text-sm text-blue-600 mt-1">✓ Missing data acknowledged</p>
                          )}
                          {!item.hasData && !item.acknowledged && item.required && !item.toggledOff && (
                            <p className="text-sm text-orange-600 mt-1">⚠ {item.status.replace('_', ' ')}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Data Completeness</div>
                        <div className="text-sm text-muted-foreground">{item.completeness}%</div>
                      </div>
                    </div>

                    {/* Include/Exclude Toggle */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`include-${item.section}`} className="text-sm">
                        Include in Report
                      </Label>
                      <Switch
                        id={`include-${item.section}`}
                        checked={!item.toggledOff}
                        onCheckedChange={(checked) => handleSectionToggle(item.section, checked)}
                      />
                    </div>

                    {/* Action Buttons - only show if section is included */}
                    {!item.toggledOff && !item.hasData && (
                      <div className="flex gap-2 pt-2 border-t">
                        <Button
                          variant={item.acknowledged ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => handleAcknowledgment(item.section, !item.acknowledged)}
                          className="flex items-center gap-2"
                        >
                          {item.acknowledged ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          {item.acknowledged ? 'Remove Acknowledgment' : 'Acknowledge Missing'}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => {
                            toast({
                              title: "Upload Additional Data",
                              description: "File upload functionality coming soon - for now, please provide data through the PAF workflow",
                            });
                          }}
                        >
                          <Upload className="h-4 w-4" />
                          Provide Data
                        </Button>
                      </div>
                    )}

                    {/* Toggle Off Message */}
                    {item.toggledOff && (
                      <div className="text-sm text-muted-foreground italic pt-2 border-t">
                        This section is excluded from the report
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Summary</CardTitle>
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
              <Label className="text-sm font-medium">Included Sections</Label>
              <div className="text-sm text-muted-foreground">
                {includedSections.length} of {dataReadiness.length} sections
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sections with Data:</span>
              <span className="font-medium">{includedSections.filter(s => s.hasData).length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Acknowledged Missing:</span>
              <span className="font-medium">{includedSections.filter(s => s.acknowledged && !s.hasData).length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Still Required:</span>
              <span className="font-medium text-orange-600">
                {includedSections.filter(s => s.required && !s.hasData && !s.acknowledged).length}
              </span>
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