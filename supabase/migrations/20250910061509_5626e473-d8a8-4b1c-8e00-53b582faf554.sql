-- Create sales evidence table
CREATE TABLE public.sales_evidence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  property_address TEXT NOT NULL,
  sale_price NUMERIC NOT NULL,
  sale_date DATE NOT NULL,
  sale_status TEXT NOT NULL DEFAULT 'settled' CHECK (sale_status IN ('settled', 'pending', 'cancelled')),
  property_type TEXT NOT NULL,
  land_area NUMERIC,
  building_area NUMERIC,
  bedrooms INTEGER,
  bathrooms INTEGER,
  car_spaces INTEGER,
  property_features JSONB DEFAULT '{}',
  comparison_notes TEXT,
  is_comparable BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leasing evidence table
CREATE TABLE public.leasing_evidence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  property_address TEXT NOT NULL,
  rent_amount NUMERIC NOT NULL,
  lease_start_date DATE NOT NULL,
  lease_end_date DATE,
  lease_duration_months INTEGER,
  lease_status TEXT NOT NULL DEFAULT 'active' CHECK (lease_status IN ('active', 'pending', 'terminated')),
  property_type TEXT NOT NULL,
  land_area NUMERIC,
  building_area NUMERIC,
  bedrooms INTEGER,
  bathrooms INTEGER,
  car_spaces INTEGER,
  property_features JSONB DEFAULT '{}',
  comparison_notes TEXT,
  is_comparable BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sales_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leasing_evidence ENABLE ROW LEVEL SECURITY;

-- RLS policies for sales_evidence
CREATE POLICY "Users can view their own sales evidence" 
ON public.sales_evidence 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sales evidence" 
ON public.sales_evidence 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sales evidence" 
ON public.sales_evidence 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sales evidence" 
ON public.sales_evidence 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for leasing_evidence
CREATE POLICY "Users can view their own leasing evidence" 
ON public.leasing_evidence 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own leasing evidence" 
ON public.leasing_evidence 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leasing evidence" 
ON public.leasing_evidence 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own leasing evidence" 
ON public.leasing_evidence 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_sales_evidence_updated_at
BEFORE UPDATE ON public.sales_evidence
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leasing_evidence_updated_at
BEFORE UPDATE ON public.leasing_evidence
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_sales_evidence_user_id ON public.sales_evidence(user_id);
CREATE INDEX idx_sales_evidence_property_address ON public.sales_evidence(property_address);
CREATE INDEX idx_sales_evidence_sale_status ON public.sales_evidence(sale_status);
CREATE INDEX idx_sales_evidence_is_comparable ON public.sales_evidence(is_comparable);

CREATE INDEX idx_leasing_evidence_user_id ON public.leasing_evidence(user_id);
CREATE INDEX idx_leasing_evidence_property_address ON public.leasing_evidence(property_address);
CREATE INDEX idx_leasing_evidence_lease_status ON public.leasing_evidence(lease_status);
CREATE INDEX idx_leasing_evidence_is_comparable ON public.leasing_evidence(is_comparable);