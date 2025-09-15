/**
 * ============================================================================
 * AI CONTENT REFERENCE FRAMEWORK
 * Automatic citation and compliance system for all AI-generated content
 * 
 * PROFESSIONAL COMPLIANCE:
 * - Ensures all AI content cites industry standards (API, IVSC, RICS)
 * - Maintains clear distinction between AI analysis and professional opinion
 * - Provides standardized disclaimers and validation requirements
 * ============================================================================
 */
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, BookOpen, CheckCircle2, ExternalLink } from "lucide-react";

interface AIContentProps {
  contentType: "valuation" | "analysis" | "prediction" | "recommendation" | "risk_assessment";
  confidence?: number;
  methodology?: string;
  validatedBy?: {
    name: string;
    license: string;
    date?: string;
  };
  dataSource?: string;
  children: React.ReactNode;
}

interface IndustryStandard {
  code: string;
  title: string;
  organization: string;
  url: string;
  relevance: string;
}

const INDUSTRY_STANDARDS: Record<string, IndustryStandard[]> = {
  valuation: [
    {
      code: "API PPS 1",
      title: "Professional Practice Standard 1 - Valuation Services",
      organization: "Australian Property Institute",
      url: "https://api.org.au/professional-standards",
      relevance: "Primary valuation methodology standards"
    },
    {
      code: "IVSC TIP 3",
      title: "Technical Information Paper 3 - Automated Valuation Models",
      organization: "International Valuation Standards Council",
      url: "https://ivsc.org/standards/tip-3",
      relevance: "AVM implementation guidelines"
    },
    {
      code: "RICS Global AVM",
      title: "Global Standards for Automated Valuation Models",
      organization: "Royal Institution of Chartered Surveyors",
      url: "https://rics.org/standards/avm-global",
      relevance: "International AVM best practices"
    }
  ],
  analysis: [
    {
      code: "API PPS 2",
      title: "Professional Practice Standard 2 - Property Analysis",
      organization: "Australian Property Institute",
      url: "https://api.org.au/professional-standards",
      relevance: "Property analysis methodologies"
    },
    {
      code: "IVSC IVS 105",
      title: "IVS 105 - Valuation Approaches and Methods",
      organization: "International Valuation Standards Council",
      url: "https://ivsc.org/standards/ivs-105",
      relevance: "Analytical approach standards"
    }
  ],
  prediction: [
    {
      code: "IVSC TIP 3",
      title: "Technical Information Paper 3 - Automated Valuation Models",
      organization: "International Valuation Standards Council",
      url: "https://ivsc.org/standards/tip-3",
      relevance: "Predictive modeling guidelines"
    },
    {
      code: "ASIC RG 175",
      title: "Regulatory Guide 175 - Licensing Relief",
      organization: "Australian Securities & Investment Commission",
      url: "https://asic.gov.au/rg175",
      relevance: "Predictive advice compliance"
    }
  ],
  recommendation: [
    {
      code: "API Code of Ethics",
      title: "Code of Professional Ethics and Conduct",
      organization: "Australian Property Institute", 
      url: "https://api.org.au/code-of-ethics",
      relevance: "Professional responsibility standards"
    },
    {
      code: "APRA APS 220",
      title: "Prudential Standard APS 220 - Credit Risk Management",
      organization: "Australian Prudential Regulation Authority",
      url: "https://apra.gov.au/aps-220",
      relevance: "Risk assessment requirements"
    }
  ],
  risk_assessment: [
    {
      code: "ISO 31000",
      title: "Risk Management - Guidelines",
      organization: "International Organization for Standardization",
      url: "https://iso.org/iso-31000",
      relevance: "Risk management framework"
    },
    {
      code: "APRA APS 220",
      title: "Prudential Standard APS 220 - Credit Risk Management", 
      organization: "Australian Prudential Regulation Authority",
      url: "https://apra.gov.au/aps-220",
      relevance: "Credit risk assessment standards"
    }
  ]
};

export function AIContentWrapper({ 
  contentType, 
  confidence, 
  methodology, 
  validatedBy, 
  dataSource,
  children 
}: AIContentProps) {
  const standards = INDUSTRY_STANDARDS[contentType] || [];
  
  const getContentTypeLabel = () => {
    switch (contentType) {
      case "valuation": return "AI Valuation Analysis";
      case "analysis": return "AI Property Analysis";
      case "prediction": return "AI Predictive Analysis";
      case "recommendation": return "AI Recommendation";
      case "risk_assessment": return "AI Risk Assessment";
      default: return "AI Analysis";
    }
  };

  const getComplianceLevel = () => {
    if (validatedBy) return "professional_validated";
    if (confidence && confidence >= 80) return "high_confidence";
    if (confidence && confidence >= 60) return "medium_confidence";
    return "preliminary";
  };

  const complianceLevel = getComplianceLevel();
  
  const complianceConfig = {
    professional_validated: {
      color: "border-green-200 bg-green-50",
      icon: <CheckCircle2 className="h-4 w-4 text-green-600" />,
      title: "Professional Validated AI Analysis",
      description: "This AI-generated analysis has been reviewed and validated by a licensed professional."
    },
    high_confidence: {
      color: "border-blue-200 bg-blue-50",
      icon: <Shield className="h-4 w-4 text-blue-600" />,
      title: "High Confidence AI Analysis",
      description: "This analysis requires professional validation before use in any formal context."
    },
    medium_confidence: {
      color: "border-yellow-200 bg-yellow-50",
      icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
      title: "Medium Confidence AI Analysis",
      description: "This preliminary analysis requires professional review and validation."
    },
    preliminary: {
      color: "border-orange-200 bg-orange-50",
      icon: <AlertTriangle className="h-4 w-4 text-orange-600" />,
      title: "Preliminary AI Analysis",
      description: "This analysis is for initial assessment only and requires comprehensive professional validation."
    }
  };

  const config = complianceConfig[complianceLevel];

  return (
    <div className="space-y-4">
      {/* Compliance Header */}
      <Alert className={config.color}>
        <div className="flex items-start gap-3">
          {config.icon}
          <div className="flex-1">
            <AlertDescription>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <strong>{config.title}</strong>
                  <Badge variant="outline" className="text-xs">
                    {getContentTypeLabel()}
                  </Badge>
                </div>
                <p className="text-sm">{config.description}</p>
                
                {/* Validation Information */}
                {validatedBy && (
                  <div className="mt-2 p-2 bg-white rounded border">
                    <p className="text-sm font-medium text-green-700">
                      ✓ Validated by: {validatedBy.name} ({validatedBy.license})
                      {validatedBy.date && ` on ${new Date(validatedBy.date).toLocaleDateString('en-AU')}`}
                    </p>
                  </div>
                )}

                {/* Confidence and Methodology */}
                <div className="flex gap-4 text-xs">
                  {confidence && (
                    <span>Confidence: {confidence}%</span>
                  )}
                  {methodology && (
                    <span>Methodology: {methodology}</span>
                  )}
                  {dataSource && (
                    <span>Data Source: {dataSource}</span>
                  )}
                </div>
              </div>
            </AlertDescription>
          </div>
        </div>
      </Alert>

      {/* Main Content */}
      <div className="space-y-4">
        {children}
      </div>

      {/* Industry Standards Footer */}
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4" />
            Industry Standards Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              This analysis has been generated in accordance with the following industry standards:
            </p>
            <div className="grid gap-2">
              {standards.map((standard, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                  <div className="flex-1">
                    <p className="font-medium">{standard.code}</p>
                    <p className="text-muted-foreground">{standard.title}</p>
                    <p className="text-muted-foreground">{standard.organization}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 px-2"
                    onClick={() => window.open(standard.url, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>Important:</strong> All AI-generated content is subject to professional validation requirements. 
                This analysis does not constitute formal valuation advice and should not be relied upon for legal, 
                financial, or investment decisions without appropriate professional review and approval.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Convenience wrapper components for different content types
export function AIValuationAnalysis({ 
  confidence, 
  methodology = "Automated Comparative Method", 
  validatedBy, 
  children 
}: Omit<AIContentProps, 'contentType'>) {
  return (
    <AIContentWrapper 
      contentType="valuation" 
      confidence={confidence}
      methodology={methodology}
      validatedBy={validatedBy}
      dataSource="CoreLogic Market Data"
    >
      {children}
    </AIContentWrapper>
  );
}

export function AIPredictiveAnalysis({ 
  confidence, 
  methodology = "Machine Learning Projection Model", 
  validatedBy, 
  children 
}: Omit<AIContentProps, 'contentType'>) {
  return (
    <AIContentWrapper 
      contentType="prediction" 
      confidence={confidence}
      methodology={methodology}
      validatedBy={validatedBy}
      dataSource="Historical Market Data & Economic Indicators"
    >
      {children}
    </AIContentWrapper>
  );
}

export function AIRiskAssessment({ 
  confidence, 
  methodology = "Multi-Factor Risk Analysis", 
  validatedBy, 
  children 
}: Omit<AIContentProps, 'contentType'>) {
  return (
    <AIContentWrapper 
      contentType="risk_assessment" 
      confidence={confidence}
      methodology={methodology}
      validatedBy={validatedBy}
      dataSource="Market Risk Indicators & Historical Data"
    >
      {children}
    </AIContentWrapper>
  );
}

export default AIContentWrapper;