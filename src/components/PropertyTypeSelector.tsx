import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Home, Trees, Factory, Leaf } from "lucide-react";

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
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      id: "residential",
      title: "Residential Property",
      description: "Houses, units, townhouses, and residential investments",
      icon: Home,
      features: ["Comparable sales", "Rental yields", "Market trends", "Condition assessment"],
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      id: "agricultural",
      title: "Agricultural Property",
      description: "Farms, rural land, and agricultural enterprises",
      icon: Trees,
      features: ["Land productivity", "Water rights", "Carbon credits", "Commodity analysis"],
      color: "bg-amber-50 border-amber-200 hover:bg-amber-100"
    },
    {
      id: "specialised",
      title: "Specialised Property",
      description: "Purpose-built assets with unique operational requirements",
      icon: Factory,
      features: ["Replacement cost", "Operational analysis", "Industry metrics", "Specialized comps"],
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Sustaino Pro Valuation Platform
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            Automated Property Valuations with ESG Intelligence
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Select your property type to begin an automated valuation powered by AI market analysis, 
            comparable sales data, and comprehensive ESG assessment.
          </p>
        </div>

        {/* Property Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                  <Button className="w-full" variant="default">
                    Start {type.title} Valuation
                  </Button>
                </CardContent>
              </Card>
            );
          })}
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
      </div>
    </div>
  );
}