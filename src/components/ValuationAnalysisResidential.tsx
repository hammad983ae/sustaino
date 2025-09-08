import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ValuationAnalysisResidential() {
  return (
    <div className="space-y-6">
      {/* Valuation Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Valuation Methods Applied</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Direct Comparison Method */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Direct Comparison Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Land Area (sqm)</Label>
                <Input placeholder="650" />
              </div>
              <div className="space-y-2">
                <Label>Land Rate per sqm</Label>
                <Input placeholder="$1,200" />
              </div>
              <div className="space-y-2">
                <Label>Land Value</Label>
                <Input placeholder="$780,000" />
              </div>
              <div className="space-y-2">
                <Label>Improvement Value</Label>
                <Input placeholder="$520,000" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total Market Value</Label>
                <Input placeholder="$1,300,000" className="font-semibold text-lg" />
              </div>
              <div className="space-y-2">
                <Label>Rate per sqm (Total)</Label>
                <Input placeholder="$2,000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Market Evidence Supporting Rates</Label>
              <Textarea placeholder="Comparable sales evidence indicates land rates of between $1,000 to $1,400 per sqm and improvement rates of $800 to $1,000 per sqm, after consideration of location, size, quality of improvements, and market conditions..." />
            </div>
          </div>

          {/* Income Approach (if investment property) */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Income Approach (Investment Properties)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Annual Rental Income</Label>
                <Input placeholder="$33,800" />
              </div>
              <div className="space-y-2">
                <Label>Gross Yield</Label>
                <Input placeholder="2.60%" />
              </div>
              <div className="space-y-2">
                <Label>Capitalised Value</Label>
                <Input placeholder="$1,300,000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Yield Evidence</Label>
              <Textarea placeholder="Comparable rental yields in the area range from 2.4% to 2.8% gross, after consideration of property type, location, and lease terms..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Adjustments */}
      <Card>
        <CardHeader>
          <CardTitle>Market Adjustments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Location Adjustment</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select adjustment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="superior">+10% Superior</SelectItem>
                  <SelectItem value="similar">Similar</SelectItem>
                  <SelectItem value="inferior">-5% Inferior</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Condition Adjustment</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select adjustment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="superior">+5% Superior</SelectItem>
                  <SelectItem value="similar">Similar</SelectItem>
                  <SelectItem value="inferior">-10% Inferior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Size Adjustment</Label>
              <Input placeholder="Similar" />
            </div>
            <div className="space-y-2">
              <Label>Age/Quality Adjustment</Label>
              <Input placeholder="+2% Newer" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Attributes Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Property Attributes Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Bedrooms</Label>
              <Input placeholder="3" />
            </div>
            <div className="space-y-2">
              <Label>Bathrooms</Label>
              <Input placeholder="2" />
            </div>
            <div className="space-y-2">
              <Label>Car Spaces</Label>
              <Input placeholder="2" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Building Area (sqm)</Label>
              <Input placeholder="180" />
            </div>
            <div className="space-y-2">
              <Label>Year Built</Label>
              <Input placeholder="1995" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Special Features</Label>
            <Textarea placeholder="Swimming pool, outdoor entertaining area, renovated kitchen, solar panels..." />
          </div>
        </CardContent>
      </Card>

      {/* Final Valuation */}
      <Card>
        <CardHeader>
          <CardTitle>Final Market Value Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct-comparison">Direct Comparison</SelectItem>
                  <SelectItem value="income">Income Approach</SelectItem>
                  <SelectItem value="cost">Cost Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Market Value</Label>
              <Input placeholder="$1,300,000" className="text-lg font-bold" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Valuation Rationale</Label>
            <Textarea 
              placeholder="The market value assessment is primarily based on the direct comparison method, with the income approach providing supportive evidence. The property demonstrates typical characteristics for the area with appropriate adjustments made for location, condition, size and quality differences..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Build to Rent Specific Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Build to Rent Analysis (if applicable)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* BTR Income Analysis */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">BTR Income Assessment</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Net Operating Income (NOI)</Label>
                <Input placeholder="$6,800,000" />
              </div>
              <div className="space-y-2">
                <Label>Capitalisation Rate</Label>
                <Input placeholder="4.25%" />
              </div>
              <div className="space-y-2">
                <Label>BTR Value Assessment</Label>
                <Input placeholder="$160,000,000" className="font-semibold text-lg" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Average Rent per Unit (Annual)</Label>
                <Input placeholder="$42,500" />
              </div>
              <div className="space-y-2">
                <Label>Rent per sqm (Annual)</Label>
                <Input placeholder="$680" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>BTR Income Evidence</Label>
              <Textarea placeholder="Rental evidence from comparable BTR developments indicates average rents of $650-$720 per sqm annually, with additional income from parking, storage and services..." />
            </div>
          </div>

          {/* BTR Market Factors */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">BTR Market Factors</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Market Occupancy Rate</Label>
                <Input placeholder="96.5%" />
              </div>
              <div className="space-y-2">
                <Label>Tenant Retention Rate</Label>
                <Input placeholder="78%" />
              </div>
              <div className="space-y-2">
                <Label>Market Absorption Rate</Label>
                <Input placeholder="85% in 12 months" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>BTR Market Commentary</Label>
              <Textarea placeholder="The BTR market demonstrates strong fundamentals with institutional ownership providing stability. Management expertise and economies of scale support premium rental rates compared to individual residential properties..." />
            </div>
          </div>

          {/* Total Gross Realisation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Total Gross Realisation (Individual Unit Values)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sum of Individual Unit Values</Label>
                <Input placeholder="$175,000,000" />
              </div>
              <div className="space-y-2">
                <Label>BTR Portfolio Premium/Discount</Label>
                <Input placeholder="-8.6% Portfolio Discount" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Portfolio vs Individual Unit Valuation Explanation</Label>
              <Textarea placeholder="The portfolio valuation reflects economies of scale in management, unified ownership benefits, and market liquidity considerations. Individual unit values represent hypothetical strata subdivision values..." />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}