-- Fix search path issues in database functions
-- Update calculate_property_valuation function with proper search path
CREATE OR REPLACE FUNCTION public.calculate_property_valuation(property_data jsonb, market_data jsonb, comparable_sales jsonb DEFAULT NULL::jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  result JSONB;
  market_value NUMERIC;
  confidence_score NUMERIC;
BEGIN
  -- Direct Comparison Method calculation
  IF comparable_sales IS NOT NULL THEN
    market_value := (comparable_sales->>'avg_price_per_sqm')::NUMERIC * (property_data->>'building_area')::NUMERIC;
  ELSE
    -- Income Capitalization Method as fallback
    market_value := (property_data->>'annual_rent')::NUMERIC / (market_data->>'cap_rate')::NUMERIC;
  END IF;
  
  -- Calculate confidence score based on data quality
  confidence_score := CASE 
    WHEN comparable_sales IS NOT NULL THEN 95.0
    WHEN property_data->>'annual_rent' IS NOT NULL THEN 85.0
    ELSE 75.0
  END;
  
  -- Apply market adjustments
  market_value := market_value * (1 + COALESCE((market_data->>'market_adjustment')::NUMERIC, 0));
  
  result := jsonb_build_object(
    'market_value', ROUND(market_value, 2),
    'confidence_score', confidence_score,
    'methodology', CASE 
      WHEN comparable_sales IS NOT NULL THEN 'Direct Comparison'
      ELSE 'Income Capitalization'
    END,
    'calculated_at', NOW()
  );
  
  RETURN result;
END;
$function$;

-- Update calculate_esg_score function with proper search path
CREATE OR REPLACE FUNCTION public.calculate_esg_score(environmental_factors jsonb, social_factors jsonb, governance_factors jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  env_score NUMERIC;
  social_score NUMERIC;
  gov_score NUMERIC;
  overall_score NUMERIC;
  esg_premium NUMERIC;
BEGIN
  -- Environmental score calculation
  env_score := COALESCE((environmental_factors->>'energy_rating')::NUMERIC * 20, 0) +
               COALESCE((environmental_factors->>'water_efficiency')::NUMERIC * 15, 0) +
               COALESCE((environmental_factors->>'carbon_footprint')::NUMERIC * 25, 0) +
               COALESCE((environmental_factors->>'renewable_energy')::NUMERIC * 20, 0) +
               COALESCE((environmental_factors->>'waste_management')::NUMERIC * 20, 0);
  
  -- Social score calculation  
  social_score := COALESCE((social_factors->>'community_impact')::NUMERIC * 30, 0) +
                  COALESCE((social_factors->>'accessibility')::NUMERIC * 25, 0) +
                  COALESCE((social_factors->>'health_safety')::NUMERIC * 25, 0) +
                  COALESCE((social_factors->>'stakeholder_engagement')::NUMERIC * 20, 0);
  
  -- Governance score calculation
  gov_score := COALESCE((governance_factors->>'transparency')::NUMERIC * 25, 0) +
               COALESCE((governance_factors->>'compliance')::NUMERIC * 30, 0) +
               COALESCE((governance_factors->>'risk_management')::NUMERIC * 25, 0) +
               COALESCE((governance_factors->>'ethics')::NUMERIC * 20, 0);
  
  -- Overall score (weighted average)
  overall_score := (env_score * 0.4) + (social_score * 0.3) + (gov_score * 0.3);
  
  -- Calculate ESG premium (higher ESG scores command premium)
  esg_premium := CASE 
    WHEN overall_score >= 90 THEN 15.0
    WHEN overall_score >= 80 THEN 10.0
    WHEN overall_score >= 70 THEN 5.0
    WHEN overall_score >= 60 THEN 2.0
    ELSE 0.0
  END;
  
  RETURN jsonb_build_object(
    'environmental_score', ROUND(env_score, 1),
    'social_score', ROUND(social_score, 1),
    'governance_score', ROUND(gov_score, 1),
    'overall_score', ROUND(overall_score, 1),
    'esg_premium_percentage', esg_premium,
    'calculated_at', NOW()
  );
END;
$function$;

-- Update analyze_sales_evidence function with proper search path
CREATE OR REPLACE FUNCTION public.analyze_sales_evidence(subject_property jsonb, comparable_sales jsonb[])
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  comp_sale JSONB;
  adjusted_prices NUMERIC[] := ARRAY[]::NUMERIC[];
  avg_price_per_sqm NUMERIC;
  adjustment_factor NUMERIC;
  final_indication NUMERIC;
  confidence_rating TEXT;
BEGIN
  -- Analyze each comparable sale
  FOREACH comp_sale IN ARRAY comparable_sales
  LOOP
    -- Calculate adjustment factors
    adjustment_factor := 1.0;
    
    -- Size adjustment
    IF (comp_sale->>'building_area')::NUMERIC != (subject_property->>'building_area')::NUMERIC THEN
      adjustment_factor := adjustment_factor * (1 + 
        ((subject_property->>'building_area')::NUMERIC - (comp_sale->>'building_area')::NUMERIC) * 0.001);
    END IF;
    
    -- Location adjustment (simplified)
    IF comp_sale->>'location_quality' != subject_property->>'location_quality' THEN
      adjustment_factor := adjustment_factor * CASE 
        WHEN subject_property->>'location_quality' = 'premium' THEN 1.15
        WHEN subject_property->>'location_quality' = 'good' THEN 1.05
        ELSE 0.95
      END;
    END IF;
    
    -- Age/condition adjustment
    IF (comp_sale->>'year_built')::INT != (subject_property->>'year_built')::INT THEN
      adjustment_factor := adjustment_factor * (1 + 
        ((subject_property->>'year_built')::INT - (comp_sale->>'year_built')::INT) * 0.002);
    END IF;
    
    -- Add adjusted price to array
    adjusted_prices := adjusted_prices || ARRAY[(comp_sale->>'sale_price')::NUMERIC * adjustment_factor];
  END LOOP;
  
  -- Calculate average price per sqm
  SELECT AVG(price / (subject_property->>'building_area')::NUMERIC) 
  INTO avg_price_per_sqm 
  FROM unnest(adjusted_prices) AS price;
  
  -- Final market value indication
  final_indication := avg_price_per_sqm * (subject_property->>'building_area')::NUMERIC;
  
  -- Determine confidence rating
  confidence_rating := CASE 
    WHEN array_length(adjusted_prices, 1) >= 3 THEN 'High'
    WHEN array_length(adjusted_prices, 1) = 2 THEN 'Medium'
    ELSE 'Low'
  END;
  
  RETURN jsonb_build_object(
    'market_value_indication', ROUND(final_indication, 2),
    'price_per_sqm', ROUND(avg_price_per_sqm, 2),
    'confidence_rating', confidence_rating,
    'number_of_comparables', array_length(adjusted_prices, 1),
    'adjusted_sale_prices', adjusted_prices,
    'calculated_at', NOW()
  );
END;
$function$;