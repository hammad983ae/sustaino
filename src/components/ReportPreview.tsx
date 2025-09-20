import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Printer, Eye } from 'lucide-react';
import { useReportData } from '@/contexts/ReportDataContext';
import { extractSectionSummaries, combineIntoExecutiveSummary } from '@/lib/summaryGenerator';

const ReportPreview: React.FC = () => {
  const { reportData } = useReportData();

  const openReportPreview = () => {
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
          <Eye className="h-5 w-5" />
          Report Preview
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          View a copy of your current report with all collected data
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={openReportPreview}
            className="w-full flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View Report Copy
          </Button>
          
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print Current View
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground p-3 bg-blue-50 rounded-lg">
          <p className="font-medium mb-2">Report preview includes:</p>
          <ul className="space-y-1">
            <li>• Executive summary with current data</li>
            <li>• Property details and specifications</li>
            <li>• Legal and planning information</li>
            <li>• Valuation certificate details</li>
            <li>• Professional formatting for printing</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportPreview;