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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, FileText, Sparkles, Shield, User, ScrollText } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useReportData } from "@/contexts/ReportDataContext";
import AutoGenerateSummary from "./AutoGenerateSummary";

interface ExecutiveSummaryProps {
  onNavigateToSection: (sectionIndex: number) => void;
}

const ExecutiveSummary = ({ onNavigateToSection }: ExecutiveSummaryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isProfessionalOpen, setIsProfessionalOpen] = useState(false);
  const [executiveSummaryText, setExecutiveSummaryText] = useState('');
  const { reportData, updateReportData } = useReportData();

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

  // Handle summary generation
  const handleSummaryGenerated = (summary: string) => {
    setExecutiveSummaryText(summary);
    updateReportData('executiveSummary', { content: summary, lastUpdated: new Date().toISOString() });
  };

  // Load existing summary from report data
  useEffect(() => {
    if (reportData.executiveSummary?.content) {
      setExecutiveSummaryText(reportData.executiveSummary.content);
    }
  }, [reportData.executiveSummary]);

  return (
    <div className="space-y-6">
      {/* Executive Summary Section */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          <h2 className="text-lg font-semibold">Executive Summary</h2>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Executive Summary</h3>
              <AutoGenerateSummary 
                onSummaryGenerated={handleSummaryGenerated}
                currentSummary={executiveSummaryText}
              />
            </div>
            <Textarea 
              placeholder="Comprehensive overview of the property valuation, key findings, and investment recommendation..."
              className="min-h-[120px] resize-none"
              value={executiveSummaryText}
              onChange={(e) => {
                setExecutiveSummaryText(e.target.value);
                updateReportData('executiveSummary', { 
                  content: e.target.value, 
                  lastUpdated: new Date().toISOString() 
                });
              }}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Professional Declarations Summary */}
      <Collapsible open={isProfessionalOpen} onOpenChange={setIsProfessionalOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
          <ChevronDown className={`h-4 w-4 transition-transform ${isProfessionalOpen ? 'transform rotate-180' : ''}`} />
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Professional Declarations Summary
          </h2>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                {reportData?.professionalDeclarations?.conflictOfInterest && (
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 mt-1 text-primary" />
                    <div>
                      <h4 className="font-medium">Conflict of Interest</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {reportData.professionalDeclarations.conflictOfInterest}
                      </p>
                    </div>
                  </div>
                )}
                
                {reportData?.professionalDeclarations?.inScopeItems && (
                  <div className="flex items-start gap-3">
                    <ScrollText className="h-4 w-4 mt-1 text-primary" />
                    <div>
                      <h4 className="font-medium">Scope of Work</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Professional declarations and scope limitations have been documented and are available in the detailed report sections.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Shield className="h-4 w-4 mt-1 text-primary" />
                  <div>
                    <h4 className="font-medium">Professional Compliance</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      All professional standards, indemnity requirements, and regulatory compliance measures have been verified and documented.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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