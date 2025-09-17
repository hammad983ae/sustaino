import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calculator, MapPin, DollarSign, Calendar, Users, Zap } from "lucide-react";
import { calculateAdvertisingSignageValue } from "@/lib/advertising-valuation-calculations";

interface SignageData {
  // Location & Traffic
  location: string;
  dailyTraffic: number;
  demographics: string;
  roadType: string;
  
  // Signage Details
  signageType: string;
  sides: number;
  width: number;
  height: number;
  isDigital: boolean;
  
  // Financial
  currentRent: number;
  operatingCosts: number;
  maintenanceCosts: number;
  insuranceCosts: number;
  publicBenefitFee: number;
  
  // Legal & Planning
  interestType: string;
  leaseTerm: number;
  planningPermitExpiry: string;
  renewalRisk: string;
  
  // Incentives & Terms
  landlordScreentime: number;
  rentReviews: string;
  capRate: number;
}

export default function AdvertisingSignageValuation() {
  const [signageData, setSignageData] = useState<SignageData>({
    location: "",
    dailyTraffic: 0,
    demographics: "",
    roadType: "",
    signageType: "",
    sides: 1,
    width: 0,
    height: 0,
    isDigital: false,
    currentRent: 0,
    operatingCosts: 0,
    maintenanceCosts: 0,
    insuranceCosts: 0,
    publicBenefitFee: 0,
    interestType: "",
    leaseTerm: 0,
    planningPermitExpiry: "",
    renewalRisk: "",
    landlordScreentime: 0,
    rentReviews: "",
    capRate: 7.5
  });

  const [valuation, setValuation] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof SignageData, value: any) => {
    setSignageData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateValuation = async () => {
    setIsCalculating(true);
    try {
      const result = calculateAdvertisingSignageValue(signageData);
      setValuation(result);
    } catch (error) {
      console.error('Error calculating signage valuation:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    if (signageData.currentRent > 0 && signageData.dailyTraffic > 0) {
      const timer = setTimeout(() => {
        calculateValuation();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [signageData]);

  const signageArea = signageData.width * signageData.height;
  const annualTraffic = signageData.dailyTraffic * 365;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Advertising Signage Valuation</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-6">
          {/* Location & Traffic */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location & Traffic Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Location Description</Label>
                <Input
                  id="location"
                  value={signageData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Pacific Highway, North Sydney"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dailyTraffic">Daily Traffic Volume</Label>
                  <Input
                    id="dailyTraffic"
                    type="number"
                    value={signageData.dailyTraffic}
                    onChange={(e) => handleInputChange('dailyTraffic', parseInt(e.target.value) || 0)}
                    placeholder="50000"
                  />
                </div>
                <div>
                  <Label htmlFor="roadType">Road Type</Label>
                  <Select value={signageData.roadType} onValueChange={(value) => handleInputChange('roadType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select road type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arterial">Arterial Road</SelectItem>
                      <SelectItem value="highway">Highway</SelectItem>
                      <SelectItem value="freeway">Freeway</SelectItem>
                      <SelectItem value="local">Local Road</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="demographics">Demographics</Label>
                <Select value={signageData.demographics} onValueChange={(value) => handleInputChange('demographics', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select demographics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-income">High Income</SelectItem>
                    <SelectItem value="medium-income">Medium Income</SelectItem>
                    <SelectItem value="low-income">Low Income</SelectItem>
                    <SelectItem value="mixed">Mixed Demographics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Signage Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Signage Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="signageType">Signage Type</Label>
                  <Select value={signageData.signageType} onValueChange={(value) => handleInputChange('signageType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="billboard">Billboard</SelectItem>
                      <SelectItem value="digital">Digital Billboard</SelectItem>
                      <SelectItem value="led">LED Display</SelectItem>
                      <SelectItem value="static">Static Sign</SelectItem>
                      <SelectItem value="supersign">Super Sign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sides">Number of Sides</Label>
                  <Select value={signageData.sides.toString()} onValueChange={(value) => handleInputChange('sides', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Single Sided</SelectItem>
                      <SelectItem value="2">Double Sided</SelectItem>
                      <SelectItem value="3">Triple Sided</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Width (meters)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    value={signageData.width}
                    onChange={(e) => handleInputChange('width', parseFloat(e.target.value) || 0)}
                    placeholder="12.0"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (meters)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    value={signageData.height}
                    onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                    placeholder="3.0"
                  />
                </div>
              </div>

              {signageArea > 0 && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm font-medium">
                    Total Signage Area: <span className="text-primary">{signageArea.toFixed(1)} m²</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Financial Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentRent">Current Annual Rent ($)</Label>
                  <Input
                    id="currentRent"
                    type="number"
                    value={signageData.currentRent}
                    onChange={(e) => handleInputChange('currentRent', parseInt(e.target.value) || 0)}
                    placeholder="150000"
                  />
                </div>
                <div>
                  <Label htmlFor="capRate">Capitalisation Rate (%)</Label>
                  <Input
                    id="capRate"
                    type="number"
                    step="0.1"
                    value={signageData.capRate}
                    onChange={(e) => handleInputChange('capRate', parseFloat(e.target.value) || 7.5)}
                    placeholder="7.5"
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="operatingCosts">Operating Costs ($)</Label>
                  <Input
                    id="operatingCosts"
                    type="number"
                    value={signageData.operatingCosts}
                    onChange={(e) => handleInputChange('operatingCosts', parseInt(e.target.value) || 0)}
                    placeholder="15000"
                  />
                </div>
                <div>
                  <Label htmlFor="maintenanceCosts">Maintenance Costs ($)</Label>
                  <Input
                    id="maintenanceCosts"
                    type="number"
                    value={signageData.maintenanceCosts}
                    onChange={(e) => handleInputChange('maintenanceCosts', parseInt(e.target.value) || 0)}
                    placeholder="8000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="insuranceCosts">Insurance Costs ($)</Label>
                  <Input
                    id="insuranceCosts"
                    type="number"
                    value={signageData.insuranceCosts}
                    onChange={(e) => handleInputChange('insuranceCosts', parseInt(e.target.value) || 0)}
                    placeholder="3000"
                  />
                </div>
                <div>
                  <Label htmlFor="publicBenefitFee">Public Benefit Fee ($)</Label>
                  <Input
                    id="publicBenefitFee"
                    type="number"
                    value={signageData.publicBenefitFee}
                    onChange={(e) => handleInputChange('publicBenefitFee', parseInt(e.target.value) || 0)}
                    placeholder="5000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal & Planning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Legal & Planning Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interestType">Interest Type</Label>
                  <Select value={signageData.interestType} onValueChange={(value) => handleInputChange('interestType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freehold">Freehold</SelectItem>
                      <SelectItem value="leasehold">Leasehold</SelectItem>
                      <SelectItem value="license">License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="leaseTerm">Lease Term (years)</Label>
                  <Input
                    id="leaseTerm"
                    type="number"
                    value={signageData.leaseTerm}
                    onChange={(e) => handleInputChange('leaseTerm', parseInt(e.target.value) || 0)}
                    placeholder="10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="planningPermitExpiry">Planning Permit Expiry</Label>
                <Input
                  id="planningPermitExpiry"
                  type="date"
                  value={signageData.planningPermitExpiry}
                  onChange={(e) => handleInputChange('planningPermitExpiry', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="renewalRisk">Renewal Risk Assessment</Label>
                <Select value={signageData.renewalRisk} onValueChange={(value) => handleInputChange('renewalRisk', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Valuation Results */}
        <div className="space-y-6">
          {valuation && (
            <>
              {/* Summary Valuation */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Valuation Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      ${valuation.marketValue.toLocaleString()}
                    </div>
                    <p className="text-muted-foreground">Estimated Market Value</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-semibold">
                        ${valuation.capitalizedValue.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Capitalized Value</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-semibold">
                        {valuation.yieldRate.toFixed(2)}%
                      </div>
                      <p className="text-sm text-muted-foreground">Net Yield</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Badge variant={valuation.riskRating === 'Low' ? 'default' : valuation.riskRating === 'Medium' ? 'secondary' : 'destructive'}>
                      {valuation.riskRating} Risk
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Gross Annual Rent</span>
                    <span className="font-medium">${signageData.currentRent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-destructive">
                    <span>Total Outgoings</span>
                    <span>-${valuation.totalOutgoings.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Net Operating Income</span>
                    <span className="text-primary">${valuation.netIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per m² (signage area)</span>
                    <span>${valuation.pricePerSqm.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual exposure (vehicles)</span>
                    <span>{annualTraffic.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Factors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {valuation.riskFactors.map((risk: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{risk}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Market Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Demographic Premium</span>
                    <span className={valuation.demographicPremium > 0 ? "text-primary" : ""}>
                      {valuation.demographicPremium > 0 ? '+' : ''}{valuation.demographicPremium}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Digital Premium</span>
                    <span className={valuation.digitalPremium > 0 ? "text-primary" : ""}>
                      {valuation.digitalPremium > 0 ? '+' : ''}{valuation.digitalPremium}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Multi-side Premium</span>
                    <span className={valuation.multiSidePremium > 0 ? "text-primary" : ""}>
                      {valuation.multiSidePremium > 0 ? '+' : ''}{valuation.multiSidePremium}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location Quality</span>
                    <span>{valuation.locationQuality}</span>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!valuation && (
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  Enter signage details to generate instant valuation
                </p>
              </CardContent>
            </Card>
          )}

          <Button 
            onClick={calculateValuation} 
            className="w-full" 
            size="lg"
            disabled={isCalculating || !signageData.currentRent || !signageData.dailyTraffic}
          >
            {isCalculating ? "Calculating..." : "Calculate Valuation"}
          </Button>
        </div>
      </div>
    </div>
  );
}