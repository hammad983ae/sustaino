import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ReportSection {
  section_name: string;
  section_label: string;
  is_required: boolean;
  is_included: boolean;
  data_completeness: number;
  ocr_data: any;
  manual_data: any;
}

interface ReportConfiguration {
  id: string;
  job_id: string;
  report_sections: ReportSection[];
}

export const useReportConfiguration = (jobId: string) => {
  const [config, setConfig] = useState<ReportConfiguration | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

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

  const updateSection = (sectionName: string, updates: Partial<ReportSection>) => {
    if (!config) return;

    const updatedSections = config.report_sections.map(section =>
      section.section_name === sectionName
        ? { ...section, ...updates }
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

      return true;
    } catch (error) {
      console.error('Error saving configuration:', error);
      toast({
        title: "Error",
        description: "Failed to save configuration",
        variant: "destructive"
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const getDataReadiness = () => {
    if (!config) return { overall: 0, sections: [] };

    const includedSections = config.report_sections.filter(s => s.is_included);
    const totalCompleteness = includedSections.reduce((sum, section) => sum + section.data_completeness, 0);
    const overall = includedSections.length > 0 ? Math.round(totalCompleteness / includedSections.length) : 0;

    return {
      overall,
      sections: includedSections.map(section => ({
        name: section.section_name,
        label: section.section_label,
        completeness: section.data_completeness,
        required: section.is_required
      }))
    };
  };

  useEffect(() => {
    if (jobId) {
      fetchConfiguration();
    }
  }, [jobId]);

  return {
    config,
    loading,
    saving,
    updateSection,
    saveConfiguration,
    refetch: fetchConfiguration,
    getDataReadiness
  };
};