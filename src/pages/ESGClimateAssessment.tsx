import React from 'react';
import ComprehensiveESGClimateAssessment from '@/components/ComprehensiveESGClimateAssessment';
import { PropertyProvider } from '@/contexts/PropertyContext';
import { ReportDataProvider } from '@/contexts/ReportDataContext';
import { ValuationProvider } from '@/contexts/ValuationContext';

const ESGClimateAssessment = () => {
  return (
    <PropertyProvider>
      <ReportDataProvider>
        <ValuationProvider>
          <div className="min-h-screen bg-background">
            <ComprehensiveESGClimateAssessment />
          </div>
        </ValuationProvider>
      </ReportDataProvider>
    </PropertyProvider>
  );
};

export default ESGClimateAssessment;