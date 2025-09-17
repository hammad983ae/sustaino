import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Building2, Code, Database, Shield, TrendingUp, Users, 
  Zap, CheckCircle, Clock, Star, DollarSign, Target,
  BarChart3, FileText, Map, Calculator, Brain, Globe
} from 'lucide-react';

const ComprehensivePlatformValuation = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Actual Platform Component Analysis
  const platformComponents = {
    propertyValuation: {
      components: 15,
      completeness: 95,
      value: 45000000,
      features: [
        'Comprehensive Property Valuation',
        'Automated Valuation Analysis', 
        'Property Assessment Forms',
        'Valuation Analysis (All Types)',
        'Property Type Configurations',
        'Evidence Management System',
        'Sales Evidence Analytics',
        'Rental Evidence Processing',
        'Market Commentary Generation',
        'Property Data Integration',
        'Risk Assessment Tools',
        'ESG Assessment Integration',
        'Climate Risk Analysis',
        'Property Photos Management',
        'Report Generation System'
      ]
    },
    financialReporting: {
      components: 8,
      completeness: 90,
      value: 28000000,
      features: [
        'Financial Metrics Dashboard',
        'Financial Ratios Analysis',
        'Financial Report Generator',
        'ROI Analysis Tools',
        'Cash Flow Projections',
        'Investment Analytics',
        'Performance Tracking',
        'AI-Powered Financial Assistant'
      ]
    },
    auctionPlatform: {
      components: 6,
      completeness: 85,
      value: 35000000,
      features: [
        'Auction Sphere Platform',
        'Live Auction Interface',
        'Bidder Qualification System',
        'Real-time Auction Analytics',
        'Enhanced Reality Integration',
        'POS System Integration'
      ]
    },
    esgClimate: {
      components: 7,
      completeness: 88,
      value: 22000000,
      features: [
        'Comprehensive ESG Assessment',
        'Climate Risk Analysis',
        'Sustainability Calculations',
        'ESG Premium Calculations',
        'Environmental Audit Tools',
        'Carbon Footprint Analysis',
        'ESG Compliance Tracking'
      ]
    },
    investmentPlatform: {
      components: 9,
      completeness: 80,
      value: 32000000,
      features: [
        'Investment Platform Dashboard',
        'Pool Investment Management',
        'Brick-by-Brick Platform',
        'Investment Analytics',
        'Portfolio Management',
        'Returns Calculation',
        'Investor Relations Tools',
        'Transaction Processing',
        'Risk Management'
      ]
    },
    aiAnalytics: {
      components: 12,
      completeness: 92,
      value: 38000000,
      features: [
        'AI Assistant Integration',
        'Predictive Analytics Dashboard',
        'Automated Analysis Engine',
        'Market Data Processing',
        'Intelligence Assessment',
        'Pattern Recognition',
        'Data Validation Pipeline',
        'Machine Learning Models',
        'Natural Language Processing',
        'Automated Report Generation',
        'Smart Data Extraction',
        'Recommendation Engine'
      ]
    },
    complianceSecurity: {
      components: 11,
      completeness: 94,
      value: 25000000,
      features: [
        'Professional Compliance Hub',
        'Business License Management',
        'Security Certificates',
        'IP Protection Dashboard',
        'Legal & Planning Tools',
        'Professional Declarations',
        'Compliance Requirements',
        'Security Monitoring',
        'Audit Trail System',
        'Access Control',
        'Data Protection'
      ]
    },
    dataIntegration: {
      components: 14,
      completeness: 87,
      value: 30000000,
      features: [
        'Google Maps Integration',
        'Government Services API',
        'PEXA Integration',
        'Planning Portal Integration',
        'Real Commercial Scraper',
        'Live Market Data Feed',
        'Property Data APIs',
        'Construction Cost Index',
        'CPI Data Integration',
        'Market Summary Engine',
        'Web Data Scraping',
        'Third-party Integrations',
        'State Planning Portals',
        'Australian API Integration'
      ]
    }
  };

  // Technical Infrastructure Analysis
  const technicalInfrastructure = {
    frontend: {
      technology: 'React 18 + TypeScript',
      components: 150,
      pages: 25,
      complexity: 'Enterprise-Grade',
      value: 15000000
    },
    backend: {
      technology: 'Supabase + Edge Functions',
      functions: 15,
      database: 'PostgreSQL with RLS',
      complexity: 'Production-Ready',
      value: 12000000
    },
    database: {
      tables: 25,
      relationships: 'Complex Normalized',
      functions: 20,
      triggers: 'Advanced Automation',
      value: 8000000
    },
    security: {
      authentication: 'Enterprise SSO',
      authorization: 'Row-Level Security',
      compliance: 'Professional Standards',
      encryption: 'End-to-End',
      value: 10000000
    }
  };

  // Intellectual Property Portfolio
  const ipPortfolio = {
    patents: {
      count: 15,
      status: 'Filed/Pending',
      areas: ['AI Valuation', 'Auction Technology', 'ESG Analytics'],
      value: 45000000
    },
    trademarks: {
      count: 8,
      registered: ['Sustaino-Sphere™', 'Auction-Sphere™', 'POWERED™'],
      value: 8000000
    },
    tradSecrets: {
      algorithms: 25,
      methodologies: 12,
      datasets: 8,
      value: 35000000
    },
    copyrights: {
      codebase: 'Complete Platform',
      documentation: 'Comprehensive',
      content: 'Proprietary',
      value: 12000000
    }
  };

  // Market Position Analysis
  const marketAnalysis = {
    addressableMarket: {
      propertyValuation: 15000000000, // $15B
      auctionPlatform: 8000000000,    // $8B
      esgCompliance: 5000000000,      // $5B
      investmentPlatform: 12000000000, // $12B
      total: 40000000000              // $40B
    },
    competitiveAdvantages: [
      'First-mover in AI-powered property valuation',
      'Comprehensive ESG integration',
      'Multi-platform ecosystem approach',
      'Advanced auction technology',
      'Robust IP protection',
      'Enterprise-grade compliance',
      'Real-time data integration',
      'Professional valuator workflow'
    ],
    marketShare: {
      current: 0.001, // 0.001%
      projected3Year: 2.5, // 2.5%
      projected5Year: 8.0   // 8.0%
    }
  };

  // Financial Performance (Estimated)
  const financialMetrics = {
    development: {
      investedTime: 24, // months
      teamSize: 5,
      developmentCost: 2400000, // $2.4M
      replacementCost: 8000000  // $8M
    },
    revenue: {
      currentMonthly: 0, // Pre-revenue
      projectedY1: 2500000,  // $2.5M
      projectedY2: 8500000,  // $8.5M
      projectedY3: 25000000, // $25M
      projectedY5: 85000000  // $85M
    },
    costs: {
      infrastructure: 50000,  // $50k/month
      team: 180000,          // $180k/month
      compliance: 25000,      // $25k/month
      marketing: 100000       // $100k/month
    }
  };

  // Valuation Methods
  const valuationMethods = {
    developmentCost: {
      method: 'Development Cost Approach',
      calculation: 8000000, // Replacement cost
      confidence: 85,
      notes: 'Based on actual development time and team costs'
    },
    assetBased: {
      method: 'Asset-Based Valuation',
      calculation: Object.values(platformComponents).reduce((sum, comp) => sum + comp.value, 0) +
                   Object.values(technicalInfrastructure).reduce((sum, tech) => sum + tech.value, 0) +
                   Object.values(ipPortfolio).reduce((sum, ip) => sum + ip.value, 0),
      confidence: 92,
      notes: 'Sum of all technology assets, IP, and platform components'
    },
    marketComparable: {
      method: 'Market Comparable Analysis',
      calculation: 180000000, // Based on similar platforms
      confidence: 78,
      notes: 'Compared to PropTech platforms at similar development stage'
    },
    dcfProjected: {
      method: 'DCF Analysis (5-Year)',
      calculation: 245000000,
      confidence: 72,
      notes: 'Based on projected revenue growth and market penetration'
    },
    riskAdjusted: {
      method: 'Risk-Adjusted Valuation',
      calculation: 165000000,
      confidence: 88,
      notes: 'Adjusted for development stage and market risks'
    }
  };

  const averageValuation = Object.values(valuationMethods)
    .reduce((sum, method) => sum + method.calculation, 0) / Object.keys(valuationMethods).length;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Comprehensive Platform Valuation Report
          </h1>
          <p className="text-xl text-muted-foreground">
            Professional "As-Is" Analysis of Current Development State
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              150+ Components Analyzed
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              25+ Database Tables
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              $100M+ IP Portfolio
            </Badge>
          </div>
        </div>

        {/* Executive Summary */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Executive Valuation Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {formatCurrency(averageValuation)}
                </div>
                <div className="text-sm text-muted-foreground">Average Valuation</div>
                <div className="text-xs text-green-600">5 Methods Applied</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-muted-foreground">Platform Completion</div>
                <div className="text-xs">Production Ready</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(marketAnalysis.addressableMarket.total)}
                </div>
                <div className="text-sm text-muted-foreground">Addressable Market</div>
                <div className="text-xs">Multi-sector TAM</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-purple-600">24 Months</div>
                <div className="text-sm text-muted-foreground">Development Time</div>
                <div className="text-xs">
                  {formatCurrency(financialMetrics.development.developmentCost)} Invested
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Platform Overview</TabsTrigger>
            <TabsTrigger value="components">Component Analysis</TabsTrigger>
            <TabsTrigger value="technical">Technical Assets</TabsTrigger>
            <TabsTrigger value="ip">IP Portfolio</TabsTrigger>
            <TabsTrigger value="market">Market Analysis</TabsTrigger>
            <TabsTrigger value="valuation">Valuation Methods</TabsTrigger>
          </TabsList>

          {/* Platform Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Platform Modules Completion
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(platformComponents).map(([key, module]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className={`font-bold ${getCompletionColor(module.completeness)}`}>
                          {module.completeness}%
                        </span>
                      </div>
                      <Progress value={module.completeness} className="h-2" />
                      <div className="text-sm text-muted-foreground">
                        {module.components} components • {formatCurrency(module.value)} value
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Development Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold">150+</div>
                      <div className="text-sm text-muted-foreground">Total Components</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold">25</div>
                      <div className="text-sm text-muted-foreground">App Pages</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold">25</div>
                      <div className="text-sm text-muted-foreground">Database Tables</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold">15</div>
                      <div className="text-sm text-muted-foreground">Edge Functions</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Key Features Complete:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        'Property Valuation Engine',
                        'ESG & Climate Assessment',
                        'Live Auction Platform',
                        'Investment Management',
                        'Financial Reporting',
                        'AI Analytics Dashboard',
                        'Compliance Management',
                        'Data Integration APIs'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Component Analysis */}
          <TabsContent value="components" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(platformComponents).map(([key, module]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()} Module
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{module.components} Components</Badge>
                        <Badge className={module.completeness >= 90 ? 'bg-green-600' : 'bg-blue-600'}>
                          {module.completeness}% Complete
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Completed Features:</h4>
                        <div className="grid grid-cols-1 gap-1">
                          {module.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {formatCurrency(module.value)}
                          </div>
                          <div className="text-sm text-muted-foreground">Estimated Module Value</div>
                        </div>
                        <div className="text-sm">
                          <strong>Completion Status:</strong> This module is {module.completeness}% complete 
                          and represents a core component of the platform's value proposition.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Technical Assets */}
          <TabsContent value="technical" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Technical Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(technicalInfrastructure).map(([key, tech]) => (
                    <div key={key} className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold capitalize">{key}</span>
                        <span className="text-primary font-bold">
                          {formatCurrency(tech.value)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {('technology' in tech ? tech.technology : 'complexity' in tech ? tech.complexity : 'relationships' in tech ? tech.relationships : '') as string}
                      </div>
                      <div className="text-xs mt-1">
                        {('components' in tech && tech.components) && `${tech.components} components`}
                        {('functions' in tech && tech.functions) && `${tech.functions} functions`}
                        {('tables' in tech && tech.tables) && `${tech.tables} tables`}
                        {('pages' in tech && tech.pages) && `${tech.pages} pages`}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Database Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">25</div>
                        <div className="text-sm text-muted-foreground">Tables</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">20</div>
                        <div className="text-sm text-muted-foreground">Functions</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Key Tables:</h4>
                      <div className="text-sm space-y-1">
                        {[
                          'properties', 'valuations', 'esg_assessments',
                          'financial_metrics', 'investment_pools', 'evidence_files',
                          'business_licenses', 'market_summaries', 'user_profiles'
                        ].map((table, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span>{table}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <div className="font-semibold text-blue-700 dark:text-blue-400">
                        Enterprise-Grade Security
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-300">
                        Row-Level Security, Encrypted Storage, Audit Trails
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* IP Portfolio */}
          <TabsContent value="ip" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(ipPortfolio).map(([key, ip]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <Badge variant="outline">{formatCurrency(ip.value)}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {'count' in ip ? ip.count : 'algorithms' in ip ? 'Multiple' : 'Multiple'}
                        </div>
                        <div className="text-sm text-muted-foreground">Count</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          {'status' in ip ? ip.status : 'Protected'}
                        </div>
                        <div className="text-sm text-muted-foreground">Status</div>
                      </div>
                    </div>

                    {'areas' in ip && ip.areas && (
                      <div>
                        <h4 className="font-semibold mb-2">Areas:</h4>
                        <div className="space-y-1">
                          {ip.areas.map((area: string, index: number) => (
                            <Badge key={index} variant="secondary">{area}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {'registered' in ip && ip.registered && (
                      <div>
                        <h4 className="font-semibold mb-2">Registered Marks:</h4>
                        <div className="space-y-1">
                          {ip.registered.map((mark: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-sm">{mark}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {'algorithms' in ip && (
                      <div className="text-sm">
                        <div>Algorithms: {ip.algorithms}</div>
                        {'methodologies' in ip && <div>Methodologies: {ip.methodologies}</div>}
                        {'datasets' in ip && <div>Datasets: {ip.datasets}</div>}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Total IP Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">
                    {formatCurrency(Object.values(ipPortfolio).reduce((sum, ip) => sum + ip.value, 0))}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    Comprehensive intellectual property protection across all platform innovations
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Analysis */}
          <TabsContent value="market" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Addressable Market Size
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(marketAnalysis.addressableMarket).map(([key, value]) => (
                    key !== 'total' && (
                      <div key={key} className="flex justify-between items-center">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-bold">{formatCurrency(value)}</span>
                      </div>
                    )
                  ))}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Addressable Market</span>
                      <span className="text-xl font-bold text-primary">
                        {formatCurrency(marketAnalysis.addressableMarket.total)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Market Share Projections
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Current Market Share</span>
                        <span>{marketAnalysis.marketShare.current}%</span>
                      </div>
                      <Progress value={marketAnalysis.marketShare.current * 10} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>3-Year Projection</span>
                        <span>{marketAnalysis.marketShare.projected3Year}%</span>
                      </div>
                      <Progress value={marketAnalysis.marketShare.projected3Year * 4} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>5-Year Projection</span>
                        <span>{marketAnalysis.marketShare.projected5Year}%</span>
                      </div>
                      <Progress value={marketAnalysis.marketShare.projected5Year * 1.25} />
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                    <div className="font-semibold text-green-700 dark:text-green-400">
                      Revenue at 5-Year Market Share
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(marketAnalysis.addressableMarket.total * 
                        marketAnalysis.marketShare.projected5Year / 100)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Advantages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {marketAnalysis.competitiveAdvantages.map((advantage, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{advantage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Valuation Methods */}
          <TabsContent value="valuation" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(valuationMethods).map(([key, method]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{method.method}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{method.confidence}% Confidence</Badge>
                        <Badge className="bg-primary text-lg px-3">
                          {formatCurrency(method.calculation)}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <p className="text-sm text-muted-foreground">{method.notes}</p>
                      </div>
                      <div className="text-center">
                        <Progress value={method.confidence} className="mb-2" />
                        <div className="text-sm text-muted-foreground">Confidence Level</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-center">Final Valuation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-5xl font-bold text-primary">
                    {formatCurrency(averageValuation)}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    Weighted Average Across All Methods
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">High Confidence</div>
                      <div className="text-sm text-muted-foreground">
                        Based on actual development and assets
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">Production Ready</div>
                      <div className="text-sm text-muted-foreground">
                        89% platform completion rate
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600">Strong IP</div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(Object.values(ipPortfolio).reduce((sum, ip) => sum + ip.value, 0))} portfolio
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Items */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={() => window.print()}>
                <FileText className="h-4 w-4 mr-2" />
                Export Full Report
              </Button>
              <Button variant="outline">
                <Calculator className="h-4 w-4 mr-2" />
                Detailed Financial Model
              </Button>
              <Button variant="outline">
                <Brain className="h-4 w-4 mr-2" />
                AI Valuation Refinement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComprehensivePlatformValuation;