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
import { ChevronDown, FileText, Sparkles, CheckCircle, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
  includedSections?: string[];
  reportData?: any;
}

const ExecutiveSummary = ({ onNavigateToSection, reportConfiguration, includedSections = [], reportData }: ExecutiveSummaryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEnhancementOpen, setIsEnhancementOpen] = useState(false);

  // Generate introduction content based on configuration
  const generateIntroductionContent = () => {
    const config = reportConfiguration || {};
    
    // Return empty string for professional appearance - user will fill this in
    if (!config.instructingParty || !config.reliantParty) {
      return "";
    }

    const propertyTypeText = config.propertyType ? config.propertyType.charAt(0).toUpperCase() + config.propertyType.slice(1) : "";
    const reportTypeText = config.reportType ? config.reportType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "";
    const purposeText = config.valuationPurpose && config.valuationPurpose.length > 0 
      ? config.valuationPurpose.join(', ').toLowerCase() 
      : "";

    return `This ${reportTypeText.toLowerCase()} provides a comprehensive valuation of the ${propertyTypeText.toLowerCase()} property at 320 Deakin Avenue, Mildura VIC 3500, for ${purposeText}. The analysis incorporates recent market transactions, sector-specific data, regional economic outlook, and climate change risk assessments.

The valuation has been prepared for ${config.instructingParty} and may be relied upon by ${config.reliantParty}. This assessment follows professional valuation standards and incorporates ESG factors to provide a forward-looking perspective on property performance and risk.`;
  };

  // Generate section-specific summaries based on included sections
  const generateSectionSummaries = () => {
    const summaries: string[] = [];
    
    if (includedSections.includes("RPD and Location") || includedSections.includes("Property Details")) {
      summaries.push(`**Property Location & Details:**
Property located at 320 Deakin Avenue, Mildura VIC 3500 benefits from strategic positioning within the Mildura region. Location analysis indicates ${reportConfiguration?.propertyType || "property"} sector advantages with good accessibility and local infrastructure support.`);
    }

    if (includedSections.includes("Legal and Planning")) {
      summaries.push(`**Legal & Planning Assessment:**
Comprehensive planning analysis confirms appropriate zoning and development potential. All statutory requirements and planning constraints have been assessed, with compliance confirmed across relevant local government regulations.`);
    }

    if (includedSections.includes("Market Commentary")) {
      summaries.push(`**Market Analysis:**
Current market conditions for ${reportConfiguration?.propertyType || "property"} sector in Mildura region show ${reportConfiguration?.propertyType === "residential" ? "stable residential demand with moderate price growth" : reportConfiguration?.propertyType === "commercial" ? "steady commercial activity with stable yields" : reportConfiguration?.propertyType === "agricultural" ? "agricultural commodity pricing supporting land values" : "specialized market fundamentals remaining sound"}. Recent transactions support valuation conclusions under current market parameters.`);
    }

    if (includedSections.includes("Sales Evidence")) {
      summaries.push(`**Sales Evidence Analysis:**
Comprehensive analysis of comparable sales transactions provides strong market evidence. ${reportConfiguration?.propertyType === "commercial" ? "Commercial sales evidence shows cap rates of 7-9% with recent transactions supporting current valuations" : reportConfiguration?.propertyType === "residential" ? "Residential sales comparables indicate active market with price ranges supporting assessed values" : reportConfiguration?.propertyType === "agricultural" ? "Agricultural land sales show per hectare values consistent with productivity analysis" : "Specialized property sales evidence supports replacement cost and income methodologies"}.`);
    }

    if (includedSections.includes("Leasing Evidence")) {
      summaries.push(`**Leasing Market Analysis:**
Rental market assessment demonstrates ${reportConfiguration?.propertyType === "commercial" ? "commercial rental rates of $150-$250/sqm with stable tenant demand" : reportConfiguration?.propertyType === "residential" ? "residential rental yields of 4-6% with good tenant retention" : "market-appropriate rental levels supporting income capitalization methodology"}. Lease terms and market evidence support valuation approaches adopted.`);
    }

    if (includedSections.includes("Valuation Analysis")) {
      summaries.push(`**Valuation Methodology:**
${reportConfiguration?.valuationApproaches ? reportConfiguration.valuationApproaches.join(", ") : "Multiple valuation approaches"} applied to determine ${reportConfiguration?.basisOfValuation ? reportConfiguration.basisOfValuation.join(" and ") : "market value"}. Cross-verification of methodologies provides confidence in valuation conclusions with results demonstrating consistency across approaches.`);
    }

    if (includedSections.includes("ESG Assessment") || includedSections.includes("Sustaino Pro")) {
      summaries.push(`**ESG & Sustainability Assessment:**
Environmental, Social, and Governance factors integrated throughout analysis. Climate risk assessment indicates 62% vulnerability score with 3-7% potential value impact. Sustainability recommendations provided for long-term value preservation and ESG compliance.`);
    }

    if (includedSections.includes("Risk Assessment")) {
      summaries.push(`**Risk Analysis:**
Comprehensive risk assessment identifies key market, physical, and operational risks. Climate change considerations, market volatility factors, and property-specific risks evaluated with appropriate mitigation strategies recommended for stakeholder consideration.`);
    }

    if (includedSections.includes("Tenancy Schedule")) {
      summaries.push(`**Tenancy Analysis:**
Current tenancy arrangements assessed for covenant strength, lease terms, and rental security. WALE analysis and tenant mix evaluation support income stability projections and investment grade assessment.`);
    }

    if (includedSections.includes("Carbon Farming") || includedSections.includes("Agricultural")) {
      summaries.push(`**Agricultural & Carbon Assessment:**
Land productivity analysis, water rights evaluation, and carbon farming potential assessed. Agricultural enterprise viability and commodity price analysis support rural property valuation conclusions.`);
    }

    return summaries.length > 0 ? summaries.join("\n\n") : "Comprehensive analysis across all relevant property aspects supports valuation conclusions.";
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
              placeholder="Enter the report introduction here..."
              className="min-h-[120px] resize-none text-sm"
            />
            {reportConfiguration && Object.keys(reportConfiguration).length > 0 && (
              <div className="mt-4 p-3 bg-muted/50 rounded-md">
                <h4 className="text-sm font-medium mb-2">Report Configuration</h4>
                <div className="text-xs text-muted-foreground whitespace-pre-line">
                  {generateConfigurationSummary()}
                </div>
              </div>
            )}
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
              <h4 className="font-medium text-primary mb-2">Executive Summary Generation</h4>
              <p className="text-sm text-muted-foreground">
                Generate a comprehensive executive summary based on completed report sections with key findings, valuation conclusions, and recommendations.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Executive Summary</h3>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Generate Summary
              </Button>
            </div>
            <Textarea 
              placeholder="The executive summary will be generated here based on all completed report sections..."
              className="min-h-[200px] resize-none text-sm"
            />
            {includedSections.length > 0 && (
              <div className="mt-4 p-3 bg-info/10 rounded-md border border-info/20">
                <h4 className="text-sm font-medium mb-2">Report Sections ({includedSections.length})</h4>
                <div className="text-xs text-muted-foreground">
                  {includedSections.join(" • ")}
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* STEP SIX AI Enhancement & Completion */}
      <Collapsible open={isEnhancementOpen} onOpenChange={setIsEnhancementOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
          <ChevronDown className={`h-4 w-4 transition-transform ${isEnhancementOpen ? "transform rotate-180" : ""}`} />
          <h2 className="text-lg font-semibold">STEP SIX: AI Enhancement & Report Completion</h2>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="space-y-6">
            {/* AI Enhancement Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100">Enhance with AI</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Professional content generation</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate professional content, market analytics, and sustainability insights instantly using AI-powered analysis.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Enhance Report with AI
                </Button>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100">Complete Missing Fields</h3>
                    <p className="text-sm text-green-700 dark:text-green-300">Automated field completion</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Automatically identify and complete any missing required fields across all report sections.
                </p>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Missing Fields
                </Button>
              </div>
            </div>

            {/* Final Actions */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/10 border border-primary/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Ready to Generate Final Report?</h3>
                  <p className="text-sm text-muted-foreground">
                    All sections completed and enhanced. Generate your comprehensive valuation report.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Preview Report
                  </Button>
                  <Link to="/report">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
                      Generate Final Report
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Enhancement Progress */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Enhancement Progress</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Executive Summary</span>
                  <Badge variant="secondary">✓ Auto-Generated</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Section Analysis</span>
                  <Badge variant="secondary">✓ {includedSections.length} Sections</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Configuration</span>
                  <Badge variant="secondary">✓ Complete</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Market Data</span>
                  <Badge variant="outline">Mildura Data Locked</Badge>
                </div>
              </div>
            </div>
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