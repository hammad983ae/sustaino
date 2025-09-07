import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, MapPin } from "lucide-react";

const PlanningDataIntegration = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-emerald-500" />
          <CardTitle className="text-xl font-semibold">Enhanced Planning Data Integration</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Planning Data Integration Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 font-semibold text-sm">$</span>
            </div>
            <div>
              <h3 className="font-semibold">Planning Data Integration</h3>
              <p className="text-sm text-muted-foreground">Enter a property address to fetch planning data using the two-step process</p>
            </div>
          </div>

          {/* No Planning Data Available */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-600 mb-2">No Planning Data Available</h4>
            <p className="text-sm text-muted-foreground">Enter a property address to automatically fetch planning information</p>
          </div>
        </div>

        {/* Planning Portal Integration */}
        <div className="space-y-4">
          <h3 className="font-semibold">Planning Portal Integration</h3>
          
          <div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select state/territory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nsw">NSW</SelectItem>
                <SelectItem value="vic">VIC</SelectItem>
                <SelectItem value="qld">QLD</SelectItem>
                <SelectItem value="wa">WA</SelectItem>
                <SelectItem value="sa">SA</SelectItem>
                <SelectItem value="tas">TAS</SelectItem>
                <SelectItem value="act">ACT</SelectItem>
                <SelectItem value="nt">NT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Select a State/Territory */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-600 mb-2">Select a State/Territory</h4>
            <p className="text-sm text-muted-foreground">Choose a state or territory to view planning information</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanningDataIntegration;