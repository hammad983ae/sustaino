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
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { usePropertyTypeLock } from "@/components/PropertyTypeLockProvider";
import { useProperty } from "@/contexts/PropertyContext";
import { useValuation } from "@/contexts/ValuationContext";

const ReportTypeConfiguration = () => {
  const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [includeRentalValuation, setIncludeRentalValuation] = useState(false);
  const { selectedPropertyType, isPropertyTypeLocked, lockPropertyType, unlockPropertyType } = usePropertyTypeLock();
  const { addressData } = useProperty();
  const { setValuationType } = useValuation();

  const handleCheckboxChange = (label: string, option: string, checked: boolean) => {
    setSelectedValues(prev => {
      const current = prev[label] || [];
      if (checked) {
        const updated = { ...prev, [label]: [...current, option] };
        
        // Update valuation type context to trigger Ground Lease display
        if (label === 'Interest Values' && option === 'Leasehold Interest' && checked) {
          setValuationType('Leasehold Interest');
        }
        
        return updated;
      } else {
        const updated = { ...prev, [label]: current.filter(item => item !== option) };
        
        // Remove valuation type if leasehold interest is unchecked
        if (label === 'Interest Values' && option === 'Leasehold Interest' && !checked) {
          setValuationType('');
        }
        
        return updated;
      }
    });
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    
    // Update valuation type context to trigger Ground Lease display
    if (key === 'valuation-type') {
      setValuationType(value);
    }
    
    // Lock property type once address is confirmed and property type is selected
    if (key === 'property-type' && value && addressData.propertyAddress && !isPropertyTypeLocked) {
      lockPropertyType(value);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Auto-generate custom basis text from selected values
  const generateCustomBasisText = () => {
    const basisValues = selectedValues['Basis of Valuation'] || [];
    const approaches = selectedValues['Valuation Approaches'] || [];
    const components = selectedValues['Value Component'] || [];
    const interests = selectedValues['Interest Values'] || [];

    if (basisValues.length === 0 && approaches.length === 0 && components.length === 0 && interests.length === 0) {
      return '';
    }

    const parts = [];
    if (basisValues.length > 0) parts.push(`Basis: ${basisValues.join(', ')}`);
    if (approaches.length > 0) parts.push(`Approaches: ${approaches.join(', ')}`);
    if (components.length > 0) parts.push(`Component: ${components.join(', ')}`);
    if (interests.length > 0) parts.push(`Interest: ${interests.join(', ')}`);

    return `${parts.join('; ')}. Valuation assumes a reasonable selling period.`;
  };

  useEffect(() => {
    const customBasis = generateCustomBasisText();
    if (customBasis && customBasis !== formData['custom-basis-description']) {
      setFormData(prev => ({ ...prev, 'custom-basis-description': customBasis }));
    }
  }, [selectedValues]);

  const MultiSelectDropdown = ({
    options, 
    placeholder, 
    label 
  }: { 
    options: string[]; 
    placeholder: string; 
    label: string; 
  }) => {
    const selected = selectedValues[label] || [];
    const displayText = selected.length > 0 
      ? `${selected.length} selected` 
      : placeholder;

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {displayText}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <div className="max-h-60 overflow-auto">
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-2 px-3 py-2 hover:bg-accent">
                  <Checkbox 
                    id={`${label}-${option}`.toLowerCase().replace(/\s+/g, '-')} 
                    checked={selected.includes(option)}
                    onCheckedChange={(checked) => handleCheckboxChange(label, option, !!checked)}
                  />
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
    "Residential", "Build to Rent", "Commercial", "Industrial", "Retail", 
    "Development Land", "Agricultural", "Specialized",
    // Specialized Property Sub-types
    "Childcare Centre", "Hotel/Motel", "Carpark", "Cinema", "Service Station", 
    "Licensed Venue", "Healthcare Facility", "Workers Accommodation", 
    "Petrol Station", "Fast Food Restaurant", "Medical Centre", "Aged Care", 
    "Student Accommodation", "Data Centre", "Self Storage", "Funeral Home",
    "Veterinary Clinic", "Drive-Through", "Car Wash", "Bowling Alley",
    "Gymnasiums/Fitness", "Telecommunications Tower", "Cold Storage",
    "Warehouse Distribution", "Manufacturing", "Research Facility", "Other"
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
    "Partial Lease", "Leasehold Interest", "Freehold Going Concern"
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
                <Select value={formData['report-type'] || ''} onValueChange={(value) => handleSelectChange('report-type', value)}>
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
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="property-type" className="text-sm font-medium">
                    Property Type
                    {isPropertyTypeLocked && <span className="ml-2 text-xs text-green-600">(Locked)</span>}
                  </Label>
                  {isPropertyTypeLocked && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={unlockPropertyType}
                      className="text-xs h-auto px-2 py-1 text-muted-foreground hover:text-foreground"
                    >
                      Edit
                    </Button>
                  )}
                </div>
                <Select 
                  value={formData['property-type'] || selectedPropertyType || ''} 
                  onValueChange={(value) => handleSelectChange('property-type', value)}
                  disabled={false}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isPropertyTypeLocked && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Property type locked after address confirmation. Click "Edit" to modify.
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="instructing-party" className="text-sm font-medium">Instructing Party</Label>
                <Input 
                  id="instructing-party"
                  placeholder="Enter instructing party details"
                  className="mt-1"
                  value={formData['instructing-party'] || ''}
                  onChange={(e) => handleInputChange('instructing-party', e.target.value)}
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
                        <Checkbox 
                          id={purpose.toLowerCase().replace(/\s+/g, '-')} 
                          checked={(selectedValues['Valuation Purpose'] || []).includes(purpose)}
                          onCheckedChange={(checked) => handleCheckboxChange('Valuation Purpose', purpose, !!checked)}
                        />
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
                  value={formData['reliant-party'] || ''}
                  onChange={(e) => handleInputChange('reliant-party', e.target.value)}
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

          <div className="pt-4 space-y-4">
            <div>
              <Label htmlFor="custom-basis-auto" className="text-sm font-medium">Custom Basis (Auto-Generated)</Label>
              <Textarea 
                id="custom-basis-auto"
                placeholder="Custom basis will be auto-generated from your selections above"
                className="mt-1"
                value={formData['custom-basis-description'] || ''}
                onChange={(e) => handleInputChange('custom-basis-description', e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                This field auto-generates based on your valuation configuration selections above
              </p>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>Also extend interest valued to include: <span className="underline">Partially Leased and Leasehold Interest</span></p>
            </div>
          </div>
        </div>

        {/* Rental Valuation Configuration */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Rental Valuation Configuration</h3>
            <div className="flex items-center space-x-2">
              <Label htmlFor="include-rental-toggle" className="text-sm">Include Rental Valuation</Label>
              <Switch
                id="include-rental-toggle"
                checked={includeRentalValuation}
                onCheckedChange={setIncludeRentalValuation}
              />
            </div>
          </div>
          
          {includeRentalValuation && (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="rental-assessment-type" className="text-sm font-medium">Rental Assessment Type</Label>
              <Select value={formData['rental-assessment-type'] || ''} onValueChange={(value) => handleSelectChange('rental-assessment-type', value)}>
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
              <Select value={formData['rental-basis'] || ''} onValueChange={(value) => handleSelectChange('rental-basis', value)}>
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
              <Select value={formData['property-classification'] || ''} onValueChange={(value) => handleSelectChange('property-classification', value)}>
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
              <Select value={formData['comparison-unit'] || ''} onValueChange={(value) => handleSelectChange('comparison-unit', value)}>
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
                  <SelectItem value="workers-accommodation-per-bed">Workers Accommodation - Per/Bed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="outgoings-liability" className="text-sm font-medium">Outgoings Liability</Label>
              <Select value={formData['outgoings-liability'] || ''} onValueChange={(value) => handleSelectChange('outgoings-liability', value)}>
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
              <Select value={formData['incentives-treatment'] || ''} onValueChange={(value) => handleSelectChange('incentives-treatment', value)}>
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
              <Select value={formData['evidence-hierarchy'] || ''} onValueChange={(value) => handleSelectChange('evidence-hierarchy', value)}>
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
              <Select value={formData['gst-treatment'] || ''} onValueChange={(value) => handleSelectChange('gst-treatment', value)}>
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
              <Label htmlFor="rental-custom-basis-description" className="text-sm font-medium">Rental Custom Basis Description (if applicable)</Label>
              <Textarea 
                id="rental-custom-basis-description"
                placeholder="Describe custom rental basis or specific requirements"
                className="mt-1"
                value={formData['rental-custom-basis-description'] || ''}
                onChange={(e) => handleInputChange('rental-custom-basis-description', e.target.value)}
              />
            </div>
          </div>
          </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportTypeConfiguration;