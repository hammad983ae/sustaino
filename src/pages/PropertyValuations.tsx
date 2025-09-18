import React from "react";
import { Building, Home, Calculator, FileText, BarChart, TrendingUp } from "lucide-react";
import BrochureStyleLayout from '@/components/BrochureStyleLayout';

export default function PropertyValuations() {
  const sections = [
    {
      title: 'Core Valuation Services',
      cards: [
        {
          title: 'Residential Valuations',
          description: 'Comprehensive residential property assessments for all dwelling types',
          icon: <Home className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Residential Valuations'),
          onPrint: () => console.log('Printing Residential Valuations')
        },
        {
          title: 'Commercial Valuations',
          description: 'Professional commercial property assessment across all sectors',
          icon: <Building className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Commercial Valuations'),
          onPrint: () => console.log('Printing Commercial Valuations')
        },
        {
          title: 'Investment Analysis',
          description: 'Detailed investment property analysis and yield calculations',
          icon: <Calculator className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Investment Analysis'),
          onPrint: () => console.log('Printing Investment Analysis')
        }
      ]
    },
    {
      title: 'Specialized Services',
      cards: [
        {
          title: 'Statutory Valuations',
          description: 'Court-ready valuations for legal and statutory purposes',
          icon: <FileText className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Statutory Valuations'),
          onPrint: () => console.log('Printing Statutory Valuations')
        },
        {
          title: 'Market Analysis',
          description: 'Comprehensive market research and trend analysis',
          icon: <BarChart className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Market Analysis'),
          onPrint: () => console.log('Printing Market Analysis')
        },
        {
          title: 'Portfolio Reviews',
          description: 'Strategic portfolio assessment and optimization',
          icon: <TrendingUp className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Portfolio Reviews'),
          onPrint: () => console.log('Printing Portfolio Reviews')
        }
      ]
    }
  ];

  return (
    <BrochureStyleLayout
      title="Professional Property Valuations"
      subtitle="Comprehensive property assessment services across all asset classes with AI-enhanced analytics"
      sections={sections}
      className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700"
    />
  );
}

