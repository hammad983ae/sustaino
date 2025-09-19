import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Globe, MapPin, Building, FileText, DollarSign, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  category: 'infrastructure' | 'planning' | 'valuation' | 'compliance' | 'construction' | 'market';
  icon: React.ReactNode;
  description: string;
  reliability: number;
  coverage: string[];
  enabled: boolean;
  apiEndpoint?: string;
  dataPoints: string[];
  updateFrequency: string;
}

const DATA_SOURCES: Record<string, DataSource[]> = {
  'NSW': [
    {
      id: 'nsw-planning-portal',
      name: 'NSW Planning Portal',
      category: 'planning',
      icon: <FileText className="h-4 w-4" />,
      description: 'Zoning, development applications, environmental constraints',
      reliability: 95,
      coverage: ['Sydney', 'Newcastle', 'Wollongong', 'Regional NSW'],
      enabled: true,
      apiEndpoint: 'https://www.planningportal.nsw.gov.au/api',
      dataPoints: ['Zoning', 'Development Controls', 'Heritage Overlays', 'Environmental Constraints'],
      updateFrequency: 'Daily'
    },
    {
      id: 'service-nsw',
      name: 'Service NSW',
      category: 'infrastructure',
      icon: <Building className="h-4 w-4" />,
      description: 'Transport, utilities, public services accessibility',
      reliability: 90,
      coverage: ['Statewide'],
      enabled: true,
      dataPoints: ['Public Transport', 'Schools', 'Hospitals', 'Utilities'],
      updateFrequency: 'Weekly'
    },
    {
      id: 'nsw-valuer-general',
      name: 'NSW Valuer General',
      category: 'valuation',
      icon: <DollarSign className="h-4 w-4" />,
      description: 'Land values, property sales, valuations',
      reliability: 98,
      coverage: ['Statewide'],
      enabled: true,
      dataPoints: ['Land Values', 'Sales History', 'Property Characteristics'],
      updateFrequency: 'Monthly'
    },
    {
      id: 'nsw-lrs',
      name: 'NSW Land Registry Services',
      category: 'compliance',
      icon: <FileText className="h-4 w-4" />,
      description: 'Title information, easements, covenants',
      reliability: 99,
      coverage: ['Statewide'],
      enabled: true,
      dataPoints: ['Title Details', 'Easements', 'Covenants', 'Ownership History'],
      updateFrequency: 'Real-time'
    }
  ],
  'VIC': [
    {
      id: 'vic-planning-schemes',
      name: 'VIC Planning Schemes Online',
      category: 'planning',
      icon: <FileText className="h-4 w-4" />,
      description: 'Planning zones, overlays, development requirements',
      reliability: 93,
      coverage: ['Melbourne', 'Geelong', 'Ballarat', 'Regional Victoria'],
      enabled: true,
      dataPoints: ['Zoning', 'Planning Overlays', 'Development Controls'],
      updateFrequency: 'Daily'
    },
    {
      id: 'vic-property-sales',
      name: 'Victorian Property Sales',
      category: 'valuation',
      icon: <DollarSign className="h-4 w-4" />,
      description: 'Property sales data and market trends',
      reliability: 96,
      coverage: ['Statewide'],
      enabled: true,
      dataPoints: ['Sales Prices', 'Property Features', 'Market Trends'],
      updateFrequency: 'Daily'
    },
    {
      id: 'land-vic',
      name: 'Land Victoria',
      category: 'compliance',
      icon: <MapPin className="h-4 w-4" />,
      description: 'Property boundaries, surveys, titles',
      reliability: 98,
      coverage: ['Statewide'],
      enabled: true,
      dataPoints: ['Boundary Information', 'Survey Plans', 'Title Data'],
      updateFrequency: 'Real-time'
    }
  ],
  'QLD': [
    {
      id: 'qld-planning-maps',
      name: 'Queensland Planning Maps',
      category: 'planning',
      icon: <MapPin className="h-4 w-4" />,
      description: 'Planning schemes, development constraints',
      reliability: 92,
      coverage: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Regional Queensland'],
      enabled: true,
      dataPoints: ['Planning Zones', 'Environmental Constraints', 'Infrastructure'],
      updateFrequency: 'Weekly'
    },
    {
      id: 'qld-dnrme',
      name: 'QLD DNRME',
      category: 'infrastructure',
      icon: <Building className="h-4 w-4" />,
      description: 'Natural resources, infrastructure, environmental data',
      reliability: 88,
      coverage: ['Statewide'],
      enabled: true,
      dataPoints: ['Natural Resources', 'Infrastructure', 'Environmental Data'],
      updateFrequency: 'Monthly'
    }
  ],
  'WA': [
    {
      id: 'wa-planning-portal',
      name: 'WA Planning Portal',
      category: 'planning',
      icon: <FileText className="h-4 w-4" />,
      description: 'Planning applications, zoning information',
      reliability: 89,
      coverage: ['Perth', 'Regional WA'],
      enabled: true,
      dataPoints: ['Zoning', 'Development Applications', 'Planning Policies'],
      updateFrequency: 'Daily'
    },
    {
      id: 'landgate-wa',
      name: 'Landgate WA',
      category: 'valuation',
      icon: <DollarSign className="h-4 w-4" />,
      description: 'Property values, sales, location data',
      reliability: 97,
      coverage: ['Statewide'],
      enabled: true,
      dataPoints: ['Property Values', 'Sales Data', 'Location Information'],
      updateFrequency: 'Weekly'
    }
  ],
  'SA': [
    {
      id: 'sa-planning-portal',
      name: 'SA Planning Portal',
      category: 'planning',
      icon: <FileText className="h-4 w-4" />,
      description: 'Planning zones, development plan amendments',
      reliability: 91,
      coverage: ['Adelaide', 'Regional SA'],
      enabled: true,
      dataPoints: ['Planning Zones', 'Development Plans', 'Policy Areas'],
      updateFrequency: 'Weekly'
    }
  ],
  'TAS': [
    {
      id: 'tas-planning-matters',
      name: 'TAS Planning Matters',
      category: 'planning',
      icon: <FileText className="h-4 w-4" />,
      description: 'Planning schemes, development applications',
      reliability: 87,
      coverage: ['Hobart', 'Launceston', 'Regional Tasmania'],
      enabled: true,
      dataPoints: ['Planning Schemes', 'Development Applications'],
      updateFrequency: 'Weekly'
    }
  ],
  'NT': [
    {
      id: 'nt-planning-land',
      name: 'NT Planning Land',
      category: 'planning',
      icon: <MapPin className="h-4 w-4" />,
      description: 'Territory planning schemes and land information',
      reliability: 85,
      coverage: ['Darwin', 'Alice Springs', 'Regional NT'],
      enabled: true,
      dataPoints: ['Planning Schemes', 'Land Information'],
      updateFrequency: 'Monthly'
    }
  ],
  'ACT': [
    {
      id: 'act-planning',
      name: 'ACT Planning',
      category: 'planning',
      icon: <FileText className="h-4 w-4" />,
      description: 'Territory plan, development applications',
      reliability: 94,
      coverage: ['Canberra'],
      enabled: true,
      dataPoints: ['Territory Plan', 'Development Applications', 'Land Use Policies'],
      updateFrequency: 'Daily'
    }
  ],
  'National': [
    {
      id: 'abs-statistics',
      name: 'Australian Bureau of Statistics',
      category: 'market',
      icon: <Globe className="h-4 w-4" />,
      description: 'Population, housing, economic indicators',
      reliability: 99,
      coverage: ['National'],
      enabled: true,
      dataPoints: ['Population Data', 'Housing Statistics', 'Economic Indicators'],
      updateFrequency: 'Quarterly'
    },
    {
      id: 'corelogic',
      name: 'CoreLogic',
      category: 'valuation',
      icon: <DollarSign className="h-4 w-4" />,
      description: 'Property data, market analytics, automated valuations',
      reliability: 96,
      coverage: ['National'],
      enabled: true,
      dataPoints: ['Property Values', 'Market Analytics', 'Risk Assessments'],
      updateFrequency: 'Daily'
    },
    {
      id: 'rawlinsons',
      name: 'Rawlinsons Construction Cost Guide',
      category: 'construction',
      icon: <Building className="h-4 w-4" />,
      description: 'Construction costs, building rates',
      reliability: 94,
      coverage: ['National'],
      enabled: true,
      dataPoints: ['Construction Costs', 'Building Rates', 'Material Costs'],
      updateFrequency: 'Quarterly'
    },
    {
      id: 'ato-integration',
      name: 'ATO Business Registry',
      category: 'compliance',
      icon: <FileText className="h-4 w-4" />,
      description: 'ABN lookup, GST registration status',
      reliability: 99,
      coverage: ['National'],
      enabled: true,
      dataPoints: ['ABN Details', 'GST Status', 'Business Information'],
      updateFrequency: 'Real-time'
    }
  ]
};

interface AutomatedDataSourcesProps {
  selectedState: string;
  onSourceToggle: (sourceId: string, enabled: boolean) => void;
  onDataFetch: (sources: DataSource[]) => void;
}

export const AutomatedDataSources: React.FC<AutomatedDataSourcesProps> = ({
  selectedState,
  onSourceToggle,
  onDataFetch
}) => {
  const [fetchProgress, setFetchProgress] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const stateData = DATA_SOURCES[selectedState] || [];
  const nationalData = DATA_SOURCES['National'] || [];
  const allSources = [...stateData, ...nationalData];
  const enabledSources = allSources.filter(source => source.enabled);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'infrastructure': return <Building className="h-4 w-4" />;
      case 'planning': return <FileText className="h-4 w-4" />;
      case 'valuation': return <DollarSign className="h-4 w-4" />;
      case 'compliance': return <CheckCircle className="h-4 w-4" />;
      case 'construction': return <Building className="h-4 w-4" />;
      case 'market': return <Globe className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'infrastructure': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-green-100 text-green-800';
      case 'valuation': return 'bg-purple-100 text-purple-800';
      case 'compliance': return 'bg-red-100 text-red-800';
      case 'construction': return 'bg-orange-100 text-orange-800';
      case 'market': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFetchData = async () => {
    setIsFetching(true);
    setFetchProgress(0);

    const totalSources = enabledSources.length;
    let completed = 0;

    for (const source of enabledSources) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      completed++;
      setFetchProgress((completed / totalSources) * 100);
    }

    onDataFetch(enabledSources);
    setIsFetching(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Automated Data Sources - {selectedState}</span>
          </CardTitle>
          <CardDescription>
            Configure and manage data sources for automated property information population
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium">
                {enabledSources.length} of {allSources.length} sources enabled
              </span>
            </div>
            <Button 
              onClick={handleFetchData}
              disabled={isFetching || enabledSources.length === 0}
              className="flex items-center space-x-2"
            >
              <Zap className="h-4 w-4" />
              <span>{isFetching ? 'Fetching...' : 'Fetch All Data'}</span>
            </Button>
          </div>

          {isFetching && (
            <div className="space-y-2">
              <Progress value={fetchProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Fetching data from {enabledSources.length} sources...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedState !== 'National' && stateData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedState} State Sources</CardTitle>
            <CardDescription>State-specific data sources and APIs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {stateData.map((source) => (
                <div key={source.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {source.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{source.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={getCategoryColor(source.category)}>
                          {source.category}
                        </Badge>
                        <Switch
                          checked={source.enabled}
                          onCheckedChange={(enabled) => onSourceToggle(source.id, enabled)}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{source.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Reliability: {source.reliability}%</span>
                      <span>Updates: {source.updateFrequency}</span>
                      <span>Coverage: {source.coverage.join(', ')}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-medium">Data Points: </span>
                      <span className="text-xs text-muted-foreground">
                        {source.dataPoints.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>National Sources</CardTitle>
          <CardDescription>Commonwealth and national data sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {nationalData.map((source) => (
              <div key={source.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {source.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{source.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(source.category)}>
                        {source.category}
                      </Badge>
                      <Switch
                        checked={source.enabled}
                        onCheckedChange={(enabled) => onSourceToggle(source.id, enabled)}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{source.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Reliability: {source.reliability}%</span>
                    <span>Updates: {source.updateFrequency}</span>
                    <span>Coverage: {source.coverage.join(', ')}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs font-medium">Data Points: </span>
                    <span className="text-xs text-muted-foreground">
                      {source.dataPoints.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedDataSources;