import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Settings,
  DollarSign
} from 'lucide-react';
import {
  PropertyAttributes,
  SubjectProperty,
  AdjustmentResult,
  calculatePropertyAdjustments,
  calculateTotalAdjustment,
  getAdjustedValue,
  formatCurrency,
  formatPercentage,
  DEFAULT_ADJUSTMENT_WEIGHTS
} from '@/lib/valuationAdjustments';

interface PropertyAdjustmentTableProps {
  comparable: PropertyAttributes;
  subject: SubjectProperty;
  onAdjustmentChange?: (adjustments: AdjustmentResult[]) => void;
}

export default function PropertyAdjustmentTable({ 
  comparable, 
  subject, 
  onAdjustmentChange 
}: PropertyAdjustmentTableProps) {
  const [includeAdjustments, setIncludeAdjustments] = useState<Record<string, boolean>>({
    'Land Area': true,
    'Living Area': true,
    'Bedrooms': true,
    'Bathrooms': true,
    'Car Spaces': true,
    'Year Built': true,
    'Condition': true,
    'Location': true,
    'Market Conditions': true
  });

  const adjustments = useMemo(() => {
    const allAdjustments = calculatePropertyAdjustments(comparable, subject);
    const filteredAdjustments = allAdjustments.filter(adj => includeAdjustments[adj.attribute]);
    
    if (onAdjustmentChange) {
      onAdjustmentChange(filteredAdjustments);
    }
    
    return filteredAdjustments;
  }, [comparable, subject, includeAdjustments, onAdjustmentChange]);

  const { totalPercentageAdjustment, totalDollarAdjustment } = calculateTotalAdjustment(adjustments);
  const adjustedValue = getAdjustedValue(comparable.salePrice, adjustments);

  const getAdjustmentIcon = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAdjustmentColor = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Property Adjustment Analysis
          </CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Weighted comparison adjustments based on property attributes
            </p>
            <Badge variant="outline" className="ml-2">
              Professional Grade
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Sale Price</span>
                </div>
                <p className="text-lg font-bold text-blue-900">
                  {formatCurrency(comparable.salePrice)}
                </p>
              </CardContent>
            </Card>
            
            <Card className={`${totalDollarAdjustment >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  {totalDollarAdjustment >= 0 ? 
                    <TrendingUp className="h-4 w-4 text-green-600" /> : 
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  }
                  <span className={`text-sm font-medium ${totalDollarAdjustment >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                    Total Adjustment
                  </span>
                </div>
                <p className={`text-lg font-bold ${totalDollarAdjustment >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                  {formatCurrency(totalDollarAdjustment)}
                </p>
                <p className={`text-xs ${totalDollarAdjustment >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {formatPercentage(totalPercentageAdjustment)}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Value of Subject</span>
                </div>
                <p className="text-lg font-bold text-purple-900">
                  {formatCurrency(adjustedValue)}
                </p>
                <p className="text-xs text-purple-700">Direct Comparison</p>
              </CardContent>
            </Card>
          </div>

          {/* Adjustments Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[100px]">Include</TableHead>
                  <TableHead className="w-[150px]">Attribute</TableHead>
                  <TableHead className="w-[120px]">Comparable</TableHead>
                  <TableHead className="w-[120px]">Subject</TableHead>
                  <TableHead className="w-[200px]">Comparison Notes</TableHead>
                  <TableHead className="w-[100px] text-center">+/- Value</TableHead>
                  <TableHead className="w-[120px] text-right">$ Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adjustments.map((adjustment, index) => (
                  <TableRow key={adjustment.attribute} className="hover:bg-gray-50">
                    <TableCell>
                      <Switch
                        checked={includeAdjustments[adjustment.attribute]}
                        onCheckedChange={(checked) =>
                          setIncludeAdjustments(prev => ({
                            ...prev,
                            [adjustment.attribute]: checked
                          }))
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {adjustment.attribute}
                    </TableCell>
                    <TableCell className="text-sm">
                      {adjustment.comparableValue}
                    </TableCell>
                    <TableCell className="text-sm">
                      {adjustment.subjectValue}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {adjustment.description}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className={`flex items-center justify-center gap-1 ${getAdjustmentColor(adjustment.adjustmentType)}`}>
                        {getAdjustmentIcon(adjustment.adjustmentType)}
                        <span className="text-sm font-medium">
                          {formatPercentage(adjustment.percentageAdjustment)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${getAdjustmentColor(adjustment.adjustmentType)}`}>
                      {adjustment.dollarAdjustment >= 0 ? '+' : ''}{formatCurrency(adjustment.dollarAdjustment)}
                    </TableCell>
                  </TableRow>
                ))}
                
                {/* Total Row */}
                <TableRow className="border-t-2 bg-gray-100 font-bold">
                  <TableCell></TableCell>
                  <TableCell className="font-bold">TOTAL ADJUSTMENTS</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-sm">
                    Net adjustment to comparable sale
                  </TableCell>
                  <TableCell className="text-center">
                    <div className={`flex items-center justify-center gap-1 ${getAdjustmentColor(totalDollarAdjustment >= 0 ? 'positive' : 'negative')}`}>
                      {getAdjustmentIcon(totalDollarAdjustment >= 0 ? 'positive' : 'negative')}
                      <span className="font-bold">
                        {formatPercentage(totalPercentageAdjustment)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className={`text-right font-bold ${getAdjustmentColor(totalDollarAdjustment >= 0 ? 'positive' : 'negative')}`}>
                    {totalDollarAdjustment >= 0 ? '+' : ''}{formatCurrency(totalDollarAdjustment)}
                  </TableCell>
                </TableRow>
                
                {/* Value of Subject Row */}
                <TableRow className="bg-purple-50 border-t">
                  <TableCell></TableCell>
                  <TableCell className="font-bold text-purple-900">VALUE OF SUBJECT</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-sm text-purple-700">
                    Direct Comparison Approach - Value indication
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right font-bold text-purple-900 text-lg">
                    {formatCurrency(adjustedValue)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Methodology Note */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Adjustment Methodology
            </h4>
            <p className="text-xs text-muted-foreground">
              Adjustments calculated using professional valuation standards: Land Area (+$450/sqm), 
              Living Area (+$2,200/sqm), Bedrooms (+$15k each), Bathrooms (+$12k each), 
              Car Spaces (+$18k each), Age (0.8%/year), Condition (±15%), Location (±10%), 
              Market Conditions (±0.5%/month). All figures in AUD.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}