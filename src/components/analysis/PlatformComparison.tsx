import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";

const PlatformComparison = () => {
  const comparisonData = {
    keyComponents: {
      sam: {
        name: "SAM Integration Platform",
        components: [
          { name: "Real-time Valuations", status: "strong", description: "AI-powered instant property valuations" },
          { name: "Lender Integration", status: "strong", description: "Direct API connections to major lenders" },
          { name: "Government Services", status: "strong", description: "ATO, ASIC, PEXA integration" },
          { name: "Settlement Platform", status: "moderate", description: "End-to-end settlement automation" },
          { name: "Credit Bureau Access", status: "strong", description: "Real-time credit checks and verification" },
          { name: "Legal Tech Integration", status: "moderate", description: "Contract automation and compliance" },
          { name: "Blockchain Settlement", status: "strong", description: "Crypto-enabled transaction processing" },
          { name: "Data Analytics", status: "moderate", description: "Market insights and reporting" }
        ]
      },
      corelogic: {
        name: "CoreLogic/RP Data",
        components: [
          { name: "Property Database", status: "strong", description: "Comprehensive historical property data" },
          { name: "Market Analytics", status: "strong", description: "Advanced market research and insights" },
          { name: "Valuation Tools", status: "strong", description: "Professional valuation services" },
          { name: "Risk Assessment", status: "strong", description: "Property risk and market analysis" },
          { name: "API Services", status: "moderate", description: "Limited third-party integrations" },
          { name: "Settlement Integration", status: "weak", description: "Limited settlement platform capabilities" },
          { name: "Real-time Processing", status: "weak", description: "Batch processing, not real-time" },
          { name: "Blockchain/Crypto", status: "weak", description: "No blockchain integration" }
        ]
      }
    },
    swotAnalysis: {
      sam: {
        strengths: [
          "Real-time processing and instant settlements",
          "Comprehensive integration ecosystem",
          "Blockchain/crypto transaction capabilities",
          "AI-powered valuations with instant results",
          "Government and regulatory compliance automation",
          "Cost-effective pricing model",
          "Modern API-first architecture"
        ],
        weaknesses: [
          "Newer platform with limited historical data",
          "Smaller market presence compared to CoreLogic",
          "Building brand recognition in established market",
          "Regulatory approval processes still developing"
        ],
        opportunities: [
          "Growing demand for digital transformation",
          "Blockchain adoption in property sector",
          "Cost pressure on traditional platforms",
          "Integration with emerging fintech solutions",
          "International expansion potential"
        ],
        threats: [
          "CoreLogic's established market position",
          "Potential regulatory changes",
          "Large competitors entering market",
          "Economic downturn affecting property market"
        ]
      },
      corelogic: {
        strengths: [
          "Market leader with 30+ years of data",
          "Comprehensive property database coverage",
          "Strong brand recognition and trust",
          "Established relationships with major institutions",
          "Extensive historical data and analytics",
          "Proven track record in valuations"
        ],
        weaknesses: [
          "Legacy systems limiting innovation speed",
          "High pricing structure",
          "Limited real-time capabilities",
          "Slow API response times",
          "Resistance to modern integration approaches",
          "No blockchain or crypto capabilities"
        ],
        opportunities: [
          "Modernizing platform architecture",
          "Expanding international presence",
          "Acquiring innovative startups",
          "Developing real-time capabilities"
        ],
        threats: [
          "Disruption from innovative platforms like SAM",
          "Loss of market share to more agile competitors",
          "Customer demand for faster, cheaper solutions",
          "Regulatory changes favoring open banking"
        ]
      }
    },
    performanceMetrics: {
      sam: {
        speed: 95,
        integration: 90,
        cost: 85,
        innovation: 95,
        dataDepth: 70,
        marketShare: 25
      },
      corelogic: {
        speed: 60,
        integration: 40,
        cost: 30,
        innovation: 45,
        dataDepth: 95,
        marketShare: 85
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "strong": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "moderate": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "weak": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "strong": return "bg-green-100 text-green-800 border-green-200";
      case "moderate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "weak": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Platform Comparison Analysis
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          SAM Integration Platform vs CoreLogic/RP Data
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="components">Key Components</TabsTrigger>
          <TabsTrigger value="swot">SWOT Analysis</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  SAM Integration Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Next-generation property technology platform featuring real-time processing, 
                  blockchain integration, and comprehensive ecosystem connectivity.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">Innovation Leader</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Real-time Processing</Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">Blockchain Enabled</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-orange-500" />
                  CoreLogic/RP Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Established market leader with extensive historical data and traditional 
                  property analytics services across Australia and New Zealand.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">Market Leader</Badge>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700">Legacy Platform</Badge>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Data Rich</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{comparisonData.keyComponents.sam.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comparisonData.keyComponents.sam.components.map((component, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                      {getStatusIcon(component.status)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{component.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{component.description}</p>
                        <Badge variant="outline" className={`mt-1 text-xs ${getStatusColor(component.status)}`}>
                          {component.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{comparisonData.keyComponents.corelogic.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comparisonData.keyComponents.corelogic.components.map((component, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                      {getStatusIcon(component.status)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{component.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{component.description}</p>
                        <Badge variant="outline" className={`mt-1 text-xs ${getStatusColor(component.status)}`}>
                          {component.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="swot" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SAM Platform - SWOT Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {comparisonData.swotAnalysis.sam.strengths.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Weaknesses</h4>
                    <ul className="space-y-1">
                      {comparisonData.swotAnalysis.sam.weaknesses.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <XCircle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Opportunities</h4>
                    <ul className="space-y-1">
                      {comparisonData.swotAnalysis.sam.opportunities.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <TrendingUp className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">Threats</h4>
                    <ul className="space-y-1">
                      {comparisonData.swotAnalysis.sam.threats.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <AlertCircle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CoreLogic - SWOT Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {comparisonData.swotAnalysis.corelogic.strengths.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Weaknesses</h4>
                    <ul className="space-y-1">
                      {comparisonData.swotAnalysis.corelogic.weaknesses.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <XCircle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Opportunities</h4>
                    <ul className="space-y-1">
                      {comparisonData.swotAnalysis.corelogic.opportunities.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <TrendingUp className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">Threats</h4>
                    <ul className="space-y-1">
                      {comparisonData.swotAnalysis.corelogic.threats.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <AlertCircle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SAM Platform Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(comparisonData.performanceMetrics.sam).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-semibold">{value}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CoreLogic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(comparisonData.performanceMetrics.corelogic).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-semibold">{value}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Competitive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">SAM Advantages</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Innovation, Speed, Integration, Cost-effectiveness
                  </p>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-400 mb-2">CoreLogic Advantages</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Market presence, Data depth, Brand trust
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Market Opportunity</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Digital transformation driving change
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformComparison;