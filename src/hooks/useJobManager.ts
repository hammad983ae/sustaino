import { useState, useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Job {
  id: string;
  jobNumber: number;
  propertyAddress: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  data?: any;
  reports?: {
    word?: string;
    pdf?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
}

// Job counter starting at 100001
let jobCounter = 100001;

export const useJobManager = () => {
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveTimeRef = useRef<number>(Date.now());
  const { toast } = useToast();

  const AUTO_SAVE_DELAY = 2500; // 2.5 seconds

  // Create job immediately when address is identified
  const createJob = useCallback(async (propertyAddress: string): Promise<Job> => {
    try {
      const jobId = uuidv4();
      const jobNumber = jobCounter++;
      
      const newJob: Job = {
        id: jobId,
        jobNumber,
        propertyAddress,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        newJob.userId = user.id;
      }

      // Save to database immediately using job_files table structure
      const { error } = await supabase
        .from('job_files')
        .insert({
          file_name: `Job_${jobNumber}_${propertyAddress.replace(/[^a-zA-Z0-9]/g, '_')}`,
          file_path: `/jobs/${jobId}`,
          file_type: 'job',
          file_category: 'property_assessment',
          description: `Property valuation job for ${propertyAddress}`,
          ai_analysis: {
            jobNumber,
            propertyAddress,
            status: 'pending'
          },
          user_id: user?.id,
        });

      if (error) {
        console.error('Error creating job:', error);
        toast({
          title: "Error",
          description: "Failed to create job. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      setCurrentJob(newJob);
      
      toast({
        title: "Job Created",
        description: `Job #${jobNumber} created for ${propertyAddress}`,
      });

      console.log(`Job created: #${jobNumber} - ${propertyAddress}`);
      return newJob;
    } catch (error) {
      console.error('Failed to create job:', error);
      throw error;
    }
  }, [toast]);

  // Auto-save job progress
  const saveJobProgress = useCallback(async (jobData?: Partial<Job>) => {
    if (!currentJob) return;

    try {
      const updatedJob = {
        ...currentJob,
        ...jobData,
        updatedAt: new Date(),
      };

      const { error } = await supabase
        .from('job_files')
        .update({
          ai_analysis: {
            ...updatedJob.data,
            status: updatedJob.status,
            reports: updatedJob.reports
          },
        })
        .eq('file_name', `Job_${currentJob.jobNumber}_${currentJob.propertyAddress.replace(/[^a-zA-Z0-9]/g, '_')}`);

      if (error) {
        console.error('Error saving job progress:', error);
        return;
      }

      setCurrentJob(updatedJob);
      console.log(`Auto-saved job #${currentJob.jobNumber} at ${updatedJob.updatedAt}`);
    } catch (error) {
      console.error('Failed to save job progress:', error);
    }
  }, [currentJob]);

  // Start auto-save functionality
  const startAutoSave = useCallback(() => {
    if (autoSaveIntervalRef.current) {
      clearInterval(autoSaveIntervalRef.current);
    }

    setAutoSaveEnabled(true);
    autoSaveIntervalRef.current = setInterval(async () => {
      const now = Date.now();
      if (now - lastSaveTimeRef.current >= AUTO_SAVE_DELAY) {
        await saveJobProgress();
        lastSaveTimeRef.current = now;
      }
    }, AUTO_SAVE_DELAY);

    console.log('Auto-save started for job:', currentJob?.jobNumber);
  }, [saveJobProgress, currentJob]);

  // Stop auto-save functionality
  const stopAutoSave = useCallback(() => {
    if (autoSaveIntervalRef.current) {
      clearInterval(autoSaveIntervalRef.current);
      autoSaveIntervalRef.current = null;
    }
    setAutoSaveEnabled(false);
    console.log('Auto-save stopped for job:', currentJob?.jobNumber);
  }, [currentJob]);

  // Update job status
  const updateJobStatus = useCallback(async (status: Job['status']) => {
    if (!currentJob) return;

    await saveJobProgress({ status });
    
    if (status === 'completed') {
      stopAutoSave();
      toast({
        title: "Job Completed",
        description: `Job #${currentJob.jobNumber} has been completed successfully.`,
      });
    }
  }, [currentJob, saveJobProgress, stopAutoSave, toast]);

  // Update job data
  const updateJobData = useCallback(async (data: any) => {
    if (!currentJob) return;

    await saveJobProgress({ 
      data,
      status: 'in_progress'
    });
  }, [currentJob, saveJobProgress]);

  // Finalize job
  const finalizeJob = useCallback(async () => {
    if (!currentJob) return;

    await updateJobStatus('completed');
    stopAutoSave();
  }, [currentJob, updateJobStatus, stopAutoSave]);

  // Generate reports
  const generateReports = useCallback(async () => {
    if (!currentJob || !currentJob.data) return;

    try {
      const reports = {
        word: `/reports/${currentJob.jobNumber}_assessment.docx`,
        pdf: `/reports/${currentJob.jobNumber}_assessment.pdf`
      };

      await saveJobProgress({ reports });
      
      toast({
        title: "Reports Generated",
        description: `Reports for Job #${currentJob.jobNumber} have been generated.`,
      });
    } catch (error) {
      console.error('Failed to generate reports:', error);
      toast({
        title: "Error",
        description: "Failed to generate reports. Please try again.",
        variant: "destructive",
      });
    }
  }, [currentJob, saveJobProgress, toast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
  }, []);

  return {
    currentJob,
    autoSaveEnabled,
    createJob,
    saveJobProgress,
    startAutoSave,
    stopAutoSave,
    updateJobStatus,
    updateJobData,
    finalizeJob,
    generateReports
  };
};