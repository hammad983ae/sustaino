import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ValuationAnalysisCommercial() {
  return (
    <div className="space-y-6">
      {/* Valuation Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Valuation Methods Applied</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Capitalisation Approach */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Income Capitalisation Approach</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Net Operating Income</Label>
                <Input placeholder="$120,000" />
              </div>
              <div className="space-y-2">
                <Label>Capitalisation Rate</Label>
                <Input placeholder="5.50%" />
              </div>
              <div className="space-y-2">
                <Label>Capitalised Value</Label>
                <Input placeholder="$2,180,000" className="font-semibold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Market Evidence Supporting Cap Rate</Label>
              <Textarea placeholder="Comparable sales evidence indicates yields of between 5.19% to 6.38%, after consideration of location, quality and size of improvements, ESG, economic and market activity, lease strength and covenant..." />
            </div>
          </div>

          {/* Direct Comparison */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Direct Comparison Approach</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Building Area (sqm)</Label>
                <Input placeholder="450" />
              </div>
              <div className="space-y-2">
                <Label>Rate per sqm</Label>
                <Input placeholder="$4,800" />
              </div>
              <div className="space-y-2">
                <Label>Building Value</Label>
                <Input placeholder="$2,160,000" />
              </div>
              <div className="space-y-2">
                <Label>Total Value</Label>
                <Input placeholder="$2,160,000" className="font-semibold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Market Evidence Supporting Rate</Label>
              <Textarea placeholder="Comparable sales evidence indicates rates of between $167 per/sqm to $371 per/sqm, after consideration of location, quality and size of improvements, balance land, economic and market activity..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sensitivity Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Sensitivity Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2 text-left">Scenario</th>
                  <th className="border border-border p-2">Net Rent</th>
                  <th className="border border-border p-2">MRDC's</th>
                  <th className="border border-border p-2">NOI</th>
                  <th className="border border-border p-2">Cap Rate</th>
                  <th className="border border-border p-2">Market Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2 font-medium">Optimistic</td>
                  <td className="border border-border p-2"><Input placeholder="$80,718" className="text-sm" /></td>
                  <td className="border border-border p-2"><Input placeholder="$4,000" className="text-sm" /></td>
                  <td className="border border-border p-2"><Input placeholder="$76,718" className="text-sm" /></td>
                  <td className="border border-border p-2"><Input placeholder="5.50%" className="text-sm" /></td>
                  <td className="border border-border p-2"><Input placeholder="$1,394,000" className="text-sm font-semibold" /></td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-medium">Realistic</td>
                  <td className="border border-border p-2"><Input placeholder="$80,718" className="text-sm" /></td>
                  <td className="border border-border p-2"><Input placeholder="$4,000" className="text-sm" /></td>
                  <td className="border border-border p-2"><Input placeholder="$76,718" className="text-sm" /></td>
                  <td className="border border-border p-2"><Input placeholder="5.75%" className="text-sm" /></td>
                  <td className="border border-border p-2"><Input placeholder="$1,334,000" className="text-sm font-semibold" /></td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-medium">Pessimistic</td>
                  <td className="border border-border p-2"><Input placeholder="$80,718" className="text-sm" /></td>
                  <td className="border border-border p-2"><Input placeholder="$4,000" className="text-sm" /></td>
                  <td className="border border-border p-2"><Input placeholder="$76,718" className="text-sm" /></td>
                  <td className="border border-border p-2"><Input placeholder="6.00%" className="text-sm" /></td>
                  <td className="border border-border p-2"><Input placeholder="$1,279,000" className="text-sm font-semibold" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Capital Adjustments */}
      <Card>
        <CardHeader>
          <CardTitle>Capital Adjustments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Letting Up Allowance</Label>
              <Input placeholder="$13,453" />
            </div>
            <div className="space-y-2">
              <Label>Other Adjustments</Label>
              <Input placeholder="$3,000" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Reletting Costs</Label>
            <Input placeholder="$5,000" />
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
                  <SelectItem value="capitalisation">Income Capitalisation</SelectItem>
                  <SelectItem value="direct-comparison">Direct Comparison</SelectItem>
                  <SelectItem value="cost">Cost Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Market Value</Label>
              <Input placeholder="$1,315,000" className="text-lg font-bold" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Valuation Rationale</Label>
            <Textarea 
              placeholder="In determining value, we have made an allowance for land tax and property management fees as non-recoverable outgoings to assess our NOI. And made capital adjustments including contingency for unknown costs and repairs and maintenance, vacancy allowance, reletting costs..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}