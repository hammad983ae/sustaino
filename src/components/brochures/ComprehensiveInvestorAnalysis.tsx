import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  DollarSign,
  Shield,
  Globe,
  Brain,
  BarChart3,
  Target,
  Award,
  Lock,
  Zap,
  Building,
  FileText,
  Calculator,
  Users,
  Star,
  ArrowUpRight,
  PieChart,
  Activity,
  Briefcase,
  Crown,
  Rocket,
  ChevronRight
} from "lucide-react";

const ComprehensiveInvestorAnalysis = () => {
  const [activeSection, setActiveSection] = useState("executive-summary");

  const platformValuation = {
    coreProperty: 125000000,
    aiAlgorithms: 85000000,
    blockchain: 45000000,
    dataAssets: 35000000,
    ipPortfolio: 75000000,
    marketPosition: 65000000,
    total: 430000000
  };

  const marketOpportunity = {
    tam: 2800000000000, // $2.8T
    sam: 280000000000,  // $280B
    som: 28000000000    // $28B
  };

  const competitorAnalysis = [
    {
      name: "CoreLogic",
      marketCap: 8500000000,
      strengths: ["Market Leader", "Data Coverage"],
      weaknesses: ["Legacy Systems", "Limited AI"],
      marketShare: 35
    },
    {
      name: "Zillow",
      marketCap: 12000000000,
      strengths: ["Brand Recognition", "User Base"],
      weaknesses: ["US-Focused", "Limited B2B"],
      marketShare: 28
    },
    {
      name: "PropTech Startups",
      marketCap: 15000000000,
      strengths: ["Innovation", "Agility"],
      weaknesses: ["Limited Scale", "Capital Constraints"],
      marketShare: 20
    }
  ];

  const swotAnalysis = {
    strengths: [
      "Revolutionary AI-powered valuation algorithms",
      "Comprehensive IP portfolio with patent protection",
      "First-mover advantage in blockchain property verification",
      "Integrated ESG assessment capabilities",
      "Australian market expertise and regulatory compliance",
      "Scalable SaaS architecture"
    ],
    weaknesses: [
      "Early-stage revenue generation",
      "Capital intensive technology development",
      "Market education requirements",
      "Dependency on key technical personnel"
    ],
    opportunities: [
      "$2.8T global property technology market",
      "Increasing demand for ESG compliance",
      "Digital transformation in real estate",
      "Expansion into Asia-Pacific markets",
      "Integration with government databases",
      "Blockchain adoption in property transactions"
    ],
    threats: [
      "Competition from established players",
      "Regulatory changes in property markets",
      "Economic downturns affecting property sector",
      "Technology disruption from major tech companies"
    ]
  };

  const viroAnalysis = {
    valuable: {
      score: 9,
      description: "Proprietary AI algorithms and comprehensive data platform create significant value"
    },
    rare: {
      score: 8,
      description: "Few competitors offer integrated AI, blockchain, and ESG assessment platform"
    },
    inimitable: {
      score: 8,
      description: "Patent-protected algorithms and accumulated data create barriers to imitation"
    },
    organized: {
      score: 7,
      description: "Strong technical architecture with room for operational scaling"
    }
  };

  const pestelAnalysis = {
    political: [
      "Government push for digital transformation",
      "Property market regulation compliance",
      "Data privacy and protection laws"
    ],
    economic: [
      "Interest rate environment affecting property",
      "Economic growth driving property investment",
      "Currency fluctuations in global expansion"
    ],
    social: [
      "Increasing ESG awareness among investors",
      "Digital natives entering property market",
      "Demand for transparency in property transactions"
    ],
    technological: [
      "AI and machine learning advancement",
      "Blockchain technology maturation",
      "IoT integration in property management"
    ],
    environmental: [
      "Climate change impact on property values",
      "Sustainability requirements for buildings",
      "Carbon footprint assessment demand"
    ],
    legal: [
      "Property transaction legal frameworks",
      "Intellectual property protection",
      "Professional indemnity requirements"
    ]
  };

  const financialProjections = {
    year1: { revenue: 2500000, costs: 4200000, netProfit: -1700000 },
    year2: { revenue: 8500000, costs: 7200000, netProfit: 1300000 },
    year3: { revenue: 22000000, costs: 14500000, netProfit: 7500000 },
    year4: { revenue: 45000000, costs: 24000000, netProfit: 21000000 },
    year5: { revenue: 85000000, costs: 38000000, netProfit: 47000000 }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Crown className="h-12 w-12 text-yellow-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              SUSTANO-PHERE™
            </h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">Comprehensive Investor Analysis</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Revolutionary Digital Asset Intelligence Platform - Complete Investment Opportunity Analysis
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge className="bg-green-600 text-white px-4 py-2">Patent Protected</Badge>
            <Badge className="bg-blue-600 text-white px-4 py-2">AI-Powered</Badge>
            <Badge className="bg-purple-600 text-white px-4 py-2">Blockchain Verified</Badge>
            <Badge className="bg-orange-600 text-white px-4 py-2">ESG Integrated</Badge>
          </div>
        </div>

        {/* Executive Summary */}
        <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-yellow-400" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-green-400" />
                <h3 className="text-2xl font-bold text-green-400">{formatCurrency(platformValuation.total)}</h3>
                <p className="text-gray-300">Current Platform Valuation</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg">
                <Globe className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-2xl font-bold text-blue-400">{formatCurrency(marketOpportunity.tam)}</h3>
                <p className="text-gray-300">Total Addressable Market</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg">
                <Rocket className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-2xl font-bold text-purple-400">2,156%</h3>
                <p className="text-gray-300">5-Year Revenue Growth</p>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6">
              <p className="text-lg leading-relaxed">
                <strong>Investment Opportunity:</strong> Sustano-Phere™ represents a revolutionary opportunity to invest in the future of property technology. 
                Our platform combines proprietary AI algorithms, blockchain verification, and comprehensive ESG assessment capabilities to create 
                the world's most advanced digital asset intelligence system. With patent-protected technology and first-mover advantage in multiple 
                market segments, we are positioned to capture significant value in the $2.8 trillion global property technology market.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="executive-summary" className="text-xs">Summary</TabsTrigger>
            <TabsTrigger value="platform-analysis" className="text-xs">Platform</TabsTrigger>
            <TabsTrigger value="market-analysis" className="text-xs">Market</TabsTrigger>
            <TabsTrigger value="competitive" className="text-xs">Competition</TabsTrigger>
            <TabsTrigger value="strategic-analysis" className="text-xs">Strategy</TabsTrigger>
            <TabsTrigger value="financial" className="text-xs">Financial</TabsTrigger>
            <TabsTrigger value="valuation" className="text-xs">Valuation</TabsTrigger>
            <TabsTrigger value="investment" className="text-xs">Investment</TabsTrigger>
          </TabsList>

          <TabsContent value="platform-analysis" className="mt-8">
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Brain className="h-6 w-6 text-cyan-400" />
                    Platform Architecture & Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-cyan-400">Core Technologies</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                          <span>SustanoVal™ AI Algorithm</span>
                          <Badge className="bg-green-600">Patent Pending</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                          <span>Blockchain Verification</span>
                          <Badge className="bg-blue-600">Proprietary</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                          <span>ESG Assessment Engine</span>
                          <Badge className="bg-purple-600">Trade Secret</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                          <span>Digital Auction Platform</span>
                          <Badge className="bg-orange-600">Patent Filed</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-cyan-400">Platform Capabilities</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-green-400" />
                          Real-time property valuation with 97.3% accuracy
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-green-400" />
                          Automated document processing and data extraction
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-green-400" />
                          Comprehensive ESG scoring and climate risk assessment
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-green-400" />
                          Blockchain-verified evidence and contract management
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-green-400" />
                          AI-powered market analysis and forecasting
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-green-400" />
                          Integration with government and industry databases
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Lock className="h-6 w-6 text-yellow-400" />
                    Intellectual Property Portfolio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-lg">
                      <h3 className="text-3xl font-bold text-yellow-400">12</h3>
                      <p className="text-gray-300">Patent Applications Filed</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg">
                      <h3 className="text-3xl font-bold text-blue-400">8</h3>
                      <p className="text-gray-300">Registered Trademarks</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg">
                      <h3 className="text-3xl font-bold text-purple-400">{formatCurrency(75000000)}</h3>
                      <p className="text-gray-300">Estimated IP Value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="market-analysis" className="mt-8">
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Globe className="h-6 w-6 text-green-400" />
                    Market Opportunity Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg">
                      <h3 className="text-2xl font-bold text-green-400">{formatCurrency(marketOpportunity.tam)}</h3>
                      <p className="text-gray-300 font-semibold">Total Addressable Market</p>
                      <p className="text-sm text-gray-400 mt-2">Global property technology market including valuation, transaction, and management platforms</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg">
                      <h3 className="text-2xl font-bold text-blue-400">{formatCurrency(marketOpportunity.sam)}</h3>
                      <p className="text-gray-300 font-semibold">Serviceable Addressable Market</p>
                      <p className="text-sm text-gray-400 mt-2">AI-powered property valuation and ESG assessment segment</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg">
                      <h3 className="text-2xl font-bold text-purple-400">{formatCurrency(marketOpportunity.som)}</h3>
                      <p className="text-gray-300 font-semibold">Serviceable Obtainable Market</p>
                      <p className="text-sm text-gray-400 mt-2">Realistic 5-year market capture based on competitive positioning</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 text-green-400">Market Drivers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-green-400" />
                          Digital transformation in real estate sector
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-green-400" />
                          Increasing demand for ESG compliance
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-green-400" />
                          Regulatory pressure for accurate valuations
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-green-400" />
                          Growth in property investment and transactions
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-green-400" />
                          Adoption of AI and blockchain technologies
                        </li>
                        <li className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-green-400" />
                          Climate risk assessment requirements
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Activity className="h-6 w-6 text-blue-400" />
                    PESTEL Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(pestelAnalysis).map(([category, factors]) => (
                      <div key={category} className="p-4 bg-white/5 rounded-lg">
                        <h3 className="text-lg font-bold mb-3 capitalize text-cyan-400">{category}</h3>
                        <ul className="space-y-2 text-sm">
                          {factors.map((factor, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <ChevronRight className="h-3 w-3 text-cyan-400 mt-1 flex-shrink-0" />
                              <span className="text-gray-300">{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="competitive" className="mt-8">
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Target className="h-6 w-6 text-red-400" />
                    Competitive Landscape Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {competitorAnalysis.map((competitor, index) => (
                      <div key={index} className="p-6 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold">{competitor.name}</h3>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-400">{formatCurrency(competitor.marketCap)}</p>
                            <p className="text-sm text-gray-400">Market Cap</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold text-green-400 mb-2">Strengths</h4>
                            <ul className="space-y-1 text-sm">
                              {competitor.strengths.map((strength, i) => (
                                <li key={i} className="text-gray-300">• {strength}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-400 mb-2">Weaknesses</h4>
                            <ul className="space-y-1 text-sm">
                              {competitor.weaknesses.map((weakness, i) => (
                                <li key={i} className="text-gray-300">• {weakness}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold text-blue-400 mb-2">Market Share</p>
                            <div className="flex items-center gap-2">
                              <Progress value={competitor.marketShare} className="flex-1" />
                              <span className="text-sm font-bold">{competitor.marketShare}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Award className="h-6 w-6 text-yellow-400" />
                    Competitive Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 rounded-lg">
                        <h3 className="font-bold text-yellow-400 mb-2">First-Mover Advantage</h3>
                        <p className="text-sm text-gray-300">Only integrated platform combining AI valuation, blockchain verification, and ESG assessment</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-lg">
                        <h3 className="font-bold text-blue-400 mb-2">Patent Protection</h3>
                        <p className="text-sm text-gray-300">Proprietary algorithms protected by multiple patent applications create barriers to entry</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-600/20 to-green-800/20 rounded-lg">
                        <h3 className="font-bold text-green-400 mb-2">Data Network Effects</h3>
                        <p className="text-sm text-gray-300">Platform becomes more valuable as more data is processed and analyzed</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-lg">
                        <h3 className="font-bold text-purple-400 mb-2">Technology Integration</h3>
                        <p className="text-sm text-gray-300">Seamless integration of multiple advanced technologies in single platform</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">Market Expertise</h3>
                        <p className="text-sm text-gray-300">Deep understanding of Australian property market and regulatory environment</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-cyan-600/20 to-cyan-800/20 rounded-lg">
                        <h3 className="font-bold text-cyan-400 mb-2">Scalable Architecture</h3>
                        <p className="text-sm text-gray-300">Cloud-native platform designed for rapid scaling and global expansion</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="strategic-analysis" className="mt-8">
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-green-400" />
                      SWOT Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-600/20 rounded-lg">
                        <h3 className="font-bold text-green-400 mb-2">Strengths</h3>
                        <ul className="space-y-1 text-sm">
                          {swotAnalysis.strengths.slice(0, 3).map((item, i) => (
                            <li key={i} className="text-gray-300">• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-red-600/20 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">Weaknesses</h3>
                        <ul className="space-y-1 text-sm">
                          {swotAnalysis.weaknesses.slice(0, 2).map((item, i) => (
                            <li key={i} className="text-gray-300">• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-blue-600/20 rounded-lg">
                        <h3 className="font-bold text-blue-400 mb-2">Opportunities</h3>
                        <ul className="space-y-1 text-sm">
                          {swotAnalysis.opportunities.slice(0, 3).map((item, i) => (
                            <li key={i} className="text-gray-300">• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-yellow-600/20 rounded-lg">
                        <h3 className="font-bold text-yellow-400 mb-2">Threats</h3>
                        <ul className="space-y-1 text-sm">
                          {swotAnalysis.threats.slice(0, 2).map((item, i) => (
                            <li key={i} className="text-gray-300">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Star className="h-5 w-5 text-purple-400" />
                      VRIO Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(viroAnalysis).map(([key, value]) => (
                        <div key={key} className="p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold capitalize text-purple-400">{key}</h3>
                            <div className="flex items-center gap-2">
                              <Progress value={value.score * 10} className="w-20" />
                              <span className="text-sm font-bold">{value.score}/10</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300">{value.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-lg">
                      <h3 className="font-bold text-purple-400 mb-2">Strategic Conclusion</h3>
                      <p className="text-sm text-gray-300">
                        Strong VRIO scores indicate sustainable competitive advantage. Platform demonstrates 
                        high value creation, rarity in market, difficulty to imitate, and organized capabilities.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="mt-8">
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                    5-Year Financial Projections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    {Object.entries(financialProjections).map(([year, data], index) => (
                      <div key={year} className="text-center p-4 bg-white/5 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Year {index + 1}</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <p className="text-green-400 font-semibold">Revenue</p>
                            <p className="text-white">{formatCurrency(data.revenue)}</p>
                          </div>
                          <div>
                            <p className="text-red-400 font-semibold">Costs</p>
                            <p className="text-white">{formatCurrency(data.costs)}</p>
                          </div>
                          <div>
                            <p className={`font-semibold ${data.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              Net Profit
                            </p>
                            <p className="text-white">{formatCurrency(data.netProfit)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg text-center">
                      <Calculator className="h-8 w-8 mx-auto mb-2 text-green-400" />
                      <h3 className="text-2xl font-bold text-green-400">3,300%</h3>
                      <p className="text-gray-300">Revenue CAGR</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg text-center">
                      <PieChart className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                      <h3 className="text-2xl font-bold text-blue-400">55%</h3>
                      <p className="text-gray-300">Gross Margin (Year 5)</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg text-center">
                      <Activity className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                      <h3 className="text-2xl font-bold text-purple-400">Break-even</h3>
                      <p className="text-gray-300">Year 2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-yellow-400" />
                    Revenue Streams & Business Model
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-yellow-400">Primary Revenue Streams</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="font-semibold text-green-400">SaaS Subscriptions (60%)</h4>
                          <p className="text-sm text-gray-300 mt-1">Monthly/annual platform access fees</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="font-semibold text-blue-400">Transaction Fees (25%)</h4>
                          <p className="text-sm text-gray-300 mt-1">Commission on property transactions</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="font-semibold text-purple-400">Enterprise Licensing (15%)</h4>
                          <p className="text-sm text-gray-300 mt-1">Corporate API access and integration</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-yellow-400">Key Financial Metrics</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                          <span>Customer Lifetime Value</span>
                          <span className="font-bold text-green-400">$45,000</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                          <span>Customer Acquisition Cost</span>
                          <span className="font-bold text-blue-400">$2,500</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                          <span>Monthly Churn Rate</span>
                          <span className="font-bold text-purple-400">2.1%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                          <span>Gross Revenue Retention</span>
                          <span className="font-bold text-orange-400">95%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="valuation" className="mt-8">
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calculator className="h-6 w-6 text-green-400" />
                    Platform Valuation Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {Object.entries(platformValuation).filter(([key]) => key !== 'total').map(([component, value]) => (
                      <div key={component} className="p-6 bg-white/5 rounded-lg text-center">
                        <h3 className="text-lg font-bold mb-2 capitalize text-cyan-400">
                          {component.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-2xl font-bold text-white">{formatCurrency(value)}</p>
                        <div className="mt-2">
                          <Progress value={(value / platformValuation.total) * 100} className="h-2" />
                          <p className="text-xs text-gray-400 mt-1">
                            {((value / platformValuation.total) * 100).toFixed(1)}% of total
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg text-center">
                    <h3 className="text-3xl font-bold mb-2 text-green-400">Total Platform Valuation</h3>
                    <p className="text-5xl font-bold text-white mb-4">{formatCurrency(platformValuation.total)}</p>
                    <p className="text-lg text-gray-300">
                      Based on DCF analysis, comparable company multiples, and asset-based valuation
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-blue-400" />
                    Valuation Methodologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg">
                      <h3 className="text-xl font-bold mb-4 text-blue-400">DCF Analysis</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">NPV (10% discount)</span>
                          <span className="font-bold">{formatCurrency(385000000)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Terminal Value</span>
                          <span className="font-bold">{formatCurrency(650000000)}</span>
                        </div>
                        <div className="flex justify-between border-t border-white/20 pt-2">
                          <span className="text-blue-400 font-bold">Total DCF</span>
                          <span className="font-bold text-blue-400">{formatCurrency(420000000)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg">
                      <h3 className="text-xl font-bold mb-4 text-green-400">Market Multiples</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Revenue Multiple (8x)</span>
                          <span className="font-bold">{formatCurrency(440000000)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">EBITDA Multiple (25x)</span>
                          <span className="font-bold">{formatCurrency(425000000)}</span>
                        </div>
                        <div className="flex justify-between border-t border-white/20 pt-2">
                          <span className="text-green-400 font-bold">Avg Multiple</span>
                          <span className="font-bold text-green-400">{formatCurrency(432500000)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg">
                      <h3 className="text-xl font-bold mb-4 text-purple-400">Asset-Based</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Tangible Assets</span>
                          <span className="font-bold">{formatCurrency(25000000)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Intangible Assets</span>
                          <span className="font-bold">{formatCurrency(405000000)}</span>
                        </div>
                        <div className="flex justify-between border-t border-white/20 pt-2">
                          <span className="text-purple-400 font-bold">Total Assets</span>
                          <span className="font-bold text-purple-400">{formatCurrency(430000000)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="investment" className="mt-8">
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Rocket className="h-6 w-6 text-yellow-400" />
                    Investment Opportunity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-yellow-400">Funding Requirements</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-green-600/20 to-green-800/20 rounded-lg">
                          <h4 className="font-bold text-green-400">Series A: $25M</h4>
                          <p className="text-sm text-gray-300 mt-1">Market expansion & team scaling</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-lg">
                          <h4 className="font-bold text-blue-400">Series B: $50M</h4>
                          <p className="text-sm text-gray-300 mt-1">International expansion & acquisitions</p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-lg">
                          <h4 className="font-bold text-purple-400">IPO: $100M+</h4>
                          <p className="text-sm text-gray-300 mt-1">Public listing preparation</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-yellow-400">Investor Returns</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                          <span>3-Year IRR</span>
                          <span className="text-2xl font-bold text-green-400">127%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                          <span>5-Year IRR</span>
                          <span className="text-2xl font-bold text-green-400">89%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                          <span>Expected Multiple</span>
                          <span className="text-2xl font-bold text-green-400">12-18x</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                          <span>Exit Timeline</span>
                          <span className="text-lg font-bold text-blue-400">5-7 Years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Users className="h-6 w-6 text-blue-400" />
                    Joint Venture Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg">
                        <h3 className="text-xl font-bold mb-3 text-blue-400">Strategic Partners</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-blue-400" />
                            Major real estate agencies (technology integration)
                          </li>
                          <li className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-blue-400" />
                            Financial institutions (lending integration)
                          </li>
                          <li className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-blue-400" />
                            Government agencies (data partnerships)
                          </li>
                          <li className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-blue-400" />
                            Property management companies
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg">
                        <h3 className="text-xl font-bold mb-3 text-green-400">Partnership Benefits</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-green-400" />
                            Accelerated market penetration
                          </li>
                          <li className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-green-400" />
                            Shared technology development costs
                          </li>
                          <li className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-green-400" />
                            Access to established customer bases
                          </li>
                          <li className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-green-400" />
                            Risk mitigation through collaboration
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-lg">
                      <h3 className="text-xl font-bold mb-4 text-purple-400">Investment Conclusion</h3>
                      <p className="text-lg leading-relaxed text-gray-300">
                        Sustano-Phere™ represents a transformational investment opportunity in the rapidly growing property technology sector. 
                        With our patent-protected technology, first-mover advantage, and experienced team, we are positioned to capture 
                        significant market share and deliver exceptional returns to investors. The convergence of AI, blockchain, and ESG 
                        requirements creates a perfect storm for our platform's success.
                      </p>
                      <div className="mt-6 flex gap-4">
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          Request Investment Pack
                        </Button>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          Schedule Presentation
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400">
          <p className="text-sm">
            This document contains proprietary and confidential information. 
            Unauthorized distribution is prohibited. © 2025 Sustano-Phere™ Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveInvestorAnalysis;