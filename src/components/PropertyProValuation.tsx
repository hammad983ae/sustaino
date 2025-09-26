import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  MapPin, 
  Home, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Camera,
  Building,
  Calendar,
  DollarSign
} from 'lucide-react';

interface PropertyProValuationData {
  // Property Details
  propertyAddress: string;
  realPropertyDescription: string;
  propertyInspections: string;
  siteDimensions: string;
  siteArea: string;
  zoning: string;
  currentUse: string;
  localGovernmentArea: string;
  
  // Building Details
  mainWalls: string;
  roof: string;
  carAccommodation: string;
  airConditioner: string;
  additions: string;
  otherFeatures: string;
  estimatedArea: string;
  
  // Valuation Details
  marketValue: string;
  valueDate: string;
  
  // Land Information
  propertyIdentification: string;
  zoningEffect: string;
  location: string;
  neighbourhood: string;
  siteDescription: string;
  services: string;
  
  // Dwelling Description
  style: string;
  mainWallsAndRoof: string;
  mainExteriorLining: string;
  flooring: string;
  windowFrames: string;
  accommodation: string;
  interiorLayout: string;
  plumbingAndServices: string;
  
  // Sales Evidence
  salesEvidence: Array<{
    address: string;
    saleDate: string;
    price: string;
    briefComments: string;
    inComparison: string;
  }>;
  
  // Risk Ratings
  riskRatings: {
    location: string;
    environmental: string;
    localEconomy: string;
    marketSegment: string;
  };
  
  // Assumptions & Limitations
  assumptions: string;
  
  // QA Liability
  qaLiability: string;
  
  // Photos
  photographs: Array<{
    id: string;
    description: string;
    imageUrl: string;
  }>;
}

export default function PropertyProValuation() {
  const [formData, setFormData] = useState<PropertyProValuationData>({
    propertyAddress: '',
    realPropertyDescription: '',
    propertyInspections: '',
    siteDimensions: '',
    siteArea: '',
    zoning: '',
    currentUse: '',
    localGovernmentArea: '',
    mainWalls: '',
    roof: '',
    carAccommodation: '',
    airConditioner: '',
    additions: '',
    otherFeatures: '',
    estimatedArea: '',
    marketValue: '',
    valueDate: '',
    propertyIdentification: '',
    zoningEffect: '',
    location: '',
    neighbourhood: '',
    siteDescription: '',
    services: '',
    style: '',
    mainWallsAndRoof: '',
    mainExteriorLining: '',
    flooring: '',
    windowFrames: '',
    accommodation: '',
    interiorLayout: '',
    plumbingAndServices: '',
    salesEvidence: [],
    riskRatings: {
      location: '',
      environmental: '',
      localEconomy: '',
      marketSegment: ''
    },
    assumptions: '',
    qaLiability: '',
    photographs: []
  });

  const [activeTab, setActiveTab] = useState('property-details');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRiskRatingChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      riskRatings: {
        ...prev.riskRatings,
        [field]: value
      }
    }));
  };

  const addSalesEvidence = () => {
    setFormData(prev => ({
      ...prev,
      salesEvidence: [
        ...prev.salesEvidence,
        {
          address: '',
          saleDate: '',
          price: '',
          briefComments: '',
          inComparison: ''
        }
      ]
    }));
  };

  const updateSalesEvidence = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      salesEvidence: prev.salesEvidence.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addPhotograph = () => {
    setFormData(prev => ({
      ...prev,
      photographs: [
        ...prev.photographs,
        {
          id: Date.now().toString(),
          description: '',
          imageUrl: ''
        }
      ]
    }));
  };

  const clearAllData = () => {
    setFormData({
      propertyAddress: '',
      realPropertyDescription: '',
      propertyInspections: '',
      siteDimensions: '',
      siteArea: '',
      zoning: '',
      currentUse: '',
      localGovernmentArea: '',
      mainWalls: '',
      roof: '',
      carAccommodation: '',
      airConditioner: '',
      additions: '',
      otherFeatures: '',
      estimatedArea: '',
      marketValue: '',
      valueDate: '',
      propertyIdentification: '',
      zoningEffect: '',
      location: '',
      neighbourhood: '',
      siteDescription: '',
      services: '',
      style: '',
      mainWallsAndRoof: '',
      mainExteriorLining: '',
      flooring: '',
      windowFrames: '',
      accommodation: '',
      interiorLayout: '',
      plumbingAndServices: '',
      salesEvidence: [],
      riskRatings: {
        location: '',
        environmental: '',
        localEconomy: '',
        marketSegment: ''
      },
      assumptions: '',
      qaLiability: '',
      photographs: []
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Property Pro Valuation</h1>
          <p className="text-muted-foreground">Professional Property Valuation Report Template</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearAllData}>
            <FileText className="h-4 w-4 mr-2" />
            Clear All Data
          </Button>
          <Button>
            <Building className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="property-details">Property Details</TabsTrigger>
          <TabsTrigger value="land-info">Land Information</TabsTrigger>
          <TabsTrigger value="dwelling">Dwelling Description</TabsTrigger>
          <TabsTrigger value="sales-evidence">Sales Evidence</TabsTrigger>
          <TabsTrigger value="risk-ratings">Risk Ratings</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        {/* Property Details Tab */}
        <TabsContent value="property-details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyAddress">Property Address</Label>
                  <Input
                    id="propertyAddress"
                    placeholder="Enter full property address"
                    value={formData.propertyAddress}
                    onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="valueDate">Valuation Date</Label>
                  <Input
                    id="valueDate"
                    type="date"
                    value={formData.valueDate}
                    onChange={(e) => handleInputChange('valueDate', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="realPropertyDescription">Real Property Description</Label>
                <Textarea
                  id="realPropertyDescription"
                  placeholder="Describe the property in detail"
                  value={formData.realPropertyDescription}
                  onChange={(e) => handleInputChange('realPropertyDescription', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="siteDimensions">Site Dimensions</Label>
                  <Input
                    id="siteDimensions"
                    placeholder="e.g., Irregular shaped lot"
                    value={formData.siteDimensions}
                    onChange={(e) => handleInputChange('siteDimensions', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="siteArea">Site Area</Label>
                  <Input
                    id="siteArea"
                    placeholder="e.g., 1508 sqm"
                    value={formData.siteArea}
                    onChange={(e) => handleInputChange('siteArea', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="currentUse">Current Use</Label>
                  <Select value={formData.currentUse} onValueChange={(value) => handleInputChange('currentUse', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select current use" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="mixed-use">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zoning">Zoning</Label>
                  <Input
                    id="zoning"
                    placeholder="e.g., LDR22"
                    value={formData.zoning}
                    onChange={(e) => handleInputChange('zoning', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="localGovernmentArea">Local Government Area</Label>
                  <Input
                    id="localGovernmentArea"
                    placeholder="e.g., Mildura Rural City Council"
                    value={formData.localGovernmentArea}
                    onChange={(e) => handleInputChange('localGovernmentArea', e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Valuation Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="marketValue">Market Value</Label>
                    <Input
                      id="marketValue"
                      placeholder="e.g., $1,000,000"
                      value={formData.marketValue}
                      onChange={(e) => handleInputChange('marketValue', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimatedArea">Estimated Cost</Label>
                    <Input
                      id="estimatedArea"
                      placeholder="Enter estimated cost"
                      value={formData.estimatedArea}
                      onChange={(e) => handleInputChange('estimatedArea', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Land Information Tab */}
        <TabsContent value="land-info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Land Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="propertyIdentification">Property Identification</Label>
                <Textarea
                  id="propertyIdentification"
                  placeholder="Aerial mapping and physical inspection details"
                  value={formData.propertyIdentification}
                  onChange={(e) => handleInputChange('propertyIdentification', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="zoningEffect">Zoning Effect</Label>
                <Textarea
                  id="zoningEffect"
                  placeholder="The existing use is a permissible use"
                  value={formData.zoningEffect}
                  onChange={(e) => handleInputChange('zoningEffect', e.target.value)}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Textarea
                  id="location"
                  placeholder="Within approximately X kilometres south west of the city"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="neighbourhood">Neighbourhood</Label>
                <Textarea
                  id="neighbourhood"
                  placeholder="The property is located within an established residential area"
                  value={formData.neighbourhood}
                  onChange={(e) => handleInputChange('neighbourhood', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="siteDescription">Site Description & Access</Label>
                <Textarea
                  id="siteDescription"
                  placeholder="Irregular shaped lot with access via street frontage"
                  value={formData.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="services">Services</Label>
                <Textarea
                  id="services"
                  placeholder="Electricity and Sew of solar, bottled gas, sewerage treatment septic, town and rural water are all connected"
                  value={formData.services}
                  onChange={(e) => handleInputChange('services', e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dwelling Description Tab */}
        <TabsContent value="dwelling" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Dwelling Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="style">Style</Label>
                  <Input
                    id="style"
                    placeholder="e.g., Double storey brick veneer dwelling"
                    value={formData.style}
                    onChange={(e) => handleInputChange('style', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="mainWallsAndRoof">Main Walls & Roof</Label>
                  <Input
                    id="mainWallsAndRoof"
                    placeholder="e.g., Rendered Brick Walls and Tiles"
                    value={formData.mainWallsAndRoof}
                    onChange={(e) => handleInputChange('mainWallsAndRoof', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mainExteriorLining">Main Exterior Lining</Label>
                  <Input
                    id="mainExteriorLining"
                    placeholder="e.g., Painted/sand"
                    value={formData.mainExteriorLining}
                    onChange={(e) => handleInputChange('mainExteriorLining', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="flooring">Flooring</Label>
                  <Input
                    id="flooring"
                    placeholder="e.g., Concrete slab and timber for second storey"
                    value={formData.flooring}
                    onChange={(e) => handleInputChange('flooring', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="windowFrames">Window Frames</Label>
                <Input
                  id="windowFrames"
                  placeholder="e.g., Aluminium"
                  value={formData.windowFrames}
                  onChange={(e) => handleInputChange('windowFrames', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="accommodation">Accommodation</Label>
                <Textarea
                  id="accommodation"
                  placeholder="Dwelling contains 3 Bedroom(s) And 2 Bathroom(s) Plus study/fourth bedroom, laundry, powdered room, walk in lobes, it living areas, double glazed windows & reverse cycle heating"
                  value={formData.accommodation}
                  onChange={(e) => handleInputChange('accommodation', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="interiorLayout">Interior Layout</Label>
                <Input
                  id="interiorLayout"
                  placeholder="e.g., Functional"
                  value={formData.interiorLayout}
                  onChange={(e) => handleInputChange('interiorLayout', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="plumbingAndServices">Plumbing and Services</Label>
                <Textarea
                  id="plumbingAndServices"
                  placeholder="Reverse cycle heating and cooling, split systems, high ceilings and classic style floor tiles throughout, evaporative cooling, integrated audio speakers"
                  value={formData.plumbingAndServices}
                  onChange={(e) => handleInputChange('plumbingAndServices', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Evidence Tab */}
        <TabsContent value="sales-evidence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Sales Evidence & Market Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Comparable Sales</h3>
                <Button onClick={addSalesEvidence} variant="outline">
                  Add Sales Evidence
                </Button>
              </div>

              {formData.salesEvidence.map((sale, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Address</Label>
                        <Input
                          placeholder="Sale property address"
                          value={sale.address}
                          onChange={(e) => updateSalesEvidence(index, 'address', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Sale Date</Label>
                        <Input
                          type="date"
                          value={sale.saleDate}
                          onChange={(e) => updateSalesEvidence(index, 'saleDate', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Price</Label>
                        <Input
                          placeholder="Sale price"
                          value={sale.price}
                          onChange={(e) => updateSalesEvidence(index, 'price', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Brief Comments</Label>
                        <Input
                          placeholder="Key features and details"
                          value={sale.briefComments}
                          onChange={(e) => updateSalesEvidence(index, 'briefComments', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>In Comparison to Subject</Label>
                      <Textarea
                        placeholder="Comparison analysis to subject property"
                        value={sale.inComparison}
                        onChange={(e) => updateSalesEvidence(index, 'inComparison', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

              {formData.salesEvidence.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No sales evidence added yet. Click "Add Sales Evidence" to begin.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Ratings Tab */}
        <TabsContent value="risk-ratings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Rating Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="locationRisk">Risk Rating Comments re Location and Neighbourhood</Label>
                  <Textarea
                    id="locationRisk"
                    placeholder="The property is located approximately 90 metres from a school drop off and pick up area"
                    value={formData.riskRatings.location}
                    onChange={(e) => handleRiskRatingChange('location', e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="environmentalRisk">Risk Rating Comments re Environmental Issues</Label>
                  <Textarea
                    id="environmentalRisk"
                    placeholder="The property is located approximately 90 metres from a main arterial road from Mildura to Merbein"
                    value={formData.riskRatings.environmental}
                    onChange={(e) => handleRiskRatingChange('environmental', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="localEconomyRisk">Risk Rating Comments re Local Economy Impact</Label>
                  <Textarea
                    id="localEconomyRisk"
                    placeholder="The market is being impacted by the uncertainty caused by the COVID-19 pandemic"
                    value={formData.riskRatings.localEconomy}
                    onChange={(e) => handleRiskRatingChange('localEconomy', e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="marketSegmentRisk">Risk Rating Comments re Market Segment</Label>
                  <Textarea
                    id="marketSegmentRisk"
                    placeholder="There has been limited sales of this property type in this location within the past 6 months"
                    value={formData.riskRatings.marketSegment}
                    onChange={(e) => handleRiskRatingChange('marketSegment', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              <Separator />

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Valuation Risk Assessments</h3>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>VRA1:</strong> Are there any adverse marketability issues that would require an extended selling period of more than 6 months?
                  </div>
                  <div className="text-sm">
                    <strong>VRA2:</strong> Are the existing improvements on the property incomplete, under construction or requiring essential repairs?
                  </div>
                  <div className="text-sm">
                    <strong>VRA3:</strong> Is the subject property critically affected by any Heritage, Location or Environmental Issue?
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="documentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Assumptions, Conditions & Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="assumptions">Assumptions, Conditions & Limitations</Label>
                <Textarea
                  id="assumptions"
                  placeholder="Liability Limited by a scheme approved under Professional Standards Legislation. Valuation Approach..."
                  value={formData.assumptions}
                  onChange={(e) => handleInputChange('assumptions', e.target.value)}
                  rows={6}
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="qaLiability">QA Copied Liability</Label>
                <Textarea
                  id="qaLiability"
                  placeholder="Liability Limited by a scheme approved under Professional Standards Legislation."
                  value={formData.qaLiability}
                  onChange={(e) => handleInputChange('qaLiability', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photographs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Add property photographs with descriptions</p>
                <Button onClick={addPhotograph} variant="outline">
                  Add Photograph
                </Button>
              </div>

              {formData.photographs.map((photo, index) => (
                <Card key={photo.id} className="border-l-4 border-l-green-500">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Description</Label>
                        <Input
                          placeholder="e.g., Rear, Front, Bathroom, Kitchen"
                          value={photo.description}
                          onChange={(e) => {
                            const newPhotos = [...formData.photographs];
                            newPhotos[index].description = e.target.value;
                            setFormData(prev => ({ ...prev, photographs: newPhotos }));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Image Upload</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload image</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {formData.photographs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No photographs added yet. Click "Add Photograph" to begin.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}