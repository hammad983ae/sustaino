import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Download, Eye, FileText, Calendar, MapPin, Home, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportPreviewProps {
  reportData?: any;
  onGenerate?: () => void;
  onClose?: () => void;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({ 
  reportData = {}, 
  onGenerate,
  onClose 
}) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Report Generated",
        description: "Your comprehensive property report has been generated successfully",
        duration: 5000,
      });
      
      onGenerate?.();
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const sections = [
    { title: "Executive Summary and Contents", status: "complete", pages: 3 },
    { title: "RPD and Location", status: "complete", pages: 2 },
    { title: "Legal and Planning", status: "complete", pages: 4 },
    { title: "Tenancy Schedule/Lease Details", status: "partial", pages: 2 },
    { title: "Statutory Assessment", status: "partial", pages: 3 },
    { title: "Market Commentary", status: "pending", pages: 2 },
    { title: "Property Details", status: "pending", pages: 5 },
    { title: "Plant and Equipment", status: "pending", pages: 2 },
    { title: "Rent Determination", status: "pending", pages: 3 },
    { title: "ESG Assessment and Audit", status: "pending", pages: 4 },
    { title: "Essential Repairs", status: "pending", pages: 2 },
    { title: "Risk Assessment & Market Indicators", status: "pending", pages: 3 },
    { title: "Previous Sales History and Current Sale", status: "pending", pages: 3 },
    { title: "Sales Evidence", status: "pending", pages: 6 },
    { title: "Leasing Evidence", status: "pending", pages: 4 },
    { title: "Valuation Analysis and Rationale", status: "pending", pages: 8 },
    { title: "Marketability and Mortgage Security", status: "pending", pages: 2 },
    { title: "Sustaino Pro Additional Analysis", status: "pending", pages: 5 },
    { title: "Valuation Certificate", status: "pending", pages: 1 },
    { title: "Qualifications and Terms", status: "pending", pages: 3 },
    { title: "Annexures", status: "pending", pages: 4 },
    { title: "Security and Certificates", status: "pending", pages: 2 }
  ];

  const totalPages = sections.reduce((sum, section) => sum + section.pages, 0);
  const completedSections = sections.filter(s => s.status === 'complete').length;
  const partialSections = sections.filter(s => s.status === 'partial').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-500';
      case 'partial': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'complete': return 'default';
      case 'partial': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Report Preview
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                <Eye className="h-4 w-4 mr-2" />
                Continue Editing
              </Button>
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalPages}</div>
              <div className="text-sm text-muted-foreground">Total Pages</div>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{completedSections}</div>
              <div className="text-sm text-muted-foreground">Complete Sections</div>
            </div>
            <div className="text-center p-4 bg-secondary/50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{partialSections}</div>
              <div className="text-sm text-muted-foreground">Partial Sections</div>
            </div>
          </div>

          {/* Property Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-primary/5 rounded-lg mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Home className="h-4 w-4 text-primary" />
                <span className="font-medium">Property:</span>
                <span>{reportData.propertyAddress || "123 Example Street, Suburb"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">Location:</span>
                <span>{reportData.location || "Premium Commercial District"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="font-medium">Valuation:</span>
                <span className="font-semibold">{reportData.valuation || "To Be Determined"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Status */}
      <Card>
        <CardHeader>
          <CardTitle>Section Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {sections.map((section, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(section.status)}`} />
                    <div>
                      <div className="font-medium text-sm">{section.title}</div>
                      <div className="text-xs text-muted-foreground">{section.pages} pages</div>
                    </div>
                  </div>
                  <Badge variant={getStatusBadgeVariant(section.status)} className="text-xs">
                    {section.status}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportPreview;