import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  TrendingUp, 
  Calculator, 
  FileText,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export const PlantMachineryFinancial = () => {
  const [assetValue, setAssetValue] = useState("");
  const [depreciationRate, setDepreciationRate] = useState("");
  const [usefulLife, setUsefulLife] = useState("");

  const calculateDepreciation = () => {
    const value = parseFloat(assetValue);
    const rate = parseFloat(depreciationRate);
    if (value && rate) {
      return (value * rate / 100).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-green-100">
          <Settings className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Plant & Machinery Financial Analysis</h2>
          <p className="text-gray-600">Comprehensive financial assessment and valuation</p>
        </div>
      </div>

      {/* Asset Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Asset Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="asset-name">Asset Name/Description</Label>
              <Input id="asset-name" placeholder="e.g., Manufacturing Equipment Line A" />
            </div>
            <div>
              <Label htmlFor="asset-category">Category</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Manufacturing Equipment</option>
                <option>Office Equipment</option>
                <option>Computer Hardware</option>
                <option>Vehicles</option>
                <option>Furniture & Fixtures</option>
                <option>Specialized Machinery</option>
              </select>
            </div>
            <div>
              <Label htmlFor="purchase-date">Purchase Date</Label>
              <Input id="purchase-date" type="date" />
            </div>
            <div>
              <Label htmlFor="purchase-cost">Original Cost</Label>
              <Input 
                id="purchase-cost" 
                type="number" 
                placeholder="$0.00"
                value={assetValue}
                onChange={(e) => setAssetValue(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Depreciation Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Depreciation Analysis
          </CardTitle>
          <Badge variant="secondary">AASB 116 Compliant</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="depreciation-method">Depreciation Method</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Straight Line</option>
                <option>Diminishing Value</option>
                <option>Units of Production</option>
                <option>Sum of Years Digits</option>
              </select>
            </div>
            <div>
              <Label htmlFor="useful-life">Useful Life (Years)</Label>
              <Input 
                id="useful-life" 
                type="number" 
                placeholder="10"
                value={usefulLife}
                onChange={(e) => setUsefulLife(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="salvage-value">Salvage Value</Label>
              <Input id="salvage-value" type="number" placeholder="$0.00" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="annual-depreciation-rate">Annual Depreciation Rate (%)</Label>
              <Input 
                id="annual-depreciation-rate" 
                type="number" 
                placeholder="10"
                value={depreciationRate}
                onChange={(e) => setDepreciationRate(e.target.value)}
              />
            </div>
            <div>
              <Label>Annual Depreciation Amount</Label>
              <div className="p-2 bg-gray-50 border rounded-md font-semibold">
                ${calculateDepreciation()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Valuation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Current Market Value Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Market Approach */}
          <div className="space-y-4">
            <h4 className="font-semibold">Market Approach</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Comparable Sales Data</Label>
                <Input placeholder="$0.00" />
              </div>
              <div>
                <Label>Market Adjustment Factor</Label>
                <Input placeholder="1.0" />
              </div>
              <div>
                <Label>Market Value Indication</Label>
                <Input placeholder="$0.00" className="font-semibold bg-blue-50" />
              </div>
            </div>
          </div>

          {/* Cost Approach */}
          <div className="space-y-4">
            <h4 className="font-semibold">Cost Approach (Replacement Cost)</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Replacement Cost New</Label>
                <Input placeholder="$0.00" />
              </div>
              <div>
                <Label>Physical Depreciation (%)</Label>
                <Input placeholder="25" />
              </div>
              <div>
                <Label>Functional Obsolescence (%)</Label>
                <Input placeholder="5" />
              </div>
              <div>
                <Label>Depreciated Value</Label>
                <Input placeholder="$0.00" className="font-semibold bg-green-50" />
              </div>
            </div>
          </div>

          {/* Income Approach */}
          <div className="space-y-4">
            <h4 className="font-semibold">Income Approach</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Annual Income Generated</Label>
                <Input placeholder="$0.00" />
              </div>
              <div>
                <Label>Capitalization Rate (%)</Label>
                <Input placeholder="8" />
              </div>
              <div>
                <Label>Income Value Indication</Label>
                <Input placeholder="$0.00" className="font-semibold bg-purple-50" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impairment Testing */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Impairment Testing (AASB 136)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Carrying Amount</Label>
              <Input placeholder="$0.00" className="bg-blue-50" />
            </div>
            <div>
              <Label>Recoverable Amount</Label>
              <Input placeholder="$0.00" />
            </div>
            <div>
              <Label>Impairment Loss</Label>
              <Input placeholder="$0.00" className="bg-red-50" />
            </div>
          </div>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <p className="font-semibold text-yellow-800">Impairment Indicators</p>
            </div>
            <ul className="mt-2 text-sm text-yellow-700 space-y-1">
              <li>• Significant decline in market value</li>
              <li>• Changes in technological environment</li>
              <li>• Evidence of obsolescence or damage</li>
              <li>• Adverse changes in asset usage</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Financial Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Statement Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Balance Sheet Impact</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Gross Carrying Amount:</span>
                  <span className="font-semibold">${assetValue || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accumulated Depreciation:</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Net Carrying Amount:</span>
                  <span className="font-bold">${assetValue || '0.00'}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">P&L Impact</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Annual Depreciation:</span>
                  <span className="font-semibold">${calculateDepreciation()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impairment Loss:</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Total P&L Impact:</span>
                  <span className="font-bold">${calculateDepreciation()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Label htmlFor="valuation-notes">Valuation Notes & Commentary</Label>
            <Textarea 
              id="valuation-notes"
              placeholder="Provide detailed commentary on valuation methodology, assumptions, market conditions, and any specific considerations..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button className="flex-1">
          <CheckCircle className="h-4 w-4 mr-2" />
          Save Valuation
        </Button>
        <Button variant="outline" className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>
    </div>
  );
};