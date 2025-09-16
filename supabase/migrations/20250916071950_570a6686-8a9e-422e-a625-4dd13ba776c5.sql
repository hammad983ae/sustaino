-- Create investment properties table
CREATE TABLE public.investment_properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  property_address TEXT NOT NULL,
  total_property_value NUMERIC NOT NULL,
  minimum_investment NUMERIC NOT NULL DEFAULT 100,
  maximum_investment NUMERIC,
  target_amount NUMERIC NOT NULL,
  raised_amount NUMERIC NOT NULL DEFAULT 0,
  investment_deadline DATE NOT NULL,
  expected_annual_return NUMERIC,
  property_type TEXT NOT NULL,
  location_score INTEGER DEFAULT 0,
  rental_yield NUMERIC,
  property_images JSONB DEFAULT '[]'::jsonb,
  investment_status TEXT NOT NULL DEFAULT 'active' CHECK (investment_status IN ('active', 'funded', 'closed', 'cancelled')),
  funding_progress NUMERIC GENERATED ALWAYS AS (
    CASE 
      WHEN target_amount > 0 THEN (raised_amount / target_amount) * 100
      ELSE 0
    END
  ) STORED,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create investment pools table
CREATE TABLE public.investment_pools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  investment_property_id UUID NOT NULL REFERENCES public.investment_properties(id) ON DELETE CASCADE,
  pool_name TEXT NOT NULL,
  pool_description TEXT,
  minimum_pool_size NUMERIC NOT NULL DEFAULT 1000,
  maximum_pool_size NUMERIC,
  current_pool_size NUMERIC NOT NULL DEFAULT 0,
  number_of_investors INTEGER NOT NULL DEFAULT 0,
  pool_status TEXT NOT NULL DEFAULT 'open' CHECK (pool_status IN ('open', 'closed', 'funded', 'investing')),
  management_fee_percentage NUMERIC DEFAULT 2.0,
  performance_fee_percentage NUMERIC DEFAULT 20.0,
  lock_in_period_months INTEGER DEFAULT 12,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pool investments table (individual user investments)
CREATE TABLE public.pool_investments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pool_id UUID NOT NULL REFERENCES public.investment_pools(id) ON DELETE CASCADE,
  investment_property_id UUID NOT NULL REFERENCES public.investment_properties(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL,
  investment_amount NUMERIC NOT NULL,
  investment_units NUMERIC NOT NULL,
  unit_price NUMERIC NOT NULL,
  investment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  investment_status TEXT NOT NULL DEFAULT 'active' CHECK (investment_status IN ('active', 'pending', 'sold', 'cancelled')),
  expected_returns NUMERIC,
  actual_returns NUMERIC DEFAULT 0,
  ownership_percentage NUMERIC GENERATED ALWAYS AS (
    CASE 
      WHEN investment_amount > 0 THEN 
        (investment_amount / (SELECT current_pool_size FROM public.investment_pools WHERE id = pool_id)) * 100
      ELSE 0
    END
  ) STORED,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create investment transactions table
CREATE TABLE public.investment_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  investment_property_id UUID REFERENCES public.investment_properties(id) ON DELETE SET NULL,
  pool_id UUID REFERENCES public.investment_pools(id) ON DELETE SET NULL,
  pool_investment_id UUID REFERENCES public.pool_investments(id) ON DELETE SET NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('investment', 'withdrawal', 'dividend', 'fee', 'sale')),
  amount NUMERIC NOT NULL,
  transaction_fee NUMERIC DEFAULT 0,
  net_amount NUMERIC GENERATED ALWAYS AS (amount - COALESCE(transaction_fee, 0)) STORED,
  transaction_status TEXT NOT NULL DEFAULT 'pending' CHECK (transaction_status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_method TEXT,
  transaction_reference TEXT,
  notes TEXT,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create investment returns table
CREATE TABLE public.investment_returns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  investment_property_id UUID NOT NULL REFERENCES public.investment_properties(id) ON DELETE CASCADE,
  pool_id UUID NOT NULL REFERENCES public.investment_pools(id) ON DELETE CASCADE,
  return_period DATE NOT NULL,
  return_type TEXT NOT NULL CHECK (return_type IN ('rental', 'capital_gain', 'dividend', 'interest')),
  total_return_amount NUMERIC NOT NULL,
  return_per_unit NUMERIC NOT NULL,
  distribution_date DATE,
  return_status TEXT NOT NULL DEFAULT 'calculated' CHECK (return_status IN ('calculated', 'distributed', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.investment_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pool_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_returns ENABLE ROW LEVEL SECURITY;

-- RLS Policies for investment_properties
CREATE POLICY "Investment properties are viewable by everyone" 
ON public.investment_properties FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own investment properties" 
ON public.investment_properties FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own investment properties" 
ON public.investment_properties FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own investment properties" 
ON public.investment_properties FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for investment_pools
CREATE POLICY "Investment pools are viewable by everyone" 
ON public.investment_pools FOR SELECT 
USING (true);

CREATE POLICY "Property owners can create pools for their properties" 
ON public.investment_pools FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.investment_properties 
    WHERE id = investment_property_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Property owners can update their pools" 
ON public.investment_pools FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.investment_properties 
    WHERE id = investment_property_id AND user_id = auth.uid()
  )
);

-- RLS Policies for pool_investments
CREATE POLICY "Users can view all pool investments" 
ON public.pool_investments FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own investments" 
ON public.pool_investments FOR INSERT 
WITH CHECK (auth.uid() = investor_id);

CREATE POLICY "Users can update their own investments" 
ON public.pool_investments FOR UPDATE 
USING (auth.uid() = investor_id);

-- RLS Policies for investment_transactions
CREATE POLICY "Users can view their own transactions" 
ON public.investment_transactions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions" 
ON public.investment_transactions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions" 
ON public.investment_transactions FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for investment_returns
CREATE POLICY "Investment returns are viewable by everyone" 
ON public.investment_returns FOR SELECT 
USING (true);

CREATE POLICY "Property owners can manage returns for their properties" 
ON public.investment_returns FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.investment_properties 
    WHERE id = investment_property_id AND user_id = auth.uid()
  )
);

-- Create indexes for better performance
CREATE INDEX idx_investment_properties_status ON public.investment_properties(investment_status);
CREATE INDEX idx_investment_properties_user ON public.investment_properties(user_id);
CREATE INDEX idx_investment_pools_property ON public.investment_pools(investment_property_id);
CREATE INDEX idx_pool_investments_investor ON public.pool_investments(investor_id);
CREATE INDEX idx_pool_investments_pool ON public.pool_investments(pool_id);
CREATE INDEX idx_investment_transactions_user ON public.investment_transactions(user_id);
CREATE INDEX idx_investment_transactions_type ON public.investment_transactions(transaction_type);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_investment_properties_updated_at
  BEFORE UPDATE ON public.investment_properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_investment_pools_updated_at
  BEFORE UPDATE ON public.investment_pools
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pool_investments_updated_at
  BEFORE UPDATE ON public.pool_investments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_investment_returns_updated_at
  BEFORE UPDATE ON public.investment_returns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();