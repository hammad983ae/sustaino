-- Create PDF analysis tables
CREATE TABLE public.pdf_uploads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL DEFAULT 'application/pdf',
  analysis_status TEXT NOT NULL DEFAULT 'pending' CHECK (analysis_status IN ('pending', 'processing', 'completed', 'error')),
  analysis_result JSONB,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  implemented BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pdf_uploads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own PDF uploads" 
ON public.pdf_uploads 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own PDF uploads" 
ON public.pdf_uploads 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own PDF uploads" 
ON public.pdf_uploads 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own PDF uploads" 
ON public.pdf_uploads 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_pdf_uploads_updated_at
BEFORE UPDATE ON public.pdf_uploads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage policies for PDF uploads bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('pdf-analysis', 'pdf-analysis', false);

-- Create storage policies
CREATE POLICY "Users can upload their own PDFs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'pdf-analysis' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own PDFs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'pdf-analysis' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own PDFs" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'pdf-analysis' AND auth.uid()::text = (storage.foldername(name))[1]);