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
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="mb-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 w-fit transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Main Dashboard
            </Link>
          </div>
          <div className="bg-background/80 backdrop-blur-sm rounded-lg border shadow-lg">
            <MultiStepForm 
              onSubmit={handleSubmit}
              onContinueToReport={handleContinueToReport}
            />
          </div>
        </div>
      </div>
    </PropertyProvider>
  );
};

export default PropertyValuation;