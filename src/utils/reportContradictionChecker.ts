export interface ContradictionResult {
  hasContradictions: boolean;
  contradictions: string[];
  warnings: string[];
}

export interface ReportData {
  propertyData?: any;
  riskRatings?: any;
  vraAssessment?: any;
  salesEvidence?: any;
  rentalAssessment?: any;
  generalComments?: string;
  sections?: any;
}

export function checkReportContradictions(reportData: ReportData): ContradictionResult {
  const contradictions: string[] = [];
  const warnings: string[] = [];

  // Property condition vs rental assessment - CRITICAL CHECK
  if (reportData.propertyData && reportData.rentalAssessment) {
    const isUninhabitable = reportData.propertyData.kitchen_condition === 'missing' || 
                           reportData.propertyData.kitchen_condition === 'none' ||
                           reportData.propertyData.structural_condition === 'very_poor';
    const hasRental = reportData.rentalAssessment.weekly_rent > 0;
    
    if (isUninhabitable && hasRental) {
      contradictions.push("CRITICAL: Property is uninhabitable (missing kitchen/very poor condition) but shows rental income of $" + reportData.rentalAssessment.weekly_rent + "/week - uninhabitable properties cannot generate rental income");
    }
  }

  // Risk ratings vs VRA comments - ENHANCED CHECK
  if (reportData.riskRatings && reportData.vraAssessment) {
    const highRiskCount = Object.values(reportData.riskRatings).filter(
      (rating: any) => rating >= 4
    ).length;
    
    const vraComments = reportData.vraAssessment.comments || '';
    
    if (highRiskCount > 0 && vraComments.trim().length === 0) {
      contradictions.push(`CRITICAL: ${highRiskCount} high risk factors identified (rating ≥4) but no VRA comments provided - VRA assessment is mandatory for high-risk properties`);
    }
    
    if (highRiskCount > 0 && vraComments.trim().length < 50) {
      warnings.push(`${highRiskCount} high risk factors found but VRA comments are very brief (${vraComments.length} characters) - consider more detailed assessment`);
    }
  }

  // General comments risk statement vs actual risks - ENHANCED CHECK
  if (reportData.generalComments && reportData.riskRatings) {
    const hasHighRisks = Object.values(reportData.riskRatings).some(
      (rating: any) => rating >= 4
    );
    
    const commentLower = reportData.generalComments.toLowerCase();
    const claimsNoRisks = commentLower.includes('no significant risks') ||
                         commentLower.includes('minimal risk') ||
                         commentLower.includes('low risk profile') ||
                         commentLower.includes('no major concerns') ||
                         commentLower.includes('no risks highlighted') ||
                         commentLower.includes('risk-free');
    
    if (hasHighRisks && claimsNoRisks) {
      contradictions.push(`CRITICAL: General comments claim low/no risks but ${Object.values(reportData.riskRatings).filter((r: any) => r >= 4).length} high risk factors (≥4) are present - this is a serious contradiction`);
    }
  }

  // Sales evidence quantity vs market confidence
  if (reportData.salesEvidence && reportData.generalComments) {
    const salesCount = Array.isArray(reportData.salesEvidence) ? reportData.salesEvidence.length : 0;
    const claimsStrongMarket = reportData.generalComments.toLowerCase().includes('strong market evidence') ||
                              reportData.generalComments.toLowerCase().includes('excellent comparables');
    
    if (salesCount < 3 && claimsStrongMarket) {
      warnings.push("Claims strong market evidence but limited sales comparables available");
    }
  }

  // Property condition vs valuation confidence
  if (reportData.propertyData && reportData.generalComments) {
    const hasStructuralIssues = reportData.propertyData.structural_condition === 'poor' ||
                               reportData.propertyData.structural_condition === 'very_poor';
    const highConfidence = reportData.generalComments.toLowerCase().includes('high confidence') ||
                          reportData.generalComments.toLowerCase().includes('confident valuation');
    
    if (hasStructuralIssues && highConfidence) {
      contradictions.push("Claims high valuation confidence despite poor structural conditions");
    }
  }

  // External factors vs marketability assessment
  if (reportData.propertyData && reportData.generalComments) {
    const hasNegativeExternals = reportData.propertyData.external_factors?.includes('main_road') ||
                                reportData.propertyData.external_factors?.includes('power_lines') ||
                                reportData.propertyData.external_factors?.includes('industrial');
    
    const claimsGoodMarketability = reportData.generalComments.toLowerCase().includes('excellent marketability') ||
                                   reportData.generalComments.toLowerCase().includes('highly marketable');
    
    if (hasNegativeExternals && claimsGoodMarketability) {
      warnings.push("Claims excellent marketability despite negative external factors");
    }
  }

  // Incomplete sections check
  if (reportData.sections) {
    const incompleteSections = Object.entries(reportData.sections)
      .filter(([key, value]: [string, any]) => {
        if (typeof value === 'object' && value !== null) {
          return Object.values(value).some(v => v === '' || v === null || v === undefined);
        }
        return value === '' || value === null || value === undefined;
      })
      .map(([key]) => key);
    
    if (incompleteSections.length > 0) {
      warnings.push(`Incomplete sections detected: ${incompleteSections.join(', ')}`);
    }
  }

  return {
    hasContradictions: contradictions.length > 0,
    contradictions,
    warnings
  };
}

export function generateContradictionReport(contradictionResult: ContradictionResult): string {
  if (!contradictionResult.hasContradictions && contradictionResult.warnings.length === 0) {
    return "✅ No contradictions or warnings detected in report.";
  }

  let report = "";
  
  if (contradictionResult.contradictions.length > 0) {
    report += "🚨 CRITICAL CONTRADICTIONS FOUND:\n";
    contradictionResult.contradictions.forEach((contradiction, index) => {
      report += `${index + 1}. ${contradiction}\n`;
    });
    report += "\n";
  }
  
  if (contradictionResult.warnings.length > 0) {
    report += "⚠️ WARNINGS:\n";
    contradictionResult.warnings.forEach((warning, index) => {
      report += `${index + 1}. ${warning}\n`;
    });
  }
  
  return report;
}