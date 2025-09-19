import React from "react";
import RentDetermination from "@/components/RentDetermination";
import PageHeader from "@/components/PageHeader";
import { Calculator } from "lucide-react";

export default function RentDeterminationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <PageHeader 
        title="Rent Determination"
        subtitle="Professional rent determination services"
        icon={<Calculator className="h-6 w-6 text-white" />}
        gradient="from-green-500 to-blue-600"
      />
      
      <div className="container mx-auto px-4 py-8">
        <RentDetermination />
      </div>
    </div>
  );
}