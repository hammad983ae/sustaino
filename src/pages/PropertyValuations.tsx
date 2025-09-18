import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, BarChart3, FileText, Calculator, TrendingUp, Shield } from 'lucide-react';
import PropertyValuationManagement from '@/components/PropertyValuationManagement';
import UnifiedPlatformLayout from '@/components/UnifiedPlatformLayout';

// Import professional images
import propertyValuationDashboard from '@/assets/property-valuation-dashboard.jpg';

const PropertyValuations = () => {
  const navigate = useNavigate();

  const valuationSections = [
    {
      id: 'residential',
      title: 'Residential Property',
      description: 'Houses, units, townhouses, and residential investments with comprehensive market analysis',
      icon: <Building2 className="w-8 h-8 text-white" />
    },
    {
      id: 'commercial',
      title: 'Commercial Property',
      description: 'Office, retail, industrial, and investment properties with advanced analytics',
      icon: <BarChart3 className="w-8 h-8 text-white" />
    },
    {
      id: 'specialized',
      title: 'Specialized Assets',
      description: 'Unique properties requiring specialized valuation methodologies',
      icon: <Shield className="w-8 h-8 text-white" />
    },
    {
      id: 'agricultural',
      title: 'Agricultural Land',
      description: 'Rural properties, farming land, and agricultural enterprises',
      icon: <TrendingUp className="w-8 h-8 text-white" />
    },
    {
      id: 'development',
      title: 'Development Sites',
      description: 'Land for development with feasibility and highest best use analysis',
      icon: <Calculator className="w-8 h-8 text-white" />
    },
    {
      id: 'reports',
      title: 'Valuation Reports',
      description: 'Generate comprehensive valuation reports meeting professional standards',
      icon: <FileText className="w-8 h-8 text-white" />
    }
  ];

  const categories = {
    'Professional Property Valuations and ESG Assessments': valuationSections
  };

  return (
    <UnifiedPlatformLayout
      title="Professional Property Valuations and ESG Assessments"
      subtitle="Professional property assessment services across all asset classes with AI-enhanced analytics"
      categories={categories}
      accentColor="green"
    >
      <PropertyValuationManagement />
    </UnifiedPlatformLayout>
  );
};

export default PropertyValuations;