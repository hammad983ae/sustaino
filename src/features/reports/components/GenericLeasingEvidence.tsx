import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, MapPin, Calendar, Home } from 'lucide-react';
import { FormTextField, FormSelectField, FormTextareaField } from '../../forms/components/FormFields';
import { 
  leasingEvidenceSchema, 
  rentalComparableSchema,
  type LeasingEvidence,
  type RentalComparable,
  propertyTypeOptions,
  rentalPeriodOptions
} from '../../forms/schemas';

interface GenericLeasingEvidenceProps {
  title: string;
  propertyType: 'residential' | 'commercial' | 'agricultural' | 'specialised';
  initialData?: LeasingEvidence;
  onDataChange: (data: LeasingEvidence) => void;
  className?: string;
}

const propertyTypeConfig = {
  residential: {
    fields: ['bedrooms', 'bathrooms', 'car_spaces', 'land_area', 'building_area'],
    labels: {
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      car_spaces: 'Car Spaces',
      land_area: 'Land Area (m²)',
      building_area: 'Building Area (m²)'
    },
    defaultTerms: ['weekly_rent', 'lease_duration', 'bond_amount', 'pet_policy', 'utilities']
  },
  commercial: {
    fields: ['building_area', 'land_area', 'car_spaces'],
    labels: {
      building_area: 'Building Area (m²)',
      land_area: 'Land Area (m²)',
      car_spaces: 'Car Spaces'
    },
    defaultTerms: ['annual_rent', 'lease_term', 'incentives', 'review_mechanism', 'outgoings']
  },
  agricultural: {
    fields: ['land_area'],
    labels: {
      land_area: 'Land Area (hectares)'
    },
    defaultTerms: ['seasonal_rates', 'grazing_rights', 'water_rights', 'crop_sharing']
  },
  specialised: {
    fields: ['building_area', 'land_area'],
    labels: {
      building_area: 'Building Area (m²)',
      land_area: 'Land Area (m²)'
    },
    defaultTerms: ['specialized_terms', 'equipment_included', 'regulatory_compliance']
  }
};

const GenericLeasingEvidence: React.FC<GenericLeasingEvidenceProps> = ({
  title,
  propertyType,
  initialData,
  onDataChange,
  className = ''
}) => {
  const config = propertyTypeConfig[propertyType];
  
  const { control, watch, setValue, getValues } = useForm<LeasingEvidence>({
    resolver: zodResolver(leasingEvidenceSchema),
    defaultValues: initialData || {
      id: `leasing_${Date.now()}`,
      property_type: propertyType,
      comparables: [],
      market_analysis: '',
      conclusions: ''
    }
  });

  const watchedData = watch();
  
  // Update parent when form data changes
  React.useEffect(() => {
    onDataChange(watchedData);
  }, [watchedData, onDataChange]);

  const addComparable = () => {
    const newComparable: RentalComparable = {
      id: `comp_${Date.now()}`,
      comparable_address: '',
      rental_amount: 0,
      rental_period: 'weekly',
      lease_date: '',
      property_type: propertyType,
      distance_km: 0,
      weight_percentage: 0,
      notes: '',
      source: ''
    };
    
    const currentComparables = getValues('comparables');
    setValue('comparables', [...currentComparables, newComparable]);
  };

  const removeComparable = (index: number) => {
    const currentComparables = getValues('comparables');
    setValue('comparables', currentComparables.filter((_, i) => i !== index));
  };

  const updateComparable = (index: number, field: keyof RentalComparable, value: any) => {
    const currentComparables = getValues('comparables');
    const updated = [...currentComparables];
    updated[index] = { ...updated[index], [field]: value };
    setValue('comparables', updated);
  };

  const calculateAdjustedRental = (comparable: RentalComparable): number => {
    if (!comparable.adjustments) return comparable.rental_amount;
    
    const totalAdjustment = Object.values(comparable.adjustments).reduce((sum: number, adj: number) => sum + adj, 0);
    return comparable.rental_amount + totalAdjustment;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
            <Badge variant="secondary">
              {watchedData.comparables.length} Comparable{watchedData.comparables.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Market Analysis */}
          <div>
            <Label htmlFor="market-analysis">Market Analysis</Label>
            <Textarea
              id="market-analysis"
              value={watchedData.market_analysis || ''}
              onChange={(e) => setValue('market_analysis', e.target.value)}
              placeholder={`Enter ${propertyType} rental market analysis...`}
              rows={3}
            />
          </div>

          {/* Add Comparable Button */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Rental evidence for {propertyType} properties
            </p>
            <Button onClick={addComparable} size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Comparable
            </Button>
          </div>

          {/* Comparables */}
          <div className="space-y-4">
            {watchedData.comparables.map((comparable, index) => (
              <Card key={comparable.id} className="border-l-4 border-l-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Comparable {index + 1}</span>
                      {comparable.comparable_address && (
                        <span className="text-sm text-muted-foreground">
                          - {comparable.comparable_address}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeComparable(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormTextField
                      name={`comparables.${index}.comparable_address`}
                      label="Property Address"
                      control={control}
                      placeholder="Enter address"
                      required
                    />

                    <FormTextField
                      name={`comparables.${index}.lease_date`}
                      label="Lease Date"
                      type="date"
                      control={control}
                      required
                    />

                    <FormTextField
                      name={`comparables.${index}.rental_amount`}
                      label="Rental Amount"
                      type="number"
                      control={control}
                      placeholder="0"
                      required
                    />

                    <FormSelectField
                      name={`comparables.${index}.rental_period`}
                      label="Rental Period"
                      control={control}
                      options={rentalPeriodOptions}
                      placeholder="Select period"
                    />

                    {config.fields.map(field => (
                      <FormTextField
                        key={field}
                        name={`comparables.${index}.${field}`}
                        label={config.labels[field as keyof typeof config.labels]}
                        type="number"
                        control={control}
                        placeholder="0"
                      />
                    ))}

                    <FormTextField
                      name={`comparables.${index}.distance_km`}
                      label="Distance (km)"
                      type="number"
                      step="0.1"
                      control={control}
                      placeholder="0.0"
                    />

                    <FormTextField
                      name={`comparables.${index}.weight_percentage`}
                      label="Weight %"
                      type="number"
                      control={control}
                      placeholder="0"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormTextField
                      name={`comparables.${index}.source`}
                      label="Source"
                      control={control}
                      placeholder="RP Data, REI, etc."
                    />

                    <div>
                      <Label>Adjusted Rental</Label>
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          ${calculateAdjustedRental(comparable).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <FormTextareaField
                    name={`comparables.${index}.notes`}
                    label="Notes"
                    control={control}
                    placeholder="Additional notes about this comparable..."
                    rows={2}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {watchedData.comparables.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No rental comparables added yet</p>
              <p className="text-sm">Click "Add Comparable" to get started</p>
            </div>
          )}

          {/* Conclusions */}
          <div>
            <Label htmlFor="conclusions">Conclusions</Label>
            <Textarea
              id="conclusions"
              value={watchedData.conclusions || ''}
              onChange={(e) => setValue('conclusions', e.target.value)}
              placeholder="Enter rental analysis conclusions..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenericLeasingEvidence;