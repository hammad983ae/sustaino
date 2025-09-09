import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Home, Trees, Factory, Leaf, Calculator, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyTypeSelectorProps {
  onSelect: (type: string) => void;
}

export default function PropertyTypeSelector({ onSelect }: PropertyTypeSelectorProps) {
  const propertyTypes = [
    {
      id: "commercial",
      title: "Commercial Property",
      description: "Office, retail, industrial, and investment properties",
      icon: Building2,
      features: ["Income analysis", "Tenant assessment", "Market yields", "WALE calculations"],
      color: "bg-gradient-to-br from-card to-info/10 border-info/20"
    },
    {
      id: "residential",
      title: "Residential Property",
      description: "Houses, units, townhouses, and residential investments",
      icon: Home,
      features: ["Comparable sales", "Rental yields", "Market trends", "Condition assessment"],
      color: "bg-gradient-to-br from-card to-success/10 border-success/20"
    },
    {
      id: "agricultural",
      title: "Agricultural Property",
      description: "Farms, rural land, and agricultural enterprises",
      icon: Trees,
      features: ["Land productivity", "Water rights", "Carbon credits", "Commodity analysis"],
      color: "bg-gradient-to-br from-card to-warning/10 border-warning/20"
    },
    {
      id: "specialised",
      title: "Specialised Property",
      description: "Purpose-built assets with unique operational requirements",
      icon: Factory,
      features: ["Replacement cost", "Operational analysis", "Industry metrics", "Specialized comps"],
      color: "bg-gradient-to-br from-card to-primary/10 border-primary/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-4">
            <Link to="/index" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Original Platform
            </Link>
            <div className="flex items-center justify-center">
              <Leaf className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Sustaino Pro Valuation Platform
              </h1>
            </div>
            <div></div>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            Automated Property Valuations with ESG Intelligence
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Select your property type to begin an automated valuation powered by AI market analysis, 
            comparable sales data, and comprehensive ESG assessment.
          </p>
        </div>

        {/* Core Business Services - Valuations & ESG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-card to-primary/10 border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white shadow-sm">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Property Valuations</CardTitle>
                  <CardDescription className="text-sm">
                    Comprehensive automated property valuation services
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-muted-foreground">All Property Types Include:</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Market analysis & comparables
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Risk assessment
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Portfolio aggregation
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Performance metrics
                  </li>
                </ul>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Start Property Valuation
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-card to-success/10 border-success/20">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white shadow-sm">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">ESG Assessment</CardTitle>
                  <CardDescription className="text-sm">
                    Environmental, social, and governance analysis
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-muted-foreground">ESG Intelligence Includes:</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    ESG scoring & sustainability metrics
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Carbon footprint analysis
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Climate risk assessment
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Value premium identification
                  </li>
                </ul>
              </div>
              <Button className="w-full bg-success hover:bg-success/90 text-white">
                Start ESG Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Property Type Selection */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold mb-2">Property Type Valuations</h3>
            <p className="text-muted-foreground">
              Select your specific property type for targeted valuation analysis
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {propertyTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <Card 
                  key={type.id} 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${type.color}`}
                  onClick={() => onSelect(type.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-white shadow-sm">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{type.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {type.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Automated Analysis Includes:</h4>
                      <ul className="text-sm space-y-1">
                        {type.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full" variant="outline">
                      Start {type.title} Valuation
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-card to-secondary/10 border-secondary/20">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white shadow-sm">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Portfolio Valuations</CardTitle>
                  <CardDescription className="text-sm">
                    Comprehensive portfolio assessment and valuation
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-muted-foreground">Automated Analysis Includes:</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Portfolio aggregation
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Risk assessment
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Market analysis
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Performance metrics
                  </li>
                </ul>
              </div>
              <Button className="w-full bg-success hover:bg-success/90 text-white">
                Start Portfolio Valuation
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-card to-success/10 border-success/20">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white shadow-sm">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">ESG Portfolio</CardTitle>
                  <CardDescription className="text-sm">
                    Environmental, social, and governance portfolio analysis
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-muted-foreground">Automated Analysis Includes:</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    ESG scoring
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Sustainability metrics
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Carbon footprint
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Climate risk assessment
                  </li>
                </ul>
              </div>
              <Button className="w-full bg-success hover:bg-success/90 text-white">
                Start ESG Portfolio
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-card to-warning/10 border-warning/20">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white shadow-sm">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Health Check</CardTitle>
                  <CardDescription className="text-sm">
                    Comprehensive property health and condition assessment
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-muted-foreground">Automated Analysis Includes:</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Condition assessment
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Maintenance planning
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Risk identification
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    Compliance review
                  </li>
                </ul>
              </div>
              <Button className="w-full bg-success hover:bg-success/90 text-white">
                Start Health Check
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Banner */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-primary mr-2" />
                Sustaino Pro ESG Advantage
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Every valuation includes comprehensive Environmental, Social & Governance analysis 
                to identify value premiums, risks, and future-proofing opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                <span>• Carbon Footprint Analysis</span>
                <span>• Energy Efficiency Ratings</span>
                <span>• Climate Risk Assessment</span>
                <span>• Social Impact Metrics</span>
                <span>• Governance Compliance</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">Quick Navigation</CardTitle>
            <CardDescription className="text-center">
              Access additional property valuation tools and features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" asChild className="flex-1 min-w-[180px]">
                <Link to="/property-valuations">
                  <Calculator className="mr-2 h-4 w-4" />
                  Property Valuations
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 min-w-[180px]">
                <Link to="/comprehensive-valuation">
                  <Building2 className="mr-2 h-4 w-4" />
                  Complete Valuation
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 min-w-[180px]">
                <Link to="/work-hub">
                  <FileText className="mr-2 h-4 w-4" />
                  Work Hub
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}