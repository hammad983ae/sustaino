import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  RefreshCw, 
  AlertTriangle, 
  Home, 
  MapPin, 
  TrendingUp,
  Eye,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface GeneralCommentsTabProps {
  propertyData: any;
  riskRatings: any;
  vraAssessment: any;
  salesEvidence: any[];
  generalComments: string;
  onCommentsChange: (comments: string) => void;
}

export function GeneralCommentsTab({ 
  propertyData, 
  riskRatings, 
  vraAssessment, 
  salesEvidence,
  generalComments,
  onCommentsChange 
}: GeneralCommentsTabProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateComments = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let comments = "GENERAL COMMENTS - PROPERTY VALUATION ASSESSMENT\n\n";
      
      // Property Details Section
      comments += "PROPERTY SUMMARY:\n";
      if (propertyData?.address) {
        comments += `• Property Address: ${propertyData.address}\n`;
      }
      if (propertyData?.landArea) {
        comments += `• Land Area: ${propertyData.landArea} sqm\n`;
      }
      if (propertyData?.buildingArea || propertyData?.livingArea) {
        comments += `• Building Area: ${propertyData.buildingArea || propertyData.livingArea} sqm\n`;
      }
      if (propertyData?.bedrooms && propertyData?.bathrooms) {
        comments += `• Configuration: ${propertyData.bedrooms} bedrooms, ${propertyData.bathrooms} bathrooms\n`;
      }
      if (propertyData?.yearBuilt) {
        comments += `• Year Built: Circa ${propertyData.yearBuilt}\n`;
      }
      
      // Risk Assessment Section
      comments += "\nRISK ASSESSMENT:\n";
      const highRiskItems = [];
      
      if (riskRatings) {
        Object.entries(riskRatings).forEach(([key, value]) => {
          if (typeof value === 'number' && value >= 3) {
            const riskName = key.replace(/([A-Z])/g, ' $1').toLowerCase();
            highRiskItems.push(`${riskName.charAt(0).toUpperCase() + riskName.slice(1)} (Rating: ${value}/5)`);
          }
        });
      }
      
      if (highRiskItems.length > 0) {
        comments += "• Risk Factors Above Level 3:\n";
        highRiskItems.forEach(item => {
          comments += `  - ${item}\n`;
        });
      } else {
        comments += "• All risk factors assessed as low to moderate (Rating 1-2)\n";
      }
      
      // VRA Assessment Section
      if (vraAssessment && Object.values(vraAssessment).some(Boolean)) {
        comments += "\nVALUATION RISK ALERTS (VRA):\n";
        if (vraAssessment.higherRiskProperty) {
          comments += "• Higher Risk Property - requires additional consideration\n";
        }
        if (vraAssessment.adverseMarketability) {
          comments += "• Adverse Marketability factors identified\n";
        }
        if (vraAssessment.incompleteConstruction) {
          comments += "• Incomplete Construction noted\n";
        }
        if (vraAssessment.criticalIssues) {
          comments += "• Critical Issues requiring attention\n";
        }
        if (vraAssessment.esgFactors) {
          comments += `• ESG Factors: ${vraAssessment.esgFactors}\n`;
        }
      } else {
        comments += "\nVALUATION RISK ALERTS (VRA):\n• No significant VRA flags identified\n";
      }
      
      // Sales Evidence Summary
      if (salesEvidence && salesEvidence.length > 0) {
        comments += "\nSALES EVIDENCE ANALYSIS:\n";
        comments += `• ${salesEvidence.length} comparable sales analyzed\n`;
        
        const avgPrice = salesEvidence.reduce((sum, sale) => sum + (sale.adjustedPrice || sale.price || 0), 0) / salesEvidence.length;
        if (avgPrice > 0) {
          comments += `• Average adjusted sale price: $${Math.round(avgPrice).toLocaleString()}\n`;
        }
        
        const avgPricePerSqm = salesEvidence.reduce((sum, sale) => sum + (sale.pricePerSqm || 0), 0) / salesEvidence.length;
        if (avgPricePerSqm > 0) {
          comments += `• Average price per sqm: $${Math.round(avgPricePerSqm).toLocaleString()}\n`;
        }
      }
      
      // Market Conditions
      comments += "\nMARKET CONDITIONS:\n";
      comments += "• Market conditions assessed based on recent sales evidence and local factors\n";
      comments += "• Valuation reflects current market conditions as at inspection date\n";
      
      // Recommendations
      comments += "\nRECOMMENDations:\n";
      if (highRiskItems.length > 0) {
        comments += "• Regular monitoring recommended due to identified risk factors\n";
      }
      if (vraAssessment && Object.values(vraAssessment).some(Boolean)) {
        comments += "• Additional due diligence recommended due to VRA flags\n";
      }
      comments += "• Valuation subject to market conditions and property-specific factors\n";
      comments += "• Regular revaluation recommended as market conditions change\n";
      
      onCommentsChange(comments);
      setIsGenerating(false);
      toast.success("General comments generated based on property data");
    }, 2000);
  };

  const getHighRiskCount = () => {
    if (!riskRatings) return 0;
    return Object.values(riskRatings).filter(value => typeof value === 'number' && value >= 3).length;
  };

  const getVRACount = () => {
    if (!vraAssessment) return 0;
    return Object.values(vraAssessment).filter(Boolean).length;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            General Comments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Summary Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Land Area</p>
                    <p className="font-semibold">{propertyData?.landArea || 'N/A'} sqm</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Building Area</p>
                    <p className="font-semibold">{propertyData?.buildingArea || propertyData?.livingArea || 'N/A'} sqm</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">High Risk Factors</p>
                    <p className="font-semibold">{getHighRiskCount()}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">VRA Alerts</p>
                    <p className="font-semibold">{getVRACount()}</p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Risk and VRA Alerts */}
            {(getHighRiskCount() > 0 || getVRACount() > 0) && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    {getHighRiskCount() > 0 && (
                      <p>⚠️ {getHighRiskCount()} risk factor(s) rated 3 or above require attention</p>
                    )}
                    {getVRACount() > 0 && (
                      <p>🔍 {getVRACount()} VRA alert(s) identified for additional review</p>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}
            
            {/* Auto-generate Button */}
            <div className="flex justify-between items-center">
              <Label htmlFor="generalComments" className="text-base font-semibold">
                Comprehensive Property Comments
              </Label>
              <Button 
                onClick={generateComments}
                disabled={isGenerating}
                variant="outline"
                className="flex items-center gap-2"
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                {isGenerating ? 'Generating...' : 'Auto-Generate Comments'}
              </Button>
            </div>
            
            {/* Comments Textarea */}
            <Textarea
              id="generalComments"
              value={generalComments}
              onChange={(e) => onCommentsChange(e.target.value)}
              placeholder="General comments will auto-populate based on property data, risk assessments, and VRA findings. You can also manually edit these comments."
              className="min-h-[400px] font-mono text-sm"
            />
            
            <div className="text-xs text-muted-foreground">
              Comments automatically include: Property summary, land/building areas, risk factors above level 3, 
              VRA alerts, sales evidence analysis, and professional recommendations.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}