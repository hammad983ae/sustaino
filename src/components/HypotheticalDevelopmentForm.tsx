import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Building2, Calculator, DollarSign } from "lucide-react";

interface HypotheticalDevelopmentInputs {
  // Land and Site Costs
  landArea: number;
  expectedSaleValue: number;
  
  // Construction Costs
  buildingArea: number;
  constructionCostPerSqm: number;
  
  // Professional Fees
  architecturalFees: number;
  engineeringFees: number;
  surveyingFees: number;
  planningFees: number;
  
  // Development Costs
  siteWorks: number;
  services: number;
  landscaping: number;
  
  // Finance and Marketing
  financeRate: number;
  developmentPeriod: number;
  marketingCosts: number;
  legalCosts: number;
  
  // Developer Profit
  developerProfitMargin: number;
}

interface HypotheticalDevelopmentFormProps {
  onSubmit: (data: any) => void;
}

const HypotheticalDevelopmentForm = ({ onSubmit }: HypotheticalDevelopmentFormProps) => {
  const [inputs, setInputs] = useState<HypotheticalDevelopmentInputs>({
    landArea: 0,
    expectedSaleValue: 0,
    buildingArea: 0,
    constructionCostPerSqm: 2500,
    architecturalFees: 0,
    engineeringFees: 0,
    surveyingFees: 0,
    planningFees: 0,
    siteWorks: 0,
    services: 0,
    landscaping: 0,
    financeRate: 6.5,
    developmentPeriod: 18,
    marketingCosts: 0,
    legalCosts: 0,
    developerProfitMargin: 20
  });

  const [results, setResults] = useState(null);

  const calculateDevelopment = () => {
    // Construction Costs
    const totalConstructionCost = inputs.buildingArea * inputs.constructionCostPerSqm;
    
    // Professional Fees
    const totalProfessionalFees = inputs.architecturalFees + inputs.engineeringFees + 
                                 inputs.surveyingFees + inputs.planningFees;
    
    // Development Costs
    const totalDevelopmentCosts = inputs.siteWorks + inputs.services + inputs.landscaping;
    
    // Finance Costs (calculated on half the development period for average exposure)
    const averageDevelopmentCost = (totalConstructionCost + totalProfessionalFees + totalDevelopmentCosts) / 2;
    const financeCosts = averageDevelopmentCost * (inputs.financeRate / 100) * (inputs.developmentPeriod / 12);
    
    // Total Development Cost
    const totalDevelopmentCost = totalConstructionCost + totalProfessionalFees + 
                                totalDevelopmentCosts + financeCosts + 
                                inputs.marketingCosts + inputs.legalCosts;
    
    // Developer Profit
    const developerProfit = totalDevelopmentCost * (inputs.developerProfitMargin / 100);
    
    // Total Cost including Profit
    const totalCostIncludingProfit = totalDevelopmentCost + developerProfit;
    
    // Residual Land Value
    const residualLandValue = inputs.expectedSaleValue - totalCostIncludingProfit;
    const residualLandValuePerSqm = inputs.landArea > 0 ? residualLandValue / inputs.landArea : 0;
    
    // Development Margin
    const developmentMargin = inputs.expectedSaleValue > 0 ? 
                            (residualLandValue / inputs.expectedSaleValue) * 100 : 0;

    const calculationResults = {
      constructionCosts: {
        totalConstructionCost,
        costPerSqm: inputs.constructionCostPerSqm
      },
      professionalFees: {
        totalProfessionalFees,
        architectural: inputs.architecturalFees,
        engineering: inputs.engineeringFees,
        surveying: inputs.surveyingFees,
        planning: inputs.planningFees
      },
      developmentCosts: {
        totalDevelopmentCosts,
        siteWorks: inputs.siteWorks,
        services: inputs.services,
        landscaping: inputs.landscaping
      },
      financeCosts,
      marketingAndLegal: inputs.marketingCosts + inputs.legalCosts,
      totalDevelopmentCost,
      developerProfit,
      totalCostIncludingProfit,
      residualLandValue,
      residualLandValuePerSqm,
      expectedSaleValue: inputs.expectedSaleValue,
      developmentMargin,
      feasibilityAssessment: residualLandValue > 0 ? "Feasible" : "Not Feasible"
    };

    setResults(calculationResults);
    onSubmit(calculationResults);
  };

  const updateInput = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Hypothetical Development Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Site Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Site Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="landArea">Land Area (sqm)</Label>
                <Input
                  id="landArea"
                  type="number"
                  value={inputs.landArea || ''}
                  onChange={(e) => updateInput('landArea', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="expectedSaleValue">Expected Sale Value ($)</Label>
                <Input
                  id="expectedSaleValue"
                  type="number"
                  value={inputs.expectedSaleValue || ''}
                  onChange={(e) => updateInput('expectedSaleValue', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="buildingArea">Building Area (sqm)</Label>
                <Input
                  id="buildingArea"
                  type="number"
                  value={inputs.buildingArea || ''}
                  onChange={(e) => updateInput('buildingArea', Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Construction Costs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Construction Costs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="constructionCostPerSqm">Construction Cost per sqm ($)</Label>
                <Input
                  id="constructionCostPerSqm"
                  type="number"
                  value={inputs.constructionCostPerSqm || ''}
                  onChange={(e) => updateInput('constructionCostPerSqm', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="siteWorks">Site Works ($)</Label>
                <Input
                  id="siteWorks"
                  type="number"
                  value={inputs.siteWorks || ''}
                  onChange={(e) => updateInput('siteWorks', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="services">Services ($)</Label>
                <Input
                  id="services"
                  type="number"
                  value={inputs.services || ''}
                  onChange={(e) => updateInput('services', Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Fees */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="architecturalFees">Architectural Fees ($)</Label>
                <Input
                  id="architecturalFees"
                  type="number"
                  value={inputs.architecturalFees || ''}
                  onChange={(e) => updateInput('architecturalFees', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="engineeringFees">Engineering Fees ($)</Label>
                <Input
                  id="engineeringFees"
                  type="number"
                  value={inputs.engineeringFees || ''}
                  onChange={(e) => updateInput('engineeringFees', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="planningFees">Planning Fees ($)</Label>
                <Input
                  id="planningFees"
                  type="number"
                  value={inputs.planningFees || ''}
                  onChange={(e) => updateInput('planningFees', Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Finance and Timing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Finance & Timing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="financeRate">Finance Rate (%)</Label>
                <Input
                  id="financeRate"
                  type="number"
                  step="0.1"
                  value={inputs.financeRate || ''}
                  onChange={(e) => updateInput('financeRate', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="developmentPeriod">Development Period (months)</Label>
                <Input
                  id="developmentPeriod"
                  type="number"
                  value={inputs.developmentPeriod || ''}
                  onChange={(e) => updateInput('developmentPeriod', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="developerProfitMargin">Developer Profit Margin (%)</Label>
                <Input
                  id="developerProfitMargin"
                  type="number"
                  step="0.1"
                  value={inputs.developerProfitMargin || ''}
                  onChange={(e) => updateInput('developerProfitMargin', Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Button onClick={calculateDevelopment} className="w-full">
          <Calculator className="w-4 h-4 mr-2" />
          Calculate Development Feasibility
        </Button>

        {results && (
          <div className="space-y-4">
            <Separator />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Development Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Cost Breakdown</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Construction Costs:</span>
                        <span>${results.constructionCosts.totalConstructionCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Professional Fees:</span>
                        <span>${results.professionalFees.totalProfessionalFees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Development Costs:</span>
                        <span>${results.developmentCosts.totalDevelopmentCosts.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Finance Costs:</span>
                        <span>${results.financeCosts.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Developer Profit:</span>
                        <span>${results.developerProfit.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Development Cost:</span>
                        <span>${results.totalCostIncludingProfit.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Feasibility Analysis</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Expected Sale Value:</span>
                        <span>${results.expectedSaleValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Residual Land Value:</span>
                        <span className={results.residualLandValue >= 0 ? "text-success" : "text-destructive"}>
                          ${results.residualLandValue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Land Value per sqm:</span>
                        <span>${results.residualLandValuePerSqm.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Development Margin:</span>
                        <span className={results.developmentMargin >= 0 ? "text-success" : "text-destructive"}>
                          {results.developmentMargin.toFixed(2)}%
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Feasibility:</span>
                        <span className={results.feasibilityAssessment === "Feasible" ? "text-success" : "text-destructive"}>
                          {results.feasibilityAssessment}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HypotheticalDevelopmentForm;