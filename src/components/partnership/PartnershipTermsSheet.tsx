import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, Handshake, TrendingUp, Shield, Calendar, 
  DollarSign, Users, Award, Target, Zap 
} from 'lucide-react';

const PartnershipTermsSheet = () => {
  const partnershipTiers = {
    strategic: {
      title: "Strategic Partnership",
      level: "Tier 1 - Flagship",
      benefits: [
        "Joint go-to-market strategy",
        "Co-branded marketing initiatives",
        "Revenue sharing (5-15%)",
        "Priority technical support",
        "Joint conference speaking",
        "Dedicated account management",
        "Early access to new features",
        "Custom integration support"
      ],
      commitment: "3+ years",
      investment: "Mutual resource investment"
    },
    preferred: {
      title: "Preferred Partner",
      level: "Tier 2 - Premium", 
      benefits: [
        "Enhanced technical support",
        "Marketing co-op opportunities",
        "Revenue sharing (3-8%)",
        "Case study development",
        "Platform showcasing",
        "Priority feature requests"
      ],
      commitment: "2+ years",
      investment: "Moderate resource commitment"
    }
  };

  const revenueModel = {
    primary: [
      {
        stream: "Transaction Fees",
        percentage: "3-5%",
        split: "70% Sustaino / 30% Lovable",
        projection: "$15M-25M ARR by Year 3"
      },
      {
        stream: "SustanoVal™ Licensing",
        fee: "$50K-500K per license",
        split: "60% Sustaino / 40% Lovable",
        projection: "$10M-15M ARR by Year 3"
      }
    ],
    secondary: [
      {
        stream: "Premium Analytics",
        fee: "$10K-50K monthly",
        split: "80% Sustaino / 20% Lovable",
        projection: "$5M-8M ARR by Year 3"
      },
      {
        stream: "Custom Development",
        fee: "$100K-1M per project",
        split: "50% Sustaino / 50% Lovable",
        projection: "$3M-5M ARR by Year 3"
      }
    ]
  };

  const keyTerms = {
    exclusivity: {
      title: "Platform Exclusivity",
      details: "Sustaino-Sphere™ built exclusively on Lovable platform",
      duration: "Duration of partnership"
    },
    territory: {
      title: "Geographic Scope",
      details: "Global partnership across all markets",
      duration: "Worldwide rights"
    },
    ip: {
      title: "Intellectual Property",
      details: "Shared IP for joint innovations, separate IP protection",
      duration: "Perpetual rights"
    },
    performance: {
      title: "Performance Metrics",
      details: "Quarterly business reviews, KPI tracking, success metrics",
      duration: "Ongoing measurement"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Partnership Terms Sheet
          </h1>
          <p className="text-xl text-muted-foreground">
            Sustaino-Sphere™ × Lovable Strategic Alliance
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Handshake className="h-4 w-4 mr-2" />
              Strategic Partnership
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <DollarSign className="h-4 w-4 mr-2" />
              Revenue Sharing
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              Category Creation
            </Badge>
          </div>
        </div>

        {/* Partnership Tiers */}
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(partnershipTiers).map(([key, tier]) => (
            <Card key={key} className={key === 'strategic' ? 'border-primary shadow-lg' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    {tier.title}
                  </div>
                  <Badge variant={key === 'strategic' ? 'default' : 'secondary'}>
                    {tier.level}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Commitment:</span>
                    <p className="text-muted-foreground">{tier.commitment}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Investment:</span>
                    <p className="text-muted-foreground">{tier.investment}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-2">Partnership Benefits:</h4>
                  <div className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Sharing Model */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Revenue Sharing Model
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Primary Revenue Streams
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {revenueModel.primary.map((stream, index) => (
                    <div key={index} className="p-4 border rounded space-y-2">
                      <div className="font-semibold">{stream.stream}</div>
                      <div className="text-sm space-y-1">
                        <div><span className="font-medium">Rate:</span> {stream.percentage || stream.fee}</div>
                        <div><span className="font-medium">Split:</span> {stream.split}</div>
                        <div className="text-green-600 font-medium">{stream.projection}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Secondary Revenue Streams
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {revenueModel.secondary.map((stream, index) => (
                    <div key={index} className="p-4 border rounded space-y-2">
                      <div className="font-semibold">{stream.stream}</div>
                      <div className="text-sm space-y-1">
                        <div><span className="font-medium">Fee:</span> {stream.fee}</div>
                        <div><span className="font-medium">Split:</span> {stream.split}</div>
                        <div className="text-blue-600 font-medium">{stream.projection}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded border border-primary/20">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">$33M - $53M Total ARR</div>
                  <div className="text-sm text-muted-foreground">3-Year Projection (Conservative)</div>
                  <div className="text-sm font-medium">Lovable Revenue Share: $8M - $15M ARR</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Terms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Key Partnership Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(keyTerms).map(([key, term]) => (
                <div key={key} className="space-y-2">
                  <div className="font-semibold flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    {term.title}
                  </div>
                  <div className="text-sm text-muted-foreground">{term.details}</div>
                  <div className="text-xs font-medium text-primary">{term.duration}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Partnership Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Partnership Implementation Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto">Q1</div>
                  <div className="font-semibold">Partnership Launch</div>
                  <div className="text-sm text-muted-foreground">Agreement signing, team alignment</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto">Q2</div>
                  <div className="font-semibold">Market Launch</div>
                  <div className="text-sm text-muted-foreground">Go-to-market execution</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto">Q3</div>
                  <div className="font-semibold">Scale Phase</div>
                  <div className="text-sm text-muted-foreground">Customer acquisition, revenue growth</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto">Q4</div>
                  <div className="font-semibold">Optimization</div>
                  <div className="text-sm text-muted-foreground">Performance review, expansion planning</div>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded border border-green-200">
                <div className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  Success Metrics & KPIs
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Revenue:</span>
                    <p className="text-green-600">$5M ARR by end of Year 1</p>
                  </div>
                  <div>
                    <span className="font-medium">Customers:</span>
                    <p className="text-green-600">1,000+ active users</p>
                  </div>
                  <div>
                    <span className="font-medium">Market:</span>
                    <p className="text-green-600">Category leadership position</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-primary shadow-lg bg-primary/5">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Create a New Market Together?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              This partnership positions both companies at the forefront of digital business innovation, 
              creating significant value for customers and shareholders alike.
            </p>
            <div className="flex justify-center gap-4">
              <Badge className="text-lg px-6 py-3">
                <Target className="h-5 w-5 mr-2" />
                Category Creation Opportunity
              </Badge>
              <Badge className="text-lg px-6 py-3">
                <Users className="h-5 w-5 mr-2" />
                Mutual Success Model
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnershipTermsSheet;