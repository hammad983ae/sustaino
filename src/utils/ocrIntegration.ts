// OCR Integration Utility
import { supabase } from "@/integrations/supabase/client";

export interface OCRResult {
  rpdAndLocation?: string;
  legalAndPlanning?: string;
  marketCommentary?: string;
  propertyDetails?: string;
  environmental?: string;
  riskAssessment?: string;
  [key: string]: string | undefined;
}

export interface ReportConfig {
  sections: Record<string, boolean>;
  labels?: Record<string, string>;
  reportType?: string;
  valuationPurpose?: string[];
  branding?: {
    company?: string;
    logo_url?: string;
    primary_color?: string;
  };
}

export async function saveOCRResults(jobId: string, ocrResults: OCRResult) {
  const { error } = await supabase
    .from("property_assessments")
    .update({ 
      ocr_results: ocrResults as any,
      updated_at: new Date().toISOString()
    })
    .eq("job_id", jobId);

  if (error) throw error;
  return true;
}

export async function fetchReportConfigWithOCR(jobId: string) {
  const { data, error } = await supabase
    .from("property_assessments")
    .select("*")
    .eq("job_id", jobId)
    .single();

  if (error) throw error;

  const config: ReportConfig = (data as any)?.report_config || { sections: {} };
  const ocr: OCRResult = (data as any)?.ocr_results || {};

  // Merge OCR into enabled sections only
  const mergedSections: Record<string, string> = {};
  for (const [key, enabled] of Object.entries(config.sections || {})) {
    if (!enabled) continue;
    mergedSections[key] = ocr[key] || "";
  }

  return { config, ocr, mergedSections };
}

export async function generateReportWithOCR(jobId: string, reviewed = false) {
  // Ensure config is saved first
  const { config } = await fetchReportConfigWithOCR(jobId);
  
  // Call the backend function
  const { data, error } = await supabase.functions.invoke("generate_report_with_ocr", {
    body: { jobId, reviewed },
  });

  if (error) throw error;
  return data;
}

export function calculateReadiness(config: ReportConfig, hasData: Record<string, boolean> = {}) {
  const DEFAULT_CHECKS: Record<string, boolean> = {
    rpdAndLocation: hasData.rpdAndLocation ?? true,
    legalAndPlanning: hasData.legalAndPlanning ?? true,
    marketCommentary: hasData.marketCommentary ?? true,
    propertyDetails: hasData.propertyDetails ?? true,
    environmental: hasData.environmental ?? true,
    riskAssessment: hasData.riskAssessment ?? true,
  };

  const results: Record<string, number> = {};

  for (const [key, enabled] of Object.entries(config.sections || {})) {
    if (!enabled) {
      results[key] = 0;
      continue;
    }
    
    if (DEFAULT_CHECKS[key] !== undefined) {
      results[key] = DEFAULT_CHECKS[key] ? 100 : 0;
    } else {
      // Custom sections always ready if toggled
      results[key] = 100;
    }
  }

  const total = Object.keys(results).length;
  const progress = total > 0 
    ? Object.values(results).reduce((a, b) => a + b, 0) / total 
    : 0;

  return { results, progress };
}