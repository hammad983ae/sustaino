import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Plus, Calculator } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface CommercialComparable {
  id: string;
  address: string;
  leaseDate: Date | null;
  leaseStartDate: Date | null;
  leaseEndDate: Date | null;
  leaseTerm: number;
  grossRent: number;
  netRent: number;
  outgoings: number;
  lettableArea: number;
  landArea: number;
  carParking: number;
  floorLevel: string;
  views: string;
  fitoutQuality: string;
  buildingAmenities: string;
  locationQuality: string;
  buildingGrade: string;
  marketPositioning: string;
  disabilityAccess: boolean;
  
  // Calculated fields
  grossRentPerSqm: number;
  netRentPerSqm: number;
  outgoingsPerSqm: number;
  totalAdjustment: number;
  adjustedNetRentPerSqm: number;
}

interface AdjustmentCalculation {
  factor: string;
  difference: string;
  adjustmentType: 'percentage' | 'lumpSum';
  adjustmentValue: number;
  description: string;
}

export default function LeasingEvidenceCommercial() {
  const [comparables, setComparables] = useState<CommercialComparable[]>([]);
  const [selectedComparable, setSelectedComparable] = useState<string>('');
  const [subjectProperty, setSubjectProperty] = useState({
    lettableArea: 0,
    landArea: 0,
    carParking: 0,
    floorLevel: 'Ground',
    views: 'No Views',
    fitoutQuality: 'Standard',
    buildingAmenities: 'Good',
    locationQuality: 'Average',
    buildingGrade: 'B Grade',
    marketPositioning: 'Standard',
    disabilityAccess: true,
    baseRentPerSqm: 0
  });

  const addComparable = () => {
    const newComparable: CommercialComparable = {
      id: `comparable-${Date.now()}`,
      address: '',
      leaseDate: null,
      leaseStartDate: null,
      leaseEndDate: null,
      leaseTerm: 0,
      grossRent: 0,
      netRent: 0,
      outgoings: 0,
      lettableArea: 0,
      landArea: 0,
      carParking: 0,
      floorLevel: 'Ground',
      views: 'No Views',
      fitoutQuality: 'Standard',
      buildingAmenities: 'Good',
      locationQuality: 'Average',
      buildingGrade: 'B Grade',
      marketPositioning: 'Standard',
      disabilityAccess: true,
      grossRentPerSqm: 0,
      netRentPerSqm: 0,
      outgoingsPerSqm: 0,
      totalAdjustment: 0,
      adjustedNetRentPerSqm: 0
    };
    
    setComparables([...comparables, newComparable]);
    setSelectedComparable(newComparable.id);
  };

  const updateComparable = (id: string, field: keyof CommercialComparable, value: any) => {
    setComparables(prev => prev.map(comp => {
      if (comp.id === id) {
        const updated = { ...comp, [field]: value };
        return calculateRates(updated);
      }
      return comp;
    }));
  };

  const calculateRates = (comparable: CommercialComparable): CommercialComparable => {
    const grossRentPerSqm = comparable.lettableArea > 0 ? comparable.grossRent / comparable.lettableArea : 0;
    const netRentPerSqm = comparable.lettableArea > 0 ? comparable.netRent / comparable.lettableArea : 0;
    const outgoingsPerSqm = comparable.lettableArea > 0 ? comparable.outgoings / comparable.lettableArea : 0;
    
    // Calculate adjustments
    const adjustments = calculateAdjustments(comparable);
    const totalAdjustment = adjustments.reduce((sum, adj) => sum + adj.adjustmentValue, 0);
    const adjustedNetRentPerSqm = netRentPerSqm * (1 + totalAdjustment / 100);
    
    return {
      ...comparable,
      grossRentPerSqm,
      netRentPerSqm,
      outgoingsPerSqm,
      totalAdjustment,
      adjustedNetRentPerSqm
    };
  };

  const calculateAdjustments = (comparable: CommercialComparable): AdjustmentCalculation[] => {
    const adjustments: AdjustmentCalculation[] = [];
    
    // Lettable Area Difference (Percentage)
    if (subjectProperty.lettableArea > 0 && comparable.lettableArea > 0) {
      const areaDiff = Math.abs(subjectProperty.lettableArea - comparable.lettableArea);
      const areaDiffPercent = (areaDiff / comparable.lettableArea) * 100;
      let adjustmentRate = 0;
      
      if (areaDiffPercent <= 20) adjustmentRate = 15;
      else if (areaDiffPercent <= 40) adjustmentRate = 12;
      else if (areaDiffPercent <= 60) adjustmentRate = 8;
      else adjustmentRate = 5;
      
      const adjustmentValue = subjectProperty.lettableArea > comparable.lettableArea ? adjustmentRate : -adjustmentRate;
      
      adjustments.push({
        factor: 'Lettable Area',
        difference: `${areaDiff.toFixed(0)}sqm (${areaDiffPercent.toFixed(1)}%)`,
        adjustmentType: 'percentage',
        adjustmentValue,
        description: `Subject ${subjectProperty.lettableArea}sqm vs Comp ${comparable.lettableArea}sqm`
      });
    }

    // Land Area Difference (Percentage)
    if (subjectProperty.landArea > 0 && comparable.landArea > 0) {
      const landDiff = Math.abs(subjectProperty.landArea - comparable.landArea);
      const landDiffPercent = (landDiff / comparable.landArea) * 100;
      let adjustmentRate = 0;
      
      if (landDiffPercent <= 20) adjustmentRate = 10;
      else if (landDiffPercent <= 40) adjustmentRate = 8;
      else if (landDiffPercent <= 60) adjustmentRate = 6;
      else adjustmentRate = 4;
      
      const adjustmentValue = subjectProperty.landArea > comparable.landArea ? adjustmentRate : -adjustmentRate;
      
      adjustments.push({
        factor: 'Land Area',
        difference: `${landDiff.toFixed(0)}sqm (${landDiffPercent.toFixed(1)}%)`,
        adjustmentType: 'percentage',
        adjustmentValue,
        description: `Subject ${subjectProperty.landArea}sqm vs Comp ${comparable.landArea}sqm`
      });
    }

    // Car Parking (Lump Sum converted to percentage)
    const parkingDiff = subjectProperty.carParking - comparable.carParking;
    if (parkingDiff !== 0) {
      let totalParkingAdjustment = 0;
      const absDiff = Math.abs(parkingDiff);
      
      // Calculate lump sum
      if (absDiff <= 2) totalParkingAdjustment = absDiff * 2000;
      else if (absDiff <= 5) totalParkingAdjustment = (2 * 2000) + ((absDiff - 2) * 1500);
      else totalParkingAdjustment = (2 * 2000) + (3 * 1500) + ((absDiff - 5) * 1000);
      
      // Convert to percentage of annual rent
      const adjustmentPercent = comparable.netRent > 0 ? (totalParkingAdjustment / comparable.netRent) * 100 : 0;
      const adjustmentValue = parkingDiff > 0 ? adjustmentPercent : -adjustmentPercent;
      
      adjustments.push({
        factor: 'Car Parking',
        difference: `${Math.abs(parkingDiff)} spaces`,
        adjustmentType: 'lumpSum',
        adjustmentValue,
        description: `$${totalParkingAdjustment.toLocaleString()} (${adjustmentPercent.toFixed(1)}%)`
      });
    }

    // Market factors (percentage adjustments)
    const locationAdjustment = getLocationAdjustment(subjectProperty.locationQuality, comparable.locationQuality);
    if (locationAdjustment !== 0) {
      adjustments.push({
        factor: 'Location Quality',
        difference: `${subjectProperty.locationQuality} vs ${comparable.locationQuality}`,
        adjustmentType: 'percentage',
        adjustmentValue: locationAdjustment,
        description: `Market location differential`
      });
    }

    return adjustments;
  };

  const getLocationAdjustment = (subject: string, comparable: string): number => {
    const locationValues = { 'Excellent': 15, 'Good': 10, 'Average': 5, 'Below Average': 0, 'Poor': -5 };
    const subjectValue = locationValues[subject as keyof typeof locationValues] || 5;
    const comparableValue = locationValues[comparable as keyof typeof locationValues] || 5;
    return subjectValue - comparableValue;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCurrentComparable = () => {
    return comparables.find(comp => comp.id === selectedComparable);
  };

  const currentComparable = getCurrentComparable();
  const adjustments = currentComparable ? calculateAdjustments(currentComparable) : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Commercial Leasing Evidence Analysis
            </CardTitle>
            <Button onClick={addComparable} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Comparable
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {comparables.length > 0 && (
            <div>
              <Label htmlFor="comparable-select">Select Comparable</Label>
              <Select value={selectedComparable} onValueChange={setSelectedComparable}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a comparable to edit" />
                </SelectTrigger>
                <SelectContent>
                  {comparables.map((comp, index) => (
                    <SelectItem key={comp.id} value={comp.id}>
                      Comparable {index + 1} - {comp.address || 'New Address'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Subject Property Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subject Property Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="subject-lettable-area">Lettable Area (sqm)</Label>
                <Input
                  id="subject-lettable-area"
                  type="number"
                  value={subjectProperty.lettableArea}
                  onChange={(e) => setSubjectProperty(prev => ({ ...prev, lettableArea: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="subject-land-area">Land Area (sqm)</Label>
                <Input
                  id="subject-land-area"
                  type="number"
                  value={subjectProperty.landArea}
                  onChange={(e) => setSubjectProperty(prev => ({ ...prev, landArea: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="subject-parking">Car Parking Spaces</Label>
                <Input
                  id="subject-parking"
                  type="number"
                  value={subjectProperty.carParking}
                  onChange={(e) => setSubjectProperty(prev => ({ ...prev, carParking: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="subject-location">Location Quality</Label>
                <Select value={subjectProperty.locationQuality} onValueChange={(value) => setSubjectProperty(prev => ({ ...prev, locationQuality: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Average">Average</SelectItem>
                    <SelectItem value="Below Average">Below Average</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject-base-rent">Base Rent per sqm (Annual)</Label>
                <Input
                  id="subject-base-rent"
                  type="number"
                  value={subjectProperty.baseRentPerSqm}
                  onChange={(e) => setSubjectProperty(prev => ({ ...prev, baseRentPerSqm: Number(e.target.value) }))}
                />
              </div>
            </div>
          </div>

          {currentComparable && (
            <>
              <Separator />
              
              {/* Comparable Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Comparable Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Property Address</Label>
                    <div className="flex gap-2">
                      <MapPin className="h-4 w-4 mt-3 text-muted-foreground" />
                      <Input
                        id="address"
                        value={currentComparable.address}
                        onChange={(e) => updateComparable(currentComparable.id, 'address', e.target.value)}
                        placeholder="Enter property address"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Lease Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !currentComparable.leaseDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {currentComparable.leaseDate ? format(currentComparable.leaseDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={currentComparable.leaseDate || undefined}
                          onSelect={(date) => updateComparable(currentComparable.id, 'leaseDate', date)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="lease-term">Lease Term (months)</Label>
                    <Input
                      id="lease-term"
                      type="number"
                      value={currentComparable.leaseTerm}
                      onChange={(e) => updateComparable(currentComparable.id, 'leaseTerm', Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="gross-rent">Gross Annual Rent</Label>
                    <Input
                      id="gross-rent"
                      type="number"
                      value={currentComparable.grossRent}
                      onChange={(e) => updateComparable(currentComparable.id, 'grossRent', Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="net-rent">Net Annual Rent</Label>
                    <Input
                      id="net-rent"
                      type="number"
                      value={currentComparable.netRent}
                      onChange={(e) => updateComparable(currentComparable.id, 'netRent', Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="outgoings">Annual Outgoings</Label>
                    <Input
                      id="outgoings"
                      type="number"
                      value={currentComparable.outgoings}
                      onChange={(e) => updateComparable(currentComparable.id, 'outgoings', Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="lettable-area">Lettable Area (sqm)</Label>
                    <Input
                      id="lettable-area"
                      type="number"
                      value={currentComparable.lettableArea}
                      onChange={(e) => updateComparable(currentComparable.id, 'lettableArea', Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="land-area">Land Area (sqm)</Label>
                    <Input
                      id="land-area"
                      type="number"
                      value={currentComparable.landArea}
                      onChange={(e) => updateComparable(currentComparable.id, 'landArea', Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="car-parking">Car Parking Spaces</Label>
                    <Input
                      id="car-parking"
                      type="number"
                      value={currentComparable.carParking}
                      onChange={(e) => updateComparable(currentComparable.id, 'carParking', Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location-quality">Location Quality</Label>
                    <Select 
                      value={currentComparable.locationQuality} 
                      onValueChange={(value) => updateComparable(currentComparable.id, 'locationQuality', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Average">Average</SelectItem>
                        <SelectItem value="Below Average">Below Average</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="disability-access"
                      checked={currentComparable.disabilityAccess}
                      onCheckedChange={(checked) => updateComparable(currentComparable.id, 'disabilityAccess', checked)}
                    />
                    <Label htmlFor="disability-access">Disability Access Compliant</Label>
                  </div>
                </div>
              </div>

              {/* Rental Analysis & Calculations */}
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Rental Analysis & Assessment</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card className="p-4">
                    <h4 className="font-medium text-sm text-muted-foreground">Gross Rent (p.a.)</h4>
                    <p className="text-2xl font-bold">{formatCurrency(currentComparable.grossRent)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(currentComparable.grossRentPerSqm)}/sqm
                    </p>
                  </Card>
                  
                  <Card className="p-4">
                    <h4 className="font-medium text-sm text-muted-foreground">Outgoings (p.a.)</h4>
                    <p className="text-2xl font-bold">{formatCurrency(currentComparable.outgoings)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(currentComparable.outgoingsPerSqm)}/sqm
                    </p>
                  </Card>
                  
                  <Card className="p-4">
                    <h4 className="font-medium text-sm text-muted-foreground">Net Rent (p.a.)</h4>
                    <p className="text-2xl font-bold">{formatCurrency(currentComparable.netRent)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(currentComparable.netRentPerSqm)}/sqm
                    </p>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium text-sm text-muted-foreground">Total Adjustment</h4>
                    <p className={`text-2xl font-bold ${currentComparable.totalAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {currentComparable.totalAdjustment >= 0 ? '+' : ''}{currentComparable.totalAdjustment.toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Market differential
                    </p>
                  </Card>
                </div>

                {/* Adjustment Details */}
                {adjustments.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Adjustment Analysis</h4>
                    <div className="space-y-2">
                      {adjustments.map((adj, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <div>
                            <span className="font-medium">{adj.factor}</span>
                            <p className="text-sm text-muted-foreground">{adj.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={adj.adjustmentValue >= 0 ? "default" : "secondary"}>
                              {adj.adjustmentValue >= 0 ? '+' : ''}{adj.adjustmentValue.toFixed(1)}%
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{adj.difference}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Market Rent Calculation */}
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h4 className="font-semibold text-lg mb-4">Market Rent Assessment for Subject</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Comparable Net Rent per sqm:</span>
                      <span className="font-medium">{formatCurrency(currentComparable.netRentPerSqm)}/sqm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Adjustment:</span>
                      <span className={`font-medium ${currentComparable.totalAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {currentComparable.totalAdjustment >= 0 ? '+' : ''}{currentComparable.totalAdjustment.toFixed(1)}%
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Market Rent for Subject:</span>
                      <span className="text-primary">{formatCurrency(currentComparable.adjustedNetRentPerSqm)}/sqm</span>
                    </div>
                    {subjectProperty.lettableArea > 0 && (
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Annual Market Rent:</span>
                        <span className="text-primary">
                          {formatCurrency(currentComparable.adjustedNetRentPerSqm * subjectProperty.lettableArea)}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}