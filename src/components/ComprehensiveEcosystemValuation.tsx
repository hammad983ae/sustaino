/**
 * ============================================================================
 * COMPREHENSIVE ECOSYSTEM VALUATION ANALYSIS
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * INVESTOR-GRADE PLATFORM ECOSYSTEM ANALYSIS
 * Complete valuation of entire platform including IP, ESG, crypto, betting agency
 * ============================================================================
 */

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Award,
  Brain,
  Globe,
  Target,
  Star,
  Building,
  Users,
  Zap,
  Lock,
  BarChart3,
  Leaf,
  Coins,
  Gamepad2,
  FileText,
  Gavel,
  Calculator,
  AlertTriangle,
  Check,
  Download,
  Send
} from "lucide-react";

interface SensitivityInputs {
  marketPenetration: number;
  revenueGrowth: number;
  profitMargin: number;
  competitorResponse: number;
  regulatoryRisk: number;
  technologyAdoption: number;
}

interface ValuationScenario {
  name: string;
  probability: number;
  valuation: number;
  description: string;
  assumptions: string[];
}

export const ComprehensiveEcosystemValuation = () => {
  const [sensitivityInputs, setSensitivityInputs] = useState<SensitivityInputs>({
    marketPenetration: 5,
    revenueGrowth: 15,
    profitMargin: 35,
    competitorResponse: 30,
    regulatoryRisk: 20,
    technologyAdoption: 80
  });

  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    }
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  // Platform Component Valuations
  const platformComponents = [
    {
      name: "SustanoSphere™ Core Platform",
      value: 15000000000,
      revenue: 200000000,
      description: "AI-powered digital asset valuation and marketplace",
      marketSize: 847000000000,
      marketShare: 2.5,
      esgImpact: 95,
      ipProtection: 90
    },
    {
      name: "Property Valuation Suite",
      value: 8500000000,
      revenue: 125000000,
      description: "Comprehensive property assessment and valuation tools",
      marketSize: 12300000000,
      marketShare: 8.5,
      esgImpact: 85,
      ipProtection: 85
    },
    {
      name: "ESG Climate Assessment Platform",
      value: 6200000000,
      revenue: 85000000,
      description: "Environmental, social, governance analysis with climate risk",
      marketSize: 4200000000,
      marketShare: 12.0,
      esgImpact: 100,
      ipProtection: 75
    },
    {
      name: "SustanoCoin™ Cryptocurrency",
      value: 3800000000,
      revenue: 45000000,
      description: "ESG-focused cryptocurrency for sustainable investments",
      marketSize: 1200000000000,
      marketShare: 0.8,
      esgImpact: 100,
      ipProtection: 95
    },
    {
      name: "Auction Platform Technology",
      value: 4500000000,
      revenue: 65000000,
      description: "3D WebGL auction interface with AI bidder qualification",
      marketSize: 25000000000,
      marketShare: 15.0,
      esgImpact: 60,
      ipProtection: 95
    },
    {
      name: "Non-Profit Betting Agency",
      value: 2100000000,
      revenue: 35000000,
      description: "Responsible gambling with profits to social projects",
      marketSize: 95000000000,
      marketShare: 2.0,
      esgImpact: 100,
      ipProtection: 60
    },
    {
      name: "Investment Analytics Suite",
      value: 3200000000,
      revenue: 42000000,
      description: "Professional-grade financial analysis and reporting",
      marketSize: 8900000000,
      marketShare: 6.5,
      esgImpact: 75,
      ipProtection: 80
    },
    {
      name: "Intellectual Property Portfolio",
      value: 2800000000,
      revenue: 25000000,
      description: "Patents, trademarks, trade secrets, and licensing",
      marketSize: 15000000000,
      marketShare: 12.0,
      esgImpact: 70,
      ipProtection: 100
    }
  ];

  // Calculate sensitivity analysis
  const calculateSensitiveValuation = () => {
    const baseValuation = 46100000000; // Sum of all components
    
    // Market penetration impact (±40%)
    const marketImpact = (sensitivityInputs.marketPenetration - 5) * 0.08;
    
    // Revenue growth impact (±30%)
    const growthImpact = (sensitivityInputs.revenueGrowth - 15) * 0.02;
    
    // Profit margin impact (±25%)
    const marginImpact = (sensitivityInputs.profitMargin - 35) * 0.007;
    
    // Competitor response risk (negative impact)
    const competitorImpact = -(sensitivityInputs.competitorResponse - 30) * 0.005;
    
    // Regulatory risk (negative impact)
    const regulatoryImpact = -(sensitivityInputs.regulatoryRisk - 20) * 0.003;
    
    // Technology adoption (positive impact)
    const technologyImpact = (sensitivityInputs.technologyAdoption - 80) * 0.004;
    
    const totalImpact = marketImpact + growthImpact + marginImpact + 
                       competitorImpact + regulatoryImpact + technologyImpact;
    
    return baseValuation * (1 + totalImpact);
  };

  // Valuation scenarios
  const valuationScenarios: ValuationScenario[] = [
    {
      name: "Conservative",
      probability: 25,
      valuation: 25000000000,
      description: "Modest market penetration with competition",
      assumptions: [
        "2% market penetration in 5 years",
        "Strong competitor response",
        "Regulatory challenges in some markets",
        "Technology adoption slower than expected"
      ]
    },
    {
      name: "Base Case",
      probability: 50,
      valuation: 46100000000,
      description: "Expected performance with normal market conditions",
      assumptions: [
        "5% market penetration in 5 years",
        "Moderate competition response",
        "Normal regulatory environment",
        "Expected technology adoption"
      ]
    },
    {
      name: "Optimistic",
      probability: 20,
      valuation: 75000000000,
      description: "Strong market leadership and network effects",
      assumptions: [
        "12% market penetration in 5 years",
        "Market transformation leadership",
        "Favorable regulatory environment",
        "Rapid technology adoption"
      ]
    },
    {
      name: "Transformational",
      probability: 5,
      valuation: 125000000000,
      description: "Category domination and global standard",
      assumptions: [
        "25% market penetration in 7 years",
        "Become industry standard",
        "Global regulatory adoption",
        "Network effects dominance"
      ]
    }
  ];

  // ESG Impact Analysis
  const esgAnalysis = {
    environmentalBenefits: [
      "Carbon footprint reduction through digital processes",
      "Climate risk assessment driving sustainable investments",
      "Renewable energy project valuations",
      "ESG compliance automation reducing waste"
    ],
    socialImpact: [
      "Non-profit betting agency funding social projects",
      "Transparent property valuation reducing inequality",
      "Financial inclusion through digital access",
      "Community investment tracking and reporting"
    ],
    governanceImprovement: [
      "Transparent AI-driven decision making",
      "Auditable blockchain transactions",
      "Regulatory compliance automation",
      "Stakeholder engagement platforms"
    ],
    financialPremium: 15 // 15% ESG premium
  };

  // Investment attractiveness metrics
  const investmentMetrics = {
    tamSize: 2247000000000, // $2.247T total addressable market
    samSize: 156000000000,  // $156B serviceable addressable market
    currentRevenue: 622000000, // $622M current revenue
    projectedRevenue2029: 3200000000, // $3.2B projected 2029 revenue
    cagr: 40, // 40% compound annual growth rate
    ebitdaMargin: 62, // 62% EBITDA margin
    moatStrength: 95, // IP protection strength
    networkEffects: 85 // Network effects strength
  };

  const sensitiveValuation = calculateSensitiveValuation();

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      {/* Header */}
      <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="h-12 w-12 text-primary" />
            <div>
              <CardTitle className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Comprehensive Ecosystem Valuation
              </CardTitle>
              <CardDescription className="text-2xl font-semibold text-muted-foreground mt-2">
                Complete Platform Analysis • Investment Grade Report • Auction Ready
              </CardDescription>
            </div>
          </div>
          
          <div className="flex justify-center gap-3 mb-6">
            <Badge className="bg-green-600 text-white px-4 py-2">
              <Leaf className="h-4 w-4 mr-2" />
              ESG Leader
            </Badge>
            <Badge className="bg-blue-600 text-white px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Patent Protected
            </Badge>
            <Badge className="bg-purple-600 text-white px-4 py-2">
              <Brain className="h-4 w-4 mr-2" />
              AI Powered
            </Badge>
            <Badge className="bg-orange-600 text-white px-4 py-2">
              <Coins className="h-4 w-4 mr-2" />
              Crypto Ready
            </Badge>
          </div>

          <p className="text-lg text-muted-foreground max-w-5xl mx-auto">
            Revolutionary platform ecosystem combining digital asset valuation, ESG assessment, 
            cryptocurrency, responsible betting, and comprehensive investment analytics. 
            First-to-market advantage with comprehensive IP protection.
          </p>
        </CardHeader>
      </Card>

      {/* Executive Summary Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            Executive Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {formatCurrency(46100000000)}
              </div>
              <div className="text-lg font-semibold">Base Case Valuation</div>
              <div className="text-sm text-muted-foreground">50% probability</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {formatCurrency(investmentMetrics.tamSize)}
              </div>
              <div className="text-lg font-semibold">Total Market Size</div>
              <div className="text-sm text-muted-foreground">TAM across all verticals</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">{investmentMetrics.cagr}%</div>
              <div className="text-lg font-semibold">5-Year CAGR</div>
              <div className="text-sm text-muted-foreground">Revenue growth rate</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="text-4xl font-bold text-orange-600 mb-2">{investmentMetrics.ebitdaMargin}%</div>
              <div className="text-lg font-semibold">EBITDA Margin</div>
              <div className="text-sm text-muted-foreground">Operating efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="sensitivity">Sensitivity</TabsTrigger>
          <TabsTrigger value="esg">ESG Impact</TabsTrigger>
          <TabsTrigger value="auction">Auction Ready</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-green-600" />
                  Investment Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="font-medium">$2.2T+ Total Addressable Market</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="font-medium">First-mover advantage across 8 platforms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Comprehensive IP protection (20+ patents)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="font-medium">ESG leadership with 15% premium</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="font-medium">40% CAGR with 62% EBITDA margins</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Multiple exit strategies (IPO/Acquisition)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                  Key Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Market Adoption Risk</span>
                    <Badge variant="outline" className="text-orange-600">Medium</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Technology Execution</span>
                    <Badge variant="outline" className="text-yellow-600">Low</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Regulatory Changes</span>
                    <Badge variant="outline" className="text-orange-600">Medium</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Competitive Response</span>
                    <Badge variant="outline" className="text-red-600">High</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Capital Requirements</span>
                    <Badge variant="outline" className="text-yellow-600">Low</Badge>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Risk Mitigation:</strong> Strong IP moat, experienced team, 
                    diversified revenue streams, and conservative financial projections.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Position */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-blue-600" />
                Market Position & Competitive Landscape
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Market Leadership</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Category creator in digital asset valuation</li>
                    <li>• First comprehensive ESG integration</li>
                    <li>• Patent-protected core technologies</li>
                    <li>• Network effects and data moat</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Competitive Advantages</h4>
                  <ul className="text-sm space-y-2">
                    <li>• SustanoVal™ proprietary algorithm</li>
                    <li>• 3D WebGL auction interface</li>
                    <li>• Integrated cryptocurrency solution</li>
                    <li>• ESG-first approach with social impact</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Strategic Moats</h4>
                  <ul className="text-sm space-y-2">
                    <li>• 20+ patents filed/pending</li>
                    <li>• Proprietary data aggregation</li>
                    <li>• Regulatory compliance framework</li>
                    <li>• Professional network effects</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Components Tab */}
        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-6 w-6 text-purple-600" />
                Platform Component Valuations
              </CardTitle>
              <CardDescription>
                Detailed breakdown of each platform component with individual valuations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {platformComponents.map((component, index) => (
                  <Card key={index} className="border border-border/50">
                    <CardContent className="pt-6">
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-primary">{component.name}</h3>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">
                                {formatCurrency(component.value)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {formatCurrency(component.revenue)} revenue
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">{component.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Market Size:</span> {formatCurrency(component.marketSize)}
                            </div>
                            <div>
                              <span className="font-medium">Market Share:</span> {component.marketShare}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">ESG Impact</span>
                              <span className="text-sm">{component.esgImpact}%</span>
                            </div>
                            <Progress value={component.esgImpact} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">IP Protection</span>
                              <span className="text-sm">{component.ipProtection}%</span>
                            </div>
                            <Progress value={component.ipProtection} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {formatCurrency(platformComponents.reduce((sum, comp) => sum + comp.value, 0))}
                  </div>
                  <div className="text-lg font-semibold">Total Ecosystem Valuation</div>
                  <div className="text-sm text-muted-foreground">
                    Combined value of all platform components
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Valuation Scenarios Tab */}
        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-blue-600" />
                Valuation Scenarios & Probability Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {valuationScenarios.map((scenario, index) => (
                  <Card key={index} className="border border-border/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{scenario.name}</h3>
                          <p className="text-muted-foreground">{scenario.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary">
                            {formatCurrency(scenario.valuation)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {scenario.probability}% probability
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <Progress value={scenario.probability} className="h-3" />
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Key Assumptions:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {scenario.assumptions.map((assumption, i) => (
                            <li key={i}>• {assumption}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-bold mb-3">Probability-Weighted Valuation</h3>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(
                    valuationScenarios.reduce((sum, scenario) => 
                      sum + (scenario.valuation * scenario.probability / 100), 0
                    )
                  )}
                </div>
                <p className="text-sm text-blue-800 mt-2">
                  Expected value based on probability-weighted scenarios
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sensitivity Analysis Tab */}
        <TabsContent value="sensitivity" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-purple-600" />
                  Sensitivity Analysis Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Market Penetration (%)</Label>
                    <Slider
                      value={[sensitivityInputs.marketPenetration]}
                      onValueChange={(value) => setSensitivityInputs(prev => ({ ...prev, marketPenetration: value[0] }))}
                      max={20}
                      min={1}
                      step={0.5}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {sensitivityInputs.marketPenetration}% market share in 5 years
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Revenue Growth Rate (%)</Label>
                    <Slider
                      value={[sensitivityInputs.revenueGrowth]}
                      onValueChange={(value) => setSensitivityInputs(prev => ({ ...prev, revenueGrowth: value[0] }))}
                      max={50}
                      min={5}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {sensitivityInputs.revenueGrowth}% annual growth
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">EBITDA Margin (%)</Label>
                    <Slider
                      value={[sensitivityInputs.profitMargin]}
                      onValueChange={(value) => setSensitivityInputs(prev => ({ ...prev, profitMargin: value[0] }))}
                      max={70}
                      min={15}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {sensitivityInputs.profitMargin}% operating margin
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Competitor Response Risk (%)</Label>
                    <Slider
                      value={[sensitivityInputs.competitorResponse]}
                      onValueChange={(value) => setSensitivityInputs(prev => ({ ...prev, competitorResponse: value[0] }))}
                      max={80}
                      min={10}
                      step={5}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {sensitivityInputs.competitorResponse}% risk factor
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Technology Adoption Rate (%)</Label>
                    <Slider
                      value={[sensitivityInputs.technologyAdoption]}
                      onValueChange={(value) => setSensitivityInputs(prev => ({ ...prev, technologyAdoption: value[0] }))}
                      max={95}
                      min={40}
                      step={5}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {sensitivityInputs.technologyAdoption}% adoption rate
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sensitivity Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {formatCurrency(sensitiveValuation)}
                  </div>
                  <div className="text-lg font-semibold">Adjusted Valuation</div>
                  <div className="text-sm text-muted-foreground">Based on current inputs</div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Impact Analysis:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Market Penetration Impact:</span>
                      <span className={sensitiveValuation > 46100000000 ? "text-green-600" : "text-red-600"}>
                        {sensitiveValuation > 46100000000 ? "+" : ""}{formatCurrency(sensitiveValuation - 46100000000)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Base Case Valuation:</span>
                      <span className="font-medium">{formatCurrency(46100000000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variance from Base:</span>
                      <span className={sensitiveValuation > 46100000000 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                        {((sensitiveValuation / 46100000000 - 1) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-orange-50 rounded border border-orange-200">
                  <p className="text-sm text-orange-800">
                    <strong>Key Insight:</strong> The platform's valuation is most sensitive to 
                    market penetration rates and technology adoption. Even conservative scenarios 
                    yield substantial valuations due to market size and IP protection.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ESG Impact Tab */}
        <TabsContent value="esg" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-600" />
                ESG Impact & Social Value Creation
              </CardTitle>
              <CardDescription>
                Environmental, Social, and Governance benefits driving premium valuations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6 mb-6">
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-700">Environmental</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      {esgAnalysis.environmentalBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Leaf className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-700">Social</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      {esgAnalysis.socialImpact.map((impact, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Users className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          {impact}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-purple-700">Governance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      {esgAnalysis.governanceImprovement.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Shield className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">ESG Premium Calculation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Base Platform Valuation:</span>
                        <span className="font-semibold">{formatCurrency(40000000000)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>ESG Premium ({esgAnalysis.financialPremium}%):</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(40000000000 * esgAnalysis.financialPremium / 100)}
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">Total ESG-Enhanced Value:</span>
                          <span className="font-bold text-green-600 text-lg">
                            {formatCurrency(40000000000 * (1 + esgAnalysis.financialPremium / 100))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Non-Profit Betting Agency Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Annual Betting Revenue:</span>
                        <span className="font-semibold">{formatCurrency(35000000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Social Project Investment:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(32000000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ESG Rating Boost:</span>
                        <span className="font-semibold">AAA+</span>
                      </div>
                      <div className="p-3 bg-green-100 rounded text-sm text-green-800">
                        <strong>Impact:</strong> 91% of betting profits invested in community 
                        projects, education, and environmental initiatives, creating measurable 
                        social value while maintaining regulatory compliance.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auction Ready Tab */}
        <TabsContent value="auction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-6 w-6 text-orange-600" />
                Auction-Ready Investment Package
              </CardTitle>
              <CardDescription>
                Complete due diligence package for investors, acquirers, and joint venture partners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <Card className="border-orange-200 bg-orange-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-orange-700">Investment Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Enterprise Value:</span>
                          <div className="text-lg font-bold text-orange-600">
                            {formatCurrency(46100000000)}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Revenue Multiple:</span>
                          <div className="text-lg font-bold">74.1x</div>
                        </div>
                        <div>
                          <span className="font-medium">Revenue CAGR:</span>
                          <div className="text-lg font-bold">40%</div>
                        </div>
                        <div>
                          <span className="font-medium">EBITDA Margin:</span>
                          <div className="text-lg font-bold">62%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Due Diligence Checklist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-600" />
                          <span className="text-sm">Financial projections and models</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-600" />
                          <span className="text-sm">IP portfolio documentation</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-600" />
                          <span className="text-sm">Technology architecture review</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-600" />
                          <span className="text-sm">Market analysis and validation</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-600" />
                          <span className="text-sm">ESG impact assessment</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-600" />
                          <span className="text-sm">Regulatory compliance framework</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-600" />
                          <span className="text-sm">Team and advisory board profiles</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Target Investor Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Strategic Acquirers:</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Enterprise software companies (Salesforce, Oracle)</li>
                          <li>• Financial data providers (Bloomberg, Refinitiv)</li>
                          <li>• PropTech platforms (Compass, Opendoor)</li>
                          <li>• ESG rating agencies (MSCI, Sustainalytics)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Financial Investors:</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Growth equity firms (General Atlantic, Insight)</li>
                          <li>• PE firms with tech focus (Vista, KKR)</li>
                          <li>• Sovereign wealth funds</li>
                          <li>• Strategic corporate ventures</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Joint Venture Partners:</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Real estate investment platforms</li>
                          <li>• Cryptocurrency exchanges</li>
                          <li>• ESG consulting firms</li>
                          <li>• Government digital initiatives</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Download className="h-4 w-4 mr-2" />
                      Download Complete Data Room
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      Schedule Investor Presentation
                    </Button>
                    <Button variant="secondary" className="w-full" size="lg">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Executive Summary
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                <h3 className="font-bold text-xl mb-3 text-center">Ready for Market</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Complete ecosystem valued at <strong>{formatCurrency(46100000000)}</strong> 
                  with comprehensive documentation, proven technology, and clear growth trajectory.
                </p>
                <div className="flex justify-center">
                  <Badge className="bg-green-600 text-white px-6 py-2 text-lg">
                    <Star className="h-5 w-5 mr-2" />
                    INVESTMENT GRADE • AUCTION READY
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveEcosystemValuation;