import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MapPin, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ResidentialComparable {
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
  landArea: number;
  landAreaUnit: string;
  landAreaAdjustment: number;
  livingArea: number;
  livingAreaUnit: string;
  livingAreaAdjustment: number;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  depreciationAdjustment: number;
  externalImprovements: number;
  locationRating: number;
  positionRating: 'inferior' | 'superior' | 'same';
  positionValue: number;
  zoning: string;
  zoningAdjustment: number;
  comparisonSummary: string;
  esgFactors: boolean;
  esgAdjustment: number;
  climateRisk: 'greater' | 'less' | 'same';
  climateRiskAdjustment: number;
  improvementsRatePerSqm: number;
  landDevelopmentCost: number;
  roomRate: number;
  bedRate: number;
  improvedLandRatePerSqm: number;
  capitalizedNetIncome: number;
  yieldRate: number;
}

export default function EnhancedSalesEvidenceResidential() {
  const [comparables, setComparables] = useState<ResidentialComparable[]>([]);
  const [selectedComparable, setSelectedComparable] = useState<string>('');
  
  const addComparable = () => {
    const newComparable: ResidentialComparable = {
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
      landArea: 0,
      landAreaUnit: 'sqm',
      landAreaAdjustment: 0,
      livingArea: 0,
      livingAreaUnit: 'sqm',
      livingAreaAdjustment: 0,
      bedrooms: 0,
      bathrooms: 0,
      carSpaces: 0,
      depreciationAdjustment: 0,
      externalImprovements: 5,
      locationRating: 0,
      positionRating: 'same',
      positionValue: 0,
      zoning: '',
      zoningAdjustment: 0,
      comparisonSummary: '',
      esgFactors: false,
      esgAdjustment: 0,
      climateRisk: 'same',
      climateRiskAdjustment: 0,
      improvementsRatePerSqm: 0,
      landDevelopmentCost: 0,
      roomRate: 0,
      bedRate: 0,
      improvedLandRatePerSqm: 0,
      capitalizedNetIncome: 0,
      yieldRate: 0
    };
    setComparables([...comparables, newComparable]);
    setSelectedComparable(newComparable.id);
  };

  const updateComparable = (id: string, field: keyof ResidentialComparable, value: any) => {
    setComparables(prev => prev.map(comp => {
      if (comp.id === id) {
        const updated = { ...comp, [field]: value };
        // Auto-calculate rates when key fields change
        if (['salePrice', 'livingArea', 'landArea', 'bedrooms', 'bathrooms'].includes(field)) {
          calculateRates(updated);
        }
        return updated;
      }
      return comp;
    }));
  };

  const calculateTotalAdjustment = (comparable: ResidentialComparable) => {
    let totalAdjustment = 0;
    
    totalAdjustment += comparable.salePricePercentage;
    totalAdjustment += comparable.livingAreaAdjustment;
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
    totalAdjustment += comparable.climateRiskAdjustment;
    
    return totalAdjustment;
  };

  // Auto-calculate rates per sqm
  const calculateRates = (comparable: ResidentialComparable) => {
    if (comparable.salePrice > 0 && comparable.livingArea > 0) {
      const improvementsValue = comparable.salePrice * 0.7; // Assuming 70% for improvements
      const landValue = comparable.salePrice * 0.3; // Assuming 30% for land
      
      comparable.improvementsRatePerSqm = improvementsValue / comparable.livingArea;
      comparable.improvedLandRatePerSqm = landValue / (comparable.landArea || comparable.livingArea);
      
      if (comparable.bedrooms > 0) {
        comparable.bedRate = comparable.salePrice / comparable.bedrooms;
      }
      
      // Calculate room rate (bedrooms + living areas estimate)
      const totalRooms = comparable.bedrooms + Math.max(2, comparable.bathrooms * 2);
      comparable.roomRate = comparable.salePrice / totalRooms;
      
      // Calculate capitalized net income if yield rate available
      if (comparable.yieldRate > 0) {
        comparable.capitalizedNetIncome = comparable.salePrice * (comparable.yieldRate / 100);
      }
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAdjustedSalePrice = (comparable: ResidentialComparable) => {
    const totalAdjustment = calculateTotalAdjustment(comparable);
    return comparable.salePrice * (1 + totalAdjustment / 100);
  };

  const currentComparable = comparables.find(c => c.id === selectedComparable);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Enhanced Residential Sales Evidence</h3>
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
              <p>No residential sales evidence added yet. Click "Add Comparable" to begin.</p>
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
                  placeholder="Property Address: Eg. 3 St Andrews Drive Cabarita VIC 3505"
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

              {/* Enhanced Residential Attributes */}
              <div className="space-y-4">
                <h4 className="font-semibold text-base">Residential Comparison Analysis</h4>
                
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
                    Land value component adjustment
                  </div>
                </div>

                {/* Living Area */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4">
                  <Label className="font-medium">Living Area</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="number"
                      value={currentComparable.livingArea}
                      onChange={(e) => updateComparable(currentComparable.id, 'livingArea', parseFloat(e.target.value) || 0)}
                      placeholder="Area"
                      className="text-sm"
                    />
                    <Select value={currentComparable.livingAreaUnit} onValueChange={(value) => updateComparable(currentComparable.id, 'livingAreaUnit', value)}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sqm">sqm</SelectItem>
                        <SelectItem value="sqft">sqft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input 
                    type="number"
                    step="0.1"
                    value={currentComparable.livingAreaAdjustment}
                    onChange={(e) => updateComparable(currentComparable.id, 'livingAreaAdjustment', parseFloat(e.target.value) || 0)}
                    placeholder="% adjustment"
                    className="text-sm"
                  />
                  <div className="text-right font-medium">
                    {currentComparable.livingAreaAdjustment > 0 ? '+' : ''}{currentComparable.livingAreaAdjustment}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Living area adjustment per {currentComparable.livingAreaUnit}
                  </div>
                </div>

                {/* Property Features */}
                <div className="grid grid-cols-3 gap-4 py-3 border rounded-lg p-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Bedrooms</Label>
                    <Input 
                      type="number"
                      value={currentComparable.bedrooms}
                      onChange={(e) => updateComparable(currentComparable.id, 'bedrooms', parseInt(e.target.value) || 0)}
                      placeholder="Bedrooms"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Bathrooms</Label>
                    <Input 
                      type="number"
                      step="0.5"
                      value={currentComparable.bathrooms}
                      onChange={(e) => updateComparable(currentComparable.id, 'bathrooms', parseFloat(e.target.value) || 0)}
                      placeholder="Bathrooms"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Car Spaces</Label>
                    <Input 
                      type="number"
                      value={currentComparable.carSpaces}
                      onChange={(e) => updateComparable(currentComparable.id, 'carSpaces', parseInt(e.target.value) || 0)}
                      placeholder="Car spaces"
                      className="text-sm"
                    />
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
                    % adjustment between average price for residential in location
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
                    Position advantage/disadvantage (views, street frontage, etc.)
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
                    Zoning benefit/restriction (development potential)
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
                    Energy efficiency, solar, sustainability features
                  </div>
                </div>

                {/* Climate Risk Assessment */}
                <div className="grid grid-cols-5 gap-4 items-center py-3 border rounded-lg p-4 bg-yellow-50">
                  <Label className="font-medium">Climate Risk</Label>
                  <Select value={currentComparable.climateRisk} onValueChange={(value: 'greater' | 'less' | 'same') => updateComparable(currentComparable.id, 'climateRisk', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="greater">Greater Risk</SelectItem>
                      <SelectItem value="same">Same Risk</SelectItem>
                      <SelectItem value="less">Less Risk</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    type="number"
                    step="0.1"
                    value={currentComparable.climateRiskAdjustment}
                    onChange={(e) => updateComparable(currentComparable.id, 'climateRiskAdjustment', parseFloat(e.target.value) || 0)}
                    placeholder="% adjustment"
                    className="text-sm"
                  />
                  <div className="text-right font-medium">
                    {currentComparable.climateRiskAdjustment > 0 ? '+' : ''}{currentComparable.climateRiskAdjustment}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Flood, fire, extreme weather exposure vs subject
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
                    Gardens, landscaping, outdoor areas, pool, shed (1-10 scale)
                  </div>
                </div>
              </div>

              {/* Rate Calculations */}
              <div className="space-y-4 border-t pt-6">
                <h4 className="font-semibold text-base">Rate Analysis & Calculations</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Improvements Rate per sqm */}
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <Label className="font-medium text-blue-900">Improvements Rate per sqm</Label>
                    <div className="text-2xl font-bold text-blue-900 mt-1">
                      {formatCurrency(currentComparable.improvementsRatePerSqm)}
                    </div>
                    <div className="text-sm text-blue-700 mt-1">
                      Building value ÷ Living area
                    </div>
                  </div>

                  {/* Improved Land Rate per sqm */}
                  <div className="p-4 border rounded-lg bg-green-50">
                    <Label className="font-medium text-green-900">Improved Land Rate per sqm</Label>
                    <div className="text-2xl font-bold text-green-900 mt-1">
                      {formatCurrency(currentComparable.improvedLandRatePerSqm)}
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                      Land value ÷ Land area
                    </div>
                  </div>

                  {/* Room Rate */}
                  <div className="p-4 border rounded-lg bg-purple-50">
                    <Label className="font-medium text-purple-900">Room Rate</Label>
                    <div className="text-2xl font-bold text-purple-900 mt-1">
                      {formatCurrency(currentComparable.roomRate)}
                    </div>
                    <div className="text-sm text-purple-700 mt-1">
                      Sale price ÷ Total rooms
                    </div>
                  </div>

                  {/* Bed Rate */}
                  <div className="p-4 border rounded-lg bg-orange-50">
                    <Label className="font-medium text-orange-900">Bed Rate</Label>
                    <div className="text-2xl font-bold text-orange-900 mt-1">
                      {formatCurrency(currentComparable.bedRate)}
                    </div>
                    <div className="text-sm text-orange-700 mt-1">
                      Sale price ÷ Bedrooms
                    </div>
                  </div>
                </div>

                {/* Yield Assessment Integration */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>Yield Rate (%)</Label>
                    <Input 
                      type="number"
                      step="0.1"
                      value={currentComparable.yieldRate}
                      onChange={(e) => updateComparable(currentComparable.id, 'yieldRate', parseFloat(e.target.value) || 0)}
                      placeholder="Annual yield %"
                      className="text-sm"
                    />
                  </div>
                  <div className="p-4 border rounded-lg bg-indigo-50">
                    <Label className="font-medium text-indigo-900">Capitalized Net Income</Label>
                    <div className="text-2xl font-bold text-indigo-900 mt-1">
                      {formatCurrency(currentComparable.capitalizedNetIncome)}
                    </div>
                    <div className="text-sm text-indigo-700 mt-1">
                      Sale price × Yield rate
                    </div>
                  </div>
                </div>

                {/* LDC Field */}
                <div className="space-y-2">
                  <Label>Land Development Cost (LDC)</Label>
                  <Input 
                    type="number"
                    value={currentComparable.landDevelopmentCost}
                    onChange={(e) => updateComparable(currentComparable.id, 'landDevelopmentCost', parseFloat(e.target.value) || 0)}
                    placeholder="Land development costs"
                    className="text-sm"
                  />
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
                    placeholder="Summarise main components: location, land/living areas, bedrooms/bathrooms, condition, external improvements, ESG factors..."
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
                      <div className="text-sm text-muted-foreground">Value of Subject</div>
                      <div className="text-lg font-semibold text-primary">{formatCurrency(getAdjustedSalePrice(currentComparable))}</div>
                    </div>
                  </div>
                </div>

                {/* Rental Analysis Integration */}
                <div className="mt-4 p-4 border rounded-lg bg-yellow-50">
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <Badge variant="secondary">Rental Analysis & Yield Assessment</Badge>
                  </h5>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <Label>Gross Rent (p.a.)</Label>
                      <div className="font-medium">$0</div>
                      <div className="text-xs text-muted-foreground">Gross Rent Rate: N/A</div>
                    </div>
                    <div>
                      <Label>Outgoings (p.a.)</Label>
                      <div className="font-medium">$0</div>
                      <div className="text-xs text-muted-foreground">Outgoings Rate: N/A</div>
                    </div>
                    <div>
                      <Label>Net Rent (p.a.)</Label>
                      <div className="font-medium">$0</div>
                      <div className="text-xs text-muted-foreground">Net Rent Rate: N/A</div>
                    </div>
                    <div>
                      <Label>Net Passing Yield (%)</Label>
                      <div className="font-medium text-primary">N/A</div>
                      <div className="text-xs text-muted-foreground">Yield Impact: N/A</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <h6 className="font-medium text-sm">Subject Property Yield Assessment</h6>
                    <div className="text-xs text-muted-foreground">
                      Based on comparison rental rates per/sqm and outgoings analysis:
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                      <li>• Subject should achieve rent rate: Based on comparable analysis</li>
                      <li>• Outgoings rate indication: Based on comparable analysis</li>
                      <li>• Yield indication: Yield assessment pending rental analysis</li>
                    </ul>
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