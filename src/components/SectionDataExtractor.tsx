import React, { useEffect } from 'react';
import { useReportData } from '@/contexts/ReportDataContext';
import { useProperty } from '@/contexts/PropertyContext';

/**
 * Enhanced Section Data Extractor
 * Handles automatic field population from PAF to report sections
 */
const SectionDataExtractor: React.FC = () => {
  const { reportData, updateReportData } = useReportData();
  const { addressData, getFormattedAddress } = useProperty();

  useEffect(() => {
    console.log('SectionDataExtractor: Processing PAF data extraction');
    
    const reportConfig = reportData.reportConfig;
    if (!reportConfig) {
      console.log('No report config found, skipping extraction');
      return;
    }

    // SECTION 2: RPD and Location (ALWAYS REQUIRED)
    extractRPDAndLocation();
    
    // SECTION 3: Legal and Planning (ALWAYS REQUIRED)
    extractLegalAndPlanning();
    
    // SECTION 4: Tenancy Schedule (OPTIONAL - based on config)
    extractTenancySchedule();
    
    // SECTION 5: Statutory Assessment (OPTIONAL - based on config)
    extractStatutoryAssessment();
    
    // SECTION 6: Market Commentary (ALWAYS REQUIRED)
    extractMarketCommentary();
    
    // SECTION 7: Property Details (ALWAYS REQUIRED)
    extractPropertyDetails();
    
    // SECTION 8: Environmental & Sustainability (ALWAYS REQUIRED)
    extractEnvironmentalAssessment();
    
    // SECTION 10: Risk Assessment (ALWAYS REQUIRED)
    extractRiskAssessment();

  }, [reportData.reportConfig, reportData.planningData, addressData]);

  const extractRPDAndLocation = () => {
    const locationData: any = {
      status: 'supplied',
      extractedFrom: 'PAF Step 1'
    };

    // Extract from Property Address Form
    if (addressData.propertyAddress) {
      locationData.propertyAddress = addressData.propertyAddress;
    } else if (getFormattedAddress()) {
      locationData.propertyAddress = getFormattedAddress();
    } else {
      locationData.propertyAddress = 'Investigation Required';
      locationData.status = 'investigation_required';
    }

    // Extract lot/plan details
    if (addressData.lotNumber || reportData.planningData?.lotNumber) {
      locationData.lotNumber = addressData.lotNumber || reportData.planningData?.lotNumber;
    } else {
      locationData.lotNumber = 'Investigation Required';
      locationData.status = 'investigation_required';
    }

    if (addressData.planNumber || reportData.planningData?.planNumber) {
      locationData.planNumber = addressData.planNumber || reportData.planningData?.planNumber;
    } else {
      locationData.planNumber = 'Investigation Required';
      locationData.status = 'investigation_required';
    }

    // Extract coordinates if available
    if (reportData.planningData?.coordinates) {
      locationData.coordinates = reportData.planningData.coordinates;
    }

    updateReportData('locationData', locationData);
    console.log('Section 2 (RPD & Location) extracted:', locationData);
  };

  const extractLegalAndPlanning = () => {
    const legalData: any = {
      status: 'supplied',
      extractedFrom: 'PAF Step 2'
    };

    if (reportData.planningData) {
      // Extract planning data from PAF
      legalData.lga = reportData.planningData.lga || 'Investigation Required';
      legalData.zoning = reportData.planningData.zoneName || reportData.planningData.zoning || 'Investigation Required';
      legalData.zoneName = reportData.planningData.zoneName || 'Investigation Required';
      legalData.currentUse = reportData.planningData.landUse || reportData.planningData.currentUse || 'Investigation Required';
      legalData.overlays = reportData.planningData.overlays || [];
      legalData.heightRestriction = reportData.planningData.heightRestriction || 'Investigation Required';
      legalData.planningScheme = reportData.planningData.planningScheme || 'Investigation Required';
      legalData.permitRequired = reportData.planningData.permitRequired ? 'Yes' : 'No';
      legalData.developmentPotential = reportData.planningData.developmentPotential || 'Investigation Required';
      legalData.developmentPotential = reportData.planningData.developmentPotential || 'Investigation Required';
      
      // Check if data is incomplete
      const requiredFields = ['lga', 'zoning', 'currentUse'];
      const missingFields = requiredFields.filter(field => 
        !reportData.planningData[field] || reportData.planningData[field] === 'Investigation Required'
      );
      
      if (missingFields.length > 0) {
        legalData.status = 'investigation_required';
        legalData.missingFields = missingFields;
      }
    } else {
      legalData.lga = 'Planning Search Required';
      legalData.zoning = 'Planning Search Required';
      legalData.currentUse = 'Planning Search Required';
      legalData.status = 'investigation_required';
    }

    updateReportData('legalAndPlanning', legalData);
    console.log('Section 3 (Legal & Planning) extracted:', legalData);
  };

  const extractTenancySchedule = () => {
    const tenancyConfig = reportData.reportConfig?.includeTenancySchedule;
    const tenancyData: any = {
      included: tenancyConfig !== false,
      extractedFrom: 'PAF Step 6'
    };

    if (tenancyConfig === false) {
      tenancyData.status = 'not_applicable';
      tenancyData.reason = 'Property Type - Not Applicable';
      tenancyData.leaseDetails = 'Not Applicable - Property Type';
      tenancyData.currentRent = 'Not Applicable - Property Type';
      tenancyData.leaseExpiry = 'Not Applicable - Property Type';
    } else if (reportData.tenancyDetails) {
      // Extract from rental configuration
      tenancyData.status = 'supplied';
      tenancyData.leaseDetails = reportData.tenancyDetails.leaseDetails || 'Investigation Required';
      tenancyData.currentRent = reportData.tenancyDetails.currentRent || 'Investigation Required';
      tenancyData.leaseExpiry = reportData.tenancyDetails.leaseExpiry || 'Investigation Required';
      tenancyData.tenantType = reportData.tenancyDetails.tenantType || 'Investigation Required';
    } else {
      tenancyData.status = 'not_supplied';
      tenancyData.leaseDetails = 'Not Supplied - Manual Assessment Required';
      tenancyData.currentRent = 'Not Supplied - Manual Assessment Required';
      tenancyData.leaseExpiry = 'Not Supplied - Manual Assessment Required';
    }

    updateReportData('tenancyDetails', tenancyData);
    console.log('Section 4 (Tenancy Schedule) extracted:', tenancyData);
  };

  const extractStatutoryAssessment = () => {
    const statutoryConfig = reportData.reportConfig?.includeStatutoryAssessment;
    const statutoryData: any = {
      included: statutoryConfig !== false,
      extractedFrom: 'PAF Step 7'
    };

    if (statutoryConfig === false) {
      statutoryData.status = 'not_supplied';
      statutoryData.reason = 'Not Supplied - Manual Assessment Required';
      statutoryData.compliance = 'Not Supplied - Manual Assessment Required';
      statutoryData.permits = 'Not Supplied - Manual Assessment Required';
      statutoryData.approvals = 'Not Supplied - Manual Assessment Required';
    } else {
      // Check if we have statutory data from assessment automation
      if (reportData.statutoryAssessment) {
        statutoryData.status = 'supplied';
        statutoryData.compliance = reportData.statutoryAssessment.compliance || 'Investigation Required';
        statutoryData.permits = reportData.statutoryAssessment.permits || 'Investigation Required';
        statutoryData.approvals = reportData.statutoryAssessment.approvals || 'Investigation Required';
      } else {
        statutoryData.status = 'investigation_required';
        statutoryData.compliance = 'Investigation Required';
        statutoryData.permits = 'Investigation Required';
        statutoryData.approvals = 'Investigation Required';
      }
    }

    updateReportData('statutoryAssessment', statutoryData);
    console.log('Section 5 (Statutory Assessment) extracted:', statutoryData);
  };

  const extractMarketCommentary = () => {
    const marketData: any = {
      status: 'supplied',
      extractedFrom: 'PAF Step 3'
    };

    if (reportData.propertySearchData?.marketAnalysis) {
      marketData.analysis = reportData.propertySearchData.marketAnalysis;
      marketData.trends = reportData.propertySearchData.marketTrends || 'Investigation Required';
      marketData.comparables = reportData.propertySearchData.comparables || 'Investigation Required';
    } else {
      marketData.analysis = 'Market Analysis Required';
      marketData.trends = 'Market Analysis Required';
      marketData.comparables = 'Market Analysis Required';
      marketData.status = 'investigation_required';
    }

    updateReportData('marketCommentary', marketData);
    console.log('Section 6 (Market Commentary) extracted:', marketData);
  };

  const extractPropertyDetails = () => {
    const detailsData: any = {
      status: 'supplied',
      extractedFrom: 'PAF Step 4'
    };

    // Extract from photos and property config
    if (reportData.fileAttachments?.photos?.length > 0) {
      detailsData.photos = reportData.fileAttachments.photos;
      detailsData.description = 'Photos Provided - Description Required';
      detailsData.condition = 'Photo Analysis Required';
    } else {
      detailsData.photos = [];
      detailsData.description = 'Working Drawings or Provided Information Needed';
      detailsData.condition = 'Investigation Required';
      detailsData.status = 'investigation_required';
    }

    // Extract property type
    if (reportData.reportConfig?.propertyType) {
      detailsData.propertyType = reportData.reportConfig.propertyType;
    } else {
      detailsData.propertyType = 'Investigation Required';
      detailsData.status = 'investigation_required';
    }

    updateReportData('propertyDetails', detailsData);
    console.log('Section 7 (Property Details) extracted:', detailsData);
  };

  const extractEnvironmentalAssessment = () => {
    const envData: any = {
      status: 'investigation_required',
      extractedFrom: 'PAF Step 7'
    };

    // Priority order: PAF supplied → EPA extraction → Manual assessment
    if (reportData.environmentalAssessment) {
      envData.status = 'supplied';
      envData.epaData = reportData.environmentalAssessment.epaData || 'EPA Data Extraction Required';
      envData.sustainability = reportData.environmentalAssessment.sustainability || 'Investigation Required';
      envData.contamination = reportData.environmentalAssessment.contamination || 'Investigation Required';
    } else {
      envData.epaData = 'EPA Data Extraction Required';
      envData.sustainability = 'Valuer Assessment Required';
      envData.contamination = 'Valuer Assessment Required';
      envData.note = 'Environmental data to be assessed by valuer from available sources';
    }

    updateReportData('environmentalAssessment', envData);
    console.log('Section 8 (Environmental) extracted:', envData);
  };

  const extractRiskAssessment = () => {
    const riskData: any = {
      status: 'supplied',
      extractedFrom: 'PAF Workflow'
    };

    // Extract from planning and location data
    if (reportData.planningData?.riskAssessment) {
      riskData.heritage = reportData.planningData.riskAssessment.heritage || 'Investigation Required';
      riskData.flooding = reportData.planningData.riskAssessment.flooding || 'Investigation Required';
      riskData.bushfire = reportData.planningData.riskAssessment.bushfire || 'Investigation Required';
      riskData.contamination = reportData.planningData.riskAssessment.contamination || 'Investigation Required';
    } else {
      riskData.heritage = 'Risk Assessment Required';
      riskData.flooding = 'Risk Assessment Required';
      riskData.bushfire = 'Risk Assessment Required';
      riskData.contamination = 'Risk Assessment Required';
      riskData.status = 'investigation_required';
    }

    updateReportData('riskAssessment', riskData);
    console.log('Section 10 (Risk Assessment) extracted:', riskData);
  };

  return null; // Logic-only component
};

export default SectionDataExtractor;