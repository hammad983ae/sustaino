import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, Shield, Calculator, Clock, AlertTriangle, Building, Hammer } from "lucide-react";

export default function InsuranceCostEstimates() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: "estimate-basis",
      title: "Estimate Basis & Instructions",
      icon: Calculator,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="estimate-purpose">Primary Purpose of Estimate</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="property-insurance">Property Insurance</SelectItem>
                <SelectItem value="home-insurance">Home Insurance</SelectItem>
                <SelectItem value="business-insurance">Business Insurance</SelectItem>
                <SelectItem value="heritage-insurance">Heritage Property Insurance</SelectItem>
                <SelectItem value="pe-insurance">Plant, Machinery & Equipment Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cost-basis">Cost Estimate Basis</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select basis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="replacement-cost">Replacement Cost</SelectItem>
                <SelectItem value="reproduction-cost">Reproduction Cost (Heritage)</SelectItem>
                <SelectItem value="indemnity-value">Indemnity Value</SelectItem>
                <SelectItem value="agreed-value">Agreed Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instructions-clarity">Specific Client Instructions</Label>
            <Textarea 
              id="instructions-clarity"
              placeholder="Detail specific instructions regarding basis of assessment, inclusions/exclusions, GST treatment..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="property-type">Property Type Classification</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="heritage">Heritage Listed</SelectItem>
                <SelectItem value="specialized">Specialized Building</SelectItem>
                <SelectItem value="mixed-use">Mixed Use</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location-factor">Location Factors/Loading</Label>
              <Input id="location-factor" placeholder="e.g., Remote area 15% loading" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="access-considerations">Site Access Considerations</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select access type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Access</SelectItem>
                  <SelectItem value="difficult">Difficult Access</SelectItem>
                  <SelectItem value="remote">Remote Location</SelectItem>
                  <SelectItem value="restricted">Restricted Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "heritage-considerations",
      title: "Heritage Property Considerations",
      icon: Building,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heritage-status">Heritage Listing Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select heritage status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Heritage Listing</SelectItem>
                <SelectItem value="local">Local Heritage Register</SelectItem>
                <SelectItem value="state">State Heritage Register</SelectItem>
                <SelectItem value="national">National Heritage List</SelectItem>
                <SelectItem value="world">World Heritage Listed</SelectItem>
                <SelectItem value="contributory">Contributory Building in Heritage Precinct</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="heritage-restrictions">Heritage Restrictions & Requirements</Label>
            <Textarea 
              id="heritage-restrictions"
              placeholder="Detail any restrictions on renovations, modifications, materials, or construction methods..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialized-trades">Specialized Trades Required</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Stone masonry', 'Iron tracery work', 'Stained glass restoration', 'Traditional roofing', 'Heritage carpentry', 'Traditional plastering', 'Lead light windows', 'Period-appropriate materials'].map((trade) => (
                <div key={trade} className="flex items-center space-x-2">
                  <Checkbox id={trade} />
                  <Label htmlFor={trade} className="text-sm">{trade}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="heritage-risks">Heritage-Specific Risks</Label>
            <Textarea 
              id="heritage-risks"
              placeholder="Assess risks including approval delays, specialized material availability, skilled tradesperson availability..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heritage-loading">Heritage Cost Loading (%)</Label>
              <Input id="heritage-loading" type="number" placeholder="25" step="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="approval-timeframe">Expected Approval Timeframe</Label>
              <Input id="approval-timeframe" placeholder="e.g., 6-12 months" />
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Building className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-amber-800">Heritage Property Considerations</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Total loss may eliminate heritage significance and restrictions</li>
                  <li>• Partial loss risks require reproduction cost basis due to matching requirements</li>
                  <li>• Extended lead times for approvals and specialized materials</li>
                  <li>• Higher professional fees for heritage consultants and architects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "plant-equipment",
      title: "Plant, Machinery & Equipment (P&E)",
      icon: Hammer,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pe-type">P&E Classification</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select P&E type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manufacturing">Manufacturing Equipment</SelectItem>
                <SelectItem value="processing">Processing Plant</SelectItem>
                <SelectItem value="telecommunications">Telecommunications Equipment</SelectItem>
                <SelectItem value="medical">Medical Equipment</SelectItem>
                <SelectItem value="laboratory">Laboratory Equipment</SelectItem>
                <SelectItem value="office">Office Equipment</SelectItem>
                <SelectItem value="specialized">Specialized Industrial Plant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pe-cost-components">P&E Cost Components</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Equipment purchase cost', 'Transport costs', 'Installation costs', 'Commissioning costs', 'Engineering design', 'EPCM costs', 'Professional consultants', 'Non-recoverable taxes'].map((component) => (
                <div key={component} className="flex items-center space-x-2">
                  <Checkbox id={component} defaultChecked />
                  <Label htmlFor={component} className="text-sm">{component}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pe-valuation-basis">P&E Valuation Approach</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select approach" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="replacement-cost">Replacement Cost Approach</SelectItem>
                <SelectItem value="market-approach">Market Approach (Second-hand values)</SelectItem>
                <SelectItem value="hybrid">Hybrid Approach</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pe-depreciation">Depreciation Considerations</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="physical-life">Expected Physical Life (years)</Label>
                <Input id="physical-life" type="number" placeholder="15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="life-expired">Life Expired (years)</Label>
                <Input id="life-expired" type="number" placeholder="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="depreciation-method">Depreciation Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="straight-line">Straight Line</SelectItem>
                    <SelectItem value="diminishing-value">Diminishing Value</SelectItem>
                    <SelectItem value="performance-based">Performance Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pe-obsolescence">Obsolescence Factors</Label>
            <Textarea 
              id="pe-obsolescence"
              placeholder="Consider technological, functional, or economic obsolescence affecting the equipment..."
              className="min-h-[60px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pe-market-evidence">Market Evidence for P&E</Label>
            <Textarea 
              id="pe-market-evidence"
              placeholder="Detail any market evidence for similar second-hand equipment, recent sales, or replacement costs..."
              className="min-h-[60px]"
            />
          </div>
        </div>
      )
    },
    {
      id: "cost-allowances",
      title: "Cost Allowances & Adjustments",
      icon: Calculator,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="professional-fees">Professional Fees Allowance</Label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="architect-fees">Architect Fees (%)</Label>
                <Input id="architect-fees" type="number" placeholder="8" step="0.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="engineer-fees">Engineer Fees (%)</Label>
                <Input id="engineer-fees" type="number" placeholder="3" step="0.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surveyor-fees">Surveyor Fees (%)</Label>
                <Input id="surveyor-fees" type="number" placeholder="2" step="0.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="other-fees">Other Professional Fees (%)</Label>
                <Input id="other-fees" type="number" placeholder="2" step="0.5" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="demolition-debris">Demolition & Debris Removal</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="demolition-cost">Demolition Cost Estimate ($)</Label>
                <Input id="demolition-cost" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hazardous-materials">Hazardous Materials Present</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none-identified">None Identified</SelectItem>
                    <SelectItem value="asbestos-suspected">Asbestos Suspected</SelectItem>
                    <SelectItem value="asbestos-confirmed">Asbestos Confirmed</SelectItem>
                    <SelectItem value="other-hazardous">Other Hazardous Materials</SelectItem>
                    <SelectItem value="report-required">Specialist Report Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gst-treatment">GST Treatment</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gst-status">GST Status of Estimate</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select GST status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inclusive">Inclusive of GST</SelectItem>
                    <SelectItem value="exclusive">Exclusive of GST</SelectItem>
                    <SelectItem value="plus-gst">Plus GST (if any)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gst-rationale">GST Treatment Rationale</Label>
                <Textarea 
                  id="gst-rationale"
                  placeholder="Explain GST treatment based on property type and insured's GST status..."
                  className="min-h-[60px]"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cost-inclusions">Cost Estimate Inclusions/Exclusions</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Professional fees', 'Demolition & debris removal', 'Lead time cost escalation', 'Reconstruction period escalation', 'Council fees and charges', 'Temporary accommodation', 'Loss of rent allowance', 'Site security during construction'].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={item} />
                  <Label htmlFor={item} className="text-sm">{item}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "time-factors",
      title: "Lead Time & Reconstruction Period",
      icon: Clock,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lead-time">Lead Time Assessment</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="design-period">Design Period (months)</Label>
                <Input id="design-period" type="number" placeholder="3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="approval-period">Approval Period (months)</Label>
                <Input id="approval-period" type="number" placeholder="4" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total-lead-time">Total Lead Time (months)</Label>
                <Input id="total-lead-time" type="number" placeholder="6" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lead-time-escalation">Lead Time Cost Escalation</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="escalation-rate">Annual Escalation Rate (%)</Label>
                <Input id="escalation-rate" type="number" placeholder="4" step="0.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="escalation-allowance">Escalation Allowance ($)</Label>
                <Input id="escalation-allowance" type="number" placeholder="0" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reconstruction-period">Reconstruction Period</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="construction-period">Construction Period (months)</Label>
                <Input id="construction-period" type="number" placeholder="12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reconstruction-escalation">Reconstruction Escalation ($)</Label>
                <Input id="reconstruction-escalation" type="number" placeholder="0" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pe-lead-time">P&E Specific Lead Time Considerations</Label>
            <Textarea 
              id="pe-lead-time"
              placeholder="Consider specialized equipment lead times, foreign exchange risks, building reconstruction requirements..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time-qualifications">Time-Related Qualifications</Label>
            <Textarea 
              id="time-qualifications"
              placeholder="Note any qualifications regarding future cost predictions, market volatility, or estimation errors..."
              className="min-h-[60px]"
            />
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-blue-800">Time Factor Summary</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Total project timeline from loss to completion</li>
                  <li>• Cost escalation allowances during lead time and construction</li>
                  <li>• Specialist equipment and heritage property extended timeframes</li>
                  <li>• Foreign exchange and market volatility considerations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "indemnity-value",
      title: "Indemnity Value Assessment",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="indemnity-approach">Indemnity Value Approach</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select approach" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cost-approach">Cost Approach</SelectItem>
                <SelectItem value="market-approach">Market Approach</SelectItem>
                <SelectItem value="hybrid-approach">Hybrid Approach</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="asset-condition">Asset Age, Condition & Remaining Life</Label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="asset-age">Asset Age (years)</Label>
                <Input id="asset-age" type="number" placeholder="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expected-life">Expected Life (years)</Label>
                <Input id="expected-life" type="number" placeholder="50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="remaining-life">Remaining Life (years)</Label>
                <Input id="remaining-life" type="number" placeholder="40" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition-rating">Condition Rating</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="very-poor">Very Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="depreciation-calculation">Depreciation Calculation</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="replacement-cost-full">Full Replacement Cost ($)</Label>
                <Input id="replacement-cost-full" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="depreciation-amount">Depreciation Amount ($)</Label>
                <Input id="depreciation-amount" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="indemnity-value-final">Indemnity Value ($)</Label>
                <Input id="indemnity-value-final" type="number" placeholder="0" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="obsolescence-factors">Obsolescence Considerations</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Physical deterioration', 'Functional obsolescence', 'Technological obsolescence', 'Economic obsolescence', 'External obsolescence', 'Maintenance considerations'].map((factor) => (
                <div key={factor} className="flex items-center space-x-2">
                  <Checkbox id={factor} />
                  <Label htmlFor={factor} className="text-sm">{factor}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="market-evidence-indemnity">Market Evidence for Indemnity Assessment</Label>
            <Textarea 
              id="market-evidence-indemnity"
              placeholder="Detail any market evidence for similar aged assets, depreciated values, or second-hand sales..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="indemnity-limitations">Indemnity Value Limitations</Label>
            <Textarea 
              id="indemnity-limitations"
              placeholder="Note that indemnity value using cost approach may differ from market approach, and other limitations..."
              className="min-h-[60px]"
            />
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-green-800">Indemnity Value Summary</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Reflects actual loss to insured considering age and condition</li>
                  <li>• Based on remaining physical (not economic) life of asset</li>
                  <li>• May differ significantly between cost and market approaches</li>
                  <li>• Installation costs may be included at full or depreciated value</li>
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
        <Calculator className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Insurance Cost Estimates</h2>
      </div>

      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <CardTitle className="text-green-800">Insurance Cost Estimate Assessment</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-700">
            This assessment addresses insurance cost estimation requirements including replacement cost, 
            reproduction cost, and indemnity value calculations for various property types and situations.
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