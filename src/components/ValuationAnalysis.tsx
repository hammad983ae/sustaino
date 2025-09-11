/**
 * ============================================================================
 * PROPRIETARY VALUATION ANALYSIS METHODOLOGY
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * This valuation analysis system, including algorithms, methodologies, and
 * assessment frameworks, is proprietary intellectual property protected by
 * international copyright laws and patents.
 * 
 * LICENSING REQUIRED FOR COMMERCIAL USE
 * Contact: licensing@delderenzoproperty.com
 * ============================================================================
 */
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenericValuationAnalysis from "@/features/reports/components/GenericValuationAnalysis";
import EBITDAValuationAnalysis from "./EBITDAValuationAnalysis";
import { ValuationAnalysis as ValuationAnalysisType } from "@/features/forms/schemas";

export default function ValuationAnalysis() {
  const [residentialData, setResidentialData] = useState<ValuationAnalysisType | undefined>();
  const [commercialData, setCommercialData] = useState<ValuationAnalysisType | undefined>();
  const [agriculturalData, setAgriculturalData] = useState<ValuationAnalysisType | undefined>();
  const [specialisedData, setSpecialisedData] = useState<ValuationAnalysisType | undefined>();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="residential" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="residential">Residential</TabsTrigger>
          <TabsTrigger value="agricultural">Agricultural</TabsTrigger>
          <TabsTrigger value="specialised">Specialised</TabsTrigger>
          <TabsTrigger value="ebitda">EBITDA/EBIT</TabsTrigger>
        </TabsList>
        
        <TabsContent value="commercial" className="mt-6">
          <GenericValuationAnalysis
            title="Commercial Valuation Analysis"
            propertyType="commercial"
            onDataChange={setCommercialData}
            initialData={commercialData}
          />
        </TabsContent>
        
        <TabsContent value="residential" className="mt-6">
          <GenericValuationAnalysis
            title="Residential Valuation Analysis"
            propertyType="residential"
            onDataChange={setResidentialData}
            initialData={residentialData}
          />
        </TabsContent>
        
        <TabsContent value="agricultural" className="mt-6">
          <GenericValuationAnalysis
            title="Agricultural Valuation Analysis"
            propertyType="agricultural"
            onDataChange={setAgriculturalData}
            initialData={agriculturalData}
          />
        </TabsContent>
        
        <TabsContent value="specialised" className="mt-6">
          <GenericValuationAnalysis
            title="Specialised Valuation Analysis"
            propertyType="specialised"
            onDataChange={setSpecialisedData}
            initialData={specialisedData}
          />
        </TabsContent>
        
        <TabsContent value="ebitda" className="mt-6">
          <EBITDAValuationAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
}