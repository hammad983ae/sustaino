import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Eye } from 'lucide-react';

// Import all brochure components
import PropertyValuationsBrochure from '@/components/brochures/PropertyValuationsBrochure';
import ESGAssessmentBrochure from '@/components/brochures/ESGAssessmentBrochure';
import FinancialReportingBrochure from '@/components/brochures/FinancialReportingBrochure';
import DevelopmentSiteBrochure from '@/components/brochures/DevelopmentSiteBrochure';
import PlantEquipmentBrochure from '@/components/brochures/PlantEquipmentBrochure';
import PatentsAndIPBrochure from '@/components/brochures/PatentsAndIPBrochure';
import PlatformEcosystemBrochure from '@/components/brochures/PlatformEcosystemBrochure';
import RentReversionsBrochure from '@/components/brochures/RentReversionsBrochure';
import ESDBrochure from '@/components/brochures/ESDBrochure';
import { BrickByBrickProBrochure } from '@/components/brochures/BrickByBrickProBrochure';

// Import new revolutionary brochures
import SustanoSphereBrochure from '@/components/SustanoSphereBrochure';
import AuctionSphereBrochure from '@/components/AuctionSphereBrochure';
import SustanoCoinBrochure from '@/components/brochures/SustanoCoinBrochure';
import GreeniumBrochure from '@/components/brochures/GreeniumBrochure';
import BlockchainBrochure from '@/components/brochures/BlockchainBrochure';
import SAMPlatformBrochure from '@/components/brochures/SAMPlatformBrochure';

const brochures = [
  // Core Services
  {
    id: 'property-valuations',
    title: 'Property Valuations',
    description: 'Professional property assessment services across all asset classes with AI-enhanced analytics',
    component: PropertyValuationsBrochure,
    category: 'Core Services'
  },
  {
    id: 'esg-assessment',
    title: 'ESG Assessment',
    description: 'Comprehensive environmental, social, and governance assessment including Agri Hub and Property Hub',
    component: ESGAssessmentBrochure,
    category: 'Core Services'
  },
  {
    id: 'financial-reporting',
    title: 'Financial Reporting',
    description: 'Advanced financial analysis and reporting for investment decisions',
    component: FinancialReportingBrochure,
    category: 'Core Services'
  },
  
  // Revolutionary Platforms
  {
    id: 'sustano-sphere',
    title: 'Sustaino-Sphere™',
    description: 'World\'s only combined independent digital asset valuation and auction marketplace',
    component: SustanoSphereBrochure,
    category: 'Revolutionary Platforms'
  },
  {
    id: 'auction-sphere',
    title: 'Auction-Sphere™',
    description: 'Revolutionary international real estate auction intelligence platform',
    component: AuctionSphereBrochure,
    category: 'Revolutionary Platforms'
  },
  {
    id: 'sam-platform',
    title: 'SAM Platform™',
    description: 'Strategic Asset Management: Revolutionary portfolio intelligence platform',
    component: SAMPlatformBrochure,
    category: 'Revolutionary Platforms'
  },
  
  // Blockchain & Innovation
  {
    id: 'sustano-coin',
    title: 'SustanoCoin™',
    description: 'World\'s first ESG-focused cryptocurrency for sustainable property investment',
    component: SustanoCoinBrochure,
    category: 'Blockchain & Innovation'
  },
  {
    id: 'greenium',
    title: 'Greenium™',
    description: 'World\'s first quantified green premium valuation methodology',
    component: GreeniumBrochure,
    category: 'Blockchain & Innovation'
  },
  {
    id: 'blockchain-platform',
    title: 'Blockchain Platform™',
    description: 'Next-generation blockchain infrastructure for property & ESG applications',
    component: BlockchainBrochure,
    category: 'Blockchain & Innovation'
  },
  
  // Development & Construction
  {
    id: 'development-sites',
    title: 'Development Sites',
    description: 'Comprehensive development site analysis and feasibility studies',
    component: DevelopmentSiteBrochure,
    category: 'Development & Construction'
  },
  {
    id: 'plant-equipment',
    title: 'Plant & Equipment',
    description: 'Specialized plant and equipment valuations for industrial assets',
    component: PlantEquipmentBrochure,
    category: 'Development & Construction'
  },
  {
    id: 'brick-by-brick-pro',
    title: 'Brick by Brick Pro',
    description: 'Advanced construction and renovation cost analysis platform',
    component: BrickByBrickProBrochure,
    category: 'Development & Construction'
  },
  
  // Innovation & IP
  {
    id: 'patents-ip',
    title: 'Patents & IP',
    description: 'Comprehensive intellectual property protection and patent portfolio',
    component: PatentsAndIPBrochure,
    category: 'Innovation & IP'
  },
  {
    id: 'platform-ecosystem',
    title: 'Platform Ecosystem',
    description: 'Complete technology ecosystem overview and integration capabilities',
    component: PlatformEcosystemBrochure,
    category: 'Innovation & IP'
  },
  
  // Specialized Services
  {
    id: 'rent-reversions',
    title: 'Rent Reversions',
    description: 'Advanced rental analysis and reversion modeling for commercial properties',
    component: RentReversionsBrochure,
    category: 'Specialized Services'
  },
  {
    id: 'esd',
    title: 'ESD (Environmental Sustainable Design)',
    description: 'Environmental sustainable design assessment and certification',
    component: ESDBrochure,
    category: 'Specialized Services'
  }
];

const BrochureViewer = () => {
  const [selectedBrochure, setSelectedBrochure] = useState<string | null>(null);
  
  const selectedBrochureData = brochures.find(b => b.id === selectedBrochure);
  
  if (selectedBrochure && selectedBrochureData) {
    const BrochureComponent = selectedBrochureData.component;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        {/* Back Buttons */}
        <div className="relative z-10 p-6">
          <div className="flex gap-4">
            <Button 
              onClick={() => setSelectedBrochure(null)} 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Brochures
            </Button>
            <Button 
              onClick={() => window.location.href = '/dashboard'} 
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
            >
              🏠 Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="relative z-10">
          <BrochureComponent />
        </div>
      </div>
    );
  }

  // Group brochures by category
  const groupedBrochures = brochures.reduce((acc, brochure) => {
    if (!acc[brochure.category]) {
      acc[brochure.category] = [];
    }
    acc[brochure.category].push(brochure);
    return acc;
  }, {} as Record<string, typeof brochures>);

  const handleViewBrochure = (brochureId: string) => {
    setSelectedBrochure(brochureId);
  };

  const handleDownloadBrochure = (brochureId: string) => {
    setSelectedBrochure(brochureId);
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-orange-400 to-red-600 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Button 
              onClick={() => window.location.href = '/dashboard'} 
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
            >
              🏠 Back to Dashboard
            </Button>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-300 via-white to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl mb-6">
            Professional Brochures
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Comprehensive collection of our revolutionary platforms and services
          </p>
        </div>

        {/* Brochure Categories */}
        <div className="space-y-12">
          {Object.entries(groupedBrochures).map(([category, categoryBrochures]) => (
            <div key={category} className="space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent text-center mb-8">
                {category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryBrochures.map((brochure) => (
                  <div 
                    key={brochure.id}
                    className="group relative p-8 bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-sm rounded-2xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 hover:scale-105 transition-all duration-500 hover:shadow-emerald-500/30"
                  >
                    {/* Animated border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-emerald-400/50 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300">
                          <span className="text-2xl">📄</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-emerald-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                          {brochure.title}
                        </h3>
                        
                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                          {brochure.description}
                        </p>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleViewBrochure(brochure.id)}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        
                        <Button
                          onClick={() => handleDownloadBrochure(brochure.id)}
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-800/80 to-emerald-900/80 backdrop-blur-sm rounded-2xl border border-emerald-400/30 shadow-2xl shadow-emerald-500/20 p-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent mb-4">
              Contact Our Designers
            </h3>
            <p className="text-white/80 mb-6">
              Need custom brochures or additional marketing materials? Our design team can create tailored solutions for your specific needs.
            </p>
            <Button className="bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white px-8 py-3 text-lg shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105">
              Get Custom Design
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochureViewer;