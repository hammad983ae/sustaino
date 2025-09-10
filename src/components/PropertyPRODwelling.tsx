import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropertyPRODwellingProps {
  data?: any;
  onUpdate?: (data: any) => void;
  propertyType?: string;
  isTBE?: boolean;
}

export const PropertyPRODwelling: React.FC<PropertyPRODwellingProps> = ({
  data = {},
  onUpdate,
  propertyType = 'house',
  isTBE = false
}) => {
  const handleInputChange = (field: string, value: any) => {
    const updatedData = { ...data, [field]: value };
    onUpdate?.(updatedData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section 5 - Dwelling Description</CardTitle>
        <p className="text-sm text-muted-foreground">
          Valuers are not construction/building experts and provide comments on visual/observable issues only.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="style">Style</Label>
          <Input
            id="style"
            value={data.style || ''}
            onChange={(e) => handleInputChange('style', e.target.value)}
            placeholder="e.g. split level detached, two storey attached terrace, high rise apartment"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mainWalls">Main Walls</Label>
            <Input
              id="mainWalls"
              value={data.mainWalls || ''}
              onChange={(e) => handleInputChange('mainWalls', e.target.value)}
              placeholder="e.g. double brick, brick veneer, timber cladding"
            />
          </div>
          <div>
            <Label htmlFor="roof">Roof</Label>
            <Input
              id="roof"
              value={data.roof || ''}
              onChange={(e) => handleInputChange('roof', e.target.value)}
              placeholder="e.g. corrugated iron, terracotta tiles, Colorbond"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mainInteriorLinings">Main Interior Linings</Label>
            <Input
              id="mainInteriorLinings"
              value={data.mainInteriorLinings || ''}
              onChange={(e) => handleInputChange('mainInteriorLinings', e.target.value)}
              placeholder="Main interior wall and ceiling linings"
            />
          </div>
          <div>
            <Label htmlFor="flooring">Flooring</Label>
            <Input
              id="flooring"
              value={data.flooring || ''}
              onChange={(e) => handleInputChange('flooring', e.target.value)}
              placeholder="e.g. timber floorboards, concrete slab, particle board"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="windowFrames">Window Frames</Label>
          <Input
            id="windowFrames"
            value={data.windowFrames || ''}
            onChange={(e) => handleInputChange('windowFrames', e.target.value)}
            placeholder="e.g. aluminium, steel, timber"
          />
        </div>

        <div>
          <Label htmlFor="accommodation">Accommodation</Label>
          <Input
            id="accommodation"
            value={data.accommodation || ''}
            onChange={(e) => handleInputChange('accommodation', e.target.value)}
            placeholder="Number of bedrooms, bathrooms, other main rooms, service/utility rooms"
          />
        </div>

        <div>
          <Label htmlFor="interiorLayout">Interior Layout</Label>
          <Textarea
            id="interiorLayout"
            value={data.interiorLayout || ''}
            onChange={(e) => handleInputChange('interiorLayout', e.target.value)}
            placeholder="e.g. typical/practical layout, flowing floor plan, unconventional and impractical floor plan"
            className="min-h-[60px]"
          />
        </div>

        <div>
          <Label htmlFor="fixturesAndFittings">Fixtures and Fittings</Label>
          <Textarea
            id="fixturesAndFittings"
            value={data.fixturesAndFittings || ''}
            onChange={(e) => handleInputChange('fixturesAndFittings', e.target.value)}
            placeholder="Cooking appliances, dishwasher, bathroom facilities, hot water service, air conditioning, built-in items, feature finishes"
            className="min-h-[100px]"
          />
        </div>

        <div>
          <Label htmlFor="streetAppeal">Street Appeal</Label>
          <Select value={data.streetAppeal || ''} onValueChange={(value) => handleInputChange('streetAppeal', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select street appeal rating..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High Appeal</SelectItem>
              <SelectItem value="very-good">Very Good Appeal</SelectItem>
              <SelectItem value="good">Good Appeal</SelectItem>
              <SelectItem value="fair">Fair Appeal</SelectItem>
              <SelectItem value="low">Low Appeal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="internalCondition">Internal Condition</Label>
            <Select value={data.internalCondition || ''} onValueChange={(value) => handleInputChange('internalCondition', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="externalCondition">External Condition</Label>
            <Select value={data.externalCondition || ''} onValueChange={(value) => handleInputChange('externalCondition', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isTBE && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">TBE Dwelling Notes</h4>
            <p className="text-sm text-blue-700">
              For TBE reports, describe the proposed dwelling based on plans and specifications provided. 
              All assessments are on an 'As If Complete' basis.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};