-- Update valuation_jobs table to support job numbering starting from 10001
-- First, let's check if we need to update the sequence
DO $$
BEGIN
  -- Update the sequence to start from 10001 if it's currently lower
  PERFORM setval('valuation_jobs_job_number_seq', 10000, false);
END $$;

-- Ensure the sequence starts from 10001 for new jobs
ALTER SEQUENCE valuation_jobs_job_number_seq RESTART WITH 10001;

-- Add enhanced fields to valuation_jobs table for better work hub integration
ALTER TABLE valuation_jobs 
ADD COLUMN IF NOT EXISTS completion_percentage integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS auto_saved_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS pdf_file_path text,
ADD COLUMN IF NOT EXISTS aerial_image_url text,
ADD COLUMN IF NOT EXISTS geolocation_data jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS vicplan_data jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS market_analysis jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS missing_fields_analysis jsonb DEFAULT '{}';

-- Add enhanced fields to reports table
ALTER TABLE reports
ADD COLUMN IF NOT EXISTS aerial_image_url text,
ADD COLUMN IF NOT EXISTS geolocation_data jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS vicplan_data jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS market_analysis jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS included_sections text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS job_number text;

-- Create an index on job_number for faster lookups
CREATE INDEX IF NOT EXISTS idx_valuation_jobs_job_number ON valuation_jobs(job_number);
CREATE INDEX IF NOT EXISTS idx_reports_job_number ON reports(job_number);

-- Create trigger to update auto_saved_at timestamp
CREATE OR REPLACE FUNCTION update_auto_saved_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.auto_saved_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to valuation_jobs for auto-save tracking
DROP TRIGGER IF EXISTS trigger_auto_save_timestamp ON valuation_jobs;
CREATE TRIGGER trigger_auto_save_timestamp
  BEFORE UPDATE ON valuation_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_auto_saved_timestamp();