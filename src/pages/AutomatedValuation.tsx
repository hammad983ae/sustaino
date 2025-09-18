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
import UnifiedPlatformLayout from '@/components/UnifiedPlatformLayout';
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
    const poweredSections = [
      {
        id: 'property-assessment',
        title: 'Property Assessment',
        description: 'Complete property assessment form to receive comprehensive ESG-integrated valuation report',
        icon: <Building2 className="w-8 h-8 text-white" />,
        component: PropertyTypeSelector
      },
      {
        id: 'additional-tools',
        title: 'Additional Tools',
        description: 'Access specialized tools for enhanced property analysis and reporting',
        icon: <BarChart3 className="w-8 h-8 text-white" />,
      },
      {
        id: 'product-info',
        title: 'Product Information',
        description: 'Learn about our comprehensive property valuation platform features',
        icon: <FileText className="w-8 h-8 text-white" />,
      },
      {
        id: 'user-guide',
        title: 'User Guide',
        description: 'Step-by-step guidance for optimal platform utilization',
        icon: <Megaphone className="w-8 h-8 text-white" />,
      }
    ];

    const categories = {
      'Professional Property Assessment Platform': poweredSections
    };

    return (
      <UnifiedPlatformLayout
        title="Powered"
        subtitle="Complete your property assessment form to receive a comprehensive ESG-integrated valuation report."
        categories={categories}
        accentColor="purple"
      >
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 backdrop-blur-sm border-purple-300/30 border p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Professional Property Assessment Platform</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-3xl mx-auto text-lg">
              A Sustaino Pro Product - Complete your property assessment form to receive a comprehensive ESG-integrated valuation report.
            </p>
            <Button
              onClick={() => setCurrentStep("propertyDetails")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Start Property Assessment
            </Button>
          </Card>
        </div>
      </UnifiedPlatformLayout>
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
        </div>
      );

    case "quickSetup":
      return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
          <QuickSetupForm 
            onComplete={handleQuickSetupComplete}
            onAdvancedSetup={() => handleSetupMethodSelect("advanced")}
          />
        </div>
      );

    case "streamlinedAssessment":
      return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
          <StreamlinedPropertyAssessment 
            onComplete={handleStreamlinedComplete}
          />
        </div>
      );

    case "propertyDetails":
      return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
          <ValuationProvider>
            <AutomatedPropertyDetails 
              propertyType={selectedPropertyType}
              onNext={handlePropertyDetailsNext}
              onBack={handleBack}
            />
          </ValuationProvider>
        </div>
      );

    case "automatedReport":
      return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
          <ValuationProvider>
            <AutomatedReport propertyType={selectedPropertyType} />
          </ValuationProvider>
        </div>
      );

    default:
      return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
            <Button onClick={() => setCurrentStep("propertyType")}>
              Return to Home
            </Button>
          </div>
        </div>
      );
  }
}