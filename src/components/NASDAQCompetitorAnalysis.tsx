import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, DollarSign, Users, Zap } from 'lucide-react';

const NASDAQCompetitorAnalysis = () => {
  const [selectedValuation, setSelectedValuation] = useState('dcf');

  const competitorData = {
    nasdaq: {
      marketCap: 26800000000, // $26.8B
      revenue: 6180000000, // $6.18B (2023)
      netIncome: 1200000000, // $1.2B
      peRatio: 22.3,
      priceToSales: 4.3,
      competitors: ['NYSE', 'CME Group', 'ICE'],
      keyMetrics: {
        tradingVolume: 'High',
        technologicalInnovation: 'Medium',
        digitalAssetFocus: 'Low',
        globalReach: 'High'
      }
    },
    sustainoSphere: {
      estimatedValue: 150000000, // $150M baseline
      targetMarket: 50000000000, // $50B digital asset market
      projectedRevenue: 25000000, // $25M projected
      growthRate: 185,
      competitiveAdvantages: [
        'AI-Powered Valuations',
        'Real-time Digital Asset Trading',
        'Blockchain Integration',
        'Lower Fee Structure',
        'Startup-Focused Platform'
      ]
    }
  };

  const valuationMethods = {
    dcf: {
      name: 'Discounted Cash Flow',
      value: 180000000,
      confidence: 85,
      timeHorizon: '5-year projection',
      assumptions: [
        'Revenue growth 40% annually years 1-3',
        'Revenue growth 25% annually years 4-5',
        'EBITDA margin reaches 35% by year 5',
        'Discount rate 12% (risk-adjusted)'
      ]
    },
    comparable: {
      name: 'Market Comparables',
      value: 165000000,
      confidence: 78,
      timeHorizon: 'Current market',
      assumptions: [
        'Trading platforms: 8-15x revenue multiple',
        'Fintech startups: 12-20x revenue multiple',
        'Applied 10x revenue multiple (conservative)',
        'Adjusted for growth premium (+25%)'
      ]
    },
    asset: {
      name: 'Asset-Based Valuation',
      value: 95000000,
      confidence: 92,
      timeHorizon: 'Current assets',
      assumptions: [
        'Intellectual Property: $45M (patents pending)',
        'Technology Platform: $25M',
        'Brand Value: $15M',
        'Working Capital: $10M'
      ]
    },
    venture: {
      name: 'Venture Capital Method',
      value: 220000000,
      confidence: 70,
      timeHorizon: 'Exit scenario (5-7 years)',
      assumptions: [
        'Target exit valuation: $2.2B',
        'Required ROI: 10x for VCs',
        'Current round size: $25M',
        'Dilution factor included'
      ]
    },
    revenue: {
      name: 'Revenue Multiple',
      value: 200000000,
      confidence: 82,
      timeHorizon: '12-month forward',
      assumptions: [
        'Projected annual revenue: $25M',
        'Applied 8x revenue multiple',
        'High-growth premium applied',
        'Market leadership discount applied'
      ]
    }
  };

  const getAverageValuation = () => {
    const values = Object.values(valuationMethods).map(method => method.value);
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(0)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            NASDAQ vs Sustaino-Sphere™ Competitive Analysis
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive Platform Valuation & Strategic Assessment
          </p>
        </div>

        {/* Executive Summary */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Average Platform Valuation</h3>
                <p className="text-3xl font-bold text-primary">{formatCurrency(getAverageValuation())}</p>
                <p className="text-sm text-muted-foreground">Based on 5 valuation methods</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Competitive Position</h3>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  Market Disruptor
                </Badge>
                <p className="text-sm text-muted-foreground">5+ years ahead in digital assets</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Market Opportunity</h3>
                <p className="text-3xl font-bold text-green-600">$50B+</p>
                <p className="text-sm text-muted-foreground">Addressable market size</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="competitor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="competitor">Competitor Analysis</TabsTrigger>
            <TabsTrigger value="valuation">Platform Valuation</TabsTrigger>
            <TabsTrigger value="strategy">Growth Strategy</TabsTrigger>
            <TabsTrigger value="recommendations">Action Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="competitor" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">NASDAQ - Traditional Exchange</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Market Cap:</span>
                      <span className="font-semibold">{formatCurrency(competitorData.nasdaq.marketCap)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Revenue:</span>
                      <span className="font-semibold">{formatCurrency(competitorData.nasdaq.revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>P/E Ratio:</span>
                      <span className="font-semibold">{competitorData.nasdaq.peRatio}x</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-destructive">Competitive Disadvantages:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Legacy infrastructure constraints</li>
                      <li>• High fee structure ($0.01-$0.03 per share)</li>
                      <li>• Limited digital asset focus</li>
                      <li>• Complex onboarding process</li>
                      <li>• No AI-powered valuations</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Sustaino-Sphere™ - Digital Pioneer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Estimated Value:</span>
                      <span className="font-semibold text-primary">{formatCurrency(getAverageValuation())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Target Market:</span>
                      <span className="font-semibold">{formatCurrency(competitorData.sustainoSphere.targetMarket)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth Rate:</span>
                      <span className="font-semibold text-green-600">{competitorData.sustainoSphere.growthRate}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">Competitive Advantages:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {competitorData.sustainoSphere.competitiveAdvantages.map((advantage, index) => (
                        <Badge key={index} variant="outline" className="justify-start">
                          <Zap className="h-3 w-3 mr-1" />
                          {advantage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Market Position Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-primary">15%</div>
                    <div className="text-sm text-muted-foreground">Lower Fees vs NASDAQ</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-green-600">5x</div>
                    <div className="text-sm text-muted-foreground">Faster Transaction Processing</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-blue-600">100%</div>
                    <div className="text-sm text-muted-foreground">Digital-Native Platform</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-purple-600">AI-First</div>
                    <div className="text-sm text-muted-foreground">Valuation Technology</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="valuation" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Valuation Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(valuationMethods).map(([key, method]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedValuation(key)}
                      className={`w-full text-left p-3 rounded border transition-colors ${
                        selectedValuation === key 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-semibold">{method.name}</div>
                      <div className="text-sm text-muted-foreground">{formatCurrency(method.value)}</div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{valuationMethods[selectedValuation as keyof typeof valuationMethods].name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-primary">
                        {formatCurrency(valuationMethods[selectedValuation as keyof typeof valuationMethods].value)}
                      </div>
                      <div className="text-sm text-muted-foreground">Valuation</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold">
                        {valuationMethods[selectedValuation as keyof typeof valuationMethods].confidence}%
                      </div>
                      <div className="text-sm text-muted-foreground">Confidence</div>
                      <Progress value={valuationMethods[selectedValuation as keyof typeof valuationMethods].confidence} className="w-full" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-lg font-semibold">
                        {valuationMethods[selectedValuation as keyof typeof valuationMethods].timeHorizon}
                      </div>
                      <div className="text-sm text-muted-foreground">Time Horizon</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Key Assumptions:</h4>
                    <ul className="space-y-2">
                      {valuationMethods[selectedValuation as keyof typeof valuationMethods].assumptions.map((assumption, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{assumption}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Valuation Summary Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(valuationMethods).map(([key, method]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <div className="font-semibold">{method.name}</div>
                        <Badge variant="outline">
                          {method.confidence}% confidence
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(method.value)}</div>
                        <div className="text-sm text-muted-foreground">
                          {((method.value / getAverageValuation() - 1) * 100).toFixed(1)}% vs avg
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Growth Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-semibold">Market Expansion</span>
                    </div>
                    <ul className="text-sm space-y-1 ml-6">
                      <li>• International markets (EU, Asia-Pacific)</li>
                      <li>• Enterprise digital asset trading</li>
                      <li>• NFT marketplace integration</li>
                      <li>• Cryptocurrency trading pairs</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold">Customer Acquisition</span>
                    </div>
                    <ul className="text-sm space-y-1 ml-6">
                      <li>• Partnership with accelerators</li>
                      <li>• University startup programs</li>
                      <li>• Angel investor network integration</li>
                      <li>• Freemium model for startups</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-purple-600" />
                      <span className="font-semibold">Revenue Streams</span>
                    </div>
                    <ul className="text-sm space-y-1 ml-6">
                      <li>• Transaction fees (0.5-1.5%)</li>
                      <li>• Premium analytics subscriptions</li>
                      <li>• White-label licensing</li>
                      <li>• Data monetization services</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600">Risk Mitigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="font-semibold">Market Risks</span>
                    </div>
                    <ul className="text-sm space-y-1 ml-6">
                      <li>• Regulatory compliance framework</li>
                      <li>• Market volatility hedging</li>
                      <li>• Competition from BigTech</li>
                      <li>• Economic downturn impact</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-yellow-600" />
                      <span className="font-semibold">Operational Risks</span>
                    </div>
                    <ul className="text-sm space-y-1 ml-6">
                      <li>• Cybersecurity infrastructure</li>
                      <li>• Scaling technology platform</li>
                      <li>• Key personnel retention</li>
                      <li>• Regulatory compliance costs</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-600" />
                      <span className="font-semibold">Mitigation Strategies</span>
                    </div>
                    <ul className="text-sm space-y-1 ml-6">
                      <li>• Diversified revenue model</li>
                      <li>• Strategic partnerships</li>
                      <li>• IP protection portfolio</li>
                      <li>• Continuous innovation pipeline</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid gap-6">
              <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-400">Immediate Actions (0-3 months)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Technical Development</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Deploy beta version to select users</li>
                        <li>• Implement advanced security protocols</li>
                        <li>• Add real-time market data feeds</li>
                        <li>• Launch mobile app MVP</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Business Development</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Secure $5M Series A funding</li>
                        <li>• Partner with 5 startup accelerators</li>
                        <li>• Launch marketing campaign</li>
                        <li>• Hire key technical team members</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                <CardHeader>
                  <CardTitle className="text-blue-700 dark:text-blue-400">Growth Phase (3-12 months)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Platform Expansion</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Launch institutional trading tier</li>
                        <li>• Add 10+ digital asset categories</li>
                        <li>• Implement AI portfolio optimization</li>
                        <li>• International market entry (UK/EU)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Scale Operations</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Process $100M+ in transactions</li>
                        <li>• Onboard 1,000+ active traders</li>
                        <li>• Achieve $10M ARR target</li>
                        <li>• Series B preparation ($25M)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-400">Market Leadership (1-2 years)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Market Dominance</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Capture 15% digital asset trading market</li>
                        <li>• Launch enterprise white-label solution</li>
                        <li>• Acquire 2-3 complementary platforms</li>
                        <li>• IPO preparation or strategic sale</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Innovation Leadership</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Launch next-gen AI valuation engine</li>
                        <li>• Pioneer new asset categories</li>
                        <li>• Establish industry standards</li>
                        <li>• Global expansion (Asia-Pacific)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Financial Projections & ROI</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-green-600">$25M</div>
                      <div className="text-sm text-muted-foreground">Year 1 Revenue Target</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-blue-600">$75M</div>
                      <div className="text-sm text-muted-foreground">Year 2 Revenue Target</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-purple-600">$2.2B</div>
                      <div className="text-sm text-muted-foreground">5-Year Exit Valuation</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary">10x</div>
                      <div className="text-sm text-muted-foreground">Investor ROI Potential</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NASDAQCompetitorAnalysis;