import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, CheckCircle, FileText, TrendingUp } from "lucide-react";

const MarketabilityAndMortgageSecurity = () => {
  return (
    <div className="space-y-6">
      {/* Level of Market Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Level of Market Activity</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Assess the current market activity level</p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="market-activity-toggle">Include</Label>
              <Switch id="market-activity-toggle" defaultChecked />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="market-activity-level">Market Activity Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assessment-period">Assessment Period</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 months</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="12months">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="market-activity-comments">Market Activity Comments</Label>
            <Textarea 
              id="market-activity-comments"
              placeholder="Describe the current market activity level and factors influencing it..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Overall Marketability */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Overall Marketability</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Evaluate the property's marketability</p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="marketability-toggle">Include</Label>
              <Switch id="marketability-toggle" defaultChecked />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="marketability-rating">Marketability Rating</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expected-sale-period">Expected Sale Period</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">0-30 days</SelectItem>
                  <SelectItem value="60days">30-60 days</SelectItem>
                  <SelectItem value="90days">60-90 days</SelectItem>
                  <SelectItem value="120days">90-120 days</SelectItem>
                  <SelectItem value="longer">120+ days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="marketability-analysis">Marketability Analysis</Label>
            <Textarea 
              id="marketability-analysis"
              placeholder="Analyze factors affecting the property's marketability..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Is Property Suitable For Mortgage Purposes */}
      <Card>
        <CardHeader>
          <CardTitle>Property Suitability for Mortgage Purposes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="mortgage-suitable">Is property Suitable For Mortgage Purposes?</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Yes or No" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mortgage Security Assessment */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <CardTitle>Mortgage Security Assessment</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="security-toggle">Include Section</Label>
              <Switch id="security-toggle" defaultChecked />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="security-rating">Security Rating</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select security rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aaa">AAA - Prime Security</SelectItem>
                  <SelectItem value="aa">AA - High Quality</SelectItem>
                  <SelectItem value="a">A - Good Quality</SelectItem>
                  <SelectItem value="bbb">BBB - Adequate Security</SelectItem>
                  <SelectItem value="bb">BB - Below Average</SelectItem>
                  <SelectItem value="b">B - Poor Security</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan-to-value">Recommended Maximum LVR</Label>
              <Input id="loan-to-value" placeholder="e.g., 80%" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="security-strengths">Security Strengths</Label>
            <Textarea 
              id="security-strengths"
              placeholder="Location stability, property quality, income reliability, etc."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="security-risks">Security Risks and Considerations</Label>
            <Textarea 
              id="security-risks"
              placeholder="Identify any risks that may affect security value..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <CardTitle>Risk Analysis</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="risk-toggle">Include Section</Label>
              <Switch id="risk-toggle" defaultChecked />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg space-y-2">
              <div className="font-semibold text-sm text-muted-foreground mb-2">MARKET RISK</div>
              <Select defaultValue="low">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-center p-4 border rounded-lg space-y-2">
              <div className="font-semibold text-sm text-muted-foreground mb-2">LIQUIDITY RISK</div>
              <Select defaultValue="medium">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-center p-4 border rounded-lg space-y-2">
              <div className="font-semibold text-sm text-muted-foreground mb-2">CREDIT RISK</div>
              <Select defaultValue="low">
                <SelectTrigger className="w-full">
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

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="risk-mitigation">Risk Mitigation Strategies</Label>
            <Textarea 
              id="risk-mitigation"
              placeholder="Recommend strategies to minimize identified risks..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lender Considerations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <CardTitle>Lender Considerations</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="lender-toggle">Include Section</Label>
              <Switch id="lender-toggle" defaultChecked />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lender-requirements">Special Lender Requirements</Label>
            <Textarea 
              id="lender-requirements"
              placeholder="Note any special conditions, insurance requirements, or compliance issues..."
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valuation-validity">Valuation Validity Period</Label>
            <Input placeholder="e.g., 3 months from date of valuation" />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Generate Security Report
            </Button>
            <Button variant="outline">
              Export Summary
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Industry Financial Benchmarks */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <CardTitle>Industry Financial Benchmarks</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-sm text-muted-foreground mb-1">Industry Avg</div>
              <div className="text-2xl font-bold text-blue-600">11.1%</div>
              <div className="text-sm text-muted-foreground">Profit Margin</div>
              <div className="text-xs mt-1">Real Estate Services</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-sm text-muted-foreground mb-1">Per Employee</div>
              <div className="text-2xl font-bold text-green-600">$190k</div>
              <div className="text-sm text-muted-foreground">Revenue</div>
              <div className="text-xs mt-1">Annual per employee</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-sm text-muted-foreground mb-1">Per Employee</div>
              <div className="text-2xl font-bold text-purple-600">$69k</div>
              <div className="text-sm text-muted-foreground">Average Wage</div>
              <div className="text-xs mt-1">36.3% of revenue</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-4">Cost Structure Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Wages</span>
                  <span className="text-sm font-medium">36.3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full" style={{width: '36.3%'}}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Other Operating Costs</span>
                  <span className="text-sm font-medium">52.6%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full" style={{width: '52.6%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Market Drivers */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <CardTitle>Current Market Drivers</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-600">Positive Drivers</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Number of housing transfers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Mortgage affordability</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Residential housing prices</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Consumer sentiment index</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Business confidence index</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-red-600">Risk Factors</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Residential housing loan rates</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4">Industry Growth Outlook</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Revenue Growth</div>
                <div className="text-2xl font-bold text-blue-600">+1.3%</div>
                <div className="text-xs mt-1">2025-2030 CAGR</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Employment Growth</div>
                <div className="text-2xl font-bold text-green-600">+3.2%</div>
                <div className="text-xs mt-1">2025-2030 CAGR</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-1">Business Growth</div>
                <div className="text-2xl font-bold text-purple-600">2.5%</div>
                <div className="text-xs mt-1">2025-2030 CAGR</div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Outlook Summary:</strong> Population growth driven by migration intensifying housing demand Rising housing prices shifting market towards renting, driving rental-focused services growth Remote work and affordability driving activity to regional areas Demand for sustainable and eco-friendly properties increasing Industry revenue projected to rise 1.3% annually through 2029-30 to $33.0 billion
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Source: IBISWorld "Real Estate Services in Australia", Industry Report L6720, 2024-25
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketabilityAndMortgageSecurity;