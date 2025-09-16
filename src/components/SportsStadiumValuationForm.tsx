import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calculator, DollarSign, BarChart3 } from "lucide-react";

interface SportsStadiumInputs {
  // Stadium Details
  capacity: number;
  siteArea: number;
  buildingArea: number;
  
  // Revenue Streams
  ticketRevenue: number;
  corporateHospitality: number;
  merchandising: number;
  foodAndBeverage: number;
  parkingRevenue: number;
  namingRights: number;
  conferenceAndEvents: number;
  
  // Operating Expenses
  staffCosts: number;
  maintenance: number;
  utilities: number;
  security: number;
  insurance: number;
  marketing: number;
  administration: number;
  
  // Financial Assumptions
  occupancyRate: number;
  eventDays: number;
  capitalGrowthRate: number;
  discountRate: number;
  
  // Comparable Data
  recentSalePrice: number;
  saleDate: string;
  saleCapacity: number;
}

interface SportsStadiumValuationFormProps {
  onSubmit: (data: any) => void;
}

const SportsStadiumValuationForm = ({ onSubmit }: SportsStadiumValuationFormProps) => {
  const [inputs, setInputs] = useState<SportsStadiumInputs>({
    capacity: 0,
    siteArea: 0,
    buildingArea: 0,
    ticketRevenue: 0,
    corporateHospitality: 0,
    merchandising: 0,
    foodAndBeverage: 0,
    parkingRevenue: 0,
    namingRights: 0,
    conferenceAndEvents: 0,
    staffCosts: 0,
    maintenance: 0,
    utilities: 0,
    security: 0,
    insurance: 0,
    marketing: 0,
    administration: 0,
    occupancyRate: 75,
    eventDays: 25,
    capitalGrowthRate: 3.5,
    discountRate: 8.0,
    recentSalePrice: 0,
    saleDate: '',
    saleCapacity: 0
  });

  const [results, setResults] = useState(null);

  const calculateValuation = () => {
    // Income Approach
    const grossRevenue = (
      inputs.ticketRevenue + 
      inputs.corporateHospitality + 
      inputs.merchandising + 
      inputs.foodAndBeverage + 
      inputs.parkingRevenue + 
      inputs.namingRights + 
      inputs.conferenceAndEvents
    ) * (inputs.occupancyRate / 100);

    const totalExpenses = 
      inputs.staffCosts + 
      inputs.maintenance + 
      inputs.utilities + 
      inputs.security + 
      inputs.insurance + 
      inputs.marketing + 
      inputs.administration;

    const netOperatingIncome = grossRevenue - totalExpenses;
    
    // Specialized stadium capitalization rate (typically higher due to specialized use)
    const stadiumCapRate = inputs.discountRate + 2; // Risk premium for specialized properties
    const incomeApproachValue = netOperatingIncome > 0 ? netOperatingIncome / (stadiumCapRate / 100) : 0;

    // Cost Approach (Replacement Cost New Less Depreciation)
    const replacementCostPerSeat = 15000; // Average cost per seat for modern stadium
    const replacementCostTotal = inputs.capacity * replacementCostPerSeat;
    const depreciation = 0.15; // Assuming 15% depreciation
    const depreciatedReplacementCost = replacementCostTotal * (1 - depreciation);

    // Sales Comparison Approach
    let salesComparisonValue = 0;
    if (inputs.recentSalePrice > 0 && inputs.saleCapacity > 0) {
      const pricePerSeat = inputs.recentSalePrice / inputs.saleCapacity;
      salesComparisonValue = pricePerSeat * inputs.capacity;
    }

    // Performance Metrics
    const revenuePerSeat = inputs.capacity > 0 ? grossRevenue / inputs.capacity : 0;
    const operatingMargin = grossRevenue > 0 ? (netOperatingIncome / grossRevenue) * 100 : 0;
    const utilizationRate = (inputs.eventDays / 365) * 100;

    // Final Valuation (Weighted Average)
    let finalValuation = 0;
    let weightCount = 0;

    if (incomeApproachValue > 0) {
      finalValuation += incomeApproachValue * 0.4;
      weightCount += 0.4;
    }

    if (depreciatedReplacementCost > 0) {
      finalValuation += depreciatedReplacementCost * 0.3;
      weightCount += 0.3;
    }

    if (salesComparisonValue > 0) {
      finalValuation += salesComparisonValue * 0.3;
      weightCount += 0.3;
    }

    if (weightCount > 0) {
      finalValuation = finalValuation / weightCount;
    }

    const calculationResults = {
      incomeApproach: {
        grossRevenue,
        totalExpenses,
        netOperatingIncome,
        capitalizationRate: stadiumCapRate,
        value: incomeApproachValue
      },
      costApproach: {
        replacementCostTotal,
        depreciation: depreciation * 100,
        value: depreciatedReplacementCost
      },
      salesComparison: {
        pricePerSeat: inputs.saleCapacity > 0 ? inputs.recentSalePrice / inputs.saleCapacity : 0,
        value: salesComparisonValue
      },
      performanceMetrics: {
        revenuePerSeat,
        operatingMargin,
        utilizationRate,
        eventDays: inputs.eventDays
      },
      finalValuation,
      valuePerSeat: inputs.capacity > 0 ? finalValuation / inputs.capacity : 0
    };

    setResults(calculationResults);
    onSubmit(calculationResults);
  };

  const updateInput = (field: string, value: number | string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Sports Stadium Valuation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="property-details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="property-details">Property Details</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Streams</TabsTrigger>
            <TabsTrigger value="expenses">Operating Expenses</TabsTrigger>
            <TabsTrigger value="comparables">Comparables</TabsTrigger>
          </TabsList>

          <TabsContent value="property-details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stadium Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="capacity">Seating Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={inputs.capacity || ''}
                      onChange={(e) => updateInput('capacity', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteArea">Site Area (sqm)</Label>
                    <Input
                      id="siteArea"
                      type="number"
                      value={inputs.siteArea || ''}
                      onChange={(e) => updateInput('siteArea', Number(e.target.value))}
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Operational Assumptions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="occupancyRate">Average Occupancy Rate (%)</Label>
                    <Input
                      id="occupancyRate"
                      type="number"
                      step="0.1"
                      value={inputs.occupancyRate || ''}
                      onChange={(e) => updateInput('occupancyRate', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventDays">Event Days per Year</Label>
                    <Input
                      id="eventDays"
                      type="number"
                      value={inputs.eventDays || ''}
                      onChange={(e) => updateInput('eventDays', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="discountRate">Discount Rate (%)</Label>
                    <Input
                      id="discountRate"
                      type="number"
                      step="0.1"
                      value={inputs.discountRate || ''}
                      onChange={(e) => updateInput('discountRate', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Primary Revenue Streams</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ticketRevenue">Ticket Revenue (Annual $)</Label>
                    <Input
                      id="ticketRevenue"
                      type="number"
                      value={inputs.ticketRevenue || ''}
                      onChange={(e) => updateInput('ticketRevenue', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="corporateHospitality">Corporate Hospitality ($)</Label>
                    <Input
                      id="corporateHospitality"
                      type="number"
                      value={inputs.corporateHospitality || ''}
                      onChange={(e) => updateInput('corporateHospitality', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="namingRights">Naming Rights ($)</Label>
                    <Input
                      id="namingRights"
                      type="number"
                      value={inputs.namingRights || ''}
                      onChange={(e) => updateInput('namingRights', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Secondary Revenue Streams</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="foodAndBeverage">Food & Beverage ($)</Label>
                    <Input
                      id="foodAndBeverage"
                      type="number"
                      value={inputs.foodAndBeverage || ''}
                      onChange={(e) => updateInput('foodAndBeverage', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="merchandising">Merchandising ($)</Label>
                    <Input
                      id="merchandising"
                      type="number"
                      value={inputs.merchandising || ''}
                      onChange={(e) => updateInput('merchandising', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="parkingRevenue">Parking Revenue ($)</Label>
                    <Input
                      id="parkingRevenue"
                      type="number"
                      value={inputs.parkingRevenue || ''}
                      onChange={(e) => updateInput('parkingRevenue', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="conferenceAndEvents">Conference & Events ($)</Label>
                    <Input
                      id="conferenceAndEvents"
                      type="number"
                      value={inputs.conferenceAndEvents || ''}
                      onChange={(e) => updateInput('conferenceAndEvents', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Operating Expenses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="staffCosts">Staff Costs ($)</Label>
                    <Input
                      id="staffCosts"
                      type="number"
                      value={inputs.staffCosts || ''}
                      onChange={(e) => updateInput('staffCosts', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maintenance">Maintenance ($)</Label>
                    <Input
                      id="maintenance"
                      type="number"
                      value={inputs.maintenance || ''}
                      onChange={(e) => updateInput('maintenance', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="utilities">Utilities ($)</Label>
                    <Input
                      id="utilities"
                      type="number"
                      value={inputs.utilities || ''}
                      onChange={(e) => updateInput('utilities', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="security">Security ($)</Label>
                    <Input
                      id="security"
                      type="number"
                      value={inputs.security || ''}
                      onChange={(e) => updateInput('security', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Costs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="insurance">Insurance ($)</Label>
                    <Input
                      id="insurance"
                      type="number"
                      value={inputs.insurance || ''}
                      onChange={(e) => updateInput('insurance', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="marketing">Marketing ($)</Label>
                    <Input
                      id="marketing"
                      type="number"
                      value={inputs.marketing || ''}
                      onChange={(e) => updateInput('marketing', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="administration">Administration ($)</Label>
                    <Input
                      id="administration"
                      type="number"
                      value={inputs.administration || ''}
                      onChange={(e) => updateInput('administration', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparables" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comparable Stadium Sales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="recentSalePrice">Recent Sale Price ($)</Label>
                    <Input
                      id="recentSalePrice"
                      type="number"
                      value={inputs.recentSalePrice || ''}
                      onChange={(e) => updateInput('recentSalePrice', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="saleCapacity">Sale Stadium Capacity</Label>
                    <Input
                      id="saleCapacity"
                      type="number"
                      value={inputs.saleCapacity || ''}
                      onChange={(e) => updateInput('saleCapacity', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="saleDate">Sale Date</Label>
                    <Input
                      id="saleDate"
                      type="date"
                      value={inputs.saleDate}
                      onChange={(e) => updateInput('saleDate', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={calculateValuation} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Stadium Valuation
          </Button>
        </div>

        {results && (
          <div className="mt-6 space-y-4">
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Valuation Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Income Approach:</span>
                    <span>${results.incomeApproach.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Approach:</span>
                    <span>${results.costApproach.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sales Comparison:</span>
                    <span>${results.salesComparison.value.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Final Valuation:</span>
                    <span>${results.finalValuation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Value per Seat:</span>
                    <span>${results.valuePerSeat.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Revenue per Seat:</span>
                    <span>${results.performanceMetrics.revenuePerSeat.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Operating Margin:</span>
                    <span>{results.performanceMetrics.operatingMargin.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Utilization Rate:</span>
                    <span>{results.performanceMetrics.utilizationRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NOI:</span>
                    <span>${results.incomeApproach.netOperatingIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cap Rate:</span>
                    <span>{results.incomeApproach.capitalizationRate.toFixed(2)}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SportsStadiumValuationForm;