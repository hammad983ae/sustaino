import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  AlertTriangle, 
  BarChart3, 
  Building, 
  MapPin,
  DollarSign,
  CheckCircle,
  Play
} from 'lucide-react';

const demoProperties = [
  {
    id: "1",
    name: "Luxury Apartment Complex - St Kilda",
    address: "88 Marine Parade, St Kilda VIC 3182",
    type: "Residential"
  },
  {
    id: "2", 
    name: "Family Home - Brighton",
    address: "42 Church Street, Brighton VIC 3186",
    type: "Residential"
  },
  {
    id: "3",
    name: "Commercial Office Building - CBD",
    address: "123 Collins Street, Melbourne VIC 3000", 
    type: "Commercial"
  }
];

export default function GenerateMockReports() {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [reportGenerated, setReportGenerated] = useState(false);

  const generateReport = () => {
    setReportGenerated(true);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Professional Valuation Demo Platform</h1>
        <p className="text-lg text-muted-foreground">
          Interactive demos for ISFV, PAF and ICV valuation reports
        </p>
      </div>

      <Tabs defaultValue="isfv" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="isfv">ISFV Demo</TabsTrigger>
          <TabsTrigger value="paf">PAF Demo</TabsTrigger>
          <TabsTrigger value="icv">ICV Demo</TabsTrigger>
        </TabsList>

        {/* ISFV Demo */}
        <TabsContent value="isfv" className="space-y-6">
          <ISFVDemo />
        </TabsContent>

        {/* PAF Demo */}
        <TabsContent value="paf" className="space-y-6">
          <PAFDemo />
        </TabsContent>

        {/* ICV Demo */}
        <TabsContent value="icv" className="space-y-6">
          <ICVDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ISFV Demo Component
function ISFVDemo() {
  const [formData, setFormData] = useState({
    reportType: 'AS IS (Existing Property)',
    inspectionDate: '29/09/2025', 
    valuationDate: '29/09/2025',
    propertyAddress: '',
    titleSearchSighted: false,
    // Add other fields as needed
    marketValue: '',
    riskRating: '',
    confidence: 'Medium'
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            ISFV - Instant Short Form Valuation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="summary">Property Summary</TabsTrigger>
              <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
              <TabsTrigger value="land">Land Information</TabsTrigger>
              <TabsTrigger value="dwelling">Dwelling Description</TabsTrigger>
              <TabsTrigger value="sales">Sales Information</TabsTrigger>
              <TabsTrigger value="valuation">Valuation Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select value={formData.reportType} onValueChange={(value) => updateField('reportType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AS IS (Existing Property)">AS IS (Existing Property)</SelectItem>
                      <SelectItem value="Proposed Development">Proposed Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="propertyAddress">Property Address</Label>
                  <Input
                    id="propertyAddress"
                    placeholder="Enter full property address"
                    value={formData.propertyAddress}
                    onChange={(e) => updateField('propertyAddress', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="inspectionDate">Inspection Date</Label>
                  <Input
                    id="inspectionDate"
                    value={formData.inspectionDate}
                    onChange={(e) => updateField('inspectionDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="valuationDate">Valuation Date</Label>
                  <Input
                    id="valuationDate"
                    value={formData.valuationDate}
                    onChange={(e) => updateField('valuationDate', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="titleSearchSighted"
                  checked={formData.titleSearchSighted}
                  onCheckedChange={(checked) => updateField('titleSearchSighted', checked)}
                />
                <Label htmlFor="titleSearchSighted">Title Search Sighted?</Label>
              </div>
            </TabsContent>

            <TabsContent value="risk" className="space-y-4">
              <div>
                <Label htmlFor="riskRating">Risk Rating</Label>
                <Select value={formData.riskRating} onValueChange={(value) => updateField('riskRating', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low Risk</SelectItem>
                    <SelectItem value="Medium">Medium Risk</SelectItem>
                    <SelectItem value="High">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="land" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Site Area</Label>
                  <Input placeholder="e.g., 4204 sqm" />
                </div>
                <div>
                  <Label>Zoning</Label>
                  <Input placeholder="e.g., LDRZ2" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dwelling" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Style</Label>
                  <Input placeholder="e.g., Double storey brick veneer dwelling" />
                </div>
                <div>
                  <Label>Accommodation</Label>
                  <Input placeholder="e.g., 3 Bedroom(s) And 2 Bathroom(s)" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Previous Sale Price</Label>
                  <Input placeholder="$0" />
                </div>
                <div>
                  <Label>Current Sale Price</Label>
                  <Input placeholder="$0" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="valuation" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="marketValue">Market Value</Label>
                  <Input
                    id="marketValue"
                    placeholder="To be calculated"
                    value={formData.marketValue}
                    onChange={(e) => updateField('marketValue', e.target.value)}
                  />
                </div>
                <div className="text-center p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formData.marketValue ? `$${formData.marketValue}` : 'Market Value TBC'}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">ISFV Estimated Value</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

// PAF Demo Component  
function PAFDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          PAF - Property Assessment Framework
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">PAF Demo Ready</h3>
          <p className="text-muted-foreground mb-4">
            Complete Property Assessment Framework for commercial and residential properties
          </p>
          <Badge variant="outline">Long Form, Short Form & Sustino Pro Reports</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// ICV Demo Component
function ICVDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          ICV - Insurance Cost Valuation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">ICV Demo Ready</h3>
          <p className="text-muted-foreground mb-4">
            Insurance cost valuation integrated with PAF workflow
          </p>
          <Badge variant="outline">Insurance Valuation Reports</Badge>
        </div>
      </CardContent>
    </Card>
  );
}