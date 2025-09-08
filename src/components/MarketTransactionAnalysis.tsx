import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, AlertTriangle, TrendingDown, Database, Users, DollarSign, Clock } from "lucide-react";

export default function MarketTransactionAnalysis() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: "market-conditions",
      title: "Market Conditions Assessment",
      icon: TrendingDown,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="market-uncertainty">Level of Market Uncertainty</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select uncertainty level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Normal market conditions</SelectItem>
                  <SelectItem value="moderate">Moderate - Limited transaction data</SelectItem>
                  <SelectItem value="high">High - Significant market disruption</SelectItem>
                  <SelectItem value="severe">Severe - Crisis conditions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transaction-volume">Recent Transaction Volume</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select volume level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal levels</SelectItem>
                  <SelectItem value="reduced">Reduced by 25-50%</SelectItem>
                  <SelectItem value="significantly-reduced">Reduced by 50-75%</SelectItem>
                  <SelectItem value="minimal">Minimal transactions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="market-factors">Market Disruption Factors</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Economic downturn', 'Natural disaster', 'Pandemic/health crisis', 'Regulatory changes', 'Interest rate volatility', 'Credit market disruption'].map((factor) => (
                <div key={factor} className="flex items-center space-x-2">
                  <Checkbox id={factor} />
                  <Label htmlFor={factor} className="text-sm">{factor}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="market-sentiment">Current Market Sentiment</Label>
            <Textarea 
              id="market-sentiment"
              placeholder="Describe current market sentiment based on participant feedback and observable indicators..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      )
    },
    {
      id: "information-sources",
      title: "Information Sources & Data Collection",
      icon: Database,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prior-transactions">Prior Transaction Analysis</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lookback-period">Lookback Period (months)</Label>
                <Input id="lookback-period" type="number" placeholder="12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comparable-count">Comparable Transactions</Label>
                <Input id="comparable-count" type="number" placeholder="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avg-adjustment">Average Time Adjustment (%)</Label>
                <Input id="avg-adjustment" type="number" placeholder="0.0" step="0.1" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="unsettled-transactions">Unsettled Market Transactions</Label>
            <Textarea 
              id="unsettled-transactions"
              placeholder="Detail any unsettled transactions, contracts under negotiation, or failed settlements that provide market insight..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="market-research">Third-Party Market Research</Label>
            <Textarea 
              id="market-research"
              placeholder="Reference credible market research from reputable sources, including REIT data, industry reports, and professional market analysis..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="legislation-impact">New Legislation/Code Impact</Label>
            <Textarea 
              id="legislation-impact"
              placeholder="Document any new mandatory codes, legislation, or regulatory changes affecting market conditions..."
              className="min-h-[80px]"
            />
          </div>
        </div>
      )
    },
    {
      id: "market-intelligence",
      title: "Market Participant Intelligence",
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="participant-feedback">Market Participant Feedback</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Buyers', 'Sellers', 'Real Estate Agents', 'Property Researchers', 'Other Valuers', 'Financiers/Lenders'].map((participant) => (
                <div key={participant} className="space-y-2">
                  <Label htmlFor={participant.toLowerCase()}>{participant} Feedback</Label>
                  <Textarea 
                    id={participant.toLowerCase()}
                    placeholder={`Key insights from ${participant.toLowerCase()}...`}
                    className="min-h-[60px]"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="market-indicators">Observable Market Indicators</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="listing-volumes">Listing Volumes</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trend" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="increasing">Increasing</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="decreasing">Decreasing</SelectItem>
                    <SelectItem value="volatile">Volatile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="marketing-periods">Marketing Periods</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trend" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shortened">Shortened</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="extended">Extended</SelectItem>
                    <SelectItem value="significantly-extended">Significantly Extended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="asking-prices">Asking Price Trends</Label>
              <Input id="asking-prices" placeholder="e.g., 5% below previous levels" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vacancy-rates">Vacancy Rate Changes</Label>
              <Input id="vacancy-rates" placeholder="e.g., increased from 3% to 7%" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "valuation-methodology",
      title: "Valuation Methodology & Adjustments",
      icon: DollarSign,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primary-approach">Primary Valuation Approach</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select primary approach" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="direct-comparison">Direct Comparison (adjusted)</SelectItem>
                <SelectItem value="income-capitalisation">Income Capitalisation</SelectItem>
                <SelectItem value="cost-approach">Cost Approach</SelectItem>
                <SelectItem value="hybrid">Hybrid Approach</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="methodology-justification">Methodology Justification</Label>
            <Textarea 
              id="methodology-justification"
              placeholder="Provide detailed explanation for methodology selection given limited market data..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="market-adjustments">Market Condition Adjustments</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time-adjustment">Time Adjustment (%)</Label>
                <Input id="time-adjustment" type="number" placeholder="0.0" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uncertainty-discount">Uncertainty Discount (%)</Label>
                <Input id="uncertainty-discount" type="number" placeholder="0.0" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="liquidity-adjustment">Liquidity Adjustment (%)</Label>
                <Input id="liquidity-adjustment" type="number" placeholder="0.0" step="0.1" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sensitivity-analysis">Sensitivity Analysis Range</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="low-estimate">Low Estimate ($)</Label>
                <Input id="low-estimate" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mid-estimate">Mid Estimate ($)</Label>
                <Input id="mid-estimate" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="high-estimate">High Estimate ($)</Label>
                <Input id="high-estimate" type="number" placeholder="0" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "risk-analysis",
      title: "Risk Analysis & Reporting Requirements",
      icon: AlertTriangle,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="market-risk">Market Risk Assessment</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="moderate">Moderate Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="extreme">Extreme Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tenancy-risk">Tenancy Risk Considerations</Label>
            <Textarea 
              id="tenancy-risk"
              placeholder="For leased properties, assess tenant default risk, rental relief requirements, or vacancy probability..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="uncertainty-disclosure">Market Uncertainty Disclosure</Label>
            <Textarea 
              id="uncertainty-disclosure"
              placeholder="Required disclosure statement regarding significant market uncertainty and its impact on valuation reliability..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="selling-method">Alternative Selling Methods</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Private treaty', 'Public auction', 'Online auction', 'Private inspections', 'Virtual inspections', 'Expressions of interest'].map((method) => (
                <div key={method} className="flex items-center space-x-2">
                  <Checkbox id={method} />
                  <Label htmlFor={method} className="text-sm">{method}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="marketing-period">Expected Marketing Period</Label>
              <Input id="marketing-period" placeholder="e.g., 6-12 months" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confidence-level">Valuation Confidence Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select confidence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Confidence</SelectItem>
                  <SelectItem value="moderate">Moderate Confidence</SelectItem>
                  <SelectItem value="low">Low Confidence</SelectItem>
                  <SelectItem value="very-low">Very Low Confidence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "reporting-outcomes",
      title: "Reporting Outcomes & Documentation",
      icon: Clock,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="valuation-inputs">Sources of Valuation Inputs</Label>
            <Textarea 
              id="valuation-inputs"
              placeholder="Comprehensively document all sources of valuation inputs and explain their application given limited market data..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="assumptions-limitations">Key Assumptions and Limitations</Label>
            <Textarea 
              id="assumptions-limitations"
              placeholder="Detail all critical assumptions made and limitations of the valuation given market conditions..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additional-investigations">Recommended Additional Investigations</Label>
            <Textarea 
              id="additional-investigations"
              placeholder="Identify any additional investigations or expert opinions that may be beneficial given market uncertainty..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="review-triggers">Valuation Review Triggers</Label>
            <Textarea 
              id="review-triggers"
              placeholder="Specify conditions or timeframes that would trigger a valuation review given current market uncertainty..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-amber-800">Mandatory Reporting Requirements</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Detailed methodology explanation when recent comparable evidence is limited</li>
                  <li>• Clear disclosure of market uncertainty and its impact on valuation reliability</li>
                  <li>• Sensitivity analysis when significant uncertainty exists</li>
                  <li>• Risk analysis reflecting changing market conditions</li>
                  <li>• Documentation of all alternative data sources and their application</li>
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
        <TrendingDown className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Market Transaction Analysis</h2>
      </div>

      <Card className="border-amber-200 bg-amber-50">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <CardTitle className="text-amber-800">Market Transaction Shortage Assessment</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-700">
            This assessment addresses valuation considerations when there is a shortage of market transactions, 
            requiring enhanced professional judgment and alternative data sources to form reliable opinions of value.
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