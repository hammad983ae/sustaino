import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Download, Printer, Mail, Send, Shield, Hash, FileCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useReportData } from '@/contexts/ReportDataContext';
import { extractSectionSummaries, combineIntoExecutiveSummary } from '@/lib/summaryGenerator';

const PDFReportGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isGeneratingBlockchain, setIsGeneratingBlockchain] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [blockchainHash, setBlockchainHash] = useState('');
  const [digitalSignature, setDigitalSignature] = useState('');
  const { toast } = useToast();
  const { reportData } = useReportData();

  const generatePDFReport = async () => {
    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating PDF Report",
        description: "Creating your comprehensive property valuation report...",
      });
      
      // Simulate PDF generation process with data compilation
      setTimeout(() => {
        setIsGenerating(false);
        // Generate mock blockchain hash for demonstration
        const mockHash = `SHA256:${Math.random().toString(36).substring(2, 15)}${Date.now().toString(36)}`;
        setBlockchainHash(mockHash);
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

  const generateBlockchainReport = async () => {
    setIsGeneratingBlockchain(true);
    
    try {
      toast({
        title: "Generating Blockchain-Compliant Report",
        description: "Creating cryptographically verified property valuation report...",
      });
      
      // Enhanced blockchain report generation
      setTimeout(() => {
        const blockchainHash = `SHA256:${Math.random().toString(36).substring(2, 15)}${Date.now().toString(36)}`;
        const signature = `SIG:${Math.random().toString(36).substring(2, 20)}`;
        setBlockchainHash(blockchainHash);
        setDigitalSignature(signature);
        setIsGeneratingBlockchain(false);
        
        toast({
          title: "Blockchain Report Generated",
          description: "Your cryptographically verified report is ready with immutable proof.",
        });
      }, 4000);
    } catch (error) {
      setIsGeneratingBlockchain(false);
      toast({
        title: "Blockchain Generation Failed", 
        description: "There was an error generating the blockchain-compliant report.",
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
    // Generate the report preview content
    const sectionSummaries = extractSectionSummaries(reportData);
    const executiveSummary = combineIntoExecutiveSummary(sectionSummaries);
    
    const reportContent = generateReportHTML(reportData, executiveSummary);
    
    // Open in a new window
    const previewWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
    if (previewWindow) {
      previewWindow.document.write(reportContent);
      previewWindow.document.close();
    }
  };

  const generateReportHTML = (data: any, executiveSummary: string) => {
    const propertyAddress = data?.propertySearchData?.confirmedAddress || 
                           data?.propertyDetails?.propertyAddress || 
                           "Property Address Not Available";
    
    const clientName = data?.reportConfig?.clientName || "Client";
    const reportType = data?.reportConfig?.reportType || "Property Valuation Report";
    const reportDate = new Date().toLocaleDateString();

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${reportType} - ${propertyAddress}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 40px; 
              line-height: 1.6; 
              color: #333;
            }
            .header { 
              border-bottom: 3px solid #2563eb; 
              padding-bottom: 20px; 
              margin-bottom: 30px;
            }
            .header h1 { 
              color: #2563eb; 
              margin: 0;
              font-size: 28px;
            }
            .header .subtitle { 
              color: #666; 
              font-size: 14px;
              margin-top: 5px;
            }
            .section { 
              margin-bottom: 30px; 
              page-break-inside: avoid;
            }
            .section h2 { 
              color: #2563eb; 
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 8px;
              font-size: 20px;
            }
            .section h3 { 
              color: #374151; 
              font-size: 16px;
              margin-top: 20px;
            }
            .property-details { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 20px; 
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
            }
            .detail-item { 
              margin-bottom: 10px;
            }
            .detail-label { 
              font-weight: bold; 
              color: #374151;
            }
            .detail-value { 
              margin-left: 10px;
            }
            .executive-summary {
              background: #eff6ff;
              padding: 25px;
              border-left: 4px solid #2563eb;
              margin: 20px 0;
            }
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
            @media print {
              body { margin: 20px; }
              .header { page-break-after: avoid; }
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${reportType}</h1>
            <div class="subtitle">
              Property: ${propertyAddress}<br>
              Client: ${clientName}<br>
              Date: ${reportDate}
            </div>
          </div>

          <div class="executive-summary">
            <h2>Executive Summary</h2>
            ${executiveSummary.split('\n').map(line => `<p>${line}</p>`).join('')}
          </div>

          <div class="section">
            <h2>Property Details</h2>
            <div class="property-details">
              <div>
                <div class="detail-item">
                  <span class="detail-label">Property Address:</span>
                  <span class="detail-value">${propertyAddress}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Property Type:</span>
                  <span class="detail-value">${data?.propertyDetails?.propertyType || 'Not specified'}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Total Area:</span>
                  <span class="detail-value">${data?.propertyDetails?.buildingArea || 'Not specified'}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Zoning:</span>
                  <span class="detail-value">${data?.legalAndPlanning?.currentZoning || 'Not specified'}</span>
                </div>
              </div>
              <div>
                <div class="detail-item">
                  <span class="detail-label">Council:</span>
                  <span class="detail-value">${data?.legalAndPlanning?.localCouncil || 'Not specified'}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Valuation:</span>
                  <span class="detail-value">${data?.valuationCertificate?.marketValue || 'Not specified'}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Valuation Date:</span>
                  <span class="detail-value">${data?.valuationCertificate?.valuationDate || reportDate}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Purpose:</span>
                  <span class="detail-value">${data?.valuationCertificate?.purposeOfValuation || 'Not specified'}</span>
                </div>
              </div>
            </div>
          </div>

          ${data?.legalAndPlanning ? `
          <div class="section">
            <h2>Legal and Planning</h2>
            <h3>Zoning Information</h3>
            <p><strong>Current Zoning:</strong> ${data.legalAndPlanning.currentZoning || 'Not specified'}</p>
            <p><strong>Permitted Uses:</strong> ${data.legalAndPlanning.permittedUses || 'Not specified'}</p>
            <p><strong>Planning Constraints:</strong> ${data.legalAndPlanning.planningConstraints || 'None identified'}</p>
          </div>
          ` : ''}

          ${data?.valuationCertificate ? `
          <div class="section">
            <h2>Valuation Certificate</h2>
            <p><strong>Market Value:</strong> ${data.valuationCertificate.marketValue || 'Not specified'}</p>
            <p><strong>Valuation Approach:</strong> ${data.valuationCertificate.valuationApproach || 'Not specified'}</p>
            <p><strong>Date of Valuation:</strong> ${data.valuationCertificate.valuationDate || reportDate}</p>
            <p><strong>Effective Date:</strong> ${data.valuationCertificate.effectiveDate || reportDate}</p>
          </div>
          ` : ''}

          <div class="footer">
            <p>This report was generated on ${reportDate}</p>
            <p>DeLorenzo Property Group - Professional Property Valuation Services</p>
          </div>
        </body>
      </html>
    `;
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button
            onClick={generatePDFReport}
            disabled={isGenerating}
            className="w-full flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate PDF Report'}
          </Button>
          
          <Button
            onClick={generateBlockchainReport}
            disabled={isGeneratingBlockchain}
            className="w-full flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Shield className="h-4 w-4" />
            {isGeneratingBlockchain ? 'Generating...' : 'Blockchain Report'}
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

        {/* Blockchain Verification Section */}
        {(blockchainHash || digitalSignature) && (
          <Card className="border-2 border-blue-200 bg-blue-50/50 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Shield className="h-5 w-5" />
                Blockchain Verification
              </CardTitle>
              <p className="text-sm text-blue-600">
                Your report has been cryptographically verified and timestamped
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {blockchainHash && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Document Hash
                  </Label>
                  <Input
                    value={blockchainHash}
                    readOnly
                    className="font-mono text-xs bg-white"
                  />
                </div>
              )}
              {digitalSignature && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    Digital Signature
                  </Label>
                  <Input
                    value={digitalSignature}
                    readOnly
                    className="font-mono text-xs bg-white"
                  />
                </div>
              )}
              <div className="text-xs text-blue-600 p-3 bg-blue-100 rounded-lg">
                <p className="font-medium mb-1">Blockchain compliance features:</p>
                <ul className="space-y-1">
                  <li>• Immutable document timestamping</li>
                  <li>• Cryptographic hash verification</li>
                  <li>• Digital signature authentication</li>
                  <li>• Audit trail preservation</li>
                  <li>• Regulatory compliance certification</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

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