import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, Shield, Zap, Globe, Brain, TrendingUp,
  DollarSign, Users, Clock, Star, Award, Target, ArrowLeft
} from 'lucide-react';
import PerfectSustanoLogo from '@/components/PerfectSustanoLogo';

const ICVDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('platform-access');

  const platforms = [
    { 
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and reporting',
      icon: BarChart3,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-600'
    },
    { 
      title: 'ESG Platform',
      description: 'Environmental & sustainability analysis',
      icon: Zap,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      titleColor: 'text-green-600'
    },
    { 
      title: 'SAM Platform',
      description: 'Strategic Asset Management',
      icon: Target,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      titleColor: 'text-purple-600'
    },
    { 
      title: 'Blockchain Hub',
      description: 'Cryptocurrency & blockchain tools',
      icon: Shield,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      titleColor: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-blue-500/20 to-blue-600/20" />
        <div className="relative z-10 text-center py-16 px-4 text-white">
          <div className="mb-6">
            <PerfectSustanoLogo 
              size="lg" 
              variant="white" 
              showText={true} 
              textPosition="right"
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ICV (Instant Comprehensive Valuation)™
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-white/90">
            AI-Powered Property Valuation And Assessment Technology
          </p>
          <p className="text-sm text-white/80">
            Patent Pending • IP Protected • Trademark © • Copyright Protected
          </p>
        </div>
      </div>

      {/* Back to Dashboard Button */}
      <div className="absolute top-4 left-4 z-20">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/')}
          className="bg-green-500 hover:bg-green-600 text-white border-0"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 bg-white/95 backdrop-blur-sm mx-4 md:mx-8 rounded-t-3xl shadow-2xl">
        {/* Platform Header */}
        <div className="text-center py-12 px-4 border-b border-gray-200">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-600">
              ICV (Instant Comprehensive Valuation)™ Platform
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            AI-powered property valuation and assessment technology
          </p>
        </div>

        {/* Tabbed Navigation */}
        <div className="px-4 md:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8 bg-gray-100">
              <TabsTrigger value="platform-access" className="text-xs md:text-sm">Platform Access</TabsTrigger>
              <TabsTrigger value="data-tools" className="text-xs md:text-sm">Data Tools</TabsTrigger>
              <TabsTrigger value="marketing-hub" className="text-xs md:text-sm">🎯 Marketing Hub</TabsTrigger>
              <TabsTrigger value="brochures" className="text-xs md:text-sm">📋 Brochures</TabsTrigger>
              <TabsTrigger value="ip-security" className="text-xs md:text-sm">🔒 IP Security</TabsTrigger>
              <TabsTrigger value="advanced-features" className="text-xs md:text-sm">Advanced Features</TabsTrigger>
            </TabsList>

            <TabsContent value="platform-access" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
                {platforms.map((platform, index) => {
                  const IconComponent = platform.icon;
                  return (
                    <Card key={index} className={`${platform.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}>
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconComponent className={`h-6 w-6 ${platform.iconColor}`} />
                        </div>
                        <h3 className={`font-bold mb-2 ${platform.titleColor}`}>{platform.title}</h3>
                        <p className="text-sm text-gray-600">{platform.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="data-tools" className="space-y-6">
              <div className="text-center py-12">
                <p className="text-gray-500">Data Tools content coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="marketing-hub" className="space-y-6">
              <div className="text-center py-12">
                <p className="text-gray-500">Marketing Hub content coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="brochures" className="space-y-6">
              <div className="text-center py-12">
                <p className="text-gray-500">Brochures content coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="ip-security" className="space-y-6">
              <div className="text-center py-12">
                <p className="text-gray-500">IP Security content coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="advanced-features" className="space-y-6">
              <div className="text-center py-12">
                <p className="text-gray-500">Advanced Features content coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </div>
  );
};

export default ICVDashboard;