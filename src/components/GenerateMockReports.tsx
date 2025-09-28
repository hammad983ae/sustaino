import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, FileCheck } from 'lucide-react';
import DemoPropertySelector, { DemoProperty, demoProperties } from './DemoPropertySelector';
import ISFVPlatform from './ISFVPlatform';
import { 
  generateMockPropertyData, 
  generateMockRiskRatings, 
  generateMockVRAAssessment, 
  generateMockSalesEvidence,
  generateMockGeneralComments 
} from '@/utils/demoDataGenerator';
import { checkReportContradictions, generateContradictionReport, type ReportData } from '@/utils/reportContradictionChecker';
import { toast } from 'sonner';

export default function GenerateMockReports() {
  const [selectedDemoProperty, setSelectedDemoProperty] = useState('mildura-highway');
  const [contradictionResults, setContradictionResults] = useState<string>('');
  const [isGeneratingMock, setIsGeneratingMock] = useState(false);

  // Generate demo mock report
  const generateDemoMockReport = async () => {
    if (!selectedDemoProperty) {
      toast.error('Please select a demo property first');
      return;
    }

    setIsGeneratingMock(true);
    try {
      const demoProperty = demoProperties.find(p => p.id === selectedDemoProperty);
      if (!demoProperty) {
        toast.error('Demo property not found');
        return;
      }

      // Generate mock data using the demo property
      const mockPropertyData = generateMockPropertyData(demoProperty);
      const mockRiskRatings = generateMockRiskRatings(demoProperty);
      const mockVRAAssessment = generateMockVRAAssessment(demoProperty);
      const mockSalesEvidence = generateMockSalesEvidence(demoProperty);
      const mockGeneralComments = generateMockGeneralComments(
        demoProperty,
        mockPropertyData,
        mockRiskRatings,
        mockVRAAssessment,
        mockSalesEvidence
      );

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create report data for contradiction checking
      const reportData: ReportData = {
        propertyData: mockPropertyData,
        riskRatings: mockRiskRatings,
        vraAssessment: mockVRAAssessment,
        salesEvidence: mockSalesEvidence,
        generalComments: mockGeneralComments
      };

      // Run contradiction check
      const contradictions = checkReportContradictions(reportData);
      const contradictionReport = generateContradictionReport(contradictions);
      setContradictionResults(contradictionReport);

      toast.success(`Mock report generated for ${demoProperty.address}`);
    } catch (error) {
      console.error('Mock report generation error:', error);
      toast.error('Failed to generate mock report');
    } finally {
      setIsGeneratingMock(false);
    }
  };

  // Run contradiction check
  const runContradictionCheck = () => {
    if (!selectedDemoProperty) {
      toast.error('Please select a demo property first');
      return;
    }

    const demoProperty = demoProperties.find(p => p.id === selectedDemoProperty);
    if (!demoProperty) {
      toast.error('Demo property not found');
      return;
    }

    // Generate mock data for contradiction checking
    const mockPropertyData = generateMockPropertyData(demoProperty);
    const mockRiskRatings = generateMockRiskRatings(demoProperty);
    const mockVRAAssessment = generateMockVRAAssessment(demoProperty);
    const mockSalesEvidence = generateMockSalesEvidence(demoProperty);
    const mockGeneralComments = generateMockGeneralComments(
      demoProperty,
      mockPropertyData,
      mockRiskRatings,
      mockVRAAssessment,
      mockSalesEvidence
    );

    const reportData: ReportData = {
      propertyData: mockPropertyData,
      riskRatings: mockRiskRatings,
      vraAssessment: mockVRAAssessment,
      salesEvidence: mockSalesEvidence,
      generalComments: mockGeneralComments
    };

    const contradictions = checkReportContradictions(reportData);
    const contradictionReport = generateContradictionReport(contradictions);
    setContradictionResults(contradictionReport);

    toast.success('Contradiction check completed');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Client Demo</h1>
        <p className="text-muted-foreground">
          Demonstrate the ISFV platform workflow to clients using realistic property scenarios with contradiction checking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="space-y-4">
          <DemoPropertySelector
            selectedProperty={selectedDemoProperty}
            onPropertySelect={setSelectedDemoProperty}
            onGenerateReport={generateDemoMockReport}
            isGenerating={isGeneratingMock}
          />
        </div>
        <div className="lg:col-span-2">
          <ISFVPlatform />
        </div>
      </div>

      {/* Demo Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">ISFV Client Demo Instructions</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Select a demo property scenario from the selector on the left</li>
            <li>Click "Generate Mock Report with Contradiction Check" to load the property data</li>
            <li>Use the ISFV platform to demonstrate automated property valuation</li>
            <li>Show clients how the contradiction checker validates report consistency</li>
            <li>Perfect for demonstrating rapid, automated property valuations with quality control</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}