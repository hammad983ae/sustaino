import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ValuationAnalysisAgricultural() {
  return (
    <div className="space-y-6">
      {/* Valuation Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Valuation Methods Applied</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Productive Capacity Method */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Productive Capacity Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Carrying Capacity (DSE)</Label>
                <Input placeholder="500" />
              </div>
              <div className="space-y-2">
                <Label>Rate per DSE</Label>
                <Input placeholder="$4,200" />
              </div>
              <div className="space-y-2">
                <Label>Productive Value</Label>
                <Input placeholder="$2,100,000" />
              </div>
              <div className="space-y-2">
                <Label>Infrastructure Value</Label>
                <Input placeholder="$300,000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Total Farm Value</Label>
              <Input placeholder="$2,400,000" className="font-semibold text-lg" />
            </div>
          </div>

          {/* Direct Comparison Method */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Direct Comparison Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Total Area (hectares)</Label>
                <Input placeholder="250" />
              </div>
              <div className="space-y-2">
                <Label>Rate per hectare</Label>
                <Input placeholder="$9,600" />
              </div>
              <div className="space-y-2">
                <Label>Comparative Value</Label>
                <Input placeholder="$2,400,000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Comparable Sales Evidence</Label>
              <Textarea placeholder="Comparable agricultural sales in the region indicate rates of between $8,500 to $11,000 per hectare, after consideration of soil quality, rainfall, carrying capacity, infrastructure quality, and location relative to markets..." />
            </div>
          </div>

          {/* Income Capitalisation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Income Capitalisation Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Annual Net Income</Label>
                <Input placeholder="$96,000" />
              </div>
              <div className="space-y-2">
                <Label>Capitalisation Rate</Label>
                <Input placeholder="4.0%" />
              </div>
              <div className="space-y-2">
                <Label>Capitalised Value</Label>
                <Input placeholder="$2,400,000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Income Analysis</Label>
              <Textarea placeholder="Income based on current market leasing rates, grazing potential, and crop rotation possibilities. Capitalisation rate reflects agricultural investment market conditions and risk profile..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agricultural Attributes */}
      <Card>
        <CardHeader>
          <CardTitle>Agricultural Attributes Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Soil Quality</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Annual Rainfall</Label>
              <Input placeholder="650mm" />
            </div>
            <div className="space-y-2">
              <Label>Water Rights (ML)</Label>
              <Input placeholder="150" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Topography</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select topography" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="level">Level</SelectItem>
                  <SelectItem value="undulating">Undulating</SelectItem>
                  <SelectItem value="hilly">Hilly</SelectItem>
                  <SelectItem value="steep">Steep</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Infrastructure Quality</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Farm Type & Infrastructure</Label>
            <Textarea placeholder="Mixed farming operation with cattle yards, hay sheds, bore water, fencing in good condition, machinery shed, homestead..." />
          </div>
        </CardContent>
      </Card>

      {/* Environmental & ESG Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Environmental & ESG Considerations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Carbon Farming Potential</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select potential" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Potential</SelectItem>
                  <SelectItem value="moderate">Moderate Potential</SelectItem>
                  <SelectItem value="low">Low Potential</SelectItem>
                  <SelectItem value="none">No Potential</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Sustainability Practices</Label>
              <Input placeholder="Organic certification, regenerative farming" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Environmental Constraints</Label>
            <Textarea placeholder="Native vegetation coverage, waterway setbacks, heritage overlays, or other environmental restrictions affecting land use..." />
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
                  <SelectItem value="productive-capacity">Productive Capacity</SelectItem>
                  <SelectItem value="direct-comparison">Direct Comparison</SelectItem>
                  <SelectItem value="income">Income Capitalisation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Market Value</Label>
              <Input placeholder="$2,400,000" className="text-lg font-bold" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Valuation Rationale</Label>
            <Textarea 
              placeholder="The valuation is based primarily on the productive capacity method, supported by direct comparison and income approaches. The property demonstrates good agricultural potential with adequate infrastructure and water resources. Market conditions for agricultural land remain stable with strong investor interest..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}