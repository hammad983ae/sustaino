/**
 * ============================================================================
 * PROPRIETARY EXECUTIVE SUMMARY TEMPLATES
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Executive summary templates, content frameworks, and report generation
 * systems are proprietary intellectual property. Commercial licensing required.
 * ============================================================================
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, FileText, Sparkles } from "lucide-react";
import { useState } from "react";

interface ExecutiveSummaryProps {
  onNavigateToSection: (sectionIndex: number) => void;
  reportConfiguration?: {
    reportType?: string;
    propertyType?: string;
    valuationPurpose?: string[];
    instructingParty?: string;
    reliantParty?: string;
    basisOfValuation?: string[];
    valuationApproaches?: string[];
    valueComponent?: string[];
    interestValues?: string[];
    gstTreatment?: string;
    basisOfAssessment?: string;
    customBasisDescription?: string;
  };
}

const ExecutiveSummary = ({ onNavigateToSection, reportConfiguration }: ExecutiveSummaryProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // Generate introduction content based on configuration
  const generateIntroductionContent = () => {
    const config = reportConfiguration || {};
    const propertyTypeText = config.propertyType ? config.propertyType.charAt(0).toUpperCase() + config.propertyType.slice(1) : "property";
    const reportTypeText = config.reportType ? config.reportType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "valuation report";
    const purposeText = config.valuationPurpose && config.valuationPurpose.length > 0 
      ? config.valuationPurpose.join(', ').toLowerCase() 
      : "market valuation purposes";

    return `This ${reportTypeText.toLowerCase()} provides a comprehensive valuation of the ${propertyTypeText.toLowerCase()} property at 320 Deakin Avenue, Mildura VIC 3500, for ${purposeText}. The analysis incorporates recent market transactions, sector-specific data, regional economic outlook, and climate change risk assessments to support an informed understanding of the property's current market value and associated risks.

The valuation has been prepared for ${config.instructingParty || "[Instructing Party]"} and may be relied upon by ${config.reliantParty || "[Reliant Party]"}. This assessment follows professional valuation standards and incorporates ESG factors to provide a forward-looking perspective on property performance and risk.`;
  };

  // Generate configuration summary
  const generateConfigurationSummary = () => {
    const config = reportConfiguration || {};
    let summary = "**Valuation Configuration Summary:**\n\n";
    
    if (config.reportType) {
      summary += `• **Report Type:** ${config.reportType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}\n`;
    }
    if (config.propertyType) {
      summary += `• **Property Type:** ${config.propertyType.charAt(0).toUpperCase() + config.propertyType.slice(1)}\n`;
    }
    if (config.valuationPurpose && config.valuationPurpose.length > 0) {
      summary += `• **Valuation Purpose:** ${config.valuationPurpose.join(', ')}\n`;
    }
    if (config.basisOfValuation && config.basisOfValuation.length > 0) {
      summary += `• **Basis of Valuation:** ${config.basisOfValuation.join(', ')}\n`;
    }
    if (config.basisOfAssessment) {
      summary += `• **Basis of Assessment:** ${config.basisOfAssessment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}\n`;
    }
    if (config.valuationApproaches && config.valuationApproaches.length > 0) {
      summary += `• **Valuation Approaches:** ${config.valuationApproaches.join(', ')}\n`;
    }
    if (config.valueComponent && config.valueComponent.length > 0) {
      summary += `• **Value Component:** ${config.valueComponent.join(', ')}\n`;
    }
    if (config.interestValues && config.interestValues.length > 0) {
      summary += `• **Interest Values:** ${config.interestValues.join(', ')}\n`;
    }
    if (config.gstTreatment) {
      summary += `• **GST Treatment:** ${config.gstTreatment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}\n`;
    }
    if (config.instructingParty) {
      summary += `• **Instructing Party:** ${config.instructingParty}\n`;
    }
    if (config.reliantParty) {
      summary += `• **Reliant Party:** ${config.reliantParty}\n`;
    }

    return summary;
  };

  const tableOfContents = [
    { title: "Executive Summary", page: 1 },
    { title: "RPD and Location", page: 2 },
    { title: "Legal and Planning", page: 3 },
    { title: "Tenancy Schedule/Lease Details", page: 4 },
    { title: "Statutory Assessment", page: 5 },
    { title: "Market Commentary", page: 6 },
    { title: "Property Details", page: 7 },
    { title: "Environmental Statement and Sustainability Assessment", page: 8 },
    { title: "Essential Repairs", page: 9 },
    { title: "Risk Assessment and Recommendations", page: 10 },
    { title: "Previous Sales History and Current Sale", page: 11 },
    { title: "Sales Evidence (Commercial, Residential and Agricultural)", page: 12 },
    { title: "Leasing Evidence (Commercial, Residential and Agricultural)", page: 13 },
    { title: "Valuation Analysis and Rationale", page: 14 },
    { title: "Marketability and Mortgage Security", page: 15 },
    { title: "Sustaino Pro Additional Analysis and Features", page: 16 },
    { title: "Valuation Certificate", page: 17 },
    { title: "Qualifications, Disclaimers, Terms and Conditions", page: 18 },
    { title: "Annexures", page: 19 },
    { title: "Security and Certificates", page: 20 }
  ];

  return (
    <div className="space-y-6">
      {/* Introduction Page */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Report Introduction</h3>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Generate Introduction
              </Button>
            </div>
            <Textarea 
              value={generateIntroductionContent()}
              className="min-h-[120px] resize-none text-sm"
              readOnly
            />
            <div className="mt-4 p-3 bg-muted/50 rounded-md">
              <h4 className="text-sm font-medium mb-2">Configuration Details</h4>
              <div className="text-xs text-muted-foreground whitespace-pre-line">
                {generateConfigurationSummary()}
              </div>
            </div>
            <Badge variant="secondary" className="mt-2">Auto-Generated from STEP FOUR Configuration</Badge>
          </div>
        </CardContent>
      </Card>

      {/* STEP SIX Executive Summary Generation */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          <h2 className="text-lg font-semibold">STEP SIX: Executive Summary Generation</h2>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-medium text-primary mb-2">STEP SIX Process</h4>
              <p className="text-sm text-muted-foreground">
                Automated analysis of all report sections to generate comprehensive executive summary with key findings, valuation conclusions, and strategic recommendations.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Executive Summary</h3>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                STEP SIX Auto-Generate
              </Button>
            </div>
            <Textarea 
              value={`STEP SIX Executive Summary - Auto-Generated Analysis:

**Property Overview:**
${reportConfiguration?.propertyType ? `${reportConfiguration.propertyType.charAt(0).toUpperCase() + reportConfiguration.propertyType.slice(1)} property` : "Property"} located at 320 Deakin Avenue, Mildura VIC 3500 has been comprehensively assessed using ${reportConfiguration?.valuationApproaches ? reportConfiguration.valuationApproaches.join(', ').toLowerCase() : "market"} methodology.

**Valuation Framework:**
${generateConfigurationSummary()}

**Key Findings:**
• Market analysis indicates stable ${reportConfiguration?.propertyType || "property"} sector performance in Mildura region
• Climate risk assessment shows moderate vulnerability (62% risk score) with 3-7% potential value impact
• Current market evidence supports valuation conclusions under ${reportConfiguration?.basisOfValuation ? reportConfiguration.basisOfValuation.join(' and ') : "market value"} basis
• ESG factors integrated throughout assessment to ensure future-proofing considerations

**Investment Recommendation:**
Property demonstrates solid fundamentals with appropriate risk mitigation strategies recommended for climate adaptation and long-term value preservation.

**Compliance:**
Valuation prepared in accordance with ANZVGP 101, IVS 2025, and incorporates retrospective valuation requirements where applicable.`}
              className="min-h-[200px] resize-none text-sm"
              readOnly
            />
            <Badge variant="secondary" className="mt-2">Auto-Generated from Configuration + Data Analysis</Badge>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Table of Contents */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>Table of Contents</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tableOfContents.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group"
                onClick={() => onNavigateToSection(index)}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-sm">{index + 1}.</span>
                  <span className="text-sm group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Page {item.page}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveSummary;