/*
 * Contradiction Amender - Manual and automated fixing of report contradictions
 * © 2024 Powered™. All Rights Reserved.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Save, Undo, CheckCircle, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Amendment {
  field: string;
  oldValue: any;
  newValue: any;
  reason: string;
  timestamp: Date;
  reviewRequired: boolean;
}

interface ContradictionAmenderProps {
  reportData: any;
  contradictions: any[];
  onAmendmentSaved?: (amendments: Amendment[]) => void;
  onReportUpdated?: (updatedData: any) => void;
}

export const ContradictionAmender: React.FC<ContradictionAmenderProps> = ({
  reportData,
  contradictions,
  onAmendmentSaved,
  onReportUpdated
}) => {
  const [amendments, setAmendments] = useState<Amendment[]>([]);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<any>('');
  const [amendmentReason, setAmendmentReason] = useState('');
  const [showAmendmentHistory, setShowAmendmentHistory] = useState(false);

  const handleFieldEdit = (fieldPath: string, currentValue: any) => {
    setEditingField(fieldPath);
    setEditValue(currentValue);
    setAmendmentReason('');
  };

  const saveAmendment = () => {
    if (!editingField || amendmentReason.trim() === '') return;

    const fieldParts = editingField.split('.');
    const oldValue = getNestedValue(reportData, fieldParts);
    
    const newAmendment: Amendment = {
      field: editingField,
      oldValue,
      newValue: editValue,
      reason: amendmentReason,
      timestamp: new Date(),
      reviewRequired: isReviewRequired(editingField, oldValue, editValue)
    };

    const updatedAmendments = [...amendments, newAmendment];
    setAmendments(updatedAmendments);

    // Update report data
    const updatedData = { ...reportData };
    setNestedValue(updatedData, fieldParts, editValue);
    onReportUpdated?.(updatedData);
    onAmendmentSaved?.(updatedAmendments);

    // Reset editing state
    setEditingField(null);
    setEditValue('');
    setAmendmentReason('');
  };

  const undoAmendment = (amendmentIndex: number) => {
    const amendment = amendments[amendmentIndex];
    const fieldParts = amendment.field.split('.');
    
    // Restore original value
    const updatedData = { ...reportData };
    setNestedValue(updatedData, fieldParts, amendment.oldValue);
    onReportUpdated?.(updatedData);

    // Remove amendment
    const updatedAmendments = amendments.filter((_, index) => index !== amendmentIndex);
    setAmendments(updatedAmendments);
    onAmendmentSaved?.(updatedAmendments);
  };

  const getNestedValue = (obj: any, path: string[]): any => {
    return path.reduce((current, key) => current?.[key], obj);
  };

  const setNestedValue = (obj: any, path: string[], value: any): void => {
    const lastKey = path.pop();
    const target = path.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    if (lastKey) target[lastKey] = value;
  };

  const isReviewRequired = (field: string, oldValue: any, newValue: any): boolean => {
    // Critical fields that require review
    const criticalFields = [
      'valuation.marketValue',
      'propertyDetails.salePrice',
      'rental.weeklyRent',
      'inspection.condition'
    ];
    
    if (criticalFields.includes(field)) return true;
    
    // Large percentage changes require review
    if (typeof oldValue === 'number' && typeof newValue === 'number') {
      const percentageChange = Math.abs((newValue - oldValue) / oldValue) * 100;
      return percentageChange > 10;
    }
    
    return false;
  };

  const getAmendmentTypeColor = (amendment: Amendment) => {
    if (amendment.reviewRequired) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const renderFieldEditor = (fieldPath: string, currentValue: any, label: string) => {
    const isEditing = editingField === fieldPath;
    
    return (
      <div className="space-y-2 p-3 border rounded-md">
        <div className="flex items-center justify-between">
          <Label className="font-medium">{label}</Label>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleFieldEdit(fieldPath, currentValue)}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingField(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={saveAmendment}
                  disabled={amendmentReason.trim() === ''}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
        
        {!isEditing ? (
          <div className="text-sm font-mono bg-muted p-2 rounded">
            {typeof currentValue === 'object' ? JSON.stringify(currentValue) : String(currentValue)}
          </div>
        ) : (
          <div className="space-y-2">
            {typeof currentValue === 'number' ? (
              <Input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(parseFloat(e.target.value) || 0)}
                placeholder="Enter new value"
              />
            ) : typeof currentValue === 'boolean' ? (
              <Select value={editValue.toString()} onValueChange={(value) => setEditValue(value === 'true')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">True</SelectItem>
                  <SelectItem value="false">False</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Enter new value"
              />
            )}
            
            <div>
              <Label htmlFor="reason">Amendment Reason *</Label>
              <Textarea
                id="reason"
                value={amendmentReason}
                onChange={(e) => setAmendmentReason(e.target.value)}
                placeholder="Explain why this change is necessary..."
                className="mt-1"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Amendment Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Report Amendment Center
            {amendments.length > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {amendments.length} amendments made
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contradictions.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {contradictions.length} contradictions detected. Use the editors below to make corrections.
              </AlertDescription>
            </Alert>
          )}

          {/* Key Field Editors */}
          <div className="space-y-4">
            <h4 className="font-medium">Key Report Fields</h4>
            
            {renderFieldEditor(
              'valuation.marketValue',
              reportData?.valuation?.marketValue,
              'Market Valuation'
            )}
            
            {renderFieldEditor(
              'propertyDetails.salePrice',
              reportData?.propertyDetails?.salePrice,
              'Sale Price'
            )}
            
            {renderFieldEditor(
              'rental.weeklyRent',
              reportData?.rental?.weeklyRent,
              'Weekly Rent'
            )}
            
            {renderFieldEditor(
              'propertyDetails.condition',
              reportData?.propertyDetails?.condition,
              'Property Condition'
            )}
            
            {renderFieldEditor(
              'inspectionDate',
              reportData?.inspectionDate,
              'Inspection Date'
            )}
            
            {renderFieldEditor(
              'valuationDate',
              reportData?.valuationDate,
              'Valuation Date'
            )}
          </div>
        </CardContent>
      </Card>

      {/* Amendment History */}
      {amendments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Amendment History
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAmendmentHistory(!showAmendmentHistory)}
              >
                {showAmendmentHistory ? 'Hide' : 'Show'} History
              </Button>
            </CardTitle>
          </CardHeader>
          {showAmendmentHistory && (
            <CardContent>
              <div className="space-y-3">
                {amendments.map((amendment, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{amendment.field}</span>
                          <Badge 
                            className={`text-white ${getAmendmentTypeColor(amendment)}`}
                          >
                            {amendment.reviewRequired ? 'Review Required' : 'Auto-Applied'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="line-through">{String(amendment.oldValue)}</span>
                          {' → '}
                          <span className="font-medium">{String(amendment.newValue)}</span>
                        </div>
                        <div className="text-sm bg-muted p-2 rounded">
                          <strong>Reason:</strong> {amendment.reason}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {amendment.timestamp.toLocaleString()}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => undoAmendment(index)}
                      >
                        <Undo className="h-4 w-4" />
                        Undo
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
};