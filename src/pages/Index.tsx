// Update this page (the content is just a fallback if you fail to update the page)

import PropertyAddressForm from "@/components/PropertyAddressForm";
import PlanningDataIntegration from "@/components/PlanningDataIntegration";
import PropertySearchAnalysis from "@/components/PropertySearchAnalysis";
import ReportTypeConfiguration from "@/components/ReportTypeConfiguration";
import DocumentPhotoUpload from "@/components/DocumentPhotoUpload";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-8">
        <PropertyAddressForm />
        <PlanningDataIntegration />
        <PropertySearchAnalysis />
        <ReportTypeConfiguration />
        <DocumentPhotoUpload />
      </div>
    </div>
  );
};

export default Index;
