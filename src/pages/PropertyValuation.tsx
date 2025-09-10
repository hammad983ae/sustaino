import React from 'react';
import { useNavigate } from 'react-router-dom';
import MultiStepForm from '@/components/MultiStepForm';
import { PropertyProvider } from '@/contexts/PropertyContext';

const PropertyValuation = () => {
  const navigate = useNavigate();

  const handleContinueToReport = () => {
    navigate('/report');
  };

  const handleSubmit = (data: any) => {
    console.log('Property valuation form submitted:', data);
    // Process the form data and then navigate to report
    navigate('/report');
  };

  return (
    <PropertyProvider>
      <MultiStepForm 
        onSubmit={handleSubmit}
        onContinueToReport={handleContinueToReport}
      />
    </PropertyProvider>
  );
};

export default PropertyValuation;