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
import { 
  Building2, 
  CreditCard, 
  FileSpreadsheet, 
  Shield, 
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  RefreshCw
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
  governmentData?: {
    atoConnected: boolean;
    asicConnected: boolean;
    businessNumbers?: string[];
    complianceStatus?: string;
  };
  bankingData?: {
    connected: boolean;
    bankName?: string;
    accountBalance?: number;
    transactionVolume?: number;
  };
}

const AccountingFinancialIntegration: React.FC = () => {
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="assessment">Financial Assessment</TabsTrigger>
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

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {financialData.accountingSoftware && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Financial Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Revenue</span>
                        <span className="font-medium">${financialData.accountingSoftware.revenue?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Expenses</span>
                        <span className="font-medium">${financialData.accountingSoftware.expenses?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Profit Margin</span>
                        <span className="font-medium">{financialData.accountingSoftware.profitMargin?.toFixed(1)}%</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {financialData.creditAssessment && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Credit Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Score</span>
                        <span className="font-medium">{financialData.creditAssessment.score}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Rating</span>
                        <Badge variant="outline">{financialData.creditAssessment.rating}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Risk</span>
                        <Badge variant={financialData.creditAssessment.riskLevel === 'Low' ? 'default' : 'secondary'}>
                          {financialData.creditAssessment.riskLevel}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {financialData.governmentData && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Compliance Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">ATO</span>
                        <Badge variant={financialData.governmentData.atoConnected ? 'default' : 'secondary'}>
                          {financialData.governmentData.atoConnected ? 'Connected' : 'Not Connected'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge variant="default">{financialData.governmentData.complianceStatus}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountingFinancialIntegration;