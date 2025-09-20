import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MapPin, Calculator, TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SalesComparable {
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
  perKeyValue: number;
  specialPurposeEquipment: number;
  licensingValue: number;
  depreciationAdjustment: number;
  externalImprovements: number; // 1-10 scale
  grossRent: number;
  outgoings: number;
  netRent: number;
  netPassingYield: number;
  locationRating: number; // % adjustment for location
  positionRating: 'inferior' | 'superior' | 'same';
  positionValue: number;
  zoning: string;
  zoningAdjustment: number;
  vehicleTraffic: number; // for fast food/high traffic properties
  footTraffic: number; // for retail/office
  comparisonSummary: string;
}

export default function EnhancedSalesEvidenceSpecialised() {
  const [comparables, setComparables] = useState<SalesComparable[]>([]);
  const [selectedComparable, setSelectedComparable] = useState<string>('');
  
  // Add a new comparable
  const addComparable = () => {
    const newComparable: SalesComparable = {
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
      perKeyValue: 0,
      specialPurposeEquipment: 0,
      licensingValue: 0,
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
      vehicleTraffic: 0,
      footTraffic: 0,
      comparisonSummary: ''
    };
    setComparables([...comparables, newComparable]);
    setSelectedComparable(newComparable.id);
  };

  // Update comparable
  const updateComparable = (id: string, field: keyof SalesComparable, value: any) => {
    setComparables(prev => prev.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };

  // Calculate adjustments
  const calculateTotalAdjustment = (comparable: SalesComparable) => {
    let totalAdjustment = 0;
    
    // Sale date adjustment
    totalAdjustment += comparable.salePricePercentage;
    
    // Building area adjustment
    totalAdjustment += comparable.buildingAreaAdjustment;
    
    // Land area adjustment
    totalAdjustment += comparable.landAreaAdjustment;
    
    // Depreciation adjustment
    totalAdjustment += comparable.depreciationAdjustment;
    
    // External improvements (1-10 scale to percentage)
    const externalAdjustment = (comparable.externalImprovements - 5) * 2; // Scale to percentage
    totalAdjustment += externalAdjustment;
    
    // Location adjustment
    totalAdjustment += comparable.locationRating;
    
    // Position adjustment (converted to percentage)
    if (comparable.positionRating === 'superior') {
      totalAdjustment += (comparable.positionValue / comparable.salePrice) * 100;
    } else if (comparable.positionRating === 'inferior') {
      totalAdjustment -= (comparable.positionValue / comparable.salePrice) * 100;
    }
    
    // Zoning adjustment
    totalAdjustment += comparable.zoningAdjustment;
    
    return totalAdjustment;
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate adjusted sale price
  const getAdjustedSalePrice = (comparable: SalesComparable) => {
    const totalAdjustment = calculateTotalAdjustment(comparable);
    return comparable.salePrice * (1 + totalAdjustment / 100);
  };

  const currentComparable = comparables.find(c => c.id === selectedComparable);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Enhanced Specialised Sales Evidence</h3>
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
              <p>No sales evidence added yet. Click "Add Comparable" to begin.</p>
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
                  placeholder="Property Address: Eg. 88 Industrial Drive Dandenong VIC 3175"
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

              {/* Enhanced Attributes Table */}
              <div className="space-y-4">
                <h4 className="font-semibold text-base">Comparison Analysis</h4>
                
                {/* Sale Date - % increase/decrease since sale */}
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
                    Market movement since sale date
                  </div>
                </div>

                {/* Sale Price - Not Applicable */}
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

                {/* Incentives - Factor in $ value or Not Applicable */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Incentives</Label>
                  <Switch 
                    checked={currentComparable.incentivesApplicable}
                    onCheckedChange={(checked) => updateComparable(currentComparable.id, 'incentivesApplicable', checked)}
                  />
                  {currentComparable.incentivesApplicable ? (
                    <Input 
                      type="number"
                      value={currentComparable.incentivesValue}
                      onChange={(e) => updateComparable(currentComparable.id, 'incentivesValue', parseFloat(e.target.value) || 0)}
                      placeholder="Incentive value"
                      className="text-sm"
                    />
                  ) : (
                    <Badge variant="secondary">Not Applicable</Badge>
                  )}
                  <div className="text-right">
                    {currentComparable.incentivesApplicable ? formatCurrency(currentComparable.incentivesValue) : 'N/A'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Equipment, fit-out, etc.
                  </div>
                </div>

                {/* Sale Settled */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Sale Settled</Label>
                  <Switch 
                    checked={currentComparable.saleSettled}
                    onCheckedChange={(checked) => updateComparable(currentComparable.id, 'saleSettled', checked)}
                  />
                  {!currentComparable.saleSettled && (
                    <Input 
                      type="number"
                      value={currentComparable.settlementMonths}
                      onChange={(e) => updateComparable(currentComparable.id, 'settlementMonths', parseFloat(e.target.value) || 0)}
                      placeholder="Months to settlement"
                      className="text-sm"
                    />
                  )}
                  {currentComparable.settlementMonths > 6 ? (
                    <Badge variant="destructive">Settlement &gt;6 months</Badge>
                  ) : (
                    <Badge variant="secondary">Not Applicable</Badge>
                  )}
                  <div className="text-sm text-muted-foreground">
                    {currentComparable.settlementMonths > 6 ? 'Use settlement date for % difference' : 'Use sale date'}
                  </div>
                </div>

                {/* Local Purchaser */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Local Purchaser</Label>
                  <Select value={currentComparable.localPurchaser} onValueChange={(value: 'yes' | 'no' | 'unknown') => updateComparable(currentComparable.id, 'localPurchaser', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge variant="secondary">Not Applicable</Badge>
                  <div className="text-sm">
                    {currentComparable.localPurchaser.charAt(0).toUpperCase() + currentComparable.localPurchaser.slice(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Information only
                  </div>
                </div>

                {/* Marketing Period */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Marketing Period</Label>
                  <Input 
                    type="number"
                    value={currentComparable.marketingPeriodMonths}
                    onChange={(e) => updateComparable(currentComparable.id, 'marketingPeriodMonths', parseFloat(e.target.value) || 0)}
                    placeholder="Months"
                    className="text-sm"
                  />
                  {currentComparable.marketingPeriodMonths > 6 ? (
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <Badge variant="outline">High</Badge>
                    </div>
                  ) : (
                    <Badge variant="secondary">Normal</Badge>
                  )}
                  <div className="text-sm">
                    {currentComparable.marketingPeriodMonths} months
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentComparable.marketingPeriodMonths > 6 ? 'Caution: Extended marketing period' : 'Normal marketing period'}
                  </div>
                </div>

                {/* Building Area - % difference and allowance per sqm */}
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
                        <SelectItem value="placements">placements</SelectItem>
                        <SelectItem value="keys">keys</SelectItem>
                        <SelectItem value="beds">beds</SelectItem>
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
                    Per {currentComparable.buildingAreaUnit} adjustment
                  </div>
                </div>

                {/* Land Area - % difference and land value component */}
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
                        <SelectItem value="acres">acres</SelectItem>
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
                    Land value component only
                  </div>
                </div>

                {/* Special Purpose Equipment */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Special Purpose Equipment</Label>
                  <Input 
                    type="number"
                    value={currentComparable.specialPurposeEquipment}
                    onChange={(e) => updateComparable(currentComparable.id, 'specialPurposeEquipment', parseFloat(e.target.value) || 0)}
                    placeholder="Equipment value"
                    className="text-sm"
                  />
                  <Badge variant="outline">Operational Assets</Badge>
                  <div className="text-right font-medium">
                    {formatCurrency(currentComparable.specialPurposeEquipment)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Estimate for operational assets not in subject
                  </div>
                </div>

                {/* Licensing */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Licensing</Label>
                  <Input 
                    type="number"
                    value={currentComparable.licensingValue}
                    onChange={(e) => updateComparable(currentComparable.id, 'licensingValue', parseFloat(e.target.value) || 0)}
                    placeholder="License value"
                    className="text-sm"
                  />
                  <Badge variant="secondary">Not Applicable</Badge>
                  <div className="text-right font-medium">
                    {currentComparable.licensingValue > 0 ? formatCurrency(currentComparable.licensingValue) : 'N/A'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Only if like-with-like operations differ
                  </div>
                </div>

                {/* Depreciation Adjustment */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Depreciation</Label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={currentComparable.depreciationAdjustment}
                    onChange={(e) => updateComparable(currentComparable.id, 'depreciationAdjustment', parseFloat(e.target.value) || 0)}
                    placeholder="% adjustment"
                    className="text-sm"
                  />
                  <Badge variant="outline">Age/Condition</Badge>
                  <div className="text-right font-medium">
                    {currentComparable.depreciationAdjustment > 0 ? '+' : ''}{currentComparable.depreciationAdjustment}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Based on age and condition difference
                  </div>
                </div>

                {/* External Improvements */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">External Improvements</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="range"
                      min="1"
                      max="10"
                      value={currentComparable.externalImprovements}
                      onChange={(e) => updateComparable(currentComparable.id, 'externalImprovements', parseInt(e.target.value))}
                      className="text-sm"
                    />
                    <span className="text-sm w-8">{currentComparable.externalImprovements}</span>
                  </div>
                  <Badge variant={currentComparable.externalImprovements > 5 ? "default" : currentComparable.externalImprovements < 5 ? "destructive" : "secondary"}>
                    {currentComparable.externalImprovements > 5 ? 'Better' : currentComparable.externalImprovements < 5 ? 'Worse' : 'Same'}
                  </Badge>
                  <div className="text-right font-medium">
                    {((currentComparable.externalImprovements - 5) * 2) > 0 ? '+' : ''}{(currentComparable.externalImprovements - 5) * 2}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Outdoor areas, paving, landscaping (1-10 scale)
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
                    % adjustment vs average price for asset type in location
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
                    placeholder="$ value difference"
                    className="text-sm"
                  />
                  <div className="text-right font-medium">
                    {formatCurrency(currentComparable.positionValue)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Position advantage/disadvantage value
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
                    Zoning benefit/restriction adjustment
                  </div>
                </div>

                {/* Vehicle Traffic (for fast food/high traffic properties) */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Vehicle Traffic</Label>
                  <Input 
                    type="number"
                    value={currentComparable.vehicleTraffic}
                    onChange={(e) => updateComparable(currentComparable.id, 'vehicleTraffic', parseFloat(e.target.value) || 0)}
                    placeholder="Daily count"
                    className="text-sm"
                  />
                  <Badge variant="outline">Traffic Volume</Badge>
                  <div className="text-sm">
                    {currentComparable.vehicleTraffic.toLocaleString()} vehicles/day
                  </div>
                  <div className="text-sm text-muted-foreground">
                    For fast food & high traffic volume properties
                  </div>
                </div>

                {/* Foot Traffic (for retail/office) */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Foot Traffic</Label>
                  <Input 
                    type="number"
                    value={currentComparable.footTraffic}
                    onChange={(e) => updateComparable(currentComparable.id, 'footTraffic', parseFloat(e.target.value) || 0)}
                    placeholder="Daily count"
                    className="text-sm"
                  />
                  <Badge variant="outline">Pedestrian Volume</Badge>
                  <div className="text-sm">
                    {currentComparable.footTraffic.toLocaleString()} pedestrians/day
                  </div>
                  <div className="text-sm text-muted-foreground">
                    For retail and office properties
                  </div>
                </div>
              </div>

              {/* Rental Analysis Section */}
              <div className="space-y-4 border-t pt-6">
                <h4 className="font-semibold text-base">Rental Analysis</h4>
                
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

                {/* Calculated Rates */}
                <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-muted/20 rounded-lg">
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
                </div>
              </div>

              {/* Overall Summary */}
              <div className="space-y-4 border-t pt-6">
                <h4 className="font-semibold text-base">Overall Summary</h4>
                <div className="space-y-2">
                  <Label className="text-sm">Comparison Summary</Label>
                  <Textarea 
                    value={currentComparable.comparisonSummary}
                    onChange={(e) => updateComparable(currentComparable.id, 'comparisonSummary', e.target.value)}
                    placeholder="Summarise main components of comparison to subject..."
                    className="min-h-24"
                  />
                </div>

                {/* Total Adjustment Summary */}
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