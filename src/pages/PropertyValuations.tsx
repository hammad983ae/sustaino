import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PropertyValuationManagement from '@/components/PropertyValuationManagement';

// Import professional images
import propertyValuationDashboard from '@/assets/property-valuation-dashboard.jpg';

const PropertyValuations = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Visual Header */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={propertyValuationDashboard} 
          alt="Professional Property Valuation Platform" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold">Property Valuations Platform</h1>
          <p className="text-lg opacity-90">Professional-grade valuation management</p>
        </div>
      </div>
      
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        <PropertyValuationManagement />
      </div>
    </div>
  );
};

export default PropertyValuations;