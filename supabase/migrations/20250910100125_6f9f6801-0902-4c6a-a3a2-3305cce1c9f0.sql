-- Fix security definer functions that don't actually need SECURITY DEFINER
-- The get_partner_branding function doesn't need SECURITY DEFINER since it only reads public partner data

-- Recreate get_partner_branding without SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.get_partner_branding(domain_name text DEFAULT NULL::text)
RETURNS TABLE(partner_code text, company_name text, logo_url text, primary_color text, secondary_color text, features jsonb)
LANGUAGE plpgsql
STABLE
SET search_path TO 'public'
AS $function$
BEGIN
  IF domain_name IS NOT NULL THEN
    RETURN QUERY
    SELECT 
      p.partner_code,
      p.company_name,
      p.logo_url,
      p.primary_color,
      p.secondary_color,
      p.features
    FROM public.partners p
    WHERE p.domain = domain_name AND p.is_active = true
    LIMIT 1;
  ELSE
    -- Default to DeLorenzo Property
    RETURN QUERY
    SELECT 
      p.partner_code,
      p.company_name,
      p.logo_url,
      p.primary_color,
      p.secondary_color,
      p.features
    FROM public.partners p
    WHERE p.partner_code = 'delorenzo'
    LIMIT 1;
  END IF;
END;
$function$;