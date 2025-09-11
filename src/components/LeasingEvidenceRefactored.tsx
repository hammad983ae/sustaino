import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenericLeasingEvidence from "@/features/reports/components/GenericLeasingEvidence";
import LeasingEvidenceMildura from "./LeasingEvidenceMildura";
import { LeasingEvidence as LeasingEvidenceType } from "@/features/forms/schemas";

export default function LeasingEvidence() {
  const [residentialData, setResidentialData] = useState<LeasingEvidenceType | undefined>();
  const [commercialData, setCommercialData] = useState<LeasingEvidenceType | undefined>();
  const [agriculturalData, setAgriculturalData] = useState<LeasingEvidenceType | undefined>();
  const [specialisedData, setSpecialisedData] = useState<LeasingEvidenceType | undefined>();

  return (
    <div className="space-y-6">
      {/* Mildura Specific Leasing Evidence - Pre-populated */}
      <LeasingEvidenceMildura />
      
      <Tabs defaultValue="residential" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="residential">Residential</TabsTrigger>
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="agricultural">Agricultural</TabsTrigger>
          <TabsTrigger value="specialised">Specialised</TabsTrigger>
        </TabsList>
        
        <TabsContent value="residential" className="mt-6">
          <GenericLeasingEvidence
            title="Residential Leasing Evidence"
            propertyType="residential"
            onDataChange={setResidentialData}
            initialData={residentialData}
          />
        </TabsContent>
        
        <TabsContent value="commercial" className="mt-6">
          <GenericLeasingEvidence
            title="Commercial Leasing Evidence"
            propertyType="commercial"
            onDataChange={setCommercialData}
            initialData={commercialData}
          />
        </TabsContent>
        
        <TabsContent value="agricultural" className="mt-6">
          <GenericLeasingEvidence
            title="Agricultural Leasing Evidence"
            propertyType="agricultural"
            onDataChange={setAgriculturalData}
            initialData={agriculturalData}
          />
        </TabsContent>
        
        <TabsContent value="specialised" className="mt-6">
          <GenericLeasingEvidence
            title="Specialised Leasing Evidence"
            propertyType="specialised"
            onDataChange={setSpecialisedData}
            initialData={specialisedData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}