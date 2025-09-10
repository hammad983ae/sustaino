import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Thermometer, Snowflake, Zap, AlertTriangle } from 'lucide-react';

interface PropertyPROColdStorageProps {
  data?: any;
  onUpdate?: (data: any) => void;
}

export const PropertyPROColdStorage: React.FC<PropertyPROColdStorageProps> = ({
  data = {},
  onUpdate
}) => {
  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...data, [field]: value };
    onUpdate?.(updatedData);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Snowflake className="h-6 w-6 text-blue-500" />
          <div>
            <CardTitle>Cold Storage Facility Specifications</CardTitle>
            <p className="text-sm text-muted-foreground">
              Specialized assessment requirements for cold storage and refrigeration facilities
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Facility Type and Classification */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Facility Classification</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storageType">Cold Storage Type</Label>
              <Select value={data.storageType || ''} onValueChange={(value) => handleInputChange('storageType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select storage type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blast-freezer">Blast Freezer (-18°C to -40°C)</SelectItem>
                  <SelectItem value="standard-freezer">Standard Freezer (-18°C to -25°C)</SelectItem>
                  <SelectItem value="chilled-storage">Chilled Storage (0°C to 4°C)</SelectItem>
                  <SelectItem value="controlled-atmosphere">Controlled Atmosphere Storage</SelectItem>
                  <SelectItem value="multi-temperature">Multi-Temperature Facility</SelectItem>
                  <SelectItem value="pharmaceutical">Pharmaceutical Cold Storage</SelectItem>
                  <SelectItem value="food-grade">Food Grade Warehouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="operationalStatus">Operational Status</Label>
              <Select value={data.operationalStatus || ''} onValueChange={(value) => handleInputChange('operationalStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fully-operational">Fully Operational</SelectItem>
                  <SelectItem value="partially-operational">Partially Operational</SelectItem>
                  <SelectItem value="non-operational">Non-Operational</SelectItem>
                  <SelectItem value="under-construction">Under Construction</SelectItem>
                  <SelectItem value="decommissioned">Decommissioned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Temperature and Environmental Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-semibold">Temperature and Environmental Controls</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="operatingTemperature">Operating Temperature Range (°C)</Label>
              <Input
                id="operatingTemperature"
                value={data.operatingTemperature || ''}
                onChange={(e) => handleInputChange('operatingTemperature', e.target.value)}
                placeholder="e.g. -18°C to -25°C"
              />
            </div>
            <div>
              <Label htmlFor="humidityControl">Humidity Control (%)</Label>
              <Input
                id="humidityControl"
                value={data.humidityControl || ''}
                onChange={(e) => handleInputChange('humidityControl', e.target.value)}
                placeholder="e.g. 85-95%"
              />
            </div>
            <div>
              <Label htmlFor="atmosphereControl">Atmosphere Control</Label>
              <Select value={data.atmosphereControl || ''} onValueChange={(value) => handleInputChange('atmosphereControl', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Air</SelectItem>
                  <SelectItem value="controlled-atmosphere">Controlled Atmosphere (CA)</SelectItem>
                  <SelectItem value="modified-atmosphere">Modified Atmosphere (MA)</SelectItem>
                  <SelectItem value="nitrogen-flush">Nitrogen Flush</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Facility Specifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Facility Specifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="totalStorageCapacity">Total Storage Capacity (pallets/m³)</Label>
              <Input
                id="totalStorageCapacity"
                type="number"
                value={data.totalStorageCapacity || ''}
                onChange={(e) => handleInputChange('totalStorageCapacity', parseInt(e.target.value) || 0)}
                placeholder="Storage capacity"
              />
            </div>
            <div>
              <Label htmlFor="loadingDocks">Number of Loading Docks</Label>
              <Input
                id="loadingDocks"
                type="number"
                value={data.loadingDocks || ''}
                onChange={(e) => handleInputChange('loadingDocks', parseInt(e.target.value) || 0)}
                placeholder="Loading docks"
              />
            </div>
            <div>
              <Label htmlFor="ceilingHeight">Clear Ceiling Height (m)</Label>
              <Input
                id="ceilingHeight"
                type="number"
                step="0.1"
                value={data.ceilingHeight || ''}
                onChange={(e) => handleInputChange('ceilingHeight', parseFloat(e.target.value) || 0)}
                placeholder="Ceiling height"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="floorLoadCapacity">Floor Load Capacity (kN/m²)</Label>
              <Input
                id="floorLoadCapacity"
                type="number"
                value={data.floorLoadCapacity || ''}
                onChange={(e) => handleInputChange('floorLoadCapacity', parseInt(e.target.value) || 0)}
                placeholder="Floor load capacity"
              />
            </div>
            <div>
              <Label htmlFor="rackingSystem">Racking System Type</Label>
              <Select value={data.rackingSystem || ''} onValueChange={(value) => handleInputChange('rackingSystem', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select racking type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="selective-pallet">Selective Pallet Racking</SelectItem>
                  <SelectItem value="drive-in">Drive-In Racking</SelectItem>
                  <SelectItem value="push-back">Push-Back Racking</SelectItem>
                  <SelectItem value="automated-storage">Automated Storage & Retrieval</SelectItem>
                  <SelectItem value="block-stack">Block Stack</SelectItem>
                  <SelectItem value="mobile-racking">Mobile Racking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Refrigeration Systems */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-semibold">Refrigeration Systems</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="refrigerationSystem">Primary Refrigeration System</Label>
              <Select value={data.refrigerationSystem || ''} onValueChange={(value) => handleInputChange('refrigerationSystem', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select system type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ammonia">Ammonia (NH3) System</SelectItem>
                  <SelectItem value="freon">Freon/HFC System</SelectItem>
                  <SelectItem value="co2">CO2 Cascade System</SelectItem>
                  <SelectItem value="glycol">Glycol Secondary System</SelectItem>
                  <SelectItem value="dx-system">Direct Expansion (DX)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="systemAge">System Age (years)</Label>
              <Input
                id="systemAge"
                type="number"
                value={data.systemAge || ''}
                onChange={(e) => handleInputChange('systemAge', parseInt(e.target.value) || 0)}
                placeholder="Age of refrigeration system"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="backupSystems">Backup Systems</Label>
              <Select value={data.backupSystems || ''} onValueChange={(value) => handleInputChange('backupSystems', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select backup type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="generator">Generator Backup</SelectItem>
                  <SelectItem value="redundant-refrigeration">Redundant Refrigeration</SelectItem>
                  <SelectItem value="both">Generator + Redundant Systems</SelectItem>
                  <SelectItem value="none">No Backup Systems</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="energyRating">Energy Efficiency Rating</Label>
              <Select value={data.energyRating || ''} onValueChange={(value) => handleInputChange('energyRating', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent (Latest Technology)</SelectItem>
                  <SelectItem value="good">Good (Modern Systems)</SelectItem>
                  <SelectItem value="average">Average (Standard Efficiency)</SelectItem>
                  <SelectItem value="poor">Poor (Outdated Systems)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Compliance and Certifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Compliance and Certifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="haccp">HACCP Certification</Label>
              <Select value={data.haccp || ''} onValueChange={(value) => handleInputChange('haccp', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Certification</SelectItem>
                  <SelectItem value="expired">Expired Certification</SelectItem>
                  <SelectItem value="pending">Pending Certification</SelectItem>
                  <SelectItem value="not-applicable">Not Applicable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="buildingCertificate">Building Certificate of Occupancy</Label>
              <Select value={data.buildingCertificate || ''} onValueChange={(value) => handleInputChange('buildingCertificate', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="conditional">Conditional</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="additionalCertifications">Additional Certifications</Label>
            <Textarea
              id="additionalCertifications"
              value={data.additionalCertifications || ''}
              onChange={(e) => handleInputChange('additionalCertifications', e.target.value)}
              placeholder="List any additional certifications (ISO, SQF, BRC, organic, pharmaceutical, etc.)"
              className="min-h-[80px]"
            />
          </div>
        </div>

        {/* Operational Considerations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Operational Considerations</h3>
          
          <div>
            <Label htmlFor="currentTenancy">Current Tenancy/Operation</Label>
            <Textarea
              id="currentTenancy"
              value={data.currentTenancy || ''}
              onChange={(e) => handleInputChange('currentTenancy', e.target.value)}
              placeholder="Describe current tenant/operator, lease terms, operational history"
              className="min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="maintenanceHistory">Maintenance History</Label>
            <Textarea
              id="maintenanceHistory"
              value={data.maintenanceHistory || ''}
              onChange={(e) => handleInputChange('maintenanceHistory', e.target.value)}
              placeholder="Recent major maintenance, system upgrades, recurring issues"
              className="min-h-[80px]"
            />
          </div>
        </div>

        {/* Cold Storage Specific Risks */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium text-blue-800">Cold Storage Valuation Considerations</h4>
          </div>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Specialized nature limits potential purchaser pool</li>
            <li>• High capital cost of refrigeration systems and ongoing maintenance</li>
            <li>• Energy costs and environmental compliance requirements</li>
            <li>• Temperature failure risks and insurance considerations</li>
            <li>• Conversion costs if change of use required</li>
            <li>• Location dependency on transport networks and suppliers</li>
            <li>• Technology obsolescence of refrigeration systems</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};