import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Edit2, 
  Check, 
  AlertCircle,
  RefreshCw 
} from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';
import { toast } from '@/hooks/use-toast';

interface AddressConfirmationProps {
  onAddressConfirmed?: (address: string) => void;
  onAddressChange?: (address: string) => void;
  showAutoGenerate?: boolean;
}

export const AddressConfirmation: React.FC<AddressConfirmationProps> = ({
  onAddressConfirmed,
  onAddressChange,
  showAutoGenerate = true
}) => {
  const { addressData, updateAddressData, getFormattedAddress } = useProperty();
  const [isEditing, setIsEditing] = useState(false);
  const [tempAddress, setTempAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    const formatted = getFormattedAddress();
    setCurrentAddress(formatted || addressData.propertyAddress || '');
    setTempAddress(formatted || addressData.propertyAddress || '');
  }, [addressData, getFormattedAddress]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setCurrentAddress(tempAddress);
    updateAddressData({ propertyAddress: tempAddress });
    setIsEditing(false);
    onAddressChange?.(tempAddress);
    
    toast({
      title: "Address Updated",
      description: "The property address has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setTempAddress(currentAddress);
    setIsEditing(false);
  };

  const handleConfirm = () => {
    onAddressConfirmed?.(currentAddress);
    
    toast({
      title: "Address Confirmed ✅",
      description: "Proceeding with planning data search for this address.",
    });
  };

  const handleAutoGenerate = () => {
    const formatted = getFormattedAddress();
    if (formatted) {
      setCurrentAddress(formatted);
      setTempAddress(formatted);
      updateAddressData({ propertyAddress: formatted });
      onAddressChange?.(formatted);
      
      toast({
        title: "Address Generated",
        description: "Property address has been auto-generated from entered details.",
      });
    } else {
      toast({
        title: "Cannot Generate Address",
        description: "Please ensure you have entered street number, street name, suburb, and state.",
        variant: "destructive"
      });
    }
  };

  const hasValidAddress = currentAddress && currentAddress.trim().length > 0;
  const addressParts = {
    streetNumber: addressData.streetNumber || '',
    streetName: addressData.streetName || '',
    suburb: addressData.suburb || '',
    state: addressData.state || '',
    postcode: addressData.postcode || ''
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Property Address Confirmation
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Please confirm the property address before proceeding with planning data search
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Address Display */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Current Property Address</Label>
          {hasValidAddress ? (
            <div className="flex items-center gap-2 p-3 bg-success/5 border border-success/20 rounded-md">
              <MapPin className="h-4 w-4 text-success" />
              <span className="flex-1 font-medium">{currentAddress}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleEdit}
                className="h-8 w-8 p-0"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 bg-destructive/5 border border-destructive/20 rounded-md">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-destructive">No address available</span>
            </div>
          )}
        </div>

        {/* Address Components Breakdown */}
        {hasValidAddress && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {addressParts.streetNumber && (
              <Badge variant="outline" className="justify-center">
                {addressParts.streetNumber}
              </Badge>
            )}
            {addressParts.streetName && (
              <Badge variant="outline" className="justify-center">
                {addressParts.streetName}
              </Badge>
            )}
            {addressParts.suburb && (
              <Badge variant="outline" className="justify-center">
                {addressParts.suburb}
              </Badge>
            )}
            {addressParts.state && (
              <Badge variant="outline" className="justify-center">
                {addressParts.state}
              </Badge>
            )}
            {addressParts.postcode && (
              <Badge variant="outline" className="justify-center">
                {addressParts.postcode}
              </Badge>
            )}
          </div>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <div className="space-y-3 p-4 border border-primary/20 rounded-lg bg-primary/5">
            <Label htmlFor="edit-address" className="text-sm font-medium">
              Edit Address
            </Label>
            <Input
              id="edit-address"
              value={tempAddress}
              onChange={(e) => setTempAddress(e.target.value)}
              placeholder="Enter complete property address"
              className="w-full"
            />
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={handleSave}
                disabled={!tempAddress.trim()}
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-3">
          {showAutoGenerate && (
            <Button 
              variant="outline" 
              onClick={handleAutoGenerate}
              className="flex-1"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Auto-Generate Address
            </Button>
          )}
          
          <Button 
            onClick={handleConfirm}
            disabled={!hasValidAddress}
            className="flex-1"
          >
            <Check className="h-4 w-4 mr-2" />
            Confirm & Continue
          </Button>
        </div>

        {!hasValidAddress && (
          <p className="text-xs text-muted-foreground text-center">
            Please ensure you have a valid address before proceeding with planning data search
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressConfirmation;