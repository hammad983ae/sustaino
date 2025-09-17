/**
 * ============================================================================
 * Reality Valuation Platform Component
 * AI-powered property valuation with professional insights
 * ============================================================================
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Building2, Calculator, TrendingUp, MapPin, Calendar, Star, Download, Share, Eye } from 'lucide-react';

const RealityValuationPlatform = () => {
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [landSize, setLandSize] = useState('');
  const [selectedValuation, setSelectedValuation] = useState(0);

  // Mock valuation results
  const valuationResults = [
    {
      id: 1,
      address: '123 Harbour View Drive, Sydney NSW',
      estimatedValue: 2450000,
      confidenceRange: { min: 2320000, max: 2580000 },
      confidence: 95,
      methodology: 'AI Enhanced Comparison',
      lastUpdated: '2024-01-15',
      propertyType: 'House',
      bedrooms: 4,
      bathrooms: 3,
      landSize: 650,
      comparables: 12,
      marketTrend: 'up',
      features: ['Ocean Views', 'Swimming Pool', 'Double Garage', 'Modern Kitchen'],
      yield: 3.2
    },
    {
      id: 2,
      address: '456 Collins Street, Melbourne VIC',
      estimatedValue: 1850000,
      confidenceRange: { min: 1750000, max: 1950000 },
      confidence: 88,
      methodology: 'Commercial Comparison',
      lastUpdated: '2024-01-14',
      propertyType: 'Commercial',
      comparables: 8,
      marketTrend: 'stable',
      features: ['Prime Location', 'Lift Access', 'Air Conditioning', 'Parking'],
      yield: 5.8
    }
  ];

  const currentValuation = valuationResults[selectedValuation];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const runValuation = () => {
    if (address && propertyType) {
      // Simulate valuation process
      console.log('Running valuation for:', { address, propertyType, bedrooms, bathrooms, landSize });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
          <Calculator className="h-10 w-10 text-primary" />
          Reality Valuation Platform
        </h1>
        <p className="text-xl text-muted-foreground">AI-powered property valuations with professional insights</p>
      </div>

      <Tabs defaultValue="new-valuation" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="new-valuation">New Valuation</TabsTrigger>
          <TabsTrigger value="results">Valuation Results</TabsTrigger>
          <TabsTrigger value="market-insights">Market Insights</TabsTrigger>
        </TabsList>

        {/* New Valuation Tab */}
        <TabsContent value="new-valuation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Valuation Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter property address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Property Type</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="unit">Unit/Apartment</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="land">Vacant Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Bedrooms</Label>
                    <Select value={bedrooms} onValueChange={setBedrooms}>
                      <SelectTrigger>
                        <SelectValue placeholder="Beds" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Bathrooms</Label>
                    <Select value={bathrooms} onValueChange={setBathrooms}>
                      <SelectTrigger>
                        <SelectValue placeholder="Baths" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="landSize">Land Size (sqm)</Label>
                    <Input
                      id="landSize"
                      placeholder="e.g. 650"
                      value={landSize}
                      onChange={(e) => setLandSize(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={runValuation} className="w-full" size="lg">
                  <Calculator className="h-5 w-5 mr-2" />
                  Get AI Valuation
                </Button>
              </CardContent>
            </Card>

            {/* Valuation Options */}
            <Card>
              <CardHeader>
                <CardTitle>Valuation Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200">AI Instant Valuation</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-300">Get immediate estimate</p>
                        <p className="text-lg font-bold text-blue-800 dark:text-blue-200 mt-1">FREE</p>
                      </div>
                      <div className="text-blue-600 dark:text-blue-300">
                        <Calculator className="h-8 w-8" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">Professional Report</h4>
                        <p className="text-sm text-emerald-600 dark:text-emerald-300">Certified valuation report</p>
                        <p className="text-lg font-bold text-emerald-800 dark:text-emerald-200 mt-1">$495</p>
                      </div>
                      <div className="text-emerald-600 dark:text-emerald-300">
                        <Star className="h-8 w-8" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-purple-800 dark:text-purple-200">Market Analysis</h4>
                        <p className="text-sm text-purple-600 dark:text-purple-300">Comprehensive market report</p>
                        <p className="text-lg font-bold text-purple-800 dark:text-purple-200 mt-1">$195</p>
                      </div>
                      <div className="text-purple-600 dark:text-purple-300">
                        <TrendingUp className="h-8 w-8" />
                      </div>
                    </div>
                  </Card>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold">What's Included:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI-powered property analysis</li>
                    <li>• Comparable sales evidence</li>
                    <li>• Market trend analysis</li>
                    <li>• Confidence rating & range</li>
                    <li>• PDF report generation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Valuation Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Results List */}
            <div className="space-y-4">
              <h3 className="font-semibold">Recent Valuations</h3>
              {valuationResults.map((valuation, idx) => (
                <Card 
                  key={valuation.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedValuation === idx ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedValuation(idx)}
                >
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">{valuation.address}</h4>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(valuation.estimatedValue)}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{valuation.confidence}% confidence</span>
                      <span>{valuation.lastUpdated}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Detailed Results */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{currentValuation.address}</CardTitle>
                    <Badge variant="outline">{currentValuation.propertyType}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Primary Valuation */}
                  <div className="text-center space-y-2 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
                    <h3 className="text-lg font-semibold text-muted-foreground">Estimated Market Value</h3>
                    <p className="text-5xl font-bold text-primary">
                      {formatCurrency(currentValuation.estimatedValue)}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {currentValuation.confidence}% Confidence
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className={`h-4 w-4 ${
                          currentValuation.marketTrend === 'up' ? 'text-green-500' : 'text-gray-500'
                        }`} />
                        Market Trend
                      </span>
                    </div>
                  </div>

                  {/* Confidence Range */}
                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">Valuation Range</h4>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-center">
                        <p className="text-muted-foreground">Lower Estimate</p>
                        <p className="text-lg font-bold">{formatCurrency(currentValuation.confidenceRange.min)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Upper Estimate</p>
                        <p className="text-lg font-bold">{formatCurrency(currentValuation.confidenceRange.max)}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Property Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {currentValuation.bedrooms && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{currentValuation.bedrooms}</p>
                        <p className="text-sm text-muted-foreground">Bedrooms</p>
                      </div>
                    )}
                    {currentValuation.bathrooms && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{currentValuation.bathrooms}</p>
                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                      </div>
                    )}
                    {currentValuation.landSize && (
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{currentValuation.landSize}</p>
                        <p className="text-sm text-muted-foreground">Land Size (sqm)</p>
                      </div>
                    )}
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{currentValuation.comparables}</p>
                      <p className="text-sm text-muted-foreground">Comparables</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentValuation.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>

                  {/* Methodology */}
                  <Card className="p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2">Valuation Methodology</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      This valuation was generated using our {currentValuation.methodology} approach, 
                      analyzing {currentValuation.comparables} comparable properties in the local area.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last updated: {currentValuation.lastUpdated} | Valid for 30 days
                    </p>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Market Insights Tab */}
        <TabsContent value="market-insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-sm text-muted-foreground">Local Median</h4>
              <p className="text-xl font-bold">$875,000</p>
              <p className="text-xs text-green-600">+5.2% this year</p>
            </Card>
            <Card className="p-4 text-center">
              <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-sm text-muted-foreground">Days on Market</h4>
              <p className="text-xl font-bold">32 days</p>
              <p className="text-xs text-green-600">-8% from last year</p>
            </Card>
            <Card className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-sm text-muted-foreground">Price Growth</h4>
              <p className="text-xl font-bold">+8.5%</p>
              <p className="text-xs text-green-600">12 month period</p>
            </Card>
            <Card className="p-4 text-center">
              <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-semibold text-sm text-muted-foreground">Market Score</h4>
              <p className="text-xl font-bold">A-</p>
              <p className="text-xs text-muted-foreground">Investment grade</p>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Market Commentary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The local market continues to show strong performance with steady price growth 
                and reduced time on market. Current conditions favor both buyers and sellers, 
                with good liquidity and stable transaction volumes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Market Strengths</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Strong population growth</li>
                    <li>• Infrastructure investment</li>
                    <li>• Low interest rates</li>
                    <li>• Supply constraints</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-600 mb-2">Considerations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Affordability pressures</li>
                    <li>• Interest rate sensitivity</li>
                    <li>• Economic uncertainty</li>
                    <li>• Regulatory changes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealityValuationPlatform;