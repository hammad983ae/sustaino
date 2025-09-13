import { useEffect } from 'react';
import { useReportData } from '@/contexts/ReportDataContext';
import { useValuation } from '@/contexts/ValuationContext';

/**
 * Component to handle pre-population of report data from Property Assessment Form
 * Transfers data from Step 4 (Report Configuration) to corresponding report sections
 */
const ReportDataPrePopulation = () => {
  const { reportData, updateReportData } = useReportData();
  const { setValuationType } = useValuation();

  useEffect(() => {
    const reportConfig = reportData.reportConfig;
    if (!reportConfig) return;

    // Pre-populate Valuation Certificate with Value Component
    if (reportConfig.valueComponent) {
      updateReportData('valuationCertificate', {
        valueComponent: reportConfig.valueComponent,
        valuationBasis: reportConfig.valuationBasis,
        interestValues: reportConfig.interestValues
      });
    }

    // Set valuation type for context (Ground Lease visibility)
    if (reportConfig.interestValues) {
      setValuationType(reportConfig.interestValues);
    }

    // Pre-populate Valuation Analysis with selected approaches only
    if (reportConfig.valuationApproaches) {
      updateReportData('valuationAnalysis', {
        activeApproaches: reportConfig.valuationApproaches,
        selectedApproaches: reportConfig.valuationApproaches
      });
    }

    // Pre-populate Legal and Planning with LGA from planning data
    if (reportData.planningData?.lga || reportData.planningData?.zoning) {
      updateReportData('legalAndPlanning', {
        lga: reportData.planningData.lga,
        zoning: reportData.planningData.zoning,
        currentUse: reportData.planningData.currentUse
      });
    }

    // Pre-populate Property Details with property type
    if (reportConfig.propertyType) {
      updateReportData('propertyDetails', {
        propertyType: reportConfig.propertyType,
        reportType: reportConfig.reportType
      });
    }

  }, [reportData.reportConfig, reportData.planningData, updateReportData, setValuationType]);

  return null; // This is a logic-only component
};

export default ReportDataPrePopulation;