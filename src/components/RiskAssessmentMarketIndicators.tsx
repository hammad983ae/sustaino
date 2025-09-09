/**
 * ============================================================================
 * PROPRIETARY RISK ASSESSMENT METHODOLOGY
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Risk assessment algorithms and market analysis frameworks are proprietary
 * intellectual property protected by patents and trade secrets.
 * ============================================================================
 */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const RiskAssessmentMarketIndicators = () => {
  const [includeSection, setIncludeSection] = useState(true);
  const [includePropertyRiskRatings, setIncludePropertyRiskRatings] = useState(true);
  const [includeRiskCategories, setIncludeRiskCategories] = useState(true);
  const [includeMarketIndicators, setIncludeMarketIndicators] = useState(true);
  const [includePestelAnalysis, setIncludePestelAnalysis] = useState(true);
  const [includeSwotAnalysis, setIncludeSwotAnalysis] = useState(true);
  const [includeTowsAnalysis, setIncludeTowsAnalysis] = useState(true);

  // Risk category ratings state
  const [riskRatings, setRiskRatings] = useState<{[key: string]: number}>({});
  const [riskSummaries, setRiskSummaries] = useState<{[key: string]: string}>({});

  // SWOT text areas state
  const [swotStrengths, setSwotStrengths] = useState("• Purpose-built accommodation for 18 residents with high occupancy potential (~80%)\n• Located on a main road within a Commercial 1 zone, facilitating accessibility and visibility\n• Solar energy reduces operating costs\n• Low-maintenance gardens and fencing minimize ongoing expenses\n• Stable gross revenue (~$120,000)");
  const [swotWeaknesses, setSwotWeaknesses] = useState("• Dependence on local economic conditions and demand for worker housing\n• High depreciation and amortization costs ($20,000 combined)\n• No additional income streams\n• Limited diversification of property income");
  const [swotOpportunities, setSwotOpportunities] = useState("• Potential to increase occupancy or rental rates\n• Energy savings through solar and efficiency upgrades\n• Expansion or renovation to modernize facilities\n• Leveraging location for increased demand (e.g., nearby industries)");
  const [swotThreats, setSwotThreats] = useState("• Regulatory changes affecting student or worker accommodation use\n• Market competition from other housing providers\n• Economic downturn affecting occupancy\n• Maintenance or operational issues impacting occupancy and revenue");

  const setRating = (category: string, rating: number) => {
    setRiskRatings(prev => ({ ...prev, [category]: rating }));
  };

  const setSummary = (category: string, summary: string) => {
    setRiskSummaries(prev => ({ ...prev, [category]: summary }));
  };

  const riskCategories = [
    "Location Neighbourhood",
    "Land Planning",
    "Environmental",
    "Improvements",
    "Market Activity",
    "Economy Impact",
    "Market Segment",
    "Cashflow",
    "Sustainability"
  ];

  if (!includeSection) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Risk Assessment & Market Indicators</CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-section">Include</Label>
              <Switch
                id="include-section"
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
              <CardTitle>Risk Assessment & Market Indicators</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Assess property risk factors and market indicators to provide comprehensive risk analysis
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-section">Include</Label>
              <Switch
                id="include-section"
                checked={includeSection}
                onCheckedChange={setIncludeSection}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Property Risk Ratings */}
      {includePropertyRiskRatings && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                ⚠️ Property Risk Ratings
              </CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-property-risk">Include</Label>
                <Switch
                  id="include-property-risk"
                  checked={includePropertyRiskRatings}
                  onCheckedChange={setIncludePropertyRiskRatings}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Location Risk</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Market Risk</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tenancy Risk</Label>
                <Select defaultValue="low">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Environmental Risk</Label>
                <Select defaultValue="low">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Overall Risk Rating</Label>
              <Select defaultValue="medium">
                <SelectTrigger className="max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {!includePropertyRiskRatings && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                ⚠️ Property Risk Ratings
              </CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-property-risk">Include</Label>
                <Switch
                  id="include-property-risk"
                  checked={includePropertyRiskRatings}
                  onCheckedChange={setIncludePropertyRiskRatings}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is excluded from the report.</p>
          </CardContent>
        </Card>
      )}

      {/* Risk Categories */}
      {includeRiskCategories && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Risk Categories</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-risk-categories">Include</Label>
                <Switch
                  id="include-risk-categories"
                  checked={includeRiskCategories}
                  onCheckedChange={setIncludeRiskCategories}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 bg-muted">Category</th>
                    <th className="text-left p-3 bg-muted">Rating (1-5)</th>
                    <th className="text-left p-3 bg-muted">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {riskCategories.map((category, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3 font-medium">{category}</td>
                      <td className="p-3">
                        <div className="flex gap-1 items-center">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => setRating(category, rating)}
                              className={`w-8 h-8 flex items-center justify-center text-lg font-bold transition-colors border rounded ${
                                riskRatings[category] >= rating
                                  ? 'text-yellow-500 bg-yellow-50 border-yellow-200 hover:text-yellow-600'
                                  : 'text-gray-400 bg-gray-50 border-gray-200 hover:text-yellow-400 hover:bg-yellow-50'
                              }`}
                              aria-label={`Rate ${category} ${rating} out of 5`}
                              type="button"
                            >
                              {riskRatings[category] >= rating ? '★' : '☆'}
                            </button>
                          ))}
                          {riskRatings[category] && (
                             <span className="ml-2 text-sm font-medium text-muted-foreground">
                               {riskRatings[category]}/5
                             </span>
                           )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Input 
                          placeholder="Enter summary..." 
                          className="w-full"
                          value={riskSummaries[category] || ''}
                          onChange={(e) => setSummary(category, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {!includeRiskCategories && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Risk Categories</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-risk-categories">Include</Label>
                <Switch
                  id="include-risk-categories"
                  checked={includeRiskCategories}
                  onCheckedChange={setIncludeRiskCategories}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is excluded from the report.</p>
          </CardContent>
        </Card>
      )}

      {/* Market Indicators */}
      {includeMarketIndicators && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Market Indicators</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-market-indicators">Include</Label>
                <Switch
                  id="include-market-indicators"
                  checked={includeMarketIndicators}
                  onCheckedChange={setIncludeMarketIndicators}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>Market Supply</Label>
                <Select defaultValue="stable">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Market Demand</Label>
                <Select defaultValue="stable">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Rental Vacancies</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Rental Values</Label>
                <Select defaultValue="stable">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="declining">Declining</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="rising">Rising</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>General Conditions</Label>
                <Select defaultValue="stable">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!includeMarketIndicators && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Market Indicators</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-market-indicators">Include</Label>
                <Switch
                  id="include-market-indicators"
                  checked={includeMarketIndicators}
                  onCheckedChange={setIncludeMarketIndicators}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is excluded from the report.</p>
          </CardContent>
        </Card>
      )}

      {/* PESTEL Analysis */}
      {includePestelAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>PESTEL Analysis</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-pestel">Include</Label>
                <Switch
                  id="include-pestel"
                  checked={includePestelAnalysis}
                  onCheckedChange={setIncludePestelAnalysis}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Political</h4>
                  <Textarea 
                    placeholder="Political factors affecting the property..."
                    defaultValue="Local government policies may influence zoning regulations and development approvals. State policies on housing, accommodation, and infrastructure investment can impact property viability. Potential impact of immigration and employment policies affecting demand for worker accommodation."
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Economic</h4>
                  <Textarea 
                    placeholder="Economic factors affecting the property..."
                    defaultValue="Stable rental income generating approximately $120,000 annually. Low maintenance costs and high solar efficiency reduce expenses. Market fluctuations in rental rates or occupancy levels could influence profitability. Economic conditions affecting employment in Mildura (agriculture, tourism, etc.) may impact demand."
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Social</h4>
                  <Textarea 
                    placeholder="Social factors affecting the property..."
                    defaultValue="Demand for affordable worker accommodation in industrial or commercial zones. Community perception of boarding houses or worker housing. Workforce stability and turnover rates."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Technological</h4>
                  <Textarea 
                    placeholder="Technological factors affecting the property..."
                    defaultValue="Solar power (13.2 kW) enhances energy efficiency and reduces operational costs. Use of automated or digital management systems for occupancy and maintenance. Potential upgrades in security or amenities."
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Environmental</h4>
                  <Textarea 
                    placeholder="Environmental factors affecting the property..."
                    defaultValue="Solar energy contributes to sustainable practices. Low-maintenance gardens and aquostic fencing reduce water and upkeep needs. Environmental policies favoring renewable energy and eco-friendly developments."
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Legal</h4>
                  <Textarea 
                    placeholder="Legal factors affecting the property..."
                    defaultValue="Compliance with zoning laws (Commercial 1 zone). Regulations regarding boarding and worker accommodation standards. Landlord and tenant legislation impacting operational aspects."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!includePestelAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>PESTEL Analysis</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-pestel">Include</Label>
                <Switch
                  id="include-pestel"
                  checked={includePestelAnalysis}
                  onCheckedChange={setIncludePestelAnalysis}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is excluded from the report.</p>
          </CardContent>
        </Card>
      )}

      {/* SWOT Analysis */}
      {includeSwotAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>SWOT Analysis</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-swot">Include</Label>
                <Switch
                  id="include-swot"
                  checked={includeSwotAnalysis}
                  onCheckedChange={setIncludeSwotAnalysis}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
                  <Textarea 
                    placeholder="List property strengths..."
                    className="min-h-[120px]"
                    value={swotStrengths}
                    onChange={(e) => setSwotStrengths(e.target.value)}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Opportunities</h4>
                  <Textarea 
                    placeholder="List property opportunities..."
                    className="min-h-[120px]"
                    value={swotOpportunities}
                    onChange={(e) => setSwotOpportunities(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-yellow-600 mb-2">Weaknesses</h4>
                  <Textarea 
                    placeholder="List property weaknesses..."
                    className="min-h-[120px]"
                    value={swotWeaknesses}
                    onChange={(e) => setSwotWeaknesses(e.target.value)}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Threats</h4>
                  <Textarea 
                    placeholder="List property threats..."
                    className="min-h-[120px]"
                    value={swotThreats}
                    onChange={(e) => setSwotThreats(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!includeSwotAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>SWOT Analysis</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-swot">Include</Label>
                <Switch
                  id="include-swot"
                  checked={includeSwotAnalysis}
                  onCheckedChange={setIncludeSwotAnalysis}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is excluded from the report.</p>
          </CardContent>
        </Card>
      )}

      {/* TOWS Analysis */}
      {includeTowsAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>TOWS Analysis Matrix</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-tows">Include</Label>
                <Switch
                  id="include-tows"
                  checked={includeTowsAnalysis}
                  onCheckedChange={setIncludeTowsAnalysis}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold">Strategy</th>
                    <th className="border border-border p-3 text-left font-semibold">Strengths/Opportunities</th>
                    <th className="border border-border p-3 text-left font-semibold">Weaknesses/Opportunities</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-green-50">Leverage & Grow</td>
                    <td className="border border-border p-3">
                      <Textarea 
                        placeholder="How to leverage strengths for opportunities..."
                        defaultValue="Market to nearby industries and workers, promoting occupancy. Promote eco-friendly attributes to reduce costs and appeal to tenants."
                        className="min-h-[80px] border-0 resize-none bg-transparent"
                      />
                    </td>
                    <td className="border border-border p-3">
                      <Textarea 
                        placeholder="How to overcome weaknesses using opportunities..."
                        defaultValue="Develop ancillary income (e.g., laundry, parking fees). Maximize occupancy and rental rate potential."
                        className="min-h-[80px] border-0 resize-none bg-transparent"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-blue-50">Defense & Counteract</td>
                    <td className="border border-border p-3">
                      <Textarea 
                        placeholder="How to use strengths to counter threats..."
                        defaultValue="Maintain property standards & regular updates. Stay ahead of regulatory changes with proactive compliance."
                        className="min-h-[80px] border-0 resize-none bg-transparent"
                      />
                    </td>
                    <td className="border border-border p-3">
                      <Textarea 
                        placeholder="How to minimize weaknesses and avoid threats..."
                        defaultValue="Diversify tenant base or consider adaptable uses. Avoid over-leverage or major investments without clear demand."
                        className="min-h-[80px] border-0 resize-none bg-transparent"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {!includeTowsAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>TOWS Analysis Matrix</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-tows">Include</Label>
                <Switch
                  id="include-tows"
                  checked={includeTowsAnalysis}
                  onCheckedChange={setIncludeTowsAnalysis}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is excluded from the report.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RiskAssessmentMarketIndicators;