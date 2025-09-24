-- Create property_assessments table with all required fields
CREATE TABLE IF NOT EXISTS property_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  report_type TEXT,
  valuation_purpose TEXT,
  ocr_results TEXT,
  include_flags JSONB DEFAULT '{}'::jsonb,
  reviewed BOOLEAN DEFAULT false,
  report_url TEXT,
  branding JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create clients table for SaaS white-labelling
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  branding JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add client_id to property_assessments
ALTER TABLE property_assessments 
ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES clients(id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_property_assessments_job_id ON property_assessments (job_id);
CREATE INDEX IF NOT EXISTS idx_property_assessments_user_id ON property_assessments (user_id);
CREATE INDEX IF NOT EXISTS idx_property_assessments_client_id ON property_assessments (client_id);

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION update_property_assessments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_property_assessments_updated_at ON property_assessments;
CREATE TRIGGER trg_update_property_assessments_updated_at
BEFORE UPDATE ON property_assessments
FOR EACH ROW
EXECUTE FUNCTION update_property_assessments_updated_at();

-- Storage bucket for reports
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', false)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for property_assessments
ALTER TABLE property_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own assessments"
ON property_assessments
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS policies for clients
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all clients"
ON clients
FOR SELECT
USING (true);

-- RLS policies for storage
CREATE POLICY "Users can view their own files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'property-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can upload into their own folder"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'property-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'property-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);