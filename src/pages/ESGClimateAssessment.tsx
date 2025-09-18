import React from 'react';
import { Leaf, Shield, BarChart, Globe, TrendingUp, Calculator } from 'lucide-react';
import BrochureStyleLayout from '@/components/BrochureStyleLayout';

const ESGClimateAssessment = () => {
  const sections = [
    {
      title: 'ESG Assessment Services',
      cards: [
        {
          title: 'Environmental Assessment',
          description: 'Comprehensive environmental impact analysis and sustainability metrics',
          icon: <Leaf className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Environmental Assessment'),
          onPrint: () => console.log('Printing Environmental Assessment')
        },
        {
          title: 'Social Impact Analysis',
          description: 'Social responsibility assessment and community impact evaluation',
          icon: <Shield className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Social Impact Analysis'),
          onPrint: () => console.log('Printing Social Impact Analysis')
        },
        {
          title: 'Governance Framework',
          description: 'Corporate governance assessment and best practice implementation',
          icon: <BarChart className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Governance Framework'),
          onPrint: () => console.log('Printing Governance Framework')
        }
      ]
    },
    {
      title: 'Climate Risk Assessment',
      cards: [
        {
          title: 'Climate Risk Modeling',
          description: 'Advanced climate risk assessment and future scenario planning',
          icon: <Globe className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Climate Risk Modeling'),
          onPrint: () => console.log('Printing Climate Risk Modeling')
        },
        {
          title: 'Carbon Footprint Analysis',
          description: 'Detailed carbon emissions assessment and reduction strategies',
          icon: <TrendingUp className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Carbon Footprint Analysis'),
          onPrint: () => console.log('Printing Carbon Footprint Analysis')
        },
        {
          title: 'Sustainability Metrics',
          description: 'Comprehensive sustainability KPIs and performance tracking',
          icon: <Calculator className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Sustainability Metrics'),
          onPrint: () => console.log('Printing Sustainability Metrics')
        }
      ]
    }
  ];

  return (
    <BrochureStyleLayout
      title="ESG Climate Assessment"
      subtitle="Comprehensive environmental, social, and governance assessment including Agri Hub and Property Hub"
      sections={sections}
      className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700"
    />
  );
};

export default ESGClimateAssessment;