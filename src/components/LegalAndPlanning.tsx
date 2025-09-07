import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MapPin, FileText } from "lucide-react";

const LegalAndPlanning = () => {
  return (
    <div className="space-y-6">
      {/* Header with Include Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Legal Description & Planning Information</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="include-legal-planning" className="text-sm">Include</Label>
          <Switch id="include-legal-planning" defaultChecked />
        </div>
      </div>

      {/* Interactive Map View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Interactive Map View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-blue-700 mb-2">Interactive Map View</h3>
            <p className="text-sm text-blue-600 mb-4">Aerial imagery provided by State Planning Portals</p>
            <ul className="text-sm text-blue-600 space-y-1 text-left max-w-md mx-auto">
              <li>• Aerial imagery provided by State Planning Portals</li>
              <li>• Use the layer control (top right) to toggle between base map and aerial view</li>
              <li>• Zoom and pan to explore the property and surrounding area</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* State Planning Portal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">State Planning Portal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <Label htmlFor="state-territory">Select state/territory</Label>
            <Select>
              <SelectTrigger className="mt-1 bg-background">
                <SelectValue placeholder="Select state/territory" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
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
          <div className="mt-6 bg-muted rounded-lg p-8 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Select a State/Territory</h3>
            <p className="text-sm text-muted-foreground">Choose a state or territory to view planning information</p>
          </div>
        </CardContent>
      </Card>

      {/* Planning Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Planning Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* First Row - LGA, Zoning, Current Use, Permissible Use */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="lga-legal">LGA</Label>
              <Input id="lga-legal" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="zoning-legal">Zoning</Label>
              <Input id="zoning-legal" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="current-use-legal">Current Use</Label>
              <Input id="current-use-legal" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="permissible-use">Permissible Use</Label>
              <Input id="permissible-use" placeholder="" className="mt-1" />
            </div>
          </div>

          {/* Second Row - Permit Number, Overlays */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="permit-number">Permit Number</Label>
              <Input id="permit-number" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="overlays">Overlays</Label>
              <Input id="overlays" placeholder="" className="mt-1" />
            </div>
          </div>

          {/* Overlay Impact Assessment */}
          <div>
            <Label htmlFor="overlay-impact-assessment">Overlay Impact Assessment</Label>
            <Textarea 
              id="overlay-impact-assessment"
              placeholder=""
              className="mt-1 h-32"
            />
          </div>

          {/* Overlay Impact Rating */}
          <div className="max-w-md">
            <Label htmlFor="overlay-impact-rating">Overlay Impact Rating</Label>
            <Select>
              <SelectTrigger className="mt-1 bg-background">
                <SelectValue placeholder="Select impact rating" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="low">Low Impact</SelectItem>
                <SelectItem value="medium">Medium Impact</SelectItem>
                <SelectItem value="high">High Impact</SelectItem>
                <SelectItem value="very-high">Very High Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Building Controls Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="height-building">Height of Building</Label>
              <Input id="height-building" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="floor-space-ratio">Floor Space Ratio</Label>
              <Input id="floor-space-ratio" placeholder="" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="minimum-lot-size">Minimum Lot Size</Label>
              <Input id="minimum-lot-size" placeholder="" className="mt-1" />
            </div>
          </div>

          {/* Planning Restrictions & Overlays */}
          <div>
            <Label htmlFor="planning-restrictions">Planning Restrictions & Overlays</Label>
            <Textarea 
              id="planning-restrictions"
              placeholder=""
              className="mt-1 h-32"
            />
          </div>

          {/* Development Potential & Future Use */}
          <div>
            <Label htmlFor="development-potential">Development Potential & Future Use</Label>
            <Textarea 
              id="development-potential"
              placeholder=""
              className="mt-1 h-32"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalAndPlanning;