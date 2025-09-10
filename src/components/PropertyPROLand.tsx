import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PropertyPROLandProps {
  data?: any;
  onUpdate?: (data: any) => void;
}

export const PropertyPROLand: React.FC<PropertyPROLandProps> = ({
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
        <CardTitle>Section 4 - The Land</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="propertyIdentification">Property Identification</Label>
          <Textarea
            id="propertyIdentification"
            value={data.propertyIdentification || ''}
            onChange={(e) => handleInputChange('propertyIdentification', e.target.value)}
            placeholder="Description of means by which subject property has been identified (e.g. street address only, Title Plan, etc.)"
            className="min-h-[80px]"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Valuers are not experts in survey matters. If encroachment suspected, Client must obtain survey report.
          </p>
        </div>

        <div>
          <Label htmlFor="zoningEffect">Zoning Effect</Label>
          <Textarea
            id="zoningEffect"
            value={data.zoningEffect || ''}
            onChange={(e) => handleInputChange('zoningEffect', e.target.value)}
            placeholder="Confirm property complies with current zoning and note any significant adverse effects from zoning or overlays"
            className="min-h-[80px]"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Textarea
            id="location"
            value={data.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Distance and direction from nearest town centre (CBD) and/or nearest main town or regional centre"
            className="min-h-[60px]"
          />
        </div>

        <div>
          <Label htmlFor="neighbourhood">Neighbourhood</Label>
          <Textarea
            id="neighbourhood"
            value={data.neighbourhood || ''}
            onChange={(e) => handleInputChange('neighbourhood', e.target.value)}
            placeholder="Brief description of immediate locality and neighbouring development, noting positive/negative features affecting value or marketability"
            className="min-h-[100px]"
          />
        </div>

        <div>
          <Label htmlFor="siteDescription">Site Description & Access</Label>
          <Textarea
            id="siteDescription"
            value={data.siteDescription || ''}
            onChange={(e) => handleInputChange('siteDescription', e.target.value)}
            placeholder="Shape, topography, relationship to road level, suitability for building, aspect, views, and vehicular access difficulties"
            className="min-h-[100px]"
          />
        </div>

        <div>
          <Label htmlFor="services">Services</Label>
          <Textarea
            id="services"
            value={data.services || ''}
            onChange={(e) => handleInputChange('services', e.target.value)}
            placeholder="List utilities connected/assumed connected, onsite services, street surfacing, kerbing, guttering, footpaths. DO NOT use 'all usual services are connected'"
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};