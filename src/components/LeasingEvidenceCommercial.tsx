import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LeaseData {
  address: string;
  commencementDate: string;
  faceRent: string;
  effectiveRent: string;
  netRent: string;
  buildingArea: string;
  ratesPerSqm: string;
  wale: string;
  termsOptions: string;
  incentives: string;
  [key: string]: string;
}

export default function LeasingEvidenceCommercial() {
  const [leaseData, setLeaseData] = useState<LeaseData[]>([
    { address: "", commencementDate: "", faceRent: "", effectiveRent: "", netRent: "", buildingArea: "", ratesPerSqm: "", wale: "", termsOptions: "", incentives: "" },
    { address: "", commencementDate: "", faceRent: "", effectiveRent: "", netRent: "", buildingArea: "", ratesPerSqm: "", wale: "", termsOptions: "", incentives: "" },
    { address: "", commencementDate: "", faceRent: "", effectiveRent: "", netRent: "", buildingArea: "", ratesPerSqm: "", wale: "", termsOptions: "", incentives: "" }
  ]);

  const [includeAttributes, setIncludeAttributes] = useState({
    commencementDate: true,
    incentives: true,
    termsOptions: true,
    reviewMechanism: true,
    faceRent: true,
    effectiveRent: true,
    grossRent: true,
    outgoings: true,
    landTax: true,
    netRent: true,
    ratesPerSqm: true,
    wale: true,
    esgFactors: true,
    buildingArea: true,
    tenancy: true,
    zoning: true,
    buildingCondition: true,
  });

  const updateLeaseData = (leaseIndex: number, field: string, value: string) => {
    setLeaseData(prev => prev.map((lease, index) => 
      index === leaseIndex ? { ...lease, [field]: value } : lease
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
    unit,
    isSelect = false,
    selectOptions = []
  }: { 
    label: string; 
    attribute: string; 
    placeholder: string; 
    unit?: string;
    isSelect?: boolean;
    selectOptions?: string[];
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
          {isSelect ? (
            <Select>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {selectOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input 
              placeholder={placeholder}
              className="text-sm"
              value={leaseData[0][attribute] || ""}
              onChange={(e) => updateLeaseData(0, attribute, e.target.value)}
            />
          )}
          {unit && <span className="text-xs text-muted-foreground self-center">{unit}</span>}
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex gap-1">
          <Input 
            placeholder={placeholder}
            className="text-sm"
            value={leaseData[1][attribute] || ""}
            onChange={(e) => updateLeaseData(1, attribute, e.target.value)}
          />
          {unit && <span className="text-xs text-muted-foreground self-center">{unit}</span>}
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex gap-1">
          <Input 
            placeholder={placeholder}
            className="text-sm"
            value={leaseData[2][attribute] || ""}
            onChange={(e) => updateLeaseData(2, attribute, e.target.value)}
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
            <FileText className="h-5 w-5 text-primary" />
            Commercial Leasing Evidence
            <Badge variant="secondary" className="ml-2">3 Settled Leases Required</Badge>
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
              <Label className="text-sm font-semibold">Lease 1 (Settled)</Label>
            </div>
            <div className="col-span-3 text-center">
              <Label className="text-sm font-semibold">Lease 2 (Settled)</Label>
            </div>
            <div className="col-span-3 text-center">
              <Label className="text-sm font-semibold">Lease 3 (Settled)</Label>
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
                value={leaseData[0].address}
                onChange={(e) => updateLeaseData(0, 'address', e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <Input 
                placeholder="102 Queen Street Carlton VIC 3053"
                className="text-sm border-primary/30"
                value={leaseData[1].address}
                onChange={(e) => updateLeaseData(1, 'address', e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <Input 
                placeholder="103 Collins Street Melbourne VIC 3000"
                className="text-sm border-primary/30"
                value={leaseData[2].address}
                onChange={(e) => updateLeaseData(2, 'address', e.target.value)}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((leaseNum) => (
              <div key={leaseNum} className="space-y-2">
                <Label className="text-sm font-medium">Lease {leaseNum} Image</Label>
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

          {/* Lease Attributes */}
          <div className="space-y-1">
            <AttributeRow 
              label="Commencement Date" 
              attribute="commencementDate" 
              placeholder="01 March 2024"
            />
            
            <AttributeRow 
              label="Incentives" 
              attribute="incentives" 
              placeholder="6 months rent-free, fit-out"
            />
            
            <AttributeRow 
              label="Terms/Options" 
              attribute="termsOptions" 
              placeholder="5 year + 5 year option"
            />
            
            <AttributeRow 
              label="Review Mechanism" 
              attribute="reviewMechanism" 
              placeholder="Fixed %, CPI, Market Review"
              isSelect={true}
              selectOptions={["Fixed %", "CPI", "Fixed Amount", "Market Review"]}
            />
            
            <AttributeRow 
              label="Face Rent" 
              attribute="faceRent" 
              placeholder="$120,000 p.a."
            />
            
            <AttributeRow 
              label="Effective Rent" 
              attribute="effectiveRent" 
              placeholder="$110,000 p.a."
            />
            
            <AttributeRow 
              label="Gross Rent" 
              attribute="grossRent" 
              placeholder="$135,000 p.a."
            />
            
            <AttributeRow 
              label="Outgoings" 
              attribute="outgoings" 
              placeholder="$15,000 p.a."
            />
            
            <AttributeRow 
              label="Land Tax" 
              attribute="landTax" 
              placeholder="$8,500 p.a."
            />
            
            <AttributeRow 
              label="Net Rent" 
              attribute="netRent" 
              placeholder="$120,000 p.a."
            />
            
            <AttributeRow 
              label="Rate per sqm" 
              attribute="ratesPerSqm" 
              placeholder="$267"
              unit="/sqm"
            />
            
            <AttributeRow 
              label="WALE" 
              attribute="wale" 
              placeholder="3.2 years"
            />
            
            <AttributeRow 
              label="ESG Factors" 
              attribute="esgFactors" 
              placeholder="NABERS 4.5 stars, solar"
            />
            
            <AttributeRow 
              label="Building Area" 
              attribute="buildingArea" 
              placeholder="450"
              unit="sqm"
            />
            
            <AttributeRow 
              label="Tenancy" 
              attribute="tenancy" 
              placeholder="Single tenant"
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
          </div>

          {/* Analysis Summary */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <Label className="text-sm font-semibold mb-3 block">Leasing Evidence Analysis Summary</Label>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Average Net Rent:</span>
                <p className="text-muted-foreground">Calculated from settled leases</p>
              </div>
              <div>
                <span className="font-medium">Average Rate/sqm:</span>
                <p className="text-muted-foreground">Based on building areas</p>
              </div>
              <div>
                <span className="font-medium">Market Indication:</span>
                <p className="text-muted-foreground">Rental rate comparison</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}