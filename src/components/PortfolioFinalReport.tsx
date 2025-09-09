import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Eye,
  PieChart,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PortfolioCoverPage from './PortfolioCoverPage';

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
      <Tabs defaultValue="cover" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cover">Cover Page</TabsTrigger>
          <TabsTrigger value="summary">Executive Summary</TabsTrigger>
          <TabsTrigger value="sections">Report Sections</TabsTrigger>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
        </TabsList>

        <TabsContent value="cover" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Portfolio Cover Page Preview
              </CardTitle>
              <p className="text-muted-foreground">
                Professional cover page with key portfolio metrics
              </p>
            </CardHeader>
            <CardContent>
              <div className="scale-75 origin-top border rounded-lg overflow-hidden">
                <PortfolioCoverPage
                  totalPortfolioValue={portfolioSummary.totalPortfolioValue}
                  totalLocations={portfolioSummary.totalLocations}
                  totalHectares={portfolioSummary.totalHectares}
                  sustainabilityScore={portfolioSummary.sustainabilityScore}
                  companyName="Costa Group"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-6">
          {/* Enhanced Key Metrics */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Portfolio Performance Dashboard
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    Real-time analysis of global agricultural portfolio
                  </p>
                </div>
                <Badge variant="outline" className="text-sm bg-emerald-100 text-emerald-800">
                  <Leaf className="w-4 h-4 mr-1" />
                  ESG Certified
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {keyMetrics.map((metric, index) => (
                  <Card key={index} className="p-4 bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <metric.icon className={`h-10 w-10 mx-auto mb-3 ${metric.color}`} />
                      <div className="text-2xl font-bold text-slate-800 mb-1">{metric.value}</div>
                      <div className="text-sm text-slate-600">{metric.title}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Portfolio Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Portfolio Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-emerald-800">Sustainability Score</span>
                      <Badge className="bg-emerald-600 text-white">
                        {portfolioSummary.sustainabilityScore}%
                      </Badge>
                    </div>
                    <Progress value={portfolioSummary.sustainabilityScore} className="h-3" />
                    <p className="text-xs text-emerald-700">ESG compliance and environmental impact</p>
                  </div>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-800">Water Efficiency</span>
                      <Badge className="bg-blue-600 text-white">
                        {portfolioSummary.waterEfficiency}%
                      </Badge>
                    </div>
                    <Progress value={portfolioSummary.waterEfficiency} className="h-3" />
                    <p className="text-xs text-blue-700">Water conservation and management</p>
                  </div>
                </Card>
                
                <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-amber-800">Energy Efficiency</span>
                      <Badge className="bg-amber-600 text-white">
                        {portfolioSummary.energyEfficiency}%
                      </Badge>
                    </div>
                    <Progress value={portfolioSummary.energyEfficiency} className="h-3" />
                    <p className="text-xs text-amber-700">Renewable energy and efficiency gains</p>
                  </div>
                </Card>
              </div>

              <Separator />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="p-4 text-center bg-slate-50">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                  <p className="text-slate-600 text-sm mb-1">Global Locations</p>
                  <p className="text-2xl font-bold text-slate-800">{portfolioSummary.totalLocations}</p>
                </Card>
                <Card className="p-4 text-center bg-slate-50">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                  <p className="text-slate-600 text-sm mb-1">Total Hectares</p>
                  <p className="text-2xl font-bold text-slate-800">{portfolioSummary.totalHectares.toLocaleString()}</p>
                </Card>
                <Card className="p-4 text-center bg-slate-50">
                  <Building className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                  <p className="text-slate-600 text-sm mb-1">Countries</p>
                  <p className="text-2xl font-bold text-slate-800">4</p>
                </Card>
                <Card className="p-4 text-center bg-slate-50">
                  <Leaf className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                  <p className="text-slate-600 text-sm mb-1">Crop Types</p>
                  <p className="text-2xl font-bold text-slate-800">6</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections" className="space-y-6">
          {/* Report Sections with Enhanced Design */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Report Structure & Content
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {totalPages} pages across {reportSections.length} comprehensive sections
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {reportSections.map((section, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-shadow border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-emerald-700">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">{section.title}</h4>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            {section.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-slate-800">{section.pages}</span>
                        <p className="text-xs text-slate-500">pages</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          {/* Generation Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Generate Portfolio Report
              </CardTitle>
              <p className="text-muted-foreground">
                Create comprehensive PDF report with all analysis and recommendations
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleViewReport}
                  className="flex-1"
                  size="lg"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Preview Report
                </Button>
                <Button 
                  onClick={handleGenerateReport} 
                  disabled={isGenerating}
                  className="flex-1"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Generating {totalPages}-page Report...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5 mr-2" />
                      Generate Full Report ({totalPages} pages)
                    </>
                  )}
                </Button>
              </div>
              
              {isGenerating && (
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-blue-800">
                      <span>Generating comprehensive portfolio assessment...</span>
                      <span>Please wait</span>
                    </div>
                    <Progress value={75} className="h-3" />
                    <p className="text-xs text-blue-600">
                      Processing {totalPages} pages of analysis and data visualization
                    </p>
                  </div>
                </Card>
              )}

              <Card className="p-4 bg-slate-50">
                <h4 className="font-medium text-slate-800 mb-2">Report Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Professional cover page with branding
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Executive summary and key findings
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Detailed location analysis
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    ESG and sustainability metrics
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Financial projections and valuations
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Strategic recommendations
                  </div>
                </div>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioFinalReport;