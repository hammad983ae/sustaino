import React, { useState, useEffect, useCallback } from 'react';
import type { Job, JobStatus, JobPriority } from '@/types';

// Mock data - in real app this would come from API
const mockJobs: Job[] = [
  {
    id: 'VAL-2025-0001',
    propertyAddress: '320 Deakin Avenue, Mildura VIC 3500',
    clientName: 'ABC Property Group',
    clientEmail: 'contact@abcproperty.com.au',
    jobType: 'Commercial Valuation',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-01-15',
    progress: 65,
    estimatedHours: 8,
    actualHours: 5.2,
    feeQuoted: 2500,
    lastUpdated: '2025-01-10'
  },
  {
    id: 'VAL-2025-0002',
    propertyAddress: '45 Main Street, Melbourne VIC 3000',
    clientName: 'XYZ Development',
    clientEmail: 'info@xyzdev.com.au',
    jobType: 'Residential Portfolio',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-01-20',
    progress: 0,
    estimatedHours: 12,
    actualHours: 0,
    feeQuoted: 4200,
    lastUpdated: '2025-01-08'
  },
  {
    id: 'VAL-2025-0003',
    propertyAddress: '120 Collins Street, Melbourne VIC 3000',
    clientName: 'Premium Investments',
    clientEmail: 'team@premiuminvest.com.au',
    jobType: 'ESG Assessment',
    status: 'completed',
    priority: 'low',
    dueDate: '2025-01-05',
    progress: 100,
    estimatedHours: 6,
    actualHours: 5.8,
    feeQuoted: 1800,
    lastUpdated: '2025-01-05'
  }
];

export interface UseJobsOptions {
  searchTerm?: string;
  statusFilter?: JobStatus | 'all';
}

export const useJobs = (options: UseJobsOptions = {}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch jobs function - declared outside useEffect for reuse
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setJobs(mockJobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Filter jobs based on options
  const filteredJobs = jobs.filter(job => {
    const { searchTerm = '', statusFilter = 'all' } = options;
    
    const matchesSearch = !searchTerm || 
      job.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === 'all' || job.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Computed statistics
  const stats = {
    total: jobs.length,
    active: jobs.filter(job => job.status === 'in-progress').length,
    completed: jobs.filter(job => job.status === 'completed').length,
    totalValue: jobs.reduce((sum, job) => sum + job.feeQuoted, 0)
  };

  const updateJobProgress = (jobId: string, progress: number) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, progress, lastUpdated: new Date().toISOString().split('T')[0] }
        : job
    ));
  };

  const updateJobStatus = (jobId: string, status: JobStatus) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            status, 
            progress: status === 'completed' ? 100 : job.progress,
            lastUpdated: new Date().toISOString().split('T')[0] 
          }
        : job
    ));
  };

  return {
    jobs: filteredJobs,
    allJobs: jobs,
    loading,
    error,
    stats,
    updateJobProgress,
    updateJobStatus,
    refetch: fetchJobs
  };
};