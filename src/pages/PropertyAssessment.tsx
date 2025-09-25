import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyAssessmentForm from '@/components/PropertyAssessmentForm';
import { PropertyProvider } from '@/contexts/PropertyContext';
import { ReportDataProvider } from '@/contexts/ReportDataContext';
import { PAFConfigProvider } from '@/contexts/PAFConfigContext';

const PropertyAssessment = () => {
  const navigate = useNavigate();

  const handleAssessmentComplete = (data: any) => {
    console.log('Assessment completed:', data);
    // Could navigate to a summary page or directly to report
  };

  const handleNavigateToReport = () => {
    // Only navigate if explicitly requested from completion step
    navigate('/report');
  };

  return (
    <PropertyProvider>
      <ReportDataProvider>
        <PAFConfigProvider>
          <div className="min-h-screen bg-background">
            <PropertyAssessmentForm
              onComplete={handleAssessmentComplete}
              onNavigateToReport={handleNavigateToReport}
            />
          </div>
        </PAFConfigProvider>
      </ReportDataProvider>
    </PropertyProvider>
  );
};

export default PropertyAssessment;