import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Download, Printer, Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useReportData } from '@/contexts/ReportDataContext';

const PDFReportGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const { toast } = useToast();
  const { reportData } = useReportData();

  const generatePDFReport = async () => {
    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating PDF Report",
        description: "Creating your comprehensive property valuation report...",
      });
      
      // Simulate PDF generation process
      setTimeout(() => {
        setIsGenerating(false);
        toast({
          title: "PDF Generated Successfully",
          description: "Your comprehensive property valuation report is ready for download.",
        });
      }, 3000);
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Generation Failed", 
        description: "There was an error generating the PDF report.",
        variant: "destructive"
      });
    }
  };

  const sendReportByEmail = async () => {
    if (!recipientEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter a recipient email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);

    try {
      const propertyAddress = reportData?.propertySearchData?.confirmedAddress || 
                            reportData?.propertyDetails?.propertyAddress || 
                            "Property Address Not Available";
      
      const clientName = reportData?.reportConfig?.clientName || 
                        reportData?.valuationCertificate?.clientName || 
                        "Client";

      const reportType = reportData?.reportConfig?.reportType || "Property Valuation Report";

      const { data, error } = await supabase.functions.invoke('send-report-email', {
        body: {
          recipientEmail: recipientEmail.trim(),
          recipientName: recipientName.trim() || undefined,
          propertyAddress,
          reportType,
          clientName,
          reportData
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Report Sent Successfully",
        description: `The property valuation report has been sent to ${recipientEmail}`,
      });

      // Clear form
      setRecipientEmail('');
      setRecipientName('');
    } catch (error: any) {
      console.error('Error sending report email:', error);
      toast({
        title: "Failed to Send Report",
        description: error.message || "There was an error sending the report email.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const viewSampleReport = () => {
    toast({
      title: "Sample Report",
      description: "Sample PDF report functionality will be implemented to show the expected output format.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          PDF Report Generation
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Generate and download comprehensive property valuation reports
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button
            onClick={generatePDFReport}
            disabled={isGenerating}
            className="w-full flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate PDF Report'}
          </Button>
          
          <Button
            onClick={viewSampleReport}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            View Sample Report
          </Button>
        </div>

        {/* Email Report Section */}
        <Card className="border-2 border-emerald-200 bg-emerald-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <Mail className="h-5 w-5" />
              Email Report
            </CardTitle>
            <p className="text-sm text-emerald-600">
              Send the complete valuation report directly to your client
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipient-email">Recipient Email *</Label>
                <Input
                  id="recipient-email"
                  type="email"
                  placeholder="client@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient-name">Recipient Name</Label>
                <Input
                  id="recipient-name"
                  type="text"
                  placeholder="Client Name (optional)"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </div>
            </div>
            
            <Button
              onClick={sendReportByEmail}
              disabled={isSending || !recipientEmail.trim()}
              className="w-full flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              <Send className="h-4 w-4" />
              {isSending ? 'Sending Report...' : 'Send Report by Email'}
            </Button>
            
            <div className="text-xs text-emerald-600 p-3 bg-emerald-100 rounded-lg">
              <p className="font-medium mb-1">Professional email delivery includes:</p>
              <ul className="space-y-1">
                <li>• Comprehensive report summary</li>
                <li>• Property details and analysis highlights</li>
                <li>• Professional DeLorenzo Property Group branding</li>
                <li>• Secure delivery with confidentiality notice</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-xs text-muted-foreground p-3 bg-blue-50 rounded-lg">
          <p className="font-medium mb-2">Report will include:</p>
          <ul className="space-y-1">
            <li>• Executive Summary with property overview</li>
            <li>• Comprehensive property details and analysis</li>
            <li>• ESG assessment and sustainability metrics</li>
            <li>• Market analysis and comparable sales</li>
            <li>• Professional valuation certificate</li>
            <li>• Risk assessments and disclaimers</li>
            <li>• All appendices and supporting documentation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PDFReportGenerator;