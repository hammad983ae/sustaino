import React, { useEffect, useCallback } from 'react';
import { useReportData } from '@/contexts/ReportDataContext';

/**
 * Manages optional sections based on Report Configuration settings
 * Ensures excluded sections are properly marked as "Not Applicable"
 */
const OptionalSectionManager: React.FC = () => {
  const { reportData, updateReportData } = useReportData();

  const manageSectionInclusion = useCallback(() => {
    if (!reportData.reportConfig) {
      console.log('No report configuration found for section management');
      return;
    }

    const config = reportData.reportConfig;
    console.log('Managing optional sections based on configuration:', config);

    // 1. Handle Tenancy Schedule Section
    if (config.includeTenancySchedule === false) {
      const tenancyUpdate = {
        ...reportData.tenancyDetails,
        included: false,
        status: 'not_applicable',
        reason: 'Excluded in Report Configuration',
        leaseDetails: 'Not Applicable - Excluded in Configuration',
        currentRent: 'Not Applicable - Excluded in Configuration',
        leaseExpiry: 'Not Applicable - Excluded in Configuration',
        tenantType: 'Not Applicable - Excluded in Configuration',
        extractedFrom: 'Report Configuration Exclusion',
        excludedInConfig: true
      };
      updateReportData('tenancyDetails', tenancyUpdate);
    } else {
      // If included, ensure it's marked as such
      const tenancyUpdate = {
        ...reportData.tenancyDetails,
        included: true,
        excludedInConfig: false,
        extractedFrom: 'Report Configuration Inclusion'
      };
      updateReportData('tenancyDetails', tenancyUpdate);
    }

    // 2. Handle Statutory Assessment Section
    if (config.includeStatutoryAssessment === false) {
      const statutoryUpdate = {
        ...reportData.statutoryAssessment,
        included: false,
        status: 'not_applicable',
        reason: 'Excluded in Report Configuration',
        compliance: 'Not Applicable - Excluded in Configuration',
        permits: 'Not Applicable - Excluded in Configuration',
        approvals: 'Not Applicable - Excluded in Configuration',
        buildingCompliance: 'Not Applicable - Excluded in Configuration',
        extractedFrom: 'Report Configuration Exclusion',
        excludedInConfig: true
      };
      updateReportData('statutoryAssessment', statutoryUpdate);
    } else {
      // If included, ensure it's marked as such
      const statutoryUpdate = {
        ...reportData.statutoryAssessment,
        included: true,
        excludedInConfig: false,
        extractedFrom: 'Report Configuration Inclusion'
      };
      updateReportData('statutoryAssessment', statutoryUpdate);
    }

    // 3. Log section management completion
    console.log('Section toggles managed:', {
      tenancySchedule: config.includeTenancySchedule !== false,
      statutoryAssessment: config.includeStatutoryAssessment !== false
    });

    console.log('Optional section management completed');

  }, [reportData, updateReportData]);

  // Run section management when report configuration changes
  useEffect(() => {
    if (reportData.reportConfig) {
      manageSectionInclusion();
    }
  }, [reportData.reportConfig, manageSectionInclusion]);

  // Run when tenancy or statutory settings change
  useEffect(() => {
    if (reportData.reportConfig) {
      manageSectionInclusion();
    }
  }, [
    reportData.reportConfig?.includeTenancySchedule,
    reportData.reportConfig?.includeStatutoryAssessment,
    manageSectionInclusion
  ]);

  // This component doesn't render anything - it's logic only
  return null;
};

export default OptionalSectionManager;