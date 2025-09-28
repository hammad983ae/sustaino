import { DemoProperty } from '@/components/DemoPropertySelector';

interface PropertyData {
  propertyAddress: string;
  realPropertyDescription: string;
  siteArea: string;
  siteDimensions: string;
  zoning: string;
  currentUse: string;
  localGovernmentArea: string;
  mainDwelling: string;
  builtAbout: string;
  livingArea: number;
  marketValue: number;
  landValue: number;
  improvementValue: number;
  rentalAssessment: number;
  marketability: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  environmentalIssues: 'Yes' | 'No';
  essentialRepairs: 'Yes' | 'No';
  estimatedCost: number;
}

interface RiskRatings {
  location: number;
  land: number;
  environmental: number;
  improvements: number;
  marketDirection: number;
  marketActivity: number;
  localEconomy: number;
  marketSegment: number;
}

interface VRAAssessment {
  higherRiskProperty: boolean;
  adverseMarketability: boolean;
  incompleteConstruction: boolean;
  criticalIssues: boolean;
  esgFactors: string;
}

interface SalesEvidence {
  address: string;
  saleDate: string;
  price: number;
  briefComments: string;
  livingArea: number;
  landArea: number;
  bedrooms: number;
  bathrooms: number;
  locationAdjustment: number;
  sizeAdjustment: number;
  conditionAdjustment: number;
  ageAdjustment: number;
  timeAdjustment: number;
  adjustedPrice: number;
  pricePerSqm: number;
  weightingFactor: number;
  comparisonToSubject: 'superior' | 'similar' | 'inferior';
  overallAdjustment: number;
  reliability: 'high' | 'medium' | 'low';
}

export function generateMockPropertyData(demoProperty: DemoProperty): PropertyData {
  const baseData: Record<string, PropertyData> = {
    'mildura-highway': {
      propertyAddress: '24 Highway Drive, Mildura VIC 3500',
      realPropertyDescription: 'Lot 9 PS444723 - Property affected by proximity to main highway (15m) and high tension power lines (25m). Property currently uninhabitable due to missing kitchen facilities requiring $10,000 repairs.',
      siteArea: '680',
      siteDimensions: '22m x 30m',
      zoning: 'Residential 1',
      currentUse: 'Single Dwelling (Currently Vacant - Uninhabitable)',
      localGovernmentArea: 'Mildura Council',
      mainDwelling: '3 Bedroom, 1 Bathroom House (Missing Kitchen)',
      builtAbout: '1985',
      livingArea: 120,
      marketValue: 180000,
      landValue: 135000,
      improvementValue: 45000,
      rentalAssessment: 0,
      marketability: 'Poor',
      environmentalIssues: 'Yes',
      essentialRepairs: 'Yes',
      estimatedCost: 10000
    },
    'melbourne-cbd': {
      propertyAddress: '15 Collins Street, Melbourne VIC 3000',
      realPropertyDescription: 'Lot 15 SP123456 - Premium CBD apartment with excellent amenities and harbour glimpses. Well-maintained building with modern facilities.',
      siteArea: '85',
      siteDimensions: '12m x 7m (apartment)',
      zoning: 'Commercial 1',
      currentUse: 'Residential Apartment',
      localGovernmentArea: 'Melbourne City Council',
      mainDwelling: '2 Bedroom, 2 Bathroom Premium Apartment',
      builtAbout: '2015',
      livingArea: 85,
      marketValue: 850000,
      landValue: 0,
      improvementValue: 850000,
      rentalAssessment: 650,
      marketability: 'Excellent',
      environmentalIssues: 'No',
      essentialRepairs: 'No',
      estimatedCost: 0
    },
    'sydney-harbour': {
      propertyAddress: '88 Harbour View Drive, Sydney NSW 2000',
      realPropertyDescription: 'Lot 88 DP987654 - Waterfront property with spectacular harbour views. Minor cosmetic repairs required to maximize potential.',
      siteArea: '450',
      siteDimensions: '18m x 25m',
      zoning: 'Residential 2',
      currentUse: 'Single Dwelling with Harbour Views',
      localGovernmentArea: 'Sydney City Council',
      mainDwelling: '4 Bedroom, 3 Bathroom Harbour View House',
      builtAbout: '1995',
      livingArea: 280,
      marketValue: 1200000,
      landValue: 900000,
      improvementValue: 300000,
      rentalAssessment: 800,
      marketability: 'Good',
      environmentalIssues: 'No',
      essentialRepairs: 'Yes',
      estimatedCost: 5000
    },
    'brisbane-flood': {
      propertyAddress: '42 River Road, Brisbane QLD 4000',
      realPropertyDescription: 'Lot 42 RP111222 - Property located in flood-prone area with environmental and insurance considerations. Recent flood mapping updates affect valuation.',
      siteArea: '600',
      siteDimensions: '20m x 30m',
      zoning: 'Low Density Residential',
      currentUse: 'Single Dwelling (Flood Risk Area)',
      localGovernmentArea: 'Brisbane City Council',
      mainDwelling: '3 Bedroom, 2 Bathroom House (Flood Risk)',
      builtAbout: '1980',
      livingArea: 150,
      marketValue: 450000,
      landValue: 300000,
      improvementValue: 150000,
      rentalAssessment: 420,
      marketability: 'Fair',
      environmentalIssues: 'Yes',
      essentialRepairs: 'No',
      estimatedCost: 0
    },
    'perth-new-construction': {
      propertyAddress: '156 Innovation Boulevard, Perth WA 6000',
      realPropertyDescription: 'Lot 156 SP555666 - New construction in developing area. Some facilities incomplete but modern design and good growth potential.',
      siteArea: '400',
      siteDimensions: '16m x 25m',
      zoning: 'Residential 1',
      currentUse: 'Single Dwelling (New Construction)',
      localGovernmentArea: 'Perth City Council',
      mainDwelling: '4 Bedroom, 2 Bathroom Modern House',
      builtAbout: '2023',
      livingArea: 200,
      marketValue: 650000,
      landValue: 350000,
      improvementValue: 300000,
      rentalAssessment: 500,
      marketability: 'Good',
      environmentalIssues: 'No',
      essentialRepairs: 'Yes',
      estimatedCost: 3000
    },
    'adelaide-heritage': {
      propertyAddress: '33 Heritage Square, Adelaide SA 5000',
      realPropertyDescription: 'Lot 33 CR777888 - Heritage-listed Victorian terrace with character features. Renovation restrictions apply but excellent CBD location.',
      siteArea: '250',
      siteDimensions: '10m x 25m',
      zoning: 'City Living',
      currentUse: 'Heritage Residential',
      localGovernmentArea: 'Adelaide City Council',
      mainDwelling: '3 Bedroom, 1 Bathroom Heritage Terrace',
      builtAbout: '1890',
      livingArea: 180,
      marketValue: 720000,
      landValue: 500000,
      improvementValue: 220000,
      rentalAssessment: 580,
      marketability: 'Good',
      environmentalIssues: 'No',
      essentialRepairs: 'No',
      estimatedCost: 0
    }
  };

  return baseData[demoProperty.id] || baseData['mildura-highway'];
}

export function generateMockRiskRatings(demoProperty: DemoProperty): RiskRatings {
  const riskData: Record<string, RiskRatings> = {
    'mildura-highway': {
      location: 4,      // Main road + power lines = high risk
      land: 2,          // Standard residential land
      environmental: 4, // Power lines + traffic pollution = high risk
      improvements: 4,  // Missing kitchen + $10k repairs = high risk
      marketDirection: 2, // Stable market
      marketActivity: 3,  // Affected by location issues = medium risk
      localEconomy: 2,    // Regional economy
      marketSegment: 3    // Marketability concerns = medium risk
    },
    'melbourne-cbd': {
      location: 1,      // Premium CBD location = low risk
      land: 1,          // No land issues = low risk
      environmental: 1, // No environmental concerns = low risk
      improvements: 1,  // Modern, well-maintained = low risk
      marketDirection: 2, // Strong but stable market
      marketActivity: 1,  // High activity, good demand = low risk
      localEconomy: 1,    // Strong economy = low risk
      marketSegment: 1    // Premium segment = low risk
    },
    'sydney-harbour': {
      location: 1,      // Harbour views = premium location
      land: 2,          // Good land, no major issues
      environmental: 1, // No environmental concerns
      improvements: 3,  // Minor repairs needed = medium risk
      marketDirection: 2, // Stable premium market
      marketActivity: 2,  // Good activity level
      localEconomy: 1,    // Strong economy
      marketSegment: 2    // Premium segment, stable
    },
    'brisbane-flood': {
      location: 3,      // Flood-prone area = medium-high risk
      land: 3,          // Flood risk affects land value
      environmental: 4, // Flood risk = high environmental risk
      improvements: 2,  // Standard improvements
      marketDirection: 3, // Market uncertainty due to floods
      marketActivity: 3,  // Reduced activity due to risk
      localEconomy: 2,    // Regional impacts
      marketSegment: 3    // Affected segment
    },
    'perth-new-construction': {
      location: 2,      // Developing area = medium risk
      land: 1,          // New development, good land
      environmental: 1, // No environmental issues
      improvements: 3,  // Incomplete facilities = medium risk
      marketDirection: 2, // Growth area, positive direction
      marketActivity: 2,  // Moderate activity
      localEconomy: 2,    // Growing local economy
      marketSegment: 2    // Emerging market segment
    },
    'adelaide-heritage': {
      location: 1,      // CBD location = low risk
      land: 2,          // Heritage restrictions = slight risk
      environmental: 1, // No environmental concerns
      improvements: 2,  // Heritage restrictions on improvements
      marketDirection: 2, // Stable heritage market
      marketActivity: 2,  // Steady activity
      localEconomy: 2,    // Stable local economy
      marketSegment: 2    // Heritage market segment
    }
  };

  return riskData[demoProperty.id] || riskData['mildura-highway'];
}

export function generateMockVRAAssessment(demoProperty: DemoProperty): VRAAssessment {
  const vraData: Record<string, VRAAssessment> = {
    'mildura-highway': {
      higherRiskProperty: true,
      adverseMarketability: true,
      incompleteConstruction: false,
      criticalIssues: true,
      esgFactors: 'Property presents significant environmental concerns due to proximity to high tension power lines (25m) and main highway traffic (15m). Location factors negatively impact sustainability metrics including air quality, noise pollution, and electromagnetic field exposure. Building improvements require substantial investment ($10,000) to meet contemporary living standards, particularly kitchen facilities.'
    },
    'melbourne-cbd': {
      higherRiskProperty: false,
      adverseMarketability: false,
      incompleteConstruction: false,
      criticalIssues: false,
      esgFactors: 'Property demonstrates excellent ESG compliance with modern building standards, energy-efficient systems, and sustainable urban development practices. Premium CBD location provides access to public transport, reducing carbon footprint.'
    },
    'sydney-harbour': {
      higherRiskProperty: false,
      adverseMarketability: false,
      incompleteConstruction: false,
      criticalIssues: false,
      esgFactors: 'Waterfront property with good environmental credentials. Minor repairs required do not impact overall sustainability. Excellent natural lighting and ventilation reduce energy consumption.'
    },
    'brisbane-flood': {
      higherRiskProperty: true,
      adverseMarketability: true,
      incompleteConstruction: false,
      criticalIssues: true,
      esgFactors: 'Property located in flood-prone area presents significant environmental risks. Climate change impacts may increase flood frequency and severity. Insurance and financing challenges affect marketability and sustainability metrics.'
    },
    'perth-new-construction': {
      higherRiskProperty: false,
      adverseMarketability: false,
      incompleteConstruction: true,
      criticalIssues: false,
      esgFactors: 'New construction incorporates modern energy-efficient design and sustainable building practices. Minor incomplete facilities do not significantly impact environmental performance. Growth area development supports sustainable urban expansion.'
    },
    'adelaide-heritage': {
      higherRiskProperty: false,
      adverseMarketability: false,
      incompleteConstruction: false,
      criticalIssues: false,
      esgFactors: 'Heritage property maintains historical character while meeting contemporary environmental standards where possible. Heritage restrictions limit some sustainability improvements but preserve cultural heritage value.'
    }
  };

  return vraData[demoProperty.id] || vraData['mildura-highway'];
}

export function generateMockSalesEvidence(demoProperty: DemoProperty): SalesEvidence[] {
  const salesData: Record<string, SalesEvidence[]> = {
    'mildura-highway': [
      {
        address: '18 Highway Drive, Mildura VIC 3500',
        saleDate: '2024-08-15',
        price: 165000,
        briefComments: 'Similar location but better condition',
        livingArea: 110,
        landArea: 650,
        bedrooms: 3,
        bathrooms: 1,
        locationAdjustment: 0,
        sizeAdjustment: 5,
        conditionAdjustment: -15,
        ageAdjustment: 0,
        timeAdjustment: 2,
        adjustedPrice: 153300,
        pricePerSqm: 1394,
        weightingFactor: 0.8,
        comparisonToSubject: 'superior',
        overallAdjustment: -8,
        reliability: 'high'
      },
      {
        address: '31 Power Line Road, Mildura VIC 3500',
        saleDate: '2024-07-20',
        price: 195000,
        briefComments: 'Power line proximity but has kitchen',
        livingArea: 130,
        landArea: 700,
        bedrooms: 3,
        bathrooms: 2,
        locationAdjustment: 5,
        sizeAdjustment: -8,
        conditionAdjustment: -20,
        ageAdjustment: 0,
        timeAdjustment: 3,
        adjustedPrice: 156000,
        pricePerSqm: 1200,
        weightingFactor: 0.7,
        comparisonToSubject: 'superior',
        overallAdjustment: -20,
        reliability: 'medium'
      }
    ],
    'melbourne-cbd': [
      {
        address: '12 Collins Street, Melbourne VIC 3000',
        saleDate: '2024-09-01',
        price: 820000,
        briefComments: 'Similar building, slightly smaller',
        livingArea: 80,
        landArea: 0,
        bedrooms: 2,
        bathrooms: 2,
        locationAdjustment: 0,
        sizeAdjustment: 5,
        conditionAdjustment: 0,
        ageAdjustment: 0,
        timeAdjustment: 1,
        adjustedPrice: 868400,
        pricePerSqm: 10855,
        weightingFactor: 0.9,
        comparisonToSubject: 'similar',
        overallAdjustment: 6,
        reliability: 'high'
      },
      {
        address: '25 Queen Street, Melbourne VIC 3000',
        saleDate: '2024-08-10',
        price: 875000,
        briefComments: 'Similar amenities, different floor',
        livingArea: 90,
        landArea: 0,
        bedrooms: 2,
        bathrooms: 2,
        locationAdjustment: -2,
        sizeAdjustment: -5,
        conditionAdjustment: 0,
        ageAdjustment: 0,
        timeAdjustment: 2,
        adjustedPrice: 832500,
        pricePerSqm: 9250,
        weightingFactor: 0.85,
        comparisonToSubject: 'similar',
        overallAdjustment: -5,
        reliability: 'high'
      },
      {
        address: '8 Flinders Lane, Melbourne VIC 3000',
        saleDate: '2024-07-25',
        price: 890000,
        briefComments: 'Premium building with harbour glimpse',
        livingArea: 85,
        landArea: 0,
        bedrooms: 2,
        bathrooms: 2,
        locationAdjustment: -3,
        sizeAdjustment: 0,
        conditionAdjustment: 2,
        ageAdjustment: 0,
        timeAdjustment: 3,
        adjustedPrice: 908200,
        pricePerSqm: 10685,
        weightingFactor: 0.8,
        comparisonToSubject: 'superior',
        overallAdjustment: 2,
        reliability: 'high'
      },
      {
        address: '45 Little Collins Street, Melbourne VIC 3000',
        saleDate: '2024-06-15',
        price: 795000,
        briefComments: 'Lower floor, similar amenities',
        livingArea: 88,
        landArea: 0,
        bedrooms: 2,
        bathrooms: 2,
        locationAdjustment: 2,
        sizeAdjustment: -3,
        conditionAdjustment: -1,
        ageAdjustment: 0,
        timeAdjustment: 4,
        adjustedPrice: 825180,
        pricePerSqm: 9377,
        weightingFactor: 0.75,
        comparisonToSubject: 'similar',
        overallAdjustment: 2,
        reliability: 'medium'
      }
    ]
  };

  // Generate default sales for other properties
  const defaultSales = (basePrice: number, area: number): SalesEvidence[] => [
    {
      address: 'Comparable Sale 1',
      saleDate: '2024-08-15',
      price: Math.round(basePrice * 0.95),
      briefComments: 'Similar property in area',
      livingArea: area,
      landArea: 500,
      bedrooms: 3,
      bathrooms: 2,
      locationAdjustment: 0,
      sizeAdjustment: 0,
      conditionAdjustment: 5,
      ageAdjustment: 0,
      timeAdjustment: 2,
      adjustedPrice: Math.round(basePrice * 0.97),
      pricePerSqm: Math.round(basePrice * 0.97 / area),
      weightingFactor: 0.85,
      comparisonToSubject: 'similar',
      overallAdjustment: 2,
      reliability: 'high'
    },
    {
      address: 'Comparable Sale 2',
      saleDate: '2024-07-20',
      price: Math.round(basePrice * 1.05),
      briefComments: 'Slightly superior condition',
      livingArea: Math.round(area * 1.1),
      landArea: 550,
      bedrooms: 3,
      bathrooms: 2,
      locationAdjustment: -2,
      sizeAdjustment: -8,
      conditionAdjustment: -5,
      ageAdjustment: 0,
      timeAdjustment: 3,
      adjustedPrice: Math.round(basePrice * 1.02),
      pricePerSqm: Math.round(basePrice * 1.02 / (area * 1.1)),
      weightingFactor: 0.8,
      comparisonToSubject: 'superior',
      overallAdjustment: -8,
      reliability: 'high'
    },
    {
      address: 'Comparable Sale 3',
      saleDate: '2024-09-01',
      price: Math.round(basePrice * 0.98),
      briefComments: 'Recent sale, similar features',
      livingArea: Math.round(area * 0.95),
      landArea: 480,
      bedrooms: 3,
      bathrooms: 1,
      locationAdjustment: 1,
      sizeAdjustment: 3,
      conditionAdjustment: 0,
      ageAdjustment: 0,
      timeAdjustment: 1,
      adjustedPrice: Math.round(basePrice * 1.01),
      pricePerSqm: Math.round(basePrice * 1.01 / (area * 0.95)),
      weightingFactor: 0.9,
      comparisonToSubject: 'similar',
      overallAdjustment: 3,
      reliability: 'high'
    },
    {
      address: 'Comparable Sale 4',
      saleDate: '2024-06-10',
      price: Math.round(basePrice * 0.92),
      briefComments: 'Older sale, similar location',
      livingArea: area,
      landArea: 520,
      bedrooms: 3,
      bathrooms: 2,
      locationAdjustment: 0,
      sizeAdjustment: 0,
      conditionAdjustment: 8,
      ageAdjustment: 0,
      timeAdjustment: 5,
      adjustedPrice: Math.round(basePrice * 1.00),
      pricePerSqm: Math.round(basePrice / area),
      weightingFactor: 0.7,
      comparisonToSubject: 'similar',
      overallAdjustment: 8,
      reliability: 'medium'
    }
  ];

  if (salesData[demoProperty.id]) {
    return salesData[demoProperty.id];
  }

  // Generate default sales evidence for other properties
  return defaultSales(demoProperty.marketValue, 150);
}

export function generateMockGeneralComments(
  demoProperty: DemoProperty,
  propertyData: PropertyData,
  riskRatings: RiskRatings,
  vraAssessment: VRAAssessment,
  salesEvidence: SalesEvidence[]
): string {
  const highRiskCount = Object.values(riskRatings).filter(rating => rating >= 4).length;
  const vraAlertCount = [
    vraAssessment.higherRiskProperty,
    vraAssessment.adverseMarketability,
    vraAssessment.incompleteConstruction,
    vraAssessment.criticalIssues
  ].filter(Boolean).length;

  const scenarios: Record<string, string> = {
    'mildura-highway': `PROPERTY SUMMARY: This 3-bedroom, 1-bathroom house at ${propertyData.propertyAddress} presents a challenging valuation scenario. Built in 1985 with 120m² of living area on a 680m² site, the property is currently uninhabitable due to missing kitchen facilities.

RISK ASSESSMENT: ${highRiskCount} high risk factors identified including location proximity to main highway (15m) and high tension power lines (25m), environmental concerns from traffic and electromagnetic exposure, and significant improvement deficiencies. The property requires essential repairs estimated at $${propertyData.estimatedCost.toLocaleString()} to restore habitability.

VRA ALERTS: ${vraAlertCount} Valuation Risk Alerts triggered. Higher risk property classification due to multiple risk factors ≥4. Adverse marketability due to location and condition issues. Critical environmental issues present. ESG factors significantly impacted by infrastructure proximity and repair requirements.

SALES EVIDENCE: Analysis of ${salesEvidence.length} comparable sales in the local market shows adjusted price range of $${Math.min(...salesEvidence.map(s => s.adjustedPrice)).toLocaleString()} to $${Math.max(...salesEvidence.map(s => s.adjustedPrice)).toLocaleString()}. Properties with similar location challenges show significant value adjustments.

RECOMMENDATIONS: Immediate kitchen installation required for habitability. Consider location-specific marketing strategies due to infrastructure proximity. Value assessment reflects current condition and location constraints. Property unsuitable for rental income until essential repairs completed.

CRITICAL NOTE: Multiple high-risk factors are present and have been appropriately weighted in the valuation assessment. The property presents investment challenges requiring careful consideration.`,

    'melbourne-cbd': `PROPERTY SUMMARY: This premium 2-bedroom, 2-bathroom apartment at ${propertyData.propertyAddress} represents excellent CBD positioning. Built in 2015 with 85m² of living area, the property offers modern amenities and harbour glimpses in a well-maintained building.

RISK ASSESSMENT: ${highRiskCount} high risk factors identified - indicating a low-risk investment profile. Location benefits from premium CBD positioning with excellent transport links and amenities. Property condition is excellent with no essential repairs required.

VRA ALERTS: ${vraAlertCount} Valuation Risk Alerts triggered - confirming low-risk classification. No higher risk property issues, adverse marketability concerns, incomplete construction, or critical issues identified. ESG factors demonstrate strong sustainability credentials.

SALES EVIDENCE: Analysis of ${salesEvidence.length} recent comparable sales shows strong market support with adjusted prices ranging $${Math.min(...salesEvidence.map(s => s.adjustedPrice)).toLocaleString()} to $${Math.max(...salesEvidence.map(s => s.adjustedPrice)).toLocaleString()}. Market demonstrates excellent activity levels and price stability.

RECOMMENDATIONS: Property suitable for immediate occupation or rental. Strong rental demand supports $${propertyData.rentalAssessment}/week assessment. Excellent marketability with quick sale potential expected.

VALUATION CONFIDENCE: High confidence valuation supported by strong comparable evidence and low risk profile. No significant issues identified affecting market value.`,

    'brisbane-flood': `PROPERTY SUMMARY: This 3-bedroom, 2-bathroom house at ${propertyData.propertyAddress} is located in a flood-prone area requiring specialized assessment. Built in 1980 with 150m² of living area on a 600m² site, the property presents environmental risk considerations.

RISK ASSESSMENT: ${highRiskCount} high risk factors identified primarily related to flood risk and environmental concerns. Location factors significantly impact marketability and insurance availability. Property structure appears sound but flood mitigation should be considered.

VRA ALERTS: ${vraAlertCount} Valuation Risk Alerts triggered. Higher risk property due to flood exposure. Adverse marketability from environmental risks and insurance challenges. Critical issues related to climate change impacts and flood frequency.

SALES EVIDENCE: Analysis of ${salesEvidence.length} comparable sales shows market adjustment for flood risk with adjusted prices ranging $${Math.min(...salesEvidence.map(s => s.adjustedPrice)).toLocaleString()} to $${Math.max(...salesEvidence.map(s => s.adjustedPrice)).toLocaleString()}. Flood-affected properties show value discounts.

RECOMMENDATIONS: Flood insurance essential. Consider flood mitigation measures. Marketing should address risk factors transparently. Rental income achievable but may be affected by insurance requirements.

RISK DISCLOSURE: Significant environmental risks are present including flood exposure. These factors have been appropriately considered in the valuation and impact both marketability and value.`
  };

  // Default scenario for other properties
  const defaultScenario = `PROPERTY SUMMARY: This property at ${propertyData.propertyAddress} presents a ${demoProperty.riskLevel}-risk valuation scenario. Built in ${propertyData.builtAbout} with ${propertyData.livingArea}m² of living area, the property demonstrates ${propertyData.marketability.toLowerCase()} marketability characteristics.

RISK ASSESSMENT: ${highRiskCount} high risk factors identified. Property condition and location factors have been assessed according to PropertyPRO risk rating standards. ${propertyData.essentialRepairs === 'Yes' ? `Essential repairs estimated at $${propertyData.estimatedCost.toLocaleString()} required.` : 'No essential repairs identified.'}

VRA ALERTS: ${vraAlertCount} Valuation Risk Alerts triggered. ${vraAssessment.higherRiskProperty ? 'Higher risk property classification applies.' : 'Standard risk classification.'} ${vraAssessment.adverseMarketability ? 'Adverse marketability factors identified.' : 'No adverse marketability concerns.'}

SALES EVIDENCE: Analysis of ${salesEvidence.length} comparable sales demonstrates market support with adjusted prices ranging $${Math.min(...salesEvidence.map(s => s.adjustedPrice)).toLocaleString()} to $${Math.max(...salesEvidence.map(s => s.adjustedPrice)).toLocaleString()}.

RECOMMENDATIONS: Property suitable for ${propertyData.rentalAssessment > 0 ? `rental at $${propertyData.rentalAssessment}/week` : 'owner occupation'}. Market positioning aligns with ${propertyData.marketability.toLowerCase()} marketability assessment.

VALUATION CONFIDENCE: ${highRiskCount === 0 ? 'High confidence' : highRiskCount <= 2 ? 'Moderate confidence' : 'Qualified confidence'} valuation ${highRiskCount > 0 ? 'with appropriate risk considerations noted' : 'supported by comprehensive market analysis'}.`;

  return scenarios[demoProperty.id] || defaultScenario;
}