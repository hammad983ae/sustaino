import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useReportData } from "@/contexts/ReportDataContext";

const ValuationSummary = () => {
  const { reportData, updateReportData } = useReportData();

  // Extract data from Valuation Configuration
  const interestValued = reportData?.reportConfig?.interestValues || "Freehold";
  const valueComponent = reportData?.reportConfig?.valueComponent || "Market Value";
  const highestBestUse = reportData?.reportConfig?.propertyType || "Current Use";
  const currency = reportData?.reportConfig?.currency || "AUD";
  const gstTreatment = reportData?.reportConfig?.gstTreatment || "Exclusive";
  const marketValue = reportData?.reportConfig?.marketValue || "";

  const handleFieldUpdate = (field: string, value: string) => {
    updateReportData('reportConfig', { 
      ...reportData?.reportConfig, 
      [field]: value 
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Valuation Summary
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              Pre-populated from platform
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="include-summary" className="text-sm">Include</Label>
          <Switch id="include-summary" defaultChecked />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Interest Valued */}
            <div className="space-y-2">
              <Label>Interest Valued</Label>
              <Input 
                value={interestValued} 
                onChange={(e) => handleFieldUpdate('interestValues', e.target.value)}
                className="bg-background border-input" 
              />
            </div>

            {/* Highest and Best Use */}
            <div className="space-y-2">
              <Label>Highest and Best Use</Label>
              <Input 
                value={highestBestUse} 
                onChange={(e) => handleFieldUpdate('propertyType', e.target.value)}
                className="bg-background border-input" 
              />
            </div>

            {/* GST Treatment */}
            <div className="space-y-2">
              <Label>GST Treatment</Label>
              <Select value={gstTreatment} onValueChange={(value) => handleFieldUpdate('gstTreatment', value)}>
                <SelectTrigger className="bg-background border-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Exclusive">Exclusive</SelectItem>
                  <SelectItem value="Inclusive">Inclusive</SelectItem>
                  <SelectItem value="N/A">N/A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Value Component */}
            <div className="space-y-2">
              <Label>Value Component</Label>
              <Input 
                value={valueComponent} 
                onChange={(e) => handleFieldUpdate('valueComponent', e.target.value)}
                className="bg-background border-input" 
              />
            </div>

            {/* Currency of Valuation */}
            <div className="space-y-2">
              <Label>Currency of Valuation</Label>
              <Select value={currency} onValueChange={(value) => handleFieldUpdate('currency', value)}>
                <SelectTrigger className="bg-background border-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AUD">AUD</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Market Value - User Input */}
            <div className="space-y-2">
              <Label className="font-medium">Market Value</Label>
              <Input 
                value={marketValue}
                onChange={(e) => handleFieldUpdate('marketValue', e.target.value)}
                placeholder="$XXX,XXX" 
                className="bg-background border-input text-lg font-bold" 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValuationSummary;