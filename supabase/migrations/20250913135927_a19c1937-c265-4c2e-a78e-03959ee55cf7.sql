-- Create table for construction cost index data
CREATE TABLE public.construction_cost_index (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  asset_class TEXT NOT NULL,
  base_price_per_sqm NUMERIC(10,2) NOT NULL,
  cost_index NUMERIC(6,2) NOT NULL,
  percentage_movement NUMERIC(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(month, year, asset_class)
);

-- Create table for CPI index data
CREATE TABLE public.cpi_index (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  cpi_value NUMERIC(6,2) NOT NULL,
  percentage_change NUMERIC(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(month, year)
);

-- Create table for monthly update notifications
CREATE TABLE public.monthly_update_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  notification_date DATE NOT NULL,
  notification_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.construction_cost_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cpi_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_update_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for construction cost index (readable by authenticated users)
CREATE POLICY "Construction cost index viewable by authenticated users" 
ON public.construction_cost_index 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Create policies for CPI index (readable by authenticated users)
CREATE POLICY "CPI index viewable by authenticated users" 
ON public.cpi_index 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Create policies for notifications (readable by authenticated users)
CREATE POLICY "Notifications viewable by authenticated users" 
ON public.monthly_update_notifications 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Add triggers for updated_at
CREATE TRIGGER update_construction_cost_index_updated_at
BEFORE UPDATE ON public.construction_cost_index
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cpi_index_updated_at
BEFORE UPDATE ON public.cpi_index
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for construction cost index
INSERT INTO public.construction_cost_index (month, year, asset_class, base_price_per_sqm, cost_index, percentage_movement) VALUES
('December', 2024, 'residential', 2850.00, 125.5, 3.2),
('December', 2024, 'commercial', 3420.00, 128.3, 2.8),
('December', 2024, 'industrial', 2650.00, 122.1, 4.1),
('December', 2024, 'agricultural', 1890.00, 118.7, 2.5),
('December', 2024, 'specialised', 4200.00, 132.4, 3.7),
('November', 2024, 'residential', 2760.00, 121.6, 2.9),
('November', 2024, 'commercial', 3325.00, 124.8, 2.1),
('November', 2024, 'industrial', 2545.00, 117.3, 3.8),
('November', 2024, 'agricultural', 1845.00, 115.9, 1.9),
('November', 2024, 'specialised', 4050.00, 127.6, 2.8);

-- Insert sample CPI data
INSERT INTO public.cpi_index (month, year, cpi_value, percentage_change) VALUES
('December', 2024, 136.8, 3.4),
('November', 2024, 135.2, 3.1),
('October', 2024, 134.5, 2.8),
('September', 2024, 133.1, 2.7),
('August', 2024, 131.9, 3.5),
('July', 2024, 130.2, 3.8);