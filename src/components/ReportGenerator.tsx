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

  // Sections that would be in a complete report
  const sections = [
    { title: "Executive Summary and Contents", status: "complete" },
    { title: "RPD and Location", status: "complete" },
    { title: "Legal and Planning", status: "complete" },
    { title: "Tenancy Schedule/Lease Details", status: "partial" },
    { title: "Statutory Assessment", status: "complete" },
    { title: "Market Commentary", status: "complete" },
    { title: "Property Details", status: "complete" },
    { title: "Plant and Equipment", status: "partial" },
    { title: "Rent Determination", status: "complete" },
    { title: "ESG Assessment and Audit", status: "complete" },
    { title: "Essential Repairs", status: "complete" },
    { title: "Risk Assessment & Market Indicators", status: reportData?.riskAssessment ? "complete" : "partial" },
    { title: "Previous Sales History and Current Sale", status: "complete" },
    { title: "Sales Evidence", status: "complete" },
    { title: "Leasing Evidence", status: "complete" },
    { title: "Valuation Analysis and Rationale", status: "complete" },
    { title: "Marketability and Mortgage Security", status: "complete" },
    { title: "Sustaino Pro Additional Analysis", status: "complete" },
    { title: "Valuation Certificate", status: "complete" },
    { title: "Terms and Conditions", status: "complete" },
    { title: "Annexures", status: "complete" },
    { title: "Security and Certificates", status: "complete" }
  ];

  return (
    <div className="space-y-6">
      {/* Report Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Complete Property Report
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
                  Generate PDF Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Report Content */}
      <Card>
        <CardHeader>
          <CardTitle>Report Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="border-l-4 border-primary/20 pl-4 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{index + 1}. {section.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {section.status === "complete" && "✅ Section completed with comprehensive analysis"}
                      {section.status === "partial" && "⚠️ Section partially completed - may need additional data"}
                      {section.status === "pending" && "⏳ Section pending completion"}
                    </p>
                  </div>
                  <Badge variant={section.status === "complete" ? "default" : section.status === "partial" ? "secondary" : "outline"}>
                    {section.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Data Summary */}
      {reportData && Object.keys(reportData).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Report Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.keys(reportData).map((key) => (
                <div key={key} className="flex items-center justify-between py-1 border-b border-border/50">
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <Badge variant="outline">Data Saved</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportGenerator;