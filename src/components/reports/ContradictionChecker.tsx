/*
 * Contradiction Checker - Identifies inconsistencies in reports
 * © 2024 Powered™. All Rights Reserved.
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Edit, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Contradiction {
  id: string;
  type: 'data_inconsistency' | 'logical_error' | 'value_mismatch' | 'date_conflict' | 'calculation_error';
  severity: 'critical' | 'major' | 'minor';
  section: string;
  field: string;
  description: string;
  currentValue: any;
  expectedValue?: any;
  suggestion: string;
  autoFixable: boolean;
}

interface ContradictionCheckerProps {
  reportData: any;
  reportType: string;
  onContradictionsFound?: (contradictions: Contradiction[]) => void;
  onAmendReport?: (amendedData: any) => void;
}

export const ContradictionChecker: React.FC<ContradictionCheckerProps> = ({
  reportData,
  reportType,
  onContradictionsFound,
  onAmendReport
}) => {
  const [contradictions, setContradictions] = useState<Contradiction[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [selectedContradiction, setSelectedContradiction] = useState<string | null>(null);
  const [amendedData, setAmendedData] = useState<any>(reportData);

  const checkForContradictions = async () => {
    setIsChecking(true);
    
    // Simulate contradiction detection logic
    const foundContradictions: Contradiction[] = [];

    // Check for value mismatches
    if (reportData.propertyDetails?.salePrice && reportData.valuation?.marketValue) {
      const priceDiff = Math.abs(reportData.propertyDetails.salePrice - reportData.valuation.marketValue);
      const percentageDiff = (priceDiff / reportData.propertyDetails.salePrice) * 100;
      
      if (percentageDiff > 20) {
        foundContradictions.push({
          id: 'price-valuation-mismatch',
          type: 'value_mismatch',
          severity: 'major',
          section: 'Valuation',
          field: 'marketValue',
          description: `Market valuation (${reportData.valuation.marketValue?.toLocaleString()}) differs significantly from sale price (${reportData.propertyDetails.salePrice?.toLocaleString()})`,
          currentValue: reportData.valuation.marketValue,
          expectedValue: reportData.propertyDetails.salePrice,
          suggestion: 'Review market conditions and comparable sales to justify valuation difference',
          autoFixable: false
        });
      }
    }

    // Check for date conflicts
    if (reportData.inspectionDate && reportData.valuationDate) {
      const inspectionDate = new Date(reportData.inspectionDate);
      const valuationDate = new Date(reportData.valuationDate);
      
      if (valuationDate < inspectionDate) {
        foundContradictions.push({
          id: 'date-sequence-error',
          type: 'date_conflict',
          severity: 'critical',
          section: 'Report Dates',
          field: 'valuationDate',
          description: 'Valuation date cannot be before inspection date',
          currentValue: reportData.valuationDate,
          expectedValue: reportData.inspectionDate,
          suggestion: 'Adjust valuation date to be after inspection date',
          autoFixable: true
        });
      }
    }

    // Check for logical inconsistencies
    if (reportData.propertyDetails?.condition === 'poor' && reportData.valuation?.marketValue > 800000) {
      foundContradictions.push({
        id: 'condition-value-mismatch',
        type: 'logical_error',
        severity: 'major',
        section: 'Property Assessment',
        field: 'condition',
        description: 'High market value inconsistent with poor property condition',
        currentValue: reportData.propertyDetails.condition,
        suggestion: 'Review property condition assessment or market value calculation',
        autoFixable: false
      });
    }

    // Check for calculation errors
    if (reportData.rental?.weeklyRent && reportData.rental?.annualRent) {
      const calculatedAnnual = reportData.rental.weeklyRent * 52;
      const recordedAnnual = reportData.rental.annualRent;
      const diff = Math.abs(calculatedAnnual - recordedAnnual);
      
      if (diff > 100) {
        foundContradictions.push({
          id: 'rental-calculation-error',
          type: 'calculation_error',
          severity: 'minor',
          section: 'Rental Analysis',
          field: 'annualRent',
          description: `Annual rent calculation mismatch: ${calculatedAnnual.toLocaleString()} vs ${recordedAnnual.toLocaleString()}`,
          currentValue: recordedAnnual,
          expectedValue: calculatedAnnual,
          suggestion: `Correct annual rent to ${calculatedAnnual.toLocaleString()}`,
          autoFixable: true
        });
      }
    }

    // Add mock contradictions for demo
    if (reportType === 'ISFV') {
      foundContradictions.push({
        id: 'missing-comparable-data',
        type: 'data_inconsistency',
        severity: 'major',
        section: 'Sales Analysis',
        field: 'comparableSales',
        description: 'Insufficient comparable sales data for reliable valuation',
        currentValue: 'Limited data available',
        suggestion: 'Expand search radius or time frame for comparable sales',
        autoFixable: false
      });
    }

    setContradictions(foundContradictions);
    onContradictionsFound?.(foundContradictions);
    setIsChecking(false);
  };

  const autoFixContradiction = (contradictionId: string) => {
    const contradiction = contradictions.find(c => c.id === contradictionId);
    if (!contradiction || !contradiction.autoFixable) return;

    const newAmendedData = { ...amendedData };
    
    switch (contradiction.id) {
      case 'date-sequence-error':
        newAmendedData.valuationDate = new Date(newAmendedData.inspectionDate);
        newAmendedData.valuationDate.setDate(newAmendedData.valuationDate.getDate() + 1);
        break;
      case 'rental-calculation-error':
        newAmendedData.rental.annualRent = contradiction.expectedValue;
        break;
    }

    setAmendedData(newAmendedData);
    setContradictions(prev => prev.filter(c => c.id !== contradictionId));
    onAmendReport?.(newAmendedData);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'major': return 'bg-orange-500';
      case 'minor': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4" />;
      case 'major': return <AlertTriangle className="h-4 w-4" />;
      case 'minor': return <Eye className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    if (reportData) {
      checkForContradictions();
    }
  }, [reportData]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Contradiction Checker
          <Badge variant="outline" className="ml-auto">
            {contradictions.length} issues found
          </Badge>
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            onClick={checkForContradictions} 
            disabled={isChecking}
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
            {isChecking ? 'Checking...' : 'Re-check Report'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {contradictions.length === 0 ? (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              No contradictions detected. Report appears consistent.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-3">
            {contradictions.map((contradiction) => (
              <Card 
                key={contradiction.id} 
                className={`border-l-4 ${getSeverityColor(contradiction.severity)}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(contradiction.severity)}
                      <div>
                        <div className="font-medium">{contradiction.section}</div>
                        <div className="text-sm text-muted-foreground">
                          {contradiction.field}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-white ${getSeverityColor(contradiction.severity)}`}
                    >
                      {contradiction.severity.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-sm">{contradiction.description}</p>
                    
                    {contradiction.currentValue && (
                      <div className="text-xs">
                        <span className="font-medium">Current:</span> {contradiction.currentValue}
                        {contradiction.expectedValue && (
                          <>
                            <br />
                            <span className="font-medium">Expected:</span> {contradiction.expectedValue}
                          </>
                        )}
                      </div>
                    )}
                    
                    <div className="bg-muted p-3 rounded-md">
                      <div className="text-sm font-medium">Suggestion:</div>
                      <div className="text-sm">{contradiction.suggestion}</div>
                    </div>
                    
                    <div className="flex gap-2">
                      {contradiction.autoFixable ? (
                        <Button 
                          size="sm" 
                          onClick={() => autoFixContradiction(contradiction.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Auto Fix
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedContradiction(contradiction.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Manual Review
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};