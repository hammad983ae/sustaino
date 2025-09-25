import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ReportSectionTogglerProps {
  jobId: string;
}

interface ReportSection {
  section_name: string;
  section_label: string;
  is_required: boolean;
  is_included: boolean;
  data_completeness: number;
}

interface ReportConfiguration {
  id: string;
  job_id: string;
  report_sections: ReportSection[];
}

/**
 * Report Section Toggler Component
 * Controls optional section inclusion in reports
 */
const ReportSectionToggler: React.FC<ReportSectionTogglerProps> = ({ jobId }) => {
  const [config, setConfig] = useState<ReportConfiguration | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchConfiguration();
  }, [jobId]);

  const fetchConfiguration = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('report-configuration', {
        body: JSON.stringify({ jobId, action: 'get' }),
        method: 'POST'
      });

      if (error) throw error;
      setConfig(data);
    } catch (error) {
      console.error('Error fetching configuration:', error);
      toast({
        title: "Error",
        description: "Failed to load report configuration",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (sectionName: string, included: boolean) => {
    if (!config) return;

    const updatedSections = config.report_sections.map(section =>
      section.section_name === sectionName
        ? { ...section, is_included: included }
        : section
    );

    setConfig({
      ...config,
      report_sections: updatedSections
    });
  };

  const saveConfiguration = async () => {
    if (!config) return;

    try {
      setSaving(true);
      const sections = config.report_sections.map(section => ({
        name: section.section_name,
        included: section.is_included
      }));

      const { error } = await supabase.functions.invoke('report-configuration', {
        body: { jobId, sections },
        method: 'POST'
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Report configuration saved successfully"
      });
    } catch (error) {
      console.error('Error saving configuration:', error);
      toast({
        title: "Error",
        description: "Failed to save configuration",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-20 bg-muted rounded mb-4"></div>
          <div className="h-40 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="space-y-6">
        <div className="text-center p-8">
          <p className="text-muted-foreground">No configuration found</p>
          <Button onClick={fetchConfiguration} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const requiredSections = config.report_sections.filter(s => s.is_required);
  const optionalSections = config.report_sections.filter(s => !s.is_required);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Report Section Configuration</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Configure which sections to include in your valuation report. Required sections are automatically included.
        </p>
      </div>

      {/* Required Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            Required Sections
            <Badge variant="secondary">Always Included</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requiredSections.map((section) => (
              <div key={section.section_name} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                <div>
                  <p className="font-medium text-sm">{section.section_label}</p>
                  <p className="text-xs text-muted-foreground">
                    Data Completeness: {section.data_completeness}%
                  </p>
                </div>
                <Badge variant="outline">Required</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optional Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            Optional Sections
            <Badge variant="outline">Configurable</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {optionalSections.map((section) => (
              <div key={section.section_name} className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex-1">
                  <Label htmlFor={section.section_name} className="text-sm font-medium cursor-pointer">
                    {section.section_label}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Data Completeness: {section.data_completeness}%
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={section.is_included ? "default" : "secondary"}>
                    {section.is_included ? "Included" : "Excluded"}
                  </Badge>
                  <Switch
                    id={section.section_name}
                    checked={section.is_included}
                    onCheckedChange={(checked) => handleToggle(section.section_name, checked)}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={saveConfiguration} 
              disabled={saving}
              className="px-6"
            >
              {saving ? "Saving..." : "Save Configuration"}
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> Optional sections will be included in the report even when disabled, 
              but all fields will be marked as "Not Supplied" or "Not Applicable" as appropriate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportSectionToggler;