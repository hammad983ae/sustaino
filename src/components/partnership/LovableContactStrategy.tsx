import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Building, Mail, Phone, MessageSquare, Calendar,
  Linkedin, Twitter, Globe, MapPin, Clock, Target
} from 'lucide-react';

const LovableContactStrategy = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const contactDatabase = {
    leadership: [
      {
        name: "Emil Widlund",
        role: "Co-Founder & CEO", 
        priority: "High",
        approach: "Strategic Vision",
        linkedin: "linkedin.com/in/emilwidlund",
        email: "emil@lovable.dev",
        bestTime: "Tuesday-Thursday 2-4pm CET",
        talkingPoints: [
          "Category creation opportunity ($750B market)",
          "Platform showcase potential",
          "Enterprise customer pipeline",
          "Strategic partnership vision"
        ],
        personalNotes: "Technical background, focus on innovation and platform capabilities"
      },
      {
        name: "Henrik Kniberg", 
        role: "Co-Founder & Advisor",
        priority: "Medium",
        approach: "Product Strategy",
        linkedin: "linkedin.com/in/henrikkniberg",
        email: "henrik@lovable.dev",
        bestTime: "Monday-Wednesday mornings",
        talkingPoints: [
          "Product-market fit for enterprise",
          "Technical architecture showcase",
          "Developer community value",
          "Innovation methodology"
        ],
        personalNotes: "Agile expert, author, focus on product development and methodology"
      }
    ],
    partnerships: [
      {
        name: "Partnerships Team",
        role: "Head of Partnerships",
        priority: "High", 
        approach: "Partnership Structure",
        email: "partnerships@lovable.dev",
        linkedin: "Search LinkedIn for 'Lovable partnerships'",
        bestTime: "Business hours PST",
        talkingPoints: [
          "Revenue sharing model",
          "Joint go-to-market strategy", 
          "Customer acquisition pipeline",
          "Partnership tier discussion"
        ],
        personalNotes: "Entry point for formal partnership discussions"
      }
    ],
    business: [
      {
        name: "Business Development",
        role: "Head of Business Development",
        priority: "High",
        approach: "Market Opportunity",
        email: "business@lovable.dev",
        linkedin: "Search for BD team on LinkedIn",
        bestTime: "Business hours",
        talkingPoints: [
          "Market size and opportunity",
          "Customer pipeline sharing",
          "Revenue projections",
          "Competitive positioning"
        ],
        personalNotes: "Focus on business metrics and growth opportunities"
      }
    ],
    technical: [
      {
        name: "Technical Team",
        role: "CTO/Engineering Lead",
        priority: "Medium",
        approach: "Technical Showcase",
        email: "tech@lovable.dev",
        linkedin: "Search for engineering team",
        bestTime: "Engineering hours",
        talkingPoints: [
          "Platform complexity demonstration",
          "Enterprise architecture",
          "Technical case study",
          "Integration capabilities"
        ],
        personalNotes: "Follow-up after business alignment"
      }
    ]
  };

  const outreachChannels = [
    {
      channel: "LinkedIn Direct Message",
      priority: "Primary",
      effectiveness: "90%",
      response: "24-48 hours",
      tips: "Personalized message, mutual connections, industry focus"
    },
    {
      channel: "Email (Direct)",
      priority: "Primary", 
      effectiveness: "75%",
      response: "48-72 hours",
      tips: "Professional subject line, concise value prop, clear CTA"
    },
    {
      channel: "partnerships@lovable.dev",
      priority: "High",
      effectiveness: "85%",
      response: "1-3 business days",
      tips: "Formal partnership inquiry, comprehensive proposal attached"
    },
    {
      channel: "Twitter/X Mentions",
      priority: "Secondary",
      effectiveness: "30%",
      response: "Variable",
      tips: "Public engagement, thought leadership, conference mentions"
    },
    {
      channel: "Lovable Discord Community",
      priority: "Tertiary",
      effectiveness: "40%",
      response: "Hours to days",
      tips: "Community engagement, showcase platform, build relationships"
    }
  ];

  const outreachSequence = [
    {
      day: 1,
      action: "LinkedIn Research & Connection",
      target: "Key decision makers",
      goal: "Build connection baseline"
    },
    {
      day: 3,
      action: "Email to partnerships@lovable.dev", 
      target: "Partnerships team",
      goal: "Formal partnership inquiry"
    },
    {
      day: 7,
      action: "LinkedIn DM to CEO",
      target: "Emil Widlund",
      goal: "Strategic vision alignment"
    },
    {
      day: 10,
      action: "Follow-up email",
      target: "All contacts",
      goal: "Maintain momentum"
    },
    {
      day: 14,
      action: "Twitter engagement",
      target: "Public mentions",
      goal: "Increase visibility"
    },
    {
      day: 21,
      action: "Conference/Event outreach",
      target: "In-person meetings",
      goal: "Face-to-face connection"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Lovable Contact Strategy
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive outreach plan for partnership development
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              Key Contacts
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Multi-Channel
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Calendar className="h-4 w-4 mr-2" />
              21-Day Plan
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contacts">Key Contacts</TabsTrigger>
            <TabsTrigger value="channels">Outreach Channels</TabsTrigger>
            <TabsTrigger value="sequence">Contact Sequence</TabsTrigger>
            <TabsTrigger value="templates">Message Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
            <div className="space-y-6">
              {Object.entries(contactDatabase).map(([category, contacts]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 capitalize">
                      <Building className="h-5 w-5 text-primary" />
                      {category} Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contacts.map((contact, index) => (
                        <div 
                          key={index} 
                          className="p-4 border rounded hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => setSelectedContact(selectedContact === `${category}-${index}` ? null : `${category}-${index}`)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-semibold">{contact.name}</div>
                              <div className="text-sm text-muted-foreground">{contact.role}</div>
                            </div>
                            <Badge variant={contact.priority === 'High' ? 'default' : 'secondary'}>
                              {contact.priority} Priority
                            </Badge>
                          </div>

                          {selectedContact === `${category}-${index}` && (
                            <div className="mt-4 space-y-4 border-t pt-4">
                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-blue-500" />
                                    <span>{contact.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Linkedin className="h-4 w-4 text-blue-600" />
                                    <span>{contact.linkedin}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-green-500" />
                                    <span>{contact.bestTime}</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="font-medium mb-2">Approach: {contact.approach}</div>
                                  <div className="text-muted-foreground text-xs">{contact.personalNotes}</div>
                                </div>
                              </div>

                              <div>
                                <div className="font-medium mb-2">Key Talking Points:</div>
                                <div className="space-y-1">
                                  {contact.talkingPoints.map((point, pointIndex) => (
                                    <div key={pointIndex} className="flex items-center gap-2 text-sm">
                                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                      <span>{point}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="channels">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Outreach Channel Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {outreachChannels.map((channel, index) => (
                    <div key={index} className="p-4 border rounded">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold">{channel.channel}</div>
                        <div className="flex gap-2">
                          <Badge variant={channel.priority === 'Primary' ? 'default' : 'secondary'}>
                            {channel.priority}
                          </Badge>
                          <Badge variant="outline">{channel.effectiveness}</Badge>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Response Time:</span> {channel.response}
                        </div>
                        <div>
                          <span className="font-medium">Tips:</span> {channel.tips}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sequence">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  21-Day Outreach Sequence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {outreachSequence.map((step, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        D{step.day}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{step.action}</div>
                        <div className="text-sm text-muted-foreground">Target: {step.target}</div>
                        <div className="text-sm font-medium text-primary">Goal: {step.goal}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200">
                  <div className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                    🎯 Success Metrics
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Response Rate:</span>
                      <p className="text-yellow-600">Target: 60%+</p>
                    </div>
                    <div>
                      <span className="font-medium">Meeting Conversion:</span>
                      <p className="text-yellow-600">Target: 25%+</p>
                    </div>
                    <div>
                      <span className="font-medium">Partnership Interest:</span>
                      <p className="text-yellow-600">Target: 1 serious discussion</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Quick Message Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded">
                    <div className="font-semibold mb-2">LinkedIn Connection Request:</div>
                    <div className="text-sm bg-muted p-3 rounded font-mono">
                      "Hi [Name], I'm building a revolutionary digital asset platform that showcases what's possible with Lovable. Would love to connect and share how we're creating a new $750B market category. Best, [Your Name]"
                    </div>
                  </div>

                  <div className="p-4 border rounded">
                    <div className="font-semibold mb-2">LinkedIn Follow-up Message:</div>
                    <div className="text-sm bg-muted p-3 rounded font-mono">
                      "Thanks for connecting! We've built Sustaino-Sphere™ entirely on Lovable - a digital business valuation platform that's creating an entirely new market. Perfect showcase of Lovable's enterprise capabilities. Worth a 15-minute chat about partnership opportunities?"
                    </div>
                  </div>

                  <div className="p-4 border rounded">
                    <div className="font-semibold mb-2">Twitter Engagement:</div>
                    <div className="text-sm bg-muted p-3 rounded font-mono">
                      "@lovable Just launched Sustaino-Sphere™ - the world's first digital business stock exchange - built entirely on your platform! Amazing what's possible with no-code at enterprise scale. 🚀 #BuiltOnLovable #DigitalInnovation"
                    </div>
                  </div>

                  <div className="p-4 border rounded">
                    <div className="font-semibold mb-2">Email Subject Lines:</div>
                    <div className="space-y-2 text-sm">
                      <div className="bg-muted p-2 rounded font-mono">"Partnership: $750B Market Creation with Sustaino-Sphere™"</div>
                      <div className="bg-muted p-2 rounded font-mono">"Lovable Enterprise Showcase - Category-Creating Platform"</div>
                      <div className="bg-muted p-2 rounded font-mono">"Strategic Partnership: Digital Business Valuation Platform"</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="border-primary shadow-lg bg-primary/5">
          <CardContent className="text-center py-6">
            <h3 className="text-xl font-bold mb-4">Ready to Launch Outreach Campaign?</h3>
            <p className="text-muted-foreground mb-4">
              Follow the 21-day sequence for maximum impact and partnership success
            </p>
            <Button size="lg" className="bg-primary">
              <Target className="h-5 w-5 mr-2" />
              Begin Outreach Sequence
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LovableContactStrategy;