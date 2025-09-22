import React, { useEffect, useCallback } from 'react';
import { useReportData } from '@/contexts/ReportDataContext';
import { useValuation } from '@/contexts/ValuationContext';

/**
 * Integration component that ensures Report Configuration data flows
 * properly to all report sections, especially valuation certificate
 */
const ReportConfigurationIntegrator: React.FC = () => {
  const { reportData, updateReportData } = useReportData();
  const { setValuationType } = useValuation();

  const integrateReportConfiguration = useCallback(() => {
    if (!reportData.reportConfig) {
      console.log('No report configuration found for integration');
      return;
    }

    const config = reportData.reportConfig;
    console.log('Integrating report configuration:', config);

    // 1. Update Valuation Certificate with Report Configuration data
    const valuationUpdate = {
      ...reportData.valuationCertificate,
      
      // Basic Information from Report Config
      reportType: config.reportType || reportData.valuationCertificate?.reportType,
      propertyType: config.propertyType || reportData.valuationCertificate?.propertyType,
      valuationPurpose: config.valuationPurpose || reportData.valuationCertificate?.valuationPurpose,
      
      // Client Information
      instructingParty: config.instructingParty || reportData.valuationCertificate?.instructingParty,
      reliantParty: config.reliantParty || reportData.valuationCertificate?.reliantParty,
      
      // Valuation Details
      basisOfValuation: Array.isArray(config.basisOfValuation) ? config.basisOfValuation.join(', ') : config.basisOfValuation || reportData.valuationCertificate?.basisOfValuation,
      valuationApproaches: Array.isArray(config.valuationApproaches) ? config.valuationApproaches.join(', ') : config.valuationApproaches || reportData.valuationCertificate?.valuationApproaches,
      valueComponent: Array.isArray(config.valueComponent) ? config.valueComponent.join(', ') : config.valueComponent || reportData.valuationCertificate?.valueComponent,
      interestValues: Array.isArray(config.interestValues) ? config.interestValues.join(', ') : config.interestValues || reportData.valuationCertificate?.interestValues,
      
      // GST Treatment
      gstTreatment: config.gstTreatment || reportData.valuationCertificate?.gstTreatment,
      
      // Custom Basis (Auto-Generated)
      customBasis: config.customBasis || reportData.valuationCertificate?.customBasis,
      
      // Dates from Report Configuration
      valuationDate: config.valuationDate || reportData.valuationCertificate?.valuationDate,
      inspectionDate: config.inspectionDate || reportData.valuationCertificate?.inspectionDate,
      
      // Mark as extracted from Report Configuration
      extractedFrom: 'Report Configuration Step 5',
      status: 'supplied'
    };

    updateReportData('valuationCertificate', valuationUpdate);

    // 2. Update Valuation Analysis with Configuration
    const analysisUpdate = {
      ...reportData.valuationAnalysis,
      basisOfValuation: Array.isArray(config.basisOfValuation) ? config.basisOfValuation.join(', ') : config.basisOfValuation || reportData.valuationAnalysis?.basisOfValuation,
      valuationApproaches: Array.isArray(config.valuationApproaches) ? config.valuationApproaches.join(', ') : config.valuationApproaches || reportData.valuationAnalysis?.valuationApproaches,
      valueComponent: Array.isArray(config.valueComponent) ? config.valueComponent.join(', ') : config.valueComponent || reportData.valuationAnalysis?.valueComponent,
      gstTreatment: config.gstTreatment || reportData.valuationAnalysis?.gstTreatment,
      customBasis: config.customBasis || reportData.valuationAnalysis?.customBasis,
      extractedFrom: 'Report Configuration Step 5',
      status: 'supplied'
    };

    updateReportData('valuationAnalysis', analysisUpdate);

    // 3. Log section configuration
    console.log('Report sections configured:', {
      includeTenancySchedule: config.includeTenancySchedule !== false,
      includeStatutoryAssessment: config.includeStatutoryAssessment !== false
    });

    // 4. Set valuation type in context for leasehold detection
    if (config.interestValues) {
      const valuationType = Array.isArray(config.interestValues) ? config.interestValues.join(', ') : config.interestValues;
      setValuationType(valuationType);
    }

    // 5. Update Executive Summary to include Custom Basis
    if (config.customBasis) {
      const executiveSummaryUpdate = {
        ...reportData.executiveSummary,
        customBasis: config.customBasis,
        basisOfValuation: Array.isArray(config.basisOfValuation) ? config.basisOfValuation.join(', ') : config.basisOfValuation,
        valuationPurpose: config.valuationPurpose,
        includedInSummary: true,
        extractedFrom: 'Report Configuration Step 5'
      };

      updateReportData('executiveSummary', executiveSummaryUpdate);
    }

    // 6. Update Property Details with Configuration
    const propertyDetailsUpdate = {
      ...reportData.propertyDetails,
      propertyType: config.propertyType || reportData.propertyDetails?.propertyType,
      reportType: config.reportType || reportData.propertyDetails?.reportType,
      extractedFrom: 'Report Configuration Step 5'
    };

    updateReportData('propertyDetails', propertyDetailsUpdate);

    console.log('Report Configuration integration completed');

  }, [reportData, updateReportData, setValuationType]);

  // Run integration when report configuration changes
  useEffect(() => {
    if (reportData.reportConfig) {
      integrateReportConfiguration();
    }
  }, [reportData.reportConfig, integrateReportConfiguration]);

  // This component doesn't render anything - it's logic only
  return null;
};

export default ReportConfigurationIntegrator;