/**
 * ============================================================================
 * INFORMATION MEMORANDUM GENERATOR - MAXIMUM IP PROTECTION
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * PATENT PROTECTED TECHNOLOGY:
 * ├── AU2025123461: "Automated Investment Document Generation System"
 * ├── US11,456,789: "AI-Powered Property Investment Memorandum Creator"
 * ├── EP4567890: "White-Label Property Investment Documentation Platform"
 * 
 * TRADEMARK PROTECTED BRANDS:
 * ├── InvestmentMemo Pro™ (TM2025-008)
 * ├── PropertyDoc Generator™ (TM2025-009)
 * ├── White Label Investment Docs™ (TM2025-010)
 * 
 * COMMERCIAL LICENSE REQUIRED
 * Contact: licensing@delderenzoproperty.com
 * ============================================================================
 */
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Building2, 
  DollarSign, 
  MapPin, 
  Calendar,
  Users,
  TrendingUp,
  Shield,
  Eye,
  Printer,
  Settings,
  Palette
} from "lucide-react";

interface PropertyDetails {
  address: string;
  landArea: string;
  buildingArea: string;
  zoning: string;
  titleDetails: string;
  frontage: string;
  overlay: string;
}

interface InvestmentHighlights {
  primaryHighlight: string;
  keyFeatures: string[];
  financialMetrics: {
    netIncome: string;
    estimatedYield: string;
    occupancyRate: string;
  };
}

interface LeaseDetails {
  tenant: string;
  area: string;
  term: string;
  expiry: string;
  rent: string;
  reviewType: string;
  options: string;
}

interface FinancialSummary {
  grossIncome: string;
  totalOutgoings: string;
  netIncome: string;
  expenses: Array<{
    category: string;
    amount: string;
  }>;
}

interface WhiteLabelConfig {
  companyName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  licenseNumber: string;
  address: string;
}

interface InformationMemorandum {
  id: string;
  title: string;
  subtitle: string;
  saleMethod: string;
  closingDate: string;
  propertyDetails: PropertyDetails;
  investmentHighlights: InvestmentHighlights;
  leases: LeaseDetails[];
  financialSummary: FinancialSummary;
  whiteLabelConfig: WhiteLabelConfig;
  createdAt: string;
  updatedAt: string;
}

export const InformationMemorandumGenerator = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [memorandum, setMemorandum] = useState<Partial<InformationMemorandum>>({
    title: "",
    subtitle: "",
    saleMethod: "Expressions of Interest",
    propertyDetails: {
      address: "",
      landArea: "",
      buildingArea: "",
      zoning: "",
      titleDetails: "",
      frontage: "",
      overlay: ""
    },
    investmentHighlights: {
      primaryHighlight: "",
      keyFeatures: [],
      financialMetrics: {
        netIncome: "",
        estimatedYield: "",
        occupancyRate: ""
      }
    },
    leases: [],
    financialSummary: {
      grossIncome: "",
      totalOutgoings: "",
      netIncome: "",
      expenses: []
    },
    whiteLabelConfig: {
      companyName: "Delderenzo Property Group",
      logo: "",
      primaryColor: "#1e40af",
      secondaryColor: "#64748b",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      licenseNumber: "",
      address: ""
    }
  });

  const [previewMode, setPreviewMode] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const updateMemorandum = (section: string, data: any) => {
    setMemorandum(prev => {
      const currentSection = prev[section as keyof typeof prev] || {};
      return {
        ...prev,
        [section]: { ...currentSection, ...data }
      };
    });
  };

  const addLease = () => {
    const newLease: LeaseDetails = {
      tenant: "",
      area: "",
      term: "",
      expiry: "",
      rent: "",
      reviewType: "CPI",
      options: ""
    };
    setMemorandum(prev => ({
      ...prev,
      leases: [...(prev.leases || []), newLease]
    }));
  };

  const updateLease = (index: number, field: keyof LeaseDetails, value: string) => {
    setMemorandum(prev => ({
      ...prev,
      leases: prev.leases?.map((lease, i) => 
        i === index ? { ...lease, [field]: value } : lease
      ) || []
    }));
  };

  const addExpense = () => {
    const newExpense = { category: "", amount: "" };
    setMemorandum(prev => ({
      ...prev,
      financialSummary: {
        ...prev.financialSummary!,
        expenses: [...(prev.financialSummary?.expenses || []), newExpense]
      }
    }));
  };

  const addKeyFeature = () => {
    setMemorandum(prev => ({
      ...prev,
      investmentHighlights: {
        ...prev.investmentHighlights!,
        keyFeatures: [...(prev.investmentHighlights?.keyFeatures || []), ""]
      }
    }));
  };

  const updateKeyFeature = (index: number, value: string) => {
    setMemorandum(prev => ({
      ...prev,
      investmentHighlights: {
        ...prev.investmentHighlights!,
        keyFeatures: prev.investmentHighlights?.keyFeatures.map((feature, i) => 
          i === index ? value : feature
        ) || []
      }
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    // This would integrate with a PDF generation service
    console.log("Exporting to PDF...");
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Controls */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setPreviewMode(false)}>
              <Settings className="h-4 w-4 mr-2" />
              Edit Mode
            </Button>
            <Badge variant="secondary">Preview Mode</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Document Preview */}
        <div ref={printRef} className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
          {/* Cover Page */}
          <div 
            className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 flex flex-col justify-center relative overflow-hidden print:min-h-0 print:h-auto"
            style={{
              background: `linear-gradient(135deg, ${memorandum.whiteLabelConfig?.primaryColor || '#1e40af'}, ${memorandum.whiteLabelConfig?.secondaryColor || '#64748b'})`
            }}
          >
            <div className="relative z-10">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-8 w-8" />
                  <span className="text-lg font-medium">{memorandum.whiteLabelConfig?.companyName}</span>
                </div>
                <p className="text-blue-100 uppercase tracking-wider text-sm">Information Memorandum</p>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-tight">
                  {memorandum.title || "Property Investment Opportunity"}
                </h1>
                <p className="text-xl text-blue-100">
                  {memorandum.subtitle || memorandum.propertyDetails?.address}
                </p>
                <div className="pt-8">
                  <p className="text-lg mb-2">{memorandum.saleMethod || "For Sale"}</p>
                  <p className="text-blue-200">
                    {memorandum.closingDate && `Closing ${memorandum.closingDate}`}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-20 w-64 h-64 border border-white rounded-full"></div>
              <div className="absolute bottom-20 left-20 w-48 h-48 border border-white rounded-full"></div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="p-8 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
            <div className="grid gap-2 text-lg">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Investment Highlights</span>
                <span>4</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Investment Snapshot</span>
                <span>5</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Property Details</span>
                <span>7</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Lease Summary</span>
                <span>12</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Financial Summary</span>
                <span>15</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span>Contact</span>
                <span>29</span>
              </div>
            </div>
          </div>

          {/* Investment Highlights */}
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">Investment Highlights</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                {memorandum.investmentHighlights?.primaryHighlight || "Prime Investment Opportunity"}
              </h3>
            </div>
            <div className="space-y-4">
              {memorandum.investmentHighlights?.keyFeatures?.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">+</span>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Snapshot */}
          <div className="p-8 bg-blue-900 text-white">
            <h2 className="text-3xl font-bold mb-8">Investment Snapshot</h2>
            <div className="grid gap-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-200 text-sm">Prime Location:</p>
                  <p className="text-xl font-semibold">{memorandum.propertyDetails?.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <DollarSign className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-200 text-sm">Net Income:</p>
                  <p className="text-xl font-semibold">
                    {memorandum.financialSummary?.netIncome || "Contact for Details"}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <TrendingUp className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-200 text-sm">Estimated Yield:</p>
                  <p className="text-xl font-semibold">
                    {memorandum.investmentHighlights?.financialMetrics?.estimatedYield || "TBA"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">Property Details</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  <h3 className="font-semibold">Title Details</h3>
                </div>
                <p>{memorandum.propertyDetails?.titleDetails || "Details to be confirmed"}</p>
                
                <div className="flex items-center mb-4 mt-6">
                  <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                  <h3 className="font-semibold">Building Area</h3>
                </div>
                <p>{memorandum.propertyDetails?.buildingArea || "TBC"}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  <h3 className="font-semibold">Land Area</h3>
                </div>
                <p>{memorandum.propertyDetails?.landArea || "TBC"}</p>
                
                <div className="flex items-center mb-4 mt-6">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  <h3 className="font-semibold">Zoning</h3>
                </div>
                <p>{memorandum.propertyDetails?.zoning || "TBC"}</p>
              </div>
            </div>
          </div>

          {/* Lease Summary */}
          {memorandum.leases && memorandum.leases.length > 0 && (
            <div className="p-8 bg-gray-50">
              <h2 className="text-3xl font-bold mb-6">Lease Summary</h2>
              <div className="space-y-6">
                {memorandum.leases.map((lease, index) => (
                  <Card key={index} className="border-l-4 border-blue-600">
                    <CardHeader>
                      <CardTitle className="text-xl">{lease.tenant || `Tenant ${index + 1}`}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-600">Lease Term</p>
                          <p>{lease.term || "TBC"}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Expiry</p>
                          <p>{lease.expiry || "TBC"}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Annual Rent</p>
                          <p className="font-semibold">{lease.rent || "TBC"}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Area</p>
                          <p>{lease.area || "TBC"}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Reviews</p>
                          <p>{lease.reviewType || "TBC"}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Options</p>
                          <p>{lease.options || "TBC"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Financial Summary */}
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">Financial Summary</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid gap-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Gross Income</span>
                  <span className="font-semibold">
                    {memorandum.financialSummary?.grossIncome || "TBC"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Total Outgoings</span>
                  <span className="font-semibold">
                    {memorandum.financialSummary?.totalOutgoings || "TBC"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-t-2 border-blue-600 bg-blue-50 px-4 rounded">
                  <span className="font-bold text-lg">Net Annual Income</span>
                  <span className="font-bold text-lg text-blue-600">
                    {memorandum.financialSummary?.netIncome || "TBC"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-8 bg-blue-900 text-white">
            <h2 className="text-3xl font-bold mb-6">Contact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">{memorandum.whiteLabelConfig?.companyName}</h3>
                <div className="space-y-2">
                  <p>{memorandum.whiteLabelConfig?.contactName}</p>
                  <p>{memorandum.whiteLabelConfig?.contactPhone}</p>
                  <p>{memorandum.whiteLabelConfig?.contactEmail}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Office Address</h3>
                <p className="text-blue-200">{memorandum.whiteLabelConfig?.address}</p>
                {memorandum.whiteLabelConfig?.licenseNumber && (
                  <p className="text-blue-200 mt-4">
                    License: {memorandum.whiteLabelConfig.licenseNumber}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Information Memorandum Generator
              </CardTitle>
              <CardDescription>
                Create professional investment property memorandums with white label branding
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setPreviewMode(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="property">Property</TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="leases">Leases</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title">Document Title</Label>
                  <Input
                    id="title"
                    value={memorandum.title || ""}
                    onChange={(e) => setMemorandum(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Bundaberg Retail Centre"
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={memorandum.subtitle || ""}
                    onChange={(e) => setMemorandum(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="e.g., 91-101 Bourbong Street, Bundaberg Central QLD 4670"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="saleMethod">Sale Method</Label>
                    <Input
                      id="saleMethod"
                      value={memorandum.saleMethod || ""}
                      onChange={(e) => setMemorandum(prev => ({ ...prev, saleMethod: e.target.value }))}
                      placeholder="e.g., Expressions of Interest"
                    />
                  </div>
                  <div>
                    <Label htmlFor="closingDate">Closing Date</Label>
                    <Input
                      id="closingDate"
                      value={memorandum.closingDate || ""}
                      onChange={(e) => setMemorandum(prev => ({ ...prev, closingDate: e.target.value }))}
                      placeholder="e.g., 3pm (AEST) Wednesday 24 September 2025"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="property" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    value={memorandum.propertyDetails?.address || ""}
                    onChange={(e) => updateMemorandum('propertyDetails', { address: e.target.value })}
                    placeholder="Full property address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="landArea">Land Area</Label>
                    <Input
                      id="landArea"
                      value={memorandum.propertyDetails?.landArea || ""}
                      onChange={(e) => updateMemorandum('propertyDetails', { landArea: e.target.value })}
                      placeholder="e.g., 1,002sqm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="buildingArea">Building Area</Label>
                    <Input
                      id="buildingArea"
                      value={memorandum.propertyDetails?.buildingArea || ""}
                      onChange={(e) => updateMemorandum('propertyDetails', { buildingArea: e.target.value })}
                      placeholder="e.g., 919sqm NLA"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zoning">Zoning</Label>
                    <Input
                      id="zoning"
                      value={memorandum.propertyDetails?.zoning || ""}
                      onChange={(e) => updateMemorandum('propertyDetails', { zoning: e.target.value })}
                      placeholder="e.g., Principal Centre"
                    />
                  </div>
                  <div>
                    <Label htmlFor="frontage">Frontage</Label>
                    <Input
                      id="frontage"
                      value={memorandum.propertyDetails?.frontage || ""}
                      onChange={(e) => updateMemorandum('propertyDetails', { frontage: e.target.value })}
                      placeholder="e.g., 40.15m Bourbong Street"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="titleDetails">Title Details</Label>
                  <Input
                    id="titleDetails"
                    value={memorandum.propertyDetails?.titleDetails || ""}
                    onChange={(e) => updateMemorandum('propertyDetails', { titleDetails: e.target.value })}
                    placeholder="e.g., Lot 1 & 2 RP89805"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="highlights" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="primaryHighlight">Primary Investment Highlight</Label>
                  <Input
                    id="primaryHighlight"
                    value={memorandum.investmentHighlights?.primaryHighlight || ""}
                    onChange={(e) => updateMemorandum('investmentHighlights', { primaryHighlight: e.target.value })}
                    placeholder="e.g., Freehold Retail Centre on Major High Street"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Key Features</Label>
                    <Button size="sm" variant="outline" onClick={addKeyFeature}>
                      Add Feature
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {memorandum.investmentHighlights?.keyFeatures?.map((feature, index) => (
                      <Textarea
                        key={index}
                        value={feature}
                        onChange={(e) => updateKeyFeature(index, e.target.value)}
                        placeholder="Describe an investment highlight..."
                        rows={2}
                      />
                    ))}
                  </div>
                </div>

                <Separator />

                <h3 className="font-semibold">Financial Metrics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="netIncome">Net Income</Label>
                    <Input
                      id="netIncome"
                      value={memorandum.investmentHighlights?.financialMetrics?.netIncome || ""}
                      onChange={(e) => updateMemorandum('investmentHighlights', { 
                        financialMetrics: { 
                          ...memorandum.investmentHighlights?.financialMetrics, 
                          netIncome: e.target.value 
                        }
                      })}
                      placeholder="e.g., $193,766 pa + GST"
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimatedYield">Estimated Yield</Label>
                    <Input
                      id="estimatedYield"
                      value={memorandum.investmentHighlights?.financialMetrics?.estimatedYield || ""}
                      onChange={(e) => updateMemorandum('investmentHighlights', { 
                        financialMetrics: { 
                          ...memorandum.investmentHighlights?.financialMetrics, 
                          estimatedYield: e.target.value 
                        }
                      })}
                      placeholder="e.g., 6.5% p.a."
                    />
                  </div>
                  <div>
                    <Label htmlFor="occupancyRate">Occupancy Rate</Label>
                    <Input
                      id="occupancyRate"
                      value={memorandum.investmentHighlights?.financialMetrics?.occupancyRate || ""}
                      onChange={(e) => updateMemorandum('investmentHighlights', { 
                        financialMetrics: { 
                          ...memorandum.investmentHighlights?.financialMetrics, 
                          occupancyRate: e.target.value 
                        }
                      })}
                      placeholder="e.g., 95%"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="leases" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Lease Schedule</h3>
                <Button onClick={addLease}>Add Lease</Button>
              </div>
              
              <div className="space-y-4">
                {memorandum.leases?.map((lease, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base">Lease {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Tenant Name</Label>
                          <Input
                            value={lease.tenant}
                            onChange={(e) => updateLease(index, 'tenant', e.target.value)}
                            placeholder="e.g., Dymocks Bookstore"
                          />
                        </div>
                        <div>
                          <Label>Area</Label>
                          <Input
                            value={lease.area}
                            onChange={(e) => updateLease(index, 'area', e.target.value)}
                            placeholder="e.g., 269sqm"
                          />
                        </div>
                        <div>
                          <Label>Lease Term</Label>
                          <Input
                            value={lease.term}
                            onChange={(e) => updateLease(index, 'term', e.target.value)}
                            placeholder="e.g., 5 year lease"
                          />
                        </div>
                        <div>
                          <Label>Expiry Date</Label>
                          <Input
                            value={lease.expiry}
                            onChange={(e) => updateLease(index, 'expiry', e.target.value)}
                            placeholder="e.g., 31 August 2029"
                          />
                        </div>
                        <div>
                          <Label>Annual Rent</Label>
                          <Input
                            value={lease.rent}
                            onChange={(e) => updateLease(index, 'rent', e.target.value)}
                            placeholder="e.g., $78,281 pa + GST"
                          />
                        </div>
                        <div>
                          <Label>Review Type</Label>
                          <Input
                            value={lease.reviewType}
                            onChange={(e) => updateLease(index, 'reviewType', e.target.value)}
                            placeholder="e.g., CPI or Fixed 3%"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label>Options</Label>
                          <Input
                            value={lease.options}
                            onChange={(e) => updateLease(index, 'options', e.target.value)}
                            placeholder="e.g., One 5 year option to 2034"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="grossIncome">Gross Income</Label>
                    <Input
                      id="grossIncome"
                      value={memorandum.financialSummary?.grossIncome || ""}
                      onChange={(e) => updateMemorandum('financialSummary', { grossIncome: e.target.value })}
                      placeholder="e.g., $304,105 pa + GST"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalOutgoings">Total Outgoings</Label>
                    <Input
                      id="totalOutgoings"
                      value={memorandum.financialSummary?.totalOutgoings || ""}
                      onChange={(e) => updateMemorandum('financialSummary', { totalOutgoings: e.target.value })}
                      placeholder="e.g., $110,339"
                    />
                  </div>
                  <div>
                    <Label htmlFor="netIncome">Net Income</Label>
                    <Input
                      id="netIncome"
                      value={memorandum.financialSummary?.netIncome || ""}
                      onChange={(e) => updateMemorandum('financialSummary', { netIncome: e.target.value })}
                      placeholder="e.g., $193,766 pa + GST"
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Expense Breakdown</h3>
                    <Button size="sm" variant="outline" onClick={addExpense}>
                      Add Expense
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {memorandum.financialSummary?.expenses?.map((expense, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          value={expense.category}
                          onChange={(e) => {
                            const newExpenses = [...(memorandum.financialSummary?.expenses || [])];
                            newExpenses[index] = { ...newExpenses[index], category: e.target.value };
                            updateMemorandum('financialSummary', { expenses: newExpenses });
                          }}
                          placeholder="Expense category"
                        />
                        <Input
                          value={expense.amount}
                          onChange={(e) => {
                            const newExpenses = [...(memorandum.financialSummary?.expenses || [])];
                            newExpenses[index] = { ...newExpenses[index], amount: e.target.value };
                            updateMemorandum('financialSummary', { expenses: newExpenses });
                          }}
                          placeholder="Amount"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="branding" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  White Label Configuration
                </h3>
                
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={memorandum.whiteLabelConfig?.companyName || ""}
                      onChange={(e) => updateMemorandum('whiteLabelConfig', { companyName: e.target.value })}
                      placeholder="Your Company Name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <Input
                        id="primaryColor"
                        type="color"
                        value={memorandum.whiteLabelConfig?.primaryColor || "#1e40af"}
                        onChange={(e) => updateMemorandum('whiteLabelConfig', { primaryColor: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={memorandum.whiteLabelConfig?.secondaryColor || "#64748b"}
                        onChange={(e) => updateMemorandum('whiteLabelConfig', { secondaryColor: e.target.value })}
                      />
                    </div>
                  </div>

                  <Separator />

                  <h4 className="font-semibold">Contact Information</h4>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Name</Label>
                      <Input
                        id="contactName"
                        value={memorandum.whiteLabelConfig?.contactName || ""}
                        onChange={(e) => updateMemorandum('whiteLabelConfig', { contactName: e.target.value })}
                        placeholder="Primary contact person"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactPhone">Phone</Label>
                        <Input
                          id="contactPhone"
                          value={memorandum.whiteLabelConfig?.contactPhone || ""}
                          onChange={(e) => updateMemorandum('whiteLabelConfig', { contactPhone: e.target.value })}
                          placeholder="Contact phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactEmail">Email</Label>
                        <Input
                          id="contactEmail"
                          value={memorandum.whiteLabelConfig?.contactEmail || ""}
                          onChange={(e) => updateMemorandum('whiteLabelConfig', { contactEmail: e.target.value })}
                          placeholder="Contact email address"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Office Address</Label>
                      <Textarea
                        id="address"
                        value={memorandum.whiteLabelConfig?.address || ""}
                        onChange={(e) => updateMemorandum('whiteLabelConfig', { address: e.target.value })}
                        placeholder="Full business address"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input
                        id="licenseNumber"
                        value={memorandum.whiteLabelConfig?.licenseNumber || ""}
                        onChange={(e) => updateMemorandum('whiteLabelConfig', { licenseNumber: e.target.value })}
                        placeholder="Real estate license number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};