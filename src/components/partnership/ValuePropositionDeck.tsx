import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Presentation, TrendingUp, Target, Users, Building, Award,
  Rocket, DollarSign, Shield, Globe, Zap, Star
} from 'lucide-react';

const ValuePropositionDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Partnership Opportunity",
      subtitle: "Create the Digital Business Valuation Market Together",
      content: {
        highlight: "$750B Market Opportunity",
        points: [
          "First comprehensive digital asset valuation platform",
          "Category creation with 18-24 month first-mover advantage", 
          "Built entirely on Lovable platform",
          "Perfect enterprise showcase for Lovable capabilities"
        ]
      },
      visual: "🎯"
    },
    {
      title: "Market Opportunity",
      subtitle: "Creating an Entirely New Category",
      content: {
        highlight: "Digital Business Valuation as a Service",
        points: [
          "$750B+ Total Addressable Market",
          "Zero direct competitors in exact space",
          "Similar to Salesforce creating CRM category",
          "First-mover advantage window closing in 18-24 months"
        ]
      },
      visual: "📈"
    },
    {
      title: "Sustaino-Sphere™ Platform",
      subtitle: "Revolutionary Digital Asset Intelligence",
      content: {
        highlight: "The NASDAQ for Digital Businesses",
        points: [
          "AI-powered valuation algorithm (patent pending)",
          "Live trading marketplace for digital assets",
          "Comprehensive ESG and risk assessment",
          "Professional-grade reporting and analytics"
        ]
      },
      visual: "🚀"
    },
    {
      title: "Lovable's Strategic Value",
      subtitle: "What This Partnership Delivers",
      content: {
        highlight: "Platform Excellence Enablement",
        points: [
          "Flagship enterprise showcase and case study",
          "Direct access to 50,000+ startup/VC pipeline",
          "Revenue sharing on $50M+ ARR projection", 
          "Category creation thought leadership positioning"
        ]
      },
      visual: "💎"
    },
    {
      title: "Sustaino-Sphere™ Benefits",
      subtitle: "Why We Need Lovable",
      content: {
        highlight: "10x Acceleration Capability",
        points: [
          "World-class platform infrastructure and scaling",
          "Rapid development and iteration capabilities",
          "Global infrastructure and enterprise reliability",
          "Focus on market creation vs. technical maintenance"
        ]
      },
      visual: "⚡"
    },
    {
      title: "Revenue Model",
      subtitle: "Shared Success Structure",
      content: {
        highlight: "$33M - $53M Total ARR by Year 3",
        points: [
          "Transaction fees: 3-5% (Lovable share: 30%)",
          "SustanoVal™ licensing: $50K-500K (Lovable share: 40%)",
          "Premium analytics: $10K-50K monthly (Lovable share: 20%)",
          "Projected Lovable revenue: $8M-15M ARR"
        ]
      },
      visual: "💰"
    },
    {
      title: "Competitive Advantages",
      subtitle: "Why We'll Win Together",
      content: {
        highlight: "Unbeatable Market Position",
        points: [
          "First comprehensive solution in market",
          "Patent-protected algorithms and methodology",
          "Perfect timing for digital asset boom",
          "Lovable's rapid development advantage"
        ]
      },
      visual: "🏆"
    },
    {
      title: "Partnership Structure", 
      subtitle: "Strategic Alliance Framework",
      content: {
        highlight: "Mutual Success Investment",
        points: [
          "3-year strategic partnership with renewals",
          "Joint go-to-market and co-branded initiatives",
          "Revenue sharing across all platform streams",
          "Dedicated partnership management and support"
        ]
      },
      visual: "🤝"
    },
    {
      title: "Implementation Timeline",
      subtitle: "90-Day Launch to Market Leadership",
      content: {
        highlight: "Rapid Market Entry",
        points: [
          "Q1: Partnership launch and team alignment",
          "Q2: Go-to-market execution and customer acquisition",
          "Q3: Scale phase with revenue optimization",
          "Q4: Market leadership and expansion planning"
        ]
      },
      visual: "📅"
    },
    {
      title: "Call to Action",
      subtitle: "Let's Create This Category Together",
      content: {
        highlight: "Ready to Build the Future?",
        points: [
          "Schedule partnership discussion this week",
          "Joint strategic planning session",
          "Technical platform deep-dive",
          "Partnership agreement finalization"
        ]
      },
      visual: "🎉"
    }
  ];

  const keyMetrics = [
    { label: "Market Size", value: "$750B", icon: Globe },
    { label: "ARR Projection", value: "$50M+", icon: TrendingUp },
    { label: "Customer Pipeline", value: "50K+", icon: Users },
    { label: "Revenue Share", value: "$15M", icon: DollarSign }
  ];

  const competitiveMatrix = [
    { 
      factor: "Market Coverage", 
      sustainoSphere: "Comprehensive", 
      traditional: "Fragmented",
      advantage: "100% coverage vs. 30-40%"
    },
    { 
      factor: "AI Valuation", 
      sustainoSphere: "Advanced AI", 
      traditional: "Manual/Basic",
      advantage: "97.3% accuracy vs. 60-70%"
    },
    { 
      factor: "Real-time Trading", 
      sustainoSphere: "Live Marketplace", 
      traditional: "Offline/Slow",
      advantage: "Instant vs. weeks/months"
    },
    { 
      factor: "Platform Speed", 
      sustainoSphere: "Lovable-powered", 
      traditional: "Legacy Systems",
      advantage: "10x faster development"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Partnership Value Proposition
          </h1>
          <p className="text-xl text-muted-foreground">
            Complete presentation deck for Lovable partnership
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Presentation className="h-4 w-4 mr-2" />
              10 Slides
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              Ready to Present
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Action-Oriented
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="slides" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="slides">Presentation Slides</TabsTrigger>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="competitive">Competitive Analysis</TabsTrigger>
            <TabsTrigger value="appendix">Supporting Data</TabsTrigger>
          </TabsList>

          <TabsContent value="slides">
            <div className="space-y-6">
              {/* Slide Navigation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Slide {currentSlide + 1} of {slides.length}</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                        disabled={currentSlide === 0}
                      >
                        Previous
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                        disabled={currentSlide === slides.length - 1}
                      >
                        Next
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Current Slide */}
              <Card className="border-primary shadow-lg">
                <CardContent className="p-12">
                  <div className="text-center space-y-8">
                    <div className="text-8xl">{slides[currentSlide].visual}</div>
                    <div>
                      <h2 className="text-4xl font-bold mb-4">{slides[currentSlide].title}</h2>
                      <p className="text-xl text-muted-foreground mb-8">{slides[currentSlide].subtitle}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="text-3xl font-bold text-primary">
                        {slides[currentSlide].content.highlight}
                      </div>
                      
                      <div className="space-y-4 max-w-3xl mx-auto">
                        {slides[currentSlide].content.points.map((point, index) => (
                          <div key={index} className="flex items-center gap-4 text-left">
                            <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
                            <span className="text-lg">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Slide Thumbnails */}
              <div className="grid grid-cols-5 gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`p-3 border rounded text-center transition-colors ${
                      currentSlide === index 
                        ? 'border-primary bg-primary/10' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    <div className="text-lg">{slide.visual}</div>
                    <div className="text-xs font-medium mt-1">{slide.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="metrics">
            <div className="space-y-6">
              {/* Key Metrics Dashboard */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {keyMetrics.map((metric, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <metric.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detailed Projections */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    3-Year Financial Projections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-green-600">Year 1</div>
                      <div className="space-y-1 text-sm">
                        <div>Revenue: $5M-8M</div>
                        <div>Customers: 1,000+</div>
                        <div>Lovable Share: $1M-2M</div>
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-blue-600">Year 2</div>
                      <div className="space-y-1 text-sm">
                        <div>Revenue: $15M-25M</div>
                        <div>Customers: 5,000+</div>
                        <div>Lovable Share: $4M-7M</div>
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-purple-600">Year 3</div>
                      <div className="space-y-1 text-sm">
                        <div>Revenue: $35M-55M</div>
                        <div>Customers: 15,000+</div>
                        <div>Lovable Share: $8M-15M</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Pipeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Customer Pipeline Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Target Segments:</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Digital Startups</span>
                          <Badge>25,000+ potential</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>SaaS Companies</span>
                          <Badge>15,000+ potential</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Investment Firms</span>
                          <Badge>5,000+ potential</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Digital Agencies</span>
                          <Badge>10,000+ potential</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Conversion Funnel:</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Market Awareness</span>
                          <span className="text-primary font-medium">100%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Platform Interest</span>
                          <span className="text-primary font-medium">25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Trial Conversion</span>
                          <span className="text-primary font-medium">15%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Paid Customers</span>
                          <span className="text-primary font-medium">8%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="competitive">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Competitive Advantage Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold">Factor</th>
                        <th className="text-left p-4 font-semibold">Sustaino-Sphere™</th>
                        <th className="text-left p-4 font-semibold">Traditional Players</th>
                        <th className="text-left p-4 font-semibold">Our Advantage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitiveMatrix.map((row, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-4 font-medium">{row.factor}</td>
                          <td className="p-4 text-green-600 font-medium">{row.sustainoSphere}</td>
                          <td className="p-4 text-red-600">{row.traditional}</td>
                          <td className="p-4 text-primary font-medium">{row.advantage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded border border-green-200">
                  <div className="font-semibold text-green-700 dark:text-green-400 mb-2">
                    🏆 Key Differentiators
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Technology:</span>
                      <p className="text-green-600">Lovable-powered rapid development & scaling</p>
                    </div>
                    <div>
                      <span className="font-medium">Market Timing:</span>
                      <p className="text-green-600">First-mover in exact category space</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appendix">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    Risk Assessment & Mitigation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded">
                      <div className="font-semibold text-yellow-600 mb-2">Market Risk: Slow Adoption</div>
                      <div className="text-sm">
                        <span className="font-medium">Mitigation:</span> Focus on early adopter segments, 
                        comprehensive education, thought leadership positioning
                      </div>
                    </div>
                    <div className="p-4 border rounded">
                      <div className="font-semibold text-blue-600 mb-2">Technical Risk: Platform Scaling</div>
                      <div className="text-sm">
                        <span className="font-medium">Mitigation:</span> Lovable's enterprise infrastructure, 
                        gradual scaling approach, dedicated support
                      </div>
                    </div>
                    <div className="p-4 border rounded">
                      <div className="font-semibold text-purple-600 mb-2">Competitive Risk: Big Tech Entry</div>
                      <div className="text-sm">
                        <span className="font-medium">Mitigation:</span> Speed to market, patent protection, 
                        deep domain expertise, customer lock-in
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-6 w-6 text-primary" />
                    Success Factors & KPIs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Technical KPIs:</h4>
                      <div className="space-y-2 text-sm">
                        <div>Platform uptime: 99.9%+</div>
                        <div>Response time: &lt;2s</div>
                        <div>User satisfaction: 90%+</div>
                        <div>Feature velocity: 2x industry</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Business KPIs:</h4>
                      <div className="space-y-2 text-sm">
                        <div>Customer acquisition: 200+/month</div>
                        <div>Revenue growth: 300% YoY</div>
                        <div className="text-sm">Churn rate: &lt;5%</div>
                        <div>NPS score: 70+</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Market KPIs:</h4>
                      <div className="space-y-2 text-sm">
                        <div>Market share: 15%+ in 3 years</div>
                        <div>Brand recognition: Top 3</div>
                        <div>Thought leadership: 50+ articles</div>
                        <div>Partnership ecosystem: 25+ partners</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="border-primary shadow-lg bg-primary/5">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Partnership Presentation Ready</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Complete value proposition deck prepared for Lovable partnership discussions. 
              All slides, metrics, and supporting data included for compelling presentation.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-primary">
                <Presentation className="h-5 w-5 mr-2" />
                Present to Lovable
              </Button>
              <Button size="lg" variant="outline">
                <Target className="h-5 w-5 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ValuePropositionDeck;