import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ExternalLink, Database, Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface DataSource {
  id: string;
  name: string;
  url: string;
  description: string;
  dataTypes: string[];
  coverage: string[];
  reliability: 'high' | 'medium' | 'low';
  enabled: boolean;
  apiAvailable: boolean;
}

interface DataSourcesConfigProps {
  selectedState: string;
  onSourcesChange: (sources: DataSource[]) => void;
}

const DATA_SOURCES_BY_STATE: Record<string, DataSource[]> = {
  VIC: [
    {
      id: 'vicplan',
      name: 'VicPlan',
      url: 'https://mapshare.vic.gov.au/vicplan/',
      description: 'Victorian state planning portal with zoning, overlays, and planning scheme information',
      dataTypes: ['Zoning', 'Planning Overlays', 'Planning Schemes', 'Development Controls'],
      coverage: ['Victoria'],
      reliability: 'high',
      enabled: true,
      apiAvailable: true
    },
    {
      id: 'landvic',
      name: 'Land Victoria',
      url: 'https://www.land.vic.gov.au/',
      description: 'Property titles, boundaries, and cadastral information',
      dataTypes: ['Title Details', 'Lot/Plan Numbers', 'Property Boundaries', 'Land Area'],
      coverage: ['Victoria'],
      reliability: 'high',
      enabled: true,
      apiAvailable: true
    },
    {
      id: 'delwp',
      name: 'DELWP Planning',
      url: 'https://www.planning.vic.gov.au/',
      description: 'Department of Environment, Land, Water and Planning data',
      dataTypes: ['Planning Permits', 'Development Applications', 'Strategic Planning'],
      coverage: ['Victoria'],
      reliability: 'high',
      enabled: true,
      apiAvailable: false
    }
  ],
  NSW: [
    {
      id: 'nsw-planning',
      name: 'NSW Planning Portal',
      url: 'https://www.planningportal.nsw.gov.au/',
      description: 'NSW state planning information and development applications',
      dataTypes: ['Zoning', 'Development Applications', 'Planning Instruments'],
      coverage: ['New South Wales'],
      reliability: 'high',
      enabled: true,
      apiAvailable: true
    },
    {
      id: 'lrs-nsw',
      name: 'NSW Land Registry Services',
      url: 'https://www.nswlrs.com.au/',
      description: 'Property titles and land information',
      dataTypes: ['Title Details', 'Property Boundaries', 'Ownership Information'],
      coverage: ['New South Wales'],
      reliability: 'high',
      enabled: true,
      apiAvailable: true
    },
    {
      id: 'eplanning-nsw',
      name: 'ePlanning NSW',
      url: 'https://www.planningportal.nsw.gov.au/major-projects',
      description: 'Development applications and planning decisions',
      dataTypes: ['Development Applications', 'Planning Decisions', 'Major Projects'],
      coverage: ['New South Wales'],
      reliability: 'high',
      enabled: true,
      apiAvailable: false
    }
  ],
  QLD: [
    {
      id: 'qld-planning',
      name: 'Queensland Planning',
      url: 'https://planning.statedevelopment.qld.gov.au/',
      description: 'Queensland state planning portal',
      dataTypes: ['Planning Schemes', 'Development Applications', 'Strategic Plans'],
      coverage: ['Queensland'],
      reliability: 'high',
      enabled: true,
      apiAvailable: true
    },
    {
      id: 'dnrme-qld',
      name: 'DNRME Queensland',
      url: 'https://www.resources.qld.gov.au/',
      description: 'Department of Natural Resources, Mines and Energy',
      dataTypes: ['Land Information', 'Survey Data', 'Titles Information'],
      coverage: ['Queensland'],
      reliability: 'high',
      enabled: true,
      apiAvailable: true
    }
  ],
  SA: [
    {
      id: 'sa-planning',
      name: 'SA Planning Portal',
      url: 'https://www.saplanningportal.sa.gov.au/',
      description: 'South Australia planning information',
      dataTypes: ['Planning & Design Code', 'Development Applications', 'Zoning'],
      coverage: ['South Australia'],
      reliability: 'high',
      enabled: true,
      apiAvailable: true
    },
    {
      id: 'dit-sa',
      name: 'Department for Infrastructure and Transport SA',
      url: 'https://www.dit.sa.gov.au/',
      description: 'SA infrastructure and transport planning',
      dataTypes: ['Infrastructure Planning', 'Transport Corridors', 'Land Use'],
      coverage: ['South Australia'],
      reliability: 'medium',
      enabled: true,
      apiAvailable: false
    }
  ],
  WA: [
    {
      id: 'wa-planning',
      name: 'WA Planning Commission',
      url: 'https://www.dplh.wa.gov.au/',
      description: 'Western Australia planning information',
      dataTypes: ['Planning Schemes', 'Zoning', 'Strategic Planning'],
      coverage: ['Western Australia'],
      reliability: 'high',
      enabled: true,
      apiAvailable: true
    },
    {
      id: 'landgate-wa',
      name: 'Landgate',
      url: 'https://www.landgate.wa.gov.au/',
      description: 'WA land and property information',
      dataTypes: ['Property Information', 'Land Boundaries', 'Valuations'],
      coverage: ['Western Australia'],
      reliability: 'high',
      enabled: true,
      apiAvailable: true
    }
  ],
  TAS: [
    {
      id: 'tas-planning',
      name: 'Tasmanian Planning Commission',
      url: 'https://planningreform.tas.gov.au/',
      description: 'Tasmania planning information',
      dataTypes: ['Planning Schemes', 'Development Applications', 'Strategic Plans'],
      coverage: ['Tasmania'],
      reliability: 'medium',
      enabled: true,
      apiAvailable: false
    },
    {
      id: 'land-tas',
      name: 'Land Tasmania',
      url: 'https://www.lands.tas.gov.au/',
      description: 'Tasmania land information',
      dataTypes: ['Property Information', 'Survey Data', 'Crown Land'],
      coverage: ['Tasmania'],
      reliability: 'medium',
      enabled: true,
      apiAvailable: false
    }
  ],
  NT: [
    {
      id: 'nt-planning',
      name: 'NT Planning Commission',
      url: 'https://dipl.nt.gov.au/',
      description: 'Northern Territory planning information',
      dataTypes: ['Planning Schemes', 'Development Assessment', 'Strategic Planning'],
      coverage: ['Northern Territory'],
      reliability: 'medium',
      enabled: true,
      apiAvailable: false
    }
  ],
  ACT: [
    {
      id: 'act-planning',
      name: 'ACT Planning and Land Authority',
      url: 'https://www.planning.act.gov.au/',
      description: 'ACT planning and development information',
      dataTypes: ['Territory Plan', 'Development Applications', 'Land Release'],
      coverage: ['Australian Capital Territory'],
      reliability: 'high',
      enabled: true,
      apiAvailable: true
    }
  ]
};

// National sources available for all states
const NATIONAL_SOURCES: DataSource[] = [
  {
    id: 'google-maps',
    name: 'Google Maps API',
    url: 'https://developers.google.com/maps',
    description: 'Address geocoding and place information',
    dataTypes: ['Address Validation', 'Coordinates', 'Place Details'],
    coverage: ['Australia'],
    reliability: 'high',
    enabled: true,
    apiAvailable: true
  },
  {
    id: 'australian-census',
    name: 'Australian Bureau of Statistics',
    url: 'https://www.abs.gov.au/',
    description: 'Census and demographic data',
    dataTypes: ['Demographics', 'Economic Indicators', 'Population Data'],
    coverage: ['Australia'],
    reliability: 'high',
    enabled: true,
    apiAvailable: true
  },
  {
    id: 'corelogic',
    name: 'CoreLogic',
    url: 'https://www.corelogic.com.au/',
    description: 'Property data and market analytics',
    dataTypes: ['Property Sales', 'Valuations', 'Market Data'],
    coverage: ['Australia'],
    reliability: 'high',
    enabled: false, // Requires subscription
    apiAvailable: true
  }
];

export default function DataSourcesConfig({ selectedState, onSourcesChange }: DataSourcesConfigProps) {
  const [sources, setSources] = useState<DataSource[]>(() => {
    const stateSources = DATA_SOURCES_BY_STATE[selectedState] || [];
    return [...stateSources, ...NATIONAL_SOURCES];
  });

  React.useEffect(() => {
    const stateSources = DATA_SOURCES_BY_STATE[selectedState] || [];
    const newSources = [...stateSources, ...NATIONAL_SOURCES];
    setSources(newSources);
    onSourcesChange(newSources);
  }, [selectedState, onSourcesChange]);

  const toggleSource = (sourceId: string) => {
    const updatedSources = sources.map(source =>
      source.id === sourceId ? { ...source, enabled: !source.enabled } : source
    );
    setSources(updatedSources);
    onSourcesChange(updatedSources);
    
    const source = updatedSources.find(s => s.id === sourceId);
    toast.success(`${source?.name} ${source?.enabled ? 'enabled' : 'disabled'}`);
  };

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'high': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Data Sources Configuration - {selectedState}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {sources.map((source) => (
            <div key={source.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{source.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={getReliabilityColor(source.reliability)}
                    >
                      {source.reliability} reliability
                    </Badge>
                    {source.apiAvailable && (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                        API Available
                      </Badge>
                    )}
                    {source.enabled && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {source.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {source.dataTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(source.url, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Visit Site
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      Coverage: {source.coverage.join(', ')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={source.enabled}
                    onCheckedChange={() => toggleSource(source.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-800 dark:text-blue-200">Data Privacy & Compliance</span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            All data is sourced from official government portals and authorized providers. 
            API usage complies with respective terms of service and data protection regulations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}