import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  XCircle, 
  MapPin, 
  Building, 
  Calculator, 
  FileText,
  ArrowRight,
  Info,
  Copy
} from 'lucide-react';

interface ExtractedPropertyData {
  text: string;
  confidence: number;
  propertyDetails: {
    address?: string;
    landArea?: number;
    zoning?: string;
    lotNumber?: string;
    planNumber?: string;
    council?: string;
    currentUse?: string;
    developmentPotential?: string;
    restrictions?: string;
    easements?: string;
    rent?: number;
    yield?: number;
    tenant?: string;
    leaseExpiry?: string;
    value?: number;
    costings?: string;
    approvals?: string;
    permits?: string;
    compliance?: string;
    infrastructure?: string;
    utilities?: string;
    access?: string;
    contamination?: string;
    flooding?: string;
    heritage?: string;
    nativeTitle?: string;
  };
  financialData: {
    constructionCosts?: number;
    landValue?: number;
    developmentCosts?: number;
    salesProjections?: number;
    profitMargin?: number;
    roi?: number;
    irr?: number;
    npv?: number;
  };
  complianceData: {
    planningPermits?: string[];
    buildingApprovals?: string[];
    environmentalClearances?: string[];
    councilRequirements?: string[];
    stateRequirements?: string[];
  };
}

interface DataExtractionSummaryProps {
  extractedData: ExtractedPropertyData;
  fileName: string;
}

// Field mapping configuration
const FIELD_MAPPINGS = {
  // Property Details Mappings
  address: { formField: 'Address', section: 'Site Information', icon: MapPin },
  landArea: { formField: 'Land Area (sqm)', section: 'Site Information', icon: MapPin },
  zoning: { formField: 'Current Zoning', section: 'Site Information', icon: Building },
  lotNumber: { formField: 'Lot Number', section: 'Site Information', icon: MapPin },
  planNumber: { formField: 'Plan Number', section: 'Site Information', icon: MapPin },
  council: { formField: 'Local Council', section: 'Site Information', icon: Building },
  currentUse: { formField: 'Current Use', section: 'Development Proposal', icon: Building },
  developmentPotential: { formField: 'Development Potential', section: 'Development Proposal', icon: Building },
  
  // Financial Data Mappings
  constructionCosts: { formField: 'Construction Costs', section: 'Financial Analysis', icon: Calculator },
  landValue: { formField: 'Land Value', section: 'Financial Analysis', icon: Calculator },
  developmentCosts: { formField: 'Development Costs', section: 'Financial Analysis', icon: Calculator },
  salesProjections: { formField: 'Sales Projections', section: 'Financial Analysis', icon: Calculator },
  profitMargin: { formField: 'Profit Margin %', section: 'Financial Analysis', icon: Calculator },
  roi: { formField: 'ROI %', section: 'Financial Analysis', icon: Calculator },
  irr: { formField: 'IRR %', section: 'Financial Analysis', icon: Calculator },
  npv: { formField: 'NPV', section: 'Financial Analysis', icon: Calculator },
};

const DataExtractionSummary: React.FC<DataExtractionSummaryProps> = ({
  extractedData,
  fileName
}) => {
  const getExtractedFields = () => {
    const extractedFields: Array<{
      key: string;
      value: any;
      mapping: any;
      category: 'property' | 'financial' | 'compliance';
    }> = [];

    // Property details
    Object.entries(extractedData.propertyDetails).forEach(([key, value]) => {
      if (value && FIELD_MAPPINGS[key as keyof typeof FIELD_MAPPINGS]) {
        extractedFields.push({
          key,
          value,
          mapping: FIELD_MAPPINGS[key as keyof typeof FIELD_MAPPINGS],
          category: 'property'
        });
      }
    });

    // Financial data
    Object.entries(extractedData.financialData).forEach(([key, value]) => {
      if (value && FIELD_MAPPINGS[key as keyof typeof FIELD_MAPPINGS]) {
        extractedFields.push({
          key,
          value,
          mapping: FIELD_MAPPINGS[key as keyof typeof FIELD_MAPPINGS],
          category: 'financial'
        });
      }
    });

    return extractedFields;
  };

  const getComplianceItems = () => {
    const items: Array<{ type: string; items: string[] }> = [];
    
    if (extractedData.complianceData.planningPermits?.length) {
      items.push({ type: 'Planning Permits', items: extractedData.complianceData.planningPermits });
    }
    if (extractedData.complianceData.buildingApprovals?.length) {
      items.push({ type: 'Building Approvals', items: extractedData.complianceData.buildingApprovals });
    }
    if (extractedData.complianceData.environmentalClearances?.length) {
      items.push({ type: 'Environmental Clearances', items: extractedData.complianceData.environmentalClearances });
    }
    
    return items;
  };

  const extractedFields = getExtractedFields();
  const complianceItems = getComplianceItems();
  const totalExtracted = extractedFields.length + complianceItems.reduce((sum, item) => sum + item.items.length, 0);

  const formatValue = (key: string, value: any) => {
    if (typeof value === 'number') {
      if (key.includes('Cost') || key.includes('Value') || key === 'npv') {
        return `$${value.toLocaleString()}`;
      } else if (key.includes('roi') || key.includes('irr') || key.includes('Margin')) {
        return `${value}%`;
      } else if (key === 'landArea') {
        return `${value.toLocaleString()} sqm`;
      }
      return value.toLocaleString();
    }
    return value;
  };

  const copyExtractedData = () => {
    const summary = [
      `Document: ${fileName}`,
      `Extraction Confidence: ${Math.round(extractedData.confidence)}%`,
      `Total Fields Extracted: ${totalExtracted}`,
      '',
      'EXTRACTED DATA:',
      ...extractedFields.map(field => 
        `• ${field.mapping.formField}: ${formatValue(field.key, field.value)} → ${field.mapping.section}`
      ),
      '',
      ...complianceItems.map(item => 
        `${item.type}:\n${item.items.map(i => `  • ${i}`).join('\n')}`
      )
    ].join('\n');
    
    navigator.clipboard.writeText(summary);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Data Extraction Summary
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={extractedData.confidence > 80 ? "default" : extractedData.confidence > 60 ? "secondary" : "destructive"}>
              {Math.round(extractedData.confidence)}% confidence
            </Badge>
            <Button variant="outline" size="sm" onClick={copyExtractedData}>
              <Copy className="h-4 w-4 mr-1" />
              Copy Summary
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{totalExtracted}</div>
            <div className="text-sm text-muted-foreground">Fields Extracted</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{extractedFields.length}</div>
            <div className="text-sm text-muted-foreground">Auto-Populated</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{complianceItems.length}</div>
            <div className="text-sm text-muted-foreground">Compliance Items</div>
          </div>
        </div>

        {/* Extraction Quality Alert */}
        <Alert className={extractedData.confidence > 80 ? "border-green-200 bg-green-50" : 
                         extractedData.confidence > 60 ? "border-yellow-200 bg-yellow-50" : 
                         "border-red-200 bg-red-50"}>
          <AlertDescription className="flex items-center gap-2">
            {extractedData.confidence > 80 ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>High confidence extraction from <strong>{fileName}</strong>. Most data should be accurate.</span>
              </>
            ) : extractedData.confidence > 60 ? (
              <>
                <Info className="h-4 w-4 text-yellow-600" />
                <span>Medium confidence extraction from <strong>{fileName}</strong>. Please verify critical data.</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-red-600" />
                <span>Low confidence extraction from <strong>{fileName}</strong>. Manual verification required.</span>
              </>
            )}
          </AlertDescription>
        </Alert>

        {/* Field Mappings */}
        {extractedFields.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              Auto-Populated Form Fields
            </h3>
            
            {/* Group by category */}
            {['property', 'financial'].map(category => {
              const categoryFields = extractedFields.filter(field => field.category === category);
              if (categoryFields.length === 0) return null;
              
              return (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                    {category === 'property' ? (
                      <>
                        <MapPin className="h-4 w-4" />
                        Property Details
                      </>
                    ) : (
                      <>
                        <Calculator className="h-4 w-4" />
                        Financial Data
                      </>
                    )}
                  </h4>
                  <div className="grid gap-2">
                    {categoryFields.map((field) => (
                      <div key={field.key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <field.mapping.icon className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">{field.mapping.formField}</div>
                            <div className="text-xs text-muted-foreground">{field.mapping.section}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline" className="font-mono text-xs">
                            {formatValue(field.key, field.value)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Compliance Items */}
        {complianceItems.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building className="h-5 w-5" />
              Compliance & Approval Items
            </h3>
            <div className="space-y-3">
              {complianceItems.map((item, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="font-medium text-sm mb-2">{item.type}</div>
                  <ul className="space-y-1">
                    {item.items.map((complianceItem, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                        {complianceItem}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Data Message */}
        {totalExtracted === 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              No structured data was extracted from this document. This may be due to:
              <ul className="list-disc list-inside mt-2 text-sm">
                <li>Poor image quality or resolution</li>
                <li>Non-standard document format</li>
                <li>Document contains mostly graphics/images rather than text</li>
                <li>OCR confidence too low for reliable extraction</li>
              </ul>
              Try uploading a clearer image or a different document format.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default DataExtractionSummary;