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

    // Pre-populate Valuation Certificate with correct field mappings
    const certificateData: any = {};

    // Map property address from multiple sources
    if (reportData.propertySearchData?.confirmedAddress) {
      certificateData.propertyAddress = reportData.propertySearchData.confirmedAddress;
    } else if (reportData.propertySearchData?.address) {
      certificateData.propertyAddress = reportData.propertySearchData.address;
    } else if (reportData.propertySearchData?.propertyAddress) {
      certificateData.propertyAddress = reportData.propertySearchData.propertyAddress;
    }

    // Map property type from report config
    if (reportConfig.propertyType) {
      certificateData.propertyType = reportConfig.propertyType;
    }

    // Map interest values from selected values
    if (reportConfig.interestValues || reportConfig['Interest Values']) {
      certificateData.interestValues = reportConfig.interestValues || reportConfig['Interest Values'];
    }

    // Map value component from selected values
    if (reportConfig.valueComponent || reportConfig['Value Component']) {
      certificateData.valueComponent = reportConfig.valueComponent || reportConfig['Value Component'];
    }

    // Map purpose of valuation from selected values
    if (reportConfig.valuationPurpose || reportConfig['Valuation Purpose']) {
      certificateData.purposeOfValuation = reportConfig.valuationPurpose || reportConfig['Valuation Purpose'];
    }

    // Map valuation basis from selected values
    if (reportConfig.valuationBasis || reportConfig['Basis of Valuation']) {
      certificateData.valuationBasis = reportConfig.valuationBasis || reportConfig['Basis of Valuation'];
    }

    // Map mortgage security assessment
    if (reportConfig.mortgageSecurity) {
      certificateData.mortgageSecurity = reportConfig.mortgageSecurity;
    }

    // Only update if we have some data to populate
    if (Object.keys(certificateData).length > 0) {
      console.log('Updating valuation certificate with:', certificateData);
      updateReportData('valuationCertificate', certificateData);
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

    // Pre-populate Property Details with comprehensive mapping
    const propertyDetailsData: any = {};

    // Map property type from report config
    if (reportConfig.propertyType) {
      propertyDetailsData.propertyType = reportConfig.propertyType;
    }

    // Map report type from report config
    if (reportConfig.reportType || reportConfig['report-type']) {
      propertyDetailsData.reportType = reportConfig.reportType || reportConfig['report-type'];
    }

    // Map property address from multiple sources
    if (reportData.propertySearchData?.confirmedAddress) {
      propertyDetailsData.propertyAddress = reportData.propertySearchData.confirmedAddress;
    } else if (reportData.propertySearchData?.address) {
      propertyDetailsData.propertyAddress = reportData.propertySearchData.address;
    } else if (reportData.propertySearchData?.propertyAddress) {
      propertyDetailsData.propertyAddress = reportData.propertySearchData.propertyAddress;
    }

    // Only update if we have some data to populate
    if (Object.keys(propertyDetailsData).length > 0) {
      console.log('Updating property details with:', propertyDetailsData);
      updateReportData('propertyDetails', propertyDetailsData);
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