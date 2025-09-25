-- Complete OCR Integration Migration
-- Run this in Supabase SQL Editor

-- 1. Add OCR and config columns if they don't exist
ALTER TABLE property_assessments
  ADD COLUMN IF NOT EXISTS report_config jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS ocr_results jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS manual_edits jsonb DEFAULT '{}';

-- 2. Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_property_assessments_job_id_config 
  ON property_assessments(job_id, report_config);

-- 3. Create OCR confidence validation function
CREATE OR REPLACE FUNCTION validate_ocr_confidence(
  config jsonb,
  ocr_data jsonb
) RETURNS text[] AS $$
DECLARE
  warnings text[] := '{}';
  section_key text;
  section_enabled boolean;
  ocr_confidence numeric;
  manual_override text;
BEGIN
  -- Loop through enabled sections
  FOR section_key IN SELECT jsonb_object_keys(config->'sections') LOOP
    section_enabled := (config->'sections'->section_key)::boolean;
    
    IF section_enabled THEN
      -- Check OCR confidence if available
      IF ocr_data ? section_key THEN
        ocr_confidence := COALESCE((ocr_data->section_key->>'confidence')::numeric, 0);
        manual_override := config->'manual_edits'->section_key;
        
        -- Flag low confidence sections without manual override
        IF ocr_confidence > 0 AND ocr_confidence < 0.75 AND (manual_override IS NULL OR manual_override = '') THEN
          warnings := array_append(warnings, section_key);
        END IF;
      END IF;
    END IF;
  END LOOP;
  
  RETURN warnings;
END;
$$ LANGUAGE plpgsql;

-- 4. Update RLS policies to include new columns
DROP POLICY IF EXISTS "Users can view their own assessments" ON property_assessments;
CREATE POLICY "Users can view their own assessments" 
  ON property_assessments FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own assessments" ON property_assessments;
CREATE POLICY "Users can update their own assessments" 
  ON property_assessments FOR UPDATE 
  USING (auth.uid() = user_id);

-- 5. Create trigger to auto-update timestamps
CREATE OR REPLACE FUNCTION update_assessment_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_property_assessments_timestamp ON property_assessments;
CREATE TRIGGER update_property_assessments_timestamp
  BEFORE UPDATE ON property_assessments
  FOR EACH ROW
  EXECUTE FUNCTION update_assessment_timestamp();

-- 6. Migrate existing data to new format (optional)
UPDATE property_assessments 
SET report_config = jsonb_build_object(
  'reportType', COALESCE(report_type, 'Market Valuation'),
  'valuationPurpose', 
    CASE 
      WHEN valuation_purpose IS NOT NULL THEN jsonb_build_array(valuation_purpose)
      ELSE '[]'::jsonb 
    END,
  'sections', jsonb_build_object(
    'rpdAndLocation', true,
    'legalAndPlanning', true,
    'marketCommentary', true,
    'propertyDetails', true,
    'environmental', true,
    'riskAssessment', true
  ),
  'branding', COALESCE(branding, '{}'::jsonb),
  'labels', '{}'::jsonb,
  'manual_edits', '{}'::jsonb
)
WHERE report_config = '{}'::jsonb OR report_config IS NULL;