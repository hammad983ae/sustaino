import React from "react";
import InsuranceValuations from "@/components/InsuranceValuations";
import BrandedHeader from "@/components/BrandedHeader";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function InsuranceValuationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20">
      <BrandedHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <InsuranceValuations />
      </div>
    </div>
  );
}