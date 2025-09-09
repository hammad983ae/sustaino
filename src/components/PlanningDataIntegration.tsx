import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, MapPin, Search, ExternalLink, Loader2, Map } from "lucide-react";
import { useProperty } from "@/contexts/PropertyContext";

interface PlanningDataIntegrationProps {
  propertyAddress?: string;
  onDataFetched?: (data: any) => void;
}

const PlanningDataIntegration = ({ propertyAddress = "", onDataFetched }: PlanningDataIntegrationProps) => {
  const { addressData, getFormattedAddress } = useProperty();
  const [selectedState, setSelectedState] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [planningData, setPlanningData] = useState(null);
  const [searchStep, setSearchStep] = useState(1);

  // Auto-populate address from context
  useEffect(() => {
    const fullAddress = propertyAddress || getFormattedAddress();
    if (fullAddress && fullAddress !== searchAddress) {
      setSearchAddress(fullAddress);
    }
    
    // Auto-select state if available
    if (addressData.state && addressData.state !== selectedState) {
      setSelectedState(addressData.state.toLowerCase());
    }
  }, [addressData, propertyAddress, getFormattedAddress]);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    if (state === "vic" && searchAddress) {
      // Auto-trigger VicPlan search when Victoria is selected and address is available
      handleVicPlanSearch();
    }
  };

  const handleVicPlanSearch = async () => {
    if (!searchAddress) return;
    
    setIsSearching(true);
    setSearchStep(2);
    
    try {
      // Simulate API call to VicPlan
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockPlanningData = {
        zoning: "Commercial 1 Zone (C1Z)",
        overlays: ["Development Contributions Plan Overlay", "Special Building Overlay"],
        permitRequired: true,
        heightRestriction: "15m maximum",
        landUse: "Commercial uses, Retail premises, Office premises",
        developmentPotential: "Medium - Subject to overlays",
        planningScheme: "Bayside Planning Scheme",
        mapReference: "vicplan.vic.gov.au/planning/PS327856",
        lastUpdated: new Date().toLocaleDateString()
      };
      
      setPlanningData(mockPlanningData);
      onDataFetched?.(mockPlanningData);
    } catch (error) {
      console.error("Error fetching planning data:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const openVicPlan = () => {
    window.open("https://mapshare.vic.gov.au/vicplan/", "_blank");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-emerald-500" />
          <CardTitle className="text-xl font-semibold">Enhanced Planning Data Integration</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1: Planning Data Integration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 font-semibold text-sm">1</span>
            </div>
            <div>
              <h3 className="font-semibold">Step 1: Property Address Input</h3>
              <p className="text-sm text-muted-foreground">Enter property address for planning data retrieval</p>
            </div>
          </div>

          <div className="space-y-3">
            <Input
              placeholder="Enter property address..."
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="w-full"
            />
            
            {searchAddress && (
              <div className="p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Address Identified:</span>
                  <span className="text-sm">{searchAddress}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Planning Portal Integration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
              searchStep >= 2 ? 'bg-emerald-100' : 'bg-gray-100'
            }`}>
              <span className={`font-semibold text-sm ${
                searchStep >= 2 ? 'text-emerald-600' : 'text-gray-400'
              }`}>2</span>
            </div>
            <div>
              <h3 className="font-semibold">Step 2: Planning Portal Search</h3>
              <p className="text-sm text-muted-foreground">Search state planning portals for zoning and overlay information</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Select value={selectedState} onValueChange={handleStateChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select state/territory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nsw">NSW Planning Portal</SelectItem>
                <SelectItem value="vic">VIC PlanninG (VicPlan)</SelectItem>
                <SelectItem value="qld">QLD Development Atlas</SelectItem>
                <SelectItem value="wa">WA Planning Portal</SelectItem>
                <SelectItem value="sa">SA Planning Portal</SelectItem>
                <SelectItem value="tas">TAS Planning Portal</SelectItem>
                <SelectItem value="act">ACT Planning Portal</SelectItem>
                <SelectItem value="nt">NT Planning Portal</SelectItem>
              </SelectContent>
            </Select>

            {selectedState === "vic" && (
              <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">VicPlan Integration</h4>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openVicPlan}
                    className="gap-1 text-blue-600 border-blue-300"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Open VicPlan
                  </Button>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Access Victoria's planning maps and zoning information through VicPlan integration
                </p>
                
                <Button
                  onClick={handleVicPlanSearch}
                  disabled={!searchAddress || isSearching}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching VicPlan...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search VicPlan
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Planning Data Results */}
            {planningData && (
              <div className="p-4 border rounded-lg bg-emerald-50 border-emerald-200">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <h4 className="font-semibold text-emerald-900">Planning Data Retrieved</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-emerald-700">Zoning</label>
                    <p className="text-sm">{planningData.zoning}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-emerald-700">Height Restriction</label>
                    <p className="text-sm">{planningData.heightRestriction}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-emerald-700">Land Use</label>
                    <p className="text-sm">{planningData.landUse}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-emerald-700">Development Potential</label>
                    <p className="text-sm">{planningData.developmentPotential}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="text-xs font-medium text-emerald-700">Overlays</label>
                  <div className="flex gap-2 mt-1">
                    {planningData.overlays.map((overlay, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {overlay}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-emerald-200">
                  <p className="text-xs text-emerald-600">
                    Data sourced from {planningData.planningScheme} • Last updated: {planningData.lastUpdated}
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!planningData && selectedState && selectedState !== "vic" && (
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-600 mb-1">Portal Integration Coming Soon</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedState.toUpperCase()} planning portal integration is being developed
                </p>
              </div>
            )}

            {!selectedState && (
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-600 mb-1">Select a State/Territory</h4>
                <p className="text-sm text-muted-foreground">Choose a state to access planning portal data</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanningDataIntegration;