/**
 * ============================================================================
 * PROPRIETARY STRATEGIC ANALYSIS FRAMEWORK
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Strategic analysis methodologies and recommendation frameworks are
 * proprietary intellectual property protected by international copyright laws.
 * ============================================================================
 */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const AdditionalComments = () => {
  const [includeSection, setIncludeSection] = useState(true);

  if (!includeSection) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Additional Comments & Strategic Recommendations</CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-additional">Include</Label>
              <Switch
                id="include-additional"
                checked={includeSection}
                onCheckedChange={setIncludeSection}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This section is excluded from the report.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Additional Comments & Strategic Recommendations</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Strategic insights and recommendations for property optimization and investment strategy
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-additional">Include</Label>
              <Switch
                id="include-additional"
                checked={includeSection}
                onCheckedChange={setIncludeSection}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="strategic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="strategic">Strategic Recommendations</TabsTrigger>
          <TabsTrigger value="operational">Operational Improvements</TabsTrigger>
          <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
          <TabsTrigger value="market">Market Commentary</TabsTrigger>
        </TabsList>

        <TabsContent value="strategic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Strategic Recommendations
                <Badge variant="outline" className="text-xs">Priority Actions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Operational Improvements</h4>
                <Textarea
                  placeholder="Strategic operational recommendations..."
                  defaultValue="• Increase occupancy through targeted marketing to local industries and companies requiring worker accommodation
• Optimize rental rates by conducting regular market analysis to ensure competitive positioning
• Introduce ancillary income streams such as laundry services, parking fees, or security deposits to boost revenue without substantial capital expenditure
• Implement digital management systems for improved efficiency in occupancy tracking and maintenance scheduling"
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Asset & Cost Management</h4>
                <Textarea
                  placeholder="Asset management strategies..."
                  defaultValue="• Continue leveraging solar energy system to maximize operational cost savings and promote environmental benefits
• Allocate funds for periodic upgrades to maintain property standards and attract higher-paying tenants
• Implement tax planning strategies to capitalize on depreciation and amortization benefits
• Consider energy efficiency audits to identify additional cost-saving opportunities"
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <h4 className="font-semibold text-purple-600 mb-2">Growth Opportunities</h4>
                <Textarea
                  placeholder="Growth and expansion strategies..."
                  defaultValue="• Evaluate feasibility of constructing additional accommodation units if land permits
• Explore alternative property uses to accommodate different tenant groups, reducing dependence on single income stream
• Pursue sustainability certifications (NABERS, Green Star) to add value and market appeal
• Consider partnership opportunities with local employers for guaranteed occupancy agreements"
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚙️ Operational Excellence
                <Badge variant="outline" className="text-xs">Implementation Guide</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Property Management Optimization</h4>
                <Textarea
                  placeholder="Property management improvements..."
                  defaultValue="• Implement automated booking and payment systems to reduce administrative overhead
• Establish regular maintenance schedules to preserve property condition and tenant satisfaction
• Create standardized tenant onboarding processes to improve occupancy conversion rates
• Develop tenant retention programs to reduce turnover and associated costs"
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <h4 className="font-semibold text-teal-600 mb-2">Technology Integration</h4>
                <Textarea
                  placeholder="Technology implementation recommendations..."
                  defaultValue="• Install smart metering systems to monitor and optimize energy consumption
• Implement security cameras and access control systems to enhance tenant safety and property security
• Consider smart thermostats and lighting systems to further reduce operational costs
• Explore property management software for streamlined operations and reporting"
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💰 Financial Optimization
                <Badge variant="outline" className="text-xs">Value Enhancement</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Cash Flow Enhancement</h4>
                <Textarea
                  placeholder="Cash flow optimization strategies..."
                  defaultValue="The property demonstrates strong financial fundamentals with an EBITDA of $87,000 (72.5% margin). Current performance indicates:
• Stable cash generation capacity suitable for financing or refinancing opportunities
• Potential for rental optimization given strong demand in the Commercial 1 zone
• Depreciation benefits providing tax advantages while maintaining positive cash flow
• Low operational risk due to diversified tenant base and essential accommodation needs"
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Investment Potential</h4>
                <Textarea
                  placeholder="Investment analysis and recommendations..."
                  defaultValue="• Property valuation of approximately $1.24M based on current NOI and 7% cap rate represents fair market positioning
• Strong cash-on-cash returns make this attractive for yield-focused investors
• Solar infrastructure provides hedge against energy cost inflation
• Location in established commercial zone provides development potential and capital growth prospects"
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Market Intelligence
                <Badge variant="outline" className="text-xs">Strategic Insights</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-indigo-600 mb-2">Market Position Analysis</h4>
                <Textarea
                  placeholder="Market positioning and competitive analysis..."
                  defaultValue="• The property benefits from strategic location on main road with Commercial 1 zoning, providing flexibility and accessibility
• Worker accommodation demand remains strong in Mildura due to agricultural and tourism industries
• Limited competition in purpose-built worker housing creates market advantage
• Solar energy features provide competitive differentiation and cost advantage over traditional accommodation options"
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <h4 className="font-semibold text-red-600 mb-2">Risk Mitigation</h4>
                <Textarea
                  placeholder="Risk management strategies..."
                  defaultValue="• Monitor local employment trends and economic indicators that affect accommodation demand
• Maintain compliance with changing regulations for worker housing and Commercial 1 zone requirements
• Diversify marketing efforts to reduce dependence on single industry or employer relationships
• Establish contingency plans for economic downturns or regulatory changes affecting accommodation standards"
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Executive Summary of Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
            <Textarea
              placeholder="Provide executive summary of key recommendations..."
              defaultValue="This property represents a solid investment opportunity with strong fundamentals and clear value enhancement potential. The combination of stable cash flows ($87,000 EBITDA), strategic location, and energy-efficient infrastructure positions it well for both current returns and future growth. Key priorities should focus on occupancy optimization, operational efficiency, and strategic positioning to capitalize on the growing demand for worker accommodation in the Mildura region."
              className="min-h-[100px] bg-transparent border-0 resize-none text-sm"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalComments;