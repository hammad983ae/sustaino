import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, FileText, Download, Send, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useReportData } from '@/contexts/ReportDataContext';
import { compileCompleteReport, type CompilationResult } from '@/utils/reportCompilation';
import { useToast } from '@/hooks/use-toast';

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: () => void;
  onDownload?: () => void;
}

const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  isOpen,
  onClose,
  onSend,
  onDownload
}) => {
  const [compiledReport, setCompiledReport] = useState<CompilationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { reportData } = useReportData();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && reportData) {
      compileReport();
    }
  }, [isOpen, reportData]);

  const compileReport = async () => {
    setIsLoading(true);
    try {
      const compiled = await compileCompleteReport(reportData);
      setCompiledReport(compiled);
    } catch (error) {
      toast({
        title: "Compilation Error",
        description: "There was an error compiling the report for preview.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getValidationIcon = (isValid: boolean, warningCount: number) => {
    if (!isValid) return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (warningCount > 0) return <AlertTriangle className="h-4 w-4 text-warning" />;
    return <CheckCircle className="h-4 w-4 text-green-600" />;
  };

  const renderSectionPreview = (section: any) => (
    <Card key={section.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {section.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={section.isComplete ? "default" : "secondary"}>
              {section.isComplete ? "Complete" : "Draft"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Page {section.pageNumber}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Content preview */}
          <div className="text-sm text-muted-foreground max-h-32 overflow-hidden">
            {typeof section.content === 'object' ? (
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(section.content).slice(0, 6).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium">{key}:</span>
                    <span className="truncate ml-2">
                      {typeof value === 'object' ? 'Complex Data' : String(value).slice(0, 30)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="line-clamp-3">{String(section.content).slice(0, 200)}...</p>
            )}
          </div>
          
          {/* Verification hash */}
          {section.verificationHash && (
            <div className="text-xs font-mono bg-muted p-2 rounded">
              Hash: {section.verificationHash.slice(0, 16)}...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Report Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{compiledReport?.sections.length || 0}</div>
            <p className="text-sm text-muted-foreground">Total Sections</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{compiledReport?.metadata.totalPages || 0}</div>
            <p className="text-sm text-muted-foreground">Total Pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              {compiledReport && getValidationIcon(
                compiledReport.validationResults.isValid,
                compiledReport.validationResults.warnings.length
              )}
              <div className="text-2xl font-bold">
                {compiledReport?.validationResults.isValid ? 'Valid' : 'Issues'}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Report Status</p>
          </CardContent>
        </Card>
      </div>

      {/* Validation Results */}
      {compiledReport?.validationResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Validation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {compiledReport.validationResults.errors.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Errors ({compiledReport.validationResults.errors.length})
                </h4>
                {compiledReport.validationResults.errors.map((error, index) => (
                  <div key={index} className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                    {error}
                  </div>
                ))}
              </div>
            )}
            
            {compiledReport.validationResults.warnings.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-warning flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Warnings ({compiledReport.validationResults.warnings.length})
                </h4>
                {compiledReport.validationResults.warnings.map((warning, index) => (
                  <div key={index} className="text-sm text-warning bg-warning/10 p-2 rounded">
                    {warning}
                  </div>
                ))}
              </div>
            )}
            
            {compiledReport.validationResults.isValid && compiledReport.validationResults.warnings.length === 0 && (
              <div className="text-sm text-green-600 bg-green-50 p-2 rounded flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Report validation passed successfully
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Compliance Status */}
      {compiledReport?.metadata.compliance && (
        <Card>
          <CardHeader>
            <CardTitle>Compliance Standards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(compiledReport.metadata.compliance).map(([standard, compliant]) => (
                <div key={standard} className="flex items-center gap-2">
                  {compliant ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={`text-sm ${compliant ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {standard.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Report Preview
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-muted-foreground">Compiling report for preview...</p>
            </div>
          </div>
        ) : compiledReport ? (
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <ScrollArea className="h-[60vh]">
                  {renderOverview()}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="sections" className="mt-4">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-4">
                    {compiledReport.sections.map(renderSectionPreview)}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="metadata" className="mt-4">
                <ScrollArea className="h-[60vh]">
                  <Card>
                    <CardHeader>
                      <CardTitle>Report Metadata</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Compiled At:</span>
                          <p className="text-muted-foreground">
                            {compiledReport.metadata.compiledAt.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Total Pages:</span>
                          <p className="text-muted-foreground">
                            {compiledReport.metadata.totalPages}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <span className="font-medium">Document Hash:</span>
                        <div className="font-mono text-xs bg-muted p-2 rounded break-all">
                          {compiledReport.metadata.documentHash}
                        </div>
                      </div>
                      
                      {compiledReport.metadata.digitalSignature && (
                        <div className="space-y-2">
                          <span className="font-medium">Digital Signature:</span>
                          <div className="font-mono text-xs bg-muted p-2 rounded break-all">
                            {compiledReport.metadata.digitalSignature}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </ScrollArea>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {compiledReport.validationResults.isValid ? (
                  <span className="text-green-600">✓ Report ready for sending</span>
                ) : (
                  <span className="text-destructive">⚠ Please resolve errors before sending</span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Close Preview
                </Button>
                
                {onDownload && (
                  <Button 
                    variant="outline" 
                    onClick={onDownload}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                )}
                
                {onSend && (
                  <Button 
                    onClick={onSend} 
                    disabled={!compiledReport.validationResults.isValid}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Report
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No report data available for preview</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReportPreviewModal;