import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReportCoverPage from './ReportCoverPage';

interface CoverPageFormProps {
  onSave?: (data: CoverPageData) => void;
  initialData?: Partial<CoverPageData>;
}

export interface CoverPageData {
  address: string;
  preparedFor: string;
  referenceNumber: string;
  dateOfValuation: string;
  propertyImage?: string;
  reportType: string;
}

export default function CoverPageForm({ onSave, initialData }: CoverPageFormProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<CoverPageData>({
    address: initialData?.address || '',
    preparedFor: initialData?.preparedFor || '',
    referenceNumber: initialData?.referenceNumber || '',
    dateOfValuation: initialData?.dateOfValuation || new Date().toISOString().split('T')[0],
    propertyImage: initialData?.propertyImage || '',
    reportType: initialData?.reportType || 'Valuation Report'
  });

  const handleInputChange = (field: keyof CoverPageData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, propertyImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.address || !formData.preparedFor || !formData.referenceNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSave?.(formData);
    
    // Save to localStorage
    localStorage.setItem('reportCoverPageData', JSON.stringify(formData));
    
    toast({
      title: "Cover Page Saved",
      description: "Cover page data has been saved successfully",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Cover Page Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reportType">Report Type</Label>
            <Input
              id="reportType"
              value={formData.reportType}
              onChange={(e) => handleInputChange('reportType', e.target.value)}
              placeholder="Valuation Report"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="148-150 Pine Avenue Mildura, VIC, 3500, Australia"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preparedFor">Prepared For *</Label>
            <Input
              id="preparedFor"
              value={formData.preparedFor}
              onChange={(e) => handleInputChange('preparedFor', e.target.value)}
              placeholder="Client Name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referenceNumber">Reference Number *</Label>
            <Input
              id="referenceNumber"
              value={formData.referenceNumber}
              onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
              placeholder="REF-001"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfValuation">Date of Valuation</Label>
            <Input
              id="dateOfValuation"
              type="date"
              value={formData.dateOfValuation}
              onChange={(e) => handleInputChange('dateOfValuation', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Property Image</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Property Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {formData.propertyImage && (
              <div className="mt-2">
                <img
                  src={formData.propertyImage}
                  alt="Property preview"
                  className="w-full h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Cover Page Data
          </Button>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="scale-50 origin-top border rounded-lg overflow-hidden">
            <ReportCoverPage
              address={formData.address || "Property Address"}
              preparedFor={formData.preparedFor || "Client Name"}
              referenceNumber={formData.referenceNumber || "REF-001"}
              dateOfValuation={formData.dateOfValuation}
              propertyImage={formData.propertyImage}
              reportType={formData.reportType}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}