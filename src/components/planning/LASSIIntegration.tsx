import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Search, Loader2, MapPin, FileText } from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';

interface LASSIIntegrationProps {
  onDataUpdate?: (data: any) => void;
}

const LASSIIntegration = ({ onDataUpdate }: LASSIIntegrationProps) => {
  const { addressData, getFormattedAddress } = useProperty();
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleLASSISearch = async () => {
    setIsSearching(true);
    
    try {
      // Simulate LASSI API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockLASSIData = {
        source: 'LASSI (Land and Survey System Interface)',
        propertyId: 'LASSI-' + Date.now(),
        surveyPlans: [
          {
            planNumber: 'LP123456',
            planType: 'Plan of Subdivision',
            lodgedDate: '2023-05-15',
            surveyorName: 'Smith & Associates Surveyors',
            planArea: '2.5 hectares'
          }
        ],
        landDescription: {
          lotNumber: getFormattedAddress().match(/\d+/)?.[0] || '1',
          planReference: 'LP123456',
          parish: 'Melbourne',
          county: 'Bourke',
          crownAllotment: 'CA45B'
        },
        boundaries: {
          frontage: '20.12m',
          depth: '50.00m',
          area: '1006 sqm',
          boundaryType: 'Standard residential'
        },
        easements: [
          {
            type: 'Drainage Easement',
            width: '2.0m',
            beneficiary: 'Local Council',
            purpose: 'Stormwater drainage'
          }
        ],
        coordinates: {
          mga94Zone55: {
            easting: '315123.45',
            northing: '5812456.78'
          }
        },
        lastUpdated: new Date().toISOString()
      };

      setSearchResults(mockLASSIData);
      onDataUpdate?.(mockLASSIData);
    } catch (error) {
      console.error('LASSI search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const openLASSIPortal = () => {
    window.open('https://www.landata.vic.gov.au/', '_blank');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">LASSI Integration</CardTitle>
            <Badge variant="outline" className="text-xs">Victoria</Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={openLASSIPortal}
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            Open LASSI
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Land and Survey System Interface - Access survey plans, boundaries, and land descriptions
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Property address will be auto-populated"
            value={getFormattedAddress()}
            readOnly
            className="flex-1"
          />
          <Button 
            onClick={handleLASSISearch}
            disabled={isSearching}
            className="flex items-center gap-1"
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Search LASSI
          </Button>
        </div>

        {searchResults && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">LASSI Data Retrieved</span>
              <Badge variant="secondary" className="text-xs">
                {new Date(searchResults.lastUpdated).toLocaleDateString()}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Land Description</h4>
                <div className="text-xs space-y-1 bg-muted/50 p-2 rounded">
                  <div>Lot: {searchResults.landDescription.lotNumber}</div>
                  <div>Plan: {searchResults.landDescription.planReference}</div>
                  <div>Parish: {searchResults.landDescription.parish}</div>
                  <div>County: {searchResults.landDescription.county}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Boundaries</h4>
                <div className="text-xs space-y-1 bg-muted/50 p-2 rounded">
                  <div>Frontage: {searchResults.boundaries.frontage}</div>
                  <div>Depth: {searchResults.boundaries.depth}</div>
                  <div>Area: {searchResults.boundaries.area}</div>
                  <div>Type: {searchResults.boundaries.boundaryType}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Survey Plans</h4>
                <div className="text-xs space-y-1 bg-muted/50 p-2 rounded">
                  {searchResults.surveyPlans.map((plan: any, index: number) => (
                    <div key={index}>
                      <div>Plan: {plan.planNumber}</div>
                      <div>Type: {plan.planType}</div>
                      <div>Surveyor: {plan.surveyorName}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Easements</h4>
                <div className="text-xs space-y-1 bg-muted/50 p-2 rounded">
                  {searchResults.easements.map((easement: any, index: number) => (
                    <div key={index}>
                      <div>{easement.type} - {easement.width}</div>
                      <div>Purpose: {easement.purpose}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• LASSI provides official survey and land boundary information</p>
          <p>• Data includes lot/plan details, easements, and coordinate references</p>
          <p>• Essential for accurate property boundary identification</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LASSIIntegration;