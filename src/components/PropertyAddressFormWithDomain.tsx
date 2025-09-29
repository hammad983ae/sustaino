import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useProperty } from '@/contexts/PropertyContext';
import { useReportData } from '@/contexts/ReportDataContext';
import PropertyAddressSuggestion from './PropertyAddressSuggestion';
import { MapPin, Building, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';

interface PropertySuggestion {
  id: string;
  address: string;
  addressComponents: {
    unitNumber: string;
    streetNumber: string;
    streetName: string;
    streetType: string;
    streetTypeLong: string;
    suburb: string;
    postcode: string;
    state: string;
  };
  relativeScore: number;
  normalized: {
    unitNumber: string;
    streetNumber: string;
    streetName: string;
    streetType: string;
    streetTypeLong: string;
    suburb: string;
    postcode: string;
    state: string;
    fullAddress: string;
  };
}

const PropertyAddressFormWithDomain: React.FC = () => {
  const { addressData, updateAddressData } = useProperty();
  const { reportData, updateReportData } = useReportData();
  const [selectedProperty, setSelectedProperty] = useState<PropertySuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [domainData, setDomainData] = useState<any>(null);
  const { toast } = useToast();

  // Load existing property data if available
  useEffect(() => {
    if (reportData?.propertyDetails?.domainId) {
      // Property was selected from Domain API, load additional details
      loadPropertyDetails(reportData.propertyDetails.domainId);
    }
  }, [reportData?.propertyDetails?.domainId]);

  // Load job data from database when component mounts
  useEffect(() => {
    const loadJobDataFromDB = async () => {
      try {
        // Get current job ID from URL or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('jobId') || localStorage.getItem('currentJobId');
        
        if (jobId) {
          console.log('PropertyAddressFormWithDomain: Loading job data from DB for jobId:', jobId);
          
          // Fetch job data from backend
          const response = await apiClient.getJob(jobId);
          if (response.success) {
            const job = response.data.job;
            console.log('PropertyAddressFormWithDomain: Job data from DB:', job);
            
            if (job.property) {
              const property = job.property;
              console.log('PropertyAddressFormWithDomain: Property data from DB:', property);
              
              // Update address data
              const newAddressData = {
                propertyAddress: property.fullAddress || `${property.address.streetNumber || ''} ${property.address.streetName || ''} ${property.address.streetType || ''}, ${property.address.suburb || ''}, ${property.address.state || ''} ${property.address.postcode || ''}`.trim(),
                unitNumber: property.address.unitNumber || '',
                streetNumber: property.address.streetNumber || '',
                streetName: property.address.streetName || '',
                streetType: property.address.streetType || '',
                suburb: property.address.suburb || '',
                state: property.address.state || '',
                postcode: property.address.postcode || '',
                country: property.address.country || 'Australia',
                lotNumber: property.address.lotNumber || '',
                planNumber: property.address.planNumber || ''
              };
              
              updateAddressData(newAddressData);
              
              // Create property suggestion for display
              const mockProperty: PropertySuggestion = {
                id: property.domainId || 'db-property',
                address: newAddressData.propertyAddress,
                addressComponents: {
                  unitNumber: property.address.unitNumber || '',
                  streetNumber: property.address.streetNumber || '',
                  streetName: property.address.streetName || '',
                  streetType: property.address.streetType || '',
                  suburb: property.address.suburb || '',
                  postcode: property.address.postcode || '',
                  state: property.address.state || ''
                },
                relativeScore: 100,
                normalized: {
                  unitNumber: property.address.unitNumber || '',
                  streetNumber: property.address.streetNumber || '',
                  streetName: property.address.streetName || '',
                  streetType: property.address.streetType || '',
                  suburb: property.address.suburb || '',
                  postcode: property.address.postcode || '',
                  state: property.address.state || '',
                  fullAddress: newAddressData.propertyAddress
                }
              };
              
              setSelectedProperty(mockProperty);
              
              // Update report data
              const newReportData = {
                ...reportData,
                propertyDetails: {
                  ...reportData.propertyDetails,
                  domainId: property.domainId,
                  address: newAddressData.propertyAddress,
                  addressComponents: property.address,
                  propertyType: property.details?.propertyType || 'residential',
                  landArea: property.details?.landArea?.value || '',
                  buildingArea: property.details?.buildingArea?.value || '',
                  yearBuilt: property.details?.yearBuilt || '',
                  bedrooms: property.details?.bedrooms || '',
                  bathrooms: property.details?.bathrooms || '',
                  carSpaces: property.details?.carSpaces || '',
                  zoning: property.details?.zoning || '',
                  features: property.details?.features || []
                }
              };
              
              updateReportData('propertyDetails', newReportData.propertyDetails);
              
              console.log('PropertyAddressFormWithDomain: Form populated with DB data');
            }
          }
        }
      } catch (error) {
        console.error('PropertyAddressFormWithDomain: Error loading job data from DB:', error);
      }
    };
    
    loadJobDataFromDB();
  }, []);

  const loadPropertyDetails = async (domainId: string) => {
    setIsLoading(true);
    try {
      const data = await apiClient.getPropertyDetails(domainId);
      setDomainData(data.data.property);
    } catch (error) {
      console.error('Failed to load property details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePropertySelect = (property: PropertySuggestion) => {
    setSelectedProperty(property);
    
    // Update address data with Domain property information
    const newAddressData = {
      propertyAddress: property.address,
      lotNumber: '',
      planNumber: '',
      unitNumber: property.normalized.unitNumber,
      streetNumber: property.normalized.streetNumber,
      streetName: property.normalized.streetName,
      streetType: property.normalized.streetType,
      state: property.normalized.state,
      postcode: property.normalized.postcode,
      country: 'Australia'
    };

    updateAddressData(newAddressData);

    // Update report data with property details
    const newReportData = {
      ...reportData,
      propertyDetails: {
        ...reportData.propertyDetails,
        domainId: property.id,
        address: property.address,
        addressComponents: property.addressComponents,
        normalized: property.normalized
      }
    };

    updateReportData('propertySearchData', {
      address: property.address,
      addressComponents: property.addressComponents,
      normalized: property.normalized
    });

    // Load additional property details
    loadPropertyDetails(property.id);

    toast({
      title: "Property Selected",
      description: `Selected: ${property.address}`,
    });
  };

  const handleManualAddressChange = (field: string, value: string) => {
    const newAddressData = {
      ...addressData,
      [field]: value
    };
    updateAddressData(newAddressData);
  };

  const formatAddress = (property: PropertySuggestion) => {
    const { addressComponents } = property;
    const parts = [];
    
    if (addressComponents.unitNumber) {
      parts.push(`Unit ${addressComponents.unitNumber}`);
    }
    
    parts.push(
      `${addressComponents.streetNumber} ${addressComponents.streetName} ${addressComponents.streetType}`
    );
    parts.push(
      `${addressComponents.suburb} ${addressComponents.state} ${addressComponents.postcode}`
    );
    
    return parts.join(', ');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Property Address Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Domain API Property Search */}
          <div>
            <Label htmlFor="propertySearch">Search Property Address</Label>
            <PropertyAddressSuggestion
              value={addressData.propertyAddress || ''}
              onChange={(value) => handleManualAddressChange('propertyAddress', value)}
              onSelect={handlePropertySelect}
              placeholder="Start typing the property address..."
            />
            <p className="text-sm text-muted-foreground mt-2">
              Search for properties using Domain.com.au database for accurate address information
            </p>
          </div>

          {/* Selected Property Display */}
          {selectedProperty && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Selected Property
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="font-medium">{selectedProperty.address}</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedProperty.addressComponents.suburb}, {selectedProperty.addressComponents.state} {selectedProperty.addressComponents.postcode}
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedProperty.relativeScore > 80 && (
                      <Badge variant="secondary" className="text-xs">
                        High Match Score: {selectedProperty.relativeScore}%
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      Domain ID: {selectedProperty.id}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Manual Address Entry */}
          <div>
            <Label className="text-sm font-medium">Manual Address Entry</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Or manually enter the property address details
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="unitNumber">Unit Number</Label>
                <Input
                  id="unitNumber"
                  value={addressData.unitNumber || ''}
                  onChange={(e) => handleManualAddressChange('unitNumber', e.target.value)}
                  placeholder="Unit 1"
                />
              </div>
              
              <div>
                <Label htmlFor="streetNumber">Street Number</Label>
                <Input
                  id="streetNumber"
                  value={addressData.streetNumber || ''}
                  onChange={(e) => handleManualAddressChange('streetNumber', e.target.value)}
                  placeholder="123"
                />
              </div>
              
              <div>
                <Label htmlFor="streetName">Street Name</Label>
                <Input
                  id="streetName"
                  value={addressData.streetName || ''}
                  onChange={(e) => handleManualAddressChange('streetName', e.target.value)}
                  placeholder="Main Street"
                />
              </div>
              
              <div>
                <Label htmlFor="streetType">Street Type</Label>
                <Input
                  id="streetType"
                  value={addressData.streetType || ''}
                  onChange={(e) => handleManualAddressChange('streetType', e.target.value)}
                  placeholder="St, Ave, Rd"
                />
              </div>
              
              <div>
                <Label htmlFor="suburb">Suburb</Label>
                <Input
                  id="suburb"
                  value={addressData.suburb || ''}
                  onChange={(e) => handleManualAddressChange('suburb', e.target.value)}
                  placeholder="Suburb"
                />
              </div>
              
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={addressData.state || ''}
                  onChange={(e) => handleManualAddressChange('state', e.target.value)}
                  placeholder="NSW, VIC, QLD"
                />
              </div>
              
              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  value={addressData.postcode || ''}
                  onChange={(e) => handleManualAddressChange('postcode', e.target.value)}
                  placeholder="2000"
                />
              </div>
              
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={addressData.country || 'Australia'}
                  onChange={(e) => handleManualAddressChange('country', e.target.value)}
                  placeholder="Australia"
                />
              </div>
            </div>
          </div>

          {/* Domain Property Details */}
          {domainData && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  Property Details from Domain.com.au
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  {domainData.propertyType && (
                    <div>
                      <span className="font-medium">Property Type:</span> {domainData.propertyType}
                    </div>
                  )}
                  {domainData.bedrooms && (
                    <div>
                      <span className="font-medium">Bedrooms:</span> {domainData.bedrooms}
                    </div>
                  )}
                  {domainData.bathrooms && (
                    <div>
                      <span className="font-medium">Bathrooms:</span> {domainData.bathrooms}
                    </div>
                  )}
                  {domainData.carSpaces && (
                    <div>
                      <span className="font-medium">Car Spaces:</span> {domainData.carSpaces}
                    </div>
                  )}
                  {domainData.landArea && (
                    <div>
                      <span className="font-medium">Land Area:</span> {domainData.landArea} m²
                    </div>
                  )}
                  {domainData.buildingArea && (
                    <div>
                      <span className="font-medium">Building Area:</span> {domainData.buildingArea} m²
                    </div>
                  )}
                  {domainData.yearBuilt && (
                    <div>
                      <span className="font-medium">Year Built:</span> {domainData.yearBuilt}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Current Address Summary */}
          {(addressData.propertyAddress || addressData.streetNumber) && (
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Current Address
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm">
                  {addressData.propertyAddress || 
                   `${addressData.unitNumber ? `Unit ${addressData.unitNumber}, ` : ''}${addressData.streetNumber} ${addressData.streetName} ${addressData.streetType}, ${addressData.suburb}, ${addressData.state} ${addressData.postcode}`}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyAddressFormWithDomain;
