import React from "react";
import UnifiedPlatformLayout from '@/components/UnifiedPlatformLayout';
import { FinancialReportingHub } from "@/components/FinancialReportingHub";

export default function FinancialReporting() {
  const platformSections = [
    {
      title: "Core Services",
      cards: [
        {
          id: "financial-analysis",
          title: "Financial Analysis",
          description: "Comprehensive financial analysis and performance metrics for investment decisions",
          icon: "📊",
          onView: () => console.log("View financial analysis"),
          onPrint: () => window.print()
        },
        {
          id: "investment-reporting", 
          title: "Investment Reporting",
          description: "Professional investment reports with detailed market analysis and projections",
          icon: "📈",
          onView: () => console.log("View investment reporting"),
          onPrint: () => window.print()
        },
        {
          id: "portfolio-management",
          title: "Portfolio Management", 
          description: "Advanced portfolio management tools with risk assessment and optimization",
          icon: "💼",
          onView: () => console.log("View portfolio management"),
          onPrint: () => window.print()
        }
      ]
    },
    {
      title: "Revolutionary Platforms",
      cards: [
        {
          id: "ai-forecasting",
          title: "AI Forecasting",
          description: "Machine learning-powered financial forecasting and predictive analytics",
          icon: "🤖",
          onView: () => console.log("View AI forecasting"),
          onPrint: () => window.print()
        },
        {
          id: "esg-integration",
          title: "ESG Integration", 
          description: "Environmental, social, and governance factors integrated into financial models",
          icon: "🌱",
          onView: () => console.log("View ESG integration"),
          onPrint: () => window.print()
        },
        {
          id: "blockchain-audit",
          title: "Blockchain Audit",
          description: "Transparent blockchain-based audit trails and financial verification",
          icon: "🔗",
          onView: () => console.log("View blockchain audit"),
          onPrint: () => window.print()
        }
      ]
    }
  ];

  return (
    <UnifiedPlatformLayout
      title="Financial Reporting Hub"
      subtitle="Advanced financial analysis and reporting for investment decisions"
      colorTheme="blue"
      sections={platformSections}
    >
      <div className="bg-gradient-to-r from-blue-800/80 to-cyan-900/80 backdrop-blur-sm rounded-2xl border border-blue-400/30 shadow-2xl shadow-blue-500/20 p-8">
        <FinancialReportingHub />
      </div>
    </UnifiedPlatformLayout>
  );
}