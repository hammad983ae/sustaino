import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Play, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import ISFVPlatform from './ISFVPlatform';

// PAF Demo Properties with comprehensive mock data
const pafDemoProperties = [
  {
    name: "Childcare Centre - Melbourne CBD",
    address: "123 Collins Street, Melbourne VIC 3000",
    type: "Childcare",
    reportType: "Long Form",
    features: "150 child capacity, outdoor play areas, commercial kitchen",
    mockData: {
      propertyDetails: {
        landArea: "2,150 sqm",
        buildingArea: "1,800 sqm",
        yearBuilt: "2019",
        zoning: "Commercial 1 Zone",
        owner: "Little Learners Pty Ltd"
      },
      valuation: {
        marketValue: "$4,250,000",
        landValue: "$2,800,000",
        improvementValue: "$1,450,000",
        valuationDate: "September 2024"
      },
      income: {
        grossIncome: "$980,000 p.a.",
        operatingExpenses: "$285,000 p.a.",
        netIncome: "$695,000 p.a.",
        yieldRate: "6.35%"
      },
      riskFactors: [
        "High regulatory compliance requirements",
        "Specialized use limits market appeal",
        "Dependent on license retention"
      ]
    }
  },
  {
    name: "Apple Orchard - Yarra Valley",
    address: "1247 Melba Highway, Dixons Creek VIC 3775",
    type: "Agricultural",
    reportType: "Sustino Pro",
    features: "50 hectares, irrigation system, processing facility",
    mockData: {
      propertyDetails: {
        landArea: "50 hectares (500,000 sqm)",
        buildingArea: "850 sqm (processing facility)",
        yearBuilt: "2015 (facility), 1995 (orchard)",
        zoning: "Farming Zone",
        owner: "Dixons Creek Orchards Ltd"
      },
      valuation: {
        marketValue: "$8,750,000",
        landValue: "$6,200,000",
        improvementValue: "$2,550,000",
        valuationDate: "September 2024"
      },
      income: {
        grossIncome: "$1,450,000 p.a.",
        operatingExpenses: "$680,000 p.a.",
        netIncome: "$770,000 p.a.",
        yieldRate: "4.85%"
      },
      riskFactors: [
        "Weather dependency affects yields",
        "Limited alternative use options",
        "Seasonal income variation"
      ]
    }
  },
  {
    name: "Healthcare Clinic - Box Hill",
    address: "789 Whitehorse Road, Box Hill VIC 3128",
    type: "Healthcare",
    reportType: "Short Form",
    features: "Medical suites, parking, specialist equipment",
    mockData: {
      propertyDetails: {
        landArea: "1,245 sqm",
        buildingArea: "980 sqm",
        yearBuilt: "2018",
        zoning: "Commercial 1 Zone",
        owner: "Eastern Health Services Pty Ltd"
      },
      valuation: {
        marketValue: "$2,850,000",
        landValue: "$1,650,000",
        improvementValue: "$1,200,000",
        valuationDate: "September 2024"
      },
      income: {
        grossIncome: "$485,000 p.a.",
        operatingExpenses: "$125,000 p.a.",
        netIncome: "$360,000 p.a.",
        yieldRate: "6.15%"
      },
      riskFactors: [
        "Tenant specialization limits appeal",
        "Equipment depreciation",
        "Healthcare regulation changes"
      ]
    }
  },
  {
    name: "Development Site - Doncaster",
    address: "321 Manningham Road, Doncaster VIC 3108",
    type: "Development",
    reportType: "Long Form",
    features: "2.5 hectares, residential zoning, planning permits",
    mockData: {
      propertyDetails: {
        landArea: "25,000 sqm (2.5 hectares)",
        buildingArea: "N/A (vacant land)",
        yearBuilt: "N/A",
        zoning: "Residential Growth Zone",
        owner: "Manningham Developments Pty Ltd"
      },
      valuation: {
        marketValue: "$12,500,000",
        landValue: "$12,500,000",
        improvementValue: "$0",
        valuationDate: "September 2024"
      },
      income: {
        grossIncome: "N/A (development site)",
        operatingExpenses: "$45,000 p.a. (holding costs)",
        netIncome: "Negative holding costs",
        yieldRate: "N/A"
      },
      riskFactors: [
        "Development approval conditions",
        "Construction cost escalation",
        "Market timing dependency"
      ]
    }
  },
  {
    name: "Office Complex - South Yarra",
    address: "555 Toorak Road, South Yarra VIC 3141",
    type: "Office",
    reportType: "Sustino Pro",
    features: "Grade A office, 15 floors, premium fitout",
    mockData: {
      propertyDetails: {
        landArea: "1,850 sqm",
        buildingArea: "18,500 sqm (15 floors)",
        yearBuilt: "2017",
        zoning: "Commercial 1 Zone",
        owner: "Premium Office Holdings Pty Ltd"
      },
      valuation: {
        marketValue: "$45,750,000",
        landValue: "$12,200,000",
        improvementValue: "$33,550,000",
        valuationDate: "September 2024"
      },
      income: {
        grossIncome: "$3,850,000 p.a.",
        operatingExpenses: "$965,000 p.a.",
        netIncome: "$2,885,000 p.a.",
        yieldRate: "5.45%"
      },
      riskFactors: [
        "Premium rental sustainability",
        "Technology obsolescence",
        "CBD competition pressure"
      ]
    }
  }
];

// ICV Demo Properties with comprehensive mock data
const icvDemoProperties = [
  {
    name: "Retail Shopping Centre - Chadstone",
    address: "1341 Dandenong Road, Chadstone VIC 3148",
    type: "Retail",
    reportType: "Insurance Valuation",
    features: "Major shopping centre, 200+ stores, entertainment precinct",
    mockData: {
      propertyDetails: {
        landArea: "45,000 sqm",
        buildingArea: "185,000 sqm (GLA)",
        yearBuilt: "1998 (major renovation 2019)",
        zoning: "Commercial 1 Zone",
        owner: "Vicinity Centres"
      },
      valuation: {
        insuranceValue: "$850,000,000",
        replacementCost: "$785,000,000",
        siteClearance: "$15,000,000",
        professionalFees: "$50,000,000",
        valuationDate: "September 2024"
      },
      income: {
        grossIncome: "$65,500,000 p.a.",
        operatingExpenses: "$18,750,000 p.a.",
        netIncome: "$46,750,000 p.a.",
        yieldRate: "4.25%"
      },
      riskFactors: [
        "Online retail competition impact",
        "Large scale reconstruction costs",
        "Tenant mix dependency"
      ]
    }
  },
  {
    name: "Industrial Warehouse - Dandenong",
    address: "1455 South Gippsland Highway, Dandenong South VIC 3175",
    type: "Industrial",
    reportType: "Commercial Valuation",
    features: "Distribution centre, high clearance, loading docks",
    mockData: {
      propertyDetails: {
        landArea: "28,500 sqm",
        buildingArea: "24,200 sqm",
        yearBuilt: "2020",
        zoning: "Industrial 1 Zone",
        owner: "Goodman Group"
      },
      valuation: {
        marketValue: "$42,500,000",
        landValue: "$18,750,000",
        improvementValue: "$23,750,000",
        valuationDate: "September 2024"
      },
      income: {
        grossIncome: "$2,850,000 p.a.",
        operatingExpenses: "$485,000 p.a.",
        netIncome: "$2,365,000 p.a.",
        yieldRate: "5.85%"
      },
      riskFactors: [
        "Single tenant dependency",
        "Specialized racking equipment",
        "Location accessibility changes"
      ]
    }
  },
  {
    name: "Mixed Use Development - Richmond",
    address: "425-439 Swan Street, Richmond VIC 3121",
    type: "Mixed Use",
    reportType: "Insurance Valuation",
    features: "Retail ground floor, residential apartments, basement parking",
    mockData: {
      propertyDetails: {
        landArea: "3,250 sqm",
        buildingArea: "18,500 sqm (total)",
        yearBuilt: "2021",
        zoning: "Mixed Use Zone",
        owner: "Swan Street Developments Pty Ltd"
      },
      valuation: {
        insuranceValue: "$65,750,000",
        replacementCost: "$58,500,000",
        siteClearance: "$2,250,000",
        professionalFees: "$5,000,000",
        valuationDate: "September 2024"
      },
      income: {
        grossIncome: "$4,250,000 p.a.",
        operatingExpenses: "$1,150,000 p.a.",
        netIncome: "$3,100,000 p.a.",
        yieldRate: "4.95%"
      },
      riskFactors: [
        "Mixed use complexity",
        "Residential market volatility",
        "Strata management challenges"
      ]
    }
  },
  {
    name: "Healthcare Hospital - Fitzroy",
    address: "250 Gertrude Street, Fitzroy VIC 3065",
    type: "Healthcare",
    reportType: "Commercial Valuation",
    features: "Private hospital, 150 beds, surgical suites, ICU",
    mockData: {
      propertyDetails: {
        landArea: "8,500 sqm",
        buildingArea: "28,500 sqm (5 levels)",
        yearBuilt: "2016",
        zoning: "Special Use Zone",
        owner: "Fitzroy Private Hospital Ltd"
      },
      valuation: {
        marketValue: "$125,000,000",
        landValue: "$28,500,000",
        improvementValue: "$96,500,000",
        valuationDate: "September 2024"
      },
      income: {
        grossIncome: "$18,500,000 p.a.",
        operatingExpenses: "$5,250,000 p.a.",
        netIncome: "$13,250,000 p.a.",
        yieldRate: "5.65%"
      },
      riskFactors: [
        "Specialized medical equipment",
        "Regulatory compliance costs",
        "Limited alternative use potential"
      ]
    }
  },
  {
    name: "Office Tower - Melbourne CBD",
    address: "525 Collins Street, Melbourne VIC 3000",
    type: "Office",
    reportType: "Insurance Valuation",
    features: "Premium Grade A tower, 40 floors, harbour views",
    mockData: {
      propertyDetails: {
        landArea: "2,150 sqm",
        buildingArea: "85,500 sqm (40 floors)",
        yearBuilt: "2019",
        zoning: "Capital City Zone",
        owner: "Collins Street Holdings Pty Ltd"
      },
      valuation: {
        insuranceValue: "$485,000,000",
        replacementCost: "$425,000,000",
        siteClearance: "$25,000,000",
        professionalFees: "$35,000,000",
        valuationDate: "September 2024"
      },
      income: {
        grossIncome: "$28,500,000 p.a.",
        operatingExpenses: "$7,850,000 p.a.",
        netIncome: "$20,650,000 p.a.",
        yieldRate: "4.85%"
      },
      riskFactors: [
        "CBD office market volatility",
        "High construction replacement costs",
        "Technology obsolescence risk"
      ]
    }
  }
];

export default function GenerateMockReports() {
  const [pafSelectedProperty, setPafSelectedProperty] = useState("Childcare Centre - Melbourne CBD");
  const [pafCustomAddress, setPafCustomAddress] = useState("");
  const [pafStatus, setPafStatus] = useState("Complete");
  const [pafLoading, setPafLoading] = useState(false);
  const [pafReportData, setPafReportData] = useState<any>(pafDemoProperties[0]);
  const [pafContradictions, setPafContradictions] = useState<any[]>([
    {
      type: "Warning",
      section: "Risk Assessment",
      issue: "Healthcare property missing regulatory risk assessment",
      recommendation: "Include healthcare compliance and regulatory risks"
    }
  ]);

  const [icvSelectedProperty, setIcvSelectedProperty] = useState("Healthcare Hospital - Fitzroy");
  const [icvCustomAddress, setIcvCustomAddress] = useState("");
  const [icvStatus, setIcvStatus] = useState("Complete");
  const [icvLoading, setIcvLoading] = useState(false);
  const [icvReportData, setIcvReportData] = useState<any>(icvDemoProperties[3]);
  const [icvContradictions, setIcvContradictions] = useState<any[]>([
    {
      type: "Critical",
      section: "Insurance Valuation",
      issue: "Specialized medical equipment valuation requires expert assessment",
      recommendation: "Engage medical equipment specialist for accurate replacement costs"
    }
  ]);

  const handlePafAutomation = async () => {
    if (!pafSelectedProperty && !pafCustomAddress.trim()) {
      toast.error("Please select a demo property or enter a custom address");
      return;
    }

    setPafLoading(true);
    setPafStatus("Running automation...");

    // Get selected property data
    const selectedPropertyData = pafDemoProperties.find(p => p.name === pafSelectedProperty);

    // Simulate automation process with real data population
    setTimeout(() => {
      setPafStatus("Processing property details...");
    }, 1000);

    setTimeout(() => {
      setPafStatus("Generating PAF report...");
    }, 2000);

    setTimeout(() => {
      setPafStatus("Complete");
      setPafLoading(false);
      
      // Populate report data
      if (selectedPropertyData) {
        setPafReportData(selectedPropertyData);
      }
      
      toast.success("PAF automation completed successfully!");
    }, 3500);
  };

  const handlePafContradictionCheck = () => {
    if (pafStatus !== "Complete" || !pafReportData) {
      toast.error("Please run full automation first");
      return;
    }

    // Simulate contradiction checking with realistic results
    const contradictions = [];
    const propertyData = pafReportData.mockData;

    // Check for potential contradictions based on property type and data
    if (pafReportData.type === "Development" && propertyData.income.grossIncome !== "N/A (development site)") {
      contradictions.push({
        type: "Critical",
        section: "Income Analysis",
        issue: "Development site showing income when it should be vacant land",
        recommendation: "Verify property status and income attribution"
      });
    }

    if (parseFloat(propertyData.income.yieldRate.replace('%', '')) > 8) {
      contradictions.push({
        type: "Warning",
        section: "Yield Analysis",
        issue: "Yield rate appears unusually high for property type",
        recommendation: "Review comparable evidence and market conditions"
      });
    }

    if (pafReportData.type === "Healthcare" && !propertyData.riskFactors.some(risk => risk.includes("regulation"))) {
      contradictions.push({
        type: "Warning",
        section: "Risk Assessment",
        issue: "Healthcare property missing regulatory risk assessment",
        recommendation: "Include healthcare compliance and regulatory risks"
      });
    }

    setPafContradictions(contradictions);

    if (contradictions.length === 0) {
      toast.success("PAF contradiction check passed - no issues detected");
    } else {
      toast.warning(`Found ${contradictions.length} potential issues requiring review`);
    }
  };

  const handleIcvAutomation = async () => {
    if (!icvSelectedProperty && !icvCustomAddress.trim()) {
      toast.error("Please select a demo property or enter a custom address");
      return;
    }

    setIcvLoading(true);
    setIcvStatus("Running automation...");

    // Get selected property data
    const selectedPropertyData = icvDemoProperties.find(p => p.name === icvSelectedProperty);

    // Simulate automation process
    setTimeout(() => {
      setIcvStatus("Calculating insurance values...");
    }, 1000);

    setTimeout(() => {
      setIcvStatus("Generating ICV report...");
    }, 2000);

    setTimeout(() => {
      setIcvStatus("Complete");
      setIcvLoading(false);
      
      // Populate report data
      if (selectedPropertyData) {
        setIcvReportData(selectedPropertyData);
      }
      
      toast.success("ICV automation completed successfully!");
    }, 3500);
  };

  const handleIcvContradictionCheck = () => {
    if (icvStatus !== "Complete" || !icvReportData) {
      toast.error("Please run full automation first");
      return;
    }

    // Simulate contradiction checking for ICV
    const contradictions = [];
    const propertyData = icvReportData.mockData;

    // Check insurance valuation specific contradictions
    if (icvReportData.reportType === "Insurance Valuation") {
      const replacementCost = parseFloat(propertyData.valuation.replacementCost.replace(/[$,]/g, ''));
      const insuranceValue = parseFloat(propertyData.valuation.insuranceValue.replace(/[$,]/g, ''));
      
      if (insuranceValue < replacementCost) {
        contradictions.push({
          type: "Critical",
          section: "Insurance Valuation",
          issue: "Insurance value is less than replacement cost",
          recommendation: "Review insurance adequacy and coverage levels"
        });
      }
    }

    if (icvReportData.type === "Industrial" && !propertyData.riskFactors.some(risk => risk.includes("tenant"))) {
      contradictions.push({
        type: "Warning",
        section: "Risk Assessment",
        issue: "Industrial property missing tenant dependency risk analysis",
        recommendation: "Include tenant concentration and lease security risks"
      });
    }

    if (parseFloat(propertyData.income.yieldRate.replace('%', '')) < 3) {
      contradictions.push({
        type: "Warning",
        section: "Yield Analysis",
        issue: "Yield rate appears unusually low - verify market conditions",
        recommendation: "Compare with recent market transactions and cap rates"
      });
    }

    setIcvContradictions(contradictions);

    if (contradictions.length === 0) {
      toast.success("ICV contradiction check passed - no issues detected");
    } else {
      toast.warning(`Found ${contradictions.length} potential issues requiring review`);
    }
  };

  const clearPafData = () => {
    setPafSelectedProperty("");
    setPafCustomAddress("");
    setPafStatus("Idle");
    setPafReportData(null);
    setPafContradictions([]);
    toast.info("PAF data cleared");
  };

  const clearIcvData = () => {
    setIcvSelectedProperty("");
    setIcvCustomAddress("");
    setIcvStatus("Idle");
    setIcvReportData(null);
    setIcvContradictions([]);
    toast.info("ICV data cleared");
  };

  // Full Report Tab Component - Shows EXACT same tabs and workflow as real platform
  const FullReportTabs = ({ data, contradictions }: { data: any, contradictions: any[] }) => {
    const [activeTab, setActiveTab] = useState("executive-summary");
    
    const reportSections = [
      { id: "executive-summary", title: "Executive Summary and Contents", automated: true },
      { id: "rpd-location", title: "RPD and Location", automated: true },
      { id: "legal-planning", title: "Legal and Planning", component: "PlanningDataIntegration" },
      { id: "property-details", title: "Property Details", component: "PropertyDetails" },
      { id: "tenancy-lease", title: "Tenancy Schedule/Lease Details", component: "TenancyScheduleLeaseDetails" },
      { id: "statutory", title: "Statutory Assessment", automated: true },
      { id: "market-commentary", title: "Market Commentary", automated: true },
      { id: "sales-evidence", title: "Sales Evidence", subtitle: "Commercial, Residential and Agricultural", component: "SalesEvidence" },
      { id: "leasing-evidence", title: "Leasing Evidence", subtitle: "Commercial, Residential and Agricultural", component: "LeasingEvidence" },
      { id: "risk-assessment", title: "Risk Assessment & Market Indicators", automated: true },
      { id: "valuation-analysis", title: "Valuation Analysis and Rationale", component: "ValuationAnalysis" },
      { id: "marketability", title: "Marketability and Mortgage Security", automated: true },
      { id: "esg-assessment", title: "Sustaino Pro ESG Analysis", component: "SustainoProAnalysis" },
      { id: "valuation-certificate", title: "Valuation Certificate", component: "ValuationCertificate" },
      { id: "terms-conditions", title: "Terms and Conditions", component: "TermsAndConditions" }
    ];

    const getSectionContent = (sectionId: string) => {
      switch (sectionId) {
        case "executive-summary":
          return (
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Executive Summary</h4>
                <p className="text-gray-300 text-sm">
                  Professional valuation of {data.address} completed using direct comparison and income capitalisation methodologies. 
                  Market value assessed at ${data.mockData?.valuation?.marketValue || "2,450,000"} as at {new Date().toLocaleDateString()}.
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Key Findings</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Property type: {data.type}</li>
                  <li>• Building area: {data.mockData?.propertyDetails?.buildingArea || "1,250 sqm"}</li>
                  <li>• Market conditions: Stable with moderate growth</li>
                  <li>• Rental yield: {data.mockData?.income?.rentalYield || "6.2%"} per annum</li>
                </ul>
              </div>
            </div>
          );
        
        case "tenancy-lease":
          return (
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Lease Schedule</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left text-gray-300 p-2">Tenant</th>
                        <th className="text-left text-gray-300 p-2">Area (sqm)</th>
                        <th className="text-left text-gray-300 p-2">Rent (pa)</th>
                        <th className="text-left text-gray-300 p-2">Lease Expiry</th>
                        <th className="text-left text-gray-300 p-2">Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="text-white p-2">{data.type.includes('Healthcare') ? 'Medical Services Pty Ltd' : data.type.includes('Office') ? 'Corporate Services Ltd' : 'Primary Tenant Pty Ltd'}</td>
                        <td className="text-white p-2">{data.mockData?.propertyDetails?.buildingArea?.replace(' sqm', '') || '1,250'}</td>
                        <td className="text-white p-2">{data.mockData?.income?.annualRent || '$156,000'}</td>
                        <td className="text-white p-2">31/12/2027</td>
                        <td className="text-white p-2">2 x 5 years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case "sales-evidence":
          return (
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Sales Analysis</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left text-gray-300 p-2">Address</th>
                        <th className="text-left text-gray-300 p-2">Sale Price</th>
                        <th className="text-left text-gray-300 p-2">Date</th>
                        <th className="text-left text-gray-300 p-2">$/sqm</th>
                        <th className="text-left text-gray-300 p-2">Adjustments</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="text-white p-2">45 Commercial St, Melbourne</td>
                        <td className="text-white p-2">$2,300,000</td>
                        <td className="text-white p-2">15/08/2024</td>
                        <td className="text-white p-2">$1,840</td>
                        <td className="text-white p-2">+$150,000 (location)</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="text-white p-2">78 Business Ave, Fitzroy</td>
                        <td className="text-white p-2">$2,650,000</td>
                        <td className="text-white p-2">22/07/2024</td>
                        <td className="text-white p-2">$2,120</td>
                        <td className="text-white p-2">-$200,000 (condition)</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="text-white p-2">156 Property Rd, Richmond</td>
                        <td className="text-white p-2">$2,475,000</td>
                        <td className="text-white p-2">05/09/2024</td>
                        <td className="text-white p-2">$1,980</td>
                        <td className="text-white p-2">+$25,000 (timing)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case "leasing-evidence":
          return (
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Rental Evidence</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left text-gray-300 p-2">Address</th>
                        <th className="text-left text-gray-300 p-2">Rent (pa)</th>
                        <th className="text-left text-gray-300 p-2">Area (sqm)</th>
                        <th className="text-left text-gray-300 p-2">$/sqm</th>
                        <th className="text-left text-gray-300 p-2">Lease Term</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="text-white p-2">12 Health Plaza, Melbourne</td>
                        <td className="text-white p-2">$145,000</td>
                        <td className="text-white p-2">1,200</td>
                        <td className="text-white p-2">$121</td>
                        <td className="text-white p-2">5 + 5 years</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="text-white p-2">89 Medical Centre Dr, Fitzroy</td>
                        <td className="text-white p-2">$168,000</td>
                        <td className="text-white p-2">1,350</td>
                        <td className="text-white p-2">$124</td>
                        <td className="text-white p-2">7 years</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="text-white p-2">234 Business St, Richmond</td>
                        <td className="text-white p-2">$152,000</td>
                        <td className="text-white p-2">1,280</td>
                        <td className="text-white p-2">$119</td>
                        <td className="text-white p-2">6 + 3 years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );

        case "risk-assessment":
          return (
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Full Risk Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-300 mb-2">Market Risks</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Interest rate sensitivity: Medium</li>
                      <li>• Economic downturn impact: Low-Medium</li>
                      <li>• Supply oversaturation: Low</li>
                      <li>• Demand volatility: Low</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-300 mb-2">Property Risks</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Tenant concentration: Medium</li>
                      <li>• Lease rollover risk: Low</li>
                      <li>• Capital expenditure: Low-Medium</li>
                      <li>• Obsolescence risk: Low</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-300 mb-2">Location Risks</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Transport accessibility: Low risk</li>
                      <li>• Area gentrification: Positive</li>
                      <li>• Planning changes: Low risk</li>
                      <li>• Environmental factors: Low</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-300 mb-2">Financial Risks</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Cash flow stability: High</li>
                      <li>• Rent review structure: Favorable</li>
                      <li>• Covenant strength: Strong</li>
                      <li>• Liquidity risk: Low</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );

        default:
          return (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">{reportSections.find(s => s.id === sectionId)?.title}</h4>
              <p className="text-gray-300 text-sm">
                {reportSections.find(s => s.id === sectionId)?.automated 
                  ? "This section is automatically populated based on property data and market analysis."
                  : "This section contains detailed analysis and supporting documentation."}
              </p>
            </div>
          );
      }
    };

    return (
      <div className="space-y-6">
        {/* Property Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Complete Report - {data.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-300">Property Address</p>
                <p className="text-white font-medium">{data.address}</p>
              </div>
              <div>
                <p className="text-gray-300">Report Format</p>
                <p className="text-white font-medium">{data.reportFormat}</p>
              </div>
              <div>
                <p className="text-gray-300">Market Value</p>
                <p className="text-white font-medium">{data.mockData?.valuation?.marketValue || "$2,450,000"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Report Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 lg:grid-cols-5 gap-1 h-auto p-1 bg-gray-800">
                {reportSections.slice(0, 5).map((section) => (
                  <TabsTrigger 
                    key={section.id} 
                    value={section.id}
                    className="text-xs px-2 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 hover:text-white"
                  >
                    {section.title.length > 20 ? section.title.substring(0, 18) + '...' : section.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="mt-4 space-y-2">
                <div className="flex flex-wrap gap-1">
                  {reportSections.slice(5).map((section) => (
                    <Button 
                      key={section.id}
                      variant={activeTab === section.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab(section.id)}
                      className="text-xs"
                    >
                      {section.title.length > 25 ? section.title.substring(0, 23) + '...' : section.title}
                    </Button>
                  ))}
                </div>
              </div>

              {reportSections.map((section) => (
                <TabsContent key={section.id} value={section.id} className="mt-6">
                  {getSectionContent(section.id)}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Contradiction Checks */}
        {contradictions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-yellow-400">Contradiction Check Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contradictions.map((contradiction: any, index: number) => (
                  <div key={index} className={`p-4 rounded-lg ${
                    contradiction.type === 'Critical' ? 'bg-red-900/20 border border-red-500' : 'bg-yellow-900/20 border border-yellow-500'
                  }`}>
                    <div className="flex items-start gap-3">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        contradiction.type === 'Critical' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
                      }`}>
                        {contradiction.type}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{contradiction.section}</p>
                        <p className="text-sm text-gray-300 mt-1">{contradiction.issue}</p>
                        <p className="text-xs text-gray-400 mt-2">{contradiction.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Client Demo Platform</h1>
        <p className="text-muted-foreground">
          Comprehensive demonstration of our property valuation workflows with automated contradiction checking across ISFV, PAF, and ICV reports.
        </p>
      </div>

      {/* ISFV Section */}
      <div className="space-y-6">
        <div className="border-l-4 border-emerald-500 pl-4">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">Instant Short Form Valuation (ISFV)</h2>
          <p className="text-muted-foreground">Professional property valuation with integrated automation, Domain API, and risk analysis</p>
        </div>
        
        <ISFVPlatform />

        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800">ISFV Demo Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-emerald-700">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Select a demo property from the dropdown in the Automation Control Center</li>
              <li>Click "Run Full Automation" to trigger the automated valuation process</li>
              <li>Use "Run Contradiction Check" to validate report consistency for compliance</li>
              <li>Explore the different tabs to see automated content in each section</li>
              <li>Perfect for demonstrating rapid, automated property valuations with quality control</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* PAF Section */}
      <div className="space-y-6">
        <div className="border-l-4 border-blue-500 pl-4">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Property Assessment Forms (PAF)</h2>
          <p className="text-muted-foreground">Comprehensive property assessment with mixed asset types and report formats</p>
        </div>

        <Card className="bg-white border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Play className="h-5 w-5" />
              PAF Automation Control Center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="paf-demo-property">Demo Property</Label>
                <Select value={pafSelectedProperty} onValueChange={setPafSelectedProperty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select demo property..." />
                  </SelectTrigger>
                  <SelectContent>
                    {pafDemoProperties.map((property, index) => (
                      <SelectItem key={index} value={property.name}>
                        <div className="text-left">
                          <div className="font-medium">{property.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {property.type} • {property.reportType}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {pafSelectedProperty && (
                  <div className="text-xs text-muted-foreground p-2 bg-blue-50 rounded">
                    {pafDemoProperties.find(p => p.name === pafSelectedProperty)?.features}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="paf-custom-address">Property Address</Label>
                <Input
                  id="paf-custom-address"
                  value={pafCustomAddress}
                  onChange={(e) => setPafCustomAddress(e.target.value)}
                  placeholder="Or enter custom address..."
                  disabled={!!pafSelectedProperty}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handlePafAutomation}
                disabled={pafLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {pafLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Full Automation
                  </>
                )}
              </Button>

              <Button 
                variant="outline" 
                onClick={handlePafContradictionCheck}
                disabled={pafStatus !== "Complete"}
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Run Contradiction Check
              </Button>

              <Button variant="ghost" onClick={clearPafData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-sm">Status:</span>
              <span className={`text-sm ${pafStatus === "Complete" ? "text-green-600" : "text-blue-600"}`}>
                {pafStatus}
              </span>
              {pafStatus === "Complete" && <CheckCircle className="h-4 w-4 text-green-600" />}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">PAF Demo Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Choose from diverse property types including childcare, healthcare, development sites, and agricultural assets</li>
              <li>Experience different report formats: Long Form, Short Form, and Sustino Pro reports</li>
              <li>Run full automation to see comprehensive property assessment workflows</li>
              <li>Validate data consistency with integrated contradiction checking</li>
              <li>Ideal for demonstrating versatile assessment capabilities across asset classes</li>
            </ol>
          </CardContent>
        </Card>

        {/* PAF Report Sections */}
        {pafReportData && (
          <div className="mt-6">
            <FullReportTabs 
              data={pafReportData} 
              contradictions={pafContradictions} 
            />
          </div>
        )}
      </div>

      {/* ICV Section */}
      <div className="space-y-6">
        <div className="border-l-4 border-purple-500 pl-4">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">Insurance & Commercial Valuations (ICV)</h2>
          <p className="text-muted-foreground">Specialized insurance and commercial valuations for complex asset portfolios</p>
        </div>

        <Card className="bg-white border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Play className="h-5 w-5" />
              ICV Automation Control Center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="icv-demo-property">Demo Property</Label>
                <Select value={icvSelectedProperty} onValueChange={setIcvSelectedProperty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select demo property..." />
                  </SelectTrigger>
                  <SelectContent>
                    {icvDemoProperties.map((property, index) => (
                      <SelectItem key={index} value={property.name}>
                        <div className="text-left">
                          <div className="font-medium">{property.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {property.type} • {property.reportType}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {icvSelectedProperty && (
                  <div className="text-xs text-muted-foreground p-2 bg-purple-50 rounded">
                    {icvDemoProperties.find(p => p.name === icvSelectedProperty)?.features}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="icv-custom-address">Property Address</Label>
                <Input
                  id="icv-custom-address"
                  value={icvCustomAddress}
                  onChange={(e) => setIcvCustomAddress(e.target.value)}
                  placeholder="Or enter custom address..."
                  disabled={!!icvSelectedProperty}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleIcvAutomation}
                disabled={icvLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {icvLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Full Automation
                  </>
                )}
              </Button>

              <Button 
                variant="outline" 
                onClick={handleIcvContradictionCheck}
                disabled={icvStatus !== "Complete"}
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Run Contradiction Check
              </Button>

              <Button variant="ghost" onClick={clearIcvData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-sm">Status:</span>
              <span className={`text-sm ${icvStatus === "Complete" ? "text-green-600" : "text-purple-600"}`}>
                {icvStatus}
              </span>
              {icvStatus === "Complete" && <CheckCircle className="h-4 w-4 text-green-600" />}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">ICV Demo Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-purple-700">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Explore commercial and insurance valuations for retail, industrial, and mixed-use properties</li>
              <li>Experience specialized workflows for healthcare facilities and office towers</li>
              <li>See automated insurance value calculations and commercial assessment processes</li>
              <li>Validate complex valuation scenarios with contradiction checking</li>
              <li>Perfect for showcasing advanced commercial and insurance valuation capabilities</li>
            </ol>
          </CardContent>
        </Card>

        {/* ICV Report Sections */}
        {icvReportData && (
          <div className="mt-6">
            <FullReportTabs 
              data={icvReportData} 
              contradictions={icvContradictions} 
            />
          </div>
        )}
      </div>

      {/* Overall Demo Summary */}
      <Card className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">Complete Demo Platform Overview</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">ISFV</div>
              <p className="text-sm">Rapid property valuations with Domain API integration</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">PAF</div>
              <p className="text-sm">Comprehensive assessments across diverse asset classes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">ICV</div>
              <p className="text-sm">Specialized insurance and commercial valuations</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white/70 rounded-lg">
            <p className="text-sm text-center font-medium">
              All platforms feature automated contradiction checking, ensuring report consistency and compliance across all valuation types.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}