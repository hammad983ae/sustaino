import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Calculator, DollarSign, BarChart3 } from "lucide-react";

interface HospitalityCommercialInputs {
  // Property Details
  propertyType: string;
  rooms: number;
  landArea: number;
  buildingArea: number;
  
  // Hotel/Motel Specific
  averageDailyRate: number;
  occupancyRate: number;
  
  // Revenue Streams
  roomRevenue: number;
  foodAndBeverage: number;
  conferenceAndEvents: number;
  spa: number;
  parking: number;
  otherRevenue: number;
  
  // Operating Expenses
  staffCosts: number;
  utilities: number;
  maintenance: number;
  marketing: number;
  insurance: number;
  management: number;
  other: number;
  
  // Valuation Assumptions
  capRate: number;
  discountRate: number;
  terminalCapRate: number;
  
  // Market Data
  revPAR: number;
  comparableRevPAR: number;
  marketGrowthRate: number;
}

interface HospitalityCommercialValuationFormProps {
  onSubmit: (data: any) => void;
}

const HospitalityCommercialValuationForm = ({ onSubmit }: HospitalityCommercialValuationFormProps) => {
  const [inputs, setInputs] = useState<HospitalityCommercialInputs>({
    propertyType: '',
    rooms: 0,
    landArea: 0,
    buildingArea: 0,
    averageDailyRate: 0,
    occupancyRate: 75,
    roomRevenue: 0,
    foodAndBeverage: 0,
    conferenceAndEvents: 0,
    spa: 0,
    parking: 0,
    otherRevenue: 0,
    staffCosts: 0,
    utilities: 0,
    maintenance: 0,
    marketing: 0,
    insurance: 0,
    management: 0,
    other: 0,
    capRate: 7.5,
    discountRate: 9.0,
    terminalCapRate: 8.0,
    revPAR: 0,
    comparableRevPAR: 0,
    marketGrowthRate: 3.5
  });

  const [results, setResults] = useState(null);

  const calculateValuation = () => {
    // Calculate RevPAR if not provided
    const calculatedRevPAR = inputs.revPAR || (inputs.averageDailyRate * (inputs.occupancyRate / 100));
    
    // Total Revenue
    const totalRevenue = 
      inputs.roomRevenue + 
      inputs.foodAndBeverage + 
      inputs.conferenceAndEvents + 
      inputs.spa + 
      inputs.parking + 
      inputs.otherRevenue;

    // Total Operating Expenses
    const totalExpenses = 
      inputs.staffCosts + 
      inputs.utilities + 
      inputs.maintenance + 
      inputs.marketing + 
      inputs.insurance + 
      inputs.management + 
      inputs.other;

    // Net Operating Income
    const netOperatingIncome = totalRevenue - totalExpenses;
    
    // Income Approach
    const incomeApproachValue = netOperatingIncome > 0 ? netOperatingIncome / (inputs.capRate / 100) : 0;

    // Room Method Valuation (specialized for hospitality)
    const revenuePerRoom = inputs.rooms > 0 ? totalRevenue / inputs.rooms : 0;
    const averageValuePerRoom = 150000; // Market average for hotel rooms
    const roomMethodValue = inputs.rooms * averageValuePerRoom;

    // RevPAR Multiple Method
    const revPARMultiple = 1000; // Average multiple in the market
    const revPARValue = calculatedRevPAR * revPARMultiple * inputs.rooms;

    // Financial Metrics
    const operatingMargin = totalRevenue > 0 ? (netOperatingIncome / totalRevenue) * 100 : 0;
    const revenuePerSquareMeter = inputs.buildingArea > 0 ? totalRevenue / inputs.buildingArea : 0;
    const gopar = calculatedRevPAR - (totalExpenses / (inputs.rooms * 365)); // Gross Operating Profit per Available Room

    // Final Valuation (weighted average)
    const weights = {
      income: 0.5,
      room: 0.3,
      revpar: 0.2
    };

    const finalValuation = 
      (incomeApproachValue * weights.income) + 
      (roomMethodValue * weights.room) + 
      (revPARValue * weights.revpar);

    const calculationResults = {
      incomeApproach: {
        totalRevenue,
        totalExpenses,
        netOperatingIncome,
        capitalizationRate: inputs.capRate,
        value: incomeApproachValue
      },
      roomMethod: {
        revenuePerRoom,
        averageValuePerRoom,
        totalRooms: inputs.rooms,
        value: roomMethodValue
      },
      revparMethod: {
        revPAR: calculatedRevPAR,
        multiple: revPARMultiple,
        value: revPARValue
      },
      financialMetrics: {
        operatingMargin,
        revenuePerSquareMeter,
        gopar,
        revPAR: calculatedRevPAR,
        occupancyRate: inputs.occupancyRate,
        averageDailyRate: inputs.averageDailyRate
      },
      finalValuation,
      valuePerRoom: inputs.rooms > 0 ? finalValuation / inputs.rooms : 0
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
          <ShoppingCart className="w-5 h-5" />
          Hospitality & Commercial Property Valuation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="property-details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="property-details">Property Details</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
            <TabsTrigger value="expenses">Operating Expenses</TabsTrigger>
            <TabsTrigger value="market-data">Market Data</TabsTrigger>
          </TabsList>

          <TabsContent value="property-details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select value={inputs.propertyType} onValueChange={(value) => updateInput('propertyType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="motel">Motel</SelectItem>
                        <SelectItem value="resort">Resort</SelectItem>
                        <SelectItem value="serviced-apartments">Serviced Apartments</SelectItem>
                        <SelectItem value="backpacker">Backpacker Hostel</SelectItem>
                        <SelectItem value="pub-hotel">Pub Hotel</SelectItem>
                        <SelectItem value="conference-center">Conference Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rooms">Number of Rooms</Label>
                    <Input
                      id="rooms"
                      type="number"
                      value={inputs.rooms || ''}
                      onChange={(e) => updateInput('rooms', Number(e.target.value))}
                    />
                  </div>
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
                  <CardTitle className="text-lg">Operational Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="averageDailyRate">Average Daily Rate ($)</Label>
                    <Input
                      id="averageDailyRate"
                      type="number"
                      step="0.01"
                      value={inputs.averageDailyRate || ''}
                      onChange={(e) => updateInput('averageDailyRate', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="occupancyRate">Occupancy Rate (%)</Label>
                    <Input
                      id="occupancyRate"
                      type="number"
                      step="0.1"
                      value={inputs.occupancyRate || ''}
                      onChange={(e) => updateInput('occupancyRate', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="revPAR">RevPAR ($ per available room)</Label>
                    <Input
                      id="revPAR"
                      type="number"
                      step="0.01"
                      value={inputs.revPAR || ''}
                      onChange={(e) => updateInput('revPAR', Number(e.target.value))}
                      placeholder="Auto-calculated if empty"
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
                    <Label htmlFor="roomRevenue">Room Revenue (Annual $)</Label>
                    <Input
                      id="roomRevenue"
                      type="number"
                      value={inputs.roomRevenue || ''}
                      onChange={(e) => updateInput('roomRevenue', Number(e.target.value))}
                    />
                  </div>
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ancillary Revenue</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="spa">Spa & Wellness ($)</Label>
                    <Input
                      id="spa"
                      type="number"
                      value={inputs.spa || ''}
                      onChange={(e) => updateInput('spa', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="parking">Parking Revenue ($)</Label>
                    <Input
                      id="parking"
                      type="number"
                      value={inputs.parking || ''}
                      onChange={(e) => updateInput('parking', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="otherRevenue">Other Revenue ($)</Label>
                    <Input
                      id="otherRevenue"
                      type="number"
                      value={inputs.otherRevenue || ''}
                      onChange={(e) => updateInput('otherRevenue', Number(e.target.value))}
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
                    <Label htmlFor="utilities">Utilities ($)</Label>
                    <Input
                      id="utilities"
                      type="number"
                      value={inputs.utilities || ''}
                      onChange={(e) => updateInput('utilities', Number(e.target.value))}
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Costs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Label htmlFor="insurance">Insurance ($)</Label>
                    <Input
                      id="insurance"
                      type="number"
                      value={inputs.insurance || ''}
                      onChange={(e) => updateInput('insurance', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="management">Management Fees ($)</Label>
                    <Input
                      id="management"
                      type="number"
                      value={inputs.management || ''}
                      onChange={(e) => updateInput('management', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="other">Other Expenses ($)</Label>
                    <Input
                      id="other"
                      type="number"
                      value={inputs.other || ''}
                      onChange={(e) => updateInput('other', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="market-data" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Valuation Assumptions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="capRate">Capitalization Rate (%)</Label>
                    <Input
                      id="capRate"
                      type="number"
                      step="0.1"
                      value={inputs.capRate || ''}
                      onChange={(e) => updateInput('capRate', Number(e.target.value))}
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Market Comparisons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="comparableRevPAR">Comparable RevPAR ($)</Label>
                    <Input
                      id="comparableRevPAR"
                      type="number"
                      step="0.01"
                      value={inputs.comparableRevPAR || ''}
                      onChange={(e) => updateInput('comparableRevPAR', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="marketGrowthRate">Market Growth Rate (%)</Label>
                    <Input
                      id="marketGrowthRate"
                      type="number"
                      step="0.1"
                      value={inputs.marketGrowthRate || ''}
                      onChange={(e) => updateInput('marketGrowthRate', Number(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={calculateValuation} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Hospitality Valuation
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
                    <span>Room Method:</span>
                    <span>${results.roomMethod.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RevPAR Method:</span>
                    <span>${results.revparMethod.value.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Final Valuation:</span>
                    <span>${results.finalValuation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Value per Room:</span>
                    <span>${results.valuePerRoom.toLocaleString()}</span>
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
                    <span>RevPAR:</span>
                    <span>${results.financialMetrics.revPAR.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GOPAR:</span>
                    <span>${results.financialMetrics.gopar.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Operating Margin:</span>
                    <span>{results.financialMetrics.operatingMargin.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue per sqm:</span>
                    <span>${results.financialMetrics.revenuePerSquareMeter.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NOI:</span>
                    <span>${results.incomeApproach.netOperatingIncome.toLocaleString()}</span>
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

export default HospitalityCommercialValuationForm;