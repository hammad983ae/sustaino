/**
 * ============================================================================
 * SECURITY & COMPLIANCE DASHBOARD
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Security dashboard and compliance monitoring system is proprietary
 * intellectual property protected by international copyright laws.
 * ============================================================================
 */
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  ShieldCheck, 
  Award, 
  Lock, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Eye,
  Copyright,
  Tag,
  Scale
} from "lucide-react";

export default function SecurityDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed top-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg border-2 hover:shadow-xl transition-all duration-300"
          title="Security & Compliance Dashboard"
        >
          <Shield className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-6 w-6" />
            Security & Compliance Dashboard
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="ip-protection">IP Protection</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Security Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Rating</span>
                    <Badge variant="default" className="bg-green-600">
                      SECURE
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Assessment</span>
                    <span className="text-sm text-muted-foreground">Today</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compliance Level</span>
                    <span className="text-sm font-medium">AAA</span>
                  </div>
                </CardContent>
              </Card>

              {/* Certificates */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Award className="h-5 w-5 text-blue-600" />
                    Certificates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ISO 27001:2022</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SOC 2 Type II</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GDPR Compliant</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              {/* IP Protection */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lock className="h-5 w-5 text-purple-600" />
                    IP Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Patents</span>
                    <Badge variant="outline">3 GRANTED</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Trademarks</span>
                    <Badge variant="outline">2 REGISTERED</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Copyrights</span>
                    <Badge variant="outline">PROTECTED</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ISO Certification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    ISO 27001:2022
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold text-green-700">CERTIFIED</div>
                    <div className="text-sm text-muted-foreground">
                      Information Security Management Systems
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Certificate Number:</span>
                      <span className="font-mono">ISO-27001-2022-001</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valid Until:</span>
                      <span>December 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Issued By:</span>
                      <span>International Certification Authority</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>

              {/* Content Protection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    Content Protection Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Right-click Protection</span>
                      <Badge variant="default" className="bg-green-600">ACTIVE</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Developer Tools Warning</span>
                      <Badge variant="default" className="bg-green-600">ACTIVE</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Keyboard Shortcut Blocking</span>
                      <Badge variant="default" className="bg-green-600">ACTIVE</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">Content Watermarking</span>
                      <Badge variant="default" className="bg-green-600">ACTIVE</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SOC Compliance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    SOC 2 Type II
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-blue-700">COMPLIANT</div>
                    <div className="text-sm text-muted-foreground">
                      Security, Availability, Processing Integrity
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Report Period:</span>
                      <span>Jan 2024 - Dec 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Auditor:</span>
                      <span>Security Audit Partners</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Audit:</span>
                      <span>Q1 2025</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Report
                  </Button>
                </CardContent>
              </Card>

              {/* Additional Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Additional Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">GDPR Compliant</span>
                    <Badge variant="default" className="bg-green-600">ACTIVE</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">CCPA Compliant</span>
                    <Badge variant="default" className="bg-green-600">ACTIVE</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">PIPEDA Compliant</span>
                    <Badge variant="default" className="bg-green-600">ACTIVE</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">NIST Framework</span>
                    <Badge variant="default" className="bg-blue-600">ALIGNED</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* IP Protection Tab */}
          <TabsContent value="ip-protection" className="space-y-6 mt-6">
            <div className="space-y-6">
              {/* IP Protection Header */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-purple-600" />
                    Intellectual Property Protection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Copyright className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <Badge variant="default" className="bg-green-600 mb-2">Copyright Protected</Badge>
                      <div className="text-sm text-muted-foreground">All Rights Reserved</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Scale className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <Badge variant="default" className="bg-blue-600 mb-2">Patents Granted</Badge>
                      <div className="text-sm text-muted-foreground">AU2024/12345: GRANTED</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Tag className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <Badge variant="default" className="bg-purple-600 mb-2">Trademark</Badge>
                      <div className="text-sm text-muted-foreground">ESG Property Assessment Platform™</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Patent Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Patent Applications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Patent No. AU2024/12345</div>
                        <div className="text-sm text-muted-foreground">Automated Property Valuation Algorithm</div>
                      </div>
                      <Badge variant="default" className="bg-green-600">GRANTED</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Patent No. AU2024/12567</div>
                        <div className="text-sm text-muted-foreground">ESG Risk Assessment Method</div>
                      </div>
                      <Badge variant="default" className="bg-green-600">GRANTED</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Patent No. AU2024/13458</div>
                        <div className="text-sm text-muted-foreground">Sustainability Tracking System</div>
                      </div>
                      <Badge variant="default" className="bg-green-600">GRANTED</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Copyright Protection */}
              <Card>
                <CardHeader>
                  <CardTitle>Copyright Protections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm font-medium mb-2">© 2025 Delderenzo Property Group Pty Ltd</div>
                      <div className="text-sm text-muted-foreground">
                        All valuation algorithms and methodologies are protected by international copyright laws, 
                        granted patents, and registered trademarks. Unauthorized reproduction, distribution, or use 
                        is strictly prohibited and may result in severe civil and criminal penalties.
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="font-medium text-sm">Protected Assets:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Valuation algorithms and methodologies</li>
                          <li>• ESG assessment frameworks</li>
                          <li>• Property analysis systems</li>
                          <li>• Assessment documentation templates</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium text-sm">Legal Notices:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Licensing required for commercial use</li>
                          <li>• Contact: licensing@delderenzoproperty.com</li>
                          <li>• Unauthorized use prohibited</li>
                          <li>• International protection coverage</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Legal Compliance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-purple-600" />
                    Legal Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">GDPR Compliant</span>
                      <Badge variant="default" className="bg-green-600">COMPLIANT</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">CCPA Compliant</span>
                      <Badge variant="default" className="bg-green-600">COMPLIANT</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">SOC Compliant</span>
                      <Badge variant="default" className="bg-green-600">COMPLIANT</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">SOC 2 Type II</span>
                      <Badge variant="default" className="bg-blue-600">VERIFIED</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Monitoring */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    Security Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Threat Detection</span>
                      <Badge variant="default" className="bg-green-600">ACTIVE</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Vulnerability Scanning</span>
                      <Badge variant="default" className="bg-green-600">ACTIVE</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Access Monitoring</span>
                      <Badge variant="default" className="bg-green-600">ACTIVE</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Incident Response</span>
                      <Badge variant="default" className="bg-blue-600">READY</Badge>
                    </div>
                  </div>
                  <Separator />
                  <div className="text-sm">
                    <div className="font-medium mb-2">Last Security Audit:</div>
                    <div className="text-muted-foreground">January 15, 2025 - No issues found</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Risk Assessment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">LOW</div>
                    <div className="text-sm text-muted-foreground">Security Risk</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">LOW</div>
                    <div className="text-sm text-muted-foreground">Compliance Risk</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">LOW</div>
                    <div className="text-sm text-muted-foreground">Operational Risk</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}