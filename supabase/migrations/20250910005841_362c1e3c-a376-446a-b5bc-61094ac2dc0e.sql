-- Create job_files table to organize files by job
CREATE TABLE public.job_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.valuation_jobs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'photo', 'document', 'note', 'drawing', 'survey'
  file_category TEXT, -- 'property_photos', 'legal_docs', 'site_plans', 'inspection_notes'
  mime_type TEXT,
  file_size INTEGER,
  description TEXT,
  metadata JSONB DEFAULT '{}', -- store additional file info like GPS coords, camera settings, etc.
  tags TEXT[], -- searchable tags
  is_primary BOOLEAN DEFAULT false, -- mark primary property photo
  upload_source TEXT DEFAULT 'manual', -- 'manual', 'ocr', 'ai_generated', 'imported'
  processing_status TEXT DEFAULT 'completed', -- 'pending', 'processing', 'completed', 'failed'
  ocr_text TEXT, -- extracted text if OCR was performed
  ai_analysis JSONB, -- AI-generated insights about the file
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_notes table for text-based notes and observations
CREATE TABLE public.job_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.valuation_jobs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  note_type TEXT DEFAULT 'general', -- 'general', 'inspection', 'valuation', 'market_analysis', 'risk_assessment'
  location_tag TEXT, -- 'exterior', 'interior', 'kitchen', 'bathroom', 'roof', 'foundation'
  priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'critical'
  is_private BOOLEAN DEFAULT false, -- internal notes vs client-visible
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_job_files_job_id ON public.job_files(job_id);
CREATE INDEX idx_job_files_user_id ON public.job_files(user_id);
CREATE INDEX idx_job_files_type ON public.job_files(file_type);
CREATE INDEX idx_job_files_category ON public.job_files(file_category);
CREATE INDEX idx_job_files_tags ON public.job_files USING GIN(tags);
CREATE INDEX idx_job_notes_job_id ON public.job_notes(job_id);
CREATE INDEX idx_job_notes_user_id ON public.job_notes(user_id);
CREATE INDEX idx_job_notes_type ON public.job_notes(note_type);

-- Enable RLS
ALTER TABLE public.job_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for job_files
CREATE POLICY "Users can view their own job files" ON public.job_files
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own job files" ON public.job_files
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own job files" ON public.job_files
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own job files" ON public.job_files
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for job_notes
CREATE POLICY "Users can view their own job notes" ON public.job_notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own job notes" ON public.job_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own job notes" ON public.job_notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own job notes" ON public.job_notes
  FOR DELETE USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_job_files_updated_at
  BEFORE UPDATE ON public.job_files
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_notes_updated_at
  BEFORE UPDATE ON public.job_notes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage policies for job-specific organization
CREATE POLICY "Users can upload files to their job folders" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'property-images' AND 
    auth.uid()::text = (storage.foldername(name))[1] AND
    (storage.foldername(name))[2] LIKE 'job_%'
  );

CREATE POLICY "Users can view files in their job folders" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'property-images' AND 
    auth.uid()::text = (storage.foldername(name))[1] AND
    (storage.foldername(name))[2] LIKE 'job_%'
  );

CREATE POLICY "Users can update files in their job folders" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'property-images' AND 
    auth.uid()::text = (storage.foldername(name))[1] AND
    (storage.foldername(name))[2] LIKE 'job_%'
  );

CREATE POLICY "Users can delete files from their job folders" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'property-images' AND 
    auth.uid()::text = (storage.foldername(name))[1] AND
    (storage.foldername(name))[2] LIKE 'job_%'
  );

-- Similar policies for documents bucket
CREATE POLICY "Users can upload documents to their job folders" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1] AND
    (storage.foldername(name))[2] LIKE 'job_%'
  );

CREATE POLICY "Users can view documents in their job folders" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1] AND
    (storage.foldername(name))[2] LIKE 'job_%'
  );

CREATE POLICY "Users can update documents in their job folders" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1] AND
    (storage.foldername(name))[2] LIKE 'job_%'
  );

CREATE POLICY "Users can delete documents from their job folders" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1] AND
    (storage.foldername(name))[2] LIKE 'job_%'
  );