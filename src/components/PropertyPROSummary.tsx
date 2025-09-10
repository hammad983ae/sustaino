import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface PropertyPROSummaryProps {
  data?: any;
  onUpdate?: (data: any) => void;
  propertyType?: string;
  isTBE?: boolean;
}

export const PropertyPROSummary: React.FC<PropertyPROSummaryProps> = ({
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
        <CardTitle>Section 1 - Property Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Report Header Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="instructedBy">Instructed By</Label>
            <Input
              id="instructedBy"
              value={data.instructedBy || ''}
              onChange={(e) => handleInputChange('instructedBy', e.target.value)}
              placeholder="Instructing party name"
            />
          </div>
          <div>
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              value={data.contact || ''}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              placeholder="Contact person name"
            />
          </div>
          <div>
            <Label htmlFor="clientRef">Client Ref No</Label>
            <Input
              id="clientRef"
              value={data.clientRef || ''}
              onChange={(e) => handleInputChange('clientRef', e.target.value)}
              placeholder="Client reference number"
            />
          </div>
          <div>
            <Label htmlFor="borrower">Borrower</Label>
            <Input
              id="borrower"
              value={data.borrower || ''}
              onChange={(e) => handleInputChange('borrower', e.target.value)}
              placeholder="Borrower name(s)"
            />
          </div>
          <div>
            <Label htmlFor="lender">Lender</Label>
            <Input
              id="lender"
              value={data.lender || ''}
              onChange={(e) => handleInputChange('lender', e.target.value)}
              placeholder="Lender name"
            />
          </div>
          <div>
            <Label htmlFor="loanRef">Loan Ref No</Label>
            <Input
              id="loanRef"
              value={data.loanRef || ''}
              onChange={(e) => handleInputChange('loanRef', e.target.value)}
              placeholder="Loan reference number"
            />
          </div>
          <div>
            <Label htmlFor="valuerRef">Valuer Ref No</Label>
            <Input
              id="valuerRef"
              value={data.valuerRef || ''}
              onChange={(e) => handleInputChange('valuerRef', e.target.value)}
              placeholder="Valuation firm job number"
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="propertyAddress">Property Address</Label>
            <Input
              id="propertyAddress"
              value={data.propertyAddress || ''}
              onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
              placeholder="Full street address including locality, state and postcode"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="titleSearchSighted">Title search sighted?</Label>
              <Select value={data.titleSearchSighted || ''} onValueChange={(value) => handleInputChange('titleSearchSighted', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="realPropertyDescription">Real Property Description</Label>
              <Input
                id="realPropertyDescription"
                value={data.realPropertyDescription || ''}
                onChange={(e) => handleInputChange('realPropertyDescription', e.target.value)}
                placeholder="Title details/particulars"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="encumbrances">Encumbrances/Restrictions</Label>
            <Select value={data.encumbrances || ''} onValueChange={(value) => handleInputChange('encumbrances', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nil">Nil</SelectItem>
                <SelectItem value="known">Known - refer to Certificate of Title</SelectItem>
                <SelectItem value="unknown">Not Known</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="siteDimensions">Site Dimensions</Label>
              <Input
                id="siteDimensions"
                value={data.siteDimensions || ''}
                onChange={(e) => handleInputChange('siteDimensions', e.target.value)}
                placeholder="e.g. 20m x 30m rectangular"
              />
            </div>
            <div>
              <Label htmlFor="siteArea">Site Area</Label>
              <Input
                id="siteArea"
                value={data.siteArea || ''}
                onChange={(e) => handleInputChange('siteArea', e.target.value)}
                placeholder="e.g. 600 sqm"
              />
            </div>
            <div>
              <Label htmlFor="zoning">Zoning</Label>
              <Input
                id="zoning"
                value={data.zoning || ''}
                onChange={(e) => handleInputChange('zoning', e.target.value)}
                placeholder="Current local government zoning"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentUse">Current Use</Label>
              <Input
                id="currentUse"
                value={data.currentUse || ''}
                onChange={(e) => handleInputChange('currentUse', e.target.value)}
                placeholder="e.g. residential, vacant residential site"
              />
            </div>
            <div>
              <Label htmlFor="lga">LGA</Label>
              <Input
                id="lga"
                value={data.lga || ''}
                onChange={(e) => handleInputChange('lga', e.target.value)}
                placeholder="Local Government Area"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="mainDwelling">Main Dwelling</Label>
            <Input
              id="mainDwelling"
              value={data.mainDwelling || ''}
              onChange={(e) => handleInputChange('mainDwelling', e.target.value)}
              placeholder="e.g. House with 3 bedrooms, 2 bathrooms"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="builtAbout">Built About</Label>
              <Input
                id="builtAbout"
                value={data.builtAbout || ''}
                onChange={(e) => handleInputChange('builtAbout', e.target.value)}
                placeholder="e.g. Year Built 2010 or Circa 1995"
              />
            </div>
            <div>
              <Label htmlFor="additions">Addition(s)</Label>
              <Input
                id="additions"
                value={data.additions || ''}
                onChange={(e) => handleInputChange('additions', e.target.value)}
                placeholder="Year of extensions or N/A"
              />
            </div>
          </div>

          {/* Areas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="livingArea">Living Area (sqm)</Label>
              <Input
                id="livingArea"
                type="number"
                value={data.livingArea || ''}
                onChange={(e) => handleInputChange('livingArea', e.target.value)}
                placeholder="Living area"
              />
            </div>
            <div>
              <Label htmlFor="outdoorArea">Outdoor Area (sqm)</Label>
              <Input
                id="outdoorArea"
                type="number"
                value={data.outdoorArea || ''}
                onChange={(e) => handleInputChange('outdoorArea', e.target.value)}
                placeholder="Outdoor area"
              />
            </div>
            <div>
              <Label htmlFor="otherArea">Other Area (sqm)</Label>
              <Input
                id="otherArea"
                type="number"
                value={data.otherArea || ''}
                onChange={(e) => handleInputChange('otherArea', e.target.value)}
                placeholder="Other area"
              />
            </div>
            <div>
              <Label htmlFor="carSpaces">Number of Car Spaces</Label>
              <Input
                id="carSpaces"
                type="number"
                value={data.carSpaces || ''}
                onChange={(e) => handleInputChange('carSpaces', e.target.value)}
                placeholder="Car spaces"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="carArea">Car Areas (sqm)</Label>
            <Input
              id="carArea"
              type="number"
              value={data.carArea || ''}
              onChange={(e) => handleInputChange('carArea', e.target.value)}
              placeholder="Total car area"
            />
          </div>

          {/* Assessment Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="marketability">Marketability</Label>
              <Select value={data.marketability || ''} onValueChange={(value) => handleInputChange('marketability', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select marketability rating..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="below-average">Below Average</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="heritageIssues">Heritage Issues</Label>
              <Select value={data.heritageIssues || ''} onValueChange={(value) => handleInputChange('heritageIssues', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="known">Known</SelectItem>
                  <SelectItem value="unknown">Not Known</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="environmentalIssues">Environmental Issues</Label>
            <Select value={data.environmentalIssues || ''} onValueChange={(value) => handleInputChange('environmentalIssues', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="known">Known</SelectItem>
                <SelectItem value="unknown">Not Known</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};