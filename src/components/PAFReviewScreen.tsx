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

// Auto-save hook with debounce
function useAssessmentData(jobId: string) {
  const [formData, setFormData] = useState<any>({});
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
        } else if (error && error.code === 'PGRST116') {
          // No record found, create one
          const { data: newData, error: insertError } = await supabase
            .from('property_assessments')
            .insert({
              job_id: jobId,
              user_id: (await supabase.auth.getUser()).data.user?.id,
              include_flags: {},
              branding: {}
            })
            .select()
            .single();
          
          if (newData) setFormData(newData);
          if (insertError) console.error('Insert error:', insertError);
        }
      } catch (err) {
        console.error('Load error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [jobId]);

  // Auto-save with debounce
  useEffect(() => {
    if (loading || !formData.id) return;
    
    const timer = setTimeout(async () => {
      setSaving(true);
      try {
        await supabase
          .from('property_assessments')
          .update(formData)
          .eq('job_id', jobId);
      } catch (error) {
        console.error('Save error:', error);
      } finally {
        setSaving(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [formData, jobId, loading]);

  return { formData, setFormData, loading, saving };
}

// Toggle component for include/exclude
function IncludeToggle({ 
  field, 
  label, 
  formData, 
  setFormData 
}: { 
  field: string; 
  label: string; 
  formData: any; 
  setFormData: (data: any) => void; 
}) {
  const includeFlags = formData.include_flags || {};
  const isIncluded = includeFlags[field] ?? true;

  const handleToggle = () => {
    setFormData({
      ...formData,
      include_flags: {
        ...includeFlags,
        [field]: !isIncluded
      }
    });
  };

  return (
    <div className="flex items-center justify-between space-x-2">
      <Label htmlFor={field}>{label}</Label>
      <Switch
        id={field}
        checked={isIncluded}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}

export default function PAFReviewScreen({ jobId }: PAFReviewScreenProps) {
  const { formData, setFormData, loading, saving } = useAssessmentData(jobId);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const handleFieldChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleBrandingChange = (key: string, value: string) => {
    const newBranding = { ...formData.branding || {}, [key]: value };
    setFormData({
      ...formData,
      branding: newBranding
    });
  };

  const generateReport = async (reviewed: boolean) => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-report', {
        body: { job_id: jobId, reviewed }
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      setReportUrl(data.report_url);
      toast({
        title: "Success",
        description: "Report generated successfully!"
      });
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to generate report",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading assessment data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* OCR Results */}
      <Card>
        <CardHeader>
          <CardTitle>OCR Extracted Text</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.ocr_results || ''}
            onChange={(e) => handleFieldChange('ocr_results', e.target.value)}
            placeholder="OCR results will appear here..."
            className="min-h-[120px] resize-none"
          />
        </CardContent>
      </Card>

      {/* Editable Fields */}
      <Card>
        <CardHeader>
          <CardTitle>Report Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="report_type">Report Type</Label>
            <Input
              id="report_type"
              value={formData.report_type || ''}
              onChange={(e) => handleFieldChange('report_type', e.target.value)}
              placeholder="Enter report type..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valuation_purpose">Valuation Purpose</Label>
            <Input
              id="valuation_purpose"
              value={formData.valuation_purpose || ''}
              onChange={(e) => handleFieldChange('valuation_purpose', e.target.value)}
              placeholder="Enter valuation purpose..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Include/Exclude Toggles */}
      <Card>
        <CardHeader>
          <CardTitle>Report Sections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <IncludeToggle
            field="report_type"
            label="Report Type"
            formData={formData}
            setFormData={setFormData}
          />
          <IncludeToggle
            field="valuation_purpose"
            label="Valuation Purpose"
            formData={formData}
            setFormData={setFormData}
          />
          <IncludeToggle
            field="ocr_results"
            label="OCR Extracted Text"
            formData={formData}
            setFormData={setFormData}
          />
          <IncludeToggle
            field="comparables"
            label="Comparables"
            formData={formData}
            setFormData={setFormData}
          />
          <IncludeToggle
            field="market_analysis"
            label="Market Analysis"
            formData={formData}
            setFormData={setFormData}
          />
        </CardContent>
      </Card>

      {/* White Labelling */}
      <Card>
        <CardHeader>
          <CardTitle>Report Branding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={formData.branding?.company || ''}
              onChange={(e) => handleBrandingChange('company', e.target.value)}
              placeholder="Your Company Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              id="logo_url"
              value={formData.branding?.logo_url || ''}
              onChange={(e) => handleBrandingChange('logo_url', e.target.value)}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary_color">Primary Color</Label>
            <Input
              id="primary_color"
              type="color"
              value={formData.branding?.primary_color || '#003366'}
              onChange={(e) => handleBrandingChange('primary_color', e.target.value)}
              className="w-20 h-10"
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
          <div className="flex gap-4">
            <Button
              onClick={() => generateReport(false)}
              disabled={generating}
              variant="default"
            >
              {generating ? 'Generating...' : 'Generate Automated Report'}
            </Button>

            <Button
              onClick={() => generateReport(true)}
              disabled={generating}
              variant="secondary"
            >
              {generating ? 'Generating...' : 'Generate Reviewed Report'}
            </Button>
          </div>

          {reportUrl && (
            <div className="p-4 bg-muted rounded-lg">
              <Label className="font-semibold">Report Generated:</Label>
              <div className="mt-2">
                <Button variant="link" className="p-0 h-auto" asChild>
                  <a
                    href={reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Download Report
                  </a>
                </Button>
              </div>
            </div>
          )}

          {saving && (
            <div className="text-sm text-muted-foreground">
              Auto-saving changes...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}