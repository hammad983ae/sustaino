-- Add rental review mechanism fields to rental_evidence table
ALTER TABLE public.rental_evidence 
ADD COLUMN IF NOT EXISTS review_mechanism TEXT,
ADD COLUMN IF NOT EXISTS review_frequency_months INTEGER DEFAULT 12,
ADD COLUMN IF NOT EXISTS review_percentage NUMERIC,
ADD COLUMN IF NOT EXISTS last_review_date DATE,
ADD COLUMN IF NOT EXISTS next_review_date DATE,
ADD COLUMN IF NOT EXISTS net_rent NUMERIC,
ADD COLUMN IF NOT EXISTS outgoings NUMERIC,
ADD COLUMN IF NOT EXISTS gross_rent NUMERIC,
ADD COLUMN IF NOT EXISTS cpi_adjustment_rate NUMERIC,
ADD COLUMN IF NOT EXISTS fixed_increase_rate NUMERIC,
ADD COLUMN IF NOT EXISTS location_map_url TEXT,
ADD COLUMN IF NOT EXISTS property_image_url TEXT,
ADD COLUMN IF NOT EXISTS auto_adjustment_enabled BOOLEAN DEFAULT TRUE;

-- Create function to automatically adjust rental amounts based on review mechanism
CREATE OR REPLACE FUNCTION public.calculate_adjusted_rental(
  base_rental NUMERIC,
  review_mechanism TEXT,
  review_percentage NUMERIC,
  months_since_last_review INTEGER DEFAULT 12,
  current_cpi_rate NUMERIC DEFAULT 3.5
) RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
  adjusted_amount NUMERIC;
BEGIN
  -- Default to base rental if no review mechanism
  adjusted_amount := base_rental;
  
  CASE review_mechanism
    WHEN 'cpi' THEN
      -- CPI adjustment: compound based on months since last review
      adjusted_amount := base_rental * POWER(1 + (current_cpi_rate / 100), months_since_last_review / 12.0);
      
    WHEN 'fixed_percentage' THEN
      -- Fixed percentage increase: compound based on months since last review
      adjusted_amount := base_rental * POWER(1 + (review_percentage / 100), months_since_last_review / 12.0);
      
    WHEN 'fixed_amount' THEN
      -- Fixed amount increase per year
      adjusted_amount := base_rental + (review_percentage * (months_since_last_review / 12.0));
      
    WHEN 'market_review' THEN
      -- Market review: return base rental (requires manual assessment)
      adjusted_amount := base_rental;
      
    ELSE
      -- No adjustment for unknown mechanisms
      adjusted_amount := base_rental;
  END CASE;
  
  RETURN adjusted_amount;
END;
$$;

-- Create function to update rental adjustments automatically
CREATE OR REPLACE FUNCTION public.update_rental_adjustments()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  months_diff INTEGER;
  current_cpi NUMERIC := 3.5; -- Default CPI rate, can be updated from external source
BEGIN
  -- Only process if auto adjustment is enabled and we have review mechanism
  IF NEW.auto_adjustment_enabled = TRUE AND NEW.review_mechanism IS NOT NULL THEN
    
    -- Calculate months since last review
    IF NEW.last_review_date IS NOT NULL THEN
      months_diff := EXTRACT(MONTHS FROM AGE(CURRENT_DATE, NEW.last_review_date));
    ELSE
      months_diff := NEW.review_frequency_months;
    END IF;
    
    -- Update adjusted rental if enough time has passed
    IF months_diff >= NEW.review_frequency_months THEN
      NEW.adjusted_rental := public.calculate_adjusted_rental(
        NEW.rental_amount,
        NEW.review_mechanism,
        COALESCE(NEW.review_percentage, NEW.fixed_increase_rate, NEW.cpi_adjustment_rate),
        months_diff,
        current_cpi
      );
      
      -- Update next review date
      NEW.next_review_date := CURRENT_DATE + INTERVAL '1 month' * NEW.review_frequency_months;
      NEW.last_review_date := CURRENT_DATE;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for automatic rental adjustments
DROP TRIGGER IF EXISTS trigger_update_rental_adjustments ON public.rental_evidence;
CREATE TRIGGER trigger_update_rental_adjustments
  BEFORE INSERT OR UPDATE ON public.rental_evidence
  FOR EACH ROW
  EXECUTE FUNCTION public.update_rental_adjustments();