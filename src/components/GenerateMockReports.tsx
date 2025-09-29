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

// Demo Properties for ISFV - Using original ISFV structure
const isfvDemoProperties = [
  {
    name: "Luxury Apartment Complex - St Kilda",
    address: "88 Marine Parade, St Kilda VIC 3182",
    type: "Instant Short Form Valuation",
    reportType: "ISFV",
    features: "Harbor views, premium finishes, rooftop terrace"
  },
  {
    name: "Family Home - Brighton",
    address: "42 Church Street, Brighton VIC 3186",
    type: "Instant Short Form Valuation", 
    reportType: "ISFV",
    features: "Period home, garden, close to beach"
  }
];

// Demo Properties for PAF - Property Assessment Framework (Long Form, Short Form, Sustino Pro)
const pafDemoProperties = [
  {
    name: "Commercial Office Building - CBD",
    address: "123 Collins Street, Melbourne VIC 3000",
    type: "Commercial Property Valuation",
    reportType: "Long Form Property Valuation",
    features: "Prime CBD location, 25 floors, modern amenities"
  },
  {
    name: "Industrial Warehouse - Dandenong",
    address: "45 Industrial Drive, Dandenong VIC 3175", 
    type: "Industrial Property Valuation",
    reportType: "Short Form Property Valuation",
    features: "Large warehouse, truck access, rail proximity"
  },
  {
    name: "Mixed Use Development - Fitzroy",
    address: "78 Smith Street, Fitzroy VIC 3065",
    type: "Mixed Use Property Valuation", 
    reportType: "Sustino Pro Property Valuation",
    features: "Retail ground floor, apartments above, heritage facade"
  }
];

// Demo Properties for ICV - Independent Commercial Valuation (Long Form, Short Form, Sustino Pro)
const icvDemoProperties = [
  {
    name: "Shopping Centre - Chadstone",
    address: "200 Chadstone Road, Chadstone VIC 3148",
    type: "Retail Property Valuation",
    reportType: "Long Form Property Valuation", 
    features: "Major shopping center, 150+ stores, entertainment"
  },
  {
    name: "Medical Centre - Richmond",
    address: "67 Swan Street, Richmond VIC 3121",
    type: "Healthcare Property Valuation",
    reportType: "Short Form Property Valuation",
    features: "Medical suites, specialist equipment, parking"
  },
  {
    name: "Hotel - Daylesford",
    address: "25 Vincent Street, Daylesford VIC 3460", 
    type: "Hospitality Property Valuation",
    reportType: "Sustino Pro Property Valuation",
    features: "Boutique hotel, spa facilities, restaurant"
  }
];

export default function GenerateMockReports() {
  const [selectedISFVProperty, setSelectedISFVProperty] = useState('');
  const [selectedPAFProperty, setSelectedPAFProperty] = useState('');
  const [selectedICVProperty, setSelectedICVProperty] = useState('');
  const [isfvGenerated, setISFVGenerated] = useState(false);
  const [pafGenerated, setPAFGenerated] = useState(false);
  const [icvGenerated, setICVGenerated] = useState(false);
  const [isfvGenerating, setISFVGenerating] = useState(false);
  const [pafGenerating, setPAFGenerating] = useState(false);
  const [icvGenerating, setICVGenerating] = useState(false);

  // Demo report data - immediately available
  const [isfvReportData, setISFVReportData] = useState({
    propertyAddress: "88 Marine Parade, St Kilda VIC 3182",
    estimatedValue: 850000,
    confidence: 'high',
    riskScore: 2,
    automationStatus: 'completed',
    lastUpdated: new Date().toLocaleString(),
    mockData: {
      propertyData: {
        propertyType: "Luxury Apartment Complex",
        landArea: "N/A - Strata Unit",
        buildingArea: "220 sqm", 
        bedrooms: 2,
        bathrooms: 2,
        carSpaces: 2,
        yearBuilt: 2019,
        structural_condition: 'excellent',
        kitchen_condition: 'modern',
        overall_condition: 'excellent',
        zoning: "Mixed Use Zone 1",
        lotPlan: "Lot 42 SP123456",
        councilArea: "Port Phillip",
        localityCode: "3182",
        propertyDescription: "Luxury 2-bedroom apartment with harbour views, premium finishes including stone benchtops, European appliances, engineered timber floors, and access to rooftop terrace with BBQ facilities.",
        constructionMaterials: "Concrete and steel construction with glass facade",
        roof: "Concrete flat roof with waterproof membrane",
        walls: "Reinforced concrete with thermal insulation",
        flooring: "Engineered timber and porcelain tiles",
        heating: "Ducted reverse cycle air conditioning",
        parking: "Two undercover car spaces with storage cage"
      },
      riskRatings: {
        environmental: 2,
        structural: 1,
        market: 2,
        legal: 1,
        economic: 2,
        flood: 1,
        bushfire: 1,
        contamination: 1,
        heritage: 2,
        planning: 1
      },
      landDwellingDetails: {
        landTitle: "Strata Title",
        dimensions: "Unit 220sqm, Building footprint 1,200sqm",
        topography: "Level waterfront site",
        soilType: "Sand and rock base",
        drainage: "Stormwater connected to council system",
        utilities: "All services connected - electricity, gas, water, sewer, NBN",
        easements: "Fire egress easement to neighbouring property",
        covenants: "Body corporate rules and regulations apply",
        zoningDetails: "Mixed Use Zone 1 - Residential and commercial uses permitted",
        planningPermits: "No current planning applications",
        developmentPotential: "Limited due to heritage overlay restrictions"
      },
      salesEvidence: [
        {
          id: '1',
          address: '92 Marine Parade, St Kilda', 
          salePrice: 820000,
          reliability: 'high',
          date: 'Jun 2024',
          bedrooms: 2,
          bathrooms: 2,
          carSpaces: 1,
          landArea: 'N/A',
          buildingArea: '185sqm',
          yearBuilt: 2018,
          adjustments: '+$30,000 for superior position and views'
        },
        {
          id: '2',
          address: '86 Marine Parade, St Kilda', 
          salePrice: 795000,
          reliability: 'high',
          date: 'May 2024',
          bedrooms: 2,
          bathrooms: 2,
          carSpaces: 2,
          landArea: 'N/A',
          buildingArea: '210sqm',
          yearBuilt: 2019,
          adjustments: '+$55,000 for premium finishes and larger size'
        },
        {
          id: '3',
          address: '15 Canterbury Road, St Kilda', 
          salePrice: 760000,
          reliability: 'medium',
          date: 'Apr 2024',
          bedrooms: 2,
          bathrooms: 2,
          carSpaces: 1,
          landArea: 'N/A',
          buildingArea: '195sqm',
          yearBuilt: 2017,
          adjustments: '+$90,000 for waterfront location and building quality'
        }
      ],
      generalComments: `EXECUTIVE SUMMARY

This comprehensive valuation assessment of 88 Marine Parade, St Kilda provides a detailed analysis of a luxury 2-bedroom apartment within a premium waterfront development. The property benefits from an exceptional location with direct harbour views and represents quality construction completed in 2019.

KEY FINDINGS:
• Market Value: $850,000 (High Confidence)
• Risk Assessment: Low to Medium Risk (Score 1.8/5)
• Market Position: Premium segment with strong demand
• Construction Quality: Excellent with modern amenities

PROPERTY HIGHLIGHTS:
The subject property comprises a spacious 220sqm apartment featuring premium finishes, harbour views, and access to exceptional building amenities including rooftop terrace. The building represents contemporary architectural design with sustainable features and quality construction materials.

MARKET ANALYSIS:
The St Kilda waterfront market has demonstrated resilience with steady price growth. Recent comparable sales in the immediate vicinity range from $760,000 to $820,000, supporting our assessed value of $850,000. The premium position and superior finishes justify the valuation at the upper end of the comparable sales range.

RISK ASSESSMENT:
The property presents low overall risk with excellent structural condition, prime location, and strong market fundamentals. Minor considerations include body corporate obligations and potential heritage overlay restrictions on future modifications.

RECOMMENDATION:
The property represents excellent value in the luxury apartment segment with strong fundamentals supporting long-term capital growth potential.`,
      vraAssessment: {
        comments: `VALUATION RISK ANALYSIS

CONSTRUCTION QUALITY ASSESSMENT:
The subject property demonstrates excellent construction standards consistent with contemporary luxury development. Structural elements including reinforced concrete construction, quality facade materials, and premium internal finishes support the assessed market value.

Key observations:
• Concrete and steel frame construction - excellent structural integrity
• High-quality facade with full-height glazing - no visible defects
• Premium internal finishes including stone benchtops and engineered timber
• Modern building services including ducted air conditioning
• Waterproofing and thermal performance exceeds building standards

LOCATION RISK FACTORS:
The waterfront location presents minimal risk considerations:
• Flood risk: Low (above 1:100 year flood level)
• Environmental risk: Low (no contamination concerns)
• Market risk: Low (strong demand in premium segment)
• Planning risk: Low (appropriate zoning, heritage considerations noted)

MARKET POSITION ANALYSIS:
The property occupies the premium segment of the St Kilda apartment market. Market fundamentals support continued demand including:
• Limited supply of new waterfront apartments
• Strong buyer interest in premium locations
• Proximity to Melbourne CBD and transport
• Established neighbourhood amenities

VALUATION CONFIDENCE:
High confidence in assessed value based on:
• Comprehensive sales evidence analysis
• Detailed property inspection
• Current market conditions assessment
• Quality construction and location factors`,
        recommendations: `VALUATION RECOMMENDATIONS

PRIMARY RECOMMENDATIONS:
1. Market Value: $850,000 represents fair market value based on current conditions
2. Insurance Valuation: Recommend $450,000 for building insurance purposes
3. Rental Assessment: Estimated $650-$680 per week for investment purposes

RISK MITIGATION:
1. Building Inspection: Recommend professional building inspection for any purchaser
2. Body Corporate Review: Review body corporate financials and planned maintenance
3. Heritage Considerations: Verify any restrictions on external modifications
4. Strata Management: Confirm building management and reserve fund adequacy

MARKET OUTLOOK:
• Short term (6-12 months): Stable to modest growth expected
• Medium term (1-3 years): Continued growth supported by limited supply
• Long term (3-5 years): Strong fundamentals support capital appreciation

ADDITIONAL CONSIDERATIONS:
• Body corporate fees approximately $1,200-$1,500 per quarter
• Council rates approximately $1,800-$2,200 per annum
• Water rates approximately $800-$1,000 per annum
• Building insurance included in body corporate fees

The property represents a sound investment opportunity in the premium apartment segment with excellent location attributes and quality construction supporting long-term value retention.`
      },
      photosAnnexures: {
        propertyPhotos: [
          "Front facade showing contemporary architectural design",
          "Living area with harbour views and premium finishes", 
          "Modern kitchen with stone benchtops and European appliances",
          "Master bedroom with built-in wardrobes and ensuite access",
          "Bathroom featuring floor-to-ceiling tiles and quality fixtures",
          "Rooftop terrace with BBQ facilities and panoramic views",
          "Undercover parking with two spaces and storage"
        ],
        documents: [
          "Title documents and strata plan",
          "Body corporate rules and financial statements", 
          "Planning scheme maps and zoning information",
          "Building and pest inspection reports",
          "Sales evidence documentation and analysis",
          "Market data and comparable sales research"
        ],
        plans: [
          "Floor plan showing room layout and dimensions",
          "Site plan indicating building position and access",
          "Strata plan showing unit boundaries and common property"
        ]
      },
      automationHub: {
        status: "All automation processes completed successfully",
        domainApiData: "Property data sourced via Domain API - verified and current",
        riskAnalysis: "Automated risk scoring completed - low risk profile confirmed",
        salesComparison: "Comparable sales automatically sourced and analyzed",
        marketMetrics: "Market indicators updated from real-time data feeds",
        validationChecks: "All data validation checks passed successfully"
      },
      contradictionResults: 'CONTRADICTION ANALYSIS COMPLETE\n\n✓ No major contradictions detected in report data\n✓ All property details verified against multiple sources\n✓ Market valuation supported by comparable evidence\n✓ Risk assessments align with property characteristics\n✓ All automation processes completed successfully\n\nREPORT QUALITY: EXCELLENT\nDATA INTEGRITY: VERIFIED\nREADY FOR FINAL REVIEW'
    }
  });

  const [pafReportData, setPAFReportData] = useState({
    propertyAddress: "123 Collins Street, Melbourne VIC 3000",
    estimatedValue: 25000000,
    reportType: "Long Form Property Valuation",
    automationStatus: 'completed',
    lastUpdated: new Date().toLocaleString(),
    mockData: {
      executiveSummary: `EXECUTIVE SUMMARY

This comprehensive Property Assessment Framework (PAF) valuation of 123 Collins Street, Melbourne provides an in-depth analysis of a premium CBD office building. The 25-floor modern tower represents institutional-grade commercial real estate with exceptional tenant quality and strong fundamentals.

KEY FINDINGS:
• Market Value: $25,000,000 (High Confidence)
• Net Operating Income: $2,100,000 per annum
• Capitalisation Rate: 5.25%
• WALE (Weighted Average Lease Expiry): 4.2 years
• Occupancy Rate: 97.8%

PROPERTY HIGHLIGHTS:
Premium Grade A office building completed in 2018, featuring modern sustainable design, advanced building systems, and exceptional tenant amenities. The building offers 22,500sqm of net lettable area across 25 floors with panoramic city views.

INVESTMENT SUMMARY:
The property presents an exceptional investment opportunity in the prime CBD office market with stable income stream, quality tenant covenant, and strong capital growth prospects supported by limited new supply and strategic location benefits.`,

      propertyDetails: `PROPERTY DESCRIPTION

Building Specifications:
• Total Building Area: 28,500 sqm
• Net Lettable Area: 22,500 sqm
• Floors: 25 levels plus basement parking
• Construction: Reinforced concrete and steel frame
• Facade: High-performance glazed curtain wall
• Year Built: 2018
• Architect: Premier Commercial Architects
• Builder: Major Construction Group

Building Features:
• NABERS Energy Rating: 5.5 Stars
• Green Star Rating: 6 Star Design & As Built
• End-of-trip facilities with 200 bike spaces
• 24/7 security and building management
• High-speed passenger lifts (8 total)
• Rooftop plant and helicopter landing capability
• Basement parking: 180 spaces (1:125 sqm ratio)

Floor Plates:
• Typical floor plate: 900 sqm
• Column-free spans up to 12 metres
• Floor-to-ceiling height: 2.8 metres
• Raised access flooring throughout
• Ceiling void for services: 300mm minimum

Building Services:
• HVAC: Variable air volume with chilled beam technology
• Electrical: High-capacity reticulated power
• Fire Safety: Sprinkler system and smoke detection
• Vertical Transportation: Premium high-speed lifts
• Communications: Fibre optic infrastructure
• Water: Rainwater harvesting and greywater recycling`,

      marketAnalysis: `MARKET ANALYSIS

CBD OFFICE MARKET OVERVIEW:
The Melbourne CBD office market continues to demonstrate resilience with strong fundamentals supporting institutional investment. Premium Grade A space remains in high demand with limited new supply creating opportunities for capital appreciation.

Key Market Indicators:
• CBD Vacancy Rate: 8.2% (September 2024)
• Prime Grade A Vacancy: 4.1%
• Net Absorption: +185,000 sqm (12 months)
• Average Face Rent: $650-$850 per sqm
• Incentives: 15-25% for new leases

SUPPLY AND DEMAND:
New Supply: Limited new development with only 125,000 sqm completing in 2024-2025
Demand Drivers:
• Flight to quality by major tenants
• ESG requirements driving demand for premium buildings
• Consolidation of operations in prime locations
• Technology sector expansion
• Government and professional services growth

RENTAL GROWTH PROSPECTS:
• Short term (12 months): 2-4% growth expected
• Medium term (2-3 years): 4-6% annual growth
• Long term outlook: Strong fundamentals support continued growth

COMPARABLE TRANSACTIONS:
Recent sales of similar premium CBD buildings:
• 140 William Street: $182M (Cap rate 5.1%)
• 567 Collins Street: $315M (Cap rate 5.3%)
• 200 Queen Street: $425M (Cap rate 5.0%)

INVESTMENT MARKET:
Strong demand from institutional investors including superannuation funds, offshore capital, and REITs. Cap rates for premium buildings remain compressed with yields expected to remain stable at current levels.`,

      incomeAnalysis: `INCOME ANALYSIS

RENTAL INCOME SUMMARY:
Current Gross Income: $2,520,000 per annum
Vacancy Allowance: (2.5%) -$63,000
Effective Gross Income: $2,457,000
Operating Expenses: -$357,000
Net Operating Income: $2,100,000

TENANT PROFILE:
Major Tenants:
1. Professional Services Firm A: 8,500 sqm (38% of NLA)
   - Lease Expiry: December 2028
   - Rental: $685/sqm + outgoings
   - Annual Rent: $582,250

2. Technology Company B: 4,200 sqm (19% of NLA)
   - Lease Expiry: June 2027
   - Rental: $720/sqm + outgoings
   - Annual Rent: $302,400

3. Financial Services C: 3,800 sqm (17% of NLA)
   - Lease Expiry: March 2029
   - Rental: $705/sqm + outgoings
   - Annual Rent: $267,900

4. Government Agency D: 2,900 sqm (13% of NLA)
   - Lease Expiry: September 2026
   - Rental: $650/sqm + outgoings
   - Annual Rent: $188,500

5. Various Small Tenants: 3,100 sqm (13% of NLA)
   - Average Rental: $680/sqm + outgoings
   - Annual Rent: $210,800

OPERATING EXPENSES:
Building Management: $85,000
Utilities: $92,000
Insurance: $18,000
Rates and Land Tax: $78,000
Repairs and Maintenance: $45,000
Security: $28,000
Other Expenses: $11,000
Total Operating Expenses: $357,000

LEASE EXPIRY PROFILE:
2025: 5.2% of income
2026: 13.1% of income
2027: 19.3% of income
2028: 38.2% of income
2029: 17.4% of income
2030+: 6.8% of income

MARKET RENT ANALYSIS:
Current Average Rent: $690/sqm
Market Rent Assessment: $710/sqm
Rental Growth Potential: 2.9% above passing rent`,

      riskAssessment: `RISK ASSESSMENT

OVERALL RISK RATING: LOW TO MEDIUM

MARKET RISK (Rating: 2/5):
• CBD office market cyclical but fundamentally strong
• Technology disruption affecting space requirements
• Economic sensitivity to broader market conditions
• Mitigation: Prime location and quality building reduce market risk

TENANT RISK (Rating: 2/5):
• Diversified tenant base across multiple sectors
• Strong tenant covenants with established businesses
• WALE of 4.2 years provides income security
• Mitigation: Active leasing strategy and tenant retention programs

BUILDING RISK (Rating: 1/5):
• Modern construction (2018) with minimal maintenance issues
• Premium building systems and sustainable features
• Regular building condition assessments
• Mitigation: Comprehensive maintenance program and capital expenditure planning

FINANCIAL RISK (Rating: 2/5):
• Stable income stream with annual rent reviews
• Market rent reviews on majority of leases
• Strong building fundamentals support value retention
• Mitigation: Conservative debt levels and diversified funding sources

REGULATORY RISK (Rating: 2/5):
• Planning and zoning appropriate for current use
• Building compliance current and up to date
• Environmental regulations increasingly stringent
• Mitigation: Proactive compliance management and sustainability initiatives

LIQUIDITY RISK (Rating: 1/5):
• Premium CBD office assets highly sought after
• Strong demand from institutional investors
• Established investment market with regular transactions
• Mitigation: Quality building in prime location ensures strong liquidity

ENVIRONMENTAL RISK (Rating: 1/5):
• No contamination issues identified
• Flood risk minimal due to CBD location
• Climate change adaptation measures in place
• Mitigation: Regular environmental assessments and sustainable building practices

KEY RISK MITIGATION STRATEGIES:
• Diversified tenant base and active leasing management
• Comprehensive building maintenance and capital expenditure program
• Regular market rent reviews and lease documentation updates
• Professional property management and building operations
• Ongoing building improvements and sustainability initiatives`
    }
  });

  const [icvReportData, setICVReportData] = useState({
    propertyAddress: "200 Chadstone Road, Chadstone VIC 3148", 
    estimatedValue: 180000000,
    reportType: "Long Form Property Valuation",
    automationStatus: 'completed',
    lastUpdated: new Date().toLocaleString(),
    mockData: {
      executiveSummary: `EXECUTIVE SUMMARY

This Independent Commercial Valuation (ICV) provides comprehensive analysis of Chadstone Shopping Centre, a dominant regional retail destination. The property represents one of Australia's premier shopping centres with exceptional market position and diverse tenant mix.

KEY FINDINGS:
• Market Value: $180,000,000 (High Confidence)
• Net Operating Income: $15,200,000 per annum
• Capitalisation Rate: 6.25%
• Gross Lettable Area: 185,000 sqm
• Specialty Store Occupancy: 98.2%
• Major Tenant WALE: 8.5 years

PROPERTY HIGHLIGHTS:
Premier super-regional shopping centre featuring 150+ specialty stores, major department store anchors, entertainment precinct, and dining destinations. The centre benefits from exceptional accessibility and serves a large, affluent trade area.

INVESTMENT SUMMARY:
The property presents a flagship retail investment with strong fundamentals, diversified income streams, and dominant market position supporting long-term value retention and growth prospects.`,

      propertyDetails: `PROPERTY DESCRIPTION

Centre Overview:
• Total Centre GLA: 185,000 sqm
• Specialty Store GLA: 125,000 sqm
• Major Store GLA: 45,000 sqm
• Entertainment/Dining: 15,000 sqm
• Number of Stores: 152 specialty stores + 6 majors
• Trading Hours: 10am-9pm (Mon-Thu), 10am-10pm (Fri), 9am-10pm (Sat), 10am-7pm (Sun)
• Car Parking: 8,500 spaces across multi-level car parks

Major Anchors:
• Myer: 12,500 sqm (lease expiry 2031)
• David Jones: 11,800 sqm (lease expiry 2030)
• Coles: 4,200 sqm (lease expiry 2029)
• Woolworths: 4,500 sqm (lease expiry 2028)
• Target: 6,800 sqm (lease expiry 2027)
• Kmart: 5,200 sqm (lease expiry 2026)

Entertainment & Dining:
• Event Cinemas: 3,200 sqm multiplex
• Food Court: 2,800 sqm with 25 outlets
• Restaurant Precinct: 4,500 sqm fine dining
• Kids Play Area: 800 sqm indoor playground
• Health & Beauty: 3,700 sqm including day spa

Centre Features:
• Climate controlled environment throughout
• Natural lighting via skylights and atriums
• Premium finishes and contemporary design
• Digital directory and wayfinding systems
• Free WiFi throughout centre
• Parent rooms and accessibility features
• Concierge and customer service desk

Parking & Access:
• Multi-level parking with covered walkways
• Valet parking service available
• Electric vehicle charging stations
• Public transport hub with bus interchange
• Direct freeway access via Princes Highway
• Bicycle parking and storage facilities`,

      marketAnalysis: `MARKET ANALYSIS

RETAIL MARKET OVERVIEW:
The regional shopping centre market has demonstrated resilience with strong performance in dominant centres. Consumer spending patterns continue to favour convenience and experiential retail, supporting well-positioned centres like Chadstone.

Trade Area Analysis:
• Primary Trade Area: 5km radius - 385,000 residents
• Secondary Trade Area: 10km radius - 890,000 residents
• Tertiary Trade Area: 15km radius - 1.8M residents
• Average Household Income: $95,000 (significantly above Melbourne average)
• Population Growth: 2.8% annually in primary trade area

Competition Analysis:
Major Competing Centres:
• Westfield Southland: 15km north (145,000 sqm GLA)
• Eastland Shopping Centre: 18km east (165,000 sqm GLA)
• Chapel Street Precinct: 12km north (various formats)

Competitive Advantages:
• Largest shopping centre in Southern Hemisphere
• Superior tenant mix and international brands
• Entertainment and dining destination appeal
• Excellent transport accessibility
• Strong market dominance in trade area

CONSUMER TRENDS:
• Continued demand for experiential retail
• Growth in premium dining and entertainment
• Health and wellness category expansion
• Technology integration enhancing shopping experience
• Sustainability focus driving tenant selection

RETAIL SALES PERFORMANCE:
• Total Centre Sales: $1.85 billion annually
• Sales per sqm: $12,850 (specialty stores)
• Year-on-year growth: +4.2%
• Productivity above industry benchmarks
• Strong performance across all categories

MARKET OUTLOOK:
• Short term: Continued strong performance expected
• Medium term: Expansion opportunities being assessed
• Long term: Market leadership position sustainable
• Technology and experience investments supporting growth`,

      incomeAnalysis: `INCOME ANALYSIS

RENTAL INCOME SUMMARY:
Gross Rental Income: $16,400,000
Less: Vacancy Allowance (1.5%): -$246,000
Less: Collection Losses (0.5%): -$82,000
Effective Gross Income: $16,072,000
Less: Operating Expenses: -$872,000
Net Operating Income: $15,200,000

SPECIALTY STORE INCOME:
Total Specialty GLA: 125,000 sqm
Average Base Rent: $950/sqm
Specialty Base Rent: $11,875,000
Percentage Rent: $1,850,000
Total Specialty Income: $13,725,000

MAJOR STORE INCOME:
Myer: $720,000 annually
David Jones: $680,000 annually  
Coles: $450,000 annually
Woolworths: $485,000 annually
Target: $385,000 annually
Kmart: $305,000 annually
Total Major Store Income: $3,025,000

ENTERTAINMENT & DINING:
Event Cinemas: $265,000
Food Court: $580,000
Restaurant Precinct: $1,250,000
Other Entertainment: $185,000
Total Entertainment Income: $2,280,000

PERCENTAGE RENT ANALYSIS:
• Percentage Rent Threshold: 85% of specialty stores
• Average Percentage Rate: 7.5% of gross sales
• Total Percentage Rent: $1,850,000
• Percentage as % of Total Income: 11.3%

OPERATING EXPENSES:
Property Management: $185,000
Marketing & Promotions: $295,000
Utilities: $165,000
Security: $95,000
Cleaning & Maintenance: $125,000
Insurance: $45,000
Council Rates: $62,000
Other Expenses: $98,000
Total Operating Expenses: $872,000

LEASE EXPIRY ANALYSIS:
2025: 8.5% of specialty income
2026: 12.3% of specialty income  
2027: 18.7% of specialty income
2028: 22.1% of specialty income
2029: 20.4% of specialty income
2030+: 18.0% of specialty income

RENT REVIEW ANALYSIS:
• Fixed Annual Increases: 65% of leases (3.5% average)
• CPI Reviews: 25% of leases (minimum 2.5%)
• Market Reviews: 10% of leases
• Market Rent Premium: 8.2% above passing rent`,

      riskAssessment: `RISK ASSESSMENT

OVERALL RISK RATING: MEDIUM

MARKET RISK (Rating: 3/5):
• Retail sector experiencing structural change
• Online retail growth impacting physical stores
• Economic sensitivity affecting consumer spending
• Competition from other retail formats
• Mitigation: Dominant market position and experiential retail focus

TENANT RISK (Rating: 2/5):
• Diversified tenant base across multiple categories
• Strong major anchor tenants with long WALEs
• High specialty store occupancy rates
• Some exposure to fashion retail category decline
• Mitigation: Active leasing strategy and category mix management

INCOME RISK (Rating: 2/5):
• Stable base rent income with regular reviews
• Percentage rent provides upside participation
• Strong sales performance supporting rent growth
• Some tenant turnover in competitive categories
• Mitigation: Conservative leasing strategies and tenant support programs

OPERATIONAL RISK (Rating: 2/5):
• Complex multi-tenanted asset requiring active management
• High customer traffic volumes and safety considerations
• Technology and infrastructure upgrade requirements
• Environmental and sustainability compliance
• Mitigation: Professional centre management and regular capital investment

CAPITAL RISK (Rating: 3/5):
• Retail property values sensitive to income performance
• Large lot size limiting potential buyer pool
• Significant capital expenditure requirements for maintenance
• Asset lifecycle management considerations
• Mitigation: Strong fundamentals and market position supporting value

REGULATORY RISK (Rating: 2/5):
• Planning and zoning support current use
• Retail tenancy legislation affecting lease terms
• Building code compliance and accessibility requirements
• Environmental regulations and sustainability standards
• Mitigation: Proactive compliance management and industry best practices

ENVIRONMENTAL RISK (Rating: 2/5):
• Large energy consumption and sustainability targets
• Waste management and recycling requirements
• Climate change adaptation for extreme weather
• Customer and tenant expectations for green building
• Mitigation: Sustainability program and energy efficiency investments

KEY RISK MITIGATION STRATEGIES:
• Diversified tenant mix and active leasing management
• Regular capital expenditure program maintaining asset quality
• Customer experience enhancements and digital integration
• Sustainability initiatives and environmental performance
• Professional property management and operational excellence
• Financial covenant monitoring and tenant relationship management`
    }
  });

  // Contradiction and amendment states
  const [isfvContradictions, setISFVContradictions] = useState([]);
  const [pafContradictions, setPAFContradictions] = useState([]);
  const [icvContradictions, setICVContradictions] = useState([]);
  const [isfvAmendments, setISFVAmendments] = useState([]);
  const [pafAmendments, setPAFAmendments] = useState([]);
  const [icvAmendments, setICVAmendments] = useState([]);
  const [isfvAmending, setISFVAmending] = useState(false);
  const [pafAmending, setPAFAmending] = useState(false);
  const [icvAmending, setICVAmending] = useState(false);

  // Clear data functions
  const clearISFVData = () => {
    setSelectedISFVProperty('');
    setISFVGenerated(false);
    setISFVContradictions([]);
    setISFVAmendments([]);
    setISFVReportData({
      propertyAddress: "",
      estimatedValue: 0,
      confidence: 'medium',
      riskScore: 0,
      automationStatus: 'idle',
      lastUpdated: '',
      mockData: {
        propertyData: {
          propertyType: "",
          landArea: "",
          buildingArea: "",
          bedrooms: 0,
          bathrooms: 0,
          carSpaces: 0,
          yearBuilt: 0,
          structural_condition: '',
          kitchen_condition: '',
          overall_condition: '',
          zoning: '',
          lotPlan: '',
          councilArea: '',
          localityCode: '',
          propertyDescription: '',
          constructionMaterials: '',
          roof: '',
          walls: '',
          flooring: '',
          heating: '',
          parking: ''
        },
        riskRatings: {
          environmental: 0,
          structural: 0,
          market: 0,
          legal: 0,
          economic: 0,
          flood: 0,
          bushfire: 0,
          contamination: 0,
          heritage: 0,
          planning: 0
        },
        landDwellingDetails: {
          landTitle: '',
          dimensions: '',
          topography: '',
          soilType: '',
          drainage: '',
          utilities: '',
          easements: '',
          covenants: '',
          zoningDetails: '',
          planningPermits: '',
          developmentPotential: ''
        },
        photosAnnexures: { propertyPhotos: [], documents: [], plans: [] },
        automationHub: { status: '', domainApiData: '', riskAnalysis: '', salesComparison: '', marketMetrics: '', validationChecks: '' },
        vraAssessment: { comments: '', recommendations: '' },
        salesEvidence: [],
        generalComments: '',
        contradictionResults: ''
      }
    });
    toast.success('ISFV data cleared successfully');
  };

  const clearPAFData = () => {
    setSelectedPAFProperty('');
    setPAFGenerated(false);
    setPAFContradictions([]);
    setPAFAmendments([]);
    setPAFReportData({
      propertyAddress: "",
      estimatedValue: 0,
      reportType: "",
      automationStatus: 'idle',
      lastUpdated: '',
      mockData: {
        executiveSummary: "",
        propertyDetails: "",
        marketAnalysis: "",
        incomeAnalysis: "",
        riskAssessment: ""
      }
    });
    toast.success('PAF data cleared successfully');
  };

  const clearICVData = () => {
    setSelectedICVProperty('');
    setICVGenerated(false);
    setICVContradictions([]);
    setICVAmendments([]);
    setICVReportData({
      propertyAddress: "",
      estimatedValue: 0,
      reportType: "",
      automationStatus: 'idle',
      lastUpdated: '',
      mockData: {
        executiveSummary: "",
        propertyDetails: "",
        marketAnalysis: "",
        incomeAnalysis: "",
        riskAssessment: ""
      }
    });
    toast.success('ICV data cleared successfully');
  };

  // Generate functions - instant generation for demo
  const generateISFVReport = async () => {
    if (!selectedISFVProperty) {
      toast.error('Please select a property first');
      return;
    }

    setISFVGenerating(true);
    
    // Update with selected property data
    const selectedProp = isfvDemoProperties.find(p => p.name === selectedISFVProperty);
    if (selectedProp) {
      setISFVReportData(prev => ({
        ...prev,
        propertyAddress: selectedProp.address
      }));
    }
    
    // Instant generation for demo
    setTimeout(() => {
      setISFVGenerated(true);
      setISFVGenerating(false);
      toast.success('ISFV Report Generated Successfully! All tabs now contain complete data.');
    }, 500);
  };

  const generatePAFReport = async () => {
    if (!selectedPAFProperty) {
      toast.error('Please select a property first');
      return;
    }

    setPAFGenerating(true);
    
    // Update with selected property data
    const selectedProp = pafDemoProperties.find(p => p.name === selectedPAFProperty);
    if (selectedProp) {
      setPAFReportData(prev => ({
        ...prev,
        propertyAddress: selectedProp.address,
        reportType: selectedProp.reportType
      }));
    }
    
    // Instant generation for demo
    setTimeout(() => {
      setPAFGenerated(true);
      setPAFGenerating(false);
      toast.success('PAF Report Generated Successfully! All tabs now contain complete data.');
    }, 500);
  };

  const generateICVReport = async () => {
    if (!selectedICVProperty) {
      toast.error('Please select a property first');
      return;
    }

    setICVGenerating(true);
    
    // Update with selected property data
    const selectedProp = icvDemoProperties.find(p => p.name === selectedICVProperty);
    if (selectedProp) {
      setICVReportData(prev => ({
        ...prev,
        propertyAddress: selectedProp.address,
        reportType: selectedProp.reportType
      }));
    }
    
    // Instant generation for demo
    setTimeout(() => {
      setICVGenerated(true);
      setICVGenerating(false);
      toast.success('ICV Report Generated Successfully! All tabs now contain complete data.');
    }, 500);
  };

  // Contradiction checking functions
  const runISFVContradictionCheck = async () => {
    if (!isfvGenerated) {
      toast.error('Please generate ISFV report first');
      return;
    }

    const contradictions = checkReportContradictions(isfvReportData.mockData);
    const mockContradictions = [
      { section: 'Property Data', issue: 'Modern kitchen condition contradicts overall property age assessment', severity: 'medium' },
      { section: 'Risk Analysis', issue: 'Environmental risk rating may be understated for coastal location', severity: 'low' }
    ];
    
    setISFVContradictions(mockContradictions);
    toast.success(`ISFV Contradiction check completed - ${mockContradictions.length} potential issues found`);
  };

  const runPAFContradictionCheck = async () => {
    if (!pafGenerated) {
      toast.error('Please generate PAF report first');
      return;
    }

    const mockContradictions = [
      { section: 'Income Analysis', issue: 'Rental growth assumptions may be optimistic given market conditions', severity: 'medium' },
      { section: 'Market Analysis', issue: 'Comparable sales data requires verification for accuracy', severity: 'low' }
    ];
    
    setPAFContradictions(mockContradictions);
    toast.success(`PAF Contradiction check completed - ${mockContradictions.length} potential issues found`);
  };

  const runICVContradictionCheck = async () => {
    if (!icvGenerated) {
      toast.error('Please generate ICV report first');
      return;
    }

    const mockContradictions = [
      { section: 'Retail Analysis', issue: 'Online retail impact assessment may need updating', severity: 'high' },
      { section: 'Income Analysis', issue: 'Specialty shop vacancy rates conflict with occupancy assumptions', severity: 'medium' }
    ];
    
    setICVContradictions(mockContradictions);
    toast.success(`ICV Contradiction check completed - ${mockContradictions.length} potential issues found`);
  };

  // Amendment functions
  const runISFVAmendment = async () => {
    setISFVAmending(true);
    
    try {
      // Create a proper ContradictionResult object
      const contradictionResult = {
        hasContradictions: true,
        contradictions: isfvContradictions.map(c => c.issue || c),
        warnings: []
      };
      
      const result = await runAutomatedAmendment(isfvReportData.mockData, contradictionResult);
      const amendments = result.amendments || [];
      setISFVAmendments(amendments);
      
      toast.success(`ISFV amendments completed - ${amendments.length} sections updated`);
    } catch (error) {
      toast.error('Amendment process failed');
    } finally {
      setISFVAmending(false);
    }
  };

  const runPAFAmendment = async () => {
    setPAFAmending(true);
    
    try {
      // Create mock data compatible with ReportData interface
      const mockReportData = {
        propertyData: { propertyType: "Commercial Office" },
        riskRatings: { overall: 2 },
        vraAssessment: { comments: "Assessment complete" },
        salesEvidence: [],
        generalComments: "Commercial property assessment"
      };
      
      // Create a proper ContradictionResult object
      const contradictionResult = {
        hasContradictions: true,
        contradictions: pafContradictions.map(c => c.issue || c),
        warnings: []
      };
      
      const result = await runAutomatedAmendment(mockReportData, contradictionResult);
      const amendments = result.amendments || [];
      setPAFAmendments(amendments);
      
      toast.success(`PAF amendments completed - ${amendments.length} sections updated`);
    } catch (error) {
      toast.error('Amendment process failed');
    } finally {
      setPAFAmending(false);
    }
  };

  const runICVAmendment = async () => {
    setICVAmending(true);
    
    try {
      // Create mock data compatible with ReportData interface
      const mockReportData = {
        propertyData: { propertyType: "Retail Shopping Centre" },
        riskRatings: { overall: 3 },
        vraAssessment: { comments: "Assessment complete" },
        salesEvidence: [],
        generalComments: "Retail property assessment"
      };
      
      // Create a proper ContradictionResult object
      const contradictionResult = {
        hasContradictions: true,
        contradictions: icvContradictions.map(c => c.issue || c),
        warnings: []
      };
      
      const result = await runAutomatedAmendment(mockReportData, contradictionResult);
      const amendments = result.amendments || [];
      setICVAmendments(amendments);
      
      toast.success(`ICV amendments completed - ${amendments.length} sections updated`);
    } catch (error) {
      toast.error('Amendment process failed');
    } finally {
      setICVAmending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Professional Valuation Demo Reports</h1>
        <p className="text-lg text-muted-foreground">
          Experience our complete valuation platform with instant report generation
        </p>
      </div>

      <Tabs defaultValue="isfv" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="isfv">ISFV Demo</TabsTrigger>
          <TabsTrigger value="paf">PAF Demo</TabsTrigger>
          <TabsTrigger value="icv">ICV Demo</TabsTrigger>
        </TabsList>

        {/* ISFV Demo Tab */}
        <TabsContent value="isfv" className="space-y-6">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                ISFV Platform Demo - Complete Report Ready
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Selected Property</Label>
                  <Select value={selectedISFVProperty} onValueChange={setSelectedISFVProperty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select demo property..." />
                    </SelectTrigger>
                    <SelectContent>
                      {isfvDemoProperties.map((property, index) => (
                        <SelectItem key={index} value={property.name}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input value="88 Marine Parade, St Kilda VIC 3182" readOnly />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Report Type</Label>
                  <Input value="ISFV - Instant Short Form Valuation" readOnly />
                </div>
                <div>
                  <Label>Estimated Value</Label>
                  <Input value="$850,000" readOnly className="font-bold text-green-700" />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={generateISFVReport}
                  disabled={isfvGenerating}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isfvGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Generate ISFV Report
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={clearISFVData}
                  variant="outline"
                  className="border-gray-300"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
                
                {isfvGenerated && (
                  <>
                    <Button 
                      onClick={runISFVContradictionCheck}
                      variant="outline"
                      className="border-orange-300"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Run Contradiction Check ({isfvContradictions.length})
                    </Button>
                    
                    {isfvContradictions.length > 0 && (
                      <Button 
                        onClick={runISFVAmendment}
                        disabled={isfvAmending}
                        variant="outline"
                        className="border-blue-300"
                      >
                        {isfvAmending ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Wrench className="h-4 w-4 mr-2" />
                        )}
                        Auto-Amend ({isfvAmendments.length})
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Show ISFV Platform when generated */}
          {isfvGenerated && (
            <Card>
              <CardHeader>
                <CardTitle>ISFV Platform - Live Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <ISFVPlatform />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* PAF Demo Tab */}
        <TabsContent value="paf" className="space-y-6">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                PAF Platform Demo - Complete Report Ready
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Selected Property</Label>
                  <Select value={selectedPAFProperty} onValueChange={setSelectedPAFProperty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select demo property..." />
                    </SelectTrigger>
                    <SelectContent>
                      {pafDemoProperties.map((property, index) => (
                        <SelectItem key={index} value={property.name}>
                          {property.name} - {property.reportType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input value="123 Collins Street, Melbourne VIC 3000" readOnly />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Report Type</Label>
                  <Input value="Long Form Property Valuation" readOnly />
                </div>
                <div>
                  <Label>Estimated Value</Label>
                  <Input value="$25,000,000" readOnly className="font-bold text-blue-700" />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={generatePAFReport}
                  disabled={pafGenerating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {pafGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Generate PAF Report
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={clearPAFData}
                  variant="outline"
                  className="border-gray-300"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
                
                {pafGenerated && (
                  <>
                    <Button 
                      onClick={runPAFContradictionCheck}
                      variant="outline"
                      className="border-orange-300"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Run Contradiction Check ({pafContradictions.length})
                    </Button>
                    
                    {pafContradictions.length > 0 && (
                      <Button 
                        onClick={runPAFAmendment}
                        disabled={pafAmending}
                        variant="outline"
                        className="border-blue-300"
                      >
                        {pafAmending ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Wrench className="h-4 w-4 mr-2" />
                        )}
                        Auto-Amend ({pafAmendments.length})
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* PAF Report Display */}
          {pafGenerated && (
            <Card>
              <CardHeader>
                <CardTitle>PAF Report - All Tabs Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="executive" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="executive">Executive Summary</TabsTrigger>
                    <TabsTrigger value="property">Property Details</TabsTrigger>
                    <TabsTrigger value="market">Market Analysis</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="executive" className="mt-4">
                    <div className="p-6 border rounded-lg bg-green-50">
                      <h4 className="font-semibold text-green-800 mb-4">Executive Summary</h4>
                      <div className="text-sm text-green-700 whitespace-pre-wrap leading-relaxed">
                        {pafReportData.mockData.executiveSummary}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="property" className="mt-4">
                    <div className="p-6 border rounded-lg bg-blue-50">
                      <h4 className="font-semibold text-blue-800 mb-4">Property Details</h4>
                      <div className="text-sm text-blue-700 whitespace-pre-wrap leading-relaxed">
                        {pafReportData.mockData.propertyDetails}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="market" className="mt-4">
                    <div className="p-6 border rounded-lg bg-purple-50">
                      <h4 className="font-semibold text-purple-800 mb-4">Market Analysis</h4>
                      <div className="text-sm text-purple-700 whitespace-pre-wrap leading-relaxed">
                        {pafReportData.mockData.marketAnalysis}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ICV Demo Tab */}
        <TabsContent value="icv" className="space-y-6">
          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                ICV Platform Demo - Complete Report Ready
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Selected Property</Label>
                  <Select value={selectedICVProperty} onValueChange={setSelectedICVProperty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select demo property..." />
                    </SelectTrigger>
                    <SelectContent>
                      {icvDemoProperties.map((property, index) => (
                        <SelectItem key={index} value={property.name}>
                          {property.name} - {property.reportType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input value="200 Chadstone Road, Chadstone VIC 3148" readOnly />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Report Type</Label>
                  <Input value="Long Form Property Valuation" readOnly />
                </div>
                <div>
                  <Label>Estimated Value</Label>
                  <Input value="$180,000,000" readOnly className="font-bold text-purple-700" />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={generateICVReport}
                  disabled={icvGenerating}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {icvGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Generate ICV Report
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={clearICVData}
                  variant="outline"
                  className="border-gray-300"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
                
                {icvGenerated && (
                  <>
                    <Button 
                      onClick={runICVContradictionCheck}
                      variant="outline"
                      className="border-orange-300"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Run Contradiction Check ({icvContradictions.length})
                    </Button>
                    
                    {icvContradictions.length > 0 && (
                      <Button 
                        onClick={runICVAmendment}
                        disabled={icvAmending}
                        variant="outline"
                        className="border-blue-300"
                      >
                        {icvAmending ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Wrench className="h-4 w-4 mr-2" />
                        )}
                        Auto-Amend ({icvAmendments.length})
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ICV Report Display */}
          {icvGenerated && (
            <Card>
              <CardHeader>
                <CardTitle>ICV Report - All Tabs Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="executive" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="executive">Executive Summary</TabsTrigger>
                    <TabsTrigger value="property">Property Details</TabsTrigger>
                    <TabsTrigger value="market">Market Analysis</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="executive" className="mt-4">
                    <div className="p-6 border rounded-lg bg-green-50">
                      <h4 className="font-semibold text-green-800 mb-4">Executive Summary</h4>
                      <div className="text-sm text-green-700 whitespace-pre-wrap leading-relaxed">
                        {icvReportData.mockData.executiveSummary}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="property" className="mt-4">
                    <div className="p-6 border rounded-lg bg-blue-50">
                      <h4 className="font-semibold text-blue-800 mb-4">Property Details</h4>
                      <div className="text-sm text-blue-700 whitespace-pre-wrap leading-relaxed">
                        {icvReportData.mockData.propertyDetails}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="market" className="mt-4">
                    <div className="p-6 border rounded-lg bg-purple-50">
                      <h4 className="font-semibold text-purple-800 mb-4">Market Analysis</h4>
                      <div className="text-sm text-purple-700 whitespace-pre-wrap leading-relaxed">
                        {icvReportData.mockData.marketAnalysis}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}