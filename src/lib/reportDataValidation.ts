/**
 * Report Data Validation and Pre-population System
 * Ensures only correct data is populated with validation checks
 */

export interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
  warnings: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface DataCheckResult {
  shouldInclude: boolean;
  hasRequiredData: boolean;
  completeness: number; // 0-100%
  dataQuality: 'excellent' | 'good' | 'fair' | 'poor';
  reason?: string;
}

/**
 * Validates assessment data before populating report sections
 */
export function validateAssessmentData(assessmentData: any): ValidationResult {
  const missingFields: string[] = [];
  const warnings: string[] = [];
  let confidence: 'high' | 'medium' | 'low' = 'high';

  // Required fields validation
  const hasAddress = checkAddressData(assessmentData);
  if (!hasAddress.shouldInclude) {
    missingFields.push('Property Address');
    confidence = 'low';
  }

  // Planning data validation
  const planningCheck = checkPlanningData(assessmentData);
  if (!planningCheck.shouldInclude && planningCheck.completeness < 30) {
    warnings.push('Limited planning data - manual verification required');
    if (confidence === 'high') confidence = 'medium';
  }

  // Property type validation
  if (!assessmentData.reportData?.reportConfig?.propertyType) {
    missingFields.push('Property Type');
    confidence = 'low';
  }

  // Report type validation
  if (!assessmentData.reportData?.reportConfig?.reportType) {
    missingFields.push('Report Type');
    confidence = 'low';
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    warnings,
    confidence
  };
}

/**
 * Checks if address data is complete and valid
 */
export function checkAddressData(assessmentData: any): DataCheckResult {
  const addressData = assessmentData.addressData || {};
  const reportData = assessmentData.reportData || {};
  
  const hasAddress = addressData.propertyAddress || 
                    reportData.propertySearchData?.confirmedAddress ||
                    reportData.planningData?.address;

  if (!hasAddress) {
    return {
      shouldInclude: false,
      hasRequiredData: false,
      completeness: 0,
      dataQuality: 'poor',
      reason: 'No property address found'
    };
  }

  // Calculate completeness based on available address components
  let completeness = 20; // Base for having any address
  if (addressData.streetNumber) completeness += 15;
  if (addressData.streetName) completeness += 15;
  if (addressData.suburb) completeness += 20;
  if (addressData.state) completeness += 15;
  if (addressData.postcode) completeness += 15;

  const dataQuality = completeness >= 80 ? 'excellent' : 
                     completeness >= 60 ? 'good' : 
                     completeness >= 40 ? 'fair' : 'poor';

  return {
    shouldInclude: true,
    hasRequiredData: true,
    completeness,
    dataQuality
  };
}

/**
 * Checks planning data completeness and quality
 */
export function checkPlanningData(assessmentData: any): DataCheckResult {
  const planningData = assessmentData.reportData?.planningData || {};
  
  let completeness = 0;
  const fields = [
    'lga', 'zoning', 'zoneName', 'currentUse', 'lotNumber', 'planNumber',
    'overlays', 'heightRestrictions', 'developmentPotential', 'heritage',
    'floodRisk', 'bushfireRisk'
  ];

  fields.forEach(field => {
    if (planningData[field]) {
      completeness += (100 / fields.length);
    }
  });

  const hasMinimumData = planningData.zoning || planningData.lga;
  const dataQuality = completeness >= 70 ? 'excellent' : 
                     completeness >= 50 ? 'good' : 
                     completeness >= 30 ? 'fair' : 'poor';

  // Always include planning section - it's optional content that can be filled manually
  return {
    shouldInclude: true, // Changed from hasMinimumData
    hasRequiredData: hasMinimumData,
    completeness: Math.round(completeness),
    dataQuality,
    reason: hasMinimumData ? undefined : 'Planning data section available for manual entry'
  };
}

/**
 * Checks tenancy/lease data relevance
 */
export function checkTenancyData(assessmentData: any): DataCheckResult {
  const reportConfig = assessmentData.reportData?.reportConfig || {};
  const tenancyData = assessmentData.reportData?.tenancyDetails || {};
  
  // Only include if property has leasehold interest
  const isLeasehold = reportConfig.interestValues?.includes('Leasehold Interest') ||
                     reportConfig.interestValues?.includes('Ground Lease');

  if (!isLeasehold) {
    return {
      shouldInclude: false,
      hasRequiredData: false,
      completeness: 0,
      dataQuality: 'poor',
      reason: 'Property is not leasehold - tenancy section not applicable'
    };
  }

  // Check if tenancy data exists
  const hasGroundLease = tenancyData.groundLease?.include;
  const hasTenantData = tenancyData.tenantSummary?.include;
  
  let completeness = 0;
  if (hasGroundLease) completeness += 50;
  if (hasTenantData) completeness += 50;

  return {
    shouldInclude: isLeasehold,
    hasRequiredData: hasGroundLease || hasTenantData,
    completeness,
    dataQuality: completeness >= 50 ? 'good' : 'fair'
  };
}

/**
 * Checks file attachments quality and relevance
 */
export function checkFileAttachments(assessmentData: any): DataCheckResult {
  const fileAttachments = assessmentData.reportData?.fileAttachments || {};
  
  let completeness = 0;
  let hasPhotos = false;
  let hasDocuments = false;

  if (fileAttachments.propertyPhotos?.length > 0) {
    hasPhotos = true;
    completeness += 40;
  }

  if (fileAttachments.propertyDocuments?.length > 0 || 
      fileAttachments.planningDocuments?.length > 0 ||
      fileAttachments.marketEvidence?.length > 0) {
    hasDocuments = true;
    completeness += 60;
  }

  const dataQuality = (hasPhotos && hasDocuments) ? 'excellent' :
                     (hasPhotos || hasDocuments) ? 'good' : 'fair';

  // Always include file attachments section, even if empty - it's optional content
  return {
    shouldInclude: true, // Changed from hasPhotos || hasDocuments
    hasRequiredData: hasPhotos || hasDocuments,
    completeness,
    dataQuality,
    reason: (!hasPhotos && !hasDocuments) ? 'No supporting files uploaded - section will be available for manual entry' : undefined
  };
}

/**
 * Checks valuation approaches selection
 */
export function checkValuationApproaches(assessmentData: any): DataCheckResult {
  const reportConfig = assessmentData.reportData?.reportConfig || {};
  const approaches = reportConfig.valuationApproaches || [];

  // Calculate completeness based on approach diversity
  const maxApproaches = 4; // Direct Comparison, Income, Cost, Development
  const completeness = approaches.length > 0 ? (approaches.length / maxApproaches) * 100 : 0;

  const dataQuality = approaches.length >= 2 ? 'excellent' :
                     approaches.length === 1 ? 'good' : 'fair';

  // Always include valuation analysis section - it's core to any report
  return {
    shouldInclude: true, // Changed from approaches.length > 0
    hasRequiredData: approaches.length > 0,
    completeness: Math.min(completeness, 100),
    dataQuality,
    reason: approaches.length === 0 ? 'Valuation approaches section available for manual configuration' : undefined
  };
}

/**
 * Checks property identification methods
 */
export function checkPropertyIdentification(assessmentData: any): DataCheckResult {
  const propertyId = assessmentData.reportData?.propertyIdentification || {};
  
  const methods = [
    'physicalInspection', 'surveyorPeg', 'plan', 'cadastralMap', 
    'certificateTitle', 'aerialMapping'
  ];

  const selectedMethods = methods.filter(method => propertyId[method]).length;
  const completeness = selectedMethods > 0 ? (selectedMethods / methods.length) * 100 : 0;

  const hasMinimum = selectedMethods >= 1;
  const dataQuality = selectedMethods >= 3 ? 'excellent' :
                     selectedMethods >= 2 ? 'good' :
                     selectedMethods >= 1 ? 'fair' : 'fair';

  // Always include property identification section - it's important for report completion
  return {
    shouldInclude: true, // Changed from hasMinimum
    hasRequiredData: hasMinimum,
    completeness,
    dataQuality,
    reason: !hasMinimum ? 'Property identification section available for manual completion' : undefined
  };
}

/**
 * Main function to validate and determine what should be included in report
 */
export function validateAndFilterReportData(assessmentData: any) {
  const validation = validateAssessmentData(assessmentData);
  
  if (!validation.isValid) {
    return {
      isValid: false,
      missingFields: validation.missingFields,
      warnings: validation.warnings,
      confidence: validation.confidence,
      includeSections: {}
    };
  }

  // Check each section individually
  const sections = {
    rpdAndLocation: checkAddressData(assessmentData),
    legalAndPlanning: checkPlanningData(assessmentData),
    tenancyScheduleLeaseDetails: checkTenancyData(assessmentData),
    fileAttachments: checkFileAttachments(assessmentData),
    valuationAnalysis: checkValuationApproaches(assessmentData),
    propertyIdentification: checkPropertyIdentification(assessmentData),
    // Always include these as they're minimal data requirements
    valuationCertificate: { shouldInclude: true, hasRequiredData: true, completeness: 100, dataQuality: 'good' as const },
    riskAssessment: { shouldInclude: true, hasRequiredData: true, completeness: 100, dataQuality: 'good' as const },
    salesHistory: { shouldInclude: true, hasRequiredData: true, completeness: 100, dataQuality: 'good' as const }
  };

  return {
    isValid: true,
    validation,
    sections,
    includeSections: Object.fromEntries(
      Object.entries(sections).filter(([_, check]) => check.shouldInclude)
    )
  };
}