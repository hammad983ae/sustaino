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
import UnifiedPlatformLayout from '@/components/UnifiedPlatformLayout';

// Import professional images
import automatedValuationPlatform from '@/assets/automated-valuation-platform.jpg';

export default function AutomatedValuation() {
  const [currentStep, setCurrentStep] = useState("brochure");
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

  // Show brochure-style layout
  if (currentStep === "brochure" || currentStep === "default") {
    const platformSections = [
      {
        title: "Core Services",
        cards: [
          {
            id: "property-valuations",
            title: "Property Valuations",
            description: "Professional property assessment services across all asset classes with AI-enhanced analytics",
            icon: "🏠",
            link: "/property-valuations"
          },
          {
            id: "esg-assessment", 
            title: "ESG Assessment",
            description: "Comprehensive environmental, social, and governance assessment including Agri Hub and Property Hub",
            icon: "🌱",
            link: "/esg-climate-assessment"
          },
          {
            id: "financial-reporting",
            title: "Financial Reporting", 
            description: "Advanced financial analysis and reporting for investment decisions",
            icon: "📊",
            link: "/financial-reporting"
          }
        ]
      },
      {
        title: "Revolutionary Platforms",
        cards: [
          {
            id: "sam-platform",
            title: "SAM Platform™",
            description: "Strategic Asset Management: Revolutionary portfolio intelligence platform",
            icon: "🎯",
            link: "/sam-platform"
          },
          {
            id: "auction-sphere",
            title: "Auction-Sphere™", 
            description: "Revolutionary international real estate auction intelligence platform",
            icon: "🔨",
            link: "/auction-sphere-pos"
          },
          {
            id: "brick-by-brick",
            title: "BrickByBrick Pro™",
            description: "Fractional property investment platform - pool investments in premium real estate",
            icon: "🧱",
            link: "/brick-by-brick"
          }
        ]
      }
    ];

    return (
      <UnifiedPlatformLayout
        title="Automated Valuation Platform"
        subtitle="Comprehensive collection of our revolutionary platforms and services"
        colorTheme="purple"
        sections={platformSections}
      >
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-800/80 to-violet-900/80 backdrop-blur-sm rounded-2xl border border-purple-400/30 shadow-2xl shadow-purple-500/20 p-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent mb-4">
              🌍 Sustaino World - Professional Platform Suite
            </h3>
            <p className="text-white/80 mb-6">
              Access all professional tools from one organized dashboard
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => setCurrentStep("propertyType")}
                className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-8 py-3 text-lg shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105"
              >
                Start Assessment
              </Button>
              <Link to="/brochure-viewer">
                <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 text-lg shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105">
                  View All Brochures
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </UnifiedPlatformLayout>
    );
  }

  // Show legacy interface for property type selection
  if (currentStep === "propertyType") {
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
                <Button 
                  onClick={() => setCurrentStep("brochure")}
                  className="green-3d-button flex items-center gap-2 px-4 py-2 hover:shadow-green-glow rounded-lg transition-all duration-300 text-white font-medium animate-green-glow backdrop-blur-sm border border-green-300/70"
                >
                  🏠 Back to Platform
                </Button>
                
                {/* New Sustaino World Tab - Primary Platform Access */}
                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-300/50 rounded-lg px-6 py-2">
                  <span className="text-white font-semibold text-lg">🌍 Sustaino World - Professional Platform Suite</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <AuthStatus />
              </div>
            </div>
            
            {/* Property Type Selection */}
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-emerald-200/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-emerald-700">Select Property Type</CardTitle>
                  <CardDescription>Choose the type of property you want to assess</CardDescription>
                </CardHeader>
                <CardContent>
                  <PropertyTypeSelector onSelect={handlePropertyTypeSelect} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show setup method selection
  if (currentStep === "setupMethod") {
    return (
      <div className="min-h-screen hero-green-background relative overflow-hidden">
        <div className="relative z-10">
          <BrandedHeader />
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-emerald-200/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-emerald-700">Choose Setup Method</CardTitle>
                  <CardDescription>Select how you'd like to proceed with your valuation</CardDescription>
                </CardHeader>
                <CardContent>
                  <SetupFlowSelector 
                    onQuickSetup={() => handleSetupMethodSelect("quick")}
                    onAdvancedSetup={() => handleSetupMethodSelect("advanced")}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show quick setup form
  if (currentStep === "quickSetup") {
    return (
      <div className="min-h-screen hero-green-background relative overflow-hidden">
        <div className="relative z-10">
          <BrandedHeader />
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-emerald-200/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-emerald-700">Quick Setup</CardTitle>
                  <CardDescription>Fast track your valuation with basic property details</CardDescription>
                </CardHeader>
                <CardContent>
                  <QuickSetupForm 
                    onComplete={handleQuickSetupComplete}
                    onAdvancedSetup={() => setCurrentStep("propertyDetails")}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show streamlined assessment
  if (currentStep === "streamlinedAssessment") {
    return (
      <div className="min-h-screen hero-green-background relative overflow-hidden">
        <div className="relative z-10">
          <BrandedHeader />
          <div className="container mx-auto px-4 py-8">
            <StreamlinedPropertyAssessment onComplete={handleStreamlinedComplete} />
          </div>
        </div>
      </div>
    );
  }

  // Show property details form
  if (currentStep === "propertyDetails") {
    return (
      <div className="min-h-screen hero-green-background relative overflow-hidden">
        <div className="relative z-10">
          <BrandedHeader />
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border border-emerald-200/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-emerald-700">Property Details</CardTitle>
                  <CardDescription>Complete property information and assessment details</CardDescription>
                </CardHeader>
                <CardContent>
                  <AutomatedPropertyDetails 
                    propertyType={selectedPropertyType}
                    onNext={handlePropertyDetailsNext}
                    onBack={handleBack}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show automated report
  if (currentStep === "automatedReport") {
    return (
      <ValuationProvider>
        <AutomatedReport propertyType={selectedPropertyType || "residential"} />
      </ValuationProvider>
    );
  }

  // Default fallback
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <Button onClick={() => setCurrentStep("brochure")}>
          Go to Platform
        </Button>
      </div>
    </div>
  );
}