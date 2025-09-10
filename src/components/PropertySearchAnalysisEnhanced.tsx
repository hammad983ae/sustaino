import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Satellite, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PropertySearchAnalysisEnhancedProps {
  address?: string;
  onAddressChange?: (address: string) => void;
  onAnalysisComplete?: (data: any) => void;
}

const PropertySearchAnalysisEnhanced = ({ 
  address = "520 Deakin Avenue Mildura VIC 3500", 
  onAddressChange,
  onAnalysisComplete 
}: PropertySearchAnalysisEnhancedProps) => {
  const { toast } = useToast();
  const [currentAddress, setCurrentAddress] = useState(address);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Auto-analyze the first job address
    if (currentAddress && !analysisData) {
      performAnalysis();
    }
  }, []);

  const performAnalysis = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('enhanced-property-analysis', {
        body: {
          address: currentAddress,
          propertyType: 'commercial',
          jobNumber: `10001-${Date.now()}`
        }
      });

      if (error) throw error;

      setAnalysisData(data);
      onAnalysisComplete?.(data);
      
      toast({
        title: "Analysis Complete",
        description: "Enhanced property analysis with real VicPlan data has been retrieved",
        duration: 3000,
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed", 
        description: "Unable to retrieve enhanced property data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressChange = (newAddress: string) => {
    setCurrentAddress(newAddress);
    onAddressChange?.(newAddress);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Enhanced Property Search & Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentAddress}
              onChange={(e) => handleAddressChange(e.target.value)}
              placeholder="Enter property address..."
              className="flex-1"
            />
            <Button 
              onClick={performAnalysis}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Navigation className="h-4 w-4" />
              {isLoading ? "Analyzing..." : "Analyze"}
            </Button>
          </div>

          {analysisData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Geolocation Data */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Geolocation Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Latitude:</span>
                    <span className="text-sm font-mono">{analysisData.geolocation?.latitude}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Longitude:</span>
                    <span className="text-sm font-mono">{analysisData.geolocation?.longitude}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Accuracy:</span>
                    <Badge variant="outline">{analysisData.geolocation?.accuracy}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Aerial Imagery */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Satellite className="h-4 w-4" />
                    Aerial Imagery
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {analysisData.aerialImagery?.satelliteImageUrl && (
                    <div className="space-y-2">
                      <img 
                        src={analysisData.aerialImagery.satelliteImageUrl}
                        alt="Satellite view"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Satellite
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Street View
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* VicPlan Data */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">VicPlan Integration Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisData.vicPlanData?.zoning && (
                    <div>
                      <h4 className="font-medium mb-2">Zoning Information</h4>
                      <div className="bg-muted p-3 rounded-lg space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">Zone:</span>
                          <Badge>{analysisData.vicPlanData.zoning.zone}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {analysisData.vicPlanData.zoning.description}
                        </p>
                        {analysisData.vicPlanData.zoning.permittedUses?.length > 0 && (
                          <div>
                            <span className="text-sm font-medium">Permitted Uses:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {analysisData.vicPlanData.zoning.permittedUses.slice(0, 6).map((use: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {use}
                                </Badge>
                              ))}
                              {analysisData.vicPlanData.zoning.permittedUses.length > 6 && (
                                <Badge variant="outline" className="text-xs">
                                  +{analysisData.vicPlanData.zoning.permittedUses.length - 6} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {analysisData.vicPlanData?.overlays?.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Planning Overlays</h4>
                      <div className="space-y-2">
                        {analysisData.vicPlanData.overlays.map((overlay: any, index: number) => (
                          <div key={index} className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-sm font-medium">{overlay.type}</span>
                              <Badge variant="destructive" className="text-xs">Overlay</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{overlay.description}</p>
                            {overlay.requirements?.length > 0 && (
                              <ul className="text-xs space-y-1">
                                {overlay.requirements.map((req: string, reqIndex: number) => (
                                  <li key={reqIndex} className="flex items-start gap-1">
                                    <span className="text-orange-600">•</span>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysisData.vicPlanData?.constraints?.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Development Constraints</h4>
                      <div className="space-y-2">
                        {analysisData.vicPlanData.constraints.map((constraint: any, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-2 border rounded-lg">
                            <div className={`w-3 h-3 rounded-full mt-1 ${
                              constraint.severity === 'high' ? 'bg-red-500' :
                              constraint.severity === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                            }`} />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <span className="text-sm font-medium">{constraint.type}</span>
                                <Badge variant={
                                  constraint.severity === 'high' ? 'destructive' :
                                  constraint.severity === 'medium' ? 'default' : 'secondary'
                                } className="text-xs">
                                  {constraint.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{constraint.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Market Data */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Market Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisData.marketData && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          ${analysisData.marketData.medianPrice?.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Median Price</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {analysisData.marketData.priceGrowth?.annual}%
                        </div>
                        <div className="text-sm text-muted-foreground">Annual Growth</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {analysisData.marketData.recentSales?.length || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Recent Sales</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertySearchAnalysisEnhanced;