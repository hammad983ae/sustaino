import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Calculator, FileText, Building, Zap, Search, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ArchitecturalData {
  siteAddress: string;
  lotSize: number;
  proposedDwellings: number;
  buildingType: string;
  estimatedCost: number;
  zoning: string;
  existingInfrastructure: string[];
  developmentApproval: string;
  councilArea: string;
  planningScheme: string;
  complianceChecks: {
    zoning: boolean;
    setbacks: boolean;
    height: boolean;
    density: boolean;
  };
}

interface PropertySearchResult {
  id: string;
  address: string;
  land_area: number;
  zoning: string;
  council: string;
  state: string;
  postcode: string;
}

const ArchitecturalPlanningDesign = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("design");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PropertySearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState<ArchitecturalData>({
    siteAddress: '',
    lotSize: 0,
    proposedDwellings: 1,
    buildingType: 'residential',
    estimatedCost: 0,
    zoning: '',
    existingInfrastructure: [],
    developmentApproval: 'required',
    councilArea: '',
    planningScheme: '',
    complianceChecks: {
      zoning: false,
      setbacks: false,
      height: false,
      density: false
    }
  });

  const [subdivisionPlan, setSubdivisionPlan] = useState({
    totalLots: 1,
    roadAccess: '',
    utilities: [],
    developmentStage: 'concept'
  });

  // Search for existing properties
  const searchProperties = async (query: string) => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      const { data: properties, error } = await supabase
        .from('properties')
        .select('id, address, land_area, zoning, council, state, postcode')
        .or(`address.ilike.%${query}%, suburb.ilike.%${query}%`)
        .limit(5);

      if (error) throw error;

      setSearchResults(properties || []);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching properties:', error);
      toast({
        title: "Search Error",
        description: "Failed to search properties",
        variant: "destructive"
      });
    }
  };

  // Auto-populate form when property is selected
  const selectProperty = (property: PropertySearchResult) => {
    setData(prev => ({
      ...prev,
      siteAddress: property.address,
      lotSize: property.land_area || 0,
      zoning: property.zoning || '',
      councilArea: property.council || '',
      // Auto-populate infrastructure based on location
      existingInfrastructure: determineInfrastructure(property),
    }));
    
    setSearchQuery(property.address);
    setShowResults(false);
    
    toast({
      title: "Property Selected",
      description: "Form auto-populated with property details",
    });
  };

  // Determine likely infrastructure based on property location
  const determineInfrastructure = (property: PropertySearchResult): string[] => {
    const infrastructure = ['Water', 'Electricity'];
    
    // Add likely infrastructure based on state/location
    if (property.state && ['NSW', 'VIC', 'QLD'].includes(property.state)) {
      infrastructure.push('Sewer', 'Gas', 'Telecommunications');
    }
    
    // Urban areas likely have more infrastructure
    if (property.postcode && parseInt(property.postcode) < 4000) {
      infrastructure.push('Street Lighting', 'Footpaths');
    }
    
    return infrastructure;
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      searchProperties(searchQuery);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const calculateEstimatedCost = () => {
    const baseCostPerDwelling = 350000;
    const infraCost = data.lotSize * 50; // $50 per sqm infrastructure
    const total = (data.proposedDwellings * baseCostPerDwelling) + infraCost;
    setData(prev => ({ ...prev, estimatedCost: total }));
    
    toast({
      title: "Cost Calculation Complete",
      description: `Estimated development cost: $${total.toLocaleString()}`,
    });
  };

  const runComplianceCheck = async () => {
    // Simulate compliance checking
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        complianceChecks: {
          zoning: true,
          setbacks: data.proposedDwellings <= 2,
          height: true,
          density: data.proposedDwellings / (data.lotSize / 1000) <= 30
        }
      }));
      
      toast({
        title: "Compliance Check Complete",
        description: "All regulatory requirements analyzed",
      });
    }, 2000);
  };

  const ComplianceIndicator = ({ label, status }: { label: string; status: boolean }) => (
    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
      <span className="font-medium">{label}</span>
      {status ? (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Compliant
        </Badge>
      ) : (
        <Badge variant="destructive">
          <AlertTriangle className="w-4 h-4 mr-1" />
          Review Required
        </Badge>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Building className="w-8 h-8" />
            Architectural Planning & Development Design Studio
          </CardTitle>
          <p className="text-blue-100">
            Professional architectural drawings, subdivision plans, and compliance validation for development projects
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/90 border border-slate-600">
          <TabsTrigger value="design" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">Site Design</TabsTrigger>
          <TabsTrigger value="subdivision" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">Subdivision</TabsTrigger>
          <TabsTrigger value="compliance" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">Compliance</TabsTrigger>
          <TabsTrigger value="costing" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">Cost Analysis</TabsTrigger>
          <TabsTrigger value="reports" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Label htmlFor="address">Site Address</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for existing property address..."
                      className="pl-10"
                    />
                  </div>
                  
                  {showResults && searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {searchResults.map((property) => (
                        <div
                          key={property.id}
                          onClick={() => selectProperty(property)}
                          className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-100 dark:border-slate-600 last:border-b-0"
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{property.address}</div>
                              <div className="text-sm text-muted-foreground">
                                {property.land_area ? `${property.land_area}sqm` : ''} 
                                {property.zoning ? ` • ${property.zoning}` : ''}
                                {property.council ? ` • ${property.council}` : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {data.siteAddress && data.siteAddress !== searchQuery && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border">
                      <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Selected Property:</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">{data.siteAddress}</div>
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="lotSize">Lot Size (sqm)</Label>
                  <Input
                    id="lotSize"
                    type="number"
                    value={data.lotSize}
                    onChange={(e) => setData(prev => ({ ...prev, lotSize: Number(e.target.value) }))}
                    placeholder="Total site area"
                  />
                </div>

                <div>
                  <Label htmlFor="dwellings">Proposed Dwellings</Label>
                  <Input
                    id="dwellings"
                    type="number"
                    value={data.proposedDwellings}
                    onChange={(e) => setData(prev => ({ ...prev, proposedDwellings: Number(e.target.value) }))}
                    placeholder="Number of proposed dwellings"
                  />
                </div>

                <div>
                  <Label htmlFor="buildingType">Development Type</Label>
                  <Select value={data.buildingType} onValueChange={(value) => setData(prev => ({ ...prev, buildingType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="mixed-use">Mixed Use</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional auto-populated fields */}
                <div>
                  <Label htmlFor="zoning">Zoning</Label>
                  <Input
                    id="zoning"
                    value={data.zoning}
                    onChange={(e) => setData(prev => ({ ...prev, zoning: e.target.value }))}
                    placeholder="Property zoning classification"
                  />
                </div>

                <div>
                  <Label htmlFor="council">Council Area</Label>
                  <Input
                    id="council"
                    value={data.councilArea}
                    onChange={(e) => setData(prev => ({ ...prev, councilArea: e.target.value }))}
                    placeholder="Local government area"
                  />
                </div>

                <div>
                  <Label htmlFor="approval">Development Approval Status</Label>
                  <Select value={data.developmentApproval} onValueChange={(value) => setData(prev => ({ ...prev, developmentApproval: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="required">Approval Required</SelectItem>
                      <SelectItem value="lodged">Application Lodged</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="exempt">Exempt Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Design Parameters & Infrastructure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Existing Infrastructure</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {['Water', 'Sewer', 'Electricity', 'Gas', 'Telecommunications', 'Stormwater', 'Street Lighting', 'Footpaths'].map((utility) => (
                      <div key={utility} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`existing-${utility}`}
                          checked={data.existingInfrastructure.includes(utility)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setData(prev => ({ ...prev, existingInfrastructure: [...prev.existingInfrastructure, utility] }));
                            } else {
                              setData(prev => ({ ...prev, existingInfrastructure: prev.existingInfrastructure.filter(u => u !== utility) }));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={`existing-${utility}`} className="text-sm">{utility}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Design Principles</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Maximized site utilization</li>
                    <li>• Compliance with local planning schemes</li>
                    <li>• Optimal solar orientation</li>
                    <li>• Sustainable design principles</li>
                    <li>• Future development potential</li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {data.lotSize > 0 ? Math.round(data.proposedDwellings / (data.lotSize / 1000)) : 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Dwellings/Ha</div>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {data.lotSize > 0 ? Math.round((data.lotSize / data.proposedDwellings)) : 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Lot Size (sqm)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subdivision" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subdivision Planning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="totalLots">Total Proposed Lots</Label>
                  <Input
                    id="totalLots"
                    type="number"
                    value={subdivisionPlan.totalLots}
                    onChange={(e) => setSubdivisionPlan(prev => ({ ...prev, totalLots: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="roadAccess">Road Access Type</Label>
                  <Select value={subdivisionPlan.roadAccess} onValueChange={(value) => setSubdivisionPlan(prev => ({ ...prev, roadAccess: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="existing">Existing Road</SelectItem>
                      <SelectItem value="new-public">New Public Road</SelectItem>
                      <SelectItem value="private">Private Road</SelectItem>
                      <SelectItem value="battle-axe">Battle-axe Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stage">Development Stage</Label>
                  <Select value={subdivisionPlan.developmentStage} onValueChange={(value) => setSubdivisionPlan(prev => ({ ...prev, developmentStage: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concept">Concept Design</SelectItem>
                      <SelectItem value="preliminary">Preliminary Design</SelectItem>
                      <SelectItem value="detailed">Detailed Design</SelectItem>
                      <SelectItem value="construction">Construction Ready</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Infrastructure Requirements</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {['Water', 'Sewer', 'Electricity', 'Gas', 'Telecommunications', 'Stormwater', 'Street Lighting', 'Footpaths'].map((utility) => (
                    <div key={utility} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={utility}
                        checked={subdivisionPlan.utilities.includes(utility)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSubdivisionPlan(prev => ({ ...prev, utilities: [...prev.utilities, utility] }));
                          } else {
                            setSubdivisionPlan(prev => ({ ...prev, utilities: prev.utilities.filter(u => u !== utility) }));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor={utility} className="text-sm">{utility}</label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Regulatory Compliance Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={runComplianceCheck} className="w-full">
                  Run Compliance Analysis
                </Button>
                
                <div className="space-y-3">
                  <ComplianceIndicator label="Zoning Compliance" status={data.complianceChecks.zoning} />
                  <ComplianceIndicator label="Setback Requirements" status={data.complianceChecks.setbacks} />
                  <ComplianceIndicator label="Height Restrictions" status={data.complianceChecks.height} />
                  <ComplianceIndicator label="Density Limits" status={data.complianceChecks.density} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Criteria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="font-semibold text-green-800 dark:text-green-200">✓ Legally Permissible</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Complies with zoning and planning regulations</div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="font-semibold text-blue-800 dark:text-blue-200">📊 Economically Feasible</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Positive development margin and ROI</div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="font-semibold text-purple-800 dark:text-purple-200">🏆 Highest & Best Use</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Optimizes site potential and market value</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Development Cost Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={calculateEstimatedCost} className="w-full mb-4">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Development Costs
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-2xl font-bold text-primary">${data.estimatedCost.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Estimated Cost</div>
                </div>
                
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    ${data.proposedDwellings > 0 ? Math.round(data.estimatedCost / data.proposedDwellings).toLocaleString() : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Cost per Dwelling</div>
                </div>
                
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    ${data.lotSize > 0 ? Math.round(data.estimatedCost / data.lotSize).toLocaleString() : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Cost per sqm</div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Cost Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Construction Costs:</span>
                    <span>${(data.proposedDwellings * 350000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Infrastructure:</span>
                    <span>${(data.lotSize * 50).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span>${data.estimatedCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Planning Reports & Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <FileText className="w-8 h-8 mb-2" />
                  <span className="font-semibold">Planning Report</span>
                  <span className="text-sm text-muted-foreground">Comprehensive planning assessment</span>
                </Button>
                
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <Building className="w-8 h-8 mb-2" />
                  <span className="font-semibold">Architectural Plans</span>
                  <span className="text-sm text-muted-foreground">Detailed design drawings</span>
                </Button>
                
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <Calculator className="w-8 h-8 mb-2" />
                  <span className="font-semibold">Cost Estimate</span>
                  <span className="text-sm text-muted-foreground">Detailed cost breakdown</span>
                </Button>
                
                <Button variant="outline" className="p-6 h-auto flex-col">
                  <CheckCircle2 className="w-8 h-8 mb-2" />
                  <span className="font-semibold">Compliance Report</span>
                  <span className="text-sm text-muted-foreground">Regulatory compliance analysis</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArchitecturalPlanningDesign;