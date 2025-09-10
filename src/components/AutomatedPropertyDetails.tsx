import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MapPin, Search, Calendar, FileText, Zap } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AutomatedPropertyDetailsProps {
  propertyType: string;
  onNext: () => void;
  onBack: () => void;
}

export default function AutomatedPropertyDetails({ propertyType, onNext, onBack }: AutomatedPropertyDetailsProps) {
  const [address, setAddress] = useState("");
  const [valuationDate, setValuationDate] = useState<Date>();
  const [inspectionDate, setInspectionDate] = useState<Date>();
  const [isRetrospective, setIsRetrospective] = useState(false);
  const [valuationPurpose, setValuationPurpose] = useState("");
  const [clientDetails, setClientDetails] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAddressAnalysis = async () => {
    if (!address) return;
    
    setIsAnalyzing(true);
    // Simulate API call for property data analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const getPropertyTypeConfig = () => {
    switch (propertyType) {
      case "commercial":
        return {
          title: "Commercial Property Valuation",
          subtitle: "Automated analysis for commercial real estate",
          purposeOptions: [
            "Mortgage Security",
            "Purchase/Sale Decision",
            "Financial Reporting",
            "Taxation Assessment",
            "Insurance Purposes",
            "Investment Analysis",
            "Leasing Decision",
            "Development Feasibility"
          ]
        };
      case "residential":
        return {
          title: "Residential Property Valuation", 
          subtitle: "Automated analysis for residential real estate",
          purposeOptions: [
            "Mortgage Security",
            "Purchase/Sale Decision", 
            "Family Law Settlement",
            "Insurance Purposes",
            "Investment Analysis",
            "Taxation Assessment",
            "Estate Planning",
            "Refinancing"
          ]
        };
      case "agricultural":
        return {
          title: "Agricultural Property Valuation",
          subtitle: "Automated analysis for rural and agricultural land",
          purposeOptions: [
            "Mortgage Security",
            "Purchase/Sale Decision",
            "Taxation Assessment", 
            "Insurance Purposes",
            "Investment Analysis",
            "Estate Planning",
            "Carbon Credit Assessment",
            "Development Potential"
          ]
        };
      case "specialised":
        return {
          title: "Specialised Property Valuation",
          subtitle: "Automated analysis for purpose-built assets",
          purposeOptions: [
            "Mortgage Security",
            "Financial Reporting",
            "Insurance Purposes", 
            "Purchase/Sale Decision",
            "Investment Analysis",
            "Operational Assessment",
            "Regulatory Compliance",
            "Asset Optimization"
          ]
        };
      default:
        return {
          title: "Property Valuation",
          subtitle: "Automated property analysis",
          purposeOptions: []
        };
    }
  };

  const config = getPropertyTypeConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
          <p className="text-muted-foreground">{config.subtitle}</p>
          <Badge variant="secondary" className="mt-2">
            Step 1: Property Information
          </Badge>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Property Address & Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Address Input with Auto-Analysis */}
            <div className="space-y-2">
              <Label htmlFor="address">Property Address</Label>
              <div className="flex space-x-2">
                <Input
                  id="address"
                  placeholder="Enter full property address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddressAnalysis}
                  disabled={!address || isAnalyzing}
                  className="px-6"
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                AI will automatically gather property data, zoning information, market comparables, and local demographics
              </p>
            </div>

            {/* Auto-populated data display (would be populated after analysis) */}
            {isAnalyzing && (
              <div className="bg-secondary/50 rounded-lg p-4 animate-pulse">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 mr-2 animate-spin" />
                  Gathering property data, market comparables, zoning details, and demographics...
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Valuation Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Valuation Details
              </CardTitle>
              <Badge variant="secondary">Pre-populated from STEP FIVE</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Retrospective Valuation Toggle */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <Label htmlFor="retrospective-valuation" className="font-medium">Retrospective Valuation</Label>
                  <p className="text-xs text-muted-foreground">
                    If enabled, inspection and valuation dates can be different
                  </p>
                </div>
                <Switch 
                  id="retrospective-valuation" 
                  checked={isRetrospective}
                  onCheckedChange={setIsRetrospective}
                />
              </div>

              <div className="space-y-2">
                <Label>Valuation Date</Label>
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
                      onSelect={(date) => {
                        setValuationDate(date);
                        // Auto-populate inspection date unless retrospective
                        if (!isRetrospective && date) {
                          setInspectionDate(date);
                        }
                      }}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-blue-600 dark:text-blue-400">Auto-populated from STEP FIVE</p>
              </div>

              {isRetrospective && (
                <div className="space-y-2">
                  <Label>Inspection Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !inspectionDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {inspectionDate ? format(inspectionDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={inspectionDate}
                        onSelect={setInspectionDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-muted-foreground">Different date for retrospective valuation</p>
                </div>
              )}

              {!isRetrospective && (
                <div className="space-y-2">
                  <Label>Inspection Date</Label>
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">
                      {valuationDate ? format(valuationDate, "PPP") : "Same as valuation date"}
                    </span>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400">Automatically matches valuation date</p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Purpose of Valuation</Label>
                <Select onValueChange={setValuationPurpose}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {config.purposeOptions.map((purpose) => (
                      <SelectItem key={purpose} value={purpose.toLowerCase().replace(/\s+/g, '_')}>
                        {purpose}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client Details</Label>
                <Textarea
                  id="client"
                  placeholder="Client name, company, contact details..."
                  value={clientDetails}
                  onChange={(e) => setClientDetails(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back to Property Types
          </Button>
          <Button 
            onClick={onNext}
            disabled={!address || !valuationDate || !valuationPurpose}
          >
            Continue to Automated Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}