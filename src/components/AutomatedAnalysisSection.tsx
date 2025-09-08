import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, CheckCircle, AlertCircle, TrendingUp, MapPin, Calculator, FileText, Users } from "lucide-react";

interface AutomatedAnalysisSectionProps {
  title: string;
  description: string;
  isCompleted?: boolean;
  isProcessing?: boolean;
  data?: any;
}

export default function AutomatedAnalysisSection({ 
  title, 
  description, 
  isCompleted = false, 
  isProcessing = false,
  data 
}: AutomatedAnalysisSectionProps) {
  
  const getIconForSection = (title: string) => {
    if (title.includes("Market")) return TrendingUp;
    if (title.includes("Legal") || title.includes("Planning")) return FileText;
    if (title.includes("Tenant") || title.includes("Covenant")) return Users;
    if (title.includes("Location") || title.includes("Property")) return MapPin;
    if (title.includes("Analysis") || title.includes("Valuation")) return Calculator;
    return Zap;
  };

  const Icon = getIconForSection(title);

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-100' : isProcessing ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : isProcessing ? (
                <Icon className="h-5 w-5 text-blue-600 animate-spin" />
              ) : (
                <Icon className="h-5 w-5 text-gray-600" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isCompleted ? "default" : isProcessing ? "secondary" : "outline"}>
              {isCompleted ? "Completed" : isProcessing ? "Processing" : "Automated"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isProcessing && (
          <div className="space-y-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Zap className="h-4 w-4 mr-2 animate-pulse" />
              AI analyzing data and generating insights...
            </div>
            <Progress value={65} className="w-full" />
          </div>
        )}

        {isCompleted && data && (
          <div className="space-y-4">
            {/* Example automated analysis output */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="text-sm font-medium text-muted-foreground">Key Finding</div>
                <div className="text-lg font-semibold">{data.keyFinding || "Analysis complete"}</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="text-sm font-medium text-muted-foreground">Confidence Score</div>
                <div className="text-lg font-semibold">{data.confidence || "High (95%)"}</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="text-sm font-medium text-muted-foreground">Data Sources</div>
                <div className="text-lg font-semibold">{data.sources || "12 sources"}</div>
              </div>
            </div>
            
            {data.summary && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                  AI Analysis Summary
                </h4>
                <p className="text-sm text-muted-foreground">{data.summary}</p>
              </div>
            )}
          </div>
        )}

        {!isCompleted && !isProcessing && (
          <div className="space-y-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 mr-2" />
              This section will be automatically completed using AI analysis
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Zap className="h-4 w-4 mr-2" />
              Start Automated Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}