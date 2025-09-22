import { useEffect } from 'react';
import { useReportData } from '@/contexts/ReportDataContext';
import { validateAndFilterReportData } from '@/lib/reportDataValidation';

const ReportDataLoader = () => {
  const { updateReportData } = useReportData();

  useEffect(() => {
    const loadGeneratedReportData = () => {
      // Check if we have current report data from generation
      const currentReportData = localStorage.getItem('currentReportData');
      if (currentReportData) {
        try {
          const reportData = JSON.parse(currentReportData);
          console.log('Loading generated report data into context:', reportData);
          
          // Validate data before loading
          const validation = validateAndFilterReportData(reportData);
          console.log('Data validation results:', validation);
          
          // Pre-populate report sections with data - always load if available
          if (reportData.reportSections) {
            const sections = reportData.reportSections;
            
            // Map RPD and Location data - always include if present
            if (sections.rpdAndLocation) {
              // Update property search data
              updateReportData('propertySearchData', {
                address: sections.rpdAndLocation.propertyAddress,
                confirmedAddress: sections.rpdAndLocation.propertyAddress,
                lotPlan: `${sections.rpdAndLocation.lotNumber || ''} ${sections.rpdAndLocation.planNumber || ''}`.trim()
              });

              // Update location data
              if (sections.rpdAndLocation.locationAnalysis) {
                updateReportData('locationData', sections.rpdAndLocation.locationAnalysis);
              }

              // Update property identification
              if (sections.rpdAndLocation.propertyIdentification) {
                updateReportData('propertyIdentification', sections.rpdAndLocation.propertyIdentification);
              }
            }

            // Map Legal and Planning data - always include if present
            if (sections.legalAndPlanning) {
              updateReportData('planningData', sections.legalAndPlanning);
              updateReportData('legalAndPlanning', sections.legalAndPlanning);
            }

            // Map Tenancy Details - always include if present
            if (sections.tenancyScheduleLeaseDetails) {
              updateReportData('tenancyDetails', sections.tenancyScheduleLeaseDetails);
            }

            // Map Risk Assessment data
            if (sections.riskAssessmentMarketIndicators) {
              updateReportData('riskAssessment', sections.riskAssessmentMarketIndicators);
            }

            // Map Sales History data
            if (sections.previousSalesHistoryAndCurrentSale) {
              updateReportData('salesHistory', sections.previousSalesHistoryAndCurrentSale);
            }

            // Map Valuation Certificate data
            if (sections.valuationCertificate) {
              updateReportData('valuationCertificate', sections.valuationCertificate);
            }

            // Map Valuation Analysis data
            if (sections.valuationAnalysis) {
              updateReportData('valuationAnalysis', sections.valuationAnalysis);
            }

            // Map Property Details data
            if (sections.propertyDetails) {
              updateReportData('propertyDetails', sections.propertyDetails);
            }

            // Map Document Attachments - always include if present
            if (sections.documentAttachments) {
              updateReportData('fileAttachments', sections.documentAttachments);
            }

            // Store all generated sections for direct access
            updateReportData('generatedSections' as any, sections);

            console.log('Successfully loaded all available data into report context');
            
            // Log any warnings
            if (validation.validation?.warnings?.length > 0) {
              console.warn('Data validation warnings:', validation.validation.warnings);
            }
          }
          
          // DO NOT clear the stored data - let it persist for reliability
          // localStorage.removeItem('currentReportData');
        } catch (error) {
          console.error('Error loading generated report data:', error);
        }
      }
    };

    loadGeneratedReportData();
  }, [updateReportData]);

  // This component doesn't render anything
  return null;
};

export default ReportDataLoader;