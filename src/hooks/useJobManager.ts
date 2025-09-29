import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';

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
      const response = await apiClient.getJobs();
      if (response.success) {
        return response.data.jobs.map((job: any) => ({
          id: job._id,
          title: job.title,
          propertyAddress: job.property?.address?.fullAddress || job.property?.fullAddress || 'Unknown Address',
          status: job.status,
          type: job.jobType?.toLowerCase() || 'valuation',
          priority: job.priority,
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
          dueDate: job.dueDate,
          notes: job.notes,
          client: job.client,
          data: {
            reportData: {},
            addressData: {},
            assessmentProgress: {},
            componentData: {}
          },
          tasks: [],
          files: []
        }));
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
      
      const response = await apiClient.createJob({
        title: jobData.title,
        description: jobData.notes || '',
        jobType: jobData.type === 'valuation' ? 'Property Valuation' : jobData.type,
        purpose: 'valuation',
        client: jobData.client,
        dueDate: jobData.dueDate || null,
        priority: jobData.priority || 'medium',
        estimatedValue: 0,
        notes: jobData.notes || ''
      });
      
      if (response.success) {
        toast({
          title: "Job Created",
          description: `New ${jobData.type} job created successfully`,
          variant: "default"
        });
        
        return response.data.job._id;
      }
      
      throw new Error(response.message || 'Failed to create job');
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
  }, [toast]);

  // Update an existing job
  const updateJob = useCallback(async (jobId: string, updates: Partial<JobData>): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await apiClient.updateJob(jobId, {
        title: updates.title,
        description: updates.notes,
        jobType: updates.type === 'valuation' ? 'Property Valuation' : updates.type,
        client: updates.client,
        dueDate: updates.dueDate,
        priority: updates.priority,
        notes: updates.notes
      });
      
      if (response.success) {
        return true;
      }
      
      throw new Error(response.message || 'Failed to update job');
    } catch (error) {
      console.error('Error updating job:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get a specific job
  const getJob = useCallback(async (jobId: string): Promise<JobData | null> => {
    try {
      const response = await apiClient.getJob(jobId);
      if (response.success) {
        const job = response.data.job;
        return {
          id: job._id,
          title: job.title,
          propertyAddress: job.property?.address?.fullAddress || job.property?.fullAddress || 'Unknown Address',
          status: job.status,
          type: job.jobType?.toLowerCase() || 'valuation',
          priority: job.priority,
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
          dueDate: job.dueDate,
          notes: job.notes,
          client: job.client,
          data: {
            reportData: {},
            addressData: {},
            assessmentProgress: {},
            componentData: {}
          },
          tasks: [],
          files: []
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting job:', error);
      return null;
    }
  }, []);

  // Delete a job
  const deleteJob = useCallback(async (jobId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await apiClient.deleteJob(jobId);
      if (response.success) {
        toast({
          title: "Job Deleted",
          description: "Job has been deleted successfully",
          variant: "default"
        });
        return true;
      }
      
      throw new Error(response.message || 'Failed to delete job');
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
  }, [toast]);

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
      const response = await apiClient.getJob(jobId);
      if (!response.success) {
        throw new Error('Job not found');
      }

      const job = response.data.job;
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || 'demo_user';
      
      console.log('Loading job with full data:', job);
      console.log('Job property data:', job.property);
      console.log('Property address data:', job.property?.address);
      
      // Extract property data from job
      const property = job.property;
      let addressData = {};
      
      if (property?.address) {
        addressData = {
          propertyAddress: property.address.fullAddress || `${property.address.streetNumber || ''} ${property.address.streetName || ''} ${property.address.streetType || ''}, ${property.address.suburb || ''}, ${property.address.state || ''} ${property.address.postcode || ''}`.trim(),
          streetNumber: property.address.streetNumber || '',
          streetName: property.address.streetName || '',
          streetType: property.address.streetType || '',
          suburb: property.address.suburb || '',
          state: property.address.state || '',
          postcode: property.address.postcode || '',
          country: property.address.country || 'Australia',
          unitNumber: property.address.unitNumber || '',
          lotNumber: property.address.lotNumber || '',
          planNumber: property.address.planNumber || ''
        };
        console.log('Extracted address data:', addressData);
      }

      // Extract report data from job
      const reportData = {
        reportConfig: {
          reportType: job.jobType || 'Property Valuation',
          propertyType: property?.details?.propertyType || 'residential',
          purpose: job.purpose || 'valuation'
        },
        clientDetails: {
          clientName: job.client?.name || '',
          clientEmail: job.client?.email || '',
          clientPhone: job.client?.phone || '',
          clientCompany: job.client?.company || ''
        },
        propertyDetails: {
          propertyType: property?.details?.propertyType || 'residential',
          landArea: property?.details?.landArea?.value || '',
          buildingArea: property?.details?.buildingArea?.value || '',
          yearBuilt: property?.details?.yearBuilt || '',
          bedrooms: property?.details?.bedrooms || '',
          bathrooms: property?.details?.bathrooms || '',
          carSpaces: property?.details?.carSpaces || '',
          zoning: property?.details?.zoning || '',
          features: property?.details?.features || [],
          lotNumber: property?.details?.lotNumber || '',
          planNumber: property?.details?.planNumber || '',
          flatNumber: property?.details?.flatNumber || '',
          sectionNumber: property?.details?.sectionNumber || '',
          storeys: property?.details?.storeys || '',
          landUse: property?.details?.landUse || '',
          propertyCategory: property?.details?.propertyCategory || '',
          title: property?.details?.title || '',
          isResidential: property?.details?.isResidential || false,
          photos: property?.photos || []
        }
      };

      // Load job data into unified storage
      const unifiedData = {
        reportData,
        addressData,
        assessmentProgress: {
          currentStep: 0,
          completedSteps: []
        },
        componentData: {},
        lastUpdated: new Date().toISOString(),
        userId,
        isDemo: !user,
        loadedFromJobId: jobId
      };
      
      console.log('Loading job data into unified storage:', unifiedData);
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
  }, [toast]);

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