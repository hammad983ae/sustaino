import React from "react";
import BrandedHeader from "@/components/BrandedHeader";
import AdvertisingValuationDashboard from "@/components/AdvertisingValuationDashboard";

const AdvertisingValuation = () => {
  return (
    <div className="min-h-screen bg-background">
      <BrandedHeader />
      <div className="container mx-auto px-4 py-8">
        <AdvertisingValuationDashboard />
      </div>
    </div>
  );
};

export default AdvertisingValuation;