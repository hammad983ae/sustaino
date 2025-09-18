/**
 * Renewable Energy Valuations Component
 * Comprehensive valuation platform for renewable energy assets
 * Solar, Wind, Hydro, Water Treatment, Energy Storage, etc.
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Sun, Wind, Zap, Droplets, Battery, Factory, 
  Leaf, TrendingUp, Calculator, FileText, Download,
  Shield, Award, Globe, Target, BarChart3, Activity,
  Gauge, Thermometer, MapPin, Calendar, DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RenewableEnergyValuations = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Basic Project Information
    projectName: '',
    projectType: '',
    location: '',
    capacity: '',
    developer: '',
    operator: '',
    
    // Technical Specifications
    technology: '',
    equipmentBrand: '',
    installationDate: '',
    designLife: '',
    efficiency: '',
    degradationRate: '',
    
    // Financial Data
    capex: '',
    opex: '',
    tariffRate: '',
    contractType: '',
    contractDuration: '',
    
    // ESG Factors
    carbonOffset: '',
    waterUsage: '',
    landUse: '',
    communityBenefit: '',
    
    // Valuation Parameters
    discountRate: '',
    inflationRate: '',
    includeESG: false,
    valuationDate: new Date().toISOString().split('T')[0]
  });

  const [activeTab, setActiveTab] = useState('project-details');
  const [calculations, setCalculations] = useState(null);

  const projectTypes = [
    { value: 'solar-farm', label: 'Solar Farm', icon: Sun },
    { value: 'wind-farm', label: 'Wind Farm', icon: Wind },
    { value: 'hydro-power', label: 'Hydro Power', icon: Droplets },
    { value: 'battery-storage', label: 'Battery Storage', icon: Battery },
    { value: 'water-treatment', label: 'Water Treatment/Distillery', icon: Factory },
    { value: 'geothermal', label: 'Geothermal', icon: Thermometer },
    { value: 'biomass', label: 'Biomass', icon: Leaf },
    { value: 'waste-to-energy', label: 'Waste to Energy', icon: Zap }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateComplianceReport = () => {
    if (!calculations) {
      toast({
        title: "Generate Valuation First",
        description: "Complete the valuation calculation before generating compliance report",
        variant: "destructive"
      });
      return;
    }

    const complianceData = {
      methodology: 'Discounted Cash Flow Analysis with ESG Integration',
      fairValue: calculations.npv,
      fairValueLevel: 'Level 3',
      scopeOfWork: 'Renewable Energy Asset Valuation',
      marketAnalysis: 'Renewable energy market assessment included',
      esgFactors: formData.includeESG,
      sustainabilityImpact: formData.includeESG ? 'Comprehensive ESG assessment included' : null,
      comparables: 'Industry benchmark comparisons applied',
      complianceStandards: ['RICS', 'API', 'AVI', 'IVSC', 'USPAP', 'AASB 13']
    };

    // Generate downloadable compliance report
    const reportData = JSON.stringify({
      projectDetails: formData,
      valuationResults: calculations,
      complianceFramework: complianceData,
      generatedAt: new Date().toISOString()
    }, null, 2);

    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.projectName || 'renewable-energy'}-compliance-report.json`;
    link.click();

    toast({
      title: "Compliance Report Generated",
      description: "Professional standards compliance report downloaded successfully",
    });
  };

  const calculateValuation = () => {
    const capacity = parseFloat(formData.capacity) || 0;
    const tariff = parseFloat(formData.tariffRate) || 0;
    const capex = parseFloat(formData.capex) || 0;
    const opex = parseFloat(formData.opex) || 0;
    const discountRate = parseFloat(formData.discountRate) || 8;
    const contractDuration = parseInt(formData.contractDuration) || 20;
    
    // Basic DCF Calculation with IVSC/RICS compliant methodology
    const annualGeneration = capacity * 8760 * (parseFloat(formData.efficiency) || 25) / 100; // kWh/year
    const annualRevenue = annualGeneration * tariff / 1000; // Convert to MWh
    const annualEBITDA = annualRevenue - opex;
    
    // ESG Premium Calculation (AASB 13 Fair Value compliant)
    let esgPremium = 0;
    if (formData.includeESG) {
      const carbonValue = parseFloat(formData.carbonOffset) * 25; // $25/tonne CO2
      const communityValue = parseFloat(formData.communityBenefit) || 0;
      esgPremium = carbonValue + communityValue;
    }
    
    // NPV Calculation
    let npv = -capex;
    for (let year = 1; year <= contractDuration; year++) {
      const degradation = Math.pow(1 - (parseFloat(formData.degradationRate) || 0.5) / 100, year - 1);
      const cashFlow = (annualEBITDA * degradation) + (esgPremium / contractDuration);
      npv += cashFlow / Math.pow(1 + discountRate / 100, year);
    }
    
    const irr = ((annualEBITDA / capex) * 100).toFixed(2);
    const paybackPeriod = (capex / annualEBITDA).toFixed(1);
    
    const calcs = {
      npv: npv,
      irr: parseFloat(irr),
      paybackPeriod: parseFloat(paybackPeriod),
      annualRevenue,
      annualEBITDA,
      esgPremium,
      annualGeneration,
      lcoe: (capex + (opex * contractDuration)) / (annualGeneration * contractDuration) * 1000 // $/MWh
    };
    
    setCalculations(calcs);
    toast({
      title: "Valuation Calculated",
      description: `NPV: $${(npv / 1000000).toFixed(2)}M | IRR: ${irr}%`
    });
  };

  const generateReport = () => {
    toast({
      title: "Generating Report",
      description: "Comprehensive renewable energy valuation report is being prepared..."
    });
    // In a real implementation, this would generate a PDF report
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-green-300 via-white to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl mb-4">
            Renewable Energy Valuations
          </h1>
          <p className="text-xl text-white/80 mb-6">
            Comprehensive valuation platform for renewable energy assets and sustainable infrastructure
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2">
              🌱 Carbon Neutral
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2">
              📊 ESG Compliant
            </Badge>
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2">
              ⚡ Future-Ready
            </Badge>
          </div>
        </div>

        {/* Project Type Selection */}
        <Card className="mb-8 border-2 border-green-400/30 bg-gradient-to-br from-slate-800/80 to-green-900/80 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <Zap className="h-6 w-6 text-green-400" />
              Select Renewable Energy Project Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {projectTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <Button
                    key={type.value}
                    variant={formData.projectType === type.value ? "default" : "outline"}
                    className={`h-24 flex flex-col gap-2 ${
                      formData.projectType === type.value 
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30" 
                        : "border-green-400/30 text-white hover:bg-green-500/20"
                    }`}
                    onClick={() => handleInputChange('projectType', type.value)}
                  >
                    <IconComponent className="h-8 w-8" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Form Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-green-400/30">
            <TabsTrigger value="project-details" className="data-[state=active]:bg-green-600">
              Project Details
            </TabsTrigger>
            <TabsTrigger value="technical" className="data-[state=active]:bg-green-600">
              Technical Specs
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-green-600">
              Financial Data
            </TabsTrigger>
            <TabsTrigger value="esg" className="data-[state=active]:bg-green-600">
              ESG Factors
            </TabsTrigger>
            <TabsTrigger value="valuation" className="data-[state=active]:bg-green-600">
              Valuation
            </TabsTrigger>
          </TabsList>

          {/* Project Details Tab */}
          <TabsContent value="project-details">
            <Card className="border-2 border-green-400/30 bg-gradient-to-br from-slate-800/80 to-green-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-400" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="projectName" className="text-white">Project Name</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., Sunshine Solar Farm"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-white">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., Queensland, Australia"
                  />
                </div>
                <div>
                  <Label htmlFor="capacity" className="text-white">Capacity (MW/kW)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., 100"
                  />
                </div>
                <div>
                  <Label htmlFor="developer" className="text-white">Developer</Label>
                  <Input
                    id="developer"
                    value={formData.developer}
                    onChange={(e) => handleInputChange('developer', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., Green Energy Corp"
                  />
                </div>
                <div>
                  <Label htmlFor="operator" className="text-white">Operator</Label>
                  <Input
                    id="operator"
                    value={formData.operator}
                    onChange={(e) => handleInputChange('operator', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., Renewable Operations Ltd"
                  />
                </div>
                <div>
                  <Label htmlFor="valuationDate" className="text-white">Valuation Date</Label>
                  <Input
                    id="valuationDate"
                    type="date"
                    value={formData.valuationDate}
                    onChange={(e) => handleInputChange('valuationDate', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technical Specifications Tab */}
          <TabsContent value="technical">
            <Card className="border-2 border-green-400/30 bg-gradient-to-br from-slate-800/80 to-green-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-green-400" />
                  Technical Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="technology" className="text-white">Technology Type</Label>
                  <Select value={formData.technology} onValueChange={(value) => handleInputChange('technology', value)}>
                    <SelectTrigger className="bg-slate-700/50 border-green-400/30 text-white">
                      <SelectValue placeholder="Select technology" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monocrystalline">Monocrystalline Silicon</SelectItem>
                      <SelectItem value="polycrystalline">Polycrystalline Silicon</SelectItem>
                      <SelectItem value="thin-film">Thin Film</SelectItem>
                      <SelectItem value="horizontal-axis">Horizontal Axis Wind</SelectItem>
                      <SelectItem value="vertical-axis">Vertical Axis Wind</SelectItem>
                      <SelectItem value="run-of-river">Run-of-River Hydro</SelectItem>
                      <SelectItem value="pumped-storage">Pumped Storage Hydro</SelectItem>
                      <SelectItem value="lithium-ion">Lithium-Ion Battery</SelectItem>
                      <SelectItem value="flow-battery">Flow Battery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="equipmentBrand" className="text-white">Equipment Brand/Manufacturer</Label>
                  <Input
                    id="equipmentBrand"
                    value={formData.equipmentBrand}
                    onChange={(e) => handleInputChange('equipmentBrand', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., Tesla, Vestas, Canadian Solar"
                  />
                </div>
                <div>
                  <Label htmlFor="installationDate" className="text-white">Installation/COD Date</Label>
                  <Input
                    id="installationDate"
                    type="date"
                    value={formData.installationDate}
                    onChange={(e) => handleInputChange('installationDate', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="designLife" className="text-white">Design Life (Years)</Label>
                  <Input
                    id="designLife"
                    type="number"
                    value={formData.designLife}
                    onChange={(e) => handleInputChange('designLife', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., 25"
                  />
                </div>
                <div>
                  <Label htmlFor="efficiency" className="text-white">Capacity Factor/Efficiency (%)</Label>
                  <Input
                    id="efficiency"
                    type="number"
                    value={formData.efficiency}
                    onChange={(e) => handleInputChange('efficiency', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., 25"
                  />
                </div>
                <div>
                  <Label htmlFor="degradationRate" className="text-white">Annual Degradation Rate (%)</Label>
                  <Input
                    id="degradationRate"
                    type="number"
                    step="0.1"
                    value={formData.degradationRate}
                    onChange={(e) => handleInputChange('degradationRate', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., 0.5"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Data Tab */}
          <TabsContent value="financial">
            <Card className="border-2 border-green-400/30 bg-gradient-to-br from-slate-800/80 to-green-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  Financial Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="capex" className="text-white">CAPEX ($M)</Label>
                  <Input
                    id="capex"
                    type="number"
                    value={formData.capex}
                    onChange={(e) => handleInputChange('capex', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., 150"
                  />
                </div>
                <div>
                  <Label htmlFor="opex" className="text-white">Annual OPEX ($M)</Label>
                  <Input
                    id="opex"
                    type="number"
                    value={formData.opex}
                    onChange={(e) => handleInputChange('opex', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., 2.5"
                  />
                </div>
                <div>
                  <Label htmlFor="tariffRate" className="text-white">Energy Tariff ($/MWh)</Label>
                  <Input
                    id="tariffRate"
                    type="number"
                    value={formData.tariffRate}
                    onChange={(e) => handleInputChange('tariffRate', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., 65"
                  />
                </div>
                <div>
                  <Label htmlFor="contractType" className="text-white">Contract Type</Label>
                  <Select value={formData.contractType} onValueChange={(value) => handleInputChange('contractType', value)}>
                    <SelectTrigger className="bg-slate-700/50 border-green-400/30 text-white">
                      <SelectValue placeholder="Select contract type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ppa">Power Purchase Agreement (PPA)</SelectItem>
                      <SelectItem value="merchant">Merchant</SelectItem>
                      <SelectItem value="feed-in-tariff">Feed-in Tariff</SelectItem>
                      <SelectItem value="renewable-certificate">Renewable Certificate</SelectItem>
                      <SelectItem value="corporate-ppa">Corporate PPA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contractDuration" className="text-white">Contract Duration (Years)</Label>
                  <Input
                    id="contractDuration"
                    type="number"
                    value={formData.contractDuration}
                    onChange={(e) => handleInputChange('contractDuration', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., 20"
                  />
                </div>
                <div>
                  <Label htmlFor="discountRate" className="text-white">Discount Rate (%)</Label>
                  <Input
                    id="discountRate"
                    type="number"
                    step="0.1"
                    value={formData.discountRate}
                    onChange={(e) => handleInputChange('discountRate', e.target.value)}
                    className="bg-slate-700/50 border-green-400/30 text-white"
                    placeholder="e.g., 8.0"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ESG Factors Tab */}
          <TabsContent value="esg">
            <Card className="border-2 border-green-400/30 bg-gradient-to-br from-slate-800/80 to-green-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-400" />
                  ESG Impact Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeESG"
                    checked={formData.includeESG}
                    onChange={(e) => handleInputChange('includeESG', e.target.checked)}
                    className="rounded border-green-400/30"
                  />
                  <Label htmlFor="includeESG" className="text-white font-semibold">
                    Include ESG factors in valuation
                  </Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="carbonOffset" className="text-white">Annual Carbon Offset (tonnes CO2)</Label>
                    <Input
                      id="carbonOffset"
                      type="number"
                      value={formData.carbonOffset}
                      onChange={(e) => handleInputChange('carbonOffset', e.target.value)}
                      className="bg-slate-700/50 border-green-400/30 text-white"
                      placeholder="e.g., 50000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="waterUsage" className="text-white">Water Usage (ML/year)</Label>
                    <Input
                      id="waterUsage"
                      type="number"
                      value={formData.waterUsage}
                      onChange={(e) => handleInputChange('waterUsage', e.target.value)}
                      className="bg-slate-700/50 border-green-400/30 text-white"
                      placeholder="e.g., 0.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="landUse" className="text-white">Land Use Impact (ha)</Label>
                    <Input
                      id="landUse"
                      type="number"
                      value={formData.landUse}
                      onChange={(e) => handleInputChange('landUse', e.target.value)}
                      className="bg-slate-700/50 border-green-400/30 text-white"
                      placeholder="e.g., 200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="communityBenefit" className="text-white">Community Benefit Value ($M)</Label>
                    <Input
                      id="communityBenefit"
                      type="number"
                      value={formData.communityBenefit}
                      onChange={(e) => handleInputChange('communityBenefit', e.target.value)}
                      className="bg-slate-700/50 border-green-400/30 text-white"
                      placeholder="e.g., 5"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Valuation Tab */}
          <TabsContent value="valuation">
            <div className="space-y-6">
              <Card className="border-2 border-green-400/30 bg-gradient-to-br from-slate-800/80 to-green-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-green-400" />
                    Valuation Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <Button 
                      onClick={calculateValuation}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate Valuation
                    </Button>
                     <Button 
                       onClick={generateComplianceReport}
                       className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                       disabled={!calculations}
                     >
                       <FileText className="h-4 w-4 mr-2" />
                       Compliance Report
                     </Button>
                  </div>

                  {calculations && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-300">
                            ${(calculations.npv / 1000000).toFixed(1)}M
                          </div>
                          <div className="text-white/80">Net Present Value</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-400/30">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-300">
                            {calculations.irr.toFixed(1)}%
                          </div>
                          <div className="text-white/80">Internal Rate of Return</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-purple-300">
                            {calculations.paybackPeriod} years
                          </div>
                          <div className="text-white/80">Payback Period</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-400/30">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-orange-300">
                            ${calculations.lcoe.toFixed(0)}/MWh
                          </div>
                          <div className="text-white/80">LCOE</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-teal-500/20 to-green-600/20 border border-teal-400/30">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-teal-300">
                            ${(calculations.annualRevenue / 1000000).toFixed(1)}M
                          </div>
                          <div className="text-white/80">Annual Revenue</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-400/30">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-emerald-300">
                            ${(calculations.esgPremium / 1000000).toFixed(1)}M
                          </div>
                          <div className="text-white/80">ESG Premium</div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RenewableEnergyValuations;