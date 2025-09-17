/**
 * ============================================================================
 * Brochure Viewer - PDF Export Ready
 * Professional brochure viewer for both platforms
 * ============================================================================
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Mail, Printer, FileText, Building, 
  TrendingUp, Settings, BarChart3, Leaf, Folder,
  Gavel, Crown, MapPin, TreePine, Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuctionSphereBrochure from '@/components/AuctionSphereBrochure';
import SustanoSphereBrochure from '@/components/SustanoSphereBrochure';
import PropertyValuationsBrochure from '@/components/brochures/PropertyValuationsBrochure';
import RentReversionsBrochure from '@/components/brochures/RentReversionsBrochure';
import PlantEquipmentBrochure from '@/components/brochures/PlantEquipmentBrochure';
import FinancialReportingBrochure from '@/components/brochures/FinancialReportingBrochure';
import ESGAssessmentBrochure from '@/components/brochures/ESGAssessmentBrochure';
import DevelopmentSiteBrochure from '@/components/brochures/DevelopmentSiteBrochure';
import ESDBrochure from '@/components/brochures/ESDBrochure';
import PlatformEcosystemBrochure from '@/components/brochures/PlatformEcosystemBrochure';
import PatentsAndIPBrochure from '@/components/brochures/PatentsAndIPBrochure';

type BrochureType = 
  | 'auction-sphere' 
  | 'sustano-sphere' 
  | 'property-valuations'
  | 'rent-reversions'
  | 'plant-equipment'
  | 'financial-reporting'
  | 'esg-assessment'
  | 'development-sites'
  | 'esd-services'
  | 'platform-ecosystem'
  | 'patents-ip';

const BrochureViewer = () => {
  const [activeBrochure, setActiveBrochure] = useState<BrochureType | null>(null);
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleEmailInfo = () => {
    const subject = encodeURIComponent('Professional Property Services Brochures - DeLorenzo Property Group');
    const body = encodeURIComponent(`Dear Valued Client,

Please find attached our comprehensive property services brochures covering:

PREMIUM PLATFORMS:
• Auction-Sphere™ - Revolutionary international real estate auction intelligence
• Sustaino-Sphere™ - ESG and climate risk assessment platform

CORE SERVICES:
• Property Valuations - All asset classes and purposes
• Rent Reversions - Expert rental assessment and reviews
• Plant & Equipment - Specialized industrial equipment valuations
• Financial Reporting - Professional AASB compliant reporting
• ESG Assessment - Environmental, social & governance analysis

Each brochure contains detailed information about our services, methodologies, and professional standards.

For more information or to schedule a consultation, please contact us:
📧 info@delorenzopropertygroup.com
📞 0417 693 838

Best regards,
DeLorenzo Property Group
Professional Property Services & Valuations

© 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.`);
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const brochureCategories = [
    {
      title: "Complete Platform Overview",
      icon: Crown,
      color: "from-blue-600 via-purple-600 to-green-600",
      brochures: [
        {
          id: 'platform-ecosystem' as BrochureType,
          title: 'POWERED Ecosystem',
          description: 'Complete AI-enhanced property intelligence platform overview',
          icon: Crown,
          color: 'purple'
        }
      ]
    },
    {
      title: "Intellectual Property",
      icon: Crown,
      color: "from-yellow-600 via-orange-600 to-red-600",
      brochures: [
        {
          id: 'patents-ip' as BrochureType,
          title: 'Patents & IP Portfolio',
          description: 'Comprehensive intellectual property protection and patent portfolio overview',
          icon: Crown,
          color: 'purple'
        }
      ]
    },
    {
      title: "Premium Platforms",
      icon: Gavel,
      color: "from-purple-600 to-blue-600",
      brochures: [
        {
          id: 'auction-sphere' as BrochureType,
          title: 'Auction-Sphere™',
          description: 'Revolutionary international real estate auction intelligence',
          icon: Gavel,
          color: 'blue'
        },
        {
          id: 'sustano-sphere' as BrochureType,
          title: 'Sustaino-Sphere™',
          description: 'ESG and climate risk assessment platform',
          icon: Leaf,
          color: 'green'
        }
      ]
    },
    {
      title: "Core Valuation Services",
      icon: Building,
      color: "from-blue-600 to-green-600",
      brochures: [
        {
          id: 'property-valuations' as BrochureType,
          title: 'Property Valuations',
          description: 'Comprehensive valuations across all property types',
          icon: Building,
          color: 'blue'
        },
        {
          id: 'rent-reversions' as BrochureType,
          title: 'Rent Reversions',
          description: 'Expert rental valuation and market review services',
          icon: TrendingUp,
          color: 'green'
        },
        {
          id: 'plant-equipment' as BrochureType,
          title: 'Plant & Equipment',
          description: 'Specialized plant, machinery & equipment valuations',
          icon: Settings,
          color: 'orange'
        },
        {
          id: 'development-sites' as BrochureType,
          title: 'Development Sites',
          description: 'Expert development site analysis and feasibility assessment',
          icon: MapPin,
          color: 'blue'
        }
      ]
    },
    {
      title: "Environmental & Sustainability",
      icon: TreePine,
      color: "from-green-600 to-blue-600",
      brochures: [
        {
          id: 'esg-assessment' as BrochureType,
          title: 'ESG Assessment',
          description: 'Environmental, social & governance property assessment',
          icon: Leaf,
          color: 'green'
        },
        {
          id: 'esd-services' as BrochureType,
          title: 'ESD Services',
          description: 'Ecologically sustainable development and green building solutions',
          icon: TreePine,
          color: 'green'
        }
      ]
    },
    {
      title: "Advisory & Reporting",
      icon: FileText,
      color: "from-purple-600 to-blue-600",
      brochures: [
        {
          id: 'financial-reporting' as BrochureType,
          title: 'Financial Reporting',
          description: 'Professional financial analysis and reporting solutions',
          icon: BarChart3,
          color: 'purple'
        }
      ]
    }
  ];

  const renderBrochure = () => {
    switch (activeBrochure) {
      case 'platform-ecosystem':
        return <PlatformEcosystemBrochure />;
      case 'patents-ip':
        return <PatentsAndIPBrochure />;
      case 'auction-sphere':
        return <AuctionSphereBrochure />;
      case 'sustano-sphere':
        return <SustanoSphereBrochure />;
      case 'property-valuations':
        return <PropertyValuationsBrochure />;
      case 'rent-reversions':
        return <RentReversionsBrochure />;
      case 'plant-equipment':
        return <PlantEquipmentBrochure />;
      case 'financial-reporting':
        return <FinancialReportingBrochure />;
      case 'esg-assessment':
        return <ESGAssessmentBrochure />;
      case 'development-sites':
        return <DevelopmentSiteBrochure />;
      case 'esd-services':
        return <ESDBrochure />;
      default:
        return null;
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500/10 to-blue-600/10 border-blue-200 text-blue-700',
      green: 'from-green-500/10 to-green-600/10 border-green-200 text-green-700',
      orange: 'from-orange-500/10 to-orange-600/10 border-orange-200 text-orange-700',
      purple: 'from-purple-500/10 to-purple-600/10 border-purple-200 text-purple-700',
      red: 'from-red-500/10 to-red-600/10 border-red-200 text-red-700'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (activeBrochure) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Controls */}
        <div className="bg-white shadow-sm border-b p-4 flex items-center justify-between print:hidden">
          <Button 
            onClick={() => setActiveBrochure(null)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Brochures
          </Button>
          
          <div className="flex items-center gap-3">
            <Button onClick={handleEmailInfo} variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email Info
            </Button>
            <Button onClick={handlePrint} variant="default" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print/Save PDF
            </Button>
          </div>
        </div>
        
        {/* Brochure Content */}
        <div className="print:p-0">
          {renderBrochure()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back to Dashboard Button */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="flex items-center gap-2 hover:bg-blue-50"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Professional Brochure Library
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Comprehensive property services documentation for client distribution
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-blue-600 text-white px-4 py-2">
              📄 PDF Ready
            </Badge>
            <Badge className="bg-green-600 text-white px-4 py-2">
              📧 Email Distribution
            </Badge>
            <Badge className="bg-purple-600 text-white px-4 py-2">
              🖨️ Print Optimized
            </Badge>
          </div>
        </div>

        {/* Brochure Categories */}
        <div className="space-y-12">
          {brochureCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.brochures.map((brochure) => (
                  <Card 
                    key={brochure.id}
                    className={`hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 bg-gradient-to-br ${getColorClasses(brochure.color)} border-2`}
                    onClick={() => setActiveBrochure(brochure.id)}
                  >
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                        <brochure.icon className={`h-8 w-8 text-${brochure.color}-600`} />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {brochure.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {brochure.description}
                      </p>
                      <Button className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        View & Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Folder className="h-6 w-6 text-blue-600" />
            How to Use Professional Brochures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Select Brochure</h4>
              <p className="text-sm text-gray-600">Choose the appropriate service brochure from the categories above</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Generate PDF</h4>
              <p className="text-sm text-gray-600">Use "Print/Save PDF" to create professional documents for distribution</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Email Distribution</h4>
              <p className="text-sm text-gray-600">Use "Email Info" for pre-formatted client communication templates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochureViewer;