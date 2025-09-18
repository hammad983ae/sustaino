import React from "react";
import { Building2, TrendingUp, FileText, BarChart3, Database, Zap } from "lucide-react";
import BrochureStyleLayout from '@/components/BrochureStyleLayout';

export default function AutomatedValuation() {
  const sections = [
    {
      title: 'Automated Services',
      cards: [
        {
          title: 'AI Property Analysis',
          description: 'Advanced artificial intelligence for comprehensive property assessment and market analysis',
          icon: <Building2 className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing AI Property Analysis'),
          onPrint: () => console.log('Printing AI Property Analysis')
        },
        {
          title: 'Automated Calculations',
          description: 'Instant valuation calculations with real-time market data integration',
          icon: <BarChart3 className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Automated Calculations'),
          onPrint: () => console.log('Printing Automated Calculations')
        },
        {
          title: 'Report Generation',
          description: 'Automated professional report generation with customizable templates',
          icon: <FileText className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Report Generation'),
          onPrint: () => console.log('Printing Report Generation')
        }
      ]
    },
    {
      title: 'Advanced Analytics',
      cards: [
        {
          title: 'Market Trends',
          description: 'Real-time market trend analysis and predictive modeling',
          icon: <TrendingUp className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Market Trends'),
          onPrint: () => console.log('Printing Market Trends')
        },
        {
          title: 'Portfolio Analytics',
          description: 'Comprehensive portfolio performance and risk assessment',
          icon: <Database className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Portfolio Analytics'),
          onPrint: () => console.log('Printing Portfolio Analytics')
        },
        {
          title: 'Instant Insights',
          description: 'Lightning-fast property insights powered by machine learning',
          icon: <Zap className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Instant Insights'),
          onPrint: () => console.log('Printing Instant Insights')
        }
      ]
    }
  ];

  return (
    <BrochureStyleLayout
      title="Automated Valuation Platform"
      subtitle="Revolutionary AI-powered property valuation and assessment technology"
      sections={sections}
      className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700"
    />
  );
}