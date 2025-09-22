/**
 * ============================================================================
 * PROPRIETARY RISK ASSESSMENT METHODOLOGY
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * Risk assessment algorithms and market analysis frameworks are proprietary
 * intellectual property protected by patents and trade secrets.
 * ============================================================================
 */
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useUniversalSave } from "@/hooks/useUniversalSave";
import { useToast } from "@/hooks/use-toast";
import { AutomaticRiskAssessment, type PropertyData } from "@/lib/automaticRiskAssessment";
import { useReportData } from "@/contexts/ReportDataContext";
import { useProperty } from "@/contexts/PropertyContext";
import WorldClassRiskAssessment from '@/components/WorldClassRiskAssessment';

const RiskAssessmentMarketIndicators = () => {
  const { saveData, loadData, isSaving, lastSaved } = useUniversalSave('RiskAssessmentMarketIndicators', { 
    showToast: false, // Disable automatic toast notifications
    autoSave: true 
  });
  const { toast } = useToast();
  const { reportData } = useReportData();
  const { addressData } = useProperty();
  
  const [includeSection, setIncludeSection] = useState(true);
  const [includePropertyRiskRatings, setIncludePropertyRiskRatings] = useState(true);
  const [includeRiskCategories, setIncludeRiskCategories] = useState(true);
  const [includeMarketIndicators, setIncludeMarketIndicators] = useState(true);
  const [includePestelAnalysis, setIncludePestelAnalysis] = useState(true);
  const [includeSwotAnalysis, setIncludeSwotAnalysis] = useState(true);
  const [includeTowsAnalysis, setIncludeTowsAnalysis] = useState(true);

  // Risk category ratings state
  const [riskRatings, setRiskRatings] = useState<{[key: string]: number}>({});
  const [riskSummaries, setRiskSummaries] = useState<{[key: string]: string}>({});

  const [strengthsText, setStrengthsText] = useState("");
  const [weaknessesText, setWeaknessesText] = useState("");
  const [opportunitiesText, setOpportunitiesText] = useState("");
  const [threatsText, setThreatsText] = useState("");

  
  // Load saved data on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      const savedData = await loadData();
      if (savedData) {
        setIncludeSection(savedData.includeSection ?? true);
        setIncludePropertyRiskRatings(savedData.includePropertyRiskRatings ?? true);
        setIncludeRiskCategories(savedData.includeRiskCategories ?? true);
        setIncludeMarketIndicators(savedData.includeMarketIndicators ?? true);
        setIncludePestelAnalysis(savedData.includePestelAnalysis ?? true);
        setIncludeSwotAnalysis(savedData.includeSwotAnalysis ?? true);
        setIncludeTowsAnalysis(savedData.includeTowsAnalysis ?? true);
        setRiskRatings(savedData.riskRatings ?? {});
        setRiskSummaries(savedData.riskSummaries ?? {});
        setStrengthsText(savedData.strengthsText ?? "");
        setWeaknessesText(savedData.weaknessesText ?? "");
        setOpportunitiesText(savedData.opportunitiesText ?? "");
        setThreatsText(savedData.threatsText ?? "");
      }
    };
    loadSavedData();
  }, [loadData]);

  // Auto-save functionality
  useEffect(() => {
    const saveCurrentData = async () => {
      const dataToSave = {
        includeSection,
        includePropertyRiskRatings,
        includeRiskCategories,
        includeMarketIndicators,
        includePestelAnalysis,
        includeSwotAnalysis,
        includeTowsAnalysis,
        riskRatings,
        riskSummaries,
        strengthsText,
        weaknessesText,
        opportunitiesText,
        threatsText
      };
      
      await saveData(dataToSave);
    };

    const debounceTimer = setTimeout(saveCurrentData, 1000);
    return () => clearTimeout(debounceTimer);
  }, [includeSection, includePropertyRiskRatings, includeRiskCategories, includeMarketIndicators, 
      includePestelAnalysis, includeSwotAnalysis, includeTowsAnalysis, riskRatings, riskSummaries, 
      strengthsText, weaknessesText, opportunitiesText, threatsText, saveData]);

  // Remove unused helper functions since we're now using text areas
  // const addItem, removeItem, updateItem functions are no longer needed

  const setRating = (category: string, rating: number) => {
    setRiskRatings(prev => ({ ...prev, [category]: rating }));
  };

  const setSummary = (category: string, summary: string) => {
    setRiskSummaries(prev => ({ ...prev, [category]: summary }));
  };

  // Auto-evaluate risk assessment based on property data from PAF
  const runAutomaticAssessment = () => {
    try {
      // Construct property data from PAF and planning data
      const propertyData: PropertyData = {
        address: addressData.propertyAddress || reportData.locationData?.propertyAddress,
        suburb: addressData.suburb || reportData.locationData?.suburb,
        state: addressData.state || reportData.locationData?.state,
        postcode: addressData.postcode || reportData.locationData?.postcode,
        propertyType: reportData.reportConfig?.propertyType || 'residential',
        zoning: reportData.planningData?.zoning || reportData.legalAndPlanning?.zoning,
        // Property details from PAF data
        landArea: reportData.propertyDetails?.landArea ? Number(reportData.propertyDetails.landArea) : undefined,
        buildingArea: reportData.propertyDetails?.buildingArea ? Number(reportData.propertyDetails.buildingArea) : undefined,
        // Planning and environmental data from PAF
        planningRestrictions: reportData.planningData?.overlays || reportData.legalAndPlanning?.overlays || [],
        floodZone: reportData.riskAssessment?.flooding === 'High' || reportData.planningData?.overlays?.includes('flood') || false,
        bushfireZone: reportData.riskAssessment?.bushfire === 'High' || reportData.planningData?.overlays?.includes('bushfire') || false,
        coastalLocation: addressData.suburb?.toLowerCase().includes('beach') || 
                        addressData.suburb?.toLowerCase().includes('coast') || false,
        // Market conditions from PAF market data
        marketConditions: {
          priceMovement: reportData.marketCommentary?.trends?.includes('increasing') ? 'rising' as const : 'stable' as const,
          salesActivity: reportData.marketCommentary?.activity || 'moderate' as const,
        }
      };

      // Run automatic assessment for residential properties only
      if (propertyData.propertyType?.toLowerCase() === 'residential') {
        const assessment = AutomaticRiskAssessment.evaluateResidentialProperty(propertyData);
        
        // Update risk ratings and summaries with automatic assessment
        const newRatings: {[key: string]: number} = {};
        const newSummaries: {[key: string]: string} = {};
        
        assessment.assessments.forEach(item => {
          newRatings[item.category] = item.rating;
          newSummaries[item.category] = item.summary;
        });
        
        setRiskRatings(prev => ({ ...prev, ...newRatings }));
        setRiskSummaries(prev => ({ ...prev, ...newSummaries }));
        
        toast({
          title: "Automatic Assessment Complete",
          description: `Risk assessment completed for ${assessment.assessments.length} categories. Overall risk: ${assessment.overallRiskProfile}`,
          duration: 5000
        });
      } else {
        toast({
          title: "Automatic Assessment Unavailable", 
          description: "Automatic assessment is currently only available for residential properties",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error running automatic assessment:', error);
      toast({
        title: "Assessment Error",
        description: "Failed to run automatic assessment. Please check property data completeness.",
        variant: "destructive"
      });
    }
  };

  const riskCategories = [
    "Location Neighbourhood",
    "Land Planning",
    "Environmental",
    "Improvements",
    "Market Activity",
    "Market Direction",
    "Economy Impact",
    "Market Segment",
    "Cashflow",
    "Management/Tenancy",
    "ESG"
  ];

  if (!includeSection) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Risk Assessment & Market Indicators</CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="include-section">Include</Label>
              <Switch
                id="include-section"
                checked={includeSection}
                onCheckedChange={setIncludeSection}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This section is excluded from the report.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI-Powered Risk Assessment Section */}
      <WorldClassRiskAssessment />
      
      {/* Legacy Manual Risk Assessment - Optional */}
      <Card className="border-dashed border-2 border-gray-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manual Risk Assessment (Legacy)</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Traditional manual risk assessment - superseded by AI analysis above
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {isSaving ? "Saving..." : lastSaved ? "✅ Saved" : "Unsaved"}
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-section">Include Legacy</Label>
                <Switch
                  id="include-section"
                  checked={includeSection}
                  onCheckedChange={setIncludeSection}
                />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Property Risk Ratings */}
      {includePropertyRiskRatings && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                ⚠️ Property Risk Ratings
              </CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-property-risk">Include</Label>
                <Switch
                  id="include-property-risk"
                  checked={includePropertyRiskRatings}
                  onCheckedChange={setIncludePropertyRiskRatings}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Location Risk</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Market Risk</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tenancy Risk</Label>
                <Select defaultValue="low">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Environmental Risk</Label>
                <Select defaultValue="low">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Overall Risk Rating</Label>
              <Select defaultValue="medium">
                <SelectTrigger className="max-w-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {!includePropertyRiskRatings && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                ⚠️ Property Risk Ratings
              </CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-property-risk">Include</Label>
                <Switch
                  id="include-property-risk"
                  checked={includePropertyRiskRatings}
                  onCheckedChange={setIncludePropertyRiskRatings}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is excluded from the report.</p>
          </CardContent>
        </Card>
      )}

      {/* Risk Categories */}
      {includeRiskCategories && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Risk Categories</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-risk-categories">Include</Label>
                <Switch
                  id="include-risk-categories"
                  checked={includeRiskCategories}
                  onCheckedChange={setIncludeRiskCategories}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 bg-muted">Category</th>
                    <th className="text-left p-3 bg-muted">Rating (1-5)</th>
                    <th className="text-left p-3 bg-muted">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {riskCategories.map((category, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3 font-medium">{category}</td>
                      <td className="p-3">
                        <div className="flex gap-1 items-center">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => setRating(category, rating)}
                              className={`w-8 h-8 flex items-center justify-center text-lg font-bold transition-colors border rounded ${
                                riskRatings[category] >= rating
                                  ? 'text-yellow-500 bg-yellow-50 border-yellow-200 hover:text-yellow-600'
                                  : 'text-gray-400 bg-gray-50 border-gray-200 hover:text-yellow-400 hover:bg-yellow-50'
                              }`}
                              aria-label={`Rate ${category} ${rating} out of 5`}
                              type="button"
                            >
                              {riskRatings[category] >= rating ? '★' : '☆'}
                            </button>
                          ))}
                          {riskRatings[category] && (
                             <span className="ml-2 text-sm font-medium text-muted-foreground">
                               {riskRatings[category]}/5
                             </span>
                           )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Input 
                          placeholder="Enter summary..." 
                          className="w-full"
                          value={riskSummaries[category] || ''}
                          onChange={(e) => setSummary(category, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {!includeRiskCategories && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Risk Categories</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Evaluate property risk factors (excludes Cashflow, Management/Tenancy, ESG which are assessed separately)
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={runAutomaticAssessment}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  disabled={!addressData.propertyAddress && !reportData.propertySearchData?.confirmedAddress}
                >
                  🤖 Auto-Assess
                </Button>
                <div className="flex items-center gap-2">
                  <Label htmlFor="include-risk-categories">Include</Label>
                  <Switch
                    id="include-risk-categories"
                    checked={includeRiskCategories}
                    onCheckedChange={setIncludeRiskCategories}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is excluded from the report.</p>
          </CardContent>
        </Card>
      )}

      {/* Market Indicators */}
      {includeMarketIndicators && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Market Indicators</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-market-indicators">Include</Label>
                <Switch
                  id="include-market-indicators"
                  checked={includeMarketIndicators}
                  onCheckedChange={setIncludeMarketIndicators}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>Market Supply</Label>
                <Select defaultValue="stable">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Market Demand</Label>
                <Select defaultValue="stable">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Rental Vacancies</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Rental Values</Label>
                <Select defaultValue="stable">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="declining">Declining</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="rising">Rising</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>General Conditions</Label>
                <Select defaultValue="stable">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!includeMarketIndicators && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Market Indicators</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-market-indicators">Include</Label>
                <Switch
                  id="include-market-indicators"
                  checked={includeMarketIndicators}
                  onCheckedChange={setIncludeMarketIndicators}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is excluded from the report.</p>
          </CardContent>
        </Card>
      )}

      {/* PESTEL Analysis */}
      {includePestelAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>PESTEL Analysis</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-pestel">Include</Label>
                <Switch
                  id="include-pestel"
                  checked={includePestelAnalysis}
                  onCheckedChange={setIncludePestelAnalysis}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Political Factors</Label>
                <Textarea 
                  placeholder="Government policies, regulations, political stability, tax policies..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Technological Factors</Label>
                <Textarea 
                  placeholder="Automation, digitalization, innovation, technology adoption..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Economic Factors</Label>
                <Textarea 
                  placeholder="Interest rates, inflation, economic growth, unemployment..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Environmental Factors</Label>
                <Textarea 
                  placeholder="Climate change, environmental regulations, sustainability requirements..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Social Factors</Label>
                <Textarea 
                  placeholder="Demographics, lifestyle changes, population growth, cultural trends..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Legal Factors</Label>
                <Textarea 
                  placeholder="Building codes, zoning laws, safety regulations, compliance requirements..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!includePestelAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>PESTEL Analysis</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-pestel">Include</Label>
                <Switch
                  id="include-pestel"
                  checked={includePestelAnalysis}
                  onCheckedChange={setIncludePestelAnalysis}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is excluded from the report.</p>
          </CardContent>
        </Card>
      )}

      {/* SWOT Analysis */}
      {includeSwotAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>SWOT Analysis</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-swot">Include</Label>
                <Switch
                  id="include-swot"
                  checked={includeSwotAnalysis}
                  onCheckedChange={setIncludeSwotAnalysis}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Analyze Strengths, Weaknesses, Opportunities, and Threats for comprehensive assessment
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💪</span>
                  <Label className="text-base font-medium">Strengths</Label>
                </div>
                <Textarea
                  value={strengthsText}
                  onChange={(e) => setStrengthsText(e.target.value)}
                  placeholder="Enter strengths (one per line or separate with commas)..."
                  className="min-h-[120px]"
                />
              </div>

              {/* Weaknesses */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <Label className="text-base font-medium">Weaknesses</Label>
                </div>
                <Textarea
                  value={weaknessesText}
                  onChange={(e) => setWeaknessesText(e.target.value)}
                  placeholder="Enter weaknesses (one per line or separate with commas)..."
                  className="min-h-[120px]"
                />
              </div>

              {/* Opportunities */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🚀</span>
                  <Label className="text-base font-medium">Opportunities</Label>
                </div>
                <Textarea
                  value={opportunitiesText}
                  onChange={(e) => setOpportunitiesText(e.target.value)}
                  placeholder="Enter opportunities (one per line or separate with commas)..."
                  className="min-h-[120px]"
                />
              </div>

              {/* Threats */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <Label className="text-base font-medium">Threats</Label>
                </div>
                <Textarea
                  value={threatsText}
                  onChange={(e) => setThreatsText(e.target.value)}
                  placeholder="Enter threats (one per line or separate with commas)..."
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!includeSwotAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>SWOT Analysis</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-swot">Include</Label>
                <Switch
                  id="include-swot"
                  checked={includeSwotAnalysis}
                  onCheckedChange={setIncludeSwotAnalysis}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is excluded from the report.</p>
          </CardContent>
        </Card>
      )}

      {/* TOWS Analysis */}
      {includeTowsAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                🎯 TOWS Analysis
              </CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-tows">Include</Label>
                <Switch
                  id="include-tows"
                  checked={includeTowsAnalysis}
                  onCheckedChange={setIncludeTowsAnalysis}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Analyze Threats, Opportunities, Weaknesses, and Strengths for strategic insights
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💪</span>
                  <Label className="font-medium">SO Strategies (Strengths + Opportunities)</Label>
                </div>
                <Textarea 
                  placeholder="How to use strengths to take advantage of opportunities..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <Label className="font-medium">WO Strategies (Weaknesses + Opportunities)</Label>
                </div>
                <Textarea 
                  placeholder="How to overcome weaknesses and avoid threats..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <Label className="font-medium">ST Strategies (Strengths + Threats)</Label>
                </div>
                <Textarea 
                  placeholder="How to use strengths to avoid threats..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔺</span>
                  <Label className="font-medium">WT Strategies (Weaknesses + Threats)</Label>
                </div>
                <Textarea 
                  placeholder="How to minimize weaknesses and avoid threats..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!includeTowsAnalysis && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                🎯 TOWS Analysis
              </CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="include-tows">Include</Label>
                <Switch
                  id="include-tows"
                  checked={includeTowsAnalysis}
                  onCheckedChange={setIncludeTowsAnalysis}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section is excluded from the report.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RiskAssessmentMarketIndicators;