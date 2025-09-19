import React from 'react';
import PropertyAssessmentForm from '@/components/PropertyAssessmentForm';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const PropertyAssessmentFormPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/workhub">
              <Home className="h-4 w-4 mr-2" />
              Back to Work Hub
            </Link>
          </Button>
        </div>
        <PropertyAssessmentForm />
      </div>
    </div>
  );
};

export default PropertyAssessmentFormPage;