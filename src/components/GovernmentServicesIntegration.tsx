import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Shield, 
  FileText, 
  Search,
  CheckCircle,
  AlertCircle,
  Zap,
  Globe,
  Calculator,
  Download,
  Upload,
  Clock,
  Users,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const GovernmentServicesIntegration = () => {
  const [connections, setConnections] = useState<Record<string, boolean>>({});
  const [abn, setAbn] = useState("");
  const [acn, setAcn] = useState("");
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const governmentServices = [
    {
      id: "ato",
      name: "Australian Tax Office",
      shortName: "ATO",
      logo: "🏛️",
      description: "Direct SBR submissions, tax obligations, and GST reporting",
      department: "Treasury",
      status: "available",
      features: [
        "Business Activity Statement (BAS) submissions",
        "Tax obligation monitoring", 
        "GST return automation",
        "Payroll tax reporting",
        "Real-time compliance checking"
      ],
      color: "blue"
    },
    {
      id: "asic",
      name: "Australian Securities & Investments Commission",
      shortName: "ASIC",
      logo: "🏢",
      description: "Company searches, annual returns, and registry compliance",
      department: "Treasury",
      status: "available",
      features: [
        "Company name searches",
        "Annual statement lodgement",
        "Director change notifications",
        "Share capital updates",
        "Compliance monitoring"
      ],
      color: "green"
    },
    {
      id: "abr",
      name: "Australian Business Register",
      shortName: "ABR",
      logo: "📋",
      description: "ABN verification, business details, and registration status",
      department: "ATO",
      status: "available",
      features: [
        "ABN verification and validation",
        "Business name searches",
        "Registration status checking",
        "Entity type identification",
        "Historical business records"
      ],
      color: "purple"
    },
    {
      id: "acnc",
      name: "Australian Charities & Not-for-profits Commission",
      shortName: "ACNC",
      logo: "❤️",
      description: "Charity registration, DGR status, and compliance reporting",
      department: "ACNC",
      status: "available",
      features: [
        "Charity registration status",
        "DGR endorsement checks",
        "Annual information statements",
        "Governance compliance",
        "Public trust reporting"
      ],
      color: "red"
    }
  ];

  const quickActions = [
    {
      title: "ABN Lookup",
      description: "Verify Australian Business Numbers",
      icon: Search,
      action: "abn_lookup",
      color: "blue"
    },
    {
      title: "Company Search",
      description: "Find ASIC registered companies",
      icon: Building2,
      action: "company_search", 
      color: "green"
    },
    {
      title: "Submit BAS",
      description: "Lodge Business Activity Statement",
      icon: FileText,
      action: "submit_bas",
      color: "purple"
    },
    {
      title: "Compliance Check",
      description: "Review all government obligations",
      icon: Shield,
      action: "compliance_check",
      color: "orange"
    }
  ];

  const handleConnect = async (serviceId: string) => {
    setLoading(prev => ({ ...prev, [serviceId]: true }));
    
    try {
      toast({
        title: "Connecting to Government Service",
        description: `Establishing secure connection to ${governmentServices.find(s => s.id === serviceId)?.name}`,
      });

      // Test connection to government service
      const { data, error } = await supabase.functions.invoke('government-services', {
        body: {
          service: serviceId,
          action: 'test_connection',
          data: {}
        }
      });

      if (error) throw error;

      setConnections(prev => ({ ...prev, [serviceId]: true }));
      
      toast({
        title: "Successfully Connected",
        description: `${governmentServices.find(s => s.id === serviceId)?.name} is now integrated`,
      });
    } catch (error) {
      console.error('Government connection error:', error);
      toast({
        title: "Connection Failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, [serviceId]: false }));
    }
  };

  const handleABNLookup = async () => {
    if (!abn.trim()) {
      toast({
        title: "ABN Required",
        description: "Please enter an ABN to search",
        variant: "destructive",
      });
      return;
    }

    setLoading(prev => ({ ...prev, abn_lookup: true }));

    try {
      const { data, error } = await supabase.functions.invoke('government-services', {
        body: {
          service: 'abr',
          action: 'get_business_details',
          data: { abn: abn.trim() }
        }
      });

      if (error) throw error;

      toast({
        title: "ABN Lookup Successful",
        description: `Found: ${data.businessName || 'Business details retrieved'}`,
      });
    } catch (error) {
      console.error('ABN lookup error:', error);
      toast({
        title: "ABN Lookup Failed",
        description: "Unable to retrieve business details",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, abn_lookup: false }));
    }
  };

  const handleCompanySearch = async () => {
    if (!acn.trim()) {
      toast({
        title: "Company Name or ACN Required",
        description: "Please enter a company name or ACN to search",
        variant: "destructive",
      });
      return;
    }

    setLoading(prev => ({ ...prev, company_search: true }));

    try {
      const { data, error } = await supabase.functions.invoke('government-services', {
        body: {
          service: 'asic',
          action: 'search_company',
          data: { 
            searchTerm: acn.trim(),
            searchType: acn.trim().length === 9 ? 'acn' : 'name'
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Company Search Successful",
        description: `Found ${data.results?.length || 0} matching companies`,
      });
    } catch (error) {
      console.error('Company search error:', error);
      toast({
        title: "Company Search Failed",
        description: "Unable to search company records",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, company_search: false }));
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
      green: "border-green-200 bg-green-50 text-green-700 hover:bg-green-100", 
      purple: "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100",
      red: "border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
      orange: "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Government Services Integration
          </h2>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Seamlessly connect with Australian government departments for automated compliance, 
          real-time data verification, and streamlined reporting
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="secondary" className="px-3 py-1">
            <Shield className="h-3 w-3 mr-1" />
            Secure API Connections
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            <Zap className="h-3 w-3 mr-1" />
            Real-time Updates
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            <CheckCircle className="h-3 w-3 mr-1" />
            Auto Compliance
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 shadow-sm">
          <TabsTrigger value="services" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Government Services
          </TabsTrigger>
          <TabsTrigger value="quick-actions" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
            Quick Actions
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
            Compliance Dashboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {governmentServices.map((service) => (
              <Card 
                key={service.id} 
                className={`transition-all duration-300 hover:shadow-xl ${
                  connections[service.id] ? 'ring-2 ring-green-500 shadow-lg' : 'hover:shadow-md'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${getColorClasses(service.color)}`}>
                        <span className="text-2xl">{service.logo}</span>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{service.name}</CardTitle>
                        <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {service.department}
                          </Badge>
                          {connections[service.id] && (
                            <Badge className="bg-green-100 text-green-800 border-green-300">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Connected
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Available Features:</h4>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-xs text-gray-500 ml-5">
                          +{service.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => handleConnect(service.id)}
                    disabled={loading[service.id] || connections[service.id]}
                    className={`w-full ${connections[service.id] ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  >
                    {loading[service.id] ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : connections[service.id] ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Connected & Active
                      </>
                    ) : (
                      <>
                        <Globe className="h-4 w-4 mr-2" />
                        Connect to {service.shortName}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quick-actions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action) => (
              <Card key={action.action} className={`${getColorClasses(action.color)} border-2`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <action.icon className="h-6 w-6" />
                    {action.title}
                  </CardTitle>
                  <p className="text-sm opacity-80">{action.description}</p>
                </CardHeader>
                <CardContent>
                  {action.action === 'abn_lookup' && (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="abn" className="text-sm font-medium">
                          Australian Business Number (ABN)
                        </Label>
                        <Input
                          id="abn"
                          placeholder="11 222 333 444"
                          value={abn}
                          onChange={(e) => setAbn(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <Button 
                        onClick={handleABNLookup}
                        disabled={loading.abn_lookup}
                        className="w-full"
                      >
                        {loading.abn_lookup ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4 mr-2" />
                            Lookup ABN
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {action.action === 'company_search' && (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="company" className="text-sm font-medium">
                          Company Name or ACN
                        </Label>
                        <Input
                          id="company"
                          placeholder="Company name or 123 456 789"
                          value={acn}
                          onChange={(e) => setAcn(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <Button 
                        onClick={handleCompanySearch}
                        disabled={loading.company_search}
                        className="w-full"
                      >
                        {loading.company_search ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4 mr-2" />
                            Search Company
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {(action.action === 'submit_bas' || action.action === 'compliance_check') && (
                    <Button className="w-full" variant="outline">
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.title}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  Connected Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-700 mb-1">
                  {Object.values(connections).filter(Boolean).length}
                </div>
                <p className="text-sm text-green-600">of 4 available services</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <TrendingUp className="h-5 w-5" />
                  Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-700 mb-1">98%</div>
                <p className="text-sm text-blue-600">All obligations current</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Clock className="h-5 w-5" />
                  Last Sync
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-purple-700 mb-1">2 min ago</div>
                <p className="text-sm text-purple-600">All data up to date</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Government Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-green-100">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">BAS Lodgement Successful</p>
                      <p className="text-sm text-gray-600">December 2024 period</p>
                    </div>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-blue-100">
                      <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">ASIC Annual Return</p>
                      <p className="text-sm text-gray-600">Due in 15 days</p>
                    </div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Pending</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-purple-100">
                      <Search className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">ABN Verification</p>
                      <p className="text-sm text-gray-600">Bulk verification completed</p>
                    </div>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};