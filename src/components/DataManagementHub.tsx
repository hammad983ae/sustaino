import React, { useState, useEffect, useCallback } from 'react';
import { Save, Download, Upload, RefreshCw, Database, FileText, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useReportData } from '@/hooks/useReportData';
import { useAutosave } from '@/hooks/useAutosave';
import { supabase } from '@/integrations/supabase/client';

interface DataManagementHubProps {
  reportId?: string;
  propertyData?: any;
  integrationData?: any;
  onDataUpdate?: (data: any) => void;
  className?: string;
}

interface AutofillSource {
  name: string;
  icon: React.ReactNode;
  status: 'available' | 'loading' | 'error' | 'empty';
  data?: any;
  lastUpdated?: Date;
}

export const DataManagementHub: React.FC<DataManagementHubProps> = ({
  reportId,
  propertyData,
  integrationData,
  onDataUpdate,
  className = ''
}) => {
  const { toast } = useToast();
  const { reportData, updateSection, saveToStorage, loadFromStorage, clearData } = useReportData();
  
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [autofillSources, setAutofillSources] = useState<AutofillSource[]>([]);
  const [autofillProgress, setAutofillProgress] = useState(0);

  // Auto-save functionality
  const { saveNow, loadSaved, clearSaved } = useAutosave({
    key: reportId || 'current-report',
    data: { ...reportData, propertyData, integrationData },
    delay: 2000,
    enabled: true
  });

  // Initialize autofill sources
  useEffect(() => {
    const sources: AutofillSource[] = [
      {
        name: 'Property Context',
        icon: <Database className="h-4 w-4" />,
        status: propertyData ? 'available' : 'empty',
        data: propertyData,
        lastUpdated: propertyData ? new Date() : undefined
      },
      {
        name: 'RP Data',
        icon: <FileText className="h-4 w-4" />,
        status: integrationData?.rpData ? 'available' : 'empty',
        data: integrationData?.rpData,
        lastUpdated: integrationData?.rpData ? new Date() : undefined
      },
      {
        name: 'VicPlan Data',
        icon: <Zap className="h-4 w-4" />,
        status: integrationData?.vicPlan ? 'available' : 'empty',
        data: integrationData?.vicPlan,
        lastUpdated: integrationData?.vicPlan ? new Date() : undefined
      },
      {
        name: 'Enhanced Analysis',
        icon: <RefreshCw className="h-4 w-4" />,
        status: integrationData?.enhanced ? 'available' : 'empty',
        data: integrationData?.enhanced,
        lastUpdated: integrationData?.enhanced ? new Date() : undefined
      },
      {
        name: 'Risk Assessment',
        icon: <AlertTriangle className="h-4 w-4" />,
        status: integrationData?.googleMaps ? 'available' : 'empty',
        data: integrationData?.googleMaps,
        lastUpdated: integrationData?.googleMaps ? new Date() : undefined
      }
    ];

    setAutofillSources(sources);
  }, [propertyData, integrationData]);

  // Auto-fill report sections with available data
  const handleAutofill = useCallback(async () => {
    setAutofillProgress(0);
    
    const availableSources = autofillSources.filter(source => source.status === 'available');
    
    if (availableSources.length === 0) {
      toast({
        title: "No Data Available",
        description: "Please fetch property data first using the address identifier.",
        variant: "destructive"
      });
      return;
    }

    try {
      let processedSources = 0;
      const totalSources = availableSources.length;

      for (const source of availableSources) {
        // Map data to appropriate report sections
        await mapDataToReportSections(source);
        
        processedSources++;
        setAutofillProgress((processedSources / totalSources) * 100);
        
        // Small delay for UI feedback
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      toast({
        title: "Autofill Complete",
        description: `Successfully pre-filled data from ${availableSources.length} sources`,
      });

      if (onDataUpdate) {
        onDataUpdate(reportData);
      }

    } catch (error) {
      console.error('Autofill error:', error);
      toast({
        title: "Autofill Error",
        description: "Failed to auto-fill some data. Please check manually.",
        variant: "destructive"
      });
    }
  }, [autofillSources, reportData, onDataUpdate, toast]);

  const mapDataToReportSections = async (source: AutofillSource) => {
    const { name, data } = source;

    switch (name) {
      case 'Property Context':
        if (data) {
          updateSection('propertyDetails', {
            address: data.propertyAddress,
            lotNumber: data.lotNumber,
            planNumber: data.planNumber,
            unitNumber: data.unitNumber,
            streetNumber: data.streetNumber,
            streetName: data.streetName,
            streetType: data.streetType,
            suburb: data.suburb,
            state: data.state,
            postcode: data.postcode,
            country: data.country
          });
        }
        break;

      case 'RP Data':
        if (data) {
          updateSection('salesEvidence', {
            comparableSales: data.sales || [],
            marketData: data.market || {},
            priceHistory: data.history || []
          });
          
          updateSection('marketCommentary', {
            medianPrice: data.market?.medianPrice,
            priceGrowth: data.market?.growth,
            marketTrends: data.market?.trends
          });
        }
        break;

      case 'VicPlan Data':
        if (data) {
          updateSection('legalAndPlanning', {
            zoning: data.zoning,
            overlays: data.overlays,
            constraints: data.constraints,
            planningPermits: data.permits
          });
        }
        break;

      case 'Enhanced Analysis':
        if (data) {
          if (data.geolocation) {
            updateSection('rpdAndLocation', {
              latitude: data.geolocation.lat,
              longitude: data.geolocation.lng,
              aerialImagery: data.aerialImagery?.url
            });
          }
          
          if (data.marketAnalysis) {
            updateSection('marketTransactionAnalysis', {
              recentSales: data.marketAnalysis.recentSales,
              priceRange: data.marketAnalysis.priceRange
            });
          }
        }
        break;

      case 'Risk Assessment':
        if (data) {
          updateSection('climateRiskAssessment', {
            floodRisk: data.floodRisk,
            fireRisk: data.fireRisk,
            climateFactors: data.climateFactors,
            insuranceImplications: data.insurance
          });
        }
        break;
    }
  };

  const handleManualSave = async () => {
    setIsSaving(true);
    try {
      await saveToStorage();
      await saveNow();
      
      // If we have a report ID, save to Supabase
      if (reportId) {
        const { error } = await supabase
          .from('reports')
          .update({
            sections_data: reportData,
            updated_at: new Date().toISOString()
          })
          .eq('id', reportId);

        if (error) throw error;
      }

      toast({
        title: "Report Saved",
        description: "Your report has been saved successfully",
      });
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save the report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-pdf-report', {
        body: {
          reportData: reportData,
          propertyData: propertyData,
          integrationData: integrationData
        }
      });

      if (error) throw error;

      if (data?.downloadUrl) {
        // Create a download link
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = `Property_Report_${new Date().toISOString().split('T')[0]}.pdf`;
        link.click();

        toast({
          title: "Report Generated",
          description: "Your PDF report has been generated and downloaded",
        });
      }
    } catch (error) {
      console.error('Report generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate the PDF report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleLoadSaved = () => {
    const saved = loadSaved();
    if (saved) {
      Object.keys(saved.reportData || {}).forEach(sectionKey => {
        updateSection(sectionKey, saved.reportData[sectionKey]);
      });

      toast({
        title: "Data Loaded",
        description: "Previously saved data has been loaded",
      });
    } else {
      toast({
        title: "No Saved Data",
        description: "No previously saved data found",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Data Management Hub</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Auto-save enabled
            </Badge>
          </div>
        </div>

        {/* Autofill Sources Status */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Available Data Sources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {autofillSources.map((source, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  {source.icon}
                  <span className="text-sm font-medium">{source.name}</span>
                </div>
                <div className="ml-auto">
                  {source.status === 'available' && <CheckCircle className="h-4 w-4 text-success" />}
                  {source.status === 'empty' && <div className="h-4 w-4 rounded-full bg-muted" />}
                  {source.status === 'error' && <AlertTriangle className="h-4 w-4 text-destructive" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Autofill Progress */}
        {autofillProgress > 0 && autofillProgress < 100 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pre-filling report sections...</span>
              <span className="text-sm font-medium">{Math.round(autofillProgress)}%</span>
            </div>
            <Progress value={autofillProgress} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button 
            onClick={handleAutofill}
            disabled={autofillSources.filter(s => s.status === 'available').length === 0}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Auto-fill Report
          </Button>

          <Button 
            onClick={handleManualSave}
            disabled={isSaving}
            variant="outline"
            className="w-full"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Manual Save'}
          </Button>

          <Button 
            onClick={handleLoadSaved}
            variant="outline"
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Load Saved
          </Button>

          <Button 
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
            variant="default"
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            {isGeneratingReport ? 'Generating...' : 'Generate PDF'}
          </Button>
        </div>

        {/* Data Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Current Report Status</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {Object.keys(reportData || {}).length}
              </div>
              <div className="text-xs text-muted-foreground">Sections</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">
                {autofillSources.filter(s => s.status === 'available').length}
              </div>
              <div className="text-xs text-muted-foreground">Data Sources</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">
                {reportId ? 'Linked' : 'Draft'}
              </div>
              <div className="text-xs text-muted-foreground">Status</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};