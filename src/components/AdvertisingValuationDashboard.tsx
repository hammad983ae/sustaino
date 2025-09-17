import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Monitor, BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";
import AdvertisingSignageValuation from "./AdvertisingSignageValuation";
import DigitalPlatformValuation from "./DigitalPlatformValuation";

export default function AdvertisingValuationDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const marketInsights = [
    {
      title: "Billboard Market Trends",
      value: "$8.2B",
      change: "+12.3%",
      description: "Global OOH advertising market growing at 12.3% annually",
      icon: TrendingUp
    },
    {
      title: "Digital Signage Growth",
      value: "285%",
      change: "+45%",
      description: "Digital signage revenue premiums over static advertising",
      icon: Monitor
    },
    {
      title: "Average CPM Rates",
      value: "$3.45",
      change: "+8.2%",
      description: "Cost per thousand impressions for premium locations",
      icon: BarChart3
    },
    {
      title: "Audience Engagement",
      value: "2.8x",
      change: "+23%",
      description: "Higher engagement vs traditional advertising mediums",
      icon: Users
    }
  ];

  const valuationTypes = [
    {
      id: "signage",
      title: "Advertising Signage",
      description: "Value billboards, static signs, and outdoor advertising structures",
      icon: MapPin,
      features: [
        "Traffic volume analysis",
        "Demographics assessment", 
        "Planning permit considerations",
        "Lease term evaluation",
        "Operating cost analysis"
      ]
    },
    {
      id: "digital",
      title: "Digital Platforms",
      description: "Evaluate digital advertising spaces and smart display networks",
      icon: Monitor,
      features: [
        "Impression analytics",
        "CPM rate optimization",
        "Performance metrics",
        "Audience targeting",
        "Technology infrastructure"
      ]
    }
  ];

  const keyConsiderations = [
    {
      category: "Legal & Planning",
      items: [
        "Interest type (freehold, leasehold, license)",
        "Planning permit duration and renewal risk",
        "Lease terms and rental review mechanisms",
        "Ownership of signage structure"
      ]
    },
    {
      category: "Financial Analysis",
      items: [
        "Income producing potential and profit ratios",
        "Operating costs including public benefit fees",
        "Maintenance, insurance and ancillary costs",
        "Revenue sharing and incentive structures"
      ]
    },
    {
      category: "Market Factors",
      items: [
        "Traffic volume and demographic analysis",
        "Planned infrastructure changes",
        "Competitive signage in area",
        "Technology upgrades and digitization potential"
      ]
    },
    {
      category: "Physical Characteristics",
      items: [
        "Signage type (static vs digital)",
        "Number of viewing sides",
        "Size and visibility factors",
        "Location quality and accessibility"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Advertising Valuation Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Professional valuation tools for advertising signage and digital platform investments. 
            Comprehensive analysis based on industry best practices and market data.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="signage">Signage Valuation</TabsTrigger>
            <TabsTrigger value="digital">Digital Platform</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Market Overview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {marketInsights.map((insight, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <insight.icon className="h-8 w-8 text-primary" />
                      <Badge variant={insight.change.startsWith('+') ? 'default' : 'secondary'}>
                        {insight.change}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold mb-2">{insight.value}</div>
                    <h3 className="font-semibold mb-1">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Valuation Types */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {valuationTypes.map((type) => (
                <Card key={type.id} className="hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      onClick={() => setActiveTab(type.id)}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <type.icon className="h-6 w-6 text-primary" />
                      </div>
                      {type.title}
                    </CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Key Considerations */}
            <Card>
              <CardHeader>
                <CardTitle>Key Valuation Considerations</CardTitle>
                <CardDescription>
                  Critical factors to consider when valuing advertising signage and digital platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {keyConsiderations.map((section, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="font-semibold text-primary flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        {section.category}
                      </h3>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          <TabsContent value="signage">
            <AdvertisingSignageValuation />
          </TabsContent>

          <TabsContent value="digital">
            <DigitalPlatformValuation />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Analysis & Trends</CardTitle>
                <CardDescription>
                  Current market insights and industry trends affecting advertising valuations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">$8.2B</div>
                    <h3 className="font-semibold mb-1">Global OOH Market</h3>
                    <p className="text-sm text-muted-foreground">Annual advertising spend growing at 12.3%</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">285%</div>
                    <h3 className="font-semibold mb-1">Digital Premium</h3>
                    <p className="text-sm text-muted-foreground">Revenue advantage over static signage</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">7.5%</div>
                    <h3 className="font-semibold mb-1">Average Cap Rate</h3>
                    <p className="text-sm text-muted-foreground">For premium advertising assets</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Market Drivers</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Technology Adoption</h4>
                      <p className="text-sm">Digital signage adoption accelerating with programmatic advertising and real-time content management</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Urbanization</h4>
                      <p className="text-sm">Increasing urban population density driving higher traffic volumes and advertising value</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Measurement & Analytics</h4>
                      <p className="text-sm">Advanced audience measurement technologies improving ROI transparency for advertisers</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Regulatory Environment</h4>
                      <p className="text-sm">Planning regulations becoming more complex, affecting permit renewal risks and values</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Valuation Benchmarks</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Asset Type</th>
                          <th className="text-left p-2">Typical Cap Rate</th>
                          <th className="text-left p-2">Revenue Multiple</th>
                          <th className="text-left p-2">Risk Profile</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">Premium Digital Billboard</td>
                          <td className="p-2">6.5% - 7.5%</td>
                          <td className="p-2">4.5x - 5.5x</td>
                          <td className="p-2">Low-Medium</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Static Billboard (Major Road)</td>
                          <td className="p-2">7.5% - 8.5%</td>
                          <td className="p-2">3.5x - 4.5x</td>
                          <td className="p-2">Medium</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Transit Advertising</td>
                          <td className="p-2">8.0% - 9.0%</td>
                          <td className="p-2">3.0x - 4.0x</td>
                          <td className="p-2">Medium-High</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Digital Platform (Indoor)</td>
                          <td className="p-2">9.0% - 11.0%</td>
                          <td className="p-2">2.5x - 3.5x</td>
                          <td className="p-2">Medium-High</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}