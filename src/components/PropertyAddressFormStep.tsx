import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, AlertCircle, CheckCircle, Building, ArrowLeft, MapPin } from 'lucide-react';
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
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-foreground">Step 1: Property Address</span>
              <span className="text-muted-foreground font-medium">1 of 6</span>
            </div>
            <div className="w-full bg-muted/60 rounded-full h-3 shadow-inner">
              <div className="bg-gradient-to-r from-success to-success/80 h-3 rounded-full shadow-sm transition-all duration-300" style={{ width: '17%' }}></div>
            </div>
            <div className="text-sm text-success font-medium">17% Complete</div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors duration-200 hover:bg-muted/50 px-3 py-2 rounded-lg"
            >
              <Building className="h-4 w-4" />
              Back to Original Platform
            </Link>
          </div>

          {/* Main Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="border border-border/50 bg-card/95 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      Property Valuation and ESG Assessment Report
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">
                      Find and configure address to begin your valuation report
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Property Address Search */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <Label className="text-base font-semibold text-foreground">Property Address</Label>
                    {addressError && (
                      <div className="flex items-center gap-2 text-destructive bg-destructive/10 px-3 py-1 rounded-full">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Address Identifier Error</span>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="pr-12 h-12 text-base border-2 border-border/50 focus:border-success/50 bg-background/50 backdrop-blur-sm"
                      placeholder="Enter property address"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 bg-muted/80 rounded-md">
                      <Search className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Quick Address Entry */}
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg border border-border/30">
                    <Label className="text-base font-semibold text-foreground">Quick Address Entry</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter property address to begin your valuation report.
                    </p>
                  </div>

                  {/* Lot and Plan Numbers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="lotNumber" className="text-sm font-medium text-foreground">Lot Number</Label>
                      <Input
                        id="lotNumber"
                        value={formData.lotNumber}
                        onChange={(e) => handleInputChange('lotNumber', e.target.value)}
                        className="h-11 border-2 border-border/50 focus:border-success/50 bg-background/50"
                        placeholder="Lot number"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="planNumber" className="text-sm font-medium text-foreground">Plan Number</Label>
                      <Input
                        id="planNumber"
                        value={formData.planNumber}
                        onChange={(e) => handleInputChange('planNumber', e.target.value)}
                        className="h-11 border-2 border-border/50 focus:border-success/50 bg-background/50"
                        placeholder="Plan number"
                      />
                    </div>
                  </div>

                  {/* Address Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="unitNumber" className="text-sm font-medium text-foreground">Unit Number</Label>
                      <Input
                        id="unitNumber"
                        value={formData.unitNumber}
                        onChange={(e) => handleInputChange('unitNumber', e.target.value)}
                        placeholder="Unit"
                        className="h-11 border-2 border-border/50 focus:border-success/50 bg-background/50"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="streetNumber" className="text-sm font-medium text-foreground">Street Number</Label>
                      <Input
                        id="streetNumber"
                        value={formData.streetNumber}
                        onChange={(e) => handleInputChange('streetNumber', e.target.value)}
                        className="h-11 border-2 border-border/50 focus:border-success/50 bg-background/50"
                        placeholder="Street number"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="streetName" className="text-sm font-medium text-foreground">Street Name</Label>
                      <Input
                        id="streetName"
                        value={formData.streetName}
                        onChange={(e) => handleInputChange('streetName', e.target.value)}
                        className="h-11 border-2 border-border/50 focus:border-success/50 bg-background/50"
                        placeholder="Street name"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="streetType" className="text-sm font-medium text-foreground">Street Type</Label>
                      <Select value={formData.streetType} onValueChange={(value) => handleInputChange('streetType', value)}>
                        <SelectTrigger className="h-11 border-2 border-border/50 focus:border-success/50 bg-background/90 backdrop-blur-sm">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg z-50">
                          <SelectItem value="Avenue" className="focus:bg-success/10 focus:text-success">Avenue</SelectItem>
                          <SelectItem value="Street" className="focus:bg-success/10 focus:text-success">Street</SelectItem>
                          <SelectItem value="Road" className="focus:bg-success/10 focus:text-success">Road</SelectItem>
                          <SelectItem value="Drive" className="focus:bg-success/10 focus:text-success">Drive</SelectItem>
                          <SelectItem value="Close" className="focus:bg-success/10 focus:text-success">Close</SelectItem>
                          <SelectItem value="Court" className="focus:bg-success/10 focus:text-success">Court</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* State, Postcode, Country */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="state" className="text-sm font-medium text-foreground">State</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger className="h-11 border-2 border-border/50 focus:border-success/50 bg-background/90 backdrop-blur-sm">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg z-50">
                          <SelectItem value="VIC" className="focus:bg-success/10 focus:text-success">VIC</SelectItem>
                          <SelectItem value="NSW" className="focus:bg-success/10 focus:text-success">NSW</SelectItem>
                          <SelectItem value="QLD" className="focus:bg-success/10 focus:text-success">QLD</SelectItem>
                          <SelectItem value="SA" className="focus:bg-success/10 focus:text-success">SA</SelectItem>
                          <SelectItem value="WA" className="focus:bg-success/10 focus:text-success">WA</SelectItem>
                          <SelectItem value="TAS" className="focus:bg-success/10 focus:text-success">TAS</SelectItem>
                          <SelectItem value="NT" className="focus:bg-success/10 focus:text-success">NT</SelectItem>
                          <SelectItem value="ACT" className="focus:bg-success/10 focus:text-success">ACT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="postcode" className="text-sm font-medium text-foreground">Postcode</Label>
                      <Input
                        id="postcode"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        className="h-11 border-2 border-border/50 focus:border-success/50 bg-background/50"
                        placeholder="Postcode"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="country" className="text-sm font-medium text-foreground">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        readOnly
                        className="h-11 border-2 border-border/30 bg-muted/50 text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-border/30">
                  <Button
                    variant="outline"
                    onClick={handleGenerateAddress}
                    className="h-12 px-8 bg-success/10 hover:bg-success/20 text-success border-success/30 hover:border-success/50 font-semibold transition-all duration-200"
                  >
                    Generate Address
                  </Button>
                  <Button
                    onClick={onContinue}
                    className="h-12 px-8 bg-gradient-to-r from-success to-success/90 hover:from-success/90 hover:to-success/80 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
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