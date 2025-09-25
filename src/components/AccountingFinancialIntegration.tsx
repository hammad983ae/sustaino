import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useReportData } from '@/contexts/ReportDataContext';
import { useStepVisibility } from '@/contexts/PAFConfigContext';
import FinancialAssessmentTools from './FinancialAssessmentTools';
import WeightedLMICalculator from './WeightedLMICalculator';
import { 
  Building2, 
  CreditCard, 
  FileSpreadsheet, 
  Shield, 
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Users,
  MapPin,
  BarChart3,
  PieChart,
  Target,
  FileText,
  Clock,
  Calculator
} from 'lucide-react';

interface FinancialData {
  accountingSoftware?: {
    connected: boolean;
    platform: string;
    lastSync?: string;
    revenue?: number;
    expenses?: number;
    profitMargin?: number;
  };
  creditAssessment?: {
    score?: number;
    rating?: string;
    riskLevel?: string;
    lastChecked?: string;
  };
  financialRatios?: {
    enabled: boolean;
    data: {
      liquidity: {
        currentRatio: number;
        quickRatio: number;
        workingCapital: number;
      };
      profitability: {
        netProfitMargin: number;
        returnOnAssets: number;
        returnOnEquity: number;
      };
      efficiency: {
        assetTurnover: number;
        receivablesTurnover: number;
        inventoryTurnover: number;
      };
      leverage: {
        debtToEquity: number;
        interestCoverage: number;
        debtServiceCoverage: number;
      };
    };
  };
  governmentData?: {
    atoConnected: boolean;
    asicConnected: boolean;
    businessNumbers?: string[];
    complianceStatus?: string;
    taxReturns?: any[];
  };
  bankingData?: {
    connected: boolean;
    bankName?: string;
    accountBalance?: number;
    transactionVolume?: number;
  };
}

const AccountingFinancialIntegration: React.FC = () => {
  // Financial Ratios Benchmarks (moved from EPAT)
  const FINANCIAL_BENCHMARKS = {
    excellent: {
      liquidity: { currentRatio: 2.5, quickRatio: 1.5, workingCapital: 500000 },
      profitability: { netProfitMargin: 20, returnOnAssets: 15, returnOnEquity: 25 },
      efficiency: { assetTurnover: 2.0, receivablesTurnover: 12, inventoryTurnover: 8 },
      leverage: { debtToEquity: 0.3, interestCoverage: 10, debtServiceCoverage: 2.5 },
    },
    good: {
      liquidity: { currentRatio: 2.0, quickRatio: 1.2, workingCapital: 200000 },
      profitability: { netProfitMargin: 15, returnOnAssets: 10, returnOnEquity: 18 },
      efficiency: { assetTurnover: 1.5, receivablesTurnover: 8, inventoryTurnover: 6 },
      leverage: { debtToEquity: 0.5, interestCoverage: 6, debtServiceCoverage: 2.0 },
    },
    average: {
      liquidity: { currentRatio: 1.5, quickRatio: 1.0, workingCapital: 50000 },
      profitability: { netProfitMargin: 10, returnOnAssets: 6, returnOnEquity: 12 },
      efficiency: { assetTurnover: 1.0, receivablesTurnover: 6, inventoryTurnover: 4 },
      leverage: { debtToEquity: 0.8, interestCoverage: 3, debtServiceCoverage: 1.5 },
    },
  };
  const { shouldRender } = useStepVisibility('accountancy_financials');
  const { updateReportData, reportData } = useReportData();
  const { toast } = useToast();
  
  const [financialData, setFinancialData] = useState<FinancialData>({});
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [manualData, setManualData] = useState({
    revenue: '',
    expenses: '',
    creditScore: '',
    businessNumber: '',
    notes: ''
  });

  useEffect(() => {
    if (reportData?.accountingFinancials) {
      setFinancialData(reportData.accountingFinancials);
}

// Financial Ratios Benchmarks
const FINANCIAL_BENCHMARKS = {
  excellent: {
    liquidity: { currentRatio: 2.5, quickRatio: 1.5, workingCapital: 500000 },
    profitability: { netProfitMargin: 20, returnOnAssets: 15, returnOnEquity: 25 },
    efficiency: { assetTurnover: 2.0, receivablesTurnover: 12, inventoryTurnover: 8 },
    leverage: { debtToEquity: 0.3, interestCoverage: 10, debtServiceCoverage: 2.5 },
  },
  good: {
    liquidity: { currentRatio: 2.0, quickRatio: 1.2, workingCapital: 200000 },
    profitability: { netProfitMargin: 15, returnOnAssets: 10, returnOnEquity: 18 },
    efficiency: { assetTurnover: 1.5, receivablesTurnover: 8, inventoryTurnover: 6 },
    leverage: { debtToEquity: 0.5, interestCoverage: 6, debtServiceCoverage: 2.0 },
  },
  average: {
    liquidity: { currentRatio: 1.5, quickRatio: 1.0, workingCapital: 50000 },
    profitability: { netProfitMargin: 10, returnOnAssets: 6, returnOnEquity: 12 },
    efficiency: { assetTurnover: 1.0, receivablesTurnover: 6, inventoryTurnover: 4 },
    leverage: { debtToEquity: 0.8, interestCoverage: 3, debtServiceCoverage: 1.5 },
  },
};

  }, [reportData]);

  if (!shouldRender) return null;

  const handleConnectPlatform = async (platform: string) => {
    setIsConnecting(platform);
    
    // Simulate connection process
    setTimeout(() => {
      const updates: FinancialData = { ...financialData };
      
      switch (platform) {
        case 'xero':
          updates.accountingSoftware = {
            connected: true,
            platform: 'Xero',
            lastSync: new Date().toISOString(),
            revenue: 125000,
            expenses: 87000,
            profitMargin: 30.4
          };
          break;
        case 'equifax':
          updates.creditAssessment = {
            score: 785,
            rating: 'Excellent',
            riskLevel: 'Low',
            lastChecked: new Date().toISOString()
          };
          break;
        case 'ato':
          updates.governmentData = {
            atoConnected: true,
            asicConnected: false,
            businessNumbers: ['ABN 12 345 678 901'],
            complianceStatus: 'Compliant'
          };
          break;
        case 'banking':
          updates.bankingData = {
            connected: true,
            bankName: 'Commonwealth Bank',
            accountBalance: 45000,
            transactionVolume: 125000
          };
          break;
      }
      
      setFinancialData(updates);
      updateReportData('accountingFinancials', updates);
      setIsConnecting(null);
      
      toast({
        title: "Connection Successful",
        description: `Connected to ${platform} successfully`,
      });
    }, 2000);
  };

  const handleManualDataSubmit = () => {
    const updates: FinancialData = {
      ...financialData,
      accountingSoftware: {
        connected: false,
        platform: 'Manual Entry',
        revenue: parseFloat(manualData.revenue) || 0,
        expenses: parseFloat(manualData.expenses) || 0,
        profitMargin: parseFloat(manualData.revenue) && parseFloat(manualData.expenses) 
          ? ((parseFloat(manualData.revenue) - parseFloat(manualData.expenses)) / parseFloat(manualData.revenue)) * 100 
          : 0
      },
      creditAssessment: {
        score: parseInt(manualData.creditScore) || 0,
        rating: parseInt(manualData.creditScore) >= 750 ? 'Excellent' : 
               parseInt(manualData.creditScore) >= 650 ? 'Good' : 'Fair',
        riskLevel: parseInt(manualData.creditScore) >= 700 ? 'Low' : 'Medium'
      }
    };
    
    setFinancialData(updates);
    updateReportData('accountingFinancials', updates);
    
    toast({
      title: "Data Saved",
      description: "Manual financial data has been saved",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Accounting & Financial Integration
          </CardTitle>
          <CardDescription>
            Connect to accounting software, government portals, and financial services for comprehensive data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="assessment">Financial Assessment</TabsTrigger>
          <TabsTrigger value="lmi">Weighted LMI</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

            <TabsContent value="integrations" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Accounting Software */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      Accounting Software
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Xero</span>
                      {financialData.accountingSoftware?.connected && financialData.accountingSoftware?.platform === 'Xero' ? (
                        <Badge variant="default">Connected</Badge>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleConnectPlatform('xero')}
                          disabled={isConnecting === 'xero'}
                        >
                          {isConnecting === 'xero' ? <RefreshCw className="h-3 w-3 animate-spin" /> : 'Connect'}
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>QuickBooks</span>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>MYOB</span>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Credit Assessment */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Credit Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Equifax</span>
                      {financialData.creditAssessment?.score ? (
                        <Badge variant="default">Connected</Badge>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleConnectPlatform('equifax')}
                          disabled={isConnecting === 'equifax'}
                        >
                          {isConnecting === 'equifax' ? <RefreshCw className="h-3 w-3 animate-spin" /> : 'Check Credit'}
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Experian</span>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Government Portals */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Government Portals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>ATO</span>
                      {financialData.governmentData?.atoConnected ? (
                        <Badge variant="default">Connected</Badge>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleConnectPlatform('ato')}
                          disabled={isConnecting === 'ato'}
                        >
                          {isConnecting === 'ato' ? <RefreshCw className="h-3 w-3 animate-spin" /> : 'Connect'}
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>ASIC</span>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Banking */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Banking Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Open Banking</span>
                      {financialData.bankingData?.connected ? (
                        <Badge variant="default">Connected</Badge>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleConnectPlatform('banking')}
                          disabled={isConnecting === 'banking'}
                        >
                          {isConnecting === 'banking' ? <RefreshCw className="h-3 w-3 animate-spin" /> : 'Connect'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="revenue">Annual Revenue ($)</Label>
                    <Input
                      id="revenue"
                      type="number"
                      value={manualData.revenue}
                      onChange={(e) => setManualData(prev => ({ ...prev, revenue: e.target.value }))}
                      placeholder="Enter annual revenue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expenses">Annual Expenses ($)</Label>
                    <Input
                      id="expenses"
                      type="number"
                      value={manualData.expenses}
                      onChange={(e) => setManualData(prev => ({ ...prev, expenses: e.target.value }))}
                      placeholder="Enter annual expenses"
                    />
                  </div>
                  <div>
                    <Label htmlFor="creditScore">Credit Score</Label>
                    <Input
                      id="creditScore"
                      type="number"
                      value={manualData.creditScore}
                      onChange={(e) => setManualData(prev => ({ ...prev, creditScore: e.target.value }))}
                      placeholder="Enter credit score"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessNumber">Business Number (ABN/ACN)</Label>
                    <Input
                      id="businessNumber"
                      value={manualData.businessNumber}
                      onChange={(e) => setManualData(prev => ({ ...prev, businessNumber: e.target.value }))}
                      placeholder="Enter ABN or ACN"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={manualData.notes}
                      onChange={(e) => setManualData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any additional financial information"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleManualDataSubmit} className="w-full">
                    Save Manual Data
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assessment" className="space-y-4">
              <FinancialAssessmentTools />
            </TabsContent>

            <TabsContent value="lmi" className="space-y-4">
              <WeightedLMICalculator />
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              {/* Key Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Financial Health Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">78/100</div>
                    <p className="text-sm text-muted-foreground">Above Average</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Employment Risk
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Low</div>
                    <p className="text-sm text-muted-foreground">Stable profession</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Career Stage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">Peak</div>
                    <p className="text-sm text-muted-foreground">7-year tenure</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Age Demographics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32 years</div>
                    <p className="text-sm text-muted-foreground">Prime earning age</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Geographic Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">85/100</div>
                    <p className="text-sm text-muted-foreground">High opportunity area</p>
                  </CardContent>
                </Card>
              </div>

              {/* Employment Risk Analysis - New Section */}
              <Card className="border-orange-200 bg-orange-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Users className="h-5 w-5" />
                    Employment Risk Assessment™
                    <Badge variant="outline" className="text-xs ml-2">Patent Pending</Badge>
                  </CardTitle>
                  <CardDescription className="text-orange-600">
                    Comprehensive employment stability analysis affecting loan risk and LVR calculations
                    <div className="text-xs mt-1 text-muted-foreground">
                      © 2024 Powered™. Employment Risk Assessment System™ - All Rights Reserved. Patent Pending.
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Occupation Analysis */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Badge className="h-5 w-5" />
                        Occupation Analysis™
                        <span className="text-xs text-muted-foreground ml-1">©</span>
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Role</span>
                          <span className="font-medium">Senior Software Engineer</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Industry</span>
                          <span className="font-medium">Technology</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tenure</span>
                          <span className="font-medium text-green-600">7 years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Employment Type</span>
                          <span className="font-medium">Permanent Full-time</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Recession Resilience</span>
                          <Badge variant="default" className="h-5">High</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Career Maturity Stage */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Career Maturity Stage™
                        <span className="text-xs text-muted-foreground ml-1">®</span>
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stage</span>
                          <Badge variant="default" className="h-5">Peak Performance</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Experience Level</span>
                          <span className="font-medium">10+ years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Skill Demand</span>
                          <span className="font-medium text-green-600">Very High</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Promotion Potential</span>
                          <span className="font-medium text-blue-600">Strong</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Market Mobility</span>
                          <Badge variant="default" className="h-5">Excellent</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Employment Risk Factors */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Risk Factors & Stability™
                        <span className="text-xs text-muted-foreground ml-1">©</span>
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Overall Risk</span>
                          <Badge variant="default" className="h-5">Low</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Job Security</span>
                          <span className="font-medium text-green-600">95%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Industry Volatility</span>
                          <span className="font-medium">Low</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Skills Obsolescence</span>
                          <span className="font-medium text-green-600">Very Low</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Automation Risk</span>
                          <Badge variant="outline" className="h-5">Minimal</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Employment History Timeline */}
                  <div className="mt-6">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Employment History & Stability™
                      <span className="text-xs text-muted-foreground ml-1">© Powered™</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 p-3 bg-white rounded-lg border">
                        <div className="text-sm font-medium">2017-Present</div>
                        <div className="flex-1">
                          <div className="font-medium">Senior Software Engineer - TechCorp Australia</div>
                          <div className="text-sm text-muted-foreground">7 years • Permanent • No gaps</div>
                        </div>
                        <Badge variant="default">Current</Badge>
                      </div>
                      <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border">
                        <div className="text-sm font-medium">2015-2017</div>
                        <div className="flex-1">
                          <div className="font-medium">Software Developer - StartupXYZ</div>
                          <div className="text-sm text-muted-foreground">2 years • Permanent • Career progression</div>
                        </div>
                        <Badge variant="outline">Previous</Badge>
                      </div>
                      <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border">
                        <div className="text-sm font-medium">2013-2015</div>
                        <div className="flex-1">
                          <div className="font-medium">Junior Developer - WebSolutions</div>
                          <div className="text-sm text-muted-foreground">2 years • Permanent • Entry level</div>
                        </div>
                        <Badge variant="outline">Graduate</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Performance Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Financial Performance vs Benchmarks™
                      <span className="text-xs text-muted-foreground ml-2">© 2024</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Revenue Growth</span>
                          <span className="text-sm font-medium">+12% vs +8% avg</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Profit Margin</span>
                          <span className="text-sm font-medium">18% vs 15% avg</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Cash Flow</span>
                          <span className="text-sm font-medium">Positive vs 65% avg</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Age vs Earning Potential™
                      <span className="text-xs text-muted-foreground ml-2">Patent Pending</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current Age: 32</span>
                        <Badge variant="default">Peak Earning Years</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Current Income</span>
                          <span className="font-medium">$85,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Age Group Average</span>
                          <span className="font-medium">$72,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Projected at 40</span>
                          <span className="font-medium text-green-600">$115,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Lifetime Potential</span>
                          <span className="font-medium text-blue-600">$2.8M</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Geographic and Industry Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Geographic Statistics™
                      <span className="text-xs text-muted-foreground ml-2">© Powered™</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="font-medium">Sydney, NSW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Median Income</span>
                      <span className="font-medium">$78,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Cost of Living Index</span>
                      <span className="font-medium">112.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Employment Rate</span>
                      <span className="font-medium text-green-600">96.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Industry Growth</span>
                      <span className="font-medium text-blue-600">+8.5%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Employment-Adjusted Risk & LVR Impact™
                      <Badge variant="outline" className="text-xs ml-2">Patent Pending</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="font-medium text-green-800 mb-2">
                        Employment Risk Bonus™ 
                        <span className="text-xs text-muted-foreground ml-1">© 2024</span>
                      </div>
                      <div className="text-sm text-green-700 space-y-1">
                        <div>• Stable 7-year tenure: +5% LVR allowance</div>
                        <div>• Recession-proof industry: +3% LVR allowance</div>
                        <div>• Peak career stage: +2% LVR allowance</div>
                        <div>• No employment gaps: +2% LVR allowance</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-sm text-muted-foreground">Standard LVR</div>
                        <div className="text-xl font-bold">80%</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm text-green-600">Employment-Adjusted LVR</div>
                        <div className="text-xl font-bold text-green-600">92%</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Interest Rate Reduction</span>
                      <Badge variant="default" className="h-5">-0.25% p.a.</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Approval Probability</span>
                      <span className="font-medium text-green-600">96%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Alternative Career Options™
                      <span className="text-xs text-muted-foreground ml-2">® Powered™</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Freelance Consulting</span>
                        <span className="text-sm text-green-600">+40% Income</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Tech Leadership Role</span>
                        <span className="text-sm text-blue-600">+25% Income</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Side Product Development</span>
                        <span className="text-sm text-purple-600">Passive Income</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Industry Mentoring</span>
                        <span className="text-sm text-emerald-600">Stable Add-on</span>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-800">
                        Career Progression Path™
                        <span className="text-xs text-muted-foreground ml-1">© Powered™</span>
                      </div>
                      <div className="text-sm text-blue-700 mt-1">
                        Next 5 years: Technical Lead → Engineering Manager
                        <br />Expected salary: $140,000 - $180,000
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      View Career Strategy Analysis
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Financial Data */}
              {(financialData.accountingSoftware || financialData.creditAssessment || financialData.governmentData) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Connected Data Summary™
                      <span className="text-xs text-muted-foreground ml-2">© 2024 Powered™</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {financialData.accountingSoftware && (
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Financial Overview
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Revenue</span>
                              <span className="font-medium">${financialData.accountingSoftware.revenue?.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Expenses</span>
                              <span className="font-medium">${financialData.accountingSoftware.expenses?.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Profit Margin</span>
                              <span className="font-medium">{financialData.accountingSoftware.profitMargin?.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {financialData.creditAssessment && (
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Credit Assessment
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Score</span>
                              <span className="font-medium">{financialData.creditAssessment.score}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Rating</span>
                              <Badge variant="outline" className="h-5">{financialData.creditAssessment.rating}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Risk</span>
                              <Badge variant={financialData.creditAssessment.riskLevel === 'Low' ? 'default' : 'secondary'} className="h-5">
                                {financialData.creditAssessment.riskLevel}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )}

                      {financialData.governmentData && (
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Compliance Status
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">ATO</span>
                              <Badge variant={financialData.governmentData.atoConnected ? 'default' : 'secondary'} className="h-5">
                                {financialData.governmentData.atoConnected ? 'Connected' : 'Not Connected'}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status</span>
                              <Badge variant="default" className="h-5">{financialData.governmentData.complianceStatus}</Badge>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Financial Ratios Analysis Tab */}
            <TabsContent value="financial-ratios" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Financial Ratios Analysis™
                    <Badge variant="outline" className="text-xs">© 2024 Powered™</Badge>
                  </CardTitle>
                  <CardDescription>
                    Optional comprehensive financial ratio analysis for employment risk assessment
                  </CardDescription>
                  <div className="flex items-center space-x-2 mt-4">
                    <Switch
                      id="enable-financial-ratios"
                      checked={financialData.financialRatios?.enabled || false}
                      onCheckedChange={(checked) => 
                        setFinancialData(prev => ({
                          ...prev,
                          financialRatios: {
                            ...prev.financialRatios!,
                            enabled: checked
                          }
                        }))
                      }
                    />
                    <Label htmlFor="enable-financial-ratios">
                      Include Financial Ratios Analysis in Assessment
                    </Label>
                  </div>
                </CardHeader>

                {financialData.financialRatios?.enabled && (
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Liquidity Card */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Liquidity</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label>Current Ratio</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={financialData.financialRatios.data.liquidity.currentRatio}
                              onChange={(e) => setFinancialData(prev => ({
                                ...prev,
                                financialRatios: {
                                  ...prev.financialRatios!,
                                  data: {
                                    ...prev.financialRatios!.data,
                                    liquidity: { 
                                      ...prev.financialRatios!.data.liquidity, 
                                      currentRatio: Number(e.target.value) 
                                    }
                                  }
                                }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>Quick Ratio</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={financialData.financialRatios.data.liquidity.quickRatio}
                              onChange={(e) => setFinancialData(prev => ({
                                ...prev,
                                financialRatios: {
                                  ...prev.financialRatios!,
                                  data: {
                                    ...prev.financialRatios!.data,
                                    liquidity: { 
                                      ...prev.financialRatios!.data.liquidity, 
                                      quickRatio: Number(e.target.value) 
                                    }
                                  }
                                }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>Working Capital</Label>
                            <Input
                              type="number"
                              value={financialData.financialRatios.data.liquidity.workingCapital}
                              onChange={(e) => setFinancialData(prev => ({
                                ...prev,
                                financialRatios: {
                                  ...prev.financialRatios!,
                                  data: {
                                    ...prev.financialRatios!.data,
                                    liquidity: { 
                                      ...prev.financialRatios!.data.liquidity, 
                                      workingCapital: Number(e.target.value) 
                                    }
                                  }
                                }
                              }))}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Profitability Card */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Profitability</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label>Net Profit Margin (%)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={financialData.financialRatios.data.profitability.netProfitMargin}
                              onChange={(e) => setFinancialData(prev => ({
                                ...prev,
                                financialRatios: {
                                  ...prev.financialRatios!,
                                  data: {
                                    ...prev.financialRatios!.data,
                                    profitability: { 
                                      ...prev.financialRatios!.data.profitability, 
                                      netProfitMargin: Number(e.target.value) 
                                    }
                                  }
                                }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>Return on Assets (%)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={financialData.financialRatios.data.profitability.returnOnAssets}
                              onChange={(e) => setFinancialData(prev => ({
                                ...prev,
                                financialRatios: {
                                  ...prev.financialRatios!,
                                  data: {
                                    ...prev.financialRatios!.data,
                                    profitability: { 
                                      ...prev.financialRatios!.data.profitability, 
                                      returnOnAssets: Number(e.target.value) 
                                    }
                                  }
                                }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>Return on Equity (%)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={financialData.financialRatios.data.profitability.returnOnEquity}
                              onChange={(e) => setFinancialData(prev => ({
                                ...prev,
                                financialRatios: {
                                  ...prev.financialRatios!,
                                  data: {
                                    ...prev.financialRatios!.data,
                                    profitability: { 
                                      ...prev.financialRatios!.data.profitability, 
                                      returnOnEquity: Number(e.target.value) 
                                    }
                                  }
                                }
                              }))}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Efficiency Card */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Efficiency</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label>Asset Turnover</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={financialData.financialRatios.data.efficiency.assetTurnover}
                              onChange={(e) => setFinancialData(prev => ({
                                ...prev,
                                financialRatios: {
                                  ...prev.financialRatios!,
                                  data: {
                                    ...prev.financialRatios!.data,
                                    efficiency: { 
                                      ...prev.financialRatios!.data.efficiency, 
                                      assetTurnover: Number(e.target.value) 
                                    }
                                  }
                                }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>Receivables Turnover</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={financialData.financialRatios.data.efficiency.receivablesTurnover}
                              onChange={(e) => setFinancialData(prev => ({
                                ...prev,
                                financialRatios: {
                                  ...prev.financialRatios!,
                                  data: {
                                    ...prev.financialRatios!.data,
                                    efficiency: { 
                                      ...prev.financialRatios!.data.efficiency, 
                                      receivablesTurnover: Number(e.target.value) 
                                    }
                                  }
                                }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>Inventory Turnover</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={financialData.financialRatios.data.efficiency.inventoryTurnover}
                              onChange={(e) => setFinancialData(prev => ({
                                ...prev,
                                financialRatios: {
                                  ...prev.financialRatios!,
                                  data: {
                                    ...prev.financialRatios!.data,
                                    efficiency: { 
                                      ...prev.financialRatios!.data.efficiency, 
                                      inventoryTurnover: Number(e.target.value) 
                                    }
                                  }
                                }
                              }))}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Leverage Card */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Leverage</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label>Debt to Equity</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={financialData.financialRatios.data.leverage.debtToEquity}
                              onChange={(e) => setFinancialData(prev => ({
                                ...prev,
                                financialRatios: {
                                  ...prev.financialRatios!,
                                  data: {
                                    ...prev.financialRatios!.data,
                                    leverage: { 
                                      ...prev.financialRatios!.data.leverage, 
                                      debtToEquity: Number(e.target.value) 
                                    }
                                  }
                                }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>Interest Coverage</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={financialData.financialRatios.data.leverage.interestCoverage}
                              onChange={(e) => setFinancialData(prev => ({
                                ...prev,
                                financialRatios: {
                                  ...prev.financialRatios!,
                                  data: {
                                    ...prev.financialRatios!.data,
                                    leverage: { 
                                      ...prev.financialRatios!.data.leverage, 
                                      interestCoverage: Number(e.target.value) 
                                    }
                                  }
                                }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>Debt Service Coverage</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={financialData.financialRatios.data.leverage.debtServiceCoverage}
                              onChange={(e) => setFinancialData(prev => ({
                                ...prev,
                                financialRatios: {
                                  ...prev.financialRatios!,
                                  data: {
                                    ...prev.financialRatios!.data,
                                    leverage: { 
                                      ...prev.financialRatios!.data.leverage, 
                                      debtServiceCoverage: Number(e.target.value) 
                                    }
                                  }
                                }
                              }))}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Financial Health Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Financial Health Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Liquidity Score:</span>
                              <Badge variant="outline">
                                {Math.round((
                                  (financialData.financialRatios.data.liquidity.currentRatio >= FINANCIAL_BENCHMARKS.good.liquidity.currentRatio ? 80 : 50) +
                                  (financialData.financialRatios.data.liquidity.quickRatio >= FINANCIAL_BENCHMARKS.good.liquidity.quickRatio ? 80 : 50) +
                                  (financialData.financialRatios.data.liquidity.workingCapital >= FINANCIAL_BENCHMARKS.good.liquidity.workingCapital ? 80 : 50)
                                ) / 3)}%
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Profitability Score:</span>
                              <Badge variant="outline">
                                {Math.round((
                                  (financialData.financialRatios.data.profitability.netProfitMargin >= FINANCIAL_BENCHMARKS.good.profitability.netProfitMargin ? 80 : 50) +
                                  (financialData.financialRatios.data.profitability.returnOnAssets >= FINANCIAL_BENCHMARKS.good.profitability.returnOnAssets ? 80 : 50) +
                                  (financialData.financialRatios.data.profitability.returnOnEquity >= FINANCIAL_BENCHMARKS.good.profitability.returnOnEquity ? 80 : 50)
                                ) / 3)}%
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Risk Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Credit Risk:</span>
                              <Badge variant={financialData.financialRatios.data.leverage.debtToEquity > 0.8 ? 'destructive' : 'default'}>
                                {financialData.financialRatios.data.leverage.debtToEquity > 0.8 ? 'High' : 'Low'}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Operational Risk:</span>
                              <Badge variant={financialData.financialRatios.data.efficiency.assetTurnover < 1 ? 'destructive' : 'default'}>
                                {financialData.financialRatios.data.efficiency.assetTurnover < 1 ? 'High' : 'Low'}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountingFinancialIntegration;