/**
 * ============================================================================
 * SUSTAINO SPHERE™ COMPREHENSIVE MARKET ANALYSIS REPORT COMPONENT
 * Patent Pending: US Application #2025-XXXX "AI-Enhanced Market Intelligence System"
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * Trademark: SustanoAnalytics™, MarketIQ™, CompetitorMind™
 * ============================================================================
 */

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Target, 
  Shield, 
  Users, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Lightbulb,
  Globe,
  Zap,
  Crown,
  FileText,
  Download,
  Eye,
  Brain,
  Radar,
  Network,
  Flame
} from "lucide-react";
import {
  generatePESTELAnalysis,
  generateSWOTAnalysis,
  generateTOWSMatrix,
  generateVRIOAnalysis,
  generateLikelyPurchaserAnalysis,
  generateCollaborationAnalysis,
  generateEconomicOverview,
  generateMarketShareAnalysis,
  type PESTELAnalysis,
  type SWOTAnalysis,
  type TOWSMatrix,
  type VRIOAnalysis,
  type LikelyPurchaserAnalysis,
  type CollaborationAnalysis,
  type EconomicOverview,
  type MarketShareAnalysis
} from "@/lib/sustano-sphere-market-analysis";

interface MarketAnalysisReportProps {
  assetData: any;
  onReportGenerated?: (report: any) => void;
}

export const SustanoSphereMarketAnalysisReport: React.FC<MarketAnalysisReportProps> = ({
  assetData,
  onReportGenerated
}) => {
  const [activeTab, setActiveTab] = useState("pestel");
  const [analysisData, setAnalysisData] = useState<{
    pestel?: PESTELAnalysis;
    swot?: SWOTAnalysis;
    tows?: TOWSMatrix;
    vrio?: VRIOAnalysis;
    purchasers?: LikelyPurchaserAnalysis;
    collaborations?: CollaborationAnalysis;
    economic?: EconomicOverview;
    marketShare?: MarketShareAnalysis;
  }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateComprehensiveAnalysis();
  }, [assetData]);

  const generateComprehensiveAnalysis = async () => {
    setLoading(true);
    try {
      // Generate all analyses using proprietary algorithms
      const pestelAnalysis = generatePESTELAnalysis(assetData);
      const swotAnalysis = generateSWOTAnalysis(assetData, null);
      const towsMatrix = generateTOWSMatrix(swotAnalysis);
      const vrioAnalysis = generateVRIOAnalysis(assetData);
      const purchaserAnalysis = generateLikelyPurchaserAnalysis(assetData);
      const collaborationAnalysis = generateCollaborationAnalysis(assetData);
      const economicOverview = generateEconomicOverview(assetData);
      const marketShareAnalysis = generateMarketShareAnalysis(assetData);

      const comprehensiveReport = {
        pestel: pestelAnalysis,
        swot: swotAnalysis,
        tows: towsMatrix,
        vrio: vrioAnalysis,
        purchasers: purchaserAnalysis,
        collaborations: collaborationAnalysis,
        economic: economicOverview,
        marketShare: marketShareAnalysis,
        generatedAt: new Date().toISOString(),
        assetId: assetData.id,
        assetTitle: assetData.title
      };

      setAnalysisData(comprehensiveReport);
      onReportGenerated?.(comprehensiveReport);
    } catch (error) {
      console.error("Market analysis generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskColor = (risk: string | number) => {
    if (typeof risk === 'string') {
      switch (risk) {
        case 'low': return "text-green-600 bg-green-100";
        case 'medium': return "text-yellow-600 bg-yellow-100";
        case 'high': return "text-red-600 bg-red-100";
        default: return "text-gray-600 bg-gray-100";
      }
    }
    if (risk <= 3) return "text-green-600 bg-green-100";
    if (risk <= 7) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-emerald-600 bg-emerald-100";
    if (score >= 6) return "text-blue-600 bg-blue-100";
    if (score >= 4) return "text-purple-600 bg-purple-100";
    return "text-orange-600 bg-orange-100";
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary animate-pulse" />
            Generating SustanoAnalytics™ Market Intelligence Report
          </CardTitle>
          <CardDescription>
            Processing comprehensive market analysis using proprietary algorithms...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={33} className="w-full" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['PESTEL', 'SWOT', 'VRIO', 'Market Analysis'].map((analysis) => (
                <div key={analysis} className="flex items-center gap-2 p-3 border rounded-lg">
                  <Zap className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-sm">{analysis}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Crown className="h-6 w-6 text-primary" />
                SustanoAnalytics™ Comprehensive Market Intelligence
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Advanced AI-powered market analysis for {assetData.title}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-primary text-primary-foreground">
                Patent Pending
              </Badge>
              <Badge variant="outline" className="bg-secondary text-secondary-foreground">
                SustanoAnalytics™
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
          <TabsTrigger value="pestel" className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            PESTEL
          </TabsTrigger>
          <TabsTrigger value="swot" className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            SWOT
          </TabsTrigger>
          <TabsTrigger value="tows" className="flex items-center gap-1">
            <Lightbulb className="h-4 w-4" />
            TOWS
          </TabsTrigger>
          <TabsTrigger value="vrio" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            VRIO
          </TabsTrigger>
          <TabsTrigger value="purchasers" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Buyers
          </TabsTrigger>
          <TabsTrigger value="collaborations" className="flex items-center gap-1">
            <Network className="h-4 w-4" />
            Partners
          </TabsTrigger>
          <TabsTrigger value="economic" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            Economic
          </TabsTrigger>
          <TabsTrigger value="market" className="flex items-center gap-1">
            <PieChart className="h-4 w-4" />
            Market
          </TabsTrigger>
        </TabsList>

        {/* PESTEL Analysis */}
        <TabsContent value="pestel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                PESTEL Analysis - Macro-Environmental Factors
              </CardTitle>
              <CardDescription>
                Comprehensive analysis of Political, Economic, Social, Technological, Environmental, and Legal factors
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisData.pestel && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(analysisData.pestel).slice(0, 6).map(([key, factor]: [string, any]) => (
                    <Card key={key} className="border-l-4 border-l-primary">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg capitalize flex items-center justify-between">
                          {key}
                          <Badge className={getRiskColor(factor.riskLevel)}>
                            {factor.riskLevel}
                          </Badge>
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Impact Score:</span>
                          <Badge className={getScoreColor(factor.impact)}>
                            {factor.impact}/10
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div>
                            <h4 className="font-medium text-sm mb-1">Key Factors:</h4>
                            <ul className="text-xs space-y-1">
                              {factor.factors.slice(0, 3).map((f: string, i: number) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-primary">•</span>
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {factor.trends.length > 0 && (
                            <div>
                              <h4 className="font-medium text-sm mb-1">Trends:</h4>
                              <div className="flex flex-wrap gap-1">
                                {factor.trends.slice(0, 2).map((trend: string, i: number) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {trend}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              {analysisData.pestel && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    Strategic Recommendations
                  </h3>
                  <ul className="space-y-1">
                    {analysisData.pestel.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SWOT Analysis */}
        <TabsContent value="swot" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                SWOT Analysis - Strategic Position Assessment
              </CardTitle>
              <CardDescription>
                Internal strengths & weaknesses, external opportunities & threats analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisData.swot && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-green-700 flex items-center justify-between">
                        Strengths
                        <Badge className="bg-green-100 text-green-700">
                          Score: {analysisData.swot.strengths.score.toFixed(1)}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Internal Strengths:</h4>
                        <ul className="space-y-1">
                          {analysisData.swot.strengths.internal.map((strength, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Competitive Strengths:</h4>
                        <ul className="space-y-1">
                          {analysisData.swot.strengths.competitive.map((strength, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Weaknesses */}
                  <Card className="border-l-4 border-l-red-500">
                    <CardHeader>
                      <CardTitle className="text-red-700 flex items-center justify-between">
                        Weaknesses
                        <Badge className="bg-red-100 text-red-700">
                          Score: {analysisData.swot.weaknesses.score.toFixed(1)}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Internal Weaknesses:</h4>
                        <ul className="space-y-1">
                          {analysisData.swot.weaknesses.internal.map((weakness, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <XCircle className="h-3 w-3 text-red-600 mt-1 flex-shrink-0" />
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Competitive Weaknesses:</h4>
                        <ul className="space-y-1">
                          {analysisData.swot.weaknesses.competitive.map((weakness, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <XCircle className="h-3 w-3 text-red-600 mt-1 flex-shrink-0" />
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Opportunities */}
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="text-blue-700 flex items-center justify-between">
                        Opportunities
                        <Badge className="bg-blue-100 text-blue-700">
                          Score: {analysisData.swot.opportunities.score.toFixed(1)}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Market Opportunities:</h4>
                        <ul className="space-y-1">
                          {analysisData.swot.opportunities.market.map((opp, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <TrendingUp className="h-3 w-3 text-blue-600 mt-1 flex-shrink-0" />
                              {opp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Technology Opportunities:</h4>
                        <ul className="space-y-1">
                          {analysisData.swot.opportunities.technology.map((opp, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <Zap className="h-3 w-3 text-blue-600 mt-1 flex-shrink-0" />
                              {opp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Threats */}
                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <CardTitle className="text-orange-700 flex items-center justify-between">
                        Threats
                        <Badge className="bg-orange-100 text-orange-700">
                          Score: {analysisData.swot.threats.score.toFixed(1)}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Competitive Threats:</h4>
                        <ul className="space-y-1">
                          {analysisData.swot.threats.competitive.map((threat, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <AlertTriangle className="h-3 w-3 text-orange-600 mt-1 flex-shrink-0" />
                              {threat}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Market Threats:</h4>
                        <ul className="space-y-1">
                          {analysisData.swot.threats.market.map((threat, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <AlertTriangle className="h-3 w-3 text-orange-600 mt-1 flex-shrink-0" />
                              {threat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TOWS Matrix */}
        <TabsContent value="tows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                TOWS Strategic Action Matrix
              </CardTitle>
              <CardDescription>
                Strategic actions derived from SWOT analysis combinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisData.tows && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-green-700 text-lg">SO Strategies</CardTitle>
                      <CardDescription>Strengths + Opportunities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisData.tows.SO_Strategies.map((strategy, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="text-blue-700 text-lg">WO Strategies</CardTitle>
                      <CardDescription>Weaknesses + Opportunities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisData.tows.WO_Strategies.map((strategy, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader>
                      <CardTitle className="text-purple-700 text-lg">ST Strategies</CardTitle>
                      <CardDescription>Strengths + Threats</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisData.tows.ST_Strategies.map((strategy, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Shield className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader>
                      <CardTitle className="text-orange-700 text-lg">WT Strategies</CardTitle>
                      <CardDescription>Weaknesses + Threats</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisData.tows.WT_Strategies.map((strategy, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {analysisData.tows && (
                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-lg">Priority Actions Timeline</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Immediate (0-3 months)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {analysisData.tows.priorityActions.immediate.map((action, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-red-600">•</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-yellow-600 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Short-term (3-12 months)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {analysisData.tows.priorityActions.shortTerm.map((action, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-yellow-600">•</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Long-term (1-3 years)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {analysisData.tows.priorityActions.longTerm.map((action, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <span className="text-green-600">•</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* VRIO Analysis */}
        <TabsContent value="vrio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                VRIO Framework - Competitive Advantage Analysis
              </CardTitle>
              <CardDescription>
                Valuable, Rare, Inimitable, Organized resource assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisData.vrio && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(analysisData.vrio).slice(0, 4).map(([key, dimension]: [string, any]) => (
                      <Card key={key} className="border-l-4 border-l-primary">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg capitalize flex items-center justify-between">
                            {key}
                            <Badge className={getScoreColor(dimension.score)}>
                              {dimension.score.toFixed(1)}/10
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-3">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Key Factors:</h4>
                            <ul className="space-y-1">
                              {dimension.factors.map((factor: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-xs">
                                  <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                  {factor}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-2 bg-muted rounded text-xs">
                            <strong>Advantage:</strong> {dimension.competitive_advantage}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-primary" />
                        Overall Competitive Advantage Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge 
                          variant="outline" 
                          className={
                            analysisData.vrio.overallCompetitiveAdvantage === 'sustained_advantage' 
                              ? 'bg-green-100 text-green-700 border-green-300' 
                              : analysisData.vrio.overallCompetitiveAdvantage === 'temporary_advantage'
                              ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                              : 'bg-red-100 text-red-700 border-red-300'
                          }
                        >
                          {analysisData.vrio.overallCompetitiveAdvantage.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Strategic Recommendations:</h4>
                        <ul className="space-y-1">
                          {analysisData.vrio.strategicRecommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Likely Purchasers */}
        <TabsContent value="purchasers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Likely Purchaser Analysis
              </CardTitle>
              <CardDescription>
                Comprehensive buyer identification and persona analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisData.purchasers && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Primary Buyer Categories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisData.purchasers.primaryBuyers.map((buyer, i) => (
                        <Card key={i} className="border-l-4 border-l-green-500">
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              {buyer.category}
                              <Badge className="bg-green-100 text-green-700">
                                {buyer.percentage}%
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <h4 className="font-medium text-sm mb-1">Price Range:</h4>
                              <p className="text-sm text-muted-foreground">
                                {formatCurrency(buyer.priceRange.min)} - {formatCurrency(buyer.priceRange.max)}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-1">Characteristics:</h4>
                              <div className="flex flex-wrap gap-1">
                                {buyer.characteristics.map((char, j) => (
                                  <Badge key={j} variant="outline" className="text-xs">
                                    {char}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-1">Key Motivations:</h4>
                              <ul className="space-y-1">
                                {buyer.motivations.map((motivation, j) => (
                                  <li key={j} className="flex items-start gap-2 text-xs">
                                    <DollarSign className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                    {motivation}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Detailed Buyer Personas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisData.purchasers.buyerPersonas.map((persona, i) => (
                        <Card key={i}>
                          <CardHeader>
                            <CardTitle className="text-lg">{persona.name}</CardTitle>
                            <CardDescription>{persona.profile}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <h4 className="font-medium text-sm mb-1">Key Drivers:</h4>
                              <ul className="space-y-1">
                                {persona.keyDrivers.map((driver, j) => (
                                  <li key={j} className="flex items-start gap-2 text-xs">
                                    <Target className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                    {driver}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-1">Decision Timeline:</h4>
                              <Badge variant="outline" className="text-xs">
                                {persona.timeline}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Economic Overview */}
        <TabsContent value="economic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Economic Overview & Market Dynamics
              </CardTitle>
              <CardDescription>
                Supply & demand analysis, barriers to entry, competitive intensity
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisData.economic && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Market Size Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Market</p>
                          <p className="text-xl font-semibold">
                            {formatCurrency(analysisData.economic.marketSize.current)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">5-Year Projection</p>
                          <p className="text-xl font-semibold text-green-600">
                            {formatCurrency(analysisData.economic.marketSize.projected_5_year)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Growth Rate</p>
                        <div className="flex items-center gap-2">
                          <Progress value={analysisData.economic.marketSize.growth_rate} className="flex-1" />
                          <span className="text-sm font-medium">
                            {analysisData.economic.marketSize.growth_rate}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Barriers to Entry</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Overall Barrier Score</span>
                          <Badge className={getScoreColor(analysisData.economic.barriers_to_entry.overall_barrier_score)}>
                            {analysisData.economic.barriers_to_entry.overall_barrier_score}/10
                          </Badge>
                        </div>
                        <Progress value={analysisData.economic.barriers_to_entry.overall_barrier_score * 10} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Capital Requirements</p>
                        <p className="font-medium">
                          {formatCurrency(analysisData.economic.barriers_to_entry.capital_requirements)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Key Barriers</p>
                        <div className="space-y-1">
                          {analysisData.economic.barriers_to_entry.regulatory_barriers.slice(0, 3).map((barrier, i) => (
                            <Badge key={i} variant="outline" className="text-xs mr-1">
                              {barrier}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would continue here... */}

      </Tabs>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Export & Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              onClick={() => console.log('Exporting PDF report...', analysisData)}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export PDF Report
            </Button>
            <Button 
              variant="outline"
              onClick={() => console.log('Generating executive summary...', analysisData)}
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              Generate Executive Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
