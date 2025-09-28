import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUnifiedDataManager } from '@/hooks/useUnifiedDataManager';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { checkReportContradictions, generateContradictionReport, type ReportData } from '@/utils/reportContradictionChecker';

interface IncludeToggleProps {
  field: string;
  label: string;
  includeFlags: Record<string, boolean>;
  onToggle: (field: string, value: boolean) => void;
}

function IncludeToggle({ field, label, includeFlags, onToggle }: IncludeToggleProps) {
  const isIncluded = includeFlags[field] ?? true;

  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <Label>{label}</Label>
      <Button
        variant={isIncluded ? "default" : "outline"}
        size="sm"
        onClick={() => onToggle(field, !isIncluded)}
      >
        {isIncluded ? "Include" : "Exclude"}
      </Button>
    </div>
  );
}

interface ReviewScreenProps {
  jobId: string;
  onReportGenerated?: (reportUrl: string) => void;
}

export default function ReviewScreen({ jobId, onReportGenerated }: ReviewScreenProps) {
  const { getAllData, saveData } = useUnifiedDataManager();
  const [assessmentData, setAssessmentData] = useState<any>({});
  const [includeFlags, setIncludeFlags] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [reportUrl, setReportUrl] = useState<string | null>(null);

  // Load existing data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAllData();
        setAssessmentData(data);
        setIncludeFlags(data.includeFlags || {});
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load assessment data');
        setLoading(false);
      }
    };

    loadData();
  }, [getAllData]);

  // Handle field updates
  const updateField = (field: string, value: any) => {
    const newData = { ...assessmentData, [field]: value };
    setAssessmentData(newData);
    saveData(newData, { showToast: false, debounceMs: 500 });
  };

  // Handle include/exclude toggles
  const handleToggle = (field: string, value: boolean) => {
    const newFlags = { ...includeFlags, [field]: value };
    setIncludeFlags(newFlags);
    const newData = { ...assessmentData, includeFlags: newFlags };
    setAssessmentData(newData);
    saveData(newData, { showToast: false });
  };

  // Generate report with ISFV workflow integration
  const generateReport = async (reviewedMode: boolean = false) => {
    if (!jobId) {
      toast.error('Job ID is required');
      return;
    }

    setGenerating(true);
    try {
      // Run contradiction check before generating report (ISFV workflow integration)
      console.log('Running contradiction check for Review Screen report...');
      
      const contradictionData: ReportData = {
        propertyData: {
          propertyAddress: assessmentData.propertyAddress || '',
          structural_condition: assessmentData.structuralCondition || 'good',
          kitchen_condition: assessmentData.kitchenCondition || 'good',
          overall_condition: assessmentData.overallCondition || 'good'
        },
        riskRatings: assessmentData.riskRatings || {},
        vraAssessment: {
          comments: assessmentData.vraComments || '',
          recommendations: assessmentData.vraRecommendations || ''
        },
        salesEvidence: assessmentData.salesEvidence || [],
        generalComments: assessmentData.generalComments || '',
        sections: assessmentData
      };

      const contradictions = checkReportContradictions(contradictionData);
      const contradictionReport = generateContradictionReport(contradictions);
      
      console.log('Review Screen contradiction check results:', contradictionReport);

      // Show contradiction results to user if any issues found
      if (contradictions.hasContradictions) {
        toast.error('⚠️ Critical contradictions detected in report - please review before generating');
        console.warn('CRITICAL CONTRADICTIONS in Review Screen report:', contradictions.contradictions);
      }

      // Save current state with reviewed flag if needed
      if (reviewedMode) {
        await saveData({ 
          ...assessmentData, 
          reviewed: true,
          contradiction_check_results: contradictionReport
        }, { showToast: false });
      }

      const response = await supabase.functions.invoke('generate-report', {
        body: { 
          job_id: jobId, 
          reviewed: reviewedMode,
          assessment_data: assessmentData,
          include_flags: includeFlags,
          contradictionCheck: contradictionReport
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { report_url } = response.data;
      setReportUrl(report_url);
      onReportGenerated?.(report_url);
      
      toast.success(
        contradictions.hasContradictions 
          ? 'Report generated with contradiction warnings - please review' 
          : 'Report generated successfully!'
      );
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error(`Failed to generate report: ${error.message}`);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p>Loading assessment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* OCR Results Panel */}
      <Card>
        <CardHeader>
          <CardTitle>OCR Extracted Text</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-md">
            <pre className="text-sm whitespace-pre-wrap font-mono">
              {assessmentData.ocrResults || 'No OCR results available'}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Editable Fields Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Review & Edit Assessment Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="reportType">Report Type</Label>
            <Input
              id="reportType"
              value={assessmentData.reportData?.reportConfig?.reportType || ''}
              onChange={(e) => updateField('reportData.reportConfig.reportType', e.target.value)}
              placeholder="Enter report type"
            />
          </div>

          <div>
            <Label htmlFor="valuationPurpose">Valuation Purpose</Label>
            <Input
              id="valuationPurpose"
              value={assessmentData.reportData?.reportConfig?.valuationPurpose || ''}
              onChange={(e) => updateField('reportData.reportConfig.valuationPurpose', e.target.value)}
              placeholder="Enter valuation purpose"
            />
          </div>

          <div>
            <Label htmlFor="propertyType">Property Type</Label>
            <Input
              id="propertyType"
              value={assessmentData.reportData?.reportConfig?.propertyType || ''}
              onChange={(e) => updateField('reportData.reportConfig.propertyType', e.target.value)}
              placeholder="Enter property type"
            />
          </div>

          <div>
            <Label htmlFor="basisOfValuation">Basis of Valuation</Label>
            <Input
              id="basisOfValuation"
              value={assessmentData.reportData?.reportConfig?.basisOfValuation || ''}
              onChange={(e) => updateField('reportData.reportConfig.basisOfValuation', e.target.value)}
              placeholder="Enter basis of valuation"
            />
          </div>
        </CardContent>
      </Card>

      {/* Include/Exclude Toggles Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Report Field Toggles</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose which fields to include or exclude from the final report
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          <IncludeToggle
            field="reportType"
            label="Report Type"
            includeFlags={includeFlags}
            onToggle={handleToggle}
          />
          <IncludeToggle
            field="valuationPurpose"
            label="Valuation Purpose"
            includeFlags={includeFlags}
            onToggle={handleToggle}
          />
          <IncludeToggle
            field="propertyType"
            label="Property Type"
            includeFlags={includeFlags}
            onToggle={handleToggle}
          />
          <IncludeToggle
            field="basisOfValuation"
            label="Basis of Valuation"
            includeFlags={includeFlags}
            onToggle={handleToggle}
          />
          <IncludeToggle
            field="ocrResults"
            label="OCR Extracted Text"
            includeFlags={includeFlags}
            onToggle={handleToggle}
          />
          <IncludeToggle
            field="propertyDetails"
            label="Property Details"
            includeFlags={includeFlags}
            onToggle={handleToggle}
          />
          <IncludeToggle
            field="marketAnalysis"
            label="Market Analysis"
            includeFlags={includeFlags}
            onToggle={handleToggle}
          />
          <IncludeToggle
            field="valuationAnalysis"
            label="Valuation Analysis"
            includeFlags={includeFlags}
            onToggle={handleToggle}
          />
        </CardContent>
      </Card>

      {/* Report Generation Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button
              onClick={() => generateReport(false)}
              disabled={generating}
              variant="outline"
            >
              {generating ? 'Generating...' : 'Generate Automated Report'}
            </Button>

            <Button
              onClick={() => generateReport(true)}
              disabled={generating}
            >
              {generating ? 'Generating...' : 'Generate Reviewed Report'}
            </Button>
          </div>

          {reportUrl && (
            <div className="p-4 bg-muted rounded-md">
              <p className="font-semibold mb-2">Report Generated Successfully!</p>
              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                Download Report PDF
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}