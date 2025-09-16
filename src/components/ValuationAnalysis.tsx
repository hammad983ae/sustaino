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

export default function ValuationAnalysis() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="automated" className="w-full">
        <TabsList className="grid w-full grid-cols-10">
          <TabsTrigger value="automated">Automated</TabsTrigger>
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="residential">Residential</TabsTrigger>
          <TabsTrigger value="agricultural">Agricultural</TabsTrigger>
          <TabsTrigger value="specialised">Specialised</TabsTrigger>
          <TabsTrigger value="market-data">Live Market</TabsTrigger>
          <TabsTrigger value="mapping">Smart Maps</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="insurance">Insurance Valuations</TabsTrigger>
          <TabsTrigger value="web-data">Web Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="automated" className="mt-6">
          <AutomatedValuationAnalysis />
        </TabsContent>
        
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
        
        <TabsContent value="market-data" className="mt-6">
          <LiveMarketDataFeed />
        </TabsContent>
        
        <TabsContent value="mapping" className="mt-6">
          <InteractivePropertyMap />
        </TabsContent>
        
        <TabsContent value="predictions" className="mt-6">
          <PredictiveAnalyticsDashboard />
        </TabsContent>
        
        <TabsContent value="insurance" className="mt-6">
          <InsuranceValuations />
        </TabsContent>
        
        <TabsContent value="web-data" className="mt-6">
          <WebDataUploader />
        </TabsContent>
      </Tabs>
    </div>
  );
}