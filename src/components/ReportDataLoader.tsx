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
          
          // Pre-populate report sections with validated data only
          if (reportData.reportSections && validation.isValid) {
            const sections = reportData.reportSections;
            
            // Map RPD and Location data - only if validation passes
            if (sections.rpdAndLocation && validation.sections?.rpdAndLocation?.shouldInclude) {
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

            // Map Legal and Planning data - only if validation passes
            if (sections.legalAndPlanning && validation.sections?.legalAndPlanning?.shouldInclude) {
              updateReportData('planningData', sections.legalAndPlanning);
              updateReportData('legalAndPlanning', sections.legalAndPlanning);
            }

            // Map Tenancy Details - only for leasehold properties
            if (sections.tenancyScheduleLeaseDetails && validation.sections?.tenancyScheduleLeaseDetails?.shouldInclude) {
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

            // Map Document Attachments - only if files exist
            if (sections.documentAttachments && validation.sections?.fileAttachments?.shouldInclude) {
              updateReportData('fileAttachments', sections.documentAttachments);
            }

            // Store all generated sections for direct access
            updateReportData('generatedSections' as any, sections);

            console.log('Successfully loaded validated data into report context');
            
            // Log any warnings
            if (validation.validation?.warnings?.length > 0) {
              console.warn('Data validation warnings:', validation.validation.warnings);
            }
          } else if (!validation.isValid) {
            console.error('Data validation failed:', validation.validation?.missingFields);
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