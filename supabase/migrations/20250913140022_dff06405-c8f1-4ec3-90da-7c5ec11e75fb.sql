-- Create database functions to fetch construction cost and CPI data
CREATE OR REPLACE FUNCTION public.get_construction_cost_index()
RETURNS TABLE (
  id UUID,
  month TEXT,
  year INTEGER,
  asset_class TEXT,
  base_price_per_sqm NUMERIC,
  cost_index NUMERIC,
  percentage_movement NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.month,
    c.year,
    c.asset_class,
    c.base_price_per_sqm,
    c.cost_index,
    c.percentage_movement,
    c.created_at
  FROM public.construction_cost_index c
  ORDER BY c.year DESC, c.month DESC;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_cpi_index()
RETURNS TABLE (
  id UUID,
  month TEXT,
  year INTEGER,
  cpi_value NUMERIC,
  percentage_change NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.month,
    c.year,
    c.cpi_value,
    c.percentage_change,
    c.created_at
  FROM public.cpi_index c
  ORDER BY c.year DESC, c.month DESC
  LIMIT 12;
END;
$function$;