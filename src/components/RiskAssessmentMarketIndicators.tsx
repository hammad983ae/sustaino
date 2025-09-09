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
  const [swotStrengths, setSwotStrengths] = useState("");
  const [swotWeaknesses, setSwotWeaknesses] = useState("");
  const [swotOpportunities, setSwotOpportunities] = useState("");
  const [swotThreats, setSwotThreats] = useState("");

  const [strengths, setStrengths] = useState(["Strength 1"]);
  const [weaknesses, setWeaknesses] = useState(["Weakness 1"]);
  const [opportunities, setOpportunities] = useState(["Opportunity 1"]);
  const [threats, setThreats] = useState(["Threat 1"]);

  const addItem = (list: string[], setList: (items: string[]) => void, defaultText: string) => {
    setList([...list, defaultText]);
  };

  const removeItem = (list: string[], setList: (items: string[]) => void, index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  const updateItem = (list: string[], setList: (items: string[]) => void, index: number, value: string) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

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
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Political Factors</Label>
                <Textarea 
                  placeholder="Government policies, regulations, political stability, tax policies..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Technological Factors</Label>
                <Textarea 
                  placeholder="Automation, digitalization, innovation, technology adoption..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Economic Factors</Label>
                <Textarea 
                  placeholder="Interest rates, inflation, economic growth, unemployment..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Environmental Factors</Label>
                <Textarea 
                  placeholder="Climate change, environmental regulations, sustainability requirements..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Social Factors</Label>
                <Textarea 
                  placeholder="Demographics, lifestyle changes, population growth, cultural trends..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Legal Factors</Label>
                <Textarea 
                  placeholder="Building codes, zoning laws, safety regulations, compliance requirements..."
                  className="min-h-[100px]"
                />
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
            <p className="text-sm text-muted-foreground">
              Analyze Strengths, Weaknesses, Opportunities, and Threats for comprehensive assessment
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💪</span>
                  <Label className="font-medium">Strengths</Label>
                </div>
                <Textarea 
                  value={swotStrengths}
                  onChange={(e) => setSwotStrengths(e.target.value)}
                  placeholder="List and analyze the property's key strengths, competitive advantages, and positive attributes..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <Label className="font-medium">Weaknesses</Label>
                </div>
                <Textarea 
                  value={swotWeaknesses}
                  onChange={(e) => setSwotWeaknesses(e.target.value)}
                  placeholder="Identify areas for improvement, limitations, and potential drawbacks..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🚀</span>
                  <Label className="font-medium">Opportunities</Label>
                </div>
                <Textarea 
                  value={swotOpportunities}
                  onChange={(e) => setSwotOpportunities(e.target.value)}
                  placeholder="Explore market opportunities, potential for growth, and future prospects..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <Label className="font-medium">Threats</Label>
                </div>
                <Textarea 
                  value={swotThreats}
                  onChange={(e) => setSwotThreats(e.target.value)}
                  placeholder="Assess external threats, market risks, and potential challenges..."
                  className="min-h-[120px]"
                />
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
              <CardTitle className="flex items-center gap-2">
                🎯 TOWS Analysis
              </CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-tows">Include</Label>
                <Switch
                  id="include-tows"
                  checked={includeTowsAnalysis}
                  onCheckedChange={setIncludeTowsAnalysis}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Analyze Threats, Opportunities, Weaknesses, and Strengths for strategic insights
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💪</span>
                  <Label className="font-medium">SO Strategies (Strengths + Opportunities)</Label>
                </div>
                <Textarea 
                  placeholder="How to use strengths to take advantage of opportunities..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <Label className="font-medium">WO Strategies (Weaknesses + Opportunities)</Label>
                </div>
                <Textarea 
                  placeholder="How to overcome weaknesses and avoid threats..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <Label className="font-medium">ST Strategies (Strengths + Threats)</Label>
                </div>
                <Textarea 
                  placeholder="How to use strengths to avoid threats..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔺</span>
                  <Label className="font-medium">WT Strategies (Weaknesses + Threats)</Label>
                </div>
                <Textarea 
                  placeholder="How to minimize weaknesses and avoid threats..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!includeTowsAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                🎯 TOWS Analysis
              </CardTitle>
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