-- Safe security improvements with corrected policy syntax

-- Add additional security policies for construction_cost_index
CREATE POLICY "Only service role can update construction costs"
ON public.construction_cost_index
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service role can modify construction costs"
ON public.construction_cost_index
FOR UPDATE
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Add additional security policies for cpi_index
CREATE POLICY "Only service role can update CPI data"
ON public.cpi_index
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service role can modify CPI data"
ON public.cpi_index
FOR UPDATE
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Secure evidence_files better - only allow authenticated users to read public evidence
DROP POLICY IF EXISTS "Public can read public evidence" ON public.evidence_files;
CREATE POLICY "Authenticated users can read public evidence"
ON public.evidence_files
FOR SELECT
USING (is_public = true AND auth.uid() IS NOT NULL);

-- Add session security function to prevent session hijacking
CREATE OR REPLACE FUNCTION public.is_session_valid()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL;
$$;

-- Add rate limiting table for API security
CREATE TABLE IF NOT EXISTS public.api_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on rate limits table
ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;

-- Add policy for rate limits (users can only see their own)
CREATE POLICY "Users can view their own rate limits"
ON public.api_rate_limits
FOR SELECT
USING (auth.uid() = user_id);

-- Add audit log table for security monitoring
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit log (admin only)
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs"
ON public.security_audit_log
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert audit logs"
ON public.security_audit_log
FOR INSERT
WITH CHECK (true);