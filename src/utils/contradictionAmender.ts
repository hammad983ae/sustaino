import { ContradictionResult, ReportData } from './reportContradictionChecker';

export interface AmendmentResult {
  success: boolean;
  amendedData: ReportData;
  amendments: Amendment[];
  remainingContradictions: string[];
  failedAmendments: string[];
}

export interface Amendment {
  type: 'auto_fix' | 'suggestion';
  description: string;
  field: string;
  originalValue: any;
  amendedValue: any;
  confidence: 'high' | 'medium' | 'low';
}

export class ContradictionAmender {
  private reportData: ReportData;

  constructor(reportData: ReportData) {
    this.reportData = { ...reportData };
  }

  async amendContradictions(contradictions: ContradictionResult): Promise<AmendmentResult> {
    const amendments: Amendment[] = [];
    const failedAmendments: string[] = [];
    const remainingContradictions: string[] = [];

    for (const contradiction of contradictions.contradictions) {
      const amendment = await this.attemptAmendment(contradiction);
      
      if (amendment) {
        amendments.push(amendment);
        this.applyAmendment(amendment);
      } else {
        failedAmendments.push(contradiction);
        remainingContradictions.push(contradiction);
      }
    }

    return {
      success: amendments.length > 0,
      amendedData: this.reportData,
      amendments,
      remainingContradictions,
      failedAmendments
    };
  }

  private async attemptAmendment(contradiction: string): Promise<Amendment | null> {
    // Uninhabitable property with rental income
    if (contradiction.includes('uninhabitable') && contradiction.includes('rental income')) {
      return this.fixUninhabitableRental(contradiction);
    }

    // High risk factors without VRA comments
    if (contradiction.includes('high risk factors') && contradiction.includes('no VRA comments')) {
      return this.fixMissingVRAComments(contradiction);
    }

    // General comments claiming no risks when high risks exist
    if (contradiction.includes('General comments claim low/no risks') && contradiction.includes('high risk factors')) {
      return this.fixInconsistentRiskComments(contradiction);
    }

    // High confidence claims with poor structural conditions
    if (contradiction.includes('high valuation confidence') && contradiction.includes('poor structural conditions')) {
      return this.fixConfidenceStructuralConflict(contradiction);
    }

    // Strong market claims with limited sales evidence
    if (contradiction.includes('strong market evidence') && contradiction.includes('limited sales comparables')) {
      return this.fixLimitedSalesEvidence(contradiction);
    }

    // Excellent marketability claims with negative externals
    if (contradiction.includes('excellent marketability') && contradiction.includes('negative external factors')) {
      return this.fixMarketabilityExternalConflict(contradiction);
    }

    return null;
  }

  private fixUninhabitableRental(contradiction: string): Amendment {
    const rentalMatch = contradiction.match(/\$(\d+(?:,\d+)*)/);
    const weeklyRent = rentalMatch ? parseFloat(rentalMatch[1].replace(',', '')) : 0;

    // Set rental to 0 and add explanation
    const amendment: Amendment = {
      type: 'auto_fix',
      description: 'Removed rental income from uninhabitable property',
      field: 'rentalAssessment.weekly_rent',
      originalValue: weeklyRent,
      amendedValue: 0,
      confidence: 'high'
    };

    return amendment;
  }

  private fixMissingVRAComments(contradiction: string): Amendment {
    const riskCountMatch = contradiction.match(/(\d+) high risk factors/);
    const riskCount = riskCountMatch ? parseInt(riskCountMatch[1]) : 0;

    const generatedComments = this.generateVRAComments(riskCount);

    return {
      type: 'auto_fix',
      description: 'Generated mandatory VRA comments for high-risk property',
      field: 'vraAssessment.comments',
      originalValue: '',
      amendedValue: generatedComments,
      confidence: 'medium'
    };
  }

  private fixInconsistentRiskComments(contradiction: string): Amendment {
    const riskCountMatch = contradiction.match(/(\d+) high risk factors/);
    const riskCount = riskCountMatch ? parseInt(riskCountMatch[1]) : 0;

    const revisedComments = this.generateRiskAwareComments(riskCount);

    return {
      type: 'auto_fix',
      description: 'Updated general comments to acknowledge identified high-risk factors',
      field: 'generalComments',
      originalValue: this.reportData.generalComments || '',
      amendedValue: revisedComments,
      confidence: 'high'
    };
  }

