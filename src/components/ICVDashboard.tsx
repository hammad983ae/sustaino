import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, Shield, Zap, Globe, Brain, TrendingUp,
  DollarSign, Users, Clock, Star, Award, Target
} from 'lucide-react';

const ICVDashboard: React.FC = () => {
  const platformMetrics = [
    { name: 'Analytics Dashboard', completion: 95, status: 'active', users: 1250 },
    { name: 'ESG Platform', completion: 88, status: 'active', users: 890 },
    { name: 'SAM Platform', completion: 92, status: 'active', users: 760 },
    { name: 'Blockchain Hub', completion: 85, status: 'active', users: 540 },
    { name: 'Sustaino Sphere™', completion: 98, status: 'featured', users: 2100 }
  ];

  const recentValuations = [
    { property: 'Commercial CBD Tower', value: 45000000, confidence: 96, type: 'Commercial' },
    { property: 'Residential Development', value: 28500000, confidence: 94, type: 'Residential' },
    { property: 'Industrial Warehouse', value: 15200000, confidence: 91, type: 'Industrial' },
    { property: 'Retail Shopping Center', value: 62000000, confidence: 97, type: 'Retail' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">ICV (Instant Comprehensive Valuation)™ Platform</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          AI Assisted Property Valuation and ESG Assessment Technology
        </p>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-sm text-muted-foreground">Comprehensive analytics and reporting</p>
            <Badge variant="secondary" className="mt-2">Active</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">ESG Platform</h3>
            <p className="text-sm text-muted-foreground">Environmental & sustainability analysis</p>
            <Badge variant="secondary" className="mt-2">Active</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">SAM Platform</h3>
            <p className="text-sm text-muted-foreground">Strategic Asset Management</p>
            <Badge variant="secondary" className="mt-2">Active</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Blockchain Hub</h3>
            <p className="text-sm text-muted-foreground">Cryptocurrency & blockchain tools</p>
            <Badge variant="secondary" className="mt-2">Active</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Platform Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {platformMetrics.map((platform, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{platform.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={platform.status === 'featured' ? 'default' : 'secondary'}>
                      {platform.completion}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">{platform.users} users</span>
                  </div>
                </div>
                <Progress value={platform.completion} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Valuations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentValuations.map((valuation, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{valuation.property}</p>
                  <p className="text-xs text-muted-foreground">{valuation.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(valuation.value / 1000000).toFixed(1)}M</p>
                  <Badge variant="outline" className="text-xs">
                    {valuation.confidence}% confidence
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Featured Platform - Sustaino Sphere */}
      <Card className="border-primary shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Sustaino Sphere™</h2>
          <p className="text-muted-foreground mb-6">
            Revolutionary platform ecosystem - Now operating as standalone platform
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-2xl font-bold text-primary">2,100+</div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">98%</div>
              <p className="text-sm text-muted-foreground">Platform Completion</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">$100M+</div>
              <p className="text-sm text-muted-foreground">Assets Valued</p>
            </div>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-600">
            <Globe className="h-4 w-4 mr-2" />
            Launch Sustaino Sphere™
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ICVDashboard;