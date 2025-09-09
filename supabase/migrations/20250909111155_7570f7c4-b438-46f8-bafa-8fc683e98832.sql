-- Add report_data column to store report form data
ALTER TABLE public.reports 
ADD COLUMN report_data JSONB DEFAULT '{}';

-- Add report_progress column to track completion percentage
ALTER TABLE public.reports 
ADD COLUMN report_progress INTEGER DEFAULT 0;

-- Add current_section column to track where user left off
ALTER TABLE public.reports 
ADD COLUMN current_section INTEGER DEFAULT 0;