import { useState } from 'react';
import { checkReportContradictions, generateContradictionReport, type ReportData } from '@/utils/reportContradictionChecker';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, FileCheck, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PreReportContradictionCheckProps {
  reportData: ReportData;
  onCheckComplete: (hasContradictions: boolean, report: string) => void;
  onProceedAnyway?: () => void;
  showModal: boolean;
  onClose: () => void;
  reportType?: string;
}

export function PreReportContradictionCheck({
  reportData,
  onCheckComplete,
  onProceedAnyway,
  showModal,
  onClose,
  reportType = "report"
}: PreReportContradictionCheckProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [contradictionResults, setContradictionResults] = useState<string>('');
  const [hasContradictions, setHasContradictions] = useState(false);
  const [checkCompleted, setCheckCompleted] = useState(false);

  const runContradictionCheck = async () => {
    setIsChecking(true);
    try {
      // Run contradiction analysis
      const contradictions = checkReportContradictions(reportData);
      const contradictionReport = generateContradictionReport(contradictions);
      
      setContradictionResults(contradictionReport);
      setHasContradictions(contradictions.hasContradictions);
      setCheckCompleted(true);
      
      // Notify parent component
      onCheckComplete(contradictions.hasContradictions, contradictionReport);
      
      if (contradictions.hasContradictions) {
        toast.error(`Critical contradictions detected in ${reportType}`, {
          description: 'Please review and fix issues before generating the report.'
        });
      } else {
        toast.success(`${reportType} passed contradiction check`, {
          description: 'No contradictions detected. Safe to generate report.'
        });
      }
    } catch (error) {
      console.error('Error during contradiction check:', error);
      toast.error('Contradiction check failed', {
        description: 'Please try again or proceed with caution.'
      });
    } finally {
      setIsChecking(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-6 w-6" />
              Pre-Report Contradiction Check
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Running quality assurance checks before generating your {reportType}. This ensures accuracy and consistency.
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {!checkCompleted ? (
            <div className="text-center space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Quality Assurance Required:</strong> Before generating your {reportType}, 
                  we need to check for logical inconsistencies and contradictions in the data.
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={runContradictionCheck} 
                disabled={isChecking}
                size="lg"
                className="w-full max-w-md"
              >
                {isChecking ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Running Contradiction Check...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Run Quality Check
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-4 rounded-lg border">
                {hasContradictions ? (
                  <>
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span className="font-medium text-red-700">Contradictions Detected</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-green-700">No Contradictions Found</span>
                  </>
                )}
              </div>

              <Card className={`border ${hasContradictions ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Contradiction Check Results:</h4>
                  <pre className="text-sm whitespace-pre-wrap text-gray-700 max-h-60 overflow-y-auto">
                    {contradictionResults}
                  </pre>
                </CardContent>
              </Card>

              <div className="flex gap-2 justify-end">
                {hasContradictions ? (
                  <>
                    <Button variant="outline" onClick={onClose}>
                      Fix Issues First
                    </Button>
                    {onProceedAnyway && (
                      <Button variant="destructive" onClick={onProceedAnyway}>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Generate Anyway (Not Recommended)
                      </Button>
                    )}
                  </>
                ) : (
                  <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Proceed with Report Generation
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function usePreReportContradictionCheck() {
  const [showChecker, setShowChecker] = useState(false);
  const [contradictionReport, setContradictionReport] = useState('');
  const [hasContradictions, setHasContradictions] = useState(false);

  const runPreReportCheck = (reportData: ReportData) => {
    setShowChecker(true);
  };

  const handleCheckComplete = (contradictions: boolean, report: string) => {
    setHasContradictions(contradictions);
    setContradictionReport(report);
  };

  const closeChecker = () => {
    setShowChecker(false);
  };

  return {
    showChecker,
    hasContradictions,
    contradictionReport,
    runPreReportCheck,
    handleCheckComplete,
    closeChecker,
    PreReportContradictionCheck
  };
}