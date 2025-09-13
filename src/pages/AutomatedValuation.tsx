/**
 * ============================================================================
 * PROPRIETARY AUTOMATED VALUATION PLATFORM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * Property Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */
import React, { useState } from "react";
import { Zap, Sparkles } from "lucide-react";
import PropertyTypeSelector from "@/components/PropertyTypeSelector";
import AutomatedPropertyDetails from "@/components/AutomatedPropertyDetails";
import AutomatedReport from "./AutomatedReport";
import ComprehensiveIPProtection from "@/components/ComprehensiveIPProtection";
import SecurityCertificatesGrid from "@/components/SecurityCertificatesGrid";
import { CostaGroupPortfolio } from "@/components/CostaGroupPortfolio";
import BrandedHeader from "@/components/BrandedHeader";
import PropertyValuation3DBackground from "@/components/PropertyValuation3DBackground";
import ThunderboltIcon from "@/components/ThunderboltIcon";
import AIAssistantToggle from "@/components/AIAssistantToggle";
import AuthStatus from "@/components/AuthStatus";
import PropertyUpdateFeed from "@/components/PropertyUpdateFeed";

export default function AutomatedValuation() {
  const [currentStep, setCurrentStep] = useState("propertyType");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");

  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(type);
    setCurrentStep("propertyDetails");
  };

  const handlePropertyDetailsNext = () => {
    setCurrentStep("automatedReport");
  };

  const handleBack = () => {
    if (currentStep === "propertyDetails") {
      setCurrentStep("propertyType");
    } else if (currentStep === "automatedReport") {
      setCurrentStep("propertyDetails");
    }
  };

  // Show property valuation as primary feature
  if (currentStep === "propertyType") {
    return (
      <div className="min-h-screen hero-green-background relative overflow-hidden">
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
                  href="/dashboard" 
                  className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-glow backdrop-blur-sm border border-green-300/70"
                >
                  📊 Analytics Dashboard
                </a>
                <a 
                  href="/index" 
                  className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-pulse backdrop-blur-sm border border-green-300/70"
                >
                  🌍 ESG Platform
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
                <span className="font-semibold bg-gradient-to-r from-yellow-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
                <CostaGroupPortfolio />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '1.1s' }}>
                <PropertyUpdateFeed />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
                <ComprehensiveIPProtection />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '1.4s' }}>
                <SecurityCertificatesGrid />
              </div>
            </div>
          </div>
          
          {/* Copyright and IP Protection Footer */}
          <div className="container mx-auto px-4 py-8 border-t border-emerald-200/30">
            <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '1.6s' }}>
              <p className="text-sm font-medium text-gray-700">
                © 2024 Delderenzo Property Group Pty Ltd
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
        </>
      );
  }
}