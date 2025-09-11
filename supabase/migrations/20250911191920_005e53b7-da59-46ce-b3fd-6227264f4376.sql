-- Enable Row Level Security on valuations table
ALTER TABLE public.valuations ENABLE ROW LEVEL SECURITY;

-- Create policies for valuations table
CREATE POLICY "Users can view their own valuations" 
ON public.valuations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own valuations" 
ON public.valuations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own valuations" 
ON public.valuations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own valuations" 
ON public.valuations 
FOR DELETE 
USING (auth.uid() = user_id);