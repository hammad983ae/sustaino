import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useReportData } from "@/contexts/ReportDataContext";

const ValuationSummary = () => {
  const { reportData } = useReportData();

  // Extract data from PAF/reportData (these would come from Property Assessment Form)
  const interestValued = reportData?.reportConfig?.interestValues || "Freehold";
  const propertyType = reportData?.propertyDetails?.propertyType || "Current Use";
  const currency = reportData?.reportConfig?.currency || "AUD";
  const gstTreatment = reportData?.reportConfig?.gstTreatment || "Exclusive";

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
              <div className="relative">
                <Input 
                  value={interestValued} 
                  readOnly 
                  className="bg-blue-50 border-blue-200" 
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-blue-600">
                  Pre-populated from platform
                </span>
              </div>
            </div>

            {/* Highest and Best Use */}
            <div className="space-y-2">
              <Label>Highest and Best Use</Label>
              <div className="relative">
                <Input 
                  value={propertyType} 
                  readOnly 
                  className="bg-blue-50 border-blue-200" 
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-blue-600">
                  Pre-populated from platform
                </span>
              </div>
            </div>

            {/* GST Treatment */}
            <div className="space-y-2">
              <Label>GST Treatment</Label>
              <div className="relative">
                <Select value={gstTreatment}>
                  <SelectTrigger className="bg-blue-50 border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Exclusive">Exclusive</SelectItem>
                    <SelectItem value="Inclusive">Inclusive</SelectItem>
                    <SelectItem value="N/A">N/A</SelectItem>
                  </SelectContent>
                </Select>
                <span className="absolute right-8 top-1/2 transform -translate-y-1/2 text-xs text-blue-600">
                  Pre-populated from platform
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Value Component */}
            <div className="space-y-2">
              <Label>Value Component</Label>
              <div className="relative">
                <Input 
                  value="Market Value" 
                  readOnly 
                  className="bg-blue-50 border-blue-200" 
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-blue-600">
                  Pre-populated from platform
                </span>
              </div>
            </div>

            {/* Currency of Valuation */}
            <div className="space-y-2">
              <Label>Currency of Valuation</Label>
              <div className="relative">
                <Select value={currency}>
                  <SelectTrigger className="bg-blue-50 border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AUD">AUD</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
                <span className="absolute right-8 top-1/2 transform -translate-y-1/2 text-xs text-blue-600">
                  Pre-populated from platform
                </span>
              </div>
            </div>

            {/* Market Value - User Input */}
            <div className="space-y-2">
              <Label className="text-green-600 font-medium">Market Value</Label>
              <div className="relative">
                <Input 
                  placeholder="$XXX,XXX" 
                  className="bg-green-50 border-green-200 text-lg font-bold" 
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-green-600">
                  Pre-populated from platform
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValuationSummary;