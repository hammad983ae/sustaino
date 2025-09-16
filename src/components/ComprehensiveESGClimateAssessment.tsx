/**
 * ============================================================================
 * Comprehensive ESG Climate Assessment Page (Container Component)
 * Now uses separate EnvironmentalAudit and ESGClimateAssessment components
 * ============================================================================
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Save, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUniversalSave } from '@/hooks/useUniversalSave';
import ESGMethodologyProtection from '@/components/ESGMethodologyProtection';
import EnvironmentalAudit from '@/components/EnvironmentalAudit';
import ESGClimateAssessment from '@/components/ESGClimateAssessment';

const ComprehensiveESGClimateAssessment = () => {
  const { toast } = useToast();
  const { saveData, isSaving } = useUniversalSave('esg-climate-assessment');

  const handleSaveProgress = async () => {
    try {
      await saveData({
        timestamp: new Date().toISOString(),
        status: 'in-progress'
      });
      toast({
        title: "Progress Saved",
        description: "ESG & Climate Assessment progress has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save progress. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateReport = async () => {
    try {
      toast({
        title: "Generating Report",
        description: "ESG & Climate Assessment report is being generated...",
      });
      // Report generation logic would go here
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              ESG & Climate Assessment Platform
            </h1>
          </div>
          
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Proprietary Methodology
            </Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-600">
              Valuation Impact Analysis
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">
              Climate Risk Assessment
            </Badge>
            <Badge variant="secondary" className="bg-orange-500/10 text-orange-600">
              EPA Compliance Checks
            </Badge>
          </div>
        </div>

        {/* IP Protection Notice */}
        <ESGMethodologyProtection />

        {/* Assessment Components */}
        <div className="space-y-8">
          {/* Environmental Audit Section (EPA & Compliance) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-amber-500" />
                <CardTitle className="text-xl">Environmental Audit & EPA Compliance</CardTitle>
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">
                  Compliance Checks
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                EPA audits, contamination assessment, hazardous materials, and environmental compliance checks
              </p>
            </CardHeader>
            <CardContent>
              <EnvironmentalAudit />
            </CardContent>
          </Card>

          {/* ESG & Climate Assessment Section (Valuation Impact) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">ESG & Climate Assessment</CardTitle>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Valuation Impact Analysis
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Environmental, Social, Governance scoring and climate risk analysis for property valuation adjustments
              </p>
            </CardHeader>
            <CardContent>
              <ESGClimateAssessment />
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleSaveProgress}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Progress
          </Button>
          
          <Button 
            onClick={handleGenerateReport}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Generate Assessment Report
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveESGClimateAssessment;