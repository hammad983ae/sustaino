/**
 * Summary Generator Utility
 * Extracts summaries from report sections and combines them into executive summaries
 */

export interface SectionSummary {
  title: string;
  content: string;
  keyPoints: string[];
  dataQuality: 'high' | 'medium' | 'low';
  completeness: number;
}

export interface SectionSummaries {
  [sectionKey: string]: SectionSummary;
}

/**
 * Extracts summaries from all completed report sections
 */
export function extractSectionSummaries(reportData: any): SectionSummaries {
  const summaries: SectionSummaries = {};

  // Property and Location Summary
  if (reportData.propertySearchData || reportData.locationData) {
    summaries.property = {
      title: 'Property Description and Location',
      content: extractPropertySummary(reportData),
      keyPoints: extractPropertyKeyPoints(reportData),
      dataQuality: reportData.propertySearchData?.confirmedAddress ? 'high' : 'medium',
      completeness: calculatePropertyCompleteness(reportData)
    };
  }

  // Planning and Legal Summary
  if (reportData.planningData || reportData.legalAndPlanning) {
    summaries.planning = {
      title: 'Planning and Legal Considerations',
      content: extractPlanningSummary(reportData),
      keyPoints: extractPlanningKeyPoints(reportData),
      dataQuality: reportData.planningData?.zoning ? 'high' : 'low',
      completeness: calculatePlanningCompleteness(reportData)
    };
  }

  // Valuation Analysis Summary
  if (reportData.valuationAnalysis || reportData.valuationCertificate) {
    summaries.valuation = {
      title: 'Valuation Analysis and Conclusions',
      content: extractValuationSummary(reportData),
      keyPoints: extractValuationKeyPoints(reportData),
      dataQuality: reportData.valuationCertificate?.certificateDetails?.marketValue ? 'high' : 'medium',
      completeness: calculateValuationCompleteness(reportData)
    };
  }

  // Market Analysis Summary
  if (reportData.riskAssessment || reportData.salesHistory) {
    summaries.market = {
      title: 'Market Analysis and Risk Assessment',
      content: extractMarketSummary(reportData),
      keyPoints: extractMarketKeyPoints(reportData),
      dataQuality: reportData.salesHistory?.includePreviousSales ? 'high' : 'medium',
      completeness: calculateMarketCompleteness(reportData)
    };
  }

  // Tenancy Summary (if applicable)
  if (reportData.tenancyDetails?.groundLease?.include || reportData.tenancyDetails?.tenantSummary?.include) {
    summaries.tenancy = {
      title: 'Tenancy and Lease Analysis',
      content: extractTenancySummary(reportData),
      keyPoints: extractTenancyKeyPoints(reportData),
      dataQuality: 'medium',
      completeness: calculateTenancyCompleteness(reportData)
    };
  }

  return summaries;
}

/**
 * Property-related summary extraction
 */
function extractPropertySummary(reportData: any): string {
  const address = reportData.propertySearchData?.confirmedAddress || 
                 reportData.planningData?.address || 
                 'Property address not specified';
  
  const propertyType = reportData.reportConfig?.propertyType || 'Property type not specified';
  
  const locationInfo = reportData.locationData ? [
    reportData.locationData.location,
    reportData.locationData.access,
    reportData.locationData.neighbourhood
  ].filter(Boolean).join('. ') : '';

  return `The subject property is located at ${address} and is classified as ${propertyType}. ${locationInfo}`.trim();
}

function extractPropertyKeyPoints(reportData: any): string[] {
  const points: string[] = [];
  
  if (reportData.propertySearchData?.lotPlan) {
    points.push(`Lot/Plan: ${reportData.propertySearchData.lotPlan}`);
  }
  
  if (reportData.propertyDetails?.buildingArea) {
    points.push(`Building Area: ${reportData.propertyDetails.buildingArea}m²`);
  }
  
  if (reportData.propertyDetails?.landArea) {
    points.push(`Land Area: ${reportData.propertyDetails.landArea}m²`);
  }

  return points;
}

/**
 * Planning-related summary extraction
 */
function extractPlanningSummary(reportData: any): string {
  const planning = reportData.planningData || reportData.legalAndPlanning;
  if (!planning) return '';

  const zoning = planning.zoning || planning.zoneName || 'Zoning not specified';
  const lga = planning.lga || 'LGA not specified';
  const currentUse = planning.currentUse || planning.landUse || '';

  let summary = `The property is zoned ${zoning} within ${lga}`;
  if (currentUse) {
    summary += ` and is currently used for ${currentUse}`;
  }
  summary += '.';

  if (planning.developmentPotential) {
    summary += ` Development potential: ${planning.developmentPotential}.`;
  }

  return summary;
}

function extractPlanningKeyPoints(reportData: any): string[] {
  const planning = reportData.planningData || reportData.legalAndPlanning;
  if (!planning) return [];

  const points: string[] = [];
  
  if (planning.overlays?.length > 0) {
    points.push(`Planning overlays: ${planning.overlays.join(', ')}`);
  }
  
  if (planning.heightRestrictions) {
    points.push(`Height restrictions: ${planning.heightRestrictions}`);
  }
  
  if (planning.permitRequired) {
    points.push('Planning permit may be required for certain developments');
  }

  return points;
}

/**
 * Valuation-related summary extraction
 */
function extractValuationSummary(reportData: any): string {
  const cert = reportData.valuationCertificate;
  const analysis = reportData.valuationAnalysis;
  
  let summary = '';
  
  if (cert?.certificateDetails?.marketValue) {
    const value = cert.certificateDetails.marketValue;
    summary += `The market value assessment is $${value.toLocaleString()}`;
    
    if (cert.valuationBasis) {
      summary += ` on a ${cert.valuationBasis} basis`;
    }
    summary += '. ';
  }
  
  if (analysis?.selectedApproaches?.length > 0) {
    summary += `Valuation methods applied include ${analysis.selectedApproaches.join(', ')}.`;
  }

  return summary.trim();
}

function extractValuationKeyPoints(reportData: any): string[] {
  const points: string[] = [];
  const cert = reportData.valuationCertificate;
  
  if (cert?.interestValued) {
    points.push(`Interest valued: ${cert.interestValued}`);
  }
  
  if (cert?.purposeOfValuation) {
    points.push(`Valuation purpose: ${cert.purposeOfValuation}`);
  }
  
  if (cert?.dateOfValuation) {
    points.push(`Valuation date: ${cert.dateOfValuation}`);
  }

  return points;
}

/**
 * Market analysis summary extraction
 */
function extractMarketSummary(reportData: any): string {
  let summary = '';
  
  if (reportData.salesHistory?.lastSalePrice) {
    summary += `Previous sale recorded at $${reportData.salesHistory.lastSalePrice.toLocaleString()} on ${reportData.salesHistory.lastSaleDate}. `;
  }
  
  if (reportData.riskAssessment?.pestelFactors) {
    summary += 'Market analysis includes comprehensive risk assessment covering political, economic, social, technological, environmental, and legal factors.';
  }

  return summary.trim();
}

function extractMarketKeyPoints(reportData: any): string[] {
  const points: string[] = [];
  
  if (reportData.riskAssessment?.swotAnalysis) {
    const swot = reportData.riskAssessment.swotAnalysis;
    if (swot.strengthsText && swot.strengthsText.trim()) {
      const strengths = swot.strengthsText.split(/[,\n]/).map((s: string) => s.trim()).filter((s: string) => s.length > 0);
      if (strengths.length > 0) {
        points.push(`Key strengths: ${strengths.slice(0, 2).join(', ')}`);
      }
    }
    if (swot.threatsText && swot.threatsText.trim()) {
      const threats = swot.threatsText.split(/[,\n]/).map((t: string) => t.trim()).filter((t: string) => t.length > 0);
      if (threats.length > 0) {
        points.push(`Primary risks: ${threats.slice(0, 2).join(', ')}`);
      }
    }
  }

  return points;
}

/**
 * Tenancy summary extraction
 */
function extractTenancySummary(reportData: any): string {
  const tenancy = reportData.tenancyDetails;
  if (!tenancy) return '';

  let summary = '';
  
  if (tenancy.groundLease?.include) {
    summary += 'Property is subject to ground lease arrangements. ';
    if (tenancy.groundLease.leaseTerm) {
      summary += `Lease term: ${tenancy.groundLease.leaseTerm} years. `;
    }
  }
  
  if (tenancy.tenantSummary?.include) {
    summary += 'Comprehensive tenancy analysis completed. ';
    if (tenancy.tenantSummary.commencementRent) {
      summary += `Current rent: $${tenancy.tenantSummary.commencementRent.toLocaleString()}. `;
    }
  }

  return summary.trim();
}

function extractTenancyKeyPoints(reportData: any): string[] {
  const points: string[] = [];
  const tenancy = reportData.tenancyDetails;
  
  if (tenancy?.groundLease?.reviewMethod) {
    points.push(`Rent review method: ${tenancy.groundLease.reviewMethod}`);
  }
  
  if (tenancy?.tenantSummary?.expiryDate) {
    points.push(`Lease expiry: ${tenancy.tenantSummary.expiryDate}`);
  }

  return points;
}

/**
 * Completeness calculation functions
 */
function calculatePropertyCompleteness(reportData: any): number {
  const fields = [
    reportData.propertySearchData?.confirmedAddress,
    reportData.propertyDetails?.propertyType,
    reportData.locationData?.location,
    reportData.locationData?.access
  ];
  return (fields.filter(Boolean).length / fields.length) * 100;
}

function calculatePlanningCompleteness(reportData: any): number {
  const planning = reportData.planningData || reportData.legalAndPlanning;
  if (!planning) return 0;
  
  const fields = [
    planning.zoning,
    planning.lga,
    planning.currentUse,
    planning.developmentPotential
  ];
  return (fields.filter(Boolean).length / fields.length) * 100;
}

function calculateValuationCompleteness(reportData: any): number {
  const fields = [
    reportData.valuationCertificate?.certificateDetails?.marketValue,
    reportData.valuationCertificate?.purposeOfValuation,
    reportData.valuationAnalysis?.selectedApproaches?.length > 0,
    reportData.valuationCertificate?.interestValued
  ];
  return (fields.filter(Boolean).length / fields.length) * 100;
}

function calculateMarketCompleteness(reportData: any): number {
  const fields = [
    reportData.riskAssessment?.pestelFactors,
    reportData.riskAssessment?.swotAnalysis,
    reportData.salesHistory?.lastSalePrice,
    reportData.riskAssessment?.includePestelAnalysis
  ];
  return (fields.filter(Boolean).length / fields.length) * 100;
}

function calculateTenancyCompleteness(reportData: any): number {
  const tenancy = reportData.tenancyDetails;
  if (!tenancy) return 0;
  
  const fields = [
    tenancy.groundLease?.leaseTerm,
    tenancy.groundLease?.reviewMethod,
    tenancy.tenantSummary?.commencementRent,
    tenancy.tenantSummary?.expiryDate
  ];
  return (fields.filter(Boolean).length / fields.length) * 100;
}

/**
 * Combines section summaries with AI-generated content into final executive summary
 */
export function combineIntoExecutiveSummary(
  sectionSummaries: SectionSummaries, 
  aiSummary: string = ''
): string {
  const sections = Object.values(sectionSummaries);
  
  if (sections.length === 0) {
    return 'No report sections available for summary generation.';
  }

  // Start with AI summary if available
  let executiveSummary = aiSummary ? `${aiSummary}\n\n` : '';

  // Add structured section content
  executiveSummary += '**Key Report Findings:**\n\n';
  
  sections.forEach(section => {
    if (section.content) {
      executiveSummary += `**${section.title}:**\n${section.content}\n\n`;
    }
    
    if (section.keyPoints.length > 0) {
      section.keyPoints.forEach(point => {
        executiveSummary += `• ${point}\n`;
      });
      executiveSummary += '\n';
    }
  });

  // Add data quality summary
  const avgCompleteness = sections.reduce((sum, s) => sum + s.completeness, 0) / sections.length;
  const highQualitySections = sections.filter(s => s.dataQuality === 'high').length;
  
  executiveSummary += `**Report Completeness:** ${Math.round(avgCompleteness)}% complete with ${highQualitySections} of ${sections.length} sections having high-quality data.\n\n`;
  
  executiveSummary += '**Conclusion:**\nThis comprehensive valuation analysis provides a thorough assessment of the subject property based on current market conditions, regulatory requirements, and professional valuation standards.';

  return executiveSummary.trim();
}