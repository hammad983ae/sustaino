import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings, FileText, Calculator, AlertTriangle } from "lucide-react";

export default function PlantAndEquipment() {
  const [includeSection, setIncludeSection] = useState(true);
  const [financialReportingBasis, setFinancialReportingBasis] = useState("fair-value");
  const [entityType, setEntityType] = useState("for-profit");

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Plant and Equipment Valuation</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="include-plant-equipment" className="text-sm">Include</Label>
          <Switch 
            id="include-plant-equipment" 
            checked={includeSection}
            onCheckedChange={setIncludeSection}
          />
        </div>
      </div>

      {includeSection && (
        <div className="space-y-6">
          {/* Financial Reporting Context */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <CardTitle>Financial Reporting Context</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">AASB Compliance Required</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accounting-standard">Applicable Accounting Standard</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select accounting standard" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="aasb-116">AASB 116 Property, Plant and Equipment</SelectItem>
                      <SelectItem value="aasb-140">AASB 140 Investment Property</SelectItem>
                      <SelectItem value="aasb-5">AASB 5 Assets Held for Sale</SelectItem>
                      <SelectItem value="aasb-36">AASB 36 Impairment of Assets</SelectItem>
                      <SelectItem value="aasb-1049">AASB 1049 Whole of Government</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="measurement-basis">Measurement Basis</Label>
                  <Select value={financialReportingBasis} onValueChange={setFinancialReportingBasis}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select measurement basis" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="fair-value">Fair Value (AASB 13)</SelectItem>
                      <SelectItem value="cost-model">Cost Model</SelectItem>
                      <SelectItem value="revaluation-model">Revaluation Model</SelectItem>
                      <SelectItem value="recoverable-amount">Recoverable Amount (Impairment)</SelectItem>
                      <SelectItem value="value-in-use">Value in Use</SelectItem>
                      <SelectItem value="fair-value-less-costs">Fair Value Less Costs to Sell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="entity-type">Entity Type</Label>
                  <Select value={entityType} onValueChange={setEntityType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="for-profit">For-Profit Entity</SelectItem>
                      <SelectItem value="nfp">Not-for-Profit (NFP) Entity</SelectItem>
                      <SelectItem value="public-sector">Public Sector Entity</SelectItem>
                      <SelectItem value="government">Government Entity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="valuation-date">Valuation Date</Label>
                  <Input id="valuation-date" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="financial-year-end">Financial Year End</Label>
                <Input id="financial-year-end" type="date" placeholder="Entity's financial year end" />
              </div>
            </CardContent>
          </Card>

          {/* Asset Classification */}
          <Card>
            <CardHeader>
              <CardTitle>Asset Classification and Identification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="asset-category">Asset Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="land-buildings">Land and Buildings</SelectItem>
                      <SelectItem value="plant-machinery">Plant and Machinery</SelectItem>
                      <SelectItem value="motor-vehicles">Motor Vehicles</SelectItem>
                      <SelectItem value="furniture-fittings">Furniture and Fittings</SelectItem>
                      <SelectItem value="computer-equipment">Computer Equipment</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure Assets</SelectItem>
                      <SelectItem value="heritage-assets">Heritage Assets</SelectItem>
                      <SelectItem value="specialized-assets">Specialized Assets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="asset-use">Asset Use Classification</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset use" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="owner-occupied">Owner-Occupied</SelectItem>
                      <SelectItem value="investment">Investment Property</SelectItem>
                      <SelectItem value="held-for-sale">Held for Sale</SelectItem>
                      <SelectItem value="cash-generating">Cash-Generating</SelectItem>
                      <SelectItem value="non-cash-generating">Non-Cash-Generating</SelectItem>
                      <SelectItem value="surplus">Surplus to Requirements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="specialization-level">Level of Specialization</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization level" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="non-specialized">Non-Specialized (Market Evidence Available)</SelectItem>
                      <SelectItem value="moderately-specialized">Moderately Specialized</SelectItem>
                      <SelectItem value="highly-specialized">Highly Specialized (Limited Market)</SelectItem>
                      <SelectItem value="unique">Unique/One-off Asset</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="highest-best-use">Highest and Best Use</Label>
                  <Input id="highest-best-use" placeholder="Current use/Alternative use" />
                </div>
              </div>
              <div>
                <Label htmlFor="asset-description">Detailed Asset Description</Label>
                <Textarea 
                  id="asset-description" 
                  placeholder="Provide detailed description of the plant and equipment, including age, condition, capacity, technology, and operational characteristics..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Valuation Approaches */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-green-500" />
                <CardTitle>Valuation Approaches Applied</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Market Approach */}
              <div className="space-y-4">
                <h4 className="font-semibold text-base">Market Approach</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Market Evidence Available</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border border-border z-50">
                        <SelectItem value="abundant">Abundant Market Evidence</SelectItem>
                        <SelectItem value="limited">Limited Market Evidence</SelectItem>
                        <SelectItem value="none">No Market Evidence</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Market Value Indication</Label>
                    <Input placeholder="$0" />
                  </div>
                  <div>
                    <Label>Reliability Weighting</Label>
                    <Input placeholder="%" />
                  </div>
                </div>
                <div>
                  <Label>Market Evidence Commentary</Label>
                  <Textarea placeholder="Describe market evidence, comparability adjustments, and market conditions..." />
                </div>
              </div>

              {/* Cost Approach */}
              <div className="space-y-4">
                <h4 className="font-semibold text-base">Cost Approach (Depreciated Replacement Cost)</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Replacement Cost New</Label>
                    <Input placeholder="$0" />
                  </div>
                  <div>
                    <Label>Physical Depreciation (%)</Label>
                    <Input placeholder="%" />
                  </div>
                  <div>
                    <Label>Functional Obsolescence (%)</Label>
                    <Input placeholder="%" />
                  </div>
                  <div>
                    <Label>Economic Obsolescence (%)</Label>
                    <Input placeholder="%" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Depreciated Replacement Cost</Label>
                    <Input placeholder="$0" className="font-semibold" />
                  </div>
                  <div>
                    <Label>Effective Age (years)</Label>
                    <Input placeholder="0" />
                  </div>
                </div>
                <div>
                  <Label>Cost Approach Methodology</Label>
                  <Textarea placeholder="Describe replacement cost sources, depreciation methodology, obsolescence considerations..." />
                </div>
              </div>

              {/* Income Approach */}
              <div className="space-y-4">
                <h4 className="font-semibold text-base">Income Approach (if applicable)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Annual Income/Savings</Label>
                    <Input placeholder="$0" />
                  </div>
                  <div>
                    <Label>Capitalization Rate (%)</Label>
                    <Input placeholder="%" />
                  </div>
                  <div>
                    <Label>Income Value Indication</Label>
                    <Input placeholder="$0" />
                  </div>
                </div>
                <div>
                  <Label>Income Approach Commentary</Label>
                  <Textarea placeholder="Describe income streams, capitalization methodology, and applicability..." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NFP and Specialized Asset Considerations */}
          {entityType === "nfp" && (
            <Card className="border-orange-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <CardTitle>Not-for-Profit Entity Considerations</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-orange-300 text-orange-700">NFP Specific</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Service Capacity Approach</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select approach" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border border-border z-50">
                        <SelectItem value="modern-equivalent">Modern Equivalent Asset</SelectItem>
                        <SelectItem value="remaining-service">Remaining Service Capacity</SelectItem>
                        <SelectItem value="current-replacement">Current Replacement Cost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Obsolescence Treatment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select treatment" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border border-border z-50">
                        <SelectItem value="included">Obsolescence Included</SelectItem>
                        <SelectItem value="excluded">Obsolescence Excluded</SelectItem>
                        <SelectItem value="partial">Partial Obsolescence</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>NFP Specific Instructions</Label>
                  <Textarea placeholder="Detail specific instructions for NFP valuation basis, service capacity assessment, and obsolescence treatment..." />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Impairment Testing */}
          <Card>
            <CardHeader>
              <CardTitle>Impairment Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Carrying Amount</Label>
                  <Input placeholder="$0" className="bg-blue-50 dark:bg-blue-950/30" />
                </div>
                <div>
                  <Label>Recoverable Amount</Label>
                  <Input placeholder="$0" />
                </div>
                <div>
                  <Label>Impairment Required</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assessment result" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="no-impairment">No Impairment Required</SelectItem>
                      <SelectItem value="impairment-required">Impairment Required</SelectItem>
                      <SelectItem value="assessment-pending">Assessment Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Fair Value Less Costs to Sell</Label>
                  <Input placeholder="$0" />
                </div>
                <div>
                  <Label>Value in Use</Label>
                  <Input placeholder="$0" />
                </div>
              </div>
              <div>
                <Label>Impairment Assessment Commentary</Label>
                <Textarea placeholder="Provide assessment of recoverable amount, impairment indicators, and conclusions..." />
              </div>
            </CardContent>
          </Card>

          {/* Fair Value Hierarchy and Disclosures */}
          <Card>
            <CardHeader>
              <CardTitle>Fair Value Hierarchy and Disclosures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Fair Value Hierarchy Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hierarchy level" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="level-1">Level 1 - Quoted prices in active markets</SelectItem>
                      <SelectItem value="level-2">Level 2 - Observable inputs other than quoted prices</SelectItem>
                      <SelectItem value="level-3">Level 3 - Unobservable inputs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Valuation Technique</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Primary technique" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="market-comparison">Market Comparison</SelectItem>
                      <SelectItem value="depreciated-replacement">Depreciated Replacement Cost</SelectItem>
                      <SelectItem value="income-capitalization">Income Capitalization</SelectItem>
                      <SelectItem value="discounted-cashflow">Discounted Cash Flow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Key Unobservable Inputs</Label>
                <Textarea placeholder="Detail significant unobservable inputs used in the valuation (Level 3 inputs)..." />
              </div>
              <div>
                <Label>Sensitivity Analysis</Label>
                <Textarea placeholder="Describe sensitivity of fair value to changes in key unobservable inputs..." />
              </div>
            </CardContent>
          </Card>

          {/* Final Valuation Conclusion */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Final Valuation Conclusion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Primary Valuation Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary method" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      <SelectItem value="market">Market Approach</SelectItem>
                      <SelectItem value="cost">Cost Approach (DRC)</SelectItem>
                      <SelectItem value="income">Income Approach</SelectItem>
                      <SelectItem value="hybrid">Hybrid Approach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Final Fair Value / Carrying Amount</Label>
                  <Input placeholder="$0" className="text-lg font-bold" />
                </div>
              </div>
              <div>
                <Label>Valuation Rationale and Conclusion</Label>
                <Textarea 
                  placeholder="Provide comprehensive rationale for the valuation conclusion, method selection, key assumptions, and compliance with applicable accounting standards..."
                  rows={4}
                />
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium mb-2">Financial Reporting Compliance Statement:</p>
                <p className="text-sm">
                  This valuation has been prepared in accordance with applicable Australian Accounting Standards and International Valuation Standards for financial reporting purposes. The valuation reflects the requirements of {financialReportingBasis === 'fair-value' ? 'AASB 13 Fair Value Measurement' : 'the specified measurement basis'} and is suitable for inclusion in the entity's financial statements.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}