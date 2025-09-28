import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Users, 
  Activity, 
  Settings, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  ArrowUpRight,
  Link,
  Database,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Integration {
  id: string;
  institution_name: string;
  institution_type: 'lender' | 'broker' | 'valuer' | 'professional_service' | 'government' | 'accounting' | 'settlement' | 'credit_bureau' | 'registry' | 'legal_tech';
  connection_status: 'connected' | 'pending' | 'failed' | 'inactive';
  api_endpoint?: string;
  data_flows: any[];
  last_sync: string;
  monthly_transactions: number;
  compliance_status: 'compliant' | 'requires_review' | 'non_compliant';
}

export const IntegrationPlatformDashboard = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      // Sample data for demonstration
      const sampleData: Integration[] = [
        {
          id: '1',
          institution_name: 'Commonwealth Bank',
          institution_type: 'lender',
          connection_status: 'connected',
          api_endpoint: 'https://api.commbank.com.au/v1',
          data_flows: ['loan_applications', 'credit_assessments', 'property_valuations'],
          last_sync: new Date().toISOString(),
          monthly_transactions: 1250,
          compliance_status: 'compliant'
        },
        {
          id: '2',
          institution_name: 'PEXA',
          institution_type: 'settlement',
          connection_status: 'connected',
          api_endpoint: 'https://api.pexa.com.au/v3',
          data_flows: ['settlement_coordination', 'document_exchange', 'funds_transfer'],
          last_sync: new Date().toISOString(),
          monthly_transactions: 2100,
          compliance_status: 'compliant'
        },
        {
          id: '3',
          institution_name: 'ASIC Registry',
          institution_type: 'government',
          connection_status: 'connected',
          api_endpoint: 'https://api.asic.gov.au/company-search',
          data_flows: ['company_searches', 'director_checks', 'business_verification'],
          last_sync: new Date().toISOString(),
          monthly_transactions: 850,
          compliance_status: 'compliant'
        },
        {
          id: '4',
          institution_name: 'Equifax',
          institution_type: 'credit_bureau',
          connection_status: 'connected',
          api_endpoint: 'https://api.equifax.com.au/credit-check',
          data_flows: ['credit_reports', 'identity_verification', 'risk_assessment'],
          last_sync: new Date().toISOString(),
          monthly_transactions: 1650,
          compliance_status: 'compliant'
        },
        {
          id: '5',
          institution_name: 'Xero',
          institution_type: 'accounting',
          connection_status: 'connected',
          api_endpoint: 'https://api.xero.com/api.xro/2.0',
          data_flows: ['financial_statements', 'income_verification', 'transaction_history'],
          last_sync: new Date().toISOString(),
          monthly_transactions: 950,
          compliance_status: 'compliant'
        },
        {
          id: '6',
          institution_name: 'Land Registry NSW',
          institution_type: 'registry',
          connection_status: 'connected',
          api_endpoint: 'https://api.nswlrs.com.au/property',
          data_flows: ['title_searches', 'property_details', 'ownership_history'],
          last_sync: new Date().toISOString(),
          monthly_transactions: 780,
          compliance_status: 'compliant'
        },
        {
          id: '7',
          institution_name: 'Australian Taxation Office',
          institution_type: 'government',
          connection_status: 'pending',
          api_endpoint: 'https://api.ato.gov.au/income-verification',
          data_flows: ['income_verification', 'tax_assessments', 'compliance_checks'],
          last_sync: new Date().toISOString(),
          monthly_transactions: 0,
          compliance_status: 'requires_review'
        },
        {
          id: '8',
          institution_name: 'InfoTrack',
          institution_type: 'legal_tech',
          connection_status: 'connected',
          api_endpoint: 'https://api.infotrack.com.au/legal-services',
          data_flows: ['document_lodgements', 'search_services', 'verification_checks'],
          last_sync: new Date().toISOString(),
          monthly_transactions: 1200,
          compliance_status: 'compliant'
        },
        {
          id: '9',
          institution_name: 'MYOB',
          institution_type: 'accounting',
          connection_status: 'connected',
          api_endpoint: 'https://api.myob.com/accountright/v2',
          data_flows: ['business_financials', 'payroll_data', 'cash_flow_analysis'],
          last_sync: new Date().toISOString(),
          monthly_transactions: 540,
          compliance_status: 'compliant'
        },
        {
          id: '10',
          institution_name: 'Mortgage Choice',
          institution_type: 'broker',
          connection_status: 'connected',
          api_endpoint: 'https://api.mortgagechoice.com.au/v2',
          data_flows: ['broker_submissions', 'client_referrals', 'progress_updates'],
          last_sync: new Date().toISOString(),
          monthly_transactions: 890,
          compliance_status: 'compliant'
        }
      ];
      
      setIntegrations(sampleData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch integrations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInstitutionTypeIcon = (type: string) => {
    switch (type) {
      case 'lender': return <Building2 className="h-5 w-5" />;
      case 'broker': return <Users className="h-5 w-5" />;
      case 'valuer': return <Activity className="h-5 w-5" />;
      case 'government': return <Shield className="h-5 w-5" />;
      case 'accounting': return <Database className="h-5 w-5" />;
      case 'settlement': return <ArrowUpRight className="h-5 w-5" />;
      case 'credit_bureau': return <CheckCircle className="h-5 w-5" />;
      case 'registry': return <Database className="h-5 w-5" />;
      case 'legal_tech': return <Settings className="h-5 w-5" />;
      default: return <Settings className="h-5 w-5" />;
    }
  };

  const statsCards = [
    {
      title: "Total Integrations",
      value: integrations.length.toString(),
      icon: <Link className="h-5 w-5" />,
      description: "Active platform connections"
    },
    {
      title: "Government Services",
      value: integrations.filter(i => ['government', 'registry'].includes(i.institution_type) && i.connection_status === 'connected').length.toString(),
      icon: <Shield className="h-5 w-5" />,
      description: "ATO, ASIC, Land Registry connections"
    },
    {
      title: "Settlement & Legal",
      value: integrations.filter(i => ['settlement', 'legal_tech'].includes(i.institution_type) && i.connection_status === 'connected').length.toString(),
      icon: <ArrowUpRight className="h-5 w-5" />,
      description: "PEXA & legal technology platforms"
    },
    {
      title: "Monthly Transactions",
      value: integrations.reduce((sum, i) => sum + i.monthly_transactions, 0).toLocaleString(),
      icon: <Activity className="h-5 w-5" />,
      description: "Cross-platform transactions"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Integration Platform</h1>
          <p className="text-muted-foreground mt-2">
            Connect financial institutions, brokers, and professional services to the Powered Platform
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Integration
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="dataflows">Data Flows</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <Building2 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold">Financial Institutions</h3>
                  <p className="text-sm text-muted-foreground">Banks, Credit Unions, Alternative Lenders</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold">Powered Platform</h3>
                  <p className="text-sm text-muted-foreground">Central Integration Hub</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold">Professional Services</h3>
                  <p className="text-sm text-muted-foreground">Brokers, Valuers, Legal Services</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : integrations.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Link className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Integrations Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Connect your first financial institution or professional service
                </p>
                <Button className="flex items-center gap-2 mx-auto">
                  <Plus className="h-4 w-4" />
                  Add First Integration
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration) => (
                <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {getInstitutionTypeIcon(integration.institution_type)}
                        <div>
                          <CardTitle className="text-lg">{integration.institution_name}</CardTitle>
                          <p className="text-sm text-muted-foreground capitalize">
                            {integration.institution_type.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(integration.connection_status)}>
                        {integration.connection_status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Monthly Volume</p>
                        <p className="font-semibold">{integration.monthly_transactions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Sync</p>
                        <p className="font-semibold">{new Date(integration.last_sync).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Data Flows</p>
                      <div className="flex flex-wrap gap-1">
                        {integration.data_flows.map((flow, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {flow}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Monitor
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {integration.compliance_status === 'compliant' ? (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      ) : integration.compliance_status === 'requires_review' ? (
                        <Clock className="h-3 w-3 text-yellow-500" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-red-500" />
                      )}
                      Compliance: {integration.compliance_status.replace('_', ' ')}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="dataflows">
          <Card>
            <CardHeader>
              <CardTitle>Data Flow Management</CardTitle>
              <p className="text-muted-foreground">
                Monitor and manage data flows between integrated platforms
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Inbound Flows</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Loan Applications</span>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Valuation Requests</span>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Credit Assessments</span>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Outbound Flows</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Property Valuations</span>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Progress Reports</span>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Compliance Updates</span>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Compliance & Security
              </CardTitle>
              <p className="text-muted-foreground">
                Monitor regulatory compliance and security standards across all integrations
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold text-green-700">
                    {integrations.filter(i => i.compliance_status === 'compliant').length}
                  </h3>
                  <p className="text-sm text-muted-foreground">Compliant</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <h3 className="font-semibold text-yellow-700">
                    {integrations.filter(i => i.compliance_status === 'requires_review').length}
                  </h3>
                  <p className="text-sm text-muted-foreground">Requires Review</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <h3 className="font-semibold text-red-700">
                    {integrations.filter(i => i.compliance_status === 'non_compliant').length}
                  </h3>
                  <p className="text-sm text-muted-foreground">Non-Compliant</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};