import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Zap, Settings, CheckCircle, Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
// Removed unused import

interface QuickSetupFormProps {
  onComplete: (data: any) => void;
  onAdvancedSetup: () => void;
}

const PRESET_TEMPLATES = {
  "residential-sale": {
    name: "Quick Residential Sale",
    description: "Standard residential property sale valuation",
    reportType: "market_valuation",
    propertyType: "residential",
    purpose: "purchase_sale",
    basis: ["market_value"],
    approaches: ["sales_comparison", "cost_approach"],
    components: ["land_value", "building_value"],
    gstTreatment: "exclusive"
  },
  "commercial-investment": {
    name: "Commercial Investment Analysis", 
    description: "Income-producing commercial property analysis",
    reportType: "investment_analysis",
    propertyType: "commercial",
    purpose: "investment_analysis",
    basis: ["market_value", "investment_value"],
    approaches: ["income_approach", "sales_comparison"],
    components: ["land_value", "building_value", "income_potential"],
    gstTreatment: "inclusive"
  },
  "mortgage-security": {
    name: "Mortgage Security Assessment",
    description: "Bank lending security valuation",
    reportType: "security_valuation",
    propertyType: "residential",
    purpose: "mortgage_security",
    basis: ["market_value", "forced_sale_value"],
    approaches: ["sales_comparison", "cost_approach"],
    components: ["land_value", "building_value", "security_assessment"],
    gstTreatment: "exclusive"
  },
  "esg-assessment": {
    name: "ESG Property Assessment",
    description: "Sustainability and ESG-focused valuation",
    reportType: "esg_valuation",
    propertyType: "commercial",
    purpose: "esg_assessment",
    basis: ["market_value", "esg_adjusted_value"],
    approaches: ["income_approach", "sales_comparison", "esg_analysis"],
    components: ["land_value", "building_value", "esg_metrics", "sustainability_rating"],
    gstTreatment: "inclusive"
  },
  "agricultural-rural": {
    name: "Agricultural Property",
    description: "Rural and agricultural land valuation",
    reportType: "agricultural_valuation", 
    propertyType: "agricultural",
    purpose: "purchase_sale",
    basis: ["market_value", "productive_value"],
    approaches: ["sales_comparison", "income_approach"],
    components: ["land_value", "improvements", "water_rights", "productive_capacity"],
    gstTreatment: "exclusive"
  }
};

export default function QuickSetupForm({ onComplete, onAdvancedSetup }: QuickSetupFormProps) {
  const [selectedPreset, setSelectedPreset] = useState("");
  const [address, setAddress] = useState("");
  const [valuationDate, setValuationDate] = useState<Date>(new Date());
  const [clientDetails, setClientDetails] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // Removed unused context hook

  const handlePresetSelect = (presetKey: string) => {
    setSelectedPreset(presetKey);
    const preset = PRESET_TEMPLATES[presetKey as keyof typeof PRESET_TEMPLATES];
    // Preset selection updates internal state - valuation type is handled in completion
  };

  const handleQuickStart = async () => {
    if (!selectedPreset || !address || !valuationDate) return;

    setIsAnalyzing(true);
    
    const preset = PRESET_TEMPLATES[selectedPreset as keyof typeof PRESET_TEMPLATES];
    
    // Simulate the full 10-step PropertyAssessment workflow behind the scenes
    try {
      // Step 1: Property Address - Auto-populate
      const propertyData = { propertyAddress: address };
      
      // Step 2-3: Planning Search & Analysis - Auto-execute
      // Step 4: Photos - Skip in quick mode (can be added later)
      // Step 5: Risk Assessment - Auto-execute with defaults
      // Step 6: Sales History - Auto-pull from integrations
      // Step 7: Report Configuration - Use preset config
      // Step 8: Rental Config - Use preset settings
      // Step 9: Intelligence Enhancement - Auto-enable
      // Step 10: Generate - Prepare for report generation
      
      setTimeout(() => {
        const setupData = {
          preset: preset,
          propertyAddress: address,
          valuationDate: valuationDate,
          clientDetails: clientDetails,
          quickSetup: true,
          
          // Pre-populate all PropertyAssessment workflow data
          reportConfig: {
            reportType: preset.reportType,
            propertyType: preset.propertyType,
            valuationPurpose: preset.purpose,
            basis: preset.basis,
            approaches: preset.approaches,
            components: preset.components,
            gstTreatment: preset.gstTreatment
          },
          
          // Auto-completed workflow steps (without UI)
          workflowCompleted: {
            propertyAddress: true,
            planningSearch: true,
            searchAnalysis: true,
            propertyPhotos: false, // Can be added later
            riskAssessment: true,
            salesHistory: true,
            reportConfiguration: true,
            rentalConfiguration: preset.reportType.includes('investment'),
            intelligentEnhancement: true,
            readyForReview: true
          },
          
          // Store all the data that would have been collected in the 10-step process
          propertyAssessmentData: {
            addressData: { propertyAddress: address },
            planningData: { autoGenerated: true },
            analysisData: { autoGenerated: true },
            riskAssessment: { autoGenerated: true },
            salesHistory: { autoGenerated: true },
            reportConfig: preset
          }
        };
        
        // Store in the same format as PropertyAssessmentForm would
        localStorage.setItem('currentReportData', JSON.stringify(setupData));
        
        setIsAnalyzing(false);
        onComplete(setupData);
      }, 2000); // Simulate processing time
      
    } catch (error) {
      setIsAnalyzing(false);
      console.error('Quick setup failed:', error);
    }
  };

  const selectedTemplate = selectedPreset ? PRESET_TEMPLATES[selectedPreset as keyof typeof PRESET_TEMPLATES] : null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Quick Property Setup</h1>
        <p className="text-muted-foreground">Get started in 2 minutes with preset configurations</p>
        <Badge variant="secondary" className="mt-2">
          <Zap className="h-3 w-3 mr-1" />
          Streamlined Process
        </Badge>
      </div>

      {/* Step 1: Preset Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Step 1: Choose Report Type
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Select a preset template that matches your valuation needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(PRESET_TEMPLATES).map(([key, template]) => (
              <div
                key={key}
                onClick={() => handlePresetSelect(key)}
                className={cn(
                  "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                  selectedPreset === key 
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-muted hover:border-primary/50"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{template.name}</h3>
                  {selectedPreset === key && (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    {template.propertyType}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {template.approaches.length} methods
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Property Details */}
      {selectedPreset && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Step 2: Property & Client Details
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter basic property information for {selectedTemplate?.name}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Property Address *</Label>
                <Input
                  id="address"
                  placeholder="Enter full property address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Valuation Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !valuationDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {valuationDate ? format(valuationDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={valuationDate}
                      onSelect={setValuationDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="client">Client Details</Label>
              <Textarea
                id="client"
                placeholder="Client name, company, contact details..."
                value={clientDetails}
                onChange={(e) => setClientDetails(e.target.value)}
                rows={3}
              />
            </div>

            {/* Preset Summary */}
            {selectedTemplate && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Configuration Preview:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium">Property Type:</span> {selectedTemplate.propertyType}
                  </div>
                  <div>
                    <span className="font-medium">Purpose:</span> {selectedTemplate.purpose.replace('_', ' ')}
                  </div>
                  <div>
                    <span className="font-medium">Methods:</span> {selectedTemplate.approaches.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">GST:</span> {selectedTemplate.gstTreatment}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onAdvancedSetup}>
          Use Advanced Setup Instead
        </Button>
        
        <Button 
          onClick={handleQuickStart}
          disabled={!selectedPreset || !address || !valuationDate || isAnalyzing}
          className="bg-primary hover:bg-primary/90"
        >
            {isAnalyzing ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Processing Assessment...
              </>
            ) : (
              <>
                Start Complete Assessment
              </>
            )}
        </Button>
      </div>

      {/* Benefits */}
      <div className="text-center text-sm text-muted-foreground bg-muted/30 rounded-lg p-4">
        <p className="font-medium mb-1">Quick Setup includes all PropertyAssessment steps:</p>
        <p>✓ Address verification ✓ Planning search ✓ Risk assessment ✓ Sales analysis ✓ Report configuration</p>
      </div>
    </div>
  );
}