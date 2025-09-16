-- Create shared evidence storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('shared-evidence', 'shared-evidence', false, 52428800, ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']),
  ('evidence-uploads', 'evidence-uploads', true, 20971520, ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

-- Create RLS policies for shared evidence bucket (authenticated users can read/write)
CREATE POLICY "Authenticated users can view shared evidence" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'shared-evidence' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can upload shared evidence" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'shared-evidence' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update shared evidence" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'shared-evidence' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own shared evidence" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'shared-evidence' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create RLS policies for public evidence uploads bucket (anyone can read, authenticated can write)
CREATE POLICY "Public evidence uploads are viewable by everyone" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'evidence-uploads');

CREATE POLICY "Authenticated users can upload to evidence uploads" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'evidence-uploads' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own evidence uploads" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'evidence-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own evidence uploads" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'evidence-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create evidence files metadata table to track uploaded files
CREATE TABLE public.evidence_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  bucket_name TEXT NOT NULL,
  evidence_type TEXT NOT NULL, -- 'sales', 'rental', 'planning', 'inspection'
  property_address TEXT,
  extraction_status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  extracted_data JSONB,
  source_url TEXT,
  upload_method TEXT DEFAULT 'manual', -- 'manual', 'scraper', 'api'
  is_public BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on evidence_files
ALTER TABLE public.evidence_files ENABLE ROW LEVEL SECURITY;

-- RLS policies for evidence_files
CREATE POLICY "Users can view all evidence files" 
ON public.evidence_files 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create evidence file records" 
ON public.evidence_files 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own evidence file records" 
ON public.evidence_files 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own evidence file records" 
ON public.evidence_files 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger to update updated_at
CREATE TRIGGER update_evidence_files_updated_at
BEFORE UPDATE ON public.evidence_files
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();