import React from "react";
import RentRevision from "@/components/RentRevision";
import PageHeader from "@/components/PageHeader";
import { TrendingUp } from "lucide-react";

export default function RentRevisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <PageHeader 
        title="Rent Revision"
        subtitle="Rent revision and market review services"
        icon={<TrendingUp className="h-6 w-6 text-white" />}
        gradient="from-orange-500 to-red-600"
      />
      
      <div className="container mx-auto px-4 py-8">
        <RentRevision />
      </div>
    </div>
  );
}