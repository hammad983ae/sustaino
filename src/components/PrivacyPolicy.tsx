/**
 * ============================================================================
 * COMPREHENSIVE PRIVACY POLICY - GDPR/CCPA/PIPEDA COMPLIANT
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * ============================================================================
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  Database, 
  Globe,
  Download,
  Settings,
  Trash2,
  FileText,
  Phone
} from "lucide-react";

const PrivacyPolicy = () => {
  const [cookieConsent, setCookieConsent] = useState(false);

  const dataTypes = [
    {
      category: "Personal Information",
      description: "Name, email, phone, professional credentials",
      purpose: "Account management, communication, service delivery",
      retention: "7 years from last activity",
      sharing: "Not shared with third parties"
    },
    {
      category: "Property Data", 
      description: "Addresses, valuations, property details, photos",
      purpose: "Valuation services, market analysis, reporting",
      retention: "10 years (regulatory requirement)",
      sharing: "Aggregated data only (anonymized)"
    },
    {
      category: "Usage Analytics",
      description: "Platform usage, feature interactions, session data",
      purpose: "Platform improvement, performance optimization",
      retention: "2 years from collection",
      sharing: "Analytics providers (anonymized)"
    },
    {
      category: "Financial Information",
      description: "Payment details, subscription data, invoicing",
      purpose: "Billing, compliance, audit requirements", 
      retention: "7 years (accounting standards)",
      sharing: "Payment processors only"
    }
  ];

  const userRights = [
    {
      right: "Right to Access",
      description: "Request copies of your personal data",
      action: "Email data-access@delderenzoproperty.com",
      timeframe: "30 days"
    },
    {
      right: "Right to Rectification",
      description: "Correct inaccurate or incomplete data",
      action: "Update via platform settings or contact support",
      timeframe: "Immediate"
    },
    {
      right: "Right to Erasure",
      description: "Request deletion of your data (subject to legal obligations)",
      action: "Email data-deletion@delderenzoproperty.com",
      timeframe: "30 days"
    },
    {
      right: "Right to Portability",
      description: "Receive your data in machine-readable format",
      action: "Request via platform export or email",
      timeframe: "30 days"
    },
    {
      right: "Right to Object",
      description: "Object to processing for direct marketing",
      action: "Unsubscribe or contact privacy officer",
      timeframe: "Immediate"
    },
    {
      right: "Right to Restrict",
      description: "Limit how we process your data",
      action: "Email privacy@delderenzoproperty.com",
      timeframe: "30 days"
    }
  ];

  const securityMeasures = [
    "ISO 27001:2022 certified information security management",
    "SOC 2 Type II audited security controls",
    "End-to-end encryption for data in transit and at rest",
    "Multi-factor authentication and role-based access control",
    "Regular security audits and penetration testing",
    "24/7 security monitoring and incident response",
    "Secure data centers with physical access controls",
    "Employee security training and background checks"
  ];

  const jurisdictions = [
    {
      region: "Australia",
      laws: ["Privacy Act 1988", "Notifiable Data Breaches scheme"],
      authority: "Office of the Australian Information Commissioner (OAIC)"
    },
    {
      region: "European Union",
      laws: ["General Data Protection Regulation (GDPR)"],
      authority: "Local Data Protection Authorities"
    },
    {
      region: "United States",
      laws: ["California Consumer Privacy Act (CCPA)", "State Privacy Laws"],
      authority: "California Attorney General, State Attorneys General"
    },
    {
      region: "Canada", 
      laws: ["Personal Information Protection and Electronic Documents Act (PIPEDA)"],
      authority: "Privacy Commissioner of Canada"
    },
    {
      region: "United Kingdom",
      laws: ["UK General Data Protection Regulation", "Data Protection Act 2018"],
      authority: "Information Commissioner's Office (ICO)"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card className="border-2 border-primary bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">PRIVACY POLICY</CardTitle>
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Comprehensive Data Protection - GDPR, CCPA, PIPEDA Compliant
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              GDPR COMPLIANT
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              CCPA COMPLIANT
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              PIPEDA COMPLIANT
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data">Data Collection</TabsTrigger>
          <TabsTrigger value="rights">Your Rights</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Privacy at a Glance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">What We Collect</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Personal identification information</li>
                      <li>• Property data and valuation details</li>
                      <li>• Usage analytics and platform interactions</li>
                      <li>• Financial information for billing</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">How We Use It</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Providing valuation services</li>
                      <li>• Platform improvement and optimization</li>
                      <li>• Legal compliance and audit requirements</li>
                      <li>• Market research (anonymized data only)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Privacy by Design:</strong> We implement privacy protection at every level of our platform. 
                Data minimization, purpose limitation, and user control are core principles in our design philosophy.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Database className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-2">Data Minimization</h4>
                  <p className="text-sm text-muted-foreground">
                    We only collect data necessary for service delivery
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-2">User Control</h4>
                  <p className="text-sm text-muted-foreground">
                    You control your data with comprehensive rights and tools
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-2">Global Compliance</h4>
                  <p className="text-sm text-muted-foreground">
                    Compliant with major privacy laws worldwide
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="data">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Collection & Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {dataTypes.map((data, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold">{data.category}</h4>
                        <Badge variant="outline">{data.retention}</Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Data Types:</span>
                          <p className="text-muted-foreground">{data.description}</p>
                        </div>
                        <div>
                          <span className="font-medium">Purpose:</span>
                          <p className="text-muted-foreground">{data.purpose}</p>
                        </div>
                        <div>
                          <span className="font-medium">Sharing:</span>
                          <p className="text-muted-foreground">{data.sharing}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Legal Basis for Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold mb-2">Contractual Necessity</h5>
                    <p className="text-muted-foreground">
                      Processing necessary for service delivery and account management
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Legitimate Interests</h5>
                    <p className="text-muted-foreground">
                      Platform improvement, security, and fraud prevention
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Legal Compliance</h5>
                    <p className="text-muted-foreground">
                      Meeting regulatory requirements and audit obligations
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Consent</h5>
                    <p className="text-muted-foreground">
                      Marketing communications and optional analytics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rights">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Privacy Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {userRights.map((right, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{right.right}</h4>
                        <Badge variant="outline">{right.timeframe}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{right.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">How to exercise:</span>
                        <span className="text-sm text-muted-foreground">{right.action}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Download className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-2">Data Export</h4>
                  <Button variant="outline" size="sm">
                    Request Export
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Settings className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-2">Privacy Settings</h4>
                  <Button variant="outline" size="sm">
                    Manage Settings
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Trash2 className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-semibold mb-2">Delete Account</h4>
                  <Button variant="outline" size="sm">
                    Request Deletion
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Measures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {securityMeasures.map((measure, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{measure}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-5 gap-4">
              {jurisdictions.map((jurisdiction, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{jurisdiction.region}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <h5 className="text-xs font-semibold">Applicable Laws:</h5>
                        <ul className="text-xs space-y-1">
                          {jurisdiction.laws.map((law, i) => (
                            <li key={i}>• {law}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold">Authority:</h5>
                        <p className="text-xs text-muted-foreground">{jurisdiction.authority}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Privacy Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Data Protection Officer</h4>
                      <p className="text-sm">Email: dpo@delderenzoproperty.com</p>
                      <p className="text-sm">Phone: +61 (0) 400 789 124</p>
                      <p className="text-sm">Response Time: 48 hours</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Privacy Officer</h4>
                      <p className="text-sm">Email: privacy@delderenzoproperty.com</p>
                      <p className="text-sm">Phone: +61 (0) 400 789 125</p>
                      <p className="text-sm">Response Time: 72 hours</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Data Subject Requests</h4>
                      <p className="text-sm">Email: data-requests@delderenzoproperty.com</p>
                      <p className="text-sm">Online Portal: Available in account settings</p>
                      <p className="text-sm">Response Time: 30 days maximum</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Privacy Complaints</h4>
                      <p className="text-sm">Email: privacy-complaints@delderenzoproperty.com</p>
                      <p className="text-sm">Phone: +61 (0) 400 789 126</p>
                      <p className="text-sm">Response Time: 5 business days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                <strong>Document Information:</strong> This Privacy Policy was last updated on January 17, 2025. 
                We review and update our privacy practices regularly to ensure continued compliance with applicable laws.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2 text-sm">
            <p><strong>Delderenzo Property Group Pty Ltd</strong></p>
            <p>ABN: 12 345 678 901 | Privacy Policy Version: 2025.1</p>
            <p>Effective Date: January 17, 2025 | Last Updated: January 17, 2025</p>
            <p className="text-xs text-muted-foreground mt-4">
              This privacy policy is available in multiple languages and formats upon request.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;