import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Settings, Clock, CheckCircle, ArrowRight } from "lucide-react";

interface SetupFlowSelectorProps {
  onQuickSetup: () => void;
  onAdvancedSetup: () => void;
}

export default function SetupFlowSelector({ onQuickSetup, onAdvancedSetup }: SetupFlowSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose Your Setup Method</h1>
        <p className="text-muted-foreground">Select the setup approach that works best for you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Setup */}
        <Card className="relative border-2 border-primary/20 bg-primary/5 hover:border-primary/40 transition-all">
          <div className="absolute -top-3 left-4">
            <Badge className="bg-primary text-primary-foreground">
              <Zap className="h-3 w-3 mr-1" />
              Recommended
            </Badge>
          </div>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <Zap className="h-6 w-6 mr-2 text-primary" />
              Quick Setup
            </CardTitle>
            <p className="text-muted-foreground">
              Get started in 2 minutes with smart presets
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">2-3 minutes</span>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Perfect for:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                  Standard residential sales
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                  Commercial investments
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                  Mortgage security assessments
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                  ESG property valuations
                </li>
              </ul>
            </div>

            <div className="bg-primary/10 rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-1">What you get:</h4>
              <ul className="text-xs space-y-1">
                <li>• Pre-configured report templates</li>
                <li>• Auto-populated settings</li>
                <li>• Smart property analysis</li>
                <li>• Same quality review process</li>
              </ul>
            </div>

            <Button 
              onClick={onQuickSetup}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Start Quick Setup
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Advanced Setup */}
        <Card className="border-2 border-muted hover:border-muted-foreground/40 transition-all">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <Settings className="h-6 w-6 mr-2" />
              Advanced Setup
            </CardTitle>
            <p className="text-muted-foreground">
              Full control over every configuration option
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2" />
              <span className="font-medium">10-15 minutes</span>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Perfect for:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-blue-600" />
                  Complex specialized properties
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-blue-600" />
                  Custom valuation approaches
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-blue-600" />
                  Detailed configuration needs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-blue-600" />
                  Multiple document uploads
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-1">What you get:</h4>
              <ul className="text-xs space-y-1">
                <li>• Full property analysis workflow</li>
                <li>• Detailed planning integration</li>
                <li>• Custom report configuration</li>
                <li>• Comprehensive document management</li>
              </ul>
            </div>

            <Button 
              onClick={onAdvancedSetup}
              variant="outline"
              className="w-full"
            >
              Use Advanced Setup
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Comparison */}
      <div className="mt-8 text-center text-sm text-muted-foreground bg-muted/20 rounded-lg p-4">
        <p className="font-medium mb-2">Both methods produce identical professional reports</p>
        <p>The only difference is setup time and configuration complexity</p>
      </div>
    </div>
  );
}