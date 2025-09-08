import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const EssentialRepairs = () => {
  const [includeSection, setIncludeSection] = useState(true);
  const [requiresRepairs, setRequiresRepairs] = useState("");
  const [suitableForRent, setSuitableForRent] = useState("");

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Essential Repairs</h2>
        <div className="flex items-center gap-4">
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

              {/* If No Repairs Required */}
              {requiresRepairs === "no" && (
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="suitable-for-rent" className="text-base font-medium">
                        Is the Property Suitable For Rent?
                      </Label>
                      <Select value={suitableForRent} onValueChange={setSuitableForRent}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select Yes or No" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {suitableForRent === "yes" && (
                      <div>
                        <Label htmlFor="estimated-rent-no-repairs">Estimated Market Rent</Label>
                        <Input 
                          id="estimated-rent-no-repairs" 
                          placeholder="Enter estimated weekly/monthly rent" 
                          className="mt-2"
                        />
                      </div>
                    )}

                    {suitableForRent === "no" && (
                      <div>
                        <Label htmlFor="rental-unsuitability-reason">Reason Property is Not Suitable for Rent</Label>
                        <Textarea
                          id="rental-unsuitability-reason"
                          placeholder="Explain why the property is not suitable for rental..."
                          className="mt-2 min-h-[80px]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* If Repairs Required */}
              {requiresRepairs === "yes" && (
                <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/20">
                  <div className="space-y-6">
                    {/* Repair Details */}
                    <div>
                      <Label htmlFor="repair-details" className="text-base font-medium">
                        Details of Essential Repairs Required
                      </Label>
                      <Textarea
                        id="repair-details"
                        placeholder="Describe the essential repairs required, including structural, safety, or compliance issues..."
                        className="mt-2 min-h-[120px]"
                      />
                    </div>

                    {/* Repair Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="repair-urgency">Repair Urgency</Label>
                        <Select>
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
                        <Select>
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
                            placeholder="Enter estimated repair cost (AUD)" 
                          />
                        </div>

                        <div>
                          <Label htmlFor="repair-cost-source">Cost Estimate Source</Label>
                          <Select>
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
                            placeholder="e.g., 2-4 weeks, 3 months" 
                          />
                        </div>

                        <div>
                          <Label htmlFor="permits-required">Permits Required</Label>
                          <Select>
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
                            placeholder="Enter estimated weekly/monthly rent" 
                          />
                        </div>

                        <div>
                          <Label htmlFor="property-value-after-repairs">Estimated Property Value After Repairs</Label>
                          <Input 
                            id="property-value-after-repairs" 
                            placeholder="Enter estimated property value (AUD)" 
                          />
                        </div>

                        <div>
                          <Label htmlFor="value-improvement">Value Improvement</Label>
                          <Input 
                            id="value-improvement" 
                            placeholder="Increase in property value" 
                          />
                        </div>

                        <div>
                          <Label htmlFor="roi-repairs">Return on Investment (ROI)</Label>
                          <Input 
                            id="roi-repairs" 
                            placeholder="ROI percentage" 
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="post-repair-rental-suitability">
                          Will Property Be Suitable for Rent After Repairs?
                        </Label>
                        <Select>
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
                    </div>

                    {/* Repair Priorities */}
                    <div>
                      <Label htmlFor="repair-priorities">Repair Priorities & Recommendations</Label>
                      <Textarea
                        id="repair-priorities"
                        placeholder="List repairs in order of priority and provide recommendations for completion strategy..."
                        className="min-h-[100px]"
                      />
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
                  <Select>
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
                  <Select>
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
                  <Input id="depreciation-rate" placeholder="Annual depreciation percentage" />
                </div>

                <div>
                  <Label htmlFor="remaining-useful-life">Remaining Useful Life</Label>
                  <Input id="remaining-useful-life" placeholder="Years of remaining useful life" />
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
                placeholder="Explain how the repair requirements (or lack thereof) impact the property valuation, marketability, and investment potential..."
                className="mt-2 min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EssentialRepairs;