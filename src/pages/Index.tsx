// Update this page (the content is just a fallback if you fail to update the page)

import PropertyAddressForm from "@/components/PropertyAddressForm";
import PlanningDataIntegration from "@/components/PlanningDataIntegration";
import PropertySearchAnalysis from "@/components/PropertySearchAnalysis";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-8">
        <PropertyAddressForm />
        <PlanningDataIntegration />
        <PropertySearchAnalysis />
      </div>
    </div>
  );
};

export default Index;
