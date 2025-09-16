-- Create financial_metrics table for storing comprehensive financial data
CREATE TABLE public.financial_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_name TEXT,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  sales DECIMAL(15,2) NOT NULL DEFAULT 0,
  cogs DECIMAL(15,2) NOT NULL DEFAULT 0,
  gross_profit DECIMAL(15,2) NOT NULL DEFAULT 0,
  operating_income DECIMAL(15,2) NOT NULL DEFAULT 0,
  ebit DECIMAL(15,2) NOT NULL DEFAULT 0,
  interest_expense DECIMAL(15,2) NOT NULL DEFAULT 0,
  net_profit DECIMAL(15,2) NOT NULL DEFAULT 0,
  depreciation DECIMAL(15,2),
  total_assets DECIMAL(15,2) NOT NULL DEFAULT 0,
  current_assets DECIMAL(15,2) NOT NULL DEFAULT 0,
  inventory DECIMAL(15,2) NOT NULL DEFAULT 0,
  accounts_receivable DECIMAL(15,2) NOT NULL DEFAULT 0,
  total_liabilities DECIMAL(15,2) NOT NULL DEFAULT 0,
  current_liabilities DECIMAL(15,2) NOT NULL DEFAULT 0,
  long_term_debt DECIMAL(15,2) NOT NULL DEFAULT 0,
  total_stockholders_equity DECIMAL(15,2) NOT NULL DEFAULT 0,
  operating_cash_flow DECIMAL(15,2),
  investing_cash_flow DECIMAL(15,2),
  financing_cash_flow DECIMAL(15,2),
  common_stock_outstanding DECIMAL(15,2) NOT NULL DEFAULT 0,
  annual_dividends_per_share DECIMAL(10,4),
  current_market_price_per_share DECIMAL(10,4),
  ghg_emissions_tons DECIMAL(10,2),
  water_usage_ml DECIMAL(10,2),
  waste_recycled_percentage DECIMAL(5,2),
  renewable_energy_percentage DECIMAL(5,2),
  biodiversity_score DECIMAL(3,1),
  community_investment DECIMAL(15,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create financial_ratios table for calculated ratios
CREATE TABLE public.financial_ratios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metrics_id UUID NOT NULL REFERENCES public.financial_metrics(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  current_ratio DECIMAL(10,4),
  quick_ratio DECIMAL(10,4),
  debt_to_equity_ratio DECIMAL(10,4),
  return_on_assets DECIMAL(10,4),
  return_on_stockholders_equity DECIMAL(10,4),
  gross_profit_margin DECIMAL(10,4),
  net_profit_margin DECIMAL(10,4),
  operating_profit_margin DECIMAL(10,4),
  earnings_per_share DECIMAL(10,4),
  working_capital DECIMAL(15,2),
  debt_to_total_assets_ratio DECIMAL(10,4),
  times_interest_earned_ratio DECIMAL(10,4),
  inventory_turnover DECIMAL(10,4),
  accounts_receivable_turnover DECIMAL(10,4),
  price_earnings_ratio DECIMAL(10,4),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create financial_reports table for storing generated reports
CREATE TABLE public.financial_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metrics_id UUID NOT NULL REFERENCES public.financial_metrics(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  report_type TEXT NOT NULL,
  report_data JSONB NOT NULL,
  ai_analysis TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.financial_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_ratios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for financial_metrics
CREATE POLICY "Users can view their own financial metrics" 
ON public.financial_metrics 
FOR SELECT 
USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can create their own financial metrics" 
ON public.financial_metrics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id::uuid);

CREATE POLICY "Users can update their own financial metrics" 
ON public.financial_metrics 
FOR UPDATE 
USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can delete their own financial metrics" 
ON public.financial_metrics 
FOR DELETE 
USING (auth.uid() = user_id::uuid);

-- Create RLS policies for financial_ratios
CREATE POLICY "Users can view their own financial ratios" 
ON public.financial_ratios 
FOR SELECT 
USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can create their own financial ratios" 
ON public.financial_ratios 
FOR INSERT 
WITH CHECK (auth.uid() = user_id::uuid);

CREATE POLICY "Users can update their own financial ratios" 
ON public.financial_ratios 
FOR UPDATE 
USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can delete their own financial ratios" 
ON public.financial_ratios 
FOR DELETE 
USING (auth.uid() = user_id::uuid);

-- Create RLS policies for financial_reports
CREATE POLICY "Users can view their own financial reports" 
ON public.financial_reports 
FOR SELECT 
USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can create their own financial reports" 
ON public.financial_reports 
FOR INSERT 
WITH CHECK (auth.uid() = user_id::uuid);

CREATE POLICY "Users can update their own financial reports" 
ON public.financial_reports 
FOR UPDATE 
USING (auth.uid() = user_id::uuid);

CREATE POLICY "Users can delete their own financial reports" 
ON public.financial_reports 
FOR DELETE 
USING (auth.uid() = user_id::uuid);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_financial_metrics_updated_at
BEFORE UPDATE ON public.financial_metrics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_financial_ratios_updated_at
BEFORE UPDATE ON public.financial_ratios
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_financial_reports_updated_at
BEFORE UPDATE ON public.financial_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();