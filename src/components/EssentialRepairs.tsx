import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, AlertTriangle, CheckCircle2, Bell, Eye } from "lucide-react";
import { useUniversalSave } from "@/hooks/useUniversalSave";
import { useToast } from "@/hooks/use-toast";
import { useReportData } from "@/contexts/ReportDataContext";
import { useProperty } from "@/contexts/PropertyContext";

const EssentialRepairs = () => {
  const { saveData, loadData, isSaving, lastSaved } = useUniversalSave('EssentialRepairs', { showToast: false });
  const { toast } = useToast();
  const { reportData, updateReportData } = useReportData();
  const { addressData } = useProperty();
  
  const [includeSection, setIncludeSection] = useState(true);
  const [requiresRepairs, setRequiresRepairs] = useState("");
  const [suitableForRent, setSuitableForRent] = useState("");
  const [notificationSent, setNotificationSent] = useState(false);
  const [preFilledFromAssessment, setPreFilledFromAssessment] = useState(false);
  
  // Enhanced repair data state
  const [repairData, setRepairData] = useState({
    repairDetails: '',
    repairUrgency: '',
    repairCategory: '',
    repairCostEstimate: '',
    repairCostSource: '',
    repairTimeframe: '',
    permitsRequired: '',
    marketRentAfterRepairs: '',
    propertyValueAfterRepairs: '',
    valueImprovement: '',
    roiRepairs: '',
    postRepairRentalSuitability: '',
    estimatedRentAfterRepairs: '',
    repairPriorities: '',
    additionalComments: '',
    overallCondition: '',
    maintenanceLevel: '',
    depreciationRate: '',
    remainingUsefulLife: '',
    valuationImpact: ''
  });

  // Auto-populate from Property Assessment Form data
  useEffect(() => {
    const condition = reportData?.propertySearchData?.buildingCondition || 
                     reportData?.propertyDetails?.buildingCondition;
    
    if (condition) {
      // Auto-determine if repairs needed based on condition
      if (['poor', 'fair', 'dilapidated', 'requires-renovation'].includes(condition.toLowerCase())) {
        setRequiresRepairs('yes');
        setPreFilledFromAssessment(true);
        
        // Set default condition data
        setRepairData(prev => ({
          ...prev,
          overallCondition: condition,
          additionalComments: `Property condition assessment from initial form indicates: ${condition}. Further inspection recommended.`
        }));
        
        // Send notification to instructor/field inspection
        if (!notificationSent) {
          toast({
            title: "Essential Repairs Required",
            description: "Property condition indicates repairs needed. Instructor/field inspection notification sent.",
            variant: "destructive"
          });
          setNotificationSent(true);
        }
      } else {
        setRequiresRepairs('no');
        setPreFilledFromAssessment(true);
        setRepairData(prev => ({
          ...prev,
          overallCondition: condition,
          additionalComments: `Property assessment indicates good condition. No essential repairs identified.`
        }));
      }
    }
  }, [reportData, notificationSent, toast]);

  // Load saved data on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      const savedData = await loadData();
      if (savedData) {
        setIncludeSection(savedData.includeSection ?? true);
        setRequiresRepairs(savedData.requiresRepairs ?? "");
        setSuitableForRent(savedData.suitableForRent ?? "");
        setRepairData(savedData.repairData || repairData);
        setNotificationSent(savedData.notificationSent ?? false);
        setPreFilledFromAssessment(savedData.preFilledFromAssessment ?? false);
      }
    };
    loadSavedData();
  }, [loadData]);

  // Auto-save functionality - changed to 10 seconds
  useEffect(() => {
    const saveCurrentData = async () => {
      const dataToSave = {
        includeSection,
        requiresRepairs,
        suitableForRent,
        repairData,
        notificationSent,
        preFilledFromAssessment
      };
      await saveData(dataToSave);
    };

    const debounceTimer = setTimeout(saveCurrentData, 10000);
    return () => clearTimeout(debounceTimer);
  }, [includeSection, requiresRepairs, suitableForRent, repairData, notificationSent, preFilledFromAssessment, saveData]);

  const handleRepairDataChange = (field: string, value: string) => {
    setRepairData(prev => ({ ...prev, [field]: value }));
  };

  const sendNotificationToInstructor = () => {
    toast({
      title: "Notification Sent",
      description: "Field inspection team and instructor have been notified of essential repair requirements.",
    });
    setNotificationSent(true);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Essential Repairs</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {isSaving ? "Saving..." : lastSaved ? "✅ Saved" : "Unsaved"}
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="include-essential-repairs">Include</Label>
            <Switch
              id="include-essential-repairs"
              checked={includeSection}
              onCheckedChange={setIncludeSection}
            />
          </div>
          <Button variant="outline" size="sm">
            <Lock className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {includeSection && (
        <>
          {/* Pre-filled Assessment Alert */}
          {preFilledFromAssessment && (
            <Alert className="mb-4">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <span>
                    Essential repairs assessment pre-filled from Property Assessment Form. 
                    Property condition: <Badge variant="secondary">{repairData.overallCondition}</Badge>
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setPreFilledFromAssessment(false)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Manual Override
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Property Repair Assessment</CardTitle>
              <p className="text-sm text-muted-foreground">
                Assess whether the property requires essential repairs and evaluate rental suitability and post-repair value.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Question */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="requires-repairs" className="text-base font-medium">
                    Does the Property Require Any Essential Repairs?
                  </Label>
                  <Select value={requiresRepairs} onValueChange={setRequiresRepairs}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select Yes or No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* If No Repairs Required - No further action needed */}
                {requiresRepairs === "no" && (
                  <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <p className="text-green-700 dark:text-green-300 font-medium">
                      ✓ No essential repairs required. No further assessment needed for this section.
                    </p>
                  </div>
                )}

                {/* If Repairs Required */}
                {requiresRepairs === "yes" && (
                  <div className="space-y-6">
                    {/* Notification Section */}
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex items-center justify-between">
                          <span>Essential repairs identified. Field inspection and instructor notification required.</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={sendNotificationToInstructor}
                            disabled={notificationSent}
                          >
                            <Bell className="h-4 w-4 mr-1" />
                            {notificationSent ? "Notified" : "Notify Team"}
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>

                    <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/20">
                      <div className="space-y-6">
                        {/* Repair Details */}
                        <div>
                          <Label htmlFor="repair-details" className="text-base font-medium">
                            Details of Essential Repairs Required
                          </Label>
                          <Textarea
                            id="repair-details"
                            value={repairData.repairDetails}
                            onChange={(e) => handleRepairDataChange('repairDetails', e.target.value)}
                            placeholder="Describe the essential repairs required, including structural, safety, or compliance issues..."
                            className="mt-2 min-h-[120px]"
                          />
                        </div>

                        {/* Repair Categories */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="repair-urgency">Repair Urgency</Label>
                            <Select value={repairData.repairUrgency} onValueChange={(value) => handleRepairDataChange('repairUrgency', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select urgency level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="immediate">Immediate</SelectItem>
                                <SelectItem value="urgent">Urgent (within 1 month)</SelectItem>
                                <SelectItem value="moderate">Moderate (within 3 months)</SelectItem>
                                <SelectItem value="low">Low Priority</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="repair-category">Repair Category</Label>
                            <Select value={repairData.repairCategory} onValueChange={(value) => handleRepairDataChange('repairCategory', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="structural">Structural</SelectItem>
                                <SelectItem value="safety">Safety</SelectItem>
                                <SelectItem value="compliance">Compliance</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="cosmetic">Cosmetic</SelectItem>
                                <SelectItem value="multiple">Multiple Categories</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Cost Analysis */}
                        <div className="space-y-4">
                          <h4 className="font-medium">Cost Analysis</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="repair-cost-estimate">Cost to Complete Repairs</Label>
                              <Input 
                                id="repair-cost-estimate" 
                                value={repairData.repairCostEstimate}
                                onChange={(e) => handleRepairDataChange('repairCostEstimate', e.target.value)}
                                placeholder="Enter estimated repair cost (AUD)" 
                              />
                            </div>

                            <div>
                              <Label htmlFor="repair-cost-source">Cost Estimate Source</Label>
                              <Select value={repairData.repairCostSource} onValueChange={(value) => handleRepairDataChange('repairCostSource', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select source" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="quote">Contractor Quote</SelectItem>
                                  <SelectItem value="estimate">Professional Estimate</SelectItem>
                                  <SelectItem value="experience">Industry Experience</SelectItem>
                                  <SelectItem value="quantity-surveyor">Quantity Surveyor</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="repair-timeframe">Estimated Repair Timeframe</Label>
                              <Input 
                                id="repair-timeframe" 
                                value={repairData.repairTimeframe}
                                onChange={(e) => handleRepairDataChange('repairTimeframe', e.target.value)}
                                placeholder="e.g., 2-4 weeks, 3 months" 
                              />
                            </div>

                            <div>
                              <Label htmlFor="permits-required">Permits Required</Label>
                              <Select value={repairData.permitsRequired} onValueChange={(value) => handleRepairDataChange('permitsRequired', value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select requirement" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                  <SelectItem value="unknown">Unknown</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Post-Repair Assessment */}
                        <div className="space-y-4">
                          <h4 className="font-medium">Post-Repair Assessment</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="market-rent-after-repairs">Estimated Market Rent After Repairs</Label>
                              <Input 
                                id="market-rent-after-repairs" 
                                value={repairData.marketRentAfterRepairs}
                                onChange={(e) => handleRepairDataChange('marketRentAfterRepairs', e.target.value)}
                                placeholder="Enter estimated weekly/monthly rent" 
                              />
                            </div>

                            <div>
                              <Label htmlFor="property-value-after-repairs">Estimated Property Value After Repairs</Label>
                              <Input 
                                id="property-value-after-repairs" 
                                value={repairData.propertyValueAfterRepairs}
                                onChange={(e) => handleRepairDataChange('propertyValueAfterRepairs', e.target.value)}
                                placeholder="Enter estimated property value (AUD)" 
                              />
                            </div>

                            <div>
                              <Label htmlFor="value-improvement">Value Improvement</Label>
                              <Input 
                                id="value-improvement" 
                                value={repairData.valueImprovement}
                                onChange={(e) => handleRepairDataChange('valueImprovement', e.target.value)}
                                placeholder="Increase in property value" 
                              />
                            </div>

                            <div>
                              <Label htmlFor="roi-repairs">Return on Investment (ROI)</Label>
                              <Input 
                                id="roi-repairs" 
                                value={repairData.roiRepairs}
                                onChange={(e) => handleRepairDataChange('roiRepairs', e.target.value)}
                                placeholder="ROI percentage" 
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="post-repair-rental-suitability">
                              Is the Property Suitable for Rent After Repairs?
                            </Label>
                            <Select value={repairData.postRepairRentalSuitability} onValueChange={(value) => handleRepairDataChange('postRepairRentalSuitability', value)}>
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select Yes or No" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="partial">Partially</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="estimated-rent-after-repairs">Estimated Market Rent After Repairs</Label>
                            <Input 
                              id="estimated-rent-after-repairs" 
                              value={repairData.estimatedRentAfterRepairs}
                              onChange={(e) => handleRepairDataChange('estimatedRentAfterRepairs', e.target.value)}
                              placeholder="Enter estimated weekly/monthly rent" 
                            />
                          </div>
                        </div>

                        {/* Repair Priorities */}
                        <div>
                          <Label htmlFor="repair-priorities">Repair Priorities & Recommendations</Label>
                          <Textarea
                            id="repair-priorities"
                            value={repairData.repairPriorities}
                            onChange={(e) => handleRepairDataChange('repairPriorities', e.target.value)}
                            placeholder="List repairs in order of priority and provide recommendations for completion strategy..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Comments - Always Shown */}
              <div>
                <Label htmlFor="additional-comments" className="text-base font-medium">
                  Additional Comments
                </Label>
                <Textarea
                  id="additional-comments"
                  value={repairData.additionalComments}
                  onChange={(e) => handleRepairDataChange('additionalComments', e.target.value)}
                  placeholder="Any additional observations regarding property condition, repair recommendations, market implications, or other relevant comments..."
                  className="mt-2 min-h-[120px]"
                />
              </div>

              {/* Property Condition Summary */}
              <div className="space-y-4">
                <h4 className="font-medium">Property Condition Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="overall-condition">Overall Property Condition</Label>
                    <Select value={repairData.overallCondition} onValueChange={(value) => handleRepairDataChange('overallCondition', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                        <SelectItem value="dilapidated">Dilapidated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="maintenance-level">Maintenance Level</Label>
                    <Select value={repairData.maintenanceLevel} onValueChange={(value) => handleRepairDataChange('maintenanceLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select maintenance level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="well-maintained">Well Maintained</SelectItem>
                        <SelectItem value="adequately-maintained">Adequately Maintained</SelectItem>
                        <SelectItem value="poorly-maintained">Poorly Maintained</SelectItem>
                        <SelectItem value="neglected">Neglected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="depreciation-rate">Estimated Depreciation Rate</Label>
                    <Input 
                      id="depreciation-rate" 
                      value={repairData.depreciationRate}
                      onChange={(e) => handleRepairDataChange('depreciationRate', e.target.value)}
                      placeholder="Annual depreciation percentage" 
                    />
                  </div>

                  <div>
                    <Label htmlFor="remaining-useful-life">Remaining Useful Life</Label>
                    <Input 
                      id="remaining-useful-life" 
                      value={repairData.remainingUsefulLife}
                      onChange={(e) => handleRepairDataChange('remainingUsefulLife', e.target.value)}
                      placeholder="Years of remaining useful life" 
                    />
                  </div>
                </div>
              </div>

              {/* Impact on Valuation */}
              <div>
                <Label htmlFor="valuation-impact" className="text-base font-medium">
                  Impact on Property Valuation
                </Label>
                <Textarea
                  id="valuation-impact"
                  value={repairData.valuationImpact}
                  onChange={(e) => handleRepairDataChange('valuationImpact', e.target.value)}
                  placeholder="Explain how the repair requirements (or lack thereof) impact the property valuation, marketability, and investment potential..."
                  className="mt-2 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default EssentialRepairs;