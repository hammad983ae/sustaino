import React from "react";
import PlantAndEquipment from "@/components/PlantAndEquipment";
import PageHeader from "@/components/PageHeader";
import { Settings } from "lucide-react";

export default function PlantAndEquipmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <PageHeader 
        title="Plant & Equipment"
        subtitle="Plant and equipment valuation services"
        icon={<Settings className="h-6 w-6 text-white" />}
        gradient="from-blue-500 to-indigo-600"
      />
      
      <div className="container mx-auto px-4 py-8">
        <PlantAndEquipment />
      </div>
    </div>
  );
}