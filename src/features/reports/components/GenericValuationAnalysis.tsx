import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, TrendingUp, Calculator, DollarSign } from 'lucide-react';
import { FormTextField, FormSelectField, FormTextareaField } from '../../forms/components/FormFields';
import { 
  valuationAnalysisSchema, 
  valuationMethodSchema,
  type ValuationAnalysis,
  type ValuationMethod,
  valuationMethodOptions
} from '../../forms/schemas';

interface GenericValuationAnalysisProps {
  title: string;
  propertyType: 'residential' | 'commercial' | 'agricultural' | 'specialised';
  initialData?: ValuationAnalysis;
  onDataChange: (data: ValuationAnalysis) => void;
  className?: string;
}

const methodConfig = {
  direct_comparison: {
    fields: ['land_area', 'land_rate_per_sqm', 'land_value', 'improvement_value', 'total_value'],
    labels: {
      land_area: 'Land Area (m²)',
      land_rate_per_sqm: 'Land Rate per m²',
      land_value: 'Land Value',
      improvement_value: 'Improvement Value',
      total_value: 'Total Market Value'
    }
  },
  income_approach: {
    fields: ['annual_rental', 'yield_percentage', 'capitalised_value'],
    labels: {
      annual_rental: 'Annual Rental Income',
      yield_percentage: 'Yield %',
      capitalised_value: 'Capitalised Value'
    }
  },
  cost_approach: {
    fields: ['land_value', 'improvement_value', 'total_value'],
    labels: {
      land_value: 'Land Value',
      improvement_value: 'Replacement Cost',
      total_value: 'Total Value'
    }
  },
  residual: {
    fields: ['total_value'],
    labels: {
      total_value: 'Residual Value'
    }
  },
  profits: {
    fields: ['annual_rental', 'total_value'],
    labels: {
      annual_rental: 'Annual Profit',
      total_value: 'Capitalised Value'
    }
  }
};

const GenericValuationAnalysis: React.FC<GenericValuationAnalysisProps> = ({
  title,
  propertyType,
  initialData,
  onDataChange,
  className = ''
}) => {
  const { control, watch, setValue, getValues } = useForm<ValuationAnalysis>({
    defaultValues: initialData || {
      id: `valuation_${Date.now()}`,
      property_type: propertyType,
      methods: [],
      market_value: 0,
      primary_method: '',
      adjustments: {},
      final_rationale: ''
    }
  });

  const watchedData = watch();
  
  // Update parent when form data changes
  React.useEffect(() => {
    onDataChange(watchedData);
  }, [watchedData, onDataChange]);

  const addMethod = () => {
    const newMethod: ValuationMethod = {
      method: 'direct_comparison',
      primary: false,
      rationale: ''
    };
    
    const currentMethods = getValues('methods');
    setValue('methods', [...currentMethods, newMethod]);
  };

  const removeMethod = (index: number) => {
    const currentMethods = getValues('methods');
    setValue('methods', currentMethods.filter((_, i) => i !== index));
  };

  const setPrimaryMethod = (index: number) => {
    const currentMethods = getValues('methods');
    const updated = currentMethods.map((method, i) => ({
      ...method,
      primary: i === index
    }));
    setValue('methods', updated);
    setValue('primary_method', updated[index].method);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
            <Badge variant="secondary">
              {watchedData.methods.length} Method{watchedData.methods.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Method Button */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Valuation methods for {propertyType} properties
            </p>
            <Button onClick={addMethod} size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Method
            </Button>
          </div>

          {/* Valuation Methods */}
          <div className="space-y-6">
            {watchedData.methods.map((method, index) => {
              const config = methodConfig[method.method];
              
              return (
                <Card 
                  key={index} 
                  className={`border-l-4 ${method.primary ? 'border-l-primary' : 'border-l-muted'}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {valuationMethodOptions.find(opt => opt.value === method.method)?.label}
                        </span>
                        {method.primary && (
                          <Badge variant="default">Primary</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPrimaryMethod(index)}
                          disabled={method.primary}
                        >
                          Set Primary
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeMethod(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormSelectField
                      name={`methods.${index}.method`}
                      label="Valuation Method"
                      control={control}
                      options={valuationMethodOptions}
                      placeholder="Select method"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {config?.fields.map(field => (
                        <FormTextField
                          key={field}
                          name={`methods.${index}.${field}`}
                          label={config.labels[field as keyof typeof config.labels]}
                          type="number"
                          step={field.includes('percentage') || field.includes('rate') ? '0.01' : '1'}
                          control={control}
                          placeholder="0"
                        />
                      ))}
                    </div>

                    <FormTextareaField
                      name={`methods.${index}.rationale`}
                      label="Methodology & Rationale"
                      control={control}
                      placeholder="Explain the methodology and supporting evidence..."
                      rows={4}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {watchedData.methods.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No valuation methods added yet</p>
              <p className="text-sm">Click "Add Method" to get started</p>
            </div>
          )}

          {/* Market Adjustments */}
          {watchedData.methods.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Market Adjustments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormTextField
                    name="adjustments.location"
                    label="Location Adjustment (%)"
                    type="number"
                    step="0.1"
                    control={control}
                    placeholder="0"
                  />
                  <FormTextField
                    name="adjustments.condition"
                    label="Condition Adjustment (%)"
                    type="number"
                    step="0.1"
                    control={control}
                    placeholder="0"
                  />
                  <FormTextField
                    name="adjustments.size"
                    label="Size Adjustment (%)"
                    type="number"
                    step="0.1"
                    control={control}
                    placeholder="0"
                  />
                  <FormTextField
                    name="adjustments.age_quality"
                    label="Age/Quality Adjustment (%)"
                    type="number"
                    step="0.1"
                    control={control}
                    placeholder="0"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Final Market Value */}
          {watchedData.methods.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-success" />
                  Final Market Value Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormTextField
                    name="market_value"
                    label="Market Value"
                    type="number"
                    control={control}
                    placeholder="0"
                    required
                    className="text-lg font-bold"
                  />
                  <FormSelectField
                    name="primary_method"
                    label="Primary Method"
                    control={control}
                    options={valuationMethodOptions}
                    placeholder="Select primary method"
                  />
                </div>
                
                <FormTextareaField
                  name="final_rationale"
                  label="Final Valuation Rationale"
                  control={control}
                  placeholder="Provide comprehensive rationale for the final market value assessment..."
                  rows={6}
                />
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GenericValuationAnalysis;