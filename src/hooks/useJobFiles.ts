import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface JobFile {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_category: string;
  description: string;
  file_size: number;
  tags: string[];
  is_primary: boolean;
  created_at: string;
  mime_type: string;
  metadata: any;
}

interface JobNote {
  id: string;
  title: string;
  content: string;
  note_type: string;
  location_tag: string;
  priority: string;
  created_at: string;
}

export const useJobFiles = (jobId?: string) => {
  const [files, setFiles] = useState<JobFile[]>([]);
  const [notes, setNotes] = useState<JobNote[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadJobFiles = async (targetJobId: string) => {
    if (!targetJobId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('job_files')
        .select('*')
        .eq('job_id', targetJobId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error loading files:', error);
      toast({
        title: "Error",
        description: "Failed to load job files",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadJobNotes = async (targetJobId: string) => {
    if (!targetJobId) return;
    
    try {
      const { data, error } = await supabase
        .from('job_notes')
        .select('*')
        .eq('job_id', targetJobId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const uploadFile = async (
    targetJobId: string, 
    file: File, 
    fileType: string, 
    description?: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/job_${targetJobId}/${Date.now()}.${fileExt}`;
      const bucket = fileType === 'photo' ? 'property-images' : 'documents';

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('job_files')
        .insert({
          job_id: targetJobId,
          user_id: user.id,
          file_name: file.name,
          file_path: fileName,
          file_type: fileType,
          file_category: fileType === 'photo' ? 'property_photos' : 'documents',
          mime_type: file.type,
          file_size: file.size,
          description: description || `${fileType} uploaded`
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: `${fileType} uploaded successfully`
      });

      // Reload files
      loadJobFiles(targetJobId);
      return true;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload file",
        variant: "destructive"
      });
      return false;
    }
  };

  const addNote = async (
    targetJobId: string,
    noteData: {
      title: string;
      content: string;
      note_type: string;
      location_tag?: string;
      priority: string;
    }
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('job_notes')
        .insert({
          job_id: targetJobId,
          user_id: user.id,
          ...noteData
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Note added successfully"
      });

      // Reload notes
      loadJobNotes(targetJobId);
      return true;
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: "Error",
        description: "Failed to add note",
        variant: "destructive"
      });
      return false;
    }
  };

  const deleteFile = async (fileId: string, targetJobId: string) => {
    try {
      const { error } = await supabase
        .from('job_files')
        .delete()
        .eq('id', fileId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "File deleted successfully"
      });

      loadJobFiles(targetJobId);
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive"
      });
    }
  };

  const deleteNote = async (noteId: string, targetJobId: string) => {
    try {
      const { error } = await supabase
        .from('job_notes')
        .delete()
        .eq('id', noteId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Note deleted successfully"
      });

      loadJobNotes(targetJobId);
    } catch (error) {
      console.error('Error deleting note:', error);
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive"
      });
    }
  };

  const getFileUrl = async (filePath: string, bucket: string) => {
    try {
      const { data } = await supabase.storage
        .from(bucket)
        .createSignedUrl(filePath, 3600); // 1 hour expiry

      return data?.signedUrl;
    } catch (error) {
      console.error('Error getting file URL:', error);
      return null;
    }
  };

  useEffect(() => {
    if (jobId) {
      loadJobFiles(jobId);
      loadJobNotes(jobId);
    }
  }, [jobId]);

  return {
    files,
    notes,
    loading,
    loadJobFiles,
    loadJobNotes,
    uploadFile,
    addNote,
    deleteFile,
    deleteNote,
    getFileUrl
  };
};