import React from 'react';
import ComprehensiveESGClimateAssessment from '@/components/ComprehensiveESGClimateAssessment';
import { PropertyProvider } from '@/contexts/PropertyContext';
import { ReportDataProvider } from '@/contexts/ReportDataContext';
import { ValuationProvider } from '@/contexts/ValuationContext';
import UnifiedPlatformLayout from '@/components/UnifiedPlatformLayout';
import { Leaf, BarChart3, Shield, TrendingUp, FileText, Calculator } from 'lucide-react';

const ESGClimateAssessment = () => {
  const esgSections = [
    {
      id: 'environmental',
      title: 'Environmental Impact',
      description: 'Comprehensive environmental assessment including carbon footprint and sustainability metrics',
      icon: <Leaf className="w-8 h-8 text-white" />
    },
    {
      id: 'social',
      title: 'Social Responsibility',
      description: 'Social impact analysis covering community engagement and stakeholder considerations',
      icon: <Shield className="w-8 h-8 text-white" />
    },
    {
      id: 'governance',
      title: 'Corporate Governance',
      description: 'Governance framework assessment and compliance with best practices',
      icon: <BarChart3 className="w-8 h-8 text-white" />
    },
    {
      id: 'climate-risk',
      title: 'Climate Risk Assessment',
      description: 'Physical and transition climate risk analysis with adaptation strategies',
      icon: <TrendingUp className="w-8 h-8 text-white" />
    },
    {
      id: 'sustainability',
      title: 'Sustainability Metrics',
      description: 'Quantifiable sustainability indicators and performance benchmarking',
      icon: <Calculator className="w-8 h-8 text-white" />
    },
    {
      id: 'reporting',
      title: 'ESG Reporting',
      description: 'Comprehensive ESG reports meeting international standards and frameworks',
      icon: <FileText className="w-8 h-8 text-white" />
    }
  ];

  const categories = {
    'ESG Assessment Platform': esgSections
  };

  return (
    <PropertyProvider>
      <ReportDataProvider>
        <ValuationProvider>
          <UnifiedPlatformLayout
            title="ESG Assessment Platform"
            subtitle="Comprehensive environmental, social, and governance assessment including Agri Hub and Property Hub"
            categories={categories}
            accentColor="green"
          >
            <ComprehensiveESGClimateAssessment />
          </UnifiedPlatformLayout>
        </ValuationProvider>
      </ReportDataProvider>
    </PropertyProvider>
  );
};

export default ESGClimateAssessment;