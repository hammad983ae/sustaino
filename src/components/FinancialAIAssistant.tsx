import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Brain, 
  Sparkles, 
  Send, 
  FileText,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  BarChart3,
  DollarSign
} from "lucide-react";

interface AnalysisTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  icon: any;
}

const analysisTemplates: AnalysisTemplate[] = [
  {
    id: "ratio-analysis",
    title: "Ratio Analysis",
    description: "Comprehensive analysis of financial ratios and their implications",
    prompt: "Analyze my financial ratios and provide insights on liquidity, profitability, leverage, and activity ratios. Highlight strengths and areas for improvement.",
    category: "Analysis",
    icon: BarChart3
  },
  {
    id: "cash-flow-analysis",
    title: "Cash Flow Insights",
    description: "Detailed cash flow analysis and recommendations",
    prompt: "Examine my cash flow patterns and provide recommendations for improving cash management and working capital optimization.",
    category: "Analysis",
    icon: DollarSign
  },
  {
    id: "trend-analysis",
    title: "Trend Analysis",
    description: "Historical trend analysis and future projections",
    prompt: "Analyze historical financial trends and provide projections for key metrics. Identify growth patterns and potential risks.",
    category: "Forecasting",
    icon: TrendingUp
  },
  {
    id: "risk-assessment",
    title: "Risk Assessment",
    description: "Comprehensive financial risk evaluation",
    prompt: "Conduct a comprehensive financial risk assessment including credit risk, liquidity risk, and operational risk. Provide mitigation strategies.",
    category: "Risk",
    icon: AlertCircle
  },
  {
    id: "performance-benchmarking",
    title: "Performance Benchmarking",
    description: "Compare performance against industry standards",
    prompt: "Compare my financial performance against industry benchmarks and provide recommendations for improvement.",
    category: "Benchmarking",
    icon: Lightbulb
  },
  {
    id: "financial-strategy",
    title: "Strategic Recommendations",
    description: "Strategic financial planning recommendations",
    prompt: "Based on my financial data, provide strategic recommendations for growth, investment opportunities, and financial optimization.",
    category: "Strategy",
    icon: Brain
  }
];

export const FinancialAIAssistant = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const runAnalysis = async (prompt: string) => {
    setIsAnalyzing(true);
    try {
      // Call the financial AI assistant edge function
      const { data, error } = await supabase.functions.invoke('financial-ai-analyst', {
        body: { 
          prompt,
          analysis_type: selectedTemplate || 'custom'
        }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast({
        title: "Analysis Complete",
        description: "Your financial analysis has been generated successfully",
      });
    } catch (error) {
      console.error('Error running analysis:', error);
      toast({
        title: "Analysis Error",
        description: "Failed to generate financial analysis. Please try again.",
        variant: "destructive",
      });
      
      // Fallback analysis for demo purposes
      setAnalysis(generateFallbackAnalysis(prompt));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateFallbackAnalysis = (prompt: string): string => {
    return `
**Financial Analysis Report**

Based on your request: "${prompt}"

**Key Insights:**
• Your financial metrics show mixed performance indicators
• Liquidity ratios suggest adequate short-term financial health
• Profitability margins are within acceptable ranges for your industry
• Debt management appears conservative with room for strategic leverage

**Recommendations:**
1. **Improve Working Capital Management:** Consider optimizing accounts receivable collection periods
2. **Revenue Growth Strategies:** Explore opportunities to increase revenue streams
3. **Cost Optimization:** Review operational expenses for potential efficiency gains
4. **Investment Planning:** Consider strategic investments to drive long-term growth

**Risk Factors to Monitor:**
• Market volatility impact on revenue
• Interest rate changes affecting financing costs
• Seasonal variations in cash flow

**Next Steps:**
1. Implement monthly financial monitoring dashboard
2. Establish clear KPI targets for each quarter
3. Regular review of financial ratios and trends
4. Consider professional financial advisory consultation

*This analysis is generated based on available financial data. For more detailed insights, please ensure all financial metrics are current and complete.*
    `;
  };

  const handleTemplateSelect = (template: AnalysisTemplate) => {
    setSelectedTemplate(template.id);
    setCustomPrompt(template.prompt);
  };

  const handleCustomAnalysis = () => {
    if (!customPrompt.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a prompt for analysis",
        variant: "destructive",
      });
      return;
    }
    runAnalysis(customPrompt);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          AI Financial Assistant
        </h2>
        <p className="text-muted-foreground">
          Get intelligent insights and recommendations based on your financial data
        </p>
      </div>

      {/* Analysis Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Quick Analysis Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysisTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-primary" />
                      <CardTitle className="text-sm">{template.title}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {template.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Custom Analysis Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Custom Analysis Request
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Enter your custom analysis request here... (e.g., 'Analyze my debt levels and recommend optimal capital structure')"
            className="min-h-[100px]"
          />
          <div className="flex gap-2">
            <Button 
              onClick={handleCustomAnalysis}
              disabled={isAnalyzing || !customPrompt.trim()}
              className="flex-1"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setCustomPrompt("");
                setSelectedTemplate(null);
              }}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {analysis}
              </pre>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Generate Charts
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Capabilities Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Brain className="h-5 w-5" />
            AI Assistant Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Financial Analysis</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Ratio interpretation and benchmarking</li>
                <li>• Trend analysis and forecasting</li>
                <li>• Cash flow optimization</li>
                <li>• Performance evaluation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Strategic Insights</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Risk assessment and mitigation</li>
                <li>• Investment recommendations</li>
                <li>• Capital structure optimization</li>
                <li>• Growth strategy planning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};