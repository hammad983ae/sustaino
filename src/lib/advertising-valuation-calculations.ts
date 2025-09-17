// Advertising Valuation Calculation Utilities

export interface SignageData {
  location: string;
  dailyTraffic: number;
  demographics: string;
  roadType: string;
  signageType: string;
  sides: number;
  width: number;
  height: number;
  isDigital: boolean;
  currentRent: number;
  operatingCosts: number;
  maintenanceCosts: number;
  insuranceCosts: number;
  publicBenefitFee: number;
  interestType: string;
  leaseTerm: number;
  planningPermitExpiry: string;
  renewalRisk: string;
  landlordScreentime: number;
  rentReviews: string;
  capRate: number;
}

export interface DigitalPlatformData {
  platformType: string;
  screenSize: number;
  resolution: string;
  location: string;
  dailyImpressions: number;
  uniqueViewers: number;
  demographics: string;
  avgViewTime: number;
  playoutDuration: number;
  contentSlots: number;
  operatingHours: number;
  networkConnectivity: string;
  adSlotPrice: number;
  occupancyRate: number;
  operatingCosts: number;
  maintenanceCosts: number;
  contentManagementFee: number;
  contractType: string;
  contractLength: number;
  revenueSplit: number;
  minimumSpend: number;
  clickThroughRate: number;
  conversionRate: number;
  brandRecall: number;
  competitorAnalysis: string;
}

export function calculateAdvertisingSignageValue(data: SignageData) {
  // Calculate total outgoings
  const totalOutgoings = data.operatingCosts + data.maintenanceCosts + data.insuranceCosts + data.publicBenefitFee;
  const netIncome = data.currentRent - totalOutgoings;
  
  // Apply demographic premium/discount
  let demographicPremium = 0;
  switch (data.demographics) {
    case 'high-income':
      demographicPremium = 15;
      break;
    case 'medium-income':
      demographicPremium = 5;
      break;
    case 'low-income':
      demographicPremium = -10;
      break;
    default:
      demographicPremium = 0;
  }
  
  // Apply digital premium
  let digitalPremium = 0;
  if (data.signageType === 'digital' || data.signageType === 'led') {
    digitalPremium = 25;
  } else if (data.isDigital) {
    digitalPremium = 20;
  }
  
  // Apply multi-side premium
  let multiSidePremium = 0;
  if (data.sides === 2) {
    multiSidePremium = 15;
  } else if (data.sides === 3) {
    multiSidePremium = 25;
  }
  
  // Location quality assessment
  let locationQuality = 'Average';
  let locationPremium = 0;
  
  if (data.roadType === 'freeway' || data.roadType === 'highway') {
    if (data.dailyTraffic > 100000) {
      locationQuality = 'Premium';
      locationPremium = 20;
    } else if (data.dailyTraffic > 50000) {
      locationQuality = 'Good';
      locationPremium = 10;
    }
  } else if (data.roadType === 'arterial' && data.dailyTraffic > 75000) {
    locationQuality = 'Good';
    locationPremium = 8;
  }
  
  // Risk assessment
  let riskRating = 'Medium';
  let riskDiscount = 0;
  
  if (data.renewalRisk === 'high') {
    riskRating = 'High';
    riskDiscount = 15;
  } else if (data.renewalRisk === 'low') {
    riskRating = 'Low';
    riskDiscount = -5; // Actually a premium for low risk
  }
  
  // Planning permit risk
  const permitExpiry = new Date(data.planningPermitExpiry);
  const today = new Date();
  const yearsToExpiry = (permitExpiry.getTime() - today.getTime()) / (365 * 24 * 60 * 60 * 1000);
  
  if (yearsToExpiry < 2) {
    riskDiscount += 10;
  } else if (yearsToExpiry < 5) {
    riskDiscount += 5;
  }
  
  // Calculate total premium/discount
  const totalPremium = demographicPremium + digitalPremium + multiSidePremium + locationPremium - riskDiscount;
  const adjustedRent = data.currentRent * (1 + totalPremium / 100);
  const adjustedNetIncome = adjustedRent - totalOutgoings;
  
  // Capitalisation method
  const capitalizedValue = adjustedNetIncome / (data.capRate / 100);
  
  // Market value (weighted average of methods)
  const marketValue = capitalizedValue;
  
  // Calculate metrics
  const signageArea = data.width * data.height;
  const pricePerSqm = signageArea > 0 ? marketValue / signageArea : 0;
  const yieldRate = data.currentRent > 0 ? (adjustedNetIncome / marketValue) * 100 : 0;
  
  // Risk factors
  const riskFactors = [];
  if (data.renewalRisk === 'high') {
    riskFactors.push('High planning permit renewal risk');
  }
  if (yearsToExpiry < 2) {
    riskFactors.push('Planning permit expires within 2 years');
  }
  if (data.leaseTerm < 5) {
    riskFactors.push('Short remaining lease term');
  }
  if (data.dailyTraffic < 25000) {
    riskFactors.push('Lower than optimal traffic volume');
  }
  if (totalOutgoings / data.currentRent > 0.4) {
    riskFactors.push('High outgoings ratio');
  }
  
  return {
    marketValue: Math.round(marketValue),
    capitalizedValue: Math.round(capitalizedValue),
    netIncome: Math.round(adjustedNetIncome),
    totalOutgoings: Math.round(totalOutgoings),
    yieldRate: yieldRate,
    pricePerSqm: Math.round(pricePerSqm),
    demographicPremium,
    digitalPremium,
    multiSidePremium,
    locationQuality,
    riskRating,
    riskFactors
  };
}

