import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Loader2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function ISFVTestReport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);
  const [testData, setTestData] = useState({
    propertyAddress: '6 Rowse Court Mildura VIC 3500',
    propertyType: 'house',
    bedrooms: '3',
    bathrooms: '2',
    carSpaces: '2',
    landArea: '850',
    buildingArea: '180',
    estimatedValue: '420000',
    purpose: 'insurance',
    clientName: 'Test Client',
    notes: 'Test ISFV report generation'
  });
  const { toast } = useToast();

  const generateTestISFVReport = async () => {
    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating ISFV Report",
        description: "Creating test ISFV report with sample data..."
      });

      const { data, error } = await supabase.functions.invoke('generate-isfv-report', {
        body: {
          jobId: `ISFV_TEST_${Date.now()}`,
          propertyData: {
            address: testData.propertyAddress,
            propertyType: testData.propertyType,
            bedrooms: parseInt(testData.bedrooms),
            bathrooms: parseInt(testData.bathrooms),
            carSpaces: parseInt(testData.carSpaces),
            landArea: parseInt(testData.landArea),
            buildingArea: parseInt(testData.buildingArea),
            estimatedValue: parseInt(testData.estimatedValue),
            zoning: 'Residential 1 Zone',
            council: 'Mildura Rural City Council',
            coordinates: { lat: -34.2099, lng: 142.1268 }
          },
          valuationData: {
            purpose: testData.purpose,
            estimatedValue: parseInt(testData.estimatedValue),
            valuationDate: new Date().toISOString().split('T')[0],
            valuer: 'Test Valuer',
            valuationFirm: "Sustaino Pro ISFV Systems",
            reportType: 'ISFV',
            confidence: 'High',
            methodology: 'Direct Comparison'
          },
          clientData: {
            name: testData.clientName,
            reportDate: new Date().toISOString().split('T')[0]
          },
          format: 'html',
          testMode: true
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate ISFV report');
      }

      if (!data || !data.success) {
        throw new Error(data?.error || 'Failed to generate report');
      }

      setGeneratedReport(data);
      
      toast({
        title: "ISFV Report Generated",
        description: "Test ISFV report has been successfully created!"
      });

    } catch (error) {
      console.error('Error generating ISFV report:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate ISFV report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-800">
                <FileText className="h-6 w-6" />
                ISFV Test Report Generator
              </CardTitle>
              <p className="text-blue-700">
                Generate a test ISFV (Instant Short Form Valuation) report to see the output format and content
              </p>
            </CardHeader>
          </Card>
        </div>

        {!generatedReport && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    value={testData.propertyAddress}
                    onChange={(e) => setTestData(prev => ({ ...prev, propertyAddress: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select 
                    value={testData.propertyType} 
                    onValueChange={(value) => setTestData(prev => ({ ...prev, propertyType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="unit">Unit</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={testData.bedrooms}
                      onChange={(e) => setTestData(prev => ({ ...prev, bedrooms: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={testData.bathrooms}
                      onChange={(e) => setTestData(prev => ({ ...prev, bathrooms: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="carSpaces">Car Spaces</Label>
                    <Input
                      id="carSpaces"
                      type="number"
                      value={testData.carSpaces}
                      onChange={(e) => setTestData(prev => ({ ...prev, carSpaces: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="landArea">Land Area (sqm)</Label>
                    <Input
                      id="landArea"
                      type="number"
                      value={testData.landArea}
                      onChange={(e) => setTestData(prev => ({ ...prev, landArea: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="buildingArea">Building Area (sqm)</Label>
                    <Input
                      id="buildingArea"
                      type="number"
                      value={testData.buildingArea}
                      onChange={(e) => setTestData(prev => ({ ...prev, buildingArea: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Valuation Details */}
            <Card>
              <CardHeader>
                <CardTitle>Valuation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="estimatedValue">Estimated Value ($)</Label>
                  <Input
                    id="estimatedValue"
                    type="number"
                    value={testData.estimatedValue}
                    onChange={(e) => setTestData(prev => ({ ...prev, estimatedValue: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="purpose">Valuation Purpose</Label>
                  <Select 
                    value={testData.purpose} 
                    onValueChange={(value) => setTestData(prev => ({ ...prev, purpose: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="lending">Lending/Mortgage</SelectItem>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="family_law">Family Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={testData.clientName}
                    onChange={(e) => setTestData(prev => ({ ...prev, clientName: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={testData.notes}
                    onChange={(e) => setTestData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Generate Button */}
        {!generatedReport && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <Button 
                onClick={generateTestISFVReport}
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating ISFV Report...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Test ISFV Report
                  </>
                )}
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-2">
                This will create a test ISFV report using the property details above
              </p>
            </CardContent>
          </Card>
        )}

        {/* Generated Report Display */}
        {generatedReport && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <FileText className="h-5 w-5" />
                ISFV Report Generated Successfully
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  Your test ISFV report has been generated successfully. You can view the HTML output or download as PDF.
                </p>
                
                {generatedReport.data?.reportId && (
                  <div className="space-y-2 text-xs text-green-600 dark:text-green-400">
                    <div>• Report ID: {generatedReport.data.reportId}</div>
                    <div>• Property: {testData.propertyAddress}</div>
                    <div>• Estimated Value: ${parseInt(testData.estimatedValue).toLocaleString()}</div>
                    <div>• Generated: {new Date().toLocaleString()}</div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 flex-wrap">
                {generatedReport.data?.htmlContent && (
                  <Button 
                    onClick={() => {
                      const newWindow = window.open('', '_blank');
                      if (newWindow) {
                        newWindow.document.write(generatedReport.data.htmlContent);
                        newWindow.document.close();
                      }
                    }}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View HTML Report
                  </Button>
                )}
                
                <Button 
                  variant="outline"
                  onClick={() => setGeneratedReport(null)}
                >
                  Generate Another Test
                </Button>
              </div>

              {generatedReport.data?.htmlContent && (
                <div className="mt-4">
                  <Label>Report Preview (First 1000 characters):</Label>
                  <div className="mt-2 p-3 bg-muted rounded-lg font-mono text-xs overflow-hidden">
                    {generatedReport.data.htmlContent.substring(0, 1000)}...
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}