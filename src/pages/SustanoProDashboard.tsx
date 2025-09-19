import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
import ThunderboltIcon from '@/components/ThunderboltIcon';
import PropertyValuation3DBackground from '@/components/PropertyValuation3DBackground';
import PerfectSustanoLogo from '@/components/PerfectSustanoLogo';

const SustanoProDashboard = () => {
  const [activeTab, setActiveTab] = useState('valuation');
  const [colorTheme, setColorTheme] = useState<'green' | 'blue'>('green');

  const platforms = [
    // Valuation & Assessment Platforms
    {
      category: 'valuation',
      title: 'Property Valuations',
      description: 'Comprehensive property valuation and assessment tools',
      icon: Building,
      route: '/property-valuations',
      color: 'from-blue-500 to-blue-600'
    },
    {
      category: 'valuation',
      title: 'Automated Valuation',
      description: 'AI-powered automated property valuation platform',
      icon: TrendingUp,
      route: '/automated-valuation',
      color: 'from-purple-500 to-purple-600'
    },
    {
      category: 'valuation',
      title: 'Property Assessment',
      description: 'Complete property assessment and analysis',
      icon: Building,
      route: '/property-assessment',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      category: 'valuation',
      title: 'Comprehensive Valuation',
      description: 'Full-scale comprehensive property valuation analysis',
      icon: BarChart3,
      route: '/comprehensive-valuation-analysis',
      color: 'from-green-500 to-green-600'
    },
    {
      category: 'valuation',
      title: 'Insurance Valuations',
      description: 'Specialized insurance and risk assessment valuations',
      icon: Shield,
      route: '/insurance-valuations',
      color: 'from-orange-500 to-orange-600'
    },
    {
      category: 'valuation',
      title: 'Development Site Valuation',
      description: 'Specialized valuations for development sites',
      icon: Building2,
      route: '/development-site-valuation',
      color: 'from-teal-500 to-teal-600'
    },

    // Rental & Commercial Platforms
    {
      category: 'rental',
      title: 'Rent Revision',
      description: 'Professional rent revision and market analysis',
      icon: TrendingUp,
      route: '/rent-revision',
      color: 'from-blue-500 to-blue-600'
    },
    {
      category: 'rental',
      title: 'Rent Determination',
      description: 'Expert rent determination and arbitration services',
      icon: Scale,
      route: '/rent-determination',
      color: 'from-purple-500 to-purple-600'
    },
    {
      category: 'rental',
      title: 'Plant & Equipment',
      description: 'Specialized plant and equipment valuations',
      icon: Wrench,
      route: '/plant-equipment',
      color: 'from-gray-500 to-gray-600'
    },

    // Investment & Trading Platforms
    {
      category: 'investment',
      title: 'SmartInvest Pro™',
      description: 'Micro-investing platform with smart portfolios',
      icon: PiggyBank,
      route: '/investment-platform',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      category: 'investment',
      title: 'BrickByBrick Pro™',
      description: 'Fractional property investment platform',
      icon: Building2,
      route: '/brick-by-brick',
      color: 'from-purple-500 to-purple-600'
    },
    {
      category: 'investment',
      title: 'Crypto Trading',
      description: 'Advanced cryptocurrency trading dashboard',
      icon: Coins,
      route: '/crypto-trading',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      category: 'investment',
      title: 'Reality Sales',
      description: 'Real estate sales and transaction platform',
      icon: Gavel,
      route: '/reality-sales',
      color: 'from-red-500 to-red-600'
    },

    // ESG & Climate Platforms
    {
      category: 'esg',
      title: 'ESG Climate Assessment',
      description: 'Environmental, Social, and Governance assessment tools',
      icon: Sprout,
      route: '/esg-climate-assessment',
      color: 'from-green-500 to-green-600'
    },
    {
      category: 'esg',
      title: 'ESG Strategy Analysis',
      description: 'Advanced ESG strategy and sustainability analysis',
      icon: TreePine,
      route: '/esg-strategy-analysis',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      category: 'esg',
      title: 'SAM Platform',
      description: 'Sustainable Asset Management platform',
      icon: Activity,
      route: '/sam-platform',
      color: 'from-teal-500 to-teal-600'
    },

    // Data & Analytics Platforms
    {
      category: 'data',
      title: 'Financial Reporting',
      description: 'Comprehensive financial reporting and analysis',
      icon: Calculator,
      route: '/financial-reporting',
      color: 'from-blue-500 to-blue-600'
    },
    {
      category: 'data',
      title: 'Data Bases',
      description: 'Property data management and analysis systems',
      icon: Database,
      route: '/databases',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      category: 'data',
      title: 'Work Hub',
      description: 'Central work management and collaboration hub',
      icon: Briefcase,
      route: '/work-hub',
      color: 'from-purple-500 to-purple-600'
    },

    // Marketing & Sales Platforms
    {
      category: 'marketing',
      title: 'Marketing Hub',
      description: 'Complete marketing materials and brand assets',
      icon: Target,
      route: '/marketing',
      color: 'from-pink-500 to-pink-600'
    },
    {
      category: 'marketing',
      title: 'Advertising Platforms',
      description: 'Digital advertising and valuation platforms',
      icon: Globe,
      route: '/advertising-platforms',
      color: 'from-orange-500 to-orange-600'
    },
    {
      category: 'marketing',
      title: 'Social Media Assets',
      description: 'Social media content and brand materials',
      icon: Camera,
      route: '/social-media-assets',
      color: 'from-red-500 to-red-600'
    },
    {
      category: 'marketing',
      title: 'Auction Sphere POS',
      description: 'Point of sale system for auction platforms',
      icon: CreditCard,
      route: '/auction-sphere-pos',
      color: 'from-blue-500 to-blue-600'
    },

    // Documentation & Support
    {
      category: 'docs',
      title: 'Information Memorandum',
      description: 'Professional investment documentation generator',
      icon: FileText,
      route: '/information-memorandum',
      color: 'from-gray-500 to-gray-600'
    },
    {
      category: 'docs',
      title: 'Brochures',
      description: 'Product brochures and documentation viewer',
      icon: FileCheck,
      route: '/brochures',
      color: 'from-slate-500 to-slate-600'
    },
    {
      category: 'docs',
      title: 'Concepts & Plans',
      description: 'Strategic concepts and development plans',
      icon: Layers,
      route: '/concepts-and-plans',
      color: 'from-indigo-500 to-indigo-600'
    },

    // Legacy & Special Access
    {
      category: 'legacy',
      title: 'Costa Group Reports',
      description: 'Costa Group specialized reporting platform',
      icon: Building,
      route: '/costa-group-valuations',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      category: 'legacy',
      title: 'Client Demo',
      description: 'Client demonstration and preview platform',
      icon: Users,
      route: '/client-demo',
      color: 'from-blue-500 to-blue-600'
    },
    {
      category: 'legacy',
      title: 'Main Report',
      description: 'Primary property assessment report system',
      icon: FileText,
      route: '/report',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const categories = [
    { id: 'valuation', label: 'Valuation & Assessment', icon: Building },
    { id: 'rental', label: 'Rental & Commercial', icon: Scale },
    { id: 'investment', label: 'Investment & Trading', icon: PiggyBank },
    { id: 'esg', label: 'ESG & Climate', icon: Sprout },
    { id: 'data', label: 'Data & Analytics', icon: Database },
    { id: 'marketing', label: 'Marketing & Sales', icon: Target },
    { id: 'docs', label: 'Documentation', icon: FileText },
    { id: 'legacy', label: 'Legacy & Special', icon: Settings }
  ];

  const filteredPlatforms = platforms.filter(platform => platform.category === activeTab);

  const backgroundGradients = {
    green: "bg-gradient-to-br from-emerald-400/90 via-teal-500/80 to-green-600/70",
    blue: "bg-gradient-to-br from-blue-500/90 via-indigo-600/80 to-purple-700/70"
  };

  const overlayGradients = {
    green: "from-emerald-50/80 via-teal-50/60 to-green-50/70",
    blue: "from-blue-50/80 via-indigo-50/60 to-purple-50/70"
  };

  const accentColors = {
    green: { primary: 'emerald-600', secondary: 'teal-600', tertiary: 'green-600' },
    blue: { primary: 'blue-600', secondary: 'indigo-600', tertiary: 'purple-600' }
  };

  return (
    <div className="min-h-screen relative">
      {/* 3D Background */}
      <PropertyValuation3DBackground />
      
      {/* Dynamic background overlay */}
      <div className={`absolute inset-0 ${backgroundGradients[colorTheme]}`} />
      <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradients[colorTheme]}`} />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className={`inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-${accentColors[colorTheme].primary} rounded-full text-sm font-medium shadow-sm border border-${accentColors[colorTheme].primary}/20`}>
              🚀 Sustaino Pro - Complete Platform Ecosystem
            </div>
            <Button 
              onClick={() => setColorTheme(colorTheme === 'green' ? 'blue' : 'green')}
              variant="outline"
              size="sm"
              className="bg-white/80 backdrop-blur-sm"
            >
              Switch Theme
            </Button>
          </div>
          
          {/* Main Branding */}
          <div className="flex items-center justify-center">
            <PerfectSustanoLogo 
              size="xl" 
              variant={colorTheme === 'green' ? 'emerald' : 'blue'}
              showText={true}
              textPosition="right"
              className="scale-125"
            />
          </div>
          
          <p className={`text-lg text-${accentColors[colorTheme].primary} max-w-3xl mx-auto leading-relaxed`}>
            Access all Sustaino Pro platforms, tools, and services from one centralized dashboard. 
            Choose your category to explore our comprehensive suite of property and investment solutions.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-emerald-200/50">
              <div className="text-2xl font-bold text-emerald-600">{platforms.length}</div>
              <div className="text-sm text-slate-600">Total Platforms</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-emerald-200/50">
              <div className="text-2xl font-bold text-teal-600">{categories.length}</div>
              <div className="text-sm text-slate-600">Categories</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-emerald-200/50">
              <div className="text-2xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-slate-600">Availability</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-emerald-200/50">
              <div className="text-2xl font-bold text-orange-600">AI</div>
              <div className="text-sm text-slate-600">Powered</div>
            </div>
          </div>
        </div>

        {/* Platform Categories */}
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            
            {/* Category Tabs */}
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 bg-white/80 backdrop-blur-sm shadow-sm border border-emerald-200/50 rounded-xl p-1 mb-8">
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
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">{category.label}</h2>
                    <p className="text-slate-600">
                      {filteredPlatforms.length} platform{filteredPlatforms.length !== 1 ? 's' : ''} available
                    </p>
                  </div>

                  {/* Platforms Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPlatforms.map((platform, index) => (
                      <Link key={index} to={platform.route}>
                        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-emerald-200/50 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 h-full">
                          <CardHeader className={`bg-gradient-to-r ${platform.color} text-white rounded-t-lg`}>
                            <CardTitle className="flex items-center gap-3 text-lg">
                              <platform.icon className="h-6 w-6" />
                              {platform.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-6">
                            <p className="text-slate-600 leading-relaxed">
                              {platform.description}
                            </p>
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
                      <category.icon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-600 mb-2">No platforms available</h3>
                      <p className="text-slate-500">This category is currently being developed.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-emerald-200">
          <p className="text-slate-600">
            © 2025 Sustaino Pro. All platforms integrated and ready to use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SustanoProDashboard;