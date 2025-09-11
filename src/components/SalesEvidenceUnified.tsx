import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenericSalesEvidence from "@/features/reports/components/GenericSalesEvidence";
import SalesEvidenceMildura from "./SalesEvidenceMildura";
import { SalesComparable as SalesComparableDB } from "@/features/forms/schemas";

export default function SalesEvidence() {
  const [residentialComparables, setResidentialComparables] = useState<any[]>([]);
  const [commercialComparables, setCommercialComparables] = useState<any[]>([]);
  const [agriculturalComparables, setAgriculturalComparables] = useState<any[]>([]);
  const [specialisedComparables, setSpecialisedComparables] = useState<any[]>([]);

  return (
    <div className="space-y-6">
      {/* Mildura Specific Sales Evidence - Pre-populated */}
      <SalesEvidenceMildura />
      
      <Tabs defaultValue="residential" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="residential">Residential</TabsTrigger>
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="agricultural">Agricultural</TabsTrigger>
          <TabsTrigger value="specialised">Specialised</TabsTrigger>
        </TabsList>
        
        <TabsContent value="residential" className="mt-6">
          <GenericSalesEvidence
            title="Residential Sales Evidence"
            propertyType="residential"
            comparables={residentialComparables}
            onComparablesChange={setResidentialComparables}
          />
        </TabsContent>
        
        <TabsContent value="commercial" className="mt-6">
          <GenericSalesEvidence
            title="Commercial Sales Evidence"
            propertyType="commercial"
            comparables={commercialComparables}
            onComparablesChange={setCommercialComparables}
          />
        </TabsContent>
        
        <TabsContent value="agricultural" className="mt-6">
          <GenericSalesEvidence
            title="Agricultural Sales Evidence"
            propertyType="agricultural"
            comparables={agriculturalComparables}
            onComparablesChange={setAgriculturalComparables}
          />
        </TabsContent>
        
        <TabsContent value="specialised" className="mt-6">
          <GenericSalesEvidence
            title="Specialised Sales Evidence"
            propertyType="specialised"
            comparables={specialisedComparables}
            onComparablesChange={setSpecialisedComparables}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}