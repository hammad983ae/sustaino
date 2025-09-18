import React from "react";
import { BarChart, Calculator, FileText, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import BrochureStyleLayout from '@/components/BrochureStyleLayout';

export default function FinancialReporting() {
  const sections = [
    {
      title: 'Financial Analysis Services',
      cards: [
        {
          title: 'Investment Analysis',
          description: 'Comprehensive investment performance analysis and portfolio optimization',
          icon: <BarChart className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Investment Analysis'),
          onPrint: () => console.log('Printing Investment Analysis')
        },
        {
          title: 'Risk Assessment',
          description: 'Advanced risk modeling and scenario analysis for informed decision making',
          icon: <Calculator className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Risk Assessment'),
          onPrint: () => console.log('Printing Risk Assessment')
        },
        {
          title: 'Financial Reporting',
          description: 'Professional financial reports and compliance documentation',
          icon: <FileText className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Financial Reporting'),
          onPrint: () => console.log('Printing Financial Reporting')
        }
      ]
    },
    {
      title: 'Advanced Analytics',
      cards: [
        {
          title: 'Performance Metrics',
          description: 'Key performance indicators and benchmark analysis',
          icon: <TrendingUp className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Performance Metrics'),
          onPrint: () => console.log('Printing Performance Metrics')
        },
        {
          title: 'Cash Flow Analysis',
          description: 'Detailed cash flow modeling and forecasting',
          icon: <DollarSign className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Cash Flow Analysis'),
          onPrint: () => console.log('Printing Cash Flow Analysis')
        },
        {
          title: 'Portfolio Allocation',
          description: 'Strategic asset allocation and diversification analysis',
          icon: <PieChart className="w-6 h-6 text-white" />,
          onView: () => console.log('Viewing Portfolio Allocation'),
          onPrint: () => console.log('Printing Portfolio Allocation')
        }
      ]
    }
  ];

  return (
    <BrochureStyleLayout
      title="Financial Reporting Hub"
      subtitle="Advanced financial analysis and reporting for investment decisions"
      sections={sections}
      className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-700"
    />
  );
}