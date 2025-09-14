import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Building, Home, Factory, Sprout, Leaf, DollarSign, TrendingUp, Droplets, TreePine } from 'lucide-react';

interface CalculationResult {
  traditionalCost: number;
  esgCost: number;
  esgPremium: number;
  residualLandValue: number;
  totalArea: number;
  costPerUnit: number;
  developmentType: string;
  grossDevelopmentValue: number;
  profitMargin: number;
}

interface AgriculturalInputs {
  waterInfrastructure: string;
  numberOfTrees: string;
  soilQuality: string;
  irrigationType: string;
  posts: string;
  wires: string;
  strainers: string;
  trellis: string;
  hailNetting: string;
  fencing: string;
  roadsDriveways: string;
  drainage: string;
  storage: string;
  powerInfrastructure: string;
}

const DevelopmentCalculator: React.FC = () => {
  const [developmentType, setDevelopmentType] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [areaUnit, setAreaUnit] = useState<string>('sqm');
  const [state, setState] = useState<string>('');
  const [regionType, setRegionType] = useState<string>('');
  const [expectedSaleValue, setExpectedSaleValue] = useState<string>('');
  const [profitMargin, setProfitMargin] = useState<string>('20');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [agriculturalInputs, setAgriculturalInputs] = useState<AgriculturalInputs>({
    waterInfrastructure: '',
    numberOfTrees: '',
    soilQuality: '',
    irrigationType: '',
    posts: '',
    wires: '',
    strainers: '',
    trellis: '',
    hailNetting: '',
    fencing: '',
    roadsDriveways: '',
    drainage: '',
    storage: '',
    powerInfrastructure: ''
  });

  const baseCosts = {
    residential: { metro: 3200, regional: 2700 },
    commercial: { metro: 4000, regional: 3300 },
    specialized: { metro: 4500, regional: 3800 },
    agricultural: { metro: 85000, regional: 65000 } // Per hectare base cost
  };

  const agriculturalComponentCosts = {
    waterInfrastructure: {
      basic: 15000, // per hectare
      advanced: 35000,
      premium: 55000
    },
    irrigationType: {
      drip: 12000, // per hectare
      sprinkler: 8000,
      flood: 3000,
      smart: 18000
    },
    soilPreparation: {
      poor: 8000, // per hectare
      average: 5000,
      good: 2000,
      excellent: 1000
    },
    treesAndVines: {
      perTree: 45, // per tree/vine
      perHectare: 2200 // average density cost
    },
    posts: {
      standard: 2800, // per hectare
      heavyDuty: 4200,
      premium: 6500
    },
    wires: {
      basic: 1800, // per hectare
      galvanized: 2600,
      stainlessSteel: 4200
    },
    strainers: {
      standard: 850, // per hectare
      heavyDuty: 1200,
      adjustable: 1650
    },
    trellis: {
      basic: 3200, // per hectare
      vshaped: 4800,
      pergola: 7200,
      smartWire: 9500
    },
    hailNetting: {
      standard: 8500, // per hectare
      premium: 12000,
      retractable: 18500
    },
    fencing: {
      basic: 1200, // per hectare perimeter
      agricultural: 2100,
      security: 3800
    },
    roadsDriveways: {
      gravel: 2200, // per hectare
      sealed: 4500,
      premium: 7200
    },
    drainage: {
      basic: 1800, // per hectare
      advanced: 3500,
      comprehensive: 5800
    },
    storage: {
      basic: 2800, // per hectare
      climate: 5500,
      premium: 8200
    },
    powerInfrastructure: {
      basic: 3200, // per hectare
      threephase: 5800,
      solar: 8500
    }
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
    agricultural: 0.15
  };

  const calculateAgriculturalCosts = (baseArea: number) => {
    let additionalCosts = 0;
    
    // Water infrastructure costs
    if (agriculturalInputs.waterInfrastructure) {
      additionalCosts += agriculturalComponentCosts.waterInfrastructure[
        agriculturalInputs.waterInfrastructure as keyof typeof agriculturalComponentCosts.waterInfrastructure
      ] * baseArea;
    }
    
    // Irrigation system costs
    if (agriculturalInputs.irrigationType) {
      additionalCosts += agriculturalComponentCosts.irrigationType[
        agriculturalInputs.irrigationType as keyof typeof agriculturalComponentCosts.irrigationType
      ] * baseArea;
    }
    
    // Soil preparation costs
    if (agriculturalInputs.soilQuality) {
      additionalCosts += agriculturalComponentCosts.soilPreparation[
        agriculturalInputs.soilQuality as keyof typeof agriculturalComponentCosts.soilPreparation
      ] * baseArea;
    }
    
    // Tree/vine costs
    if (agriculturalInputs.numberOfTrees) {
      const treeCount = parseInt(agriculturalInputs.numberOfTrees);
      additionalCosts += treeCount * agriculturalComponentCosts.treesAndVines.perTree;
    }
    
    // Posts costs
    if (agriculturalInputs.posts) {
      additionalCosts += agriculturalComponentCosts.posts[
        agriculturalInputs.posts as keyof typeof agriculturalComponentCosts.posts
      ] * baseArea;
    }
    
    // Wires costs
    if (agriculturalInputs.wires) {
      additionalCosts += agriculturalComponentCosts.wires[
        agriculturalInputs.wires as keyof typeof agriculturalComponentCosts.wires
      ] * baseArea;
    }
    
    // Strainers costs
    if (agriculturalInputs.strainers) {
      additionalCosts += agriculturalComponentCosts.strainers[
        agriculturalInputs.strainers as keyof typeof agriculturalComponentCosts.strainers
      ] * baseArea;
    }
    
    // Trellis costs
    if (agriculturalInputs.trellis) {
      additionalCosts += agriculturalComponentCosts.trellis[
        agriculturalInputs.trellis as keyof typeof agriculturalComponentCosts.trellis
      ] * baseArea;
    }
    
    // Hail netting costs
    if (agriculturalInputs.hailNetting) {
      additionalCosts += agriculturalComponentCosts.hailNetting[
        agriculturalInputs.hailNetting as keyof typeof agriculturalComponentCosts.hailNetting
      ] * baseArea;
    }
    
    // Fencing costs
    if (agriculturalInputs.fencing) {
      additionalCosts += agriculturalComponentCosts.fencing[
        agriculturalInputs.fencing as keyof typeof agriculturalComponentCosts.fencing
      ] * baseArea;
    }
    
    // Roads and driveways costs
    if (agriculturalInputs.roadsDriveways) {
      additionalCosts += agriculturalComponentCosts.roadsDriveways[
        agriculturalInputs.roadsDriveways as keyof typeof agriculturalComponentCosts.roadsDriveways
      ] * baseArea;
    }
    
    // Drainage costs
    if (agriculturalInputs.drainage) {
      additionalCosts += agriculturalComponentCosts.drainage[
        agriculturalInputs.drainage as keyof typeof agriculturalComponentCosts.drainage
      ] * baseArea;
    }
    
    // Storage costs
    if (agriculturalInputs.storage) {
      additionalCosts += agriculturalComponentCosts.storage[
        agriculturalInputs.storage as keyof typeof agriculturalComponentCosts.storage
      ] * baseArea;
    }
    
    // Power infrastructure costs
    if (agriculturalInputs.powerInfrastructure) {
      additionalCosts += agriculturalComponentCosts.powerInfrastructure[
        agriculturalInputs.powerInfrastructure as keyof typeof agriculturalComponentCosts.powerInfrastructure
      ] * baseArea;
    }
    
    return additionalCosts;
  };

  const calculateCosts = () => {
    if (!developmentType || !area || !state || !regionType || !expectedSaleValue) return;

    const totalArea = parseFloat(area);
    const saleValue = parseFloat(expectedSaleValue);
    const targetProfit = parseFloat(profitMargin) / 100;
    
    // Convert area to appropriate units for agricultural
    const effectiveArea = developmentType === 'agricultural' && areaUnit === 'hectares' 
      ? totalArea 
      : developmentType === 'agricultural' && areaUnit === 'acres'
        ? totalArea * 0.4047 // Convert acres to hectares
        : totalArea;

    let baseCost = baseCosts[developmentType as keyof typeof baseCosts][regionType as keyof typeof baseCosts.residential];
    const statePremium = statePremiums[state as keyof typeof statePremiums] || 1;
    const esgPremiumRate = esgPremiumRates[developmentType as keyof typeof esgPremiumRates];

    // Calculate agricultural component costs if applicable
    let additionalCosts = 0;
    if (developmentType === 'agricultural') {
      additionalCosts = calculateAgriculturalCosts(effectiveArea);
    }

    const traditionalCostPerUnit = baseCost * statePremium;
    const esgCostPerUnit = traditionalCostPerUnit * (1 + esgPremiumRate);
    
    const traditionalTotal = (traditionalCostPerUnit * effectiveArea) + additionalCosts;
    const esgTotal = (esgCostPerUnit * effectiveArea) + additionalCosts;
    const premiumAmount = esgTotal - traditionalTotal;

    // Calculate Gross Development Value and Residual Land Value
    const grossDevelopmentValue = saleValue;
    const developmentCosts = esgTotal; // Using ESG costs for calculation
    const profitAmount = grossDevelopmentValue * targetProfit;
    const residualLandValue = grossDevelopmentValue - developmentCosts - profitAmount;

    setResult({
      traditionalCost: traditionalTotal,
      esgCost: esgTotal,
      esgPremium: premiumAmount,
      residualLandValue,
      totalArea: effectiveArea,
      costPerUnit: developmentType === 'agricultural' ? traditionalCostPerUnit : traditionalCostPerUnit,
      developmentType,
      grossDevelopmentValue,
      profitMargin: targetProfit
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
          Hypothetical Development Calculator
        </CardTitle>
        <p className="text-blue-700">
          Calculate residual land value and compare traditional vs ESD/ESG development costs
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Cost Calculator</TabsTrigger>
            <TabsTrigger value="comparison">Traditional vs ESD/ESG</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="space-y-2">
                <Label htmlFor="development-type">Development Type</Label>
                <Select value={developmentType} onValueChange={setDevelopmentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
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
                <Label htmlFor="area">
                  Total Area 
                  {developmentType === 'agricultural' ? (areaUnit === 'hectares' ? ' (ha)' : ' (ac)') : ' (m²)'}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="area"
                    type="number"
                    placeholder={developmentType === 'agricultural' ? "e.g., 50" : "e.g., 150"}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="flex-1"
                  />
                  {developmentType === 'agricultural' && (
                    <Select value={areaUnit} onValueChange={setAreaUnit}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="hectares">ha</SelectItem>
                        <SelectItem value="acres">ac</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expected-sale-value">Expected Sale Value</Label>
                <Input
                  id="expected-sale-value"
                  type="number"
                  placeholder="e.g., 2500000"
                  value={expectedSaleValue}
                  onChange={(e) => setExpectedSaleValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profit-margin">Profit Margin (%)</Label>
                <Input
                  id="profit-margin"
                  type="number"
                  placeholder="e.g., 20"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
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
                  <SelectContent className="bg-white z-50">
                    <SelectItem value="metro">Metropolitan</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {developmentType === 'agricultural' && (
              <Card className="bg-green-50/50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-green-600" />
                    Comprehensive Agricultural Development Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Core Infrastructure */}
                    <div className="space-y-2">
                      <Label>Water Infrastructure</Label>
                      <Select 
                        value={agriculturalInputs.waterInfrastructure} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, waterInfrastructure: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="basic">Basic ($15k/ha)</SelectItem>
                          <SelectItem value="advanced">Advanced ($35k/ha)</SelectItem>
                          <SelectItem value="premium">Premium ($55k/ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Irrigation System</Label>
                      <Select 
                        value={agriculturalInputs.irrigationType} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, irrigationType: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="flood">Flood ($3k/ha)</SelectItem>
                          <SelectItem value="sprinkler">Sprinkler ($8k/ha)</SelectItem>
                          <SelectItem value="drip">Drip ($12k/ha)</SelectItem>
                          <SelectItem value="smart">Smart ($18k/ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Soil Quality</Label>
                      <Select 
                        value={agriculturalInputs.soilQuality} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, soilQuality: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="poor">Poor ($8k/ha prep)</SelectItem>
                          <SelectItem value="average">Average ($5k/ha prep)</SelectItem>
                          <SelectItem value="good">Good ($2k/ha prep)</SelectItem>
                          <SelectItem value="excellent">Excellent ($1k/ha prep)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Support Infrastructure */}
                    <div className="space-y-2">
                      <Label>Posts</Label>
                      <Select 
                        value={agriculturalInputs.posts} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, posts: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="standard">Standard ($2.8k/ha)</SelectItem>
                          <SelectItem value="heavyDuty">Heavy Duty ($4.2k/ha)</SelectItem>
                          <SelectItem value="premium">Premium ($6.5k/ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Wires</Label>
                      <Select 
                        value={agriculturalInputs.wires} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, wires: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="basic">Basic ($1.8k/ha)</SelectItem>
                          <SelectItem value="galvanized">Galvanized ($2.6k/ha)</SelectItem>
                          <SelectItem value="stainlessSteel">Stainless Steel ($4.2k/ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Strainers</Label>
                      <Select 
                        value={agriculturalInputs.strainers} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, strainers: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="standard">Standard ($850/ha)</SelectItem>
                          <SelectItem value="heavyDuty">Heavy Duty ($1.2k/ha)</SelectItem>
                          <SelectItem value="adjustable">Adjustable ($1.65k/ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Trellis System</Label>
                      <Select 
                        value={agriculturalInputs.trellis} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, trellis: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="basic">Basic ($3.2k/ha)</SelectItem>
                          <SelectItem value="vshaped">V-Shaped ($4.8k/ha)</SelectItem>
                          <SelectItem value="pergola">Pergola ($7.2k/ha)</SelectItem>
                          <SelectItem value="smartWire">Smart Wire ($9.5k/ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Hail Netting</Label>
                      <Select 
                        value={agriculturalInputs.hailNetting} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, hailNetting: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="standard">Standard ($8.5k/ha)</SelectItem>
                          <SelectItem value="premium">Premium ($12k/ha)</SelectItem>
                          <SelectItem value="retractable">Retractable ($18.5k/ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Fencing</Label>
                      <Select 
                        value={agriculturalInputs.fencing} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, fencing: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="basic">Basic ($1.2k/ha)</SelectItem>
                          <SelectItem value="agricultural">Agricultural ($2.1k/ha)</SelectItem>
                          <SelectItem value="security">Security ($3.8k/ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Roads & Driveways</Label>
                      <Select 
                        value={agriculturalInputs.roadsDriveways} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, roadsDriveways: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="gravel">Gravel ($2.2k/ha)</SelectItem>
                          <SelectItem value="sealed">Sealed ($4.5k/ha)</SelectItem>
                          <SelectItem value="premium">Premium ($7.2k/ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Drainage System</Label>
                      <Select 
                        value={agriculturalInputs.drainage} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, drainage: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="basic">Basic ($1.8k/ha)</SelectItem>
                          <SelectItem value="advanced">Advanced ($3.5k/ha)</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive ($5.8k/ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Storage Facilities</Label>
                      <Select 
                        value={agriculturalInputs.storage} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, storage: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="basic">Basic ($2.8k/ha)</SelectItem>
                          <SelectItem value="climate">Climate Controlled ($5.5k/ha)</SelectItem>
                          <SelectItem value="premium">Premium ($8.2k/ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Power Infrastructure</Label>
                      <Select 
                        value={agriculturalInputs.powerInfrastructure} 
                        onValueChange={(value) => setAgriculturalInputs(prev => ({...prev, powerInfrastructure: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="basic">Basic ($3.2k/ha)</SelectItem>
                          <SelectItem value="threephase">Three Phase ($5.8k/ha)</SelectItem>
                          <SelectItem value="solar">Solar System ($8.5k/ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Trees/Vines Count</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 2000"
                        value={agriculturalInputs.numberOfTrees}
                        onChange={(e) => setAgriculturalInputs(prev => ({...prev, numberOfTrees: e.target.value}))}
                      />
                      <p className="text-xs text-muted-foreground">Cost: $45 per tree/vine</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              onClick={calculateCosts} 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!developmentType || !area || !state || !regionType || !expectedSaleValue}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Residual Land Value
            </Button>

            {result && (
              <div className="space-y-4">
                {/* Residual Land Value - Primary Result */}
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                      Residual Land Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-3xl font-bold text-purple-700">
                        {formatCurrency(result.residualLandValue)}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Gross Development Value</p>
                          <p className="font-semibold">{formatCurrency(result.grossDevelopmentValue)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Development Costs</p>
                          <p className="font-semibold">{formatCurrency(result.esgCost)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="h-5 w-5 text-blue-600" />
                        Traditional Development
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-blue-700">
                          {formatCurrency(result.traditionalCost)}
                        </p>
                        <p className="text-sm text-blue-600">
                          {formatCurrency(result.costPerUnit)}/{result.developmentType === 'agricultural' ? (areaUnit === 'hectares' ? 'ha' : 'ac') : 'm²'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-green-600" />
                        ESD/ESG Development
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-green-700">
                          {formatCurrency(result.esgCost)}
                        </p>
                        <p className="text-sm text-green-600">
                          {formatCurrency(result.esgCost / result.totalArea)}/{result.developmentType === 'agricultural' ? (areaUnit === 'hectares' ? 'ha' : 'ac') : 'm²'}
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

                {/* Agricultural Component Breakdown */}
                {result.developmentType === 'agricultural' && (
                  <Card className="bg-green-50/50 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TreePine className="h-5 w-5 text-green-600" />
                        Agricultural Development Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            Infrastructure Components
                          </h4>
                          <ul className="space-y-1 text-muted-foreground">
                            {agriculturalInputs.waterInfrastructure && <li>• Water Infrastructure: {agriculturalInputs.waterInfrastructure}</li>}
                            {agriculturalInputs.irrigationType && <li>• Irrigation: {agriculturalInputs.irrigationType}</li>}
                            {agriculturalInputs.soilQuality && <li>• Soil Preparation: {agriculturalInputs.soilQuality}</li>}
                            {agriculturalInputs.numberOfTrees && <li>• Trees/Vines: {agriculturalInputs.numberOfTrees} units</li>}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Cost Efficiency per {areaUnit === 'hectares' ? 'Hectare' : 'Acre'}</h4>
                          <ul className="space-y-1 text-muted-foreground">
                            <li>• Base Development: {formatCurrency(result.costPerUnit)}</li>
                            <li>• Total Area: {result.totalArea} {areaUnit === 'hectares' ? 'ha' : 'ac'}</li>
                            <li>• Profit Margin: {(result.profitMargin * 100).toFixed(1)}%</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

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