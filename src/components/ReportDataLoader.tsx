import { useEffect } from 'react';
import { useReportData } from '@/contexts/ReportDataContext';

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
          
          // Pre-populate report sections with generated data
          if (reportData.reportSections) {
            const sections = reportData.reportSections;
            
            // Map RPD and Location data
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

            // Map Legal and Planning data
            if (sections.legalAndPlanning) {
              updateReportData('planningData', sections.legalAndPlanning);
              updateReportData('legalAndPlanning', sections.legalAndPlanning);
            }

            // Map Tenancy Details
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

            // Map Document Attachments
            if (sections.documentAttachments) {
              updateReportData('fileAttachments', sections.documentAttachments);
            }

            // Store all generated sections for direct access
            updateReportData('generatedSections' as any, sections);

            console.log('Successfully loaded all generated data into report context');
          }
          
          // Clear the stored data to prevent reuse
          localStorage.removeItem('currentReportData');
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