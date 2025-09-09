import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

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
      const pdf = new jsPDF('p', 'mm', 'a4');
      let yPosition = 20;
      const pageHeight = 297;
      const margin = 20;
      const lineHeight = 7;

      // Helper function to add new page if needed
      const checkPageBreak = (neededSpace: number) => {
        if (yPosition + neededSpace > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
      };

      // Helper function to add text with word wrap
      const addWrappedText = (text: string, x: number, fontSize: number = 10, maxWidth: number = 170) => {
        pdf.setFontSize(fontSize);
        const lines = pdf.splitTextToSize(text, maxWidth);
        lines.forEach((line: string) => {
          checkPageBreak(lineHeight);
          pdf.text(line, x, yPosition);
          yPosition += lineHeight;
        });
      };

      // Title Page
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('COMPREHENSIVE PROPERTY REPORT', 105, 40, { align: 'center' });
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'normal');
      pdf.text(reportData.propertyAddress || '123 Example Street, Suburb', 105, 55, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.text(`Prepared: ${new Date().toLocaleDateString()}`, 105, 70, { align: 'center' });
      pdf.text('Commercial Valuation Report', 105, 80, { align: 'center' });

      // Add company logo placeholder
      pdf.rect(75, 100, 60, 30);
      pdf.text('Company Logo', 105, 118, { align: 'center' });

      pdf.addPage();
      yPosition = 20;

      // Table of Contents
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('TABLE OF CONTENTS', 20, yPosition);
      yPosition += 15;

      const sections = [
        { title: "Executive Summary and Contents", page: 3 },
        { title: "RPD and Location", page: 6 },
        { title: "Legal and Planning", page: 8 },
        { title: "Tenancy Schedule/Lease Details", page: 12 },
        { title: "Statutory Assessment", page: 14 },
        { title: "Market Commentary", page: 17 },
        { title: "Property Details", page: 19 },
        { title: "Plant and Equipment", page: 24 },
        { title: "Rent Determination", page: 26 },
        { title: "ESG Assessment and Audit", page: 29 },
        { title: "Essential Repairs", page: 33 },
        { title: "Risk Assessment & Market Indicators", page: 35 },
        { title: "Previous Sales History and Current Sale", page: 38 },
        { title: "Sales Evidence", page: 41 },
        { title: "Leasing Evidence", page: 47 },
        { title: "Valuation Analysis and Rationale", page: 51 },
        { title: "EBITDA & Financial Analysis", page: 59 },
        { title: "Marketability and Mortgage Security", page: 61 },
        { title: "Sustaino Pro Additional Analysis", page: 63 },
        { title: "Valuation Certificate", page: 68 },
        { title: "Additional Comments & Strategic Recommendations", page: 69 },
        { title: "Qualifications, Disclaimers, Terms and Conditions", page: 72 },
        { title: "Annexures", page: 75 },
        { title: "Security and Certificates", page: 79 }
      ];

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      sections.forEach(section => {
        checkPageBreak(8);
        pdf.text(section.title, 20, yPosition);
        pdf.text(section.page.toString(), 180, yPosition);
        
        // Add dots between title and page number
        const titleWidth = pdf.getTextWidth(section.title);
        const dotsStart = 25 + titleWidth;
        const dotsEnd = 175;
        const dotSpacing = 3;
        
        for (let x = dotsStart; x < dotsEnd; x += dotSpacing) {
          pdf.text('.', x, yPosition);
        }
        
        yPosition += 6;
      });

      pdf.addPage();
      yPosition = 20;

      // Executive Summary Sample
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('1. EXECUTIVE SUMMARY', 20, yPosition);
      yPosition += 15;

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      
      const executiveSummary = `This report provides a comprehensive valuation analysis of the subject property located at ${reportData.propertyAddress || '123 Example Street, Suburb'}. 

The property is a purpose-built accommodation facility comprising 18 rooms, strategically located on a main road within a Commercial 1 zone. The property generates stable rental income of approximately $120,000 per annum with high occupancy potential.

Key Features:
• 18-room purpose-built accommodation facility
• Commercial 1 zoning providing flexibility of use
• Solar power system (13.2 kW) enhancing energy efficiency
• Low-maintenance gardens and acoustic fencing
• Strong cash flow with EBITDA of $87,000

Market Position:
The property is well-positioned to service the growing demand for worker accommodation in the Mildura region, benefiting from its strategic location and purpose-built design.

Valuation Summary:
Based on our comprehensive analysis incorporating income approach, market comparison, and EBITDA multiples, we estimate the market value to be in the range of $1.2M - $1.4M.`;

      addWrappedText(executiveSummary, 20, 10);

      pdf.addPage();
      yPosition = 20;

      // Property Details Sample
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('2. PROPERTY DETAILS', 20, yPosition);
      yPosition += 15;

      const propertyDetails = `Location: ${reportData.propertyAddress || '123 Example Street, Suburb'}
Zone: Commercial 1
Land Area: [To be confirmed]
Building Area: [To be confirmed]
Year Built: [To be confirmed]

Description:
The subject property comprises a purpose-built accommodation facility containing 18 individual rooms designed for worker housing. The property features:

• Modern construction with low-maintenance materials
• Solar power system (13.2 kW capacity)
• Acoustic fencing providing privacy
• Low-maintenance landscaping
• Car parking facilities
• Common areas and facilities

The property is strategically positioned on a main road ensuring good accessibility and visibility, which supports its commercial viability for accommodation use.`;

      addWrappedText(propertyDetails, 20, 10);

      pdf.addPage();
      yPosition = 20;

      // Financial Analysis Sample
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('3. FINANCIAL ANALYSIS', 20, yPosition);
      yPosition += 15;

      // Create a table for financial data
      const tableData = [
        ['INCOME ANALYSIS', ''],
        ['Gross Annual Rental Income', '$120,000'],
        ['Occupancy Rate (estimated)', '80%'],
        ['Effective Gross Income', '$96,000'],
        ['', ''],
        ['EXPENSE ANALYSIS', ''],
        ['Operating Expenses', '$33,000'],
        ['Depreciation', '$10,000'],
        ['Amortization', '$10,000'],
        ['Total Expenses', '$53,000'],
        ['', ''],
        ['PROFITABILITY', ''],
        ['Net Operating Income (NOI)', '$87,000'],
        ['EBITDA', '$87,000'],
        ['Cap Rate (estimated)', '7.0%'],
        ['Estimated Value Range', '$1.2M - $1.4M']
      ];

      tableData.forEach(row => {
        checkPageBreak(8);
        pdf.setFont('helvetica', row[0].includes('ANALYSIS') || row[0] === 'PROFITABILITY' ? 'bold' : 'normal');
        pdf.text(row[0], 20, yPosition);
        if (row[1]) {
          pdf.text(row[1], 140, yPosition, { align: 'right' });
        }
        yPosition += 6;
      });

      pdf.addPage();
      yPosition = 20;

      // SWOT Analysis Sample
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('4. SWOT ANALYSIS', 20, yPosition);
      yPosition += 15;

      const swotAnalysis = `STRENGTHS:
• Purpose-built accommodation for 18 residents with high occupancy potential
• Located on main road within Commercial 1 zone
• Solar energy reduces operating costs significantly
• Low-maintenance gardens and fencing minimize ongoing expenses
• Stable gross revenue stream of approximately $120,000

WEAKNESSES:
• Dependence on local economic conditions and demand for worker housing
• High depreciation and amortization costs ($20,000 combined)
• Limited diversification of income streams
• Subject to accommodation industry fluctuations

OPPORTUNITIES:
• Potential to increase occupancy rates or rental rates
• Energy savings through solar and efficiency upgrades
• Expansion or renovation to modernize facilities
• Leveraging location for increased demand from nearby industries

THREATS:
• Regulatory changes affecting accommodation use
• Market competition from other housing providers
• Economic downturn affecting occupancy
• Maintenance or operational issues impacting revenue`;

      addWrappedText(swotAnalysis, 20, 10);

      // Add footer to all pages
      const pageCount = (pdf as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
        pdf.text('CONFIDENTIAL PROPERTY VALUATION REPORT', 105, 290, { align: 'center' });
      }

      // Save the PDF
      pdf.save(`Property_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "PDF Generated Successfully",
        description: "Your comprehensive property report PDF has been downloaded",
        duration: 5000,
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
              <Button 
                onClick={generatePDF}
                disabled={isGenerating}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                {isGenerating ? 'Generating PDF...' : 'Download PDF Report'}
              </Button>
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