export function calculateDigitalPlatformValue(data: DigitalPlatformData) {
  // Calculate daily slots available
  const dailySlotsAvailable = (data.operatingHours * 60) / data.playoutDuration;
  
  // Calculate revenue
  const dailyRevenue = data.adSlotPrice * dailySlotsAvailable * (data.occupancyRate / 100);
  const annualRevenue = dailyRevenue * 365;
  
  // Calculate costs
  const monthlyOperatingCosts = data.operatingCosts + data.maintenanceCosts + data.contentManagementFee;
  const annualOperatingCosts = monthlyOperatingCosts * 12;
  const netAnnualRevenue = annualRevenue - annualOperatingCosts;
  
  // Platform type premium
  let platformPremium = 0;
  switch (data.platformType) {
    case 'outdoor-led':
      platformPremium = 20;
      break;
    case 'interactive-panel':
      platformPremium = 15;
      break;
    case 'transit-display':
      platformPremium = 10;
      break;
    case 'indoor-screen':
      platformPremium = 5;
      break;
    default:
      platformPremium = 0;
  }
  
  // Demographics premium
  let demographicsPremium = 0;
  switch (data.demographics) {
    case 'millennial-affluent':
      demographicsPremium = 25;
      break;
    case 'professionals-cbd':
      demographicsPremium = 20;
      break;
    case 'gen-z-urban':
      demographicsPremium = 15;
      break;
    case 'families-suburban':
      demographicsPremium = 10;
      break;
    case 'tourists-entertainment':
      demographicsPremium = 8;
      break;
    default:
      demographicsPremium = 0;
  }
  
  // Technology premium
  let techPremium = 0;
  if (data.resolution === '4k') {
    techPremium += 15;
  } else if (data.resolution === '1080p') {
    techPremium += 8;
  }
  
  if (data.networkConnectivity === 'fiber') {
    techPremium += 10;
  } else if (data.networkConnectivity === '5g') {
    techPremium += 8;
  }
  
  // Performance adjustments
  let performancePremium = 0;
  if (data.clickThroughRate > 0.2) {
    performancePremium += 10;
  }
  if (data.conversionRate > 3) {
    performancePremium += 15;
  }
  if (data.brandRecall > 40) {
    performancePremium += 10;
  }
  
  // Market position adjustment
  let marketPositionPremium = 0;
  let marketPosition = 'average';
  switch (data.competitorAnalysis) {
    case 'market-leader':
      marketPositionPremium = 20;
      marketPosition = 'leading';
      break;
    case 'strong-competitor':
      marketPositionPremium = 10;
      marketPosition = 'strong';
      break;
    case 'emerging-player':
      marketPositionPremium = -5;
      marketPosition = 'emerging';
      break;
    default:
      marketPositionPremium = 0;
      marketPosition = 'average';
  }
  
  // Calculate total adjustments
  const totalPremium = platformPremium + demographicsPremium + techPremium + performancePremium + marketPositionPremium;
  
  // Base valuation using revenue multiple
  const revenueMultiple = data.contractLength > 3 ? 4.5 : 3.5;
  const baseValue = netAnnualRevenue * revenueMultiple;
  
  // Apply adjustments
  const adjustedValue = baseValue * (1 + totalPremium / 100);
  
  // Calculate metrics
  const cpmRate = data.dailyImpressions > 0 ? (data.adSlotPrice / (data.dailyImpressions / 1000)) : 0;
  const roi = baseValue > 0 ? (netAnnualRevenue / baseValue) * 100 : 0;
  const paybackPeriod = netAnnualRevenue > 0 ? baseValue / netAnnualRevenue : 0;
  const revenuePerImpression = data.dailyImpressions > 0 ? dailyRevenue / data.dailyImpressions : 0;
  
  // Quality scores
  const audienceQuality = Math.min(100, 
    (data.dailyImpressions / 1000) * 0.2 + 
    (data.uniqueViewers / data.dailyImpressions) * 30 + 
    data.avgViewTime * 5 + 
    data.brandRecall * 0.8
  );
  
  const techScore = Math.min(100,
    (data.screenSize / 100) * 20 +
    (data.resolution === '4k' ? 25 : data.resolution === '1080p' ? 15 : 10) +
    (data.networkConnectivity === 'fiber' ? 25 : 15) +
    data.operatingHours * 1.5
  );
  
  const operationalEfficiency = Math.min(100, data.occupancyRate + (100 - (monthlyOperatingCosts / (dailyRevenue * 30)) * 100));
  
  // Growth potential
  const growthPotential = Math.max(-20, Math.min(50, 
    (data.clickThroughRate - 0.1) * 100 +
    (data.conversionRate - 2) * 5 +
    (data.brandRecall - 30) * 0.5
  ));
  
  // Revenue breakdown
  const baseRevenue = annualRevenue;
  const premiumAdjustments = baseRevenue * (Math.max(0, totalPremium) / 100);
  const riskAdjustments = baseRevenue * (Math.max(0, -totalPremium) / 100);
  const adjustedRevenue = baseRevenue + premiumAdjustments - riskAdjustments;
  
  // Recommendations
  const recommendations = [];
  
  if (data.occupancyRate < 80) {
    recommendations.push('Improve ad inventory sales to increase occupancy rate above 80%');
  }
  if (data.clickThroughRate < 0.15) {
    recommendations.push('Enhance content quality and targeting to improve click-through rates');
  }
  if (data.avgViewTime < 5) {
    recommendations.push('Optimize ad duration and content engagement to increase view time');
  }
  if (data.operatingCosts > data.adSlotPrice * 50) {
    recommendations.push('Review operational efficiency to reduce cost per ad slot');
  }
  if (data.contractLength < 3) {
    recommendations.push('Negotiate longer contract terms to improve valuation multiples');
  }
  if (data.resolution !== '4k') {
    recommendations.push('Consider upgrading to 4K resolution for premium positioning');
  }
  
  return {
    platformValue: Math.round(adjustedValue),
    annualRevenue: Math.round(annualRevenue),
    dailyRevenue: Math.round(dailyRevenue),
    roi: roi,
    paybackPeriod: paybackPeriod,
    cpmRate: cpmRate,
    revenuePerImpression: revenuePerImpression,
    audienceQuality: Math.round(audienceQuality),
    techScore: Math.round(techScore),
    marketPosition: marketPosition,
    growthPotential: Math.round(growthPotential),
    operationalEfficiency: Math.round(operationalEfficiency),
    baseRevenue: Math.round(baseRevenue),
    premiumAdjustments: Math.round(premiumAdjustments),
    riskAdjustments: Math.round(riskAdjustments),
    adjustedRevenue: Math.round(adjustedRevenue),
    recommendations
  };
}