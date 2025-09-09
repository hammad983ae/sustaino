import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportPDFDocument from './ReportPDFDocument';

interface PDFReportPreviewProps {
  reportData?: any;
  onClose?: () => void;
}

const PDFReportPreview: React.FC<PDFReportPreviewProps> = ({ 
  reportData = {}, 
  onClose 
}) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      toast({
        title: "PDF Generation Started",
        description: "Your comprehensive property report is being generated",
        duration: 3000,
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "PDF Generation Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              PDF Report Preview & Generate
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                <Eye className="h-4 w-4 mr-2" />
                Back to Editing
              </Button>
              <PDFDownloadLink 
                document={<ReportPDFDocument reportData={reportData} />} 
                fileName={`Property_Report_${new Date().toISOString().split('T')[0]}.pdf`}
              >
                {({ loading }) => (
                  <Button 
                    disabled={loading}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {loading ? 'Generating PDF...' : 'Download PDF Report'}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <h3 className="font-semibold mb-2">Report Structure Preview</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This PDF will include all sections with your completed data, formatted professionally for client presentation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Included Sections:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Executive Summary & Contents</li>
                    <li>• Property Details & Location</li>
                    <li>• Legal & Planning Information</li>
                    <li>• Financial Analysis & EBITDA</li>
                    <li>• Market Commentary & Evidence</li>
                    <li>• SWOT & Risk Assessment</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Format Features:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Professional layout & formatting</li>
                    <li>• Table of contents with page numbers</li>
                    <li>• Financial tables & analysis</li>
                    <li>• Strategic recommendations</li>
                    <li>• Valuation certificate</li>
                    <li>• Terms & conditions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Sample Content Included:</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Property:</strong> {reportData.propertyAddress || "123 Example Street, Suburb"}</p>
                <p><strong>Annual Income:</strong> $120,000</p>
                <p><strong>EBITDA:</strong> $87,000</p>
                <p><strong>Estimated Value Range:</strong> $1.2M - $1.4M</p>
                <p><strong>Key Features:</strong> 18-room accommodation, Commercial 1 zone, Solar power system</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFReportPreview;