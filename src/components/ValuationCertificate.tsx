import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { MapPin, FileText, User, AlertTriangle, Info } from "lucide-react";

const ValuationCertificate = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight">VALUATION CERTIFICATE</CardTitle>
          <p className="text-muted-foreground">This certificate confirms the valuation details and professional compliance</p>
        </CardHeader>
      </Card>

      {/* Automated vs Manual Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Certificate Generation Mode
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="auto-mode" className="text-sm">Manual</Label>
              <Switch id="auto-mode" />
              <Label htmlFor="auto-mode" className="text-sm">Automated</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <Info className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Automated mode pre-populates fields from platform data. Manual mode allows custom input.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Property Identification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Property Identification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="property-address">Property Address</Label>
              <Textarea
                id="property-address"
                placeholder="Enter complete property address including lot, plan, and title details..."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title-reference">Title Reference</Label>
              <Input
                id="title-reference"
                placeholder="e.g., Lot 1 on Plan PS123456"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-type">Property Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                  <SelectItem value="specialised">Specialised</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interest-valued">Interest Valued</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select interest type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freehold">Freehold</SelectItem>
                  <SelectItem value="leasehold">Leasehold</SelectItem>
                  <SelectItem value="strata">Strata Title</SelectItem>
                  <SelectItem value="crown">Crown Lease</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Valuation Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Valuation</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mortgage">Mortgage Security</SelectItem>
                  <SelectItem value="acquisition">Acquisition</SelectItem>
                  <SelectItem value="disposal">Disposal</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="financial">Financial Reporting</SelectItem>
                  <SelectItem value="legal">Legal Proceedings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="basis">Basis of Valuation</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Forced Sale Value" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market Value</SelectItem>
                  <SelectItem value="forced">Forced Sale Value</SelectItem>
                  <SelectItem value="replacement">Replacement Cost</SelectItem>
                  <SelectItem value="fair">Fair Value</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Valuation Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst">GST Treatment</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select GST treatment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inclusive">GST Inclusive</SelectItem>
                  <SelectItem value="exclusive">GST Exclusive</SelectItem>
                  <SelectItem value="exempt">GST Exempt</SelectItem>
                  <SelectItem value="input">Input Taxed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="valuation-date">Date of Valuation</Label>
              <Input
                id="valuation-date"
                type="date"
                placeholder="dd/mm/yyyy"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspection-date">Date of Inspection</Label>
              <Input
                id="inspection-date"
                type="date"
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Certification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Professional Certification
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Pre-populated from platform</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="valuer-name">Valuer Name</Label>
              <Input
                id="valuer-name"
                placeholder="Enter qualified valuer name"
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from valuer profile</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Professional Qualification</Label>
              <Input
                id="qualification"
                placeholder="e.g., Certified Practising Valuer (CPV)"
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from valuer profile</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration">Registration Number</Label>
              <Input
                id="registration"
                placeholder="Enter professional registration number"
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from valuer profile</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="firm">Valuation Firm</Label>
              <Input
                id="firm"
                placeholder="Enter firm/company name"
                className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
              />
              <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from firm profile</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automated Valuation Details */}
      <Card>
        <CardHeader>
          <CardTitle>Valuation Details</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Pre-populated from platform</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              "Interest Valued",
              "Value Component", 
              "Highest and Best Use",
              "Selling Period",
              "Currency of Valuation",
              "Market Value – exclusive of GST",
              "Net Passing Rent",
              "Market Rent",
              "Capitalisation Rate",
              "Insurance Replacement Value",
              "Forced Sale Price Estimate (Range)"
            ].map((field, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                <Label className="font-medium text-foreground">{field}</Label>
                <span className="text-muted-foreground italic">[Pre-populated from platform]</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certification Statement */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Certification Statement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="font-medium mb-3">I certify that:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                This valuation has been prepared in accordance with the relevant Australian Property Institute (API) Professional Practice Standards
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                The valuation represents my unbiased professional opinion of the market value of the subject property
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                I have personally inspected the property and am satisfied with the extent of the inspection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                I have no pecuniary interest in the subject property that could affect the valuation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                The valuation is current as at the date of valuation specified above
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                I am appropriately qualified and experienced to undertake this valuation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                I have complied with all applicable professional and ethical standards
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Limitations and Assumptions */}
      <Card>
        <CardHeader>
          <CardTitle>Limitations and Assumptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter any specific limitations, assumptions, or conditions that apply to this valuation..."
            className="min-h-[120px]"
          />
        </CardContent>
      </Card>

      {/* Important Disclaimers */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
            <AlertTriangle className="h-5 w-5" />
            Important Disclaimers
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-200">Market Movement:</p>
              <p className="text-amber-700 dark:text-amber-300">This valuation is current at the date of valuation only. Property values may change significantly over short periods due to market movements.</p>
            </div>
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-200">Limited Liability:</p>
              <p className="text-amber-700 dark:text-amber-300">Our liability is limited in accordance with our Professional Indemnity insurance and applicable professional standards legislation.</p>
            </div>
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-200">Use Limitations:</p>
              <p className="text-amber-700 dark:text-amber-300">This valuation is prepared for the specific purpose stated and should not be used for any other purpose without written consent.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValuationCertificate;