import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Calculator, Calendar } from "lucide-react";
import GoogleLocationMap from "./GoogleLocationMap";

interface LeasingEvidenceData {
  address: string;
  netRent: number;
  outgoings: number;
  reviewMechanism: string;
  reviewPercentage: number;
  lastReviewDate: string;
  nextReviewDate: string;
  autoAdjustment: boolean;
}

export default function EnhancedLeasingEvidence() {
  const [evidenceData, setEvidenceData] = useState<LeasingEvidenceData>({
    address: "",
    netRent: 0,
    outgoings: 0,
    reviewMechanism: "",
    reviewPercentage: 0,
    lastReviewDate: "",
    nextReviewDate: "",
    autoAdjustment: true,
  });

  const [adjustedRent, setAdjustedRent] = useState<number>(0);
  const [monthsSinceReview, setMonthsSinceReview] = useState<number>(0);

  // Calculate adjusted rent based on review mechanism
  useEffect(() => {
    if (evidenceData.netRent && evidenceData.reviewMechanism && evidenceData.reviewPercentage) {
      let adjusted = evidenceData.netRent;
      
      if (evidenceData.lastReviewDate) {
        const lastReview = new Date(evidenceData.lastReviewDate);
        const now = new Date();
        const months = Math.floor((now.getTime() - lastReview.getTime()) / (1000 * 60 * 60 * 24 * 30));
        setMonthsSinceReview(months);

        switch (evidenceData.reviewMechanism) {
          case 'cpi':
            adjusted = evidenceData.netRent * Math.pow(1 + (3.5 / 100), months / 12);
            break;
          case 'fixed_percentage':
            adjusted = evidenceData.netRent * Math.pow(1 + (evidenceData.reviewPercentage / 100), months / 12);
            break;
          case 'fixed_amount':
            adjusted = evidenceData.netRent + (evidenceData.reviewPercentage * (months / 12));
            break;
          default:
            adjusted = evidenceData.netRent;
        }
      }
      
      setAdjustedRent(Math.round(adjusted));
    }
  }, [evidenceData]);

  const handleInputChange = (field: keyof LeasingEvidenceData, value: any) => {
    setEvidenceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateNextReviewDate = () => {
    if (evidenceData.lastReviewDate) {
      const lastReview = new Date(evidenceData.lastReviewDate);
      const nextReview = new Date(lastReview);
      nextReview.setMonth(nextReview.getMonth() + 12);
      handleInputChange('nextReviewDate', nextReview.toISOString().split('T')[0]);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Enhanced Leasing Evidence with Automatic Adjustments</h3>
          
          {/* Property Address Input */}
          <div className="mb-6">
            <Label htmlFor="address" className="text-sm font-medium mb-2 block">
              Property Address
            </Label>
            <Input 
              id="address"
              placeholder="Enter property address for Google Maps integration"
              value={evidenceData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="mb-4"
            />
          </div>

          {/* Google Map and Image Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 text-center bg-muted/20">
              <div className="flex flex-col items-center justify-center space-y-3">
                <Upload className="h-8 w-8 text-muted-foreground/40" />
                <div>
                  <Button variant="outline" size="sm">Upload Property Image</Button>
                  <p className="text-sm text-muted-foreground mt-2">From PDF or direct upload</p>
                </div>
              </div>
            </div>
            
            <GoogleLocationMap address={evidenceData.address} height="200px" />
          </div>

          {/* Rental Information with Auto-Adjustment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="p-4">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Rental Information
              </h4>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="netRent">Net Rent (Annual)</Label>
                  <Input
                    id="netRent"
                    type="number"
                    placeholder="120,000"
                    value={evidenceData.netRent || ''}
                    onChange={(e) => handleInputChange('netRent', parseFloat(e.target.value) || 0)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="outgoings">Outgoings (Annual)</Label>
                  <Input
                    id="outgoings"
                    type="number"
                    placeholder="15,000"
                    value={evidenceData.outgoings || ''}
                    onChange={(e) => handleInputChange('outgoings', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <Label>Gross Rent (Calculated)</Label>
                  <div className="p-3 bg-muted rounded-lg font-medium">
                    ${(evidenceData.netRent + evidenceData.outgoings).toLocaleString()}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Review Mechanism & Adjustments
              </h4>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reviewMechanism">Review Mechanism</Label>
                  <Select 
                    value={evidenceData.reviewMechanism} 
                    onValueChange={(value) => handleInputChange('reviewMechanism', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select review type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpi">CPI Increase</SelectItem>
                      <SelectItem value="fixed_percentage">Fixed Percentage</SelectItem>
                      <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                      <SelectItem value="market_review">Market Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {evidenceData.reviewMechanism && evidenceData.reviewMechanism !== 'market_review' && (
                  <div>
                    <Label htmlFor="reviewPercentage">
                      {evidenceData.reviewMechanism === 'fixed_amount' ? 'Fixed Amount ($)' : 'Percentage (%)'}
                    </Label>
                    <Input
                      id="reviewPercentage"
                      type="number"
                      step="0.1"
                      placeholder={evidenceData.reviewMechanism === 'cpi' ? '3.5' : '3.0'}
                      value={evidenceData.reviewPercentage || ''}
                      onChange={(e) => handleInputChange('reviewPercentage', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="lastReviewDate">Last Review Date</Label>
                    <Input
                      id="lastReviewDate"
                      type="date"
                      value={evidenceData.lastReviewDate}
                      onChange={(e) => handleInputChange('lastReviewDate', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="nextReviewDate">Next Review Date</Label>
                    <div className="flex gap-2">
                      <Input
                        id="nextReviewDate"
                        type="date"
                        value={evidenceData.nextReviewDate}
                        onChange={(e) => handleInputChange('nextReviewDate', e.target.value)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={calculateNextReviewDate}
                        disabled={!evidenceData.lastReviewDate}
                      >
                        Auto
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Adjusted Rent Display */}
          {adjustedRent > 0 && adjustedRent !== evidenceData.netRent && (
            <Card className="p-4 mb-6 border-primary/20 bg-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-primary">Current Adjusted Rent</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on {monthsSinceReview} months since last review
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    ${adjustedRent.toLocaleString()}
                  </div>
                  <Badge variant="secondary" className="mt-1">
                    +${(adjustedRent - evidenceData.netRent).toLocaleString()} increase
                  </Badge>
                </div>
              </div>
            </Card>
          )}

          {/* Auto-Adjustment Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="autoAdjustment" className="font-medium">
                Enable Automatic Rent Adjustments
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically calculate rent increases based on review mechanism
              </p>
            </div>
            <Switch
              id="autoAdjustment"
              checked={evidenceData.autoAdjustment}
              onCheckedChange={(checked) => handleInputChange('autoAdjustment', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}