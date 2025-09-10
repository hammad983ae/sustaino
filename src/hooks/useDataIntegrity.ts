import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { errorHandler } from '@/lib/error-handler';
import { performanceMonitor } from '@/lib/performance';

interface DataIntegrityCheck {
  tableName: string;
  field: string;
  rule: string;
  severity: 'error' | 'warning' | 'info';
  count: number;
  sample?: any[];
}

interface DataQualityMetrics {
  completeness: number;
  consistency: number;
  accuracy: number;
  validity: number;
  totalRecords: number;
  issues: DataIntegrityCheck[];
}

export const useDataIntegrity = () => {
  const [metrics, setMetrics] = useState<DataQualityMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Run comprehensive data integrity checks
  const runIntegrityChecks = useCallback(async () => {
    return performanceMonitor.measureTimeAsync('DataIntegrityCheck', async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('Authentication required');
        }

        const issues: DataIntegrityCheck[] = [];
        let totalRecords = 0;
        let completenessScore = 0;
        let consistencyScore = 0;
        let accuracyScore = 0;
        let validityScore = 0;

        // Check reports table integrity
        const { data: reports, error: reportsError } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', user.id);

        if (reportsError) {
          throw errorHandler.handleSupabaseError(reportsError, 'fetch reports for integrity check');
        }

        if (reports) {
          totalRecords += reports.length;
          
          // Check for missing required fields
          const missingAddress = reports.filter(r => !r.property_address || r.property_address.trim() === '');
          if (missingAddress.length > 0) {
            issues.push({
              tableName: 'reports',
              field: 'property_address',
              rule: 'Required field missing',
              severity: 'error',
              count: missingAddress.length,
              sample: missingAddress.slice(0, 3)
            });
          }

          // Check for orphaned records
          const invalidProgress = reports.filter(r => r.report_progress < 0 || r.report_progress > 100);
          if (invalidProgress.length > 0) {
            issues.push({
              tableName: 'reports',
              field: 'report_progress',
              rule: 'Progress must be between 0-100',
              severity: 'error',
              count: invalidProgress.length
            });
          }

          // Check for data consistency
          const inconsistentStatus = reports.filter(r => 
            (r.status === 'completed' && r.report_progress < 100) ||
            (r.status === 'in_progress' && r.report_progress === 100)
          );
          if (inconsistentStatus.length > 0) {
            issues.push({
              tableName: 'reports',
              field: 'status',
              rule: 'Status inconsistent with progress',
              severity: 'warning',
              count: inconsistentStatus.length
            });
          }

          completenessScore += ((reports.length - missingAddress.length) / reports.length) * 25;
          validityScore += ((reports.length - invalidProgress.length) / reports.length) * 25;
          consistencyScore += ((reports.length - inconsistentStatus.length) / reports.length) * 25;
        }

        // Check valuation jobs integrity
        const { data: jobs, error: jobsError } = await supabase
          .from('valuation_jobs')
          .select('*')
          .eq('user_id', user.id);

        if (jobsError) {
          throw errorHandler.handleSupabaseError(jobsError, 'fetch jobs for integrity check');
        }

        if (jobs) {
          totalRecords += jobs.length;

          // Check for missing titles
          const missingTitles = jobs.filter(j => !j.title || j.title.trim() === '');
          if (missingTitles.length > 0) {
            issues.push({
              tableName: 'valuation_jobs',
              field: 'title',
              rule: 'Required field missing',
              severity: 'error',
              count: missingTitles.length
            });
          }

          // Check for invalid completion percentages
          const invalidCompletion = jobs.filter(j => 
            j.completion_percentage < 0 || j.completion_percentage > 100
          );
          if (invalidCompletion.length > 0) {
            issues.push({
              tableName: 'valuation_jobs',
              field: 'completion_percentage',
              rule: 'Completion must be between 0-100',
              severity: 'error',
              count: invalidCompletion.length
            });
          }

          // Check for overdue jobs
          const overdueJobs = jobs.filter(j => 
            j.due_date && new Date(j.due_date) < new Date() && j.status !== 'completed'
          );
          if (overdueJobs.length > 0) {
            issues.push({
              tableName: 'valuation_jobs',
              field: 'due_date',
              rule: 'Job is overdue',
              severity: 'warning',
              count: overdueJobs.length
            });
          }

          completenessScore += ((jobs.length - missingTitles.length) / jobs.length) * 25;
          validityScore += ((jobs.length - invalidCompletion.length) / jobs.length) * 25;
          accuracyScore += ((jobs.length - overdueJobs.length) / jobs.length) * 50;
        }

        // Check sales evidence integrity
        const { data: salesEvidence, error: salesError } = await supabase
          .from('sales_evidence')
          .select('*')
          .eq('user_id', user.id);

        if (salesError) {
          throw errorHandler.handleSupabaseError(salesError, 'fetch sales evidence for integrity check');
        }

        if (salesEvidence) {
          totalRecords += salesEvidence.length;

          // Check for unrealistic sale prices
          const unrealisticPrices = salesEvidence.filter(s => 
            s.sale_price <= 0 || s.sale_price > 100000000 // $100M+ seems unrealistic
          );
          if (unrealisticPrices.length > 0) {
            issues.push({
              tableName: 'sales_evidence',
              field: 'sale_price',
              rule: 'Sale price appears unrealistic',
              severity: 'warning',
              count: unrealisticPrices.length
            });
          }

          // Check for future sale dates
          const futureSales = salesEvidence.filter(s => 
            new Date(s.sale_date) > new Date()
          );
          if (futureSales.length > 0) {
            issues.push({
              tableName: 'sales_evidence',
              field: 'sale_date',
              rule: 'Sale date is in the future',
              severity: 'error',
              count: futureSales.length
            });
          }

          accuracyScore += ((salesEvidence.length - unrealisticPrices.length) / salesEvidence.length) * 25;
          validityScore += ((salesEvidence.length - futureSales.length) / salesEvidence.length) * 25;
        }

        // Check leasing evidence integrity
        const { data: leasingEvidence, error: leasingError } = await supabase
          .from('leasing_evidence')
          .select('*')
          .eq('user_id', user.id);

        if (leasingError) {
          throw errorHandler.handleSupabaseError(leasingError, 'fetch leasing evidence for integrity check');
        }

        if (leasingEvidence) {
          totalRecords += leasingEvidence.length;

          // Check for invalid lease dates
          const invalidLeaseDates = leasingEvidence.filter(l => 
            l.lease_end_date && new Date(l.lease_start_date) >= new Date(l.lease_end_date)
          );
          if (invalidLeaseDates.length > 0) {
            issues.push({
              tableName: 'leasing_evidence',
              field: 'lease_dates',
              rule: 'Lease start date must be before end date',
              severity: 'error',
              count: invalidLeaseDates.length
            });
          }

          // Check for unrealistic rent amounts
          const unrealisticRent = leasingEvidence.filter(l => 
            l.rent_amount <= 0 || l.rent_amount > 100000 // $100k+ per period seems high
          );
          if (unrealisticRent.length > 0) {
            issues.push({
              tableName: 'leasing_evidence',
              field: 'rent_amount',
              rule: 'Rent amount appears unrealistic',
              severity: 'warning',
              count: unrealisticRent.length
            });
          }

          validityScore += ((leasingEvidence.length - invalidLeaseDates.length) / leasingEvidence.length) * 25;
          accuracyScore += ((leasingEvidence.length - unrealisticRent.length) / leasingEvidence.length) * 25;
        }

        // Calculate final scores
        const finalMetrics: DataQualityMetrics = {
          completeness: Math.round(completenessScore),
          consistency: Math.round(consistencyScore),
          accuracy: Math.round(accuracyScore),
          validity: Math.round(validityScore),
          totalRecords,
          issues
        };

        setMetrics(finalMetrics);
        return finalMetrics;

      } catch (error: any) {
        const appError = errorHandler.handleApiError(error, 'data integrity check');
        setError(appError.message);
        throw appError;
      } finally {
        setLoading(false);
      }
    });
  }, []);

  // Auto-fix common data issues
  const autoFixIssues = useCallback(async (issueTypes: string[] = []) => {
    try {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Authentication required');
      }

      let fixedCount = 0;

      // Fix invalid progress values
      if (issueTypes.includes('invalid_progress') || issueTypes.length === 0) {
        const { data: invalidReports } = await supabase
          .from('reports')
          .select('id, report_progress')
          .eq('user_id', user.id)
          .or('report_progress.lt.0,report_progress.gt.100');

        if (invalidReports && invalidReports.length > 0) {
          for (const report of invalidReports) {
            const clampedProgress = Math.max(0, Math.min(100, report.report_progress));
            await supabase
              .from('reports')
              .update({ report_progress: clampedProgress })
              .eq('id', report.id)
              .eq('user_id', user.id);
            fixedCount++;
          }
        }
      }

      // Fix status consistency
      if (issueTypes.includes('status_consistency') || issueTypes.length === 0) {
        // Update completed reports with progress < 100
        const { data: completedReports } = await supabase
          .from('reports')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .lt('report_progress', 100);

        if (completedReports && completedReports.length > 0) {
          for (const report of completedReports) {
            await supabase
              .from('reports')
              .update({ report_progress: 100 })
              .eq('id', report.id)
              .eq('user_id', user.id);
            fixedCount++;
          }
        }

        // Update in_progress reports with progress = 100
        const { data: inProgressReports } = await supabase
          .from('reports')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'in_progress')
          .eq('report_progress', 100);

        if (inProgressReports && inProgressReports.length > 0) {
          for (const report of inProgressReports) {
            await supabase
              .from('reports')
              .update({ status: 'completed' })
              .eq('id', report.id)
              .eq('user_id', user.id);
            fixedCount++;
          }
        }
      }

      return { fixedCount };

    } catch (error: any) {
      const appError = errorHandler.handleApiError(error, 'auto-fix issues');
      setError(appError.message);
      throw appError;
    } finally {
      setLoading(false);
    }
  }, []);

  // Run checks on mount
  useEffect(() => {
    runIntegrityChecks();
  }, [runIntegrityChecks]);

  return {
    metrics,
    loading,
    error,
    runIntegrityChecks,
    autoFixIssues,
    refresh: runIntegrityChecks
  };
};