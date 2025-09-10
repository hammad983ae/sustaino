import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle, Zap, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getPropertyTypeReportSections, ReportSectionConfig } from "./PropertyTypeReportConfig";

interface ReportSectionManagerProps {
  reportType: string;
  propertyType: string;
  reportData: any;
  onSectionsChange: (sections: string[]) => void;
  onContinueToReport: () => void;
}

interface MissingField {
  section: string;
  field: string;
  importance: 'critical' | 'important' | 'optional';
  description: string;
  suggestedValue?: string;
}

interface MissingFieldsAnalysis {
  missingFields: MissingField[];
  completenessScore: number;
  recommendations: string[];
}

const ReportSectionManager = ({ 
  reportType, 
  propertyType, 
  reportData, 
  onSectionsChange,
  onContinueToReport 
}: ReportSectionManagerProps) => {
  const { toast } = useToast();
  const [includedSections, setIncludedSections] = useState<string[]>([]);
  const [missingFieldsAnalysis, setMissingFieldsAnalysis] = useState<MissingFieldsAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportSections, setReportSections] = useState<ReportSectionConfig[]>([]);

  // Initialize sections based on property type
  useEffect(() => {
    const sections = getPropertyTypeReportSections(propertyType);
    setReportSections(sections);
    
    // Include all sections by default
    const sectionTitles = sections.map(section => section.title);
    setIncludedSections(sectionTitles);
    onSectionsChange(sectionTitles);
  }, [propertyType, onSectionsChange]);

  const toggleSection = (sectionTitle: string) => {
    const newIncludedSections = includedSections.includes(sectionTitle)
      ? includedSections.filter(s => s !== sectionTitle)
      : [...includedSections, sectionTitle];
    
    setIncludedSections(newIncludedSections);
    onSectionsChange(newIncludedSections);
  };

  const analyzeMissingFields = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('missing-fields', {
        body: {
          reportType,
          propertyType,
          reportData,
          includedSections
        }
      });

      if (error) throw error;

      setMissingFieldsAnalysis(data);
      toast({
        title: "Analysis Complete",
        description: `Report completeness: ${data.completenessScore}%`,
      });
    } catch (error) {
      console.error('Error analyzing missing fields:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze missing fields. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'bg-red-500';
      case 'important': return 'bg-orange-500'; 
      case 'optional': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'critical': return <AlertCircle className="h-4 w-4" />;
      case 'important': return <AlertCircle className="h-4 w-4" />;
      case 'optional': return <CheckCircle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getSectionProgress = (sectionTitle: string) => {
    if (!missingFieldsAnalysis) return 100;
    
    const sectionMissingFields = missingFieldsAnalysis.missingFields.filter(
      field => field.section === sectionTitle
    );
    
    if (sectionMissingFields.length === 0) return 100;
    
    const criticalFields = sectionMissingFields.filter(f => f.importance === 'critical').length;
    const importantFields = sectionMissingFields.filter(f => f.importance === 'important').length;
    
    // Calculate progress based on missing critical and important fields
    const totalWeight = criticalFields * 3 + importantFields * 2 + sectionMissingFields.length;
    const missingWeight = criticalFields * 3 + importantFields * 2;
    
    return Math.max(0, Math.round(((totalWeight - missingWeight) / totalWeight) * 100));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Report Section Management</h2>
          <p className="text-muted-foreground">
            Configure which sections to include and analyze missing data
          </p>
        </div>
        <Button 
          onClick={analyzeMissingFields}
          disabled={isAnalyzing}
          className="flex items-center gap-2"
        >
          {isAnalyzing ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Zap className="h-4 w-4" />
          )}
          {isAnalyzing ? "Analyzing..." : "Power Generate Analysis"}
        </Button>
      </div>

      {/* Completeness Score */}
      {missingFieldsAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Report Completeness Score
              <Badge variant="outline" className="ml-auto">
                {missingFieldsAnalysis.completenessScore}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={missingFieldsAnalysis.completenessScore} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              Based on analysis of {includedSections.length} included sections
            </p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="sections" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sections">Section Management</TabsTrigger>
          <TabsTrigger value="missing-data">Missing Data Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Sections ({propertyType} property)</CardTitle>
              <p className="text-sm text-muted-foreground">
                Toggle sections on/off to customize your report. {includedSections.length} of {reportSections.length} sections included.
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {reportSections.map((section, index) => {
                    const isIncluded = includedSections.includes(section.title);
                    const progress = getSectionProgress(section.title);
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <Switch
                              checked={isIncluded}
                              onCheckedChange={() => toggleSection(section.title)}
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{section.title}</h4>
                              {section.subtitle && (
                                <p className="text-sm text-muted-foreground">{section.subtitle}</p>
                              )}
                              {section.description && (
                                <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
                              )}
                            </div>
                          </div>
                          
                          {isIncluded && missingFieldsAnalysis && (
                            <div className="mt-2 ml-8">
                              <div className="flex items-center gap-2">
                                <Progress value={progress} className="flex-1 h-2" />
                                <span className="text-xs text-muted-foreground">{progress}%</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {section.automated && (
                            <Badge variant="secondary" className="text-xs">Auto</Badge>
                          )}
                          {section.component && (
                            <Badge variant="outline" className="text-xs">Custom</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missing-data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Missing Data Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">
                Review missing fields and recommendations to improve report quality
              </p>
            </CardHeader>
            <CardContent>
              {!missingFieldsAnalysis ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Click "Power Generate Analysis" to analyze missing fields
                  </p>
                  <Button onClick={analyzeMissingFields} disabled={isAnalyzing}>
                    {isAnalyzing ? "Analyzing..." : "Start Analysis"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Missing Fields */}
                  {missingFieldsAnalysis.missingFields.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Missing Fields</h4>
                      <ScrollArea className="h-64">
                        <div className="space-y-3">
                          {missingFieldsAnalysis.missingFields.map((field, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                              <div className={`p-1 rounded ${getImportanceColor(field.importance)}`}>
                                {getImportanceIcon(field.importance)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium">{field.field}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {field.section}
                                  </Badge>
                                  <Badge variant={field.importance === 'critical' ? 'destructive' : 
                                                field.importance === 'important' ? 'default' : 'secondary'} 
                                         className="text-xs">
                                    {field.importance}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{field.description}</p>
                                {field.suggestedValue && (
                                  <p className="text-xs text-blue-600 mt-1">
                                    Suggested: {field.suggestedValue}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  )}

                  {/* Recommendations */}
                  {missingFieldsAnalysis.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Recommendations</h4>
                      <div className="space-y-2">
                        {missingFieldsAnalysis.recommendations.map((recommendation, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                            <p className="text-sm">{recommendation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {missingFieldsAnalysis.missingFields.length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h4 className="font-medium text-green-700 mb-2">Report is Complete!</h4>
                      <p className="text-sm text-muted-foreground">
                        No critical missing fields detected for the selected sections.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline">
          Continue Editing
        </Button>
        <Button onClick={onContinueToReport} className="flex items-center gap-2">
          Generate Final Report
          <CheckCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ReportSectionManager;