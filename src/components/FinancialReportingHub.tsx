import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  BarChart3, 
  Brain, 
  FileText,
  TrendingUp,
  Shield,
  Zap,
  Building2,
  Settings
} from "lucide-react";
import { FinancialMetricsForm } from "./FinancialMetricsForm";
import { FinancialDashboard } from "./FinancialDashboard";
import { FinancialRatiosDisplay } from "./FinancialRatiosDisplay";
import { FinancialAIAssistant } from "./FinancialAIAssistant";
import { AccountingPlatformIntegration } from "./AccountingPlatformIntegration";
import { PlantMachineryFinancial } from "./PlantMachineryFinancial";

export const FinancialReportingHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Accountancy and Financial Reporting
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive financial analysis and reporting system compliant with Australian Accounting Standards Board (AASB) requirements
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="secondary" className="px-3 py-1">
              <Shield className="h-3 w-3 mr-1" />
              AASB Compliant
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Zap className="h-3 w-3 mr-1" />
              Real-time Analysis
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Brain className="h-3 w-3 mr-1" />
              AI-Powered Insights
            </Badge>
          </div>
        </div>

        {/* Feature Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-300 border-blue-200/50 hover:border-blue-400/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-sm">Financial Input</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Comprehensive financial metrics collection with validation and auto-calculations
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-green-200/50 hover:border-green-400/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-sm">Live Dashboard</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Real-time financial performance monitoring with interactive charts and KPIs
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-purple-200/50 hover:border-purple-400/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
                  <Calculator className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-sm">Ratio Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Automated calculation and benchmarking of key financial ratios
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-orange-200/50 hover:border-orange-400/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 group-hover:bg-orange-200 transition-colors">
                  <Brain className="h-5 w-5 text-orange-600" />
                </div>
                <CardTitle className="text-sm">AI Assistant</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Intelligent financial analysis and strategic recommendations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <Tabs defaultValue="input" className="w-full">
              <div className="border-b bg-gray-50/80 px-6 py-4">
                <TabsList className="grid w-full grid-cols-6 bg-white border border-gray-200 shadow-sm">
                  <TabsTrigger 
                    value="input" 
                    className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                  >
                    <FileText className="h-4 w-4" />
                    Financial Input
                  </TabsTrigger>
                  <TabsTrigger 
                    value="dashboard" 
                    className="flex items-center gap-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ratios" 
                    className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
                  >
                    <Calculator className="h-4 w-4" />
                    Ratios
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ai-assistant" 
                    className="flex items-center gap-2 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700"
                  >
                    <Brain className="h-4 w-4" />
                    AI Assistant
                  </TabsTrigger>
                  <TabsTrigger 
                    value="integration" 
                    className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700"
                  >
                    <Building2 className="h-4 w-4" />
                    Integration
                  </TabsTrigger>
                  <TabsTrigger 
                    value="plant-machinery" 
                    className="flex items-center gap-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
                  >
                    <Settings className="h-4 w-4" />
                    Plant & Machinery
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="input" className="mt-0">
                  <FinancialMetricsForm />
                </TabsContent>

                <TabsContent value="dashboard" className="mt-0">
                  <FinancialDashboard />
                </TabsContent>

                <TabsContent value="ratios" className="mt-0">
                  <FinancialRatiosDisplay />
                </TabsContent>

                <TabsContent value="ai-assistant" className="mt-0">
                  <FinancialAIAssistant />
                </TabsContent>

                <TabsContent value="integration" className="mt-0">
                  <AccountingPlatformIntegration />
                </TabsContent>

                <TabsContent value="plant-machinery" className="mt-0">
                  <PlantMachineryFinancial />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Compliance Footer */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">AASB Compliance</h3>
                  <p className="text-sm text-blue-700">
                    All calculations and reporting standards comply with Australian Accounting Standards Board requirements
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Export Reports
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Shield className="h-4 w-4 mr-2" />
                  Compliance Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};