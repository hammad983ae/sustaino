import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Calendar, MapPin, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportGeneratorProps {
  reportData?: any;
  onGenerate?: () => void;
  onClose?: () => void;
}

const ReportGenerator = ({ reportData, onGenerate, onClose }: ReportGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate report generation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Report Generated Successfully",
        description: "Your comprehensive property report is ready for download",
        duration: 5000,
      });
      
      // Create a mock PDF blob and download it
      const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT
/F1 12 Tf
100 700 Td
(Property Report Generated Successfully) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000330 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
424
%%EOF`;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Property-Report-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      onGenerate?.();
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Mock data for demonstration
  const mockData = {
    address: "123 Example Street, Suburb NSW 2000",
    location: "Premium Commercial District",
    date: "9/9/2025",
    valuation: "To Be Determined",
    totalPages: 73,
    completedSections: 18,
    partialSections: 4
  };

  const propertyData = reportData || mockData;

  return (
    <div className="space-y-6">
      {/* Report Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Report Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">{propertyData.totalPages}</div>
              <div className="text-sm text-muted-foreground">Total Pages</div>
            </div>
            <div className="bg-success/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-success">{propertyData.completedSections}</div>
              <div className="text-sm text-muted-foreground">Complete Sections</div>
            </div>
            <div className="bg-warning/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-warning">{propertyData.partialSections}</div>
              <div className="text-sm text-muted-foreground">Partial Sections</div>
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Property:</span>
              <span>{propertyData.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Location:</span>
              <span>{propertyData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Date:</span>
              <span>{propertyData.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Valuation:</span>
              <span>{propertyData.valuation}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              Continue Editing
            </Button>
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportGenerator;