import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface PAFReviewScreenProps {
  jobId: string;
}

const DEFAULT_SECTIONS = {
  rpdAndLocation: "Section 2: RPD and Location",
  legalAndPlanning: "Section 3: Legal and Planning", 
  marketCommentary: "Section 6: Market Commentary",
  propertyDetails: "Section 7: Property Details (Pre-Inspection)",
  environmental: "Section 8: Environmental & Sustainability Assessment",
  riskAssessment: "Section 10: Risk Assessment (Pre-Physical Inspection)",
};

// Enhanced hook with report_config and OCR support
function useAssessmentData(jobId: string) {
  const [formData, setFormData] = useState<any>({});
  const [reportConfig, setReportConfig] = useState<any>({
    sections: {
      rpdAndLocation: true,
      legalAndPlanning: true,
      marketCommentary: true,
      propertyDetails: true,
      environmental: true,
      riskAssessment: true,
    },
    labels: {},
    branding: {},
    reportType: "",
    valuationPurpose: [],
    manual_edits: {}
  });
  const [ocrResults, setOcrResults] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load data once
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data, error } = await supabase
          .from('property_assessments')
          .select('*')
          .eq('job_id', jobId)
          .single();
        
        if (data) {
          setFormData(data);
          
          // Backward compatibility: check if report_config exists
          const hasReportConfig = (data as any).hasOwnProperty('report_config');
          
          if (hasReportConfig && (data as any).report_config) {
            setReportConfig({
              ...reportConfig,
              ...((data as any).report_config || {}),
              sections: {
                ...reportConfig.sections,
                ...((data as any).report_config?.sections || {})
              }
            });
          } else {
            // Fallback to old structure
            const legacyConfig = {
              ...reportConfig,
              reportType: data.report_type || "",
              valuationPurpose: data.valuation_purpose ? [data.valuation_purpose] : [],
              branding: data.branding || {},
              sections: {
                ...reportConfig.sections,
                ...(data.include_flags as any || {})
              }
            };
            setReportConfig(legacyConfig);
          }
          
          // Handle OCR results (string or object)
          if (typeof data.ocr_results === 'string') {
            setOcrResults({ extracted_text: data.ocr_results });
          } else {
            setOcrResults(data.ocr_results || {});
          }
        } else if (error && error.code === 'PGRST116') {
          // No record found, create one
          const insertData: any = {
            job_id: jobId,
            user_id: (await supabase.auth.getUser()).data.user?.id,
            include_flags: {},
            branding: {}
          };
          
          // Only add new fields if they exist in schema
          try {
            const { data: newData, error: insertError } = await supabase
              .from('property_assessments')
              .insert(insertData)
              .select()
              .single();
            
            if (newData) {
              setFormData(newData);
              setReportConfig(reportConfig);
              setOcrResults({});
            }
            if (insertError) console.error('Insert error:', insertError);
          } catch (insertErr) {
            console.error('Insert failed:', insertErr);
          }
        }
      } catch (err) {
        console.error('Load error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) loadData();
  }, [jobId]);

  // Auto-save with debounce
  useEffect(() => {
    if (!jobId || loading) return;
    
    const timeoutId = setTimeout(async () => {
      setSaving(true);
      try {
        // Prepare update data - only include fields that exist in current schema
        const updateData: any = {
          ...formData,
          updated_at: new Date().toISOString()
        };
        
        // Try to update with new fields, fallback to old fields if they don't exist
        try {
          // Test if new columns exist by attempting to update with them
          await supabase
            .from('property_assessments')
            .update({
              ...updateData,
              report_config: reportConfig,
              ocr_results: ocrResults
            })
            .eq('job_id', jobId);
        } catch (newSchemaError) {
          // Fallback to old schema
          await supabase
            .from('property_assessments')
            .update({
              ...formData,
              report_type: reportConfig.reportType || "",
              valuation_purpose: reportConfig.valuationPurpose?.[0] || "",
              include_flags: reportConfig.sections || {},
              branding: reportConfig.branding || {},
              ocr_results: typeof ocrResults === 'object' ? 
                JSON.stringify(ocrResults) : 
                ocrResults
            })
            .eq('job_id', jobId);
        }
      } catch (error) {
        console.error('Auto-save error:', error);
      } finally {
        setSaving(false);
      }
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, [formData, reportConfig, ocrResults, jobId, loading]);

  return { 
    formData, 
    setFormData, 
    reportConfig, 
    setReportConfig, 
    ocrResults, 
    setOcrResults, 
    loading, 
    saving 
  };
}

// Enhanced toggle component for sections
function SectionToggle({ 
  sectionKey, 
  label, 
  reportConfig, 
  setReportConfig,
  ocrResults,
  onManualEdit
}: { 
  sectionKey: string; 
  label: string; 
  reportConfig: any; 
  setReportConfig: (config: any) => void;
  ocrResults: any;
  onManualEdit: (key: string, value: string) => void;
}) {
  const isIncluded = reportConfig.sections?.[sectionKey] ?? true;
  const ocrText = ocrResults[sectionKey] || "";
  const manualText = reportConfig.manual_edits?.[sectionKey] || "";

  const handleToggle = () => {
    setReportConfig({
      ...reportConfig,
      sections: {
        ...reportConfig.sections,
        [sectionKey]: !isIncluded
      }
    });
  };

  return (
    <Card className={`mb-4 ${isIncluded ? 'border-green-200' : 'border-gray-200'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
          <Switch
            checked={isIncluded}
            onCheckedChange={handleToggle}
          />
        </div>
      </CardHeader>
      
      {isIncluded && (
        <CardContent className="pt-0">
          {ocrText && (
            <div className="mb-3">
              <Label className="text-xs text-muted-foreground">OCR Extracted:</Label>
              <div className="bg-muted p-2 rounded text-sm mt-1">
                {ocrText}
              </div>
            </div>
          )}
          
          <div>
            <Label className="text-xs">Manual Override:</Label>
            <Textarea
              placeholder={ocrText ? "Override OCR content..." : "Add content for this section..."}
              value={manualText}
              onChange={(e) => onManualEdit(sectionKey, e.target.value)}
              className="mt-1 min-h-[60px]"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function PAFReviewScreen({ jobId }: PAFReviewScreenProps) {
  const { 
    formData, 
    setFormData, 
    reportConfig, 
    setReportConfig, 
    ocrResults, 
    setOcrResults, 
    loading, 
    saving 
  } = useAssessmentData(jobId);
  
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFieldChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleBrandingChange = (key: string, value: string) => {
    setReportConfig({
      ...reportConfig,
      branding: {
        ...reportConfig.branding,
        [key]: value
      }
    });
  };

  const handleManualEdit = (sectionKey: string, value: string) => {
    setReportConfig({
      ...reportConfig,
      manual_edits: {
        ...reportConfig.manual_edits,
        [sectionKey]: value
      }
    });
  };

  const addCustomSection = (title: string) => {
    const key = title.toLowerCase().replace(/\s+/g, '_');
    setReportConfig({
      ...reportConfig,
      sections: {
        ...reportConfig.sections,
        [key]: true
      },
      labels: {
        ...reportConfig.labels,
        [key]: title
      }
    });
  };

  const generateReport = async (reviewed: boolean) => {
    setGeneratingReport(true);
    try {
      // Ensure config is saved first
      await supabase
        .from('property_assessments')
        .update({
          ...formData,
          report_config: reportConfig,
          ocr_results: ocrResults,
          reviewed
        })
        .eq('job_id', jobId);

      const { data, error } = await supabase.functions.invoke('generate_report_with_ocr', {
        body: { jobId, reviewed }
      });

      if (error) throw error;
      
      if (data?.report_url) {
        setReportUrl(data.report_url);
        toast({
          title: "Report Generated Successfully",
          description: "Your report is ready for download."
        });
      }
    } catch (error) {
      console.error('Generate report error:', error);
      toast({
        title: "Error Generating Report",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setGeneratingReport(false);
    }
  };

  const calculateReadiness = () => {
    const results: Record<string, number> = {};
    for (const [key, enabled] of Object.entries(reportConfig.sections || {})) {
      if (!enabled) {
        results[key] = 0;
        continue;
      }
      const hasOCR = !!ocrResults[key];
      const hasManual = !!reportConfig.manual_edits?.[key];
      results[key] = hasOCR || hasManual ? 100 : 50;
    }
    
    const total = Object.keys(results).length;
    const progress = total > 0 
      ? Object.values(results).reduce((a, b) => a + b, 0) / total 
      : 0;
    
    return { results, progress };
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">Loading assessment data...</div>
        </CardContent>
      </Card>
    );
  }

  const { progress } = calculateReadiness();

  return (
    <div className="space-y-6">
      {/* Data Readiness */}
      <Card>
        <CardHeader>
          <CardTitle>Data Readiness Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium">{Math.round(progress)}% Ready</span>
          </div>
          {saving && <p className="text-xs text-muted-foreground mt-2">Auto-saving...</p>}
        </CardContent>
      </Card>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="reportType">Report Type</Label>
            <Input
              id="reportType"
              value={reportConfig.reportType || ""}
              onChange={(e) => setReportConfig({
                ...reportConfig,
                reportType: e.target.value
              })}
              placeholder="Market Valuation"
            />
          </div>
          
          <div>
            <Label htmlFor="valuationPurpose">Valuation Purpose</Label>
            <Input
              id="valuationPurpose"
              value={reportConfig.valuationPurpose?.join(', ') || ""}
              onChange={(e) => setReportConfig({
                ...reportConfig,
                valuationPurpose: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
              })}
              placeholder="Investment Decision, First Mortgage Security"
            />
          </div>
        </CardContent>
      </Card>

      {/* Report Sections */}
      <Card>
        <CardHeader>
          <CardTitle>Report Sections</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(DEFAULT_SECTIONS).map(([key, label]) => (
            <SectionToggle
              key={key}
              sectionKey={key}
              label={label}
              reportConfig={reportConfig}
              setReportConfig={setReportConfig}
              ocrResults={ocrResults}
              onManualEdit={handleManualEdit}
            />
          ))}
          
          {/* Custom sections */}
          {Object.entries(reportConfig.labels || {}).map(([key, label]) => (
            <SectionToggle
              key={key}
              sectionKey={key}
              label={label as string}
              reportConfig={reportConfig}
              setReportConfig={setReportConfig}
              ocrResults={ocrResults}
              onManualEdit={handleManualEdit}
            />
          ))}
        </CardContent>
      </Card>

      {/* Branding */}
      <Card>
        <CardHeader>
          <CardTitle>Report Branding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={reportConfig.branding?.company || ""}
              onChange={(e) => handleBrandingChange('company', e.target.value)}
              placeholder="Your Company Name"
            />
          </div>
          
          <div>
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              id="logo_url"
              value={reportConfig.branding?.logo_url || ""}
              onChange={(e) => handleBrandingChange('logo_url', e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>
          
          <div>
            <Label htmlFor="primary_color">Primary Color</Label>
            <Input
              id="primary_color"
              type="color"
              value={reportConfig.branding?.primary_color || "#003366"}
              onChange={(e) => handleBrandingChange('primary_color', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Generate Report */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Button
              onClick={() => generateReport(false)}
              disabled={generatingReport}
              variant="outline"
            >
              {generatingReport ? "Generating..." : "Generate Instant Automation"}
            </Button>
            
            <Button
              onClick={() => generateReport(true)}
              disabled={generatingReport}
            >
              {generatingReport ? "Generating..." : "Generate Instant Review"}
            </Button>
          </div>
          
          {reportUrl && (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 mb-2">Report generated successfully!</p>
              <Button
                onClick={() => window.open(reportUrl, '_blank')}
                size="sm"
              >
                Download Report
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}