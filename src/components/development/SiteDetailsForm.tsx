import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Building, Calculator } from "lucide-react";

interface SiteData {
  address: string;
  landArea: number;
  currentZoning: string;
  proposedZoning: string;
  fsr: number;
  proposedGFA: number;
  estimatedUnits: number;
  hdaSupport: boolean;
  ssdaApproval: boolean;
  heightLimit: number;
  state: string;
  council: string;
  description: string;
}

interface SiteDetailsFormProps {
  onSiteDataChange: (data: SiteData) => void;
}

export default function SiteDetailsForm({ onSiteDataChange }: SiteDetailsFormProps) {
  const [siteData, setSiteData] = useState<SiteData>({
    address: '95 Epping Road, Macquarie Park, NSW 2113',
    landArea: 14561,
    currentZoning: 'Commercial',
    proposedZoning: 'MU1 Mixed Use',
    fsr: 3.3,
    proposedGFA: 48051,
    estimatedUnits: 500,
    hdaSupport: true,
    ssdaApproval: false,
    heightLimit: 120,
    state: 'NSW',
    council: 'Ryde City Council',
    description: 'Scalable Mixed-Use Development Site within a Transformative Precinct. HDA declared SSD project with proposed GFA of 48,051m² and indicative yield of 500 apartments.'
  });

  const handleInputChange = (field: keyof SiteData, value: any) => {
    const updatedData = { ...siteData, [field]: value };
    setSiteData(updatedData);
    onSiteDataChange(updatedData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Site Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="address">Property Address</Label>
              <Input
                id="address"
                value={siteData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="landArea">Land Area (sqm)</Label>
              <Input
                id="landArea"
                type="number"
                value={siteData.landArea}
                onChange={(e) => handleInputChange('landArea', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="state">State</Label>
              <Select value={siteData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NSW">NSW</SelectItem>
                  <SelectItem value="VIC">VIC</SelectItem>
                  <SelectItem value="QLD">QLD</SelectItem>
                  <SelectItem value="SA">SA</SelectItem>
                  <SelectItem value="WA">WA</SelectItem>
                  <SelectItem value="TAS">TAS</SelectItem>
                  <SelectItem value="NT">NT</SelectItem>
                  <SelectItem value="ACT">ACT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="council">Local Council</Label>
              <Input
                id="council"
                value={siteData.council}
                onChange={(e) => handleInputChange('council', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="currentZoning">Current Zoning</Label>
              <Input
                id="currentZoning"
                value={siteData.currentZoning}
                onChange={(e) => handleInputChange('currentZoning', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Development Proposal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="proposedZoning">Proposed Zoning</Label>
              <Input
                id="proposedZoning"
                value={siteData.proposedZoning}
                onChange={(e) => handleInputChange('proposedZoning', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="fsr">Floor Space Ratio</Label>
              <Input
                id="fsr"
                type="number"
                step="0.1"
                value={siteData.fsr}
                onChange={(e) => handleInputChange('fsr', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="heightLimit">Height Limit (m)</Label>
              <Input
                id="heightLimit"
                type="number"
                value={siteData.heightLimit}
                onChange={(e) => handleInputChange('heightLimit', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="proposedGFA">Proposed GFA (sqm)</Label>
              <Input
                id="proposedGFA"
                type="number"
                value={siteData.proposedGFA}
                onChange={(e) => handleInputChange('proposedGFA', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="estimatedUnits">Estimated Units</Label>
              <Input
                id="estimatedUnits"
                type="number"
                value={siteData.estimatedUnits}
                onChange={(e) => handleInputChange('estimatedUnits', Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hdaSupport"
                checked={siteData.hdaSupport}
                onCheckedChange={(checked) => handleInputChange('hdaSupport', checked)}
              />
              <Label htmlFor="hdaSupport">Housing Delivery Authority (HDA) Support</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ssdaApproval"
                checked={siteData.ssdaApproval}
                onCheckedChange={(checked) => handleInputChange('ssdaApproval', checked)}
              />
              <Label htmlFor="ssdaApproval">State Significant Development Assessment (SSDA) Approval</Label>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Development Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={siteData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}