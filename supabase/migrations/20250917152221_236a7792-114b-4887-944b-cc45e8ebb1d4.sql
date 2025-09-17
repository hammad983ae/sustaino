-- Ensure valuations table exists with proper structure and RLS policies
CREATE TABLE IF NOT EXISTS public.valuations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  property_id UUID,
  valuation_type TEXT NOT NULL DEFAULT 'comprehensive',
  property_address TEXT,
  total_value NUMERIC,
  property_value NUMERIC,
  advertising_value NUMERIC,
  digital_platform_value NUMERIC,
  esg_premium NUMERIC,
  confidence_score INTEGER DEFAULT 0,
  valuation_data JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.valuations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own valuations" ON public.valuations;
DROP POLICY IF EXISTS "Users can create their own valuations" ON public.valuations;
DROP POLICY IF EXISTS "Users can update their own valuations" ON public.valuations;
DROP POLICY IF EXISTS "Users can delete their own valuations" ON public.valuations;
DROP POLICY IF EXISTS "Users can insert their own valuations" ON public.valuations;

-- Create proper RLS policies
CREATE POLICY "Users can view their own valuations" 
ON public.valuations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own valuations" 
ON public.valuations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own valuations" 
ON public.valuations 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own valuations" 
ON public.valuations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_valuations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_valuations_updated_at ON public.valuations;
CREATE TRIGGER update_valuations_updated_at
  BEFORE UPDATE ON public.valuations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_valuations_updated_at();