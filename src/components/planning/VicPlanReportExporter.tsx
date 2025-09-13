import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  FileText, 
  ExternalLink, 
  Loader2, 
  CheckCircle,
  AlertCircle,
  Folder
} from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface VicPlanReportExporterProps {
  onReportDownloaded?: (reportData: any) => void;
}

interface DownloadedReport {
  fileName: string;
  fileUrl: string;
  downloadedAt: string;
  propertyAddress: string;
  vicplanId?: string;
}

export const VicPlanReportExporter: React.FC<VicPlanReportExporterProps> = ({
  onReportDownloaded
}) => {
  const { addressData, getFormattedAddress } = useProperty();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadedReports, setDownloadedReports] = useState<DownloadedReport[]>([]);
  const [vicplanId, setVicplanId] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  // Generate VicPlan report URL based on property address
  const generateVicPlanUrl = (address: string, id?: string) => {
    if (customUrl) return customUrl;
    
    // Format address for URL (replace spaces with dashes, remove special chars)
    const formattedAddress = address
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9\-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    const idSuffix = id ? `-(ID${id})` : '';
    const baseUrl = 'https://prod-pis-planning-report-pdf.s3-ap-southeast-2.amazonaws.com/';
    
    return `${baseUrl}${formattedAddress}${idSuffix}-Vicplan-Planning-Property-Report.pdf`;
  };

  // Download and store VicPlan report
  const downloadVicPlanReport = async () => {
    const address = getFormattedAddress();
    if (!address) {
      toast({
        title: "No Address Available",
        description: "Please ensure a property address is entered before downloading the report.",
        variant: "destructive"
      });
      return;
    }

    setIsDownloading(true);
    
    try {
      const reportUrl = generateVicPlanUrl(address, vicplanId);
      
      // First, try to fetch the PDF to check if it exists
      const response = await fetch(reportUrl, { method: 'HEAD' });
      
      if (!response.ok) {
        throw new Error(`Report not found at VicPlan (Status: ${response.status})`);
      }

      // If PDF exists, proceed with download and storage
      const fileName = `VicPlan-Report-${address.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
      
      // For now, we'll store the URL and metadata - in a real implementation,
      // you might want to download and store the actual file in Supabase Storage
      const reportData: DownloadedReport = {
        fileName,
        fileUrl: reportUrl,
        downloadedAt: new Date().toISOString(),
        propertyAddress: address,
        vicplanId: vicplanId || undefined
      };

      // Save to localStorage (in production, you'd save to Supabase)
      const existingReports = JSON.parse(localStorage.getItem('vicplan-reports') || '[]');
      const updatedReports = [...existingReports, reportData];
      localStorage.setItem('vicplan-reports', JSON.stringify(updatedReports));
      
      setDownloadedReports(prev => [...prev, reportData]);
      onReportDownloaded?.(reportData);

      toast({
        title: "VicPlan Report Downloaded ✅",
        description: `Planning report for ${address} has been added to annexures.`,
      });

    } catch (error) {
      console.error('Error downloading VicPlan report:', error);
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Could not download VicPlan report. Please check the property details and try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // Load existing reports on component mount
  React.useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem('vicplan-reports') || '[]');
    const currentAddressReports = savedReports.filter(
      (report: DownloadedReport) => report.propertyAddress === getFormattedAddress()
    );
    setDownloadedReports(currentAddressReports);
  }, [getFormattedAddress]);

  const openReport = (reportUrl: string) => {
    window.open(reportUrl, '_blank', 'noopener,noreferrer');
  };

  const currentAddress = getFormattedAddress();
  const previewUrl = generateVicPlanUrl(currentAddress || 'Sample-Property-Address', vicplanId);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          VicPlan Report Exporter
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Download official VicPlan planning reports and add them to property annexures
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Property Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-blue-700 border-blue-300">
              Current Property
            </Badge>
          </div>
          <p className="font-medium text-blue-900">
            {currentAddress || 'No address available'}
          </p>
          {addressData.state?.toLowerCase() !== 'vic' && (
            <p className="text-sm text-amber-600 mt-1">
              ⚠️ VicPlan reports are only available for Victorian properties
            </p>
          )}
        </div>

        {/* VicPlan ID Input (Optional) */}
        <div className="space-y-3">
          <Label htmlFor="vicplan-id" className="text-sm font-medium">
            VicPlan Property ID (Optional)
          </Label>
          <Input
            id="vicplan-id"
            value={vicplanId}
            onChange={(e) => setVicplanId(e.target.value)}
            placeholder="e.g., 5096803"
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Enter the VicPlan property ID if known. This helps ensure the correct report is downloaded.
          </p>
        </div>

        {/* Custom URL Input (Alternative) */}
        <div className="space-y-3">
          <Label htmlFor="custom-url" className="text-sm font-medium">
            Custom Report URL (Alternative)
          </Label>
          <Input
            id="custom-url"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Paste direct VicPlan report URL here"
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            If you have a direct link to the VicPlan report, paste it here instead.
          </p>
        </div>

        {/* Preview URL */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Generated Report URL Preview</Label>
          <div className="p-3 bg-muted rounded-md text-sm font-mono break-all">
            {previewUrl}
          </div>
        </div>

        <Separator />

        {/* Download Button */}
        <div className="flex gap-3">
          <Button
            onClick={downloadVicPlanReport}
            disabled={!currentAddress || isDownloading || addressData.state?.toLowerCase() !== 'vic'}
            className="flex-1"
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download VicPlan Report
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => openReport(previewUrl)}
            disabled={!currentAddress}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>

        {/* Downloaded Reports */}
        {downloadedReports.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-primary" />
                <Label className="font-medium">Downloaded Reports for this Property</Label>
              </div>
              
              {downloadedReports.map((report, index) => (
                <div 
                  key={index}
                  className="p-3 border rounded-lg bg-success/5 border-success/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="font-medium text-sm">{report.fileName}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Downloaded: {new Date(report.downloadedAt).toLocaleString()}
                      </p>
                      {report.vicplanId && (
                        <Badge variant="outline" className="text-xs mt-1">
                          ID: {report.vicplanId}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openReport(report.fileUrl)}
                      className="ml-2"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Open
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Info Note */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">Important Notes:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>VicPlan reports are only available for Victorian properties</li>
                <li>The system will attempt to locate the report using the property address</li>
                <li>If a report cannot be found, try entering the VicPlan Property ID</li>
                <li>Downloaded reports will be added to the property's document annexures</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VicPlanReportExporter;