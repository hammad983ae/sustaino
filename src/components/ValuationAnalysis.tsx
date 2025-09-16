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
            <TabsTrigger value="commercial" className="whitespace-nowrap px-4 py-2">Commercial</TabsTrigger>
            <TabsTrigger value="residential" className="whitespace-nowrap px-4 py-2">Residential</TabsTrigger>
            <TabsTrigger value="agricultural" className="whitespace-nowrap px-4 py-2">Agricultural</TabsTrigger>
            <TabsTrigger value="specialised" className="whitespace-nowrap px-4 py-2">Specialised</TabsTrigger>
            <TabsTrigger value="market-data" className="whitespace-nowrap px-4 py-2">Live Market</TabsTrigger>
            <TabsTrigger value="mapping" className="whitespace-nowrap px-4 py-2">Smart Maps</TabsTrigger>
            <TabsTrigger value="predictions" className="whitespace-nowrap px-4 py-2">AI Predictions</TabsTrigger>
            <TabsTrigger value="insurance" className="whitespace-nowrap px-4 py-2">Insurance</TabsTrigger>
            <TabsTrigger value="web-data" className="whitespace-nowrap px-4 py-2 bg-primary/10 text-primary border border-primary/20">PDF/Web Data</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="min-h-[600px]">
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
            <AuthRequiredWrapper 
              title="Web Data Extraction"
              description="Authentication is required to extract and save property data from PDFs and websites"
            >
              <div className="space-y-6">
                <WebDataStatus />
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-semibold text-primary">PDF & Web Data Extraction</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Extract property data from PDFs and websites automatically using AI
                      </p>
                    </div>
                    <WebDataUploader />
                  </CardContent>
                </Card>
              </div>
            </AuthRequiredWrapper>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}