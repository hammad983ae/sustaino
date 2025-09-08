import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SustainoProAnalysis() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            Sustaino Pro Additional Analysis and Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-3">
              <h3 className="text-md font-medium">Advanced Environmental Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Climate Risk Assessment</p>
                  <Badge variant="secondary">AI-Powered</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Carbon Footprint Analysis</p>
                  <Badge variant="secondary">Real-time Data</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-md font-medium">Smart Property Intelligence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Predictive Market Analytics</p>
                  <Badge variant="secondary">Machine Learning</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Automated Valuation Models</p>
                  <Badge variant="secondary">AI-Enhanced</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-md font-medium">Enhanced Due Diligence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Automated Document Review</p>
                  <Badge variant="secondary">OCR Technology</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Risk Pattern Recognition</p>
                  <Badge variant="secondary">Pattern Analysis</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-md font-medium">Professional Analytics Suite</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Advanced Reporting Dashboard</p>
                  <Badge variant="secondary">Interactive</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Custom Analysis Modules</p>
                  <Badge variant="secondary">Configurable</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}