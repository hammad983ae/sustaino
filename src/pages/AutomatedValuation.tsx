/**
 * ============================================================================
 * PROPRIETARY AUTOMATED VALUATION PLATFORM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * Property Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Sparkles } from "lucide-react";
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

import BrandedHeader from "@/components/BrandedHeader";
import PropertyValuation3DBackground from "@/components/PropertyValuation3DBackground";
import ThunderboltIcon from "@/components/ThunderboltIcon";
import AIAssistantToggle from "@/components/AIAssistantToggle";
import AuthStatus from "@/components/AuthStatus";
import PropertyUpdateFeed from "@/components/PropertyUpdateFeed";
import ConstructionCostIndex from "@/components/ConstructionCostIndex";
import DevelopmentCalculator from "@/components/DevelopmentCalculator";
import PEXAIntegration from "@/components/PEXAIntegration";

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
          
          {/* Navigation Links with enhanced styling */}
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <a 
                  href="/" 
                  className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-glow backdrop-blur-sm border border-green-300/70"
                >
                  🏠 Back to Dashboard
                </a>
                <a 
                  href="/dashboard" 
                  className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-pulse backdrop-blur-sm border border-green-300/70"
                >
                  📊 Analytics Dashboard
                </a>
                <a 
                  href="/index" 
                  className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-pulse backdrop-blur-sm border border-green-300/70"
                >
                  🌍 ESG Platform
                </a>
                <a 
                  href="/sam-platform" 
                  className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-pulse backdrop-blur-sm border border-green-300/70"
                >
                  🎯 SAM Platform
                </a>
                <a 
                  href="/crypto-trading" 
                  className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-pulse backdrop-blur-sm border border-green-300/70"
                >
                  ⚡ Blockchain Hub
                </a>
                <a 
                  href="#mortgage-broker" 
                  className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-pulse backdrop-blur-sm border border-green-300/70"
                >
                  🏠 Mortgage Broker
                </a>
                <a 
                  href="#reality-sales" 
                  className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-pulse backdrop-blur-sm border border-green-300/70"
                >
                  🏢 Reality Sales
                </a>
                <a 
                  href="#property-management" 
                  className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-pulse backdrop-blur-sm border border-green-300/70"
                >
                  🔧 Property Management
                </a>
              </div>
              <div className="flex items-center gap-4">
                <AuthStatus />
              </div>
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
        <div className="min-h-screen">
          <StreamlinedPropertyAssessment
            onComplete={handleStreamlinedComplete}
            initialData={quickSetupData}
          />
          <AIAssistantToggle context="Streamlined Assessment" />
        </div>
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