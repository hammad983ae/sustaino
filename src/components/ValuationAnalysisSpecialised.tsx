import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ValuationAnalysisSpecialised() {
  return (
    <div className="space-y-6">
      {/* Valuation Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Valuation Methods Applied</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Income Capitalisation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Income Capitalisation Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Annual Net Income</Label>
                <Input placeholder="$180,000" />
              </div>
              <div className="space-y-2">
                <Label>Capitalisation Rate</Label>
                <Input placeholder="6.5%" />
              </div>
              <div className="space-y-2">
                <Label>Capitalised Value</Label>
                <Input placeholder="$2,770,000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cap Rate Justification</Label>
              <Textarea placeholder="Capitalisation rate reflects the specialized nature of the property, tenant covenant strength, lease terms, and comparable specialised property investment yields in the current market..." />
            </div>
          </div>

          {/* Depreciated Replacement Cost */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Depreciated Replacement Cost Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Land Value</Label>
                <Input placeholder="$800,000" />
              </div>
              <div className="space-y-2">
                <Label>Replacement Cost New</Label>
                <Input placeholder="$2,200,000" />
              </div>
              <div className="space-y-2">
                <Label>Depreciation</Label>
                <Input placeholder="$220,000" />
              </div>
              <div className="space-y-2">
                <Label>Total DRC Value</Label>
                <Input placeholder="$2,780,000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cost Method Rationale</Label>
              <Textarea placeholder="Given the specialized nature of the improvements and limited market evidence, the depreciated replacement cost method provides a reliable indication of value, with appropriate adjustments for functional and economic obsolescence..." />
            </div>
          </div>

          {/* Direct Comparison (if available) */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Direct Comparison Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Unit of Comparison</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per-bed">Per Bed</SelectItem>
                    <SelectItem value="per-room">Per Room</SelectItem>
                    <SelectItem value="per-sqm">Per sqm</SelectItem>
                    <SelectItem value="per-seat">Per Seat</SelectItem>
                    <SelectItem value="per-placement">Per Placement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Rate per Unit</Label>
                <Input placeholder="$35,000" />
              </div>
              <div className="space-y-2">
                <Label>Total Units</Label>
                <Input placeholder="80" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Comparative Value</Label>
              <Input placeholder="$2,800,000" />
            </div>
            <div className="space-y-2">
              <Label>Market Evidence</Label>
              <Textarea placeholder="Limited comparable sales evidence available due to specialized nature. Analysis based on similar specialized properties with adjustments for location, age, condition, and operational efficiency..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialized Property Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Specialized Property Attributes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aged-care">Aged Care Facility</SelectItem>
                  <SelectItem value="childcare">Childcare Centre</SelectItem>
                  <SelectItem value="medical">Medical Centre</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="workers-accommodation">Workers Accommodation</SelectItem>
                  <SelectItem value="education">Educational Facility</SelectItem>
                  <SelectItem value="leisure">Leisure/Entertainment</SelectItem>
                  <SelectItem value="service-station">Service Station</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Operational Capacity</Label>
              <Input placeholder="80 beds / 120 rooms / 300 seats" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>License/Accreditation</Label>
              <Input placeholder="ACQHS accredited, NDIS registered" />
            </div>
            <div className="space-y-2">
              <Label>Regulatory Compliance</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select compliance status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fully-compliant">Fully Compliant</SelectItem>
                  <SelectItem value="minor-issues">Minor Issues</SelectItem>
                  <SelectItem value="major-issues">Major Issues</SelectItem>
                  <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Specialized Equipment & Features</Label>
            <Textarea placeholder="Medical equipment, commercial kitchen, lift access, fire safety systems, specialized HVAC, emergency systems..." />
          </div>
        </CardContent>
      </Card>

      {/* Operating Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Operating Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Occupancy Rate</Label>
              <Input placeholder="85%" />
            </div>
            <div className="space-y-2">
              <Label>Average Rate</Label>
              <Input placeholder="$65 per day" />
            </div>
            <div className="space-y-2">
              <Label>Revenue per Unit</Label>
              <Input placeholder="$20,150 per annum" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Operating Efficiency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select efficiency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="below-average">Below Average</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Market Position</Label>
              <Input placeholder="Premium operator in local market" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment & ESG Factors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Operational Risk</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="moderate">Moderate Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Regulatory Risk</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="moderate">Moderate Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>ESG & Sustainability Features</Label>
            <Textarea placeholder="Energy efficient systems, accessibility compliance, social impact, community benefits, environmental certifications..." />
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
                  <SelectItem value="income">Income Capitalisation</SelectItem>
                  <SelectItem value="drc">Depreciated Replacement Cost</SelectItem>
                  <SelectItem value="direct-comparison">Direct Comparison</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Market Value</Label>
              <Input placeholder="$2,775,000" className="text-lg font-bold" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Valuation Rationale</Label>
            <Textarea 
              placeholder="The valuation is primarily based on the income capitalisation method given the investment nature of the property and available income evidence. The depreciated replacement cost method provides supportive evidence given the specialized nature of the improvements. Limited comparable sales require careful analysis and adjustment..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}