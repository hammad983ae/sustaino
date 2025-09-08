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
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              className="w-8 h-8 rounded-full border-2 border-muted hover:border-primary transition-colors"
                              aria-label={`Rate ${rating}`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-3">
                        <Input placeholder="Enter summary..." className="w-full" />
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
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💪</span>
                  <Label className="text-base font-medium">Strengths</Label>
                </div>
                <div className="space-y-2">
                  {strengths.map((strength, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={strength}
                        onChange={(e) => updateItem(strengths, setStrengths, index, e.target.value)}
                        placeholder="Enter strength..."
                      />
                      {strengths.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeItem(strengths, setStrengths, index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addItem(strengths, setStrengths, `Strength ${strengths.length + 1}`)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Strength
                  </Button>
                </div>
              </div>

              {/* Weaknesses */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <Label className="text-base font-medium">Weaknesses</Label>
                </div>
                <div className="space-y-2">
                  {weaknesses.map((weakness, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={weakness}
                        onChange={(e) => updateItem(weaknesses, setWeaknesses, index, e.target.value)}
                        placeholder="Enter weakness..."
                      />
                      {weaknesses.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeItem(weaknesses, setWeaknesses, index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addItem(weaknesses, setWeaknesses, `Weakness ${weaknesses.length + 1}`)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Weakness
                  </Button>
                </div>
              </div>

              {/* Opportunities */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🚀</span>
                  <Label className="text-base font-medium">Opportunities</Label>
                </div>
                <div className="space-y-2">
                  {opportunities.map((opportunity, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={opportunity}
                        onChange={(e) => updateItem(opportunities, setOpportunities, index, e.target.value)}
                        placeholder="Enter opportunity..."
                      />
                      {opportunities.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeItem(opportunities, setOpportunities, index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addItem(opportunities, setOpportunities, `Opportunity ${opportunities.length + 1}`)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Opportunity
                  </Button>
                </div>
              </div>

              {/* Threats */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <Label className="text-base font-medium">Threats</Label>
                </div>
                <div className="space-y-2">
                  {threats.map((threat, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={threat}
                        onChange={(e) => updateItem(threats, setThreats, index, e.target.value)}
                        placeholder="Enter threat..."
                      />
                      {threats.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeItem(threats, setThreats, index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => addItem(threats, setThreats, `Threat ${threats.length + 1}`)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Threat
                  </Button>
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