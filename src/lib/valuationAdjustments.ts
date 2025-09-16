// Property Valuation Adjustment Calculation System
// Based on professional valuation methodologies

export interface PropertyAttributes {
  salePrice: number;
  saleDate: string;
  landArea: number;
  livingArea: number;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  yearBuilt: number;
  condition: 'poor' | 'fair' | 'good' | 'very_good' | 'excellent';
  location: 'inferior' | 'similar' | 'superior';
  marketConditions: 'declining' | 'stable' | 'rising';
  improvements: number; // improvement value
  zoning: string;
}

export interface SubjectProperty extends PropertyAttributes {
  // Subject property details
}

export interface AdjustmentWeights {
  landArea: number; // $ per sqm difference
  livingArea: number; // $ per sqm difference
  bedroom: number; // $ per bedroom difference
  bathroom: number; // $ per bathroom difference
  carSpace: number; // $ per car space difference
  age: number; // % per year difference
  condition: Record<string, number>; // % adjustment
  location: Record<string, number>; // % adjustment
  marketConditions: Record<string, number>; // % per month
  improvements: number; // $ per $ of improvement difference
}

// Professional valuation adjustment weights (Australian market)
export const DEFAULT_ADJUSTMENT_WEIGHTS: AdjustmentWeights = {
  landArea: 450, // $450 per sqm difference
  livingArea: 2200, // $2,200 per sqm difference
  bedroom: 15000, // $15,000 per bedroom difference
  bathroom: 12000, // $12,000 per bathroom difference
  carSpace: 18000, // $18,000 per car space difference
  age: 0.8, // 0.8% per year difference
  condition: {
    'poor': -15,
    'fair': -5,
    'good': 0,
    'very_good': 5,
    'excellent': 10
  },
  location: {
    'inferior': -10,
    'similar': 0,
    'superior': 8
  },
  marketConditions: {
    'declining': -0.5, // -0.5% per month
    'stable': 0,
    'rising': 0.3 // +0.3% per month
  },
  improvements: 0.7 // $0.70 per $1 of improvement difference
};

export interface AdjustmentResult {
  attribute: string;
  comparableValue: any;
  subjectValue: any;
  difference: number;
  percentageAdjustment: number;
  dollarAdjustment: number;
  adjustmentType: 'positive' | 'negative' | 'neutral';
  description: string;
}

export function calculatePropertyAdjustments(
  comparable: PropertyAttributes,
  subject: SubjectProperty,
  weights: AdjustmentWeights = DEFAULT_ADJUSTMENT_WEIGHTS
): AdjustmentResult[] {
  const adjustments: AdjustmentResult[] = [];
  const basePrice = comparable.salePrice;

  // Land Area Adjustment
  const landDifference = subject.landArea - comparable.landArea;
  const landDollarAdjustment = landDifference * weights.landArea;
  const landPercentageAdjustment = (landDollarAdjustment / basePrice) * 100;
  
  adjustments.push({
    attribute: 'Land Area',
    comparableValue: `${comparable.landArea} sqm`,
    subjectValue: `${subject.landArea} sqm`,
    difference: landDifference,
    percentageAdjustment: landPercentageAdjustment,
    dollarAdjustment: landDollarAdjustment,
    adjustmentType: landDollarAdjustment > 0 ? 'positive' : landDollarAdjustment < 0 ? 'negative' : 'neutral',
    description: landDifference > 0 ? 'Subject has larger land area' : landDifference < 0 ? 'Subject has smaller land area' : 'Similar land area'
  });

  // Living Area Adjustment
  const livingDifference = subject.livingArea - comparable.livingArea;
  const livingDollarAdjustment = livingDifference * weights.livingArea;
  const livingPercentageAdjustment = (livingDollarAdjustment / basePrice) * 100;
  
  adjustments.push({
    attribute: 'Living Area',
    comparableValue: `${comparable.livingArea} sqm`,
    subjectValue: `${subject.livingArea} sqm`,
    difference: livingDifference,
    percentageAdjustment: livingPercentageAdjustment,
    dollarAdjustment: livingDollarAdjustment,
    adjustmentType: livingDollarAdjustment > 0 ? 'positive' : livingDollarAdjustment < 0 ? 'negative' : 'neutral',
    description: livingDifference > 0 ? 'Subject has larger living area' : livingDifference < 0 ? 'Subject has smaller living area' : 'Similar living area'
  });

  // Bedroom Adjustment
  const bedroomDifference = subject.bedrooms - comparable.bedrooms;
  const bedroomDollarAdjustment = bedroomDifference * weights.bedroom;
  const bedroomPercentageAdjustment = (bedroomDollarAdjustment / basePrice) * 100;
  
  adjustments.push({
    attribute: 'Bedrooms',
    comparableValue: comparable.bedrooms.toString(),
    subjectValue: subject.bedrooms.toString(),
    difference: bedroomDifference,
    percentageAdjustment: bedroomPercentageAdjustment,
    dollarAdjustment: bedroomDollarAdjustment,
    adjustmentType: bedroomDollarAdjustment > 0 ? 'positive' : bedroomDollarAdjustment < 0 ? 'negative' : 'neutral',
    description: bedroomDifference > 0 ? 'Subject has more bedrooms' : bedroomDifference < 0 ? 'Subject has fewer bedrooms' : 'Same bedrooms'
  });

  // Bathroom Adjustment
  const bathroomDifference = subject.bathrooms - comparable.bathrooms;
  const bathroomDollarAdjustment = bathroomDifference * weights.bathroom;
  const bathroomPercentageAdjustment = (bathroomDollarAdjustment / basePrice) * 100;
  
  adjustments.push({
    attribute: 'Bathrooms',
    comparableValue: comparable.bathrooms.toString(),
    subjectValue: subject.bathrooms.toString(),
    difference: bathroomDifference,
    percentageAdjustment: bathroomPercentageAdjustment,
    dollarAdjustment: bathroomDollarAdjustment,
    adjustmentType: bathroomDollarAdjustment > 0 ? 'positive' : bathroomDollarAdjustment < 0 ? 'negative' : 'neutral',
    description: bathroomDifference > 0 ? 'Subject has more bathrooms' : bathroomDifference < 0 ? 'Subject has fewer bathrooms' : 'Same bathrooms'
  });

  // Car Space Adjustment
  const carSpaceDifference = subject.carSpaces - comparable.carSpaces;
  const carSpaceDollarAdjustment = carSpaceDifference * weights.carSpace;
  const carSpacePercentageAdjustment = (carSpaceDollarAdjustment / basePrice) * 100;
  
  adjustments.push({
    attribute: 'Car Spaces',
    comparableValue: comparable.carSpaces.toString(),
    subjectValue: subject.carSpaces.toString(),
    difference: carSpaceDifference,
    percentageAdjustment: carSpacePercentageAdjustment,
    dollarAdjustment: carSpaceDollarAdjustment,
    adjustmentType: carSpaceDollarAdjustment > 0 ? 'positive' : carSpaceDollarAdjustment < 0 ? 'negative' : 'neutral',
    description: carSpaceDifference > 0 ? 'Subject has more parking' : carSpaceDifference < 0 ? 'Subject has less parking' : 'Same parking'
  });

  // Age/Year Built Adjustment
  const ageDifference = comparable.yearBuilt - subject.yearBuilt; // Older is negative
  const agePercentageAdjustment = ageDifference * weights.age;
  const ageDollarAdjustment = (agePercentageAdjustment / 100) * basePrice;
  
  adjustments.push({
    attribute: 'Year Built',
    comparableValue: comparable.yearBuilt.toString(),
    subjectValue: subject.yearBuilt.toString(),
    difference: -ageDifference, // Flip sign for intuitive display
    percentageAdjustment: agePercentageAdjustment,
    dollarAdjustment: ageDollarAdjustment,
    adjustmentType: ageDollarAdjustment > 0 ? 'positive' : ageDollarAdjustment < 0 ? 'negative' : 'neutral',
    description: ageDifference > 0 ? 'Subject is newer' : ageDifference < 0 ? 'Subject is older' : 'Same age'
  });

  // Condition Adjustment
  const subjectConditionAdj = weights.condition[subject.condition] || 0;
  const comparableConditionAdj = weights.condition[comparable.condition] || 0;
  const conditionPercentageAdjustment = subjectConditionAdj - comparableConditionAdj;
  const conditionDollarAdjustment = (conditionPercentageAdjustment / 100) * basePrice;
  
  adjustments.push({
    attribute: 'Condition',
    comparableValue: comparable.condition,
    subjectValue: subject.condition,
    difference: conditionPercentageAdjustment,
    percentageAdjustment: conditionPercentageAdjustment,
    dollarAdjustment: conditionDollarAdjustment,
    adjustmentType: conditionDollarAdjustment > 0 ? 'positive' : conditionDollarAdjustment < 0 ? 'negative' : 'neutral',
    description: conditionPercentageAdjustment > 0 ? 'Subject in better condition' : conditionPercentageAdjustment < 0 ? 'Subject in worse condition' : 'Similar condition'
  });

  // Location Adjustment
  const subjectLocationAdj = weights.location[subject.location] || 0;
  const comparableLocationAdj = weights.location[comparable.location] || 0;
  const locationPercentageAdjustment = subjectLocationAdj - comparableLocationAdj;
  const locationDollarAdjustment = (locationPercentageAdjustment / 100) * basePrice;
  
  adjustments.push({
    attribute: 'Location',
    comparableValue: comparable.location,
    subjectValue: subject.location,
    difference: locationPercentageAdjustment,
    percentageAdjustment: locationPercentageAdjustment,
    dollarAdjustment: locationDollarAdjustment,
    adjustmentType: locationDollarAdjustment > 0 ? 'positive' : locationDollarAdjustment < 0 ? 'negative' : 'neutral',
    description: locationPercentageAdjustment > 0 ? 'Subject has superior location' : locationPercentageAdjustment < 0 ? 'Subject has inferior location' : 'Similar location'
  });

  // Market Conditions (Time Adjustment)
  const saleDate = new Date(comparable.saleDate);
  const currentDate = new Date();
  const monthsDifference = (currentDate.getFullYear() - saleDate.getFullYear()) * 12 + (currentDate.getMonth() - saleDate.getMonth());
  const marketAdjustmentRate = weights.marketConditions[comparable.marketConditions] || 0;
  const marketPercentageAdjustment = monthsDifference * marketAdjustmentRate;
  const marketDollarAdjustment = (marketPercentageAdjustment / 100) * basePrice;
  
  adjustments.push({
    attribute: 'Market Conditions',
    comparableValue: `${comparable.saleDate} (${monthsDifference} months ago)`,
    subjectValue: 'Current',
    difference: monthsDifference,
    percentageAdjustment: marketPercentageAdjustment,
    dollarAdjustment: marketDollarAdjustment,
    adjustmentType: marketDollarAdjustment > 0 ? 'positive' : marketDollarAdjustment < 0 ? 'negative' : 'neutral',
    description: `Market ${comparable.marketConditions} conditions, ${monthsDifference} months adjustment`
  });

  return adjustments;
}

export function calculateTotalAdjustment(adjustments: AdjustmentResult[]) {
  const totalPercentageAdjustment = adjustments.reduce((sum, adj) => sum + adj.percentageAdjustment, 0);
  const totalDollarAdjustment = adjustments.reduce((sum, adj) => sum + adj.dollarAdjustment, 0);
  
  return {
    totalPercentageAdjustment,
    totalDollarAdjustment
  };
}

export function getAdjustedValue(originalPrice: number, adjustments: AdjustmentResult[]) {
  const { totalDollarAdjustment } = calculateTotalAdjustment(adjustments);
  return originalPrice + totalDollarAdjustment;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(1)}%`;
}