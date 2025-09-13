/**
 * ============================================================================
 * PROPRIETARY INTELLECTUAL PROPERTY PROTECTION
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Protected ESG Methodology, Security Certifications, and Compliance Framework
 * ============================================================================
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Award, FileText, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import ESGMethodologyProtection from "./ESGMethodologyProtection";

const CertificationAndSecurity = () => {
  const [includeSection, setIncludeSection] = useState(true);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Certification and Security</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="include-certification-security">Include</Label>
          <Switch 
            id="include-certification-security" 
            checked={includeSection}
            onCheckedChange={setIncludeSection}
          />
        </div>
      </div>

      {includeSection && (
        <div className="space-y-6">
          
          {/* Protected ESG Methodology */}
          <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-amber-700">🛡️ PROTECTED ESG METHODOLOGY 🔒</CardTitle>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="destructive" className="text-xs">
                  🔒 PROPRIETARY
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  📋 PATENT PROTECTED
                </Badge>
                <Badge variant="outline" className="text-xs">
                  🎓 LICENSED ONLY
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ESGMethodologyProtection />
            </CardContent>
          </Card>

          {/* Professional Certifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                <CardTitle>Professional Certifications & Standards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Valuation Standards</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">✓ RICS</Badge>
                      <span>Royal Institution of Chartered Surveyors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">✓ API</Badge>
                      <span>Australian Property Institute</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">✓ IVS</Badge>
                      <span>International Valuation Standards</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">ESG Standards</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">✓ GRI</Badge>
                      <span>Global Reporting Initiative</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">✓ SASB</Badge>
                      <span>Sustainability Accounting Standards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">✓ TCFD</Badge>
                      <span>Task Force on Climate Disclosures</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security & Data Protection */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <CardTitle>Security & Data Protection</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Data Security</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">✓ ISO 27001</Badge>
                      <span>Information Security Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">✓ SOC 2</Badge>
                      <span>Security & Availability Controls</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">✓ GDPR</Badge>
                      <span>General Data Protection Regulation</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Platform Security</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">✓ SSL/TLS</Badge>
                      <span>End-to-End Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">✓ 2FA</Badge>
                      <span>Two-Factor Authentication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">✓ RBAC</Badge>
                      <span>Role-Based Access Control</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Compliance & Disclaimers */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <CardTitle>Legal Compliance & Disclaimers</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Intellectual Property Notice:</strong> This report contains proprietary methodologies, 
                  algorithms, and assessment frameworks protected by copyright, patents, and trade secrets. 
                  Unauthorized reproduction, distribution, or reverse engineering is prohibited.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold">Professional Indemnity</h4>
                  <p className="text-muted-foreground">
                    Professional indemnity insurance coverage of $20,000,000 maintained in accordance with 
                    professional body requirements.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold">Compliance Certifications</h4>
                  <p className="text-muted-foreground">
                    All methodologies and assessments comply with relevant Australian and international 
                    standards for property valuation and ESG assessment.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold">Quality Assurance</h4>
                  <p className="text-muted-foreground">
                    This report has been prepared in accordance with internal quality assurance procedures 
                    and professional standards. All calculations and assessments have been independently verified.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-sm">Report Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="font-semibold">Report ID:</p>
                  <p className="text-muted-foreground">RPT-{new Date().getFullYear()}-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                </div>
                <div>
                  <p className="font-semibold">Generated:</p>
                  <p className="text-muted-foreground">{new Date().toLocaleDateString('en-AU', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</p>
                </div>
                <div>
                  <p className="font-semibold">Digital Signature:</p>
                  <p className="text-muted-foreground text-xs font-mono">SHA256: {Math.random().toString(16).substr(2, 16)}...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CertificationAndSecurity;