import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeasingEvidenceCommercial from "./LeasingEvidenceCommercial";
import LeasingEvidenceResidential from "./LeasingEvidenceResidential";
import LeasingEvidenceAgricultural from "./LeasingEvidenceAgricultural";
import LeasingEvidenceSpecialised from "./LeasingEvidenceSpecialised";

export default function LeasingEvidence() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="residential" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="residential">Residential</TabsTrigger>
          <TabsTrigger value="agricultural">Agricultural</TabsTrigger>
          <TabsTrigger value="specialised">Specialised</TabsTrigger>
        </TabsList>
        
        <TabsContent value="commercial" className="mt-6">
          <LeasingEvidenceCommercial />
        </TabsContent>
        
        <TabsContent value="residential" className="mt-6">
          <LeasingEvidenceResidential />
        </TabsContent>
        
        <TabsContent value="agricultural" className="mt-6">
          <LeasingEvidenceAgricultural />
        </TabsContent>
        
        <TabsContent value="specialised" className="mt-6">
          <LeasingEvidenceSpecialised />
        </TabsContent>
      </Tabs>
    </div>
  );
}