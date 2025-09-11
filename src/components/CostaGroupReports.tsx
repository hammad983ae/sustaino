import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, TrendingUp, Droplets, BarChart3, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface CostaProperty {
  id: string;
  name: string;
  address: string;
  state: string;
  propertyType: 'mushroom' | 'tomato' | 'citrus' | 'berry' | 'grape' | 'banana';
  landArea: number;
  operationalStatus: 'owned' | 'leased';
  annualProduction: string;
  coordinates?: { lat: number; lng: number };
  waterRights?: {
    allocation: number;
    securityLevel: 'high' | 'medium' | 'low';
    tradableValue: number;
    annualUsage: number;
    carryoverCapacity: number;
  };
  cropForecast?: {
    currentSeason: {
      expectedYield: number;
      qualityGrade: string;
      harvestWindow: { start: string; end: string };
      marketPrice: number;
    };
    nextSeason: {
      plantedArea: number;
      expectedYield: number;
      projectedRevenue: number;
    };
    risks: string[];
    opportunities: string[];
  };
}

// Import the same data from CostaGroupValuations
const costaProperties: CostaProperty[] = [
  {
    id: 'costa-mushroom-bundoora',
    name: 'Bundoora Mushroom Farm',
    address: '2045 Plenty Road, Bundoora, VIC 3083',
    state: 'VIC',
    propertyType: 'mushroom',
    landArea: 15.5,
    operationalStatus: 'owned',
    annualProduction: '2.8M kg mushrooms',
    coordinates: { lat: -37.7136, lng: 145.0549 },
    waterRights: {
      allocation: 45,
      securityLevel: 'high',
      tradableValue: 2800,
      annualUsage: 42,
      carryoverCapacity: 15
    },
    cropForecast: {
      currentSeason: {
        expectedYield: 2850000,
        qualityGrade: 'premium',
        harvestWindow: { start: '2024-01-01', end: '2024-12-31' },
        marketPrice: 8.50
      },
      nextSeason: {
        plantedArea: 15.5,
        expectedYield: 2950000,
        projectedRevenue: 25075000
      },
      risks: ['Supply chain disruption', 'Labor shortage'],
      opportunities: ['Premium market expansion', 'Organic certification']
    }
  },
  {
    id: 'costa-mushroom-somerville',
    name: 'Somerville Mushroom Complex',
    address: '1520 Frankston-Dandenong Road, Somerville, VIC 3912',
    state: 'VIC',
    propertyType: 'mushroom',
    landArea: 28.3,
    operationalStatus: 'owned',
    annualProduction: '4.2M kg mushrooms',
    coordinates: { lat: -38.2167, lng: 145.1833 },
    waterRights: {
      allocation: 68,
      securityLevel: 'high',
      tradableValue: 2750,
      annualUsage: 65,
      carryoverCapacity: 20
    },
    cropForecast: {
      currentSeason: {
        expectedYield: 4350000,
        qualityGrade: 'premium',
        harvestWindow: { start: '2024-01-01', end: '2024-12-31' },
        marketPrice: 8.20
      },
      nextSeason: {
        plantedArea: 28.3,
        expectedYield: 4500000,
        projectedRevenue: 36900000
      },
      risks: ['Energy cost increases', 'Substrate supply'],
      opportunities: ['Export market growth', 'Value-added products']
    }
  },
  {
    id: 'costa-citrus-robinvale',
    name: 'Robinvale Citrus Orchards',
    address: 'Murray Valley Highway, Robinvale, VIC 3549',
    state: 'VIC',
    propertyType: 'citrus',
    landArea: 420.8,
    operationalStatus: 'owned',
    annualProduction: '12,500 tonnes citrus',
    coordinates: { lat: -34.5833, lng: 142.7833 },
    waterRights: {
      allocation: 2850,
      securityLevel: 'medium',
      tradableValue: 1950,
      annualUsage: 2750,
      carryoverCapacity: 570
    },
    cropForecast: {
      currentSeason: {
        expectedYield: 12800,
        qualityGrade: 'premium',
        harvestWindow: { start: '2024-05-01', end: '2024-09-30' },
        marketPrice: 2850
      },
      nextSeason: {
        plantedArea: 420.8,
        expectedYield: 13200,
        projectedRevenue: 37620000
      },
      risks: ['Drought conditions', 'Export market fluctuations'],
      opportunities: ['Premium export markets', 'Juice processing expansion']
    }
  }
];

const CostaGroupReports = () => {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

  const reportTypes = [
    {
      id: 'valuation',
      title: 'Property Valuation Report',
      description: 'Comprehensive valuation analysis including market value, rental value, and investment metrics',
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: 'water-rights',
      title: 'Water Rights Assessment',
      description: 'Detailed analysis of water allocations, trading values, and usage efficiency',
      icon: <Droplets className="h-5 w-5" />
    },
    {
      id: 'crop-forecast',
      title: 'Crop Forecast Analysis',
      description: 'Production forecasts, yield projections, and revenue analysis by crop type',
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      id: 'portfolio',
      title: 'Portfolio Summary Report',
      description: 'Executive summary of entire Costa Group property portfolio performance',
      icon: <FileText className="h-5 w-5" />
    }
  ];

  const generateReport = async (reportType: string) => {
    setGeneratingReport(reportType);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const reportName = reportTypes.find(r => r.id === reportType)?.title || 'Report';
      
      toast.success(`${reportName} generated successfully`, {
        description: 'Report has been saved to your downloads folder'
      });
      
    } catch (error) {
      toast.error('Failed to generate report', {
        description: 'Please try again later'
      });
    } finally {
      setGeneratingReport(null);
    }
  };

  const togglePropertySelection = (propertyId: string) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const selectAllProperties = () => {
    setSelectedProperties(costaProperties.map(p => p.id));
  };

  const clearSelection = () => {
    setSelectedProperties([]);
  };

  const getTotalValue = () => {
    const selectedProps = costaProperties.filter(p => selectedProperties.includes(p.id));
    return selectedProps.reduce((total, prop) => {
      // Simple valuation calculation
      const landValue = prop.landArea * 25000; // $25k per hectare base
      const productionMultiplier = prop.propertyType === 'mushroom' ? 2.5 : 1.8;
      return total + (landValue * productionMultiplier);
    }, 0);
  };

  const getTotalWaterRights = () => {
    const selectedProps = costaProperties.filter(p => selectedProperties.includes(p.id));
    return selectedProps.reduce((total, prop) => total + (prop.waterRights?.allocation || 0), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Costa Group Reports</h2>
          <p className="text-muted-foreground">
            Generate comprehensive reports for Costa Group properties
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {selectedProperties.length} properties selected
        </Badge>
      </div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="properties">Select Properties</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Property Selection</CardTitle>
                  <CardDescription>
                    Choose which properties to include in your reports
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={selectAllProperties}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearSelection}>
                    Clear All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {costaProperties.map((property) => (
                  <div
                    key={property.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedProperties.includes(property.id)
                        ? 'bg-primary/10 border-primary'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => togglePropertySelection(property.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 border-2 rounded ${
                          selectedProperties.includes(property.id)
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground'
                        }`} />
                        <div>
                          <h4 className="font-medium">{property.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {property.address}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {property.propertyType}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {property.landArea} ha
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedProperties.length > 0 && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Selection Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Properties: </span>
                      <span className="font-medium">{selectedProperties.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Est. Value: </span>
                      <span className="font-medium">${getTotalValue().toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Area: </span>
                      <span className="font-medium">
                        {costaProperties
                          .filter(p => selectedProperties.includes(p.id))
                          .reduce((total, p) => total + p.landArea, 0)
                          .toFixed(1)} ha
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Water Rights: </span>
                      <span className="font-medium">{getTotalWaterRights()} ML</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reportTypes.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {report.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => generateReport(report.id)}
                    disabled={selectedProperties.length === 0 || generatingReport === report.id}
                    className="w-full"
                  >
                    {generatingReport === report.id ? (
                      'Generating...'
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Generate Report
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedProperties.length === 0 && (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Properties Selected</h3>
              <p className="text-muted-foreground mb-4">
                Please select at least one property to generate reports
              </p>
              <Button variant="outline" onClick={() => {
                const tab = document.querySelector('[value="properties"]') as HTMLElement;
                tab?.click();
              }}>
                Select Properties
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostaGroupReports;