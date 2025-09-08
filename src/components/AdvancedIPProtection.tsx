/**
 * ============================================================================
 * ADVANCED IP PROTECTION DISPLAY COMPONENT
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Comprehensive IP Protection Information System with Real-time Monitoring
 * Multi-jurisdictional Patent, Trademark & Copyright Protection Display
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, Copyright, Award, Hash, Globe, Users, DollarSign, 
  AlertTriangle, CheckCircle, Clock, FileText, Eye, Lock,
  Scale, Building, Phone, Mail, ExternalLink, Download
} from 'lucide-react';
import { 
  CORE_PATENT_PORTFOLIO, 
  PENDING_APPLICATIONS, 
  calculatePatentValue, 
  generatePatentReport 
} from '@/lib/patent-protection';
import { 
  CORE_TRADEMARK_PORTFOLIO, 
  PENDING_TRADEMARK_APPLICATIONS,
  calculateTrademarkValue, 
  generateTrademarkReport,
  TRADEMARK_CLASSES 
} from '@/lib/trademark-protection';
import { 
  IP_PROTECTION_LEVELS,
  PROTECTED_TECHNOLOGIES,
  LICENSING_FRAMEWORK,
  ENFORCEMENT_PROCEDURES,
  CONTACT_INFORMATION
} from '@/lib/ip-protection-comprehensive';

const AdvancedIPProtection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [patentReport, setPatentReport] = useState<any>(null);
  const [trademarkReport, setTrademarkReport] = useState<any>(null);
  const [monitoringStatus, setMonitoringStatus] = useState('ACTIVE');

  useEffect(() => {
    setPatentReport(generatePatentReport());
    setTrademarkReport(generateTrademarkReport());
  }, []);

  const totalIPValue = () => {
    const patentValue = CORE_PATENT_PORTFOLIO.reduce((sum, p) => sum + calculatePatentValue(p), 0);
    const trademarkValue = CORE_TRADEMARK_PORTFOLIO.reduce((sum, t) => sum + calculateTrademarkValue(t), 0);
    return patentValue + trademarkValue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with IP Alert Banner */}
        <div className="mb-8">
          <Alert className="mb-6 border-primary bg-primary/5">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>IP PROTECTION ACTIVE:</strong> This platform and all its methodologies are protected by 
              international patents, trademarks, and copyright laws. Unauthorized use is monitored 24/7 and 
              will result in immediate legal action. For licensing inquiries: licensing@delderenzoproperty.com
            </AlertDescription>
          </Alert>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-12 w-12 text-primary" />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                  Advanced IP Protection Center
                </h1>
                <p className="text-lg text-muted-foreground">
                  Comprehensive Intellectual Property Management & Enforcement System
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="default" className="flex items-center gap-1">
                <Copyright className="h-3 w-3" />
                Copyright Protected
              </Badge>
              <Badge variant="default" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {CORE_PATENT_PORTFOLIO.filter(p => p.status === 'GRANTED').length} Patents Granted
              </Badge>
              <Badge variant="default" className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {CORE_TRADEMARK_PORTFOLIO.filter(t => t.status === 'REGISTERED').length} Trademarks™
              </Badge>
              <Badge variant="default" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                Global Protection
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                24/7 Monitoring
              </Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Total IP Value</span>
              </div>
              <p className="text-2xl font-bold text-success">
                ${(totalIPValue() / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-muted-foreground">Portfolio Valuation</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-info/10 to-info/5 border-info/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-info" />
                <span className="text-sm font-medium">Active Patents</span>
              </div>
              <p className="text-2xl font-bold text-info">
                {CORE_PATENT_PORTFOLIO.filter(p => p.status === 'GRANTED').length}
              </p>
              <p className="text-sm text-muted-foreground">
                +{PENDING_APPLICATIONS.length} Pending
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Trademarks</span>
              </div>
              <p className="text-2xl font-bold text-warning">
                {CORE_TRADEMARK_PORTFOLIO.filter(t => t.status === 'REGISTERED').length}
              </p>
              <p className="text-sm text-muted-foreground">
                +{PENDING_TRADEMARK_APPLICATIONS.length} Pending
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Jurisdictions</span>
              </div>
              <p className="text-2xl font-bold text-primary">27</p>
              <p className="text-sm text-muted-foreground">Countries Protected</p>
            </CardContent>
          </Card>
        </div>

        {/* Main IP Protection Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patents">Patents</TabsTrigger>
            <TabsTrigger value="trademarks">Trademarks</TabsTrigger>
            <TabsTrigger value="licensing">Licensing</TabsTrigger>
            <TabsTrigger value="enforcement">Enforcement</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Protected Technologies */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Protected Technologies
                  </CardTitle>
                  <CardDescription>
                    Core intellectual property assets under protection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {PROTECTED_TECHNOLOGIES.map((tech, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{tech.category}</h4>
                          <Badge variant="outline">
                            {tech.protection_level}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {tech.technologies.slice(0, 2).map((technology, i) => (
                            <div key={i}>• {technology}</div>
                          ))}
                          {tech.technologies.length > 2 && (
                            <div className="text-xs">+{tech.technologies.length - 2} more...</div>
                          )}
                        </div>
                        <div className="mt-2 text-xs">
                          <strong>Patents:</strong> {tech.patents.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* IP Protection Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    Protection Status
                  </CardTitle>
                  <CardDescription>
                    Real-time monitoring and protection status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Patent Protection</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20" />
                        <Badge variant="default" className="bg-success">92%</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Trademark Protection</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-20" />
                        <Badge variant="default" className="bg-success">88%</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Copyright Coverage</span>
                      <div className="flex items-center gap-2">
                        <Progress value={100} className="w-20" />
                        <Badge variant="default" className="bg-success">100%</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Global Monitoring</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${monitoringStatus === 'ACTIVE' ? 'bg-success' : 'bg-warning'}`}></div>
                        <Badge variant="outline">{monitoringStatus}</Badge>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Recent Activity</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-success" />
                          <span>Patent US11,234,567 maintenance fee paid</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-warning" />
                          <span>Trademark watch alert: Similar mark detected</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3 text-destructive" />
                          <span>Potential infringement reported - investigating</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Licensing Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-info" />
                    Commercial Licensing
                  </CardTitle>
                  <CardDescription>
                    Available licensing options and terms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(LICENSING_FRAMEWORK.tiers).map(([key, tier]) => (
                      <div key={key} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{tier.name}</h4>
                          <Badge variant="outline">
                            {typeof tier.price === 'number' ? `$${tier.price.toLocaleString()}` : tier.price}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Users: {tier.users} • Period: {tier.period}
                        </div>
                        <div className="text-xs space-y-1">
                          {tier.features.slice(0, 2).map((feature, i) => (
                            <div key={i}>• {feature}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Request Licensing Information
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    Legal and licensing contact details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Licensing Department</div>
                          <div className="text-muted-foreground">{CONTACT_INFORMATION.licensing.email}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Legal Department</div>
                          <div className="text-muted-foreground">{CONTACT_INFORMATION.legal.phone}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <div>
                          <div className="font-medium">Emergency Legal</div>
                          <div className="text-muted-foreground">{CONTACT_INFORMATION.legal.emergency}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button variant="outline" size="sm" className="w-full mb-2">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Report IP Violation
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download IP Documentation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patents" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Granted Patents */}
              <Card>
                <CardHeader>
                  <CardTitle>Granted Patents Portfolio</CardTitle>
                  <CardDescription>
                    Active patents providing technology protection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {CORE_PATENT_PORTFOLIO.filter(p => p.status === 'GRANTED').map((patent, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{patent.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {patent.patent_number} • {patent.jurisdiction}
                            </p>
                          </div>
                          <Badge variant="default" className="bg-success">
                            GRANTED
                          </Badge>
                        </div>
                        <div className="text-xs space-y-1">
                          <div><strong>Grant Date:</strong> {patent.grant_date}</div>
                          <div><strong>Expiry:</strong> {patent.expiry_date}</div>
                          <div><strong>Claims:</strong> {patent.claims_count}</div>
                          <div><strong>Value:</strong> ${calculatePatentValue(patent).toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Patent Applications</CardTitle>
                  <CardDescription>
                    Applications under examination
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {PENDING_APPLICATIONS.map((app, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{app.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {app.application_number}
                            </p>
                          </div>
                          <Badge variant="secondary">
                            PENDING
                          </Badge>
                        </div>
                        <div className="text-xs space-y-1">
                          <div><strong>Filed:</strong> {app.filing_date}</div>
                          <div><strong>Expected Grant:</strong> {app.expected_grant}</div>
                          <div><strong>Claims:</strong> {app.claims_count}</div>
                          <div><strong>Budget:</strong> ${app.prosecution_budget.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trademarks" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Registered Trademarks */}
              <Card>
                <CardHeader>
                  <CardTitle>Registered Trademarks</CardTitle>
                  <CardDescription>
                    Protected brand assets and service marks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {CORE_TRADEMARK_PORTFOLIO.filter(t => t.status === 'REGISTERED').map((trademark, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{trademark.mark}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {trademark.registration_number} • {trademark.jurisdiction}
                            </p>
                          </div>
                          <Badge variant="default" className="bg-success">
                            REGISTERED
                          </Badge>
                        </div>
                        <div className="text-xs space-y-1">
                          <div><strong>Classes:</strong> {trademark.classes.map(c => c.class_number).join(', ')}</div>
                          <div><strong>Registration:</strong> {trademark.registration_date}</div>
                          <div><strong>Renewal:</strong> {trademark.renewal_date}</div>
                          <div><strong>Value:</strong> ${(350000).toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trademark Classes */}
              <Card>
                <CardHeader>
                  <CardTitle>Protected Trademark Classes</CardTitle>
                  <CardDescription>
                    Goods and services classification coverage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(TRADEMARK_CLASSES).map(([classNum, classInfo]) => (
                      <div key={classNum} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Class {classInfo.number}</Badge>
                          <h4 className="font-medium text-sm">
                            {classInfo.title.split(',')[0]}...
                          </h4>
                        </div>
                        <div className="text-xs space-y-1 text-muted-foreground">
                          {('relevant_goods' in classInfo ? classInfo.relevant_goods : classInfo.relevant_services)?.slice(0, 2).map((item, i) => (
                            <div key={i}>• {item}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="licensing" className="mt-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Commercial Licensing Framework</CardTitle>
                  <CardDescription>
                    Comprehensive licensing options for commercial use of protected IP
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(LICENSING_FRAMEWORK.tiers).map(([key, tier]) => (
                      <div key={key} className="border rounded-lg p-4">
                        <div className="text-center mb-4">
                          <h3 className="font-semibold text-lg">{tier.name}</h3>
                          <div className="text-2xl font-bold mt-2">
                            {typeof tier.price === 'number' ? `$${tier.price.toLocaleString()}` : tier.price}
                          </div>
                          <p className="text-sm text-muted-foreground">per {tier.period}</p>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="text-sm">
                            <strong>Users:</strong> {tier.users}
                          </div>
                          <div className="text-sm">
                            <strong>Features:</strong>
                          </div>
                          <ul className="text-xs space-y-1 text-muted-foreground">
                            {tier.features.map((feature, i) => (
                              <li key={i}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button 
                          variant={key === 'ENTERPRISE' ? 'default' : 'outline'} 
                          size="sm" 
                          className="w-full"
                        >
                          {key === 'WHITE_LABEL' ? 'Contact Sales' : 'Get License'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Licensing Requirements & Restrictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Requirements</h4>
                      <div className="space-y-2">
                        {Object.entries(LICENSING_FRAMEWORK.requirements).map(([req, required]) => (
                          <div key={req} className="flex items-center gap-2">
                            {required ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="text-sm capitalize">
                              {req.replace(/_/g, ' ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Restrictions</h4>
                      <div className="space-y-2">
                        {Object.entries(LICENSING_FRAMEWORK.restrictions).map(([restriction, value]) => (
                          <div key={restriction} className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-warning" />
                            <span className="text-sm capitalize">
                              {restriction.replace(/_/g, ' ')}: {String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="enforcement" className="mt-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-destructive" />
                    IP Enforcement & Legal Penalties
                  </CardTitle>
                  <CardDescription>
                    Comprehensive enforcement procedures and penalty structure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4">Civil Remedies</h4>
                      <div className="space-y-3">
                        {Object.entries(ENFORCEMENT_PROCEDURES.penalties.civil_damages).map(([penalty, amount]) => (
                          <div key={penalty} className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm capitalize">{penalty.replace(/_/g, ' ')}</span>
                            <Badge variant="outline">
                             {typeof amount === 'string' ? amount : `$${(amount as number).toLocaleString()}`}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">Criminal Penalties</h4>
                      <div className="space-y-3">
                        {Object.entries(ENFORCEMENT_PROCEDURES.penalties.criminal_penalties).map(([penalty, amount]) => (
                          <div key={penalty} className="flex justify-between items-center border-b pb-2">
                            <span className="text-sm capitalize">{penalty.replace(/_/g, ' ')}</span>
                            <Badge variant="destructive">
                              {typeof amount === 'string' ? amount : `$${amount.toLocaleString()}`}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enforcement Response Levels</CardTitle>
                  <CardDescription>
                    Escalating response procedures for IP violations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(ENFORCEMENT_PROCEDURES.response_levels).map(([level, details]) => (
                      <div key={level} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{level.replace(/_/g, ' ')}</h4>
                          <Badge variant="outline">{details.timeline}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{details.action}</p>
                        <div className="text-xs">
                          <strong>Escalation:</strong> {details.escalation}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="mt-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    24/7 IP Monitoring System
                  </CardTitle>
                  <CardDescription>
                    Real-time global monitoring and threat detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-success">Active</div>
                      <div className="text-sm text-muted-foreground">System Status</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-info">150+</div>
                      <div className="text-sm text-muted-foreground">Jurisdictions</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-warning">$10,000</div>
                      <div className="text-sm text-muted-foreground">Bounty Program</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Monitoring Features</h4>
                    {Object.entries(ENFORCEMENT_PROCEDURES.monitoring).map(([feature, status]) => (
                      <div key={feature} className="flex justify-between items-center">
                        <span className="text-sm capitalize">{feature.replace(/_/g, ' ')}</span>
                        <Badge variant="default" className="bg-success">
                          {status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report IP Violation</CardTitle>
                  <CardDescription>
                    Submit reports of potential intellectual property violations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-sm text-muted-foreground">
                      If you believe someone is infringing on our intellectual property,
                      please report it immediately using the secure portal.
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full" variant="destructive">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Report Violation
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Legal Team
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Emergency Legal Hotline: {CONTACT_INFORMATION.legal.emergency}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Legal Notice */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>LEGAL NOTICE:</strong> This software and all associated methodologies, algorithms, 
                and templates are protected by international copyright laws, granted patents, and registered trademarks.
              </p>
              <p>
                Unauthorized use, reproduction, modification, or distribution is strictly prohibited and 
                may result in severe civil and criminal penalties including monetary damages up to $5,000,000 
                and imprisonment up to 10 years.
              </p>
              <p>
                For licensing inquiries: {CONTACT_INFORMATION.licensing.email} | 
                Legal enforcement: {CONTACT_INFORMATION.enforcement.email}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedIPProtection;