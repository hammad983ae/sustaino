import React from "react";
import InsuranceValuations from "@/components/InsuranceValuations";
import PageHeader from "@/components/PageHeader";
import { Shield } from "lucide-react";

export default function InsuranceValuationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20">
      <PageHeader 
        title="Insurance Valuations"
        subtitle="Comprehensive insurance valuation services"
        icon={<Shield className="h-6 w-6 text-white" />}
        gradient="from-purple-500 to-blue-600"
      />
      
      <div className="container mx-auto px-4 py-6">
        <InsuranceValuations />
      </div>
    </div>
  );
}