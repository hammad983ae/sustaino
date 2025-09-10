import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, AlertTriangle, Thermometer, Droplets, TrendingDown } from "lucide-react";

export default function ClimateRiskAssessmentMildura() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Climate Change Risk Assessment - 320 Deakin Avenue, Mildura
              <Lock className="h-4 w-4 text-primary" />
            </CardTitle>
            <Badge variant="secondary">Data Locked</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Regional Climate Vulnerability */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Regional Climate Vulnerability
            </h3>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  62%
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200">Climate Risk Score</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">Moderate-to-high vulnerability</p>
                </div>
              </div>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Mildura has a climate risk score of approximately 62%, indicating a moderate-to-high vulnerability in relation to water scarcity, temperature extremes, and weather-related events.
              </p>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <h4 className="font-semibold">Water Scarcity</h4>
              </div>
              <p className="text-sm text-muted-foreground">Primary risk factor affecting regional sustainability</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-5 w-5 text-red-500" />
                <h4 className="font-semibold">Temperature Extremes</h4>
              </div>
              <p className="text-sm text-muted-foreground">Increasing frequency of extreme heat events</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h4 className="font-semibold">Weather Events</h4>
              </div>
              <p className="text-sm text-muted-foreground">More frequent severe weather patterns</p>
            </div>
          </div>

          {/* Impacts on Property and Investment */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              Impacts on Property and Investment
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Property Value Adjustments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl font-bold text-red-600">3% - 7%</div>
                    <div className="text-sm text-muted-foreground">Potential reduction</div>
                  </div>
                  <p className="text-sm">
                    A conservative estimate suggests a 3% to 7% potential reduction due to climate risks, emphasizing the importance of adaptive infrastructure and mitigation strategies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Interest Rate Premiums</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl font-bold text-amber-600">0.1% - 0.3%</div>
                    <div className="text-sm text-muted-foreground">Risk premium</div>
                  </div>
                  <p className="text-sm">
                    Borrowers can expect lender risk premiums of approximately 0.1% to 0.3%, reflecting perceived environmental vulnerabilities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Implications and Recommendations */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Implications:</strong> Proactive resilience measures—such as water-efficient systems, climate-resilient building materials, and sustainable landscaping—are recommended to mitigate long-term impacts on asset value and operational costs.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}