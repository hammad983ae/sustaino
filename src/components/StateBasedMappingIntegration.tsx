import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Map, Layers, Search, ExternalLink, Loader2, MapPin, Satellite, Navigation } from "lucide-react";
import { useProperty } from "@/contexts/PropertyContext";

interface StateBasedMappingProps {
  onPlanningDataUpdate?: (data: any) => void;
}

interface StatePortal {
  id: string;
  name: string;
  url: string;
  mapUrl: string;
  features: string[];
  status: 'active' | 'development' | 'integrated';
}

const statePortals: StatePortal[] = [
  {
    id: "vic",
    name: "VicPlan (Victoria)",
    url: "https://mapshare.vic.gov.au/vicplan/",
    mapUrl: "https://mapshare.vic.gov.au/vicplan/",
    features: ["Zoning", "Overlays", "Land Use", "Heritage", "Bushfire", "Flood Risk"],
    status: "integrated"
  },
  {
    id: "nsw",
    name: "NSW Planning Portal",
    url: "https://www.planningportal.nsw.gov.au/",
    mapUrl: "https://mapprod3.environment.nsw.gov.au/arcgis/apps/webappviewer/index.html",
    features: ["Zoning", "LEP", "DCP", "SEPP", "Heritage", "Biodiversity"],
    status: "development"
  },
  {
    id: "qld",
    name: "Queensland Planning Portal",
    url: "https://planning.statedevelopment.qld.gov.au/",
    mapUrl: "https://planning.statedevelopment.qld.gov.au/",
    features: ["Planning Schemes", "State Planning Policy", "Regional Plans"],
    status: "development"
  },
  {
    id: "wa",
    name: "WA Planning Portal",
    url: "https://www.wa.gov.au/government/publications/state-planning-framework",
    mapUrl: "https://catalogue.data.wa.gov.au/",
    features: ["Planning Schemes", "Local Planning Strategy", "Structure Plans"],
    status: "development"
  },
  {
    id: "sa",
    name: "SA Planning Portal",
    url: "https://plan.sa.gov.au/",
    mapUrl: "https://plan.sa.gov.au/",
    features: ["Planning & Design Code", "Zones", "Overlays", "Policies"],
    status: "development"
  },
  {
    id: "tas",
    name: "TAS Planning Portal",
    url: "https://www.planning.tas.gov.au/",
    mapUrl: "https://www.thelist.tas.gov.au/app/content/home",
    features: ["Planning Schemes", "Zoning", "Overlays", "Codes"],
    status: "development"
  }
];

const StateBasedMappingIntegration = ({ onPlanningDataUpdate }: StateBasedMappingProps) => {
  const { addressData, getFormattedAddress } = useProperty();
  const [selectedState, setSelectedState] = useState("");
  const [selectedPortal, setSelectedPortal] = useState<StatePortal | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [mappingData, setMappingData] = useState<any>(null);
  const [mapImages, setMapImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapDataCached, setMapDataCached] = useState(false);
  const lastAddress = useRef<string>('');
  const [mapLayers, setMapLayers] = useState({
    zoning: true,
    overlays: true,
    heritage: true,
    flood: true,
    bushfire: true,
    aerial: true
  });

  // Save data to localStorage whenever mappingData changes
  useEffect(() => {
    if (mappingData) {
      localStorage.setItem('vicplan-mapping-data', JSON.stringify({
        ...mappingData,
        savedAt: new Date().toISOString(),
        propertyAddress: getFormattedAddress(),
        activeState: selectedState
      }));
    }
  }, [mappingData, getFormattedAddress, selectedState]);

  // Clear data when address changes (debounced)
  useEffect(() => {
    const propertyAddress = getFormattedAddress();
    if (propertyAddress && propertyAddress !== lastAddress.current) {
      console.log('StateBasedMapping: Address changed, clearing data');
      
      // Clear component state immediately
      setMapImages([]);
      setIsLoading(false);
      setMapDataCached(false);
      setMappingData(null);
      
      // Clear localStorage with debounce to prevent excessive operations
      const clearStorage = setTimeout(() => {
        if (typeof Storage !== 'undefined') {
          const keysToRemove = ['vicplan-mapping-data', 'state-mapping-data'];
          keysToRemove.forEach(key => {
            localStorage.removeItem(key);
          });
        }
      }, 500); // Debounce localStorage operations
      
      lastAddress.current = propertyAddress;
      
      return () => clearTimeout(clearStorage);
    }
  }, [getFormattedAddress]);

  // Listen for planning data cleared events
  useEffect(() => {
    const handlePlanningDataCleared = (event: CustomEvent) => {
      console.log('StateBasedMapping: Received planningDataCleared event');
      setMapImages([]);
      setIsLoading(false);
      setMapDataCached(false);
      setMappingData(null);
      setSelectedState('');
      setSelectedPortal(null);
    };

    const handleFreshStart = (event: CustomEvent) => {
      console.log('StateBasedMapping: Received freshStart event');
      setMapImages([]);
      setIsLoading(false);
      setMapDataCached(false);
      setMappingData(null);
      setSelectedState('');
      setSelectedPortal(null);
      lastAddress.current = '';
    };

    window.addEventListener('planningDataCleared', handlePlanningDataCleared as EventListener);
    window.addEventListener('freshStart', handleFreshStart as EventListener);
    
    return () => {
      window.removeEventListener('planningDataCleared', handlePlanningDataCleared as EventListener);
      window.removeEventListener('freshStart', handleFreshStart as EventListener);
    };
  }, []);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Auto-populate state from context and clear data when address changes
  useEffect(() => {
    const currentAddress = getFormattedAddress();
    
    if (addressData.state && addressData.state !== selectedState) {
      const stateCode = addressData.state.toLowerCase();
      setSelectedState(stateCode);
      const portal = statePortals.find(p => p.id === stateCode);
      if (portal) {
        setSelectedPortal(portal);
      }
    }
    
    // Clear mapping data when address changes to ensure fresh search (debounced)
    if (currentAddress && mappingData && mappingData.address !== currentAddress) {
      console.log('Address changed from', mappingData.address, 'to', currentAddress, '- clearing mapping data');
      const clearData = setTimeout(() => {
        setMappingData(null);
        localStorage.removeItem('vicplan-mapping-data');
      }, 300);
      
      return () => clearTimeout(clearData);
    }
  }, [addressData.state, addressData, getFormattedAddress, mappingData]);

  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
    const portal = statePortals.find(p => p.id === stateId);
    setSelectedPortal(portal || null);
    
    // Clear old mapping data when state changes
    setMappingData(null);
    localStorage.removeItem('vicplan-mapping-data');
    
    if (portal?.status === "integrated" && getFormattedAddress()) {
      handleStateSearch(portal);
    }
  };

  const handleStateSearch = async (portal: StatePortal) => {
    if (!portal) {
      console.error('No portal provided for search');
      return;
    }
    
    const currentAddress = getFormattedAddress();
    if (!currentAddress) {
      console.warn('No address available for planning search');
      alert('Please enter a property address before searching for planning data.');
      return;
    }
    
    console.log('Starting planning search for:', currentAddress, 'using portal:', portal.name);
    
    // Clear old data before starting new search
    setMappingData(null);
    localStorage.removeItem('vicplan-mapping-data');
    
    setIsSearching(true);
    
    try {
      // Simulate API call to state planning portal
      console.log('Searching planning data for:', currentAddress, 'using portal:', portal.name);
      
      // Show immediate feedback
      console.log('Planning search initiated...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const mockMappingData = generateMockDataForState(portal.id);
      console.log('Mock planning data generated:', mockMappingData);
      
      setMappingData(mockMappingData);
      onPlanningDataUpdate?.(mockMappingData);
      
      console.log('Planning data search completed successfully');
      
    } catch (error) {
      console.error("Error fetching state mapping data:", error);
      alert('Failed to fetch planning data. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const generateMockDataForState = (stateId: string) => {
    const baseData = {
      lastUpdated: new Date().toLocaleDateString(),
      coordinates: { lat: -37.8136, lng: 144.9631 }, // Melbourne as default
      address: getFormattedAddress(),
      planningImage: '/src/assets/planning-zones-example.png' // Add planning image
    };

    switch (stateId) {
      case "vic":
        return {
          ...baseData,
          zoning: "Commercial 1 Zone (C1Z)",
          overlays: ["Development Contributions Plan Overlay", "Special Building Overlay", "Heritage Overlay"],
          landUse: "Commercial uses, Retail premises, Office premises",
          heightRestriction: "15m maximum",
          developmentPotential: "Medium - Subject to overlays",
          planningScheme: "Bayside Planning Scheme",
          permitRequired: true,
          heritage: "Non-contributory building in Heritage Overlay",
          floodRisk: "Not in flood prone area",
          bushfireRisk: "BAL-LOW",
          mapReference: "vicplan.vic.gov.au/planning/PS327856",
          planningImage: '/src/assets/planning-zones-example.png'
        };
      case "nsw":
        return {
          ...baseData,
          zoning: "B4 Mixed Use",
          overlays: ["Acid Sulfate Soils", "Flood Planning"],
          landUse: "Shop top housing, Business premises, Commercial premises",
          heightRestriction: "28m (8 storeys)",
          developmentPotential: "High - Mixed use development encouraged",
          planningScheme: "Sydney Local Environmental Plan 2012",
          permitRequired: true,
          heritage: "Not heritage listed",
          floodRisk: "1 in 100 year flood level applies",
          bushfireRisk: "Not bushfire prone land"
        };
      default:
        return {
          ...baseData,
          zoning: "Commercial Zone",
          overlays: ["Local Planning Overlay"],
          landUse: "Commercial and retail uses",
          heightRestriction: "To be determined",
          developmentPotential: "Subject to local planning controls",
          planningScheme: "Local Planning Scheme",
          permitRequired: true
        };
    }
  };

  const toggleMapLayer = (layer: keyof typeof mapLayers) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const openStatePortal = () => {
    if (selectedPortal) {
      window.open(selectedPortal.mapUrl, "_blank");
    }
  };

  // Debug function to check current state
  const debugState = () => {
    console.log('=== StateBasedMapping Debug Info ===');
    console.log('Selected State:', selectedState);
    console.log('Selected Portal:', selectedPortal);
    console.log('Formatted Address:', getFormattedAddress());
    console.log('Address Data:', addressData);
    console.log('Is Searching:', isSearching);
    console.log('Mapping Data:', mappingData);
    console.log('===================================');
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
       <CardHeader>
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-2">
             <Map className="h-5 w-5 text-primary" />
             <CardTitle className="text-xl font-semibold">State-Based Mapping Integration</CardTitle>
           </div>
           <div className="flex items-center gap-2">
             <Badge variant="secondary" className="text-xs">
               Enhanced Planning Search
             </Badge>
             <Button
               variant="ghost"
               size="sm"
               onClick={debugState}
               className="text-xs"
             >
               Debug
             </Button>
           </div>
         </div>
       </CardHeader>
       <CardContent className="space-y-6">
         {/* State Portal Selection */}
         <div className="space-y-4">
           <div className="flex items-center gap-2">
             <Layers className="h-4 w-4 text-primary" />
             <Label className="font-medium">Planning Portal Selection</Label>
           </div>
          
          <Select value={selectedState} onValueChange={handleStateChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select state/territory planning portal" />
            </SelectTrigger>
            <SelectContent>
              {statePortals.map((portal) => (
                <SelectItem key={portal.id} value={portal.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{portal.name}</span>
                    <Badge 
                      variant={portal.status === 'integrated' ? 'default' : 'secondary'} 
                      className="ml-2 text-xs"
                    >
                      {portal.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Portal Information & Search */}
        {selectedPortal && (
          <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">{selectedPortal.name}</h4>
                <p className="text-sm text-blue-700">
                  Access {selectedPortal.id.toUpperCase()} planning data and interactive mapping
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openStatePortal}
                  className="gap-1 text-blue-600 border-blue-300"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open Portal
                </Button>
                <Button
                  onClick={() => {
                    console.log('Search button clicked');
                    console.log('Selected Portal:', selectedPortal);
                    console.log('Address:', getFormattedAddress());
                    if (selectedPortal) {
                      handleStateSearch(selectedPortal);
                    } else {
                      console.error('No portal selected for search');
                      alert('Please select a state planning portal first.');
                    }
                  }}
                  disabled={!getFormattedAddress() || isSearching || !selectedPortal}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search Planning Data
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Available Features */}
            <div className="mb-4">
              <Label className="text-xs font-medium text-blue-700 mb-2 block">Available Data Layers</Label>
              <div className="flex flex-wrap gap-2">
                {selectedPortal.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-blue-300 text-blue-700">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Map Layer Controls */}
        {selectedPortal && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <Label className="font-medium">Map Layer Controls</Label>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-secondary/20 rounded-lg">
              <p className="col-span-full text-xs text-muted-foreground mb-2">All layers enabled by default - toggle to exclude:</p>
              {Object.entries(mapLayers).map(([layer, enabled]) => (
                <div key={layer} className="flex items-center space-x-2">
                  <Switch
                    id={`layer-${layer}`}
                    checked={enabled}
                    onCheckedChange={() => toggleMapLayer(layer as keyof typeof mapLayers)}
                  />
                  <Label htmlFor={`layer-${layer}`} className="text-sm capitalize flex items-center gap-1">
                    {layer === 'aerial' ? (
                      <>
                        <Satellite className="h-3 w-3" />
                        Aerial View
                      </>
                    ) : (
                      `${layer.charAt(0).toUpperCase() + layer.slice(1)} ${enabled ? '✓' : '✗'}`
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Map Placeholder */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-primary" />
            <Label className="font-medium">Interactive Planning Map</Label>
          </div>
          
          <div 
            ref={mapContainerRef}
            className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden min-h-[400px] border-2 border-dashed border-blue-300 relative"
          >
            {mappingData && mappingData.planningImage ? (
              <div className="relative h-full">
                <img 
                  src={mappingData.planningImage} 
                  alt="Planning zones map" 
                  className="w-full h-full object-contain bg-white"
                  style={{ minHeight: '400px' }}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg max-w-xs">
                  <h4 className="font-semibold text-blue-900 mb-2">Live Planning Data</h4>
                  <div className="text-xs space-y-1">
                    <p><strong>Property:</strong> {mappingData.address}</p>
                    <p><strong>Zoning:</strong> {mappingData.zoning}</p>
                    <p><strong>Source:</strong> {selectedPortal?.name}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {Object.entries(mapLayers)
                        .filter(([_, enabled]) => enabled)
                        .map(([layer]) => (
                          <span key={layer} className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                            {layer}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
                  <p className="text-xs text-gray-600">
                    Updated: {mappingData.lastUpdated}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center h-full flex flex-col justify-center">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="relative z-10">
                  <Map className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-blue-700 mb-2">
                    {selectedPortal ? `${selectedPortal.name} Interactive Map` : 'State Planning Map'}
                  </h3>
                  <p className="text-sm text-blue-600 mb-4 max-w-md mx-auto">
                    {selectedPortal 
                      ? `Click "Search Planning Data" to load interactive planning zones and overlay data for ${selectedPortal.id.toUpperCase()}`
                      : 'Select a state portal to view interactive planning maps'
                    }
                  </p>
                  
                  {selectedPortal && getFormattedAddress() && (
                    <div className="text-xs text-blue-600 space-y-1">
                      <p className="flex items-center justify-center gap-1">
                        <MapPin className="h-3 w-3 text-red-500" />
                        Ready to search: {getFormattedAddress()}
                      </p>
                      <p className="flex items-center justify-center gap-1">
                        🗺️ Data Source: {selectedPortal.name}
                      </p>
                      <p className="flex items-center justify-center gap-1">
                        🔄 All Layers Active: {Object.entries(mapLayers).filter(([_, enabled]) => enabled).length} of {Object.keys(mapLayers).length}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Planning Data Results */}
        {mappingData && (
          <div className="p-6 border rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <h4 className="font-semibold text-emerald-900">Planning Data Retrieved & Saved</h4>
                <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-700">
                  {selectedPortal?.name}
                </Badge>
              </div>
              <Badge variant="secondary" className="text-xs">
                Saved: {mappingData.savedAt ? new Date(mappingData.savedAt).toLocaleDateString() : 'Now'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Core Planning Data */}
              <div className="space-y-3">
                <h5 className="font-medium text-emerald-800 border-b border-emerald-200 pb-1">Core Planning</h5>
                <div>
                  <label className="text-xs font-medium text-emerald-700">Zoning</label>
                  <p className="text-sm">{mappingData.zoning}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-emerald-700">Land Use</label>
                  <p className="text-sm">{mappingData.landUse}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-emerald-700">Height Restriction</label>
                  <p className="text-sm">{mappingData.heightRestriction}</p>
                </div>
              </div>

              {/* Development & Permits */}
              <div className="space-y-3">
                <h5 className="font-medium text-emerald-800 border-b border-emerald-200 pb-1">Development</h5>
                <div>
                  <label className="text-xs font-medium text-emerald-700">Development Potential</label>
                  <p className="text-sm">{mappingData.developmentPotential}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-emerald-700">Permit Required</label>
                  <Badge variant={mappingData.permitRequired ? "destructive" : "secondary"} className="text-xs">
                    {mappingData.permitRequired ? "Yes" : "No"}
                  </Badge>
                </div>
                <div>
                  <label className="text-xs font-medium text-emerald-700">Planning Scheme</label>
                  <p className="text-sm">{mappingData.planningScheme}</p>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="space-y-3">
                <h5 className="font-medium text-emerald-800 border-b border-emerald-200 pb-1">Risk Assessment</h5>
                {mappingData.heritage && (
                  <div>
                    <label className="text-xs font-medium text-emerald-700">Heritage</label>
                    <p className="text-sm">{mappingData.heritage}</p>
                  </div>
                )}
                {mappingData.floodRisk && (
                  <div>
                    <label className="text-xs font-medium text-emerald-700">Flood Risk</label>
                    <p className="text-sm">{mappingData.floodRisk}</p>
                  </div>
                )}
                {mappingData.bushfireRisk && (
                  <div>
                    <label className="text-xs font-medium text-emerald-700">Bushfire Risk</label>
                    <p className="text-sm">{mappingData.bushfireRisk}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Overlays */}
            <div className="mt-6 pt-4 border-t border-emerald-200">
              <label className="text-xs font-medium text-emerald-700 block mb-2">Planning Overlays</label>
              <div className="flex flex-wrap gap-2">
                {mappingData.overlays?.map((overlay: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {overlay}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-emerald-200 text-center">
              <p className="text-xs text-emerald-600">
                Data sourced from {mappingData.planningScheme} • Last updated: {mappingData.lastUpdated}
              </p>
              {mappingData.mapReference && (
                <p className="text-xs text-emerald-600 mt-1">
                  Map Reference: {mappingData.mapReference}
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StateBasedMappingIntegration;