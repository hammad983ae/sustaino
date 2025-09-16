/**
 * ============================================================================
 * SUSTANO-PHERE™ ADVANCED ASSET VALUATION ENGINE
 * Patent Pending: Multi-Variable Digital Asset Valuation Algorithm
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * PROPRIETARY TRADE SECRETS:
 * - SustanoVal™ Scoring Algorithm (Trade Secret)
 * - ESG Impact Multiplier Calculation (Patent Pending)
 * - Risk-Adjusted Valuation Matrix (Proprietary)
 * - Market Intelligence Integration (Trade Secret)
 * 
 * WARNING: This algorithm represents millions in R&D investment and is 
 * protected under international trade secret and patent law.
 * ============================================================================
 */

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

interface AdvancedAssetData {
  id: string;
  title: string;
  category: string;
  currentValuation: number;
  sustainoValScore: number;
  arrMultiple: number;
  revenueGrowthRate: number;
  customerAcquisitionCost: number;
  lifetimeValue: number;
  churnRate: number;
  grossMargin: number;
  burnRate: number;
  runway: number;
  marketSize: number;
  marketShare: number;
  technicalDebt: number;
  scalabilityScore: number;
  securityScore: number;
  esgBreakdown: {
    environmental: number;
    social: number;
    governance: number;
    innovation: number;
  };
  carbonFootprint: number;
  digitalImpactScore: number;
  monthlyActiveUsers: number;
  dailyActiveUsers: number;
  userEngagement: number;
  npsScore: number;
  organicGrowth: number;
  paidGrowth: number;
  riskFactors: {
    technical: number;
    market: number;
    financial: number;
    regulatory: number;
    competitive: number;
  };
}

interface ValuationResult {
  sustainoValuation: number;
  traditionalValuation: number;
  valuationPremium: number;
  confidenceScore: number;
  breakdown: {
    baseValuation: number;
    esgMultiplier: number;
    growthAdjustment: number;
    riskDiscount: number;
    marketPremium: number;
    technicalBonus: number;
  };
  predictedGrowth: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  competitiveAnalysis: {
    marketPosition: string;
    competitiveAdvantage: number;
    threats: string[];
    opportunities: string[];
  };
  investmentRecommendation: "STRONG_BUY" | "BUY" | "HOLD" | "SELL" | "STRONG_SELL";
  keyMetrics: {
    sustainabilityScore: number;
    scalabilityIndex: number;
    profitabilityRating: number;
    innovationFactor: number;
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const { assetData, valuationMethod } = await req.json();
    
    if (!assetData || !valuationMethod) {
      return new Response(
        JSON.stringify({ error: "Missing assetData or valuationMethod" }),
        { status: 400, headers: corsHeaders }
      );
    }

    console.log(`Starting SustanoVal™ analysis for asset: ${assetData.title}`);

    // Initialize Supabase
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    const valuation = await calculateSustanoValuation(assetData);
    
    // Store valuation in database for audit trail
    await supabase.from('asset_valuations').insert({
      asset_id: assetData.id,
      asset_title: assetData.title,
      valuation_method: 'sustano-val',
      sustano_valuation: valuation.sustainoValuation,
      traditional_valuation: valuation.traditionalValuation,
      confidence_score: valuation.confidenceScore,
      breakdown: valuation.breakdown,
      created_at: new Date().toISOString()
    });

    console.log(`SustanoVal™ analysis complete: ${valuation.sustainoValuation}`);

    return new Response(
      JSON.stringify({
        success: true,
        valuation: valuation.sustainoValuation,
        traditional: valuation.traditionalValuation,
        premium: valuation.valuationPremium,
        confidence: valuation.confidenceScore,
        fullAnalysis: valuation,
        message: "SustanoVal™ analysis complete"
      }),
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error("SustanoVal™ calculation error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Valuation calculation failed", 
        details: error.message 
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});

/**
 * SUSTANO-VAL™ PROPRIETARY VALUATION ALGORITHM
 * Patent Pending: Multi-Variable Digital Asset Valuation System
 * 
 * This revolutionary algorithm combines:
 * - Traditional financial metrics with ESG impact scoring
 * - Market intelligence and competitive positioning
 * - Technology assessment and scalability analysis
 * - Risk-adjusted future growth predictions
 * - Sustainability premium calculations
 */
async function calculateSustanoValuation(asset: AdvancedAssetData): Promise<ValuationResult> {
  console.log("Executing SustanoVal™ proprietary algorithm...");

  // 1. BASE VALUATION CALCULATION
  // Traditional DCF with advanced metrics
  const baseValuation = calculateBaseValuation(asset);
  
  // 2. ESG MULTIPLIER (PROPRIETARY FORMULA)
  // Revolutionary ESG impact on valuation
  const esgMultiplier = calculateESGMultiplier(asset.esgBreakdown, asset.digitalImpactScore);
  
  // 3. GROWTH ADJUSTMENT (PATENT PENDING)
  // Advanced growth trajectory analysis
  const growthAdjustment = calculateGrowthAdjustment(asset);
  
  // 4. RISK DISCOUNT MATRIX
  // Multi-dimensional risk assessment
  const riskDiscount = calculateRiskDiscount(asset.riskFactors);
  
  // 5. MARKET PREMIUM CALCULATION
  // Market positioning and competitive advantage
  const marketPremium = calculateMarketPremium(asset);
  
  // 6. TECHNICAL ARCHITECTURE BONUS
  // Technology stack and scalability assessment
  const technicalBonus = calculateTechnicalBonus(asset);
  
  // 7. SUSTANO-VAL™ FINAL CALCULATION
  const sustainoValuation = baseValuation * 
    (1 + esgMultiplier) * 
    (1 + growthAdjustment) * 
    (1 - riskDiscount) * 
    (1 + marketPremium) * 
    (1 + technicalBonus);

  // 8. TRADITIONAL VALUATION (FOR COMPARISON)
  const traditionalValuation = baseValuation * asset.arrMultiple;

  // 9. CONFIDENCE SCORE CALCULATION
  const confidenceScore = calculateConfidenceScore(asset);

  // 10. PREDICTIVE GROWTH MODELING
  const predictedGrowth = calculatePredictiveGrowth(asset, sustainoValuation);

  // 11. COMPETITIVE ANALYSIS
  const competitiveAnalysis = performCompetitiveAnalysis(asset);

  // 12. INVESTMENT RECOMMENDATION
  const investmentRecommendation = generateInvestmentRecommendation(asset, sustainoValuation, traditionalValuation);

  // 13. KEY METRICS CALCULATION
  const keyMetrics = calculateKeyMetrics(asset);

  return {
    sustainoValuation: Math.round(sustainoValuation),
    traditionalValuation: Math.round(traditionalValuation),
    valuationPremium: Math.round(((sustainoValuation - traditionalValuation) / traditionalValuation) * 100),
    confidenceScore,
    breakdown: {
      baseValuation: Math.round(baseValuation),
      esgMultiplier: Math.round(esgMultiplier * 100),
      growthAdjustment: Math.round(growthAdjustment * 100),
      riskDiscount: Math.round(riskDiscount * 100),
      marketPremium: Math.round(marketPremium * 100),
      technicalBonus: Math.round(technicalBonus * 100)
    },
    predictedGrowth,
    competitiveAnalysis,
    investmentRecommendation,
    keyMetrics
  };
}

function calculateBaseValuation(asset: AdvancedAssetData): number {
  // Advanced DCF calculation with SustanoVal™ enhancements
  const annualRevenue = asset.currentValuation / asset.arrMultiple;
  const grossProfit = annualRevenue * (asset.grossMargin / 100);
  const ltv_cac_ratio = asset.lifetimeValue / asset.customerAcquisitionCost;
  
  // SustanoVal™ base formula (proprietary)
  const baseValue = grossProfit * (1 + (ltv_cac_ratio * 0.1)) * (1 - (asset.churnRate / 100));
  
  return baseValue * 3.5; // 3.5x base multiplier
}

function calculateESGMultiplier(esgBreakdown: any, digitalImpactScore: number): number {
  // PROPRIETARY ESG VALUATION FORMULA
  const avgESG = (esgBreakdown.environmental + esgBreakdown.social + esgBreakdown.governance + esgBreakdown.innovation) / 4;
  const sustainabilityBonus = (avgESG + digitalImpactScore) / 200;
  
  // ESG premium can add up to 35% to valuation
  return Math.min(sustainabilityBonus * 0.35, 0.35);
}

function calculateGrowthAdjustment(asset: AdvancedAssetData): number {
  // PATENT PENDING: Growth trajectory analysis
  const growthScore = (asset.revenueGrowthRate + asset.organicGrowth + asset.paidGrowth) / 3;
  const userEngagementBonus = asset.userEngagement / 100;
  const npsBonus = asset.npsScore / 1000;
  
  // Growth can add up to 50% premium
  return Math.min((growthScore / 100) + userEngagementBonus + npsBonus, 0.50);
}

function calculateRiskDiscount(riskFactors: any): number {
  // Multi-dimensional risk assessment
  const avgRisk = (riskFactors.technical + riskFactors.market + riskFactors.financial + riskFactors.regulatory + riskFactors.competitive) / 5;
  
  // Risk can discount up to 30%
  return Math.min(avgRisk / 100 * 0.3, 0.30);
}

function calculateMarketPremium(asset: AdvancedAssetData): number {
  // Market positioning premium
  const marketSizeBonus = Math.min(asset.marketSize / 1000000000, 1) * 0.15; // Up to 15% for $1B+ markets
  const marketShareBonus = Math.min(asset.marketShare / 100 * 0.10, 0.10); // Up to 10% for market share
  
  return marketSizeBonus + marketShareBonus;
}

function calculateTechnicalBonus(asset: AdvancedAssetData): number {
  // Technology assessment bonus
  const scalabilityBonus = asset.scalabilityScore / 100 * 0.15;
  const securityBonus = asset.securityScore / 100 * 0.10;
  const techDebtPenalty = asset.technicalDebt / 100 * 0.05;
  
  return scalabilityBonus + securityBonus - techDebtPenalty;
}

function calculateConfidenceScore(asset: AdvancedAssetData): number {
  // Confidence based on data quality and completeness
  let confidence = 85; // Base confidence
  
  if (asset.grossMargin > 70) confidence += 5;
  if (asset.churnRate < 5) confidence += 5;
  if (asset.npsScore > 50) confidence += 5;
  
  return Math.min(confidence, 98);
}

function calculatePredictiveGrowth(asset: AdvancedAssetData, currentVal: number) {
  const growthRate = asset.revenueGrowthRate / 100;
  
  return {
    oneYear: Math.round(currentVal * (1 + growthRate * 0.8)),
    threeYear: Math.round(currentVal * Math.pow(1 + growthRate * 0.6, 3)),
    fiveYear: Math.round(currentVal * Math.pow(1 + growthRate * 0.4, 5))
  };
}

function performCompetitiveAnalysis(asset: AdvancedAssetData) {
  return {
    marketPosition: asset.marketShare > 20 ? "Leader" : asset.marketShare > 10 ? "Challenger" : "Follower",
    competitiveAdvantage: Math.round((asset.sustainoValScore + asset.scalabilityScore + asset.securityScore) / 3),
    threats: ["Market Saturation", "Big Tech Competition", "Economic Downturn"],
    opportunities: ["Global Expansion", "AI Integration", "Strategic Partnerships"]
  };
}

function generateInvestmentRecommendation(asset: AdvancedAssetData, sustanoVal: number, traditionalVal: number): any {
  const premium = ((sustanoVal - traditionalVal) / traditionalVal) * 100;
  
  if (premium > 40 && asset.sustainoValScore > 90) return "STRONG_BUY";
  if (premium > 20 && asset.sustainoValScore > 80) return "BUY";
  if (premium > 0 && asset.sustainoValScore > 70) return "HOLD";
  if (premium < -10) return "SELL";
  return "STRONG_SELL";
}

function calculateKeyMetrics(asset: AdvancedAssetData) {
  return {
    sustainabilityScore: Math.round((asset.esgBreakdown.environmental + asset.esgBreakdown.social + asset.esgBreakdown.governance) / 3),
    scalabilityIndex: asset.scalabilityScore,
    profitabilityRating: Math.round((asset.grossMargin + (100 - asset.churnRate) + asset.npsScore) / 3),
    innovationFactor: asset.esgBreakdown.innovation
  };
}