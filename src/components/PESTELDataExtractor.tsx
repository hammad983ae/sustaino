import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Database, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useReportData } from "@/contexts/ReportDataContext";

interface PESTELDataExtractorProps {
  onDataExtracted: (pestelData: any) => void;
  propertyDetails?: any;
  currentPestelData?: any;
}

const PESTELDataExtractor = ({ 
  onDataExtracted, 
  propertyDetails,
  currentPestelData 
}: PESTELDataExtractorProps) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionStage, setExtractionStage] = useState("");
  const [lastExtraction, setLastExtraction] = useState<Date | null>(null);
  const [dataSources, setDataSources] = useState<string[]>([]);
  const { toast } = useToast();
  const { reportData } = useReportData();

  const extractPESTELData = async (analysisDepth: 'basic' | 'comprehensive' = 'comprehensive') => {
    setIsExtracting(true);
    
    try {
      // Prepare property details from report data
      const propertyInfo = {
        address: reportData?.propertySearchData?.selectedProperty?.address || "Property address not specified",
        propertyType: reportData?.reportConfig?.propertyType || "residential",
        state: reportData?.propertySearchData?.selectedProperty?.state || "NSW",
        suburb: reportData?.propertySearchData?.selectedProperty?.suburb || "Unknown",
        postcode: reportData?.propertySearchData?.selectedProperty?.postcode || "0000"
      };

      // Stage 1: Gathering external data sources
      setExtractionStage("Connecting to external data sources...");
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Stage 2: Fetching economic indicators
      setExtractionStage("Fetching economic indicators and market data...");
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Stage 3: Analyzing political and regulatory factors
      setExtractionStage("Analyzing political and regulatory factors...");
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Stage 4: Processing environmental and social data
      setExtractionStage("Processing environmental and social data...");
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Stage 5: AI analysis and generation
      setExtractionStage("Generating AI-enhanced PESTEL analysis...");
      
      const { data, error } = await supabase.functions.invoke('pestel-data-extraction', {
        body: {
          propertyDetails: propertyInfo,
          currentPestelData,
          analysisDepth
        }
      });

      if (error) {
        console.error('PESTEL extraction error:', error);
        throw new Error(error.message || 'Failed to extract PESTEL data');
      }

      if (data?.success && data?.pestelAnalysis) {
        // Transform the AI response to match the existing PESTEL structure
        const transformedData = transformAIPestelData(data.pestelAnalysis);
        
        onDataExtracted(transformedData);
        setLastExtraction(new Date());
        setDataSources(data.dataSources || []);
        
        toast({
          title: "PESTEL Data Extracted Successfully",
          description: `Enhanced analysis generated using ${data.dataSources?.length || 0} external data sources.`,
        });
      } else {
        throw new Error('No PESTEL data received from analysis');
      }
    } catch (error) {
      console.error('PESTEL extraction error:', error);
      toast({
        title: "Data Extraction Failed",
        description: error instanceof Error ? error.message : "Failed to extract PESTEL data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
      setExtractionStage("");
    }
  };

  const transformAIPestelData = (aiData: any) => {
    // Transform AI response to match existing PESTEL structure
    const factors = ['Political', 'Economic', 'Social', 'Technological', 'Environmental', 'Legal'];
    
    return factors.map(factor => {
      const factorData = aiData[factor.toLowerCase()];
      if (factorData) {
        return {
          factor,
          impact: factorData.impact || "medium",
          description: factorData.description || "",
          score: factorData.score || 3,
          implications: factorData.implications || "",
          timeframe: factorData.timeframe || "medium"
        };
      }
      return {
        factor,
        impact: "medium",
        description: "",
        score: 3,
        implications: "",
        timeframe: "medium"
      };
    });
  };

  const canExtractData = () => {
    return reportData?.propertySearchData?.selectedProperty?.address;
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <Database className="h-5 w-5" />
          AI-Powered PESTEL Data Extraction
        </CardTitle>
        <p className="text-sm text-purple-600">
          Extract real-time market data and generate comprehensive PESTEL analysis using AI
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Extraction Status */}
        {isExtracting && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
              <span className="text-sm font-medium text-purple-700">{extractionStage}</span>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full animate-pulse w-2/3"></div>
            </div>
          </div>
        )}

        {/* Data Sources */}
        {dataSources.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-700">Data Sources:</h4>
            <div className="flex flex-wrap gap-1">
              {dataSources.map((source, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {source}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Last Extraction Info */}
        {lastExtraction && (
          <div className="flex items-center gap-2 text-sm text-purple-600">
            <TrendingUp className="w-4 h-4" />
            <span>Last extracted: {lastExtraction.toLocaleString()}</span>
          </div>
        )}

        {/* Warning if no property data */}
        {!canExtractData() && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-700">
              Property details required for data extraction. Complete Property Search first.
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => extractPESTELData('basic')}
            disabled={isExtracting || !canExtractData()}
            variant="outline"
            size="sm"
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Basic Analysis
          </Button>
          
          <Button
            onClick={() => extractPESTELData('comprehensive')}
            disabled={isExtracting || !canExtractData()}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Database className="w-4 h-4 mr-2" />
            {isExtracting ? 'Extracting...' : 'Comprehensive Analysis'}
          </Button>
        </div>

        {/* Features List */}
        <div className="text-xs text-purple-600 space-y-1">
          <p className="font-medium">Includes:</p>
          <ul className="space-y-1 ml-4">
            <li>• Real-time economic indicators (RBA, ABS data)</li>
            <li>• Political and regulatory updates</li>
            <li>• Environmental risk assessments</li>
            <li>• Social demographic trends</li>
            <li>• Technology adoption patterns</li>
            <li>• Legal and compliance changes</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PESTELDataExtractor;