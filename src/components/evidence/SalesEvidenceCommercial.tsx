import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, MapPin, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SaleData {
  address: string;
  saleDate: string;
  salePrice: string;
  incentives: string;
  buildingArea: string;
  landArea: string;
  netRent: string;
  yieldRate: string;
  tenancy: string;
  lease: string;
  [key: string]: string;
}

export default function SalesEvidenceCommercial() {
  const [salesData, setSalesData] = useState<SaleData[]>([
    { address: "", saleDate: "", salePrice: "", incentives: "", buildingArea: "", landArea: "", netRent: "", yieldRate: "", tenancy: "", lease: "" },
    { address: "", saleDate: "", salePrice: "", incentives: "", buildingArea: "", landArea: "", netRent: "", yieldRate: "", tenancy: "", lease: "" },
    { address: "", saleDate: "", salePrice: "", incentives: "", buildingArea: "", landArea: "", netRent: "", yieldRate: "", tenancy: "", lease: "" }
  ]);

  const [includeAttributes, setIncludeAttributes] = useState({
    saleDate: true,
    salePrice: true,
    incentives: true,
    buildingArea: true,
    landArea: true,
    carParking: true,
    tenancy: true,
    lease: true,
    netRent: true,
    outgoings: true,
    yieldRate: true,
    zoning: true,
    buildingCondition: true,
    streetAccess: true,
  });

  const updateSaleData = (saleIndex: number, field: string, value: string) => {
    setSalesData(prev => prev.map((sale, index) => 
      index === saleIndex ? { ...sale, [field]: value } : sale
    ));
  };

  const toggleAttribute = (attribute: string) => {
    setIncludeAttributes(prev => ({
      ...prev,
      [attribute]: !prev[attribute]
    }));
  };

  const AttributeRow = ({ 
    label, 
    attribute, 
    placeholder, 
    unit 
  }: { 
    label: string; 
    attribute: string; 
    placeholder: string; 
    unit?: string;
  }) => (
    <div className="grid grid-cols-12 gap-3 items-center py-3 border-b border-muted/30">
      <div className="col-span-2">
        <Label className="text-sm font-medium">{label}</Label>
      </div>
      <div className="col-span-1 flex justify-center">
        <Switch 
          checked={includeAttributes[attribute as keyof typeof includeAttributes]} 
          onCheckedChange={() => toggleAttribute(attribute)}
        />
      </div>
      <div className="col-span-3">
        <div className="flex gap-1">
          <Input 
            placeholder={placeholder}
            className="text-sm"
            value={salesData[0][attribute] || ""}
            onChange={(e) => updateSaleData(0, attribute, e.target.value)}
          />
          {unit && <span className="text-xs text-muted-foreground self-center">{unit}</span>}
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex gap-1">
          <Input 
            placeholder={placeholder}
            className="text-sm"
            value={salesData[1][attribute] || ""}
            onChange={(e) => updateSaleData(1, attribute, e.target.value)}
          />
          {unit && <span className="text-xs text-muted-foreground self-center">{unit}</span>}
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex gap-1">
          <Input 
            placeholder={placeholder}
            className="text-sm"
            value={salesData[2][attribute] || ""}
            onChange={(e) => updateSaleData(2, attribute, e.target.value)}
          />
          {unit && <span className="text-xs text-muted-foreground self-center">{unit}</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Commercial Sales Evidence
            <Badge variant="secondary" className="ml-2">3 Settled Sales Required</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-3 items-center pb-3 border-b-2 border-primary/20">
            <div className="col-span-2">
              <Label className="text-sm font-semibold">Attribute</Label>
            </div>
            <div className="col-span-1 text-center">
              <Label className="text-sm font-semibold">Include</Label>
            </div>
            <div className="col-span-3 text-center">
              <Label className="text-sm font-semibold">Sale 1 (Settled)</Label>
            </div>
            <div className="col-span-3 text-center">
              <Label className="text-sm font-semibold">Sale 2 (Settled)</Label>
            </div>
            <div className="col-span-3 text-center">
              <Label className="text-sm font-semibold">Sale 3 (Settled)</Label>
            </div>
          </div>

          {/* Property Addresses */}
          <div className="grid grid-cols-12 gap-3 items-center py-3 bg-primary/5 rounded-lg px-3">
            <div className="col-span-2">
              <Label className="text-sm font-semibold">Property Address</Label>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <Input 
                placeholder="101 King Avenue Middle Park VIC 3206"
                className="text-sm border-primary/30"
                value={salesData[0].address}
                onChange={(e) => updateSaleData(0, 'address', e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <Input 
                placeholder="102 Queen Street Carlton VIC 3053"
                className="text-sm border-primary/30"
                value={salesData[1].address}
                onChange={(e) => updateSaleData(1, 'address', e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <Input 
                placeholder="103 Collins Street Melbourne VIC 3000"
                className="text-sm border-primary/30"
                value={salesData[2].address}
                onChange={(e) => updateSaleData(2, 'address', e.target.value)}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((saleNum) => (
              <div key={saleNum} className="space-y-2">
                <Label className="text-sm font-medium">Sale {saleNum} Image</Label>
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center bg-muted/10">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-6 w-6 text-muted-foreground/40" />
                    <Button variant="outline" size="sm">Upload</Button>
                    <p className="text-xs text-muted-foreground">Property photo</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sales Attributes */}
          <div className="space-y-1">
            <AttributeRow 
              label="Sale Date" 
              attribute="saleDate" 
              placeholder="01 March 2024"
            />
            
            <AttributeRow 
              label="Sale Price" 
              attribute="salePrice" 
              placeholder="$2,500,000"
            />
            
            <AttributeRow 
              label="Incentives" 
              attribute="incentives" 
              placeholder="Vendor contributions, fit-out"
            />
            
            <AttributeRow 
              label="Building Area" 
              attribute="buildingArea" 
              placeholder="450"
              unit="sqm"
            />
            
            <AttributeRow 
              label="Land Area" 
              attribute="landArea" 
              placeholder="850"
              unit="sqm"
            />
            
            <AttributeRow 
              label="Car Parking" 
              attribute="carParking" 
              placeholder="20 spaces"
            />
            
            <AttributeRow 
              label="Tenancy" 
              attribute="tenancy" 
              placeholder="Single tenant"
            />
            
            <AttributeRow 
              label="Lease Terms" 
              attribute="lease" 
              placeholder="5 year + 3+3 options"
            />
            
            <AttributeRow 
              label="Net Rent" 
              attribute="netRent" 
              placeholder="$120,000 p.a."
            />
            
            <AttributeRow 
              label="Outgoings" 
              attribute="outgoings" 
              placeholder="$15,000 p.a."
            />
            
            <AttributeRow 
              label="Yield Rate" 
              attribute="yieldRate" 
              placeholder="4.8%"
            />
            
            <AttributeRow 
              label="Zoning" 
              attribute="zoning" 
              placeholder="Commercial 1 Zone"
            />
            
            <AttributeRow 
              label="Building Condition" 
              attribute="buildingCondition" 
              placeholder="Good condition"
            />
            
            <AttributeRow 
              label="Street Access" 
              attribute="streetAccess" 
              placeholder="Main road frontage"
            />
          </div>

          {/* Analysis Summary */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <Label className="text-sm font-semibold mb-3 block">Sales Evidence Analysis Summary</Label>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Average Sale Price:</span>
                <p className="text-muted-foreground">Calculated from settled sales</p>
              </div>
              <div>
                <span className="font-medium">Average Yield:</span>
                <p className="text-muted-foreground">Based on net rent analysis</p>
              </div>
              <div>
                <span className="font-medium">Market Indication:</span>
                <p className="text-muted-foreground">Price per sqm comparison</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}