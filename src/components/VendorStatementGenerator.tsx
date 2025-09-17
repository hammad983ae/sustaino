import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, Download, Check, AlertTriangle, Building, 
  MapPin, Calendar, DollarSign, Shield, Scale, Home,
  FileCheck, Archive, Zap, Clock, Star
} from 'lucide-react';

interface VendorStatementData {
  // Property Details
  propertyAddress: string;
  lotNumber: string;
  planNumber: string;
  titleReference: string;
  zoning: string;
  landArea: string;
  
  // Financial Details
  councilRates: string;
  waterRates: string;
  landTax: string;
  bodyCorpFees: string;
  
  // Legal Information
  encumbrances: string[];
  easements: string[];
  covenants: string[];
  buildingPermits: string[];
  planningPermits: string[];
  
  // Additional Information
  heritageListings: string;
  floodingRisk: string;
  bushfireRisk: string;
  contamination: string;
  
  // Vendor Details
  vendorName: string;
  vendorAddress: string;
  vendorABN: string;
  
  // Legal Representative
  conveyancer: string;
  conveyancerFirm: string;
  conveyancerAddress: string;
}

const VendorStatementGenerator = ({ 
  propertyData, 
  onGenerate 
}: { 
  propertyData?: any; 
  onGenerate?: (data: VendorStatementData) => void; 
}) => {
  const [formData, setFormData] = useState<VendorStatementData>({
    propertyAddress: propertyData?.address || '',
    lotNumber: '',
    planNumber: '',
    titleReference: '',
    zoning: '',
    landArea: '',
    councilRates: '',
    waterRates: '',
    landTax: '',
    bodyCorpFees: '',
    encumbrances: [],
    easements: [],
    covenants: [],
    buildingPermits: [],
    planningPermits: [],
    heritageListings: 'None',
    floodingRisk: 'Low',
    bushfireRisk: 'Low',
    contamination: 'None identified',
    vendorName: '',
    vendorAddress: '',
    vendorABN: '',
    conveyancer: '',
    conveyancerFirm: '',
    conveyancerAddress: ''
  });

  const [activeTab, setActiveTab] = useState('property');
  const [isGenerating, setIsGenerating] = useState(false);
  const [completionProgress, setCompletionProgress] = useState(0);

  // Calculate completion percentage
  React.useEffect(() => {
    const requiredFields = [
      'propertyAddress', 'lotNumber', 'planNumber', 'titleReference', 
      'zoning', 'vendorName', 'conveyancer'
    ];
    const completedFields = requiredFields.filter(field => 
      formData[field as keyof VendorStatementData] && 
      (formData[field as keyof VendorStatementData] as string).trim() !== ''
    ).length;
    setCompletionProgress((completedFields / requiredFields.length) * 100);
  }, [formData]);

  const updateField = (field: keyof VendorStatementData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addListItem = (field: 'encumbrances' | 'easements' | 'covenants' | 'buildingPermits' | 'planningPermits', item: string) => {
    if (item.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], item.trim()]
      }));
    }
  };

  const removeListItem = (field: 'encumbrances' | 'easements' | 'covenants' | 'buildingPermits' | 'planningPermits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const autoPopulateFromGovernmentData = async () => {
    setIsGenerating(true);
    // Simulate API call to government databases
    setTimeout(() => {
      updateField('zoning', 'Residential 1 (R1)');
      updateField('landArea', '650 m²');
      updateField('councilRates', '$2,450.00 p.a.');
      updateField('waterRates', '$890.00 p.a.');
      updateField('heritageListings', 'Not heritage listed');
      setIsGenerating(false);
    }, 2000);
  };

  const generateStatement = () => {
    setIsGenerating(true);
    setTimeout(() => {
      onGenerate?.(formData);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-lg border-white/30 shadow-2xl rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-2xl">
        <CardTitle className="flex items-center gap-3 text-slate-700">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white shadow-lg">
            <FileText className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">Vendor Statement Generator</h3>
            <p className="text-sm text-slate-600 font-normal">Auto-generate Section 32 / Vendor Statement</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{Math.round(completionProgress)}%</div>
            <div className="text-xs text-slate-500">Complete</div>
          </div>
        </CardTitle>
        <Progress value={completionProgress} className="mt-2" />
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6 flex gap-3">
          <Button 
            onClick={autoPopulateFromGovernmentData}
            disabled={isGenerating}
            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isGenerating ? 'Fetching Data...' : 'Auto-Populate from Government APIs'}
          </Button>
          <Button 
            onClick={generateStatement}
            disabled={completionProgress < 80 || isGenerating}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            <FileCheck className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Statement'}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-slate-100 rounded-xl">
            <TabsTrigger value="property" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Property
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Legal
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Risks
            </TabsTrigger>
            <TabsTrigger value="parties" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Parties
            </TabsTrigger>
          </TabsList>

          <TabsContent value="property" className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyAddress">Property Address *</Label>
                <Input
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => updateField('propertyAddress', e.target.value)}
                  placeholder="Full property address"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="titleReference">Title Reference *</Label>
                <Input
                  id="titleReference"
                  value={formData.titleReference}
                  onChange={(e) => updateField('titleReference', e.target.value)}
                  placeholder="e.g., Volume 12345 Folio 678"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lotNumber">Lot Number *</Label>
                <Input
                  id="lotNumber"
                  value={formData.lotNumber}
                  onChange={(e) => updateField('lotNumber', e.target.value)}
                  placeholder="Lot number"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="planNumber">Plan Number *</Label>
                <Input
                  id="planNumber"
                  value={formData.planNumber}
                  onChange={(e) => updateField('planNumber', e.target.value)}
                  placeholder="Plan number"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="zoning">Zoning</Label>
                <Input
                  id="zoning"
                  value={formData.zoning}
                  onChange={(e) => updateField('zoning', e.target.value)}
                  placeholder="e.g., Residential 1 (R1)"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="landArea">Land Area</Label>
                <Input
                  id="landArea"
                  value={formData.landArea}
                  onChange={(e) => updateField('landArea', e.target.value)}
                  placeholder="e.g., 650 m²"
                  className="mt-1"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="councilRates">Council Rates (Annual)</Label>
                <Input
                  id="councilRates"
                  value={formData.councilRates}
                  onChange={(e) => updateField('councilRates', e.target.value)}
                  placeholder="e.g., $2,450.00 p.a."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="waterRates">Water Rates (Annual)</Label>
                <Input
                  id="waterRates"
                  value={formData.waterRates}
                  onChange={(e) => updateField('waterRates', e.target.value)}
                  placeholder="e.g., $890.00 p.a."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="landTax">Land Tax (If Applicable)</Label>
                <Input
                  id="landTax"
                  value={formData.landTax}
                  onChange={(e) => updateField('landTax', e.target.value)}
                  placeholder="e.g., $1,200.00 p.a."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bodyCorpFees">Body Corporate Fees</Label>
                <Input
                  id="bodyCorpFees"
                  value={formData.bodyCorpFees}
                  onChange={(e) => updateField('bodyCorpFees', e.target.value)}
                  placeholder="e.g., $1,800.00 p.q."
                  className="mt-1"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="legal" className="mt-6 space-y-6">
            {(['encumbrances', 'easements', 'covenants', 'buildingPermits', 'planningPermits'] as const).map((field) => (
              <div key={field}>
                <Label className="capitalize">{field.replace(/([A-Z])/g, ' $1')}</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder={`Add ${field.toLowerCase().replace(/([A-Z])/g, ' $1')}`}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          addListItem(field, target.value);
                          target.value = '';
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={(e) => {
                        const input = (e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement);
                        addListItem(field, input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {formData[field].map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg">
                        <span className="text-sm">{item}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeListItem(field, index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    {formData[field].length === 0 && (
                      <div className="text-sm text-slate-500 italic">None added</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="risks" className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="heritageListings">Heritage Listings</Label>
                <Textarea
                  id="heritageListings"
                  value={formData.heritageListings}
                  onChange={(e) => updateField('heritageListings', e.target.value)}
                  placeholder="None identified"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="floodingRisk">Flooding Risk</Label>
                <Textarea
                  id="floodingRisk"
                  value={formData.floodingRisk}
                  onChange={(e) => updateField('floodingRisk', e.target.value)}
                  placeholder="Low risk area"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bushfireRisk">Bushfire Risk</Label>
                <Textarea
                  id="bushfireRisk"
                  value={formData.bushfireRisk}
                  onChange={(e) => updateField('bushfireRisk', e.target.value)}
                  placeholder="Low risk area"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contamination">Environmental Contamination</Label>
                <Textarea
                  id="contamination"
                  value={formData.contamination}
                  onChange={(e) => updateField('contamination', e.target.value)}
                  placeholder="None identified"
                  className="mt-1"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="parties" className="mt-6 space-y-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Vendor Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vendorName">Vendor Name *</Label>
                    <Input
                      id="vendorName"
                      value={formData.vendorName}
                      onChange={(e) => updateField('vendorName', e.target.value)}
                      placeholder="Full legal name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorABN">ABN (If applicable)</Label>
                    <Input
                      id="vendorABN"
                      value={formData.vendorABN}
                      onChange={(e) => updateField('vendorABN', e.target.value)}
                      placeholder="12 345 678 901"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="vendorAddress">Vendor Address</Label>
                  <Textarea
                    id="vendorAddress"
                    value={formData.vendorAddress}
                    onChange={(e) => updateField('vendorAddress', e.target.value)}
                    placeholder="Full postal address"
                    className="mt-1"
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-3">Legal Representative</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="conveyancer">Conveyancer/Solicitor Name *</Label>
                    <Input
                      id="conveyancer"
                      value={formData.conveyancer}
                      onChange={(e) => updateField('conveyancer', e.target.value)}
                      placeholder="Legal representative name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="conveyancerFirm">Firm Name</Label>
                    <Input
                      id="conveyancerFirm"
                      value={formData.conveyancerFirm}
                      onChange={(e) => updateField('conveyancerFirm', e.target.value)}
                      placeholder="Law firm or conveyancing firm"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="conveyancerAddress">Firm Address</Label>
                  <Textarea
                    id="conveyancerAddress"
                    value={formData.conveyancerAddress}
                    onChange={(e) => updateField('conveyancerAddress', e.target.value)}
                    placeholder="Full business address"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {completionProgress >= 80 && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 text-green-700">
              <Check className="h-5 w-5" />
              <span className="font-semibold">Ready to Generate</span>
            </div>
            <p className="text-green-600 text-sm mt-1">
              All required information has been provided. The vendor statement can now be generated.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorStatementGenerator;