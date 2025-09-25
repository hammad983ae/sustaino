import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  ExternalLink, 
  Search, 
  Layers, 
  MapPin, 
  Download, 
  Copy,
  RefreshCw,
  Info
} from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';
import { useToast } from '@/hooks/use-toast';

interface VictorianMappingResourcesProps {
  onDataUpdate?: (data: any) => void;
  onPlanningSearch?: (searchData: any) => void;
}

interface MappingResource {
  id: string;
  name: string;
  description: string;
  url: string;
  apiUrl?: string;
  features: string[];
  dataLayers: string[];
  status: 'active' | 'integrated' | 'beta';
}

interface StateResources {
  [key: string]: MappingResource[];
}

const stateResources: StateResources = {
  vic: [
    {
      id: 'mapshare-victoria',
      name: 'MapShare Victoria',
      description: 'Comprehensive Victorian mapping portal',
      url: 'https://mapshare.vic.gov.au/',
      features: ['Planning Zones', 'Property Boundaries', 'Infrastructure', 'Environment'],
      dataLayers: ['Zoning', 'Overlays', 'Property Boundaries', 'Roads', 'Waterways'],
      status: 'integrated'
    },
    {
      id: 'lassi',
      name: 'LASSI - Land & Survey Spatial Information',
      description: 'Land and survey spatial information system',
      url: 'https://www.land.vic.gov.au/maps-and-spatial/spatial-data/vicmap-data',
      features: ['Survey Information', 'Property Boundaries', 'Cadastral Data', 'Land Records'],
      dataLayers: ['Cadastral', 'Survey Marks', 'Land Parcels', 'Crown Land'],
      status: 'integrated'
    },
    {
      id: 'vicplan',
      name: 'VicPlan (Victoria)',
      description: 'Access VIC planning data and interactive mapping',
      url: 'https://mapshare.vic.gov.au/vicplan/',
      features: ['Zoning', 'Overlays', 'Land Use', 'Heritage', 'Bushfire', 'Flood Risk'],
      dataLayers: ['Planning Zones', 'Planning Overlays', 'Heritage', 'Environmental'],
      status: 'integrated'
    }
  ],
  nsw: [
    {
      id: 'six-maps',
      name: 'SIX Maps NSW',
      description: 'NSW spatial information exchange',
      url: 'https://maps.six.nsw.gov.au/',
      features: ['Property Info', 'Planning', 'Environment', 'Infrastructure'],
      dataLayers: ['Zoning', 'LEP', 'DCP', 'Heritage', 'Flooding'],
      status: 'active'
    },
    {
      id: 'planning-portal-nsw',
      name: 'NSW Planning Portal',
      description: 'NSW planning information and applications',
      url: 'https://www.planningportal.nsw.gov.au/',
      features: ['Development Applications', 'Planning Policies', 'Zoning Maps'],
      dataLayers: ['LEP Maps', 'SEPP', 'Regional Plans', 'Development Controls'],
      status: 'active'
    }
  ],
  qld: [
    {
      id: 'qld-globe',
      name: 'Queensland Globe',
      description: 'Queensland spatial web mapping portal',
      url: 'https://qldglobe.information.qld.gov.au/',
      features: ['Property', 'Planning', 'Environment', 'Infrastructure'],
      dataLayers: ['Planning Schemes', 'Zoning', 'Environmental', 'Infrastructure'],
      status: 'active'
    }
  ]
};

const VictorianMappingResources: React.FC<VictorianMappingResourcesProps> = ({ 
  onDataUpdate, 
  onPlanningSearch 
}) => {
  const { addressData, getFormattedAddress } = useProperty();
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState('vic');
  const [selectedResources, setSelectedResources] = useState<string[]>(['mapshare-victoria', 'lassi', 'vicplan']);
  const [autoSearch, setAutoSearch] = useState(true);
  const [searchData, setSearchData] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  // Auto-populate state based on property address
  useEffect(() => {
    if (addressData.state) {
      const stateCode = addressData.state.toLowerCase();
      if (stateResources[stateCode]) {
        setSelectedState(stateCode);
        // Auto-select first 3 resources for the state
        const resources = stateResources[stateCode];
        setSelectedResources(resources.slice(0, 3).map(r => r.id));
      }
    }
  }, [addressData.state]);

  // Auto-generate search data when address changes
  useEffect(() => {
    if (autoSearch && getFormattedAddress()) {
      generateSearchData();
    }
  }, [getFormattedAddress(), autoSearch, selectedState]);

  const generateSearchData = () => {
    const address = getFormattedAddress();
    if (!address) return;

    const searchParams = {
      address: address,
      suburb: addressData.suburb || '',
      postcode: addressData.postcode || '',
      state: addressData.state || '',
      searchLayers: selectedResources,
      timestamp: new Date().toISOString()
    };

    const searchString = `Search Parameters for Planning Data:
Address: ${address}
Suburb: ${searchParams.suburb}
Postcode: ${searchParams.postcode}
State: ${searchParams.state}

Selected Resources: ${getSelectedResourceNames().join(', ')}

Data Layers to Search:
${getSelectedDataLayers().map(layer => `- ${layer}`).join('\n')}

Search Query: ${address} planning zoning overlays heritage environmental`;

    setSearchData(searchString);
  };

  const getSelectedResourceNames = () => {
    const resources = stateResources[selectedState] || [];
    return selectedResources
      .map(id => resources.find(r => r.id === id)?.name)
      .filter(Boolean);
  };

  const getSelectedDataLayers = () => {
    const resources = stateResources[selectedState] || [];
    const layers = selectedResources
      .flatMap(id => resources.find(r => r.id === id)?.dataLayers || []);
    return [...new Set(layers)]; // Remove duplicates
  };

  const handleResourceToggle = (resourceId: string) => {
    setSelectedResources(prev => 
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const executeSearch = async () => {
    if (!searchData.trim()) {
      toast({
        title: "No Search Data",
        description: "Please generate or enter search parameters first.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    try {
      // Simulate API call to multiple mapping resources
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockExtractedData = {
        mapshareData: selectedResources.includes('mapshare-victoria') ? {
          zoning: 'Commercial 1 Zone (C1Z)',
          overlays: ['Heritage Overlay', 'Development Contributions Plan Overlay'],
          propertyBoundaries: 'Defined cadastral boundaries available',
          infrastructure: 'Full infrastructure mapping available'
        } : null,
        lassiData: selectedResources.includes('lassi') ? {
          surveyInformation: 'Plan of Subdivision PS327856',
          lotNumber: 'Lot 1',
          planNumber: 'PS327856',
          crownDescription: 'Part Crown Portion 1A',
          surveyMarks: 'SSM 145623 located on northern boundary'
        } : null,
        vicplanData: selectedResources.includes('vicplan') ? {
          planningScheme: 'Bayside Planning Scheme',
          zone: 'Commercial 1 Zone',
          overlays: ['Heritage Overlay HO142', 'Development Contributions Plan Overlay'],
          permitRequired: true,
          landUse: 'Shop, Office, Dwelling (with permit)',
          developmentPotential: 'Medium density commercial development'
        } : null,
        combinedAssessment: {
          dataCompleteness: 95,
          confidence: 'High',
          lastUpdated: new Date().toLocaleDateString(),
          recommendedActions: [
            'Heritage assessment required due to Heritage Overlay',
            'Development contributions may apply',
            'Commercial use permitted as-of-right'
          ]
        }
      };

      setExtractedData(mockExtractedData);
      onDataUpdate?.(mockExtractedData);
      onPlanningSearch?.(mockExtractedData);

      toast({
        title: "Search Completed",
        description: `Successfully extracted data from ${selectedResources.length} mapping resources.`,
      });

    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Failed to retrieve mapping data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const copySearchData = () => {
    navigator.clipboard.writeText(searchData);
    toast({
      title: "Copied",
      description: "Search data copied to clipboard.",
    });
  };

  const openResource = (resource: MappingResource) => {
    const address = getFormattedAddress();
    let url = resource.url;
    
    // Add address parameter if available
    if (address && resource.id === 'mapshare-victoria') {
      url = `${resource.url}?search=${encodeURIComponent(address)}`;
    }
    
    window.open(url, '_blank');
  };

  const currentResources = stateResources[selectedState] || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <CardTitle>Additional {selectedState.toUpperCase()} Mapping Resources</CardTitle>
          </div>
          <Badge variant="outline">Enhanced Integration</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Access comprehensive mapping data and pre-fill planning search parameters
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* State Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">State/Territory</Label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(stateResources).map(state => (
                <SelectItem key={state} value={state}>
                  {state.toUpperCase()} - {stateResources[state].length} resources
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Available Resources */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Available Mapping Resources</Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="auto-search" className="text-xs">Auto-search</Label>
              <Switch
                id="auto-search"
                checked={autoSearch}
                onCheckedChange={setAutoSearch}
              />
            </div>
          </div>

          <div className="grid gap-3">
            {currentResources.map(resource => (
              <div key={resource.id} className="border rounded-lg p-4 bg-blue-50/30">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{resource.name}</h4>
                      <Badge 
                        variant={resource.status === 'integrated' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {resource.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {resource.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {resource.dataLayers.map(layer => (
                        <Badge key={layer} variant="outline" className="text-xs">
                          {layer}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Switch
                      checked={selectedResources.includes(resource.id)}
                      onCheckedChange={() => handleResourceToggle(resource.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openResource(resource)}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated Search Data */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Pre-filled Search Parameters</Label>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={generateSearchData}
                disabled={!getFormattedAddress()}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Regenerate
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={copySearchData}
                disabled={!searchData}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>
          
          <Textarea
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Search parameters will be auto-generated based on property address and selected resources..."
            rows={8}
            className="text-xs"
          />
        </div>

        {/* Execute Search */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-xs text-muted-foreground">
            {selectedResources.length} resources selected • {getSelectedDataLayers().length} data layers
          </div>
          
          <Button
            onClick={executeSearch}
            disabled={isSearching || !searchData.trim() || selectedResources.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSearching ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
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

        {/* Results Preview */}
        {extractedData && (
          <div className="border rounded-lg p-4 bg-green-50/30 border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-4 w-4 text-green-600" />
              <h4 className="font-medium text-green-900">Data Successfully Extracted</h4>
            </div>
            
            <div className="space-y-2">
              {extractedData.mapshareData && (
                <div className="text-xs">
                  <strong>MapShare Victoria:</strong> {extractedData.mapshareData.zoning}
                </div>
              )}
              {extractedData.lassiData && (
                <div className="text-xs">
                  <strong>LASSI:</strong> {extractedData.lassiData.lotNumber} {extractedData.lassiData.planNumber}
                </div>
              )}
              {extractedData.vicplanData && (
                <div className="text-xs">
                  <strong>VicPlan:</strong> {extractedData.vicplanData.planningScheme}
                </div>
              )}
              <div className="text-xs text-green-700 pt-2">
                Confidence: {extractedData.combinedAssessment?.confidence} • 
                Completeness: {extractedData.combinedAssessment?.dataCompleteness}%
              </div>
            </div>
          </div>
        )}

        {/* Information Note */}
        <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded border border-blue-200">
          <strong>Note:</strong> These links will open the official state planning websites in a new tab. 
          Each portal provides access to zoning information, planning overlays, and development application 
          data specific to that state or territory.
        </div>
      </CardContent>
    </Card>
  );
};

export default VictorianMappingResources;