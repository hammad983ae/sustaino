import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  BarChart3, 
  Leaf, 
  Globe, 
  Home, 
  Building2, 
  Factory, 
  ShoppingCart, 
  TreePine, 
  Wheat,
  Lock,
  Printer,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const MarketCommentary = () => {
  const [isAutoUpdating, setIsAutoUpdating] = useState(false);
  const { toast } = useToast();

  const handleAutoUpdate = async () => {
    setIsAutoUpdating(true);
    
    // Simulate AI update process
    toast({
      title: "AI Market Update Started",
      description: "Fetching latest market data and analysis...",
    });

    // Simulate API call delay
    setTimeout(() => {
      setIsAutoUpdating(false);
      toast({
        title: "Market Data Updated",
        description: "All market commentary sections have been updated with the latest AI analysis.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Auto Update AI Function */}
      <div className="flex justify-center">
        <Button 
          onClick={handleAutoUpdate}
          disabled={isAutoUpdating}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        >
          {isAutoUpdating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Updating with AI...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Auto Update AI Market Data
            </>
          )}
        </Button>
      </div>

      {/* Market Summary */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">Market Summary</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-market-summary" className="text-sm">Include</Label>
              <Switch id="include-market-summary" defaultChecked />
              <Label htmlFor="lock-market-summary" className="text-sm">Lock Data</Label>
              <Switch id="lock-market-summary" />
              <Button variant="ghost" size="sm">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">~3.3%</div>
              <div className="text-sm text-muted-foreground">Global Growth</div>
              <div className="text-xs text-muted-foreground">2025 forecast</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">~4.9%</div>
              <div className="text-sm text-muted-foreground">Residential Yields</div>
              <div className="text-xs text-muted-foreground">Average gross</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">8-12%</div>
              <div className="text-sm text-muted-foreground">Total Returns</div>
              <div className="text-xs text-muted-foreground">Per annum</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">5-5.75%</div>
              <div className="text-sm text-muted-foreground">Commercial Yields</div>
              <div className="text-xs text-muted-foreground">Recent transactions</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Sector / Topic</h4>
              <div className="space-y-2 text-sm">
                <div>Global Growth</div>
                <div>Global Inflation</div>
                <div>Commodity Prices</div>
                <div>Residential Yields (Aus)</div>
                <div>Residential Total Returns</div>
                <div>Regional Median Price Growth</div>
                <div>Townsville Yields</div>
                <div>Commercial Yields</div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Key Metric (Past 12 Months)</h4>
              <div className="space-y-2 text-sm">
                <div>~3.3% in 2025, down from 3.2% in 2024</div>
                <div>~4.2% in 2025; easing trend</div>
                <div>Expected to decline 12% in 2025</div>
                <div>~4.9% average gross; regional highs up to 6.6%</div>
                <div>8-12% p.a.</div>
                <div>Up to ~17% (e.g., Gold Coast y-o-y growth vs Sydney's 3.8%)</div>
                <div>6.5% (unit); 5.14% (house)</div>
                <div>~5-5.75% (e.g., Bunnings portfolio)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ESG Banking and Property */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              <CardTitle className="text-lg">ESG Banking and Property</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-esg" className="text-sm">Include</Label>
              <Switch id="include-esg" defaultChecked />
              <Label htmlFor="lock-esg" className="text-sm">Lock Data</Label>
              <Switch id="lock-esg" />
              <Button variant="ghost" size="sm">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sustainable-finance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sustainable-finance">Sustainable Finance</TabsTrigger>
              <TabsTrigger value="green-lending">Green Lending</TabsTrigger>
              <TabsTrigger value="esg-compliance">ESG Compliance</TabsTrigger>
            </TabsList>
            <TabsContent value="sustainable-finance" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Banking ESG Trends</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Major banks increasing green lending portfolios by 15-25% annually</li>
                    <li>• Sustainability-linked loans now represent 8% of commercial property finance</li>
                    <li>• APRA guidance driving enhanced climate risk assessment</li>
                    <li>• Carbon-neutral building certifications influencing lending rates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Property ESG Impact</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• NABERS-rated buildings commanding 3-7% rental premiums</li>
                    <li>• Green buildings showing 12% lower vacancy rates</li>
                    <li>• ESG-compliant properties attracting institutional investment</li>
                    <li>• Mandatory climate disclosure requirements from 2025</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold text-green-700">15% yield premium</div>
                  <div className="text-sm text-green-600">Green Star Buildings</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold text-blue-700">8% valuation uplift</div>
                  <div className="text-sm text-blue-600">Carbon Neutral Properties</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold text-purple-700">$2.3B annually</div>
                  <div className="text-sm text-purple-600">ESG Investment Flow</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="green-lending">
              <div className="text-sm text-muted-foreground">Green lending content...</div>
            </TabsContent>
            <TabsContent value="esg-compliance">
              <div className="text-sm text-muted-foreground">ESG compliance content...</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Global & Economic Overview */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">Global & Economic Overview</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-global" className="text-sm">Include</Label>
              <Switch id="include-global" defaultChecked />
              <Label htmlFor="lock-global" className="text-sm">Lock Data</Label>
              <Switch id="lock-global" />
              <Button variant="ghost" size="sm">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="imf-forecast" className="w-full">
            <TabsList>
              <TabsTrigger value="imf-forecast">IMF Forecast</TabsTrigger>
              <TabsTrigger value="oecd-data">OECD Data</TabsTrigger>
            </TabsList>
            <TabsContent value="imf-forecast" className="space-y-4 mt-4">
              <p className="text-sm">
                Global GDP growth is forecast at approximately <strong>3.3%</strong> for both 2025 and 2026—slightly below the 2000–2019 historical average of 3.7% (IMF). The OECD anticipates global growth easing from <strong>3.2% in 2024 to 3.1% in 2025</strong> (OECD).
              </p>
              <p className="text-sm">
                Meanwhile, global inflation is predicted to decline gradually: IMF projects a reduction to <strong>4.2% in 2025</strong> (IMF), while S&P forecasts easing pressures amid cautious monetary recalibration (EY).
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">Commodity Outlook</h4>
                <p className="text-sm">
                  Commodity prices are expected to fall by <strong>12% in 2025</strong> and a further <strong>5% in 2026</strong>, returning to pre-COVID levels (Reuters). This may help moderate inflation, although risks remain for export-dependent economies.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="oecd-data">
              <div className="text-sm text-muted-foreground">OECD data content...</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Residential Market Commentary */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-green-500" />
              <CardTitle className="text-lg">Residential Market Commentary</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-residential" className="text-sm">Include</Label>
              <Switch id="include-residential" defaultChecked />
              <Label htmlFor="lock-residential" className="text-sm">Lock Data</Label>
              <Switch id="lock-residential" />
              <Button variant="ghost" size="sm">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="price-growth" className="w-full">
            <TabsList>
              <TabsTrigger value="price-growth">Price Growth</TabsTrigger>
              <TabsTrigger value="rental-yields">Rental Yields</TabsTrigger>
            </TabsList>
            <TabsContent value="price-growth" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Regional Price Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Gold Coast:</span>
                      <span className="font-medium">A$1.32M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Brisbane:</span>
                      <span className="font-medium">A$936K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sydney:</span>
                      <span className="font-medium">A$1.581M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Townsville Unit:</span>
                      <span className="font-medium">A$340K (6.5% yield)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Townsville House:</span>
                      <span className="font-medium">A$536.5K (5.14% yield)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">5-Year Growth Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Adelaide & Perth:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">+81%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Brisbane:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">+81%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Canberra:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">+60%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Sydney:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">+39%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Melbourne:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">+15%</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">Investment Returns</h4>
                <p className="text-sm">
                  Investors in residential property are achieving <strong>total returns between 8–12% per annum</strong>, combining rental income (3–6%) and capital growth (5–7%). National average gross rental yield stands at <strong>4.92%</strong> in Q3 2025, with Darwin leading at <strong>6.6%</strong> and Sydney at approximately <strong>3.1%</strong>.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="rental-yields">
              <div className="text-sm text-muted-foreground">Rental yields content...</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Commercial Market Commentary */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-500" />
              <CardTitle className="text-lg">Commercial Market Commentary</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-commercial" className="text-sm">Include</Label>
              <Switch id="include-commercial" defaultChecked />
              <Label htmlFor="lock-commercial" className="text-sm">Lock Data</Label>
              <Switch id="lock-commercial" />
              <Button variant="ghost" size="sm">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="charter-hall" className="w-full">
            <TabsList>
              <TabsTrigger value="charter-hall">Charter Hall</TabsTrigger>
              <TabsTrigger value="bunnings-portfolio">Bunnings Portfolio</TabsTrigger>
            </TabsList>
            <TabsContent value="charter-hall" className="space-y-4 mt-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Recent Major Transaction</h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Transaction Value:</span>
                    <div className="text-lg font-bold text-purple-700">A$290M</div>
                  </div>
                  <div>
                    <span className="font-medium">Yield Range:</span>
                    <div className="text-lg font-bold text-purple-700">4.75% - 5.75%</div>
                  </div>
                  <div>
                    <span className="font-medium">Portfolio Yield:</span>
                    <div className="text-lg font-bold text-purple-700">~5%</div>
                  </div>
                </div>
                <p className="text-sm mt-3">
                  Charter Hall's acquisition of six Bunnings warehouses across NSW, QLD, and VIC exemplifies the strong fundamentals in commercial real estate, highlighting stable tenancy and long-term lease value.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="bunnings-portfolio">
              <div className="text-sm text-muted-foreground">Bunnings portfolio content...</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Industrial Market Commentary */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Factory className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-lg">Industrial Market Commentary</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-industrial" className="text-sm">Include</Label>
              <Switch id="include-industrial" defaultChecked />
              <Label htmlFor="lock-industrial" className="text-sm">Lock Data</Label>
              <Switch id="lock-industrial" />
              <Button variant="ghost" size="sm">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="global-trends" className="w-full">
            <TabsList>
              <TabsTrigger value="global-trends">Global Trends</TabsTrigger>
            </TabsList>
            <TabsContent value="global-trends" className="space-y-4 mt-4">
              <p className="text-sm">
                While specific yield data for industrial assets in Australia is limited in public sources, globally commercial and industrial properties tend to deliver yields in the <strong>5–9% range</strong> depending on location and asset type. The industrial sector continues to benefit from e-commerce growth and supply chain optimization trends.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Retail Market Commentary */}
      <Card className="border-l-4 border-l-pink-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-pink-500" />
              <CardTitle className="text-lg">Retail Market Commentary</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-retail" className="text-sm">Include</Label>
              <Switch id="include-retail" defaultChecked />
              <Label htmlFor="lock-retail" className="text-sm">Lock Data</Label>
              <Switch id="lock-retail" />
              <Button variant="ghost" size="sm">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stable-tenancy" className="w-full">
            <TabsList>
              <TabsTrigger value="stable-tenancy">Stable Tenancy</TabsTrigger>
            </TabsList>
            <TabsContent value="stable-tenancy" className="space-y-4 mt-4">
              <p className="text-sm">
                While fresh yield or price statistics are limited, investor activity in convenience and large-format retail remains strong—as evidenced by Charter Hall's acquisition. The market continues to value <strong>stable tenancy and long-term leases</strong>, particularly in essential retail categories.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Development Land Market Commentary */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-yellow-500" />
              <CardTitle className="text-lg">Development Land Market Commentary</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-development" className="text-sm">Include</Label>
              <Switch id="include-development" defaultChecked />
              <Label htmlFor="lock-development" className="text-sm">Lock Data</Label>
              <Switch id="lock-development" />
              <Button variant="ghost" size="sm">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="selective-activity" className="w-full">
            <TabsList>
              <TabsTrigger value="selective-activity">Selective Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="selective-activity" className="space-y-4 mt-4">
              <p className="text-sm">
                Development land activity remains selectively active. Developers are focusing on <strong>shovel-ready, well-located sites</strong> where planning frameworks align with demand, especially for residential and industrial projects. The emphasis is on projects with clear development pathways and strong underlying demand fundamentals.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Agricultural Market Commentary */}
      <Card className="border-l-4 border-l-teal-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wheat className="h-5 w-5 text-teal-500" />
              <CardTitle className="text-lg">Agricultural Market Commentary</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-agricultural" className="text-sm">Include</Label>
              <Switch id="include-agricultural" defaultChecked />
              <Label htmlFor="lock-agricultural" className="text-sm">Lock Data</Label>
              <Switch id="lock-agricultural" />
              <Button variant="ghost" size="sm">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sustainable-investment" className="w-full">
            <TabsList>
              <TabsTrigger value="sustainable-investment">Sustainable Investment</TabsTrigger>
              <TabsTrigger value="carbon-credits">Carbon Credits</TabsTrigger>
            </TabsList>
            <TabsContent value="sustainable-investment" className="space-y-4 mt-4">
              <p className="text-sm">
                While detailed agricultural market statistics specific to Australia are limited, international trends show continued strong interest in farming land. This is supported by <strong>robust commodity prices and interest in sustainable investment themes</strong> including carbon sequestration and biodiversity conservation opportunities.
              </p>
            </TabsContent>
            <TabsContent value="carbon-credits">
              <div className="text-sm text-muted-foreground">Carbon credits content...</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketCommentary;