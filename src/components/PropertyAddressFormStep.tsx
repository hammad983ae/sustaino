import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, AlertCircle, CheckCircle, Building, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyAddressFormStepProps {
  onContinue?: () => void;
  onBack?: () => void;
}

const PropertyAddressFormStep = ({ onContinue, onBack }: PropertyAddressFormStepProps) => {
  const [formData, setFormData] = useState({
    address: '320 Deakin avenue Mildura vic 3500',
    lotNumber: '46',
    planNumber: '14633',
    unitNumber: '',
    streetNumber: '320',
    streetName: 'Deakin',
    streetType: 'Avenue',
    state: 'VIC',
    postcode: '3500',
    country: 'Australia'
  });

  const [addressError, setAddressError] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateAddress = () => {
    // Simulate address generation
    setAddressError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Step 1: Property Address</span>
              <span className="text-muted-foreground">1 of 6</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-success h-2 rounded-full" style={{ width: '17%' }}></div>
            </div>
            <div className="text-sm text-muted-foreground">17% Complete</div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
            >
              <Building className="h-4 w-4" />
              Back to Original Platform
            </Link>
          </div>

          {/* Main Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Property Valuation and ESG Assessment Report
                </CardTitle>
                <p className="text-muted-foreground">
                  Find and configure address to begin your valuation report
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Address Search */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <Label className="text-sm font-medium">Property Address</Label>
                    {addressError && (
                      <div className="flex items-center gap-1 text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        <span className="text-xs">Address Identifier Error</span>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="pr-10"
                      placeholder="Enter property address"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Quick Address Entry */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Quick Address Entry</Label>
                    <p className="text-xs text-muted-foreground">
                      Enter property address to begin your valuation report.
                    </p>
                  </div>

                  {/* Lot and Plan Numbers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lotNumber" className="text-sm">Lot Number</Label>
                      <Input
                        id="lotNumber"
                        value={formData.lotNumber}
                        onChange={(e) => handleInputChange('lotNumber', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="planNumber" className="text-sm">Plan Number</Label>
                      <Input
                        id="planNumber"
                        value={formData.planNumber}
                        onChange={(e) => handleInputChange('planNumber', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Address Details */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="unitNumber" className="text-sm">Unit Number</Label>
                      <Input
                        id="unitNumber"
                        value={formData.unitNumber}
                        onChange={(e) => handleInputChange('unitNumber', e.target.value)}
                        placeholder="Unit"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="streetNumber" className="text-sm">Street Number</Label>
                      <Input
                        id="streetNumber"
                        value={formData.streetNumber}
                        onChange={(e) => handleInputChange('streetNumber', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="streetName" className="text-sm">Street Name</Label>
                      <Input
                        id="streetName"
                        value={formData.streetName}
                        onChange={(e) => handleInputChange('streetName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="streetType" className="text-sm">Street Type</Label>
                      <Select value={formData.streetType} onValueChange={(value) => handleInputChange('streetType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Avenue">Avenue</SelectItem>
                          <SelectItem value="Street">Street</SelectItem>
                          <SelectItem value="Road">Road</SelectItem>
                          <SelectItem value="Drive">Drive</SelectItem>
                          <SelectItem value="Close">Close</SelectItem>
                          <SelectItem value="Court">Court</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* State, Postcode, Country */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm">State</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VIC">VIC</SelectItem>
                          <SelectItem value="NSW">NSW</SelectItem>
                          <SelectItem value="QLD">QLD</SelectItem>
                          <SelectItem value="SA">SA</SelectItem>
                          <SelectItem value="WA">WA</SelectItem>
                          <SelectItem value="TAS">TAS</SelectItem>
                          <SelectItem value="NT">NT</SelectItem>
                          <SelectItem value="ACT">ACT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode" className="text-sm">Postcode</Label>
                      <Input
                        id="postcode"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-sm">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-6">
                  <Button
                    variant="outline"
                    onClick={handleGenerateAddress}
                    className="bg-success hover:bg-success/90 text-white border-success"
                  >
                    Generate Address
                  </Button>
                  <Button
                    onClick={onContinue}
                    className="bg-success hover:bg-success/90 text-white"
                  >
                    Continue to Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAddressFormStep;