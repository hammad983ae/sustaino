import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, MapPin, Calendar, DollarSign } from 'lucide-react';

export interface SalesComparable {
  id: string;
  address: string;
  saleDate: string;
  salePrice: number;
  propertyType: string;
  landArea?: number;
  buildingArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  distanceKm?: number;
  adjustments?: Record<string, number>;
  adjustedPrice?: number;
  weightPercentage?: number;
  notes?: string;
  source?: string;
}

interface GenericSalesEvidenceProps {
  title: string;
  propertyType: 'residential' | 'commercial' | 'agricultural' | 'specialised';
  comparables: SalesComparable[];
  onComparablesChange: (comparables: SalesComparable[]) => void;
  className?: string;
}

const propertyTypeConfig = {
  residential: {
    fields: ['bedrooms', 'bathrooms', 'carSpaces', 'landArea', 'buildingArea'],
    labels: {
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms', 
      carSpaces: 'Car Spaces',
      landArea: 'Land Area (m²)',
      buildingArea: 'Building Area (m²)'
    }
  },
  commercial: {
    fields: ['buildingArea', 'landArea', 'carSpaces'],
    labels: {
      buildingArea: 'Building Area (m²)',
      landArea: 'Land Area (m²)',
      carSpaces: 'Car Spaces'
    }
  },
  agricultural: {
    fields: ['landArea'],
    labels: {
      landArea: 'Land Area (hectares)'
    }
  },
  specialised: {
    fields: ['buildingArea', 'landArea'],
    labels: {
      buildingArea: 'Building Area (m²)',
      landArea: 'Land Area (m²)'
    }
  }
};

const GenericSalesEvidence: React.FC<GenericSalesEvidenceProps> = ({
  title,
  propertyType,
  comparables,
  onComparablesChange,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = propertyTypeConfig[propertyType];

  const addComparable = () => {
    const newComparable: SalesComparable = {
      id: `comp_${Date.now()}`,
      address: '',
      saleDate: '',
      salePrice: 0,
      propertyType,
      distanceKm: 0,
      weightPercentage: 0,
      notes: '',
      source: ''
    };
    onComparablesChange([...comparables, newComparable]);
  };

  const updateComparable = (id: string, field: keyof SalesComparable, value: any) => {
    const updated = comparables.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    );
    onComparablesChange(updated);
  };

  const removeComparable = (id: string) => {
    onComparablesChange(comparables.filter(comp => comp.id !== id));
  };

  const calculateAdjustedPrice = (comparable: SalesComparable): number => {
    if (!comparable.adjustments) return comparable.salePrice;
    
    const totalAdjustment = Object.values(comparable.adjustments).reduce((sum, adj) => sum + adj, 0);
    return comparable.salePrice + totalAdjustment;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
            <Badge variant="secondary">
              {comparables.length} Comparable{comparables.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Sales evidence for {propertyType} properties
            </p>
            <Button onClick={addComparable} size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Comparable
            </Button>
          </div>

          <div className="space-y-4">
            {comparables.map((comparable, index) => (
              <Card key={comparable.id} className="border-l-4 border-l-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Comparable {index + 1}</span>
                      {comparable.address && (
                        <span className="text-sm text-muted-foreground">
                          - {comparable.address}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeComparable(comparable.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`address-${comparable.id}`}>Property Address</Label>
                      <Input
                        id={`address-${comparable.id}`}
                        value={comparable.address}
                        onChange={(e) => updateComparable(comparable.id, 'address', e.target.value)}
                        placeholder="Enter address"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`sale-date-${comparable.id}`}>Sale Date</Label>
                      <Input
                        id={`sale-date-${comparable.id}`}
                        type="date"
                        value={comparable.saleDate}
                        onChange={(e) => updateComparable(comparable.id, 'saleDate', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor={`sale-price-${comparable.id}`}>Sale Price</Label>
                      <Input
                        id={`sale-price-${comparable.id}`}
                        type="number"
                        value={comparable.salePrice}
                        onChange={(e) => updateComparable(comparable.id, 'salePrice', Number(e.target.value))}
                        placeholder="$0"
                      />
                    </div>

                    {config.fields.map(field => (
                      <div key={field}>
                        <Label htmlFor={`${field}-${comparable.id}`}>
                          {config.labels[field as keyof typeof config.labels]}
                        </Label>
                        <Input
                          id={`${field}-${comparable.id}`}
                          type="number"
                          value={(comparable as any)[field] || ''}
                          onChange={(e) => updateComparable(comparable.id, field as keyof SalesComparable, Number(e.target.value) || undefined)}
                          placeholder="0"
                        />
                      </div>
                    ))}

                    <div>
                      <Label htmlFor={`distance-${comparable.id}`}>Distance (km)</Label>
                      <Input
                        id={`distance-${comparable.id}`}
                        type="number"
                        step="0.1"
                        value={comparable.distanceKm || ''}
                        onChange={(e) => updateComparable(comparable.id, 'distanceKm', Number(e.target.value) || undefined)}
                        placeholder="0.0"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`weight-${comparable.id}`}>Weight %</Label>
                      <Input
                        id={`weight-${comparable.id}`}
                        type="number"
                        value={comparable.weightPercentage || ''}
                        onChange={(e) => updateComparable(comparable.id, 'weightPercentage', Number(e.target.value) || undefined)}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`source-${comparable.id}`}>Source</Label>
                      <Input
                        id={`source-${comparable.id}`}
                        value={comparable.source || ''}
                        onChange={(e) => updateComparable(comparable.id, 'source', e.target.value)}
                        placeholder="RP Data, REI, etc."
                      />
                    </div>

                    <div>
                      <Label>Adjusted Price</Label>
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          ${calculateAdjustedPrice(comparable).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`notes-${comparable.id}`}>Notes</Label>
                    <Textarea
                      id={`notes-${comparable.id}`}
                      value={comparable.notes || ''}
                      onChange={(e) => updateComparable(comparable.id, 'notes', e.target.value)}
                      placeholder="Additional notes about this comparable..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {comparables.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No sales comparables added yet</p>
              <p className="text-sm">Click "Add Comparable" to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GenericSalesEvidence;