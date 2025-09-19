import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Building2, 
  Calculator, 
  BarChart3, 
  TrendingUp,
  Activity,
  Sprout,
  CloudRain,
  Settings,
  Wrench,
  Scale,
  Shield,
  Info,
  FileCheck,
  FileText,
  PiggyBank,
  CreditCard,
  Database,
  Globe,
  Gavel,
  Target,
  Zap,
  Briefcase,
  Users,
  Search,
  Brain,
  ChartLine,
  Coins,
  TreePine,
  Camera,
  Layers
} from 'lucide-react';
import PerfectSustanoLogo from '@/components/PerfectSustanoLogo';
import PropertyValuation3DBackground from '@/components/PropertyValuation3DBackground';

const ICVDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('valuation');

  // All platforms from the green dashboard integrated into blue dashboard
  const platforms = [
    // Valuation & Assessment Platforms
    {
      category: 'valuation',
      title: 'Property Valuations',
      description: 'Comprehensive property valuation and assessment tools',
      icon: Building,
      route: '/property-valuations',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-600'
    },
    {
      category: 'valuation',
      title: 'Automated Valuation',
      description: 'AI-powered automated property valuation platform',
      icon: TrendingUp,
      route: '/automated-valuation',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      titleColor: 'text-purple-600'
    },
    {
      category: 'valuation',
      title: 'Property Assessment',
      description: 'Complete property assessment and analysis',
      icon: Building,
      route: '/property-assessment',
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      titleColor: 'text-indigo-600'
    },
    {
      category: 'valuation',
      title: 'Comprehensive Valuation',
      description: 'Full-scale comprehensive property valuation analysis',
      icon: BarChart3,
      route: '/comprehensive-valuation-analysis',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      titleColor: 'text-green-600'
    },
    {
      category: 'valuation',
      title: 'Insurance Valuations',
      description: 'Specialized insurance and risk assessment valuations',
      icon: Shield,
      route: '/insurance-valuations',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      titleColor: 'text-orange-600'
    },
    {
      category: 'valuation',
      title: 'Development Site Valuation',
      description: 'Specialized valuations for development sites',
      icon: Building2,
      route: '/development-site-valuation',
      bgColor: 'bg-teal-100',
      iconColor: 'text-teal-600',
      titleColor: 'text-teal-600'
    },

    // Analytics & Data Platforms (combining the original platforms)
    {
      category: 'analytics',
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and reporting',
      icon: BarChart3,
      route: '/dashboard',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-600'
    },
    {
      category: 'analytics',
      title: 'ESG Platform',
      description: 'Environmental & sustainability analysis',
      icon: Sprout,
      route: '/esg-climate-assessment',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      titleColor: 'text-green-600'
    },
    {
      category: 'analytics',
      title: 'SAM Platform',
      description: 'Strategic Asset Management',
      icon: Target,
      route: '/sam-platform',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      titleColor: 'text-purple-600'
    },
    {
      category: 'analytics',
      title: 'Blockchain Hub',
      description: 'Cryptocurrency & blockchain tools',
      icon: Shield,
      route: '/crypto-trading',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      titleColor: 'text-orange-600'
    },

    // Business Platforms (new section for business tools)
    {
      category: 'business',
      title: 'Sustano Sphere™',
      description: 'Revolutionary platform ecosystem',
      icon: Zap,
      route: '/sustaino-pro',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      titleColor: 'text-green-600'
    },
    {
      category: 'business',
      title: 'Mortgage Broker',
      description: 'Mortgage and finance services',
      icon: PiggyBank,
      route: '/investment-platform',
      bgColor: 'bg-teal-100',
      iconColor: 'text-teal-600',
      titleColor: 'text-teal-600'
    },
    {
      category: 'business',
      title: 'Reality Sales',
      description: 'Real estate sales platform',
      icon: Gavel,
      route: '/reality-sales',
      bgColor: 'bg-pink-100',
      iconColor: 'text-pink-600',
      titleColor: 'text-pink-600'
    },
    {
      category: 'business',
      title: 'Property Management',
      description: 'Property management tools',
      icon: Building,
      route: '/work-hub',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-600'
    },

    // Rental & Commercial Platforms
    {
      category: 'rental',
      title: 'Rent Revision',
      description: 'Professional rent revision and market analysis',
      icon: TrendingUp,
      route: '/rent-revision',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-600'
    },
    {
      category: 'rental',
      title: 'Rent Determination',
      description: 'Expert rent determination and arbitration services',
      icon: Scale,
      route: '/rent-determination',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      titleColor: 'text-purple-600'
    },
    {
      category: 'rental',
      title: 'Plant & Equipment',
      description: 'Specialized plant and equipment valuations',
      icon: Wrench,
      route: '/plant-equipment',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      titleColor: 'text-gray-600'
    },

    // Investment & Trading Platforms
    {
      category: 'investment',
      title: 'SmartInvest Pro™',
      description: 'Micro-investing platform with smart portfolios',
      icon: PiggyBank,
      route: '/investment-platform',
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      titleColor: 'text-emerald-600'
    },
    {
      category: 'investment',
      title: 'BrickByBrick Pro™',
      description: 'Fractional property investment platform',
      icon: Building2,
      route: '/brick-by-brick',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      titleColor: 'text-purple-600'
    },
    {
      category: 'investment',
      title: 'Crypto Trading',
      description: 'Advanced cryptocurrency trading dashboard',
      icon: Coins,
      route: '/crypto-trading',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-600'
    },

    // Marketing & Sales Platforms
    {
      category: 'marketing',
      title: 'Marketing Hub',
      description: 'Complete marketing materials and brand assets',
      icon: Target,
      route: '/marketing',
      bgColor: 'bg-pink-100',
      iconColor: 'text-pink-600',
      titleColor: 'text-pink-600'
    },
    {
      category: 'marketing',
      title: 'Advertising Platforms',
      description: 'Digital advertising and valuation platforms',
      icon: Globe,
      route: '/advertising-platforms',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      titleColor: 'text-orange-600'
    },
    {
      category: 'marketing',
      title: 'Social Media Assets',
      description: 'Social media content and brand materials',
      icon: Camera,
      route: '/social-media-assets',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      titleColor: 'text-red-600'
    },

    // Data & Analytics Platforms
    {
      category: 'data',
      title: 'Financial Reporting',
      description: 'Comprehensive financial reporting and analysis',
      icon: Calculator,
      route: '/financial-reporting',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-600'
    },
    {
      category: 'data',
      title: 'Data Bases',
      description: 'Property data management and analysis systems',
      icon: Database,
      route: '/databases',
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      titleColor: 'text-indigo-600'
    },

    // Documentation & Support
    {
      category: 'docs',
      title: 'Information Memorandum',
      description: 'Professional investment documentation generator',
      icon: FileText,
      route: '/information-memorandum',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      titleColor: 'text-gray-600'
    },
    {
      category: 'docs',
      title: 'Brochures',
      description: 'Product brochures and documentation viewer',
      icon: FileCheck,
      route: '/brochures',
      bgColor: 'bg-slate-100',
      iconColor: 'text-slate-600',
      titleColor: 'text-slate-600'
    },
    {
      category: 'docs',
      title: 'Concepts & Plans',
      description: 'Strategic concepts and development plans',
      icon: Layers,
      route: '/concepts-and-plans',
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      titleColor: 'text-indigo-600'
    }
  ];

  const categories = [
    { id: 'valuation', label: 'Valuation & Assessment', icon: Building },
    { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
    { id: 'business', label: 'Business Platforms', icon: Briefcase },
    { id: 'rental', label: 'Rental & Commercial', icon: Scale },
    { id: 'investment', label: 'Investment & Trading', icon: PiggyBank },
    { id: 'marketing', label: 'Marketing & Sales', icon: Target },
    { id: 'data', label: 'Data & Analytics', icon: Database },
    { id: 'docs', label: 'Documentation', icon: FileText }
  ];

  const filteredPlatforms = platforms.filter(platform => platform.category === activeTab);

  return (
    <div className="min-h-screen relative">
      {/* 3D Background */}
      <PropertyValuation3DBackground />
      
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-400/10 to-blue-600/30" />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-blue-600 rounded-full text-sm font-medium shadow-sm border border-blue-600/20">
              🚀 Sustano Pro - Complete Platform Ecosystem
            </div>
          </div>
          
          {/* Main Branding */}
          <div className="flex items-center justify-center mb-6">
            <PerfectSustanoLogo 
              size="xl"
              className="scale-150"
              variant="white"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            ICV (Instant Comprehensive Valuation)™
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-white/90">
            AI-Powered Property Valuation And Assessment Technology
          </p>
          <p className="text-sm text-white/80 mb-8">
            Patent Pending • IP Protected • Trademark © • Copyright Protected
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200/50">
              <div className="text-2xl font-bold text-blue-600">{platforms.length}</div>
              <div className="text-sm text-slate-600">Total Platforms</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200/50">
              <div className="text-2xl font-bold text-indigo-600">{categories.length}</div>
              <div className="text-sm text-slate-600">Categories</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200/50">
              <div className="text-2xl font-bold text-cyan-600">24/7</div>
              <div className="text-sm text-slate-600">Availability</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200/50">
              <div className="text-2xl font-bold text-orange-600">AI</div>
              <div className="text-sm text-slate-600">Powered</div>
            </div>
          </div>
        </div>

        {/* Platform Categories */}
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            
            {/* Category Tabs */}
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 bg-white/80 backdrop-blur-sm shadow-sm border border-blue-200/50 rounded-xl p-1 mb-8">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id} 
                  className="flex flex-col items-center gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg p-3"
                >
                  <category.icon className="h-4 w-4" />
                  <span className="text-xs hidden md:block">{category.label}</span>
                  <span className="text-xs md:hidden">{category.label.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Platform Grid for each category */}
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="space-y-6">
                  
                  {/* Category Header */}
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">{category.label}</h2>
                    <p className="text-white/80">
                      {filteredPlatforms.length} platform{filteredPlatforms.length !== 1 ? 's' : ''} available
                    </p>
                  </div>

                  {/* Platforms Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPlatforms.map((platform, index) => (
                      <Link key={index} to={platform.route}>
                        <Card className={`${platform.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 h-full`}>
                          <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4">
                              <platform.icon className={`h-6 w-6 ${platform.iconColor}`} />
                            </div>
                            <h3 className={`font-bold mb-2 ${platform.titleColor}`}>{platform.title}</h3>
                            <p className="text-sm text-gray-600">{platform.description}</p>
                            <div className="mt-4">
                              <Badge variant="outline" className="text-xs">
                                Active Platform
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  {/* Empty State */}
                  {filteredPlatforms.length === 0 && (
                    <div className="text-center py-12">
                      <category.icon className="h-12 w-12 text-white/60 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">No platforms available</h3>
                      <p className="text-white/60">This category is currently being developed.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-blue-200/30">
          <p className="text-white/80">
            © 2025 Sustaino Pro. All platforms integrated and ready to use.
          </p>
        </div>
        
        {/* Start Property Valuation Section */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">🚀 Start Property Valuation</h3>
            <p className="text-white/80 mb-6">
              Select property type to begin ICV (Instant Comprehensive Valuation)™ process
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Link to="/property-valuations">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Residential Property
                </Button>
              </Link>
              <Link to="/property-assessment">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Commercial Property
                </Button>
              </Link>
              <Link to="/development-site-valuation">
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                  Development Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICVDashboard;