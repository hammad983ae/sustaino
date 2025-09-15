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
    console.log('Pre-populating report sections with assessment data');
    console.log('Current reportData:', reportData);

    const reportConfig = reportData.reportConfig;
    if (!reportConfig) {
      console.log('No report config found, skipping pre-population');
      return;
    }

    // Pre-populate Valuation Certificate with Value Component - always include if data exists
    if (reportConfig.valueComponent) {
      updateReportData('valuationCertificate', {
        valueComponent: reportConfig.valueComponent,
        valuationBasis: reportConfig.valuationBasis,
        interestValues: reportConfig.interestValues,
        purposeOfValuation: reportConfig.valuationPurpose,
        mortgageSecurity: reportConfig.mortgageSecurity || 'To be assessed'
      });
    }

    // Set valuation type for context (Ground Lease visibility) - if leasehold
    if (reportConfig.interestValues?.includes('Leasehold Interest') || 
        reportConfig.interestValues?.includes('Ground Lease')) {
      setValuationType(reportConfig.interestValues);
    }

    // Pre-populate Valuation Analysis with selected approaches - always include section
    if (reportConfig.valuationApproaches?.length > 0) {
      updateReportData('valuationAnalysis', {
        activeApproaches: reportConfig.valuationApproaches,
        selectedApproaches: reportConfig.valuationApproaches,
        enabledSections: reportConfig.valuationApproaches
      });
    }

    // Pre-populate Legal and Planning with LGA from planning data - always include section
    if (reportData.planningData) {
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
    if (reportData.tenancyDetails && 
        (reportConfig.interestValues?.includes('Leasehold Interest') || 
         reportConfig.interestValues?.includes('Ground Lease'))) {
      updateReportData('tenancyDetails', {
        ...reportData.tenancyDetails,
        groundLease: {
          ...reportData.tenancyDetails.groundLease,
          include: true // Auto-enable for leasehold
        }
      });
    }

    // Pre-populate file attachments - always include section even if empty
    if (reportData.fileAttachments) {
      updateReportData('fileAttachments', reportData.fileAttachments);
    }

    console.log('Pre-population completed successfully');

  }, [reportData.reportConfig, reportData.planningData, reportData.tenancyDetails, 
      reportData.fileAttachments, updateReportData, setValuationType]);

  return null; // This is a logic-only component
};

export default ReportDataPrePopulation;