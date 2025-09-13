/**
 * ============================================================================
 * AUTOMATIC RISK ASSESSMENT SYSTEM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Automatic risk evaluation algorithms for residential properties
 * ============================================================================
 */

export interface PropertyData {
  address?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  propertyType?: string;
  zoning?: string;
  landArea?: number;
  buildingArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  yearBuilt?: number;
  constructionType?: string;
  proximityToMainRoad?: number; // meters
  proximityToTransport?: number; // meters
  proximityToShops?: number; // meters
  proximityToSchools?: number; // meters
  floodZone?: boolean;
  bushfireZone?: boolean;
  coastalLocation?: boolean;
  planningRestrictions?: string[];
  marketConditions?: {
    daysOnMarket?: number;
    priceMovement?: string; // 'increasing' | 'stable' | 'declining'
    salesActivity?: string; // 'high' | 'moderate' | 'low'
    rentalVacancy?: number; // percentage
  };
}

export interface RiskAssessment {
  category: string;
  rating: number; // 1-5 scale
  summary: string;
  factors: string[];
}

export interface AutomaticRiskAssessmentResult {
  assessments: RiskAssessment[];
  overallRiskProfile: string;
  keyRiskFactors: string[];
  marketCyclePhase: string;
}

/**
 * Automatic risk assessment for residential properties
 */
export class AutomaticRiskAssessment {
  
  /**
   * Main entry point for automatic risk assessment
   */
  static evaluateResidentialProperty(propertyData: PropertyData): AutomaticRiskAssessmentResult {
    const assessments: RiskAssessment[] = [
      this.assessLocationNeighbourhood(propertyData),
      this.assessLandPlanning(propertyData),
      this.assessEnvironmental(propertyData),
      this.assessMarketActivity(propertyData),
      this.assessMarketDirection(propertyData),
      this.assessEconomicImpact(propertyData),
      this.assessMarketSegment(propertyData)
    ];

    const overallRisk = this.calculateOverallRisk(assessments);
    const keyFactors = this.identifyKeyRiskFactors(assessments);
    const marketPhase = this.determineMarketCyclePhase(propertyData);

    return {
      assessments,
      overallRiskProfile: overallRisk,
      keyRiskFactors: keyFactors,
      marketCyclePhase: marketPhase
    };
  }

  /**
   * Location & Neighbourhood Risk Assessment
   */
  private static assessLocationNeighbourhood(data: PropertyData): RiskAssessment {
    let rating = 3; // Default moderate
    let factors: string[] = [];
    let summary = "";

    // Proximity to amenities assessment
    if (data.proximityToTransport && data.proximityToTransport < 800) {
      rating -= 1;
      factors.push("Excellent public transport access");
    } else if (data.proximityToTransport && data.proximityToTransport > 2000) {
      rating += 1;
      factors.push("Limited public transport access");
    }

    if (data.proximityToShops && data.proximityToShops < 1000) {
      rating -= 0.5;
      factors.push("Close to shopping facilities");
    }

    if (data.proximityToSchools && data.proximityToSchools < 1500) {
      rating -= 0.5;
      factors.push("Proximity to quality schools");
    }

    // Suburb desirability (based on postcode patterns for major cities)
    const premiumPostcodes = this.getPremiumPostcodes(data.state);
    if (data.postcode && premiumPostcodes.includes(data.postcode)) {
      rating -= 1;
      factors.push("Premium location with strong market fundamentals");
    }

    // Main road proximity (negative for residential)
    if (data.proximityToMainRoad && data.proximityToMainRoad < 100) {
      rating += 1;
      factors.push("High traffic noise and pollution exposure");
    }

    rating = Math.max(1, Math.min(5, Math.round(rating)));

    summary = this.generateLocationSummary(rating, factors);

    return {
      category: "Location Neighbourhood",
      rating,
      summary,
      factors
    };
  }

  /**
   * Land & Planning Risk Assessment
   */
  private static assessLandPlanning(data: PropertyData): RiskAssessment {
    let rating = 2; // Default low-moderate
    let factors: string[] = [];

    // Zoning assessment
    if (data.zoning) {
      if (data.zoning.includes('R1') || data.zoning.includes('RU1')) {
        rating = 1;
        factors.push("Stable residential zoning with minimal development risk");
      } else if (data.zoning.includes('R3') || data.zoning.includes('R4')) {
        rating = 3;
        factors.push("Medium density zoning may affect character and amenity");
      } else if (data.zoning.includes('B') || data.zoning.includes('IN')) {
        rating = 4;
        factors.push("Commercial/industrial zoning presents potential compatibility issues");
      }
    }

    // Planning restrictions
    if (data.planningRestrictions && data.planningRestrictions.length > 0) {
      if (data.planningRestrictions.includes('heritage')) {
        rating += 1;
        factors.push("Heritage listing may restrict development potential");
      }
      if (data.planningRestrictions.includes('flooding')) {
        rating += 2;
        factors.push("Flood overlay significantly impacts development and insurance");
      }
      if (data.planningRestrictions.includes('easement')) {
        rating += 0.5;
        factors.push("Easements may limit development options");
      }
    }

    rating = Math.max(1, Math.min(5, Math.round(rating)));

    return {
      category: "Land Planning",
      rating,
      summary: this.generatePlanningSummary(rating, factors),
      factors
    };
  }

  /**
   * Environmental Risk Assessment
   */
  private static assessEnvironmental(data: PropertyData): RiskAssessment {
    let rating = 2; // Default low-moderate
    let factors: string[] = [];

    // Natural hazard assessment
    if (data.floodZone) {
      rating += 2;
      factors.push("Located in flood-prone area with increased insurance costs and risk");
    }

    if (data.bushfireZone) {
      rating += 1.5;
      factors.push("Bushfire risk area requires additional building standards and insurance");
    }

    if (data.coastalLocation) {
      rating += 0.5;
      factors.push("Coastal location subject to erosion and storm surge risks");
    }

    // Building age and construction type
    if (data.yearBuilt && data.yearBuilt < 1960) {
      rating += 1;
      factors.push("Older construction may contain asbestos or require structural upgrades");
    } else if (data.yearBuilt && data.yearBuilt > 2000) {
      rating -= 0.5;
      factors.push("Modern construction meets current building standards");
    }

    // Traffic pollution (already considered in location, but environmental impact)
    if (data.proximityToMainRoad && data.proximityToMainRoad < 200) {
      // Note: Unlike commercial properties, residential properties are negatively affected by main roads
      rating += 0.5;
      factors.push("Air quality concerns due to proximity to major traffic");
    }

    rating = Math.max(1, Math.min(5, Math.round(rating)));

    return {
      category: "Environmental",
      rating,
      summary: this.generateEnvironmentalSummary(rating, factors),
      factors
    };
  }

  /**
   * Market Activity Risk Assessment
   */
  private static assessMarketActivity(data: PropertyData): RiskAssessment {
    let rating = 3; // Default moderate
    let factors: string[] = [];

    if (data.marketConditions) {
      // Days on market assessment
      if (data.marketConditions.daysOnMarket) {
        if (data.marketConditions.daysOnMarket < 30) {
          rating -= 1;
          factors.push("Strong market with quick sales turnover");
        } else if (data.marketConditions.daysOnMarket > 90) {
          rating += 1;
          factors.push("Slower market conditions with extended marketing periods");
        }
      }

      // Sales activity
      if (data.marketConditions.salesActivity === 'high') {
        rating -= 1;
        factors.push("High sales activity indicates strong buyer demand");
      } else if (data.marketConditions.salesActivity === 'low') {
        rating += 1;
        factors.push("Low sales activity suggests subdued market conditions");
      }

      // Rental vacancy
      if (data.marketConditions.rentalVacancy) {
        if (data.marketConditions.rentalVacancy < 2) {
          rating -= 0.5;
          factors.push("Low vacancy rates support rental returns");
        } else if (data.marketConditions.rentalVacancy > 5) {
          rating += 1;
          factors.push("High vacancy rates indicate oversupply concerns");
        }
      }
    }

    rating = Math.max(1, Math.min(5, Math.round(rating)));

    return {
      category: "Market Activity",
      rating,
      summary: this.generateMarketActivitySummary(rating, factors),
      factors
    };
  }

  /**
   * Market Direction Risk Assessment
   */
  private static assessMarketDirection(data: PropertyData): RiskAssessment {
    let rating = 3; // Default moderate
    let factors: string[] = [];

    if (data.marketConditions?.priceMovement) {
      switch (data.marketConditions.priceMovement) {
        case 'increasing':
          rating = 2;
          factors.push("Positive price trajectory supports capital growth prospects");
          break;
        case 'declining':
          rating = 4;
          factors.push("Declining market presents capital growth challenges");
          break;
        default:
          rating = 3;
          factors.push("Stable market conditions with moderate growth expectations");
      }
    }

    // Market cycle considerations for residential
    const cyclePhase = this.determineMarketCyclePhase(data);
    switch (cyclePhase) {
      case 'Recovery':
        rating -= 0.5;
        factors.push("Market recovery phase presents opportunities for capital growth");
        break;
      case 'Peak':
        rating += 1;
        factors.push("Market peak increases risk of price corrections");
        break;
      case 'Decline':
        rating += 1.5;
        factors.push("Market decline phase presents heightened capital risk");
        break;
    }

    rating = Math.max(1, Math.min(5, Math.round(rating)));

    return {
      category: "Market Direction",
      rating,
      summary: this.generateMarketDirectionSummary(rating, factors),
      factors
    };
  }

  /**
   * Economic Impact Risk Assessment
   */
  private static assessEconomicImpact(data: PropertyData): RiskAssessment {
    let rating = 3; // Default moderate
    let factors: string[] = [];

    // State-based economic considerations
    if (data.state) {
      switch (data.state.toUpperCase()) {
        case 'NSW':
        case 'VIC':
          rating = 2;
          factors.push("Strong diversified economy supports stable property markets");
          break;
        case 'QLD':
          rating = 2.5;
          factors.push("Tourism and mining economy with moderate volatility");
          break;
        case 'WA':
          rating = 3.5;
          factors.push("Resource-dependent economy subject to commodity cycles");
          break;
        case 'SA':
        case 'TAS':
          rating = 3;
          factors.push("Smaller economy with limited growth drivers");
          break;
      }
    }

    // Property type economic sensitivity
    if (data.propertyType?.toLowerCase().includes('apartment')) {
      rating += 0.5;
      factors.push("Apartment markets sensitive to oversupply and economic conditions");
    } else if (data.propertyType?.toLowerCase().includes('house')) {
      rating -= 0.5;
      factors.push("Detached housing generally more resilient to economic cycles");
    }

    rating = Math.max(1, Math.min(5, Math.round(rating)));

    return {
      category: "Economy Impact",
      rating,
      summary: this.generateEconomicSummary(rating, factors),
      factors
    };
  }

  /**
   * Market Segment Risk Assessment
   */
  private static assessMarketSegment(data: PropertyData): RiskAssessment {
    let rating = 3; // Default moderate
    let factors: string[] = [];

    // Property configuration analysis
    if (data.bedrooms && data.bathrooms) {
      if (data.bedrooms >= 3 && data.bathrooms >= 2) {
        rating -= 0.5;
        factors.push("Family-suitable configuration with broad market appeal");
      } else if (data.bedrooms <= 1) {
        rating += 0.5;
        factors.push("Studio/1-bedroom properties have limited buyer pool");
      }
    }

    // Property size assessment
    if (data.buildingArea) {
      if (data.buildingArea < 50) {
        rating += 1;
        factors.push("Very small property size limits market appeal");
      } else if (data.buildingArea > 200) {
        rating -= 0.5;
        factors.push("Generous size appeals to family market");
      }
    }

    // Land size for houses
    if (data.propertyType?.toLowerCase().includes('house') && data.landArea) {
      if (data.landArea < 300) {
        rating += 0.5;
        factors.push("Small land size may limit family appeal");
      } else if (data.landArea > 800) {
        rating -= 0.5;
        factors.push("Large land holding provides future development potential");
      }
    }

    // Car accommodation
    if (data.carSpaces) {
      if (data.carSpaces === 0) {
        rating += 1;
        factors.push("No car accommodation significantly limits market appeal");
      } else if (data.carSpaces >= 2) {
        rating -= 0.5;
        factors.push("Multiple car spaces enhance marketability");
      }
    }

    rating = Math.max(1, Math.min(5, Math.round(rating)));

    return {
      category: "Market Segment",
      rating,
      summary: this.generateMarketSegmentSummary(rating, factors),
      factors
    };
  }

  // Helper methods for generating summaries

  private static generateLocationSummary(rating: number, factors: string[]): string {
    const riskLevel = this.getRiskLevel(rating);
    const baseText = `Location risk assessed as ${riskLevel}.`;
    
    if (factors.length > 0) {
      return `${baseText} Key factors: ${factors.join(', ')}.`;
    }
    return `${baseText} Standard suburban location with moderate amenity access.`;
  }

  private static generatePlanningSummary(rating: number, factors: string[]): string {
    const riskLevel = this.getRiskLevel(rating);
    const baseText = `Planning risk assessed as ${riskLevel}.`;
    
    if (factors.length > 0) {
      return `${baseText} Considerations: ${factors.join(', ')}.`;
    }
    return `${baseText} Standard residential zoning with minimal planning constraints.`;
  }

  private static generateEnvironmentalSummary(rating: number, factors: string[]): string {
    const riskLevel = this.getRiskLevel(rating);
    const baseText = `Environmental risk assessed as ${riskLevel}.`;
    
    if (factors.length > 0) {
      return `${baseText} Environmental factors: ${factors.join(', ')}.`;
    }
    return `${baseText} Standard environmental conditions with no significant hazards identified.`;
  }

  private static generateMarketActivitySummary(rating: number, factors: string[]): string {
    const riskLevel = this.getRiskLevel(rating);
    const baseText = `Market activity risk assessed as ${riskLevel}.`;
    
    if (factors.length > 0) {
      return `${baseText} Market indicators: ${factors.join(', ')}.`;
    }
    return `${baseText} Moderate market activity with standard conditions.`;
  }

  private static generateMarketDirectionSummary(rating: number, factors: string[]): string {
    const riskLevel = this.getRiskLevel(rating);
    const baseText = `Market direction risk assessed as ${riskLevel}.`;
    
    if (factors.length > 0) {
      return `${baseText} Direction factors: ${factors.join(', ')}.`;
    }
    return `${baseText} Neutral market direction with stable growth expectations.`;
  }

  private static generateEconomicSummary(rating: number, factors: string[]): string {
    const riskLevel = this.getRiskLevel(rating);
    const baseText = `Economic impact risk assessed as ${riskLevel}.`;
    
    if (factors.length > 0) {
      return `${baseText} Economic considerations: ${factors.join(', ')}.`;
    }
    return `${baseText} Standard economic exposure for the region.`;
  }

  private static generateMarketSegmentSummary(rating: number, factors: string[]): string {
    const riskLevel = this.getRiskLevel(rating);
    const baseText = `Market segment risk assessed as ${riskLevel}.`;
    
    if (factors.length > 0) {
      return `${baseText} Segment factors: ${factors.join(', ')}.`;
    }
    return `${baseText} Standard market positioning with moderate appeal.`;
  }

  private static getRiskLevel(rating: number): string {
    if (rating <= 1.5) return "very low";
    if (rating <= 2.5) return "low";
    if (rating <= 3.5) return "moderate";
    if (rating <= 4.5) return "high";
    return "very high";
  }

  private static calculateOverallRisk(assessments: RiskAssessment[]): string {
    const avgRating = assessments.reduce((sum, assessment) => sum + assessment.rating, 0) / assessments.length;
    return this.getRiskLevel(avgRating);
  }

  private static identifyKeyRiskFactors(assessments: RiskAssessment[]): string[] {
    return assessments
      .filter(assessment => assessment.rating >= 4)
      .map(assessment => `${assessment.category}: ${assessment.summary}`)
      .slice(0, 3); // Top 3 risk factors
  }

  private static determineMarketCyclePhase(data: PropertyData): string {
    // Simplified market cycle determination
    if (data.marketConditions?.priceMovement === 'increasing' && 
        data.marketConditions?.salesActivity === 'high') {
      return 'Growth';
    } else if (data.marketConditions?.priceMovement === 'declining') {
      return 'Decline';
    } else if (data.marketConditions?.salesActivity === 'high') {
      return 'Peak';
    } else if (data.marketConditions?.salesActivity === 'low') {
      return 'Recovery';
    }
    return 'Stable';
  }

  private static getPremiumPostcodes(state?: string): string[] {
    const premiumCodes: { [key: string]: string[] } = {
      'NSW': ['2000', '2001', '2007', '2008', '2021', '2027', '2030', '2031', '2061', '2062', '2063', '2064', '2065', '2066', '2067', '2068', '2069', '2070', '2071', '2072', '2073', '2074', '2075', '2076', '2077', '2079', '2080', '2081', '2082', '2083', '2084', '2085', '2086', '2087', '2088', '2089', '2090'],
      'VIC': ['3000', '3001', '3002', '3003', '3006', '3008', '3121', '3123', '3124', '3125', '3126', '3127', '3128', '3129', '3141', '3142', '3143', '3144', '3161', '3181', '3182', '3183', '3184', '3185', '3186', '3187', '3188', '3189'],
      'QLD': ['4000', '4005', '4006', '4007', '4008', '4009', '4059', '4064', '4065', '4066', '4067', '4068', '4069', '4070', '4101', '4102', '4103', '4104', '4105', '4120', '4121', '4122'],
      'WA': ['6000', '6001', '6003', '6004', '6005', '6006', '6007', '6008', '6009', '6010', '6011', '6012', '6014', '6015', '6016', '6017', '6018', '6019'],
      'SA': ['5000', '5001', '5006', '5007', '5008', '5009', '5010', '5011', '5034', '5035', '5061', '5062', '5063', '5064', '5065', '5066'],
      'TAS': ['7000', '7001', '7002', '7004', '7005', '7006', '7007', '7008', '7009', '7010', '7011', '7012']
    };
    
    return premiumCodes[state?.toUpperCase() || ''] || [];
  }
}