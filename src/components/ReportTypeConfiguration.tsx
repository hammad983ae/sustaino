import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

const ReportTypeConfiguration = () => {
  const reportTypes = [
    "Desktop Report", "Kerbside", "Short Form", "Long Form", 
    "Virtual Inspection - Short Form", "Virtual Inspection (Long Form)", 
    "Sustaino-Pro", "Insurance Valuation", "Other"
  ];

  const propertyTypes = [
    "Residential", "Commercial", "Industrial", "Retail", 
    "Development Land", "Agricultural", "Other"
  ];

  const valuationPurposes = [
    "Market Valuation", "Investment Decision", "First Mortgage Security",
    "Second Mortgage Security", "Third Mortgage Security", "Private Equity Pool",
    "Caveat Loan", "Insurance Purposes", "Acquisition/Disposal",
    "Financial Reporting", "Stamp Duty", "SMSF Reporting"
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-xl font-semibold">Report Type and Configuration</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Report Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Report Details</h3>
          <p className="text-sm text-muted-foreground">Configure your report settings and client information</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="report-type" className="text-sm font-medium">Report Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="property-type" className="text-sm font-medium">Property Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Residential" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="instructing-party" className="text-sm font-medium">Instructing Party</Label>
                <Input 
                  id="instructing-party"
                  placeholder="Enter instructing party details"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="valuation-purpose" className="text-sm font-medium">Valuation Purpose</Label>
                <ScrollArea className="h-32 w-full border rounded-md p-2 mt-1">
                  <div className="space-y-2">
                    {valuationPurposes.map((purpose) => (
                      <div key={purpose} className="flex items-center space-x-2">
                        <Checkbox id={purpose.toLowerCase().replace(/\s+/g, '-')} />
                        <Label 
                          htmlFor={purpose.toLowerCase().replace(/\s+/g, '-')} 
                          className="text-sm cursor-pointer"
                        >
                          {purpose}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div>
                <Label htmlFor="instructing-rely" className="text-sm font-medium">Instructing Party</Label>
                <Textarea 
                  id="instructing-rely"
                  placeholder="Enter instructing party"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Valuation Configuration */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Valuation Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basis of Valuation */}
            <div className="space-y-3">
              <h4 className="font-medium">Basis of Valuation</h4>
              <div className="space-y-2">
                {["Market Value", "Insurance Value", "Rental Value"].map((basis) => (
                  <div key={basis} className="flex items-center space-x-2">
                    <Checkbox id={basis.toLowerCase().replace(/\s+/g, '-')} />
                    <Label 
                      htmlFor={basis.toLowerCase().replace(/\s+/g, '-')} 
                      className="text-sm cursor-pointer"
                    >
                      {basis}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Valuation Approaches */}
            <div className="space-y-3">
              <h4 className="font-medium">Valuation Approaches</h4>
              <div className="space-y-2">
                {["Direct Comparison", "Summation Approach", "Capitalisation of Net Income"].map((approach) => (
                  <div key={approach} className="flex items-center space-x-2">
                    <Checkbox id={approach.toLowerCase().replace(/\s+/g, '-')} />
                    <Label 
                      htmlFor={approach.toLowerCase().replace(/\s+/g, '-')} 
                      className="text-sm cursor-pointer"
                    >
                      {approach}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="pt-2 space-y-2">
                {["Capitalisation of Gross Income", "Hypothetical Development"].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item.toLowerCase().replace(/\s+/g, '-')} />
                    <Label 
                      htmlFor={item.toLowerCase().replace(/\s+/g, '-')} 
                      className="text-sm cursor-pointer"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Value Component & Interest Values */}
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium">Value Component</h4>
                <div className="space-y-2">
                  {["Bulk", "As Complete"].map((component) => (
                    <div key={component} className="flex items-center space-x-2">
                      <Checkbox id={component.toLowerCase().replace(/\s+/g, '-')} />
                      <Label 
                        htmlFor={component.toLowerCase().replace(/\s+/g, '-')} 
                        className="text-sm cursor-pointer"
                      >
                        {component}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Interest Values</h4>
                <div className="space-y-2">
                  {["Dates in the Scope", "Value/Renovation", "Full Interest"].map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox id={interest.toLowerCase().replace(/\s+/g, '-')} />
                      <Label 
                        htmlFor={interest.toLowerCase().replace(/\s+/g, '-')} 
                        className="text-sm cursor-pointer"
                      >
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 text-xs text-muted-foreground">
            <p>Also extend interest valued to include: <span className="underline">Partially Leased and Leasehold Interest</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportTypeConfiguration;