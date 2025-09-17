/**
 * ============================================================================
 * Reality Market Analysis Component
 * Comprehensive market analysis for real estate professionals
 * ============================================================================
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, MapPin, Calendar, DollarSign, Home, Building2, Users, Activity } from 'lucide-react';

const RealityMarketAnalysis = () => {
  const [selectedSuburb, setSelectedSuburb] = useState('sydney-cbd');
  const [selectedPeriod, setSelectedPeriod] = useState('12months');

  // Mock data for charts
  const priceData = [
    { month: 'Jan', median: 850000, volume: 45 },
    { month: 'Feb', median: 865000, volume: 38 },
    { month: 'Mar', median: 880000, volume: 52 },
    { month: 'Apr', median: 875000, volume: 41 },
    { month: 'May', median: 890000, volume: 47 },
    { month: 'Jun', median: 905000, volume: 55 },
  ];

  const propertyTypeData = [
    { name: 'Houses', value: 45, color: '#3b82f6' },
    { name: 'Units', value: 30, color: '#10b981' },
    { name: 'Townhouses', value: 15, color: '#f59e0b' },
    { name: 'Commercial', value: 10, color: '#ef4444' },
  ];

  const suburbComparison = [
    { suburb: 'Sydney CBD', median: 1250000, growth: 8.5, volume: 156, yield: 3.2 },
    { suburb: 'Manly', median: 2100000, growth: 12.3, volume: 89, yield: 2.8 },
    { suburb: 'Parramatta', median: 980000, growth: 15.2, volume: 234, yield: 4.1 },
    { suburb: 'Bondi', median: 1850000, growth: 6.8, volume: 67, yield: 2.9 },
    { suburb: 'Chatswood', median: 1450000, growth: 9.7, volume: 145, yield: 3.5 },
  ];

  const marketIndicators = [
    { label: 'Median Price', value: '$905,000', change: '+5.2%', trend: 'up', icon: DollarSign },
    { label: 'Days on Market', value: '32 days', change: '-8%', trend: 'down', icon: Calendar },
    { label: 'Auction Clearance', value: '78%', change: '+3%', trend: 'up', icon: Activity },
    { label: 'Sales Volume', value: '278 sales', change: '+12%', trend: 'up', icon: Home },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <MapPin className="h-8 w-8 text-primary" />
            Market Analysis Dashboard
          </h2>
          <p className="text-muted-foreground">Comprehensive real estate market insights</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={selectedSuburb} onValueChange={setSelectedSuburb}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sydney-cbd">Sydney CBD</SelectItem>
              <SelectItem value="manly">Manly</SelectItem>
              <SelectItem value="parramatta">Parramatta</SelectItem>
              <SelectItem value="bondi">Bondi</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3M</SelectItem>
              <SelectItem value="6months">6M</SelectItem>
              <SelectItem value="12months">12M</SelectItem>
              <SelectItem value="24months">24M</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Market Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketIndicators.map((indicator, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{indicator.label}</p>
                  <p className="text-2xl font-bold">{indicator.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {indicator.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      indicator.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {indicator.change}
                    </span>
                  </div>
                </div>
                <indicator.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="trends">Price Trends</TabsTrigger>
          <TabsTrigger value="comparison">Suburb Comparison</TabsTrigger>
          <TabsTrigger value="forecast">Market Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Price Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Median Price Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Median Price']} />
                    <Line type="monotone" dataKey="median" stroke="hsl(var(--primary))" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Property Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Property Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={propertyTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {propertyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sales Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Volume Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="volume" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical Price Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 bg-green-50 dark:bg-green-950/30">
                    <h4 className="font-semibold text-green-800 dark:text-green-200">12 Month Growth</h4>
                    <p className="text-2xl font-bold text-green-600">+8.5%</p>
                  </Card>
                  <Card className="p-4 bg-blue-50 dark:bg-blue-950/30">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">5 Year Growth</h4>
                    <p className="text-2xl font-bold text-blue-600">+42.3%</p>
                  </Card>
                  <Card className="p-4 bg-purple-50 dark:bg-purple-950/30">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">10 Year Growth</h4>
                    <p className="text-2xl font-bold text-purple-600">+87.1%</p>
                  </Card>
                </div>
                
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Median Price']} />
                    <Line type="monotone" dataKey="median" stroke="hsl(var(--primary))" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Suburb Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suburbComparison.map((suburb, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <h4 className="font-semibold">{suburb.suburb}</h4>
                          <p className="text-2xl font-bold text-primary">{formatCurrency(suburb.median)}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Growth</p>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="font-bold text-green-600">+{suburb.growth}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Volume</p>
                          <p className="font-bold">{suburb.volume} sales</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Rental Yield</p>
                          <p className="font-bold">{suburb.yield}%</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">6 Month Outlook</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Price Movement:</span>
                      <span className="font-bold text-green-600">+3-5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Activity:</span>
                      <span className="font-bold">Moderate</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Best Sectors:</span>
                      <span className="font-bold">Units, Townhouses</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20">
                  <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">12 Month Outlook</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Price Movement:</span>
                      <span className="font-bold text-green-600">+6-10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Activity:</span>
                      <span className="font-bold">Strong</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Investment Grade:</span>
                      <span className="font-bold text-green-600">A-</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Key Market Drivers</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h5 className="font-medium text-green-600 mb-2">Positive Factors</h5>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Low interest rate environment</li>
                      <li>• Population growth</li>
                      <li>• Infrastructure development</li>
                      <li>• Housing supply constraints</li>
                    </ul>
                  </Card>
                  <Card className="p-4">
                    <h5 className="font-medium text-orange-600 mb-2">Risk Factors</h5>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Interest rate sensitivity</li>
                      <li>• Affordability concerns</li>
                      <li>• Regulatory changes</li>
                      <li>• Economic uncertainty</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealityMarketAnalysis;