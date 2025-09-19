import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, MapPin, Building, TrendingUp, FileText, Shield, Leaf, BarChart3 } from "lucide-react";
import SiteDetailsForm from "@/components/development/SiteDetailsForm";
import ValuationMethodologies from "@/components/development/ValuationMethodologies";
import ESGClimateRiskAssessment from "@/components/development/ESGClimateRiskAssessment";
import FeasibilityStudy from "@/components/development/FeasibilityStudy";
import ComparableEvidence from "@/components/development/ComparableEvidence";
import HighestAndBestUseAnalysis from "@/components/development/HighestAndBestUseAnalysis";

const DevelopmentSiteValuation = () => {
  const [siteData, setSiteData] = useState(null);
  const [activeTab, setActiveTab] = useState("site-details");

  const handleSiteDataChange = (data: any) => {
    setSiteData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-2">
            <Building className="w-4 h-4 mr-2" />
            Development Site Valuation Platform
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Professional Development Site Analysis
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive valuation platform for development sites with automated analysis, 
            feasibility studies, and market insights.
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="site-details">Site Details</TabsTrigger>
            <TabsTrigger value="best-use">Best Use</TabsTrigger>
            <TabsTrigger value="valuation">Valuation</TabsTrigger>
            <TabsTrigger value="feasibility">Feasibility</TabsTrigger>
            <TabsTrigger value="esg-climate">ESG & Climate</TabsTrigger>
            <TabsTrigger value="comparable">Comparables</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Site Details Tab */}
          <TabsContent value="site-details" className="space-y-6">
            <SiteDetailsForm onSiteDataChange={handleSiteDataChange} />
          </TabsContent>

          {/* Highest and Best Use Tab */}
          <TabsContent value="best-use" className="space-y-6">
            <HighestAndBestUseAnalysis siteData={siteData} />
          </TabsContent>

          {/* Valuation Tab */}
          <TabsContent value="valuation" className="space-y-6">
            <ValuationMethodologies siteData={siteData} />
          </TabsContent>

          {/* Feasibility Tab */}
          <TabsContent value="feasibility" className="space-y-6">
            <FeasibilityStudy siteData={siteData} />
          </TabsContent>

          {/* ESG & Climate Tab */}
          <TabsContent value="esg-climate" className="space-y-6">
            <ESGClimateRiskAssessment />
          </TabsContent>

          {/* Comparable Evidence Tab */}
          <TabsContent value="comparable" className="space-y-6">
            <ComparableEvidence />
          </TabsContent>

          {/* Risk Analysis Tab */}
          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Comprehensive Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Risk Analysis Engine</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive development risk assessment including market, regulatory, environmental, and financial risks
                  </p>
                  <Badge variant="outline" className="mb-4">
                    Coming Soon
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Professional Valuation Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Report Generation</h3>
                  <p className="text-muted-foreground mb-4">
                    Generate comprehensive development site valuation reports compliant with Australian valuation standards
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline">AASB Compliant</Badge>
                    <Badge variant="outline">GST Inc/Exc</Badge>
                    <Badge variant="outline">ESG Integrated</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DevelopmentSiteValuation;