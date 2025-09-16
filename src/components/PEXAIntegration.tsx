import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Building, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ExternalLink,
  Database,
  Shield
} from 'lucide-react';

interface PEXAData {
  propertyId?: string;
  workspaceId?: string;
  settlementStatus?: string;
  propertyDetails?: any;
  documents?: any[];
}

export default function PEXAIntegration() {
  const [isLoading, setIsLoading] = useState(false);
  const [pexaData, setPexaData] = useState<PEXAData>({});
  const [searchAddress, setSearchAddress] = useState('');
  const [searchState, setSearchState] = useState('');
  const [searchPostcode, setSearchPostcode] = useState('');
  const { toast } = useToast();

  const callPEXAFunction = async (action: string, data: any) => {
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('pexa-integration', {
        body: { action, ...data }
      });

      if (error) throw error;

      if (!result.success) {
        throw new Error(result.error || 'PEXA integration failed');
      }

      return result.data;
    } catch (error) {
      console.error('PEXA Function Error:', error);
      toast({
        title: "PEXA Integration Error",
        description: error.message || 'Failed to communicate with PEXA',
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePropertySearch = async () => {
    if (!searchAddress || !searchState || !searchPostcode) {
      toast({
        title: "Missing Information",
        description: "Please provide address, state, and postcode",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await callPEXAFunction('search_property', {
        propertyData: {
          address: searchAddress,
          state: searchState,
          postcode: searchPostcode
        }
      });

      setPexaData(prev => ({
        ...prev,
        propertyDetails: result,
        propertyId: result.property_id
      }));

      toast({
        title: "Property Found",
        description: "Successfully retrieved property details from PEXA",
      });
    } catch (error) {
      // Error already handled in callPEXAFunction
    }
  };

  const handleCreateWorkspace = async () => {
    if (!pexaData.propertyId) {
      toast({
        title: "Property Required",
        description: "Please search for a property first",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await callPEXAFunction('create_workspace', {
        propertyData: pexaData.propertyDetails,
        settlementData: {
          transactionType: 'sale',
          settlementDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          participants: [
            {
              role: 'valuer',
              name: 'Property Valuation Professional'
            }
          ]
        }
      });

      setPexaData(prev => ({
        ...prev,
        workspaceId: result.workspace_id,
        settlementStatus: 'created'
      }));

      toast({
        title: "PEXA Workspace Created",
        description: `Workspace ID: ${result.workspace_id}`,
      });
    } catch (error) {
      // Error already handled in callPEXAFunction
    }
  };

  const handleSubmitValuation = async () => {
    if (!pexaData.workspaceId) {
      toast({
        title: "Workspace Required",
        description: "Please create a PEXA workspace first",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await callPEXAFunction('submit_valuation', {
        settlementData: {
          workspaceId: pexaData.workspaceId
        },
        propertyData: {
          valuationAmount: 850000, // This would come from your valuation
          valuationDate: new Date().toISOString(),
          valuerDetails: {
            name: 'Professional Valuer',
            license: 'VIC12345',
            firm: 'Sustaino Pro Valuations'
          },
          reportUrl: `${window.location.origin}/report` // Link to your generated report
        }
      });

      toast({
        title: "Valuation Submitted",
        description: "Valuation report successfully submitted to PEXA",
      });
    } catch (error) {
      // Error already handled in callPEXAFunction
    }
  };

  const handleSubmitESGData = async () => {
    if (!pexaData.propertyId) {
      toast({
        title: "Property Required",
        description: "Please search for a property first",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await callPEXAFunction('submit_esg_data', {
        propertyData: {
          propertyId: pexaData.propertyId,
          esgData: {
            energyRating: 7.5,
            waterRating: 6.0,
            environmentalScore: 85,
            sustainabilityFeatures: [
              'Solar panels',
              'Rainwater harvesting',
              'Energy efficient appliances'
            ],
            carbonFootprint: 12.5 // tonnes CO2/year
          }
        }
      });

      toast({
        title: "ESG Data Submitted",
        description: "Environmental data successfully submitted to PEXA",
      });
    } catch (error) {
      // Error already handled in callPEXAFunction
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'created':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-blue-600" />
          PEXA Integration
          <Badge variant="secondary">Electronic Settlement</Badge>
        </CardTitle>
        <p className="text-muted-foreground">
          Integrate with PEXA for electronic property settlements and enhanced data exchange
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search">Property Search</TabsTrigger>
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="valuation">Submit Valuation</TabsTrigger>
            <TabsTrigger value="esg">ESG Data</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Property Address</Label>
                <Input
                  id="address"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  placeholder="e.g., 123 Collins Street"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={searchState}
                    onChange={(e) => setSearchState(e.target.value)}
                    placeholder="VIC"
                  />
                </div>
                <div>
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input
                    id="postcode"
                    value={searchPostcode}
                    onChange={(e) => setSearchPostcode(e.target.value)}
                    placeholder="3000"
                  />
                </div>
              </div>
              <Button 
                onClick={handlePropertySearch} 
                disabled={isLoading}
                className="w-full"
              >
                <Database className="h-4 w-4 mr-2" />
                Search PEXA Property Database
              </Button>

              {pexaData.propertyDetails && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Property Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Property ID:</strong> {pexaData.propertyId}</p>
                      <p><strong>Title:</strong> {pexaData.propertyDetails.title || 'Available in PEXA'}</p>
                      <p><strong>Zone:</strong> {pexaData.propertyDetails.zoning || 'Residential'}</p>
                      <p><strong>Status:</strong> <Badge variant="outline">Verified</Badge></p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="workspace" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(pexaData.settlementStatus)}
                  <div>
                    <h3 className="font-medium">PEXA Workspace</h3>
                    <p className="text-sm text-muted-foreground">
                      {pexaData.workspaceId ? `ID: ${pexaData.workspaceId}` : 'Not created'}
                    </p>
                  </div>
                </div>
                <Badge variant={pexaData.workspaceId ? "default" : "secondary"}>
                  {pexaData.settlementStatus || 'Pending'}
                </Badge>
              </div>

              <Button 
                onClick={handleCreateWorkspace} 
                disabled={isLoading || !pexaData.propertyId}
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Create PEXA Workspace
              </Button>

              {pexaData.workspaceId && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-green-800">Workspace Active</h4>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Your PEXA workspace is ready for electronic settlement processes.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in PEXA
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="valuation" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Valuation Submission</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Submit your completed valuation report to the PEXA workspace for settlement processing.
                </p>
                
                <div className="space-y-2 text-sm">
                  <p><strong>Valuation Amount:</strong> $850,000</p>
                  <p><strong>Valuation Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Valuer:</strong> Professional Valuer (VIC12345)</p>
                  <p><strong>Report Status:</strong> <Badge variant="outline">Ready for Submission</Badge></p>
                </div>
              </div>

              <Button 
                onClick={handleSubmitValuation} 
                disabled={isLoading || !pexaData.workspaceId}
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Submit Valuation to PEXA
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="esg" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">ESG Enhancement Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Submit environmental and sustainability data to enhance property records in PEXA.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Energy Rating:</strong> 7.5/10</p>
                    <p><strong>Water Rating:</strong> 6.0/10</p>
                  </div>
                  <div>
                    <p><strong>Environmental Score:</strong> 85/100</p>
                    <p><strong>Carbon Footprint:</strong> 12.5t CO₂/year</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm"><strong>Sustainability Features:</strong></p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">Solar Panels</Badge>
                    <Badge variant="secondary" className="text-xs">Rainwater Harvesting</Badge>
                    <Badge variant="secondary" className="text-xs">Energy Efficient</Badge>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSubmitESGData} 
                disabled={isLoading || !pexaData.propertyId}
                className="w-full"
              >
                <Shield className="h-4 w-4 mr-2" />
                Submit ESG Data to PEXA
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}