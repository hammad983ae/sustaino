-- Create comprehensive licensing and compliance system
CREATE TABLE public.business_licenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  license_type TEXT NOT NULL,
  license_number TEXT,
  license_holder_name TEXT NOT NULL,
  issuing_authority TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  license_status TEXT NOT NULL DEFAULT 'pending',
  compliance_score INTEGER DEFAULT 0,
  annual_compliance_fee DECIMAL(10,2),
  renewal_reminder_days INTEGER DEFAULT 90,
  conditions_attached JSONB,
  responsible_managers JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.business_licenses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own licenses" 
ON public.business_licenses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own licenses" 
ON public.business_licenses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own licenses" 
ON public.business_licenses 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own licenses" 
ON public.business_licenses 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create compliance tracking table
CREATE TABLE public.compliance_requirements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  license_id UUID NOT NULL REFERENCES public.business_licenses(id) ON DELETE CASCADE,
  requirement_type TEXT NOT NULL,
  requirement_description TEXT NOT NULL,
  due_date DATE,
  completion_status TEXT NOT NULL DEFAULT 'pending',
  evidence_required BOOLEAN DEFAULT false,
  evidence_document_url TEXT,
  compliance_officer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.compliance_requirements ENABLE ROW LEVEL SECURITY;

-- Create policies for compliance requirements
CREATE POLICY "Users can view compliance for their licenses" 
ON public.compliance_requirements 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.business_licenses 
    WHERE id = compliance_requirements.license_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can manage compliance for their licenses" 
ON public.compliance_requirements 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.business_licenses 
    WHERE id = compliance_requirements.license_id 
    AND user_id = auth.uid()
  )
);

-- Create aggregator relationships table
CREATE TABLE public.aggregator_relationships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  aggregator_name TEXT NOT NULL,
  aggregator_afsl TEXT,
  relationship_type TEXT NOT NULL, -- 'credit_representative', 'authorised_representative', 'sub_agent'
  agreement_start_date DATE,
  agreement_end_date DATE,
  commission_structure JSONB,
  obligations JSONB,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.aggregator_relationships ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own aggregator relationships" 
ON public.aggregator_relationships 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own aggregator relationships" 
ON public.aggregator_relationships 
FOR ALL 
USING (auth.uid() = user_id);

-- Add trigger for timestamps
CREATE TRIGGER update_business_licenses_updated_at
BEFORE UPDATE ON public.business_licenses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_requirements_updated_at
BEFORE UPDATE ON public.compliance_requirements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_aggregator_relationships_updated_at
BEFORE UPDATE ON public.aggregator_relationships
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();