import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 w-fit">
              <ArrowLeft className="h-4 w-4" />
              Back to Main Dashboard
            </Link>
          </div>
          <MultiStepForm 
            onSubmit={handleSubmit}
            onContinueToReport={handleContinueToReport}
          />
        </div>
      </div>
    </PropertyProvider>
  );
};

export default PropertyValuation;