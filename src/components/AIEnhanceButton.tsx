import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useReportData } from "@/contexts/ReportDataContext";

interface AIEnhanceButtonProps {
  pageType: string;
  currentData: any;
  missingFields: string[];
  onEnhancement: (enhancedData: any) => void;
  className?: string;
}

const AIEnhanceButton = ({ 
  pageType, 
  currentData, 
  missingFields, 
  onEnhancement,
  className = ""
}: AIEnhanceButtonProps) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { toast } = useToast();
  const { reportData } = useReportData();

  const handleAIEnhance = async () => {
    if (missingFields.length === 0) {
      toast({
        title: "No Enhancement Needed",
        description: "All fields appear to be completed.",
      });
      return;
    }

    setIsEnhancing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-enhance-fields', {
        body: {
          pageType,
          currentData,
          missingFields,
          propertyDetails: {
            address: reportData?.propertySearchData?.selectedProperty?.address || "Property address not specified",
            propertyType: reportData?.reportConfig?.propertyType || "Residential",
            locationAnalysis: reportData?.locationData || {},
            planningDetails: reportData?.planningData || {},
            propertyDetails: reportData?.propertyDetails || {}
          }
        }
      });

      if (error) {
        console.error('AI Enhancement Error:', error);
        throw new Error(error.message || 'Failed to enhance fields');
      }

      if (data?.enhancedData) {
        onEnhancement(data.enhancedData);
        toast({
          title: "AI Enhancement Complete",
          description: `Successfully enhanced ${Object.keys(data.enhancedData).length} fields.`,
        });
      } else {
        throw new Error('No enhancement data received');
      }
    } catch (error) {
      console.error('Enhancement error:', error);
      toast({
        title: "Enhancement Failed",
        description: error instanceof Error ? error.message : "Failed to enhance fields. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <Button
      onClick={handleAIEnhance}
      disabled={isEnhancing || missingFields.length === 0}
      variant="outline"
      size="sm"
      className={`${className} border-purple-200 text-purple-700 hover:bg-purple-50`}
    >
      {isEnhancing ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Sparkles className="w-4 h-4 mr-2" />
      )}
      {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
    </Button>
  );
};

export default AIEnhanceButton;