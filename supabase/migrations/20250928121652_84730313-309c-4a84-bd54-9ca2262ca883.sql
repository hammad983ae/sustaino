-- Create platform integrations table for managing institutional connections
CREATE TABLE public.platform_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  institution_name TEXT NOT NULL,
  institution_type TEXT NOT NULL CHECK (institution_type IN ('lender', 'broker', 'valuer', 'professional_service')),
  connection_status TEXT NOT NULL DEFAULT 'pending' CHECK (connection_status IN ('connected', 'pending', 'failed', 'inactive')),
  api_endpoint TEXT,
  api_key_encrypted TEXT,
  data_flows JSONB DEFAULT '[]'::jsonb,
  configuration JSONB DEFAULT '{}'::jsonb,
  last_sync TIMESTAMP WITH TIME ZONE DEFAULT now(),
  monthly_transactions INTEGER DEFAULT 0,
  compliance_status TEXT NOT NULL DEFAULT 'requires_review' CHECK (compliance_status IN ('compliant', 'requires_review', 'non_compliant')),
  compliance_notes TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contract_start_date DATE,
  contract_end_date DATE,
  service_level TEXT DEFAULT 'standard',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.platform_integrations ENABLE ROW LEVEL SECURITY;

-- Create policies for platform integrations
CREATE POLICY "Users can view their own integrations" 
ON public.platform_integrations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own integrations" 
ON public.platform_integrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own integrations" 
ON public.platform_integrations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own integrations" 
ON public.platform_integrations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_platform_integrations_updated_at
BEFORE UPDATE ON public.platform_integrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();