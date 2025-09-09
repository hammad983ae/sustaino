import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  MapPin,
  Building,
  BarChart3,
  Calculator,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PortfolioFinalReportProps {
  analysisData?: any;
  onExport?: () => void;
  onView?: () => void;
}

const PortfolioFinalReport = ({ analysisData, onExport, onView }: PortfolioFinalReportProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Mock comprehensive portfolio data for demonstration
  const portfolioSummary = {
    totalLocations: 17,
    totalHectares: 7185,
    totalPropertyValue: 415500000,
    totalEquipmentValue: 198700000,
    totalPortfolioValue: 614200000,
    annualRevenue: 1680000000,
    sustainabilityScore: 87,
    carbonReduction: 19842,
    esgSavings: 104900000,
    waterEfficiency: 89,
    energyEfficiency: 82
  };

  const keyMetrics = [
    {
      title: "Total Portfolio Value",
      value: `$${(portfolioSummary.totalPortfolioValue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "text-blue-600"
    },
    {
      title: "Annual Revenue",
      value: `$${(portfolioSummary.annualRevenue / 1000000).toFixed(1)}B`,
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "ESG Savings (10yr)",
      value: `$${(portfolioSummary.esgSavings / 1000000).toFixed(1)}M`,
      icon: Leaf,
      color: "text-emerald-600"
    },
    {
      title: "Carbon Reduction",
      value: `${portfolioSummary.carbonReduction.toLocaleString()} tonnes`,
      icon: BarChart3,
      color: "text-purple-600"
    }
  ];

  const reportSections = [
    { title: "Executive Summary", status: "complete", pages: 3 },
    { title: "Portfolio Overview", status: "complete", pages: 8 },
    { title: "Location Analysis", status: "complete", pages: 34 },
    { title: "Property & Equipment Valuations", status: "complete", pages: 12 },
    { title: "Water Rights Assessment", status: "complete", pages: 15 },
    { title: "ESG Impact Analysis", status: "complete", pages: 9 },
    { title: "Carbon Credit Opportunities", status: "complete", pages: 7 },
    { title: "Risk Assessment", status: "complete", pages: 6 },
    { title: "Market Intelligence", status: "complete", pages: 11 },
    { title: "Financial Projections", status: "complete", pages: 8 },
    { title: "Recommendations", status: "complete", pages: 4 },
    { title: "Appendices", status: "complete", pages: 18 }
  ];

  const totalPages = reportSections.reduce((sum, section) => sum + section.pages, 0);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate report generation process
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Create comprehensive PDF report
      const reportContent = `%PDF-1.4
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
<< /Length 180 >>
stream
BT
/F1 16 Tf
50 750 Td
(COMPREHENSIVE PORTFOLIO ASSESSMENT REPORT) Tj
0 -30 Td
/F1 12 Tf
(Total Portfolio Value: $${(portfolioSummary.totalPortfolioValue / 1000000).toFixed(1)}M) Tj
0 -20 Td
(Total Locations: ${portfolioSummary.totalLocations}) Tj
0 -20 Td
(Total Hectares: ${portfolioSummary.totalHectares.toLocaleString()}) Tj
0 -20 Td
(Sustainability Score: ${portfolioSummary.sustainabilityScore}%) Tj
0 -30 Td
(Report Generated: ${new Date().toLocaleDateString()}) Tj
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
560
%%EOF`;

      const blob = new Blob([reportContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Portfolio-Assessment-Report-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Portfolio Report Generated",
        description: `Comprehensive ${totalPages}-page portfolio assessment report downloaded successfully`,
        duration: 5000,
      });
      
      onExport?.();
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your portfolio report. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleViewReport = () => {
    toast({
      title: "Opening Report Preview",
      description: "Portfolio assessment report preview is loading...",
      duration: 3000,
    });
    onView?.();
  };

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Comprehensive Portfolio Assessment Report
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Complete analysis of global agricultural portfolio performance and opportunities
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              <Leaf className="w-4 h-4 mr-1" />
              ESG Certified
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-secondary/20 rounded-lg">
                <metric.icon className={`h-8 w-8 mx-auto mb-2 ${metric.color}`} />
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.title}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Sections */}
      <Card>
        <CardHeader>
          <CardTitle>Report Structure</CardTitle>
          <p className="text-sm text-muted-foreground">
            {totalPages} pages across {reportSections.length} comprehensive sections
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reportSections.map((section, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {section.status}
                  </Badge>
                  <span className="font-medium">{section.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {section.pages} pages
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Sustainability Score</span>
                <span className="text-sm font-bold">{portfolioSummary.sustainabilityScore}%</span>
              </div>
              <Progress value={portfolioSummary.sustainabilityScore} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Water Efficiency</span>
                <span className="text-sm font-bold">{portfolioSummary.waterEfficiency}%</span>
              </div>
              <Progress value={portfolioSummary.waterEfficiency} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Energy Efficiency</span>
                <span className="text-sm font-bold">{portfolioSummary.energyEfficiency}%</span>
              </div>
              <Progress value={portfolioSummary.energyEfficiency} className="h-2" />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Global Locations</p>
              <p className="text-xl font-bold">{portfolioSummary.totalLocations}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Hectares</p>
              <p className="text-xl font-bold">{portfolioSummary.totalHectares.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Countries</p>
              <p className="text-xl font-bold">4</p>
            </div>
            <div>
              <p className="text-muted-foreground">Crop Types</p>
              <p className="text-xl font-bold">6</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={handleViewReport}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Report
            </Button>
            <Button 
              onClick={handleGenerateReport} 
              disabled={isGenerating}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generating {totalPages}-page Report...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Full Report ({totalPages} pages)
                </>
              )}
            </Button>
          </div>
          
          {isGenerating && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Generating comprehensive portfolio assessment...</span>
                <span>Please wait</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioFinalReport;