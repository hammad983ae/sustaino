import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, FileCheck } from 'lucide-react';
import DemoPropertySelector, { DemoProperty, demoProperties } from './DemoPropertySelector';
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
        <h1 className="text-3xl font-bold mb-2">Generate Mock Reports - Client Demo</h1>
        <p className="text-muted-foreground">
          Perfect for demonstrating the complete end-to-end workflow to clients. Select a demo property and generate a full mock report with contradiction checking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoPropertySelector
          selectedProperty={selectedDemoProperty}
          onPropertySelect={setSelectedDemoProperty}
          onGenerateReport={generateDemoMockReport}
          isGenerating={isGeneratingMock}
        />
        
        {/* Contradiction Checker Results */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Report Contradiction Checker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button 
                onClick={runContradictionCheck} 
                variant="outline" 
                className="w-full"
                disabled={!selectedDemoProperty}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Run Contradiction Check
              </Button>
              
              {contradictionResults && (
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-medium mb-2">Contradiction Check Results:</h4>
                  <pre className="text-sm whitespace-pre-wrap text-gray-700">
                    {contradictionResults}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Instructions */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Demo Instructions</CardTitle>
        </CardHeader>
        <CardContent className="text-green-700">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Select a demo property from the dropdown above</li>
            <li>Click "Generate Mock Report with Contradiction Check" to populate all sections</li>
            <li>Navigate to the Property Pro Valuation tab to see the generated data</li>
            <li>The contradiction checker will automatically highlight any issues found</li>
            <li>Use the "Demonstration Property" option to show how contradictions are detected</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}