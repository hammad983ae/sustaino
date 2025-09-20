import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MapPin, Calculator, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommercialComparable {
  id: string;
  address: string;
  saleDate: string;
  salePrice: number;
  salePriceAdjustment: 'increase' | 'decrease' | 'same';
  salePricePercentage: number;
  incentivesValue: number;
  incentivesApplicable: boolean;
  saleSettled: boolean;
  settlementMonths: number;
  localPurchaser: 'yes' | 'no' | 'unknown';
  marketingPeriodMonths: number;
  buildingArea: number;
  buildingAreaUnit: string;
  buildingAreaAdjustment: number;
  landArea: number;
  landAreaUnit: string;
  landAreaAdjustment: number;
  depreciationAdjustment: number;
  externalImprovements: number;
  grossRent: number;
  outgoings: number;
  netRent: number;
  netPassingYield: number;
  locationRating: number;
  positionRating: 'inferior' | 'superior' | 'same';
  positionValue: number;
  zoning: string;
  zoningAdjustment: number;
  footTraffic: number;
  comparisonSummary: string;
  esgFactors: boolean;
  esgAdjustment: number;
}

export default function EnhancedSalesEvidenceCommercial() {
  const [comparables, setComparables] = useState<CommercialComparable[]>([]);
  const [selectedComparable, setSelectedComparable] = useState<string>('');
  
  const addComparable = () => {
    const newComparable: CommercialComparable = {
      id: Date.now().toString(),
      address: '',
      saleDate: '',
      salePrice: 0,
      salePriceAdjustment: 'same',
      salePricePercentage: 0,
      incentivesValue: 0,
      incentivesApplicable: false,
      saleSettled: true,
      settlementMonths: 0,
      localPurchaser: 'unknown',
      marketingPeriodMonths: 0,
      buildingArea: 0,
      buildingAreaUnit: 'sqm',
      buildingAreaAdjustment: 0,
      landArea: 0,
      landAreaUnit: 'sqm',
      landAreaAdjustment: 0,
      depreciationAdjustment: 0,
      externalImprovements: 5,
      grossRent: 0,
      outgoings: 0,
      netRent: 0,
      netPassingYield: 0,
      locationRating: 0,
      positionRating: 'same',
      positionValue: 0,
      zoning: '',
      zoningAdjustment: 0,
      footTraffic: 0,
      comparisonSummary: '',
      esgFactors: false,
      esgAdjustment: 0
    };
    setComparables([...comparables, newComparable]);
    setSelectedComparable(newComparable.id);
  };

  const updateComparable = (id: string, field: keyof CommercialComparable, value: any) => {
    setComparables(prev => prev.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };

  const calculateTotalAdjustment = (comparable: CommercialComparable) => {
    let totalAdjustment = 0;
    
    totalAdjustment += comparable.salePricePercentage;
    totalAdjustment += comparable.buildingAreaAdjustment;
    totalAdjustment += comparable.landAreaAdjustment;
    totalAdjustment += comparable.depreciationAdjustment;
    
    const externalAdjustment = (comparable.externalImprovements - 5) * 2;
    totalAdjustment += externalAdjustment;
    
    totalAdjustment += comparable.locationRating;
    
    if (comparable.positionRating === 'superior') {
      totalAdjustment += (comparable.positionValue / comparable.salePrice) * 100;
    } else if (comparable.positionRating === 'inferior') {
      totalAdjustment -= (comparable.positionValue / comparable.salePrice) * 100;
    }
    
    totalAdjustment += comparable.zoningAdjustment;
    totalAdjustment += comparable.esgAdjustment;
    
    return totalAdjustment;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAdjustedSalePrice = (comparable: CommercialComparable) => {
    const totalAdjustment = calculateTotalAdjustment(comparable);
    return comparable.salePrice * (1 + totalAdjustment / 100);
  };

  const shouldHaveFirmerYield = (comparable: CommercialComparable, subjectBuildingArea: number, subjectRent: number) => {
    const comparableRentRate = comparable.buildingArea > 0 ? comparable.grossRent / comparable.buildingArea : 0;
    const subjectRentRate = subjectBuildingArea > 0 ? subjectRent / subjectBuildingArea : 0;
    
    return comparableRentRate > subjectRentRate;
  };

  const currentComparable = comparables.find(c => c.id === selectedComparable);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Enhanced Commercial Sales Evidence</h3>
            <div className="flex gap-2">
              <Button onClick={addComparable} variant="outline" size="sm">
                Add Comparable
              </Button>
              <Select value={selectedComparable} onValueChange={setSelectedComparable}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Comparable" />
                </SelectTrigger>
                <SelectContent>
                  {comparables.map((comp, index) => (
                    <SelectItem key={comp.id} value={comp.id}>
                      Sale {index + 1}: {comp.address || 'New Comparable'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {comparables.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No commercial sales evidence added yet. Click "Add Comparable" to begin.</p>
            </div>
          )}

          {currentComparable && (
            <div className="space-y-6">
              {/* Property Address */}
              <div className="grid grid-cols-1 gap-4">
                <Label className="font-medium">Property Address</Label>
                <Input 
                  value={currentComparable.address}
                  onChange={(e) => updateComparable(currentComparable.id, 'address', e.target.value)}
                  placeholder="Property Address: Eg. 101 King Avenue Middle Park VIC 3206"
                  className="bg-primary/5 border-primary"
                />
              </div>

              {/* Image Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center bg-muted/20">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Upload className="h-8 w-8 text-muted-foreground/40" />
                    <div>
                      <Button variant="outline" size="sm">Upload Image/Map</Button>
                      <p className="text-sm text-muted-foreground mt-2">Property photo or location map</p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/10">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Map will be auto-populated from PAF data</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Commercial Attributes */}
              <div className="space-y-4">
                <h4 className="font-semibold text-base">Commercial Comparison Analysis</h4>
                
                {/* Sale Date Analysis */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Sale Date</Label>
                  <Input 
                    type="date"
                    value={currentComparable.saleDate}
                    onChange={(e) => updateComparable(currentComparable.id, 'saleDate', e.target.value)}
                    className="text-sm"
                  />
                  <Select value={currentComparable.salePriceAdjustment} onValueChange={(value: 'increase' | 'decrease' | 'same') => updateComparable(currentComparable.id, 'salePriceAdjustment', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="increase">Increase</SelectItem>
                      <SelectItem value="same">Same</SelectItem>
                      <SelectItem value="decrease">Decrease</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number"
                      step="0.1"
                      value={currentComparable.salePricePercentage}
                      onChange={(e) => updateComparable(currentComparable.id, 'salePricePercentage', parseFloat(e.target.value) || 0)}
                      placeholder="% change"
                      className="text-sm"
                    />
                    <span className="text-sm">%</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Market movement since sale
                  </div>
                </div>

                {/* Sale Price */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4 bg-muted/5">
                  <Label className="font-medium">Sale Price</Label>
                  <Input 
                    type="number"
                    value={currentComparable.salePrice}
                    onChange={(e) => updateComparable(currentComparable.id, 'salePrice', parseFloat(e.target.value) || 0)}
                    placeholder="Sale price"
                    className="text-sm"
                  />
                  <Badge variant="secondary">Not Applicable</Badge>
                  <div className="text-right font-medium">
                    {formatCurrency(currentComparable.salePrice)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Base sale price
                  </div>
                </div>

                {/* Building Area with measurement options */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Building Area</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="number"
                      value={currentComparable.buildingArea}
                      onChange={(e) => updateComparable(currentComparable.id, 'buildingArea', parseFloat(e.target.value) || 0)}
                      placeholder="Area"
                      className="text-sm"
                    />
                    <Select value={currentComparable.buildingAreaUnit} onValueChange={(value) => updateComparable(currentComparable.id, 'buildingAreaUnit', value)}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sqm">sqm</SelectItem>
                        <SelectItem value="sqft">sqft</SelectItem>
                        <SelectItem value="gla">GLA</SelectItem>
                        <SelectItem value="nla">NLA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input 
                    type="number"
                    step="0.1"
                    value={currentComparable.buildingAreaAdjustment}
                    onChange={(e) => updateComparable(currentComparable.id, 'buildingAreaAdjustment', parseFloat(e.target.value) || 0)}
                    placeholder="% adjustment"
                    className="text-sm"
                  />
                  <div className="text-right font-medium">
                    {currentComparable.buildingAreaAdjustment > 0 ? '+' : ''}{currentComparable.buildingAreaAdjustment}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Building area adjustment per {currentComparable.buildingAreaUnit}
                  </div>
                </div>

                {/* Land Area */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Land Area</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="number"
                      value={currentComparable.landArea}
                      onChange={(e) => updateComparable(currentComparable.id, 'landArea', parseFloat(e.target.value) || 0)}
                      placeholder="Area"
                      className="text-sm"
                    />
                    <Select value={currentComparable.landAreaUnit} onValueChange={(value) => updateComparable(currentComparable.id, 'landAreaUnit', value)}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sqm">sqm</SelectItem>
                        <SelectItem value="hectares">hectares</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input 
                    type="number"
                    step="0.1"
                    value={currentComparable.landAreaAdjustment}
                    onChange={(e) => updateComparable(currentComparable.id, 'landAreaAdjustment', parseFloat(e.target.value) || 0)}
                    placeholder="% adjustment"
                    className="text-sm"
                  />
                  <div className="text-right font-medium">
                    {currentComparable.landAreaAdjustment > 0 ? '+' : ''}{currentComparable.landAreaAdjustment}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Land value component adjustment
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Location</Label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={currentComparable.locationRating}
                    onChange={(e) => updateComparable(currentComparable.id, 'locationRating', parseFloat(e.target.value) || 0)}
                    placeholder="% adjustment"
                    className="text-sm"
                  />
                  <Badge variant="outline">Market Average</Badge>
                  <div className="text-right font-medium">
                    {currentComparable.locationRating > 0 ? '+' : ''}{currentComparable.locationRating}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    % adjustment between average price for asset type in location
                  </div>
                </div>

                {/* Position */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Position</Label>
                  <Select value={currentComparable.positionRating} onValueChange={(value: 'inferior' | 'superior' | 'same') => updateComparable(currentComparable.id, 'positionRating', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inferior">Inferior</SelectItem>
                      <SelectItem value="same">Same</SelectItem>
                      <SelectItem value="superior">Superior</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    type="number"
                    value={currentComparable.positionValue}
                    onChange={(e) => updateComparable(currentComparable.id, 'positionValue', parseFloat(e.target.value) || 0)}
                    placeholder="$ value"
                    className="text-sm"
                  />
                  <div className="text-right font-medium">
                    {formatCurrency(currentComparable.positionValue)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Position advantage/disadvantage (e.g., GP clinic among complementary services vs standalone)
                  </div>
                </div>

                {/* Zoning */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Zoning</Label>
                  <Input 
                    value={currentComparable.zoning}
                    onChange={(e) => updateComparable(currentComparable.id, 'zoning', e.target.value)}
                    placeholder="Zoning classification"
                    className="text-sm"
                  />
                  <Input 
                    type="number"
                    step="0.1"
                    value={currentComparable.zoningAdjustment}
                    onChange={(e) => updateComparable(currentComparable.id, 'zoningAdjustment', parseFloat(e.target.value) || 0)}
                    placeholder="% adjustment"
                    className="text-sm"
                  />
                  <div className="text-right font-medium">
                    {currentComparable.zoningAdjustment > 0 ? '+' : ''}{currentComparable.zoningAdjustment}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Zoning benefit/restriction
                  </div>
                </div>

                {/* Foot Traffic */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Foot Traffic</Label>
                  <Input 
                    type="number"
                    value={currentComparable.footTraffic}
                    onChange={(e) => updateComparable(currentComparable.id, 'footTraffic', parseFloat(e.target.value) || 0)}
                    placeholder="Daily count"
                    className="text-sm"
                  />
                  <Badge variant="outline">Pedestrian Count</Badge>
                  <div className="text-sm">
                    {currentComparable.footTraffic.toLocaleString()} pedestrians/day
                  </div>
                  <div className="text-sm text-muted-foreground">
                    For retail and office properties
                  </div>
                </div>

                {/* ESG Factors */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">ESG Factors</Label>
                  <Switch 
                    checked={currentComparable.esgFactors}
                    onCheckedChange={(checked) => updateComparable(currentComparable.id, 'esgFactors', checked)}
                  />
                  {currentComparable.esgFactors && (
                    <Input 
                      type="number"
                      step="0.1"
                      value={currentComparable.esgAdjustment}
                      onChange={(e) => updateComparable(currentComparable.id, 'esgAdjustment', parseFloat(e.target.value) || 0)}
                      placeholder="% adjustment"
                      className="text-sm"
                    />
                  )}
                  <div className="text-right font-medium">
                    {currentComparable.esgFactors ? `${currentComparable.esgAdjustment > 0 ? '+' : ''}${currentComparable.esgAdjustment}%` : 'N/A'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ESG rating and sustainability features
                  </div>
                </div>
              </div>

              {/* Comprehensive Rental Analysis */}
              <div className="space-y-4 border-t pt-6">
                <h4 className="font-semibold text-base">Rental Analysis & Yield Assessment</h4>
                
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Gross Rent (p.a.)</Label>
                    <Input 
                      type="number"
                      value={currentComparable.grossRent}
                      onChange={(e) => updateComparable(currentComparable.id, 'grossRent', parseFloat(e.target.value) || 0)}
                      placeholder="Annual gross rent"
                      className="text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Outgoings (p.a.)</Label>
                    <Input 
                      type="number"
                      value={currentComparable.outgoings}
                      onChange={(e) => updateComparable(currentComparable.id, 'outgoings', parseFloat(e.target.value) || 0)}
                      placeholder="Annual outgoings"
                      className="text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Net Rent (p.a.)</Label>
                    <Input 
                      type="number"
                      value={currentComparable.netRent}
                      onChange={(e) => updateComparable(currentComparable.id, 'netRent', parseFloat(e.target.value) || 0)}
                      placeholder="Annual net rent"
                      className="text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Net Passing Yield (%)</Label>
                    <Input 
                      type="number"
                      step="0.1"
                      value={currentComparable.netPassingYield}
                      onChange={(e) => updateComparable(currentComparable.id, 'netPassingYield', parseFloat(e.target.value) || 0)}
                      placeholder="Yield %"
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Rental Rates Analysis */}
                <div className="grid grid-cols-4 gap-4 mt-4 p-4 bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Gross Rent Rate</div>
                    <div className="font-medium">
                      {currentComparable.buildingArea > 0 
                        ? `$${(currentComparable.grossRent / currentComparable.buildingArea).toFixed(2)}/${currentComparable.buildingAreaUnit}`
                        : 'N/A'
                      }
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Outgoings Rate</div>
                    <div className="font-medium">
                      {currentComparable.buildingArea > 0 
                        ? `$${(currentComparable.outgoings / currentComparable.buildingArea).toFixed(2)}/${currentComparable.buildingAreaUnit}`
                        : 'N/A'
                      }
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Net Rent Rate</div>
                    <div className="font-medium">
                      {currentComparable.buildingArea > 0 
                        ? `$${(currentComparable.netRent / currentComparable.buildingArea).toFixed(2)}/${currentComparable.buildingAreaUnit}`
                        : 'N/A'
                      }
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Yield Impact</div>
                    <div className="font-medium text-primary">
                      {currentComparable.netPassingYield > 0 ? `${currentComparable.netPassingYield.toFixed(2)}%` : 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Yield Assessment */}
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h5 className="font-medium mb-2">Subject Property Yield Assessment</h5>
                  <div className="text-sm text-muted-foreground">
                    <p>Based on comparison rental rates per/{currentComparable.buildingAreaUnit} and outgoings analysis:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Subject should achieve rent rate: <span className="font-medium">Based on comparable analysis</span></li>
                      <li>Outgoings rate indication: <span className="font-medium">Based on comparable analysis</span></li>
                      <li>Yield indication: <span className="font-medium">
                        {currentComparable.netPassingYield > 0 ? 
                          `Firmer yield (lower) may be appropriate if subject achieves higher rent rate` :
                          'Yield assessment pending rental analysis'
                        }
                      </span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Overall Summary */}
              <div className="space-y-4 border-t pt-6">
                <h4 className="font-semibold text-base">Overall Comparison Summary</h4>
                <div className="space-y-2">
                  <Label className="text-sm">Main Components Summary</Label>
                  <Textarea 
                    value={currentComparable.comparisonSummary}
                    onChange={(e) => updateComparable(currentComparable.id, 'comparisonSummary', e.target.value)}
                    placeholder="Summarise main components: location, building/land areas, rental rates, yield implications, ESG factors..."
                    className="min-h-24"
                  />
                </div>

                {/* Adjustment Summary */}
                <div className="bg-primary/5 p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Original Sale Price</div>
                      <div className="text-lg font-semibold">{formatCurrency(currentComparable.salePrice)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Total Adjustment</div>
                      <div className={`text-lg font-semibold ${calculateTotalAdjustment(currentComparable) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {calculateTotalAdjustment(currentComparable) > 0 ? '+' : ''}{calculateTotalAdjustment(currentComparable).toFixed(1)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Adjusted Sale Price</div>
                      <div className="text-lg font-semibold text-primary">{formatCurrency(getAdjustedSalePrice(currentComparable))}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}