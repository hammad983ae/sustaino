import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, RefreshCw, Check, AlertCircle, FileText } from 'lucide-react';
import { useReportData } from '@/contexts/ReportDataContext';
import { supabase } from '@/integrations/supabase/client';
import { extractSectionSummaries, combineIntoExecutiveSummary } from '@/lib/summaryGenerator';

interface AutoGenerateSummaryProps {
  onSummaryGenerated: (summary: string) => void;
  currentSummary?: string;
}

const AutoGenerateSummary: React.FC<AutoGenerateSummaryProps> = ({ 
  onSummaryGenerated, 
  currentSummary 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<string>('');
  const { reportData, getIntegratedData } = useReportData();

  const generateSummary = async () => {
    setIsGenerating(true);
    setProgress(0);
    setError(null);
    setStep('Analyzing report sections...');

    try {
      // Step 1: Extract summaries from all report sections
      setProgress(20);
      const integratedData = getIntegratedData();
      const sectionSummaries = extractSectionSummaries(integratedData);
      
      if (Object.keys(sectionSummaries).length === 0) {
        throw new Error('No report sections found to summarize. Please complete some report sections first.');
      }

      setStep('Extracting key findings...');
      setProgress(40);

      // Step 2: Prepare data for AI analysis
      const summaryData = {
        sectionSummaries,
        propertyAddress: integratedData.propertySearchData?.confirmedAddress || 
                        integratedData.planningData?.address || 
                        'Property address not specified',
        propertyType: integratedData.reportConfig?.propertyType || 'Not specified',
        reportType: integratedData.reportConfig?.reportType || 'Not specified',
        valuationPurpose: integratedData.reportConfig?.valuationPurpose || 'Market valuation',
        marketValue: integratedData.valuationCertificate?.certificateDetails?.marketValue,
        keyFindings: {
          hasPlanning: !!integratedData.planningData?.zoning,
          hasValuation: !!integratedData.valuationAnalysis,
          hasSalesEvidence: !!integratedData.salesHistory,
          hasRiskAssessment: !!integratedData.riskAssessment,
          hasTenancy: !!integratedData.tenancyDetails
        }
      };

      setStep('Generating AI-powered summary...');
      setProgress(60);

      // Step 3: Call AI edge function for intelligent summary generation
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('generate-executive-summary', {
        body: summaryData
      });

      if (aiError) throw aiError;

      setStep('Finalizing summary...');
      setProgress(80);

      // Step 4: Combine AI response with structured summary
      const finalSummary = combineIntoExecutiveSummary(sectionSummaries, aiResponse?.summary || '');

      setProgress(100);
      setStep('Summary generated successfully!');
      setGeneratedSummary(finalSummary);

    } catch (err) {
      console.error('Error generating summary:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
      setStep('');
    } finally {
      setIsGenerating(false);
    }
  };

  const applySummary = () => {
    onSummaryGenerated(generatedSummary);
    setIsOpen(false);
    setGeneratedSummary('');
    setProgress(0);
    setStep('');
  };

  const resetDialog = () => {
    setGeneratedSummary('');
    setProgress(0);
    setError(null);
    setStep('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetDialog();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Auto-Generate Summary
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Auto-Generate Executive Summary
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Summary Preview */}
          {currentSummary && !generatedSummary && (
            <div className="space-y-2">
              <h4 className="font-medium">Current Summary</h4>
              <div className="p-3 bg-muted rounded-md text-sm max-h-32 overflow-y-auto">
                {currentSummary}
              </div>
            </div>
          )}

          {/* Generation Status */}
          {isGenerating && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Generating Summary</span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
              {step && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  {step}
                </div>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Generated Summary */}
          {generatedSummary && !isGenerating && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="h-4 w-4" />
                <span className="font-medium">Summary Generated Successfully</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Generated Executive Summary</h4>
                <Textarea
                  value={generatedSummary}
                  onChange={(e) => setGeneratedSummary(e.target.value)}
                  className="min-h-[300px] resize-none"
                  placeholder="Generated summary will appear here..."
                />
              </div>
            </div>
          )}

          {/* Generation Info */}
          {!isGenerating && !generatedSummary && !error && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This will analyze all completed report sections and generate a comprehensive executive summary 
                including key findings, valuation conclusions, and investment recommendations.
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {!generatedSummary ? (
              <Button 
                onClick={generateSummary}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Summary'}
              </Button>
            ) : (
              <>
                <Button onClick={applySummary} className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Apply Summary
                </Button>
                <Button 
                  variant="outline" 
                  onClick={generateSummary}
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutoGenerateSummary;