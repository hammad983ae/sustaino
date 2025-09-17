import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Calendar, DollarSign, Trash2 } from "lucide-react";

interface ComparableSale {
  id: string;
  address: string;
  saleDate: string;
  salePrice: number;
  landArea: number;
  zoning: string;
  developmentPotential: string;
  pricePerSqm: number;
  distanceToSubject: number;
  adjustments: {
    location: number;
    size: number;
    zoning: number;
    timing: number;
    development: number;
  };
  adjustedPrice: number;
  weight: number;
  notes: string;
}

interface ComparableLease {
  id: string;
  address: string;
  leaseDate: string;
  annualRent: number;
  leaseArea: number;
  rentPerSqm: number;
  leaseTerm: number;
  leaseType: string;
  incentives: string;
  distanceToSubject: number;
  adjustments: {
    location: number;
    size: number;
    timing: number;
    terms: number;
  };
  adjustedRent: number;
  weight: number;
  notes: string;
}

export default function ComparableEvidence() {
  const [salesComparables, setSalesComparables] = useState<ComparableSale[]>([
    {
      id: '1',
      address: '123 Development Street, Macquarie Park NSW',
      saleDate: '2024-03-15',
      salePrice: 85000000,
      landArea: 12500,
      zoning: 'MU1 Mixed Use',
      developmentPotential: '400 apartments',
      pricePerSqm: 6800,
      distanceToSubject: 1.2,
      adjustments: {
        location: 5,
        size: -10,
        zoning: 0,
        timing: -2,
        development: 8
      },
      adjustedPrice: 86700000,
      weight: 25,
      notes: 'Similar mixed-use development site with comparable FSR'
    }
  ]);

  const [leasingComparables, setLeasingComparables] = useState<ComparableLease[]>([
    {
      id: '1',
      address: '456 Commercial Avenue, Macquarie Park NSW',
      leaseDate: '2024-02-20',
      annualRent: 2500000,
      leaseArea: 5000,
      rentPerSqm: 500,
      leaseTerm: 5,
      leaseType: 'Gross',
      incentives: '6 months rent free',
      distanceToSubject: 0.8,
      adjustments: {
        location: 0,
        size: 5,
        timing: -1,
        terms: 3
      },
      adjustedRent: 2675000,
      weight: 30,
      notes: 'Ground floor retail in mixed-use development'
    }
  ]);

  const addSalesComparable = () => {
    const newComparable: ComparableSale = {
      id: Date.now().toString(),
      address: '',
      saleDate: '',
      salePrice: 0,
      landArea: 0,
      zoning: '',
      developmentPotential: '',
      pricePerSqm: 0,
      distanceToSubject: 0,
      adjustments: {
        location: 0,
        size: 0,
        zoning: 0,
        timing: 0,
        development: 0
      },
      adjustedPrice: 0,
      weight: 0,
      notes: ''
    };
    setSalesComparables([...salesComparables, newComparable]);
  };

  const addLeasingComparable = () => {
    const newComparable: ComparableLease = {
      id: Date.now().toString(),
      address: '',
      leaseDate: '',
      annualRent: 0,
      leaseArea: 0,
      rentPerSqm: 0,
      leaseTerm: 0,
      leaseType: '',
      incentives: '',
      distanceToSubject: 0,
      adjustments: {
        location: 0,
        size: 0,
        timing: 0,
        terms: 0
      },
      adjustedRent: 0,
      weight: 0,
      notes: ''
    };
    setLeasingComparables([...leasingComparables, newComparable]);
  };

  const updateSalesComparable = (id: string, field: keyof ComparableSale, value: any) => {
    setSalesComparables(prev => prev.map(comp => {
      if (comp.id === id) {
        const updated = { ...comp, [field]: value };
        
        // Recalculate derived fields
        if (field === 'salePrice' || field === 'landArea') {
          updated.pricePerSqm = updated.salePrice / updated.landArea;
        }
        
        // Recalculate adjusted price
        const totalAdjustment = Object.values(updated.adjustments).reduce((sum, adj) => sum + adj, 0);
        updated.adjustedPrice = updated.salePrice * (1 + totalAdjustment / 100);
        
        return updated;
      }
      return comp;
    }));
  };

  const updateLeasingComparable = (id: string, field: keyof ComparableLease, value: any) => {
    setLeasingComparables(prev => prev.map(comp => {
      if (comp.id === id) {
        const updated = { ...comp, [field]: value };
        
        // Recalculate derived fields
        if (field === 'annualRent' || field === 'leaseArea') {
          updated.rentPerSqm = updated.annualRent / updated.leaseArea;
        }
        
        // Recalculate adjusted rent
        const totalAdjustment = Object.values(updated.adjustments).reduce((sum, adj) => sum + adj, 0);
        updated.adjustedRent = updated.annualRent * (1 + totalAdjustment / 100);
        
        return updated;
      }
      return comp;
    }));
  };

  const deleteSalesComparable = (id: string) => {
    setSalesComparables(prev => prev.filter(comp => comp.id !== id));
  };

  const deleteLeasingComparable = (id: string) => {
    setLeasingComparables(prev => prev.filter(comp => comp.id !== id));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateWeightedAverage = (comparables: ComparableSale[] | ComparableLease[], field: 'adjustedPrice' | 'adjustedRent') => {
    const totalWeight = comparables.reduce((sum, comp) => sum + comp.weight, 0);
    if (totalWeight === 0) return 0;
    
    const weightedSum = comparables.reduce((sum, comp) => sum + (comp[field] * comp.weight), 0);
    return weightedSum / totalWeight;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales">Sales Evidence</TabsTrigger>
          <TabsTrigger value="leasing">Leasing Evidence</TabsTrigger>
          <TabsTrigger value="analysis">Comparative Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Comparable Sales Evidence</h3>
            <Button onClick={addSalesComparable} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Sale
            </Button>
          </div>

          <div className="space-y-4">
            {salesComparables.map((comparable) => (
              <Card key={comparable.id}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">Sale Comparable #{comparable.id}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteSalesComparable(comparable.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor={`address-${comparable.id}`}>Property Address</Label>
                      <Input
                        id={`address-${comparable.id}`}
                        value={comparable.address}
                        onChange={(e) => updateSalesComparable(comparable.id, 'address', e.target.value)}
                        placeholder="Enter property address"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`saleDate-${comparable.id}`}>Sale Date</Label>
                      <Input
                        id={`saleDate-${comparable.id}`}
                        type="date"
                        value={comparable.saleDate}
                        onChange={(e) => updateSalesComparable(comparable.id, 'saleDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor={`salePrice-${comparable.id}`}>Sale Price</Label>
                      <Input
                        id={`salePrice-${comparable.id}`}
                        type="number"
                        value={comparable.salePrice}
                        onChange={(e) => updateSalesComparable(comparable.id, 'salePrice', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`landArea-${comparable.id}`}>Land Area (sqm)</Label>
                      <Input
                        id={`landArea-${comparable.id}`}
                        type="number"
                        value={comparable.landArea}
                        onChange={(e) => updateSalesComparable(comparable.id, 'landArea', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`zoning-${comparable.id}`}>Zoning</Label>
                      <Input
                        id={`zoning-${comparable.id}`}
                        value={comparable.zoning}
                        onChange={(e) => updateSalesComparable(comparable.id, 'zoning', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`distance-${comparable.id}`}>Distance (km)</Label>
                      <Input
                        id={`distance-${comparable.id}`}
                        type="number"
                        step="0.1"
                        value={comparable.distanceToSubject}
                        onChange={(e) => updateSalesComparable(comparable.id, 'distanceToSubject', Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`development-${comparable.id}`}>Development Potential</Label>
                    <Input
                      id={`development-${comparable.id}`}
                      value={comparable.developmentPotential}
                      onChange={(e) => updateSalesComparable(comparable.id, 'developmentPotential', e.target.value)}
                      placeholder="e.g., 400 apartments, Mixed-use development"
                    />
                  </div>

                  <div>
                    <Label>Adjustments (%)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                      {Object.entries(comparable.adjustments).map(([key, value]) => (
                        <div key={key}>
                          <Label className="text-xs capitalize">{key}</Label>
                          <Input
                            type="number"
                            value={value}
                            onChange={(e) => updateSalesComparable(comparable.id, 'adjustments', {
                              ...comparable.adjustments,
                              [key]: Number(e.target.value)
                            })}
                            className="text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`weight-${comparable.id}`}>Weight (%)</Label>
                      <Input
                        id={`weight-${comparable.id}`}
                        type="number"
                        value={comparable.weight}
                        onChange={(e) => updateSalesComparable(comparable.id, 'weight', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label>Price per sqm</Label>
                      <div className="p-2 bg-muted rounded text-sm">
                        {formatCurrency(comparable.pricePerSqm || 0)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`notes-${comparable.id}`}>Notes</Label>
                    <Textarea
                      id={`notes-${comparable.id}`}
                      value={comparable.notes}
                      onChange={(e) => updateSalesComparable(comparable.id, 'notes', e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Adjusted Sale Price:</span>
                    <Badge variant="default">{formatCurrency(comparable.adjustedPrice)}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leasing" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Comparable Leasing Evidence</h3>
            <Button onClick={addLeasingComparable} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Lease
            </Button>
          </div>

          <div className="space-y-4">
            {leasingComparables.map((comparable) => (
              <Card key={comparable.id}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">Lease Comparable #{comparable.id}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteLeasingComparable(comparable.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor={`lease-address-${comparable.id}`}>Property Address</Label>
                      <Input
                        id={`lease-address-${comparable.id}`}
                        value={comparable.address}
                        onChange={(e) => updateLeasingComparable(comparable.id, 'address', e.target.value)}
                        placeholder="Enter property address"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`leaseDate-${comparable.id}`}>Lease Date</Label>
                      <Input
                        id={`leaseDate-${comparable.id}`}
                        type="date"
                        value={comparable.leaseDate}
                        onChange={(e) => updateLeasingComparable(comparable.id, 'leaseDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor={`annualRent-${comparable.id}`}>Annual Rent</Label>
                      <Input
                        id={`annualRent-${comparable.id}`}
                        type="number"
                        value={comparable.annualRent}
                        onChange={(e) => updateLeasingComparable(comparable.id, 'annualRent', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`leaseArea-${comparable.id}`}>Lease Area (sqm)</Label>
                      <Input
                        id={`leaseArea-${comparable.id}`}
                        type="number"
                        value={comparable.leaseArea}
                        onChange={(e) => updateLeasingComparable(comparable.id, 'leaseArea', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`leaseTerm-${comparable.id}`}>Lease Term (years)</Label>
                      <Input
                        id={`leaseTerm-${comparable.id}`}
                        type="number"
                        value={comparable.leaseTerm}
                        onChange={(e) => updateLeasingComparable(comparable.id, 'leaseTerm', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`lease-distance-${comparable.id}`}>Distance (km)</Label>
                      <Input
                        id={`lease-distance-${comparable.id}`}
                        type="number"
                        step="0.1"
                        value={comparable.distanceToSubject}
                        onChange={(e) => updateLeasingComparable(comparable.id, 'distanceToSubject', Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`leaseType-${comparable.id}`}>Lease Type</Label>
                      <Select 
                        value={comparable.leaseType} 
                        onValueChange={(value) => updateLeasingComparable(comparable.id, 'leaseType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Gross">Gross</SelectItem>
                          <SelectItem value="Net">Net</SelectItem>
                          <SelectItem value="Triple Net">Triple Net</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`incentives-${comparable.id}`}>Incentives</Label>
                      <Input
                        id={`incentives-${comparable.id}`}
                        value={comparable.incentives}
                        onChange={(e) => updateLeasingComparable(comparable.id, 'incentives', e.target.value)}
                        placeholder="e.g., 6 months rent free"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Adjustments (%)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {Object.entries(comparable.adjustments).map(([key, value]) => (
                        <div key={key}>
                          <Label className="text-xs capitalize">{key}</Label>
                          <Input
                            type="number"
                            value={value}
                            onChange={(e) => updateLeasingComparable(comparable.id, 'adjustments', {
                              ...comparable.adjustments,
                              [key]: Number(e.target.value)
                            })}
                            className="text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`lease-weight-${comparable.id}`}>Weight (%)</Label>
                      <Input
                        id={`lease-weight-${comparable.id}`}
                        type="number"
                        value={comparable.weight}
                        onChange={(e) => updateLeasingComparable(comparable.id, 'weight', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label>Rent per sqm</Label>
                      <div className="p-2 bg-muted rounded text-sm">
                        {formatCurrency(comparable.rentPerSqm || 0)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`lease-notes-${comparable.id}`}>Notes</Label>
                    <Textarea
                      id={`lease-notes-${comparable.id}`}
                      value={comparable.notes}
                      onChange={(e) => updateLeasingComparable(comparable.id, 'notes', e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Adjusted Annual Rent:</span>
                    <Badge variant="default">{formatCurrency(comparable.adjustedRent)}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Sales Evidence Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Number of Comparables:</span>
                    <Badge>{salesComparables.length}</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Weighted Average Price:</span>
                    <span className="font-medium">
                      {formatCurrency(calculateWeightedAverage(salesComparables, 'adjustedPrice'))}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Price Range:</span>
                    <span className="font-medium">
                      {salesComparables.length > 0 
                        ? `${formatCurrency(Math.min(...salesComparables.map(s => s.adjustedPrice)))} - ${formatCurrency(Math.max(...salesComparables.map(s => s.adjustedPrice)))}`
                        : 'N/A'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Market Value Indication</Label>
                    <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="text-lg font-semibold text-green-700 dark:text-green-300">
                        {formatCurrency(calculateWeightedAverage(salesComparables, 'adjustedPrice'))}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        Based on comparable sales analysis
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Leasing Evidence Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Number of Comparables:</span>
                    <Badge>{leasingComparables.length}</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Weighted Average Rent:</span>
                    <span className="font-medium">
                      {formatCurrency(calculateWeightedAverage(leasingComparables, 'adjustedRent'))}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Rent Range:</span>
                    <span className="font-medium">
                      {leasingComparables.length > 0 
                        ? `${formatCurrency(Math.min(...leasingComparables.map(l => l.adjustedRent)))} - ${formatCurrency(Math.max(...leasingComparables.map(l => l.adjustedRent)))}`
                        : 'N/A'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Market Rent Indication</Label>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                        {formatCurrency(calculateWeightedAverage(leasingComparables, 'adjustedRent'))}
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        Annual rent based on comparable leasing
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}