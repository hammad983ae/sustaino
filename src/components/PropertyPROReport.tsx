import React from 'react';
import { Card } from '@/components/ui/card';
import { PropertyPROSummary } from './PropertyPROSummary';
import { PropertyPRORiskAnalysis } from './PropertyPRORiskAnalysis';
import { PropertyPROValuationSummary } from './PropertyPROValuationSummary';
import { PropertyPROLand } from './PropertyPROLand';
import { PropertyPRODwelling } from './PropertyPRODwelling';
import { PropertyPROAncillary } from './PropertyPROAncillary';
import { PropertyPROSalesEvidence } from './PropertyPROSalesEvidence';
import { PropertyPROComments } from './PropertyPROComments';
import { PropertyPROAssumptions } from './PropertyPROAssumptions';
import { PropertyPROLiability } from './PropertyPROLiability';
import { PropertyPROTBE } from './PropertyPROTBE';
import { PropertyPROProgress } from './PropertyPROProgress';
import BrandedHeader from './BrandedHeader';

interface PropertyPROReportProps {
  reportData?: any;
  onDataChange?: (section: string, data: any) => void;
  reportType?: 'standard' | 'tbe' | 'progress';
  propertyType?: string;
}

export const PropertyPROReport: React.FC<PropertyPROReportProps> = ({
  reportData = {},
  onDataChange,
  reportType = 'standard',
  propertyType = 'house'
}) => {
  const handleSectionUpdate = (section: string, data: any) => {
    if (onDataChange) {
      onDataChange(section, data);
    }
  };

  const renderReportContent = () => {
    switch (reportType) {
      case 'tbe':
        return (
          <>
            <PropertyPROSummary 
              data={reportData.summary} 
              onUpdate={(data) => handleSectionUpdate('summary', data)}
              propertyType={propertyType}
              isTBE={true}
            />
            <PropertyPRORiskAnalysis 
              data={reportData.riskAnalysis} 
              onUpdate={(data) => handleSectionUpdate('riskAnalysis', data)}
              propertyData={reportData}
            />
            <PropertyPROValuationSummary 
              data={reportData.valuationSummary} 
              onUpdate={(data) => handleSectionUpdate('valuationSummary', data)}
              isTBE={true}
            />
            <PropertyPROTBE 
              data={reportData.tbe} 
              onUpdate={(data) => handleSectionUpdate('tbe', data)}
            />
            <PropertyPROLand 
              data={reportData.land} 
              onUpdate={(data) => handleSectionUpdate('land', data)}
            />
            <PropertyPRODwelling 
              data={reportData.dwelling} 
              onUpdate={(data) => handleSectionUpdate('dwelling', data)}
              propertyType={propertyType}
              isTBE={true}
            />
            <PropertyPROAncillary 
              data={reportData.ancillary} 
              onUpdate={(data) => handleSectionUpdate('ancillary', data)}
            />
            <PropertyPROSalesEvidence 
              data={reportData.salesEvidence} 
              onUpdate={(data) => handleSectionUpdate('salesEvidence', data)}
              propertyType={propertyType}
            />
            <PropertyPROComments 
              data={reportData.comments} 
              onUpdate={(data) => handleSectionUpdate('comments', data)}
            />
            <PropertyPROAssumptions 
              data={reportData.assumptions} 
              onUpdate={(data) => handleSectionUpdate('assumptions', data)}
            />
            <PropertyPROLiability />
          </>
        );
      
      case 'progress':
        return (
          <PropertyPROProgress 
            data={reportData.progress} 
            onUpdate={(data) => handleSectionUpdate('progress', data)}
          />
        );
      
      default:
        return (
          <>
            <PropertyPROSummary 
              data={reportData.summary} 
              onUpdate={(data) => handleSectionUpdate('summary', data)}
              propertyType={propertyType}
            />
            <PropertyPRORiskAnalysis 
              data={reportData.riskAnalysis} 
              onUpdate={(data) => handleSectionUpdate('riskAnalysis', data)}
              propertyData={reportData}
            />
            <PropertyPROValuationSummary 
              data={reportData.valuationSummary} 
              onUpdate={(data) => handleSectionUpdate('valuationSummary', data)}
            />
            <PropertyPROLand 
              data={reportData.land} 
              onUpdate={(data) => handleSectionUpdate('land', data)}
            />
            <PropertyPRODwelling 
              data={reportData.dwelling} 
              onUpdate={(data) => handleSectionUpdate('dwelling', data)}
              propertyType={propertyType}
            />
            <PropertyPROAncillary 
              data={reportData.ancillary} 
              onUpdate={(data) => handleSectionUpdate('ancillary', data)}
            />
            <PropertyPROSalesEvidence 
              data={reportData.salesEvidence} 
              onUpdate={(data) => handleSectionUpdate('salesEvidence', data)}
              propertyType={propertyType}
            />
            <PropertyPROComments 
              data={reportData.comments} 
              onUpdate={(data) => handleSectionUpdate('comments', data)}
            />
            <PropertyPROAssumptions 
              data={reportData.assumptions} 
              onUpdate={(data) => handleSectionUpdate('assumptions', data)}
            />
            <PropertyPROLiability />
          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      <BrandedHeader />
      
      <Card className="p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            PropertyPRO Residential Valuation and Security Assessment
          </h1>
          <p className="text-sm text-muted-foreground">
            Brief Report for Single Residential First Mortgage Purposes Only
          </p>
        </div>
        
        <div className="space-y-8">
          {renderReportContent()}
        </div>
      </Card>
    </div>
  );
};