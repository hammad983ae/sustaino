-- Enhanced residential sales evidence table with only essential comparable selection fields
ALTER TABLE residential_sales_evidence 
ADD COLUMN IF NOT EXISTS street_type TEXT,
ADD COLUMN IF NOT EXISTS distance_to_main_road INTEGER, -- meters
ADD COLUMN IF NOT EXISTS noise_level_score INTEGER DEFAULT 5 CHECK (noise_level_score >= 1 AND noise_level_score <= 10),
ADD COLUMN IF NOT EXISTS school_zones TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS coastal_orientation TEXT, -- 'north_facing', 'ocean_facing', 'protected', null
ADD COLUMN IF NOT EXISTS esg_orientation TEXT, -- 'north', 'south', 'east', 'west', 'north_east', etc.
ADD COLUMN IF NOT EXISTS bushfire_risk_zone TEXT, -- 'none', 'low', 'medium', 'high', 'extreme'
ADD COLUMN IF NOT EXISTS flood_risk_zone TEXT, -- 'none', 'low', 'medium', 'high'
ADD COLUMN IF NOT EXISTS search_radius_used INTEGER, -- meters - tracks what radius was used to find this comparable
ADD COLUMN IF NOT EXISTS similarity_score NUMERIC DEFAULT 0, -- calculated score for comparable ranking
ADD COLUMN IF NOT EXISTS comparable_justification TEXT, -- auto-generated justification for selection
ADD COLUMN IF NOT EXISTS external_factors JSONB DEFAULT '{}'; -- traffic_lights, railway, highway, etc.

-- Create indexes for comparable selection performance
CREATE INDEX IF NOT EXISTS idx_residential_sales_street_type ON residential_sales_evidence (street_type);
CREATE INDEX IF NOT EXISTS idx_residential_sales_school_zones ON residential_sales_evidence USING GIN (school_zones);
CREATE INDEX IF NOT EXISTS idx_residential_sales_similarity ON residential_sales_evidence (similarity_score DESC);
CREATE INDEX IF NOT EXISTS idx_residential_sales_search_radius ON residential_sales_evidence (search_radius_used);

-- Function to automatically calculate comparable similarity score
CREATE OR REPLACE FUNCTION calculate_comparable_similarity(
  subject_property JSONB,
  comparable_property JSONB
) RETURNS NUMERIC AS $$
DECLARE
  score NUMERIC := 0;
  max_score NUMERIC := 100;
BEGIN
  -- Property size match (30 points max)
  IF (comparable_property->>'living_area')::NUMERIC > 0 AND (subject_property->>'living_area')::NUMERIC > 0 THEN
    score := score + (30 * (1 - ABS((comparable_property->>'living_area')::NUMERIC - (subject_property->>'living_area')::NUMERIC) / GREATEST((subject_property->>'living_area')::NUMERIC, 1)));
  END IF;
  
  -- Bedroom/bathroom match (20 points max)
  IF comparable_property->>'bedrooms' = subject_property->>'bedrooms' THEN
    score := score + 10;
  END IF;
  IF comparable_property->>'bathrooms' = subject_property->>'bathrooms' THEN
    score := score + 10;
  END IF;
  
  -- Street type match (15 points max)
  IF comparable_property->>'street_type' = subject_property->>'street_type' THEN
    score := score + 15;
  END IF;
  
  -- School zone match (10 points max)
  IF (comparable_property->'school_zones')::TEXT[] && (subject_property->'school_zones')::TEXT[] THEN
    score := score + 10;
  END IF;
  
  -- Environmental factors (15 points max)
  IF comparable_property->>'coastal_orientation' = subject_property->>'coastal_orientation' THEN
    score := score + 7;
  END IF;
  IF comparable_property->>'esg_orientation' = subject_property->>'esg_orientation' THEN
    score := score + 8;
  END IF;
  
  -- Safety/risk factors (10 points max)
  IF comparable_property->>'bushfire_risk_zone' = subject_property->>'bushfire_risk_zone' THEN
    score := score + 5;
  END IF;
  IF comparable_property->>'flood_risk_zone' = subject_property->>'flood_risk_zone' THEN
    score := score + 5;
  END IF;
  
  RETURN LEAST(score, max_score);
END;
$$ LANGUAGE plpgsql;