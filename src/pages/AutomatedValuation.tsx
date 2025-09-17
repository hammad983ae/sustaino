/**
 * ============================================================================
 * PROPRIETARY AUTOMATED VALUATION PLATFORM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * Property Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Zap, Sparkles, Megaphone, Building2, TrendingUp, FileText, BarChart3, Database } from "lucide-react";
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

// Import professional images
import automatedValuationPlatform from '@/assets/automated-valuation-platform.jpg';

export default function AutomatedValuation() {
  const [currentStep, setCurrentStep] = useState("propertyType");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [setupMethod, setSetupMethod] = useState<"quick" | "advanced" | null>(null);

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
      <div className="min-h-screen hero-green-background relative overflow-hidden">
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
        
        {/* Enhanced green gradient background */}
        <div className="absolute inset-0 hero-green-background backdrop-blur-sm" />
        
        {/* Floating orbs for extra ambiance with green tinge */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-xl animate-green-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-teal-400/25 to-emerald-400/25 rounded-full blur-2xl animate-green-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-emerald-300/35 to-teal-300/35 rounded-full blur-lg animate-float-3d" style={{ animationDelay: '4s' }} />
        
        <div className="relative z-10">
          <BrandedHeader />
          
          {/* Clean Navigation - Only Essential Links */}
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <Link 
                  to="/" 
                  className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-glow backdrop-blur-sm border border-green-300/70"
                >
                  🏠 Back to Dashboard
                </Link>
                
                {/* New Sustaino World Tab - Primary Platform Access */}
                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-300/50 rounded-lg px-6 py-2">
                  <span className="text-white font-semibold text-lg">🌍 Sustaino World - Professional Platform Suite</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <AuthStatus />
              </div>
            </div>
            
            {/* Sustaino World Platform Hub */}
            <div className="mb-12">
              <Card className="bg-gradient-to-br from-emerald-50/90 to-teal-50/90 border-emerald-200/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-emerald-700 flex items-center justify-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      🌍
                    </div>
                    Sustaino World - Integrated Platform Suite
                  </CardTitle>
                  <p className="text-emerald-600">Access all professional tools from one organized dashboard</p>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="platforms" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="platforms">Platform Access</TabsTrigger>
                      <TabsTrigger value="tools">Data Tools</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced Features</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="platforms" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Core Platforms */}
                        <Link to="/dashboard" className="block group">
                          <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                            <CardContent className="p-6 text-center">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                                <span className="text-xl">📊</span>
                              </div>
                              <h3 className="font-semibold text-blue-700 mb-2">Analytics Dashboard</h3>
                              <p className="text-sm text-blue-600">Comprehensive analytics and reporting</p>
                            </CardContent>
                          </Card>
                        </Link>
                        
                        <Link to="/index" className="block group">
                          <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                            <CardContent className="p-6 text-center">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                                <span className="text-xl">🌱</span>
                              </div>
                              <h3 className="font-semibold text-green-700 mb-2">ESG Platform</h3>
                              <p className="text-sm text-green-600">Environmental & sustainability analysis</p>
                            </CardContent>
                          </Card>
                        </Link>
                        
                        <Link to="/sam-platform" className="block group">
                          <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
                            <CardContent className="p-6 text-center">
                              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                                <span className="text-xl">🎯</span>
                              </div>
                              <h3 className="font-semibold text-purple-700 mb-2">SAM Platform</h3>
                              <p className="text-sm text-purple-600">Strategic Asset Management</p>
                            </CardContent>
                          </Card>
                        </Link>
                        
                        <Link to="/crypto-trading" className="block group">
                          <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
                            <CardContent className="p-6 text-center">
                              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-200 transition-colors">
                                <span className="text-xl">⚡</span>
                              </div>
                              <h3 className="font-semibold text-orange-700 mb-2">Blockchain Hub</h3>
                              <p className="text-sm text-orange-600">Cryptocurrency & blockchain tools</p>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Professional Services */}
                        <Link to="/work-hub" className="block group">
                          <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
                            <CardContent className="p-6 text-center">
                              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-200 transition-colors">
                                <span className="text-xl">🏠</span>
                              </div>
                              <h3 className="font-semibold text-teal-700 mb-2">Mortgage Broker</h3>
                              <p className="text-sm text-teal-600">Mortgage and finance services</p>
                            </CardContent>
                          </Card>
                        </Link>
                        
                        <Link to="/reality-sales" className="block group">
                          <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50">
                            <CardContent className="p-6 text-center">
                              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-rose-200 transition-colors">
                                <span className="text-xl">🏢</span>
                              </div>
                              <h3 className="font-semibold text-rose-700 mb-2">Reality Sales</h3>
                              <p className="text-sm text-rose-600">Real estate sales platform</p>
                            </CardContent>
                          </Card>
                        </Link>
                        
                        <Link to="/work-hub" className="block group">
                          <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-slate-200 bg-gradient-to-br from-slate-50 to-gray-50">
                            <CardContent className="p-6 text-center">
                              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-slate-200 transition-colors">
                                <span className="text-xl">🔧</span>
                              </div>
                              <h3 className="font-semibold text-slate-700 mb-2">Property Management</h3>
                              <p className="text-sm text-slate-600">Property management tools</p>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tools" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Web Scraper Tool */}
                        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
                          <CardHeader>
                            <CardTitle className="text-emerald-700 flex items-center gap-2">
                              <Database className="h-5 w-5" />
                              RealCommercial Scraper
                            </CardTitle>
                            <CardDescription className="text-emerald-600">
                              Extract property data from URLs and documents
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <RealCommercialScraper />
                          </CardContent>
                        </Card>
                        
                         {/* Scraped Data Viewer */}
                        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                          <CardHeader>
                            <CardTitle className="text-blue-700 flex items-center gap-2">
                              <TrendingUp className="h-5 w-5" />
                              Scraped Data Viewer
                            </CardTitle>
                            <CardDescription className="text-blue-600">
                              View and analyze scraped property data
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ScrapedDataViewer />
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="advanced" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
                          <CardHeader>
                            <CardTitle className="text-purple-700">Advanced Analytics</CardTitle>
                            <CardDescription className="text-purple-600">
                              Enterprise-level analytics and reporting
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="text-center py-8">
                            <p className="text-purple-600 mb-4">AI-powered insights and predictions</p>
                            <Button variant="outline" className="border-purple-300 text-purple-700">
                              Coming Soon
                            </Button>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
                          <CardHeader>
                            <CardTitle className="text-amber-700">Enterprise Features</CardTitle>
                            <CardDescription className="text-amber-600">
                              White-label and custom integrations
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="text-center py-8">
                            <p className="text-amber-600 mb-4">Custom solutions for enterprise clients</p>
                            <Button variant="outline" className="border-amber-300 text-amber-700">
                              Contact Sales
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Hero Section - Enhanced with Strong Green 3D Effect */}
          <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12 animate-fade-in relative z-10" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-center gap-3 mb-6 animate-float-3d">
              <div className="green-glow-effect">
                <Zap className="h-10 w-10 text-primary animate-green-glow" />
              </div>
              <Sparkles className="h-8 w-8 text-secondary animate-green-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-6 animate-scale-in animate-green-glow">
              Professional Property Valuations and ESG Assessments
            </h1>
            
            {/* Back to Home Button - Enhanced with 3D effect */}
            <div className="flex justify-end mb-6 pr-4">
              <a 
                href="/index" 
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/20 transition-all duration-200 text-sm md:text-base font-bold text-foreground hover:text-primary"
              >
                <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="sm:inline">Back to Original Platform</span>
              </a>
            </div>
            
              <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in flex-wrap" style={{ animationDelay: '0.4s' }}>
                <ThunderboltIcon className="w-8 h-8 md:w-10 md:h-10 animate-pulse" />
                <span className="font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Powered
                </span>
                <span>- Instant Property Valuations and ESG Assessment Powered By</span>
                <span className="font-bold text-emerald-600">Sustaino-Pro</span>
              </div>
            </div>
            
            <div className="max-w-5xl mx-auto animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <PropertyTypeSelector onSelect={handlePropertyTypeSelect} />
            </div>
          </div>

          {/* Subtitle Section */}
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 rounded-full border border-emerald-200/50 backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Sustaino Pro Valuation Platform
              </h2>
            </div>
            
              <p className="text-lg text-gray-600 mt-4 max-w-4xl mx-auto">
                Automated Property Valuations with ESG Intelligence
              </p>
              <p className="text-base text-gray-500 mt-2 max-w-5xl mx-auto">
                Select your property type to begin an automated valuation powered by AI market analysis, comparable sales 
                data, and comprehensive ESG assessment.
              </p>
            </div>
          </div>

          {/* Secondary Features - Enhanced with staggered animations */}
          <div className="container mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 gap-8 mb-12">
              <div className="animate-fade-in" style={{ animationDelay: '1.1s' }}>
                <PropertyUpdateFeed />
              </div>
              
              {/* Construction Cost Index and Development Calculator */}
              <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
                <ConstructionCostIndex />
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '1.3s' }}>
                <DevelopmentCalculator />
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '1.35s' }}>
                <PEXAIntegration />
              </div>

              {/* Additional Professional Tools Section */}
              <div className="animate-fade-in mt-16" style={{ animationDelay: '1.4s' }}>
                <Card className="bg-gradient-to-br from-card/90 to-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <BarChart3 className="h-6 w-6 text-primary" />
                      </div>
                      Additional Professional Tools
                    </CardTitle>
                    <p className="text-muted-foreground text-lg">
                      Access specialized valuation and assessment tools for comprehensive property analysis
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Property Valuation */}
                      <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-blue-200 hover:border-blue-300">
                        <CardContent className="p-6 text-center">
                          <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                          <h3 className="font-semibold mb-2 text-blue-600">Property Valuation</h3>
                          <p className="text-sm text-muted-foreground">
                            Access comprehensive property valuation tools and market analysis
                          </p>
                        </CardContent>
                      </Card>

                      {/* Rent Revision */}
                      <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-purple-200 hover:border-purple-300">
                        <CardContent className="p-6 text-center">
                          <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                          <h3 className="font-semibold mb-2 text-purple-600">Rent Revision</h3>
                          <p className="text-sm text-muted-foreground">
                            Calculate and review rental valuations with market comparisons
                          </p>
                        </CardContent>
                      </Card>

                      {/* Rent Determination */}
                      <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-orange-200 hover:border-orange-300">
                        <CardContent className="p-6 text-center">
                          <Building2 className="h-12 w-12 text-orange-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                          <h3 className="font-semibold mb-2 text-orange-600">Rent Determination</h3>
                          <p className="text-sm text-muted-foreground">
                            Professional rent determination and arbitration services
                          </p>
                        </CardContent>
                      </Card>

                      {/* Information Memorandum */}
                      <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-blue-200 hover:border-blue-300">
                        <CardContent className="p-6 text-center">
                          <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                          <h3 className="font-semibold mb-2 text-blue-600">Information Memorandum</h3>
                          <p className="text-sm text-muted-foreground">
                            Generate professional investment property memorandums with white label branding
                          </p>
                        </CardContent>
                      </Card>

                      {/* Advertising Valuations - NEW */}
                      <Card 
                        className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-red-200 hover:border-red-300 bg-gradient-to-br from-orange-50 to-red-50"
                        onClick={() => {
                          // Scroll to advertising section
                          document.getElementById('advertising-valuations')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse group-hover:scale-110 transition-transform duration-500"></div>
                            <Megaphone className="relative h-12 w-12 text-red-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                          </div>
                          <h3 className="font-semibold mb-2 text-red-600">🆕 Advertising Valuations</h3>
                          <p className="text-sm text-muted-foreground">
                            Professional signage & digital platform valuations with traffic analysis
                          </p>
                          <div className="flex justify-center gap-1 mt-2 flex-wrap">
                            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Billboard Analysis</span>
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Digital Platforms</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* ESG & Climate Assessment */}
                      <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-green-200 hover:border-green-300">
                        <CardContent className="p-6 text-center">
                          <Sparkles className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                          <h3 className="font-semibold mb-2 text-green-600">ESG & Climate Assessment</h3>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive ESG assessment, climate risk analysis, and carbon farming projects
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced PEXA Integration Benefits Section */}
              <div className="animate-fade-in mt-8" style={{ animationDelay: '1.45s' }}>
                <Card className="bg-gradient-to-br from-blue-50/50 to-primary/5 border-blue-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      PEXA Integration Benefits
                    </CardTitle>
                    <p className="text-muted-foreground text-lg">
                      Seamless property settlement and verification through Australia's electronic conveyancing platform
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="p-4 bg-white/50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Zap className="h-4 w-4 text-blue-600" />
                          </div>
                          <h4 className="font-semibold text-blue-900">Real-Time Settlement Data</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Access live settlement information and transaction status updates directly within our valuation platform for accurate market timing analysis.
                        </p>
                      </div>

                      <div className="p-4 bg-white/50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-green-900">Enhanced Market Analysis</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Combine PEXA settlement data with our valuation algorithms for more accurate comparable sales analysis and market trend identification.
                        </p>
                      </div>

                      <div className="p-4 bg-white/50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <FileText className="h-4 w-4 text-purple-600" />
                          </div>
                          <h4 className="font-semibold text-purple-900">Automated Verification</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Automatically verify property ownership, title details, and encumbrances to ensure valuation accuracy and reduce manual verification time.
                        </p>
                      </div>

                      <div className="p-4 bg-white/50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-orange-600" />
                          </div>
                          <h4 className="font-semibold text-orange-900">Transaction Speed Insights</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Analyze settlement timeframes and transaction volumes to identify market velocity indicators affecting property valuations.
                        </p>
                      </div>

                      <div className="p-4 bg-white/50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-red-600" />
                          </div>
                          <h4 className="font-semibold text-red-900">Risk Assessment Enhancement</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Access caveat and mortgage information to provide comprehensive risk assessment for valuation clients and investment analysis.
                        </p>
                      </div>

                      <div className="p-4 bg-white/50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-teal-600" />
                          </div>
                          <h4 className="font-semibold text-teal-900">Streamlined Reporting</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Generate comprehensive valuation reports with integrated PEXA data, providing clients with complete transaction transparency and confidence.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-lg border border-blue-200/50">
                      <h4 className="font-semibold text-blue-900 mb-2">Key PEXA Integration Advantages:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Reduced Settlement Risk:</strong> Real-time monitoring of transaction progress and potential issues</li>
                        <li>• <strong>Enhanced Due Diligence:</strong> Automated access to title searches and property history</li>
                        <li>• <strong>Market Intelligence:</strong> Settlement data integration for superior comparable analysis</li>
                        <li>• <strong>Client Confidence:</strong> Transparent reporting with verified transaction data</li>
                        <li>• <strong>Efficiency Gains:</strong> Automated data collection reducing manual research time by up to 60%</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* New Advertising Valuations Section */}
              <div id="advertising-valuations" className="animate-fade-in mt-8" style={{ animationDelay: '1.5s' }}>
                <AdvertisingValuationDashboard />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-fade-in" style={{ animationDelay: '1.4s' }}>
                <ComprehensiveIPProtection />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '1.5s' }}>
                <SecurityCertificatesGrid />
              </div>
            </div>
          </div>
          
          {/* Copyright and IP Protection Footer */}
          <div className="container mx-auto px-4 py-8 border-t border-emerald-200/30">
            <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '1.6s' }}>
              <p className="text-sm font-medium text-gray-700">
                © 2025 Delderenzo Property Group Pty Ltd
              </p>
              <p className="text-sm text-gray-600">
                Intellectual Property Protection extends to All Valuation, Financial and Accounting
              </p>
              <p className="text-sm text-gray-600">
                All valuation algorithms and methodologies
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Licensed under MIT License for authorized users
              </p>
            </div>
          </div>
          
          <AIAssistantToggle context="Property Type Selection" />
          
          {/* Always Available Professional Services Hub */}
          <div className="mt-16">
            <Tabs defaultValue="scraper" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="scraper">🎯 RealCommercial Scraper</TabsTrigger>
                <TabsTrigger value="blockchain">⚡ Blockchain Hub</TabsTrigger>
                <TabsTrigger value="mortgage">🏠 Mortgage Broker</TabsTrigger>
                <TabsTrigger value="sales">🏢 Reality Sales</TabsTrigger>
                <TabsTrigger value="management">🔧 Property Management</TabsTrigger>
              </TabsList>

              <TabsContent value="scraper" className="space-y-4">
                <RealCommercialScraper />
              </TabsContent>

              <TabsContent value="blockchain" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Blockchain Hub
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Access blockchain integrations and cryptocurrency trading tools.
                    </p>
                    <Link to="/crypto-trading">
                      <Button className="w-full">Access Blockchain Hub</Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>

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
          </div>
        </div>
      </div>
    );
  }

  switch (currentStep) {
    case "setupMethod":
      return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
          <SetupFlowSelector
            onQuickSetup={() => handleSetupMethodSelect("quick")}
            onAdvancedSetup={() => handleSetupMethodSelect("advanced")}
          />
          <AIAssistantToggle context="Setup Method Selection" />
        </div>
      );

    case "quickSetup":
      return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
          <QuickSetupForm
            onComplete={handleQuickSetupComplete}
            onAdvancedSetup={() => handleSetupMethodSelect("advanced")}
          />
          <AIAssistantToggle context="Quick Setup Form" />
        </div>
      );

    case "streamlinedAssessment":
      const quickSetupData = JSON.parse(localStorage.getItem('quickSetupData') || '{}');
      return (
        <ValuationProvider>
          <div className="min-h-screen">
            <StreamlinedPropertyAssessment
              onComplete={handleStreamlinedComplete}
              initialData={quickSetupData}
            />
            <AIAssistantToggle context="Streamlined Assessment" />
          </div>
        </ValuationProvider>
      );

    case "propertyDetails":
      return (
        <>
          <AutomatedPropertyDetails
            propertyType={selectedPropertyType}
            onNext={handlePropertyDetailsNext}
            onBack={handleBack}
          />
          <AIAssistantToggle context={`Property Details - ${selectedPropertyType}`} />
        </>
      );
    
    case "automatedReport":
      return (
        <>
          <AutomatedReport
            propertyType={selectedPropertyType}
            onBack={handleBack}
          />
          <AIAssistantToggle context={`Report Generation - ${selectedPropertyType}`} />
        </>
      );
    
    default:
      return (
        <>
          <PropertyTypeSelector onSelect={handlePropertyTypeSelect} />
          <AIAssistantToggle context="Property Analysis" />
          
          {/* Professional Services Hub */}
          <div className="mt-16">
            <Tabs defaultValue="scraper" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="scraper">🎯 RealCommercial Scraper</TabsTrigger>
                <TabsTrigger value="blockchain">⚡ Blockchain Hub</TabsTrigger>
                <TabsTrigger value="mortgage">🏠 Mortgage Broker</TabsTrigger>
                <TabsTrigger value="sales">🏢 Reality Sales</TabsTrigger>
                <TabsTrigger value="management">🔧 Property Management</TabsTrigger>
              </TabsList>

              <TabsContent value="scraper" className="space-y-4">
                <RealCommercialScraper />
              </TabsContent>

              <TabsContent value="blockchain" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Blockchain Hub
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Access blockchain integrations and cryptocurrency trading tools.
                    </p>
                    <Link to="/crypto-trading">
                      <Button className="w-full">Access Blockchain Hub</Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>

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
          </div>

        </>
      );
  }
}