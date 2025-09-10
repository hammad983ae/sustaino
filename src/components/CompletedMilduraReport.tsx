import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MapPin, TrendingUp, Download, Printer } from "lucide-react";
import ExecutiveSummary from "./ExecutiveSummary";
import RPDAndLocation from "./RPDAndLocation";
import LegalAndPlanning from "./LegalAndPlanning";
import PropertyDetails from "./PropertyDetails";
import ValuationAnalysisResidential from "./ValuationAnalysisResidential";
import SalesEvidenceMildura from "./SalesEvidenceMildura";
import LeasingEvidenceMildura from "./LeasingEvidenceMildura";
import MarketCommentaryMildura from "./MarketCommentaryMildura";
import ClimateRiskAssessmentMildura from "./ClimateRiskAssessmentMildura";
import ValuationCertificate from "./ValuationCertificate";
import PropertyPhotosSection from "./PropertyPhotosSection";

const CompletedMilduraReport = () => {
  const reportConfig = {
    reportType: "comprehensive-assessment",
    propertyType: "residential",
    valuationPurpose: ["Mortgage Security", "Purchase Decision"],
    instructingParty: "Mildura Finance Group",
    reliantParty: "Property Purchaser",
    basisOfValuation: ["Market Value"],
    valuationApproaches: ["Direct Comparison", "Income Approach"],
    valueComponent: ["Land and Improvements"],
    interestValues: ["Freehold Estate"],
    gstTreatment: "exclusive",
    basisOfAssessment: "as-is-where-is",
  };

  const includedSections = [
    "Executive Summary",
    "RPD and Location", 
    "Legal and Planning",
    "Property Details",
    "Valuation Analysis",
    "Sales Evidence",
    "Leasing Evidence", 
    "Market Commentary",
    "Climate Risk Assessment",
    "Valuation Certificate"
  ];

  const handleDownloadPDF = () => {
    // Simulate PDF generation
    console.log("Generating PDF report for 320 Deakin Avenue, Mildura...");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Property Valuation Report - COMPLETED
              </h1>
              <p className="text-muted-foreground text-lg">
                320 Deakin Avenue, Mildura VIC 3500
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300">
                ✓ COMPLETED
              </Badge>
              <Button onClick={handlePrint} variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Report Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Report Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$275,000</div>
                  <div className="text-sm text-muted-foreground">Market Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">850 m²</div>
                  <div className="text-sm text-muted-foreground">Land Area</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">5.67%</div>
                  <div className="text-sm text-muted-foreground">Gross Yield</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">1965</div>
                  <div className="text-sm text-muted-foreground">Year Built</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Sections */}
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-11 mb-6">
            <TabsTrigger value="photos" className="text-xs">Photos</TabsTrigger>
            <TabsTrigger value="executive" className="text-xs">Executive</TabsTrigger>
            <TabsTrigger value="location" className="text-xs">Location</TabsTrigger>
            <TabsTrigger value="legal" className="text-xs">Legal</TabsTrigger>
            <TabsTrigger value="property" className="text-xs">Property</TabsTrigger>
            <TabsTrigger value="valuation" className="text-xs">Valuation</TabsTrigger>
            <TabsTrigger value="sales" className="text-xs">Sales</TabsTrigger>
            <TabsTrigger value="leasing" className="text-xs">Leasing</TabsTrigger>
            <TabsTrigger value="market" className="text-xs">Market</TabsTrigger>
            <TabsTrigger value="climate" className="text-xs">Climate</TabsTrigger>
            <TabsTrigger value="certificate" className="text-xs">Certificate</TabsTrigger>
          </TabsList>

          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Property Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PropertyPhotosSection />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="executive">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ExecutiveSummary 
                  onNavigateToSection={() => {}}
                  reportConfiguration={reportConfig}
                  includedSections={includedSections}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  RPD and Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RPDAndLocation />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal">
            <Card>
              <CardHeader>
                <CardTitle>Legal Description & Planning Information</CardTitle>
              </CardHeader>
              <CardContent>
                <LegalAndPlanning />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="property">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <PropertyDetails />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="valuation">
            <Card>
              <CardHeader>
                <CardTitle>Valuation Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ValuationAnalysisResidential />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Sales Evidence</CardTitle>
              </CardHeader>
              <CardContent>
                <SalesEvidenceMildura />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leasing">
            <Card>
              <CardHeader>
                <CardTitle>Leasing Evidence</CardTitle>
              </CardHeader>
              <CardContent>
                <LeasingEvidenceMildura />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market">
            <Card>
              <CardHeader>
                <CardTitle>Market Commentary</CardTitle>
              </CardHeader>
              <CardContent>
                <MarketCommentaryMildura />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="climate">
            <Card>
              <CardHeader>
                <CardTitle>Climate Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <ClimateRiskAssessmentMildura />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificate">
            <Card>
              <CardHeader>
                <CardTitle>Valuation Certificate</CardTitle>
              </CardHeader>
              <CardContent>
                <ValuationCertificate />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Report Actions */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Report Complete</h3>
                <p className="text-muted-foreground">
                  All sections have been completed with comprehensive data for 320 Deakin Avenue, Mildura VIC 3500
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print Report
                </Button>
                <Button onClick={handleDownloadPDF} className="bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompletedMilduraReport;