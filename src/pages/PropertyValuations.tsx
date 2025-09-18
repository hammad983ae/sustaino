import React from 'react';
import UnifiedPlatformLayout from '@/components/UnifiedPlatformLayout';
import PropertyValuationManagement from '@/components/PropertyValuationManagement';

const PropertyValuations = () => {
  const platformSections = [
    {
      title: "Core Services",
      cards: [
        {
          id: "residential-valuations",
          title: "Residential Valuations",
          description: "Professional residential property assessment services with market analysis",
          icon: "🏠",
          onView: () => console.log("View residential valuations"),
          onPrint: () => window.print()
        },
        {
          id: "commercial-valuations", 
          title: "Commercial Valuations",
          description: "Comprehensive commercial property valuations and investment analysis",
          icon: "🏢",
          onView: () => console.log("View commercial valuations"),
          onPrint: () => window.print()
        },
        {
          id: "industrial-valuations",
          title: "Industrial Valuations", 
          description: "Specialized industrial property and equipment valuations",
          icon: "🏭",
          onView: () => console.log("View industrial valuations"),
          onPrint: () => window.print()
        }
      ]
    },
    {
      title: "Revolutionary Platforms",
      cards: [
        {
          id: "automated-valuation",
          title: "Automated Valuation",
          description: "AI-powered automated property valuation with instant results",
          icon: "🤖",
          onView: () => console.log("View automated valuation"),
          onPrint: () => window.print()
        },
        {
          id: "esg-integration",
          title: "ESG Integration", 
          description: "Environmental, social, and governance factors in property valuation",
          icon: "🌱",
          onView: () => console.log("View ESG integration"),
          onPrint: () => window.print()
        },
        {
          id: "blockchain-verification",
          title: "Blockchain Verification",
          description: "Secure blockchain-based property record verification and audit trails",
          icon: "🔗",
          onView: () => console.log("View blockchain verification"),
          onPrint: () => window.print()
        }
      ]
    }
  ];

  return (
    <UnifiedPlatformLayout
      title="Property Valuations Platform"
      subtitle="Professional property assessment services across all asset classes with AI-enhanced analytics"
      colorTheme="green"
      sections={platformSections}
    >
      <div className="bg-gradient-to-r from-emerald-800/80 to-green-900/80 backdrop-blur-sm rounded-2xl border border-emerald-400/30 shadow-2xl shadow-emerald-500/20 p-8">
        <PropertyValuationManagement />
      </div>
    </UnifiedPlatformLayout>
  );
};

export default PropertyValuations;