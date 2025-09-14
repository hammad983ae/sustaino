import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Building, Home, Factory, Sprout, Leaf, DollarSign, TrendingUp } from 'lucide-react';

interface CalculationResult {
  traditionalCost: number;
  esgCost: number;
  esgPremium: number;
  totalArea: number;
  costPerSqm: number;
  developmentType: string;
}

const DevelopmentCalculator: React.FC = () => {
  const [developmentType, setDevelopmentType] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [regionType, setRegionType] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const baseCosts = {
    residential: { metro: 3200, regional: 2700 },
    commercial: { metro: 4000, regional: 3300 },
    specialized: { metro: 4500, regional: 3800 },
    agricultural: { metro: 0, regional: 2000 }
  };

  const statePremiums = {
    NSW: 1.05,
    VIC: 1.02,
    QLD: 0.95,
    WA: 0.92,
    SA: 0.90,
    TAS: 0.88,
    ACT: 1.08,
    NT: 0.95
  };

  const esgPremiumRates = {
    residential: 0.20,
    commercial: 0.25,
    specialized: 0.30,
    agricultural: 0.20
  };

  const calculateCosts = () => {
    if (!developmentType || !area || !state || !regionType) return;

    const totalArea = parseFloat(area);
    const baseCost = baseCosts[developmentType as keyof typeof baseCosts][regionType as keyof typeof baseCosts.residential];
    const statePremium = statePremiums[state as keyof typeof statePremiums] || 1;
    const esgPremiumRate = esgPremiumRates[developmentType as keyof typeof esgPremiumRates];

    const traditionalCostPerSqm = baseCost * statePremium;
    const esgCostPerSqm = traditionalCostPerSqm * (1 + esgPremiumRate);
    
    const traditionalTotal = traditionalCostPerSqm * totalArea;
    const esgTotal = esgCostPerSqm * totalArea;
    const premiumAmount = esgTotal - traditionalTotal;

    setResult({
      traditionalCost: traditionalTotal,
      esgCost: esgTotal,
      esgPremium: premiumAmount,
      totalArea,
      costPerSqm: traditionalCostPerSqm,
      developmentType
    });
  };

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value);

  const getDevelopmentIcon = (type: string) => {
    switch (type) {
      case 'residential': return <Home className="h-5 w-5" />;
      case 'commercial': return <Building className="h-5 w-5" />;
      case 'specialized': return <Factory className="h-5 w-5" />;
      case 'agricultural': return <Sprout className="h-5 w-5" />;
      default: return <Calculator className="h-5 w-5" />;
    }
  };

  const getEsgFeatures = (type: string) => {
    const features = {
      residential: ['7-star energy rating', 'Solar panels', 'Smart home technology', 'Rainwater harvesting'],
      commercial: ['Green Star rating', 'LED lighting systems', 'Advanced HVAC', 'Green roof systems'],
      specialized: ['Industrial solar systems', 'Energy-efficient processes', 'Waste reduction systems', 'Sustainable materials'],
      agricultural: ['Renewable energy systems', 'Water conservation', 'Sustainable building materials', 'Climate-responsive design']
    };
    return features[type as keyof typeof features] || [];
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-blue-200/50">
      <CardHeader className="border-b border-blue-100 bg-gradient-to-r from-blue-50/50 to-green-50/30">
        <CardTitle className="text-2xl flex items-center gap-3 text-blue-800">
          <Calculator className="h-6 w-6 text-blue-700" />
          Quick Development Calculator
        </CardTitle>
        <p className="text-blue-700">
          Compare traditional vs ESD/ESG construction costs for your development project
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Cost Calculator</TabsTrigger>
            <TabsTrigger value="comparison">Traditional vs ESD/ESG</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="development-type">Development Type</Label>
                <Select value={developmentType} onValueChange={setDevelopmentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Residential
                      </div>
                    </SelectItem>
                    <SelectItem value="commercial">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Commercial
                      </div>
                    </SelectItem>
                    <SelectItem value="specialized">
                      <div className="flex items-center gap-2">
                        <Factory className="h-4 w-4" />
                        Specialized
                      </div>
                    </SelectItem>
                    <SelectItem value="agricultural">
                      <div className="flex items-center gap-2">
                        <Sprout className="h-4 w-4" />
                        Agricultural
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Total Area (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="e.g., 150"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NSW">NSW</SelectItem>
                    <SelectItem value="VIC">VIC</SelectItem>
                    <SelectItem value="QLD">QLD</SelectItem>
                    <SelectItem value="WA">WA</SelectItem>
                    <SelectItem value="SA">SA</SelectItem>
                    <SelectItem value="TAS">TAS</SelectItem>
                    <SelectItem value="ACT">ACT</SelectItem>
                    <SelectItem value="NT">NT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region-type">Region Type</Label>
                <Select value={regionType} onValueChange={setRegionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metro">Metropolitan</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={calculateCosts} 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!developmentType || !area || !state || !regionType}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Development Costs
            </Button>

            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="h-5 w-5 text-blue-600" />
                        Traditional Construction
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-blue-700">
                          {formatCurrency(result.traditionalCost)}
                        </p>
                        <p className="text-sm text-blue-600">
                          {formatCurrency(result.costPerSqm)}/m²
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-green-600" />
                        ESD/ESG Construction
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-green-700">
                          {formatCurrency(result.esgCost)}
                        </p>
                        <p className="text-sm text-green-600">
                          {formatCurrency(result.esgCost / result.totalArea)}/m²
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-amber-50 border-amber-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-amber-600" />
                        ESG Premium
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-amber-700">
                          {formatCurrency(result.esgPremium)}
                        </p>
                        <p className="text-sm text-amber-600">
                          +{((result.esgCost / result.traditionalCost - 1) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-600" />
                      ESD/ESG Features Included
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {getEsgFeatures(result.developmentType).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Traditional Construction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Typical Features:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Standard building materials</li>
                        <li>• Basic energy efficiency</li>
                        <li>• Standard HVAC systems</li>
                        <li>• Minimal sustainability features</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Cost Range:</h4>
                      <p className="text-sm text-muted-foreground">
                        $2,000 - $4,500/m² depending on type and location
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    ESD/ESG Construction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Enhanced Features:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• High-performance building materials</li>
                        <li>• Advanced energy efficiency systems</li>
                        <li>• Smart building technologies</li>
                        <li>• Comprehensive sustainability features</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Cost Range:</h4>
                      <p className="text-sm text-muted-foreground">
                        20-30% premium over traditional construction
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Investment Benefits of ESD/ESG Construction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Operational Savings</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• 30-50% energy cost reduction</li>
                      <li>• Lower maintenance costs</li>
                      <li>• Reduced water consumption</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Market Advantages</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Higher rental yields</li>
                      <li>• Improved tenant retention</li>
                      <li>• Premium sale values</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Risk Mitigation</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Future-proofed compliance</li>
                      <li>• Climate resilience</li>
                      <li>• ESG investment alignment</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DevelopmentCalculator;