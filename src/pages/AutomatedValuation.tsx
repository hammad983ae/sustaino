/**
 * ============================================================================
 * PROPRIETARY AUTOMATED VALUATION PLATFORM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * Property Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Zap, Sparkles, Megaphone, Building2, TrendingUp, FileText, BarChart3, Database, Mail } from "lucide-react";
import PropertyTypeSelector from "@/components/PropertyTypeSelector";
import AutomatedPropertyDetails from "@/components/AutomatedPropertyDetails";
import AutomatedReport from "./AutomatedReport";
import SetupFlowSelector from "@/components/SetupFlowSelector";
import QuickSetupForm from "@/components/QuickSetupForm";
import StreamlinedPropertyAssessment from "@/components/StreamlinedPropertyAssessment";
import ComprehensiveIPProtection from "@/components/ComprehensiveIPProtection";
import SecurityCertificatesGrid from "@/components/SecurityCertificatesGrid";
import MortgageBrokerTab from "@/components/MortgageBrokerTab";
import RealitySalesTab from "@/components/RealitySalesTab";
import PropertyManagementTab from "@/components/PropertyManagementTab";
import { RealCommercialScraper } from "@/components/RealCommercialScraper";
import { ScrapedDataViewer } from "@/components/ScrapedDataViewer";
import ComprehensiveValuationGenerator from "@/components/ComprehensiveValuationGenerator";
import { ValuationProvider } from "@/contexts/ValuationContext";

import BrandedHeader from "@/components/BrandedHeader";
import PropertyValuation3DBackground from "@/components/PropertyValuation3DBackground";
import ThunderboltIcon from "@/components/ThunderboltIcon";
import AIAssistantToggle from "@/components/AIAssistantToggle";
import AuthStatus from "@/components/AuthStatus";
import PropertyUpdateFeed from "@/components/PropertyUpdateFeed";
import ConstructionCostIndex from "@/components/ConstructionCostIndex";
import DevelopmentCalculator from "@/components/DevelopmentCalculator";
import PEXAIntegration from "@/components/PEXAIntegration";
import AdvertisingValuationDashboard from "@/components/AdvertisingValuationDashboard";
import Enhanced3DCard from "@/components/Enhanced3DCard";

// Import professional images
import automatedValuationPlatform from '@/assets/automated-valuation-platform.jpg';

export default function AutomatedValuation() {
  const [currentStep, setCurrentStep] = useState("propertyType");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [setupMethod, setSetupMethod] = useState<"quick" | "advanced" | null>(null);
  const [isGreenTheme, setIsGreenTheme] = useState(false);

  // Background alternation effect - switches every 3 minutes (180000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGreenTheme(prev => !prev);
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, []);

  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(type);
    setCurrentStep("setupMethod");
  };

  const handleSetupMethodSelect = (method: "quick" | "advanced") => {
    setSetupMethod(method);
    if (method === "quick") {
      setCurrentStep("quickSetup");
    } else {
      setCurrentStep("propertyDetails");
    }
  };

  const handleQuickSetupComplete = (data: any) => {
    // Store the setup data and proceed to streamlined assessment
    localStorage.setItem('quickSetupData', JSON.stringify(data));
    if (data.proceedToStreamlined) {
      setCurrentStep("streamlinedAssessment");
    } else {
      setCurrentStep("automatedReport");
    }
  };

  const handleStreamlinedComplete = (data: any) => {
    // Assessment complete, proceed to report
    localStorage.setItem('streamlinedAssessmentData', JSON.stringify(data));
    setCurrentStep("automatedReport");
  };

  const handlePropertyDetailsNext = () => {
    setCurrentStep("automatedReport");
  };

  const handleBack = () => {
    if (currentStep === "setupMethod") {
      setCurrentStep("propertyType");
    } else if (currentStep === "quickSetup") {
      setCurrentStep("setupMethod");
    } else if (currentStep === "propertyDetails") {
      setCurrentStep("setupMethod");
    } else if (currentStep === "automatedReport") {
      if (setupMethod === "quick") {
        setCurrentStep("quickSetup");
      } else {
        setCurrentStep("propertyDetails");
      }
    }
  };

  // Show property valuation as primary feature
  if (currentStep === "propertyType" || currentStep === "default") {
    return (
      <div className="min-h-screen" style={{
        background: isGreenTheme 
          ? 'linear-gradient(135deg, #059669 0%, #10b981 25%, #34d399 50%, #6ee7b7 75%, #a7f3d0 100%)'
          : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #3b82f6 50%, #60a5fa 75%, #93c5fd 100%)'
      }}>
        {/* Professional Platform Visual */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src={automatedValuationPlatform} 
            alt="Professional Automated Valuation Platform" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Enhanced 3D Background Effect */}
        <div className="absolute inset-0 green-glow-effect opacity-40"></div>
        <div className="absolute inset-0">
          <PropertyValuation3DBackground />
        </div>
        
        {/* Enhanced purple gradient background */}
        <div className="absolute inset-0 backdrop-blur-sm" />
        
        {/* Floating orbs for extra ambiance with theme-based colors */}
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-xl animate-pulse ${
          isGreenTheme 
            ? 'bg-gradient-to-r from-emerald-400/30 to-green-400/30' 
            : 'bg-gradient-to-r from-blue-400/30 to-cyan-400/30'
        }`} />
        <div className={`absolute bottom-20 right-10 w-48 h-48 rounded-full blur-2xl animate-pulse ${
          isGreenTheme 
            ? 'bg-gradient-to-r from-green-400/25 to-emerald-400/25' 
            : 'bg-gradient-to-r from-cyan-400/25 to-blue-400/25'
        }`} style={{ animationDelay: '2s' }} />
        <div className={`absolute top-1/2 left-1/3 w-24 h-24 rounded-full blur-lg animate-float-3d ${
          isGreenTheme 
            ? 'bg-gradient-to-r from-emerald-300/35 to-green-300/35' 
            : 'bg-gradient-to-r from-blue-300/35 to-cyan-300/35'
        }`} style={{ animationDelay: '4s' }} />
        
        <div className="relative z-10">
          <div className="text-center py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ICV (Instant Comprehensive Valuation)™
            </h1>
            <p className="text-xl text-white/90 mb-2">
              AI-powered property valuation and assessment technology
            </p>
            <p className="text-sm text-white/70">
              Patent Pending • IP Protected • Trademark ©
            </p>
          </div>
          
          {/* Clean Navigation - Only Essential Links */}
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <Link 
                  to="/" 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🏠 Back to Dashboard
                </Link>

                {/* Main heading with blue theme */}
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-300/50 rounded-lg px-6 py-2">
                  <span className="text-white font-semibold text-lg">⚡ Automated Valuation Platform</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <AuthStatus />
              </div>
            </div>
            
            {/* Sustaino World Platform Hub */}
            <div className="mb-12">
              <Card className="card-3d-medium bg-slate-800/40 backdrop-blur-sm border-blue-700/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-cyan-300 flex items-center justify-center gap-2">
                    <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                      ⚡
                    </div>
                    Automated Valuation Platform
                  </CardTitle>
                  <p className="text-cyan-200">AI-powered property valuation and assessment technology</p>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="platforms" className="w-full">
                    <TabsList className="grid w-full grid-cols-5 bg-blue-900/50">
                      <TabsTrigger value="platforms">Platform Access</TabsTrigger>
                      <TabsTrigger value="tools">Data Tools</TabsTrigger>
                      <TabsTrigger value="brochures">📋 Brochures</TabsTrigger>
                      <TabsTrigger value="security">🔒 IP Security</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced Features</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="platforms" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Core Platforms with 3D effects */}
                        <Link to="/dashboard" className="block">
                          <Enhanced3DCard
                            title="Analytics Dashboard"
                            description="Comprehensive analytics and reporting"
                            icon={<span className="text-xl">📊</span>}
                            primaryColor="blue"
                            className="border-purple-700/50 bg-purple-800/40"
                          />
                        </Link>
                        
                        <Link to="/index" className="block">
                          <Enhanced3DCard
                            title="ESG Platform"
                            description="Environmental & sustainability analysis"
                            icon={<span className="text-xl">🌱</span>}
                            primaryColor="green"
                            className="border-purple-700/50 bg-purple-800/40"
                          />
                        </Link>
                        
                        <Link to="/sam-platform" className="block">
                          <Enhanced3DCard
                            title="SAM Platform"
                            description="Strategic Asset Management"
                            icon={<span className="text-xl">🎯</span>}
                            primaryColor="purple"
                            className="border-purple-700/50 bg-purple-800/40"
                          />
                        </Link>
                        
                        <Link to="/crypto-trading" className="block">
                          <Enhanced3DCard
                            title="Blockchain Hub"
                            description="Cryptocurrency & blockchain tools"
                            icon={<span className="text-xl">⚡</span>}
                            primaryColor="orange"
                            className="border-purple-700/50 bg-purple-800/40"
                          />
                        </Link>
                      </div>
                      
                      <Separator className="bg-purple-600/30" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Professional Services with 3D effects */}
                        <Link to="/work-hub" className="block">
                          <Enhanced3DCard
                            title="Mortgage Broker"
                            description="Mortgage and finance services"
                            icon={<span className="text-xl">🏠</span>}
                            primaryColor="teal"
                            className="border-purple-700/50 bg-purple-800/40"
                          />
                        </Link>
                        
                        <Link to="/reality-sales" className="block">
                          <Enhanced3DCard
                            title="Reality Sales"
                            description="Real estate sales platform"
                            icon={<span className="text-xl">🏢</span>}
                            primaryColor="pink"
                            className="border-purple-700/50 bg-purple-800/40"
                          />
                        </Link>
                        
                        <Link to="/work-hub" className="block">
                          <Enhanced3DCard
                            title="Property Management"
                            description="Property management tools"
                            icon={<span className="text-xl">🔧</span>}
                            primaryColor="indigo"
                            className="border-purple-700/50 bg-purple-800/40"
                          />
                        </Link>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tools" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Web Scraper Tool with 3D effects */}
                        <Card className="card-3d-light border-purple-200/60 bg-purple-800/40 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-purple-300 flex items-center gap-2">
                              <Database className="h-5 w-5" />
                              Commercial Data Scraper
                            </CardTitle>
                            <CardDescription className="text-purple-200">
                              Extract property data from URLs and documents
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <RealCommercialScraper />
                          </CardContent>
                        </Card>
                        
                         {/* Scraped Data Viewer with 3D effects */}
                        <Card className="card-3d-light border-purple-200/60 bg-purple-800/40 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-purple-300 flex items-center gap-2">
                              <TrendingUp className="h-5 w-5" />
                              Scraped Data Viewer
                            </CardTitle>
                            <CardDescription className="text-purple-200">
                              View and analyze scraped property data
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ScrapedDataViewer />
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="brochures" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Professional Brochures Section with 3D effects */}
                        <Card className="card-3d-light border-purple-200/60 bg-purple-800/40 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-purple-300 flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              Marketing Brochures
                            </CardTitle>
                            <CardDescription className="text-purple-200">
                              Professional marketing materials and service overviews
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <Link to="/brochures" className="block">
                                <Button variant="outline" className="w-full justify-start gap-2 border-purple-300/50 hover:bg-purple-700/30 text-purple-200">
                                  📄 View All Brochures
                                </Button>
                              </Link>
                              <div className="text-sm text-purple-200 space-y-1">
                                <p>• Platform ecosystem overview</p>
                                <p>• Service-specific brochures</p>
                                <p>• Professional presentations</p>
                                <p>• PDF-ready marketing materials</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* Quick Access to Popular Brochures with 3D effects */}
                        <Card className="card-3d-light border-purple-200/60 bg-purple-800/40 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-purple-300 flex items-center gap-2">
                              <Sparkles className="h-5 w-5" />
                              Featured Materials
                            </CardTitle>
                            <CardDescription className="text-purple-200">
                              Most requested professional materials
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => window.open('/brochures', '_blank')}
                                  className="text-xs hover:bg-purple-700/30 text-purple-200"
                                >
                                  🌍 Sustaino-Sphere™
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => window.open('/brochures', '_blank')}
                                  className="text-xs hover:bg-purple-700/30 text-purple-200"
                                >
                                  🏛️ Auction-Sphere™
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => window.open('/brochures', '_blank')}
                                  className="text-xs hover:bg-purple-700/30 text-purple-200"
                                >
                                  🏠 Property Valuations
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => window.open('/brochures', '_blank')}
                                  className="text-xs hover:bg-purple-700/30 text-purple-200"
                                >
                                  📊 ESG Assessments
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="security" className="space-y-6">
                      <ComprehensiveIPProtection />
                      <SecurityCertificatesGrid />
                    </TabsContent>
                    
                    <TabsContent value="advanced" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ConstructionCostIndex />
                        <DevelopmentCalculator />
                        <PEXAIntegration />
                        <AdvertisingValuationDashboard />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Step-by-Step Property Valuation with 3D effects */}
            <Card className="card-3d-medium bg-purple-800/40 backdrop-blur-sm border-purple-700/50 mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-purple-300 flex items-center justify-center gap-2">
                  <ThunderboltIcon />
                  Start Property Valuation
                </CardTitle>
                <p className="text-purple-200">Select property type to begin automated valuation process</p>
              </CardHeader>
              <CardContent>
                <PropertyTypeSelector 
                  onSelect={handlePropertyTypeSelect}
                />
              </CardContent>
            </Card>
            
            {/* AI Assistant & Professional Services with 3D effects */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="card-3d-light border-purple-200/60 bg-purple-800/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-300">🤖 AI Assistant</CardTitle>
                  <CardDescription className="text-purple-200">
                    Intelligent assistance for all valuation tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AIAssistantToggle />
                </CardContent>
              </Card>
              
              <Card className="card-3d-light border-purple-200/60 bg-purple-800/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-300">📈 Property Updates</CardTitle>
                  <CardDescription className="text-purple-200">
                    Real-time property market updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PropertyUpdateFeed />
                </CardContent>
              </Card>
            </div>
            
            {/* Professional Services Tabs with 3D effects */}
            <Card className="card-3d-medium bg-purple-800/40 backdrop-blur-sm border-purple-700/50">
              <CardHeader>
                <CardTitle className="text-purple-300 text-center">Professional Services Hub</CardTitle>
                <p className="text-purple-200 text-center">Comprehensive real estate and valuation services</p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="mortgage" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-purple-900/50">
                    <TabsTrigger value="mortgage">🏠 Mortgage Broker</TabsTrigger>
                    <TabsTrigger value="sales">🏢 Reality Sales</TabsTrigger>
                    <TabsTrigger value="management">🔧 Property Management</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="mortgage">
                    <MortgageBrokerTab />
                  </TabsContent>
                  
                  <TabsContent value="sales">
                    <RealitySalesTab />
                  </TabsContent>
                  
                  <TabsContent value="management">
                    <PropertyManagementTab />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Other workflow steps remain exactly the same
  if (currentStep === "setupMethod") {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <Button onClick={handleBack} variant="outline" className="mb-6">
            ← Back
          </Button>
          <SetupFlowSelector 
            onQuickSetup={() => handleSetupMethodSelect("quick")}
            onAdvancedSetup={() => handleSetupMethodSelect("advanced")}
          />
        </div>
      </div>
    );
  }

  if (currentStep === "quickSetup") {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <Button onClick={handleBack} variant="outline" className="mb-6">
            ← Back
          </Button>
          <QuickSetupForm 
            onComplete={handleQuickSetupComplete}
            onAdvancedSetup={() => handleSetupMethodSelect("advanced")}
          />
        </div>
      </div>
    );
  }

  if (currentStep === "streamlinedAssessment") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <Button onClick={handleBack} variant="outline" className="mb-6 ml-4">
            ← Back
          </Button>
          <StreamlinedPropertyAssessment onComplete={handleStreamlinedComplete} />
        </div>
      </div>
    );
  }

  if (currentStep === "propertyDetails") {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <Button onClick={handleBack} variant="outline" className="mb-6">
            ← Back
          </Button>
          <AutomatedPropertyDetails 
            propertyType={selectedPropertyType}
            onNext={handlePropertyDetailsNext}
            onBack={handleBack}
          />
        </div>
      </div>
    );
  }

  if (currentStep === "automatedReport") {
    return (
      <ValuationProvider>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto py-8">
            <Button onClick={handleBack} variant="outline" className="mb-6 ml-4">
              ← Back
            </Button>
            <ComprehensiveValuationGenerator />
          </div>
        </div>
      </ValuationProvider>
    );
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Automated Valuation Platform</h1>
        <p>Loading...</p>
      </div>
    </div>
  );
}
