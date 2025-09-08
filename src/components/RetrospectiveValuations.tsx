import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, AlertTriangle, FileText, TrendingDown, Database, Eye, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RetrospectiveValuationsProps {
  propertyType?: string;
}

export default function RetrospectiveValuations({ propertyType = "residential" }: RetrospectiveValuationsProps) {
  const [retrospectiveDate, setRetrospectiveDate] = useState("");
  const [valuationPurpose, setValuationPurpose] = useState("");
  const [hindsightRestrictions, setHindsightRestrictions] = useState<string[]>([]);
  const [historicalDataSources, setHistoricalDataSources] = useState<string[]>([]);
  const [marketConditions, setMarketConditions] = useState("");
  const [methodologyAdjustments, setMethodologyAdjustments] = useState("");
  const [complianceChecklist, setComplianceChecklist] = useState<Record<string, boolean>>({});

  const retrospectivePurposes = [
    "Litigation support",
    "Insurance claims",
    "Financial reporting (historical)",
    "Tax disputes",
    "Compulsory acquisition",
    "Partnership dissolution",
    "Estate matters",
    "Due diligence (historical)",
    "Regulatory compliance"
  ];

  const hindsightRestrictionsOptions = [
    "Market events after retrospective date excluded",
    "Economic data limited to available sources",
    "Physical inspections based on historical condition",
    "Planning changes post-date excluded",
    "Infrastructure developments post-date excluded",
    "Market sentiment at retrospective date only"
  ];

  const historicalDataSourcesOptions = [
    "Sales evidence from retrospective period",
    "Rental evidence from retrospective period",
    "Market reports from retrospective date",
    "Economic indicators (historical)",
    "Planning information (historical)",
    "Physical condition reports (historical)",
    "Comparable transactions (historical)",
    "Professional journals (historical)"
  ];

  const ivs2025Requirements = [
    { 
      id: "esg_consideration",
      label: "ESG factors considered based on retrospective date knowledge",
      description: "Environmental, Social, and Governance factors as understood at valuation date"
    },
    {
      id: "data_validation",
      label: "Historical data sources validated and documented",
      description: "All data sources verified for accuracy and availability at retrospective date"
    },
    {
      id: "technology_limitations",
      label: "Technology and automation limitations disclosed",
      description: "Any technological constraints from retrospective period documented"
    },
    {
      id: "market_uncertainty",
      label: "Material valuation uncertainty assessed for retrospective context",
      description: "MVU considerations specific to historical market conditions"
    }
  ];

  const handleHindsightRestrictionChange = (restriction: string, checked: boolean) => {
    if (checked) {
      setHindsightRestrictions([...hindsightRestrictions, restriction]);
    } else {
      setHindsightRestrictions(hindsightRestrictions.filter(r => r !== restriction));
    }
  };

  const handleDataSourceChange = (source: string, checked: boolean) => {
    if (checked) {
      setHistoricalDataSources([...historicalDataSources, source]);
    } else {
      setHistoricalDataSources(historicalDataSources.filter(s => s !== source));
    }
  };

  const handleComplianceChange = (requirement: string, checked: boolean) => {
    setComplianceChecklist({ ...complianceChecklist, [requirement]: checked });
  };

  return (
    <div className="space-y-6">
      <Card className="border-warning/20 bg-gradient-to-br from-card to-warning/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <CardTitle className="text-xl">Retrospective Valuations</CardTitle>
              <p className="text-sm text-muted-foreground">
                ANZVGP 101 Compliant | IVS 2025 Standards
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Critical Requirement:</strong> Retrospective valuations must be based solely on information 
              available at the retrospective date. No hindsight knowledge is permitted in the analysis.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="setup" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="setup" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Setup
              </TabsTrigger>
              <TabsTrigger value="methodology" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Methodology
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Compliance
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Retrospective Date Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="retrospectiveDate">Retrospective Valuation Date *</Label>
                      <Input
                        id="retrospectiveDate"
                        type="date"
                        value={retrospectiveDate}
                        onChange={(e) => setRetrospectiveDate(e.target.value)}
                        className="border-warning/30 focus:border-warning"
                      />
                      <p className="text-xs text-muted-foreground">
                        The date as at which the valuation is to be conducted
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="valuationPurpose">Purpose of Retrospective Valuation *</Label>
                      <Select value={valuationPurpose} onValueChange={setValuationPurpose}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          {retrospectivePurposes.map((purpose) => (
                            <SelectItem key={purpose} value={purpose}>
                              {purpose}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Hindsight Restrictions Applied</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {hindsightRestrictionsOptions.map((restriction) => (
                        <div key={restriction} className="flex items-center space-x-2">
                          <Checkbox
                            id={restriction}
                            checked={hindsightRestrictions.includes(restriction)}
                            onCheckedChange={(checked) => 
                              handleHindsightRestrictionChange(restriction, checked as boolean)
                            }
                          />
                          <Label htmlFor={restriction} className="text-sm font-normal">
                            {restriction}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="methodology" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Historical Data Sources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Available Historical Data Sources</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {historicalDataSourcesOptions.map((source) => (
                        <div key={source} className="flex items-center space-x-2">
                          <Checkbox
                            id={source}
                            checked={historicalDataSources.includes(source)}
                            onCheckedChange={(checked) => 
                              handleDataSourceChange(source, checked as boolean)
                            }
                          />
                          <Label htmlFor={source} className="text-sm font-normal">
                            {source}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marketConditions">Market Conditions at Retrospective Date</Label>
                    <Textarea
                      id="marketConditions"
                      placeholder="Describe the market conditions, economic factors, and any significant events that were known at the retrospective date..."
                      value={marketConditions}
                      onChange={(e) => setMarketConditions(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="methodologyAdjustments">Methodology Adjustments for Historical Context</Label>
                    <Textarea
                      id="methodologyAdjustments"
                      placeholder="Detail any adjustments to standard valuation methodology required for the retrospective context..."
                      value={methodologyAdjustments}
                      onChange={(e) => setMethodologyAdjustments(e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    IVS 2025 & ANZVGP 101 Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {ivs2025Requirements.map((requirement) => (
                      <div key={requirement.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id={requirement.id}
                            checked={complianceChecklist[requirement.id] || false}
                            onCheckedChange={(checked) => 
                              handleComplianceChange(requirement.id, checked as boolean)
                            }
                            className="mt-1"
                          />
                          <div className="space-y-1">
                            <Label htmlFor={requirement.id} className="font-medium">
                              {requirement.label}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {requirement.description}
                            </p>
                          </div>
                        </div>
                        {complianceChecklist[requirement.id] && (
                          <div className="ml-6 pt-2 border-t">
                            <Badge variant="outline" className="text-success border-success">
                              ✓ Compliant
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Documentation Requirements:</strong> All retrospective valuations must include 
                      detailed documentation of data sources, methodological considerations, and limitations 
                      arising from the retrospective nature of the assignment.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Retrospective Analysis Framework
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-info/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="h-4 w-4 text-info" />
                          <h4 className="font-medium">Available Information</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Information that was available and known at the retrospective date
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-warning/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-warning" />
                          <h4 className="font-medium">Excluded Knowledge</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Events and information that became available after the retrospective date
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-success/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-success" />
                          <h4 className="font-medium">Methodology</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Valuation approaches appropriate for the retrospective date context
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Key Considerations for {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} Property</Label>
                      <div className="p-4 bg-muted rounded-lg">
                        <ul className="space-y-2 text-sm">
                          {propertyType === "commercial" && (
                            <>
                              <li>• Rental levels and lease terms applicable at retrospective date</li>
                              <li>• Market yields and capitalization rates from that period</li>
                              <li>• Tenant covenant strength as assessed at retrospective date</li>
                              <li>• Economic conditions affecting commercial property market</li>
                            </>
                          )}
                          {propertyType === "residential" && (
                            <>
                              <li>• Comparable sales from retrospective date period</li>
                              <li>• Interest rates and lending conditions at that time</li>
                              <li>• Local market sentiment and buyer activity</li>
                              <li>• Planning and development approvals in place</li>
                            </>
                          )}
                          {propertyType === "agricultural" && (
                            <>
                              <li>• Commodity prices and agricultural market conditions</li>
                              <li>• Water allocations and rights as at retrospective date</li>
                              <li>• Climate and seasonal conditions for that period</li>
                              <li>• Government policies affecting agricultural land</li>
                            </>
                          )}
                          {propertyType === "specialised" && (
                            <>
                              <li>• Replacement cost estimates based on retrospective date pricing</li>
                              <li>• Technology and operational standards of that era</li>
                              <li>• Regulatory environment at retrospective date</li>
                              <li>• Industry-specific market conditions</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Generate Documentation Template
            </Button>
            <Button className="bg-warning hover:bg-warning/90 text-warning-foreground">
              Complete Retrospective Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}