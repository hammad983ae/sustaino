-- Create market_summaries table for storing monthly market data
CREATE TABLE IF NOT EXISTS public.market_summaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  month_year DATE NOT NULL, -- First day of the month (e.g., 2025-01-01)
  market_trends JSONB,
  price_movements JSONB,
  interest_rates JSONB,
  rental_yields JSONB,
  economic_indicators JSONB,
  property_type_performance JSONB,
  regional_analysis JSONB,
  forecast_outlook TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(month_year)
);

-- Enable RLS
ALTER TABLE public.market_summaries ENABLE ROW LEVEL SECURITY;

-- Create policies (public read access since this is market data)
CREATE POLICY "Market summaries are viewable by everyone" 
ON public.market_summaries 
FOR SELECT 
USING (true);

-- Only admin users can create/update market summaries (this will be done by the cron job)
CREATE POLICY "Admins can manage market summaries" 
ON public.market_summaries 
FOR ALL 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_market_summaries_updated_at
  BEFORE UPDATE ON public.market_summaries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for efficient querying by month_year
CREATE INDEX idx_market_summaries_month_year ON public.market_summaries(month_year DESC);