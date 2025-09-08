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
import { ChevronDown, FileText, Sparkles } from "lucide-react";
import { useState } from "react";

interface ExecutiveSummaryProps {
  onNavigateToSection: (sectionIndex: number) => void;
}

const ExecutiveSummary = ({ onNavigateToSection }: ExecutiveSummaryProps) => {
  const [isOpen, setIsOpen] = useState(true);

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
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Auto-Generate Summary
              </Button>
            </div>
            <Textarea 
              placeholder="Comprehensive overview of the property valuation, key findings, and investment recommendation..."
              className="min-h-[120px] resize-none"
            />
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