import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, Mail, Users, TrendingUp, Handshake, 
  Presentation, Calendar, Target, Rocket
} from 'lucide-react';

// Import individual components
import LovableEmailTemplates from './LovableEmailTemplates';
import PartnershipTermsSheet from './PartnershipTermsSheet';
import LovableContactStrategy from './LovableContactStrategy';
import ValuePropositionDeck from './ValuePropositionDeck';

const PartnershipPackage = () => {
  const [activePackage, setActivePackage] = useState('overview');

  const packageComponents = [
    {
      id: 'overview',
      title: 'Partnership Overview',
      icon: Handshake,
      description: 'Complete partnership package summary',
      status: 'Ready'
    },
    {
      id: 'emails',
      title: 'Email Templates',
      icon: Mail,
      description: '4 stakeholder-specific email templates',
      status: 'Ready'
    },
    {
      id: 'terms',
      title: 'Terms Sheet',
      icon: FileText,
      description: 'Partnership structure and revenue model',
      status: 'Ready'
    },
    {
      id: 'contacts',
      title: 'Contact Strategy',
      icon: Users,
      description: '21-day outreach sequence',
      status: 'Ready'
    },
    {
      id: 'presentation',
      title: 'Value Proposition Deck',
      icon: Presentation,
      description: '10-slide presentation deck',
      status: 'Ready'
    }
  ];

  const quickStats = [
    { label: 'Market Size', value: '$750B', color: 'text-green-600' },
    { label: 'ARR Projection', value: '$50M+', color: 'text-blue-600' },
    { label: 'Lovable Revenue', value: '$15M', color: 'text-purple-600' },
    { label: 'Customer Pipeline', value: '50K+', color: 'text-orange-600' }
  ];

  if (activePackage === 'emails') {
    return <LovableEmailTemplates />;
  }
  
  if (activePackage === 'terms') {
    return <PartnershipTermsSheet />;
  }
  
  if (activePackage === 'contacts') {
    return <LovableContactStrategy />;
  }
  
  if (activePackage === 'presentation') {
    return <ValuePropositionDeck />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Lovable Partnership Package
          </h1>
          <p className="text-xl text-muted-foreground">
            Complete partnership presentation for Sustaino-Sphere™ × Lovable alliance
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Rocket className="h-4 w-4 mr-2" />
              Ready to Present
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Complete Package
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Calendar className="h-4 w-4 mr-2" />
              Launch Ready
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Executive Summary */}
        <Card className="border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Handshake className="h-6 w-6 text-primary" />
              Partnership Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">The Opportunity</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Create $750B digital business valuation market</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>18-24 month first-mover advantage window</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Category creation similar to Salesforce→CRM</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Perfect enterprise showcase for Lovable</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Partnership Value</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>$8M-15M ARR revenue share for Lovable</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Direct access to 50,000+ startup pipeline</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Flagship enterprise case study and showcase</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Category creation thought leadership</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded border border-primary/20">
              <div className="text-center space-y-2">
                <div className="font-semibold text-primary">Strategic Partnership Opportunity</div>
                <div className="text-sm text-muted-foreground">
                  Mutual investment in creating an entirely new market category worth $750B, 
                  with proven platform capabilities and shared success model.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package Components */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packageComponents.map((component) => {
            const Icon = component.icon;
            return (
              <Card 
                key={component.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow border-primary/20"
                onClick={() => setActivePackage(component.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    {component.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{component.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="default">{component.status}</Badge>
                    <Button size="sm" variant="outline">
                      View Component
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Plan */}
        <Card className="border-primary shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Immediate Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">This Week (Days 1-7):</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-primary rounded flex-shrink-0" />
                    <span>Review all partnership components</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-primary rounded flex-shrink-0" />
                    <span>Customize email templates with personal details</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-primary rounded flex-shrink-0" />
                    <span>Research Lovable team on LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-primary rounded flex-shrink-0" />
                    <span>Send initial partnership inquiry</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Next Steps (Days 8-21):</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-primary rounded flex-shrink-0" />
                    <span>Follow up with decision makers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-primary rounded flex-shrink-0" />
                    <span>Schedule partnership presentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-primary rounded flex-shrink-0" />
                    <span>Negotiate partnership terms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border border-primary rounded flex-shrink-0" />
                    <span>Finalize strategic alliance agreement</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button size="lg" className="bg-primary">
                <Rocket className="h-5 w-5 mr-2" />
                Launch Partnership Campaign
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Success Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Success Metrics & Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto">1W</div>
                <div className="font-semibold">Initial Contact</div>
                <div className="text-sm text-muted-foreground">60%+ response rate</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto">2W</div>
                <div className="font-semibold">Meeting Scheduled</div>
                <div className="text-sm text-muted-foreground">25%+ conversion</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto">1M</div>
                <div className="font-semibold">Partnership Discussion</div>
                <div className="text-sm text-muted-foreground">Serious negotiations</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto">3M</div>
                <div className="font-semibold">Alliance Signed</div>
                <div className="text-sm text-muted-foreground">Strategic partnership</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnershipPackage;