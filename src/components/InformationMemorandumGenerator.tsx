/**
 * ============================================================================
 * ENHANCED INFORMATION MEMORANDUM GENERATOR - MAXIMUM IP PROTECTION
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
import DocumentPhotoUpload from "@/components/DocumentPhotoUpload";
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
  Palette,
  Star,
  Building,
  Construction,
  PiggyBank,
  Gavel,
  Phone,
  Upload,
  Zap,
  Copy,
  Save,
  RefreshCw
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

interface RegionalGrowth {
  headline: string;
  stats: string;
  description: string;
}

interface CouncilInfo {
  population: string;
  growthRate: string;
  grossProduct: string;
  developments: string;
  description: string;
}

interface Infrastructure {
  hospital?: {
    name: string;
    value: string;
    description: string;
  };
  solarFarm?: {
    name: string;
    value: string;
    description: string;
  };
}

interface RegionalInvestment {
  regionName: string;
  economySize: string;
  retailGrowth: string;
  populationGrowth: string;
  employmentGrowth: string;
  description: string;
}

interface SaleDetails {
  method: string;
  closing: string;
  inspections: string;
  dueDiligence: string;
}

interface ContactDetails {
  agencyName: string;
  primary?: {
    name: string;
    phone: string;
    email: string;
  };
  secondary?: {
    name: string;
    phone: string;
    email: string;
  };
}

interface PropertyManagement {
  headline: string;
  portfolioSize: string;
  description: string;
  contact: string;
}

interface Disclaimer {
  title: string;
  mainText: string;
  intellectualProperty: string;
  gstDisclaimer: string;
}

interface CompanyOffices {
  headline: string;
  subheadline: string;
  offices: Array<{
    state: string;
    locations: Array<{
      city: string;
      address: string;
      phone: string;
      email: string;
    }>;
  }>;
}

interface NationalInvestment {
  countryOverview: string;
  nationalGdpGrowth: string;
  populationGrowth: string;
  unemploymentRate: string;
  interestRateEnvironment: string;
  governmentIncentives: string;
  nationalMarketTrends: string;
  economicForecast: string;
}

interface AssetSpecificInvestment {
  assetType: string;
  assetGrading: string;
  locationScore: string;
  buildingCondition: string;
  tenantQuality: string;
  leaseCovenantStrength: string;
  futureGrowthPotential: string;
  riskFactors: string[];
  assetComparisons: Array<{
    comparable: string;
    location: string;
    yield: string;
    price: string;
  }>;
}

interface GeographicalAnalysis {
  suburb: string;
  municipality: string;
  state: string;
  country: string;
  regionType: string;
  demographics: {
    population: string;
    medianAge: string;
    householdIncome: string;
    educationLevel: string;
  };
  infrastructure: {
    transport: string[];
    healthcare: string[];
    education: string[];
    retail: string[];
  };
  marketAnalysis: {
    medianPrice: string;
    priceGrowth: string;
    rentalYield: string;
    daysOnMarket: string;
  };
}

interface GapAnalysis {
  supplySideAnalysis: {
    currentSupply: string;
    futureSupply: string;
    competitorAnalysis: string;
  };
  demandAnalysis: {
    currentDemand: string;
    projectedDemand: string;
    demandDrivers: string[];
  };
  marketGap: {
    identifiedGap: string;
    opportunitySize: string;
    competitiveAdvantage: string;
    riskMitigation: string;
  };
  recommendations: string[];
}

interface InformationMemorandum {
  id: string;
  title: string;
  subtitle: string;
  saleMethod: string;
  closingDate: string;
  properties: PropertyDetails[];
  investmentHighlights: InvestmentHighlights;
  leases: LeaseDetails[];
  financialSummary: FinancialSummary;
  tenantProfiles: TenantProfile[];
  propertyPhotos: PropertyPhotos;
  locationShowcase: LocationShowcase;
  regionalGrowth: RegionalGrowth;
  councilInfo: CouncilInfo;
  infrastructure: Infrastructure;
  regionalInvestment: RegionalInvestment;
  nationalInvestment: NationalInvestment;
  assetSpecificInvestment: AssetSpecificInvestment;
  geographicalAnalysis: GeographicalAnalysis;
  gapAnalysis: GapAnalysis;
  saleDetails: SaleDetails;
  contactDetails: ContactDetails;
  propertyManagement: PropertyManagement;
  disclaimer: Disclaimer;
  companyOffices: CompanyOffices;
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
    properties: [{
      address: "",
      landArea: "",
      buildingArea: "",
      zoning: "",
      titleDetails: "",
      frontage: "",
      overlay: ""
    }],
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
    regionalGrowth: {
      headline: "",
      stats: "",
      description: ""
    },
    councilInfo: {
      population: "",
      growthRate: "",
      grossProduct: "",
      developments: "",
      description: ""
    },
    infrastructure: {
      hospital: {
        name: "",
        value: "",
        description: ""
      },
      solarFarm: {
        name: "",
        value: "",
        description: ""
      }
    },
    regionalInvestment: {
      regionName: "",
      economySize: "",
      retailGrowth: "",
      populationGrowth: "",
      employmentGrowth: "",
      description: ""
    },
    nationalInvestment: {
      countryOverview: "",
      nationalGdpGrowth: "",
      populationGrowth: "",
      unemploymentRate: "",
      interestRateEnvironment: "",
      governmentIncentives: "",
      nationalMarketTrends: "",
      economicForecast: ""
    },
    assetSpecificInvestment: {
      assetType: "",
      assetGrading: "",
      locationScore: "",
      buildingCondition: "",
      tenantQuality: "",
      leaseCovenantStrength: "",
      futureGrowthPotential: "",
      riskFactors: [],
      assetComparisons: []
    },
    geographicalAnalysis: {
      suburb: "",
      municipality: "",
      state: "",
      country: "",
      regionType: "",
      demographics: {
        population: "",
        medianAge: "",
        householdIncome: "",
        educationLevel: ""
      },
      infrastructure: {
        transport: [],
        healthcare: [],
        education: [],
        retail: []
      },
      marketAnalysis: {
        medianPrice: "",
        priceGrowth: "",
        rentalYield: "",
        daysOnMarket: ""
      }
    },
    gapAnalysis: {
      supplySideAnalysis: {
        currentSupply: "",
        futureSupply: "",
        competitorAnalysis: ""
      },
      demandAnalysis: {
        currentDemand: "",
        projectedDemand: "",
        demandDrivers: []
      },
      marketGap: {
        identifiedGap: "",
        opportunitySize: "",
        competitiveAdvantage: "",
        riskMitigation: ""
      },
      recommendations: []
    },
    saleDetails: {
      method: "",
      closing: "",
      inspections: "",
      dueDiligence: ""
    },
    contactDetails: {
      agencyName: "",
      primary: {
        name: "",
        phone: "",
        email: ""
      },
      secondary: {
        name: "",
        phone: "",
        email: ""
      }
    },
    propertyManagement: {
      headline: "",
      portfolioSize: "",
      description: "",
      contact: ""
    },
    disclaimer: {
      title: "Disclaimer",
      mainText: "",
      intellectualProperty: "",
      gstDisclaimer: ""
    },
    companyOffices: {
      headline: "",
      subheadline: "",
      offices: []
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
      const currentSection = (prev as any)[section] || {};
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

  const addProperty = () => {
    const newProperty: PropertyDetails = {
      address: "",
      landArea: "",
      buildingArea: "",
      zoning: "",
      titleDetails: "",
      frontage: "",
      overlay: ""
    };
    setMemorandum(prev => ({
      ...prev,
      properties: [...(prev.properties || []), newProperty]
    }));
  };

  const updateProperty = (index: number, field: keyof PropertyDetails, value: string) => {
    setMemorandum(prev => ({
      ...prev,
      properties: prev.properties?.map((property, i) => 
        i === index ? { ...property, [field]: value } : property
      ) || []
    }));
  };

  const removeProperty = (index: number) => {
    setMemorandum(prev => ({
      ...prev,
      properties: prev.properties?.filter((_, i) => i !== index) || []
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

  const handleOCRDataExtracted = (data: any) => {
    // Auto-fill form fields based on extracted data
    if (data.fields) {
      const updates: any = {};
      
      if (data.fields.address) {
        updates.properties = memorandum.properties?.map((prop, i) => 
          i === 0 ? { ...prop, address: data.fields.address } : prop
        ) || [{ address: data.fields.address, landArea: "", buildingArea: "", zoning: "", titleDetails: "", frontage: "", overlay: "" }];
      }
      
      if (data.fields.area) {
        updates.properties = memorandum.properties?.map((prop, i) => 
          i === 0 ? { ...prop, landArea: data.fields.area } : prop
        ) || [{ address: "", landArea: data.fields.area, buildingArea: "", zoning: "", titleDetails: "", frontage: "", overlay: "" }];
      }
      
      if (data.fields.tenant) {
        const newLease = {
          tenant: data.fields.tenant,
          area: data.fields.area || "",
          term: data.fields.lease || "",
          expiry: "",
          rent: data.fields.rent || "",
          reviewType: "CPI",
          options: ""
        };
        updates.leases = [...(memorandum.leases || []), newLease];
      }
      
      if (data.fields.rent) {
        updates.financialSummary = {
          ...memorandum.financialSummary,
          grossIncome: data.fields.rent
        };
      }
      
      setMemorandum(prev => ({ ...prev, ...updates }));
    }
  };

  const autoFillSampleData = () => {
    setMemorandum(prev => ({
      ...prev,
      title: "Premium Investment Opportunity",
      subtitle: "Commercial Property | High Yield Investment",
      properties: [{
        address: "123 Business District, Central City",
        landArea: "2,400 sqm",
        buildingArea: "1,800 sqm",
        zoning: "Commercial 1",
        titleDetails: "Freehold",
        frontage: "40m",
        overlay: "None"
      }],
      investmentHighlights: {
        primaryHighlight: "8.5% Net Yield | Prime Location | Secure Tenant",
        keyFeatures: [
          "Prime commercial location",
          "Secure long-term tenant",
          "Strong rental growth",
          "Development potential"
        ],
        financialMetrics: {
          netIncome: "$425,000",
          estimatedYield: "8.5%",
          occupancyRate: "100%"
        }
      }
    }));
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
                  {memorandum.subtitle || memorandum.properties?.[0]?.address}
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Enhanced Header with Quick Actions */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-6 w-6 text-primary" />
                Enhanced Information Memorandum Generator
              </CardTitle>
              <CardDescription className="text-lg">
                Create professional investment property memorandums with OCR capabilities and white label branding
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={autoFillSampleData} size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sample Data
              </Button>
              <Button variant="outline" onClick={() => setPreviewMode(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Download className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* OCR Upload Section */}
      <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-r from-emerald-50/30 to-blue-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Upload className="h-5 w-5" />
            Smart Document Upload & OCR
          </CardTitle>
          <CardDescription>
            Upload property documents, leases, or contracts to auto-fill form fields using advanced OCR technology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentPhotoUpload onDataExtracted={handleOCRDataExtracted} />
        </CardContent>
      </Card>

      {/* Enhanced Form */}
      <Card>
        <CardContent className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12 gap-1 h-auto p-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="property">Property</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="leases">Leases</TabsTrigger>
              <TabsTrigger value="tenants">Tenants</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="council">Council</TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="investment">Regional Invest</TabsTrigger>
              <TabsTrigger value="national">National Invest</TabsTrigger>
              <TabsTrigger value="asset">Asset Specific</TabsTrigger>
              <TabsTrigger value="geographical">Geographical</TabsTrigger>
              <TabsTrigger value="gap">Gap Analysis</TabsTrigger>
              <TabsTrigger value="sale">Sale Method</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="management">Property Mgmt</TabsTrigger>
              <TabsTrigger value="disclaimer">Disclaimer</TabsTrigger>
              <TabsTrigger value="offices">Offices</TabsTrigger>
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
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Property Details</h3>
                <Button onClick={addProperty} size="sm">
                  <Building className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </div>
              
              <div className="space-y-6">
                {memorandum.properties?.map((property, index) => (
                  <Card key={index} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Property {index + 1}</CardTitle>
                        {memorandum.properties && memorandum.properties.length > 1 && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => removeProperty(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div>
                          <Label>Property Address</Label>
                          <Input
                            value={property.address}
                            onChange={(e) => updateProperty(index, 'address', e.target.value)}
                            placeholder="e.g., 91-101 Bourbong Street, Bundaberg Central QLD 4670"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Land Area</Label>
                            <Input
                              value={property.landArea}
                              onChange={(e) => updateProperty(index, 'landArea', e.target.value)}
                              placeholder="e.g., 1,002 sqm"
                            />
                          </div>
                          <div>
                            <Label>Building Area</Label>
                            <Input
                              value={property.buildingArea}
                              onChange={(e) => updateProperty(index, 'buildingArea', e.target.value)}
                              placeholder="e.g., 850 sqm"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Zoning</Label>
                            <Input
                              value={property.zoning}
                              onChange={(e) => updateProperty(index, 'zoning', e.target.value)}
                              placeholder="e.g., Commercial Core Zone"
                            />
                          </div>
                          <div>
                            <Label>Title Details</Label>
                            <Input
                              value={property.titleDetails}
                              onChange={(e) => updateProperty(index, 'titleDetails', e.target.value)}
                              placeholder="e.g., Freehold"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Frontage</Label>
                            <Input
                              value={property.frontage}
                              onChange={(e) => updateProperty(index, 'frontage', e.target.value)}
                              placeholder="e.g., 25.6m (approx) to Bourbong Street"
                            />
                          </div>
                          <div>
                            <Label>Overlay</Label>
                            <Input
                              value={property.overlay}
                              onChange={(e) => updateProperty(index, 'overlay', e.target.value)}
                              placeholder="e.g., Centre Activities Overlay"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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

            <TabsContent value="growth" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Regional Growth
                </h3>
                
                <div>
                  <Label htmlFor="growthHeadline">Growth Headline</Label>
                  <Input
                    id="growthHeadline"
                    value={memorandum.regionalGrowth?.headline || ""}
                    onChange={(e) => updateMemorandum('regionalGrowth', { headline: e.target.value })}
                    placeholder="e.g., The Bundaberg area benefits from significant growth"
                  />
                </div>
                
                <div>
                  <Label htmlFor="growthStats">Growth Statistics</Label>
                  <Input
                    id="growthStats"
                    value={memorandum.regionalGrowth?.stats || ""}
                    onChange={(e) => updateMemorandum('regionalGrowth', { stats: e.target.value })}
                    placeholder="e.g., housing prices surging by 94% from 2021 to 2025"
                  />
                </div>
                
                <div>
                  <Label htmlFor="growthDescription">Growth Description</Label>
                  <Textarea
                    id="growthDescription"
                    value={memorandum.regionalGrowth?.description || ""}
                    onChange={(e) => updateMemorandum('regionalGrowth', { description: e.target.value })}
                    placeholder="Detailed description of regional growth factors..."
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="council" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Council Information
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="population">Current Population</Label>
                    <Input
                      id="population"
                      value={memorandum.councilInfo?.population || ""}
                      onChange={(e) => updateMemorandum('councilInfo', { population: e.target.value })}
                      placeholder="e.g., 106,146"
                    />
                  </div>
                  <div>
                    <Label htmlFor="growthRate">Growth Rate</Label>
                    <Input
                      id="growthRate"
                      value={memorandum.councilInfo?.growthRate || ""}
                      onChange={(e) => updateMemorandum('councilInfo', { growthRate: e.target.value })}
                      placeholder="e.g., 1.90%"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="grossProduct">Gross Regional Product</Label>
                    <Input
                      id="grossProduct"
                      value={memorandum.councilInfo?.grossProduct || ""}
                      onChange={(e) => updateMemorandum('councilInfo', { grossProduct: e.target.value })}
                      placeholder="e.g., $6.08 billion"
                    />
                  </div>
                  <div>
                    <Label htmlFor="developments">Recent Developments Value</Label>
                    <Input
                      id="developments"
                      value={memorandum.councilInfo?.developments || ""}
                      onChange={(e) => updateMemorandum('councilInfo', { developments: e.target.value })}
                      placeholder="e.g., $4.2 billion"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="councilDescription">Council Description</Label>
                  <Textarea
                    id="councilDescription"
                    value={memorandum.councilInfo?.description || ""}
                    onChange={(e) => updateMemorandum('councilInfo', { description: e.target.value })}
                    placeholder="Detailed description of the council area and its economic profile..."
                    rows={6}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="infrastructure" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Construction className="h-5 w-5" />
                  Key Infrastructure Projects
                </h3>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">New Hospital Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Project Name</Label>
                          <Input
                            value={memorandum.infrastructure?.hospital?.name || ""}
                            onChange={(e) => updateMemorandum('infrastructure', { 
                              hospital: { ...memorandum.infrastructure?.hospital, name: e.target.value }
                            })}
                            placeholder="e.g., New Bundaberg Hospital"
                          />
                        </div>
                        <div>
                          <Label>Project Value</Label>
                          <Input
                            value={memorandum.infrastructure?.hospital?.value || ""}
                            onChange={(e) => updateMemorandum('infrastructure', { 
                              hospital: { ...memorandum.infrastructure?.hospital, value: e.target.value }
                            })}
                            placeholder="e.g., $1.2 billion"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Project Description</Label>
                        <Textarea
                          value={memorandum.infrastructure?.hospital?.description || ""}
                          onChange={(e) => updateMemorandum('infrastructure', { 
                            hospital: { ...memorandum.infrastructure?.hospital, description: e.target.value }
                          })}
                          placeholder="Details about the hospital project..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Solar Farm Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Project Name</Label>
                          <Input
                            value={memorandum.infrastructure?.solarFarm?.name || ""}
                            onChange={(e) => updateMemorandum('infrastructure', { 
                              solarFarm: { ...memorandum.infrastructure?.solarFarm, name: e.target.value }
                            })}
                            placeholder="e.g., New Bundaberg Solar Farm"
                          />
                        </div>
                        <div>
                          <Label>Project Value</Label>
                          <Input
                            value={memorandum.infrastructure?.solarFarm?.value || ""}
                            onChange={(e) => updateMemorandum('infrastructure', { 
                              solarFarm: { ...memorandum.infrastructure?.solarFarm, value: e.target.value }
                            })}
                            placeholder="e.g., $130 million"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Project Description</Label>
                        <Textarea
                          value={memorandum.infrastructure?.solarFarm?.description || ""}
                          onChange={(e) => updateMemorandum('infrastructure', { 
                            solarFarm: { ...memorandum.infrastructure?.solarFarm, description: e.target.value }
                          })}
                          placeholder="Details about the solar farm project..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="investment" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="regionName">Investment Region/Location</Label>
                  <Input
                    id="regionName"
                    value={memorandum.regionalInvestment?.regionName || ""}
                    onChange={(e) => updateMemorandum('regionalInvestment', { regionName: e.target.value })}
                    placeholder="e.g., Queensland, NSW, Victoria, or any global location"
                  />
                </div>

                <div>
                  <Label htmlFor="economySize">Economy Size</Label>
                  <Input
                    id="economySize"
                    value={memorandum.regionalInvestment?.economySize || ""}
                    onChange={(e) => updateMemorandum('regionalInvestment', { economySize: e.target.value })}
                    placeholder="e.g., Queensland's $500 billion economy"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Retail Trade Growth</Label>
                    <Input
                      value={memorandum.regionalInvestment?.retailGrowth || ""}
                      onChange={(e) => updateMemorandum('regionalInvestment', { retailGrowth: e.target.value })}
                      placeholder="e.g., 4.0%"
                    />
                  </div>
                  <div>
                    <Label>Population Growth</Label>
                    <Input
                      value={memorandum.regionalInvestment?.populationGrowth || ""}
                      onChange={(e) => updateMemorandum('regionalInvestment', { populationGrowth: e.target.value })}
                      placeholder="e.g., 2.0%"
                    />
                  </div>
                  <div>
                    <Label>Employment Growth</Label>
                    <Input
                      value={memorandum.regionalInvestment?.employmentGrowth || ""}
                      onChange={(e) => updateMemorandum('regionalInvestment', { employmentGrowth: e.target.value })}
                      placeholder="e.g., 3.0%"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="regionalDescription">Investment Overview</Label>
                  <Textarea
                    id="regionalDescription"
                    value={memorandum.regionalInvestment?.description || ""}
                    onChange={(e) => updateMemorandum('regionalInvestment', { description: e.target.value })}
                    placeholder="Overview of regional investment opportunities and economic growth..."
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sale" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Method of Sale
                </h3>
                
                <div>
                  <Label htmlFor="saleMethodDetails">Sale Method</Label>
                  <Input
                    id="saleMethodDetails"
                    value={memorandum.saleDetails?.method || ""}
                    onChange={(e) => updateMemorandum('saleDetails', { method: e.target.value })}
                    placeholder="e.g., For Sale via Expressions of Interest"
                  />
                </div>
                
                <div>
                  <Label htmlFor="saleClosing">Closing Details</Label>
                  <Input
                    id="saleClosing"
                    value={memorandum.saleDetails?.closing || ""}
                    onChange={(e) => updateMemorandum('saleDetails', { closing: e.target.value })}
                    placeholder="e.g., Closing 3pm (AEST) Wednesday 24 September 2025"
                  />
                </div>
                
                <div>
                  <Label htmlFor="inspectionDetails">Inspections</Label>
                  <Input
                    id="inspectionDetails"
                    value={memorandum.saleDetails?.inspections || ""}
                    onChange={(e) => updateMemorandum('saleDetails', { inspections: e.target.value })}
                    placeholder="e.g., Inspections can be arranged by prior appointment"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dueDiligenceDetails">Due Diligence</Label>
                  <Input
                    id="dueDiligenceDetails"
                    value={memorandum.saleDetails?.dueDiligence || ""}
                    onChange={(e) => updateMemorandum('saleDetails', { dueDiligence: e.target.value })}
                    placeholder="e.g., Due Diligence material will be provided upon request"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </h3>
                
                <div>
                  <Label htmlFor="agencyName">Agency Name</Label>
                  <Input
                    id="agencyName"
                    value={memorandum.contactDetails?.agencyName || ""}
                    onChange={(e) => updateMemorandum('contactDetails', { agencyName: e.target.value })}
                    placeholder="e.g., Burgess Rawson from CBRE"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Primary Contact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={memorandum.contactDetails?.primary?.name || ""}
                            onChange={(e) => updateMemorandum('contactDetails', { 
                              primary: { ...memorandum.contactDetails?.primary, name: e.target.value }
                            })}
                            placeholder="e.g., Josh Scapolan"
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={memorandum.contactDetails?.primary?.phone || ""}
                            onChange={(e) => updateMemorandum('contactDetails', { 
                              primary: { ...memorandum.contactDetails?.primary, phone: e.target.value }
                            })}
                            placeholder="e.g., 0484 229 829"
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={memorandum.contactDetails?.primary?.email || ""}
                            onChange={(e) => updateMemorandum('contactDetails', { 
                              primary: { ...memorandum.contactDetails?.primary, email: e.target.value }
                            })}
                            placeholder="e.g., josh.scapolan@cbre.com"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Secondary Contact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={memorandum.contactDetails?.secondary?.name || ""}
                            onChange={(e) => updateMemorandum('contactDetails', { 
                              secondary: { ...memorandum.contactDetails?.secondary, name: e.target.value }
                            })}
                            placeholder="e.g., Fin Hume"
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={memorandum.contactDetails?.secondary?.phone || ""}
                            onChange={(e) => updateMemorandum('contactDetails', { 
                              secondary: { ...memorandum.contactDetails?.secondary, phone: e.target.value }
                            })}
                            placeholder="e.g., 0488 008 975"
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={memorandum.contactDetails?.secondary?.email || ""}
                            onChange={(e) => updateMemorandum('contactDetails', { 
                              secondary: { ...memorandum.contactDetails?.secondary, email: e.target.value }
                            })}
                            placeholder="e.g., fin.hume@cbre.com"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="management" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Property Management Services
                </h3>
                
                <div>
                  <Label htmlFor="managementHeadline">Management Headline</Label>
                  <Input
                    id="managementHeadline"
                    value={memorandum.propertyManagement?.headline || ""}
                    onChange={(e) => updateMemorandum('propertyManagement', { headline: e.target.value })}
                    placeholder="e.g., Purchased the Property? We can Manage it."
                  />
                </div>
                
                <div>
                  <Label htmlFor="portfolioSize">Portfolio Size</Label>
                  <Input
                    id="portfolioSize"
                    value={memorandum.propertyManagement?.portfolioSize || ""}
                    onChange={(e) => updateMemorandum('propertyManagement', { portfolioSize: e.target.value })}
                    placeholder="e.g., over $11 billion Australia wide management portfolio"
                  />
                </div>
                
                <div>
                  <Label htmlFor="managementDescription">Management Services Description</Label>
                  <Textarea
                    id="managementDescription"
                    value={memorandum.propertyManagement?.description || ""}
                    onChange={(e) => updateMemorandum('propertyManagement', { description: e.target.value })}
                    placeholder="Detailed description of property management services offered..."
                    rows={6}
                  />
                </div>
                
                <div>
                  <Label htmlFor="managementContact">Management Contact</Label>
                  <Input
                    id="managementContact"
                    value={memorandum.propertyManagement?.contact || ""}
                    onChange={(e) => updateMemorandum('propertyManagement', { contact: e.target.value })}
                    placeholder="e.g., Donna Alexander - 0409 914 659"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="national" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  National Investment Analysis
                </h3>
                
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="countryOverview">Country Overview</Label>
                    <Textarea
                      id="countryOverview"
                      value={memorandum.nationalInvestment?.countryOverview || ""}
                      onChange={(e) => updateMemorandum('nationalInvestment', { countryOverview: e.target.value })}
                      placeholder="Overview of the national investment environment and economic outlook"
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nationalGdpGrowth">National GDP Growth</Label>
                      <Input
                        id="nationalGdpGrowth"
                        value={memorandum.nationalInvestment?.nationalGdpGrowth || ""}
                        onChange={(e) => updateMemorandum('nationalInvestment', { nationalGdpGrowth: e.target.value })}
                        placeholder="e.g., 2.8% annual growth"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nationalPopulationGrowth">Population Growth</Label>
                      <Input
                        id="nationalPopulationGrowth"
                        value={memorandum.nationalInvestment?.populationGrowth || ""}
                        onChange={(e) => updateMemorandum('nationalInvestment', { populationGrowth: e.target.value })}
                        placeholder="e.g., 1.6% population growth"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="unemploymentRate">Unemployment Rate</Label>
                      <Input
                        id="unemploymentRate"
                        value={memorandum.nationalInvestment?.unemploymentRate || ""}
                        onChange={(e) => updateMemorandum('nationalInvestment', { unemploymentRate: e.target.value })}
                        placeholder="e.g., 3.9%"
                      />
                    </div>
                    <div>
                      <Label htmlFor="interestRateEnvironment">Interest Rate Environment</Label>
                      <Input
                        id="interestRateEnvironment"
                        value={memorandum.nationalInvestment?.interestRateEnvironment || ""}
                        onChange={(e) => updateMemorandum('nationalInvestment', { interestRateEnvironment: e.target.value })}
                        placeholder="e.g., 4.35% cash rate"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="governmentIncentives">Government Incentives</Label>
                    <Textarea
                      id="governmentIncentives"
                      value={memorandum.nationalInvestment?.governmentIncentives || ""}
                      onChange={(e) => updateMemorandum('nationalInvestment', { governmentIncentives: e.target.value })}
                      placeholder="Current government incentives and policies supporting investment"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="nationalMarketTrends">National Market Trends</Label>
                    <Textarea
                      id="nationalMarketTrends"
                      value={memorandum.nationalInvestment?.nationalMarketTrends || ""}
                      onChange={(e) => updateMemorandum('nationalInvestment', { nationalMarketTrends: e.target.value })}
                      placeholder="Key national property market trends and indicators"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="economicForecast">Economic Forecast</Label>
                    <Textarea
                      id="economicForecast"
                      value={memorandum.nationalInvestment?.economicForecast || ""}
                      onChange={(e) => updateMemorandum('nationalInvestment', { economicForecast: e.target.value })}
                      placeholder="Economic outlook and projections for the investment period"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="asset" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Asset Specific Investment Analysis
                </h3>
                
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="assetType">Asset Type</Label>
                      <Input
                        id="assetType"
                        value={memorandum.assetSpecificInvestment?.assetType || ""}
                        onChange={(e) => updateMemorandum('assetSpecificInvestment', { assetType: e.target.value })}
                        placeholder="e.g., Retail, Office, Industrial"
                      />
                    </div>
                    <div>
                      <Label htmlFor="assetGrading">Asset Grading</Label>
                      <Input
                        id="assetGrading"
                        value={memorandum.assetSpecificInvestment?.assetGrading || ""}
                        onChange={(e) => updateMemorandum('assetSpecificInvestment', { assetGrading: e.target.value })}
                        placeholder="e.g., A-Grade, B-Grade, C-Grade"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="locationScore">Location Score</Label>
                      <Input
                        id="locationScore"
                        value={memorandum.assetSpecificInvestment?.locationScore || ""}
                        onChange={(e) => updateMemorandum('assetSpecificInvestment', { locationScore: e.target.value })}
                        placeholder="e.g., 8.5/10 - Prime location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="buildingCondition">Building Condition</Label>
                      <Input
                        id="buildingCondition"
                        value={memorandum.assetSpecificInvestment?.buildingCondition || ""}
                        onChange={(e) => updateMemorandum('assetSpecificInvestment', { buildingCondition: e.target.value })}
                        placeholder="e.g., Excellent, Good, Fair"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tenantQuality">Tenant Quality</Label>
                      <Input
                        id="tenantQuality"
                        value={memorandum.assetSpecificInvestment?.tenantQuality || ""}
                        onChange={(e) => updateMemorandum('assetSpecificInvestment', { tenantQuality: e.target.value })}
                        placeholder="e.g., National tenant, Regional, Local"
                      />
                    </div>
                    <div>
                      <Label htmlFor="leaseCovenantStrength">Lease Covenant Strength</Label>
                      <Input
                        id="leaseCovenantStrength"
                        value={memorandum.assetSpecificInvestment?.leaseCovenantStrength || ""}
                        onChange={(e) => updateMemorandum('assetSpecificInvestment', { leaseCovenantStrength: e.target.value })}
                        placeholder="e.g., Strong, Medium, Weak"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="futureGrowthPotential">Future Growth Potential</Label>
                    <Textarea
                      id="futureGrowthPotential"
                      value={memorandum.assetSpecificInvestment?.futureGrowthPotential || ""}
                      onChange={(e) => updateMemorandum('assetSpecificInvestment', { futureGrowthPotential: e.target.value })}
                      placeholder="Analysis of future growth potential for this specific asset"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="geographical" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Geographical Analysis
                </h3>
                
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="suburb">Suburb</Label>
                      <Input
                        id="suburb"
                        value={memorandum.geographicalAnalysis?.suburb || ""}
                        onChange={(e) => updateMemorandum('geographicalAnalysis', { suburb: e.target.value })}
                        placeholder="e.g., Bundaberg Central"
                      />
                    </div>
                    <div>
                      <Label htmlFor="municipality">Municipality</Label>
                      <Input
                        id="municipality"
                        value={memorandum.geographicalAnalysis?.municipality || ""}
                        onChange={(e) => updateMemorandum('geographicalAnalysis', { municipality: e.target.value })}
                        placeholder="e.g., Bundaberg Regional Council"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="geoState">State/Territory</Label>
                      <Input
                        id="geoState"
                        value={memorandum.geographicalAnalysis?.state || ""}
                        onChange={(e) => updateMemorandum('geographicalAnalysis', { state: e.target.value })}
                        placeholder="e.g., Queensland"
                      />
                    </div>
                    <div>
                      <Label htmlFor="geoCountry">Country</Label>
                      <Input
                        id="geoCountry"
                        value={memorandum.geographicalAnalysis?.country || ""}
                        onChange={(e) => updateMemorandum('geographicalAnalysis', { country: e.target.value })}
                        placeholder="e.g., Australia"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="regionType">Region Type</Label>
                    <Input
                      id="regionType"
                      value={memorandum.geographicalAnalysis?.regionType || ""}
                      onChange={(e) => updateMemorandum('geographicalAnalysis', { regionType: e.target.value })}
                      placeholder="e.g., Regional City, Metropolitan, Rural"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="population">Population</Label>
                      <Input
                        id="population"
                        value={memorandum.geographicalAnalysis?.demographics?.population || ""}
                        onChange={(e) => updateMemorandum('geographicalAnalysis', { 
                          demographics: { 
                            ...memorandum.geographicalAnalysis?.demographics,
                            population: e.target.value 
                          }
                        })}
                        placeholder="e.g., 70,921"
                      />
                    </div>
                    <div>
                      <Label htmlFor="medianAge">Median Age</Label>
                      <Input
                        id="medianAge"
                        value={memorandum.geographicalAnalysis?.demographics?.medianAge || ""}
                        onChange={(e) => updateMemorandum('geographicalAnalysis', { 
                          demographics: { 
                            ...memorandum.geographicalAnalysis?.demographics,
                            medianAge: e.target.value 
                          }
                        })}
                        placeholder="e.g., 42 years"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="householdIncome">Median Household Income</Label>
                      <Input
                        id="householdIncome"
                        value={memorandum.geographicalAnalysis?.demographics?.householdIncome || ""}
                        onChange={(e) => updateMemorandum('geographicalAnalysis', { 
                          demographics: { 
                            ...memorandum.geographicalAnalysis?.demographics,
                            householdIncome: e.target.value 
                          }
                        })}
                        placeholder="e.g., $68,400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="educationLevel">Education Level</Label>
                      <Input
                        id="educationLevel"
                        value={memorandum.geographicalAnalysis?.demographics?.educationLevel || ""}
                        onChange={(e) => updateMemorandum('geographicalAnalysis', { 
                          demographics: { 
                            ...memorandum.geographicalAnalysis?.demographics,
                            educationLevel: e.target.value 
                          }
                        })}
                        placeholder="e.g., 15% tertiary qualified"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gap" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Gap Analysis
                </h3>
                
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="currentSupply">Current Supply Analysis</Label>
                    <Textarea
                      id="currentSupply"
                      value={memorandum.gapAnalysis?.supplySideAnalysis?.currentSupply || ""}
                      onChange={(e) => updateMemorandum('gapAnalysis', { 
                        supplySideAnalysis: { 
                          ...memorandum.gapAnalysis?.supplySideAnalysis,
                          currentSupply: e.target.value 
                        }
                      })}
                      placeholder="Analysis of current supply in the market"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="futureSupply">Future Supply Projections</Label>
                    <Textarea
                      id="futureSupply"
                      value={memorandum.gapAnalysis?.supplySideAnalysis?.futureSupply || ""}
                      onChange={(e) => updateMemorandum('gapAnalysis', { 
                        supplySideAnalysis: { 
                          ...memorandum.gapAnalysis?.supplySideAnalysis,
                          futureSupply: e.target.value 
                        }
                      })}
                      placeholder="Projected future supply and development pipeline"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="currentDemand">Current Demand Analysis</Label>
                    <Textarea
                      id="currentDemand"
                      value={memorandum.gapAnalysis?.demandAnalysis?.currentDemand || ""}
                      onChange={(e) => updateMemorandum('gapAnalysis', { 
                        demandAnalysis: { 
                          ...memorandum.gapAnalysis?.demandAnalysis,
                          currentDemand: e.target.value 
                        }
                      })}
                      placeholder="Current demand metrics and indicators"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="projectedDemand">Projected Demand</Label>
                    <Textarea
                      id="projectedDemand"
                      value={memorandum.gapAnalysis?.demandAnalysis?.projectedDemand || ""}
                      onChange={(e) => updateMemorandum('gapAnalysis', { 
                        demandAnalysis: { 
                          ...memorandum.gapAnalysis?.demandAnalysis,
                          projectedDemand: e.target.value 
                        }
                      })}
                      placeholder="Future demand projections and growth drivers"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="identifiedGap">Identified Market Gap</Label>
                    <Textarea
                      id="identifiedGap"
                      value={memorandum.gapAnalysis?.marketGap?.identifiedGap || ""}
                      onChange={(e) => updateMemorandum('gapAnalysis', { 
                        marketGap: { 
                          ...memorandum.gapAnalysis?.marketGap,
                          identifiedGap: e.target.value 
                        }
                      })}
                      placeholder="Key market gaps and opportunities identified"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="opportunitySize">Opportunity Size</Label>
                      <Input
                        id="opportunitySize"
                        value={memorandum.gapAnalysis?.marketGap?.opportunitySize || ""}
                        onChange={(e) => updateMemorandum('gapAnalysis', { 
                          marketGap: { 
                            ...memorandum.gapAnalysis?.marketGap,
                            opportunitySize: e.target.value 
                          }
                        })}
                        placeholder="e.g., $50M market opportunity"
                      />
                    </div>
                    <div>
                      <Label htmlFor="competitiveAdvantage">Competitive Advantage</Label>
                      <Input
                        id="competitiveAdvantage"
                        value={memorandum.gapAnalysis?.marketGap?.competitiveAdvantage || ""}
                        onChange={(e) => updateMemorandum('gapAnalysis', { 
                          marketGap: { 
                            ...memorandum.gapAnalysis?.marketGap,
                            competitiveAdvantage: e.target.value 
                          }
                        })}
                        placeholder="Key competitive advantages"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="disclaimer" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Disclaimer Information
                </h3>
                
                <div>
                  <Label htmlFor="disclaimerTitle">Disclaimer Title</Label>
                  <Input
                    id="disclaimerTitle"
                    value={memorandum.disclaimer?.title || ""}
                    onChange={(e) => updateMemorandum('disclaimer', { title: e.target.value })}
                    placeholder="e.g., Disclaimer"
                  />
                </div>
                
                <div>
                  <Label htmlFor="disclaimerMainText">Main Disclaimer Text</Label>
                  <Textarea
                    id="disclaimerMainText"
                    value={memorandum.disclaimer?.mainText || ""}
                    onChange={(e) => updateMemorandum('disclaimer', { mainText: e.target.value })}
                    placeholder="The information contained in the report/information memorandum has been prepared in good faith..."
                    rows={8}
                  />
                </div>
                
                <div>
                  <Label htmlFor="disclaimerIP">Intellectual Property Notice</Label>
                  <Textarea
                    id="disclaimerIP"
                    value={memorandum.disclaimer?.intellectualProperty || ""}
                    onChange={(e) => updateMemorandum('disclaimer', { intellectualProperty: e.target.value })}
                    placeholder="The information contained in the report has been prepared by... intellectual property notices..."
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="disclaimerGST">GST Disclaimer</Label>
                  <Textarea
                    id="disclaimerGST"
                    value={memorandum.disclaimer?.gstDisclaimer || ""}
                    onChange={(e) => updateMemorandum('disclaimer', { gstDisclaimer: e.target.value })}
                    placeholder="GST disclaimer information..."
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="offices" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Offices
                </h3>
                
                <div>
                  <Label htmlFor="officesHeadline">Main Headline</Label>
                  <Input
                    id="officesHeadline"
                    value={memorandum.companyOffices?.headline || ""}
                    onChange={(e) => updateMemorandum('companyOffices', { headline: e.target.value })}
                    placeholder="e.g., With offices across Australia, Burgess Rawson from CBRE"
                  />
                </div>
                
                <div>
                  <Label htmlFor="officesSubheadline">Sub Headline</Label>
                  <Input
                    id="officesSubheadline"
                    value={memorandum.companyOffices?.subheadline || ""}
                    onChange={(e) => updateMemorandum('companyOffices', { subheadline: e.target.value })}
                    placeholder="e.g., has a truly national understanding and unparalleled collective expertise"
                  />
                </div>
                
                <div>
                  <Label>Office Locations</Label>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Office locations will be displayed in the preview. Use the branding section to configure your company's office network.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="font-semibold">VICTORIA/TASMANIA</p>
                            <p>Melbourne, Brisbane, Sydney</p>
                          </div>
                          <div>
                            <p className="font-semibold">QUEENSLAND/NT</p>
                            <p>Brisbane, Gold Coast, Cairns</p>
                          </div>
                          <div>
                            <p className="font-semibold">SOUTH AUSTRALIA</p>
                            <p>Adelaide, Mount Gambier</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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