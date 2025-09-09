import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useProperty } from "@/contexts/PropertyContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PropertyAnalysisData {
  address: string;
  state: string;
  timestamp: string;
  locationData: any;
  propertyDetails: any;
  marketData: any;
  environmentalData: any;
  planningData: any;
  transportData: any;
  demographicData: any;
}

const PropertySearchAnalysis = () => {
  const [propertyAddress, setPropertyAddress] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<PropertyAnalysisData | null>(null);
  const { updateAddressData } = useProperty();

  const handleIdentifyAddress = async () => {
    if (!propertyAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter a property address",
        variant: "destructive",
      });
      return;
    }

    if (!selectedState) {
      toast({
        title: "Error", 
        description: "Please select a state",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the property data analysis edge function
      const { data, error } = await supabase.functions.invoke('property-data-analysis', {
        body: {
          address: propertyAddress,
          state: selectedState
        }
      });

      if (error) throw error;

      if (data.success) {
        // Update property context with the address data
        updateAddressData({
          propertyAddress: propertyAddress,
          state: selectedState,
        });

        // Store the analysis data
        setAnalysisData(data.data);

        toast({
          title: "Success",
          description: `Property analysis completed! Found ${Object.keys(data.sections).length} automated sections.`,
        });
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Property analysis error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to analyze property",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-blue-500" />
          <div>
            <CardTitle className="text-xl font-semibold">Property Search & Analysis</CardTitle>
            <p className="text-sm text-muted-foreground">2 features cost rollback</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground pt-2">Advanced search filters and automated analysis with export feature.</p>
        <p className="text-xs text-muted-foreground italic">(Include back analysis features, foot and traffic analysis, climate analysis ect)</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Automated Property Location & Site Analysis */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold">Automated Property Location & Site Analysis</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="property-address-search" className="text-sm">Property Address</Label>
              <Input 
                id="property-address-search"
                placeholder="Enter full property address..."
                className="mt-1"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="state-search" className="text-sm">State</Label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NSW">NSW</SelectItem>
                  <SelectItem value="VIC">VIC</SelectItem>
                  <SelectItem value="QLD">QLD</SelectItem>
                  <SelectItem value="WA">WA</SelectItem>
                  <SelectItem value="SA">SA</SelectItem>
                  <SelectItem value="TAS">TAS</SelectItem>
                  <SelectItem value="ACT">ACT</SelectItem>
                  <SelectItem value="NT">NT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={handleIdentifyAddress}
            disabled={isLoading}
          >
            <Search className="h-4 w-4 mr-2" />
            {isLoading ? "Analyzing Property..." : "1. Identify Address"}
          </Button>
        </div>

        {/* Analysis Results */}
        {analysisData && (
          <div className="space-y-6 p-4 bg-secondary/50 rounded-lg">
            <h3 className="font-semibold text-lg">Automated Analysis Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Location Data */}
              <div className="p-3 bg-white rounded border">
                <h4 className="font-medium text-sm text-green-700">✓ Location Analysis</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Coordinates, address validation, nearby amenities
                </p>
                {analysisData.locationData?.coordinates && (
                  <p className="text-xs mt-1">
                    Lat: {analysisData.locationData.coordinates.lat.toFixed(4)}, 
                    Lng: {analysisData.locationData.coordinates.lng.toFixed(4)}
                  </p>
                )}
              </div>

              {/* Market Data */}
              <div className="p-3 bg-white rounded border">
                <h4 className="font-medium text-sm text-green-700">✓ Market Valuation</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Property values, market trends, comparables
                </p>
                {analysisData.marketData?.estimatedValue && (
                  <p className="text-xs mt-1 font-medium">
                    Est. Value: ${analysisData.marketData.estimatedValue.average.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Environmental Data */}
              <div className="p-3 bg-white rounded border">
                <h4 className="font-medium text-sm text-green-700">✓ Environmental Assessment</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Climate risks, sustainability factors
                </p>
                {analysisData.environmentalData?.climateRisk && (
                  <p className="text-xs mt-1">
                    Flood: {analysisData.environmentalData.climateRisk.floodRisk}, 
                    Fire: {analysisData.environmentalData.climateRisk.bushfireRisk}
                  </p>
                )}
              </div>

              {/* Planning Data */}
              <div className="p-3 bg-white rounded border">
                <h4 className="font-medium text-sm text-green-700">✓ Planning Analysis</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Zoning, land use, development potential
                </p>
                {analysisData.planningData?.zoning && (
                  <p className="text-xs mt-1">
                    Zone: {analysisData.planningData.zoning}
                  </p>
                )}
              </div>

              {/* Transport Data */}
              <div className="p-3 bg-white rounded border">
                <h4 className="font-medium text-sm text-green-700">✓ Transport Analysis</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Accessibility, walkability, transit
                </p>
                {analysisData.transportData?.walkScore && (
                  <p className="text-xs mt-1">
                    Walk Score: {analysisData.transportData.walkScore}/100
                  </p>
                )}
              </div>

              {/* Demographic Data */}
              <div className="p-3 bg-white rounded border">
                <h4 className="font-medium text-sm text-green-700">✓ Demographic Profile</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Population, income, education stats
                </p>
                {analysisData.demographicData?.medianIncome && (
                  <p className="text-xs mt-1">
                    Median Income: ${analysisData.demographicData.medianIncome.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            <div className="text-xs text-muted-foreground italic">
              Analysis completed at {new Date(analysisData.timestamp).toLocaleString()}. 
              This data will be used to automatically populate relevant sections in your reports.
            </div>
          </div>
        )}

        {/* Additional Analysis Features */}
        <div className="space-y-4">
          <h3 className="font-semibold">Additional Analysis Features</h3>
          <p className="text-xs text-muted-foreground">Functions not covered by RP Data - Available for review</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Weather & Risks */}
            <div className="space-y-2">
              <h4 className="font-medium">Weather & Risks</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Current conditions & forecasts</li>
                <li>• Natural disaster risk assessment</li>
                <li>• Flood, fire, cyclone zones</li>
              </ul>
            </div>

            {/* Traffic Analysis */}
            <div className="space-y-2">
              <h4 className="font-medium">Traffic Analysis</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Current traffic flow</li>
                <li>• Comparable property analysis</li>
                <li>• Peak hour patterns</li>
              </ul>
            </div>

            {/* Foot Traffic */}
            <div className="space-y-2">
              <h4 className="font-medium">Foot Traffic</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Retail strip analysis</li>
                <li>• Pedestrian flow patterns</li>
                <li>• Comparable strip performance</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic">
            Note: Location Analysis, Access & Site, and Services & Amenities are handled by RP Data functions and have been removed from this component to avoid duplication.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertySearchAnalysis;