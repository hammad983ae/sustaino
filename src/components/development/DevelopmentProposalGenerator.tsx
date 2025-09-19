import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Building2, 
  Calculator, 
  Zap,
  TrendingUp,
  MapPin,
  Info,
  CheckCircle,
  Lightbulb,
  Loader2
} from 'lucide-react';

interface SiteData {
  address: string;
  landArea: number;
  currentZoning: string;
  state: string;
  council: string;
  proposedZoning?: string;
  fsr?: number;
  proposedGFA?: number;
  estimatedUnits?: number;
  hdaSupport?: boolean;
  ssdaApproval?: boolean;
  heightLimit?: number;
  description?: string;
}

interface DevelopmentProposal {
  proposedZoning: string;
  floorSpaceRatio: number;
  heightLimit: number;
  proposedGFA: number;
  estimatedUnits: number;
  hdaSupport: boolean;
  ssdaApproval: boolean;
  developmentType: string;
  description: string;
  rationale: string;
  confidence: number;
}

interface DevelopmentProposalGeneratorProps {
  siteData: SiteData | null;
  onProposalGenerated: (proposal: DevelopmentProposal) => void;
  onFieldsUpdated: (updates: Partial<SiteData>) => void;
}

// Development type configurations
const DEVELOPMENT_TYPES = {
  'residential-low': {
    name: 'Low Density Residential',
    typicalFSR: [0.5, 0.8],
    typicalHeight: [8, 12],
    unitsPerHa: [15, 25],
    description: 'Single dwellings, dual occupancies, and low-rise apartment buildings'
  },
  'residential-medium': {
    name: 'Medium Density Residential', 
    typicalFSR: [0.8, 1.5],
    typicalHeight: [12, 18],
    unitsPerHa: [25, 60],
    description: 'Mid-rise apartment buildings and townhouse developments'
  },
  'residential-high': {
    name: 'High Density Residential',
    typicalFSR: [1.5, 3.0],
    typicalHeight: [18, 40],
    unitsPerHa: [60, 150],
    description: 'High-rise apartment buildings and mixed-use developments'
  },
  'mixed-use': {
    name: 'Mixed Use Development',
    typicalFSR: [1.0, 2.5],
    typicalHeight: [15, 35],
    unitsPerHa: [40, 100],
    description: 'Combination of residential, commercial, and/or office uses'
  },
  'commercial': {
    name: 'Commercial Development',
    typicalFSR: [1.0, 3.0],
    typicalHeight: [12, 50],
    unitsPerHa: [0, 0],
    description: 'Office buildings, retail centers, and commercial facilities'
  }
};

// Zoning classifications by state
const ZONING_CLASSIFICATIONS = {
  'NSW': {
    'R1': 'residential-low',
    'R2': 'residential-low', 
    'R3': 'residential-medium',
    'R4': 'residential-high',
    'B1': 'mixed-use',
    'B2': 'mixed-use',
    'B3': 'commercial',
    'B4': 'mixed-use'
  },
  'VIC': {
    'GRZ': 'residential-low',
    'NRZ': 'residential-low',
    'RGZ': 'residential-medium', 
    'MUZ': 'mixed-use',
    'C1Z': 'commercial',
    'C2Z': 'commercial'
  },
  'QLD': {
    'LDR': 'residential-low',
    'MDR': 'residential-medium',
    'HDR': 'residential-high',
    'MU': 'mixed-use',
    'CC': 'commercial'
  }
};

const DevelopmentProposalGenerator: React.FC<DevelopmentProposalGeneratorProps> = ({
  siteData,
  onProposalGenerated,
  onFieldsUpdated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [proposal, setProposal] = useState<DevelopmentProposal | null>(null);
  const [selectedDevelopmentType, setSelectedDevelopmentType] = useState<string>('');

  const generateProposal = async () => {
    if (!siteData || !siteData.landArea) {
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Determine development type based on zoning
      const state = siteData.state || 'VIC';
      const zoning = siteData.currentZoning?.toUpperCase() || '';
      const zoningClassifications = ZONING_CLASSIFICATIONS[state as keyof typeof ZONING_CLASSIFICATIONS] || {};
      
      // Find matching zoning classification
      let developmentType = 'residential-medium'; // default
      for (const [zone, type] of Object.entries(zoningClassifications)) {
        if (zoning.includes(zone)) {
          developmentType = type as string;
          break;
        }
      }

      const devConfig = DEVELOPMENT_TYPES[developmentType as keyof typeof DEVELOPMENT_TYPES];
      const landAreaHa = siteData.landArea / 10000; // Convert sqm to hectares

      // Calculate optimal development parameters
      const proposedFSR = devConfig.typicalFSR[0] + 
        (devConfig.typicalFSR[1] - devConfig.typicalFSR[0]) * 0.7; // Use 70% of range
      
      const proposedHeight = devConfig.typicalHeight[0] + 
        (devConfig.typicalHeight[1] - devConfig.typicalHeight[0]) * 0.6; // Use 60% of range
      
      const proposedGFA = Math.round(siteData.landArea * proposedFSR);
      
      const unitsPerHa = devConfig.unitsPerHa[0] + 
        (devConfig.unitsPerHa[1] - devConfig.unitsPerHa[0]) * 0.5;
      
      const estimatedUnits = developmentType === 'commercial' ? 0 : 
        Math.round(landAreaHa * unitsPerHa);

      // Determine if HDA support or SSDA approval likely needed
      const hdaSupport = siteData.landArea > 5000 || estimatedUnits > 50;
      const ssdaApproval = siteData.landArea > 10000 || proposedGFA > 25000 || 
        estimatedUnits > 100 || proposedHeight > 25;

      // Generate description and rationale
      const description = `${devConfig.name} comprising ${
        estimatedUnits > 0 ? `${estimatedUnits} residential units` : 'commercial facilities'
      } across ${Math.round(proposedGFA).toLocaleString()} sqm GFA. The development will be ${
        Math.round(proposedHeight)
      }m in height with an FSR of ${proposedFSR.toFixed(2)}.`;

      const rationale = `This proposal optimizes the development potential of the ${
        landAreaHa.toFixed(2)
      } hectare site while remaining within typical planning parameters for ${
        devConfig.name.toLowerCase()
      }. The proposed FSR of ${proposedFSR.toFixed(2)} and height of ${
        Math.round(proposedHeight)
      }m align with best practice urban design principles and local planning controls.`;

      // Suggest upgraded zoning if current zoning is restrictive
      let suggestedZoning = siteData.currentZoning || '';
      if (state === 'VIC') {
        if (zoning.includes('NRZ') && landAreaHa > 0.2) {
          suggestedZoning = 'General Residential Zone (GRZ)';
        } else if (zoning.includes('GRZ') && landAreaHa > 0.5) {
          suggestedZoning = 'Residential Growth Zone (RGZ)';
        }
      }

      const newProposal: DevelopmentProposal = {
        proposedZoning: suggestedZoning,
        floorSpaceRatio: Number(proposedFSR.toFixed(2)),
        heightLimit: Math.round(proposedHeight),
        proposedGFA: proposedGFA,
        estimatedUnits: estimatedUnits,
        hdaSupport,
        ssdaApproval,
        developmentType,
        description,
        rationale,
        confidence: 85
      };

      setProposal(newProposal);
      setSelectedDevelopmentType(developmentType);
      onProposalGenerated(newProposal);

    } catch (error) {
      console.error('Error generating proposal:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const applyProposal = () => {
    if (!proposal) return;

    onFieldsUpdated({
      proposedZoning: proposal.proposedZoning,
      fsr: proposal.floorSpaceRatio,
      proposedGFA: proposal.proposedGFA,
      estimatedUnits: proposal.estimatedUnits,
      hdaSupport: proposal.hdaSupport,
      ssdaApproval: proposal.ssdaApproval,
      heightLimit: proposal.heightLimit,
      description: proposal.description
    });
  };

  const adjustDevelopmentType = (newType: string) => {
    setSelectedDevelopmentType(newType);
    
    if (!siteData) return;

    const devConfig = DEVELOPMENT_TYPES[newType as keyof typeof DEVELOPMENT_TYPES];
    const landAreaHa = siteData.landArea / 10000;

    // Recalculate based on new development type
    const proposedFSR = devConfig.typicalFSR[0] + 
      (devConfig.typicalFSR[1] - devConfig.typicalFSR[0]) * 0.7;
    
    const proposedHeight = devConfig.typicalHeight[0] + 
      (devConfig.typicalHeight[1] - devConfig.typicalHeight[0]) * 0.6;
    
    const proposedGFA = Math.round(siteData.landArea * proposedFSR);
    
    const unitsPerHa = devConfig.unitsPerHa[0] + 
      (devConfig.unitsPerHa[1] - devConfig.unitsPerHa[0]) * 0.5;
    
    const estimatedUnits = newType === 'commercial' ? 0 : 
      Math.round(landAreaHa * unitsPerHa);

    const description = `${devConfig.name} comprising ${
      estimatedUnits > 0 ? `${estimatedUnits} residential units` : 'commercial facilities'
    } across ${Math.round(proposedGFA).toLocaleString()} sqm GFA.`;

    if (proposal) {
      const updatedProposal = {
        ...proposal,
        floorSpaceRatio: Number(proposedFSR.toFixed(2)),
        heightLimit: Math.round(proposedHeight),
        proposedGFA: proposedGFA,
        estimatedUnits: estimatedUnits,
        developmentType: newType,
        description
      };
      
      setProposal(updatedProposal);
      onProposalGenerated(updatedProposal);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Auto-Generate Development Proposal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!siteData?.landArea ? (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Please complete the site information (land area, zoning) to generate development proposals.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Site Area</div>
                  <div className="font-semibold">{siteData.landArea.toLocaleString()} sqm</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Current Zoning</div>
                  <div className="font-semibold">{siteData.currentZoning || 'Not specified'}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-semibold">{siteData.state}</div>
                </div>
              </div>

              <Button 
                onClick={generateProposal} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Site & Generating Proposal...
                  </>
                ) : (
                  <>
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Generate Optimal Development Proposal
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {proposal && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Generated Development Proposal
              </div>
              <Badge variant={proposal.confidence > 80 ? "default" : "secondary"}>
                {proposal.confidence}% confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Development Type Selector */}
            <div className="space-y-2">
              <Label>Development Type</Label>
              <Select value={selectedDevelopmentType} onValueChange={adjustDevelopmentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DEVELOPMENT_TYPES).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {DEVELOPMENT_TYPES[selectedDevelopmentType as keyof typeof DEVELOPMENT_TYPES]?.description}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-primary/5 rounded-lg">
                <div className="text-lg font-bold text-primary">{proposal.floorSpaceRatio}</div>
                <div className="text-xs text-muted-foreground">Floor Space Ratio</div>
              </div>
              <div className="text-center p-3 bg-primary/5 rounded-lg">
                <div className="text-lg font-bold text-primary">{proposal.heightLimit}m</div>
                <div className="text-xs text-muted-foreground">Height Limit</div>
              </div>
              <div className="text-center p-3 bg-primary/5 rounded-lg">
                <div className="text-lg font-bold text-primary">{proposal.proposedGFA.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">GFA (sqm)</div>
              </div>
              <div className="text-center p-3 bg-primary/5 rounded-lg">
                <div className="text-lg font-bold text-primary">{proposal.estimatedUnits}</div>
                <div className="text-xs text-muted-foreground">Estimated Units</div>
              </div>
            </div>

            {/* Approvals Required */}
            <div className="space-y-2">
              <Label>Likely Approvals Required</Label>
              <div className="flex flex-wrap gap-2">
                {proposal.hdaSupport && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    HDA Support
                  </Badge>
                )}
                {proposal.ssdaApproval && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    SSDA Approval
                  </Badge>
                )}
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Development Application
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Construction Certificate
                </Badge>
              </div>
            </div>

            {/* Proposal Description */}
            <div className="space-y-2">
              <Label>Development Description</Label>
              <div className="p-3 bg-muted/50 rounded-lg text-sm">
                {proposal.description}
              </div>
            </div>

            {/* Rationale */}
            <div className="space-y-2">
              <Label>Planning Rationale</Label>
              <div className="p-3 bg-muted/50 rounded-lg text-sm">
                {proposal.rationale}
              </div>
            </div>

            {/* Apply Button */}
            <Button onClick={applyProposal} className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              Apply This Proposal to Form
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DevelopmentProposalGenerator;