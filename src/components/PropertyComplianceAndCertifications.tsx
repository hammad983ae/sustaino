import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, AlertTriangle, FileCheck, Calendar } from 'lucide-react';

const PropertyComplianceAndCertifications = () => {
  const [includeInReport, setIncludeInReport] = useState(true);
  const [complianceItems, setComplianceItems] = useState({
    // Residential Compliance Items
    fireAlarms: false,
    electricalCertificate: false,
    gasCompliance: false,
    poolCompliance: false,
    stairBalastradeCompliance: false,
    approvedBuildingPlans: false,
    occupancyCertificate: false,
    buildingPermit: false,
    waterCompliance: false,
    energyRating: false,
    
    // Commercial Compliance Items
    fireSafetyCertificate: false,
    bca2019Compliance: false,
    disabilityAccess: false,
    mechanicalVentilation: false,
    emergencyEvacuation: false,
    liftCertificates: false,
    sprinklerSystem: false,
    exitSignage: false,
    occupationalHealth: false,
    asbestosRegister: false
  });

  const [complianceDetails, setComplianceDetails] = useState({
    recommendations: '',
    observations: '',
    certificateDetails: '',
    nonCompliantItems: '',
    futureRequirements: ''
  });

  const residentialItems = [
    { key: 'fireAlarms', label: 'Smoke/Fire Alarms', critical: true },
    { key: 'electricalCertificate', label: 'Electrical Safety Certificate', critical: true },
    { key: 'gasCompliance', label: 'Gas Appliance Compliance', critical: false },
    { key: 'poolCompliance', label: 'Pool Safety Certificate', critical: true },
    { key: 'stairBalastradeCompliance', label: 'Stair/Balustrade Safety', critical: false },
    { key: 'approvedBuildingPlans', label: 'Stamped Approved Building Plans', critical: true },
    { key: 'occupancyCertificate', label: 'Occupancy Certificate', critical: true },
    { key: 'buildingPermit', label: 'Building Permit (if applicable)', critical: false },
    { key: 'waterCompliance', label: 'Water System Compliance', critical: false },
    { key: 'energyRating', label: 'Energy Efficiency Rating', critical: false }
  ];

  const commercialItems = [
    { key: 'fireSafetyCertificate', label: 'Fire Safety Certificate (Annual)', critical: true },
    { key: 'bca2019Compliance', label: 'BCA 2019 Compliance Statement', critical: true },
    { key: 'disabilityAccess', label: 'Disability Access Compliance (DDA)', critical: true },
    { key: 'mechanicalVentilation', label: 'Mechanical Ventilation Certificate', critical: false },
    { key: 'emergencyEvacuation', label: 'Emergency Evacuation Plan', critical: true },
    { key: 'liftCertificates', label: 'Lift Safety Certificates', critical: true },
    { key: 'sprinklerSystem', label: 'Fire Sprinkler System Certificate', critical: true },
    { key: 'exitSignage', label: 'Emergency Exit Signage Compliance', critical: true },
    { key: 'occupationalHealth', label: 'OH&S Compliance Certificate', critical: false },
    { key: 'asbestosRegister', label: 'Asbestos Register (if applicable)', critical: true }
  ];

  const handleComplianceChange = (key: string, checked: boolean) => {
    setComplianceItems(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleDetailChange = (field: string, value: string) => {
    setComplianceDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getCriticalCount = (items: any[]) => {
    return items.filter(item => item.critical && complianceItems[item.key]).length;
  };

  const getTotalCritical = (items: any[]) => {
    return items.filter(item => item.critical).length;
  };

  return (
    <Card className="w-full">
      <CardHeader className="border-b border-border bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-foreground text-xl font-semibold">
              Property Compliance & Safety Certifications
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="include-compliance" className="text-sm font-medium">
              Include in Report
            </Label>
            <Switch
              id="include-compliance"
              checked={includeInReport}
              onCheckedChange={setIncludeInReport}
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Property-specific compliance and safety requirements for asset certification
        </p>
      </CardHeader>

      {includeInReport && (
        <CardContent className="p-6 space-y-8">
          
          {/* Compliance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Residential Critical</span>
              </div>
              <div className="text-2xl font-bold">
                {getCriticalCount(residentialItems)}/{getTotalCritical(residentialItems)}
              </div>
              <div className="text-xs text-muted-foreground">Items Compliant</div>
            </div>
            
            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Commercial Critical</span>
              </div>
              <div className="text-2xl font-bold">
                {getCriticalCount(commercialItems)}/{getTotalCritical(commercialItems)}
              </div>
              <div className="text-xs text-muted-foreground">Items Compliant</div>
            </div>

            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Overall Status</span>
              </div>
              <div className="text-lg font-bold">
                {getCriticalCount([...residentialItems, ...commercialItems]) >= 
                 getTotalCritical([...residentialItems, ...commercialItems]) * 0.8 ? 
                 'Good' : 'Needs Attention'}
              </div>
              <div className="text-xs text-muted-foreground">Compliance Level</div>
            </div>
          </div>

          {/* Residential Compliance */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Residential Property Compliance</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {residentialItems.map((item) => (
                <div key={item.key} className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                  <Checkbox
                    id={item.key}
                    checked={complianceItems[item.key]}
                    onCheckedChange={(checked) => handleComplianceChange(item.key, !!checked)}
                  />
                  <Label htmlFor={item.key} className="flex-1 text-sm font-medium cursor-pointer">
                    {item.label}
                  </Label>
                  {item.critical && (
                    <Badge variant="destructive" className="text-xs">
                      Critical
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Commercial Compliance */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-blue-100 flex items-center justify-center">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Commercial Property Compliance</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commercialItems.map((item) => (
                <div key={item.key} className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                  <Checkbox
                    id={item.key}
                    checked={complianceItems[item.key]}
                    onCheckedChange={(checked) => handleComplianceChange(item.key, !!checked)}
                  />
                  <Label htmlFor={item.key} className="flex-1 text-sm font-medium cursor-pointer">
                    {item.label}
                  </Label>
                  {item.critical && (
                    <Badge variant="destructive" className="text-xs">
                      Critical
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Certificate & Compliance Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="certificate-details" className="text-sm font-medium">
                  Certificate Numbers & Dates
                </Label>
                <Textarea
                  id="certificate-details"
                  placeholder="List certificate numbers, expiry dates, and issuing authorities..."
                  value={complianceDetails.certificateDetails}
                  onChange={(e) => handleDetailChange('certificateDetails', e.target.value)}
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="non-compliant" className="text-sm font-medium">
                  Non-Compliant Items Identified
                </Label>
                <Textarea
                  id="non-compliant"
                  placeholder="Detail any items that do not meet current compliance standards..."
                  value={complianceDetails.nonCompliantItems}
                  onChange={(e) => handleDetailChange('nonCompliantItems', e.target.value)}
                  className="min-h-24"
                />
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recommendations" className="text-sm font-medium">
                Compliance Recommendations
              </Label>
              <Textarea
                id="recommendations"
                placeholder="Provide recommendations for maintaining or improving compliance status..."
                value={complianceDetails.recommendations}
                onChange={(e) => handleDetailChange('recommendations', e.target.value)}
                className="min-h-32"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observations" className="text-sm font-medium">
                Visual Inspection Observations
              </Label>
              <Textarea
                id="observations"
                placeholder="Record observations from visual inspection relevant to compliance..."
                value={complianceDetails.observations}
                onChange={(e) => handleDetailChange('observations', e.target.value)}
                className="min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="future-requirements" className="text-sm font-medium">
                Future Compliance Requirements
              </Label>
              <Textarea
                id="future-requirements"
                placeholder="Identify upcoming compliance requirements or renewal dates..."
                value={complianceDetails.futureRequirements}
                onChange={(e) => handleDetailChange('futureRequirements', e.target.value)}
                className="min-h-24"
              />
            </div>
          </div>

          {/* Compliance Warning */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-semibold text-amber-800">Important Compliance Notice</h4>
                <p className="text-sm text-amber-700">
                  This compliance assessment is based on visual inspection only and does not constitute 
                  certification. Property owners should engage qualified professionals for formal compliance 
                  certification and testing. Non-compliance may significantly impact property value, 
                  marketability, and legal obligations.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default PropertyComplianceAndCertifications;