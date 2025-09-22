import { useEffect, useRef } from 'react';
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
  const hasPrePopulated = useRef(false);

  useEffect(() => {
    // Prevent infinite loop by checking if we've already pre-populated
    if (hasPrePopulated.current) {
      return;
    }

    console.log('Pre-populating report sections with assessment data');
    console.log('Current reportData:', reportData);

    // Load from localStorage if reportConfig is missing but data exists
    const currentReportData = localStorage.getItem('currentReportData');
    let workingReportConfig = reportData.reportConfig;
    
    if (!workingReportConfig && currentReportData) {
      try {
        const storedData = JSON.parse(currentReportData);
        workingReportConfig = storedData.reportConfig;
        console.log('Using reportConfig from localStorage:', workingReportConfig);
      } catch (error) {
        console.error('Error parsing stored report data:', error);
      }
    }

    if (!workingReportConfig) {
      console.log('No report config found, skipping pre-population');
      return;
    }

    // Mark as pre-populated to prevent re-running
    hasPrePopulated.current = true;

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
    if (workingReportConfig.propertyType) {
      certificateData.propertyType = workingReportConfig.propertyType;
    }

    // Map interest values from selected values
    if (workingReportConfig.interestValues || workingReportConfig['Interest Values']) {
      certificateData.interestValues = workingReportConfig.interestValues || workingReportConfig['Interest Values'];
    }

    // Map value component from selected values
    if (workingReportConfig.valueComponent || workingReportConfig['Value Component']) {
      certificateData.valueComponent = workingReportConfig.valueComponent || workingReportConfig['Value Component'];
    }

    // Map purpose of valuation from selected values
    if (workingReportConfig.valuationPurpose || workingReportConfig['Valuation Purpose']) {
      certificateData.purposeOfValuation = workingReportConfig.valuationPurpose || workingReportConfig['Valuation Purpose'];
    }

    // Map valuation basis from selected values
    if (workingReportConfig.valuationBasis || workingReportConfig['Basis of Valuation']) {
      certificateData.valuationBasis = workingReportConfig.valuationBasis || workingReportConfig['Basis of Valuation'];
    }

    // Map mortgage security assessment
    if (workingReportConfig.mortgageSecurity) {
      certificateData.mortgageSecurity = workingReportConfig.mortgageSecurity;
    }

    // Only update if we have some data to populate
    if (Object.keys(certificateData).length > 0) {
      console.log('Updating valuation certificate with:', certificateData);
      updateReportData('valuationCertificate', certificateData);
    }

    // Set valuation type for context (Ground Lease visibility) - if leasehold
    if (workingReportConfig.interestValues?.includes('Leasehold Interest') || 
        workingReportConfig.interestValues?.includes('Ground Lease')) {
      setValuationType(workingReportConfig.interestValues);
    }

    // Pre-populate Valuation Analysis with selected approaches - always include section
    if (workingReportConfig.valuationApproaches?.length > 0) {
      updateReportData('valuationAnalysis', {
        activeApproaches: workingReportConfig.valuationApproaches,
        selectedApproaches: workingReportConfig.valuationApproaches,
        enabledSections: workingReportConfig.valuationApproaches
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
    if (workingReportConfig.propertyType) {
      propertyDetailsData.propertyType = workingReportConfig.propertyType;
    }

    // Map report type from report config
    if (workingReportConfig.reportType || workingReportConfig['report-type']) {
      propertyDetailsData.reportType = workingReportConfig.reportType || workingReportConfig['report-type'];
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
        (workingReportConfig.interestValues?.includes('Leasehold Interest') || 
         workingReportConfig.interestValues?.includes('Ground Lease'))) {
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

    // Pre-populate Sustaino Pro Additional Analysis (Section 18) with PAF data
    const sustainoProData: any = {
      sustainoProAdditionalAnalysis: {
        valuationSummary: {
          interestValued: 'Freehold Going Concern',
          valueComponent: workingReportConfig.valueComponent || workingReportConfig['Value Component'] || 'Market Value',
          highestAndBestUse: 'Current Use',
          currencyOfValuation: 'AUD',
          durationOfValuation: '3 months',
          gstTreatment: 'GST Inclusive',
          marketValue: '$XXX,XXX'
        }
      }
    };

    // Update Sustaino Pro section using generatedSections
    updateReportData('generatedSections', {
      ...reportData.generatedSections,
      ...sustainoProData
    });
    console.log('Updated Sustaino Pro section with PAF data:', sustainoProData);

    console.log('Pre-population completed successfully');

  }, [reportData.reportConfig]); // Only depend on reportConfig, not the entire reportData

  return null; // This is a logic-only component
};

export default ReportDataPrePopulation;