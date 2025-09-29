import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  FileText, 
  AlertTriangle, 
  BarChart3, 
  Building, 
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle
} from 'lucide-react';

interface ISFVFormData {
  // Section 1 - Property Summary
  reportType: string;
  inspectionDate: string;
  valuationDate: string;
  propertyAddress: string;
  titleSearchSighted: boolean;

  // Section 2 - Risk Analysis
  riskFactors: string[];
  riskRating: string;

  // Section 4 - Land Information
  propertyIdentification: string[];
  zoningEffect: string;
  distanceFromCapitalCity: string;
  directionFromCapitalCity: string;
  distanceFromRegionalCentre: string;
  directionFromRegionalCentre: string;
  additionalLocationDescription: string;
  
  // Neighbourhood
  surroundingProperties: string[];
  positiveInfrastructure: string;
  negativeInfrastructure: string;
  neighbourhoodDescription: string;

  // Site Description & Access
  frontage: string;
  sideDetails: string;
  lotShape: string;
  streetSide: string;
  dwellingOrientation: string;
  streetSystem: string;
  footpaths: string;
  accessLevel: string;
  siteDescription: string;

  // Services
  mainServices: string[];
  otherServices: string;
  servicesDescription: string;

  // Section 5 - Dwelling Description
  style: string;
  streetAppeal: string;
  mainWallsRoof: string;
  internalCondition: string;
  mainInteriorLining: string;
  externalCondition: string;
  flooring: string;
  windowFrames: string;
  accommodation: string;
  interiorLayout: string;
  fixturesFitting: string;

  // Section 6 - Ancillary Improvements
  ancillaryImprovements: string;

  // Previous Sales Information
  previousSaleDate: string;
  previousSalePrice: string;
  previousSaleAgent: string;
  previousSaleDaysOnMarket: string;
  previousSaleComments: string;
  marketConditionAnalysis: string;
  propertyImprovementsSince: string;
  additionalComments: string;

  // Current/Proposed Sale
  contractDate: string;
  currentSalePrice: string;
  currentSaleAgent: string;
  saleInLineWithMarket: string;
  salePriceAnalysis: string;
  contractOfSaleSighted: boolean;
  sellingPeriodOver6Months: boolean;
  underContractStatus: string;

  // Real Property Description
  realPropertyDescription: string;
  encumbrances: string;
  siteDimensions: string;
  siteArea: string;
  zoning: string;
  currentUse: string;
  lga: string;

  // Main Dwelling & Property Details
  mainDwelling: string;
  builtAbout: string;
  additions: string;
  livingArea: string;
  outdoorArea: string;
  otherArea: string;
  carAccommodation: string;
  carAreas: string;

  // Property Conditions & Issues
  marketability: string;
  heritageIssues: boolean;
  environmentalIssues: boolean;
  essentialRepairs: boolean;
  estimatedCostToRepair: string;

  // Valuation Summary
  interestValued: string;
  valueComponent: string;
  rentalAssessment: string;
  insuranceEstimate: string;
  landValue: string;
  improvementsValue: string;
  marketValue: string;
}

export default function ISFVPlatform() {
  const [formData, setFormData] = useState<ISFVFormData>({
    // Section 1 defaults
    reportType: 'AS IS (Existing Property)',
    inspectionDate: '29/09/2025',
    valuationDate: '29/09/2025',
    propertyAddress: '',
    titleSearchSighted: false,

    // Section 2 defaults
    riskFactors: [],
    riskRating: '',

    // Section 4 defaults
    propertyIdentification: ['Aerial Mapping', 'Physical Inspection', 'Cadastral Map'],
    zoningEffect: 'The existing use complies with current zoning requirements.',
    distanceFromCapitalCity: '550km',
    directionFromCapitalCity: '',
    distanceFromRegionalCentre: '9km',
    directionFromRegionalCentre: '',
    additionalLocationDescription: '',
    
    surroundingProperties: ['Residential'],
    positiveInfrastructure: 'schools, parks, shopping centres',
    negativeInfrastructure: 'highways, industrial noise',
    neighbourhoodDescription: '',

    frontage: '20m',
    sideDetails: '30m depth',
    lotShape: 'Rectangular',
    streetSide: 'North Side',
    dwellingOrientation: 'North',
    streetSystem: 'Double Lane',
    footpaths: 'Concrete',
    accessLevel: 'Easy and Direct',
    siteDescription: '',

    mainServices: ['Electricity', 'Water', 'Sewer'],
    otherServices: 'Satellite internet, bore water',
    servicesDescription: '',

    // Section 5 defaults
    style: 'Double storey brick veneer dwelling',
    streetAppeal: '',
    mainWallsRoof: 'Rendered Brick Walls Tiled',
    internalCondition: '',
    mainInteriorLining: 'Plasterboard',
    externalCondition: '',
    flooring: 'Concrete slab and timber for second storey',
    windowFrames: 'Aluminium',
    accommodation: 'Dwelling 3 Bedroom(s) And 2 Bathroom(s) Plus study/fourth bedroom, laundry, powdered room, walk in pantry, lounge/theatre room, family/meals/kitchen, gallery, entry, 2 x walk in robes,',
    interiorLayout: 'Functional',
    fixturesFitting: 'reverse cycle heating and cooling, split systems, 2 x gas log fires, evaporative cooling, integrated audio speakers throughout, laminate and marble benchtops, tiles, carpet, high decorative ceilings., timber stair case, 900 mm gas stove, double wall oven, 900 mm rangehood, timber cupboards (floor and wall), down lights, instant gas HWS.',

    // Section 6 defaults
    ancillaryImprovements: 'Balcony, verandahs/outdoor area, undercover BBQ area with built in BBQ, workshop, fernery, extensive gardens with removable garden beds and gravel surrounds, automated irrigation, clothes line, fountain/pond, full concrete pathing throughout gardens and house surrounds, colorbond and powdered coating aluminium fencing.',

    // Sales defaults
    previousSaleDate: '',
    previousSalePrice: '0',
    previousSaleAgent: 'Real estate agent',
    previousSaleDaysOnMarket: '0',
    previousSaleComments: '',
    marketConditionAnalysis: '',
    propertyImprovementsSince: '',
    additionalComments: '',

    contractDate: '',
    currentSalePrice: '0',
    currentSaleAgent: 'Real estate agent',
    saleInLineWithMarket: '',
    salePriceAnalysis: '',
    contractOfSaleSighted: false,
    sellingPeriodOver6Months: false,
    underContractStatus: 'Not Under Contract',

    // Property Description defaults
    realPropertyDescription: 'Lot 9 PS444723 - Title not supplied for Volume and Folio',
    encumbrances: 'Not Known',
    siteDimensions: 'Irregular shape lot with approximately 43 metre frontage...',
    siteArea: '4204 sqm',
    zoning: 'LDRZ2',
    currentUse: '',
    lga: 'Mildura Rural City Council',

    mainDwelling: 'Dwelling with 3 Bedroom(s) And 2 Bathroom(s)',
    builtAbout: 'Circa 2005',
    additions: 'N/A',
    livingArea: '336',
    outdoorArea: '44',
    otherArea: '0',
    carAccommodation: '3',
    carAreas: '72',

    marketability: 'Good',
    heritageIssues: false,
    environmentalIssues: false,
    essentialRepairs: false,
    estimatedCostToRepair: '',

    // Valuation defaults
    interestValued: 'Fee Simple Vacant Possession',
    valueComponent: 'Existing Property',
    rentalAssessment: '',
    insuranceEstimate: '',
    landValue: '',
    improvementsValue: '',
    marketValue: ''
  });

  const updateFormData = (field: keyof ISFVFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof ISFVFormData, option: string, checked: boolean) => {
    const currentArray = formData[field] as string[];
    if (checked) {
      updateFormData(field, [...currentArray, option]);
    } else {
      updateFormData(field, currentArray.filter(item => item !== option));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">ISFV Platform Demo</h1>
        <p className="text-muted-foreground">
          Instant Short Form Valuation - Full Featured Demo
        </p>
      </div>

      {/* Main Form Tabs */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="summary" className="text-xs">
            <FileText className="h-4 w-4 mr-1" />
            Property Summary
          </TabsTrigger>
          <TabsTrigger value="risk" className="text-xs">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Risk Analysis
          </TabsTrigger>
          <TabsTrigger value="land" className="text-xs">
            <MapPin className="h-4 w-4 mr-1" />
            Land Information
          </TabsTrigger>
          <TabsTrigger value="dwelling" className="text-xs">
            <Building className="h-4 w-4 mr-1" />
            Dwelling Description
          </TabsTrigger>
          <TabsTrigger value="sales" className="text-xs">
            <BarChart3 className="h-4 w-4 mr-1" />
            Sales Information
          </TabsTrigger>
          <TabsTrigger value="valuation" className="text-xs">
            <DollarSign className="h-4 w-4 mr-1" />
            Valuation Summary
          </TabsTrigger>
        </TabsList>

        {/* Section 1: Property Summary */}
        <TabsContent value="summary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Section 1 - Property Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report Configuration */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Report Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="reportType">Report Type</Label>
                    <Select value={formData.reportType} onValueChange={(value) => updateFormData('reportType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AS IS (Existing Property)">AS IS (Existing Property)</SelectItem>
                        <SelectItem value="Proposed Development">Proposed Development</SelectItem>
                        <SelectItem value="Vacant Land">Vacant Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="inspectionDate">Inspection Date</Label>
                    <Input
                      id="inspectionDate"
                      value={formData.inspectionDate}
                      onChange={(e) => updateFormData('inspectionDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="valuationDate">Valuation Date</Label>
                    <Input
                      id="valuationDate"
                      value={formData.valuationDate}
                      onChange={(e) => updateFormData('valuationDate', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Standard Report: Current property condition</Label>
                  <div className="text-sm text-muted-foreground mt-1">
                    This selection indicates the report type and condition assessment approach.
                  </div>
                </div>
              </div>

              {/* Property Address */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="propertyAddress">Property Address</Label>
                  <Input
                    id="propertyAddress"
                    placeholder="Enter full property address"
                    value={formData.propertyAddress}
                    onChange={(e) => updateFormData('propertyAddress', e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="titleSearchSighted"
                    checked={formData.titleSearchSighted}
                    onCheckedChange={(checked) => updateFormData('titleSearchSighted', checked)}
                  />
                  <Label htmlFor="titleSearchSighted">Title Search Sighted?</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Section 2: Risk Analysis */}
        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Section 2 - Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Risk Factors</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Environmental', 'Structural', 'Market', 'Legal', 'Economic', 'Location'].map((factor) => (
                    <div key={factor} className="flex items-center space-x-2">
                      <Checkbox
                        id={`risk-${factor}`}
                        checked={formData.riskFactors.includes(factor)}
                        onCheckedChange={(checked) => handleCheckboxChange('riskFactors', factor, checked as boolean)}
                      />
                      <Label htmlFor={`risk-${factor}`}>{factor}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="riskRating">Overall Risk Rating</Label>
                <Select value={formData.riskRating} onValueChange={(value) => updateFormData('riskRating', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low Risk</SelectItem>
                    <SelectItem value="Medium">Medium Risk</SelectItem>
                    <SelectItem value="High">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Section 4: Land Information */}
        <TabsContent value="land" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Section 4 - Land Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Auto-Fill from APIs */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Auto-Fill from APIs</h3>
                <div className="space-y-4">
                  <Label>Property Identification</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Aerial Mapping', 'Physical Inspection', 'Cadastral Map', 'Survey Plan'].map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Checkbox
                          id={`identification-${method}`}
                          checked={formData.propertyIdentification.includes(method)}
                          onCheckedChange={(checked) => handleCheckboxChange('propertyIdentification', method, checked as boolean)}
                        />
                        <Label htmlFor={`identification-${method}`} className="text-sm">{method}</Label>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                    Property identified using aerial mapping, physical inspection, and cadastral map verification.
                  </div>
                </div>

                <div>
                  <Label htmlFor="zoningEffect">Zoning Effect</Label>
                  <Textarea
                    id="zoningEffect"
                    value={formData.zoningEffect}
                    onChange={(e) => updateFormData('zoningEffect', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="distanceFromCapitalCity">Distance from Major Capital City</Label>
                    <Input
                      id="distanceFromCapitalCity"
                      placeholder="e.g., 550km"
                      value={formData.distanceFromCapitalCity}
                      onChange={(e) => updateFormData('distanceFromCapitalCity', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="directionFromCapitalCity">Direction from Major Capital City</Label>
                    <Select value={formData.directionFromCapitalCity} onValueChange={(value) => updateFormData('directionFromCapitalCity', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="North">North</SelectItem>
                        <SelectItem value="South">South</SelectItem>
                        <SelectItem value="East">East</SelectItem>
                        <SelectItem value="West">West</SelectItem>
                        <SelectItem value="North-East">North-East</SelectItem>
                        <SelectItem value="North-West">North-West</SelectItem>
                        <SelectItem value="South-East">South-East</SelectItem>
                        <SelectItem value="South-West">South-West</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="distanceFromRegionalCentre">Distance from Major Regional Centre</Label>
                    <Input
                      id="distanceFromRegionalCentre"
                      placeholder="e.g., 9km"
                      value={formData.distanceFromRegionalCentre}
                      onChange={(e) => updateFormData('distanceFromRegionalCentre', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="directionFromRegionalCentre">Direction from Major Regional Centre</Label>
                    <Select value={formData.directionFromRegionalCentre} onValueChange={(value) => updateFormData('directionFromRegionalCentre', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="North">North</SelectItem>
                        <SelectItem value="South">South</SelectItem>
                        <SelectItem value="East">East</SelectItem>
                        <SelectItem value="West">West</SelectItem>
                        <SelectItem value="North-East">North-East</SelectItem>
                        <SelectItem value="North-West">North-West</SelectItem>
                        <SelectItem value="South-East">South-East</SelectItem>
                        <SelectItem value="South-West">South-West</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="additionalLocationDescription">Additional location description</Label>
                  <Textarea
                    id="additionalLocationDescription"
                    value={formData.additionalLocationDescription}
                    onChange={(e) => updateFormData('additionalLocationDescription', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>

              {/* Neighbourhood */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Neighbourhood</h3>
                <div className="space-y-4">
                  <Label>Surrounding Properties:</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Residential', 'Commercial', 'Industrial', 'Farming'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`surrounding-${type}`}
                          checked={formData.surroundingProperties.includes(type)}
                          onCheckedChange={(checked) => handleCheckboxChange('surroundingProperties', type, checked as boolean)}
                        />
                        <Label htmlFor={`surrounding-${type}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="positiveInfrastructure">Positive Infrastructure</Label>
                    <Input
                      id="positiveInfrastructure"
                      placeholder="e.g., schools, parks, shopping centres"
                      value={formData.positiveInfrastructure}
                      onChange={(e) => updateFormData('positiveInfrastructure', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="negativeInfrastructure">Negative Infrastructure</Label>
                    <Input
                      id="negativeInfrastructure"
                      placeholder="e.g., highways, industrial noise"
                      value={formData.negativeInfrastructure}
                      onChange={(e) => updateFormData('negativeInfrastructure', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="neighbourhoodDescription">Description of surrounding properties and neighbourhood characteristics</Label>
                  <Textarea
                    id="neighbourhoodDescription"
                    value={formData.neighbourhoodDescription}
                    onChange={(e) => updateFormData('neighbourhoodDescription', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Site Description & Access */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Site Description & Access</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="frontage">Frontage</Label>
                    <Input
                      id="frontage"
                      placeholder="e.g., 20m"
                      value={formData.frontage}
                      onChange={(e) => updateFormData('frontage', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sideDetails">Side Details</Label>
                    <Input
                      id="sideDetails"
                      placeholder="e.g., 30m depth"
                      value={formData.sideDetails}
                      onChange={(e) => updateFormData('sideDetails', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lotShape">Lot Shape</Label>
                    <Select value={formData.lotShape} onValueChange={(value) => updateFormData('lotShape', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rectangular">Rectangular</SelectItem>
                        <SelectItem value="Square">Square</SelectItem>
                        <SelectItem value="Irregular">Irregular</SelectItem>
                        <SelectItem value="Triangular">Triangular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="streetSide">Street Side</Label>
                    <Select value={formData.streetSide} onValueChange={(value) => updateFormData('streetSide', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="North Side">North Side</SelectItem>
                        <SelectItem value="South Side">South Side</SelectItem>
                        <SelectItem value="East Side">East Side</SelectItem>
                        <SelectItem value="West Side">West Side</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dwellingOrientation">Dwelling Orientation</Label>
                    <Select value={formData.dwellingOrientation} onValueChange={(value) => updateFormData('dwellingOrientation', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="North">North</SelectItem>
                        <SelectItem value="South">South</SelectItem>
                        <SelectItem value="East">East</SelectItem>
                        <SelectItem value="West">West</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="streetSystem">Street System</Label>
                    <Select value={formData.streetSystem} onValueChange={(value) => updateFormData('streetSystem', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Double Lane">Double Lane</SelectItem>
                        <SelectItem value="Single Lane">Single Lane</SelectItem>
                        <SelectItem value="Four Lane">Four Lane</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="footpaths">Footpaths</Label>
                    <Select value={formData.footpaths} onValueChange={(value) => updateFormData('footpaths', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Concrete">Concrete</SelectItem>
                        <SelectItem value="Bitumen">Bitumen</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="accessLevel">Access Level</Label>
                    <Select value={formData.accessLevel} onValueChange={(value) => updateFormData('accessLevel', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy and Direct">Easy and Direct</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Difficult">Difficult</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="siteDescription">Shape, topography, relationship to road level, suitability for building</Label>
                  <Textarea
                    id="siteDescription"
                    value={formData.siteDescription}
                    onChange={(e) => updateFormData('siteDescription', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Services</h3>
                <div className="space-y-4">
                  <Label>Main Services</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {['Electricity', 'Water', 'Sewer', 'Gas', 'Storm Water', 'Telephone', 'NBN', 'Cable', 'Solar', 'Septic'].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service}`}
                          checked={formData.mainServices.includes(service)}
                          onCheckedChange={(checked) => handleCheckboxChange('mainServices', service, checked as boolean)}
                        />
                        <Label htmlFor={`service-${service}`} className="text-sm">{service}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="otherServices">Other Services</Label>
                  <Input
                    id="otherServices"
                    placeholder="e.g., Satellite internet, bore water"
                    value={formData.otherServices}
                    onChange={(e) => updateFormData('otherServices', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="servicesDescription">List utilities connected or available (do not use 'all usual services are connected')</Label>
                  <Textarea
                    id="servicesDescription"
                    value={formData.servicesDescription}
                    onChange={(e) => updateFormData('servicesDescription', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>

              {/* Real Property Description */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Real Property Description</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="realPropertyDescription">Real Property Description</Label>
                    <Input
                      id="realPropertyDescription"
                      value={formData.realPropertyDescription}
                      onChange={(e) => updateFormData('realPropertyDescription', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="encumbrances">Encumbrances/Restrictions</Label>
                    <Input
                      id="encumbrances"
                      value={formData.encumbrances}
                      onChange={(e) => updateFormData('encumbrances', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="siteDimensions">Site Dimensions</Label>
                    <Input
                      id="siteDimensions"
                      value={formData.siteDimensions}
                      onChange={(e) => updateFormData('siteDimensions', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteArea">Site Area</Label>
                    <Input
                      id="siteArea"
                      value={formData.siteArea}
                      onChange={(e) => updateFormData('siteArea', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zoning">Zoning</Label>
                    <Input
                      id="zoning"
                      value={formData.zoning}
                      onChange={(e) => updateFormData('zoning', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentUse">Current Use</Label>
                    <Select value={formData.currentUse} onValueChange={(value) => updateFormData('currentUse', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select current use" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                        <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lga">LGA</Label>
                    <Input
                      id="lga"
                      value={formData.lga}
                      onChange={(e) => updateFormData('lga', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Section 5: Dwelling Description */}
        <TabsContent value="dwelling" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Section 5 - Dwelling Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="style">Style</Label>
                  <Input
                    id="style"
                    placeholder="e.g., Double storey brick veneer dwelling"
                    value={formData.style}
                    onChange={(e) => updateFormData('style', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="streetAppeal">Street Appeal</Label>
                  <Select value={formData.streetAppeal} onValueChange={(value) => updateFormData('streetAppeal', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select street appeal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Average">Average</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mainWallsRoof">Main Walls & Roof</Label>
                  <Input
                    id="mainWallsRoof"
                    placeholder="e.g., Rendered Brick Walls Tiled"
                    value={formData.mainWallsRoof}
                    onChange={(e) => updateFormData('mainWallsRoof', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="internalCondition">Internal Condition</Label>
                  <Select value={formData.internalCondition} onValueChange={(value) => updateFormData('internalCondition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select internal condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Average">Average</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mainInteriorLining">Main Interior Lining</Label>
                  <Input
                    id="mainInteriorLining"
                    value={formData.mainInteriorLining}
                    onChange={(e) => updateFormData('mainInteriorLining', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="externalCondition">External Condition</Label>
                  <Select value={formData.externalCondition} onValueChange={(value) => updateFormData('externalCondition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select external condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Average">Average</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="flooring">Flooring</Label>
                  <Input
                    id="flooring"
                    value={formData.flooring}
                    onChange={(e) => updateFormData('flooring', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="windowFrames">Window Frames</Label>
                  <Input
                    id="windowFrames"
                    value={formData.windowFrames}
                    onChange={(e) => updateFormData('windowFrames', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="accommodation">Accommodation</Label>
                <Textarea
                  id="accommodation"
                  value={formData.accommodation}
                  onChange={(e) => updateFormData('accommodation', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="interiorLayout">Interior Layout</Label>
                <Select value={formData.interiorLayout} onValueChange={(value) => updateFormData('interiorLayout', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Functional">Functional</SelectItem>
                    <SelectItem value="Open Plan">Open Plan</SelectItem>
                    <SelectItem value="Traditional">Traditional</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fixturesFitting">Fixture & Fitting</Label>
                <Textarea
                  id="fixturesFitting"
                  value={formData.fixturesFitting}
                  onChange={(e) => updateFormData('fixturesFitting', e.target.value)}
                  rows={4}
                />
              </div>

              {/* Main Dwelling & Property Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Main Dwelling & Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="mainDwelling">Main Dwelling</Label>
                    <Input
                      id="mainDwelling"
                      value={formData.mainDwelling}
                      onChange={(e) => updateFormData('mainDwelling', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="builtAbout">Built About</Label>
                    <Input
                      id="builtAbout"
                      value={formData.builtAbout}
                      onChange={(e) => updateFormData('builtAbout', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="additions">Additions</Label>
                    <Input
                      id="additions"
                      value={formData.additions}
                      onChange={(e) => updateFormData('additions', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Areas</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <Label htmlFor="livingArea">Living (sqm)</Label>
                      <Input
                        id="livingArea"
                        type="number"
                        value={formData.livingArea}
                        onChange={(e) => updateFormData('livingArea', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="outdoorArea">Outdoor (sqm)</Label>
                      <Input
                        id="outdoorArea"
                        type="number"
                        value={formData.outdoorArea}
                        onChange={(e) => updateFormData('outdoorArea', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="otherArea">Other (sqm)</Label>
                      <Input
                        id="otherArea"
                        type="number"
                        value={formData.otherArea}
                        onChange={(e) => updateFormData('otherArea', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="carAccommodation">Car Accommodation</Label>
                      <Input
                        id="carAccommodation"
                        value={formData.carAccommodation}
                        onChange={(e) => updateFormData('carAccommodation', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="carAreas">Car Areas (sqm)</Label>
                      <Input
                        id="carAreas"
                        type="number"
                        value={formData.carAreas}
                        onChange={(e) => updateFormData('carAreas', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 6: Ancillary Improvements */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Section 6 - Ancillary Improvements</h3>
                <div>
                  <Label htmlFor="ancillaryImprovements">Ancillary Improvements</Label>
                  <Textarea
                    id="ancillaryImprovements"
                    value={formData.ancillaryImprovements}
                    onChange={(e) => updateFormData('ancillaryImprovements', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              {/* Property Conditions & Issues */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Property Conditions & Issues</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="marketability">Marketability</Label>
                    <Select value={formData.marketability} onValueChange={(value) => updateFormData('marketability', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Average">Average</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="estimatedCostToRepair">Estimated Costs to Repair</Label>
                    <Input
                      id="estimatedCostToRepair"
                      placeholder="Enter estimated cost if applicable"
                      value={formData.estimatedCostToRepair}
                      onChange={(e) => updateFormData('estimatedCostToRepair', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="heritageIssues"
                      checked={formData.heritageIssues}
                      onCheckedChange={(checked) => updateFormData('heritageIssues', checked)}
                    />
                    <Label htmlFor="heritageIssues">Heritage Issues</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="environmentalIssues"
                      checked={formData.environmentalIssues}
                      onCheckedChange={(checked) => updateFormData('environmentalIssues', checked)}
                    />
                    <Label htmlFor="environmentalIssues">Environmental Issues</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="essentialRepairs"
                      checked={formData.essentialRepairs}
                      onCheckedChange={(checked) => updateFormData('essentialRepairs', checked)}
                    />
                    <Label htmlFor="essentialRepairs">Essential Repairs</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Information */}
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Previous and Current Sales Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Previous Sale */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Previous Sale of Subject Property (Last 3 Years)</h3>
                <div className="text-sm text-muted-foreground mb-4">Data source: DOMAIN API</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="previousSaleDate">Date of Sale</Label>
                    <Input
                      id="previousSaleDate"
                      placeholder="dd/mm/yyyy"
                      value={formData.previousSaleDate}
                      onChange={(e) => updateFormData('previousSaleDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="previousSalePrice">Sale Price ($)</Label>
                    <Input
                      id="previousSalePrice"
                      type="number"
                      value={formData.previousSalePrice}
                      onChange={(e) => updateFormData('previousSalePrice', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="previousSaleAgent">Agent</Label>
                    <Input
                      id="previousSaleAgent"
                      value={formData.previousSaleAgent}
                      onChange={(e) => updateFormData('previousSaleAgent', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="previousSaleDaysOnMarket">Days on Market</Label>
                    <Input
                      id="previousSaleDaysOnMarket"
                      type="number"
                      value={formData.previousSaleDaysOnMarket}
                      onChange={(e) => updateFormData('previousSaleDaysOnMarket', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="marketConditionAnalysis">Market Condition Analysis</Label>
                    <Select value={formData.marketConditionAnalysis} onValueChange={(value) => updateFormData('marketConditionAnalysis', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select market condition change" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Improved">Market Improved</SelectItem>
                        <SelectItem value="Declined">Market Declined</SelectItem>
                        <SelectItem value="Stable">Market Stable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="previousSaleComments">Previous Sale Comments</Label>
                  <Textarea
                    id="previousSaleComments"
                    value={formData.previousSaleComments}
                    onChange={(e) => updateFormData('previousSaleComments', e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="propertyImprovementsSince">Property Improvements Since Previous Sale</Label>
                  <Textarea
                    id="propertyImprovementsSince"
                    placeholder="Describe any renovations, extensions, or new improvements made since the previous sale"
                    value={formData.propertyImprovementsSince}
                    onChange={(e) => updateFormData('propertyImprovementsSince', e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="additionalComments">Additional Comments</Label>
                  <Textarea
                    id="additionalComments"
                    placeholder="Additional analysis of the previous sale and market conditions"
                    value={formData.additionalComments}
                    onChange={(e) => updateFormData('additionalComments', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>

              {/* Current/Proposed Sale */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Current/Proposed Sale of Subject Property</h3>
                <div className="text-sm text-muted-foreground mb-4">Data source: OCR Extraction</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contractDate">Contract Date</Label>
                    <Input
                      id="contractDate"
                      placeholder="dd/mm/yyyy"
                      value={formData.contractDate}
                      onChange={(e) => updateFormData('contractDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentSalePrice">Sale Price ($)</Label>
                    <Input
                      id="currentSalePrice"
                      type="number"
                      value={formData.currentSalePrice}
                      onChange={(e) => updateFormData('currentSalePrice', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentSaleAgent">Agent</Label>
                    <Input
                      id="currentSaleAgent"
                      value={formData.currentSaleAgent}
                      onChange={(e) => updateFormData('currentSaleAgent', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="saleInLineWithMarket">Current Sale in line with current local Market?</Label>
                  <Select value={formData.saleInLineWithMarket} onValueChange={(value) => updateFormData('saleInLineWithMarket', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Yes or No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="salePriceAnalysis">Sale Price Reasonableness Analysis</Label>
                  <Textarea
                    id="salePriceAnalysis"
                    placeholder="Analysis of whether the sale price is reasonable based on current market conditions"
                    value={formData.salePriceAnalysis}
                    onChange={(e) => updateFormData('salePriceAnalysis', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Contract and Selling Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Contract and Selling Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="contractOfSaleSighted"
                      checked={formData.contractOfSaleSighted}
                      onCheckedChange={(checked) => updateFormData('contractOfSaleSighted', checked)}
                    />
                    <Label htmlFor="contractOfSaleSighted">Full copy of Contract of Sale sighted?</Label>
                  </div>
                  {!formData.contractOfSaleSighted && (
                    <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded">
                      A full copy of the contract of sale must be sighted before finalizing the valuation.
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sellingPeriodOver6Months"
                      checked={formData.sellingPeriodOver6Months}
                      onCheckedChange={(checked) => updateFormData('sellingPeriodOver6Months', checked)}
                    />
                    <Label htmlFor="sellingPeriodOver6Months">Selling period greater than 6 months?</Label>
                  </div>
                  <div>
                    <Label htmlFor="underContractStatus">Under Contract Status</Label>
                    <Select value={formData.underContractStatus} onValueChange={(value) => updateFormData('underContractStatus', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Under Contract">Under Contract</SelectItem>
                        <SelectItem value="Not Under Contract">Not Under Contract</SelectItem>
                        <SelectItem value="Recently Sold">Recently Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                    This selection can be configured in the Automation Control Centre
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Valuation Summary */}
        <TabsContent value="valuation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                3. VALUATION SUMMARY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interestValued">Interest Valued:</Label>
                  <Input
                    id="interestValued"
                    value={formData.interestValued}
                    onChange={(e) => updateFormData('interestValued', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="valueComponent">Value Component:</Label>
                  <Input
                    id="valueComponent"
                    value={formData.valueComponent}
                    onChange={(e) => updateFormData('valueComponent', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Other Assessments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rentalAssessment">Rental Assessment Unfurnished:</Label>
                    <div className="flex items-center gap-2">
                      <span>$</span>
                      <Input
                        id="rentalAssessment"
                        placeholder="To be calculated"
                        value={formData.rentalAssessment}
                        onChange={(e) => updateFormData('rentalAssessment', e.target.value)}
                      />
                      <span>Per week</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="insuranceEstimate">Insurance Estimate:</Label>
                    <div className="flex items-center gap-2">
                      <span>$</span>
                      <Input
                        id="insuranceEstimate"
                        placeholder="To be calculated"
                        value={formData.insuranceEstimate}
                        onChange={(e) => updateFormData('insuranceEstimate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Valuation Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="landValue">Land:</Label>
                    <div className="flex items-center gap-2">
                      <span>$</span>
                      <Input
                        id="landValue"
                        placeholder="To be calculated"
                        value={formData.landValue}
                        onChange={(e) => updateFormData('landValue', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="improvementsValue">Improvements:</Label>
                    <div className="flex items-center gap-2">
                      <span>$</span>
                      <Input
                        id="improvementsValue"
                        placeholder="To be calculated"
                        value={formData.improvementsValue}
                        onChange={(e) => updateFormData('improvementsValue', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <div className="text-center">
                    <Label htmlFor="marketValue" className="text-2xl font-bold text-green-800">MARKET VALUE:</Label>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-3xl font-bold text-green-600">$</span>
                      <Input
                        id="marketValue"
                        placeholder="To be calculated"
                        value={formData.marketValue}
                        onChange={(e) => updateFormData('marketValue', e.target.value)}
                        className="text-3xl font-bold text-green-600 text-center border-2 border-green-300 bg-white"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">(Enter amount)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Panel */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <CheckCircle className="h-5 w-5" />
            ISFV Demo Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {formData.propertyAddress || 'Property Address Required'}
              </div>
              <div className="text-sm text-muted-foreground">Property Address</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {formData.reportType}
              </div>
              <div className="text-sm text-muted-foreground">Report Type</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {formData.marketValue ? `$${formData.marketValue}` : 'TBC'}
              </div>
              <div className="text-sm text-muted-foreground">Market Value</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Badge variant="outline" className="text-blue-700 border-blue-300">
              Fully Interactive Demo - All Fields Functional
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}