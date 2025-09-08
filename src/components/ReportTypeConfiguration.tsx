import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { FileText } from "lucide-react";

const ReportTypeConfiguration = () => {
  const MultiSelectDropdown = ({ 
    options, 
    placeholder, 
    label 
  }: { 
    options: string[]; 
    placeholder: string; 
    label: string; 
  }) => {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {placeholder}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <div className="max-h-60 overflow-auto">
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-2 px-3 py-2 hover:bg-accent">
                  <Checkbox id={`${label}-${option}`.toLowerCase().replace(/\s+/g, '-')} />
                  <Label 
                    htmlFor={`${label}-${option}`.toLowerCase().replace(/\s+/g, '-')} 
                    className="text-sm cursor-pointer flex-1"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

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

  const basisOfValuation = ["Market Value", "Insurance Value", "Rental Value"];
  const valuationApproaches = [
    "Direct Comparison", "Summation Approach", "Capitalisation of Net Income",
    "Capitalisation of Gross Income", "Hypothetical Development"
  ];
  const valueComponents = ["As Is", "As If Complete"];
  const interestValues = [
    "Estate in Fee Simple", "Vacant Possession", "Fully Leased", 
    "Partial Lease", "Leasehold Interest"
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
                <Label htmlFor="reliant-party" className="text-sm font-medium">Reliant Party</Label>
                <Textarea 
                  id="reliant-party"
                  placeholder="Enter reliant party"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Valuation Configuration */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Valuation Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MultiSelectDropdown 
              options={basisOfValuation}
              placeholder="Select basis of valuation"
              label="Basis of Valuation"
            />
            
            <MultiSelectDropdown 
              options={valuationApproaches}
              placeholder="Select valuation approaches"
              label="Valuation Approaches"
            />
            
            <MultiSelectDropdown 
              options={valueComponents}
              placeholder="Select value component"
              label="Value Component"
            />
            
            <MultiSelectDropdown 
              options={interestValues}
              placeholder="Select interest values"
              label="Interest Values"
            />
          </div>

          <div className="pt-4 text-xs text-muted-foreground">
            <p>Also extend interest valued to include: <span className="underline">Partially Leased and Leasehold Interest</span></p>
          </div>
        </div>

        {/* Rental Valuation Configuration */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Rental Valuation Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="rental-assessment-type" className="text-sm font-medium">Rental Assessment Type</Label>
              <Select>
                <SelectTrigger id="rental-assessment-type" className="mt-1">
                  <SelectValue placeholder="Select assessment type" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="market-rent">Market Rent Assessment (IVS)</SelectItem>
                  <SelectItem value="market-value-rent">Rent for Market Value Assessment</SelectItem>
                  <SelectItem value="negotiation-assistance">Rent Negotiation Assistance</SelectItem>
                  <SelectItem value="advocacy-submission">Advocacy Submission</SelectItem>
                  <SelectItem value="expert-determination">Expert Determination/Arbitration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="rental-basis" className="text-sm font-medium">Basis of Rent</Label>
              <Select>
                <SelectTrigger id="rental-basis" className="mt-1">
                  <SelectValue placeholder="Select rental basis" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="market-rent">Market Rent</SelectItem>
                  <SelectItem value="fair-market-rent">Fair Market Rent</SelectItem>
                  <SelectItem value="passing-rent">Passing Rent</SelectItem>
                  <SelectItem value="effective-rent">Effective Rent</SelectItem>
                  <SelectItem value="custom-basis">Custom Basis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="property-classification" className="text-sm font-medium">Property Classification</Label>
              <Select>
                <SelectTrigger id="property-classification" className="mt-1">
                  <SelectValue placeholder="Select classification" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="non-specialised">Non-Specialised Property</SelectItem>
                  <SelectItem value="specialised">Specialised Property</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="comparison-unit" className="text-sm font-medium">Comparison Unit (Specialised)</Label>
              <Select>
                <SelectTrigger id="comparison-unit" className="mt-1">
                  <SelectValue placeholder="Select comparison unit" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="area-based">Area Based (sqm/sqft)</SelectItem>
                  <SelectItem value="per-room">Per Room (Hotels/Motels)</SelectItem>
                  <SelectItem value="per-bay">Per Bay (Carparks)</SelectItem>
                  <SelectItem value="per-child">Per Licensed Child (Childcare)</SelectItem>
                  <SelectItem value="per-seat">Per Seat (Cinemas)</SelectItem>
                  <SelectItem value="cents-per-litre">Cents per Litre (Service Stations)</SelectItem>
                  <SelectItem value="turnover-percentage">Turnover Percentage (Licensed)</SelectItem>
                  <SelectItem value="per-bed">Per Bed (Healthcare)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="outgoings-liability" className="text-sm font-medium">Outgoings Liability</Label>
              <Select>
                <SelectTrigger id="outgoings-liability" className="mt-1">
                  <SelectValue placeholder="Select outgoings structure" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="gross-lease">Gross Lease (Landlord pays all)</SelectItem>
                  <SelectItem value="net-lease">Net Lease (Tenant pays all)</SelectItem>
                  <SelectItem value="tenant-operating">Tenant pays Operating Only</SelectItem>
                  <SelectItem value="proportional-split">Proportional Split</SelectItem>
                  <SelectItem value="specific-allocation">Specific Allocation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="incentives-treatment" className="text-sm font-medium">Incentives Treatment</Label>
              <Select>
                <SelectTrigger id="incentives-treatment" className="mt-1">
                  <SelectValue placeholder="Select incentives approach" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="face-rent">Face Rent (As Stated)</SelectItem>
                  <SelectItem value="effective-rent">Effective Rent (Adjusted)</SelectItem>
                  <SelectItem value="gross-effective">Gross Effective Rent (NPV)</SelectItem>
                  <SelectItem value="no-incentives">No Incentives Assumed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="evidence-hierarchy" className="text-sm font-medium">Market Evidence Priority</Label>
              <Select>
                <SelectTrigger id="evidence-hierarchy" className="mt-1">
                  <SelectValue placeholder="Select evidence weighting" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="new-lease-new">New Lease to New Tenant (Primary)</SelectItem>
                  <SelectItem value="market-rent-review">Market Rent at Review/Option</SelectItem>
                  <SelectItem value="determined-rent">Determined Market Rent</SelectItem>
                  <SelectItem value="new-lease-sitting">New Lease to Sitting Tenant</SelectItem>
                  <SelectItem value="passing-rent-evidence">Passing Rent Evidence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="gst-treatment" className="text-sm font-medium">GST Treatment</Label>
              <Select>
                <SelectTrigger id="gst-treatment" className="mt-1">
                  <SelectValue placeholder="Select GST approach" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="inclusive">Inclusive of GST</SelectItem>
                  <SelectItem value="exclusive">Exclusive of GST</SelectItem>
                  <SelectItem value="market-standard">Market Standard Practice</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <MultiSelectDropdown 
              options={['Rent-free periods', 'Fitout contributions', 'Cash incentives', 'Previous lease payout', 'Reduced rent periods', 'Other inducements']}
              placeholder="Select incentive types to consider"
              label="Incentive Types"
            />

            <div>
              <Label htmlFor="custom-basis-description" className="text-sm font-medium">Custom Basis Description (if applicable)</Label>
              <Textarea 
                id="custom-basis-description"
                placeholder="Describe custom rental basis or specific requirements"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportTypeConfiguration;