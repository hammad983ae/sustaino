import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, FileText, TrendingUp } from "lucide-react";

const MarketabilityAndMortgageSecurity = () => {
  return (
    <div className="space-y-6">
      {/* Marketability Assessment */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <CardTitle>Marketability Assessment</CardTitle>
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
              <Label htmlFor="days-on-market">Estimated Days on Market</Label>
              <Input id="days-on-market" placeholder="e.g., 30-60 days" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="marketability-factors">Key Marketability Factors</Label>
            <Textarea 
              id="marketability-factors"
              placeholder="Describe location advantages, property features, market demand, accessibility, etc."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="market-challenges">Potential Market Challenges</Label>
            <Textarea 
              id="market-challenges"
              placeholder="Identify any factors that may impact marketability..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Mortgage Security Assessment */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <CardTitle>Mortgage Security Assessment</CardTitle>
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
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle>Risk Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="font-semibold text-sm text-muted-foreground mb-2">MARKET RISK</div>
              <Badge variant="secondary">Low</Badge>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="font-semibold text-sm text-muted-foreground mb-2">LIQUIDITY RISK</div>
              <Badge variant="secondary">Medium</Badge>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="font-semibold text-sm text-muted-foreground mb-2">CREDIT RISK</div>
              <Badge variant="secondary">Low</Badge>
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
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>Lender Considerations</CardTitle>
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