import React from "react";
import InsuranceValuations from "@/components/InsuranceValuations";
import BrandedHeader from "@/components/BrandedHeader";

export default function InsuranceValuationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20">
      <BrandedHeader />
      <div className="container mx-auto px-4 py-6">
        <InsuranceValuations />
      </div>
    </div>
  );
}