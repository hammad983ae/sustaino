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
import AutomatedValuationAnalysis from "./AutomatedValuationAnalysis";
import ValuationAnalysisCommercial from "./ValuationAnalysisCommercial";
import ValuationAnalysisResidential from "./ValuationAnalysisResidential";
import ValuationAnalysisAgricultural from "./ValuationAnalysisAgricultural";
import ValuationAnalysisSpecialised from "./ValuationAnalysisSpecialised";
import LiveMarketDataFeed from "./LiveMarketDataFeed";
import InteractivePropertyMap from "./InteractivePropertyMap";
import PredictiveAnalyticsDashboard from "./PredictiveAnalyticsDashboard";
import InsuranceValuations from "./InsuranceValuations";
import { WebDataUploader } from "./WebDataUploader";
import { WebDataStatus } from "./WebDataStatus";
import { AuthRequiredWrapper } from "./AuthRequiredWrapper";

export default function ValuationAnalysis() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="automated" className="w-full">
        <div className="w-full overflow-x-auto">
          <TabsList className="inline-flex h-12 w-max items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground min-w-full">
            <TabsTrigger value="automated" className="whitespace-nowrap px-4 py-2">Automated</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="min-h-[600px]">
          <TabsContent value="automated" className="mt-6">
            <AutomatedValuationAnalysis />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}