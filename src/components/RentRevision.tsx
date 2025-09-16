import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Calculator, FileText, AlertTriangle, CheckCircle, DollarSign, Calendar } from "lucide-react";

export default function RentRevision() {
  const [includeSection, setIncludeSection] = useState(true);
  const [propertyType, setPropertyType] = useState("");
  const [currentRent, setCurrentRent] = useState("");
  const [marketRent, setMarketRent] = useState("");
  const [revisionMethod, setRevisionMethod] = useState("");
  const [leaseTerms, setLeaseTerms] = useState("");
  const [activeTab, setActiveTab] = useState("current-analysis");

  const calculateVariance = () => {
    if (currentRent && marketRent) {
      const current = parseFloat(currentRent);
      const market = parseFloat(marketRent);
      const variance = ((market - current) / current) * 100;
      return variance.toFixed(2);
    }
    return "0.00";
  };

  const getVarianceStatus = () => {
    const variance = parseFloat(calculateVariance());
    if (variance > 10) return { color: "text-green-600", status: "Above Market" };
    if (variance < -10) return { color: "text-red-600", status: "Below Market" };
    return { color: "text-blue-600", status: "At Market" };
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Rent Revision Analysis</h2>
          <Badge variant="secondary">Market Comparison Tool</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={includeSection}
            onCheckedChange={setIncludeSection}
            id="include-section"
          />
          <Label htmlFor="include-section">Include in Report</Label>
        </div>
      </div>

      {includeSection && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="current-analysis">Current Analysis</TabsTrigger>
            <TabsTrigger value="market-comparison">Market Comparison</TabsTrigger>
            <TabsTrigger value="revision-calculation">Revision Calculation</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="current-analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Current Rental Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="property-type">Property Type</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="mixed-use">Mixed Use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="current-rent">Current Rent ($/sqm/annum)</Label>
                    <Input
                      id="current-rent"
                      type="number"
                      value={currentRent}
                      onChange={(e) => setCurrentRent(e.target.value)}
                      placeholder="Enter current rent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lease-terms">Lease Terms</Label>
                    <Textarea
                      id="lease-terms"
                      value={leaseTerms}
                      onChange={(e) => setLeaseTerms(e.target.value)}
                      placeholder="Enter key lease terms and conditions"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="revision-method">Revision Method</Label>
                    <Select value={revisionMethod} onValueChange={setRevisionMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select revision method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market-review">Market Review</SelectItem>
                        <SelectItem value="cpi-indexation">CPI Indexation</SelectItem>
                        <SelectItem value="fixed-percentage">Fixed Percentage</SelectItem>
                        <SelectItem value="arbitration">Arbitration</SelectItem>
                        <SelectItem value="expert-determination">Expert Determination</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market-comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Market Rent Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="market-rent">Market Rent ($/sqm/annum)</Label>
                    <Input
                      id="market-rent"
                      type="number"
                      value={marketRent}
                      onChange={(e) => setMarketRent(e.target.value)}
                      placeholder="Enter assessed market rent"
                    />
                  </div>

                  <div>
                    <Label>Rent Variance</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`text-2xl font-bold ${getVarianceStatus().color}`}>
                        {calculateVariance()}%
                      </div>
                      <Badge variant={parseFloat(calculateVariance()) > 0 ? "default" : "destructive"}>
                        {getVarianceStatus().status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Comparable Rentals</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Comparable 1</span>
                          <Badge variant="outline">Recent</Badge>
                        </div>
                        <div className="text-lg font-semibold">$450/sqm</div>
                        <div className="text-sm text-gray-600">Similar location, comparable size</div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Comparable 2</span>
                          <Badge variant="outline">Recent</Badge>
                        </div>
                        <div className="text-lg font-semibold">$475/sqm</div>
                        <div className="text-sm text-gray-600">Premium location, similar facilities</div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Comparable 3</span>
                          <Badge variant="outline">Recent</Badge>
                        </div>
                        <div className="text-lg font-semibold">$425/sqm</div>
                        <div className="text-sm text-gray-600">Secondary location, good condition</div>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revision-calculation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Rent Revision Calculation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Current Rental Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Current Rent:</span>
                        <span className="font-medium">${currentRent || '0'}/sqm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Amount:</span>
                        <span className="font-medium">${((parseFloat(currentRent) || 0) * 100).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Revised Rental Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Market Rent:</span>
                        <span className="font-medium text-green-600">${marketRent || '0'}/sqm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Amount:</span>
                        <span className="font-medium text-green-600">${((parseFloat(marketRent) || 0) * 100).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">Annual Increase:</span>
                        <span className="font-bold text-blue-600">
                          ${((parseFloat(marketRent) || 0) - (parseFloat(currentRent) || 0)) * 100 > 0 
                            ? '+' + (((parseFloat(marketRent) || 0) - (parseFloat(currentRent) || 0)) * 100).toLocaleString()
                            : (((parseFloat(marketRent) || 0) - (parseFloat(currentRent) || 0)) * 100).toLocaleString()
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Rent revision calculations are based on market analysis and comparable evidence. 
                    Final determination may be subject to lease terms and negotiation.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Professional Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 border-green-200 bg-green-50">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">Recommended Action</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Based on market analysis, recommend rent revision to align with current market rates.
                      </p>
                    </div>
                  </Card>

                  <Card className="p-4 border-blue-200 bg-blue-50">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Implementation Timeline</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Consider phased implementation over 12-24 months to manage tenant impact.
                      </p>
                    </div>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Key Considerations:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span>Market conditions and rental growth trends in the area</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span>Tenant's business performance and ability to pay increased rent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span>Lease terms regarding rent review mechanisms and frequency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span>Comparable properties and recent rental settlements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span>Property condition and any required improvements</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Rent Review Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calculator className="h-4 w-4 mr-2" />
                    Create Valuation Summary
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}