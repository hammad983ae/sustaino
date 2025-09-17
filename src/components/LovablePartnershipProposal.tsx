import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Handshake, Target, TrendingUp, Users, Globe, Star,
  Mail, MessageSquare, Calendar, FileText, Rocket,
  Building, DollarSign, Zap, Trophy, Heart
} from 'lucide-react';

const LovablePartnershipProposal = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const partnershipValue = {
    forLovable: {
      showcase: "Sustaino-Sphere™ as flagship enterprise showcase",
      market: "Entry into $750B digital business valuation market",
      customers: "Direct access to 50,000+ startups and VCs",
      revenue: "Revenue share on $50M+ ARR projection",
      brand: "Association with category-creating innovation"
    },
    forSustanoSphere: {
      platform: "World-class no-code development platform",
      speed: "10x faster development and iteration",
      scale: "Global infrastructure and hosting",
      support: "Enterprise-grade support and reliability",
      community: "Access to Lovable's developer ecosystem"
    }
  };

  const proposedStructure = {
    tier: "Strategic Partnership",
    terms: [
      "Joint go-to-market strategy",
      "Co-branded marketing initiatives", 
      "Revenue sharing model (negotiable)",
      "Priority technical support",
      "Joint conference speaking opportunities",
      "Case study development rights"
    ],
    timeline: "3-year strategic partnership with renewal options",
    investment: "Mutual investment in joint success"
  };

  const outreachStrategy = {
    contacts: [
      {
        role: "Chief Business Development Officer",
        approach: "LinkedIn + Email",
        message: "Partnership opportunity for category-creating platform"
      },
      {
        role: "Head of Partnerships", 
        approach: "Email via partnerships@lovable.dev",
        message: "Strategic partnership proposal - Digital Business Valuation"
      },
      {
        role: "CEO/Founder",
        approach: "LinkedIn + Email",
        message: "Market creation opportunity - $750B addressable market"
      }
    ],
    channels: [
      "partnerships@lovable.dev",
      "LinkedIn direct outreach", 
      "Twitter/X mentions",
      "Lovable community Discord",
      "Industry conference networking"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Lovable Partnership Proposal
          </h1>
          <p className="text-xl text-muted-foreground">
            Strategic Alliance: Sustaino-Sphere™ × Lovable
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Handshake className="h-4 w-4 mr-2" />
              Win-Win Partnership
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Rocket className="h-4 w-4 mr-2" />
              Market Creation
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Trophy className="h-4 w-4 mr-2" />
              Category Leadership
            </Badge>
          </div>
        </div>

        {/* Executive Summary */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Partnership Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">$750B</div>
                <div className="text-sm text-muted-foreground">Addressable Market</div>
                <div className="text-xs">Digital Business Valuation</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-green-600">Category Creator</div>
                <div className="text-sm text-muted-foreground">First Mover Advantage</div>
                <div className="text-xs">18-24 month lead</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-blue-600">$50M ARR</div>
                <div className="text-sm text-muted-foreground">3-Year Projection</div>
                <div className="text-xs">Revenue share opportunity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partnership Value Proposition */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Value for Lovable
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(partnershipValue.forLovable).map(([key, value]) => (
                <div key={key} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div className="text-sm text-muted-foreground">{value}</div>
                  </div>
                </div>
              ))}
              
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 mt-4">
                <div className="font-semibold text-green-700 dark:text-green-400">
                  🎯 Perfect Flagship Case Study
                </div>
                <div className="text-sm text-green-600 dark:text-green-300">
                  Sustaino-Sphere™ showcases Lovable's ability to build enterprise-grade, 
                  category-creating platforms. This becomes your "look what's possible" story.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Value for Sustaino-Sphere™
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(partnershipValue.forSustanoSphere).map(([key, value]) => (
                <div key={key} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div className="text-sm text-muted-foreground">{value}</div>
                  </div>
                </div>
              ))}
              
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded border border-blue-200 mt-4">
                <div className="font-semibold text-blue-700 dark:text-blue-400">
                  🚀 Accelerated Time-to-Market
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-300">
                  With Lovable's partnership, we can scale 10x faster and focus on 
                  market creation rather than infrastructure management.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Proposed Partnership Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-6 w-6 text-primary" />
              Proposed Partnership Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Partnership Tier</h4>
                  <Badge className="text-lg px-4 py-2">{proposedStructure.tier}</Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Key Terms</h4>
                  <div className="space-y-2">
                    {proposedStructure.terms.map((term, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-sm">{term}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Timeline</h4>
                  <p className="text-sm text-muted-foreground">{proposedStructure.timeline}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Investment Philosophy</h4>
                  <p className="text-sm text-muted-foreground">{proposedStructure.investment}</p>
                </div>

                <div className="p-3 bg-primary/10 rounded border border-primary/20">
                  <div className="font-semibold text-primary">Mutual Success Model</div>
                  <div className="text-sm text-primary/80">
                    Both parties invest resources and share in the upside of market creation
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Outreach Strategy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              How to Approach Lovable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Key Contacts to Reach</h4>
                <div className="space-y-3">
                  {outreachStrategy.contacts.map((contact, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="font-semibold">{contact.role}</div>
                      <div className="text-sm text-muted-foreground">{contact.approach}</div>
                      <div className="text-sm italic mt-1">"{contact.message}"</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Outreach Channels</h4>
                <div className="space-y-2">
                  {outreachStrategy.channels.map((channel, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <MessageSquare className="h-3 w-3 text-blue-500" />
                      <span className="text-sm">{channel}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200">
                  <div className="font-semibold text-yellow-700 dark:text-yellow-400">
                    💡 Pro Tip
                  </div>
                  <div className="text-sm text-yellow-600 dark:text-yellow-300">
                    Lead with the market opportunity ($750B) and category creation story, 
                    not just the technical platform. VCs and business leaders think in markets first.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Draft Email Template */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Draft Partnership Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded border font-mono text-sm space-y-3">
              <div><strong>Subject:</strong> Partnership Opportunity: $750B Market Creation with Sustaino-Sphere™</div>
              
              <div className="space-y-2">
                <div><strong>Hi [Name],</strong></div>
                
                <div>
                  I'm reaching out about a strategic partnership opportunity that could position 
                  Lovable at the forefront of a $750B market we're creating: "Digital Business Valuation as a Service."
                </div>
                
                <div>
                  <strong>The Opportunity:</strong><br/>
                  • We've built Sustaino-Sphere™ on Lovable - a comprehensive digital asset valuation platform<br/>
                  • Creating entirely new market category (like Salesforce did for CRM)<br/>
                  • 18-24 month first-mover advantage window<br/>
                  • $50M ARR projection within 3 years
                </div>
                
                <div>
                  <strong>Partnership Value:</strong><br/>
                  • Flagship showcase of Lovable's enterprise capabilities<br/>
                  • Direct access to 50,000+ startups and VCs<br/>
                  • Revenue sharing on category-creating platform<br/>
                  • Joint thought leadership in digital business space
                </div>
                
                <div>
                  Our platform demonstrates what's possible when you combine Lovable's rapid development 
                  capabilities with genuine market innovation. We'd love to explore how we can 
                  accelerate this together.
                </div>
                
                <div>
                  Available for a 15-minute call this week to discuss the opportunity.
                </div>
                
                <div>
                  Best regards,<br/>
                  [Your Name]<br/>
                  Founder, Sustaino-Sphere™<br/>
                  [Your Contact Info]
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-primary shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Immediate Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Week 1 Actions:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-primary rounded flex-shrink-0" />
                    <span>Research Lovable's current partnerships and business model</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-primary rounded flex-shrink-0" />
                    <span>Identify key decision makers via LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-primary rounded flex-shrink-0" />
                    <span>Craft personalized outreach messages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-primary rounded flex-shrink-0" />
                    <span>Send initial partnership inquiry</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Preparation Materials:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3 w-3 text-blue-500" />
                    <span>One-page partnership summary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span>Market analysis and projections</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-purple-500" />
                    <span>Customer testimonials and case studies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-3 w-3 text-yellow-500" />
                    <span>Revenue sharing proposal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button size="lg" className="bg-primary">
                <Handshake className="h-5 w-5 mr-2" />
                Initiate Partnership Outreach
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LovablePartnershipProposal;