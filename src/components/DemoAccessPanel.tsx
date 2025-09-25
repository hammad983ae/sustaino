/*
 * Demo Access Panel - Quick access to all EPAT demos
 * © 2024 Powered™. All Rights Reserved.
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, Calculator, Users, TrendingUp, Target, 
  BarChart3, Award, Search, AlertTriangle, Brain, 
  Zap, Clock, DollarSign, Shield
} from 'lucide-react';

interface Demo {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  status: 'active' | 'beta' | 'new';
  features: string[];
}

const AVAILABLE_DEMOS: Demo[] = [
  {
    id: 'industry-position',
    title: 'Industry & Position-Based EPAT™',
    description: 'Comprehensive performance assessment with industry-specific KPIs',
    category: 'Primary Assessment',
    icon: Building2,
    status: 'active',
    features: ['5 Industries', '15+ Positions', '60+ KPIs', 'Real-time Benchmarks']
  },
  {
    id: 'performance-rating',
    title: 'Performance Rating System™',
    description: 'Traditional performance metrics with industry benchmarks',
    category: 'Core Metrics',
    icon: TrendingUp,
    status: 'active',
    features: ['Mortgage Lending', 'Valuation', 'Estate Agents', 'Developers', 'Financial Ratios']
  },
  {
    id: 'employee-platform',
    title: 'Employee Performance & Value Assessment™',
    description: 'Advanced employee ranking and value analysis platform',
    category: 'Analytics',
    icon: Users,
    status: 'active',
    features: ['Multi-factor Analysis', 'ROI Calculations', 'Ranking System', 'Value Metrics']
  },
  {
    id: 'enhanced-epat',
    title: 'Comprehensive Employment Analysis™',
    description: 'Advanced employment risk assessment with occupation database',
    category: 'Risk Analysis',
    icon: Search,
    status: 'active',
    features: ['400+ Occupations', 'Risk Assessment', 'Career Paths', 'Market Insights']
  },
  {
    id: 'real-estate-kpis',
    title: 'Real Estate Specialized KPIs',
    description: 'Property-specific performance indicators and benchmarks',
    category: 'Specialized',
    icon: Calculator,
    status: 'new',
    features: ['Discounted Advertised Price', 'Sales Metrics', 'Market Performance', 'Client Satisfaction']
  },
  {
    id: 'financial-analysis',
    title: 'Financial Performance Analysis',
    description: 'Comprehensive financial ratios and accounting metrics',
    category: 'Financial',
    icon: DollarSign,
    status: 'beta',
    features: ['Financial Ratios', 'Profitability Analysis', 'Liquidity Metrics', 'Efficiency Ratios']
  }
];

export const DemoAccessPanel: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-500';
      case 'beta': return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'NEW';
      case 'beta': return 'BETA';
      default: return 'LIVE';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Available EPAT™ Demos & Modules
          <Badge variant="outline" className="text-xs">© 2024 Powered™</Badge>
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Access all EPAT assessment tools and demonstrations
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AVAILABLE_DEMOS.map(demo => {
            const Icon = demo.icon;
            return (
              <Card key={demo.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {demo.category}
                      </Badge>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-white text-xs ${getStatusColor(demo.status)}`}
                    >
                      {getStatusLabel(demo.status)}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{demo.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{demo.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-muted-foreground">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {demo.features.map(feature => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        // Navigate to the specific demo section
                        const element = document.querySelector(`[value="${demo.id}"]`);
                        if (element) {
                          (element as HTMLElement).click();
                        }
                      }}
                    >
                      Access Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{AVAILABLE_DEMOS.length}</div>
              <div className="text-sm text-muted-foreground">Total Demos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-muted-foreground">Industries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">15+</div>
              <div className="text-sm text-muted-foreground">Positions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">60+</div>
              <div className="text-sm text-muted-foreground">KPIs</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};