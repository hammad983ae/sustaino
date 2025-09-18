import React from "react";
import { FinancialReportingHub } from "@/components/FinancialReportingHub";
import UnifiedPlatformLayout from "@/components/UnifiedPlatformLayout";
import { BarChart3, TrendingUp, DollarSign, PieChart, FileText, Calculator } from "lucide-react";

// Import professional images
import financialReportingPlatform from '@/assets/financial-reporting-platform.jpg';

export default function FinancialReporting() {
  const financialSections = [
    {
      id: 'analytics',
      title: 'Financial Analytics',
      description: 'Advanced financial analysis and reporting for investment decisions',
      icon: <BarChart3 className="w-8 h-8 text-white" />
    },
    {
      id: 'performance',
      title: 'Performance Metrics',
      description: 'Key performance indicators and benchmarking analysis',
      icon: <TrendingUp className="w-8 h-8 text-white" />
    },
    {
      id: 'valuation',
      title: 'Asset Valuation',
      description: 'Comprehensive asset valuation and portfolio analysis',
      icon: <DollarSign className="w-8 h-8 text-white" />
    },
    {
      id: 'portfolio',
      title: 'Portfolio Analysis',
      description: 'Multi-asset portfolio analysis with risk assessment',
      icon: <PieChart className="w-8 h-8 text-white" />
    },
    {
      id: 'modeling',
      title: 'Financial Modeling',
      description: 'Advanced financial modeling and scenario analysis',
      icon: <Calculator className="w-8 h-8 text-white" />
    },
    {
      id: 'reporting',
      title: 'Report Generation',
      description: 'Professional financial reports with ESG integration',
      icon: <FileText className="w-8 h-8 text-white" />
    }
  ];

  const categories = {
    'Financial Reporting Platform': financialSections
  };

  return (
    <UnifiedPlatformLayout
      title="Financial Reporting Hub"
      subtitle="Advanced financial analysis and reporting for investment decisions"
      categories={categories}
      accentColor="blue"
    >
      <FinancialReportingHub />
    </UnifiedPlatformLayout>
  );
}