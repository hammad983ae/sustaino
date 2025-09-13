import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyAssessmentForm from '@/components/PropertyAssessmentForm';
import { PropertyProvider } from '@/contexts/PropertyContext';
import { ReportDataProvider } from '@/contexts/ReportDataContext';

const PropertyAssessment = () => {
  const navigate = useNavigate();

  const handleAssessmentComplete = (data: any) => {
    console.log('Assessment completed:', data);
    // Could navigate to a summary page or directly to report
  };

  const handleNavigateToReport = () => {
    navigate('/report');
  };

  return (
    <PropertyProvider>
      <ReportDataProvider>
        <div className="min-h-screen bg-background">
          <PropertyAssessmentForm
            onComplete={handleAssessmentComplete}
            onNavigateToReport={handleNavigateToReport}
          />
        </div>
      </ReportDataProvider>
    </PropertyProvider>
  );
};

export default PropertyAssessment;