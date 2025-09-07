import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Users } from "lucide-react";

const TenancyScheduleLeaseDetails = () => {
  return (
    <div className="space-y-6">
      {/* Ground Lease Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-lg">Ground Lease</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-ground-lease" className="text-sm">Include</Label>
              <Switch id="include-ground-lease" defaultChecked />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lease Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lease-type">Lease Type</Label>
              <Input id="lease-type" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lease-term">Lease Term (Years)</Label>
              <Input id="lease-term" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="annual-ground-rent">Annual Ground Rent ($)</Label>
              <Input id="annual-ground-rent" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="review-period">Review Period (Years)</Label>
              <Input id="review-period" placeholder="" className="mt-1" />
            </div>
          </div>

          {/* Lease Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="lease-commencement">Lease Commencement Date</Label>
              <Input id="lease-commencement" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lease-expiry">Lease Expiry Date</Label>
              <Input id="lease-expiry" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="next-review">Next Review Date</Label>
              <Input id="next-review" placeholder="" className="mt-1" />
            </div>
          </div>

          {/* Review Method */}
          <div className="max-w-md">
            <Label htmlFor="review-method">Review Method</Label>
            <Select>
              <SelectTrigger className="mt-1 bg-background">
                <SelectValue placeholder="Select review method" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="cpi">CPI</SelectItem>
                <SelectItem value="market">Market Review</SelectItem>
                <SelectItem value="fixed">Fixed Increase</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lease Options */}
          <div>
            <Label className="text-base font-medium">Lease Options</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="option-renew" />
                <Label htmlFor="option-renew" className="text-sm">Option to Renew</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="option-purchase" />
                <Label htmlFor="option-purchase" className="text-sm">Option to Purchase</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="surrender-clause" />
                <Label htmlFor="surrender-clause" className="text-sm">Surrender Clause</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="break-clause" />
                <Label htmlFor="break-clause" className="text-sm">Break Clause</Label>
              </div>
            </div>
          </div>

          {/* Text Areas */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="permitted-use">Permitted Use</Label>
              <Textarea 
                id="permitted-use"
                placeholder=""
                className="mt-1 h-24"
              />
            </div>
            <div>
              <Label htmlFor="restrictions-covenants">Restrictions & Covenants</Label>
              <Textarea 
                id="restrictions-covenants"
                placeholder=""
                className="mt-1 h-24"
              />
            </div>
            <div>
              <Label htmlFor="impact-valuation">Impact on Valuation</Label>
              <Textarea 
                id="impact-valuation"
                placeholder=""
                className="mt-1 h-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tenant Summary & Documents Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <CardTitle className="text-lg">Tenant Summary & Documents</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Upload tenant summaries (valuer) and generate secure links for clients/agents to upload supporting legal documents.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-tenant-summary" className="text-sm">Include</Label>
              <Switch id="include-tenant-summary" defaultChecked />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Upload tenant summaries and documents</p>
            <Button variant="outline" className="mt-2">
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>

          {/* Tenant Lease Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tenant Lease Details</h3>
            <div className="space-y-4">
              {/* Lessor/Lessee Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lessor">Lessor</Label>
                  <Input id="lessor" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lessee">Lessee</Label>
                  <Input id="lessee" placeholder="" className="mt-1" />
                </div>
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="commencement-date">Commencement Date</Label>
                  <Input id="commencement-date" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input id="expiry-date" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="options-terms">Options/Further Terms</Label>
                  <Input id="options-terms" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="review-date">Review Date</Label>
                  <Input id="review-date" placeholder="" className="mt-1" />
                </div>
              </div>

              {/* Review Method and Other Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="tenant-review-method">Review Method</Label>
                  <Input id="tenant-review-method" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="outgoings">Outgoings</Label>
                  <Input id="outgoings" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="commencement-rent">Commencement Rent</Label>
                  <Input id="commencement-rent" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="incentives">Incentives</Label>
                  <Input id="incentives" placeholder="" className="mt-1" />
                </div>
              </div>

              {/* Additional Lease Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="net-lettable-area">Net Lettable Area</Label>
                  <Input id="net-lettable-area" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="outgoings-per-sqm">Outgoings per sqm</Label>
                  <Input id="outgoings-per-sqm" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="gross-passing-rent">Gross Passing Rent</Label>
                  <Input id="gross-passing-rent" placeholder="" className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="net-passing-rent">Net Passing Rent</Label>
                  <Input id="net-passing-rent" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="tenant-review-mechanism">Review Mechanism</Label>
                  <Input id="tenant-review-mechanism" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="repairs-maintenance">Repairs and Maintenance</Label>
                  <Textarea id="repairs-maintenance" placeholder="" className="mt-1 h-20" />
                </div>
              </div>

              {/* Financial Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="noi">NOI (Net Operating Income)</Label>
                  <Input id="noi" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="net-passing-rent-placement">Net Passing Rent Per Placement</Label>
                  <Input id="net-passing-rent-placement" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="market-rent-sqm">Market rent per/sqm</Label>
                  <Input id="market-rent-sqm" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="market-rent">Market rent</Label>
                  <Input id="market-rent" placeholder="" className="mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="letting-allowance">Letting up allowance</Label>
                  <Input id="letting-allowance" placeholder="" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="wale">WALE</Label>
                  <Input id="wale" placeholder="" className="mt-1" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenancyScheduleLeaseDetails;