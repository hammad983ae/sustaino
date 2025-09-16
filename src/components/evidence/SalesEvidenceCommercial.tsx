import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, MapPin, Calculator, TrendingUp, TrendingDown, Minus } from "lucide-react";
import PropertyAdjustmentTable from './PropertyAdjustmentTable';
import { PropertyAttributes, SubjectProperty } from '@/lib/valuationAdjustments';

export default function SalesEvidenceCommercial() {
  const [saleDate, setSaleDate] = useState(true);
  const [salePrice, setSalePrice] = useState(true);
  const [incentives, setIncentives] = useState(true);
  const [buildingArea, setBuildingArea] = useState(true);
  const [landArea, setLandArea] = useState(true);
  const [carParking, setCarParking] = useState(true);
  const [tenancy, setTenancy] = useState(true);
  const [leaseTerms, setLeaseTerms] = useState(true);
  const [grossRent, setGrossRent] = useState(true);
  const [netRent, setNetRent] = useState(true);
  const [outgoings, setOutgoings] = useState(true);
  const [landTax, setLandTax] = useState(true);
  const [noi, setNoi] = useState(true);
  const [grossYield, setGrossYield] = useState(true);
  const [netYield, setNetYield] = useState(true);
  const [noiYield, setNoiYield] = useState(true);
  const [yieldRate, setYieldRate] = useState(true);
  const [zoning, setZoning] = useState(true);
  const [buildingCondition, setBuildingCondition] = useState(true);
  const [streetAccess, setStreetAccess] = useState(true);
  const [esgScore, setEsgScore] = useState(true);
  const [showAdjustmentTable, setShowAdjustmentTable] = useState(false);

  // Sample subject property for demonstration
  const subjectProperty: SubjectProperty = {
    salePrice: 0, // Not applicable for subject
    saleDate: new Date().toISOString(),
    landArea: 850,
    livingArea: 450, // Building area
    bedrooms: 0, // Commercial properties typically don't have bedrooms
    bathrooms: 2,
    carSpaces: 20,
    yearBuilt: 2018,
    condition: 'good' as const,
    location: 'similar' as const,
    marketConditions: 'stable' as const,
    improvements: 75000,
    zoning: 'Commercial 1'
  };

  // Sample comparable property for demonstration  
  const comparableProperty: PropertyAttributes = {
    salePrice: 2500000,
    saleDate: '2024-03-01',
    landArea: 800,
    livingArea: 400, // Building area
    bedrooms: 0,
    bathrooms: 1,
    carSpaces: 15,
    yearBuilt: 2015,
    condition: 'fair' as const,
    location: 'similar' as const,
    marketConditions: 'stable' as const,
    improvements: 60000,
    zoning: 'Commercial 1'
  };

  // Helper function to format percentage adjustments
  const formatPercentage = (percentage: number): string => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(1)}%`;
  };

  // Helper function to format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to get adjustment icon
  const getAdjustmentIcon = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      default:
        return <Minus className="h-3 w-3 text-gray-400" />;
    }
  };

  // Sample adjustment calculations for demonstration
  const getSampleAdjustment = (attribute: string) => {
    const adjustments: Record<string, { percentage: number; dollar: number; type: 'positive' | 'negative' | 'neutral' }> = {
      'Land Area': { percentage: 2.8, dollar: 70000, type: 'positive' },
      'Building Area': { percentage: 4.2, dollar: 105000, type: 'positive' },
      'Car Parking': { percentage: 3.0, dollar: 75000, type: 'positive' },
      'Building Condition': { percentage: 5.0, dollar: 125000, type: 'positive' },
      'Sale Date': { percentage: -1.2, dollar: -30000, type: 'negative' },
      'ESG Score': { percentage: 2.5, dollar: 62500, type: 'positive' }
    };
    
    return adjustments[attribute] || { percentage: 0, dollar: 0, type: 'neutral' };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Commercial Sales Evidence</h3>
          
          {/* Property Address Input */}
          <div className="mb-6">
            <div className="flex items-center gap-2 p-3 border border-primary rounded-lg bg-primary/5">
              <Input 
                placeholder="Property Address: Eg. 101 King Avenue Middle Park VIC 3206"
                className="border-0 bg-transparent text-sm font-medium placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center bg-muted/20">
              <div className="flex flex-col items-center justify-center space-y-3">
                <Upload className="h-8 w-8 text-muted-foreground/40" />
                <div>
                  <Button variant="outline" size="sm">Upload Image/Map</Button>
                  <p className="text-sm text-muted-foreground mt-2">Property photo or location map</p>
                </div>
              </div>
            </div>
            
            <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/10">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Map unavailable – missing location data</span>
              </div>
            </div>
          </div>

          {/* Attributes Table */}
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium border-b pb-2">
              <div>Attribute</div>
              <div className="text-center">Include</div>
              <div>Value</div>
              <div>Comparison to Subject</div>
              <div className="text-center">+/- Value</div>
              <div className="text-right">$ Value</div>
            </div>

            {/* Sale Date */}
            <div className="grid grid-cols-6 gap-4 items-center py-2">
              <Label>Sale Date</Label>
              <div className="flex justify-center">
                <Switch checked={saleDate} onCheckedChange={setSaleDate} />
              </div>
              <Input placeholder="01 March 2024" className="text-sm" />
              <Input placeholder="Comparison notes for sale date..." className="text-sm" />
              {(() => {
                const adj = getSampleAdjustment('Sale Date');
                return (
                  <>
                    <div className="flex items-center justify-center gap-1 text-red-600">
                      {getAdjustmentIcon(adj.type)}
                      <span className="text-sm font-medium">{formatPercentage(adj.percentage)}</span>
                    </div>
                    <div className="text-right text-sm font-medium text-red-600">
                      {formatCurrency(adj.dollar)}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Sale Price */}
            <div className="grid grid-cols-6 gap-4 items-center py-2">
              <Label>Sale Price</Label>
              <div className="flex justify-center">
                <Switch checked={salePrice} onCheckedChange={setSalePrice} />
              </div>
              <Input placeholder="$2,500,000" className="text-sm" />
              <Input placeholder="Price comparison analysis..." className="text-sm" />
              <div className="flex items-center justify-center gap-1 text-gray-400">
                <Minus className="h-3 w-3" />
                <span className="text-sm">Base</span>
              </div>
              <div className="text-right text-sm text-gray-600">
                {formatCurrency(2500000)}
              </div>
            </div>

            {/* Incentives */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Incentives</Label>
              <div className="flex justify-center">
                <Switch checked={incentives} onCheckedChange={setIncentives} />
              </div>
              <Input placeholder="Vendor contributions, fit-out" className="text-sm" />
              <Input placeholder="Incentives comparison..." className="text-sm" />
            </div>

            {/* Building Area */}
            <div className="grid grid-cols-6 gap-4 items-center py-2">
              <Label>Building Area</Label>
              <div className="flex justify-center">
                <Switch checked={buildingArea} onCheckedChange={setBuildingArea} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="450" className="text-sm" />
                <Select>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="sqm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sqm">sqm</SelectItem>
                    <SelectItem value="sqft">sqft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Building area comparison..." className="text-sm" />
              {(() => {
                const adj = getSampleAdjustment('Building Area');
                return (
                  <>
                    <div className="flex items-center justify-center gap-1 text-green-600">
                      {getAdjustmentIcon(adj.type)}
                      <span className="text-sm font-medium">{formatPercentage(adj.percentage)}</span>
                    </div>
                    <div className="text-right text-sm font-medium text-green-600">
                      +{formatCurrency(adj.dollar)}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Land Area */}
            <div className="grid grid-cols-6 gap-4 items-center py-2">
              <Label>Land Area</Label>
              <div className="flex justify-center">
                <Switch checked={landArea} onCheckedChange={setLandArea} />
              </div>
              <div className="flex gap-2">
                <Input placeholder="850" className="text-sm" />
                <Select>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="sqm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sqm">sqm</SelectItem>
                    <SelectItem value="hectares">hectares</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Land area comparison..." className="text-sm" />
              {(() => {
                const adj = getSampleAdjustment('Land Area');
                return (
                  <>
                    <div className="flex items-center justify-center gap-1 text-green-600">
                      {getAdjustmentIcon(adj.type)}
                      <span className="text-sm font-medium">{formatPercentage(adj.percentage)}</span>
                    </div>
                    <div className="text-right text-sm font-medium text-green-600">
                      +{formatCurrency(adj.dollar)}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Car Parking */}
            <div className="grid grid-cols-6 gap-4 items-center py-2">
              <Label>Car Parking</Label>
              <div className="flex justify-center">
                <Switch checked={carParking} onCheckedChange={setCarParking} />
              </div>
              <Input placeholder="20 spaces" className="text-sm" />
              <Input placeholder="Parking comparison..." className="text-sm" />
              {(() => {
                const adj = getSampleAdjustment('Car Parking');
                return (
                  <>
                    <div className="flex items-center justify-center gap-1 text-green-600">
                      {getAdjustmentIcon(adj.type)}
                      <span className="text-sm font-medium">{formatPercentage(adj.percentage)}</span>
                    </div>
                    <div className="text-right text-sm font-medium text-green-600">
                      +{formatCurrency(adj.dollar)}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Tenancy */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Tenancy</Label>
              <div className="flex justify-center">
                <Switch checked={tenancy} onCheckedChange={setTenancy} />
              </div>
              <Input placeholder="Single tenant" className="text-sm" />
              <Input placeholder="Tenancy comparison..." className="text-sm" />
            </div>

            {/* Lease Terms */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Lease Terms</Label>
              <div className="flex justify-center">
                <Switch checked={leaseTerms} onCheckedChange={setLeaseTerms} />
              </div>
              <Input placeholder="5 year + 3+3 options" className="text-sm" />
              <Input placeholder="Lease terms comparison..." className="text-sm" />
            </div>

            {/* Gross Rent */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Gross Rent</Label>
              <div className="flex justify-center">
                <Switch checked={grossRent} onCheckedChange={setGrossRent} />
              </div>
              <Input placeholder="$135,000 p.a." className="text-sm" />
              <Input placeholder="Gross rent comparison..." className="text-sm" />
            </div>

            {/* Outgoings */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Outgoings</Label>
              <div className="flex justify-center">
                <Switch checked={outgoings} onCheckedChange={setOutgoings} />
              </div>
              <Input placeholder="$15,000 p.a." className="text-sm" />
              <Input placeholder="Outgoings comparison..." className="text-sm" />
            </div>

            {/* Net Rent */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Net Rent</Label>
              <div className="flex justify-center">
                <Switch checked={netRent} onCheckedChange={setNetRent} />
              </div>
              <Input placeholder="$120,000 p.a." className="text-sm" />
              <Input placeholder="Net rent comparison..." className="text-sm" />
            </div>

            {/* Land Tax (Non Recoverable) */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Land Tax (Non Recoverable)</Label>
              <div className="flex justify-center">
                <Switch checked={landTax} onCheckedChange={setLandTax} />
              </div>
              <Input placeholder="$5,000 p.a." className="text-sm" />
              <Input placeholder="Land tax comparison..." className="text-sm" />
            </div>

            {/* NOI (excl. CAJST) */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>NOI (excl. CAJST)</Label>
              <div className="flex justify-center">
                <Switch checked={noi} onCheckedChange={setNoi} />
              </div>
              <Input placeholder="$115,000 p.a." className="text-sm" />
              <Input placeholder="NOI comparison..." className="text-sm" />
            </div>

            {/* Gross Yield */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Gross Yield</Label>
              <div className="flex justify-center">
                <Switch checked={grossYield} onCheckedChange={setGrossYield} />
              </div>
              <Input placeholder="5.4%" className="text-sm" />
              <Input placeholder="Gross yield comparison..." className="text-sm" />
            </div>

            {/* Net Yield */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Net Yield</Label>
              <div className="flex justify-center">
                <Switch checked={netYield} onCheckedChange={setNetYield} />
              </div>
              <Input placeholder="4.8%" className="text-sm" />
              <Input placeholder="Net yield comparison..." className="text-sm" />
            </div>

            {/* NOI Yield */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>NOI Yield</Label>
              <div className="flex justify-center">
                <Switch checked={noiYield} onCheckedChange={setNoiYield} />
              </div>
              <Input placeholder="4.6%" className="text-sm" />
              <Input placeholder="NOI yield comparison..." className="text-sm" />
            </div>

            {/* Yield Rate */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Yield Rate</Label>
              <div className="flex justify-center">
                <Switch checked={yieldRate} onCheckedChange={setYieldRate} />
              </div>
              <Input placeholder="4.8%" className="text-sm" />
              <Input placeholder="Yield rate comparison..." className="text-sm" />
            </div>

            {/* Zoning */}
            <div className="grid grid-cols-4 gap-4 items-center py-2">
              <Label>Zoning</Label>
              <div className="flex justify-center">
                <Switch checked={zoning} onCheckedChange={setZoning} />
              </div>
              <Input placeholder="Commercial 1 Zone" className="text-sm" />
              <Input placeholder="Zoning comparison..." className="text-sm" />
            </div>

            {/* Building Condition */}
            <div className="grid grid-cols-6 gap-4 items-center py-2">
              <Label>Building Condition</Label>
              <div className="flex justify-center">
                <Switch checked={buildingCondition} onCheckedChange={setBuildingCondition} />
              </div>
              <Input placeholder="Good condition" className="text-sm" />
              <Input placeholder="Building condition comparison..." className="text-sm" />
              {(() => {
                const adj = getSampleAdjustment('Building Condition');
                return (
                  <>
                    <div className="flex items-center justify-center gap-1 text-green-600">
                      {getAdjustmentIcon(adj.type)}
                      <span className="text-sm font-medium">{formatPercentage(adj.percentage)}</span>
                    </div>
                    <div className="text-right text-sm font-medium text-green-600">
                      +{formatCurrency(adj.dollar)}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* ESG Score */}
            <div className="grid grid-cols-6 gap-4 items-center py-2">
              <Label>ESG Score</Label>
              <div className="flex justify-center">
                <Switch checked={esgScore} onCheckedChange={setEsgScore} />
              </div>
              <Input placeholder="7.5/10" className="text-sm" />
              <Input placeholder="ESG score comparison..." className="text-sm" />
              {(() => {
                const adj = getSampleAdjustment('ESG Score');
                return (
                  <>
                    <div className="flex items-center justify-center gap-1 text-green-600">
                      {getAdjustmentIcon(adj.type)}
                      <span className="text-sm font-medium">{formatPercentage(adj.percentage)}</span>
                    </div>
                    <div className="text-right text-sm font-medium text-green-600">
                      +{formatCurrency(adj.dollar)}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Total Adjustments Row */}
            <div className="grid grid-cols-6 gap-4 items-center py-3 border-t-2 bg-gray-50 font-bold">
              <div></div>
              <div></div>
              <div className="text-sm font-bold">TOTAL ADJUSTMENTS</div>
              <div className="text-sm">Net adjustment to comparable</div>
              <div className="flex items-center justify-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="font-bold">+16.3%</span>
              </div>
              <div className="text-right font-bold text-green-600 text-lg">
                +{formatCurrency(407500)}
              </div>
            </div>

            {/* Adjusted Value Row */}
            <div className="grid grid-cols-6 gap-4 items-center py-3 bg-blue-50 border-t">
              <div></div>
              <div></div>
              <div className="text-sm font-bold text-blue-900">ADJUSTED SALE PRICE</div>
              <div className="text-sm text-blue-700">Indicates value of subject</div>
              <div></div>
              <div className="text-right font-bold text-blue-900 text-xl">
                {formatCurrency(2907500)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <Button variant="outline">
              Add Sale Evidence
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setShowAdjustmentTable(!showAdjustmentTable)}
            >
              <Calculator className="h-4 w-4 mr-2" />
              {showAdjustmentTable ? 'Hide' : 'Show'} Advanced Analysis
            </Button>
          </div>
          
          {showAdjustmentTable && (
            <div className="mt-6">
              <PropertyAdjustmentTable
                comparable={comparableProperty}
                subject={subjectProperty}
                onAdjustmentChange={(adjustments) => {
                  console.log('Adjustments updated:', adjustments);
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}