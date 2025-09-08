import React, { useState } from "react";
import PropertyTypeSelector from "@/components/PropertyTypeSelector";
import AutomatedPropertyDetails from "@/components/AutomatedPropertyDetails";
import AutomatedReport from "./AutomatedReport";

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

  switch (currentStep) {
    case "propertyType":
      return <PropertyTypeSelector onSelect={handlePropertyTypeSelect} />;
    
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