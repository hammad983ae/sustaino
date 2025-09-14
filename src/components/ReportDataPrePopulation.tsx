import { useEffect } from 'react';
import { useReportData } from '@/contexts/ReportDataContext';
import { useValuation } from '@/contexts/ValuationContext';
import { validateAndFilterReportData } from '@/lib/reportDataValidation';

/**
 * Enhanced component to handle pre-population of report data from Property Assessment Form
 * Includes validation checks and conditional inclusion logic
 */
const ReportDataPrePopulation = () => {
  const { reportData, updateReportData } = useReportData();
  const { setValuationType } = useValuation();

  useEffect(() => {
    // Validate all data before pre-populating
    const validation = validateAndFilterReportData({ reportData });
    
    if (!validation.isValid) {
      console.warn('Report data validation failed:', validation.validation?.missingFields);
      return;
    }

    console.log('Pre-populating report sections with validated data');

    const reportConfig = reportData.reportConfig;
    if (!reportConfig) return;

    // Pre-populate Valuation Certificate with Value Component - only if data is complete
    if (reportConfig.valueComponent && validation.sections?.valuationCertificate?.shouldInclude) {
      updateReportData('valuationCertificate', {
        valueComponent: reportConfig.valueComponent,
        valuationBasis: reportConfig.valuationBasis,
        interestValues: reportConfig.interestValues,
        purposeOfValuation: reportConfig.valuationPurpose,
        mortgageSecurity: reportConfig.mortgageSecurity || 'To be assessed'
      });
    }

    // Set valuation type for context (Ground Lease visibility) - only if leasehold
    if (reportConfig.interestValues && validation.sections?.tenancyScheduleLeaseDetails?.shouldInclude) {
      setValuationType(reportConfig.interestValues);
    }

    // Pre-populate Valuation Analysis with selected approaches only - only if approaches exist
    if (reportConfig.valuationApproaches && validation.sections?.valuationAnalysis?.shouldInclude) {
      updateReportData('valuationAnalysis', {
        activeApproaches: reportConfig.valuationApproaches,
        selectedApproaches: reportConfig.valuationApproaches,
        enabledSections: reportConfig.valuationApproaches
      });
    }

    // Pre-populate Legal and Planning with LGA from planning data - only if planning data exists
    if ((reportData.planningData?.lga || reportData.planningData?.zoning) && 
        validation.sections?.legalAndPlanning?.shouldInclude) {
      updateReportData('legalAndPlanning', {
        lga: reportData.planningData.lga,
        zoning: reportData.planningData.zoning,
        currentUse: reportData.planningData.currentUse,
        zoneName: reportData.planningData.zoneName,
        overlays: reportData.planningData.overlays,
        developmentPotential: reportData.planningData.developmentPotential
      });
    }

    // Pre-populate Property Details with property type - always include
    if (reportConfig.propertyType) {
      updateReportData('propertyDetails', {
        propertyType: reportConfig.propertyType,
        reportType: reportConfig.reportType,
        propertyAddress: reportData.propertySearchData?.confirmedAddress
      });
    }

    // Pre-populate tenancy details only for leasehold properties
    if (validation.sections?.tenancyScheduleLeaseDetails?.shouldInclude && 
        reportData.tenancyDetails) {
      updateReportData('tenancyDetails', {
        ...reportData.tenancyDetails,
        groundLease: {
          ...reportData.tenancyDetails.groundLease,
          include: true // Auto-enable for leasehold
        }
      });
    }

    // Pre-populate file attachments only if files exist
    if (validation.sections?.fileAttachments?.shouldInclude && reportData.fileAttachments) {
      updateReportData('fileAttachments', reportData.fileAttachments);
    }

    // Log completion with data quality metrics
    const qualityMetrics = Object.entries(validation.sections || {}).map(([section, check]) => ({
      section,
      included: check.shouldInclude,
      quality: check.dataQuality,
      completeness: check.completeness
    }));

    console.log('Pre-population completed. Quality metrics:', qualityMetrics);

  }, [reportData.reportConfig, reportData.planningData, reportData.tenancyDetails, 
      reportData.fileAttachments, updateReportData, setValuationType]);

  return null; // This is a logic-only component
};

export default ReportDataPrePopulation;