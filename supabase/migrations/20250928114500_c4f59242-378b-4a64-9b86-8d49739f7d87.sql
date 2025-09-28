-- Create TBE Progress Payments table for construction progress inspections
CREATE TABLE IF NOT EXISTS public.tbe_progress_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  
  -- Property and Project Details
  property_address TEXT NOT NULL,
  builder_name TEXT NOT NULL,
  building_contract_number TEXT,
  original_valuation_id UUID, -- Reference to original ICV/ISFV valuation
  
  -- Contract Information
  contract_price NUMERIC NOT NULL,
  contract_date DATE,
  
  -- Progress Information
  current_stage TEXT NOT NULL,
  claimed_percentage NUMERIC NOT NULL DEFAULT 0,
  verified_percentage NUMERIC NOT NULL DEFAULT 0,
  hia_stage_reference TEXT,
  
  -- Costs and Variations
  cost_to_date NUMERIC DEFAULT 0,
  cost_to_complete NUMERIC DEFAULT 0,
  out_of_contract_items JSONB DEFAULT '[]'::jsonb,
  variations JSONB DEFAULT '[]'::jsonb,
  
  -- Inspection Details
  inspection_date DATE,
  inspector_notes TEXT,
  construction_photos JSONB DEFAULT '[]'::jsonb,
  
  -- Invoice and Claims
  invoice_amount_claimed NUMERIC DEFAULT 0,
  invoice_documents JSONB DEFAULT '[]'::jsonb,
  ocr_extracted_data JSONB DEFAULT '{}'::jsonb,
  
  -- Status and Recommendations
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'requires_review')),
  fund_release_recommendation TEXT,
  recommendation_notes TEXT,
  
  -- Audit Trail
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Next Stage Planning
  next_stage TEXT,
  next_stage_percentage NUMERIC,
  estimated_next_inspection_date DATE
);

-- Enable RLS
ALTER TABLE public.tbe_progress_payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own TBE progress payments"
ON public.tbe_progress_payments
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_tbe_progress_payments_updated_at
  BEFORE UPDATE ON public.tbe_progress_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create HIA Progress Payment Stages reference table
CREATE TABLE IF NOT EXISTS public.hia_progress_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_name TEXT NOT NULL,
  stage_description TEXT,
  standard_percentage NUMERIC NOT NULL,
  stage_order INTEGER NOT NULL,
  typical_inclusions JSONB DEFAULT '[]'::jsonb,
  inspection_requirements JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert standard HIA progress payment stages
INSERT INTO public.hia_progress_stages (stage_name, stage_description, standard_percentage, stage_order, typical_inclusions) VALUES
('Deposit', 'Initial contract deposit', 5, 1, '["Contract signing", "Building permit application"]'),
('Base/Footings', 'Foundation and base completion', 15, 2, '["Excavation", "Footings", "Slab preparation", "Concrete pour"]'),
('Frame', 'Structural frame completion', 25, 3, '["Timber/steel frame", "Roof trusses", "External walls"]'),
('Enclosed', 'Building enclosed and weatherproof', 40, 4, '["Roof completion", "External cladding", "Windows and doors", "Weatherproofing"]'),
('Fixing', 'Internal fit-out and fixtures', 60, 5, '["Plumbing rough-in", "Electrical rough-in", "Insulation", "Wall lining"]'),
('Practical Completion', 'Substantially complete and ready for occupation', 95, 6, '["Internal painting", "Floor coverings", "Kitchen installation", "Bathroom completion", "Final electrical/plumbing"]'),
('Final Inspection', 'Defects rectified and final handover', 100, 7, '["Defect rectification", "Final clean", "Handover documentation", "Warranty provisions"]')
ON CONFLICT DO NOTHING;

-- Enable RLS for HIA stages (read-only for authenticated users)
ALTER TABLE public.hia_progress_stages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view HIA stages"
ON public.hia_progress_stages
FOR SELECT
USING (auth.uid() IS NOT NULL);