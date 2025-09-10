-- Create RLS policies for job_files table to allow users to manage their own jobs

-- Policy for users to view their own job files
CREATE POLICY "Users can view their own job files" 
ON public.job_files 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy for users to create their own job files
CREATE POLICY "Users can create their own job files" 
ON public.job_files 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own job files
CREATE POLICY "Users can update their own job files" 
ON public.job_files 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Policy for users to delete their own job files
CREATE POLICY "Users can delete their own job files" 
ON public.job_files 
FOR DELETE 
USING (auth.uid() = user_id);