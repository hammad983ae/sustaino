-- Create competitive threats tracking table
CREATE TABLE public.competitive_threats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  threat_type TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  user_agent TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  risk_score INTEGER NOT NULL DEFAULT 0,
  action_taken TEXT NOT NULL DEFAULT 'logged',
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create honeypot accesses tracking table
CREATE TABLE public.honeypot_accesses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  organization TEXT,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blocked IPs table
CREATE TABLE public.blocked_ips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  ip_address TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  blocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create protection configuration table
CREATE TABLE public.protection_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  honeypots_active BOOLEAN NOT NULL DEFAULT true,
  rate_limiting BOOLEAN NOT NULL DEFAULT true,
  ip_blocking BOOLEAN NOT NULL DEFAULT true,
  watermarking BOOLEAN NOT NULL DEFAULT true,
  decoy_endpoints BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.competitive_threats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.honeypot_accesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_ips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protection_config ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for competitive_threats
CREATE POLICY "Users can manage their own threat data"
ON public.competitive_threats
FOR ALL
USING (auth.uid() = user_id);

-- Create RLS policies for honeypot_accesses
CREATE POLICY "Users can manage their own honeypot data"
ON public.honeypot_accesses
FOR ALL
USING (auth.uid() = user_id);

-- Create RLS policies for blocked_ips
CREATE POLICY "Users can manage their own blocked IPs"
ON public.blocked_ips
FOR ALL
USING (auth.uid() = user_id);

-- Create RLS policies for protection_config
CREATE POLICY "Users can manage their own protection config"
ON public.protection_config
FOR ALL
USING (auth.uid() = user_id);