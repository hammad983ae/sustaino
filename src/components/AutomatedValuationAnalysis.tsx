import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Calculator, TrendingUp, DollarSign } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useReportData } from '@/contexts/ReportDataContext';
import { supabase } from '@/integrations/supabase/client';

interface CalculationResult {
  value: number;
  formula: string;
  confidence: 'high' | 'medium' | 'low';
  method: string;
}

interface ValuationData {
  salesEvidence: any[];
  rentalEvidence: any[];
  propertyData: any;
  marketData: any;
}

const AutomatedValuationAnalysis = () => {
  const { reportData, updateReportData } = useReportData();
  const [valuationData, setValuationData] = useState<ValuationData>({
    salesEvidence: [],
    rentalEvidence: [],
    propertyData: {},
    marketData: {}
  });
  const [loading, setLoading] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState<string[]>(['direct-comparison']);
  const [manualOverrides, setManualOverrides] = useState<Record<string, number>>({});

  // Fetch valuation data from database
  useEffect(() => {
    const fetchValuationData = async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch sales evidence
        const { data: salesData } = await supabase
          .from('sales_evidence')
          .select('*')
          .eq('user_id', user.id)
          .order('sale_date', { ascending: false })
          .limit(10);

        // Fetch rental evidence
        const { data: rentalData } = await supabase
          .from('rental_evidence')
          .select('*')
          .eq('user_id', user.id)
          .order('lease_date', { ascending: false })
          .limit(10);

        // Fetch property data
        const { data: propertyData } = await supabase
          .from('properties')
          .select('*')
          .eq('user_id', user.id)
          .single();

        setValuationData({
          salesEvidence: salesData || [],
          rentalEvidence: rentalData || [],
          propertyData: propertyData || {},
          marketData: reportData.planningData || {}
        });
      } catch (error) {
        console.error('Error fetching valuation data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchValuationData();
  }, [reportData.planningData]);

  // Automated calculations based on data
  const calculations = useMemo(() => {
    const results: Record<string, CalculationResult> = {};

    // Direct Comparison Method
    if (selectedMethods.includes('direct-comparison') && valuationData.salesEvidence.length > 0) {
      const relevantSales = valuationData.salesEvidence
        .filter(sale => sale.adjusted_price && sale.building_area)
        .slice(0, 5);

      if (relevantSales.length >= 2) {
        const pricePerSqm = relevantSales.reduce((sum, sale) => 
          sum + (sale.adjusted_price / sale.building_area), 0) / relevantSales.length;
        
        const propertyArea = valuationData.propertyData.building_area || 
                           manualOverrides.buildingArea || 200; // fallback
        
        const marketValue = pricePerSqm * propertyArea;
        
        results.directComparison = {
          value: Math.round(marketValue),
          formula: `Avg Price/m² (${Math.round(pricePerSqm)}) × Building Area (${propertyArea}m²)`,
          confidence: relevantSales.length >= 4 ? 'high' : relevantSales.length >= 3 ? 'medium' : 'low',
          method: 'Direct Comparison'
        };
      }
    }

    // Income Capitalisation Method
    if (selectedMethods.includes('income-capitalisation') && valuationData.rentalEvidence.length > 0) {
      const relevantRentals = valuationData.rentalEvidence
        .filter(rental => rental.adjusted_rental && rental.building_area)
        .slice(0, 5);

      if (relevantRentals.length >= 2) {
        const avgRentPerSqm = relevantRentals.reduce((sum, rental) => 
          sum + (rental.adjusted_rental * 52 / rental.building_area), 0) / relevantRentals.length;
        
        const propertyArea = valuationData.propertyData.building_area || 
                           manualOverrides.buildingArea || 200;
        
        const annualRent = avgRentPerSqm * propertyArea;
        const capRate = manualOverrides.capitalisationRate || 0.055; // 5.5% default
        const marketValue = annualRent / capRate;
        
        results.incomeCapitalisation = {
          value: Math.round(marketValue),
          formula: `Annual Rent (${Math.round(annualRent)}) ÷ Cap Rate (${(capRate * 100).toFixed(2)}%)`,
          confidence: relevantRentals.length >= 4 ? 'high' : 'medium',
          method: 'Income Capitalisation'
        };
      }
    }

    // Cost Approach (simplified)
    if (selectedMethods.includes('cost-approach')) {
      const landValue = manualOverrides.landValue || 
                       (valuationData.propertyData.land_area || 600) * 1200; // $1200/m² default
      
      const buildingCost = manualOverrides.buildingCost || 
                          (valuationData.propertyData.building_area || 200) * 2500; // $2500/m² default
      
      const depreciation = manualOverrides.depreciation || 0.15; // 15% default
      const depreciatedValue = buildingCost * (1 - depreciation);
      const totalValue = landValue + depreciatedValue;
      
      results.costApproach = {
        value: Math.round(totalValue),
        formula: `Land Value (${landValue.toLocaleString()}) + Depreciated Building (${Math.round(depreciatedValue).toLocaleString()})`,
        confidence: 'medium',
        method: 'Cost Approach'
      };
    }

    return results;
  }, [valuationData, selectedMethods, manualOverrides]);

  // Final valuation synthesis
  const finalValuation = useMemo(() => {
    const values = Object.values(calculations);
    if (values.length === 0) return null;

    // Weight by confidence and method preference
    const weights = {
      'direct-comparison': 0.5,
      'income-capitalisation': 0.3,
      'cost-approach': 0.2
    };

    const confidenceMultipliers = {
      'high': 1.0,
      'medium': 0.8,
      'low': 0.6
    };

    let weightedSum = 0;
    let totalWeight = 0;

    Object.entries(calculations).forEach(([method, result]) => {
      const methodKey = method.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
      const weight = weights[methodKey] || 0.3;
      const confidenceWeight = confidenceMultipliers[result.confidence];
      const finalWeight = weight * confidenceWeight;
      
      weightedSum += result.value * finalWeight;
      totalWeight += finalWeight;
    });

    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : null;
  }, [calculations]);

  const handleMethodToggle = (method: string) => {
    setSelectedMethods(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const handleOverrideChange = (key: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setManualOverrides(prev => ({ ...prev, [key]: numValue }));
    }
  };

  const saveCalculations = () => {
    const analysisData = {
      selectedMethods,
      calculations,
      finalValuation,
      manualOverrides,
      dataQuality: {
        salesEvidence: valuationData.salesEvidence.length,
        rentalEvidence: valuationData.rentalEvidence.length,
        hasPropertyData: !!valuationData.propertyData.id
      },
      lastCalculated: new Date().toISOString()
    };

    updateReportData('valuationAnalysis', analysisData);
  };

  return (
    <div className="space-y-6">
      {/* Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Automated Valuation Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'direct-comparison', label: 'Direct Comparison', available: valuationData.salesEvidence.length >= 2 },
                { id: 'income-capitalisation', label: 'Income Capitalisation', available: valuationData.rentalEvidence.length >= 2 },
                { id: 'cost-approach', label: 'Cost Approach', available: true }
              ].map(method => (
                <Button
                  key={method.id}
                  variant={selectedMethods.includes(method.id) ? 'default' : 'outline'}
                  onClick={() => handleMethodToggle(method.id)}
                  disabled={!method.available}
                  className="flex items-center gap-2"
                >
                  {method.label}
                  {!method.available && <AlertCircle className="h-4 w-4" />}
                </Button>
              ))}
            </div>
            
            {valuationData.salesEvidence.length < 2 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Need at least 2 sales comparables for reliable direct comparison analysis.
                  Current sales evidence: {valuationData.salesEvidence.length}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Manual Overrides */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Input & Overrides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Building Area (m²)</Label>
              <Input
                type="number"
                placeholder={valuationData.propertyData.building_area?.toString() || "200"}
                onChange={(e) => handleOverrideChange('buildingArea', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Capitalisation Rate (%)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="5.50"
                onChange={(e) => handleOverrideChange('capitalisationRate', (parseFloat(e.target.value) / 100).toString())}
              />
            </div>
            <div className="space-y-2">
              <Label>Land Value ($)</Label>
              <Input
                type="number"
                placeholder="780000"
                onChange={(e) => handleOverrideChange('landValue', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculation Results */}
      {Object.entries(calculations).map(([method, result]) => (
        <Card key={method}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{result.method}</span>
              <Badge variant={result.confidence === 'high' ? 'default' : result.confidence === 'medium' ? 'secondary' : 'outline'}>
                {result.confidence} confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Calculated Value</Label>
                  <div className="text-2xl font-bold text-primary">
                    ${result.value.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Formula</Label>
                  <div className="text-sm font-mono bg-muted p-2 rounded">
                    {result.formula}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Final Valuation */}
      {finalValuation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Final Market Value Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Weighted Market Value</Label>
                  <div className="text-3xl font-bold text-primary flex items-center gap-2">
                    <DollarSign className="h-6 w-6" />
                    {finalValuation.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Methods Applied</Label>
                  <div className="flex flex-wrap gap-1">
                    {Object.keys(calculations).map(method => (
                      <Badge key={method} variant="secondary">
                        {calculations[method].method}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Automated Valuation Rationale</Label>
                <Textarea
                  value={`The final market value of $${finalValuation.toLocaleString()} has been determined using ${Object.keys(calculations).length} valuation method(s): ${Object.values(calculations).map(c => c.method).join(', ')}. The calculation incorporates ${valuationData.salesEvidence.length} sales comparables and ${valuationData.rentalEvidence.length} rental comparables, with confidence weightings applied based on data quality and market evidence reliability.`}
                  readOnly
                  rows={3}
                  className="bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Quality Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Data Quality & Evidence Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{valuationData.salesEvidence.length}</div>
              <div className="text-sm text-muted-foreground">Sales Comparables</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{valuationData.rentalEvidence.length}</div>
              <div className="text-sm text-muted-foreground">Rental Comparables</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{Object.keys(calculations).length}</div>
              <div className="text-sm text-muted-foreground">Active Methods</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={saveCalculations} className="flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          Save Analysis
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default AutomatedValuationAnalysis;