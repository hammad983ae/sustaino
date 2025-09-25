-- Run this migration in Supabase SQL Editor FIRST
-- This adds the new columns needed for OCR integration and report configuration

-- 1. Add report_config column (stores PAF form data as JSON)
ALTER TABLE property_assessments
  ADD COLUMN IF NOT EXISTS report_config jsonb DEFAULT '{}'::jsonb;

-- 2. Convert existing ocr_results from text to jsonb (if it exists)
ALTER TABLE property_assessments 
  ALTER COLUMN ocr_results TYPE jsonb USING 
    CASE 
      WHEN ocr_results = '' OR ocr_results IS NULL THEN '{}'::jsonb
      ELSE json_build_object('extracted_text', ocr_results)::jsonb
    END;

-- 3. Set default for ocr_results if null
UPDATE property_assessments 
SET ocr_results = '{}'::jsonb 
WHERE ocr_results IS NULL;

-- 4. Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_property_assessments_report_config
  ON property_assessments USING GIN (report_config);

CREATE INDEX IF NOT EXISTS idx_property_assessments_ocr_results
  ON property_assessments USING GIN (ocr_results);

-- 5. Migrate existing data to new structure
UPDATE property_assessments SET
  report_config = jsonb_build_object(
    'reportType', COALESCE(report_type, ''),
    'valuationPurpose', CASE 
      WHEN valuation_purpose IS NOT NULL AND valuation_purpose != '' 
      THEN json_build_array(valuation_purpose)::jsonb 
      ELSE '[]'::jsonb 
    END,
    'sections', jsonb_build_object(
      'rpdAndLocation', COALESCE((include_flags->>'rpdAndLocation')::boolean, true),
      'legalAndPlanning', COALESCE((include_flags->>'legalAndPlanning')::boolean, true),
      'marketCommentary', COALESCE((include_flags->>'marketCommentary')::boolean, true),
      'propertyDetails', COALESCE((include_flags->>'propertyDetails')::boolean, true),
      'environmental', COALESCE((include_flags->>'environmental')::boolean, true),
      'riskAssessment', COALESCE((include_flags->>'riskAssessment')::boolean, true)
    ),
    'branding', COALESCE(branding, '{}'::jsonb),
    'manual_edits', '{}'::jsonb,
    'labels', '{}'::jsonb
  )
WHERE report_config IS NULL OR report_config = '{}'::jsonb;

-- 6. Optional: Config versions audit table
CREATE TABLE IF NOT EXISTS property_assessment_config_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  report_config jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_config_versions_job_id 
  ON property_assessment_config_versions(job_id);

-- Enable RLS on config versions
ALTER TABLE property_assessment_config_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own config versions"
ON property_assessment_config_versions
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);