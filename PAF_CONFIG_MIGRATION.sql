-- Migration: Add report_config and OCR support to property_assessments
-- Run this in Supabase SQL Editor first

-- 1. Add report_config column (stores PAF form data as JSON)
ALTER TABLE property_assessments
  ADD COLUMN IF NOT EXISTS report_config jsonb DEFAULT '{}'::jsonb;

-- 2. Add ocr_results column (stores OCR extracted data by section)  
ALTER TABLE property_assessments
  ADD COLUMN IF NOT EXISTS ocr_results jsonb DEFAULT '{}'::jsonb;

-- 3. Add index for better performance
CREATE INDEX IF NOT EXISTS idx_property_assessments_report_config
  ON property_assessments USING GIN (report_config);

CREATE INDEX IF NOT EXISTS idx_property_assessments_ocr_results
  ON property_assessments USING GIN (ocr_results);

-- 4. Optional: Config versions audit (keeps history of changes)
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

-- Sample report_config structure (for reference):
/*
Example report_config JSON:
{
  "reportType": "Market Valuation",
  "propertyType": "Workers Accommodation", 
  "instructingParty": "ABC Capital",
  "valuationPurpose": ["Investment Decision", "First Mortgage Security"],
  "reliantParty": "XYZ Bank",
  "valuationConfig": {
    "basis": "Market Value",
    "approaches": ["Direct Comparison", "Income"],
    "valueComponent": ["Vacant Possession"],
    "interestValues": ["Freehold", "Leasehold"],
    "gstTreatment": "Exclusive of GST"
  },
  "detailedRentalConfig": {
    "enabled": false,
    "options": {}
  },
  "sections": {
    "rpdAndLocation": true,
    "legalAndPlanning": true,
    "marketCommentary": true,
    "propertyDetails": true,
    "environmental": true,
    "riskAssessment": true
  },
  "labels": {
    "customSection1": "Custom Analysis Section"
  }
}

Example ocr_results JSON:
{
  "rpdAndLocation": "Extracted property address and location details...",
  "legalAndPlanning": "Extracted zoning and planning information...",
  "marketCommentary": "Key comparable sales from documents...",
  "propertyDetails": "Extracted building specifications...",
  "environmental": "Environmental hazards and ratings...",
  "riskAssessment": "Potential valuation risks identified..."
}
*/