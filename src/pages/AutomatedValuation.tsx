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
import WebDataUploadInterface from '@/components/WebDataUploadInterface';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Zap, Sparkles, Megaphone, Building2, TrendingUp, FileText, BarChart3, Database, Mail, Globe } from "lucide-react";
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
import { PropertyTypeLockProvider } from "@/components/PropertyTypeLockProvider";
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
    return <div className="min-h-screen" style={{
      background: isGreenTheme ? 'linear-gradient(135deg, #059669 0%, #10b981 25%, #34d399 50%, #6ee7b7 75%, #a7f3d0 100%)' : 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #3b82f6 50%, #60a5fa 75%, #93c5fd 100%)'
    }}>
        {/* Professional Platform Visual */}
        <div className="absolute inset-0 opacity-20">
          <img src={automatedValuationPlatform} alt="Professional Automated Valuation Platform" className="w-full h-full object-cover" />
        </div>
        
        {/* Enhanced 3D Background Effect - Temporarily disabled to fix WebGL error */}
        <div className="absolute inset-0 green-glow-effect opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10"></div>
        
        {/* Enhanced purple gradient background */}
        <div className="absolute inset-0 backdrop-blur-sm" />
        
        {/* Floating orbs for extra ambiance with theme-based colors */}
        <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-xl animate-pulse ${isGreenTheme ? 'bg-gradient-to-r from-emerald-400/30 to-green-400/30' : 'bg-gradient-to-r from-blue-400/30 to-cyan-400/30'}`} />
        <div className={`absolute bottom-20 right-10 w-48 h-48 rounded-full blur-2xl animate-pulse ${isGreenTheme ? 'bg-gradient-to-r from-green-400/25 to-emerald-400/25' : 'bg-gradient-to-r from-cyan-400/25 to-blue-400/25'}`} style={{
        animationDelay: '2s'
      }} />
        <div className={`absolute top-1/2 left-1/3 w-24 h-24 rounded-full blur-lg animate-float-3d ${isGreenTheme ? 'bg-gradient-to-r from-emerald-300/35 to-green-300/35' : 'bg-gradient-to-r from-blue-300/35 to-cyan-300/35'}`} style={{
        animationDelay: '4s'
      }} />
        
        <div className="relative z-10">
          <div className="text-center py-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Sustano Pro
              </h1>
              <div className="relative">
                {/* Simple distinctive logo - geometric arc */}
                <div className="w-12 h-12 border-4 border-white rounded-full border-t-transparent border-r-transparent rotate-45 transform"></div>
                <div className="absolute inset-0 w-8 h-8 bg-white rounded-full m-2 opacity-80"></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white/95 mb-3">
              ICV (Instant Comprehensive Valuation)™
            </h2>
            <p className="text-xl text-white/90 mb-2">
              AI-Powered Property Valuation And Assessment Technology
            </p>
            <p className="text-sm text-white/70">
              Patent Pending • IP Protected • Trademark © • Copyright Protected
            </p>
          </div>
          
          {/* Clean Navigation - Only Essential Links */}
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <Link to="/" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  🏠 Back to Dashboard
                </Link>

                {/* Main heading with blue theme */}
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-300/50 rounded-lg px-6 py-2">
                  <span className="text-white font-semibold text-lg">⚡ ICV (Instant Comprehensive Valuation)™ Platform</span>
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
                    ICV (Instant Comprehensive Valuation)™ Platform
                  </CardTitle>
                  <p className="text-cyan-200">AI-powered property valuation and assessment technology</p>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="platforms" className="w-full">
                    <TabsList className="grid w-full grid-cols-6 bg-slate-800/90 border border-slate-600">
                      <TabsTrigger value="platforms" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 hover:bg-slate-700 hover:text-white">Platform Access</TabsTrigger>
                      <TabsTrigger value="tools" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 hover:bg-slate-700 hover:text-white">Data Tools</TabsTrigger>
                      <TabsTrigger value="marketing" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 hover:bg-slate-700 hover:text-white">🎯 Marketing Hub</TabsTrigger>
                      <TabsTrigger value="brochures" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 hover:bg-slate-700 hover:text-white">📋 Brochures</TabsTrigger>
                      <TabsTrigger value="security" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 hover:bg-slate-700 hover:text-white">🔒 IP Security</TabsTrigger>
                      <TabsTrigger value="advanced" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 hover:bg-slate-700 hover:text-white">Advanced Features</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="platforms" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Core Platforms with 3D effects */}
                        <Link to="/dashboard" className="block">
                          <Enhanced3DCard title="Analytics Dashboard" description="Comprehensive analytics and reporting" icon={<span className="text-xl">📊</span>} primaryColor="blue" className="border-purple-700/50 bg-purple-800/40" />
                        </Link>
                        
                        <Link to="/index" className="block">
                          <Enhanced3DCard title="ESG Platform" description="Environmental & sustainability analysis" icon={<span className="text-xl">🌱</span>} primaryColor="green" className="border-purple-700/50 bg-purple-800/40" />
                        </Link>
                        
                        <Link to="/sam-platform" className="block">
                          <Enhanced3DCard title="SAM Platform" description="Strategic Asset Management" icon={<span className="text-xl">🎯</span>} primaryColor="purple" className="border-purple-700/50 bg-purple-800/40" />
                        </Link>
                        
                        <Link to="/crypto-trading" className="block">
                          <Enhanced3DCard title="Blockchain Hub" description="Cryptocurrency & blockchain tools" icon={<span className="text-xl">⚡</span>} primaryColor="orange" className="border-purple-700/50 bg-purple-800/40" />
                        </Link>
                        
                        <Link to="/market-strategy" className="block">
                          <Enhanced3DCard title="Sustano Sphere™" description="Revolutionary platform ecosystem" icon={<span className="text-xl">🌍</span>} primaryColor="green" className="border-purple-700/50 bg-purple-800/40" />
                        </Link>
                      </div>
                      
                      <Separator className="bg-purple-600/30" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Professional Services with 3D effects */}
                        <Link to="/work-hub" className="block">
                          <Enhanced3DCard title="Mortgage Broker" description="Mortgage and finance services" icon={<span className="text-xl">🏠</span>} primaryColor="teal" className="border-purple-700/50 bg-purple-800/40" />
                        </Link>
                        
                        <Link to="/reality-sales" className="block">
                          <Enhanced3DCard title="Reality Sales" description="Real estate sales platform" icon={<span className="text-xl">🏢</span>} primaryColor="pink" className="border-purple-700/50 bg-purple-800/40" />
                        </Link>
                        
                        <Link to="/work-hub" className="block">
                          <Enhanced3DCard title="Property Management" description="Property management tools" icon={<span className="text-xl">🔧</span>} primaryColor="indigo" className="border-purple-700/50 bg-purple-800/40" />
                        </Link>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tools" className="space-y-6">
                      <WebDataUploadInterface />
                    </TabsContent>
                     
                    <TabsContent value="marketing" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Social Media Assets */}
                        <Card className="card-3d-light border-pink-200/60 bg-pink-800/40 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-pink-300 flex items-center gap-2">
                              <Sparkles className="h-5 w-5" />
                              Social Media Logos
                            </CardTitle>
                            <CardDescription className="text-pink-200">
                              Download-ready logos for all your social media platforms
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <Link to="/social-media-assets" className="block">
                                <Button variant="outline" className="w-full justify-start gap-2 border-pink-300/50 hover:bg-pink-700/30 text-pink-200">
                                  📱 Get Social Media Logos
                                </Button>
                              </Link>
                              <div className="text-sm text-pink-200 space-y-1">
                                <p>• Sustaino Pro logos (5 variants)</p>
                                <p>• Multiple background options</p>
                                <p>• Perfect for social media</p>
                                <p>• PNG format, 800x320px</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Marketing Strategy */}
                        <Card className="card-3d-light border-blue-200/60 bg-blue-800/40 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-blue-300 flex items-center gap-2">
                              <TrendingUp className="h-5 w-5" />
                              Market Strategy
                            </CardTitle>
                            <CardDescription className="text-blue-200">
                              Comprehensive market creation strategy and analysis
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <Link to="/market-strategy" className="block">
                                <Button variant="outline" className="w-full justify-start gap-2 border-blue-300/50 hover:bg-blue-700/30 text-blue-200">
                                  📈 View Market Strategy
                                </Button>
                              </Link>
                              <div className="text-sm text-blue-200 space-y-1">
                                <p>• Digital Business Valuation category</p>
                                <p>• Global economic impact</p>
                                <p>• Strategic partnerships</p>
                                <p>• PDF download available</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Professional Brochures */}
                        <Card className="card-3d-light border-purple-200/60 bg-purple-800/40 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-purple-300 flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              Professional Brochures
                            </CardTitle>
                            <CardDescription className="text-purple-200">
                              Complete collection of service brochures
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
                                <p>• Service-specific materials</p>
                                <p>• PDF presentations</p>
                                <p>• Client-ready documents</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Platform Access */}
                        <Card className="card-3d-light border-green-200/60 bg-green-800/40 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-green-300 flex items-center gap-2">
                              <Globe className="h-5 w-5" />
                              Platform Showcases
                            </CardTitle>
                            <CardDescription className="text-green-200">
                              Live platform demonstrations and access
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <Link to="/dashboard" className="block">
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs hover:bg-green-700/30 text-green-200">
                                  🌐 Sustaino Sphere™
                                </Button>
                              </Link>
                              <Link to="/auction-sphere-pos" className="block">
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs hover:bg-green-700/30 text-green-200">
                                  🏛️ Auction-Sphere™
                                </Button>
                              </Link>
                              <Link to="/advertising-platforms" className="block">
                                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs hover:bg-green-700/30 text-green-200">
                                  📺 Advertising Platform
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Quick Marketing Actions */}
                        <Card className="card-3d-light border-orange-200/60 bg-orange-800/40 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-orange-300 flex items-center gap-2">
                              <Zap className="h-5 w-5" />
                              Quick Actions
                            </CardTitle>
                            <CardDescription className="text-orange-200">
                              Fast access to marketing essentials
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs hover:bg-orange-700/30 text-orange-200" onClick={() => window.open('/social-media-assets', '_blank')}>
                                📱 Download Logos
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs hover:bg-orange-700/30 text-orange-200" onClick={() => window.open('/market-strategy', '_blank')}>
                                📊 Strategy PDF
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs hover:bg-orange-700/30 text-orange-200" onClick={() => window.open('/brochures', '_blank')}>
                                📋 All Materials
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Email Templates */}
                        <Card className="card-3d-light border-cyan-200/60 bg-cyan-800/40 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-cyan-300 flex items-center gap-2">
                              <Mail className="h-5 w-5" />
                              Email & Communications
                            </CardTitle>
                            <CardDescription className="text-cyan-200">
                              Professional email templates and signatures
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="text-sm text-cyan-200 space-y-1">
                                <p>• Professional email signatures</p>
                                <p>• Client communication templates</p>
                                <p>• Presentation templates</p>
                                <p>• Partnership proposals</p>
                              </div>
                              <Button variant="outline" className="w-full justify-start gap-2 border-cyan-300/50 hover:bg-cyan-700/30 text-cyan-200 text-xs">
                                📧 Coming Soon
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="brochures" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Sustaino Sphere Platform */}
                        <Card className="card-3d-light border-green-200/60 bg-green-800/40 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-green-300 flex items-center gap-2">
                              <Globe className="h-5 w-5" />
                              Sustaino Sphere™ Platform
                            </CardTitle>
                            <CardDescription className="text-green-200">
                              Revolutionary digital asset intelligence platform
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <Link to="/dashboard" className="block">
                                <Button variant="outline" className="w-full justify-start gap-2 border-green-300/50 hover:bg-green-700/30 text-green-200">
                                  🌐 Access Sustaino Sphere™
                                </Button>
                              </Link>
                              <div className="text-sm text-green-200 space-y-1">
                                <p>• Digital asset valuation</p>
                                <p>• AI-powered intelligence</p>
                                <p>• Revolutionary platform ecosystem</p>
                                <p>• Comprehensive market analysis</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Marketing Brochures Section */}
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
                                <Link to="/market-strategy">
                                  <Button variant="ghost" size="sm" className="text-xs hover:bg-purple-700/30 text-purple-200 w-full">
                                    🌍 Sustano Sphere™
                                  </Button>
                                </Link>
                                <Button variant="ghost" size="sm" onClick={() => window.open('/brochures', '_blank')} className="text-xs hover:bg-purple-700/30 text-purple-200">
                                  🏛️ Auction-Sphere™
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => window.open('/brochures', '_blank')} className="text-xs hover:bg-purple-700/30 text-purple-200">
                                  🏠 Property Valuations
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => window.open('/brochures', '_blank')} className="text-xs hover:bg-purple-700/30 text-purple-200">
                                  📊 ESG Assessments
                                </Button>
                                <Link to="/social-media-assets">
                                  <Button variant="ghost" size="sm" className="text-xs hover:bg-purple-700/30 text-purple-200 w-full">
                                    📱 Social Media Assets
                                  </Button>
                                </Link>
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
                      <div className="space-y-6">
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
                <p className="text-purple-200">Select property type to begin ICV (Instant Comprehensive Valuation)™ process</p>
              </CardHeader>
              <CardContent>
                <PropertyTypeSelector onSelect={handlePropertyTypeSelect} />
              </CardContent>
            </Card>
            
            {/* AI Assistant & Professional Services with 3D effects */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              
              
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
            
            {/* Professional Services Tabs with High Contrast */}
            <Card className="toolbar-high-contrast">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  Professional Services Hub
                </CardTitle>
                <p className="text-toolbar-muted text-center">Comprehensive real estate and valuation services</p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="mortgage" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 toolbar-high-contrast">
                    <TabsTrigger value="mortgage" className="toolbar-item">🏠 Mortgage Broker</TabsTrigger>
                    <TabsTrigger value="sales" className="toolbar-item">🏢 Reality Sales</TabsTrigger>
                    <TabsTrigger value="management" className="toolbar-item">🔧 Property Management</TabsTrigger>
                    <TabsTrigger value="marketing" className="toolbar-item">📱 Marketing</TabsTrigger>
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

                  <TabsContent value="marketing">
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold mb-2">Marketing Hub</h3>
                      <p className="text-muted-foreground mb-4">Access all marketing materials and brochures</p>
                      <Button asChild>
                        <a href="/marketing">Open Marketing Hub</a>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>;
  }

  // Other workflow steps remain exactly the same
  if (currentStep === "setupMethod") {
    return <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <Button onClick={handleBack} variant="outline" className="mb-6">
            ← Back
          </Button>
          <SetupFlowSelector onQuickSetup={() => handleSetupMethodSelect("quick")} onAdvancedSetup={() => handleSetupMethodSelect("advanced")} />
        </div>
      </div>;
  }
  if (currentStep === "quickSetup") {
    return <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <Button onClick={handleBack} variant="outline" className="mb-6">
            ← Back
          </Button>
          <QuickSetupForm onComplete={handleQuickSetupComplete} onAdvancedSetup={() => handleSetupMethodSelect("advanced")} />
        </div>
      </div>;
  }
  if (currentStep === "streamlinedAssessment") {
    return <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <Button onClick={handleBack} variant="outline" className="mb-6 ml-4">
            ← Back
          </Button>
          <StreamlinedPropertyAssessment onComplete={handleStreamlinedComplete} />
        </div>
      </div>;
  }
  if (currentStep === "propertyDetails") {
    return <PropertyTypeLockProvider>
        <div className="min-h-screen bg-background p-8">
          <div className="max-w-4xl mx-auto">
            <Button onClick={handleBack} variant="outline" className="mb-6">
              ← Back
            </Button>
            <AutomatedPropertyDetails propertyType={selectedPropertyType} onNext={handlePropertyDetailsNext} onBack={handleBack} />
          </div>
        </div>
      </PropertyTypeLockProvider>;
  }
  if (currentStep === "automatedReport") {
    return <PropertyTypeLockProvider>
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
      </PropertyTypeLockProvider>;
  }

  // Default fallback
  return <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">ICV (Instant Comprehensive Valuation)™ Platform</h1>
        <p>Loading...</p>
      </div>
    </div>;
}