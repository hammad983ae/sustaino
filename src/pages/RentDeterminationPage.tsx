import React from "react";
import RentDetermination from "@/components/RentDetermination";

export default function RentDeterminationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <RentDetermination />
      </div>
    </div>
  );
}