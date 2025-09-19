import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface AddressData {
  fullAddress: string;
  lotNumber: string;
  planNumber: string;
  streetNumber: string;
  streetName: string;
  streetType: string;
  suburb: string;
  state: string;
  postcode: string;
  landArea: number;
  zoning: string;
  council: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  verified: boolean;
}

interface AddressVerificationServiceProps {
  onAddressVerified: (data: AddressData) => void;
  initialAddress?: string;
}

export default function AddressVerificationService({ onAddressVerified, initialAddress = '' }: AddressVerificationServiceProps) {
  const [address, setAddress] = useState(initialAddress);
  const [lotNumber, setLotNumber] = useState('');
  const [planNumber, setPlanNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verified' | 'failed'>('idle');
  const [addressData, setAddressData] = useState<AddressData | null>(null);

  const verifyAddress = async () => {
    if (!address.trim()) {
      toast.error("Please enter an address");
      return;
    }

    setIsVerifying(true);
    setVerificationStatus('idle');

    try {
      // Simulate address verification with external APIs
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock verified data - in production this would come from actual APIs
      const mockData: AddressData = {
        fullAddress: address,
        lotNumber: lotNumber || "31",
        planNumber: planNumber || "DP1234567",
        streetNumber: address.split(' ')[0] || '',
        streetName: "Dockside",
        streetType: "Drive",
        suburb: "Mildura",
        state: "VIC",
        postcode: "3500",
        landArea: 14560,
        zoning: "Commercial",
        council: "Mildura Rural City Council",
        coordinates: {
          lat: -34.1872,
          lng: 142.1612
        },
        verified: true
      };

      setAddressData(mockData);
      setVerificationStatus('verified');
      onAddressVerified(mockData);
      
      toast.success("Address verified successfully!");
    } catch (error) {
      setVerificationStatus('failed');
      toast.error("Failed to verify address. Please check and try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Address Verification & Lot Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="address">Property Address</Label>
            <div className="flex gap-2">
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter full property address"
                className="flex-1"
              />
              <Button 
                onClick={verifyAddress}
                disabled={isVerifying}
                className="shrink-0"
              >
                {isVerifying ? (
                  <>
                    <Search className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Verify
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lotNumber">Lot Number</Label>
              <Input
                id="lotNumber"
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
                placeholder="e.g. 31"
              />
            </div>
            <div>
              <Label htmlFor="planNumber">Plan Number</Label>
              <Input
                id="planNumber"
                value={planNumber}
                onChange={(e) => setPlanNumber(e.target.value)}
                placeholder="e.g. DP1234567"
              />
            </div>
          </div>
        </div>

        {verificationStatus === 'verified' && addressData && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800 dark:text-green-200">Address Verified</span>
              <Badge variant="outline" className="text-green-700 border-green-300">
                Verified
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Full Address:</strong> {addressData.fullAddress}
              </div>
              <div>
                <strong>Lot/Plan:</strong> Lot {addressData.lotNumber} {addressData.planNumber}
              </div>
              <div>
                <strong>Land Area:</strong> {addressData.landArea.toLocaleString()} sqm
              </div>
              <div>
                <strong>Zoning:</strong> {addressData.zoning}
              </div>
              <div>
                <strong>Council:</strong> {addressData.council}
              </div>
              <div>
                <strong>Coordinates:</strong> {addressData.coordinates.lat}, {addressData.coordinates.lng}
              </div>
            </div>
          </div>
        )}

        {verificationStatus === 'failed' && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-800 dark:text-red-200">Verification Failed</span>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
              Unable to verify the address. Please check the address details and try again.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}