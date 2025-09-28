import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ISFVPlatform from './ISFVPlatform';

export default function GenerateMockReports() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Client Demo</h1>
        <p className="text-muted-foreground">
          Demonstrate the ISFV platform workflow to clients using realistic property scenarios with contradiction checking.
        </p>
      </div>

      <ISFVPlatform />

      {/* Demo Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">ISFV Client Demo Instructions</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Select a demo property from the dropdown in the Automation Control Center</li>
            <li>Click "Run Full Automation" to trigger the automated valuation process</li>
            <li>Use "Run Contradiction Check" to validate report consistency for compliance</li>
            <li>Explore the different tabs to see automated content in each section</li>
            <li>Perfect for demonstrating rapid, automated property valuations with quality control</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}