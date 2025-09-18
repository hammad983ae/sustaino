import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Cpu, Database, Brain, Code, Shield, TrendingUp, 
  DollarSign, Users, Zap, Globe, Star, Award,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SustanoSphereLogo from './SustanoSphereLogo';

interface DigitalAssetData {
  // Algorithm Assets
  algorithmType: string;
  algorithmComplexity: number;
  performanceMetrics: number;
  accuracyRate: number;
  processingSpeed: number;
  
  // Data Assets
  dataVolume: number;
  dataQuality: number;
  dataUniqueness: number;
  updateFrequency: string;
  
  // Platform/Software Assets
  platformUsers: number;
  monthlyActiveUsers: number;
  apiCalls: number;
  systemUptime: number;
  
  // Intellectual Property
  patentStatus: string;
  trademarkValue: number;
  copyrightAssets: number;
  tradesecrets: number;
  
  // Financial Metrics
  developmentCost: number;
  maintenanceCost: number;
  licensingRevenue: number;
  subscriptionRevenue: number;
  
  // Market Position
  marketShare: number;
  competitorAdvantage: number;
  networkEffects: number;
  switchingCosts: number;
}

const SustanoSphereDigitalAssetValuation: React.FC = () => {
  const navigate = useNavigate();
  const [assetData, setAssetData] = useState<DigitalAssetData>({
    algorithmType: '',
    algorithmComplexity: 0,
    performanceMetrics: 0,
    accuracyRate: 0,
    processingSpeed: 0,
    dataVolume: 0,
    dataQuality: 0,
    dataUniqueness: 0,
    updateFrequency: '',
    platformUsers: 0,
    monthlyActiveUsers: 0,
    apiCalls: 0,
    systemUptime: 99.9,
    patentStatus: '',
    trademarkValue: 0,
    copyrightAssets: 0,
    tradesecrets: 0,
    developmentCost: 0,
    maintenanceCost: 0,
    licensingRevenue: 0,
    subscriptionRevenue: 0,
    marketShare: 0,
    competitorAdvantage: 0,
    networkEffects: 0,
    switchingCosts: 0
  });

  const [valuation, setValuation] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('algorithms');

  const handleInputChange = (field: keyof DigitalAssetData, value: any) => {
    setAssetData(prev => ({ ...prev, [field]: value }));
  };

  const calculateDigitalAssetValue = () => {
    // Advanced valuation algorithm for digital assets
    const algorithmValue = (assetData.algorithmComplexity * assetData.performanceMetrics * assetData.accuracyRate) / 100;
    const dataValue = (assetData.dataVolume * assetData.dataQuality * assetData.dataUniqueness) / 1000;
    const platformValue = (assetData.platformUsers * assetData.monthlyActiveUsers * assetData.systemUptime) / 10000;
    const ipValue = assetData.trademarkValue + (assetData.copyrightAssets * 50000) + (assetData.tradesecrets * 100000);
    
    const totalRevenue = assetData.licensingRevenue + assetData.subscriptionRevenue;
    const revenueMultiple = totalRevenue * (3 + (assetData.marketShare / 10));
    
    const networkMultiplier = 1 + (assetData.networkEffects / 100);
    const competitiveMultiplier = 1 + (assetData.competitorAdvantage / 100);
    
    const baseValue = algorithmValue + dataValue + platformValue + ipValue + revenueMultiple;
    const adjustedValue = baseValue * networkMultiplier * competitiveMultiplier;
    
    return {
      algorithmValue,
      dataValue,
      platformValue,
      ipValue,
      revenueMultiple,
      totalValue: adjustedValue,
      riskAdjustedValue: adjustedValue * 0.85, // 15% risk discount
      confidenceScore: Math.min(95, (assetData.performanceMetrics + assetData.dataQuality + assetData.systemUptime) / 3)
    };
  };

  useEffect(() => {
    const result = calculateDigitalAssetValue();
    setValuation(result);
  }, [assetData]);

  const assetCategories = [
    {
      id: 'algorithms',
      title: 'AI/ML Algorithms',
      icon: Brain,
      description: 'Machine learning models, AI algorithms, and automation systems',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'data',
      title: 'Data Assets',
      icon: Database,
      description: 'Proprietary datasets, user behavior data, and analytics insights',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'platform',
      title: 'Platform Technology',
      icon: Code,
      description: 'Software platforms, APIs, and technical infrastructure',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ip',
      title: 'Intellectual Property',
      icon: Shield,
      description: 'Patents, trademarks, copyrights, and trade secrets',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const revenueStreams = [
    { name: 'Algorithm Licensing', value: assetData.licensingRevenue * 0.4, color: 'bg-blue-500' },
    { name: 'Platform Subscriptions', value: assetData.subscriptionRevenue, color: 'bg-green-500' },
    { name: 'Data Monetization', value: assetData.licensingRevenue * 0.3, color: 'bg-purple-500' },
    { name: 'API Services', value: assetData.licensingRevenue * 0.3, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <SustanoSphereLogo size="lg" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Digital Asset Valuation Engine
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced valuation for algorithms, data assets, platforms, and digital intellectual property
          </p>
        </div>

        {/* Asset Categories Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {assetCategories.map((category) => (
            <Card 
              key={category.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => setActiveTab(category.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Valuation Results Summary */}
        {valuation && (
          <Card className="mb-8 border-primary shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Digital Asset Valuation Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    ${valuation.totalValue?.toLocaleString() || '0'}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Asset Value</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ${valuation.riskAdjustedValue?.toLocaleString() || '0'}
                  </div>
                  <p className="text-sm text-muted-foreground">Risk-Adjusted Value</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {valuation.confidenceScore?.toFixed(1) || '0'}%
                  </div>
                  <p className="text-sm text-muted-foreground">Confidence Score</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {assetData.marketShare}%
                  </div>
                  <p className="text-sm text-muted-foreground">Market Share</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Asset Value Breakdown</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>Algorithm Assets:</span>
                    <span className="font-semibold">${valuation.algorithmValue?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Assets:</span>
                    <span className="font-semibold">${valuation.dataValue?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Technology:</span>
                    <span className="font-semibold">${valuation.platformValue?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IP Portfolio:</span>
                    <span className="font-semibold">${valuation.ipValue?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detailed Input Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
            <TabsTrigger value="data">Data Assets</TabsTrigger>
            <TabsTrigger value="platform">Platform</TabsTrigger>
            <TabsTrigger value="ip">IP Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="algorithms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Algorithm & AI Assets
                </CardTitle>
                <CardDescription>
                  Valuation of machine learning models, AI algorithms, and automation systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Algorithm Type</Label>
                    <Select value={assetData.algorithmType} onValueChange={(value) => handleInputChange('algorithmType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select algorithm type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ml-prediction">ML Prediction Model</SelectItem>
                        <SelectItem value="nlp-processing">NLP Processing</SelectItem>
                        <SelectItem value="computer-vision">Computer Vision</SelectItem>
                        <SelectItem value="recommendation">Recommendation Engine</SelectItem>
                        <SelectItem value="optimization">Optimization Algorithm</SelectItem>
                        <SelectItem value="fraud-detection">Fraud Detection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Complexity Score (1-100)</Label>
                    <Input
                      type="number"
                      value={assetData.algorithmComplexity}
                      onChange={(e) => handleInputChange('algorithmComplexity', parseInt(e.target.value) || 0)}
                      placeholder="85"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Performance Score (1-100)</Label>
                    <Input
                      type="number"
                      value={assetData.performanceMetrics}
                      onChange={(e) => handleInputChange('performanceMetrics', parseInt(e.target.value) || 0)}
                      placeholder="92"
                    />
                  </div>
                  <div>
                    <Label>Accuracy Rate (%)</Label>
                    <Input
                      type="number"
                      value={assetData.accuracyRate}
                      onChange={(e) => handleInputChange('accuracyRate', parseFloat(e.target.value) || 0)}
                      placeholder="97.5"
                    />
                  </div>
                  <div>
                    <Label>Processing Speed Score</Label>
                    <Input
                      type="number"
                      value={assetData.processingSpeed}
                      onChange={(e) => handleInputChange('processingSpeed', parseInt(e.target.value) || 0)}
                      placeholder="88"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Assets & Analytics
                </CardTitle>
                <CardDescription>
                  Valuation of proprietary datasets and data monetization potential
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Data Volume (TB)</Label>
                    <Input
                      type="number"
                      value={assetData.dataVolume}
                      onChange={(e) => handleInputChange('dataVolume', parseInt(e.target.value) || 0)}
                      placeholder="150"
                    />
                  </div>
                  <div>
                    <Label>Data Quality Score (1-100)</Label>
                    <Input
                      type="number"
                      value={assetData.dataQuality}
                      onChange={(e) => handleInputChange('dataQuality', parseInt(e.target.value) || 0)}
                      placeholder="94"
                    />
                  </div>
                  <div>
                    <Label>Uniqueness Score (1-100)</Label>
                    <Input
                      type="number"
                      value={assetData.dataUniqueness}
                      onChange={(e) => handleInputChange('dataUniqueness', parseInt(e.target.value) || 0)}
                      placeholder="87"
                    />
                  </div>
                </div>

                <div>
                  <Label>Update Frequency</Label>
                  <Select value={assetData.updateFrequency} onValueChange={(value) => handleInputChange('updateFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select update frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-time">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platform" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Platform & Technology Assets
                </CardTitle>
                <CardDescription>
                  Software platforms, APIs, and technical infrastructure valuation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Total Users</Label>
                    <Input
                      type="number"
                      value={assetData.platformUsers}
                      onChange={(e) => handleInputChange('platformUsers', parseInt(e.target.value) || 0)}
                      placeholder="250000"
                    />
                  </div>
                  <div>
                    <Label>Monthly Active Users</Label>
                    <Input
                      type="number"
                      value={assetData.monthlyActiveUsers}
                      onChange={(e) => handleInputChange('monthlyActiveUsers', parseInt(e.target.value) || 0)}
                      placeholder="180000"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Monthly API Calls</Label>
                    <Input
                      type="number"
                      value={assetData.apiCalls}
                      onChange={(e) => handleInputChange('apiCalls', parseInt(e.target.value) || 0)}
                      placeholder="5000000"
                    />
                  </div>
                  <div>
                    <Label>System Uptime (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={assetData.systemUptime}
                      onChange={(e) => handleInputChange('systemUptime', parseFloat(e.target.value) || 0)}
                      placeholder="99.9"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Development Cost ($)</Label>
                    <Input
                      type="number"
                      value={assetData.developmentCost}
                      onChange={(e) => handleInputChange('developmentCost', parseInt(e.target.value) || 0)}
                      placeholder="2500000"
                    />
                  </div>
                  <div>
                    <Label>Annual Maintenance ($)</Label>
                    <Input
                      type="number"
                      value={assetData.maintenanceCost}
                      onChange={(e) => handleInputChange('maintenanceCost', parseInt(e.target.value) || 0)}
                      placeholder="500000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ip" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Intellectual Property Portfolio
                </CardTitle>
                <CardDescription>
                  Patents, trademarks, copyrights, and trade secrets valuation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Patent Status</Label>
                  <Select value={assetData.patentStatus} onValueChange={(value) => handleInputChange('patentStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patent status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="granted">Patents Granted</SelectItem>
                      <SelectItem value="pending">Patents Pending</SelectItem>
                      <SelectItem value="provisional">Provisional Patents</SelectItem>
                      <SelectItem value="none">No Patents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Trademark Value ($)</Label>
                    <Input
                      type="number"
                      value={assetData.trademarkValue}
                      onChange={(e) => handleInputChange('trademarkValue', parseInt(e.target.value) || 0)}
                      placeholder="500000"
                    />
                  </div>
                  <div>
                    <Label>Copyright Assets Count</Label>
                    <Input
                      type="number"
                      value={assetData.copyrightAssets}
                      onChange={(e) => handleInputChange('copyrightAssets', parseInt(e.target.value) || 0)}
                      placeholder="25"
                    />
                  </div>
                </div>

                <div>
                  <Label>Trade Secrets Count</Label>
                  <Input
                    type="number"
                    value={assetData.tradesecrets}
                    onChange={(e) => handleInputChange('tradesecrets', parseInt(e.target.value) || 0)}
                    placeholder="8"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Annual Licensing Revenue ($)</Label>
                    <Input
                      type="number"
                      value={assetData.licensingRevenue}
                      onChange={(e) => handleInputChange('licensingRevenue', parseInt(e.target.value) || 0)}
                      placeholder="1200000"
                    />
                  </div>
                  <div>
                    <Label>Subscription Revenue ($)</Label>
                    <Input
                      type="number"
                      value={assetData.subscriptionRevenue}
                      onChange={(e) => handleInputChange('subscriptionRevenue', parseInt(e.target.value) || 0)}
                      placeholder="3500000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Revenue Streams Visualization */}
        {valuation && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Digital Asset Revenue Streams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueStreams.map((stream, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{stream.name}</span>
                      <span className="text-sm font-bold">${stream.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${stream.color}`}
                        style={{ 
                          width: `${Math.min(100, (stream.value / Math.max(...revenueStreams.map(s => s.value))) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SustanoSphereDigitalAssetValuation;