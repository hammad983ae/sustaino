import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

export interface DemoProperty {
  id: string;
  address: string;
  description: string;
  scenario: string;
  riskLevel: 'low' | 'medium' | 'high';
  expectedContradictions: number;
  marketValue: number;
  rentalAssessment: number;
  keyFeatures: string[];
}

const demoProperties: DemoProperty[] = [
  {
    id: 'mildura-highway',
    address: '24 Highway Drive, Mildura VIC 3500',
    description: 'Uninhabitable property missing kitchen, near highway and power lines',
    scenario: 'High-Risk Property with Contradictions',
    riskLevel: 'high',
    expectedContradictions: 3,
    marketValue: 180000,
    rentalAssessment: 0,
    keyFeatures: ['No kitchen', 'Highway proximity', 'Power lines', 'Essential repairs needed']
  },
  {
    id: 'melbourne-cbd',
    address: '15 Collins Street, Melbourne VIC 3000',
    description: 'Premium CBD apartment with excellent amenities',
    scenario: 'Low-Risk Premium Property',
    riskLevel: 'low',
    expectedContradictions: 0,
    marketValue: 850000,
    rentalAssessment: 650,
    keyFeatures: ['CBD location', 'Modern amenities', 'High marketability', 'No structural issues']
  },
  {
    id: 'sydney-harbour',
    address: '88 Harbour View Drive, Sydney NSW 2000',
    description: 'Waterfront property with partial construction issues',
    scenario: 'Medium-Risk with Minor Issues',
    riskLevel: 'medium',
    expectedContradictions: 1,
    marketValue: 1200000,
    rentalAssessment: 800,
    keyFeatures: ['Harbour views', 'Minor repairs needed', 'Good location', 'Some market concerns']
  },
  {
    id: 'brisbane-flood',
    address: '42 River Road, Brisbane QLD 4000',
    description: 'Flood-prone area with insurance and environmental concerns',
    scenario: 'Environmental Risk Property',
    riskLevel: 'high',
    expectedContradictions: 2,
    marketValue: 450000,
    rentalAssessment: 420,
    keyFeatures: ['Flood risk', 'Insurance concerns', 'Environmental issues', 'Market uncertainty']
  },
  {
    id: 'perth-new-construction',
    address: '156 Innovation Boulevard, Perth WA 6000',
    description: 'New construction with incomplete facilities',
    scenario: 'TBE Construction Property',
    riskLevel: 'medium',
    expectedContradictions: 1,
    marketValue: 650000,
    rentalAssessment: 500,
    keyFeatures: ['New construction', 'Incomplete sections', 'Modern design', 'Growth area']
  },
  {
    id: 'demonstration-contradictions',
    address: '789 Demonstration Street, Demo VIC 3000',
    description: 'Perfect for showing contradiction detection - appears normal but contains logical inconsistencies',
    scenario: 'Contradiction Demonstration Property',
    riskLevel: 'medium',
    expectedContradictions: 4,
    marketValue: 650000,
    rentalAssessment: 450,
    keyFeatures: ['Looks professional', 'Contains hidden contradictions', 'Perfect for client demos', 'Shows checker effectiveness']
  },
  {
    id: 'adelaide-heritage',
    address: '33 Heritage Square, Adelaide SA 5000',
    description: 'Heritage-listed property with restrictions but excellent location',
    scenario: 'Heritage Property with Constraints',
    riskLevel: 'medium',
    expectedContradictions: 0,
    marketValue: 720000,
    rentalAssessment: 580,
    keyFeatures: ['Heritage listed', 'CBD proximity', 'Renovation restrictions', 'Character features']
  }
];

interface DemoPropertySelectorProps {
  selectedProperty: string;
  onPropertySelect: (propertyId: string) => void;
  onGenerateReport: () => void;
  isGenerating: boolean;
}

export default function DemoPropertySelector({ 
  selectedProperty, 
  onPropertySelect, 
  onGenerateReport, 
  isGenerating 
}: DemoPropertySelectorProps) {
  const currentProperty = demoProperties.find(p => p.id === selectedProperty);

  const getRiskBadgeColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Demo Property Selector
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Select Demo Property Scenario
            </label>
            <Select value={selectedProperty} onValueChange={onPropertySelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a demo property..." />
              </SelectTrigger>
              <SelectContent>
                {demoProperties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    <div className="flex items-center gap-2">
                      <span>{property.address}</span>
                      <Badge 
                        variant="secondary" 
                        className={`${getRiskBadgeColor(property.riskLevel)} text-white text-xs`}
                      >
                        {property.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentProperty && (
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-lg">{currentProperty.address}</h4>
                    <p className="text-sm text-muted-foreground">{currentProperty.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Badge 
                      variant="secondary" 
                      className={`${getRiskBadgeColor(currentProperty.riskLevel)} text-white`}
                    >
                      {currentProperty.riskLevel.toUpperCase()} RISK
                    </Badge>
                    <div className="flex items-center gap-1 text-sm">
                      {currentProperty.expectedContradictions === 0 ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                      <span>
                        {currentProperty.expectedContradictions === 0 
                          ? 'No contradictions expected'
                          : `${currentProperty.expectedContradictions} contradiction${currentProperty.expectedContradictions > 1 ? 's' : ''} expected`
                        }
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>Market Value: ${currentProperty.marketValue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      <span>
                        Weekly Rent: ${currentProperty.rentalAssessment === 0 ? '0 (Uninhabitable)' : currentProperty.rentalAssessment.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {currentProperty.keyFeatures.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-800 mb-1">Demo Scenario:</p>
                    <p className="text-sm text-blue-700">{currentProperty.scenario}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Button 
            onClick={onGenerateReport} 
            disabled={!selectedProperty || isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? 'Generating Mock Report...' : 'Generate Mock Report with Contradiction Check'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { demoProperties };