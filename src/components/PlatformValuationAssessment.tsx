/**
 * Platform Valuation Assessment
 * AS IS vs AS IF COMPLETE analysis of the DeLorenzo Property Platform
 * Technology asset valuation using digital platform methodologies
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, DollarSign, Target, CheckCircle, 
  Clock, Users, Database, Zap, Globe, Shield,
  BarChart3, Lightbulb, Rocket, Star
} from 'lucide-react';

const PlatformValuationAssessment = () => {
  const [activeView, setActiveView] = useState('current');

  // Current Platform Assessment (AS IS)
  const currentAssets = {
    codebase: {
      value: 2500000, // $2.5M
      completion: 75,
      description: 'Comprehensive React/TypeScript platform with 600+ components'
    },
    ipPortfolio: {
      value: 8500000, // $8.5M  
      completion: 90,
      description: 'Extensive IP protection, algorithms, methodologies'
    },
    database: {
      value: 1200000, // $1.2M
      completion: 85,
      description: 'Supabase integration with comprehensive schemas'
    },
    integrations: {
      value: 3200000, // $3.2M
      completion: 70,
      description: 'CoreLogic, PEXA, Government APIs, Google Maps'
    },
    aiFeatures: {
      value: 4800000, // $4.8M
      completion: 80,
      description: 'AI assistant, automated analysis, ESG assessment'
    },
    compliance: {
      value: 2800000, // $2.8M
      completion: 95,
      description: 'RICS, API, AVI, IVSC, USPAP compliance framework'
    }
  };

  const currentTotal = Object.values(currentAssets).reduce((sum, asset) => sum + asset.value, 0);

  // Completion Requirements
  const completionItems = [
    {
      category: 'Technical Infrastructure',
      items: [
        { task: 'Production deployment optimization', effort: 'Medium', value: 500000 },
        { task: 'Advanced caching & performance', effort: 'Medium', value: 300000 },
        { task: 'Mobile responsiveness enhancement', effort: 'Low', value: 200000 },
        { task: 'Advanced security hardening', effort: 'High', value: 800000 }
      ]
    },
    {
      category: 'Business Features',
      items: [
        { task: 'Multi-tenant architecture', effort: 'High', value: 1500000 },
        { task: 'Advanced reporting engine', effort: 'Medium', value: 800000 },
        { task: 'Workflow automation', effort: 'Medium', value: 600000 },
        { task: 'Client portal enhancement', effort: 'Medium', value: 400000 }
      ]
    },
    {
      category: 'Market Expansion',
      items: [
        { task: 'International market adaptation', effort: 'High', value: 2000000 },
        { task: 'Additional property types', effort: 'Medium', value: 1200000 },
        { task: 'Blockchain integration completion', effort: 'High', value: 3000000 },
        { task: 'Auction platform enhancement', effort: 'High', value: 2500000 }
      ]
    },
    {
      category: 'Commercial Readiness',
      items: [
        { task: 'Sales & marketing platform', effort: 'Medium', value: 800000 },
        { task: 'Customer support system', effort: 'Low', value: 300000 },
        { task: 'Training & documentation', effort: 'Medium', value: 400000 },
        { task: 'Partnership integrations', effort: 'High', value: 1000000 }
      ]
    }
  ];

  const totalCompletionValue = completionItems
    .flatMap(cat => cat.items)
    .reduce((sum, item) => sum + item.value, 0);

  const asIfCompleteValue = currentTotal + totalCompletionValue;

  // Market multipliers
  const marketMultipliers = {
    saas: 8, // 8x revenue multiple for SaaS platforms
    proptech: 12, // 12x for innovative PropTech
    aiPlatform: 15, // 15x for AI-enabled platforms
    marketplace: 20 // 20x for two-sided marketplaces
  };

  const estimatedARR = 5000000; // $5M ARR potential
  const platformMultiple = 15; // Combined multiplier

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            DeLorenzo Property Platform Valuation
          </CardTitle>
          <p className="text-muted-foreground">
            Professional technology asset valuation using digital platform methodologies
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-800">AS IS Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">
              ${(currentTotal / 1000000).toFixed(1)}M
            </div>
            <p className="text-sm text-green-700">Current platform value</p>
            <Progress value={78} className="mt-3" />
            <p className="text-xs text-green-600 mt-1">78% complete</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-800">Completion Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ${(totalCompletionValue / 1000000).toFixed(1)}M
            </div>
            <p className="text-sm text-blue-700">Required to complete</p>
            <Progress value={22} className="mt-3" />
            <p className="text-xs text-blue-600 mt-1">22% remaining</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-purple-800">AS IF COMPLETE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              ${(asIfCompleteValue / 1000000).toFixed(1)}M
            </div>
            <p className="text-sm text-purple-700">Completed platform value</p>
            <Progress value={100} className="mt-3" />
            <p className="text-xs text-purple-600 mt-1">100% complete</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Current Assets</TabsTrigger>
          <TabsTrigger value="completion">Completion Plan</TabsTrigger>
          <TabsTrigger value="market">Market Valuation</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Platform Assets (AS IS)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(currentAssets).map(([key, asset]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                        <Badge variant="outline">{asset.completion}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{asset.description}</p>
                      <Progress value={asset.completion} className="mt-2" />
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold">${(asset.value / 1000000).toFixed(1)}M</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completion Roadmap</CardTitle>
              <p className="text-muted-foreground">Required items to reach AS IF COMPLETE value</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {completionItems.map((category, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {category.category}
                    </h3>
                    <div className="space-y-2">
                      {category.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center justify-between p-3 rounded border bg-muted/50">
                          <div className="flex-1">
                            <span className="font-medium">{item.task}</span>
                            <Badge 
                              variant={item.effort === 'High' ? 'destructive' : item.effort === 'Medium' ? 'secondary' : 'outline'}
                              className="ml-2 text-xs"
                            >
                              {item.effort}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <span className="font-bold">${(item.value / 1000).toFixed(0)}K</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market-Based Valuation</CardTitle>
              <p className="text-muted-foreground">Platform valuation using industry multiples</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-semibold">Revenue Multiples</h4>
                  {Object.entries(marketMultipliers).map(([type, multiple]) => (
                    <div key={type} className="flex justify-between items-center p-3 rounded border">
                      <span className="capitalize">{type.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-bold">{multiple}x</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Valuation Calculation</h4>
                  <div className="p-4 rounded-lg border bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Estimated ARR:</span>
                        <span className="font-bold">${(estimatedARR / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Multiple:</span>
                        <span className="font-bold">{platformMultiple}x</span>
                      </div>
                      <hr className="border-gray-300" />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Market Valuation:</span>
                        <span className="text-purple-600">${(estimatedARR * platformMultiple / 1000000).toFixed(0)}M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ROI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-green-100 to-emerald-100">
                  <CardContent className="p-4 text-center">
                    <Rocket className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">
                      {(((asIfCompleteValue - currentTotal) / totalCompletionValue) * 100).toFixed(0)}%
                    </div>
                    <div className="text-sm text-green-700">Value Creation ROI</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-100 to-cyan-100">
                  <CardContent className="p-4 text-center">
                    <Star className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">18-24</div>
                    <div className="text-sm text-blue-700">Months to Complete</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-100 to-violet-100">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-purple-600">
                      ${((asIfCompleteValue - currentTotal) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-purple-700">Upside Potential</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformValuationAssessment;