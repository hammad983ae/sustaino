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
    </div>
  );
};

export default MarketabilityAndMortgageSecurity;