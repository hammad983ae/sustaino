import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Globe, MapPin, Info } from 'lucide-react';

interface AdditionalMap {
  name: string;
  url: string;
  description: string;
}

interface StatePlanningPortal {
  id: string;
  name: string;
  shortName: string;
  url: string;
  mapUrl: string;
  description: string;
  features: string[];
  additionalMaps?: AdditionalMap[];
}

const planningPortals: StatePlanningPortal[] = [
  {
    id: "vic",
    name: "VicPlan - Victoria Planning Portal",
    shortName: "VicPlan",
    url: "https://mapshare.vic.gov.au/vicplan/",
    mapUrl: "https://mapshare.vic.gov.au/vicplan/",
    additionalMaps: [
      {
        name: "MapShare Victoria",
        url: "https://mapshare.vic.gov.au/mapsharevic/",
        description: "Comprehensive Victorian mapping portal"
      },
      {
        name: "LASSI - Land & Survey Spatial Information",
        url: "https://maps.land.vic.gov.au/lassi/LassiUI.jsp",
        description: "Land and survey spatial information system"
      }
    ],
    description: "Access Victoria's comprehensive planning data and interactive mapping tools",
    features: ["Zoning Maps", "Planning Overlays", "Heritage Information", "Development Applications", "Planning Schemes", "MapShare Victoria", "LASSI System"]
  },
  {
    id: "nsw",
    name: "NSW Planning Portal",
    shortName: "NSW Portal",
    url: "https://www.planningportal.nsw.gov.au/",
    mapUrl: "https://mapprod3.environment.nsw.gov.au/arcgis/apps/webappviewer/index.html",
    description: "New South Wales planning information and mapping system",
    features: ["LEP Maps", "DCP Information", "SEPP Details", "DA Tracking", "Heritage Maps"]
  },
  {
    id: "qld",
    name: "Queensland Planning Portal",
    shortName: "QLD Portal",
    url: "https://planning.statedevelopment.qld.gov.au/",
    mapUrl: "https://planning.statedevelopment.qld.gov.au/",
    description: "Queensland government planning information and resources",
    features: ["Planning Schemes", "State Planning Policy", "Regional Plans", "Development Applications"]
  },
  {
    id: "wa",
    name: "Western Australia Planning Portal",
    shortName: "WA Portal",
    url: "https://www.wa.gov.au/government/publications/state-planning-framework",
    mapUrl: "https://catalogue.data.wa.gov.au/",
    description: "Western Australia planning framework and data",
    features: ["Local Planning Schemes", "Structure Plans", "Planning Policies", "Development Applications"]
  },
  {
    id: "sa",
    name: "South Australia Planning Portal",
    shortName: "SA Portal",
    url: "https://plan.sa.gov.au/",
    mapUrl: "https://plan.sa.gov.au/",
    description: "South Australia Planning & Design Code portal",
    features: ["Planning & Design Code", "Zone Maps", "Overlay Maps", "Policy Information"]
  },
  {
    id: "tas",
    name: "Tasmania Planning Portal",
    shortName: "TAS Portal",
    url: "https://www.planning.tas.gov.au/",
    mapUrl: "https://www.thelist.tas.gov.au/app/content/home",
    description: "Tasmania planning information and mapping services",
    features: ["Planning Schemes", "Zoning Information", "Planning Overlays", "Development Applications"]
  },
  {
    id: "nt",
    name: "Northern Territory Planning Portal",
    shortName: "NT Portal",
    url: "https://planningcommission.nt.gov.au/",
    mapUrl: "https://planningcommission.nt.gov.au/",
    description: "Northern Territory planning information and resources",
    features: ["Planning Schemes", "Development Applications", "Strategic Plans"]
  },
  {
    id: "act",
    name: "ACT Planning Portal",
    shortName: "ACT Portal",
    url: "https://www.planning.act.gov.au/",
    mapUrl: "https://app.actmapi.act.gov.au/actmapi/index.html",
    description: "Australian Capital Territory planning information",
    features: ["Territory Plan", "Development Applications", "Planning Maps", "Policy Information"]
  }
];

interface StatePlanningPortalLinksProps {
  selectedState?: string;
  className?: string;
}

export const StatePlanningPortalLinks: React.FC<StatePlanningPortalLinksProps> = ({
  selectedState,
  className = ""
}) => {
  const openPortal = (portal: StatePlanningPortal, useMapUrl: boolean = false) => {
    const url = useMapUrl ? portal.mapUrl : portal.url;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Filter portals based on selected state or show all
  const displayPortals = selectedState 
    ? planningPortals.filter(portal => portal.id === selectedState.toLowerCase())
    : planningPortals;

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          State Planning Portal Links
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Direct access to official state and territory planning websites
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {displayPortals.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <Info className="h-8 w-8 mx-auto mb-2" />
            <p>Select a state to view specific planning portal links</p>
          </div>
        )}

        {displayPortals.map((portal) => (
          <div 
            key={portal.id} 
            className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-blue-900">{portal.shortName}</h4>
                  <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                    {portal.id.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-blue-700 mb-2">{portal.description}</p>
                <div className="flex flex-wrap gap-1">
                  {portal.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {portal.features.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{portal.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openPortal(portal, false)}
                  className="gap-2 text-blue-600 border-blue-300 hover:bg-blue-50 whitespace-nowrap"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open Portal
                </Button>
                
                {portal.mapUrl !== portal.url && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openPortal(portal, true)}
                    className="gap-2 text-emerald-600 border-emerald-300 hover:bg-emerald-50 whitespace-nowrap"
                  >
                    <MapPin className="h-3 w-3" />
                    View Maps
                  </Button>
                )}
              </div>
            </div>
            
            {/* Additional mapping sites for Victoria */}
            {portal.additionalMaps && portal.additionalMaps.length > 0 && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <h5 className="text-sm font-medium text-blue-800 mb-2">Additional Victorian Mapping Resources:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {portal.additionalMaps.map((map, index) => (
                    <div key={index} className="p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-blue-900">{map.name}</p>
                          <p className="text-xs text-blue-600">{map.description}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(map.url, "_blank", "noopener,noreferrer")}
                          className="gap-1 text-blue-600 border-blue-300 hover:bg-blue-100 ml-2"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Open
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            These links will open the official state planning websites in a new tab. 
            Each portal provides access to zoning information, planning overlays, and development application data specific to that state or territory.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatePlanningPortalLinks;