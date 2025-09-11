/**
 * ============================================================================
 * PROPRIETARY AUTOMATED VALUATION PLATFORM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * Property Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */
import React, { useState } from "react";
import PropertyTypeSelector from "@/components/PropertyTypeSelector";
import AutomatedPropertyDetails from "@/components/AutomatedPropertyDetails";
import AutomatedReport from "./AutomatedReport";
import ComprehensiveIPProtection from "@/components/ComprehensiveIPProtection";
import SecurityCertificatesGrid from "@/components/SecurityCertificatesGrid";
import { CostaGroupPortfolio } from "@/components/CostaGroupPortfolio";
import BrandedHeader from "@/components/BrandedHeader";

import AIAssistantToggle from "@/components/AIAssistantToggle";

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
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10">
        <BrandedHeader />
        
        {/* Navigation Links */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <a 
                href="/dashboard" 
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-primary font-medium"
              >
                📊 Analytics Dashboard
              </a>
              <a 
                href="/index" 
                className="flex items-center gap-2 px-4 py-2 bg-secondary/10 hover:bg-secondary/20 rounded-lg transition-colors text-secondary font-medium"
              >
                🌍 ESG Platform
              </a>
            </div>
          </div>
        </div>
        
        {/* Hero Section - Property Valuation */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Professional Property Valuations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get accurate, AI-powered property valuations with comprehensive reports in minutes
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <PropertyTypeSelector onSelect={handlePropertyTypeSelect} />
          </div>
        </div>

        {/* Secondary Features - Moved to bottom */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <CostaGroupPortfolio />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ComprehensiveIPProtection />
            <SecurityCertificatesGrid />
          </div>
        </div>
        
        <AIAssistantToggle context="Property Type Selection" />
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