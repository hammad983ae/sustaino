import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesEvidenceCommercial from "./SalesEvidenceCommercial";
import SalesEvidenceResidential from "./SalesEvidenceResidential";
import SalesEvidenceAgricultural from "./SalesEvidenceAgricultural";
import SalesEvidenceDevelopment from "./SalesEvidenceDevelopment";
import SalesEvidenceSpecialised from "./SalesEvidenceSpecialised";
import EnhancedSalesEvidenceCommercial from "./EnhancedSalesEvidenceCommercial";
import EnhancedSalesEvidenceResidential from "./EnhancedSalesEvidenceResidential";
import EnhancedSalesEvidenceSpecialised from "./EnhancedSalesEvidenceSpecialised";

export default function SalesEvidence() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="residential" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="residential">Residential</TabsTrigger>
          <TabsTrigger value="agricultural">Agricultural</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="specialised">Specialised</TabsTrigger>
        </TabsList>
        
        <TabsContent value="commercial" className="mt-6">
          <EnhancedSalesEvidenceCommercial />
        </TabsContent>
        
        <TabsContent value="residential" className="mt-6">
          <EnhancedSalesEvidenceResidential />
        </TabsContent>
        
        <TabsContent value="agricultural" className="mt-6">
          <SalesEvidenceAgricultural />
        </TabsContent>
        
        <TabsContent value="development" className="mt-6">
          <SalesEvidenceDevelopment />
        </TabsContent>
        
        <TabsContent value="specialised" className="mt-6">
          <EnhancedSalesEvidenceSpecialised />
        </TabsContent>
      </Tabs>
    </div>
  );
}