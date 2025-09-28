import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, FileCheck } from 'lucide-react';
import ISFVPlatform from './ISFVPlatform';
import { checkReportContradictions, generateContradictionReport, type ReportData } from '@/utils/reportContradictionChecker';
import { toast } from 'sonner';

export default function GenerateMockReports() {
  const [contradictionResults, setContradictionResults] = useState<string>('');

  // Run contradiction check - will be connected to ISFV data later
  const runContradictionCheck = () => {
    // For now, show a placeholder message
    toast.info('Select a property in ISFV and run automation first, then this will check the generated data');
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
        <div className="lg:col-span-2">
          <ISFVPlatform />
        </div>
        <div className="space-y-4">
          {/* Contradiction Checker */}
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
      </div>

      {/* Demo Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">ISFV Client Demo Instructions</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Select a demo property from the dropdown in the Automation Control Center</li>
            <li>Click "Run Full Automation" to trigger the automated valuation process</li>
            <li>Use the Contradiction Checker to validate report consistency for compliance</li>
            <li>Explore the different tabs to see automated content in each section</li>
            <li>Perfect for demonstrating rapid, automated property valuations with quality control</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}