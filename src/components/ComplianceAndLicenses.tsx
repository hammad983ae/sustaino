import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, CheckCircle, Lock, Award, FileText, Scale } from "lucide-react";

const ComplianceAndLicenses = () => {
  return (
    <div className="space-y-6">
      {/* Security & Certificates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security & Certificates
          </CardTitle>
          <CardDescription>
            Enterprise-grade security and compliance certifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ISO Certification */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">ISO 27001:2022</h3>
                <p className="text-sm text-muted-foreground">Information Security Management System</p>
              </div>
              <Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                CERTIFIED
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Certificate No: DPG-LSMS-27001-2024-001</p>
              <p>Valid until September 2025</p>
              <p>Issued by: International Certification Authority</p>
            </div>
          </div>

          {/* Content Protection Features */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Content Protection Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Right-click Protection",
                "Developer Tools Warning", 
                "Advanced Shortcut Blocking",
                "Content Watermarking"
              ].map((feature) => (
                <div key={feature} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm">{feature}</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Intellectual Property Protection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Intellectual Property Protection
          </CardTitle>
          <CardDescription>
            Comprehensive IP rights and registered protections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Registered Trademarks */}
          <div>
            <h3 className="font-semibold mb-3">Registered Trademarks</h3>
            <div className="space-y-2">
              {[
                "Property Pro™",
                "ESG Analysis Suite™",
                "Property Valuation Platform™",
                "Smart Property Analytics™"
              ].map((trademark) => (
                <div key={trademark} className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">TM</Badge>
                  <span className="text-sm">{trademark}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Patent Applications */}
          <div>
            <h3 className="font-semibold mb-3">Patent Applications</h3>
            <div className="space-y-3">
              {[
                { id: "AU2025123456", desc: "Automated Property Valuation Algorithm" },
                { id: "AU2025123457", desc: "ESG Risk Assessment Method" },
                { id: "AU2025123458", desc: "Sustainability Scoring System" }
              ].map((patent) => (
                <div key={patent.id} className="bg-muted/30 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">Patent No. {patent.id}</p>
                      <p className="text-xs text-muted-foreground">{patent.desc}</p>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Copyright Protection */}
          <div>
            <h3 className="font-semibold mb-3">Copyright Protection</h3>
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-sm font-medium">© 2025 Delderenzo Property Group Pty Ltd</p>
              <p className="text-xs text-muted-foreground mt-1">
                All valuation algorithms and methodologies
              </p>
              <p className="text-xs text-muted-foreground">
                Licensed under MIT License for authorized users
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Legal Compliance
          </CardTitle>
          <CardDescription>
            Regulatory compliance and legal certifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "GDPR Compliant", status: "Compliant" },
              { name: "CCPA Compliant", status: "Compliant" },
              { name: "SOC Compliant", status: "Compliant" },
              { name: "SOC 2 Type II", status: "Audit Ready" }
            ].map((compliance) => (
              <div key={compliance.name} className="text-center p-4 border rounded-lg">
                <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="font-medium text-sm">{compliance.name}</p>
                <Badge 
                  className={`mt-2 ${
                    compliance.status === 'Audit Ready' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}
                >
                  {compliance.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceAndLicenses;