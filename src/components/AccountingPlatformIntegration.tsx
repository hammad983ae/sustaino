import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Link2, 
  Database, 
  FileText, 
  Download, 
  Upload,
  CheckCircle,
  AlertCircle,
  Zap,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AccountingPlatformIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const { toast } = useToast();

  const platforms = [
    {
      id: "xero",
      name: "Xero",
      logo: "🟦",
      description: "Connect to Xero for automated financial data import",
      status: "available"
    },
    {
      id: "quickbooks",
      name: "QuickBooks",
      logo: "🔵",
      description: "Integrate with QuickBooks Online and Desktop",
      status: "available"
    },
    {
      id: "myob",
      name: "MYOB",
      logo: "🟡",
      description: "Australian accounting software integration",
      status: "available"
    },
    {
      id: "reckon",
      name: "Reckon",
      logo: "🟣",
      description: "Reckon Accounts and cloud solutions",
      status: "coming-soon"
    },
    {
      id: "sage",
      name: "Sage",
      logo: "🟢",
      description: "Sage Business Cloud Accounting",
      status: "coming-soon"
    },
    {
      id: "custom",
      name: "Custom Platform",
      logo: "⚙️",
      description: "Our integrated financial management system",
      status: "available"
    }
  ];

  const handleConnect = (platformId: string) => {
    setSelectedPlatform(platformId);
    // Simulate connection process
    toast({
      title: "Connecting...",
      description: `Establishing connection to ${platforms.find(p => p.id === platformId)?.name}`,
    });
    
    setTimeout(() => {
      setIsConnected(true);
      toast({
        title: "Connected Successfully",
        description: "Your accounting platform is now integrated",
      });
    }, 2000);
  };

  const handleImportData = () => {
    toast({
      title: "Importing Data",
      description: "Financial data is being imported and processed",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-100">
          <Link2 className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Accounting Platform Integration</h2>
          <p className="text-gray-600">Connect your accounting software for seamless data integration</p>
        </div>
      </div>

      <Tabs defaultValue="platforms" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="custom">Custom System</TabsTrigger>
          <TabsTrigger value="import">Data Import</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-6">
          {/* Platform Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((platform) => (
              <Card 
                key={platform.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedPlatform === platform.id ? 'ring-2 ring-blue-500' : ''
                } ${platform.status === 'coming-soon' ? 'opacity-60' : ''}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{platform.logo}</span>
                      <div>
                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{platform.description}</p>
                      </div>
                    </div>
                    {platform.status === 'coming-soon' && (
                      <Badge variant="outline">Coming Soon</Badge>
                    )}
                    {isConnected && selectedPlatform === platform.id && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => handleConnect(platform.id)}
                    disabled={platform.status === 'coming-soon' || (isConnected && selectedPlatform === platform.id)}
                    className="w-full"
                    variant={isConnected && selectedPlatform === platform.id ? "outline" : "default"}
                  >
                    {isConnected && selectedPlatform === platform.id ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Connected
                      </>
                    ) : platform.status === 'coming-soon' ? (
                      'Coming Soon'
                    ) : (
                      <>
                        <Link2 className="h-4 w-4 mr-2" />
                        Connect
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Connection Status */}
          {isConnected && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">
                      Connected to {platforms.find(p => p.id === selectedPlatform)?.name}
                    </h3>
                    <p className="text-sm text-green-700">
                      Ready to import financial data automatically
                    </p>
                  </div>
                  <Button onClick={handleImportData} size="sm" className="ml-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          {/* Custom Internal System */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Integrated Financial Management System
              </CardTitle>
              <p className="text-gray-600">
                Use our built-in financial management system with full AASB compliance
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Features Included:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Chart of Accounts Management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Automated Journal Entries
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Financial Statement Generation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      AASB Compliance Checking
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Real-time Financial Analytics
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Benefits:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      No third-party dependencies
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      Seamless data integration
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      Advanced analytics built-in
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      Customizable workflows
                    </li>
                  </ul>
                </div>
              </div>
              <Button className="w-full" onClick={() => handleConnect('custom')}>
                <Settings className="h-4 w-4 mr-2" />
                Setup Integrated System
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="space-y-6">
          {/* Manual Data Import */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Manual Data Import
              </CardTitle>
              <p className="text-gray-600">
                Import financial data from CSV, Excel, or other formats
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="import-file">Select File to Import</Label>
                  <Input id="import-file" type="file" accept=".csv,.xlsx,.xls" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="import-type">Data Type</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Trial Balance</option>
                      <option>General Ledger</option>
                      <option>Chart of Accounts</option>
                      <option>Financial Statements</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="period">Reporting Period</Label>
                    <Input id="period" placeholder="e.g., FY2025, Q1 2025" />
                  </div>
                </div>
                <Button className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Import History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Imports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Trial Balance - Q4 2024</p>
                      <p className="text-sm text-gray-600">Imported 2 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Success
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">General Ledger - FY2024</p>
                      <p className="text-sm text-gray-600">Imported yesterday</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Warning
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};