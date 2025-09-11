import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, TrendingUp, Leaf, DollarSign, Calculator, BarChart3, Save, FolderOpen, Trash2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AuthStatus from "./AuthStatus";
import BrandedHeader from "./BrandedHeader";
import { useBranding } from "@/contexts/BrandingContext";

interface Location {
  id: string;
  name: string;
  country: string;
  state: string;
  cropTypes: string[];
  hectares: number;
  propertyValue: number;
  equipmentValue: number;
  productionCapacity: number;
  waterUsage: number; // ML
  energyUsage: number; // GJ
  protectedCropping: boolean;
}

interface CropEstimate {
  year: number;
  avocados: number;
  bananas: number;
  berries: number;
  citrus: number;
  mushrooms: number;
  tomatoes: number;
  totalRevenue: number;
}

interface ESGSavings {
  period: string;
  waterEfficiency: number;
  energySavings: number;
  wasteReduction: number;
  carbonCredits: number;
  totalSavings: number;
}

interface WaterAllocation {
  locationId: string;
  permanentWaterRights: number; // ML
  temporaryWaterAllocations: number; // ML
  permanentPrice: number; // AUD per ML
  temporaryPrice: number; // AUD per ML
  waterEfficiency: number; // kg per ML
  totalWaterCost: number; // Annual cost
  waterRiskScore: number; // 0-1 scale
}

interface PricingSummary {
  zone: string;
  landLeaseAnnual: number;
  waterPermanentTotal: number;
  waterTemporaryAnnual: number;
  operationalCostsAnnual: number;
  maintenanceAnnual: number;
  labourAnnual: number;
  totalAnnualCosts: number;
}

export const CostaGroupPortfolio = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [carbonCreditPrice, setCarbonCreditPrice] = useState<number>(35);
  const [carbonReductionTarget, setCarbonReductionTarget] = useState<number>(15);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [analysisTitle, setAnalysisTitle] = useState('');
  const [savedAnalyses, setSavedAnalyses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const { branding } = useBranding();

  const waterAllocations: WaterAllocation[] = [
    { locationId: 'wa-gingin', permanentWaterRights: 85, temporaryWaterAllocations: 95, permanentPrice: 1200, temporaryPrice: 850, waterEfficiency: 13.3, totalWaterCost: 182750, waterRiskScore: 0.35 },
    { locationId: 'wa-casuarina', permanentWaterRights: 25, temporaryWaterAllocations: 20, permanentPrice: 1150, temporaryPrice: 820, waterEfficiency: 188.9, totalWaterCost: 45150, waterRiskScore: 0.32 },
    { locationId: 'sa-renmark', permanentWaterRights: 5200, temporaryWaterAllocations: 3750, permanentPrice: 950, temporaryPrice: 680, waterEfficiency: 3.2, totalWaterCost: 7490000, waterRiskScore: 0.42 },
    { locationId: 'sa-monarto', permanentWaterRights: 35, temporaryWaterAllocations: 30, permanentPrice: 1100, temporaryPrice: 780, waterEfficiency: 172.3, totalWaterCost: 61900, waterRiskScore: 0.38 },
    { locationId: 'vic-mernda', permanentWaterRights: 32, temporaryWaterAllocations: 26, permanentPrice: 1250, temporaryPrice: 890, waterEfficiency: 169.0, totalWaterCost: 63140, waterRiskScore: 0.41 },
    { locationId: 'vic-nangiloc', permanentWaterRights: 2850, temporaryWaterAllocations: 1900, permanentPrice: 980, temporaryPrice: 720, waterEfficiency: 1.7, totalWaterCost: 4161000, waterRiskScore: 0.45 },
    { locationId: 'qld-atherton', permanentWaterRights: 750, temporaryWaterAllocations: 500, permanentPrice: 650, temporaryPrice: 480, waterEfficiency: 5.2, totalWaterCost: 727500, waterRiskScore: 0.55 },
    { locationId: 'qld-walkamin', permanentWaterRights: 220, temporaryWaterAllocations: 160, permanentPrice: 620, temporaryPrice: 450, waterEfficiency: 12.6, totalWaterCost: 208400, waterRiskScore: 0.52 },
    { locationId: 'qld-emerald', permanentWaterRights: 4200, temporaryWaterAllocations: 3000, permanentPrice: 580, temporaryPrice: 420, waterEfficiency: 1.7, totalWaterCost: 3696000, waterRiskScore: 0.58 },
    { locationId: 'nsw-corindi', permanentWaterRights: 1100, temporaryWaterAllocations: 750, permanentPrice: 1350, temporaryPrice: 950, waterEfficiency: 3.9, totalWaterCost: 2197500, waterRiskScore: 0.48 },
    { locationId: 'nsw-guyra', permanentWaterRights: 75, temporaryWaterAllocations: 50, permanentPrice: 1450, temporaryPrice: 1050, waterEfficiency: 54.4, totalWaterCost: 161250, waterRiskScore: 0.35 },
    { locationId: 'tas-devonport', permanentWaterRights: 180, temporaryWaterAllocations: 105, permanentPrice: 750, temporaryPrice: 550, waterEfficiency: 11.2, totalWaterCost: 192750, waterRiskScore: 0.26 },
    { locationId: 'cn-bailang', permanentWaterRights: 250, temporaryWaterAllocations: 200, permanentPrice: 420, temporaryPrice: 320, waterEfficiency: 9.3, totalWaterCost: 169000, waterRiskScore: 0.64 },
    { locationId: 'cn-manhong', permanentWaterRights: 300, temporaryWaterAllocations: 220, permanentPrice: 450, temporaryPrice: 340, waterEfficiency: 9.2, totalWaterCost: 209800, waterRiskScore: 0.66 },
    { locationId: 'cn-xinze', permanentWaterRights: 220, temporaryWaterAllocations: 160, permanentPrice: 480, temporaryPrice: 360, waterEfficiency: 7.6, totalWaterCost: 163200, waterRiskScore: 0.62 },
    { locationId: 'ma-northern', permanentWaterRights: 480, temporaryWaterAllocations: 370, permanentPrice: 320, temporaryPrice: 250, waterEfficiency: 6.8, totalWaterCost: 246000, waterRiskScore: 0.68 },
    { locationId: 'ma-southern', permanentWaterRights: 420, temporaryWaterAllocations: 360, permanentPrice: 340, temporaryPrice: 270, waterEfficiency: 6.7, totalWaterCost: 240000, waterRiskScore: 0.72 }
  ];

  const pricingSummaries: PricingSummary[] = [
    { zone: 'Western Australia', landLeaseAnnual: 3500000, waterPermanentTotal: 96750000, waterTemporaryAnnual: 227900, operationalCostsAnnual: 12500000, maintenanceAnnual: 2800000, labourAnnual: 8900000, totalAnnualCosts: 28127900 },
    { zone: 'South Australia', landLeaseAnnual: 5200000, waterPermanentTotal: 142850000, waterTemporaryAnnual: 7551000, operationalCostsAnnual: 18750000, maintenanceAnnual: 4200000, labourAnnual: 12400000, totalAnnualCosts: 48101000 },
    { zone: 'Victoria', landLeaseAnnual: 4100000, waterPermanentTotal: 78650000, waterTemporaryAnnual: 4224140, operationalCostsAnnual: 15200000, maintenanceAnnual: 3600000, labourAnnual: 10800000, totalAnnualCosts: 37924140 },
    { zone: 'Queensland', landLeaseAnnual: 6800000, waterPermanentTotal: 149400000, waterTemporaryAnnual: 4631900, operationalCostsAnnual: 22500000, maintenanceAnnual: 5100000, labourAnnual: 16200000, totalAnnualCosts: 55231900 },
    { zone: 'New South Wales', landLeaseAnnual: 4500000, waterPermanentTotal: 186750000, waterTemporaryAnnual: 2358750, operationalCostsAnnual: 16800000, maintenanceAnnual: 3900000, labourAnnual: 11700000, totalAnnualCosts: 39258750 },
    { zone: 'Tasmania', landLeaseAnnual: 2100000, waterPermanentTotal: 13500000, waterTemporaryAnnual: 192750, operationalCostsAnnual: 8500000, maintenanceAnnual: 1800000, labourAnnual: 5200000, totalAnnualCosts: 17792750 },
    { zone: 'China (Yunnan)', landLeaseAnnual: 1800000, waterPermanentTotal: 36960000, waterTemporaryAnnual: 542000, operationalCostsAnnual: 12000000, maintenanceAnnual: 2500000, labourAnnual: 6800000, totalAnnualCosts: 23642000 },
    { zone: 'Morocco', landLeaseAnnual: 2200000, waterPermanentTotal: 25840000, waterTemporaryAnnual: 486000, operationalCostsAnnual: 9500000, maintenanceAnnual: 2100000, labourAnnual: 4900000, totalAnnualCosts: 19186000 }
  ];

  const locations: Location[] = [
    // Australia - Western Australia
    { id: 'wa-gingin', name: 'Gingin Berry Farms', country: 'Australia', state: 'WA', cropTypes: ['Berries'], hectares: 120, propertyValue: 18500000, equipmentValue: 8200000, productionCapacity: 2400, waterUsage: 180, energyUsage: 12500, protectedCropping: true },
    { id: 'wa-casuarina', name: 'Casuarina Mushroom Farm', country: 'Australia', state: 'WA', cropTypes: ['Mushrooms'], hectares: 35, propertyValue: 25000000, equipmentValue: 15000000, productionCapacity: 8500, waterUsage: 45, energyUsage: 18500, protectedCropping: true },
    
    // Australia - South Australia
    { id: 'sa-renmark', name: 'Renmark Citrus Operations', country: 'Australia', state: 'SA', cropTypes: ['Citrus'], hectares: 1850, propertyValue: 42000000, equipmentValue: 12800000, productionCapacity: 15600, waterUsage: 8950, energyUsage: 8900, protectedCropping: false },
    { id: 'sa-monarto', name: 'Monarto Mushroom Farm', country: 'Australia', state: 'SA', cropTypes: ['Mushrooms'], hectares: 48, propertyValue: 32000000, equipmentValue: 18500000, productionCapacity: 11200, waterUsage: 65, energyUsage: 22000, protectedCropping: true },
    
    // Australia - Victoria
    { id: 'vic-mernda', name: 'Mernda Mushroom Farms', country: 'Australia', state: 'VIC', cropTypes: ['Mushrooms'], hectares: 42, propertyValue: 28000000, equipmentValue: 16200000, productionCapacity: 9800, waterUsage: 58, energyUsage: 19500, protectedCropping: true },
    { id: 'vic-nangiloc', name: 'Nangiloc Citrus Farm', country: 'Australia', state: 'VIC', cropTypes: ['Citrus'], hectares: 980, propertyValue: 22500000, equipmentValue: 7800000, productionCapacity: 8200, waterUsage: 4750, energyUsage: 5200, protectedCropping: false },
    
    // Australia - Queensland
    { id: 'qld-atherton', name: 'Atherton Berry & Avocado Farms', country: 'Australia', state: 'QLD', cropTypes: ['Berries', 'Avocados'], hectares: 385, propertyValue: 35000000, equipmentValue: 14500000, productionCapacity: 6500, waterUsage: 1250, energyUsage: 8800, protectedCropping: true },
    { id: 'qld-walkamin', name: 'Walkamin Banana Operations', country: 'Australia', state: 'QLD', cropTypes: ['Bananas'], hectares: 265, propertyValue: 28500000, equipmentValue: 9200000, productionCapacity: 4800, waterUsage: 380, energyUsage: 6500, protectedCropping: false },
    { id: 'qld-emerald', name: '2PH Emerald Citrus & Grapes', country: 'Australia', state: 'QLD', cropTypes: ['Citrus', 'Grapes'], hectares: 1250, propertyValue: 38000000, equipmentValue: 11500000, productionCapacity: 12500, waterUsage: 7200, energyUsage: 7800, protectedCropping: false },
    
    // Australia - New South Wales
    { id: 'nsw-corindi', name: 'Corindi Berry & Citrus Farms', country: 'Australia', state: 'NSW', cropTypes: ['Berries', 'Citrus'], hectares: 450, propertyValue: 32000000, equipmentValue: 12800000, productionCapacity: 7200, waterUsage: 1850, energyUsage: 9200, protectedCropping: true },
    { id: 'nsw-guyra', name: 'Guyra Glasshouses', country: 'Australia', state: 'NSW', cropTypes: ['Tomatoes'], hectares: 28, propertyValue: 22000000, equipmentValue: 18000000, productionCapacity: 6800, waterUsage: 125, energyUsage: 15500, protectedCropping: true },
    
    // Australia - Tasmania
    { id: 'tas-devonport', name: 'Devonport Berry Operations', country: 'Australia', state: 'TAS', cropTypes: ['Berries'], hectares: 185, propertyValue: 24000000, equipmentValue: 8500000, productionCapacity: 3200, waterUsage: 285, energyUsage: 5800, protectedCropping: true },
    
    // China - Yunnan Province
    { id: 'cn-bailang', name: 'Bailang Berry Farm', country: 'China', state: 'Yunnan', cropTypes: ['Berries'], hectares: 285, propertyValue: 15000000, equipmentValue: 8500000, productionCapacity: 4200, waterUsage: 450, energyUsage: 6200, protectedCropping: true },
    { id: 'cn-manhong', name: 'Manhong Operations', country: 'China', state: 'Yunnan', cropTypes: ['Berries'], hectares: 320, propertyValue: 18000000, equipmentValue: 9800000, productionCapacity: 4800, waterUsage: 520, energyUsage: 7100, protectedCropping: true },
    { id: 'cn-xinze', name: 'Xinze Agripark', country: 'China', state: 'Yunnan', cropTypes: ['Berries'], hectares: 195, propertyValue: 12500000, equipmentValue: 7200000, productionCapacity: 2900, waterUsage: 380, energyUsage: 4800, protectedCropping: true },
    
    // Morocco
    { id: 'ma-northern', name: 'Northern Morocco Farms', country: 'Morocco', state: 'Northern Region', cropTypes: ['Berries'], hectares: 425, propertyValue: 22000000, equipmentValue: 12000000, productionCapacity: 5800, waterUsage: 850, energyUsage: 8500, protectedCropping: true },
    { id: 'ma-southern', name: 'Southern Morocco Farms', country: 'Morocco', state: 'Southern Region', cropTypes: ['Berries'], hectares: 380, propertyValue: 19500000, equipmentValue: 10500000, productionCapacity: 5200, waterUsage: 780, energyUsage: 7800, protectedCropping: true },
  ];

  const cropEstimates: CropEstimate[] = [
    {
      year: 2023,
      avocados: 8350, // tonnes (based on water usage data showing 4,203 ML)
      bananas: 6890, // tonnes (based on water usage of 1,299 ML)
      berries: 12500, // tonnes (across all berry operations)
      citrus: 125000, // tonnes (major category with 39,696 ML water usage)
      mushrooms: 25600, // tonnes (high value crop with 381 ML usage)
      tomatoes: 4200, // tonnes (621 ML water usage)
      totalRevenue: 1450000000 // $1.45B estimated
    },
    {
      year: 2024,
      avocados: 7850, // tonnes (reduced due to weather - 3,772 ML water)
      bananas: 3200, // tonnes (significant reduction due to farm sale - 269 ML)
      berries: 13200, // tonnes (growth in protected cropping)
      citrus: 138000, // tonnes (increased production - 44,537 ML water)
      mushrooms: 26800, // tonnes (slight increase - 423 ML usage)
      tomatoes: 3900, // tonnes (reduced production - 494 ML)
      totalRevenue: 1520000000 // $1.52B estimated
    },
    {
      year: 2025,
      avocados: 8950, // tonnes (forecast recovery and expansion)
      bananas: 4800, // tonnes (conversion to Cavendish complete)
      berries: 15200, // tonnes (continued protected cropping expansion)
      citrus: 145000, // tonnes (maturing plantings and efficiency gains)
      mushrooms: 28500, // tonnes (new facilities and automation)
      tomatoes: 4500, // tonnes (glasshouse optimization)
      totalRevenue: 1680000000 // $1.68B forecast
    }
  ];

  const esgSavings: ESGSavings[] = [
    {
      period: '12 Months',
      waterEfficiency: 2850000, // Water efficiency projects
      energySavings: 8500000, // Solar installations and efficiency
      wasteReduction: 1200000, // Packaging and waste initiatives
      carbonCredits: 0, // No immediate credits
      totalSavings: 12550000
    },
    {
      period: '5 Years',
      waterEfficiency: 18500000, // Cumulative water projects
      energySavings: 65000000, // Major renewable energy transition
      wasteReduction: 8900000, // Comprehensive waste reduction
      carbonCredits: 12500000, // Carbon credit generation
      totalSavings: 104900000
    },
    {
      period: '10 Years',
      waterEfficiency: 42000000, // Advanced water management
      energySavings: 185000000, // Full renewable energy transition
      wasteReduction: 25000000, // Circular economy implementation
      carbonCredits: 45000000, // Significant carbon credit portfolio
      totalSavings: 297000000
    }
  ];

  // Authentication and data loading
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) {
        loadSavedAnalyses();
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        loadSavedAnalyses();
      } else {
        setSavedAnalyses([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadSavedAnalyses = async () => {
    try {
      if (!user?.id) return; // Guard against null user
      
      const { data, error } = await supabase
        .from('esg_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error loading analyses:', error);
        // If it's a permission error, just show empty state instead of error
        if (error.code === '42501') {
          setSavedAnalyses([]);
          return;
        }
        throw error;
      }
      setSavedAnalyses(data || []);
    } catch (error) {
      console.error('Error loading analyses:', error);
      setSavedAnalyses([]);
    }
  };

  const saveAnalysis = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save analyses",
        variant: "destructive",
      });
      return;
    }

    if (!analysisTitle.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for this analysis",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const analysisData = {
        selectedLocation,
        carbonCreditPrice,
        carbonReductionTarget,
        locationCount: filteredLocations.length,
        totalPropertyValue,
        totalEquipmentValue,
        totalHectares,
        totalWaterUsage,
        carbonCreditValue: carbonSwapBenefits.creditValue,
        timestamp: new Date().toISOString()
      };

      const { error } = await supabase
        .from('esg_assessments')
        .insert({
          user_id: user.id,
          property_id: '', // Will need property selection
          environmental_score: 85,
          social_score: 75,
          governance_score: 80,
          overall_esg_score: 80,
          sustainability_features: analysisData
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Analysis saved successfully",
      });

      setAnalysisTitle('');
      setSaveDialogOpen(false);
      loadSavedAnalyses();
    } catch (error) {
      console.error('Error saving analysis:', error);
      toast({
        title: "Error",
        description: "Failed to save analysis",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadAnalysis = async (analysisId: string) => {
    try {
      const { data, error } = await supabase
        .from('esg_assessments')
        .select('*')
        .eq('id', analysisId)
        .single();

      if (error) throw error;

      const analysisData = data.sustainability_features as any;
      setSelectedLocation(analysisData?.selectedLocation || 'all');
      setCarbonCreditPrice(analysisData?.carbonCreditPrice || 35);
      setCarbonReductionTarget(analysisData?.carbonReductionTarget || 15);

      toast({
        title: "Success",
        description: `Loaded ESG analysis: ${data.property_id}`,
      });

      setLoadDialogOpen(false);
    } catch (error) {
      console.error('Error loading analysis:', error);
      toast({
        title: "Error",
        description: "Failed to load analysis",
        variant: "destructive",
      });
    }
  };

  const deleteAnalysis = async (analysisId: string) => {
    try {
      const { error } = await supabase
        .from('esg_assessments')
        .delete()
        .eq('id', analysisId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Analysis deleted successfully",
      });

      loadSavedAnalyses();
    } catch (error) {
      console.error('Error deleting analysis:', error);
      toast({
        title: "Error",
        description: "Failed to delete analysis",
        variant: "destructive",
      });
    }
  };

  const calculateCarbonCreditSwapBenefits = () => {
    const currentEmissions = 132282; // tonnes CO2-e (2023-24 data)
    const reductionTarget = (carbonReductionTarget / 100) * currentEmissions;
    const creditValue = reductionTarget * carbonCreditPrice;
    
    return {
      reductionTonnes: reductionTarget,
      creditValue: creditValue,
      additionalRevenue: creditValue * 0.75, // 75% of credit value as additional revenue
      costSavings: creditValue * 0.25 // 25% as operational cost savings
    };
  };

  const filteredLocations = selectedLocation === 'all' 
    ? locations 
    : locations.filter(loc => loc.id === selectedLocation);

  const totalPropertyValue = filteredLocations.reduce((sum, loc) => sum + loc.propertyValue, 0);
  const totalEquipmentValue = filteredLocations.reduce((sum, loc) => sum + loc.equipmentValue, 0);
  const totalHectares = filteredLocations.reduce((sum, loc) => sum + loc.hectares, 0);
  const totalWaterUsage = filteredLocations.reduce((sum, loc) => sum + loc.waterUsage, 0);

  const carbonSwapBenefits = calculateCarbonCreditSwapBenefits();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <BrandedHeader 
          title={`${branding?.company_name || 'Portfolio'} Analysis`}
          subtitle="Comprehensive asset valuation and ESG strategy analysis"
        />
        <div className="flex items-center gap-3">
          <AuthStatus />
          {user && (
            <>
              <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save Analysis
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Save Portfolio Analysis</DialogTitle>
                    <DialogDescription>
                      Enter a title for this analysis to save it for later reference.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={analysisTitle}
                        onChange={(e) => setAnalysisTitle(e.target.value)}
                        className="col-span-3"
                        placeholder="e.g., Q4 2024 Analysis"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={saveAnalysis} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Analysis'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Load Analysis
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Load Saved Analysis</DialogTitle>
                    <DialogDescription>
                      Select a previously saved analysis to load.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-96 overflow-y-auto">
                    {savedAnalyses.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No saved analyses found
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {savedAnalyses.map((analysis) => (
                          <Card key={analysis.id} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div onClick={() => loadAnalysis(analysis.id)} className="flex-1">
                                  <h4 className="font-medium">{analysis.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(analysis.updated_at).toLocaleDateString()} at{' '}
                                    {new Date(analysis.updated_at).toLocaleTimeString()}
                                  </p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteAnalysis(analysis.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
          {!user && (
            <Badge variant="outline">Login to save analyses</Badge>
          )}
          <Badge variant="outline" className="text-sm">
            <Leaf className="w-4 h-4 mr-1" />
            Sustainability Report 2024
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="locations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="valuations">P&E Valuations</TabsTrigger>
          <TabsTrigger value="water">Water Analysis</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Summary</TabsTrigger>
          <TabsTrigger value="crops">Crop Estimates</TabsTrigger>
          <TabsTrigger value="esg-savings">ESG Savings</TabsTrigger>
          <TabsTrigger value="carbon-credits">Carbon Credits</TabsTrigger>
        </TabsList>

        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Global Operations Portfolio
              </CardTitle>
              <div className="flex gap-4">
                <Label htmlFor="location-filter">Filter by Location:</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLocations.map(location => (
                  <Card key={location.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{location.name}</h3>
                        <p className="text-sm text-muted-foreground">{location.state}, {location.country}</p>
                        <div className="flex flex-wrap gap-1">
                          {location.cropTypes.map(crop => (
                            <Badge key={crop} variant="secondary" className="text-xs">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                        <Separator />
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Hectares:</span>
                            <span className="font-medium">{location.hectares.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Production:</span>
                            <span className="font-medium">{location.productionCapacity.toLocaleString()}t</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Water Usage:</span>
                            <span className="font-medium">{location.waterUsage.toLocaleString()}ML</span>
                          </div>
                          {location.protectedCropping && (
                            <Badge variant="outline" className="text-xs">
                              <Leaf className="w-3 h-3 mr-1" />
                              Protected Cropping
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="water" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Water Allocation & Management Analysis
              </CardTitle>
              <p className="text-muted-foreground">
                Comprehensive analysis of water rights, usage efficiency, and risk assessment across all operations
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Total Water Usage</p>
                      <p className="text-2xl font-bold text-blue-600">57,278 ML</p>
                      <p className="text-xs text-muted-foreground">2024 actual</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Permanent Rights</p>
                      <p className="text-2xl font-bold text-green-600">
                        {waterAllocations.reduce((sum, w) => sum + w.permanentWaterRights, 0).toLocaleString()} ML
                      </p>
                      <p className="text-xs text-muted-foreground">total allocation</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Annual Water Cost</p>
                      <p className="text-2xl font-bold text-orange-600">
                        ${(waterAllocations.reduce((sum, w) => sum + w.totalWaterCost, 0) / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-muted-foreground">total expenditure</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Avg Water Risk</p>
                      <p className="text-2xl font-bold text-red-600">
                        {((waterAllocations.reduce((sum, w) => sum + w.waterRiskScore, 0) / waterAllocations.length) * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground">risk score</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Water Allocation Details by Location</h3>
                {waterAllocations.map(water => {
                  const location = locations.find(l => l.id === water.locationId);
                  if (!location) return null;
                  
                  return (
                    <Card key={water.locationId} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                          <div>
                            <h4 className="font-medium">{location.name}</h4>
                            <p className="text-sm text-muted-foreground">{location.state}</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Permanent Rights</p>
                            <p className="font-semibold">{water.permanentWaterRights.toLocaleString()} ML</p>
                            <p className="text-xs text-blue-600">${water.permanentPrice}/ML</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Temporary Alloc.</p>
                            <p className="font-semibold">{water.temporaryWaterAllocations.toLocaleString()} ML</p>
                            <p className="text-xs text-green-600">${water.temporaryPrice}/ML</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Efficiency</p>
                            <p className="font-semibold">{water.waterEfficiency} kg/ML</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Annual Cost</p>
                            <p className="font-semibold">${(water.totalWaterCost / 1000).toFixed(0)}K</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Risk Score</p>
                            <Badge variant={water.waterRiskScore > 0.6 ? "destructive" : water.waterRiskScore > 0.4 ? "secondary" : "default"}>
                              {(water.waterRiskScore * 100).toFixed(0)}%
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Water Usage by Crop Category (2024)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Citrus</span>
                        <div className="text-right">
                          <span className="font-semibold">44,537 ML</span>
                          <p className="text-xs text-muted-foreground">3.2 kg/ML efficiency</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Avocados</span>
                        <div className="text-right">
                          <span className="font-semibold">3,772 ML</span>
                          <p className="text-xs text-muted-foreground">2.2 kg/ML efficiency</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Berries (Australia)</span>
                        <div className="text-right">
                          <span className="font-semibold">2,879 ML</span>
                          <p className="text-xs text-muted-foreground">4.6 kg/ML efficiency</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Tomatoes</span>
                        <div className="text-right">
                          <span className="font-semibold">494 ML</span>
                          <p className="text-xs text-muted-foreground">7.9 kg/ML efficiency</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Mushrooms</span>
                        <div className="text-right">
                          <span className="font-semibold">423 ML</span>
                          <p className="text-xs text-muted-foreground">63.4 kg/ML efficiency</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Bananas</span>
                        <div className="text-right">
                          <span className="font-semibold">269 ML</span>
                          <p className="text-xs text-muted-foreground">11.9 kg/ML efficiency</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">International Water Operations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Morocco Operations</h4>
                        <div className="ml-4 space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Water Usage:</span>
                            <span className="font-medium">2,328 ML</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Efficiency:</span>
                            <span className="font-medium">2.8 kg/ML</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risk Level:</span>
                            <Badge variant="destructive">High (70%)</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium">China (Yunnan) Operations</h4>
                        <div className="ml-4 space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Water Usage:</span>
                            <span className="font-medium">2,576 ML</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Efficiency:</span>
                            <span className="font-medium">1.9 kg/ML</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risk Level:</span>
                            <Badge variant="destructive">High (64%)</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Comprehensive Pricing Summary by Zone
              </CardTitle>
              <p className="text-muted-foreground">
                Detailed breakdown of permanent and temporary costs across all operational zones
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Zone</th>
                      <th className="text-right p-3">Land Lease (Annual)</th>
                      <th className="text-right p-3">Water Permanent (Total)</th>
                      <th className="text-right p-3">Water Temporary (Annual)</th>
                      <th className="text-right p-3">Operations (Annual)</th>
                      <th className="text-right p-3">Maintenance (Annual)</th>
                      <th className="text-right p-3">Labour (Annual)</th>
                      <th className="text-right p-3">Total Annual Costs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingSummaries.map(pricing => (
                      <tr key={pricing.zone} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{pricing.zone}</td>
                        <td className="p-3 text-right">${(pricing.landLeaseAnnual / 1000000).toFixed(1)}M</td>
                        <td className="p-3 text-right">${(pricing.waterPermanentTotal / 1000000).toFixed(1)}M</td>
                        <td className="p-3 text-right">${(pricing.waterTemporaryAnnual / 1000000).toFixed(1)}M</td>
                        <td className="p-3 text-right">${(pricing.operationalCostsAnnual / 1000000).toFixed(1)}M</td>
                        <td className="p-3 text-right">${(pricing.maintenanceAnnual / 1000000).toFixed(1)}M</td>
                        <td className="p-3 text-right">${(pricing.labourAnnual / 1000000).toFixed(1)}M</td>
                        <td className="p-3 text-right font-semibold text-primary">
                          ${(pricing.totalAnnualCosts / 1000000).toFixed(1)}M
                        </td>
                      </tr>
                    ))}
                    <tr className="border-b-2 border-primary font-semibold bg-muted/30">
                      <td className="p-3">TOTAL</td>
                      <td className="p-3 text-right">
                        ${(pricingSummaries.reduce((sum, p) => sum + p.landLeaseAnnual, 0) / 1000000).toFixed(1)}M
                      </td>
                      <td className="p-3 text-right">
                        ${(pricingSummaries.reduce((sum, p) => sum + p.waterPermanentTotal, 0) / 1000000).toFixed(1)}M
                      </td>
                      <td className="p-3 text-right">
                        ${(pricingSummaries.reduce((sum, p) => sum + p.waterTemporaryAnnual, 0) / 1000000).toFixed(1)}M
                      </td>
                      <td className="p-3 text-right">
                        ${(pricingSummaries.reduce((sum, p) => sum + p.operationalCostsAnnual, 0) / 1000000).toFixed(1)}M
                      </td>
                      <td className="p-3 text-right">
                        ${(pricingSummaries.reduce((sum, p) => sum + p.maintenanceAnnual, 0) / 1000000).toFixed(1)}M
                      </td>
                      <td className="p-3 text-right">
                        ${(pricingSummaries.reduce((sum, p) => sum + p.labourAnnual, 0) / 1000000).toFixed(1)}M
                      </td>
                      <td className="p-3 text-right text-lg text-primary">
                        ${(pricingSummaries.reduce((sum, p) => sum + p.totalAnnualCosts, 0) / 1000000).toFixed(1)}M
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg">Water Cost Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Permanent Water Rights:</span>
                        <span className="font-semibold">
                          ${(pricingSummaries.reduce((sum, p) => sum + p.waterPermanentTotal, 0) / 1000000).toFixed(0)}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Temporary Water:</span>
                        <span className="font-semibold">
                          ${(pricingSummaries.reduce((sum, p) => sum + p.waterTemporaryAnnual, 0) / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Water as % of Total Costs:</span>
                        <span className="font-semibold text-blue-600">
                          {(((pricingSummaries.reduce((sum, p) => sum + p.waterTemporaryAnnual, 0)) / 
                             (pricingSummaries.reduce((sum, p) => sum + p.totalAnnualCosts, 0))) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="text-lg">Operational Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Labour Costs:</span>
                        <span className="font-semibold">
                          ${(pricingSummaries.reduce((sum, p) => sum + p.labourAnnual, 0) / 1000000).toFixed(0)}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maintenance Costs:</span>
                        <span className="font-semibold">
                          ${(pricingSummaries.reduce((sum, p) => sum + p.maintenanceAnnual, 0) / 1000000).toFixed(0)}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Labour as % of Total:</span>
                        <span className="font-semibold text-green-600">
                          {(((pricingSummaries.reduce((sum, p) => sum + p.labourAnnual, 0)) / 
                             (pricingSummaries.reduce((sum, p) => sum + p.totalAnnualCosts, 0))) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <CardTitle className="text-lg">Cost Per Hectare Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Hectares:</span>
                        <span className="font-semibold">{totalHectares.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cost per Hectare:</span>
                        <span className="font-semibold">
                          ${((pricingSummaries.reduce((sum, p) => sum + p.totalAnnualCosts, 0)) / totalHectares).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Water Cost per Ha:</span>
                        <span className="font-semibold text-orange-600">
                          ${((pricingSummaries.reduce((sum, p) => sum + p.waterTemporaryAnnual, 0)) / totalHectares).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="valuations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Property Value</p>
                    <p className="text-2xl font-bold">${(totalPropertyValue / 1000000).toFixed(1)}M</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Equipment Value</p>
                    <p className="text-2xl font-bold">${(totalEquipmentValue / 1000000).toFixed(1)}M</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total P&E Value</p>
                    <p className="text-2xl font-bold">${((totalPropertyValue + totalEquipmentValue) / 1000000).toFixed(1)}M</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Hectares</p>
                    <p className="text-2xl font-bold">{totalHectares.toLocaleString()}</p>
                  </div>
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Property & Equipment Valuation by Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLocations.map(location => (
                  <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{location.name}</h3>
                      <p className="text-sm text-muted-foreground">{location.hectares} hectares</p>
                    </div>
                    <div className="text-right">
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Property: </span>
                          <span className="font-medium">${(location.propertyValue / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Equipment: </span>
                          <span className="font-medium">${(location.equipmentValue / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="font-semibold">
                          Total: ${((location.propertyValue + location.equipmentValue) / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crops" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crop Production Estimates & Revenue Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Crop Category</th>
                      <th className="text-right p-3">2023 Actual</th>
                      <th className="text-right p-3">2024 Actual</th>
                      <th className="text-right p-3">2025 Forecast</th>
                      <th className="text-right p-3">Growth %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Avocados', key: 'avocados' as keyof CropEstimate },
                      { name: 'Bananas', key: 'bananas' as keyof CropEstimate },
                      { name: 'Berries', key: 'berries' as keyof CropEstimate },
                      { name: 'Citrus', key: 'citrus' as keyof CropEstimate },
                      { name: 'Mushrooms', key: 'mushrooms' as keyof CropEstimate },
                      { name: 'Tomatoes', key: 'tomatoes' as keyof CropEstimate }
                    ].map(crop => {
                      const data2023 = cropEstimates.find(e => e.year === 2023)?.[crop.key] as number || 0;
                      const data2024 = cropEstimates.find(e => e.year === 2024)?.[crop.key] as number || 0;
                      const data2025 = cropEstimates.find(e => e.year === 2025)?.[crop.key] as number || 0;
                      const growth = data2024 > 0 ? ((data2025 - data2024) / data2024 * 100) : 0;
                      
                      return (
                        <tr key={crop.key} className="border-b">
                          <td className="p-3 font-medium">{crop.name}</td>
                          <td className="p-3 text-right">{data2023.toLocaleString()}t</td>
                          <td className="p-3 text-right">{data2024.toLocaleString()}t</td>
                          <td className="p-3 text-right">{data2025.toLocaleString()}t</td>
                          <td className="p-3 text-right">
                            <span className={growth >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cropEstimates.map(estimate => (
                  <Card key={estimate.year}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{estimate.year}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Production:</span>
                          <span className="font-medium">
                            {(estimate.avocados + estimate.bananas + estimate.berries + 
                              estimate.citrus + estimate.mushrooms + estimate.tomatoes).toLocaleString()}t
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Est. Revenue:</span>
                          <span className="font-medium text-primary">
                            ${(estimate.totalRevenue / 1000000).toFixed(0)}M
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="esg-savings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ESG Strategy Financial Benefits</CardTitle>
              <p className="text-muted-foreground">
                Projected savings from sustainability initiatives including water efficiency, 
                renewable energy, waste reduction, and carbon management
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {esgSavings.map(saving => (
                  <Card key={saving.period} className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">{saving.period}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Water Efficiency:</span>
                          <span className="font-medium">${(saving.waterEfficiency / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Energy Savings:</span>
                          <span className="font-medium">${(saving.energySavings / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Waste Reduction:</span>
                          <span className="font-medium">${(saving.wasteReduction / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Carbon Credits:</span>
                          <span className="font-medium">${(saving.carbonCredits / 1000000).toFixed(1)}M</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total Savings:</span>
                          <span className="text-green-600">${(saving.totalSavings / 1000000).toFixed(1)}M</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carbon-credits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Carbon Credit Swap Analysis
              </CardTitle>
              <p className="text-muted-foreground">
                Calculate potential benefits from carbon credit generation and trading
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="carbon-price">Carbon Credit Price (AUD per tonne)</Label>
                    <Input
                      id="carbon-price"
                      type="number"
                      value={carbonCreditPrice}
                      onChange={(e) => setCarbonCreditPrice(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reduction-target">Carbon Reduction Target (%)</Label>
                    <Input
                      id="reduction-target"
                      type="number"
                      value={carbonReductionTarget}
                      onChange={(e) => setCarbonReductionTarget(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Current Emissions Profile</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Scope 1 Emissions:</span>
                        <span className="font-medium">82,767 tonnes CO₂-e</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Scope 2 Emissions:</span>
                        <span className="font-medium">49,515 tonnes CO₂-e</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Emissions:</span>
                        <span>132,282 tonnes CO₂-e</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Carbon Reduction</p>
                      <p className="text-2xl font-bold text-green-600">
                        {carbonSwapBenefits.reductionTonnes.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">tonnes CO₂-e</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Credit Value</p>
                      <p className="text-2xl font-bold text-primary">
                        ${(carbonSwapBenefits.creditValue / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-muted-foreground">total value</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Additional Revenue</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${(carbonSwapBenefits.additionalRevenue / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-muted-foreground">from credit sales</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">Cost Savings</p>
                      <p className="text-2xl font-bold text-orange-600">
                        ${(carbonSwapBenefits.costSavings / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-muted-foreground">operational efficiency</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Carbon Credit Swap Scenarios</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium">Conservative (10% reduction)</h4>
                        <p>13,228 tonnes → ${(13228 * carbonCreditPrice / 1000000).toFixed(1)}M value</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Target (15% reduction)</h4>
                        <p>{carbonSwapBenefits.reductionTonnes.toLocaleString()} tonnes → ${(carbonSwapBenefits.creditValue / 1000000).toFixed(1)}M value</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Ambitious (25% reduction)</h4>
                        <p>33,071 tonnes → ${(33071 * carbonCreditPrice / 1000000).toFixed(1)}M value</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};