-- Add report configuration tables
CREATE TABLE IF NOT EXISTS report_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS report_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_id UUID REFERENCES report_configurations(id) ON DELETE CASCADE,
  section_name TEXT NOT NULL,
  section_label TEXT NOT NULL,
  is_required BOOLEAN DEFAULT FALSE,
  is_included BOOLEAN DEFAULT TRUE,
  data_completeness INTEGER DEFAULT 0,
  ocr_data JSONB DEFAULT '{}',
  manual_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE report_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_sections ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own report configurations" 
ON report_configurations FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own report sections" 
ON report_sections FOR ALL 
USING (EXISTS (
  SELECT 1 FROM report_configurations 
  WHERE report_configurations.id = report_sections.config_id 
  AND report_configurations.user_id = auth.uid()
));

-- Function to create default report configuration
CREATE OR REPLACE FUNCTION create_default_report_config(p_job_id TEXT, p_user_id UUID)
RETURNS UUID AS $$
DECLARE
  config_id UUID;
BEGIN
  -- Create configuration record
  INSERT INTO report_configurations (job_id, user_id)
  VALUES (p_job_id, p_user_id)
  RETURNING id INTO config_id;
  
  -- Insert default sections
  INSERT INTO report_sections (config_id, section_name, section_label, is_required, is_included) VALUES
  (config_id, 'rpdAndLocation', 'Section 2: RPD and Location', TRUE, TRUE),
  (config_id, 'legalAndPlanning', 'Section 3: Legal and Planning', TRUE, TRUE),
  (config_id, 'tenancySchedule', 'Section 4: Tenancy Schedule/Lease Details', FALSE, FALSE),
  (config_id, 'statutoryAssessment', 'Section 5: Statutory Assessment', FALSE, FALSE),
  (config_id, 'marketCommentary', 'Section 6: Market Commentary', TRUE, TRUE),
  (config_id, 'propertyDetails', 'Section 7: Property Details (Pre-Inspection)', TRUE, TRUE),
  (config_id, 'environmental', 'Section 8: Environmental & Sustainability Assessment', TRUE, TRUE),
  (config_id, 'riskAssessment', 'Section 10: Risk Assessment (Pre-Physical Inspection)', TRUE, TRUE),
  (config_id, 'salesHistory', 'Section 11: Previous Sales History and Current Sale', TRUE, TRUE),
  (config_id, 'annexures', 'Section 18-20: Annexures & Documentation', TRUE, TRUE),
  (config_id, 'sustainability', 'Sustainability Assessment (Separate Section)', FALSE, FALSE);
  
  RETURN config_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;