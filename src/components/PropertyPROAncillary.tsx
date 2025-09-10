import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface PropertyPROAncillaryProps {
  data?: any;
  onUpdate?: (data: any) => void;
}

export const PropertyPROAncillary: React.FC<PropertyPROAncillaryProps> = ({
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
        <CardTitle>Section 6 - Ancillary Improvements</CardTitle>
        <p className="text-sm text-muted-foreground">
          Any improvement on the subject property apart from the main dwelling.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="outdoorImprovements">Outdoor Improvements Attached to Main Dwelling</Label>
          <Textarea
            id="outdoorImprovements"
            value={data.outdoorImprovements || ''}
            onChange={(e) => handleInputChange('outdoorImprovements', e.target.value)}
            placeholder="Covered outdoor living/entertaining area, alfresco, verandah, balcony, porch, patio, attached pergola areas"
            className="min-h-[80px]"
          />
        </div>

        <div>
          <Label htmlFor="carAccommodation">Car Accommodation</Label>
          <Textarea
            id="carAccommodation"
            value={data.carAccommodation || ''}
            onChange={(e) => handleInputChange('carAccommodation', e.target.value)}
            placeholder="Garage or carport under main roof (UMR), attached or detached garage or carport, covered or designated car space"
            className="min-h-[80px]"
          />
        </div>

        <div>
          <Label htmlFor="groundImprovements">Ground Improvements</Label>
          <Textarea
            id="groundImprovements"
            value={data.groundImprovements || ''}
            onChange={(e) => handleInputChange('groundImprovements', e.target.value)}
            placeholder="Fencing, paving, driveway, landscaping, rumpus room, shed, workshop, detached/freestanding pergola/gazebo, swimming pool, tennis court, stables"
            className="min-h-[100px]"
          />
        </div>

        <div>
          <Label htmlFor="secondaryAccommodation">Secondary Accommodation</Label>
          <Textarea
            id="secondaryAccommodation"
            value={data.secondaryAccommodation || ''}
            onChange={(e) => handleInputChange('secondaryAccommodation', e.target.value)}
            placeholder="Granny flat, teenager's retreat, sleep-out (detached from main dwelling, cannot be rented independently or subdivided separately)"
            className="min-h-[80px]"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Note: If accommodation can be rented separately as self-contained dwelling, use 'Two on One Title' Report template.
            Secondary accommodation under main roof or attached should be described in Section 5 - Dwelling Description.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-800 mb-2">Important Notes</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• PropertyPRO Report is suitable for up to two (2) dwellings/occupancies that can be rented separately on one (1) Title</li>
            <li>• Secondary accommodation that cannot be rented independently should be listed here</li>
            <li>• Self-contained secondary dwellings require 'Two on One Title' Report template</li>
            <li>• Accommodation attached to or under main roof goes in Section 5 - Dwelling Description</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};