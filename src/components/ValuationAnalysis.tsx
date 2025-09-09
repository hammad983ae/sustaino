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
import ValuationAnalysisCommercial from "./ValuationAnalysisCommercial";
import ValuationAnalysisResidential from "./ValuationAnalysisResidential";
import ValuationAnalysisAgricultural from "./ValuationAnalysisAgricultural";
import ValuationAnalysisSpecialised from "./ValuationAnalysisSpecialised";
import EBITDAValuationAnalysis from "./EBITDAValuationAnalysis";

export default function ValuationAnalysis() {
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
          <ValuationAnalysisCommercial />
        </TabsContent>
        
        <TabsContent value="residential" className="mt-6">
          <ValuationAnalysisResidential />
        </TabsContent>
        
        <TabsContent value="agricultural" className="mt-6">
          <ValuationAnalysisAgricultural />
        </TabsContent>
        
        <TabsContent value="specialised" className="mt-6">
          <ValuationAnalysisSpecialised />
        </TabsContent>
        
        <TabsContent value="ebitda" className="mt-6">
          <EBITDAValuationAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
}