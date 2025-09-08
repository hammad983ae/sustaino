import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, Shield, DollarSign, AlertTriangle, FileText, Calculator, Clock } from "lucide-react";

export default function MortgageSecurityAssessment() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: "instructions-purpose",
      title: "Instructions & Purpose Definition",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lender-name">Lender Name</Label>
              <Input id="lender-name" placeholder="Financial institution name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valuation-purpose">Primary Purpose</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mortgage-security">Mortgage Security</SelectItem>
                  <SelectItem value="loan-security">Loan Security</SelectItem>
                  <SelectItem value="refinancing">Refinancing</SelectItem>
                  <SelectItem value="construction-loan">Construction Loan</SelectItem>
                  <SelectItem value="commercial-lending">Commercial Lending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loan-amount">Proposed Loan Amount ($)</Label>
              <Input id="loan-amount" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan-term">Loan Term (years)</Label>
              <Input id="loan-term" type="number" placeholder="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interest-rate">Interest Rate (%)</Label>
              <Input id="interest-rate" type="number" placeholder="0.0" step="0.01" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lender-instructions">Specific Lender Instructions</Label>
            <Textarea 
              id="lender-instructions"
              placeholder="Detail any specific requirements, standards, or instructions from the lender..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="property-type-security">Property Type for Security</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owner-occupied-residential">Owner Occupied Residential</SelectItem>
                <SelectItem value="investment-residential">Investment Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="specialized">Specialized Property</SelectItem>
                <SelectItem value="development">Development Site</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      id: "risk-analysis",
      title: "Risk Analysis & Assessment",
      icon: AlertTriangle,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="security-risk">Overall Security Risk Rating</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="low-moderate">Low to Moderate Risk</SelectItem>
                <SelectItem value="moderate">Moderate Risk</SelectItem>
                <SelectItem value="moderate-high">Moderate to High Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="marketability-risk">Marketability Risk Factors</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Location factors', 'Property type/design', 'Market demand', 'Economic conditions', 'Structural issues', 'Environmental concerns', 'Legal restrictions', 'Zoning limitations'].map((factor) => (
                <div key={factor} className="flex items-center space-x-2">
                  <Checkbox id={factor} />
                  <Label htmlFor={factor} className="text-sm">{factor}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liquidity-assessment">Liquidity Assessment</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select liquidity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High - Ready market</SelectItem>
                  <SelectItem value="moderate">Moderate - Some delay expected</SelectItem>
                  <SelectItem value="low">Low - Limited market</SelectItem>
                  <SelectItem value="poor">Poor - Specialized market</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="forced-sale-discount">Estimated Forced Sale Discount (%)</Label>
              <Input id="forced-sale-discount" type="number" placeholder="10" step="1" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="market-conditions">Current Market Conditions Impact</Label>
            <Textarea 
              id="market-conditions"
              placeholder="Assess how current market conditions affect the security value and liquidity..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="security-adequacy">Security Adequacy Assessment</Label>
            <Textarea 
              id="security-adequacy"
              placeholder="Comment on the adequacy of the property as security for the proposed loan amount..."
              className="min-h-[80px]"
            />
          </div>
        </div>
      )
    },
    {
      id: "valuation-approaches",
      title: "Valuation Approaches & Methodology",
      icon: Calculator,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primary-approach">Primary Valuation Approach</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select primary approach" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct-comparison">Direct Comparison Method</SelectItem>
                <SelectItem value="income-capitalisation">Income Capitalisation Method</SelectItem>
                <SelectItem value="cost-approach">Cost Approach</SelectItem>
                <SelectItem value="residual-method">Residual Method</SelectItem>
                <SelectItem value="profits-method">Profits Method</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="approach-justification">Approach Justification for Mortgage Security</Label>
            <Textarea 
              id="approach-justification"
              placeholder="Explain why this approach is most appropriate for mortgage security purposes..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comparable-analysis">Comparable Sales Analysis</Label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recent-sales">Recent Sales Count</Label>
                <Input id="recent-sales" type="number" placeholder="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sale-period">Analysis Period (months)</Label>
                <Input id="sale-period" type="number" placeholder="12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price-range-low">Price Range Low ($)</Label>
                <Input id="price-range-low" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price-range-high">Price Range High ($)</Label>
                <Input id="price-range-high" type="number" placeholder="0" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="market-evidence-quality">Market Evidence Quality Assessment</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select evidence quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent - Abundant recent comparables</SelectItem>
                <SelectItem value="good">Good - Adequate recent evidence</SelectItem>
                <SelectItem value="fair">Fair - Limited but relevant evidence</SelectItem>
                <SelectItem value="poor">Poor - Scarce or dated evidence</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="adjustments-summary">Key Adjustments Applied</Label>
            <Textarea 
              id="adjustments-summary"
              placeholder="Summarize major adjustments for time, location, size, condition, etc..."
              className="min-h-[80px]"
            />
          </div>
        </div>
      )
    },
    {
      id: "value-assessments",
      title: "Value Assessments & Scenarios",
      icon: DollarSign,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="market-value">Market Value ($)</Label>
              <Input id="market-value" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confidence-level">Confidence Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select confidence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Confidence</SelectItem>
                  <SelectItem value="moderate">Moderate Confidence</SelectItem>
                  <SelectItem value="low">Low Confidence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="alternative-use">Alternative Use Value Assessment</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alternative-use-type">Alternative Use</Label>
                <Input id="alternative-use-type" placeholder="e.g., Commercial conversion" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alternative-value">Alternative Value ($)</Label>
                <Input id="alternative-value" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="use-probability">Probability</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select probability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="nil">Nil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="special-assumptions">Value Subject to Special Assumptions</Label>
            <Textarea 
              id="special-assumptions"
              placeholder="Detail any special assumptions and their impact on value (e.g., assuming repairs completed, zoning changes, etc.)..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loan-to-value">Loan to Value Ratio (%)</Label>
              <Input id="loan-to-value" type="number" placeholder="80" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="security-margin">Security Margin Assessment</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select security margin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent - LVR &lt;70%</SelectItem>
                  <SelectItem value="good">Good - LVR 70-80%</SelectItem>
                  <SelectItem value="acceptable">Acceptable - LVR 80-90%</SelectItem>
                  <SelectItem value="marginal">Marginal - LVR 90-95%</SelectItem>
                  <SelectItem value="inadequate">Inadequate - LVR &gt;95%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "construction-complete",
      title: "As If Complete & Construction Considerations",
      icon: Clock,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="construction-status">Construction Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-applicable">Not Applicable - Existing Property</SelectItem>
                <SelectItem value="proposed">Proposed Construction</SelectItem>
                <SelectItem value="commenced">Construction Commenced</SelectItem>
                <SelectItem value="partially-complete">Partially Complete</SelectItem>
                <SelectItem value="substantially-complete">Substantially Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="completion-date">Expected Completion Date</Label>
              <Input id="completion-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="construction-progress">Construction Progress (%)</Label>
              <Input id="construction-progress" type="number" placeholder="0" max="100" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="as-if-complete-value">Value 'As If Complete' ($)</Label>
            <Input id="as-if-complete-value" type="number" placeholder="0" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="completion-risk">Completion Risk Assessment</Label>
            <Textarea 
              id="completion-risk"
              placeholder="Assess risks including cost overruns, delays, market changes, contractor performance..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="construction-qualifications">Construction-Related Qualifications</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Plans and specifications reviewed', 'Building permits obtained', 'Construction contract reviewed', 'Contractor credentials verified', 'Insurance coverage confirmed', 'Progress payment schedule established'].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={item} />
                  <Label htmlFor={item} className="text-sm">{item}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="value-under-construction">Current Value Under Construction ($)</Label>
            <Input id="value-under-construction" type="number" placeholder="0" />
          </div>
        </div>
      )
    },
    {
      id: "insurance-recommendations",
      title: "Insurance & Recommendations",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="replacement-cost">Insurance Replacement Cost Estimate ($)</Label>
            <Input id="replacement-cost" type="number" placeholder="0" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="replacement-basis">Replacement Cost Basis</Label>
            <Textarea 
              id="replacement-basis"
              placeholder="Explain the basis for insurance replacement cost including current construction costs, materials, and methods..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lender-recommendations">Recommendations to Lender</Label>
            <Textarea 
              id="lender-recommendations"
              placeholder="Provide specific recommendations regarding the security, LVR, conditions, or additional requirements..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="value-exclusions">Exclusions from Market Value</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Chattels and moveable items', 'Business goodwill or trading value', 'GST (unless specifically included)', 'Vendor finance benefits', 'Special purchaser advantages', 'Forced sale conditions'].map((exclusion) => (
                <div key={exclusion} className="flex items-center space-x-2">
                  <Checkbox id={exclusion} defaultChecked />
                  <Label htmlFor={exclusion} className="text-sm">{exclusion}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="future-review">Future Review Requirements</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="review-frequency">Recommended Review Frequency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="bi-annual">Bi-annual</SelectItem>
                    <SelectItem value="quarterly">Quarterly (high risk)</SelectItem>
                    <SelectItem value="as-required">As required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="next-review">Next Review Date</Label>
                <Input id="next-review" type="date" />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-blue-800">Mortgage Security Summary</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Property provides adequate/inadequate security at proposed LVR</li>
                  <li>• Risk level appropriate/inappropriate for standard lending</li>
                  <li>• Market conditions favorable/unfavorable for security</li>
                  <li>• Recommend approval/additional conditions/decline</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Mortgage Security Assessment</h2>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-blue-800">Mortgage and Loan Security Valuation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700">
            This assessment addresses valuation requirements for mortgage and loan security purposes, 
            including risk analysis, marketability assessment, and lender-specific considerations.
          </p>
        </CardContent>
      </Card>

      {sections.map((section) => {
        const isExpanded = expandedSections[section.id];
        const Icon = section.icon;
        
        return (
          <Card key={section.id} className="border border-border">
            <CardHeader 
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            
            {isExpanded && (
              <CardContent className="pt-0">
                {section.content}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}