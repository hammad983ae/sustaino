/**
 * ============================================================================
 * PROPRIETARY AUTOMATED VALUATION PLATFORM
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * Property Pro™ - Registered Trademark - Licensed Software
 * ============================================================================
 */
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import PropertyTypeSelector from "@/components/PropertyTypeSelector";
import AutomatedPropertyDetails from "@/components/AutomatedPropertyDetails";
import AutomatedReport from "./AutomatedReport";
import SetupFlowSelector from "@/components/SetupFlowSelector";
import QuickSetupForm from "@/components/QuickSetupForm";
import StreamlinedPropertyAssessment from "@/components/StreamlinedPropertyAssessment";
import { ValuationProvider } from "@/contexts/ValuationContext";
import { PropertyTypeLockProvider } from "@/components/PropertyTypeLockProvider";
import BrandedHeader from "@/components/BrandedHeader";

export default function AutomatedValuation() {
  const [currentStep, setCurrentStep] = useState("propertyType");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [setupMethod, setSetupMethod] = useState<"quick" | "advanced" | null>(null);

  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(type);
    setCurrentStep("setupMethod");
  };

  const handleQuickSetup = () => {
    setSetupMethod("quick");
    setCurrentStep("quickSetup");
  };

  const handleAdvancedSetup = () => {
    setSetupMethod("advanced");
    setCurrentStep("propertyDetails");
  };

  const handleQuickSetupComplete = (data: any) => {
    localStorage.setItem('quickSetupData', JSON.stringify({
      ...data,
      propertyType: selectedPropertyType
    }));
    if (data.proceedToStreamlined) {
      setCurrentStep("streamlinedAssessment");
    } else {
      setCurrentStep("automatedReport");
    }
  };

  const handleStreamlinedComplete = (data: any) => {
    localStorage.setItem('streamlinedAssessmentData', JSON.stringify({
      ...data,
      propertyType: selectedPropertyType
    }));
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

  // Show property valuation flow
  if (currentStep === "propertyType" || currentStep === "default") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <BrandedHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-emerald-700 mb-4">
                Start Property Valuation
              </h1>
              <p className="text-xl text-emerald-600 mb-2">
                Select property type to begin ICV (Instant Comprehensive Valuation)™ process
              </p>
              <p className="text-sm text-emerald-500">
                Professional Property Valuation and ESG Assessment Technology
              </p>
            </div>
            
            <PropertyTypeSelector onSelect={handlePropertyTypeSelect} />
          </div>
        </div>
      </div>
    );
  }

  // Setup method selection
  if (currentStep === "setupMethod") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <BrandedHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <SetupFlowSelector
              onQuickSetup={handleQuickSetup}
              onAdvancedSetup={handleAdvancedSetup}
            />
          </div>
        </div>
      </div>
    );
  }

  // Quick setup flow
  if (currentStep === "quickSetup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <BrandedHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <QuickSetupForm
              onComplete={handleQuickSetupComplete}
              onAdvancedSetup={handleAdvancedSetup}
            />
          </div>
        </div>
      </div>
    );
  }

  // Streamlined assessment
  if (currentStep === "streamlinedAssessment") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <BrandedHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <StreamlinedPropertyAssessment
              onComplete={handleStreamlinedComplete}
            />
          </div>
        </div>
      </div>
    );
  }

  // Property details (advanced setup)
  if (currentStep === "propertyDetails") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <BrandedHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <AutomatedPropertyDetails
              propertyType={selectedPropertyType}
              onNext={handlePropertyDetailsNext}
              onBack={handleBack}
            />
          </div>
        </div>
      </div>
    );
  }

  // Final report
  if (currentStep === "automatedReport") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
        <BrandedHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <ValuationProvider>
              <PropertyTypeLockProvider>
                <AutomatedReport
                  propertyType={selectedPropertyType}
                  onBack={handleBack}
                />
              </PropertyTypeLockProvider>
            </ValuationProvider>
          </div>
        </div>
      </div>
    );
  }

  return null;
}