  private fixConfidenceStructuralConflict(contradiction: string): Amendment {
    const moderatedComments = this.moderateConfidenceLanguage();

    return {
      type: 'auto_fix',
      description: 'Moderated confidence language due to structural condition concerns',
      field: 'generalComments',
      originalValue: this.reportData.generalComments || '',
      amendedValue: moderatedComments,
      confidence: 'high'
    };
  }

  private fixLimitedSalesEvidence(contradiction: string): Amendment {
    const revisedComments = this.moderateMarketEvidenceLanguage();

    return {
      type: 'auto_fix',
      description: 'Moderated market evidence claims to reflect limited sales data',
      field: 'generalComments',
      originalValue: this.reportData.generalComments || '',
      amendedValue: revisedComments,
      confidence: 'medium'
    };
  }

  private fixMarketabilityExternalConflict(contradiction: string): Amendment {
    const balancedComments = this.balanceMarketabilityAssessment();

    return {
      type: 'auto_fix',
      description: 'Balanced marketability assessment considering external factors',
      field: 'generalComments',
      originalValue: this.reportData.generalComments || '',
      amendedValue: balancedComments,
      confidence: 'medium'
    };
  }

  private generateVRAComments(riskCount: number): string {
    const comments = [
      `This valuation has identified ${riskCount} high-risk factors that require careful consideration.`,
      'A comprehensive risk assessment has been conducted in accordance with VRA requirements.',
      'The identified risks have been factored into the valuation methodology and final opinion of value.',
      'Regular monitoring and reassessment of these risk factors is recommended.',
      'Professional advice should be sought regarding risk mitigation strategies.'
    ];

    return comments.join(' ');
  }

  private generateRiskAwareComments(riskCount: number): string {
    const baseComments = this.reportData.generalComments || '';
    
    // Remove contradictory language
    let amendedComments = baseComments
      .replace(/no significant risks?/gi, '')
      .replace(/minimal risk/gi, '')
      .replace(/low risk profile/gi, '')
      .replace(/no major concerns/gi, '')
      .replace(/no risks highlighted/gi, '')
      .replace(/risk-free/gi, '')
      .trim();

    // Add risk acknowledgment
    const riskAcknowledgment = `This assessment has identified ${riskCount} significant risk factors that have been carefully considered in the valuation process. These risks require ongoing monitoring and may impact future value assessments.`;

    return amendedComments ? `${amendedComments} ${riskAcknowledgment}` : riskAcknowledgment;
  }

  private moderateConfidenceLanguage(): string {
    const baseComments = this.reportData.generalComments || '';
    
    return baseComments
      .replace(/high confidence/gi, 'reasonable confidence')
      .replace(/confident valuation/gi, 'considered valuation')
      .replace(/very confident/gi, 'reasonably confident')
      + ' Note: Structural condition factors have been considered in this assessment.';
  }

  private moderateMarketEvidenceLanguage(): string {
    const baseComments = this.reportData.generalComments || '';
    
    return baseComments
      .replace(/strong market evidence/gi, 'available market evidence')
      .replace(/excellent comparables/gi, 'relevant comparables')
      .replace(/comprehensive market data/gi, 'available market data');
  }

  private balanceMarketabilityAssessment(): string {
    const baseComments = this.reportData.generalComments || '';
    
    return baseComments
      .replace(/excellent marketability/gi, 'reasonable marketability')
      .replace(/highly marketable/gi, 'marketable')
      + ' External factors may impact marketability and should be considered by potential purchasers.';
  }

  private applyAmendment(amendment: Amendment): void {
    const fieldPath = amendment.field.split('.');
    let current = this.reportData as any;

    // Navigate to the parent object
    for (let i = 0; i < fieldPath.length - 1; i++) {
      if (!current[fieldPath[i]]) {
        current[fieldPath[i]] = {};
      }
      current = current[fieldPath[i]];
    }

    // Set the final value
    const finalField = fieldPath[fieldPath.length - 1];
    current[finalField] = amendment.amendedValue;
  }
}

export async function runAutomatedAmendment(reportData: ReportData, contradictions: ContradictionResult): Promise<AmendmentResult> {
  const amender = new ContradictionAmender(reportData);
  return await amender.amendContradictions(contradictions);
}