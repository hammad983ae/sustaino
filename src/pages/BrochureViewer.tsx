import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye } from 'lucide-react';

// Import all the actual brochures
import PropertyValuationsBrochure from '@/components/brochures/PropertyValuationsBrochure';
import FinancialReportingBrochure from '@/components/brochures/FinancialReportingBrochure';
import ESGAssessmentBrochure from '@/components/brochures/ESGAssessmentBrochure';
import DevelopmentSiteBrochure from '@/components/brochures/DevelopmentSiteBrochure';
import PlantEquipmentBrochure from '@/components/brochures/PlantEquipmentBrochure';
import RentReversionsBrochure from '@/components/brochures/RentReversionsBrochure';
import ESDBrochure from '@/components/brochures/ESDBrochure';
import PlatformEcosystemBrochure from '@/components/brochures/PlatformEcosystemBrochure';
import PatentsAndIPBrochure from '@/components/brochures/PatentsAndIPBrochure';
import { BrickByBrickProBrochure } from '@/components/brochures/BrickByBrickProBrochure';

const brochures = [
  {
    id: 'property-valuations',
    title: 'Property Valuations',
    description: 'Comprehensive valuation services across all property types',
    component: PropertyValuationsBrochure,
    category: 'Core Services'
  },
  {
    id: 'financial-reporting', 
    title: 'Financial Reporting',
    description: 'Comprehensive financial reporting and accounting services',
    component: FinancialReportingBrochure,
    category: 'Core Services'
  },
  {
    id: 'esg-assessment',
    title: 'ESG Assessment',
    description: 'Environmental, Social & Governance assessment services',
    component: ESGAssessmentBrochure,
    category: 'Sustainability'
  },
  {
    id: 'development-site',
    title: 'Development Site Analysis',
    description: 'Comprehensive development site analysis and feasibility services',
    component: DevelopmentSiteBrochure,
    category: 'Development'
  },
  {
    id: 'plant-equipment',
    title: 'Plant & Equipment',
    description: 'Specialized plant, machinery & equipment valuation services',
    component: PlantEquipmentBrochure,
    category: 'Specialized'
  },
  {
    id: 'rent-reversions',
    title: 'Rent Reversions',
    description: 'Specialized rental valuation and review services',
    component: RentReversionsBrochure,
    category: 'Specialized'
  },
  {
    id: 'esd',
    title: 'ESD Services',
    description: 'Ecologically Sustainable Development services',
    component: ESDBrochure,
    category: 'Sustainability'
  },
  {
    id: 'platform-ecosystem',
    title: 'Platform Ecosystem',
    description: 'Complete property services platform overview',
    component: PlatformEcosystemBrochure,
    category: 'Platform'
  },
  {
    id: 'patents-ip',
    title: 'Patents & IP Portfolio',
    description: 'Intellectual property and patent portfolio overview',
    component: PatentsAndIPBrochure,
    category: 'Innovation'
  },
  {
    id: 'brick-by-brick',
    title: 'Brick by Brick Pro',
    description: 'Advanced property development and construction analysis',
    component: BrickByBrickProBrochure,
    category: 'Development'
  }
];

const BrochureViewer = () => {
  const [selectedBrochure, setSelectedBrochure] = useState<string | null>(null);
  
  const selectedBrochureData = brochures.find(b => b.id === selectedBrochure);
  
  if (selectedBrochure && selectedBrochureData) {
    const BrochureComponent = selectedBrochureData.component;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Enhanced header with 3D effects */}
        <div className="relative bg-slate-800/90 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10"></div>
          <div className="relative p-6">
            <button 
              onClick={() => setSelectedBrochure(null)}
              className="group mb-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <div className="flex items-center gap-2">
                <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                <span>Back to Brochures</span>
              </div>
            </button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {selectedBrochureData.title}
                </h1>
                <p className="text-gray-300">{selectedBrochureData.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Brochure content with enhanced styling */}
        <div className="relative">
          <BrochureComponent />
        </div>
      </div>
    );
  }

  const categories = Array.from(new Set(brochures.map(b => b.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header with 3D effect */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="relative inline-block">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 transform hover:scale-105 transition-all duration-500">
                Professional Marketing
              </h1>
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-8 transform hover:scale-105 transition-all duration-500">
                Brochures
              </h2>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-lg blur opacity-20 animate-pulse"></div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Access our revolutionary collection of professional service brochures - 
              engineered for maximum impact and conversion
            </p>
          </div>

          {categories.map((category, categoryIndex) => (
            <div key={category} className="mb-20 animate-fade-in" style={{ animationDelay: `${categoryIndex * 200}ms` }}>
              <div className="flex items-center mb-12">
                <div className="relative">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {category}
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
                <div className="flex-1 ml-8 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {brochures
                  .filter(brochure => brochure.category === category)
                  .map((brochure, index) => (
                    <div 
                      key={brochure.id} 
                      className="group relative"
                      style={{ animationDelay: `${(categoryIndex * 200) + (index * 100)}ms` }}
                    >
                      {/* Glowing border effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
                      
                      {/* Main card */}
                      <div className="relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 transform hover:scale-105 hover:rotate-1 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25">
                        {/* Floating icon */}
                        <div className="relative mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-lg">
                            <FileText className="h-8 w-8 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-bounce"></div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {brochure.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            {brochure.description}
                          </p>
                        </div>

                        {/* Action buttons with 3D effect */}
                        <div className="flex gap-4 mt-8">
                          <button 
                            onClick={() => setSelectedBrochure(brochure.id)}
                            className="relative group/btn flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Eye className="h-5 w-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                              <span>View</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                          </button>
                          
                          <button 
                            onClick={() => {
                              setSelectedBrochure(brochure.id);
                              setTimeout(() => window.print(), 500);
                            }}
                            className="relative group/btn bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                          >
                            <div className="flex items-center gap-2">
                              <Download className="h-5 w-5 group-hover/btn:translate-y-1 transition-transform duration-300" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                          </button>
                        </div>

                        {/* Floating particles effect */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                        </div>
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping animation-delay-200"></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Bottom CTA with 3D effect */}
          <div className="text-center mt-20 animate-fade-in">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 rounded-2xl blur opacity-30 animate-pulse"></div>
              <div className="relative bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  Need a Custom Brochure?
                </h3>
                <p className="text-gray-300 mb-6">
                  Our design team can create bespoke marketing materials tailored to your brand
                </p>
                <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                  Contact Our Designers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochureViewer;