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

  // Show IP protection on main screen
  if (currentStep === "propertyType") {
    return (
      <div className="space-y-8">
        <ComprehensiveIPProtection />
        <SecurityCertificatesGrid />
        <PropertyTypeSelector onSelect={handlePropertyTypeSelect} />
      </div>
    );
  }

  switch (currentStep) {
    case "propertyDetails":
      return (
        <AutomatedPropertyDetails
          propertyType={selectedPropertyType}
          onNext={handlePropertyDetailsNext}
          onBack={handleBack}
        />
      );
    
    case "automatedReport":
      return (
        <AutomatedReport
          propertyType={selectedPropertyType}
          onBack={handleBack}
        />
      );
    
    default:
      return <PropertyTypeSelector onSelect={handlePropertyTypeSelect} />;
  }
}