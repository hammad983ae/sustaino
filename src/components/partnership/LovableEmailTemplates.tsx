import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Mail, Send, Users, Building, TrendingUp } from 'lucide-react';

const LovableEmailTemplates = () => {
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const copyToClipboard = (text: string, templateId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(templateId);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  const emailTemplates = {
    ceo: {
      subject: "Partnership Opportunity: Create $750B Digital Asset Valuation Market Together",
      content: `Hi [CEO Name],

I'm reaching out about a unique opportunity to position Lovable as the platform that enabled the creation of an entirely new $750B market category.

THE OPPORTUNITY:
We've built Sustaino-Sphere™ on Lovable - the world's first comprehensive "Digital Business Stock Exchange." Think NASDAQ for digital businesses, but with AI-powered valuations and live trading.

MARKET CREATION POTENTIAL:
• $750B addressable market (digital business valuation)
• 18-24 month first-mover advantage window
• Category creation similar to Salesforce→CRM or Zoom→Video
• Zero direct competitors in this exact space

LOVABLE'S STRATEGIC VALUE:
• Flagship showcase: "This is what enterprise innovation looks like"
• Direct customer pipeline: 50,000+ startups, VCs, digital entrepreneurs
• Revenue opportunity: Share in projected $50M ARR within 3 years
• Thought leadership: Co-create the future of digital business

THE ASK:
Strategic partnership to accelerate market creation. We provide the vision, expertise, and market - you provide the platform excellence that makes it possible.

Available for a 15-minute call this week to explore how we can build this category together.

Best regards,
[Your Name]
Founder, Sustaino-Sphere™
Built on Lovable`
    },
    partnerships: {
      subject: "Strategic Partnership: Digital Asset Valuation Platform - $750B Market",
      content: `Hi Partnerships Team,

Reaching out about a strategic partnership opportunity for a category-creating platform built entirely on Lovable.

PLATFORM OVERVIEW:
Sustaino-Sphere™ - Digital Business Valuation & Trading Platform
• Revolutionary AI valuation algorithm (patent pending)
• Live marketplace for digital asset trading
• Comprehensive ESG and risk assessment
• Built 100% on Lovable platform

PARTNERSHIP VALUE PROPOSITION:

For Lovable:
✓ Perfect enterprise showcase and case study
✓ Access to 50,000+ startup/VC customer base
✓ Revenue sharing on projected $50M ARR
✓ Category creation thought leadership
✓ Flagship "what's possible" demonstration

For Sustaino-Sphere™:
✓ Enterprise-grade platform and scaling
✓ 10x faster development iteration
✓ Global infrastructure and reliability
✓ Focus on market creation vs. tech maintenance

PROPOSED STRUCTURE:
• Strategic partnership tier
• Joint go-to-market initiatives
• Co-branded thought leadership
• Revenue sharing model
• 3-year partnership with renewals

The timing is perfect - we're in the 18-24 month window to own this category before big tech enters.

Happy to send detailed partnership deck and schedule intro call.

Best,
[Your Name]`
    },
    business_dev: {
      subject: "Business Development Opportunity: $750B Market Creation Partnership",
      content: `Hi [BD Name],

Quick partnership opportunity that could generate significant business for Lovable while showcasing platform capabilities at the highest level.

SITUATION:
We've built a revolutionary digital asset valuation platform (Sustaino-Sphere™) on Lovable that's creating an entirely new market category worth $750B.

BUSINESS OPPORTUNITY:
• Immediate: Showcase Lovable's enterprise capabilities
• Short-term: Direct customer referrals from our 50K+ user base
• Long-term: Revenue share on projected $50M ARR platform

COMPETITIVE ADVANTAGE:
• First-mover in digital business valuation space
• 18-24 month lead before major competitors
• Patent-protected algorithms and methodology
• Perfect enterprise use case for Lovable

PARTNERSHIP BENEFITS:
1. Customer Acquisition: Direct pipeline to startup/VC community
2. Case Study: Flagship "built on Lovable" success story
3. Revenue Share: Participate in category creation upside
4. Market Position: Associated with breakthrough innovation

The platform demonstrates Lovable's ability to enable category-creating businesses, not just websites or simple apps.

15-minute call this week to explore partnership structure?

Thanks,
[Your Name]
Sustaino-Sphere™ Founder`
    },
    technical: {
      subject: "Technical Partnership: Enterprise Platform Showcase - Sustaino-Sphere™",
      content: `Hi Technical Team,

Wanted to share an exciting technical showcase opportunity that demonstrates Lovable's enterprise platform capabilities.

TECHNICAL ACHIEVEMENT:
Built Sustaino-Sphere™ entirely on Lovable:
• Complex AI valuation algorithms
• Real-time trading marketplace
• Enterprise-grade security and compliance
• Multi-tenant architecture
• Advanced data analytics and reporting

PLATFORM COMPLEXITY:
• 100+ interconnected components
• Real-time market data processing
• AI/ML integration for valuations
• Blockchain integration for transactions
• Multi-jurisdiction compliance handling

LOVABLE SHOWCASE VALUE:
This proves Lovable can handle:
✓ Enterprise-scale applications
✓ Complex financial calculations
✓ Real-time data processing
✓ Advanced security requirements
✓ Regulatory compliance needs

PARTNERSHIP OPPORTUNITY:
• Joint technical case studies
• Conference speaking opportunities  
• Technical thought leadership
• Customer reference for enterprise prospects

The platform pushes Lovable's capabilities to demonstrate what's truly possible with no-code/low-code at enterprise scale.

Would love to do a technical deep-dive call with your team.

Best,
[Your Name]
Technical Founder, Sustaino-Sphere™`
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Lovable Partnership Email Templates
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready-to-send emails for different stakeholders
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Mail className="h-4 w-4 mr-2" />
              4 Templates
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              All Stakeholders
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Send className="h-4 w-4 mr-2" />
              Copy & Send
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="ceo" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ceo" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              CEO/Founder
            </TabsTrigger>
            <TabsTrigger value="partnerships" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Partnerships
            </TabsTrigger>
            <TabsTrigger value="business_dev" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Business Dev
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Technical
            </TabsTrigger>
          </TabsList>

          {Object.entries(emailTemplates).map(([key, template]) => (
            <TabsContent key={key} value={key}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Email Template: {key.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(
                        `Subject: ${template.subject}\n\n${template.content}`,
                        key
                      )}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copiedTemplate === key ? 'Copied!' : 'Copy Email'}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Subject Line:</label>
                      <div className="p-3 bg-muted rounded border mt-1 font-medium">
                        {template.subject}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Email Content:</label>
                      <div className="p-4 bg-muted rounded border mt-1 font-mono text-sm whitespace-pre-line">
                        {template.content}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button 
                        onClick={() => copyToClipboard(template.subject, `${key}-subject`)}
                        variant="outline"
                        size="sm"
                      >
                        {copiedTemplate === `${key}-subject` ? 'Subject Copied!' : 'Copy Subject'}
                      </Button>
                      <Button 
                        onClick={() => copyToClipboard(template.content, `${key}-content`)}
                        variant="outline"
                        size="sm"
                      >
                        {copiedTemplate === `${key}-content` ? 'Content Copied!' : 'Copy Content'}
                      </Button>
                      <Button 
                        onClick={() => copyToClipboard(
                          `Subject: ${template.subject}\n\n${template.content}`,
                          `${key}-full`
                        )}
                        className="bg-primary"
                        size="sm"
                      >
                        {copiedTemplate === `${key}-full` ? 'Full Email Copied!' : 'Copy Full Email'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="border-primary shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-6 w-6 text-primary" />
              Outreach Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Recommended Sequence:</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span>Business Development team (warm entry point)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span>Partnerships team (formal partnership discussion)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span>CEO/Founder (strategic vision alignment)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <span>Technical team (implementation deep-dive)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Pro Tips:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Lead with market size ($750B) and opportunity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Emphasize category creation, not competition</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Highlight Lovable as platform that made it possible</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Focus on mutual value and shared success</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LovableEmailTemplates;