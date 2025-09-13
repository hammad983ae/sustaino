import React, { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

export default function FullScreenDemo() {
  const [currentStep, setCurrentStep] = useState("propertyType");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Show property valuation as primary feature
  if (currentStep === "propertyType") {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* 3D Background */}
        <PropertyValuation3DBackground />
        
        {/* Enhanced gradient background for full screen */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/95 via-white/98 to-teal-50/95 backdrop-blur-sm" />
        
        {/* Floating orbs for extra ambiance - enhanced for full screen */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-yellow-300/15 to-emerald-300/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '6s' }} />
        
        <div className="relative z-10">
          <BrandedHeader />
          
          {/* Full Screen Toggle Button */}
          <div className="fixed top-4 right-4 z-50">
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="sm"
              className="bg-white/80 backdrop-blur-sm border-emerald-200/50 hover:border-emerald-400/70 hover:bg-emerald-50/80"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-4 w-4 mr-2" />
                  Exit Fullscreen
                </>
              ) : (
                <>
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Fullscreen Demo
                </>
              )}
            </Button>
          </div>
          
          {/* Navigation Links - optimized for full screen */}
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-8 animate-fade-in">
              <div className="flex items-center gap-6">
                <a 
                  href="/dashboard" 
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl transition-all duration-300 text-emerald-700 font-medium hover-scale backdrop-blur-sm border border-emerald-200/50 hover:border-emerald-300/70 text-lg"
                >
                  📊 Analytics Dashboard
                </a>
                <a 
                  href="/index" 
                  className="flex items-center gap-2 px-6 py-3 bg-teal-500/10 hover:bg-teal-500/20 rounded-xl transition-all duration-300 text-teal-700 font-medium hover-scale backdrop-blur-sm border border-teal-200/50 hover:border-teal-300/70 text-lg"
                >
                  🌍 ESG Platform
                </a>
              </div>
            </div>
          </div>
          
          {/* Hero Section - Enhanced for full screen */}
          <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-16 animate-fade-in relative" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-8 animate-scale-in leading-tight">
                Professional Property Valuations and ESG Assessments
              </h1>
              
              <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl lg:text-4xl text-gray-600 max-w-6xl mx-auto leading-relaxed animate-fade-in flex-wrap mb-8 relative" style={{ animationDelay: '0.4s' }}>
                <a 
                  href="/index" 
                  className="absolute -top-16 left-12 flex items-center gap-3 hover:scale-105 transition-all duration-300 z-10"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="transform rotate-[-45deg] text-lg font-bold text-foreground hover:text-primary whitespace-nowrap">Back to Original Platform</span>
                </a>
                <ThunderboltIcon className="w-12 h-12 md:w-16 md:h-16 animate-pulse" />
                <span className="font-semibold bg-gradient-to-r from-yellow-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
                  Powered
                </span>
                <span>- Instant Property Valuations and ESG Assessment Powered By</span>
                <span className="font-bold text-emerald-600">Sustaino-Pro</span>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <PropertyTypeSelector onSelect={handlePropertyTypeSelect} />
            </div>
          </div>

          {/* Subtitle Section - Enhanced for full screen */}
          <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500/10 rounded-2xl border border-emerald-200/50 backdrop-blur-sm">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Sustaino Pro Valuation Platform
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 mt-6 max-w-5xl mx-auto">
                Automated Property Valuations with ESG Intelligence
              </p>
              <p className="text-lg text-gray-500 mt-4 max-w-6xl mx-auto">
                Select your property type to begin an automated valuation powered by AI market analysis, comparable sales 
                data, and comprehensive ESG assessment.
              </p>
            </div>
          </div>

          {/* Secondary Features - Enhanced with larger spacing for full screen */}
          <div className="container mx-auto px-6 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
                <CostaGroupPortfolio />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
                <ComprehensiveIPProtection />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '1.4s' }}>
                <SecurityCertificatesGrid />
              </div>
            </div>
          </div>
          
          {/* Copyright and IP Protection Footer */}
          <div className="container mx-auto px-6 py-12 border-t border-emerald-200/30">
            <div className="text-center space-y-3 animate-fade-in" style={{ animationDelay: '1.6s' }}>
              <p className="text-lg font-medium text-gray-700">
                © 2024 Delderenzo Property Group Pty Ltd
              </p>
              <p className="text-base text-gray-600">
                Intellectual Property Protection extends to All Valuation, Financial and Accounting
              </p>
              <p className="text-base text-gray-600">
                All valuation algorithms and methodologies
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Licensed under MIT License for authorized users
              </p>
            </div>
          </div>
          
          <AIAssistantToggle context="Full Screen Property Type Selection Demo" />
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