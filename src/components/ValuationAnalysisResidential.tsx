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
                <Input value="850" />
              </div>
              <div className="space-y-2">
                <Label>Land Rate per sqm</Label>
                <Input value="$200" />
              </div>
              <div className="space-y-2">
                <Label>Land Value</Label>
                <Input value="$170,000" />
              </div>
              <div className="space-y-2">
                <Label>Improvement Value</Label>
                <Input value="$105,000" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total Market Value</Label>
                <Input value="$275,000" className="font-semibold text-lg" />
              </div>
              <div className="space-y-2">
                <Label>Rate per sqm (Total)</Label>
                <Input value="$324" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Market Evidence Supporting Rates</Label>
              <Textarea value="**DIRECT COMPARISON ANALYSIS:**\n\nComparable sales evidence from recent transactions in the Deakin Avenue area indicates land rates of between $180 to $220 per sqm for established residential allotments. The subject property's land rate of $200/sqm reflects:\n\n• Good location within established residential precinct\n• Regular rectangular allotment configuration\n• Proximity to CBD (1.2km) and amenities\n• Established infrastructure and services\n• Mature neighbourhood character\n\n**IMPROVEMENT VALUATION:**\nImprovement rates of $875/sqm are consistent with renovated 1960s brick veneer dwellings considering:\n\n• Recent kitchen renovation with stone benchtops\n• Updated bathroom with modern fixtures\n• Well-maintained structure with good remaining life\n• Functional layout suitable for modern living\n• Quality of construction and materials\n\n**MARKET POSITIONING:**\nThe assessed rates reflect current market conditions where buyers are paying premiums for renovated properties in established locations. The combination of location, condition, and improvements supports the land and improvement rates adopted." rows={8} />
            </div>
          </div>

          {/* Income Approach (if investment property) */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Income Approach (Investment Properties)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Annual Rental Income</Label>
                <Input value="$15,600" />
              </div>
              <div className="space-y-2">
                <Label>Gross Yield</Label>
                <Input value="5.67%" />
              </div>
              <div className="space-y-2">
                <Label>Capitalised Value</Label>
                <Input value="$275,000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Yield Evidence</Label>
              <Textarea value="Comparable rental yields in the Mildura residential market range from 5.2% to 6.1% gross, with 3-bedroom properties in established areas achieving $300-$320 per week. The assessed rental of $300/week reflects the property's condition, location proximity to CBD, and recent improvements to kitchen and bathroom facilities." />
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
              <Input value="3" />
            </div>
            <div className="space-y-2">
              <Label>Bathrooms</Label>
              <Input value="1" />
            </div>
            <div className="space-y-2">
              <Label>Car Spaces</Label>
              <Input value="2" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Building Area (sqm)</Label>
              <Input value="120" />
            </div>
            <div className="space-y-2">
              <Label>Year Built</Label>
              <Input value="1965" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Special Features</Label>
            <Textarea value="Recently renovated kitchen with stone benchtops and stainless steel appliances, updated bathroom with modern fixtures, established gardens with mature fruit trees, secure fencing, concrete driveway, separate laundry, ducted evaporative cooling, ceiling fans throughout." />
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
              <Input value="$275,000" className="text-lg font-bold" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Valuation Rationale</Label>
            <Textarea 
              value="**VALUATION METHODOLOGY & CONCLUSION:**\n\nThe market value assessment of **$275,000** is primarily based on the direct comparison method, considered most reliable for residential properties in established markets.\n\n**PRIMARY EVIDENCE - DIRECT COMPARISON:**\n• 522 Deakin Avenue: $295,000 (Sep 2024) - Superior presentation\n• 518 Deakin Avenue: $275,000 (Aug 2024) - Comparable condition\n• 516 Deakin Avenue: $265,000 (Jul 2024) - Requires renovation\n• 498 Deakin Avenue: $289,000 (Oct 2024) - Similar attributes\n\n**SUPPORTING EVIDENCE - INCOME APPROACH:**\nRental assessment of $300/week ($15,600 annually) produces 5.67% gross yield, consistent with:\n• Local investor expectations (5.2% - 6.1% range)\n• Regional residential investment fundamentals\n• Current rental market evidence\n\n**VALUATION RELIABILITY:**\nStrong market evidence provides high confidence in assessed value. The property's renovated condition, established location, and market positioning support the conclusion that $275,000 represents fair market value as at inspection date.\n\n**MARKET OUTLOOK:**\nCurrent market conditions suggest stable demand with potential for moderate capital growth over medium term, supported by Mildura's economic fundamentals and population growth projections."
              rows={8}
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