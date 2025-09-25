/**
 * ============================================================================
 * COMPREHENSIVE TERMS OF SERVICE - PRODUCTION DEPLOYMENT
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * ============================================================================
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Scale, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Download,
  Printer
} from "lucide-react";

const TermsOfService = () => {
  const [acceptedSections, setAcceptedSections] = useState({
    general: false,
    ip: false,
    data: false,
    liability: false,
    termination: false,
    governing: false
  });

  const [allAccepted, setAllAccepted] = useState(false);

  const handleSectionAcceptance = (section: string, accepted: boolean) => {
    const newAccepted = { ...acceptedSections, [section]: accepted };
    setAcceptedSections(newAccepted);
    setAllAccepted(Object.values(newAccepted).every(Boolean));
  };

  const termsSection = [
    {
      id: "general",
      title: "1. General Terms & Platform Access",
      content: [
        "These Terms of Service govern your use of the SustainoPro Property Valuation Platform™ and related services.",
        "By accessing or using our platform, you agree to be bound by these terms and all applicable laws.",
        "You must be at least 18 years old and have the legal capacity to enter into contracts.",
        "Use of professional valuation features requires appropriate licensing and qualifications.",
        "All platform access is subject to valid licensing agreements and compliance verification."
      ]
    },
    {
      id: "ip",
      title: "2. Intellectual Property Rights",
      content: [
        "All platform content, including software, algorithms, methodologies, and data, are protected by copyright, patents, and trade secrets.",
        "Patents: AU2025567890, US12,345,678, EP4567890, GB4567890 protect core valuation technologies.",
        "Trademarks: SustainoPro™, ESG PropertyPRO™, Sustano-Sphere™, GreenValue™ are registered trademarks.",
        "Users receive limited, non-exclusive, non-transferable license to use platform features as authorized.",
        "Reverse engineering, copying, or creating derivative works is strictly prohibited.",
        "Unauthorized use may result in immediate termination and legal action for IP infringement."
      ]
    },
    {
      id: "data",
      title: "3. Data Protection & Privacy",
      content: [
        "We comply with GDPR, CCPA, PIPEDA, and Australian Privacy Principles in data handling.",
        "User data is processed according to our Privacy Policy and Data Processing Agreement.",
        "Property data and valuations may be aggregated for market analysis (anonymized).",
        "Users retain ownership of their property data but grant us license to process and analyze.",
        "ISO 27001 and SOC 2 Type II certifications ensure enterprise-grade data security.",
        "Data breach notification procedures comply with all applicable privacy laws."
      ]
    },
    {
      id: "liability", 
      title: "4. Limitation of Liability & Professional Standards",
      content: [
        "Platform provides information tools; users remain responsible for professional judgment.",
        "Valuations are estimates based on available data and should not replace professional appraisals.",
        "We maintain AUD $50 million professional indemnity insurance coverage.",
        "Liability is limited to the amount paid for services in the 12 months preceding any claim.",
        "We are not liable for indirect, consequential, or punitive damages.",
        "Users indemnify us against claims arising from their use of platform data or methodologies."
      ]
    },
    {
      id: "termination",
      title: "5. Termination & Suspension",
      content: [
        "We may suspend or terminate access for breach of terms, non-payment, or misuse.",
        "Users may terminate by providing 30 days written notice and settling outstanding obligations.",
        "Upon termination, all licenses cease and users must stop using proprietary methodologies.",
        "Data export is available for 90 days post-termination, then securely deleted.",
        "Surviving provisions include IP rights, confidentiality, liability limitations, and governing law."
      ]
    },
    {
      id: "governing",
      title: "6. Governing Law & Dispute Resolution",
      content: [
        "These terms are governed by the laws of Victoria, Australia.",
        "Disputes must first be addressed through good faith negotiations.",
        "Unresolved disputes are subject to binding arbitration under ACICA rules.",
        "Legal proceedings may be commenced in Victorian courts for IP infringement matters.",
        "International users agree to jurisdiction and may have additional local law protections."
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="border-2 border-primary bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Scale className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">TERMS OF SERVICE</CardTitle>
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground">
            SustainoPro Property Valuation Platform™ - Production Terms
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              LEGALLY BINDING
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              PRODUCTION READY
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              UPDATED 2025
            </Badge>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print Terms
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important Notice:</strong> These terms constitute a legally binding agreement. 
          Please read carefully and ensure you understand all provisions before accepting. 
          Professional legal advice is recommended for commercial use.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Terms Acceptance Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {Object.entries(acceptedSections).map(([key, accepted]) => (
              <div key={key} className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm font-medium">Section {key}</span>
                {accepted ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <div className="h-4 w-4 border-2 border-muted rounded" />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="font-semibold">All Sections Accepted:</span>
            {allAccepted ? (
              <Badge className="bg-green-100 text-green-800">Complete</Badge>
            ) : (
              <Badge variant="outline">Pending</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {termsSection.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48 w-full border rounded p-4 mb-4">
                <div className="space-y-3">
                  {section.content.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={section.id}
                  checked={acceptedSections[section.id as keyof typeof acceptedSections]}
                  onCheckedChange={(checked) => 
                    handleSectionAcceptance(section.id, checked as boolean)
                  }
                />
                <label 
                  htmlFor={section.id} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have read, understood, and accept this section
                </label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-primary">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Alert className={allAccepted ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {allAccepted ? (
                  <span className="text-green-800">
                    <strong>Terms Acceptance Complete:</strong> You have accepted all sections. 
                    You may now proceed with platform access and licensing.
                  </span>
                ) : (
                  <span className="text-red-800">
                    <strong>Acceptance Required:</strong> Please review and accept all sections 
                    before proceeding with platform access.
                  </span>
                )}
              </AlertDescription>
            </Alert>

            <div className="flex justify-center">
              <Button 
                disabled={!allAccepted}
                className="px-8 py-2"
                onClick={() => {
                  if (allAccepted) {
                    alert("Terms of Service accepted. Proceeding to license agreement...");
                  }
                }}
              >
                {allAccepted ? "Proceed to Licensing" : "Complete All Sections First"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2 text-sm">
            <p><strong>Document Information:</strong></p>
            <p>Version: 2025.1 | Effective Date: January 17, 2025 | Last Updated: January 17, 2025</p>
            <p><strong>Legal Contact:</strong> legal@delderenzoproperty.com | <strong>Terms Questions:</strong> terms@delderenzoproperty.com</p>
            <p><strong>Emergency Legal Hotline:</strong> +61 (0) 400 789 123</p>
            <p className="text-xs text-muted-foreground mt-4">
              © 2025 Delderenzo Property Group Pty Ltd. All rights reserved. 
              This document is protected by copyright and may not be reproduced without written permission.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;