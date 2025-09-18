import React from 'react';
import UnifiedPlatformLayout from '@/components/UnifiedPlatformLayout';
import ComprehensiveESGClimateAssessment from '@/components/ComprehensiveESGClimateAssessment';
import { PropertyProvider } from '@/contexts/PropertyContext';
import { ReportDataProvider } from '@/contexts/ReportDataContext';
import { ValuationProvider } from '@/contexts/ValuationContext';

const ESGClimateAssessment = () => {
  const platformSections = [
    {
      title: "Core Services",
      cards: [
        {
          id: "environmental-assessment",
          title: "Environmental Assessment",
          description: "Comprehensive environmental impact analysis and sustainability scoring",
          icon: "🌍",
          onView: () => console.log("View environmental assessment"),
          onPrint: () => window.print()
        },
        {
          id: "social-governance", 
          title: "Social & Governance",
          description: "Social impact and governance framework assessment for properties",
          icon: "👥",
          onView: () => console.log("View social governance"),
          onPrint: () => window.print()
        },
        {
          id: "climate-risk",
          title: "Climate Risk Analysis", 
          description: "Advanced climate risk modeling and adaptation strategies",
          icon: "🌡️",
          onView: () => console.log("View climate risk"),
          onPrint: () => window.print()
        }
      ]
    },
    {
      title: "Revolutionary Platforms",
      cards: [
        {
          id: "greenium-valuation",
          title: "Greenium™ Valuation",
          description: "World's first quantified green premium valuation methodology",
          icon: "💚",
          onView: () => console.log("View greenium valuation"),
          onPrint: () => window.print()
        },
        {
          id: "carbon-footprint",
          title: "Carbon Footprint", 
          description: "Detailed carbon footprint analysis and offset recommendations",
          icon: "🌱",
          onView: () => console.log("View carbon footprint"),
          onPrint: () => window.print()
        },
        {
          id: "sustainability-certification",
          title: "Sustainability Certification",
          description: "Comprehensive sustainability certification and compliance tracking",
          icon: "📜",
          onView: () => console.log("View sustainability certification"),
          onPrint: () => window.print()
        }
      ]
    }
  ];

  return (
    <PropertyProvider>
      <ReportDataProvider>
        <ValuationProvider>
          <UnifiedPlatformLayout
            title="ESG Climate Assessment"
            subtitle="Comprehensive environmental, social, and governance assessment including Agri Hub and Property Hub"
            colorTheme="green"
            sections={platformSections}
          >
            <div className="bg-gradient-to-r from-emerald-800/80 to-green-900/80 backdrop-blur-sm rounded-2xl border border-emerald-400/30 shadow-2xl shadow-emerald-500/20 p-8">
              <ComprehensiveESGClimateAssessment />
            </div>
          </UnifiedPlatformLayout>
        </ValuationProvider>
      </ReportDataProvider>
    </PropertyProvider>
  );
};

export default ESGClimateAssessment;