import React from "react";
import BrandedHeader from "@/components/BrandedHeader";
import ComprehensiveEcosystemValuation from "@/components/ComprehensiveEcosystemValuation";

const ComprehensiveValuation = () => {
  return (
    <div className="min-h-screen bg-background">
      <BrandedHeader />
      <div className="container mx-auto px-4 py-8">
        <ComprehensiveEcosystemValuation />
      </div>
    </div>
  );
};

export default ComprehensiveValuation;