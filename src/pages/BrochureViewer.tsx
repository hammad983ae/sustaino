import React from 'react';
import { FileText, Building, Leaf, BarChart, Wrench, TrendingUp, Coins, BookOpen, Calculator, Zap, Shield, Globe, Crown, Briefcase } from 'lucide-react';
import BrochureStyleLayout from '@/components/BrochureStyleLayout';

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
import ComprehensiveInvestorAnalysis from '@/components/brochures/ComprehensiveInvestorAnalysis';

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
  const coreServices = [
    {
      title: 'Property Valuations',
      description: 'Professional property assessment services across all asset classes with AI-enhanced analytics',
      icon: <Building className="w-6 h-6 text-white" />,
      onView: () => console.log('Viewing Property Valuations'),
      onPrint: () => console.log('Printing Property Valuations')
    },
    {
      title: 'ESG Assessment',
      description: 'Comprehensive environmental, social, and governance assessment including Agri Hub and Property Hub',
      icon: <Leaf className="w-6 h-6 text-white" />,
      onView: () => console.log('Viewing ESG Assessment'),
      onPrint: () => console.log('Printing ESG Assessment')
    },
    {
      title: 'Financial Reporting',
      description: 'Advanced financial analysis and reporting for investment decisions',
      icon: <BarChart className="w-6 h-6 text-white" />,
      onView: () => console.log('Viewing Financial Reporting'),
      onPrint: () => console.log('Printing Financial Reporting')
    },
    {
      title: 'Comprehensive Investor Analysis',
      description: 'Complete ecosystem valuation, SWOT, PESTEL, VIRO analysis, competitor intelligence, ROI projections, and JV opportunities',
      icon: <Briefcase className="w-6 h-6 text-white" />,
      onView: () => console.log('Viewing Comprehensive Investor Analysis'),
      onPrint: () => console.log('Printing Comprehensive Investor Analysis')
    }
  ];


  const revolutionaryPlatforms = [
    {
      title: 'SAM Platform',
      description: 'Strategic Asset Management platform for comprehensive portfolio oversight',
      icon: <Calculator className="w-6 h-6 text-white" />,
      onView: () => console.log('Viewing SAM Platform'),
      onPrint: () => console.log('Printing SAM Platform')
    },
    {
      title: 'Brick by Brick Pro',
      description: 'Advanced construction and development analysis platform',
      icon: <Wrench className="w-6 h-6 text-white" />,
      onView: () => console.log('Viewing Brick by Brick Pro'),
      onPrint: () => console.log('Printing Brick by Brick Pro')
    },
    {
      title: 'Sustano Coin',
      description: 'Revolutionary blockchain-based sustainability currency',
      icon: <Coins className="w-6 h-6 text-white" />,
      onView: () => console.log('Viewing Sustano Coin'),
      onPrint: () => console.log('Printing Sustano Coin')
    },
    {
      title: 'Blockchain Integration',
      description: 'Distributed ledger technology for transparent property transactions',
      icon: <Zap className="w-6 h-6 text-white" />,
      onView: () => console.log('Viewing Blockchain Integration'),
      onPrint: () => console.log('Printing Blockchain Integration')
    },
    {
      title: 'Platform Ecosystem',
      description: 'Integrated technology platform spanning all valuation disciplines',
      icon: <Globe className="w-6 h-6 text-white" />,
      onView: () => console.log('Viewing Platform Ecosystem'),
      onPrint: () => console.log('Printing Platform Ecosystem')
    },
    {
      title: 'Patents & IP',
      description: 'Comprehensive IP protection and patent portfolio management',
      icon: <BookOpen className="w-6 h-6 text-white" />,
      onView: () => console.log('Viewing Patents & IP'),
      onPrint: () => console.log('Printing Patents & IP')
    }
  ];

  const sections = [
    {
      title: 'Core Services',
      cards: coreServices
    },
    {
      title: 'Revolutionary Platforms',
      cards: revolutionaryPlatforms
    }
  ];

  return (
    <BrochureStyleLayout
      title="Professional Brochures"
      subtitle="Comprehensive collection of our revolutionary platforms and services"
      sections={sections}
    />
  );
};

export default BrochureViewer;