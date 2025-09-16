import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Home, Trees, Factory, Leaf, Calculator, FileText, MapPin } from "lucide-react";
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
    },
    {
      id: "development",
      title: "Development Site Property",
      description: "Land and properties with development potential or approval",
      icon: MapPin,
      features: ["Site analysis", "Development feasibility", "Zoning assessment", "Market absorption"],
      color: "bg-gradient-to-br from-card to-destructive/10 border-destructive/20"
    }
  ];

  return (
    <div className="w-full">
      {/* Property Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {propertyTypes.map((type, index) => {
          const IconComponent = type.icon;
          return (
            <Card 
              key={type.id} 
              className="cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 group bg-white/80 backdrop-blur-sm border-emerald-200/50 hover:border-emerald-400/70 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSelect(type.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">
                      {type.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      {type.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
                    Automated Analysis Includes:
                  </h4>
                  <ul className="text-sm space-y-2">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mr-3 group-hover:scale-125 transition-transform duration-200" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105"
                  variant="default"
                >
                  Start {type.title} Valuation
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Banner */}
      <Card className="bg-gradient-to-r from-emerald-50/90 to-teal-50/90 border-emerald-200/60 backdrop-blur-sm animate-fade-in mb-8" style={{ animationDelay: '0.6s' }}>
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center text-emerald-700">
              <Leaf className="h-6 w-6 text-emerald-600 mr-3" />
              Sustaino Pro ESG Advantage
            </h3>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed max-w-3xl mx-auto">
              Every valuation includes comprehensive Environmental, Social & Governance analysis 
              to identify value premiums, risks, and future-proofing opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-emerald-700 font-medium">
              <span className="px-3 py-1 bg-emerald-100 rounded-full">• Carbon Footprint Analysis</span>
              <span className="px-3 py-1 bg-emerald-100 rounded-full">• Energy Efficiency Ratings</span>
              <span className="px-3 py-1 bg-emerald-100 rounded-full">• Climate Risk Assessment</span>
              <span className="px-3 py-1 bg-emerald-100 rounded-full">• Social Impact Metrics</span>
              <span className="px-3 py-1 bg-emerald-100 rounded-full">• Governance Compliance</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Navigation */}
      <Card className="bg-gradient-to-br from-white/90 to-emerald-50/80 border-emerald-200/50 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-emerald-700">Quick Navigation</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Access additional property valuation tools and features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" asChild className="flex-1 min-w-[180px] hover-scale border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50">
              <Link to="/property-valuations">
                <Calculator className="mr-2 h-4 w-4" />
                Property Valuations
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 min-w-[180px] hover-scale border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50">
              <Link to="/comprehensive-valuation">
                <Building2 className="mr-2 h-4 w-4" />
                Complete Valuation
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 min-w-[180px] hover-scale border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50">
              <Link to="/work-hub">
                <FileText className="mr-2 h-4 w-4" />
                Work Hub
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}