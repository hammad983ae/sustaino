-- Create storage bucket for insurance valuation documents and photos
INSERT INTO storage.buckets (id, name, public) VALUES ('insurance-valuations', 'insurance-valuations', false);

-- Create policies for insurance valuation file uploads
CREATE POLICY "Users can upload their own insurance files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'insurance-valuations' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own insurance files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'insurance-valuations' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own insurance files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'insurance-valuations' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own insurance files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'insurance-valuations' AND auth.uid()::text = (storage.foldername(name))[1]);