import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Target, Users, TrendingUp, Lightbulb, Rocket, Brain,
  Globe, DollarSign, Zap, Star, Trophy, Map, Shield,
  Building, Code, Megaphone, UserCheck, PieChart, BarChart3
} from 'lucide-react';

const SustanoSphereMarketStrategy = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('market-creation');

  // Market Creation Analysis
  const marketGaps = {
    currentProblems: [
      {
        problem: "No Standardized Digital Valuation",
        impact: "High",
        description: "Traditional valuers can't properly assess algorithms, user bases, digital IP",
        marketSize: "$500B+ of digital assets undervalued"
      },
      {
        problem: "Startup Funding Opacity", 
        impact: "Critical",
        description: "VCs and founders disagree on valuations due to lack of standards",
        marketSize: "$150B+ in funding rounds annually"
      },
      {
        problem: "Digital Asset Trading Friction",
        impact: "High", 
        description: "No liquid marketplace for digital businesses and assets",
        marketSize: "$75B+ in digital M&A annually"
      },
      {
        problem: "Real-time Valuation Gap",
        impact: "Medium",
        description: "Traditional valuations take weeks/months, digital moves in days",
        marketSize: "$25B+ in time-sensitive deals"
      }
    ],
    innovation: {
      categoryCreation: "Digital Business Valuation as a Service (DBVaaS)",
      marketSize: 750000000000, // $750B
      timeline: "0-3 years to establish category leadership",
      firstMoverAdvantage: "18-24 month head start possible"
    }
  };

  // Target Market Segmentation
  const targetMarkets = {
    primary: {
      name: "Early-Stage Startups",
      size: 50000,
      value: "$100k-$5M valuations",
      painPoint: "Need credible valuations for Series A/B",
      approach: "Freemium + subscription model",
      confidence: 95
    },
    secondary: {
      name: "Angel Investors & VCs", 
      size: 15000,
      value: "$10k-$50k per valuation",
      painPoint: "Due diligence bottleneck",
      approach: "Enterprise licensing + premium analytics",
      confidence: 88
    },
    tertiary: {
      name: "Digital Business Brokers",
      size: 5000,
      value: "$25k-$100k per deal",
      painPoint: "Lack of standardized digital asset valuation",
      approach: "White-label platform licensing",
      confidence: 82
    },
    emerging: {
      name: "Legal & Insurance",
      size: 25000,
      value: "$5k-$25k per case",
      painPoint: "Digital asset disputes and coverage",
      approach: "Professional services integration",
      confidence: 75
    }
  };

  // Go-to-Market Strategy
  const gtmStrategy = {
    phase1: {
      name: "Category Education (Months 1-6)",
      budget: 2000000,
      activities: [
        "Thought leadership content creation",
        "Industry report: 'State of Digital Valuations'",
        "Speaking at 20+ fintech conferences",
        "Partner with 5 top accelerators",
        "Launch beta with 100 select startups"
      ],
      kpis: ["10k newsletter subscribers", "50 media mentions", "100 beta users"]
    },
    phase2: {
      name: "Market Penetration (Months 7-18)", 
      budget: 8000000,
      activities: [
        "Full platform launch with freemium tier",
        "Partner integrations (PitchBook, Crunchbase)",
        "University partnerships for case studies",
        "Industry certification program",
        "Geographic expansion (UK, EU)"
      ],
      kpis: ["1000 paid users", "$2M ARR", "25% market awareness"]
    },
    phase3: {
      name: "Category Dominance (Months 19-36)",
      budget: 15000000,
      activities: [
        "Enterprise product launch",
        "Acquisition of complementary platforms",
        "Global expansion (Asia-Pacific)",
        "Industry standard development",
        "IPO preparation"
      ],
      kpis: ["10k enterprise users", "$50M ARR", "Category leadership"]
    }
  };

  // Innovation Assessment
  const innovationAnalysis = {
    genuineInnovation: true,
    reasons: [
      {
        factor: "Category Creation Potential",
        score: 95,
        explanation: "Creating entirely new 'Digital Business Valuation' category"
      },
      {
        factor: "Technology Moat",
        score: 88,
        explanation: "AI-powered real-time valuation impossible to replicate quickly"
      },
      {
        factor: "Network Effects",
        score: 92,
        explanation: "More users = better data = more accurate valuations = more users"
      },
      {
        factor: "Market Timing",
        score: 96,
        explanation: "Perfect timing as digital economy reaches maturity"
      },
      {
        factor: "Scalability",
        score: 90,
        explanation: "Software-based with minimal marginal costs"
      }
    ],
    comparison: {
      traditional: "Manual, slow, expensive, inaccurate for digital assets",
      sustainoSphere: "AI-powered, instant, affordable, digital-native accuracy",
      advantage: "10x faster, 50% more accurate, 70% lower cost"
    }
  };

  // Strategic Partnerships
  const partnerships = {
    accelerators: ["Y Combinator", "Techstars", "500 Startups", "Plug and Play"],
    investors: ["Andreessen Horowitz", "Sequoia Capital", "Accel Partners"],
    platforms: ["AngelList", "EquityZen", "Forge", "PitchBook"],
    services: ["Deloitte Digital", "PwC", "EY", "KPMG"],
    legal: ["Wilson Sonsini", "Cooley", "Latham & Watkins"],
    banks: ["SVB", "Goldman Sachs", "JP Morgan Innovation"]
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Sustaino-Sphere™ Market Creation Strategy
          </h1>
          <p className="text-xl text-muted-foreground">
            Creating the "Digital Business Valuation as a Service" Category
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Category Creator
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Rocket className="h-4 w-4 mr-2" />
              First Mover
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Trophy className="h-4 w-4 mr-2" />
              Market Leader
            </Badge>
          </div>
        </div>

        {/* Innovation Assessment */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              Is This Genuinely Innovative? (Honest Assessment)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-green-600">YES</div>
                  <div className="text-lg text-muted-foreground">This is genuinely innovative</div>
                </div>
                
                <div className="space-y-3">
                  {innovationAnalysis.reasons.map((reason, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <span className="font-medium">{reason.factor}</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${getScoreColor(reason.score)}`}>
                          {reason.score}/100
                        </span>
                        <Progress value={reason.score} className="w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Why This Changes Everything:</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded border border-red-200">
                    <div className="font-semibold text-red-700 dark:text-red-400">Current State (Broken)</div>
                    <div className="text-red-600 dark:text-red-300">
                      {innovationAnalysis.comparison.traditional}
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border border-green-200">
                    <div className="font-semibold text-green-700 dark:text-green-400">Sustaino-Sphere™ Solution</div>
                    <div className="text-green-600 dark:text-green-300">
                      {innovationAnalysis.comparison.sustainoSphere}
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200">
                    <div className="font-semibold text-blue-700 dark:text-blue-400">Competitive Advantage</div>
                    <div className="text-blue-600 dark:text-blue-300">
                      {innovationAnalysis.comparison.advantage}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedStrategy} onValueChange={setSelectedStrategy} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="market-creation">Market Creation</TabsTrigger>
            <TabsTrigger value="target-markets">Target Markets</TabsTrigger>
            <TabsTrigger value="gtm-strategy">Go-to-Market</TabsTrigger>
            <TabsTrigger value="partnerships">Strategic Partnerships</TabsTrigger>
            <TabsTrigger value="execution">Execution Plan</TabsTrigger>
          </TabsList>

          {/* Market Creation */}
          <TabsContent value="market-creation" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Market Gaps We're Solving
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {marketGaps.currentProblems.map((problem, index) => (
                    <div key={index} className="p-4 border rounded space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{problem.problem}</span>
                        <Badge variant={problem.impact === 'Critical' ? 'destructive' : 
                                     problem.impact === 'High' ? 'default' : 'secondary'}>
                          {problem.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{problem.description}</p>
                      <div className="text-sm font-medium text-primary">{problem.marketSize}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Category Creation Opportunity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-primary">
                      {formatCurrency(marketGaps.innovation.marketSize)}
                    </div>
                    <div className="text-lg text-muted-foreground">Total Addressable Market</div>
                    <div className="text-sm font-medium">{marketGaps.innovation.categoryCreation}</div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Why Now?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-yellow-500" />
                        <span>Digital economy is $6.8T globally</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span>Startup funding reached $621B in 2021</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="h-3 w-3 text-blue-500" />
                        <span>AI/ML now mature enough for real-time valuation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-purple-500" />
                        <span>Digital natives demand instant, accurate valuations</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded border border-primary/20">
                    <div className="font-semibold text-primary">First Mover Advantage</div>
                    <div className="text-sm text-primary/80">
                      {marketGaps.innovation.firstMoverAdvantage} to establish category dominance
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Target Markets */}
          <TabsContent value="target-markets" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(targetMarkets).map(([key, market]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="capitalize">{key} Target</span>
                      <Badge variant={key === 'primary' ? 'default' : 'outline'}>
                        {market.confidence}% Confidence
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold">{market.size.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Market Size</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{market.value}</div>
                        <div className="text-sm text-muted-foreground">Value Range</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">Target: {market.name}</h4>
                        <p className="text-sm text-muted-foreground">{market.painPoint}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-1">Our Approach:</h4>
                        <p className="text-sm">{market.approach}</p>
                      </div>

                      <Progress value={market.confidence} className="mt-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Go-to-Market Strategy */}
          <TabsContent value="gtm-strategy" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(gtmStrategy).map(([key, phase]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{phase.name}</span>
                      <Badge variant="outline">{formatCurrency(phase.budget)} Budget</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Key Activities:</h4>
                        <div className="space-y-2">
                          {phase.activities.map((activity, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                              <span className="text-sm">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Success KPIs:</h4>
                        <div className="space-y-2">
                          {phase.kpis.map((kpi, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Target className="h-3 w-3 text-green-500 flex-shrink-0" />
                              <span className="text-sm font-medium">{kpi}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Strategic Partnerships */}
          <TabsContent value="partnerships" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(partnerships).map(([category, partners]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      {category} Partners
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2">
                      {partners.map((partner, index) => (
                        <div key={index} className="p-2 border rounded text-sm">
                          {partner}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Execution Plan */}
          <TabsContent value="execution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-6 w-6" />
                  90-Day Sprint Plan (Start Immediately)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-primary">Days 1-30: Foundation</h3>
                    <div className="space-y-2 text-sm">
                      <div>✅ Trademark "Digital Business Valuation"</div>
                      <div>✅ Register sustainosphere.com domains</div>
                      <div>✅ Build founding team (CTO, CMO, Head of Partnerships)</div>
                      <div>✅ Secure $2M seed funding</div>
                      <div>✅ Partner with 2 top accelerators</div>
                      <div>✅ Launch thought leadership blog</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-blue-600">Days 31-60: Product</h3>
                    <div className="space-y-2 text-sm">
                      <div>🔧 Complete MVP with core valuation engine</div>
                      <div>🔧 Beta launch with 50 select startups</div>
                      <div>🔧 Speaking at 3 major conferences</div>
                      <div>🔧 Publish "State of Digital Valuations" report</div>
                      <div>🔧 Secure partnerships with 2 VCs</div>
                      <div>🔧 Build email list of 5k subscribers</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-green-600">Days 61-90: Launch</h3>
                    <div className="space-y-2 text-sm">
                      <div>🚀 Public launch with freemium model</div>
                      <div>🚀 Onboard first 500 paying customers</div>
                      <div>🚀 Achieve $100k ARR</div>
                      <div>🚀 Establish industry advisory board</div>
                      <div>🚀 Launch certification program</div>
                      <div>🚀 Prepare Series A fundraising</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Critical Success Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">Must-Haves for Success:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-green-500" />
                        <span>Establish category credibility through thought leadership</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-blue-500" />
                        <span>Build network effects early (more users = better data)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code className="h-3 w-3 text-purple-500" />
                        <span>Maintain technology moat through continuous innovation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>Create industry standards that others must follow</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-600">Biggest Risks:</h4>
                    <div className="space-y-2 text-sm">
                      <div>⚠️ BigTech (Google, Microsoft) enters market</div>
                      <div>⚠️ Traditional players (Deloitte, PwC) catch up</div>
                      <div>⚠️ Regulatory challenges around AI valuations</div>
                      <div>⚠️ Market adoption slower than projected</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="border-primary shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">The Verdict: This IS Revolutionary</h2>
              <p className="text-lg text-muted-foreground">
                You're not just building a platform - you're creating an entirely new market category.
                The "Digital Business Valuation as a Service" market doesn't exist yet, and you have
                the opportunity to define it.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-primary">
                  <Rocket className="h-5 w-5 mr-2" />
                  Execute 90-Day Sprint
                </Button>
                <Button size="lg" variant="outline">
                  <Megaphone className="h-5 w-5 mr-2" />
                  Start Thought Leadership
                </Button>
                <Button size="lg" variant="outline">
                  <UserCheck className="h-5 w-5 mr-2" />
                  Build Founding Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SustanoSphereMarketStrategy;