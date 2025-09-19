import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, RefreshCw, Database, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface PopulationStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  progress: number;
  dataSource: string;
  estimatedTime: number;
}

interface AutoPopulationServiceProps {
  addressData: any;
  selectedState: string;
  enabledSources: any[];
  onDataPopulated: (data: any) => void;
}

export default function AutoPopulationService({ 
  addressData, 
  selectedState, 
  enabledSources, 
  onDataPopulated 
}: AutoPopulationServiceProps) {
  const [isPopulating, setIsPopulating] = useState(false);
  const [populationProgress, setPopulationProgress] = useState(0);
  const [populationSteps, setPopulationSteps] = useState<PopulationStep[]>([]);
  const [populatedData, setPopulatedData] = useState<any>(null);

  const initializePopulationSteps = () => {
    const steps: PopulationStep[] = [
      {
        id: 'planning-data',
        name: 'Planning Information',
        description: 'Fetching zoning, overlays, and planning controls',
        status: 'pending',
        progress: 0,
        dataSource: selectedState === 'VIC' ? 'VicPlan' : `${selectedState} Planning Portal`,
        estimatedTime: 3000
      },
      {
        id: 'title-data',
        name: 'Title Information',
        description: 'Retrieving lot/plan details and property boundaries',
        status: 'pending',
        progress: 0,
        dataSource: selectedState === 'VIC' ? 'Land Victoria' : `${selectedState} Land Registry`,
        estimatedTime: 2000
      },
      {
        id: 'council-data',
        name: 'Council Information',
        description: 'Getting local government area and development controls',
        status: 'pending',
        progress: 0,
        dataSource: `${addressData?.council || 'Local'} Council`,
        estimatedTime: 2500
      },
      {
        id: 'market-data',
        name: 'Market Information',
        description: 'Collecting comparable sales and market trends',
        status: 'pending',
        progress: 0,
        dataSource: 'Market Data Providers',
        estimatedTime: 4000
      },
      {
        id: 'development-data',
        name: 'Development Controls',
        description: 'Analyzing height limits, FSR, and development potential',
        status: 'pending',
        progress: 0,
        dataSource: 'Planning Analysis Engine',
        estimatedTime: 3500
      }
    ];

    setPopulationSteps(steps);
  };

  useEffect(() => {
    if (addressData && enabledSources.length > 0) {
      initializePopulationSteps();
    }
  }, [addressData, enabledSources, selectedState]);

  const executePopulationStep = async (step: PopulationStep): Promise<any> => {
    // Update step status to in-progress
    setPopulationSteps(prev => prev.map(s => 
      s.id === step.id ? { ...s, status: 'in-progress' as const, progress: 0 } : s
    ));

    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        setPopulationSteps(prev => prev.map(s => {
          if (s.id === step.id) {
            const newProgress = Math.min(s.progress + 20, 100);
            return { ...s, progress: newProgress };
          }
          return s;
        }));
      }, step.estimatedTime / 5);

      setTimeout(() => {
        clearInterval(interval);
        
        // Simulate data based on step type
        let stepData = {};
        
        switch (step.id) {
          case 'planning-data':
            stepData = {
              currentZoning: selectedState === 'VIC' ? 'Commercial 1 Zone' : 'B4 Mixed Use',
              planningOverlays: ['Design and Development Overlay'],
              heightLimit: selectedState === 'VIC' ? 120 : 100,
              floorSpaceRatio: 3.3,
              developmentControls: {
                setbacks: { front: 6, side: 3, rear: 6 },
                landscaping: 15,
                parking: 'As per planning scheme'
              }
            };
            break;
            
          case 'title-data':
            stepData = {
              lotNumber: addressData?.lotNumber || '31',
              planNumber: addressData?.planNumber || 'DP1234567',
              titleReference: `${addressData?.lotNumber || '31'}/${addressData?.planNumber || 'DP1234567'}`,
              landArea: addressData?.landArea || 14560,
              proprietor: 'REGISTERED PROPRIETOR',
              encumbrances: []
            };
            break;
            
          case 'council-data':
            stepData = {
              localGovernmentArea: addressData?.council || `${selectedState} Council`,
              ward: 'Ward 1',
              developmentApplicationHistory: [],
              ratesAndCharges: {
                landValue: 2850000,
                capitalImprovedValue: 3200000,
                ratesPayable: 45000
              }
            };
            break;
            
          case 'market-data':
            stepData = {
              comparableSales: [
                {
                  address: '25-29 Smith Street',
                  salePrice: 15500000,
                  saleDate: '2024-03-15',
                  landArea: 12000,
                  pricePerSqm: 1292
                }
              ],
              marketTrends: {
                medianPrice: 14500000,
                priceGrowth: 8.5,
                timeOnMarket: 45
              }
            };
            break;
            
          case 'development-data':
            stepData = {
              developmentPotential: {
                maximumGFA: 48051,
                estimatedUnits: 500,
                developmentCost: 85000000,
                grossRealisationValue: 125000000
              },
              feasibilityIndicators: {
                residualLandValue: 18500000,
                profitMargin: 15.2,
                developmentYield: 7.8
              }
            };
            break;
        }

        // Mark step as completed
        setPopulationSteps(prev => prev.map(s => 
          s.id === step.id ? { ...s, status: 'completed' as const, progress: 100 } : s
        ));

        resolve(stepData);
      }, step.estimatedTime);
    });
  };

  const startAutoPopulation = async () => {
    if (!addressData) {
      toast.error("Please verify the address first");
      return;
    }

    setIsPopulating(true);
    setPopulationProgress(0);
    
    try {
      const allPopulatedData: any = {};
      
      for (let i = 0; i < populationSteps.length; i++) {
        const step = populationSteps[i];
        const stepData = await executePopulationStep(step);
        allPopulatedData[step.id] = stepData;
        
        // Update overall progress
        setPopulationProgress(((i + 1) / populationSteps.length) * 100);
      }

      setPopulatedData(allPopulatedData);
      onDataPopulated(allPopulatedData);
      toast.success("Auto-population completed successfully!");
      
    } catch (error) {
      toast.error("Failed to auto-populate data");
      console.error('Auto-population error:', error);
    } finally {
      setIsPopulating(false);
    }
  };

  const resetPopulation = () => {
    setIsPopulating(false);
    setPopulationProgress(0);
    setPopulatedData(null);
    initializePopulationSteps();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Auto-Population Service
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Automatically populate development site data from {enabledSources.length} enabled sources
            </p>
            {addressData && (
              <Badge variant="outline" className="mt-1">
                <CheckCircle className="w-3 h-3 mr-1" />
                Address Verified
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={startAutoPopulation}
              disabled={!addressData || isPopulating}
              className="shrink-0"
            >
              {isPopulating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Populating...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 mr-2" />
                  Start Auto-Population
                </>
              )}
            </Button>
            
            {populatedData && (
              <Button variant="outline" onClick={resetPopulation}>
                Reset
              </Button>
            )}
          </div>
        </div>

        {isPopulating && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Progress</span>
                <span>{Math.round(populationProgress)}%</span>
              </div>
              <Progress value={populationProgress} className="h-2" />
            </div>
          </div>
        )}

        {populationSteps.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Population Steps</h4>
            {populationSteps.map((step) => (
              <div key={step.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      step.status === 'completed' ? 'bg-green-500' :
                      step.status === 'in-progress' ? 'bg-blue-500 animate-pulse' :
                      step.status === 'failed' ? 'bg-red-500' :
                      'bg-gray-300'
                    }`} />
                    <span className="font-medium text-sm">{step.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {step.dataSource}
                    </Badge>
                  </div>
                  
                  {step.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                  {step.status === 'failed' && (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {step.description}
                </p>
                
                {step.status === 'in-progress' && (
                  <Progress value={step.progress} className="h-1" />
                )}
              </div>
            ))}
          </div>
        )}

        {populatedData && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800 dark:text-green-200">
                Auto-Population Complete
              </span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Successfully populated {Object.keys(populatedData).length} data categories. 
              Review the populated information in the form fields above.
            </p>
          </div>
        )}

        {!addressData && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-800 dark:text-yellow-200">
                Please verify the property address first to enable auto-population
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}