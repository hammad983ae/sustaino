import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, Leaf, FileText, MapPin, Shield, TrendingUp, AlertTriangle, Users, Calculator } from "lucide-react";

export default function CarbonFarmProjects() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: "project-overview",
      title: "Carbon Project Overview & Instructions",
      icon: Leaf,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instruction-purpose">Purpose of Valuation</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="property-valuation">Real Property Supporting Carbon Project</SelectItem>
                <SelectItem value="accu-valuation">ACCU Valuation (Financial Instruments)</SelectItem>
                <SelectItem value="project-assessment">Carbon Project Assessment</SelectItem>
                <SelectItem value="impact-analysis">Impact Analysis on Property Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="project-status">Carbon Project Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="registered">Registered with Clean Energy Regulator</SelectItem>
                <SelectItem value="proposed">Proposed Carbon Project</SelectItem>
                <SelectItem value="development">Under Development</SelectItem>
                <SelectItem value="operational">Operational - Generating ACCUs</SelectItem>
                <SelectItem value="completed">Crediting Period Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="valuation-basis">Valuation Basis Required</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select basis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market-value">Market Value</SelectItem>
                <SelectItem value="highest-best-use">Highest & Best Use Analysis</SelectItem>
                <SelectItem value="impact-assessment">Carbon Project Impact Assessment</SelectItem>
                <SelectItem value="accu-market-value">ACCU Market Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="client-instructions">Specific Client Instructions</Label>
            <Textarea 
              id="client-instructions"
              placeholder="Detail specific instructions, scope limitations, intended use of valuation..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-blue-800">Important Note</h4>
                <p className="text-sm text-blue-700">ACCUs are regulated financial instruments. Members without AFSL must clarify they're not providing financial advice regarding ACCU trading.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "carbon-project-details",
      title: "Carbon Project Classification & Details",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-methodology">Carbon Project Methodology</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select methodology" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetation-sequestration">Vegetation Methods - Carbon Sequestration</SelectItem>
                <SelectItem value="vegetation-protection">Vegetation Methods - Forest Protection</SelectItem>
                <SelectItem value="soil-carbon">Agricultural Methods - Soil Carbon</SelectItem>
                <SelectItem value="livestock-emissions">Agricultural Methods - Livestock Emissions</SelectItem>
                <SelectItem value="savanna-burning">Savanna Burning Methods</SelectItem>
                <SelectItem value="other">Other Approved Methodology</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-area">Total Project Area (hectares)</Label>
              <Input id="project-area" type="number" placeholder="0" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cea-area">Carbon Estimation Area (hectares)</Label>
              <Input id="cea-area" type="number" placeholder="0" step="0.1" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="permanence-period">Permanence Period</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select permanence period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25-years">25 Years</SelectItem>
                <SelectItem value="100-years">100 Years</SelectItem>
                <SelectItem value="na">Not Applicable (Avoidance Project)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crediting-period">Crediting Period</Label>
              <Input id="crediting-period" placeholder="e.g., 2024-2031" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-proponent">Project Proponent</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select proponent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="landowner">Landowner</SelectItem>
                  <SelectItem value="third-party">Third-Party Carbon Service Provider</SelectItem>
                  <SelectItem value="partnership">Partnership/Joint Venture</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="project-registration">Clean Energy Regulator Registration</Label>
            <Input id="project-registration" placeholder="Project registration number (if applicable)" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accu-generation">ACCU Generation Forecast</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accus-issued">ACCUs Already Issued</Label>
                <Input id="accus-issued" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accus-forecast-annual">Annual ACCU Forecast</Label>
                <Input id="accus-forecast-annual" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accus-total-forecast">Total ACCUs Forecast</Label>
                <Input id="accus-total-forecast" type="number" placeholder="0" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="co-benefits">Carbon Project Co-Benefits</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Biodiversity enhancement', 'Soil health improvement', 'Water quality improvement', 'Erosion control', 'Wildlife habitat protection', 'Agricultural productivity gains', 'Employment opportunities', 'Cultural/social benefits'].map((benefit) => (
                <div key={benefit} className="flex items-center space-x-2">
                  <Checkbox id={benefit} />
                  <Label htmlFor={benefit} className="text-sm">{benefit}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "project-agreements",
      title: "Carbon Project Agreements & Legal Framework",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agreement-type">Carbon Project Agreement Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select agreement type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project-development">Project Development Agreement</SelectItem>
                <SelectItem value="services-agreement">Services Agreement</SelectItem>
                <SelectItem value="lease-agreement">Carbon Rights Lease</SelectItem>
                <SelectItem value="revenue-share">Revenue Sharing Agreement</SelectItem>
                <SelectItem value="no-agreement">No Third-Party Agreement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="revenue-split">ACCU Revenue Split</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="landowner-share">Landowner Share (%)</Label>
                <Input id="landowner-share" type="number" placeholder="50" min="0" max="100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provider-share">Service Provider Share (%)</Label>
                <Input id="provider-share" type="number" placeholder="50" min="0" max="100" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="agreement-term">Agreement Term</Label>
            <Input id="agreement-term" placeholder="e.g., 25 years, matches permanence period" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="delivery-obligations">Delivery Obligations</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select delivery type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="optional-delivery">Optional Delivery Contract</SelectItem>
                <SelectItem value="fixed-delivery">Fixed Delivery Contract</SelectItem>
                <SelectItem value="open-market">Open Market Trading</SelectItem>
                <SelectItem value="safeguard-mechanism">Safeguard Mechanism Compliance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="restrictions-obligations">Key Restrictions & Obligations</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Land use restrictions', 'Stocking rate limitations', 'Fire management requirements', 'Access rights for monitoring', 'Maintenance obligations', 'Property sale restrictions', 'ACCU trading restrictions', 'Seasonal management changes'].map((restriction) => (
                <div key={restriction} className="flex items-center space-x-2">
                  <Checkbox id={restriction} />
                  <Label htmlFor={restriction} className="text-sm">{restriction}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="termination-conditions">Termination Conditions & Costs</Label>
            <Textarea 
              id="termination-conditions"
              placeholder="Detail any termination clauses, ACCU relinquishment requirements, costs to exit agreement..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="eligible-interest-holders">Eligible Interest Holders Consent</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Registered proprietor', 'Mortgagee consent obtained', 'Native title holders', 'Leaseholder consent', 'Other interest holders', 'All consents documented'].map((holder) => (
                <div key={holder} className="flex items-center space-x-2">
                  <Checkbox id={holder} />
                  <Label htmlFor={holder} className="text-sm">{holder}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "native-title",
      title: "Native Title Considerations",
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="native-title-status">Native Title Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select native title status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-native-title">No Native Title Determined</SelectItem>
                <SelectItem value="native-title-exists">Native Title Exists</SelectItem>
                <SelectItem value="native-title-claim">Native Title Claim in Progress</SelectItem>
                <SelectItem value="ilua-exists">Indigenous Land Use Agreement (ILUA) in Place</SelectItem>
                <SelectItem value="extinguished">Native Title Extinguished</SelectItem>
                <SelectItem value="unknown">Status Unknown - Investigation Required</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="native-title-impact">Native Title Impact on Carbon Project</Label>
            <Textarea 
              id="native-title-impact"
              placeholder="Detail any ILUA requirements, consent processes, revenue sharing arrangements, cultural considerations..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="consent-status">Native Title Holder Consent Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select consent status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consent-obtained">Consent Obtained</SelectItem>
                <SelectItem value="consent-pending">Consent Process Underway</SelectItem>
                <SelectItem value="consent-required">Consent Required but Not Obtained</SelectItem>
                <SelectItem value="not-applicable">Not Applicable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cultural-heritage">Cultural Heritage Considerations</Label>
            <Textarea 
              id="cultural-heritage"
              placeholder="Note any cultural heritage assessments, sacred sites, cultural protocols affecting project implementation..."
              className="min-h-[60px]"
            />
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-orange-800">Native Title Requirements</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• CFI Act requires consent from Eligible Interest Holders including native title holders</li>
                  <li>• ILUA may be required for carbon projects on native title land</li>
                  <li>• Consider cultural heritage and sacred site implications</li>
                  <li>• Revenue sharing arrangements may apply under ILUA</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "impact-assessment",
      title: "Carbon Project Impact Assessment",
      icon: TrendingUp,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-land-use">Current Land Use & Productivity</Label>
            <Textarea 
              id="current-land-use"
              placeholder="Describe current agricultural use, carrying capacity, productivity, income generation..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="project-impacts">Carbon Project Impacts on Property</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-700">Positive Impacts</h4>
                {['Enhanced soil fertility', 'Improved pasture yield', 'Better erosion control', 'Increased ground water retention', 'Biodiversity enhancement', 'Additional income stream', 'Improved farm sustainability'].map((impact) => (
                  <div key={impact} className="flex items-center space-x-2">
                    <Checkbox id={impact} />
                    <Label htmlFor={impact} className="text-sm">{impact}</Label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-red-700">Negative Impacts</h4>
                {['Reduced carrying capacity', 'Seasonal restrictions', 'Limited land use flexibility', 'Additional management requirements', 'Fire management constraints', 'Property sale restrictions', 'Long-term commitment obligations'].map((impact) => (
                  <div key={impact} className="flex items-center space-x-2">
                    <Checkbox id={impact} />
                    <Label htmlFor={impact} className="text-sm">{impact}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="highest-best-use">Highest & Best Use Analysis</Label>
            <Textarea 
              id="highest-best-use"
              placeholder="Assess whether carbon project represents highest and best use considering physical possibility, legal permissibility, financial feasibility..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capital-investment">Capital Investment Required ($)</Label>
              <Input id="capital-investment" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ongoing-costs">Annual Ongoing Costs ($)</Label>
              <Input id="ongoing-costs" type="number" placeholder="0" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stage-timing">Current Project Stage & Development Timeline</Label>
            <Textarea 
              id="stage-timing"
              placeholder="Detail current stage of project development, expected timing to completion, phased implementation..."
              className="min-h-[60px]"
            />
          </div>
        </div>
      )
    },
    {
      id: "market-evidence",
      title: "Market Evidence & ACCU Valuation",
      icon: Calculator,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="comparable-sales">Comparable Property Sales</Label>
            <Textarea 
              id="comparable-sales"
              placeholder="Detail sales of properties with carbon projects, or comparable properties without carbon projects for impact analysis..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accu-pricing">ACCU Market Pricing</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-spot-price">Current Spot Price ($/ACCU)</Label>
                <Input id="current-spot-price" type="number" placeholder="0" step="0.01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contract-price">Contract Price ($/ACCU)</Label>
                <Input id="contract-price" type="number" placeholder="0" step="0.01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price-forecast">Price Forecast Period</Label>
                <Input id="price-forecast" placeholder="e.g., 2024-2031" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="market-demand">Market Demand & Supply Factors</Label>
            <Textarea 
              id="market-demand"
              placeholder="Consider safeguard mechanism compliance, voluntary market demand, government purchase programs, market trends..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="project-risks">Project & Market Risks</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['Reversal risk (fire, drought, disease)', 'Price volatility risk', 'Regulatory/methodology changes', 'Project performance risk', 'Counterparty risk', 'Market demand changes', 'Technology obsolescence', 'Climate change impacts'].map((risk) => (
                <div key={risk} className="flex items-center space-x-2">
                  <Checkbox id={risk} />
                  <Label htmlFor={risk} className="text-sm">{risk}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="market-perception">Market Perception & Community Acceptance</Label>
            <Textarea 
              id="market-perception"
              placeholder="Assess market acceptance of the methodology, community perception, buyer preferences for carbon projects..."
              className="min-h-[60px]"
            />
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-green-800">ACCU Market Considerations</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• ACCU prices are available on public markets - use current pricing at valuation date</li>
                  <li>• Consider forward price curves and contract terms</li>
                  <li>• ACCUs are regulated financial instruments under Corporations Act</li>
                  <li>• Market demand driven by compliance and voluntary purchases</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "valuation-summary",
      title: "Valuation Summary & Conclusions",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="valuation-approach">Primary Valuation Approach</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select primary approach" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market-approach">Market Approach</SelectItem>
                <SelectItem value="income-approach">Income Approach</SelectItem>
                <SelectItem value="cost-approach">Cost Approach</SelectItem>
                <SelectItem value="hybrid-approach">Hybrid Approach</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="property-without-carbon">Property Value Without Carbon Project ($)</Label>
              <Input id="property-without-carbon" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carbon-project-value">Carbon Project Value/Impact ($)</Label>
              <Input id="carbon-project-value" type="number" placeholder="0" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="total-property-value" className="text-lg font-semibold">Total Property Value with Carbon Project ($)</Label>
            <Input id="total-property-value" type="number" placeholder="0" className="text-lg font-semibold bg-muted/50" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accu-portfolio-value">ACCU Portfolio Value (if applicable) ($)</Label>
            <Input id="accu-portfolio-value" type="number" placeholder="0" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="valuation-rationale">Valuation Rationale & Methodology</Label>
            <Textarea 
              id="valuation-rationale"
              placeholder="Provide detailed explanation of valuation approach, key assumptions, supporting evidence, and reasoning for conclusions..."
              className="min-h-[120px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="key-assumptions">Key Assumptions & Limitations</Label>
            <Textarea 
              id="key-assumptions"
              placeholder="Detail key assumptions regarding carbon pricing, project performance, market conditions, regulatory environment..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recommendations">Recommendations to Client</Label>
            <Textarea 
              id="recommendations"
              placeholder="Include recommendations regarding project viability, risk management, additional investigations required..."
              className="min-h-[80px]"
            />
          </div>
          
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Leaf className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-primary">Valuation Summary</h4>
                <p className="text-sm text-muted-foreground">This valuation reflects the complex interplay between traditional land use and carbon farming opportunities, considering all relevant market, regulatory, and project-specific factors.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Leaf className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-foreground">Carbon Farm Projects</h2>
          <p className="text-sm text-muted-foreground">Valuation of real property supporting carbon farming projects and ACCU assessment</p>
        </div>
      </div>

      <div className="grid gap-4">
        {sections.map((section) => (
          <Card key={section.id} className="transition-all duration-200 hover:shadow-md">
            <CardHeader 
              className="cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <section.icon className="w-5 h-5 text-primary" />
                  <span>{section.title}</span>
                </div>
                {expandedSections[section.id] ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
            
            {expandedSections[section.id] && (
              <CardContent className="pt-0">
                {section.content}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline">Save Draft</Button>
        <Button>Generate Report</Button>
      </div>
    </div>
  );
}