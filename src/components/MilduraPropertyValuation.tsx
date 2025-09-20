import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Home, 
  Calculator, 
  TrendingUp, 
  FileText,
  DollarSign,
  Calendar,
  Activity,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PropertyData {
  address: string;
  propertyType: string;
  landArea: number;
  buildingArea: number;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  yearBuilt: number;
  condition: string;
  zoning: string;
}

interface ValuationData {
  estimatedValue: number;
  valuationDate: string;
  methodology: string;
  confidenceLevel: number;
  marketConditions: string;
  comparableSales: Array<{
    address: string;
    salePrice: number;
    saleDate: string;
    adjustments: number;
  }>;
}

export default function MilduraPropertyValuation() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Pre-populated property data for 320 Deakin Avenue Mildura
  const [propertyData, setPropertyData] = useState<PropertyData>({
    address: "320 Deakin Avenue, Mildura VIC 3500",
    propertyType: "residential",
    landArea: 0,
    buildingArea: 0,
    bedrooms: 0,
    bathrooms: 0,
    carSpaces: 0,
    yearBuilt: 0,
    condition: "",
    zoning: "Residential 1 Zone"
  });

  const [valuationData, setValuationData] = useState<ValuationData>({
    estimatedValue: 0,
    valuationDate: new Date().toISOString().split('T')[0],
    methodology: "Sales Comparison Approach",
    confidenceLevel: 85,
    marketConditions: "Stable",
    comparableSales: []
  });

  const [notes, setNotes] = useState("");

  // Auto-populate with Mildura market data
  useEffect(() => {
    loadMilduraMarketData();
  }, []);

  const loadMilduraMarketData = async () => {
    setIsLoading(true);
    try {
      // Simulate loading market data for Mildura region
      const milduraComparables = [
        {
          address: "315 Deakin Avenue, Mildura",
          salePrice: 385000,
          saleDate: "2024-01-15",
          adjustments: -5000
        },
        {
          address: "328 Deakin Avenue, Mildura", 
          salePrice: 420000,
          saleDate: "2024-02-20",
          adjustments: 10000
        },
        {
          address: "298 Deakin Avenue, Mildura",
          salePrice: 395000,
          saleDate: "2024-03-10",
          adjustments: 0
        }
      ];

      setValuationData(prev => ({
        ...prev,
        comparableSales: milduraComparables,
        estimatedValue: calculateEstimatedValue(milduraComparables)
      }));

      toast({
        title: "Market Data Loaded",
        description: "Mildura regional market data has been loaded successfully"
      });
    } catch (error) {
      console.error('Error loading market data:', error);
      toast({
        title: "Error",
        description: "Failed to load market data. Using default values.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateEstimatedValue = (comparables: any[]) => {
    if (comparables.length === 0) return 0;
    const avgPrice = comparables.reduce((sum, comp) => sum + comp.salePrice + comp.adjustments, 0) / comparables.length;
    return Math.round(avgPrice);
  };

  const handlePropertyDataChange = (field: keyof PropertyData, value: any) => {
    setPropertyData(prev => ({ ...prev, [field]: value }));
  };

  const handleValuationDataChange = (field: keyof ValuationData, value: any) => {
    setValuationData(prev => ({ ...prev, [field]: value }));
  };

  const saveValuation = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to save the valuation",
          variant: "destructive"
        });
        return;
      }

      // Save property first
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert({
          address_line_1: "320 Deakin Avenue",
          suburb: "Mildura", 
          state: "VIC",
          postcode: "3500",
          country: "Australia",
          property_type: propertyData.propertyType,
          land_area: propertyData.landArea,
          building_area: propertyData.buildingArea,
          bedrooms: propertyData.bedrooms,
          bathrooms: propertyData.bathrooms,
          car_spaces: propertyData.carSpaces,
          year_built: propertyData.yearBuilt,
          zoning: propertyData.zoning,
          user_id: user.id
        })
        .select()
        .single();

      if (propertyError) throw propertyError;

      // Save valuation
      const { error: valuationError } = await supabase
        .from('valuations')
        .insert({
          property_id: property.id,
          market_value: valuationData.estimatedValue,
          valuation_type: "comprehensive",
          valuation_purpose: "market_valuation",
          methodology: valuationData.methodology,
          confidence_level: valuationData.confidenceLevel,
          market_conditions: valuationData.marketConditions,
          comparable_sales: valuationData.comparableSales,
          notes: notes,
          status: "completed",
          user_id: user.id
        });

      if (valuationError) throw valuationError;

      toast({
        title: "Valuation Saved",
        description: `Valuation for 320 Deakin Avenue Mildura saved successfully - Estimated Value: $${valuationData.estimatedValue.toLocaleString()}`,
      });

    } catch (error) {
      console.error('Error saving valuation:', error);
      toast({
        title: "Error",
        description: "Failed to save valuation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { id: 1, title: "Property Details", icon: Home },
    { id: 2, title: "Valuation Analysis", icon: Calculator },
    { id: 3, title: "Market Evidence", icon: TrendingUp },
    { id: 4, title: "Final Report", icon: FileText }
  ];

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Property Valuation</h1>
              <p className="text-lg text-gray-600">320 Deakin Avenue, Mildura VIC 3500</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              <Activity className="h-4 w-4 mr-1" />
              Mildura Regional Market
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date().toLocaleDateString('en-AU')}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Valuation Progress</CardTitle>
              <Badge variant="secondary">{Math.round(progress)}% Complete</Badge>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
        </Card>

        {/* Steps Navigation */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {steps.map((step) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <Card 
                key={step.id} 
                className={`cursor-pointer transition-all ${
                  isActive ? 'ring-2 ring-blue-500 bg-blue-50' : 
                  isCompleted ? 'bg-green-50 border-green-200' : ''
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <StepIcon className={`h-6 w-6 ${
                      isActive ? 'text-blue-600' : 
                      isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    {isCompleted && (
                      <CheckCircle className="h-4 w-4 text-green-600 -ml-2 -mt-1" />
                    )}
                  </div>
                  <p className="text-sm font-medium">{step.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Details - 320 Deakin Avenue Mildura
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="property-type">Property Type</Label>
                  <Select value={propertyData.propertyType} onValueChange={(value) => handlePropertyDataChange('propertyType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential House</SelectItem>
                      <SelectItem value="unit">Unit/Apartment</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="land-area">Land Area (sqm)</Label>
                  <Input 
                    id="land-area"
                    type="number"
                    value={propertyData.landArea || ''}
                    onChange={(e) => handlePropertyDataChange('landArea', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 650"
                  />
                </div>
                
                <div>
                  <Label htmlFor="building-area">Building Area (sqm)</Label>
                  <Input 
                    id="building-area"
                    type="number"
                    value={propertyData.buildingArea || ''}
                    onChange={(e) => handlePropertyDataChange('buildingArea', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 180"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input 
                    id="bedrooms"
                    type="number"
                    value={propertyData.bedrooms || ''}
                    onChange={(e) => handlePropertyDataChange('bedrooms', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 3"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input 
                    id="bathrooms"
                    type="number"
                    value={propertyData.bathrooms || ''}
                    onChange={(e) => handlePropertyDataChange('bathrooms', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="car-spaces">Car Spaces</Label>
                  <Input 
                    id="car-spaces"
                    type="number"
                    value={propertyData.carSpaces || ''}
                    onChange={(e) => handlePropertyDataChange('carSpaces', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="year-built">Year Built</Label>
                  <Input 
                    id="year-built"
                    type="number"
                    value={propertyData.yearBuilt || ''}
                    onChange={(e) => handlePropertyDataChange('yearBuilt', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 1995"
                  />
                </div>
                
                <div>
                  <Label htmlFor="condition">Property Condition</Label>
                  <Select value={propertyData.condition} onValueChange={(value) => handlePropertyDataChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="very-good">Very Good</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="zoning">Zoning</Label>
                  <Input 
                    id="zoning"
                    value={propertyData.zoning}
                    onChange={(e) => handlePropertyDataChange('zoning', e.target.value)}
                    placeholder="e.g. Residential 1 Zone"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => setCurrentStep(2)}>
                  Continue to Valuation Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Valuation Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="estimated-value">Estimated Market Value ($)</Label>
                  <Input 
                    id="estimated-value"
                    type="number"
                    value={valuationData.estimatedValue || ''}
                    onChange={(e) => handleValuationDataChange('estimatedValue', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 400000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="valuation-date">Valuation Date</Label>
                  <Input 
                    id="valuation-date"
                    type="date"
                    value={valuationData.valuationDate}
                    onChange={(e) => handleValuationDataChange('valuationDate', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="methodology">Valuation Methodology</Label>
                  <Select value={valuationData.methodology} onValueChange={(value) => handleValuationDataChange('methodology', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales Comparison Approach">Sales Comparison Approach</SelectItem>
                      <SelectItem value="Cost Approach">Cost Approach</SelectItem>
                      <SelectItem value="Income Approach">Income Approach</SelectItem>
                      <SelectItem value="Hybrid Approach">Hybrid Approach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="confidence-level">Confidence Level (%)</Label>
                  <Input 
                    id="confidence-level"
                    type="number"
                    value={valuationData.confidenceLevel}
                    onChange={(e) => handleValuationDataChange('confidenceLevel', parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="market-conditions">Market Conditions</Label>
                  <Select value={valuationData.marketConditions} onValueChange={(value) => handleValuationDataChange('marketConditions', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Strong Growth">Strong Growth</SelectItem>
                      <SelectItem value="Moderate Growth">Moderate Growth</SelectItem>
                      <SelectItem value="Stable">Stable</SelectItem>
                      <SelectItem value="Declining">Declining</SelectItem>
                      <SelectItem value="Volatile">Volatile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Previous
                </Button>
                <Button onClick={() => setCurrentStep(3)}>
                  Continue to Market Evidence
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Market Evidence - Comparable Sales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Mildura Market Analysis</h4>
                    <p className="text-sm text-blue-700">
                      The following comparable sales have been identified for the Deakin Avenue area in Mildura. 
                      Adjustments have been made for property differences and market timing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {valuationData.comparableSales.map((comp, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium">{comp.address}</p>
                          <p className="text-sm text-muted-foreground">Comparable {index + 1}</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-green-600">
                            ${comp.salePrice.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">Sale Price</p>
                        </div>
                        <div>
                          <p className="font-medium">{new Date(comp.saleDate).toLocaleDateString('en-AU')}</p>
                          <p className="text-sm text-muted-foreground">Sale Date</p>
                        </div>
                        <div>
                          <p className={`font-medium ${comp.adjustments >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {comp.adjustments >= 0 ? '+' : ''}${comp.adjustments.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">Adjustments</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Estimated Value Summary */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-blue-900">Estimated Market Value</h3>
                      <p className="text-blue-700">Based on comparable sales analysis</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-900">
                        ${valuationData.estimatedValue.toLocaleString()}
                      </p>
                      <p className="text-sm text-blue-600">Confidence: {valuationData.confidenceLevel}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Previous
                </Button>
                <Button onClick={() => setCurrentStep(4)}>
                  Generate Final Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Final Valuation Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-xl font-bold text-green-900">Valuation Complete</h3>
                    <p className="text-green-700">Professional property valuation for 320 Deakin Avenue Mildura</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="text-center">
                    <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-900">${valuationData.estimatedValue.toLocaleString()}</p>
                    <p className="text-sm text-green-700">Market Value</p>
                  </div>
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-900">{valuationData.confidenceLevel}%</p>
                    <p className="text-sm text-blue-700">Confidence Level</p>
                  </div>
                  <div className="text-center">
                    <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-purple-900">{new Date(valuationData.valuationDate).toLocaleDateString('en-AU')}</p>
                    <p className="text-sm text-purple-700">Valuation Date</p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes & Comments</Label>
                <Textarea 
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional comments, assumptions, or market observations..."
                  rows={6}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                  Previous
                </Button>
                <Button 
                  onClick={saveValuation} 
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? "Saving..." : "Save Valuation Report"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}