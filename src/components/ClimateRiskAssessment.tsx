import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const ClimateRiskAssessment = () => {
  const [enabled, setEnabled] = useState(true);
  const [climateRisk, setClimateRisk] = useState("");
  const [floodRisk, setFloodRisk] = useState("");
  const [bushfireRisk, setBushfireRisk] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="relative bg-gradient-to-br from-background via-background to-primary/5 border-2 border-primary/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform perspective-1000 rotate-x-2">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/60"></div>
              Sustainability & Climate Risk
            </CardTitle>
            <Switch 
              checked={enabled} 
              onCheckedChange={setEnabled}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Climate Risk Assessment */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Climate Risk Assessment
              </label>
              <Select value={climateRisk} onValueChange={setClimateRisk}>
                <SelectTrigger className="bg-background/80 border-primary/20 hover:border-primary/40 transition-colors">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="moderate">Moderate Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="extreme">Extreme Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Flood Risk Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Flood Risk Rating
              </label>
              <Select value={floodRisk} onValueChange={setFloodRisk}>
                <SelectTrigger className="bg-background/80 border-primary/20 hover:border-primary/40 transition-colors">
                  <SelectValue placeholder="Select flood risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="very-high">Very High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bushfire Risk */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Bushfire Risk
              </label>
              <Select value={bushfireRisk} onValueChange={setBushfireRisk}>
                <SelectTrigger className="bg-background/80 border-primary/20 hover:border-primary/40 transition-colors">
                  <SelectValue placeholder="Select bushfire risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="extreme">Extreme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Risk Assessment Summary */}
          {(climateRisk || floodRisk || bushfireRisk) && (
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-medium mb-3 text-foreground">Risk Assessment Summary</h4>
              <div className="flex flex-wrap gap-2">
                {climateRisk && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Climate: {climateRisk}
                  </Badge>
                )}
                {floodRisk && (
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                    Flood: {floodRisk}
                  </Badge>
                )}
                {bushfireRisk && (
                  <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                    Bushfire: {bushfireRisk}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="text-sm text-muted-foreground bg-background/60 p-3 rounded border border-primary/10">
            <p className="mb-2"><strong>Climate Risk Assessment:</strong> Evaluates long-term climate impacts including temperature changes, sea level rise, and extreme weather events.</p>
            <p className="mb-2"><strong>Flood Risk Rating:</strong> Assesses property's exposure to flood events based on historical data and topographical analysis.</p>
            <p><strong>Bushfire Risk:</strong> Determines bushfire risk level based on vegetation, terrain, weather patterns, and proximity to fire-prone areas.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClimateRiskAssessment;