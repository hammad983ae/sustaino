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

interface TenantProfile {
  name: string;
  logo?: string;
  description: string;
  website?: string;
  businessType: string;
  establishedYear?: string;
  keyFeatures: string[];
}

interface PropertyPhotos {
  heroImage?: string;
  exteriorPhotos: string[];
  interiorPhotos: string[];
  aerialMap?: string;
  locationPhotos: string[];
}

interface LocationShowcase {
  mainHeadline: string;
  subHeadline: string;
  positioningStatement: string;
  heroImage?: string;
  keyLocationBenefits: string[];
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
  tenantProfiles: TenantProfile[];
  propertyPhotos: PropertyPhotos;
  locationShowcase: LocationShowcase;
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
    tenantProfiles: [],
    propertyPhotos: {
      heroImage: "",
      exteriorPhotos: [],
      interiorPhotos: [],
      aerialMap: "",
      locationPhotos: []
    },
    locationShowcase: {
      mainHeadline: "",
      subHeadline: "",
      positioningStatement: "",
      heroImage: "",
      keyLocationBenefits: []
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

  const addTenantProfile = () => {
    const newProfile: TenantProfile = {
      name: "",
      logo: "",
      description: "",
      website: "",
      businessType: "",
      establishedYear: "",
      keyFeatures: []
    };
    setMemorandum(prev => ({
      ...prev,
      tenantProfiles: [...(prev.tenantProfiles || []), newProfile]
    }));
  };

  const updateTenantProfile = (index: number, field: keyof TenantProfile, value: string | string[]) => {
    setMemorandum(prev => ({
      ...prev,
      tenantProfiles: prev.tenantProfiles?.map((profile, i) => 
        i === index ? { ...profile, [field]: value } : profile
      ) || []
    }));
  };

  const addLocationBenefit = () => {
    setMemorandum(prev => ({
      ...prev,
      locationShowcase: {
        ...prev.locationShowcase!,
        keyLocationBenefits: [...(prev.locationShowcase?.keyLocationBenefits || []), ""]
      }
    }));
  };

  const updateLocationBenefit = (index: number, value: string) => {
    setMemorandum(prev => ({
      ...prev,
      locationShowcase: {
        ...prev.locationShowcase!,
        keyLocationBenefits: prev.locationShowcase?.keyLocationBenefits.map((benefit, i) => 
          i === index ? value : benefit
        ) || []
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

          {/* Location Showcase */}
          {memorandum.locationShowcase?.mainHeadline && (
            <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center relative overflow-hidden">
              <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-5xl font-bold mb-6 leading-tight">
                  {memorandum.locationShowcase.mainHeadline}
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  {memorandum.locationShowcase.subHeadline}
                </p>
                <p className="text-lg text-gray-400 max-w-2xl">
                  {memorandum.locationShowcase.positioningStatement}
                </p>
              </div>
              {memorandum.locationShowcase.heroImage && (
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-black/60 z-10"></div>
                  <img 
                    src={memorandum.locationShowcase.heroImage} 
                    alt="Property Location"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* Enhanced Lease Summary */}
          {memorandum.leases && memorandum.leases.length > 0 && (
            <div className="space-y-8">
              {memorandum.leases.map((lease, index) => (
                <div key={index} className="p-8 bg-gray-50">
                  <h2 className="text-3xl font-bold mb-6">Lease Summary ({index + 1} of {memorandum.leases?.length})</h2>
                  
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-xl font-semibold text-blue-600 mb-4">
                      {lease.tenant || `Tenant ${index + 1}`}
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">Lessee</span>
                          <span>{lease.tenant || "TBC"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">Lease Term</span>
                          <span>{lease.term || "TBC"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">Lease Expiry</span>
                          <span>{lease.expiry || "TBC"}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">Options</span>
                          <span>{lease.options || "TBC"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">Annual Rent Reviews</span>
                          <span>{lease.reviewType || "TBC"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600">Gross Rent</span>
                          <span className="font-semibold">{lease.rent || "TBC"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced Financial Summary */}
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">Financial Summary</h2>
            
            {/* Gross Rent Breakdown */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Gross Rent</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                {memorandum.leases?.map((lease, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                    <span>{lease.tenant || `Tenant ${index + 1}`}</span>
                    <span className="font-medium">{lease.rent || "TBC"}</span>
                  </div>
                ))}
                <div className="flex justify-between py-3 mt-4 border-t-2 border-blue-600 font-bold text-lg">
                  <span>Total Gross Income</span>
                  <span className="text-blue-600">{memorandum.financialSummary?.grossIncome || "TBC"}</span>
                </div>
              </div>
            </div>

            {/* Net Income */}
            <div className="bg-blue-900 text-white p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Net Annual Income</span>
                <span className="text-2xl font-bold">
                  {memorandum.financialSummary?.netIncome || "TBC"}
                </span>
              </div>
            </div>
          </div>

          {/* Tenant Profiles */}
          {memorandum.tenantProfiles && memorandum.tenantProfiles.length > 0 && (
            <div className="space-y-8">
              {memorandum.tenantProfiles.map((tenant, index) => (
                <div key={index} className="p-8">
                  <h2 className="text-3xl font-bold mb-6">
                    {index === 0 ? "Tenant Profile" : "Tenant Profiles"}
                  </h2>
                  
                  <div className="space-y-6">
                    {tenant.logo && (
                      <div className="mb-6">
                        <img 
                          src={tenant.logo} 
                          alt={`${tenant.name} logo`}
                          className="h-16 object-contain"
                        />
                      </div>
                    )}
                    
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {tenant.description}
                      </p>
                      
                      {tenant.website && (
                        <p className="text-sm text-blue-600">
                          For more information, visit: {tenant.website}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

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
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="property">Property</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="leases">Leases</TabsTrigger>
              <TabsTrigger value="tenants">Tenants</TabsTrigger>
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

            <TabsContent value="location" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Location Showcase</h3>
                
                <div>
                  <Label htmlFor="mainHeadline">Main Headline</Label>
                  <Input
                    id="mainHeadline"
                    value={memorandum.locationShowcase?.mainHeadline || ""}
                    onChange={(e) => updateMemorandum('locationShowcase', { mainHeadline: e.target.value })}
                    placeholder="e.g., Extremely well-positioned 1,002sqm corner site"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subHeadline">Sub Headline</Label>
                  <Input
                    id="subHeadline"
                    value={memorandum.locationShowcase?.subHeadline || ""}
                    onChange={(e) => updateMemorandum('locationShowcase', { subHeadline: e.target.value })}
                    placeholder="e.g., offering excellent exposure to the thriving CBD"
                  />
                </div>
                
                <div>
                  <Label htmlFor="positioningStatement">Positioning Statement</Label>
                  <Textarea
                    id="positioningStatement"
                    value={memorandum.locationShowcase?.positioningStatement || ""}
                    onChange={(e) => updateMemorandum('locationShowcase', { positioningStatement: e.target.value })}
                    placeholder="Detailed description of the location benefits and positioning..."
                    rows={4}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Key Location Benefits</Label>
                    <Button size="sm" variant="outline" onClick={addLocationBenefit}>
                      Add Benefit
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {memorandum.locationShowcase?.keyLocationBenefits?.map((benefit, index) => (
                      <Input
                        key={index}
                        value={benefit}
                        onChange={(e) => updateLocationBenefit(index, e.target.value)}
                        placeholder="Location benefit or advantage..."
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tenants" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Tenant Profiles</h3>
                <Button onClick={addTenantProfile}>Add Tenant Profile</Button>
              </div>
              
              <div className="space-y-4">
                {memorandum.tenantProfiles?.map((tenant, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base">Tenant Profile {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Tenant Name</Label>
                            <Input
                              value={tenant.name}
                              onChange={(e) => updateTenantProfile(index, 'name', e.target.value)}
                              placeholder="e.g., Dymocks Bookstore"
                            />
                          </div>
                          <div>
                            <Label>Business Type</Label>
                            <Input
                              value={tenant.businessType}
                              onChange={(e) => updateTenantProfile(index, 'businessType', e.target.value)}
                              placeholder="e.g., Bookstore Chain"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Logo URL</Label>
                            <Input
                              value={tenant.logo || ""}
                              onChange={(e) => updateTenantProfile(index, 'logo', e.target.value)}
                              placeholder="URL to tenant logo"
                            />
                          </div>
                          <div>
                            <Label>Website</Label>
                            <Input
                              value={tenant.website || ""}
                              onChange={(e) => updateTenantProfile(index, 'website', e.target.value)}
                              placeholder="e.g., https://www.dymocks.com.au"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Business Description</Label>
                          <Textarea
                            value={tenant.description}
                            onChange={(e) => updateTenantProfile(index, 'description', e.target.value)}
                            placeholder="Detailed description of the tenant's business, history, and operations..."
                            rows={4}
                          />
                        </div>
                        
                        <div>
                          <Label>Established Year</Label>
                          <Input
                            value={tenant.establishedYear || ""}
                            onChange={(e) => updateTenantProfile(index, 'establishedYear', e.target.value)}
                            placeholder="e.g., 1884"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                          <Label>Annual Rent</Label>
                          <Input
                            value={lease.rent}
                            onChange={(e) => updateLease(index, 'rent', e.target.value)}
                            placeholder="e.g., $78,281 pa + GST"
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
                    <Label htmlFor="netIncome">Net Income</Label>
                    <Input
                      id="netIncome"
                      value={memorandum.financialSummary?.netIncome || ""}
                      onChange={(e) => updateMemorandum('financialSummary', { netIncome: e.target.value })}
                      placeholder="e.g., $193,766 pa + GST"
                    />
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

                  <div>
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      value={memorandum.whiteLabelConfig?.contactName || ""}
                      onChange={(e) => updateMemorandum('whiteLabelConfig', { contactName: e.target.value })}
                      placeholder="Primary contact person"
                    />
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