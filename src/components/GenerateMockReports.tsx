import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Play, RefreshCw, Wrench } from 'lucide-react';
import { toast } from 'sonner';
import ISFVPlatform from './ISFVPlatform';
import { checkReportContradictions } from '@/utils/reportContradictionChecker';
import { runAutomatedAmendment } from '@/utils/contradictionAmender';

// Complete comprehensive mock data for ALL report types with EVERY tab filled

// ISFV Demo Properties - COMPLETE WITH ALL TABS
const isfvDemoProperties = [
  {
    name: "Luxury Apartment Complex - St Kilda",
    address: "88 Marine Parade, St Kilda VIC 3182",
    type: "Residential Property Valuation",
    reportType: "Long Form Property Valuation",
    features: "Harbor views, premium finishes, rooftop terrace, 45 luxury units",
    mockData: {
      // Executive Summary - COMPLETE
      executiveSummary: {
        propertyType: "Luxury Residential Apartment Complex",
        marketValue: "$18,750,000",
        valuationDate: "September 2024",
        purposeOfValuation: "Market Valuation for Portfolio Assessment",
        keyFindings: [
          "Premium waterfront location commands significant market premium",
          "Strong rental demand from young professionals and downsizers",
          "Limited comparable sales due to unique harbor frontage position",
          "Building quality and amenities justify above-market pricing"
        ],
        marketConditions: "Stable growth in premium residential sector with strong demand",
        riskRating: "Medium",
        confidence: "High"
      },
      // Property Details - COMPLETE
      propertyDetails: {
        landArea: "2,850 sqm",
        buildingArea: "12,500 sqm (45 apartments)",
        yearBuilt: "2019",
        zoning: "Residential Growth Zone",
        owner: "Marine Holdings Pty Ltd",
        title: "Crown Allotment 78, Section B",
        council: "Port Phillip City Council",
        improvements: "5-storey luxury apartment building with basement parking",
        carParking: "90 spaces (2 per apartment)",
        facilities: "Rooftop terrace, gym, concierge, swimming pool",
        constructionType: "Reinforced concrete with glass facade",
        floorPlate: "Variable 220-350 sqm per floor",
        apartmentMix: "25x 2BR, 15x 3BR, 5x penthouse",
        balconies: "All units have private balconies 8-25 sqm"
      },
      // Location Analysis - COMPLETE
      locationAnalysis: {
        address: "88 Marine Parade, St Kilda VIC 3182",
        suburb: "St Kilda",
        postcode: "3182",
        coordinates: "-37.8676, 144.9734",
        proximity: {
          cbd: "6.2km",
          airport: "28km",
          trainStation: "St Kilda Station - 450m",
          shops: "Acland Street shopping - 200m",
          schools: "St Kilda Primary - 300m, Elwood College - 1.2km"
        },
        transport: "Excellent public transport with train and tram networks",
        amenities: "Beach frontage, Luna Park, restaurants, nightlife",
        demographics: "Mix of young professionals, tourists, and retirees",
        futureInfrastructure: "Planned beach foreshore upgrades"
      },
      // Valuation Summary - COMPLETE
      valuation: {
        marketValue: "$18,750,000",
        landValue: "$8,500,000",
        improvementValue: "$10,250,000",
        valuationDate: "September 2024",
        valuationMethod: "Direct Comparison & Income Capitalisation",
        capitalisationRate: "3.85%",
        marketConditions: "Premium residential market showing steady growth",
        valuePerSqm: "$1,500/sqm GFA",
        valuePerUnit: "$416,667 average",
        landRate: "$2,982/sqm",
        depreciationRate: "2.5% per annum"
      },
      // Income Analysis - COMPLETE
      income: {
        grossIncome: "$1,650,000 p.a.",
        operatingExpenses: "$485,000 p.a.",
        netIncome: "$1,165,000 p.a.",
        yieldRate: "3.85%",
        weeklyRent: "$31,731 (total building)",
        averageUnitRent: "$705/week",
        occupancyRate: "97.8%",
        bodyCorporate: "$125,000 p.a.",
        managementFees: "$82,500 p.a.",
        insurance: "$45,000 p.a.",
        maintenance: "$95,000 p.a.",
        councilRates: "$28,500 p.a.",
        utilities: "$35,000 p.a.",
        vacancy: "2.2%",
        rentGrowth: "3.5% per annum projected"
      },
      // Sales Evidence - COMPLETE
      salesEvidence: [
        { address: "92 Fitzroy Street, St Kilda", price: "$16,200,000", date: "Jun 2024", size: "11,800 sqm", rate: "$1,373/sqm", units: "42 apartments", vendor: "Private developer", purchaser: "REIT", settlement: "45 days", conditions: "Subject to DA" },
        { address: "156 Acland Street, St Kilda", price: "$21,500,000", date: "Aug 2024", size: "14,200 sqm", rate: "$1,514/sqm", units: "52 apartments", vendor: "Listed company", purchaser: "Private investor", settlement: "30 days", conditions: "Unconditional" },
        { address: "234 Barkly Street, St Kilda", price: "$17,800,000", date: "Jul 2024", size: "12,100 sqm", rate: "$1,471/sqm", units: "44 apartments", vendor: "Family trust", purchaser: "Superannuation fund", settlement: "60 days", conditions: "Finance approved" }
      ],
      // Rental Evidence - COMPLETE
      rentalEvidence: [
        { address: "Unit 12/95 Fitzroy Street, St Kilda", rent: "$750/week", bedrooms: "2", bathrooms: "2", size: "85 sqm", rate: "$459/sqm p.a.", parking: "1 space", lease: "12 months", tenant: "Professional couple" },
        { address: "Unit 8/145 Acland Street, St Kilda", rent: "$820/week", bedrooms: "2", bathrooms: "2", size: "92 sqm", rate: "$464/sqm p.a.", parking: "1 space", lease: "24 months", tenant: "Executive" },
        { address: "Unit 5/78 Barkly Street, St Kilda", rent: "$680/week", bedrooms: "2", bathrooms: "1", size: "78 sqm", rate: "$454/sqm p.a.", parking: "1 space", lease: "12 months", tenant: "Young professional" }
      ],
      // Risk Assessment - COMPLETE
      riskFactors: [
        "Premium market volatility",
        "High body corporate costs",
        "Coastal erosion concerns",
        "Tourism dependency for short-term rental income",
        "Oversupply in luxury apartment segment"
      ],
      riskAnalysis: {
        marketRisk: "Medium - Premium market subject to economic cycles",
        locationRisk: "Low - Established beachside location",
        propertyRisk: "Low - Modern construction and quality amenities",
        tenancyRisk: "Medium - Dependent on premium rental market",
        liquidityRisk: "Medium - Limited buyer pool for high-value assets",
        overallRisk: "Medium",
        mitigation: [
          "Diversified apartment mix appeals to various demographics",
          "Strong rental demand from multiple sources",
          "Premium location provides capital protection"
        ]
      },
      // Market Analysis - COMPLETE
      marketAnalysis: {
        vacancy: "2.2%",
        medianRent: "$705/week",
        capitalGrowth: "6.2% p.a. (5 year average)",
        demographicTrends: "Young professionals and downsizers",
        futureSupply: "Limited due to heritage overlay restrictions",
        marketTrends: [
          "Increasing demand for luxury apartments with amenities",
          "Shift towards work-from-home driving apartment feature demands",
          "Waterfront properties outperforming broader market"
        ],
        competitiveAnalysis: "Limited direct competition due to unique harbor frontage",
        priceMovement: "+12.5% over past 24 months"
      },
      // Legal and Planning - COMPLETE
      legalPlanning: {
        zoning: "Residential Growth Zone",
        overlay: "Heritage Overlay HO250",
        permits: "Planning permit PP2018-3456 for apartment development",
        restrictions: "Height restrictions to 5 storeys",
        easements: "Drainage easement along southern boundary",
        covenants: "Building covenant requiring architectural approval",
        futureZoning: "No planned changes",
        developmentPotential: "Fully developed to maximum potential"
      }
    }
  },
  {
    name: "Boutique Hotel - Daylesford",
    address: "25 Vincent Street, Daylesford VIC 3460",
    type: "Hospitality Property Valuation",
    reportType: "Sustino Pro Property Valuation",
    features: "15 luxury rooms, spa facilities, restaurant, conference center, heritage building",
    mockData: {
      executiveSummary: {
        propertyType: "Heritage Boutique Hotel & Spa",
        marketValue: "$8,750,000",
        valuationDate: "September 2024",
        purposeOfValuation: "Acquisition Finance Assessment",
        keyFindings: [
          "Heritage character provides unique market position",
          "Strong spa and wellness tourism demand in region",
          "Established restaurant and conference facilities add revenue diversity",
          "Seasonal variations require active management"
        ],
        marketConditions: "Regional hospitality recovering with strong domestic tourism",
        riskRating: "Medium-High",
        confidence: "Medium"
      },
      propertyDetails: {
        landArea: "4,250 sqm",
        buildingArea: "2,850 sqm (3 levels)",
        yearBuilt: "1898 (restored 2016)",
        zoning: "Commercial 1 Zone",
        owner: "Daylesford Hospitality Group Pty Ltd",
        title: "Crown Allotment 12, Section 15",
        council: "Hepburn Shire Council",
        improvements: "Heritage hotel with modern amenities, spa, restaurant",
        carParking: "35 spaces including coach parking",
        heritage: "Listed on Victorian Heritage Register",
        rooms: "15 luxury suites (12-45 sqm)",
        facilities: "Day spa (8 treatment rooms), restaurant (80 seats), conference room (50 capacity)",
        services: "Concierge, valet parking, room service, spa treatments"
      },
      locationAnalysis: {
        address: "25 Vincent Street, Daylesford VIC 3460",
        suburb: "Daylesford",
        postcode: "3460",
        coordinates: "-37.3476, 144.1434",
        proximity: {
          melbourne: "108km",
          ballarat: "45km",
          hepburnSprings: "4km",
          lake: "Daylesford Lake - 800m"
        },
        attractions: "Mineral springs, spa country, wineries, markets",
        accessibility: "Direct road access via Midland Highway",
        tourism: "Peak destination for wellness and weekend retreats"
      },
      valuation: {
        marketValue: "$8,750,000",
        landValue: "$2,850,000",
        improvementValue: "$5,900,000",
        valuationDate: "September 2024",
        valuationMethod: "Income Capitalisation & Direct Comparison",
        capitalisationRate: "7.25%",
        marketConditions: "Regional hospitality market recovering post-COVID",
        valuePerRoom: "$583,333",
        valuePerSqm: "$3,070",
        landRate: "$671/sqm"
      },
      income: {
        grossIncome: "$2,150,000 p.a.",
        operatingExpenses: "$1,285,000 p.a.",
        netIncome: "$865,000 p.a.",
        yieldRate: "7.25%",
        occupancyRate: "78.5%",
        averageRoomRate: "$320/night",
        restaurantRevenue: "$485,000 p.a.",
        spaRevenue: "$285,000 p.a.",
        conferenceRevenue: "$125,000 p.a.",
        roomRevenue: "$1,255,000 p.a.",
        seasonality: "Peak: Oct-Apr, Low: May-Sep",
        expenseBreakdown: {
          staff: "$485,000",
          utilities: "$125,000",
          maintenance: "$185,000",
          marketing: "$95,000",
          insurance: "$65,000",
          other: "$330,000"
        }
      },
      salesEvidence: [
        { address: "Historic Hotel, Beechworth", price: "$6,200,000", date: "Mar 2024", rooms: "12", rate: "$516,667/room", type: "Heritage hotel", vendor: "Family estate", conditions: "Business sale" },
        { address: "Spa Resort, Hepburn Springs", price: "$9,800,000", date: "Jun 2024", rooms: "18", rate: "$544,444/room", type: "Spa resort", vendor: "Corporate", conditions: "Going concern" },
        { address: "Boutique Inn, Maldon", price: "$4,950,000", date: "May 2024", rooms: "10", rate: "$495,000/room", type: "Historic inn", vendor: "Retirement sale", conditions: "Assets only" }
      ],
      rentalEvidence: [
        { property: "15-room hotel, Ballarat", income: "$795,000 p.a.", occupancy: "75%", rate: "$53,000/room p.a.", lease: "Management agreement", tenant: "Hotel operator" },
        { property: "12-room boutique hotel, Bendigo", income: "$685,000 p.a.", occupancy: "72%", rate: "$57,083/room p.a.", lease: "20-year lease", tenant: "Hospitality group" },
        { property: "20-room resort, Macedon", income: "$1,150,000 p.a.", occupancy: "80%", rate: "$57,500/room p.a.", lease: "15-year lease", tenant: "Resort operator" }
      ],
      riskFactors: [
        "Seasonal tourism dependency",
        "Economic downturn sensitivity",
        "Competition from larger chains",
        "Heritage building maintenance costs",
        "Regional market limitations",
        "Staff recruitment challenges in regional areas"
      ],
      riskAnalysis: {
        marketRisk: "High - Dependent on discretionary tourism spending",
        locationRisk: "Medium - Established tourism destination",
        propertyRisk: "Medium - Heritage building requires ongoing maintenance",
        operationalRisk: "High - Hospitality business complexity",
        liquidityRisk: "High - Specialized property with limited buyer pool",
        overallRisk: "Medium-High",
        mitigation: [
          "Diversified revenue streams (rooms, spa, restaurant, events)",
          "Strong regional tourism brand recognition",
          "Heritage protection provides market differentiation"
        ]
      },
      marketAnalysis: {
        tourismTrends: "Regional tourism growing 8% annually",
        competitorAnalysis: "Limited luxury accommodation in immediate area",
        seasonality: "Peak: Spring/Summer, Low: Winter",
        targetMarket: "Wellness tourists, corporate retreats, special events",
        marketTrends: [
          "Growing demand for wellness and spa experiences",
          "Increase in regional staycations",
          "Corporate retreat market recovery"
        ],
        occupancyTrends: "Stable 75-85% during peak periods"
      },
      legalPlanning: {
        zoning: "Commercial 1 Zone",
        overlay: "Heritage Overlay HO45",
        permits: "Liquor license, tourism accommodation permit",
        restrictions: "Heritage building protection requirements",
        compliance: "Tourism industry accreditation, food safety permits",
        developmentPotential: "Limited expansion due to heritage constraints"
      }
    }
  },
  {
    name: "Industrial Facility - Geelong",
    address: "150 Corio Quay Road, North Geelong VIC 3215",
    type: "Industrial Property Valuation",
    reportType: "Short Form Property Valuation",
    features: "Manufacturing plant, rail access, port proximity, heavy machinery capability",
    mockData: {
      executiveSummary: {
        propertyType: "Heavy Industrial Manufacturing Facility",
        marketValue: "$15,250,000",
        valuationDate: "September 2024",
        purposeOfValuation: "Asset Valuation for Financial Reporting",
        keyFindings: [
          "Strategic location with port and rail access",
          "Specialized heavy manufacturing capability",
          "Strong single tenant with long-term lease",
          "Limited alternative use flexibility"
        ],
        marketConditions: "Industrial market strong with port proximity premium",
        riskRating: "Medium",
        confidence: "High"
      },
      propertyDetails: {
        landArea: "15,500 sqm",
        buildingArea: "8,750 sqm (single level)",
        yearBuilt: "2014",
        zoning: "Industrial 1 Zone - Heavy Industry",
        owner: "Geelong Manufacturing Co. Pty Ltd",
        title: "Lot 45, Plan of Subdivision 895647",
        council: "City of Greater Geelong",
        improvements: "Steel frame manufacturing facility with overhead cranes",
        carParking: "85 spaces including truck loading",
        infrastructure: "Three-phase power, gas, water, rail siding",
        craneCapacity: "50 tonne overhead crane system",
        clearance: "12 meter clear internal height",
        loading: "8 dock doors, 2 drive-through bays"
      },
      locationAnalysis: {
        address: "150 Corio Quay Road, North Geelong VIC 3215",
        suburb: "North Geelong",
        postcode: "3215",
        coordinates: "-38.1076, 144.3644",
        proximity: {
          portOfGeelong: "2.5km",
          melbourne: "75km",
          railTerminal: "On-site siding",
          highway: "Princes Freeway - 3km"
        },
        transport: "Direct rail to Port of Melbourne, road freight access",
        utilities: "High voltage power, natural gas, industrial water",
        workforce: "Established industrial employment base"
      },
      valuation: {
        marketValue: "$15,250,000",
        landValue: "$6,750,000",
        improvementValue: "$8,500,000",
        valuationDate: "September 2024",
        valuationMethod: "Direct Comparison & Cost Approach",
        capitalisationRate: "6.85%",
        marketConditions: "Strong demand for industrial facilities with port access",
        valuePerSqm: "$1,743",
        landRate: "$435/sqm",
        improvementRate: "$971/sqm"
      },
      income: {
        grossIncome: "$1,485,000 p.a.",
        operatingExpenses: "$285,000 p.a.",
        netIncome: "$1,200,000 p.a.",
        yieldRate: "6.85%",
        weeklyRent: "$28,558",
        leaseExpiry: "31/03/2029",
        tenantName: "Advanced Manufacturing Pty Ltd",
        leaseTerm: "10 years",
        rentReviews: "CPI or 3% annually (whichever is greater)",
        expenseBreakdown: {
          councilRates: "$85,000",
          insurance: "$45,000",
          maintenance: "$125,000",
          management: "$30,000"
        }
      },
      salesEvidence: [
        { address: "234 Settlement Road, Thomastown", price: "$12,500,000", date: "Apr 2024", size: "7,200 sqm", rate: "$1,736/sqm", type: "Manufacturing", vendor: "Private", settlement: "90 days" },
        { address: "567 Boundary Road, Laverton North", price: "$18,750,000", date: "Jun 2024", size: "10,500 sqm", rate: "$1,786/sqm", type: "Logistics", vendor: "Fund", settlement: "45 days" },
        { address: "890 Coode Island Road, South Melbourne", price: "$14,200,000", date: "May 2024", size: "8,100 sqm", rate: "$1,753/sqm", type: "Industrial", vendor: "Company", settlement: "60 days" }
      ],
      rentalEvidence: [
        { address: "345 Dynon Road, West Melbourne", rent: "$24,500/week", size: "7,800 sqm", rate: "$163/sqm p.a.", lease: "7 years", tenant: "Manufacturing co" },
        { address: "678 Somerville Road, Footscray", rent: "$32,800/week", size: "9,200 sqm", rate: "$186/sqm p.a.", lease: "10 years", tenant: "Logistics firm" },
        { address: "123 Sunshine Road, Sunshine", rent: "$22,100/week", size: "7,400 sqm", rate: "$155/sqm p.a.", lease: "5 years", tenant: "Distribution" }
      ],
      riskFactors: [
        "Manufacturing sector volatility",
        "Environmental compliance costs",
        "Transportation infrastructure dependency",
        "Specialized equipment obsolescence",
        "Single tenant dependency",
        "Heavy industry regulatory changes"
      ],
      riskAnalysis: {
        marketRisk: "Medium - Industrial demand stable with economic cycles",
        locationRisk: "Low - Strategic port location",
        propertyRisk: "Low - Modern facility with good infrastructure",
        tenancyRisk: "Medium - Single tenant dependency",
        liquidityRisk: "Medium - Specialized industrial property",
        overallRisk: "Medium"
      },
      marketAnalysis: {
        industrialVacancy: "3.2%",
        portProximityPremium: "15-20% above standard industrial",
        futureDevelopment: "Port expansion planned for 2026",
        transportLinks: "Direct rail to Port of Melbourne and Adelaide",
        demandDrivers: [
          "Manufacturing industry growth",
          "Export logistics demand",
          "Limited available industrial land"
        ]
      },
      legalPlanning: {
        zoning: "Industrial 1 Zone",
        permits: "EPA works approval, dangerous goods license",
        restrictions: "Heavy industry operations permitted",
        compliance: "Environmental monitoring, workplace safety",
        developmentPotential: "Additional workshop space possible"
      }
    }
  },
  {
    name: "Student Accommodation - Carlton",
    address: "456 Swanston Street, Carlton VIC 3053",
    type: "Student Accommodation Property Valuation",
    reportType: "Long Form Property Valuation",
    features: "250 student beds, study facilities, common areas, security",
    mockData: {
      executiveSummary: {
        propertyType: "Purpose-Built Student Accommodation",
        marketValue: "$95,000,000",
        valuationDate: "September 2024",
        purposeOfValuation: "Investment Portfolio Assessment",
        keyFindings: [
          "Premium location near University of Melbourne",
          "Purpose-built design maximizes rental income",
          "Strong institutional demand for student accommodation assets",
          "Stable cash flows from academic year leasing cycles"
        ],
        marketConditions: "Student accommodation sector showing strong institutional investment",
        riskRating: "Medium",
        confidence: "High"
      },
      propertyDetails: {
        landArea: "3,850 sqm",
        buildingArea: "15,600 sqm (8 levels)",
        yearBuilt: "2018",
        zoning: "Residential Growth Zone",
        owner: "Student Living Holdings Pty Ltd",
        title: "Crown Allotment 89, Section C",
        council: "City of Melbourne",
        improvements: "Purpose-built student accommodation with 250 beds",
        carParking: "25 bicycle spaces, limited car parking",
        facilities: "Study rooms, gym, communal kitchens, laundry, security",
        roomTypes: "180 single rooms, 35 shared apartments, 35 studio units",
        amenities: "24/7 security, WiFi, utilities included, social spaces"
      },
      locationAnalysis: {
        address: "456 Swanston Street, Carlton VIC 3053",
        suburb: "Carlton",
        postcode: "3053",
        coordinates: "-37.8014, 144.9658",
        proximity: {
          universityOfMelbourne: "400m",
          rmit: "1.2km",
          cbd: "2.5km",
          royalMelbourneHospital: "600m"
        },
        transport: "Excellent tram network, cycling paths",
        amenities: "Lygon Street restaurants, Carlton Gardens, libraries",
        studentServices: "University support services nearby"
      },
      valuation: {
        marketValue: "$95,000,000",
        landValue: "$32,000,000",
        improvementValue: "$63,000,000",
        valuationDate: "September 2024",
        valuationMethod: "Income Capitalisation Method",
        capitalisationRate: "4.75%",
        marketConditions: "Strong institutional demand for student accommodation assets",
        valuePerBed: "$380,000",
        valuePerSqm: "$6,090",
        landRate: "$8,312/sqm"
      },
      income: {
        grossIncome: "$12,850,000 p.a.",
        operatingExpenses: "$4,250,000 p.a.",
        netIncome: "$8,600,000 p.a.",
        yieldRate: "4.75%",
        occupancyRate: "96.5%",
        averageWeeklyRent: "$485/bed",
        totalBeds: "250",
        contractLength: "Academic year (40 weeks)",
        incomeBreakdown: {
          accommodation: "$10,500,000",
          parking: "$125,000",
          laundry: "$85,000",
          other: "$140,000"
        },
        expenseBreakdown: {
          management: "$950,000",
          maintenance: "$850,000",
          utilities: "$750,000",
          insurance: "$425,000",
          security: "$650,000",
          other: "$625,000"
        }
      },
      salesEvidence: [
        { address: "Student Lodge, Parkville", price: "$78,000,000", date: "Feb 2024", beds: "200", rate: "$390,000/bed", vendor: "Developer", purchaser: "REIT" },
        { address: "University Residence, Southbank", price: "$125,000,000", date: "May 2024", beds: "320", rate: "$390,625/bed", vendor: "Fund", purchaser: "Institution" },
        { address: "Campus Living, Richmond", price: "$65,000,000", date: "Mar 2024", beds: "180", rate: "$361,111/bed", vendor: "Private", purchaser: "Fund" }
      ],
      rentalEvidence: [
        { property: "Studio apartments near Melbourne Uni", rent: "$450-520/week", size: "Single bed studio", location: "Parkville", facilities: "Shared common areas" },
        { property: "Student housing, RMIT precinct", rent: "$480-550/week", size: "Shared facilities", location: "City", facilities: "24/7 security" },
        { property: "Purpose-built student accommodation", rent: "$465-495/week", size: "En-suite rooms", location: "Carlton", facilities: "Full service" }
      ],
      riskFactors: [
        "Student enrollment fluctuations",
        "International student visa policy changes",
        "Competition from new purpose-built facilities",
        "Seasonal occupancy variations",
        "Regulatory changes in student accommodation sector"
      ],
      riskAnalysis: {
        marketRisk: "Medium - Dependent on university enrollment",
        locationRisk: "Low - Premium university precinct",
        propertyRisk: "Low - Purpose-built modern facility",
        tenancyRisk: "Medium - Student demographic turnover",
        liquidityRisk: "Low - Strong institutional demand",
        overallRisk: "Medium"
      },
      marketAnalysis: {
        studentPopulation: "University of Melbourne: 47,000 students",
        accommodationDemand: "15,000 beds required annually",
        currentSupply: "12,500 purpose-built beds",
        supplyGap: "2,500 beds shortfall",
        internationalStudents: "35% of total enrollment",
        marketTrends: [
          "Growing international student numbers",
          "Demand for premium purpose-built accommodation",
          "Institutional investment in student housing sector"
        ]
      },
      legalPlanning: {
        zoning: "Residential Growth Zone",
        permits: "Student accommodation permit",
        restrictions: "Student use only, maximum 300 beds",
        compliance: "Fire safety, disability access, student housing code",
        developmentPotential: "Potential for additional floors subject to planning"
      }
    }
  }
];

// PAF Demo Properties with comprehensive mock data - PROPERTY VALUATIONS ONLY
const pafDemoProperties = [
  {
    name: "Childcare Centre - Melbourne CBD",
    address: "123 Collins Street, Melbourne VIC 3000",
    type: "Childcare Property Valuation",
    reportType: "Long Form Property Valuation",
    features: "150 child capacity, outdoor play areas, commercial kitchen",
    mockData: {
      executiveSummary: {
        propertyType: "Commercial Childcare Centre",
        marketValue: "$4,250,000",
        valuationDate: "September 2024",
        purposeOfValuation: "Market Valuation for Lending Security",
        keyFindings: [
          "Strong rental covenant from established operator",
          "Limited supply of licensed childcare facilities in CBD",
          "Specialized use provides both opportunity and constraint",
          "Regulatory environment stable for childcare operations"
        ],
        marketConditions: "Stable with moderate growth in childcare sector",
        riskRating: "Medium",
        confidence: "Medium"
      },
      propertyDetails: {
        landArea: "2,150 sqm",
        buildingArea: "1,800 sqm",
        yearBuilt: "2019",
        zoning: "Commercial 1 Zone",
        owner: "Little Learners Pty Ltd",
        title: "Crown Allotment 45, Section 12",
        council: "City of Melbourne",
        improvements: "Two-storey childcare facility with outdoor play areas",
        carParking: "25 spaces including staff and visitor parking",
        capacity: "150 children (licensed)",
        playAreas: "800 sqm outdoor play space",
        kitchenFacilities: "Commercial kitchen for meal preparation"
      },
      locationAnalysis: {
        address: "123 Collins Street, Melbourne VIC 3000",
        suburb: "Melbourne",
        postcode: "3000",
        coordinates: "-37.8136, 144.9631",
        proximity: {
          cbd: "Within CBD",
          trainStations: "Multiple within 500m",
          businesses: "Surrounded by office buildings",
          residential: "Southbank apartments 1km"
        },
        accessibility: "Excellent public transport and vehicle access",
        demographics: "High concentration of working families in vicinity"
      },
      valuation: {
        marketValue: "$4,250,000",
        landValue: "$2,800,000",
        improvementValue: "$1,450,000",
        valuationDate: "September 2024",
        valuationMethod: "Direct Comparison & Income Capitalisation",
        capitalisationRate: "6.35%",
        marketConditions: "Stable with moderate growth in childcare sector",
        valuePerSqm: "$2,361",
        landRate: "$1,302/sqm"
      },
      income: {
        grossIncome: "$980,000 p.a.",
        operatingExpenses: "$285,000 p.a.",
        netIncome: "$695,000 p.a.",
        yieldRate: "6.35%",
        weeklyRent: "$18,846",
        leaseExpiry: "31/12/2029",
        tenantName: "Little Learners Pty Ltd",
        leaseTerm: "10 years",
        rentReviews: "Annual CPI increases",
        expenseBreakdown: {
          councilRates: "$45,000",
          insurance: "$35,000",
          maintenance: "$125,000",
          management: "$80,000"
        }
      },
      salesEvidence: [
        { address: "456 Spencer Street, Melbourne", price: "$3,950,000", date: "Aug 2024", size: "1,650 sqm", rate: "$2,394/sqm", type: "Childcare", capacity: "135 children" },
        { address: "789 Elizabeth Street, Melbourne", price: "$4,580,000", date: "Jul 2024", size: "1,920 sqm", rate: "$2,385/sqm", type: "Childcare", capacity: "165 children" },
        { address: "321 Queen Street, Melbourne", price: "$3,750,000", date: "Sep 2024", size: "1,550 sqm", rate: "$2,419/sqm", type: "Childcare", capacity: "140 children" }
      ],
      rentalEvidence: [
        { address: "234 Bourke Street, Melbourne", rent: "$17,500/week", size: "1,680 sqm", rate: "$542/sqm p.a.", tenant: "Childcare operator", lease: "15 years" },
        { address: "567 Collins Street, Melbourne", rent: "$19,200/week", size: "1,850 sqm", rate: "$540/sqm p.a.", tenant: "National chain", lease: "20 years" },
        { address: "890 Flinders Street, Melbourne", rent: "$16,800/week", size: "1,620 sqm", rate: "$539/sqm p.a.", tenant: "Private operator", lease: "10 years" }
      ],
      riskFactors: [
        "High regulatory compliance requirements",
        "Specialized use limits market appeal", 
        "Dependent on license retention",
        "Limited tenant pool for childcare facilities"
      ],
      riskAnalysis: {
        marketRisk: "Medium - Stable demand for childcare services",
        locationRisk: "Low - CBD location with good accessibility",
        propertyRisk: "Medium - Specialized building design",
        tenancyRisk: "Medium - Limited alternative tenant pool",
        liquidityRisk: "Medium - Specialized property type",
        overallRisk: "Medium"
      },
      marketAnalysis: {
        demandDrivers: [
          "Growing working parent population in CBD",
          "Limited supply of licensed facilities",
          "Government childcare subsidies supporting sector"
        ],
        supplyConstraints: "Zoning and licensing requirements limit new supply",
        competitivePosition: "Strong due to location and capacity"
      },
      legalPlanning: {
        zoning: "Commercial 1 Zone",
        permits: "Childcare license CC2019-456",
        restrictions: "Childcare use only, maximum 150 children",
        compliance: "Department of Education oversight, safety standards",
        developmentPotential: "Limited due to current use optimization"
      }
    }
  },
  {
    name: "Apple Orchard - Yarra Valley", 
    address: "1247 Melba Highway, Dixons Creek VIC 3775",
    type: "Agricultural Property Valuation",
    reportType: "Sustino Pro Property Valuation",
    features: "50 hectares, irrigation system, processing facility",
    mockData: {
      executiveSummary: {
        propertyType: "Commercial Apple Orchard & Processing Facility",
        marketValue: "$8,750,000",
        valuationDate: "September 2024",
        purposeOfValuation: "Acquisition Assessment",
        keyFindings: [
          "Premium apple growing region with established brand",
          "Modern irrigation and processing infrastructure",
          "Diversified income from fruit sales and processing",
          "Climate change risks require ongoing adaptation"
        ],
        marketConditions: "Strong demand for premium agricultural land",
        riskRating: "Medium-High",
        confidence: "Medium"
      },
      propertyDetails: {
        landArea: "50 hectares (500,000 sqm)",
        buildingArea: "850 sqm (processing facility)",
        yearBuilt: "2015 (facility), 1995 (orchard)",
        zoning: "Farming Zone",
        owner: "Dixons Creek Orchards Ltd",
        title: "Crown Portion 245",
        council: "Yarra Ranges Shire",
        improvements: "Apple orchard, processing facility, irrigation system",
        waterRights: "15ML annual allocation",
        varieties: "Pink Lady, Gala, Granny Smith, Fuji",
        trees: "Approximately 12,500 mature apple trees",
        irrigation: "Micro-spray system with automated controls"
      },
      locationAnalysis: {
        address: "1247 Melba Highway, Dixons Creek VIC 3775",
        suburb: "Dixons Creek",
        postcode: "3775",
        coordinates: "-37.3678, 145.4234",
        proximity: {
          melbourne: "65km",
          yarraValley: "Heart of region",
          processing: "On-site facility",
          markets: "Prahran Market 75km"
        },
        climate: "Cool climate ideal for apple production",
        soils: "Rich alluvial soils with good drainage",
        rainfall: "800mm annually plus irrigation"
      },
      valuation: {
        marketValue: "$8,750,000",
        landValue: "$6,200,000", 
        improvementValue: "$2,550,000",
        valuationDate: "September 2024",
        valuationMethod: "Comparable Sales & Income Approach",
        capitalisationRate: "4.85%",
        marketConditions: "Strong demand for premium agricultural land",
        valuePerHectare: "$175,000",
        landRate: "$124/sqm"
      },
      income: {
        grossIncome: "$1,450,000 p.a.",
        operatingExpenses: "$680,000 p.a.",
        netIncome: "$770,000 p.a.",
        yieldRate: "4.85%",
        cropYield: "450 tonnes annually",
        pricePerTonne: "$3,200",
        costPerHectare: "$13,600",
        incomeBreakdown: {
          applesSold: "$1,440,000",
          processing: "$10,000"
        },
        expenseBreakdown: {
          labor: "$285,000",
          irrigation: "$85,000",
          chemicals: "$125,000",
          maintenance: "$95,000",
          harvest: "$90,000"
        }
      },
      salesEvidence: [
        { address: "3456 Melba Highway, Coldstream", price: "$7,200,000", date: "Jun 2024", size: "42 hectares", rate: "$171,429/ha", type: "Apple orchard" },
        { address: "7890 Maroondah Highway, Healesville", price: "$9,800,000", date: "Aug 2024", size: "58 hectares", rate: "$169,000/ha", type: "Mixed orchard" },
        { address: "1234 Warburton Highway, Seville", price: "$6,500,000", date: "Jul 2024", size: "38 hectares", rate: "$171,053/ha", type: "Stone fruit" }
      ],
      rentalEvidence: [
        { property: "45ha apple orchard, Wandin", income: "$625,000 p.a.", rate: "$13,889/ha", lease: "Share farming", terms: "5 year agreement" },
        { property: "52ha mixed orchard, Silvan", income: "$780,000 p.a.", rate: "$15,000/ha", lease: "Cash rent", terms: "10 year lease" },
        { property: "38ha cherry orchard, Coldstream", income: "$570,000 p.a.", rate: "$15,000/ha", lease: "Management", terms: "Profit share" }
      ],
      riskFactors: [
        "Weather dependency affects yields",
        "Limited alternative use options",
        "Seasonal income variation",
        "Climate change impact on production"
      ],
      riskAnalysis: {
        marketRisk: "High - Agricultural commodity price volatility",
        locationRisk: "Low - Premium growing region",
        propertyRisk: "Medium - Weather and disease susceptibility",
        operationalRisk: "High - Specialized agricultural operation",
        liquidityRisk: "High - Limited buyer pool for operating orchards",
        overallRisk: "Medium-High"
      },
      marketAnalysis: {
        demandTrends: [
          "Premium fruit demand growing",
          "Direct marketing opportunities increasing",
          "Processing facilities add value"
        ],
        supplyFactors: "Limited new orchard development",
        priceOutlook: "Stable to improving for premium fruit"
      },
      legalPlanning: {
        zoning: "Farming Zone",
        waterRights: "15ML annual allocation transferable",
        permits: "Food processing license required",
        restrictions: "Minimum lot size 40 hectares",
        developmentPotential: "Value-add processing expansion possible"
      }
    }
  },
  {
    name: "Healthcare Clinic - Box Hill",
    address: "789 Whitehorse Road, Box Hill VIC 3128", 
    type: "Healthcare Property Valuation",
    reportType: "Short Form Property Valuation",
    features: "Medical suites, parking, specialist equipment",
    mockData: {
      executiveSummary: {
        propertyType: "Medical Centre & Specialist Suites",
        marketValue: "$2,850,000",
        valuationDate: "September 2024",
        purposeOfValuation: "Portfolio Valuation",
        keyFindings: [
          "Strong healthcare tenant with established practice",
          "Purpose-built medical facility with specialized infrastructure",
          "Stable income from healthcare professional tenants",
          "Limited alternative use due to medical fitout"
        ],
        marketConditions: "Steady demand for medical facilities",
        riskRating: "Low-Medium",
        confidence: "High"
      },
      propertyDetails: {
        landArea: "1,245 sqm",
        buildingArea: "980 sqm",
        yearBuilt: "2018",
        zoning: "Commercial 1 Zone",
        owner: "Eastern Health Services Pty Ltd",
        title: "Lot 15, Plan of Subdivision 845692",
        council: "Whitehorse City Council",
        improvements: "Single storey medical clinic with specialist suites",
        carParking: "18 spaces including disabled access",
        suites: "8 consultation rooms, 2 procedure rooms",
        equipment: "Basic medical equipment included in lease"
      },
      locationAnalysis: {
        address: "789 Whitehorse Road, Box Hill VIC 3128",
        suburb: "Box Hill",
        postcode: "3128",
        coordinates: "-37.8195, 145.1268",
        proximity: {
          boxHillHospital: "1.2km",
          trainStation: "Box Hill Station 800m", 
          shoppingCentre: "Box Hill Central 600m",
          schools: "Multiple schools within 2km"
        },
        accessibility: "Good public transport and parking",
        demographics: "Aging population with healthcare needs"
      },
      valuation: {
        marketValue: "$2,850,000",
        landValue: "$1,650,000",
        improvementValue: "$1,200,000",
        valuationDate: "September 2024",
        valuationMethod: "Direct Comparison Method",
        capitalisationRate: "6.15%",
        marketConditions: "Steady demand for medical facilities",
        valuePerSqm: "$2,908",
        landRate: "$1,325/sqm"
      },
      income: {
        grossIncome: "$485,000 p.a.",
        operatingExpenses: "$125,000 p.a.",
        netIncome: "$360,000 p.a.",
        yieldRate: "6.15%",
        weeklyRent: "$9,327",
        leaseExpiry: "30/06/2028",
        tenantName: "Eastern Health Services Pty Ltd",
        leaseTerm: "7 years",
        rentReviews: "3% annual increases",
        expenseBreakdown: {
          councilRates: "$28,500",
          insurance: "$25,000",
          maintenance: "$45,000",
          management: "$26,500"
        }
      },
      salesEvidence: [
        { address: "234 Whitehorse Road, Box Hill", price: "$2,650,000", date: "Jul 2024", size: "920 sqm", rate: "$2,880/sqm", type: "Medical centre" },
        { address: "567 Station Street, Box Hill", price: "$3,100,000", date: "Aug 2024", size: "1,050 sqm", rate: "$2,952/sqm", type: "Health clinic" },
        { address: "890 Elgar Road, Box Hill", price: "$2,450,000", date: "Jun 2024", size: "850 sqm", rate: "$2,882/sqm", type: "Medical suites" }
      ],
      rentalEvidence: [
        { address: "123 Burke Road, Camberwell", rent: "$8,500/week", size: "920 sqm", rate: "$481/sqm p.a.", tenant: "Medical practice", lease: "10 years" },
        { address: "456 Canterbury Road, Surrey Hills", rent: "$9,800/week", size: "1,050 sqm", rate: "$486/sqm p.a.", tenant: "Specialist clinic", lease: "7 years" },
        { address: "789 Toorak Road, Hawthorn", rent: "$8,200/week", size: "850 sqm", rate: "$502/sqm p.a.", tenant: "Allied health", lease: "5 years" }
      ],
      riskFactors: [
        "Tenant specialization limits appeal",
        "Equipment depreciation",
        "Healthcare regulation changes",
        "Single tenant dependency"
      ],
      riskAnalysis: {
        marketRisk: "Low - Healthcare demand stable",
        locationRisk: "Low - Established medical precinct",
        propertyRisk: "Medium - Specialized medical fitout",
        tenancyRisk: "Medium - Healthcare professional tenant",
        liquidityRisk: "Medium - Medical property niche market",
        overallRisk: "Low-Medium"
      },
      marketAnalysis: {
        healthcareTrends: [
          "Aging population driving demand",
          "Preventive healthcare focus",
          "Specialist services growth"
        ],
        competitivePosition: "Well-positioned in established medical hub",
        futureSupply: "Limited due to zoning constraints"
      },
      legalPlanning: {
        zoning: "Commercial 1 Zone",
        permits: "Medical practice permit required",
        compliance: "Health department regulations, disability access",
        restrictions: "Use class restrictions for medical use",
        developmentPotential: "Additional consulting rooms possible"
      }
    }
  }
];

// ICV Demo Properties with comprehensive mock data - PROPERTY VALUATIONS ONLY
const icvDemoProperties = [
  {
    name: "Retail Shopping Centre - Chadstone",
    address: "1341 Dandenong Road, Chadstone VIC 3148",
    type: "Retail Property Valuation",
    reportType: "Long Form Property Valuation",
    features: "Major shopping centre, 200+ stores, entertainment precinct",
    mockData: {
      executiveSummary: {
        propertyType: "Regional Shopping Centre",
        marketValue: "$1,100,000,000",
        valuationDate: "September 2024",
        purposeOfValuation: "Annual Portfolio Valuation",
        keyFindings: [
          "Dominant retail destination in southeast Melbourne",
          "Strong tenant mix with major anchors and specialty retailers",
          "Significant recent capital investment in entertainment precinct",
          "Resilient performance despite online retail competition"
        ],
        marketConditions: "Strong institutional demand for prime retail assets",
        riskRating: "Low-Medium",
        confidence: "High"
      },
      propertyDetails: {
        landArea: "45,000 sqm",
        buildingArea: "185,000 sqm (GLA)",
        yearBuilt: "1998 (major renovation 2019)",
        zoning: "Commercial 1 Zone",
        owner: "Vicinity Centres",
        title: "Crown Allotment 2, Section A",
        council: "Stonnington City Council",
        improvements: "Major regional shopping centre with entertainment precinct",
        carParking: "6,500 spaces across multiple levels",
        stores: "Over 200 retailers including major anchors",
        anchors: "Myer, David Jones, Coles, Woolworths, Target, Kmart"
      },
      locationAnalysis: {
        address: "1341 Dandenong Road, Chadstone VIC 3148",
        suburb: "Chadstone",
        postcode: "3148",
        coordinates: "-37.8856, 145.0847",
        proximity: {
          cbd: "12km southeast",
          chadstoneStation: "Adjacent",
          monashFreeway: "2km",
          airport: "25km"
        },
        catchment: "Primary: 350,000 people, Secondary: 750,000 people",
        accessibility: "Excellent road and public transport access",
        competition: "Southland 8km, Eastland 15km"
      },
      valuation: {
        marketValue: "$1,100,000,000",
        landValue: "$450,000,000",
        improvementValue: "$650,000,000",
        valuationDate: "September 2024",
        valuationMethod: "Income Capitalisation Method",
        capitalisationRate: "4.25%",
        marketConditions: "Strong institutional demand for prime retail assets",
        valuePerSqm: "$5,946",
        landRate: "$10,000/sqm"
      },
      income: {
        grossIncome: "$65,500,000 p.a.",
        operatingExpenses: "$18,750,000 p.a.",
        netIncome: "$46,750,000 p.a.",
        yieldRate: "4.25%",
        occupancyRate: "98.5%",
        averageRental: "$1,250/sqm p.a.",
        tenantMix: "Major retailers, specialty stores, food court, cinema",
        incomeBreakdown: {
          baseRent: "$45,500,000",
          percentageRent: "$8,500,000",
          carParking: "$3,200,000",
          advertising: "$2,800,000",
          other: "$5,500,000"
        },
        expenseBreakdown: {
          maintenance: "$8,500,000",
          utilities: "$4,200,000",
          security: "$2,100,000",
          marketing: "$1,800,000",
          other: "$2,150,000"
        }
      },
      salesEvidence: [
        { address: "Westfield Doncaster", price: "$725,000,000", date: "Mar 2024", size: "140,000 sqm", rate: "$5,179/sqm", vendor: "Westfield", purchaser: "Institutional fund" },
        { address: "Eastland Shopping Centre", price: "$520,000,000", date: "Jun 2024", size: "95,000 sqm", rate: "$5,474/sqm", vendor: "Private", purchaser: "REIT" },
        { address: "Box Hill Central", price: "$385,000,000", date: "Feb 2024", size: "75,000 sqm", rate: "$5,133/sqm", vendor: "Developer", purchaser: "Super fund" }
      ],
      rentalEvidence: [
        { tenant: "Major Department Store", rent: "$8,500,000 p.a.", size: "6,800 sqm", rate: "$1,250/sqm", lease: "20 years", location: "Anchor position" },
        { tenant: "Specialty Fashion Retailers", rent: "$18,500,000 p.a.", size: "12,400 sqm", rate: "$1,492/sqm", lease: "5-10 years", location: "Mall shops" },
        { tenant: "Food Court & Restaurants", rent: "$5,200,000 p.a.", size: "3,200 sqm", rate: "$1,625/sqm", lease: "10 years", location: "Food precinct" }
      ],
      riskFactors: [
        "Online retail competition impact",
        "Major tenant lease expiry risk",
        "Economic downturn sensitivity",
        "Consumer spending pattern changes"
      ],
      riskAnalysis: {
        marketRisk: "Medium - Retail sector facing online competition",
        locationRisk: "Low - Dominant regional position",
        propertyRisk: "Low - Quality asset with recent investment",
        tenancyRisk: "Medium - Mix of national and local tenants",
        liquidityRisk: "Low - Institutional grade asset",
        overallRisk: "Low-Medium"
      },
      marketAnalysis: {
        retailTrends: [
          "Experience-based retail growing",
          "Entertainment integration important",
          "Omnichannel retail strategies"
        ],
        catchmentGrowth: "Population growing 2.5% annually",
        competitivePosition: "Market leader in trade area",
        investmentActivity: "Strong institutional demand"
      },
      legalPlanning: {
        zoning: "Commercial 1 Zone",
        permits: "Retail development permit, liquor licenses",
        restrictions: "Floor space ratio limitations",
        compliance: "Retail tenancy laws, safety regulations",
        developmentPotential: "Mixed-use tower development possible"
      }
    }
  },
  {
    name: "Industrial Warehouse - Dandenong",
    address: "1455 South Gippsland Highway, Dandenong South VIC 3175",
    type: "Industrial Property Valuation",
    reportType: "Short Form Property Valuation",
    features: "Distribution centre, high clearance, loading docks",
    mockData: {
      executiveSummary: {
        propertyType: "Modern Distribution Centre",
        marketValue: "$42,500,000",
        valuationDate: "September 2024",
        purposeOfValuation: "Portfolio Assessment",
        keyFindings: [
          "Modern logistics facility with excellent specifications",
          "Strategic location in key industrial corridor",
          "Strong tenant covenant with long-term lease",
          "High demand for modern logistics facilities in area"
        ],
        marketConditions: "Strong demand for modern logistics facilities",
        riskRating: "Low",
        confidence: "High"
      },
      propertyDetails: {
        landArea: "28,500 sqm",
        buildingArea: "24,200 sqm",
        yearBuilt: "2020",
        zoning: "Industrial 1 Zone",
        owner: "Goodman Group",
        title: "Lot 1, Plan of Subdivision 422098",
        council: "Greater Dandenong City Council",
        improvements: "Modern distribution centre with cross-dock facility",
        carParking: "150 spaces including truck parking",
        clearance: "12.5m internal height",
        loadingDocks: "20 dock doors + 4 drive-through",
        racking: "Not included (tenant installation)"
      },
      locationAnalysis: {
        address: "1455 South Gippsland Highway, Dandenong South VIC 3175",
        suburb: "Dandenong South",
        postcode: "3175",
        coordinates: "-38.0234, 145.2134",
        proximity: {
          portOfMelbourne: "35km",
          melbourneAirport: "60km",
          monashFreeway: "8km",
          westgateFreeway: "45km"
        },
        logistics: "Prime logistics corridor with major distribution centres",
        workforce: "Large industrial employment base",
        transport: "Excellent road freight access"
      },
      valuation: {
        marketValue: "$42,500,000",
        landValue: "$18,750,000",
        improvementValue: "$23,750,000",
        valuationDate: "September 2024",
        valuationMethod: "Direct Comparison Method",
        capitalisationRate: "5.85%",
        marketConditions: "Strong demand for modern logistics facilities",
        valuePerSqm: "$1,756",
        landRate: "$658/sqm"
      },
      income: {
        grossIncome: "$2,850,000 p.a.",
        operatingExpenses: "$485,000 p.a.",
        netIncome: "$2,365,000 p.a.",
        yieldRate: "5.85%",
        weeklyRent: "$54,808",
        leaseExpiry: "30/06/2030",
        tenantName: "Major Logistics Company",
        leaseTerm: "12 years",
        rentReviews: "4% annual or CPI (whichever is greater)",
        expenseBreakdown: {
          councilRates: "$185,000",
          insurance: "$85,000",
          maintenance: "$125,000",
          management: "$90,000"
        }
      },
      salesEvidence: [
        { address: "789 Princes Highway, Dandenong", price: "$38,500,000", date: "May 2024", size: "22,000 sqm", rate: "$1,750/sqm", type: "Distribution", age: "2019" },
        { address: "456 Cheltenham Road, Keysborough", price: "$46,200,000", date: "Jul 2024", size: "26,800 sqm", rate: "$1,724/sqm", type: "Warehouse", age: "2021" },
        { address: "123 Boundary Road, Carrum Downs", price: "$35,750,000", date: "Jun 2024", size: "20,500 sqm", rate: "$1,744/sqm", type: "Logistics", age: "2018" }
      ],
      rentalEvidence: [
        { address: "567 Westall Road, Clayton South", rent: "$48,000/week", size: "20,000 sqm", rate: "$125/sqm p.a.", tenant: "3PL operator", lease: "10 years" },
        { address: "890 Heatherton Road, Springvale", rent: "$62,500/week", size: "25,000 sqm", rate: "$130/sqm p.a.", tenant: "Retailer DC", lease: "15 years" },
        { address: "234 Stud Road, Dandenong", rent: "$42,300/week", size: "18,500 sqm", rate: "$119/sqm p.a.", tenant: "Transport co", lease: "7 years" }
      ],
      riskFactors: [
        "Single tenant dependency",
        "Specialized racking equipment",
        "Location accessibility changes",
        "E-commerce logistics demand fluctuation"
      ],
      riskAnalysis: {
        marketRisk: "Low - Strong logistics demand",
        locationRisk: "Low - Established industrial corridor",
        propertyRisk: "Low - Modern purpose-built facility",
        tenancyRisk: "Medium - Single tenant dependency",
        liquidityRisk: "Low - High demand for quality logistics assets",
        overallRisk: "Low"
      },
      marketAnalysis: {
        logisticsTrends: [
          "E-commerce driving demand growth",
          "Modern facilities commanding premium",
          "Supply chain efficiency focus"
        ],
        vacancyRates: "Sub 2% for modern facilities",
        rentalGrowth: "5-7% annually for prime assets",
        investmentActivity: "Strong institutional demand"
      },
      legalPlanning: {
        zoning: "Industrial 1 Zone",
        permits: "Warehouse and distribution permit",
        restrictions: "Industrial use only",
        compliance: "Fire safety, environmental standards",
        developmentPotential: "Expansion possible subject to planning"
      }
    }
  },
  {
    name: "Mixed Use Development - Richmond",
    address: "425-439 Swan Street, Richmond VIC 3121",
    type: "Mixed Use Property Valuation",
    reportType: "Sustino Pro Property Valuation",
    features: "Retail ground floor, residential apartments, basement parking",
    mockData: {
      executiveSummary: {
        propertyType: "Mixed Use Development - Retail & Residential",
        marketValue: "$52,750,000",
        valuationDate: "September 2024",
        purposeOfValuation: "Development Finance Assessment",
        keyFindings: [
          "Prime Richmond location with strong retail and residential demand",
          "Diversified income from retail and residential tenancies",
          "Modern development with quality finishes",
          "Mixed use complexity requires specialized management"
        ],
        marketConditions: "Strong demand for quality mixed-use developments",
        riskRating: "Medium",
        confidence: "High"
      },
      propertyDetails: {
        landArea: "3,250 sqm",
        buildingArea: "18,500 sqm (total)",
        yearBuilt: "2021",
        zoning: "Mixed Use Zone",
        owner: "Swan Street Developments Pty Ltd",
        title: "Lot 12, Plan of Subdivision 995847",
        council: "Yarra City Council",
        improvements: "6-storey mixed use building",
        carParking: "125 spaces (basement levels 1 & 2)",
        retail: "15 ground floor tenancies (2,500 sqm)",
        residential: "85 apartments (16,000 sqm)"
      },
      locationAnalysis: {
        address: "425-439 Swan Street, Richmond VIC 3121",
        suburb: "Richmond",
        postcode: "3121",
        coordinates: "-37.8234, 144.9987",
        proximity: {
          cbd: "3.2km",
          richmondStation: "400m",
          swanStreet: "Heart of dining precinct",
          mcg: "1.5km"
        },
        demographics: "Young professionals and inner-city residents",
        amenities: "Restaurants, bars, shopping, entertainment",
        transport: "Excellent train and tram access"
      },
      valuation: {
        marketValue: "$52,750,000",
        landValue: "$18,500,000",
        improvementValue: "$34,250,000",
        valuationDate: "September 2024",
        valuationMethod: "Income Capitalisation & Direct Comparison",
        capitalisationRate: "4.95%",
        marketConditions: "Strong demand for quality mixed-use developments",
        valuePerSqm: "$2,851",
        landRate: "$5,692/sqm"
      },
      income: {
        grossIncome: "$4,250,000 p.a.",
        operatingExpenses: "$1,150,000 p.a.",
        netIncome: "$3,100,000 p.a.",
        yieldRate: "4.95%",
        retailIncome: "$1,450,000 p.a.",
        residentialIncome: "$2,650,000 p.a.",
        parkingIncome: "$150,000 p.a.",
        occupancyRetail: "95%",
        occupancyResidential: "97%",
        incomeBreakdown: {
          retail: "$1,450,000",
          residential: "$2,650,000",
          parking: "$150,000"
        },
        expenseBreakdown: {
          management: "$285,000",
          maintenance: "$325,000",
          insurance: "$125,000",
          utilities: "$195,000",
          other: "$220,000"
        }
      },
      salesEvidence: [
        { address: "Mixed use, Chapel Street, Prahran", price: "$45,000,000", date: "Apr 2024", size: "16,200 sqm", rate: "$2,778/sqm", units: "75", retail: "12 shops" },
        { address: "Mixed development, High Street, Armadale", price: "$38,500,000", date: "Jun 2024", size: "14,800 sqm", rate: "$2,601/sqm", units: "65", retail: "8 shops" },
        { address: "Mixed use, Burke Road, Camberwell", price: "$42,200,000", date: "May 2024", size: "15,500 sqm", rate: "$2,723/sqm", units: "70", retail: "10 shops" }
      ],
      rentalEvidence: [
        { address: "Ground retail, Chapel Street", rent: "$125,000 p.a.", size: "85 sqm", rate: "$1,471/sqm", type: "Fashion retail", lease: "5 years" },
        { address: "2BR apartment, Swan Street", rent: "$650/week", bedrooms: "2", size: "75 sqm", rate: "$451/sqm p.a.", lease: "12 months" },
        { address: "Restaurant, Bridge Road", rent: "$185,000 p.a.", size: "120 sqm", rate: "$1,542/sqm", type: "Food & beverage", lease: "7 years" }
      ],
      riskFactors: [
        "Mixed use complexity",
        "Residential market volatility",
        "Strata management challenges",
        "Retail tenancy management",
        "Different tenant requirements"
      ],
      riskAnalysis: {
        marketRisk: "Medium - Mixed use dependent on multiple markets",
        locationRisk: "Low - Prime inner-city location",
        propertyRisk: "Medium - Complex building management",
        tenancyRisk: "Medium - Diverse tenant base",
        liquidityRisk: "Medium - Specialized mixed-use asset",
        overallRisk: "Medium"
      },
      marketAnalysis: {
        mixedUseTrends: [
          "Growing demand for urban mixed-use",
          "Residential amenity drives retail success",
          "Transport accessibility crucial"
        ],
        residentialDemand: "Strong from young professionals",
        retailDemand: "Food & beverage performing well",
        futureSupply: "Limited mixed-use developments planned"
      },
      legalPlanning: {
        zoning: "Mixed Use Zone",
        permits: "Mixed use development permit",
        restrictions: "Building height and density controls",
        compliance: "Residential tenancy laws, retail lease legislation",
        developmentPotential: "Fully developed to planning limits"
      }
    }
  },
  {
    name: "Healthcare Hospital - Fitzroy",
    address: "250 Gertrude Street, Fitzroy VIC 3065",
    type: "Healthcare Property Valuation",
    reportType: "Long Form Property Valuation",
    features: "Private hospital, 150 beds, surgical suites, ICU",
    mockData: {
      executiveSummary: {
        propertyType: "Private Hospital & Medical Centre",
        marketValue: "$125,000,000",
        valuationDate: "September 2024",
        purposeOfValuation: "Asset Portfolio Valuation",
        keyFindings: [
          "Specialized healthcare facility with established operations",
          "Strong healthcare demand in inner Melbourne",
          "Significant capital investment in medical equipment",
          "Long-term lease to established hospital operator"
        ],
        marketConditions: "Healthcare property sector showing steady growth",
        riskRating: "Medium",
        confidence: "Medium"
      },
      propertyDetails: {
        landArea: "8,500 sqm",
        buildingArea: "28,500 sqm (5 levels)",
        yearBuilt: "2016",
        zoning: "Special Use Zone",
        owner: "Fitzroy Private Hospital Ltd",
        title: "Crown Allotment 234, Section 15",
        council: "Yarra City Council",
        improvements: "Modern private hospital with full medical facilities",
        carParking: "200 spaces including staff and visitor",
        beds: "150 private patient beds",
        facilities: "4 operating theatres, ICU, emergency, radiology, pathology"
      },
      locationAnalysis: {
        address: "250 Gertrude Street, Fitzroy VIC 3065",
        suburb: "Fitzroy",
        postcode: "3065",
        coordinates: "-37.7987, 144.9776",
        proximity: {
          cbd: "3.8km",
          royalMelbourneHospital: "2.5km",
          fitzroyStation: "600m",
          universities: "Multiple within 5km"
        },
        demographics: "Dense urban population with healthcare needs",
        accessibility: "Excellent public transport and road access",
        medicalPrecinct: "Part of established inner-city medical hub"
      },
      valuation: {
        marketValue: "$125,000,000",
        landValue: "$28,500,000",
        improvementValue: "$96,500,000",
        valuationDate: "September 2024",
        valuationMethod: "Income Capitalisation & Direct Comparison",
        capitalisationRate: "5.65%",
        marketConditions: "Healthcare property sector showing steady growth",
        valuePerBed: "$833,333",
        valuePerSqm: "$4,386",
        landRate: "$3,353/sqm"
      },
      income: {
        grossIncome: "$18,500,000 p.a.",
        operatingExpenses: "$5,250,000 p.a.",
        netIncome: "$13,250,000 p.a.",
        yieldRate: "5.65%",
        weeklyRent: "$355,769",
        leaseExpiry: "31/12/2035",
        tenantName: "Fitzroy Private Hospital Operations Pty Ltd",
        leaseTerm: "20 years",
        rentReviews: "CPI annually with market review every 5 years",
        incomeBreakdown: {
          baseRent: "$16,500,000",
          equipmentRental: "$1,200,000",
          carParking: "$450,000",
          other: "$350,000"
        },
        expenseBreakdown: {
          maintenance: "$2,850,000",
          insurance: "$1,250,000",
          utilities: "$650,000",
          management: "$500,000"
        }
      },
      salesEvidence: [
        { address: "Private Hospital, Box Hill", price: "$95,000,000", date: "Feb 2024", beds: "120", rate: "$791,667/bed", size: "22,000 sqm", vendor: "Healthcare REIT" },
        { address: "Medical Centre, South Yarra", price: "$78,000,000", date: "May 2024", beds: "N/A", rate: "N/A", size: "18,500 sqm", vendor: "Private operator" },
        { address: "Rehabilitation Hospital, Kew", price: "$65,000,000", date: "Mar 2024", beds: "80", rate: "$812,500/bed", size: "15,200 sqm", vendor: "Government" }
      ],
      rentalEvidence: [
        { property: "Private hospital, Richmond", income: "$12,500,000 p.a.", beds: "110", rate: "$113,636/bed p.a.", lease: "15 years", operator: "Healthcare group" },
        { property: "Day surgery, Camberwell", income: "$4,250,000 p.a.", beds: "25", rate: "$170,000/bed p.a.", lease: "10 years", operator: "Specialist group" },
        { property: "Medical centre, Hawthorn", income: "$2,850,000 p.a.", beds: "N/A", rate: "N/A", lease: "12 years", operator: "GP practice" }
      ],
      riskFactors: [
        "Specialized medical equipment",
        "Healthcare regulation changes",
        "High capital maintenance requirements",
        "Operator dependency",
        "Medical technology obsolescence"
      ],
      riskAnalysis: {
        marketRisk: "Low - Healthcare demand stable and growing",
        locationRisk: "Low - Established medical precinct",
        propertyRisk: "Medium - Specialized building and equipment",
        tenancyRisk: "Medium - Healthcare operator dependency",
        liquidityRisk: "High - Limited buyer pool for hospital assets",
        overallRisk: "Medium"
      },
      marketAnalysis: {
        healthcareTrends: [
          "Aging population driving demand",
          "Private healthcare sector growth",
          "Specialized medical services expansion"
        ],
        competitivePosition: "Well-positioned private hospital",
        operatorPerformance: "Established successful operation",
        capacityUtilization: "Average 85% bed occupancy"
      },
      legalPlanning: {
        zoning: "Special Use Zone - Hospital",
        permits: "Hospital operating license, medical device permits",
        restrictions: "Hospital use only, strict health regulations",
        compliance: "Department of Health oversight, accreditation requirements",
        developmentPotential: "Medical office expansion possible"
      }
    }
  }
];

export default function GenerateMockReports() {
  // PAF Demo State
  const [pafSelectedProperty, setPafSelectedProperty] = useState("Childcare Centre - Melbourne CBD");
  const [pafCustomAddress, setPafCustomAddress] = useState("");
  const [pafStatus, setPafStatus] = useState("Complete");
  const [pafLoading, setPafLoading] = useState(false);
  const [pafReportData, setPafReportData] = useState<any>(pafDemoProperties[0]);
  const [pafContradictions, setPafContradictions] = useState<any[]>([
    {
      type: "Warning",
      section: "Risk Assessment",
      issue: "Childcare property missing specialized risk factors assessment",
      recommendation: "Include childcare-specific operational and regulatory risks"
    }
  ]);
  const [pafAmendments, setPafAmendments] = useState<any[]>([]);
  const [pafAmending, setPafAmending] = useState(false);

  // ICV Demo State
  const [icvSelectedProperty, setIcvSelectedProperty] = useState("Retail Shopping Centre - Chadstone");
  const [icvCustomAddress, setIcvCustomAddress] = useState("");
  const [icvStatus, setIcvStatus] = useState("Complete");
  const [icvLoading, setIcvLoading] = useState(false);
  const [icvReportData, setIcvReportData] = useState<any>(icvDemoProperties[0]);
  const [icvContradictions, setIcvContradictions] = useState<any[]>([
    {
      type: "Critical",
      section: "Market Analysis",
      issue: "Shopping centre missing online retail impact assessment",
      recommendation: "Include analysis of e-commerce impact on retail valuations"
    }
  ]);
  const [icvAmendments, setIcvAmendments] = useState<any[]>([]);
  const [icvAmending, setIcvAmending] = useState(false);

  // ISFV Demo State - using complete comprehensive data
  const [isfvProperty] = useState(isfvDemoProperties[0]); // Luxury Apartment Complex

  // PAF Automation Handler
  const handlePafAutomation = async () => {
    if (!pafSelectedProperty && !pafCustomAddress.trim()) {
      toast.error("Please select a demo property or enter a custom address");
      return;
    }

    setPafLoading(true);
    setPafStatus("Running automation...");

    const selectedPropertyData = pafDemoProperties.find(p => p.name === pafSelectedProperty);

    setTimeout(() => {
      setPafStatus("Processing property details...");
    }, 1000);

    setTimeout(() => {
      setPafStatus("Generating PAF report...");
    }, 2000);

    setTimeout(() => {
      setPafStatus("Complete");
      setPafLoading(false);
      
      if (selectedPropertyData) {
        setPafReportData(selectedPropertyData);
      }
      
      toast.success("PAF automation completed successfully!");
    }, 3500);
  };

  // ICV Automation Handler
  const handleIcvAutomation = async () => {
    if (!icvSelectedProperty && !icvCustomAddress.trim()) {
      toast.error("Please select a demo property or enter a custom address");
      return;
    }

    setIcvLoading(true);
    setIcvStatus("Running automation...");

    const selectedPropertyData = icvDemoProperties.find(p => p.name === icvSelectedProperty);

    setTimeout(() => {
      setIcvStatus("Processing property details...");
    }, 1000);

    setTimeout(() => {
      setIcvStatus("Generating ICV report...");
    }, 2000);

    setTimeout(() => {
      setIcvStatus("Complete");
      setIcvLoading(false);
      
      if (selectedPropertyData) {
        setIcvReportData(selectedPropertyData);
      }
      
      toast.success("ICV automation completed successfully!");
    }, 3500);
  };

  // PAF Contradiction Check
  const handlePafContradictionCheck = () => {
    if (pafStatus !== "Complete" || !pafReportData) {
      toast.error("Please run full automation first");
      return;
    }

    const result = checkReportContradictions(pafReportData.mockData);
    const contradictions = result.contradictions || [];
    setPafContradictions(contradictions);
    
    if (contradictions.length === 0) {
      toast.success("No contradictions found in PAF report");
    } else {
      toast.warning(`Found ${contradictions.length} potential contradictions`);
    }
  };

  // ICV Contradiction Check  
  const handleIcvContradictionCheck = () => {
    if (icvStatus !== "Complete" || !icvReportData) {
      toast.error("Please run full automation first");
      return;
    }

    const result = checkReportContradictions(icvReportData.mockData);
    const contradictions = result.contradictions || [];
    setIcvContradictions(contradictions);
    
    if (contradictions.length === 0) {
      toast.success("No contradictions found in ICV report");
    } else {
      toast.warning(`Found ${contradictions.length} potential contradictions`);
    }
  };

  // PAF Auto Amendment
  const handlePafAutoAmend = async () => {
    if (pafContradictions.length === 0) {
      toast.error("No contradictions to amend");
      return;
    }

    setPafAmending(true);
    
    try {
      const result = await runAutomatedAmendment(pafReportData.mockData, pafContradictions);
      const amendments = result.amendments || [];
      setPafAmendments(amendments);
      
      // Clear contradictions after successful amendment
      setPafContradictions([]);
      
      toast.success(`Successfully amended ${amendments.length} contradictions`);
    } catch (error) {
      toast.error("Error during automated amendment");
    } finally {
      setPafAmending(false);
    }
  };

  // ICV Auto Amendment
  const handleIcvAutoAmend = async () => {
    if (icvContradictions.length === 0) {
      toast.error("No contradictions to amend");
      return;
    }

    setIcvAmending(true);
    
    try {
      const result = await runAutomatedAmendment(icvReportData.mockData, icvContradictions);
      const amendments = result.amendments || [];
      setIcvAmendments(amendments);
      
      // Clear contradictions after successful amendment
      setIcvContradictions([]);
      
      toast.success(`Successfully amended ${amendments.length} contradictions`);
    } catch (error) {
      toast.error("Error during automated amendment");
    } finally {
      setIcvAmending(false);
    }
  };

  // Demo Tab Content Component
  const DemoTabContent = ({ reportData, reportType }: { reportData: any, reportType: string }) => {
    if (!reportData || !reportData.mockData) {
      return <div className="p-4 text-muted-foreground">No report data available</div>;
    }

    const data = reportData.mockData;

    return (
      <Tabs defaultValue="executive" className="w-full">
        <TabsList className="grid w-full grid-cols-8 mb-6">
          <TabsTrigger value="executive">Executive Summary</TabsTrigger>
          <TabsTrigger value="property">Property Details</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="valuation">Valuation</TabsTrigger>
          <TabsTrigger value="income">Income Analysis</TabsTrigger>
          <TabsTrigger value="sales">Sales Evidence</TabsTrigger>
          <TabsTrigger value="rental">Rental Evidence</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="executive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.executiveSummary ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold">Property Type</Label>
                      <p>{data.executiveSummary.propertyType}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Market Value</Label>
                      <p className="text-2xl font-bold text-primary">{data.executiveSummary.marketValue}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Valuation Date</Label>
                      <p>{data.executiveSummary.valuationDate}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Purpose</Label>
                      <p>{data.executiveSummary.purposeOfValuation}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="font-semibold">Key Findings</Label>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {data.executiveSummary.keyFindings?.map((finding: string, index: number) => (
                        <li key={index}>{finding}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="font-semibold">Market Conditions</Label>
                      <p>{data.executiveSummary.marketConditions}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Risk Rating</Label>
                      <p>{data.executiveSummary.riskRating}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Confidence Level</Label>
                      <p>{data.executiveSummary.confidence}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Property Address</Label>
                    <p>{reportData.address}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Market Value</Label>
                    <p className="text-2xl font-bold text-primary">{data.valuation.marketValue}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Property Type</Label>
                    <p>{reportData.type}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Report Type</Label>
                    <p>{reportData.reportType}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="property" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Land Area</Label>
                  <p>{data.propertyDetails.landArea}</p>
                </div>
                <div>
                  <Label className="font-semibold">Building Area</Label>
                  <p>{data.propertyDetails.buildingArea}</p>
                </div>
                <div>
                  <Label className="font-semibold">Year Built</Label>
                  <p>{data.propertyDetails.yearBuilt}</p>
                </div>
                <div>
                  <Label className="font-semibold">Zoning</Label>
                  <p>{data.propertyDetails.zoning}</p>
                </div>
                <div>
                  <Label className="font-semibold">Owner</Label>
                  <p>{data.propertyDetails.owner}</p>
                </div>
                <div>
                  <Label className="font-semibold">Council</Label>
                  <p>{data.propertyDetails.council || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <Label className="font-semibold">Improvements</Label>
                  <p>{data.propertyDetails.improvements || reportData.features}</p>
                </div>
                {data.propertyDetails.carParking && (
                  <div>
                    <Label className="font-semibold">Car Parking</Label>
                    <p>{data.propertyDetails.carParking}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Location Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {data.locationAnalysis ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold">Address</Label>
                      <p>{data.locationAnalysis.address}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Suburb</Label>
                      <p>{data.locationAnalysis.suburb} {data.locationAnalysis.postcode}</p>
                    </div>
                  </div>
                  
                  {data.locationAnalysis.proximity && (
                    <div>
                      <Label className="font-semibold">Key Distances</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {Object.entries(data.locationAnalysis.proximity).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span>{value as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.locationAnalysis.accessibility && (
                    <div>
                      <Label className="font-semibold">Accessibility</Label>
                      <p>{data.locationAnalysis.accessibility}</p>
                    </div>
                  )}

                  {data.locationAnalysis.demographics && (
                    <div>
                      <Label className="font-semibold">Demographics</Label>
                      <p>{data.locationAnalysis.demographics}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Location analysis data not available for this property type</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="valuation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Valuation Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Market Value</Label>
                  <p className="text-2xl font-bold text-primary">{data.valuation.marketValue}</p>
                </div>
                <div>
                  <Label className="font-semibold">Valuation Date</Label>
                  <p>{data.valuation.valuationDate}</p>
                </div>
                <div>
                  <Label className="font-semibold">Land Value</Label>
                  <p>{data.valuation.landValue}</p>
                </div>
                <div>
                  <Label className="font-semibold">Improvement Value</Label>
                  <p>{data.valuation.improvementValue}</p>
                </div>
                {data.valuation.valuationMethod && (
                  <div className="col-span-2">
                    <Label className="font-semibold">Valuation Method</Label>
                    <p>{data.valuation.valuationMethod}</p>
                  </div>
                )}
                {data.valuation.capitalisationRate && (
                  <div>
                    <Label className="font-semibold">Capitalisation Rate</Label>
                    <p>{data.valuation.capitalisationRate}</p>
                  </div>
                )}
                {data.valuation.marketConditions && (
                  <div>
                    <Label className="font-semibold">Market Conditions</Label>
                    <p>{data.valuation.marketConditions}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Gross Income</Label>
                  <p className="text-lg font-semibold text-green-600">{data.income.grossIncome}</p>
                </div>
                <div>
                  <Label className="font-semibold">Operating Expenses</Label>
                  <p className="text-lg font-semibold text-red-600">{data.income.operatingExpenses}</p>
                </div>
                <div>
                  <Label className="font-semibold">Net Income</Label>
                  <p className="text-lg font-bold text-primary">{data.income.netIncome}</p>
                </div>
                <div>
                  <Label className="font-semibold">Yield Rate</Label>
                  <p className="text-lg font-bold">{data.income.yieldRate}</p>
                </div>
                
                {data.income.weeklyRent && (
                  <div>
                    <Label className="font-semibold">Weekly Rent</Label>
                    <p>{data.income.weeklyRent}</p>
                  </div>
                )}
                
                {data.income.occupancyRate && (
                  <div>
                    <Label className="font-semibold">Occupancy Rate</Label>
                    <p>{data.income.occupancyRate}</p>
                  </div>
                )}

                {data.income.leaseExpiry && (
                  <div>
                    <Label className="font-semibold">Lease Expiry</Label>
                    <p>{data.income.leaseExpiry}</p>
                  </div>
                )}

                {data.income.tenantName && (
                  <div>
                    <Label className="font-semibold">Tenant</Label>
                    <p>{data.income.tenantName}</p>
                  </div>
                )}
              </div>

              {data.income.expenseBreakdown && (
                <div className="mt-6">
                  <Label className="font-semibold">Expense Breakdown</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {Object.entries(data.income.expenseBreakdown).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span>${(value as number).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              {data.salesEvidence && data.salesEvidence.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-2 text-left">Address</th>
                        <th className="border border-border p-2 text-left">Price</th>
                        <th className="border border-border p-2 text-left">Date</th>
                        <th className="border border-border p-2 text-left">Size</th>
                        <th className="border border-border p-2 text-left">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.salesEvidence.map((sale: any, index: number) => (
                        <tr key={index}>
                          <td className="border border-border p-2">{sale.address}</td>
                          <td className="border border-border p-2 font-semibold">{sale.price}</td>
                          <td className="border border-border p-2">{sale.date}</td>
                          <td className="border border-border p-2">{sale.size}</td>
                          <td className="border border-border p-2">{sale.rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No sales evidence available for this property type</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rental" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rental Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              {data.rentalEvidence && data.rentalEvidence.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-2 text-left">Property</th>
                        <th className="border border-border p-2 text-left">Rent</th>
                        <th className="border border-border p-2 text-left">Size/Details</th>
                        <th className="border border-border p-2 text-left">Rate</th>
                        <th className="border border-border p-2 text-left">Lease</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.rentalEvidence.map((rental: any, index: number) => (
                        <tr key={index}>
                          <td className="border border-border p-2">{rental.address || rental.property}</td>
                          <td className="border border-border p-2 font-semibold">{rental.rent}</td>
                          <td className="border border-border p-2">
                            {rental.size} {rental.bedrooms && `• ${rental.bedrooms}BR`} {rental.bathrooms && `${rental.bathrooms}BA`}
                          </td>
                          <td className="border border-border p-2">{rental.rate}</td>
                          <td className="border border-border p-2">{rental.lease}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No rental evidence available for this property type</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold">Key Risk Factors</Label>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {data.riskFactors?.map((risk: string, index: number) => (
                      <li key={index}>{risk}</li>
                    ))}
                  </ul>
                </div>

                {data.riskAnalysis && (
                  <div>
                    <Label className="font-semibold">Risk Analysis</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {Object.entries(data.riskAnalysis).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <p className="text-sm">{value as string}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Demo Report Generation</h1>
        <p className="text-muted-foreground mt-2">
          Complete demonstration of ISFV, PAF, and ICV report automation with full data across all tabs
        </p>
      </div>

      {/* Demo Tabs */}
      <Tabs defaultValue="isfv" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="isfv">ISFV Demo</TabsTrigger>
          <TabsTrigger value="paf">PAF Demo</TabsTrigger>
          <TabsTrigger value="icv">ICV Demo</TabsTrigger>
        </TabsList>

        {/* ISFV Demo */}
        <TabsContent value="isfv" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                ISFV Platform Demo - Complete Report Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="font-semibold">Selected Property</Label>
                    <p>{isfvProperty.name}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Address</Label>
                    <p>{isfvProperty.address}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Report Type</Label>
                    <p>{isfvProperty.reportType}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    ✓ Complete ISFV report ready with all tabs populated: Executive Summary, Property Details, 
                    Location Analysis, Valuation Summary, Income Analysis, Sales Evidence, Rental Evidence, and Risk Assessment
                  </p>
                </div>

                {/* ISFV Report Display */}
                <DemoTabContent reportData={isfvProperty} reportType="ISFV" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PAF Demo */}
        <TabsContent value="paf" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>PAF Demo - Property Valuations Only</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paf-property">Select Demo Property</Label>
                    <Select value={pafSelectedProperty} onValueChange={setPafSelectedProperty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a demo property" />
                      </SelectTrigger>
                      <SelectContent>
                        {pafDemoProperties.map((property) => (
                          <SelectItem key={property.name} value={property.name}>
                            {property.name} - {property.reportType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="paf-custom">Or Enter Custom Address</Label>
                    <Input
                      id="paf-custom"
                      placeholder="Custom property address"
                      value={pafCustomAddress}
                      onChange={(e) => setPafCustomAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={handlePafAutomation}
                    disabled={pafLoading}
                    className="flex items-center gap-2"
                  >
                    {pafLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    Run PAF Automation
                  </Button>

                  <Button 
                    variant="outline"
                    onClick={handlePafContradictionCheck}
                    disabled={pafStatus !== "Complete"}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Check Contradictions
                  </Button>

                  {pafContradictions.length > 0 && (
                    <Button 
                      variant="secondary"
                      onClick={handlePafAutoAmend}
                      disabled={pafAmending}
                      className="flex items-center gap-2"
                    >
                      {pafAmending ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wrench className="h-4 w-4" />
                      )}
                      Auto-Amend
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    pafStatus === "Complete" ? "bg-green-500" : 
                    pafLoading ? "bg-yellow-500 animate-pulse" : "bg-gray-300"
                  }`} />
                  <span className="font-medium">Status: {pafStatus}</span>
                </div>

                {/* Contradiction Display */}
                {pafContradictions.length > 0 && (
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardHeader>
                      <CardTitle className="text-yellow-800">Contradictions Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {pafContradictions.map((contradiction, index) => (
                          <div key={index} className="p-3 bg-white rounded border-l-4 border-yellow-400">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className={`inline-block px-2 py-1 text-xs rounded ${
                                  contradiction.type === "Critical" ? "bg-red-100 text-red-800" :
                                  contradiction.type === "Warning" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-blue-100 text-blue-800"
                                }`}>
                                  {contradiction.type}
                                </span>
                                <h4 className="font-medium mt-1">{contradiction.section}</h4>
                                <p className="text-sm text-gray-600">{contradiction.issue}</p>
                                <p className="text-sm text-gray-500 italic">{contradiction.recommendation}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Amendment Results */}
                {pafAmendments.length > 0 && (
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-green-800">Amendments Applied</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {pafAmendments.map((amendment, index) => (
                          <div key={index} className="p-3 bg-white rounded border-l-4 border-green-400">
                            <h4 className="font-medium">{amendment.section}</h4>
                            <p className="text-sm text-gray-600">{amendment.description}</p>
                            <div className="mt-2 text-xs">
                              <span className="text-red-600">Before: {amendment.before}</span>
                              <br />
                              <span className="text-green-600">After: {amendment.after}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* PAF Report Display */}
                {pafStatus === "Complete" && pafReportData && (
                  <DemoTabContent reportData={pafReportData} reportType="PAF" />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ICV Demo */}
        <TabsContent value="icv" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ICV Demo - Property Valuations Only</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="icv-property">Select Demo Property</Label>
                    <Select value={icvSelectedProperty} onValueChange={setIcvSelectedProperty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a demo property" />
                      </SelectTrigger>
                      <SelectContent>
                        {icvDemoProperties.map((property) => (
                          <SelectItem key={property.name} value={property.name}>
                            {property.name} - {property.reportType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="icv-custom">Or Enter Custom Address</Label>
                    <Input
                      id="icv-custom"
                      placeholder="Custom property address"
                      value={icvCustomAddress}
                      onChange={(e) => setIcvCustomAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={handleIcvAutomation}
                    disabled={icvLoading}
                    className="flex items-center gap-2"
                  >
                    {icvLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    Run ICV Automation
                  </Button>

                  <Button 
                    variant="outline"
                    onClick={handleIcvContradictionCheck}
                    disabled={icvStatus !== "Complete"}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Check Contradictions
                  </Button>

                  {icvContradictions.length > 0 && (
                    <Button 
                      variant="secondary"
                      onClick={handleIcvAutoAmend}
                      disabled={icvAmending}
                      className="flex items-center gap-2"
                    >
                      {icvAmending ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wrench className="h-4 w-4" />
                      )}
                      Auto-Amend
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    icvStatus === "Complete" ? "bg-green-500" : 
                    icvLoading ? "bg-yellow-500 animate-pulse" : "bg-gray-300"
                  }`} />
                  <span className="font-medium">Status: {icvStatus}</span>
                </div>

                {/* Contradiction Display */}
                {icvContradictions.length > 0 && (
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardHeader>
                      <CardTitle className="text-yellow-800">Contradictions Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {icvContradictions.map((contradiction, index) => (
                          <div key={index} className="p-3 bg-white rounded border-l-4 border-yellow-400">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className={`inline-block px-2 py-1 text-xs rounded ${
                                  contradiction.type === "Critical" ? "bg-red-100 text-red-800" :
                                  contradiction.type === "Warning" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-blue-100 text-blue-800"
                                }`}>
                                  {contradiction.type}
                                </span>
                                <h4 className="font-medium mt-1">{contradiction.section}</h4>
                                <p className="text-sm text-gray-600">{contradiction.issue}</p>
                                <p className="text-sm text-gray-500 italic">{contradiction.recommendation}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Amendment Results */}
                {icvAmendments.length > 0 && (
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-green-800">Amendments Applied</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {icvAmendments.map((amendment, index) => (
                          <div key={index} className="p-3 bg-white rounded border-l-4 border-green-400">
                            <h4 className="font-medium">{amendment.section}</h4>
                            <p className="text-sm text-gray-600">{amendment.description}</p>
                            <div className="mt-2 text-xs">
                              <span className="text-red-600">Before: {amendment.before}</span>
                              <br />
                              <span className="text-green-600">After: {amendment.after}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* ICV Report Display */}
                {icvStatus === "Complete" && icvReportData && (
                  <DemoTabContent reportData={icvReportData} reportType="ICV" />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}