import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ClientDetails {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  contactPreference?: 'email' | 'phone' | 'both';
}

interface TaskItem {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface JobFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  uploadedAt: string;
  category?: 'document' | 'image' | 'report' | 'other';
}

interface JobData {
  id?: string;
  title: string;
  propertyAddress: string;
  status: 'draft' | 'in_progress' | 'completed' | 'cancelled';
  type: 'valuation' | 'assessment' | 'inspection';
  priority?: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
  dueDate?: string;
  notes?: string;
  
  // Client information
  client: ClientDetails;
  
  // Assessment data
  data: {
    reportData: any;
    addressData: any;
    assessmentProgress: any;
    componentData: Record<string, any>;
  };
  
  // Workflow management
  tasks: TaskItem[];
  
  // File management
  files: JobFile[];
  
  // Financial details
  fee?: number;
  paid?: boolean;
  invoiceNumber?: string;
}

const JOBS_STORAGE_KEY = 'property_valuation_jobs';

export const useJobManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Get all jobs for current user
  const getAllJobs = useCallback(async (): Promise<JobData[]> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || 'demo_user';
      
      const stored = localStorage.getItem(`${JOBS_STORAGE_KEY}_${userId}`);
      if (stored) {
        return JSON.parse(stored);
      }
      
      return [];
    } catch (error) {
      console.error('Error getting jobs:', error);
      return [];
    }
  }, []);

  // Create a new job
  const createJob = useCallback(async (jobData: Omit<JobData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || 'demo_user';
      
      const newJob: JobData = {
        ...jobData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const existingJobs = await getAllJobs();
      const updatedJobs = [...existingJobs, newJob];
      
      localStorage.setItem(`${JOBS_STORAGE_KEY}_${userId}`, JSON.stringify(updatedJobs));
      
      toast({
        title: "Job Created",
        description: `New ${jobData.type} job created successfully`,
        variant: "default"
      });
      
      return newJob.id;
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error",
        description: "Failed to create job",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [getAllJobs, toast]);

  // Update an existing job
  const updateJob = useCallback(async (jobId: string, updates: Partial<JobData>): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || 'demo_user';
      
      const existingJobs = await getAllJobs();
      const jobIndex = existingJobs.findIndex(job => job.id === jobId);
      
      if (jobIndex === -1) {
        throw new Error('Job not found');
      }
      
      existingJobs[jobIndex] = {
        ...existingJobs[jobIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`${JOBS_STORAGE_KEY}_${userId}`, JSON.stringify(existingJobs));
      
      return true;
    } catch (error) {
      console.error('Error updating job:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getAllJobs]);

  // Get a specific job
  const getJob = useCallback(async (jobId: string): Promise<JobData | null> => {
    try {
      const jobs = await getAllJobs();
      return jobs.find(job => job.id === jobId) || null;
    } catch (error) {
      console.error('Error getting job:', error);
      return null;
    }
  }, [getAllJobs]);

  // Delete a job
  const deleteJob = useCallback(async (jobId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || 'demo_user';
      
      const existingJobs = await getAllJobs();
      const filteredJobs = existingJobs.filter(job => job.id !== jobId);
      
      localStorage.setItem(`${JOBS_STORAGE_KEY}_${userId}`, JSON.stringify(filteredJobs));
      
      toast({
        title: "Job Deleted",
        description: "Job has been deleted successfully",
        variant: "default"
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getAllJobs, toast]);

  // Archive completed job and start fresh session
  const archiveAndStartFresh = useCallback(async (currentData: any): Promise<string | null> => {
    try {
      // Create job from current session data
      const jobData: Omit<JobData, 'id' | 'createdAt' | 'updatedAt'> = {
        title: `Valuation - ${currentData.addressData?.propertyAddress || 'Property'}`,
        propertyAddress: currentData.addressData?.propertyAddress || 'Unknown Address',
        status: 'completed',
        type: 'valuation',
        priority: 'medium',
        data: {
          reportData: currentData.reportData || {},
          addressData: currentData.addressData || {},
          assessmentProgress: currentData.assessmentProgress || {},
          componentData: currentData.componentData || {}
        },
        client: {
          name: 'Assessment Client',
          contactPreference: 'email'
        },
        tasks: [],
        files: [],
        notes: `Completed assessment on ${new Date().toLocaleDateString()}`
      };

      const jobId = await createJob(jobData);
      
      if (jobId) {
        // Clear current session to start fresh
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id || 'demo_user';
        
        // Clear unified storage for fresh start
        localStorage.removeItem(`unified_property_data_${userId}`);
        localStorage.removeItem(`unified_property_data_backup_${userId}`);
        
        // Dispatch event to notify components
        window.dispatchEvent(new CustomEvent('jobArchivedStartFresh', { 
          detail: { jobId, timestamp: Date.now() } 
        }));
        
        toast({
          title: "Assessment Archived",
          description: "Previous assessment saved as job. Starting fresh session.",
          variant: "default"
        });
      }
      
      return jobId;
    } catch (error) {
      console.error('Error archiving job:', error);
      return null;
    }
  }, [createJob, toast]);

  // Load a job into current session
  const loadJobIntoSession = useCallback(async (jobId: string): Promise<boolean> => {
    try {
      const job = await getJob(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || 'demo_user';
      
      // Load job data into unified storage
      const unifiedData = {
        ...job.data,
        lastUpdated: new Date().toISOString(),
        userId,
        isDemo: !user,
        loadedFromJobId: jobId
      };
      
      localStorage.setItem(`unified_property_data_${userId}`, JSON.stringify(unifiedData));
      
      // Dispatch event to notify components
      window.dispatchEvent(new CustomEvent('jobLoadedIntoSession', { 
        detail: { jobId, timestamp: Date.now() } 
      }));
      
      toast({
        title: "Job Loaded",
        description: `Loaded job: ${job.title}`,
        variant: "default"
      });
      
      return true;
    } catch (error) {
      console.error('Error loading job into session:', error);
      toast({
        title: "Error",
        description: "Failed to load job",
        variant: "destructive"
      });
      return false;
    }
  }, [getJob, toast]);

  return {
    // Core operations
    getAllJobs,
    createJob,
    updateJob,
    getJob,
    deleteJob,
    
    // Session management
    archiveAndStartFresh,
    loadJobIntoSession,
    
    // Status
    isLoading
  };
};