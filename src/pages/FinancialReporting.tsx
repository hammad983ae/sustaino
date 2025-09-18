import React from "react";
import { FinancialReportingHub } from "@/components/FinancialReportingHub";

// Import professional images
import financialReportingPlatform from '@/assets/financial-reporting-platform.jpg';

export default function FinancialReporting() {
  return (
    <div>
      {/* Professional Visual Header */}
      <div className="relative h-64 overflow-hidden mb-6">
        <img 
          src={financialReportingPlatform} 
          alt="Professional Financial Reporting Platform" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-blue-900/70" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold">Financial Reporting Hub</h1>
          <p className="text-lg opacity-90">Advanced ESG-integrated financial analytics</p>
        </div>
      </div>
      <FinancialReportingHub />
    </div>
  );
}