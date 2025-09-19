import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeasingEvidenceCommercial from "./LeasingEvidenceCommercial";
import LeasingEvidenceResidential from "./LeasingEvidenceResidential";
import LeasingEvidenceAgricultural from "./LeasingEvidenceAgricultural";
import LeasingEvidenceSpecialised from "./LeasingEvidenceSpecialised";
import EnhancedLeasingEvidence from "../EnhancedLeasingEvidence";

export default function LeasingEvidence() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="enhanced" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="enhanced">Enhanced Auto-Adjust</TabsTrigger>
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="residential">Residential</TabsTrigger>
          <TabsTrigger value="agricultural">Agricultural</TabsTrigger>
          <TabsTrigger value="specialised">Specialised</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enhanced" className="mt-6">
          <EnhancedLeasingEvidence />
        </TabsContent>

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